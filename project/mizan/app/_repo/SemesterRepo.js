import fs from "fs-extra";
import path from "path";

// Define path to semesters data file
const semesterFilePath = path.join(process.cwd(), "data/semesters.json");

export async function getSemesters() {
  return fs.readJson(semesterFilePath);
}

export async function getDefaultSemesterId() {
  const semesters = await getSemesters();
  const defaultSemester = semesters.find(semester => semester.isDefault);
  return defaultSemester?.id || null;
}
