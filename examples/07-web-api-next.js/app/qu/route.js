import { redirect } from "next/navigation";

// path: /qu
export async function GET(request) {
  redirect("https://www.qu.edu.qa");
}
