export async function GET(request, { params }) {
  const searchParams = request.nextUrl.searchParams;

  return new Response(`Blogs for ${params.filter} 
   sortBy: ${searchParams.get("sortBy")}`);
}
