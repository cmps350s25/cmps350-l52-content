export function GET(request) {
  return new Response("Hello, Next.js!");
}

export async function POST(request) {
  const { email, password } = await request.json();

  // Simulate a database check
  if (email === "test@next.js" && password === "pass123") {
    return new Response(JSON.stringify({ message: "Login successful!" }), {
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
