const fetch = require('node-fetch');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    if (!process.env.ELEVENLABS_API_KEY) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "ElevenLabs API lykill vantar í environment variables." }) 
        };
    }

    try {
        const { text_to_speak } = JSON.parse(event.body);
        
        if (!text_to_speak) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ error: "text_to_speak vantar í body." }) 
            };
        }

        // Rachel rödd - þetta virkar ALLTAF
        const VOICE_ID = 'TX3LPaxmHKxFdv7VOQHJ';
        
        const elevenLabsResponse = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': process.env.ELEVENLABS_API_KEY
                },
                body: JSON.stringify({
                    text: text_to_speak,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75
                    }
                })
            }
        );

        if (!elevenLabsResponse.ok) {
            const errorBody = await elevenLabsResponse.text();
            console.error("ElevenLabs API villa:", errorBody);
            return {
                statusCode: elevenLabsResponse.status,
                body: JSON.stringify({ 
                    error: `ElevenLabs API villa: ${elevenLabsResponse.status}`,
                    details: errorBody 
                })
            };
        }

        const audioBuffer = await elevenLabsResponse.buffer();
        const audioBase64 = audioBuffer.toString('base64');

        return {
            statusCode: 200,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ audio_base64: audioBase64 })
        };

    } catch (error) {
        console.error("Villa í speak function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
