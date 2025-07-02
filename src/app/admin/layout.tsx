"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  HeartHandshake,
  LayoutDashboard,
  Users,
  Music,
  Plane,
  Gift,
  Crown,
  ShieldCheck,
  LogOut,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/users", icon: Users, label: "Usuários" },
  { href: "/admin/music", icon: Music, label: "Músicas" },
  { href: "/admin/travel", icon: Plane, label: "Viagens" },
  { href: "/admin/gifts", icon: Gift, label: "Mimos" },
  { href: "/admin/subscriptions", icon: Crown, label: "Assinaturas" },
  { href: "/admin/moderation", icon: ShieldCheck, label: "Moderação" },
];

function AdminHeader({ title }: { title: string }) {
    const { isMobile } = useSidebar();
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 md:px-6 sticky top-0 z-30">
            {isMobile && <SidebarTrigger />}
            <h1 className="flex-1 text-lg font-semibold md:text-2xl font-headline">{title}</h1>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Settings className="h-5 w-5" />
                    <span className="sr-only">Settings</span>
                </Button>
                <Avatar className="h-9 w-9">
                    <AvatarImage src="https://placehold.co/100x100" alt="@admin" />
                    <AvatarFallback>AD</AvatarFallback>
                </Avatar>
            </div>
        </header>
    )
}

function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2" data-testid="logo">
          <HeartHandshake className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold font-headline">Amigo Romântico</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                onClick={() => router.push(item.href)}
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => router.push('/admin/login')} tooltip="Sair">
              <LogOut />
              <span>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentRoute = NAV_ITEMS.find(item => item.href === pathname);
  const title = currentRoute ? currentRoute.label : "Dashboard";

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader title={title} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
