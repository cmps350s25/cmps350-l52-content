"use server";

import sectionRepo from "../_repo/SectionRepo";
import { getCurrentUser } from "./auth";
import {
  getDefaultSemesterId,
  getSemesters as fetchSemesters,
} from "@/app/_repo/SemesterRepo";

export async function getSections(semesterId, user) {
  try {
    if (!user) {
      user = await getCurrentUser();
    }

    if (!semesterId) {
      semesterId = await getDefaultSemesterId();
    }

    const sections = await sectionRepo.getSections(user, semesterId);
    return sections || [];
  } catch (error) {
    console.error("Error fetching sections:", error);
    throw new Error(`Failed to retrieve sections. ${error.message}`);
  }
}

export async function getSemesters() {
  try {
    const semesters = await fetchSemesters();
    return semesters;
  } catch (error) {
    console.error("Error fetching semesters:", error);
    throw new Error(`Failed to retrieve semesters. ${error.message}`);
  }
}
