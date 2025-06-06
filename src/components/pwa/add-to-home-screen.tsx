
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>;
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed';
      platform: string;
    }>;
    prompt(): Promise<void>;
  }
}

export default function AddToHomeScreen() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show the button only if it's not already installed and not dismissed recently by user
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      if (!isStandalone) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    setIsVisible(false); // Hide the button immediately
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    setDeferredPrompt(null);
  };

  const handleDismissClick = () => {
    setIsVisible(false);
    // Optionally, you could set a cookie/localStorage flag here to not show it again for a while
  };

  if (!isVisible) {
    return null;
  }

  // Basic check for Android-like platforms
  const isAndroid = /android/i.test(navigator.userAgent);
  if (!isAndroid) {
    return null;
  }


  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="bg-card text-card-foreground p-3 rounded-lg shadow-2xl border border-border/70 flex items-center space-x-3 max-w-xs">
        <Download className="h-6 w-6 text-primary flex-shrink-0" />
        <div className="flex-grow">
          <p className="text-sm font-semibold">Install DayDigest</p>
          <p className="text-xs text-muted-foreground">Add to your home screen for quick access.</p>
        </div>
        <Button onClick={handleInstallClick} size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1 h-auto flex-shrink-0">
          Install
        </Button>
         <Button onClick={handleDismissClick} variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground flex-shrink-0">
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss install prompt</span>
        </Button>
      </div>
    </div>
  );
}
