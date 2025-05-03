import CommentItem from "./CommentItem";
import styles from "../comments.module.css";

export default function CommentsList({ comments }) {
  // Filter top-level comments (those without replyToCommentId)
  const topLevelComments = comments.filter(
    (comment) => !comment.replyToCommentId
  );

  // Group replies by their parent comment ID
  const repliesByParentId = comments.reduce((acc, comment) => {
    if (comment.replyToCommentId) {
      if (!acc[comment.replyToCommentId]) {
        acc[comment.replyToCommentId] = [];
      }
      acc[comment.replyToCommentId].push(comment);
    }
    return acc;
  }, {});

  return (
    <div className={styles.commentsList}>
      {topLevelComments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replies={repliesByParentId[comment.id] || []}
        />
      ))}
    </div>
  );
}
