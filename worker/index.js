const INBOX = "jacksonkubokawa@gmail.com";
const FROM = { email: "website@jacksonkubo.com", name: "Jackson Kubo" };

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "X-Frame-Options": "SAMEORIGIN",
};

const HSTS = "max-age=31536000; includeSubDomains";

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

function applySecurity(response, hsts) {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  if (hsts) headers.set("Strict-Transport-Security", HSTS);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function redirect(location, hsts) {
  const headers = new Headers({ Location: location });
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  if (hsts) headers.set("Strict-Transport-Security", HSTS);
  return new Response(null, { status: 301, headers });
}

function needsTrailingSlash(pathname) {
  if (pathname === "/" || pathname.endsWith("/") || pathname === "/api/contact") return false;
  const last = pathname.slice(pathname.lastIndexOf("/") + 1);
  return !last.includes(".");
}

const MEDIA = /\.(mp3|m4a|mp4|webm)$/i;

export function parseByteRange(header, total) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(String(header).trim());
  if (!match || (match[1] === "" && match[2] === "")) return null;
  const suffix = match[1] === "";
  const start = suffix ? Math.max(0, total - Number(match[2])) : Number(match[1]);
  const end = suffix || match[2] === "" ? total - 1 : Number(match[2]);
  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || end < start || start >= total) {
    return { unsatisfiable: true };
  }
  return { start, end: Math.min(end, total - 1) };
}

function sliceStream(body, start, end) {
  const wanted = end - start + 1;
  let skipped = 0;
  let sent = 0;
  const reader = body.getReader();
  return new ReadableStream({
    async pull(controller) {
      while (sent < wanted) {
        const { done, value } = await reader.read();
        if (done) {
          controller.close();
          return;
        }
        let chunk = value;
        if (skipped < start) {
          const need = start - skipped;
          if (chunk.byteLength <= need) {
            skipped += chunk.byteLength;
            continue;
          }
          chunk = chunk.subarray(need);
          skipped = start;
        }
        const remain = wanted - sent;
        if (chunk.byteLength > remain) chunk = chunk.subarray(0, remain);
        sent += chunk.byteLength;
        controller.enqueue(chunk);
        if (sent >= wanted) {
          controller.close();
          reader.cancel().catch(() => {});
          return;
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });
}

function withAcceptRanges(response) {
  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(request, env) {
  const url = new URL(request.url);
  const media = MEDIA.test(url.pathname);
  const rangeHeader = request.headers.get("Range");
  if (!media || (request.method !== "GET" && request.method !== "HEAD") || !rangeHeader) {
    const response = await env.ASSETS.fetch(request);
    return media ? withAcceptRanges(response) : response;
  }

  const full = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (!full.ok || !full.body) return full;
  const lengthHeader = full.headers.get("content-length");
  let total = Number(lengthHeader);
  let source = full.body;
  if (!lengthHeader || !Number.isFinite(total) || total <= 0) {
    const buffer = await full.arrayBuffer();
    total = buffer.byteLength;
    source = new Response(buffer).body;
  }
  if (!source) return full;

  const parsed = parseByteRange(rangeHeader, total);
  if (!parsed) {
    const headers = new Headers(full.headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Content-Length", String(total));
    return new Response(source, {
      status: full.status,
      statusText: full.statusText,
      headers,
    });
  }
  if (parsed.unsatisfiable) {
    await source.cancel();
    return new Response(null, {
      status: 416,
      headers: {
        "Content-Range": `bytes */${total}`,
        "Accept-Ranges": "bytes",
      },
    });
  }

  const headers = new Headers();
  const type = full.headers.get("content-type");
  if (type) headers.set("Content-Type", type);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Range", `bytes ${parsed.start}-${parsed.end}/${total}`);
  headers.set("Content-Length", String(parsed.end - parsed.start + 1));
  headers.set("Cache-Control", "private, no-store");
  const etag = full.headers.get("etag");
  if (etag) headers.set("ETag", etag);

  if (request.method === "HEAD") {
    await source.cancel();
    return new Response(null, { status: 206, headers });
  }

  return new Response(sliceStream(source, parsed.start, parsed.end), {
    status: 206,
    headers,
  });
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
    const onSite = url.hostname === "jacksonkubo.com" || url.hostname === "www.jacksonkubo.com";

    if (onSite && (url.protocol !== "https:" || url.hostname !== "www.jacksonkubo.com")) {
      const target = new URL(url);
      target.protocol = "https:";
      target.hostname = "www.jacksonkubo.com";
      return redirect(target.toString(), url.protocol === "https:");
    }

    if (
      (request.method === "GET" || request.method === "HEAD") &&
      needsTrailingSlash(url.pathname)
    ) {
      const target = new URL(url);
      target.pathname = `${url.pathname}/`;
      return redirect(target.toString(), url.protocol === "https:");
    }

    if (url.pathname === "/api/contact") {
      return applySecurity(await sendContact(request, env), url.protocol === "https:");
    }

    return applySecurity(await fetchAsset(request, env), url.protocol === "https:");
  },
};
