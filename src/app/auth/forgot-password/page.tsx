// This page is no longer used as authentication has been removed.
// You can delete this file.
import { redirect } from 'next/navigation';

export default function ForgotPasswordPage() {
  redirect('/'); // Redirect to homepage
  return null;
}
