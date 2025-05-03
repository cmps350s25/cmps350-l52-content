import CommentActions from "./CommentActions";
import DeleteButton from "./DeleteButton";
import styles from "../comments.module.css";

export default function CommentItem({ comment, replies }) {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentHeader}>
        <div className={styles.commentTitle}>{comment.title}</div>
        <DeleteButton commentId={comment.id} sectionCRN={comment.sectionCRN} />
      </div>

      <div className={styles.commentContent}>{comment.content}</div>
      <div className={styles.commentContent}>
        Posted by {comment.authorName} on {comment.createdDate}
      </div>

      <CommentActions
        commentId={comment.id}
        sectionCRN={comment.sectionCRN}
        replies={replies}
      />
    </div>
  );
}
