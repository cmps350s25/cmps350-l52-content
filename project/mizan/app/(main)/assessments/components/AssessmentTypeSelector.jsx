"use client";

import { useState, useEffect } from "react";
import styles from "./AssessmentForm.module.css";

export default function AssessmentTypeSelector({
  assessmentTypes = [],
  defaultValue,
  disabled = false,
  required = true,
}) {
  const [selectedType, setSelectedType] = useState(defaultValue || "");

  // Update the internal state when the defaultValue prop changes
  useEffect(() => {
    if (defaultValue) {
      setSelectedType(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="assessment-type">
        Assessment Type
      </label>
      <select
        id="assessment-type"
        className={styles.select}
        name="type"
        value={selectedType}
        onChange={handleChange}
        disabled={disabled}
        required={required}
      >
        <option value="" disabled>
          Select a type
        </option>
        {assessmentTypes.map((type) => (
          <option key={type.id} value={type.id}>
            {type.label}
          </option>
        ))}
      </select>
    </div>
  );
}
