// netlify/functions/speak.js

const fetch = require('node-fetch'); // Þú gætir þurft að setja upp node-fetch
                                     // (npm install node-fetch) eða nota innbyggða fetch ef þú ert á nýrri Node version

exports.handler = async (event) => {
    // Aðeins leyfa POST beiðnir
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!process.env.ELEVENLABS_API_KEY) {
        return { statusCode: 500, body: JSON.stringify({ error: "ElevenLabs API lykill vantar." }) };
    }

    try {
        // Við búumst við að framendinn sendi okkur textann sem á að tala
        const { text_to_speak } = JSON.parse(event.body);

        if (!text_to_speak) {
            return { statusCode: 400, body: JSON.stringify({ error: "Texti vantar." }) };
        }
        
        // ------------- KALL Á ELEVENLABS API -------------
        // Ath: Þetta er dæmi. Þú þarft að finna hentuga íslenska rödd (Voice ID)
        const VOICE_ID = '21m00Tcm4wEa7nSWMbFq'; // Dæmi: Adam, mælum með að finna íslenska.

        const elevenLabsResponse = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg', // Við viljum fá hljóðskrá (MP3) til baka
                'Content-Type': 'application/json',
                'xi-api-key': process.env.ELEVENLABS_API_KEY
            },
            body: JSON.stringify({
                text: text_to_speak,
                model_id: "eleven_multilingual_v2", // Gott líkan fyrir mörg tungumál (einnig íslensku)
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.75
                }
            })
        });

        if (!elevenLabsResponse.ok) {
            const errorBody = await elevenLabsResponse.text();
            console.error("ElevenLabs error:", errorBody);
            throw new Error(`ElevenLabs API skilaði villu: ${elevenLabsResponse.status}`);
        }

        // Fáum hljóðgögnin sem buffer (svona hlaðið niður skrá)
        const audioBuffer = await elevenLabsResponse.buffer();
        
        // Umbreytum hljóðinu í Base64 streng. Þetta er besta leiðin til að senda hljóðskrá í gegnum JSON.
        const audioBase64 = audioBuffer.toString('base64');

        // Skilum Base64 strengnum til framendans
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                audio_base64: audioBase64
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
