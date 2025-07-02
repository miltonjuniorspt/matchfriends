'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    try {
      // Simula a verificação de um usuário salvo. Em um app real, isso viria de um contexto de autenticação ou cookie.
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        router.replace('/messages');
      } else {
        router.replace('/login');
      }
    } catch (error) {
      // Ocorre em SSR ou se o localStorage estiver desabilitado
      router.replace('/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
    </div>
  );
}
