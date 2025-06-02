// This page is no longer used as authentication has been removed.
// You can delete this file.
'use client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthErrorPage() {
  useEffect(() => {
    redirect('/'); // Redirect to homepage
  }, []);
  return <p>Redirecting...</p>;
}
