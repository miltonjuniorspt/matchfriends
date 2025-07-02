
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  HeartHandshake,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  User,
  Users,
  Camera,
  Album,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/home", label: "Match", icon: Home },
  { href: "/profile", label: "Álbum", icon: Album },
  { href: "/profiles", label: "Perfis", icon: Users },
  { href: "/messages", label: "Bate papo", icon: MessageSquare },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = React.useState("Usuário");
  const [userAvatar, setUserAvatar] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserName(user.name || "Usuário");
        setUserAvatar(user.avatar || null); // Load avatar from storage
      }
    } catch (error) {
      console.error("Falha ao ler dados do localStorage", error);
    }
  }, []);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setUserAvatar(dataUrl);
        // Save to localStorage
        try {
          const storedUser = localStorage.getItem("user");
          const user = storedUser ? JSON.parse(storedUser) : {};
          user.avatar = dataUrl;
          localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
          console.error("Falha ao salvar avatar no localStorage", error);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };


  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <Link href="/home" className="hidden items-center space-x-2 md:flex">
            <HeartHandshake className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Match Friends
            </span>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetClose asChild>
                <Link
                  href="/home"
                  className="mb-8 flex items-center"
                >
                  <HeartHandshake className="mr-2 h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">Match Friends</span>
                </Link>
              </SheetClose>
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                        <Link
                            href={link.href}
                            className={cn(
                            "flex items-center p-2 rounded-md",
                            pathname === link.href ? "bg-accent text-accent-foreground" : ""
                            )}
                        >
                            <link.icon className="mr-2 h-4 w-4" />
                            {link.label}
                        </Link>
                    </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Center */}
        <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === link.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={userAvatar || "https://placehold.co/100x100"} alt="@user" data-ai-hint="person portrait" />
                  <AvatarFallback>{userName.substring(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Meu Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleUploadClick}>
                <Camera className="mr-2 h-4 w-4" />
                <span>Alterar Foto</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/login")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </div>
      </div>
    </header>
  );
}
