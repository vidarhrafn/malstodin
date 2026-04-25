// netlify/functions/openai.js
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }
  try {
    const { messages, max_tokens, model, temperature } = JSON.parse(event.body || "{}");
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model ?? "gpt-4o-mini",
        messages,
        max_tokens: max_tokens ?? 1000,
        temperature: temperature ?? 0.3,
      }),
    });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }
    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          status: response.status,
          request_id: response.headers.get("x-request-id"),
          openai_project: response.headers.get("openai-project"),
          error: data?.error ?? data,
        }),
      };
    }
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ content: data.choices?.[0]?.message?.content ?? "" }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
