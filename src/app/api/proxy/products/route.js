// app/api/proxy/products/route.js
export async function GET() {
  try {
    const res = await fetch("http://157.230.240.97:9999/api/v1/shop/products");
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Products Proxy Error:", error);
    return new Response("Failed to fetch products", { status: 500 });
  }
}
