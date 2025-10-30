// netlify/functions/diag_openai.js
export async function handler() {
  const key = process.env.OPENAI_API_KEY || "";
  const keyTail = key ? key.slice(-6) : "(no key)";

  const res = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${key}` },
  }).catch(e => ({ status: 0, json: async () => ({ fetch_error: e.message }) }));

  const body = await res.json().catch(() => ({ note: "non-JSON" }));
  const projectHeader = res.headers?.get?.("openai-project") || null;

  return {
    statusCode: res.status || 500,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(
      { usingKeyEnding: keyTail, status: res.status, openaiProjectHeader: projectHeader, response: body },
      null,
      2
    ),
  };
}
