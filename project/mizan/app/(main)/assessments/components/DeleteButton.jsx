"use client";
import { deleteAssessment } from "@/app/actions/assessments";
import { Trash2 } from "lucide-react";

export default function DeleteButton({ assessmentId }) {
  function handleDelete(assessmentId) {
    // confirmation dialog
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this assessment #${assessmentId}?`
    );
    if (confirmDelete) {
      deleteAssessment(assessmentId);
    }
  }
  return (
    <button
      className="action-button delete"
      onClick={() => handleDelete(assessmentId)}
    >
      <Trash2 />
      <span>Delete</span>
    </button>
  );
}
