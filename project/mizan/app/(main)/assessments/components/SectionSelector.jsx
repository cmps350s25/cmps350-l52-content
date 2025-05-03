"use client";

import { useState, useEffect } from "react";
import styles from "./AssessmentForm.module.css";

export default function SectionSelector({
  sections = [],
  defaultSection,
  disabled = false,
  required = true,
  onChange = () => {},
}) {
  const [selectedSection, setSelectedSection] = useState(defaultSection || "");

  // Update the internal state when props change
  useEffect(() => {
    if (defaultSection !== selectedSection) {
      setSelectedSection(defaultSection || "");
    }
  }, [defaultSection, sections]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedSection(value);
    onChange(value);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="section-select">
        Course Section
      </label>
      <select
        id="section-select"
        className={styles.select}
        name="sectionCRN"
        value={selectedSection}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled>
          {sections.length === 0
            ? "No sections available"
            : "Select a course section"}
        </option>
        {sections.map((section) => (
          <option key={section.crn} value={section.crn}>
            {section.crn} - {section.courseCode} {section.courseName}
          </option>
        ))}
      </select>
    </div>
  );
}
