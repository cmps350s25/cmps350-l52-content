import AssessmentForm from "../components/AssessmentForm";

export default async function AssessmentEditor({ params, searchParams }) {
  const queryParams = await searchParams;
  const semesterId = queryParams?.semesterId;
  console.log("AssessmentEditor - Semester ID:", semesterId);

  const { id } = await params;
  console.log("AssessmentEditor - Assessment ID:", id);

  return <AssessmentForm assessmentId={id} semesterId={semesterId} />;
}
