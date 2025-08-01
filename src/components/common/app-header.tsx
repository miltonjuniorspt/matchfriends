
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
  KeyRound,
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
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 400;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
            
            setUserAvatar(dataUrl);

            try {
              const storedUserRaw = localStorage.getItem("user");
              if (!storedUserRaw) return;

              const currentUser = JSON.parse(storedUserRaw);
              currentUser.avatar = dataUrl;
              localStorage.setItem("user", JSON.stringify(currentUser));

              const storedUsersRaw = localStorage.getItem("users");
              const users = storedUsersRaw ? JSON.parse(storedUsersRaw) : [];
              const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
              if (userIndex > -1) {
                users[userIndex].avatar = dataUrl;
                localStorage.setItem("users", JSON.stringify(users));
              }
            } catch (error) {
              console.error("Falha ao salvar avatar no localStorage", error);
            }
          }
        };
        if (e.target?.result) {
            img.src = e.target.result as string;
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
                <div className="flex flex-col items-center space-y-2 p-2">
                   <Avatar className="h-16 w-16">
                     <AvatarImage src={userAvatar || "https://placehold.co/100x100"} alt="@user" data-ai-hint="person portrait" />
                     <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                   </Avatar>
                  <p className="text-sm font-bold leading-none">{userName}</p>
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
              <DropdownMenuItem onClick={() => router.push('/profile/change-password')}>
                <KeyRound className="mr-2 h-4 w-4" />
                <span>Alterar Senha</span>
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
