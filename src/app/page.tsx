'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (user) {
        router.replace('/home');
      } else {
        router.replace('/login');
      }
    } catch (error) {
        // This can happen in environments where localStorage is not available.
        console.error("Could not access localStorage, redirecting to login.", error);
        router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
