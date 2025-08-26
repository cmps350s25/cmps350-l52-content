"use server";
import { revalidatePath } from "next/cache";
import { likeCat, upsertCat, saveFile, deleteCat } from "./cat-repo";
import { redirect } from "next/navigation";

export async function onLikeCat(catId) {
  console.log("onLikeCat - catId", catId);
  return await likeCat(catId);
}

export async function onUpsertCat(formData) {
  try {
    console.log("onUpsertCat - formData:", formData);

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
    //return NextResponse.redirect(new URL("/cats", request.url));
    revalidatePath("/cats");
    redirect("/cats");
  } catch (error) {
    console.error("Error saving cat:", error.message);
    throw error;
  }
}

export async function onDeleteCat(catId) {
  console.log("onDeleteCat - catId", catId);
  deleteCat(catId);
  revalidatePath("/cats");
}
