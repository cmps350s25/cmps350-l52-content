// app/posts/page.jsx
import {getPosts} from "@/lib/db";
import { toggleLikeAction } from '@/app/actions/postActions.js'; // Use .js
import styles from './PostsPage.module.css';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts (Toggle Example)</h1>
      <ul className={styles.list}>
        {posts.map((post) => ( // post is implicitly any
          <li key={post.id} className={styles.listItem}>
             {/* Structure remains the same */}
            <span>{post.title}</span>
            <div className={styles.postInfo}>
              <span>Likes: {post.likes}</span>
              <form action={toggleLikeAction}>
                <input type="hidden" name="postId" value={post.id} />
                <button type="submit" className={styles.likeButton}>
                  Like
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}