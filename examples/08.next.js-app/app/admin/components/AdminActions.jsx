// app/admin/components/AdminActions.jsx
'use client';

import { useFormState } from 'react-dom';
import { triggerReportAction } from '@/app/actions/adminActions.js'; // Use .js
import { SubmitButton } from '@/app/components/SubmitButton.jsx'; // Use .jsx
import styles from './AdminActions.module.css';

const initialState = { message: null };

export function AdminActions() {
    const [state, formAction] = useFormState(triggerReportAction, initialState);

    return (
        <div className={styles.actionsContainer}>
            {/* Structure remains the same */}
            <form action={formAction} className={styles.actionForm}>
                <input type="hidden" name="reportType" value="sales_summary" />
                <SubmitButton variant="admin" pendingText="Generating...">
                    Generate Sales Report
                </SubmitButton>
            </form>
             <form action={formAction} className={styles.actionForm}>
                <input type="hidden" name="reportType" value="user_activity" />
                <SubmitButton variant="admin" pendingText="Generating...">
                    Generate User Activity Report
                </SubmitButton>
            </form>

             {state?.message && <p className={`status-message ${styles.statusMessage}`}>{state.message}</p>}
        </div>
    );
}