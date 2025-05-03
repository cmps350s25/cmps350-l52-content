"use client";

import { useState } from "react";
import { deleteComment } from "@/app/actions/comments";
import styles from "../comments.module.css";

export default function DeleteButton({
  commentId,
  sectionCRN,
  isReply = false,
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (
      !confirm(
        `Are you sure you want to delete this ${isReply ? "reply" : "comment"}?`
      )
    ) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteComment(commentId, sectionCRN);
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      className={styles.deleteButton}
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label={`Delete ${isReply ? "reply" : "comment"}`}
      title={`Delete ${isReply ? "reply" : "comment"}`}
    >
      {isDeleting ? (
        <span className={styles.spinner}></span>
      ) : (
        <i className="bi bi-trash3"></i>
      )}
    </button>
  );
}
