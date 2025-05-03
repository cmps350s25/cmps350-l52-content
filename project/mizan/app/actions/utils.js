import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function isSameDate(date1, date2) {
  return (
    new Date(date1).toISOString().split("T")[0] ===
    new Date(date2).toISOString().split("T")[0]
  );
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
