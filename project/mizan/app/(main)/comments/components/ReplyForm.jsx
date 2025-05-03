import { addComment } from "@/app/actions/comments";
import { useId } from "react";
import styles from "../comments.module.css";

export default function ReplyForm({ commentId, sectionCRN, onCancel }) {
  const contentId = useId();

  return (
    <div className={styles.replyForm}>
      <form action={addComment}>
        <input type="hidden" name="sectionCRN" value={sectionCRN} />
        <input type="hidden" name="replyToCommentId" value={commentId} />

        <div className={styles.field}>
          <label className={styles.label} htmlFor={contentId}>
            Reply
          </label>
          <textarea
            id={contentId}
            className={styles.textarea}
            name="content"
            placeholder="Write your reply here..."
            required
          ></textarea>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit" className={styles.button}>
            Post Reply
          </button>
          <button
            type="button"
            className={styles.replyButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
