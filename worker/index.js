const INBOX = "jacksonkubokawa@gmail.com";
const FROM = { email: "website@jacksonkubo.com", name: "Jackson Kubo" };

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

async function sendContact(request, env) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Use the contact form." }, 405);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "The form could not be read." }, 400);
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return json({ ok: true });
  }

  const first = String(body.firstName ?? "").trim().slice(0, 80);
  const last = String(body.lastName ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const message = String(body.message ?? "").trim().slice(0, 4000);

  if (!isEmail(email)) {
    return json({ ok: false, error: "Enter an email address Jackson can reply to." }, 400);
  }

  if (message.length < 8) {
    return json({ ok: false, error: "Write a short note about the project." }, 400);
  }

  const name = [first, last].filter(Boolean).join(" ") || "Someone";
  const text = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

  if (!env.EMAIL || typeof env.EMAIL.send !== "function") {
    return json({ ok: false, error: "The site could not send this note." }, 503);
  }

  try {
    await env.EMAIL.send({
      to: INBOX,
      from: FROM,
      replyTo: email,
      subject: `Professional inquiry from ${name}`,
      text,
    });
  } catch (error) {
    console.error("contact send failed", error && error.code, error && error.message);
    return json({ ok: false, error: "The site could not send this note." }, 502);
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === "jacksonkubo.com") {
      url.hostname = "www.jacksonkubo.com";
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname === "/api/contact") {
      return sendContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
