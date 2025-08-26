import { getPosts } from "./repo/posts-repo";
import styles from "./posts.module.css";
import Link from "next/link";

export default async function Posts() {
  const posts = await getPosts();

  if (!posts || posts.length === 0) {
    return <div>No posts available</div>;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts</h1>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <li key={post.id}>
            <span className={styles.postTitle}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </span>
            <span className={styles.postAuthor}>by {post.author.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
