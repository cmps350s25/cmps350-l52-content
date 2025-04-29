import { upsertCat } from "@/app/cats/cat-repo";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const formData = await request.formData();
    //console.log("/cats POST - formData:", formData)

    const { id, name, breed } = Object.fromEntries(formData.entries());
    const cat = { id, name, breed };

    const file = formData.get("fileToUpload");
    if (file && file.size > 0) {
      console.log("cat image file", file);
      const imageUrl = await saveFile(file);
      cat.imageUrl = imageUrl;
    }
    console.log("/cats POST - cat:", cat);
    upsertCat(cat);

    // Return a redirect response so that the redirect
    // happens on the client side
    return NextResponse.redirect(new URL("/cats", request.url));
  } catch (error) {
    console.error("Error saving cat:", error);
    throw error;
  }
}

async function saveFile(file) {
  try {
    const uploadFileName = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;
    const uploadDir = path.join(
      process.cwd(),
      "/public/uploads",
      uploadFileName
    );
    const fileContent = Buffer.from(await file.arrayBuffer());
    await writeFile(uploadDir, fileContent);
    return `/uploads/${uploadFileName}`;
  } catch (error) {
    console.error("Error saving file:", error);
  }
}
