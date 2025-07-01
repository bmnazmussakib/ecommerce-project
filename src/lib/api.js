

// const BASE_URL = "http://157.230.240.97:9999/api/v1";
const BASE_URL = "/api/proxy";


export async function fetchCategories() {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("fetchCategories error:", error);
    return [];
  }
}


export async function fetchProducts() {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
}


export async function fetchProductBySlug(slug) {
  try {
    const res = await fetch(`${BASE_URL}/product/${slug}`);
    const json = await res.json();
    // Fix: return only the array
    return json.data || [];
  } catch (error) {
    console.error("fetchProductBySlug error:", error);
    return null;
  }
}


export async function fetchRelatedProducts(categorySlug) {
  try {
    const res = await fetch(`${BASE_URL}/shop/products`);
    if (!res.ok) throw new Error("Failed to fetch related products");

    const all = await res.json();
    return all?.filter((item) => item?.category?.slug === categorySlug);
  } catch (error) {
    console.error("fetchRelatedProducts error:", error);
    return [];
  }
}
