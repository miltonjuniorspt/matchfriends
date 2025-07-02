import { AppHeader } from "@/components/common/app-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8 flex">
        {children}
      </main>
    </div>
  );
}
