import WorkloadBarChart from "./WorkloadBarChart";
import WorkloadSummaryList from "./WorkloadSummaryList";

export default async function WorkloadSummary({ workloadSummary }) {
  return (
    <>
      <h2>Workload Summary Report</h2>
      <WorkloadSummaryList workloadSummary={workloadSummary} />
      <WorkloadBarChart workloadSummary={workloadSummary} />
    </>
  );
}
