import DeleteButton from "./DeleteButton";
import styles from "../comments.module.css";

export default function CommentReplies({ replies = [], sectionCRN }) {
  // Check if there are no replies
  if (!replies || replies.length === 0) {
    return null;
  }

  return (
    <ul className={styles.replyList}>
      {replies.map((reply) => (
        <li key={reply.id} className={styles.replyItem}>
          <div className={styles.replyHeader}>
            <div className={styles.replyTitle}>{reply.content}</div>
            <DeleteButton
              commentId={reply.id}
              sectionCRN={sectionCRN}
              isReply={true}
            />
          </div>
          <div className={styles.replyContent}>
            Post by {reply.authorName} on {reply.createdDate}
          </div>
        </li>
      ))}
    </ul>
  );
}
