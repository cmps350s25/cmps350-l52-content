"use client";
import { useRouter } from "next/navigation";
import { CalendarPlus2 } from "lucide-react";

export default function AddButton() {
  const router = useRouter();
  function handleAdd() {
    router.push(`/assessments/new`);
  }

  return (
    <button className="action-button update" onClick={() => handleAdd()}>
      <CalendarPlus2 />
      <span>Add</span>
    </button>
  );
}
