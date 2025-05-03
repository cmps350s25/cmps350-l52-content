"use server";

import path from "path";
import fs from "fs/promises";

const dataDirectory = path.join(process.cwd(), "data");

export async function getSemesters() {
  try {
    const filePath = path.join(dataDirectory, "semesters.json");
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error fetching semesters:", error);
    return [];
  }
}

export async function getDefaultSemester() {
  try {
    const semesters = await getSemesters();
    return semesters.find((semester) => semester.isDefault) || semesters[0];
  } catch (error) {
    console.error("Error fetching default semester:", error);
    return null;
  }
}
