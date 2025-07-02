'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { AppHeader } from "@/components/common/app-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        router.replace("/login");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Falha ao ler dados do localStorage", error);
      // Se o localStorage não estiver acessível, redirecione para o login por segurança
      router.replace("/login");
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative flex h-screen flex-col">
      <AppHeader />
      <main className="container flex flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
