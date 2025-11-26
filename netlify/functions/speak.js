const fetch = require('node-fetch');
exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    // Athuga að Azure API lykill og region séu til staðar
    if (!process.env.AZURE_SPEECH_KEY) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "AZURE_SPEECH_KEY vantar í environment variables." }) 
        };
    }
    if (!process.env.AZURE_SPEECH_REGION) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "AZURE_SPEECH_REGION vantar í environment variables." }) 
        };
    }
    try {
        const { text_to_speak, voice } = JSON.parse(event.body); // 👈 Bætti við voice
        
        if (!text_to_speak) {
            return { 
                statusCode: 400, 
                body: JSON.stringify({ error: "text_to_speak vantar í body." }) 
            };
        }
        
        // Nota Guðrúnu sem default ef engin rödd er valin
        const selectedVoice = voice || 'is-IS-GudrunNeural'; // 👈 NÝTT
        
        const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
        const AZURE_REGION = process.env.AZURE_SPEECH_REGION;
        
        // SSML með valinni rödd
        const ssml = `
            <speak version='1.0' xml:lang='is-IS'>
                <voice xml:lang='is-IS' name='${selectedVoice}'>
                    ${text_to_speak}
                </voice>
            </speak>
        `;
        // Kalla á Azure TTS API
        const azureResponse = await fetch(
            `https://${AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
            {
                method: 'POST',
                headers: {
                    'Ocp-Apim-Subscription-Key': AZURE_KEY,
                    'Content-Type': 'application/ssml+xml',
                    'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
                    'User-Agent': 'Malstodin'
                },
                body: ssml
            }
        );
        if (!azureResponse.ok) {
            const errorBody = await azureResponse.text();
            console.error("Azure TTS API villa:", errorBody);
            return {
                statusCode: azureResponse.status,
                body: JSON.stringify({ 
                    error: `Azure TTS API villa: ${azureResponse.status}`,
                    details: errorBody 
                })
            };
        }
        // Fáum hljóðgögnin sem buffer
        const audioBuffer = await azureResponse.buffer();
        const audioBase64 = audioBuffer.toString('base64');
        return {
            statusCode: 200,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ audio_base64: audioBase64 })
        };
    } catch (error) {
        console.error("Villa í Azure TTS function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
