"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Workload Summary Bar Chart",
    },
    datalabels: {
      anchor: "center",
      align: "center",
      formatter: Math.round,
      font: {
        weight: "bold",
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Effort Hours",
      },
    },
    x: {
      title: {
        display: true,
        text: "Section CRN",
      },
    },
  },
};

export default function WorkloadBarChart({ workloadSummary }) {
  const sectionCRNs = workloadSummary.map((item) => item.sectionCRN);
  const uniqueSectionCRNs = [...new Set(sectionCRNs)];

  // Calculate total effort hours per sectionCRN
  const effortPerSection = workloadSummary.reduce(
    (acc, { sectionCRN, effortHours }) => {
      acc[sectionCRN] = (acc[sectionCRN] || 0) + effortHours;
      return acc;
    },
    {}
  );

  const data = {
    labels: uniqueSectionCRNs,
    datasets: [
      {
        label: "Effort Hours",
        data: Object.values(effortPerSection),
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
