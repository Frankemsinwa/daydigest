
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
  return (
    <DashboardClientLayout user={null}>
      {children}
    </DashboardClientLayout>
  );
}
