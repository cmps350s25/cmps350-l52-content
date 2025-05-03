import AssessmentsList from "./components/AssessmentsList";
import "./assessments.module.css";

export default function AssessmentsPage({ searchParams }) {
  return <AssessmentsList searchParams={searchParams} />;
}
