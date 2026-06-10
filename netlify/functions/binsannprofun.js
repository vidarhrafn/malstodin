const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Aðeins POST leyfist' }) };
  }

  try {
    const { ord } = JSON.parse(event.body);
    if (!ord || typeof ord !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ gilt: false }) };
    }

    const q = encodeURIComponent(ord.toLowerCase().trim());
    const res = await fetch(
      `https://bin.arnastofnun.is/api/beygingarmynd/${q}`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!res.ok) {
      return { statusCode: 200, body: JSON.stringify({ gilt: false }) };
    }

    const data = await res.json();
    // Skilar fylki — gilt ef það er ekki tómt
    const gilt = Array.isArray(data) && data.length > 0;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gilt }),
    };
  } catch (e) {
    console.error('BÍN villa:', e);
    return { statusCode: 200, body: JSON.stringify({ gilt: false, villa: e.message }) };
  }
};
