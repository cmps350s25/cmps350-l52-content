import { onUpsertCat } from "../actions";
import { getCat } from "../cat-repo";
import LikeButton from "../LikeButton";

export default async function CatForm({ params }) {
  // Fetch data
  const { id } = await params;
  console.log("CatForm - cat id", id);

  // In case of update get the cat details
  let cat;
  if (id && id !== "new") {
    cat = await getCat(id);
    console.log("CatForm - cat", cat);
  }

  return (
    <div className="center">
      {cat ? <h3>Edit Cat {cat?.name}</h3> : <h3>Add Cat</h3>}
      <br />
      {cat ? <img src={cat?.imageUrl} width={150} /> : ""}
      {/* encType="multipart/form-data" */}
      <form action={onUpsertCat}>
        <input name="id" type="hidden" defaultValue={cat?.id ?? 0} />
        <label>Name</label>
        <input name="name" type="text" defaultValue={cat?.name} />
        <label>Breed </label>
        <input name="breed" type="text" defaultValue={cat?.breed} />
        <label>Image</label>
        <input type="file" name="fileToUpload" />
        <br />
        <button type="submit" className="blue-button">
          Submit
        </button>
      </form>
      <br />
      {/* When updating a cat show the Like button */}
      {cat && <LikeButton catId={cat?.id} likesCount={cat?.likes} />}
    </div>
  );
}
