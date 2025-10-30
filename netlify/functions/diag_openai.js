// netlify/functions/diag_openai.js
export const handler = async () => {
  const key = process.env.OPENAI_API_KEY || "";
  const keyTail = key ? key.slice(-6) : "(no key)";

  // Köllum beint á /v1/models til að sjá raunverulega svar frá OpenAI
  const res = await fetch("https://api.openai.com/v1/models", {
    method: "GET",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  }).catch((e) => ({ ok: false, status: 0, json: async () => ({ fetch_error: e.message }) }));

  let body;
  try { body = await res.json(); } catch { body = { note: "non-JSON response" }; }

  // Tökum gagnleg headers ef þeir eru til (sýna project, rate limits, o.fl.)
  const openaiProject = res.headers?.get?.("openai-project") || null;
  const requestId = res.headers?.get?.("x-request-id") || null;
  const ratelimit = {
    limit: res.headers?.get?.("x-ratelimit-limit-requests"),
    remaining: res.headers?.get?.("x-ratelimit-remaining-requests"),
    reset: res.headers?.get?.("x-ratelimit-reset-requests"),
  };

  return {
    statusCode: res.status || 500,
    headers: { "content-type": "application/json" },
    body: JSON.stringify(
      {
        usingKeyEnding: keyTail,
        status: res.status,
        openaiProjectHeader: openaiProject,
        requestId,
        ratelimit,
        response: body, // mun sýna t.d. {error:{code:"insufficient_quota", ...}}
      },
      null,
      2
    ),
  };
};
