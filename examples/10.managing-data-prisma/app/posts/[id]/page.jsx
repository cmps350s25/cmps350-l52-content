import { notFound } from "next/navigation";
import { getPost } from "../repo/posts-repo";
import styles from "../posts.module.css";

export default async function Post({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className={styles.postContainer}>
      <article className={styles.postArticle}>
        <h1 className={styles.postHeading}>{post.title}</h1>
        <p className={styles.postByline}>by {post.author.name}</p>
        <div className={styles.postContent}>
          {post.content || "No content available."}
        </div>
      </article>
    </div>
  );
}
