import { getAssessments } from "@/app/actions/assessments";
import { getSemesters } from "@/app/actions/semesters";
import { getSections } from "@/app/actions/sections";
import { getCurrentUser } from "@/app/actions/auth";
import AssessmentCard from "./AssessmentCard";
import AssessmentFilterPanel from "./AssessmentFilterPanel";
import AddButton from "./AddButton";
import styles from "../assessments.module.css";

export default async function AssessmentsList({ searchParams }) {
  const params = await searchParams;
  const semesterId = params?.semesterId;
  const sectionCRN = params?.sectionCRN || "all";

  /*   console.log("AssessmentsList - Semester ID:", semesterId);
  console.log("AssessmentsList - Section CRN:", sectionCRN); */

  const user = await getCurrentUser();
  const semesters = await getSemesters();

  // Determine default semester
  const defaultSemester =
    semesterId || semesters.find((sem) => sem.isDefault)?.id;

  // Get initial sections for the default semester
  const initialSections = await getSections(defaultSemester, user);
  // Add "All Sections" option
  initialSections.unshift({
    crn: "all",
    courseCode: "All",
    courseName: "Sections",
  });

  // Get filtered assessments
  const assessments = await getAssessments(defaultSemester, sectionCRN);

  return (
    <div>
      <div className={styles["header-row"]}>
        <h1>Assessments</h1>
        {user?.isInstructor && <AddButton />}
      </div>

      <AssessmentFilterPanel
        semesters={semesters}
        initialSections={initialSections}
        defaultSemester={defaultSemester}
        defaultSection={sectionCRN}
      />

      {assessments.length === 0 ? (
        <div className={styles["no-assessments"]}>
          <h4>No assessments found!</h4>
        </div>
      ) : (
        <ul>
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              user={user}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
