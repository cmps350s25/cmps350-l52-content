export async function GET(request) {
  try {
    const { searchParams } = request.nextUrl;
    const sortBy = searchParams.get("sortBy") || "default";

    const res = await fetch(
      `https://fakestoreapi.com/products?sortBy=${sortBy}`,
      {
        cache: "no-store", // Ensure fresh data (adjust as needed)
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const products = await res.json();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
