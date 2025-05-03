"use client";

import { useState, useEffect } from "react";
import styles from "./AssessmentForm.module.css";

export default function SemesterSelector({
  semesters = [],
  defaultSemester,
  disabled = false,
  required = true,
  onChange = () => {},
}) {
  // Find default semester (the one with isDefault=true) if no defaultSemester is provided
  const findDefaultSemester = () => {
    if (defaultSemester) return defaultSemester;

    const defaultSem = semesters.find((sem) => sem.isDefault);
    return defaultSem ? defaultSem.id : "";
  };

  const [selectedSemester, setSelectedSemester] = useState(
    findDefaultSemester()
  );

  // Update the internal state when props change
  useEffect(() => {
    const newValue = defaultSemester || findDefaultSemester();
    if (newValue !== selectedSemester) {
      setSelectedSemester(newValue);
    }
  }, [defaultSemester, semesters]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelectedSemester(value);
    onChange(value);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="semester-select">
        Semester
      </label>
      <select
        id="semester-select"
        className={styles.select}
        //name="semesterId"
        value={selectedSemester}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled>
          Select a semester
        </option>
        {semesters.map((semester) => (
          <option key={semester.id} value={semester.id}>
            {semester.label}
          </option>
        ))}
      </select>
    </div>
  );
}
