export async function GET() {
  const data = {
    message: "Cached response example",
    date: new Date().toLocaleString("en-GB", { timeZone: "Asia/Qatar" }),
  };

  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      // Cache for 1 hour (3600 seconds)
      "Cache-Control": "max-age=3600",
    },
  });
}
