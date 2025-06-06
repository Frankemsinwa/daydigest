
'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <h2 className="text-2xl font-semibold text-destructive mb-4">Oops! Something went wrong.</h2>
      <p className="text-muted-foreground mb-6">
        We encountered an error while trying to load this part of the dashboard.
      </p>
      <p className="text-sm text-muted-foreground mb-2">Error: {error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        variant="destructive"
      >
        Try Again
      </Button>
    </div>
  );
}
