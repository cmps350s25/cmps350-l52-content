'use client';

import { useState, useEffect } from 'react';
import { getAssessmentTitle } from '@/app/actions/assessments';
import styles from './AssessmentForm.module.css';

export default function TitleField({ 
  initialValue = "", 
  sectionCRN, 
  assessmentType,
  styles
}) {
  const [title, setTitle] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch new title if both section and type are selected
    if (sectionCRN && assessmentType) {
      setIsLoading(true);
      getAssessmentTitle(sectionCRN, assessmentType)
        .then(newTitle => {
          if (newTitle) {
            setTitle(newTitle);
          }
        })
        .catch(error => {
          console.error("Error getting assessment title:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [sectionCRN, assessmentType]);

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor="title-input">
        Title {isLoading && "(generating...)"}
      </label>
      <input
        className={styles.input}
        id="title-input"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
  );
}
