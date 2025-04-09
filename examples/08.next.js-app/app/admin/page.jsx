// app/admin/page.jsx
import { AdminActions } from './components/AdminActions.jsx'; // Use .jsx

export default function AdminPage() {
    return (
        <div>
            <h1>Admin Panel (Trigger Process)</h1>
            <AdminActions />
             <p style={{marginTop: '1rem', fontSize: '0.875rem', color: '#718096'}}>
                Check your server console logs to see the simulated report generation process.
             </p>
        </div>
    );
}