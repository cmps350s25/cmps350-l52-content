// Example Url http://localhost:3000/api/blogs/2025/3/web-dev/next.js?sort=date
export async function GET(request, { params }) {
  // In the context of a Web API, a slug is a URL-friendly identifier,
  // usually derived from a resource's title or name
  // /api/products/smartphone-case
  const { slug } = await params; // Extract slug from params
  const { searchParams } = request.nextUrl; // Extract searchParams from request
  console.log("searchParams", searchParams);
  const sort = searchParams.get("sort") || "date"; // Get the value of the 'sort' parameter
  const page = searchParams.get("page") || 1; // Get the value of the 'summaryOnly' parameter
  console.log("sort", sort);

  

  return new Response(`Blogs for ${slug}
   Sort by: ${sort}
   Page: ${page}`);
}
