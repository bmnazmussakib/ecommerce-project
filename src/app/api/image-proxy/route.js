import { NextResponse } from "next/server";

export async function GET(request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  try {
    const proxyRes = await fetch(`http://157.230.240.97:8888${path}`);

    if (!proxyRes.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: proxyRes.status });
    }

    const contentType = proxyRes.headers.get("content-type");
    const stream = proxyRes.body;

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": contentType || "image/jpeg",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
