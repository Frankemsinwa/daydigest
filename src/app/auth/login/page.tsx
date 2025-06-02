// This page is no longer used as authentication has been removed.
// You can delete this file.
import { redirect } from 'next/navigation';

export default function LoginPage() {
  redirect('/'); // Redirect to homepage or another appropriate page
  return null;
}
