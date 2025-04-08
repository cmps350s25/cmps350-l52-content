// app/settings/components/SettingsForm.jsx
'use client';

import { useFormState } from 'react-dom';
import { updateSettingsAction } from '@/app/actions/settingsActions.js'; // Use .js
import { SubmitButton } from '@/app/components/SubmitButton.jsx'; // Use .jsx
// No type import needed for UserSettings
import styles from './SettingsForm.module.css';

const initialState = { message: null, errors: null };

// No interface needed
export function SettingsForm({ settings }) { // Removed type
  const [state, formAction] = useFormState(updateSettingsAction, initialState);

  return (
     <form action={formAction} className={styles.form}>
        {/* Structure remains the same */}
        <input type="hidden" name="userId" value={settings.userId} />

        <div className={styles.checkboxGroup}>
            <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                defaultChecked={settings.emailNotifications}
            />
            <label htmlFor="emailNotifications">
                Enable Email Notifications
            </label>
             {state?.errors?.emailNotifications && <p className="error-message">{state.errors.emailNotifications}</p>}
        </div>

        <div>
            <label htmlFor="theme">Theme</label>
            <select
                id="theme"
                name="theme"
                defaultValue={settings.theme}
                className={styles.select}
            >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
            </select>
            {state?.errors?.theme && <p className="error-message">{state.errors.theme}</p>}
        </div>

         <SubmitButton>Save Settings</SubmitButton>

         {state?.message && !state.errors && <p className="success-message">{state.message}</p>}
         {state?.message && state.errors && <p className="error-message">{state.message} (Validation Failed)</p>}
     </form>
  );
}