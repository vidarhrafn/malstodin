exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const AREAS = [
    { name: 'København K', slug: 'k%C3%B8benhavn-k' },
    { name: 'Vesterbro',   slug: 'vesterbro' },
    { name: 'Nørrebro',    slug: 'n%C3%B8rrebro' },
    { name: 'Frederiksberg', slug: 'frederiksberg' },
    { name: 'Christianshavn', slug: 'christianshavn' },
  ];

  const headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'da-DK,da;q=0.9',
    'Accept': 'text/html,application/xhtml+xml',
  };

  const allListings = [];

  for (const area of AREAS) {
    const url = `https://www.boligportal.dk/lejligheder/k%C3%B8benhavn/2-3-v%C3%A6relser/${area.slug}/?furnished=1`;

    try {
      const resp = await fetch(url, { headers });
      if (!resp.ok) continue;
      const html = await resp.text();

      // Extract listings from anchor tags in the search results
      // Pattern: /lejligheder/kobenhavn/[size]m2-[rooms]-vaer-id-[id]
      const linkRegex = /href="(\/lejligheder\/k%C3%B8benhavn\/[^"]+id-\d+)"/g;
      const titleRegex = /(\d+)\s+v\u00e6r\.\s+lejlighed\s+p\u00e5\s+(\d+)\s+m\u00b2[^<]*?([\w\s]+),\s+([^<\n]+?)\s+([\d.]+)\s+kr\./g;

      // More robust: parse the text content for listing data
      // Each listing appears as: "X vær. lejlighed på Y m² København K, [street] [price] kr. [date]"
      const listingPattern = /(\d+)\s+v[æa]r\.\s+lejlighed\s+p[åa]\s+(\d+)\s+m[²2]\s*(K[øo]benhavn\s+[A-ZÆØÅ][\w\s]*),\s+([^\d\n]+?)\s*([\d.]+)\s+kr\./g;

      let match;
      const seenIds = new Set();

      // Get all href links for this area
      const hrefMatches = [...html.matchAll(/href="(\/lejligheder\/k[^"]+id-(\d+))"/g)];

      // Get text blocks containing listing info
      // Strip HTML tags for text parsing
      const stripped = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

      // Match listings: "X vær. lejlighed på Y m²AreaName, Street Price kr. Date"
      const pattern = /(\d+)\s+v[æa]r\.\s+lejlighed\s+p[åa]\s+(\d+)\s+m[²2](K[øo]benhavn\s+[A-ZÆØÅ][^,]*),\s+([^0-9]+?)([\d.]+)\s+kr\.([\d.\s]+(?:timer?\s+siden|dag[e]?\s+siden|I g[åa]r|\d+\.\s+\w+))?/g;

      const matches = [...stripped.matchAll(pattern)];

      matches.forEach((m, idx) => {
        const rooms = parseInt(m[1]);
        const size = parseInt(m[2]);
        const areaName = m[3].trim();
        const street = m[4].trim();
        const priceStr = m[5].replace(/\./g, '');
        const price = parseInt(priceStr);
        const dateRaw = m[6] ? m[6].trim() : '';

        // Get corresponding URL
        const hrefMatch = hrefMatches[idx];
        const listingUrl = hrefMatch
          ? `https://www.boligportal.dk${hrefMatch[1]}`
          : url;
        const id = hrefMatch ? hrefMatch[2] : `${area.slug}-${idx}`;

        if (seenIds.has(id)) return;
        seenIds.add(id);

        allListings.push({
          id,
          rooms,
          size,
          area: areaName || area.name,
          street,
          price,
          date: dateRaw,
          url: listingUrl,
          furnished: true,
        });
      });

    } catch (e) {
      console.error(`Error fetching ${area.name}:`, e.message);
    }
  }

  // Sort by newest (those with "timer siden" or "dag siden" first), then by price
  allListings.sort((a, b) => {
    const aNew = a.date.includes('timer') || a.date.includes('I går') ? 0 : 1;
    const bNew = b.date.includes('timer') || b.date.includes('I går') ? 0 : 1;
    if (aNew !== bNew) return aNew - bNew;
    return a.price - b.price;
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=1800', // cache 30 min
    },
    body: JSON.stringify({
      listings: allListings,
      count: allListings.length,
      fetched: new Date().toISOString(),
    }),
  };
};
