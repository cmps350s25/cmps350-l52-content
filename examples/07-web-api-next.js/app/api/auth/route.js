import { cookies, headers } from "next/headers";

export function GET(request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request) {
  //const { email, password } = await request.json();
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const user = verifyUser(email, password);
  if (user) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: JSON.stringify(user),
      // The cookie will expire in 1 day
      maxAge: 60 * 60 * 24, // 1 day
      httpOnly: true, // The cookie is not accessible via JavaScript
      path: "/", // The cookie is accessible on all paths
    });

    return new Response(JSON.stringify({ message: `Welcome ${user.name}` }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function verifyUser(email, password) {
  // Dummy verification logic
  // In a real application, you would check the credentials against a database
  if (Math.random() > 0.5) {
    return {
      id: 1,
      name: "John Doe",
      email: email,
    };
  } else {
    return null;
  }
}
