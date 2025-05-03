"use client";
import { useRouter } from "next/navigation";
import { MessageSquareQuote } from "lucide-react";

export default function CommentButton({ sectionCRN }) {
  const router = useRouter();
  function handleComments() {
    router.push(`/comments/?sectionCRN=${sectionCRN}`);
  }

  return (
    <button
      className="action-button update"
      onClick={() => handleComments(sectionCRN)}
    >
      <MessageSquareQuote />
      <span>Comments</span>
    </button>
  );
}
