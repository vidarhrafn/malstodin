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
    const base = 'https://bin.arnastofnun.is/php_bin/ajaxleit2.php';

    // Sækjum báðar leitir samhliða: grunnorð og beygingarmynd
    const [r1, r2] = await Promise.all([
      fetch(`${base}?q=${q}`,                   { headers: { 'Accept': 'text/html' } }),
      fetch(`${base}?q=${q}&ordmyndir=on`,      { headers: { 'Accept': 'text/html' } }),
    ]);

    const [html1, html2] = await Promise.all([r1.text(), r2.text()]);

    // Ef annar hvór inniheldur <li> er orðið gilt í BÍN
    const gilt = html1.includes('<li>') || html2.includes('<li>');

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
