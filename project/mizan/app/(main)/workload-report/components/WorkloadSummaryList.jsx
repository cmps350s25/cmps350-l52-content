import React from "react";
import styles from "./WorkloadSummaryList.module.css";

export default async function WorkloadSummaryList({ workloadSummary }) {
  // Process and group the data by course
  const sectionMap = new Map();

  workloadSummary.forEach((item) => {
    const { sectionCRN, courseName, count, effortHours } = item;

    if (!sectionMap.has(sectionCRN)) {
      sectionMap.set(sectionCRN, {
        crn: sectionCRN,
        courseName: courseName,
        homework: { count: 0, hours: 0 },
        quiz: { count: 0, hours: 0 },
        project: { count: 0, hours: 0 },
        exams: { count: 0, hours: 0 },
        totalAssessments: 0,
        totalEffortHours: 0,
      });
    }

    const section = sectionMap.get(sectionCRN);

    // Update the appropriate assessment type
    switch (item.type.toLowerCase()) {
      case "homework":
        section.homework.count += count;
        section.homework.hours += effortHours;
        break;
      case "quiz":
        section.quiz.count += count;
        section.quiz.hours += effortHours;
        break;
      case "project":
        section.project.count += count;
        section.project.hours += effortHours;
        break;
      case "midterm":
      case "final":
        section.exams.count += count;
        section.exams.hours += effortHours;
        break;
      default:
        break;
    }

    // Update totals
    section.totalAssessments += count;
    section.totalEffortHours += effortHours;
  });

  // Convert map to array for rendering
  const summaries = Array.from(sectionMap.values());

  return (
    <div className={styles.container}>
      <table className={styles.summaryTable}>
        <thead>
          <tr>
            <th rowSpan={2}>CRN</th>
            <th rowSpan={2}>Course Name</th>
            <th colSpan={4}>Summary - Count (Hours)</th>
            <th rowSpan={2}>Assessments Count</th>
            <th rowSpan={2}>Total Effort Hours</th>
          </tr>
          <tr>
            <th>Homework</th>
            <th>Quizzes</th>
            <th>Project Phases</th>
            <th>Exams</th>
          </tr>
        </thead>
        <tbody>
          {summaries.map((s) => (
            <tr key={s.crn}>
              <td>{s.crn}</td>
              <td>{s.courseName}</td>
              <td>
                {s.homework.count} ({s.homework.hours})
              </td>
              <td>
                {s.quiz.count} ({s.quiz.hours})
              </td>
              <td>
                {s.project.count} ({s.project.hours})
              </td>
              <td>
                {s.exams.count} ({s.exams.hours}){" "}
              </td>
              <td>{s.totalAssessments}</td>
              <td>{s.totalEffortHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
