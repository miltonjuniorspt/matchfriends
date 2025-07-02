import { AppHeader } from "@/components/common/app-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-screen flex-col">
      <AppHeader />
      <main className="container flex flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
