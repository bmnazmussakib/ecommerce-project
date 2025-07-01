// app/api/proxy/product/[slug]/route.js
export async function GET(request, { params }) {
  const { slug } = params;

  try {
    const res = await fetch(`http://157.230.240.97:9999/api/v1/product/${slug}`);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.error("Single Product Proxy Error:", error);
    return new Response("Failed to fetch product", { status: 500 });
  }
}
