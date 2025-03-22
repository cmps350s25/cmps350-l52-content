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
    return new Response(JSON.stringify(user), {
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
