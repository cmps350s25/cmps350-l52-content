import { onAddPost } from "@/app/posts/actions";
import styles from "../posts.module.css";

export default function NewPost() {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Create New Post</h1>
      <form action={onAddPost} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.formLabel}>
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter your post title"
            className={styles.formInput}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content" className={styles.formLabel}>
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here..."
            rows={6}
            className={styles.formTextarea}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Post
        </button>
      </form>
    </div>
  );
}
