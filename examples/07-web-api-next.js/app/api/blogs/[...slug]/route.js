// Example Url http://localhost:3000/api/blogs/2025/3/web-dev/next.js?sortBy=date
export async function GET(request, { params }) {
  // In the context of a Web API, a slug is a URL-friendly identifier,
  // usually derived from a resource's title or name
  // /api/products/smartphone-case
  const { slug } = await params; // Extract slug from params
  const { searchParams } = request.nextUrl;
  return new Response(`Blogs for ${slug}
   Sort by: ${searchParams.get("sortBy")}`);
}
