exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;
  if (!PERPLEXITY_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'PERPLEXITY_API_KEY not set' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { query, seenUrls = [] } = body;
  if (!query) {
    return { statusCode: 400, body: JSON.stringify({ error: 'query is required' }) };
  }

  const seenList = seenUrls.slice(-20).join('\n') || 'none';

  const prompt = `Search for the 10 most recent and relevant items about AI in language learning and language teaching (CALL - Computer-Assisted Language Learning).

Include: academic articles, blog posts, podcasts, news items, videos. Mix English and Icelandic sources where possible.

Previously seen URLs — skip these unless they are trending heavily right now:
${seenList}

Return ONLY a valid JSON array with exactly 10 objects. No markdown, no explanation, no preamble:
[
  {
    "title": "...",
    "url": "https://...",
    "source": "...",
    "type": "article|blog|podcast|news|video",
    "date": "...",
    "description": "1-2 sentences in the same language as the item",
    "hot": false,
    "lang": "en|is"
  }
]

Rules:
- "hot": true only if this item has unusually high engagement/traction right now
- "date": human-readable, e.g. "May 2025" or "12. maí 2025"
- Focus topics: LLM tutors, AI writing feedback, pronunciation AI, adaptive learning, ChatGPT in language classroom, multimodal AI for language learning, AI assessment in language education
- All URLs must be real and reachable`;

  // --- 1. Fetch from Perplexity ---
  let items = [];
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
          { role: 'system', content: 'You are a research assistant. Always respond with valid JSON only — no markdown fences, no explanation.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.2,
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
      return { statusCode: 500, body: JSON.stringify({ error: 'Could not parse JSON from response', raw: raw.slice(0, 300) }) };
    }

    items = JSON.parse(raw.slice(start, end + 1));

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message || 'Unknown error' }) };
  }

  // --- 2. Verify URLs in parallel ---
  async function checkUrl(url) {
    try {
      const r = await fetch(url, {
        method: 'HEAD',
        headers: { 'User-Agent': 'Mozilla/5.0' },
        redirect: 'follow',
        signal: AbortSignal.timeout(5000)
      });
      // Accept 200-399 (success + redirects already followed) and 405 (HEAD not allowed but page exists)
      return r.status < 400 || r.status === 405;
    } catch {
      // Timeout or network error — try GET as fallback
      try {
        const r = await fetch(url, {
          method: 'GET',
          headers: { 'User-Agent': 'Mozilla/5.0' },
          redirect: 'follow',
          signal: AbortSignal.timeout(6000)
        });
        return r.status < 400 || r.status === 405;
      } catch {
        return false;
      }
    }
  }

  const verifyResults = await Promise.all(
    items.map(async (item) => {
      const ok = await checkUrl(item.url);
      return { ...item, _verified: ok };
    })
  );

  // Keep only verified items
  const verified = verifyResults.filter(i => i._verified).map(({ _verified, ...item }) => item);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: verified,
      total_before_verification: items.length,
      removed: items.length - verified.length
    })
  };
};
