import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";

// app/blogs/[id]/route.js
/* export async function GET(request, { params }) {
  const id = (await params).id;
  return new Response(`Blog id# ${id}`)
} */

/*   import { headers } from "next/headers";

  export async function GET(request) {
    const headersList = await headers();
    const apiKey = headersList.get("apiKey");
  
    return new Response("Hello, Next.js!", {
      status: 200,
      headers: { apiKey: apiKey || "No API Key" },
    });
  }
 */

export async function GET(request, { params }) {
  // 1. Using 'next/headers' helpers
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  // Check if the token exists
  if (!token) {
    redirect("/login.html");
    return;
  }

  const headersList = await headers();
  const apikey = headersList.get("apiKey");

  // 2. Using the standard Web APIs
  const userAgent = request.headers.get("user-agent");

  return new Response(
    JSON.stringify({
      content: `Blogs for ${(await params).year}!`,
      token,
      apikey: apikey,
      userAgent,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
