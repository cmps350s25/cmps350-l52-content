import WorkloadSummary from "./components/WorkloadSummary";
import { getAssessmentSummary } from "@/app/actions/assessments";
import styles from "./report.module.css";

export default async function ReportPage() {
  const workloadSummary = await getAssessmentSummary();
  return (
    <main className={styles.reportContainer}>
      <WorkloadSummary workloadSummary={workloadSummary} />
    </main>
  );
}
