import { addComment } from "@/app/actions/comments";
import { useId } from "react";
import styles from "../comments.module.css";

export default function CommentForm({ sectionCRN }) {
  const titleId = useId();
  const contentId = useId();

  return (
    <div className={styles.commentForm}>
      <h3 className={styles.formTitle}>Add a new comment</h3>
      <form action={addComment}>
        <input type="hidden" name="sectionCRN" value={sectionCRN} />
        <div className={styles.field}>
          <label className={styles.label} htmlFor={titleId}>
            Title
          </label>
          <input
            id={titleId}
            className={styles.input}
            type="text"
            name="title"
            placeholder="Enter a title for your comment"
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor={contentId}>
            Comment
          </label>
          <textarea
            id={contentId}
            className={styles.textarea}
            name="content"
            placeholder="Write your comment here..."
            required
          ></textarea>
        </div>

        <button type="submit" className={styles.button}>
          Post Comment
        </button>
      </form>
    </div>
  );
}
