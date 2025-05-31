
import DashboardClientLayout from './dashboard-client-layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DayDigest Dashboard',
  description: 'Your personal DayDigest dashboard.',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Authentication logic removed
  // User data is no longer fetched here

  return (
    // Passing null or undefined for user, or removing the prop entirely
    // depending on how DashboardClientLayout is adjusted
    <DashboardClientLayout user={null}>
      {children}
    </DashboardClientLayout>
  );
}
