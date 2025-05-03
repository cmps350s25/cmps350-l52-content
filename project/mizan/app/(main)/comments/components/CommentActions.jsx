"use client";

import { useState } from "react";
import ReplyForm from "./ReplyForm";
import CommentReplies from "./CommentReplies";
import styles from "../comments.module.css";

export default function CommentActions({
  commentId,
  sectionCRN,
  replies = [],
}) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(replies.length < 5); // Auto-show if few replies

  return (
    <>
      <div className={styles.actionsContainer}>
        <button
          className={styles.replyButton}
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          {showReplyForm ? "Cancel" : "Reply"}
        </button>

        {replies.length > 0 && !showReplies && (
          <button
            className={styles.viewReplies}
            onClick={() => setShowReplies(true)}
          >
            <i className="bi bi-caret-down-fill"></i>
            View {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </button>
        )}

        {replies.length > 0 && showReplies && (
          <button
            className={styles.viewReplies}
            onClick={() => setShowReplies(false)}
          >
            <i className="bi bi-caret-up-fill"></i>
            Hide replies
          </button>
        )}
      </div>

      {showReplyForm && (
        <ReplyForm
          commentId={commentId}
          sectionCRN={sectionCRN}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {showReplies && replies.length > 0 && (
        <CommentReplies replies={replies} sectionCRN={sectionCRN} />
      )}
    </>
  );
}
