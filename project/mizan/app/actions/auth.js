"use server";

import userRepo from "@/app/_repo/UserRepo";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

export async function login(prevState, formData) {
  const email = formData.get?.("email");
  const password = formData.get?.("password");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  let user;
  try {
    user = await userRepo.login(email, password);
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
  // Create a JWT token
  const token = jwt.sign(user, process.env.JWT_SECRET || "your-secret-key", {
    expiresIn: "24h",
  });

  // Set the JWT token in a cookie
  cookies().set("auth_token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  redirect("/assessments");
  //return user;
}

// Get the current user from the JWT token stored in cookies
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return null;
    //throw new Error("Authentication token is missing.");
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new Error(`Invalid auth token: ${error.message}`);
  }
}

/**
 * Logs out the current user by clearing the authentication cookie
 */
export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
  redirect("/login");
}
