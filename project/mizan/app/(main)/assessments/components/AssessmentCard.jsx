import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import CommentButton from "./CommentButton";
import styles from "../assessments.module.css";

export default function AssessmentCard({ user, assessment }) {
  const { isInstructor } = user;
  const { id, title, type, weight, effortHours, dueDate, section } = assessment;

  return (
    <div className={styles.card + " " + styles["card-buttons"]}>
      <div className={styles["card-details"]}>
        <h4 className={styles["card-header"]}>
          {section.crn} - {section.courseCode} {section.courseName}
        </h4>

        <div className={styles["assessment-details"]}>
          <div>{title}</div>
          <div className={styles["info-badge"]}>{type}</div>
          <div className={styles["info-badge"]}>{weight}%</div>
          <div className={styles["info-badge"]}>
            {effortHours} Effort Hour(s)
          </div>
        </div>
        <p className={styles.subheading}>
          Due on {new Date(dueDate).toLocaleDateString()}
        </p>
      </div>

      <div className={styles["button-group"]}>
        {isInstructor && (
          <>
            <UpdateButton assessmentId={id} semesterId={section.semester} />
            <DeleteButton assessmentId={id} />
          </>
        )}
        <CommentButton sectionCRN={section.crn} />
      </div>
    </div>
  );
}
