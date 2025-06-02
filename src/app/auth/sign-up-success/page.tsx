// This page is no longer used as authentication has been removed.
// You can delete this file.
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SignUpSuccessPage() {
   useEffect(() => {
    redirect('/'); // Redirect to homepage
  }, []);
  return <p>Redirecting...</p>;
}
