import { getCats } from "./cat-repo";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import { onDeleteCat } from "./actions";
import Link from "next/link";

export default async function CatsPage() {
  // Fetch data
  const cats = await getCats();
  //console.log("cats", cats);

  return (
    <div>
      <h2>Cats</h2>
      <Link className="button-link" href={`/cats/new`}>
        Add cat
      </Link>
      <br /> <br />
      <ul style={{ listStyle: "none" }}>
        {cats.map((cat) => (
          <li key={cat.id}>
            <img src={cat.imageUrl} width={150} />
            <br />
            <Link href={`/cats/${cat.id}`}>{cat.name}</Link>({cat.breed})
            <DeleteButton id={cat.id} onClicked={onDeleteCat} />
            <br />
            <LikeButton catId={cat.id} likesCount={cat.likes} />
            <br />
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
