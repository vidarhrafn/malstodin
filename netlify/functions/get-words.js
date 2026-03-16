// netlify/functions/get-words.js
// Sækir orðalista úr Google Sheets (CSV útgáfu)

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  try {
    const SHEET_URL = process.env.GOOGLE_SHEET_URL;

    if (!SHEET_URL) {
      throw new Error('GOOGLE_SHEET_URL vantar í Netlify umhverfisbreytur');
    }

    const response = await fetch(SHEET_URL);

    if (!response.ok) {
      throw new Error(`Gat ekki sótt töfluna: ${response.status}`);
    }

    const tsv = await response.text();

    // Þátta TSV – eitt orð per lína, taka fyrsta dálkinn
    const lines = tsv.split('\n');
    const words = [];

    for (const line of lines) {
      const word = line.split('\t')[0].trim();
      if (word && word.length > 0 && word.toLowerCase() !== 'orð') {
        words.push(word.toLowerCase());
      }
    }

    if (words.length === 0) {
      throw new Error('Engin orð fundust í töflunni');
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ words }),
    };
  } catch (error) {
    console.error('get-words villa:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
