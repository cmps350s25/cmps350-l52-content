"use client";
import { useRouter } from "next/navigation";
import { SquarePen } from "lucide-react";

export default function UpdateButton({ assessmentId, semesterId }) {
  const router = useRouter();
  function handleUpdate() {
    router.push(`/assessments/${assessmentId}?semesterId=${semesterId}`);
  }

  return (
    <button
      className="action-button update"
      onClick={() => handleUpdate(assessmentId)}
    >
      <SquarePen />
      <span>Update</span>
    </button>
  );
}
