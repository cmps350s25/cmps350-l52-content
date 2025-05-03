"use client";

import { getSections } from "@/app/actions/sections";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SemesterSelector from "./SemesterSelector";
import SectionSelector from "./SectionSelector";
import styles from "./AssessmentFilterPanel.module.css";

export default function AssessmentFilterPanel({
  semesters,
  initialSections,
  defaultSemester,
  defaultSection,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSemester, setSelectedSemester] = useState(
    defaultSemester || ""
  );

  const [sections, setSections] = useState(initialSections || []);
  const [selectedSection, setSelectedSection] = useState(defaultSection || "");
  const [isLoading, setIsLoading] = useState(false);

  // Handle semester change
  const handleSemesterChange = async (semesterId) => {
    setSelectedSemester(semesterId);
    setSelectedSection(""); // Reset section when semester changes

    console.log("Selected Semester ID:", semesterId);
    if (!semesterId) return;

    setIsLoading(true);
    try {
      // Use getSections server action to fetch sections
      const sectionsData = await getSections(semesterId);
      sectionsData.unshift({
        crn: "all",
        courseCode: "All",
        courseName: "Sections",
      }); // Add "All Sections" option
      setSections(sectionsData);
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle section change
  const handleSectionChange = (sectionId) => {
    setSelectedSection(sectionId);
  };

  // Update URL when both semester and section are selected
  useEffect(() => {
    if (selectedSemester && selectedSection) {
      // Create URL with search parameters
      router.push(
        `/assessments?semesterId=${selectedSemester}&sectionCRN=${selectedSection}`
      );
    }
  }, [selectedSemester, selectedSection, router]);

  // When component mounts, check if we have URL params
  useEffect(() => {
    const semesterId = searchParams.get("semesterId");
    const sectionCRN = searchParams.get("sectionCRN");

    if (semesterId && semesterId !== selectedSemester) {
      setSelectedSemester(semesterId);
      // We'll need to fetch sections for this semester
      handleSemesterChange(semesterId);
    }

    if (sectionCRN) {
      setSelectedSection(sectionCRN);
    }
  }, [searchParams]);

  return (
    <div className={styles.filterPanel}>
      <h3 className={styles.filterTitle}>Filter Assessments</h3>

      <div className={styles.filterRow}>
        <SemesterSelector
          semesters={semesters}
          defaultSemester={selectedSemester}
          onChange={handleSemesterChange}
          disabled={isLoading}
        />

        <SectionSelector
          sections={sections}
          defaultSection={selectedSection}
          onChange={handleSectionChange}
          disabled={isLoading || !selectedSemester}
        />

        {isLoading && <div className={styles.spinner} />}
      </div>
    </div>
  );
}
