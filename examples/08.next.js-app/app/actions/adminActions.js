// app/actions/adminActions.js
"use server";

import { revalidatePath } from "next/cache";
import * as db from "@/lib/db"; 

export async function triggerReportAction(prevState, formData) {
  // Removed types
  const reportType = formData.get("reportType"); // Removed 'as string'

  if (!reportType) {
    return { message: "Report type missing." };
  }

  console.log(`SERVER ACTION: Requesting report generation for ${reportType}`);
  try {
    const success = await db.triggerReportGeneration(reportType);
    if (success) {
      // revalidatePath('/admin');
      return { message: `Report generation started for ${reportType}.` };
    } else {
      return {
        message: `Failed to start report generation for ${reportType}.`,
      };
    }
  } catch (error) {
    console.error(
      `SERVER ACTION ERROR: Failed during report generation for ${reportType}:`,
      error
    );
    return { message: "Server error during report generation." };
  }
}
