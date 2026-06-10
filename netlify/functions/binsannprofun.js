const fetch = require('node-fetch');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Aðeins POST leyfist' }) };
  }

  try {
    const { ord } = JSON.parse(event.body);
    if (!ord || typeof ord !== 'string') {
      return { statusCode: 400, body: JSON.stringify({ gilt: false, villa: 'Vantar orð' }) };
    }

    const encoded = encodeURIComponent(ord.toLowerCase().trim());
    const res = await fetch(
      `https://bin.arnastofnun.is/django/api/v1/ord/${encoded}/`,
      { headers: { 'Accept': 'application/json' } }
    );

    if (!res.ok) {
      return { statusCode: 200, body: JSON.stringify({ gilt: false }) };
    }

    const data = await res.json();
    const gilt = Array.isArray(data.results) && data.results.length > 0;

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gilt }),
    };
  } catch (e) {
    console.error('BÍN sannprófun villa:', e);
    return { statusCode: 200, body: JSON.stringify({ gilt: false, villa: e.message }) };
  }
};
