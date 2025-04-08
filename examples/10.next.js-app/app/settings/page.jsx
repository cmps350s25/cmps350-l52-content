// app/settings/page.jsx
import { SettingsForm } from './components/SettingsForm.jsx'; // Use .jsx
import * as db from "@/lib/db";
import { redirect } from 'next/navigation';

const USER_ID = 'user-123';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  const settings = await db.getUserSettings(USER_ID);

  if (!settings) {
     console.error("Settings not found for user:", USER_ID);
     return <p>Error loading settings.</p>
  }

  return (
    <div>
      <h1>User Settings (Client Form Example)</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}