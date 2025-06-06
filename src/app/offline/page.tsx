
import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
      <WifiOff className="h-16 w-16 text-primary mb-6" />
      <h1 className="text-3xl font-bold mb-2">You are Offline</h1>
      <p className="text-muted-foreground mb-6">
        It seems you&apos;re not connected to the internet. Please check your connection and try again.
      </p>
      <p className="text-sm text-muted-foreground">
        Some content may be unavailable until you reconnect.
      </p>
    </div>
  );
}
