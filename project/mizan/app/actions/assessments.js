"use server";

import assessmentRepo from "@/app/_repo/AssessmentRepo";
import { getCurrentUser } from "./auth";
import { getDefaultSemesterId } from "@/app/_repo/SemesterRepo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAssessmentTypes() {
  try {
    return await assessmentRepo.getAssessmentTypes();
  } catch (error) {
    console.error("Error fetching assessment types:", error);
    throw new Error(`Failed to retrieve assessment types. ${error.message}`);
  }
}

export async function getAssessmentsBySection(sectionCRN) {
  try {
    return await assessmentRepo.getAssessmentsBySection(sectionCRN);
  } catch (error) {
    // Log detailed error on the server for diagnostics
    console.error(
      `Error fetching assessments for section ${sectionCRN}:`,
      error
    );
    // Throw a generic error to the client
    throw new Error(`Failed to retrieve assessments. ${error.message}`);
  }
}

export async function getAssessments(semesterId, sectionCRN) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // Get default semester if not provided
    if (!semesterId) {
      semesterId = await getDefaultSemesterId();
    }

    // get assessments for the user, semester, and sectionCRN
    return await assessmentRepo.getAssessments(user, semesterId, sectionCRN);
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error(`Failed to retrieve assessments. ${error.message}`);
  }
}

export async function getAssessmentById(assessmentId) {
  try {
    return await assessmentRepo.getAssessmentById(assessmentId);
  } catch (error) {
    console.error(`Error fetching assessment ${assessmentId}:`, error);
    throw new Error(`Failed to retrieve assessment details. ${error.message}`);
  }
}

export async function getAssessmentSummary(semesterId, sectionCRN) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not authenticated.");
    }

    // Get default semester if not provided
    if (!semesterId) {
      semesterId = await getDefaultSemesterId();
    }

    // get assessments for the user, semester, and sectionCRN
    return await assessmentRepo.getAssessmentSummary(
      user,
      semesterId,
      sectionCRN
    );
  } catch (error) {
    console.error("Error fetching assessment summary:", error);
    throw new Error(`Failed to retrieve assessment summary. ${error.message}`);
  }
}

export async function upsertAssessment(formData) {
  const assessment = Object.fromEntries(formData.entries());

  for (const key in assessment) {
    // Remove property starting with $ACTION_ID
    if (key.startsWith("$ACTION_ID")) {
      delete assessment[key];
    }
    // Convert string values to numbers if they are numeric
    if (!isNaN(assessment[key]) && assessment[key] !== "") {
      assessment[key] = Number(assessment[key]);
    }
  }

  console.log("Upserting assessment:", assessment);
  //return;
  try {
    if (assessment.id && assessment.id !== "") {
      // For update, we omitted validation
      // to keep it simple for now
      await assessmentRepo.updateAssessment(assessment);
    } else {
      if (await validateAssessment(assessment)) {
        // Generate title based on sectionCRN and type
        assessment.title = await assessmentRepo.generateAssessmentTitle(
          assessment.sectionCRN,
          assessment.type
        );

        await assessmentRepo.addAssessment(assessment);
      }
    }
  } catch (error) {
    console.error(
      `Error upserting assessment ${assessment.id}: ${error.message}`
    );
    throw new Error(`Failed to upsert the assessment. ${error.message}`);
  }
  // Revalidate the assessments page to reflect the changes
  revalidatePath("/assessments");
  redirect("/assessments");
}

export async function deleteAssessment(assessmentId) {
  try {
    await assessmentRepo.deleteAssessment(assessmentId);
    revalidatePath("/assessments"); // Revalidate the assessments page to reflect the changes
    //return { success: `Assesment ${assessmentId} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting assessment ${assessmentId}:`, error);
    throw new Error(`Failed to delete the assessment. ${error.message}`);
  }
}

async function validateAssessment(assessment) {
  const { sectionCRN, type } = assessment;

  let assessmentsCount = await assessmentRepo.countAssessmentsByType(
    sectionCRN,
    type
  );

  // Reduce the count by 1 if updating an existing assessment
  if (assessmentsCount > 0 && type === "final") {
    throw new Error("Only one final exam is allowed per section.");
  }

  if (assessmentsCount >= 2 && type === "midterm") {
    throw new Error("At most two midterm exams are allowed per section.");
  }

  if (assessmentsCount >= 8 && type === "homework") {
    throw new Error("Maximum 6 homework assignments allowed per section.");
  }

  if (assessmentsCount >= 8 && type === "quiz") {
    throw new Error("Maximum 6 quizzes allowed per section.");
  }

  if (assessmentsCount >= 3 && type === "project") {
    throw new Error("Maximum 3 project phases allowed per section.");
  }

  await validateDueDate(assessment);

  return true;
}

async function validateDueDate(assessment) {
  const { sectionCRN, dueDate } = assessment;
  const assessmentsCount = await assessmentRepo.countAssessmentsByDueDate(
    sectionCRN,
    dueDate
  );
  if (assessmentsCount > 0) {
    throw new Error("Another assessment already has this due date.");
  }
  return true;
}
