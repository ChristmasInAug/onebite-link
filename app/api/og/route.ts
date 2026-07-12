import { NextResponse, type NextRequest } from "next/server";

function isBlockedHost(hostname: string) {
  const lower = hostname.toLowerCase();
  if (lower === "localhost" || lower.endsWith(".localhost")) return true;
  if (lower === "::1" || lower === "[::1]") return true;

  const ipv4 = lower.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4) {
    const a = Number(ipv4[1]);
    const b = Number(ipv4[2]);
    if (a === 127 || a === 10 || a === 0) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
  }

  return false;
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractMetaTags(html: string) {
  const tags: Record<string, string> = {};
  const metaTagRegex = /<meta\s+[^>]*>/gi;

  for (const tag of html.match(metaTagRegex) ?? []) {
    const keyMatch = tag.match(/(?:property|name)=["']([^"']+)["']/i);
    const contentMatch = tag.match(/content=["']([^"']*)["']/i);
    if (keyMatch && contentMatch) {
      tags[keyMatch[1].toLowerCase()] = decodeHtmlEntities(contentMatch[1]);
    }
  }

  return tags;
}

function extractTitleTag(html: string) {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1]).trim() : "";
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "url is required" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (target.protocol !== "http:" && target.protocol !== "https:") {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  if (isBlockedHost(target.hostname)) {
    return NextResponse.json({ error: "invalid url" }, { status: 400 });
  }

  let response: Response;
  try {
    response = await fetch(target.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)",
        Accept: "text/html",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    return NextResponse.json(
      { error: "failed to fetch url" },
      { status: 502 },
    );
  }

  if (!response.ok) {
    return NextResponse.json(
      { error: "failed to fetch url" },
      { status: 502 },
    );
  }

  const html = await response.text();
  const tags = extractMetaTags(html);
  const finalUrl = new URL(response.url);

  const title = tags["og:title"] || extractTitleTag(html) || finalUrl.hostname;
  const description = tags["og:description"] || tags["description"] || "";
  const imageRaw = tags["og:image"] || tags["og:image:url"] || "";

  let image: string | undefined;
  if (imageRaw) {
    try {
      image = new URL(imageRaw, finalUrl).toString();
    } catch {
      image = undefined;
    }
  }

  return NextResponse.json({
    url: finalUrl.toString(),
    title,
    description,
    image,
  });
}
