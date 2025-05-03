import {
  getAssessmentTypes,
  getAssessmentById,
  upsertAssessment,
} from "@/app/actions/assessments";
import { getSemesters } from "@/app/actions/semesters";
import { getSections } from "@/app/actions/sections";
import { getCurrentUser } from "@/app/actions/auth";
import styles from "./AssessmentForm.module.css";
import AssessmentTypeSelector from "./AssessmentTypeSelector";
import SemesterSelector from "./SemesterSelector";
import SectionSelector from "./SectionSelector";

export default async function AssessmentForm({ assessmentId, semesterId }) {
  const today = new Date();
  let dueDate = new Date(today.setDate(today.getDate() + 7))
    .toISOString()
    .split("T")[0];

  // Get current user to fetch their sections
  const user = await getCurrentUser();

  let assessment;
  if (assessmentId && assessmentId !== "new") {
    console.log("Update Assessment ID: " + assessmentId);
    assessment = await getAssessmentById(assessmentId);
    if (assessment?.dueDate) {
      dueDate = new Date(assessment.dueDate).toISOString().split("T")[0];
    }
  }

  console.log("AssessmentForm - Assessment:", assessment);

  const assessmentTypes = await getAssessmentTypes();
  const semesters = await getSemesters();

  // Get the default semester (either from the assessment or the one with isDefault=true)
  const defaultSemester =
    semesterId || semesters.find((sem) => sem.isDefault)?.id;

  console.log("Default Semester ID: ", defaultSemester);

  // Fetch sections for the default semester
  const sections = await getSections(defaultSemester, user);
  //console.log("Sections for default semester:", sections);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {assessment?.id ? "Update" : "Add"} Assessment
      </h2>
      <form className={styles.form} action={upsertAssessment}>
        <input type="hidden" name="id" defaultValue={assessment?.id || ""} />

        <SemesterSelector
          semesters={semesters}
          defaultSemester={defaultSemester}
          // Dissabled to keep it simple for now
          disabled={true}
          //disabled={!!assessmentId}
          required={true}
        />

        <SectionSelector
          sections={sections}
          defaultSection={assessment?.sectionCRN}
          //disabled={!!assessmentId}
          required={true}
        />

        <AssessmentTypeSelector
          assessmentTypes={assessmentTypes}
          defaultValue={assessment?.type || ""}
        />

        <div className={styles.field}>
          <label className={styles.label} htmlFor="title-input">
            Title
          </label>
          <input
            className={styles.input}
            id="title-input"
            type="text"
            name="title"
            disabled={assessment?.id ? false : true}
            defaultValue={
              assessment?.id ? assessment?.title : "Will be assigned on save"
            }
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="effort-input">
            Effort Hours
          </label>
          <input
            className={styles.input}
            id="effort-input"
            type="number"
            min={1}
            max={40}
            name="effortHours"
            defaultValue={assessment?.effortHours || ""}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="weight-input">
            Weight
          </label>
          <input
            className={styles.input}
            id="weight-input"
            type="number"
            min={1}
            max={100}
            name="weight"
            defaultValue={assessment?.weight || ""}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="due-date-input">
            Due Date
          </label>
          <input
            className={styles.input}
            id="due-date-input"
            type="date"
            name="dueDate"
            defaultValue={dueDate}
            required
          />
        </div>

        <button className={styles.button} type="submit">
          {assessment?.id ? "Update" : "Add"} Assessment
        </button>
      </form>
    </div>
  );
}
