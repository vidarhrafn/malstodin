exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
  if (!PERPLEXITY_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'PERPLEXITY_API_KEY not set' }) };
  }

  const prompt = `Search boligportal.dk right now for furnished apartment listings (møbleret) in Copenhagen with 2-3 rooms in these areas: København K, Vesterbro, Nørrebro, Frederiksberg, Christianshavn.

Search these URLs and extract real current listings:
- https://www.boligportal.dk/lejligheder/k%C3%B8benhavn/2-3-v%C3%A6relser/k%C3%B8benhavn-k/?furnished=1
- https://www.boligportal.dk/lejligheder/k%C3%B8benhavn/2-3-v%C3%A6relser/vesterbro/?furnished=1
- https://www.boligportal.dk/lejligheder/k%C3%B8benhavn/2-3-v%C3%A6relser/n%C3%B8rrebro/?furnished=1
- https://www.boligportal.dk/lejligheder/k%C3%B8benhavn/2-3-v%C3%A6relser/frederiksberg/?furnished=1
- https://www.boligportal.dk/lejligheder/k%C3%B8benhavn/2-3-v%C3%A6relser/christianshavn/?furnished=1

Return ONLY a valid JSON array, no markdown, no explanation:
[{"title":"...","street":"...","area":"København K","rooms":2,"size":70,"price":14000,"date":"I dag","url":"https://www.boligportal.dk/...","available_from":""}]

Rules:
- Only include real listings you can verify from the URLs above
- Include up to 20 listings total
- All must be furnished (møbleret)
- price is monthly rent in DKK as integer
- size is square meters as integer
- url must be the exact boligportal.dk URL for that listing`;

  try {
    const resp = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: 'You are a web scraping assistant. Search the provided URLs and return only valid JSON with real data. Never invent listings.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.1,
        return_citations: true
      })
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      return { statusCode: resp.status, body: JSON.stringify({ error: err.error?.message || `HTTP ${resp.status}` }) };
    }

    const data = await resp.json();
    const raw = data.choices?.[0]?.message?.content || '';
    const start = raw.indexOf('[');
    const end = raw.lastIndexOf(']');

    if (start === -1 || end === -1) {
      return { statusCode: 500, body: JSON.stringify({ error: 'No JSON in response', raw: raw.slice(0, 400) }) };
    }

    const listings = JSON.parse(raw.slice(start, end + 1));

    listings.sort((a, b) => {
      const aNew = ['dag', 'timer', 'I dag', 'I går'].some(k => (a.date || '').includes(k)) ? 0 : 1;
      const bNew = ['dag', 'timer', 'I dag', 'I går'].some(k => (b.date || '').includes(k)) ? 0 : 1;
      if (aNew !== bNew) return aNew - bNew;
      return a.price - b.price;
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
      body: JSON.stringify({ listings, count: listings.length, fetched: new Date().toISOString() })
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Unknown error' }) };
  }
};
