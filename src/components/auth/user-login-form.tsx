"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

const DEMO_USER_EMAIL = "usuario@exemplo.com";
const DEMO_USER_PASS = "senha123";

export function UserLoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simula uma chamada de rede e login
    setTimeout(() => {
      let loggedIn = false;
      let userToLogin: any = null;
      
      try {
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const foundUser = users.find((u: any) => u.email === values.email);

        if (foundUser && foundUser.password === values.password) {
          loggedIn = true;
          userToLogin = foundUser;
        } 
        // Como alternativa, usa o usuário de demonstração padrão
        else if (values.email === DEMO_USER_EMAIL && values.password === DEMO_USER_PASS) {
          loggedIn = true;
          const demoUserIndex = users.findIndex((user: any) => user.email === DEMO_USER_EMAIL);
          if (demoUserIndex === -1) {
              userToLogin = {
                  name: "Usuário Demo",
                  email: DEMO_USER_EMAIL,
                  password: DEMO_USER_PASS,
                  avatar: null,
                  photos: []
              };
              users.push(userToLogin);
              localStorage.setItem("users", JSON.stringify(users));
          } else {
              userToLogin = users[demoUserIndex];
          }
        }
      } catch (error) {
        console.error("Falha ao ler dados do localStorage", error);
      }
      
      if (loggedIn && userToLogin) {
        // O objeto de sessão contém apenas os dados essenciais do usuário
        const sessionUser = {
            name: userToLogin.name,
            email: userToLogin.email,
            password: userToLogin.password,
            avatar: userToLogin.avatar || null,
        };

        localStorage.setItem("user", JSON.stringify(sessionUser));
        
        toast({
          title: "Login bem-sucedido!",
          description: "Redirecionando para o bate-papo.",
        });
        router.push("/messages");
      } else {
        toast({
          variant: "destructive",
          title: "Erro de login",
          description: "Email ou senha incorretos. Por favor, tente novamente.",
        });
        form.setError("password", {
          type: "manual",
          message: "Email ou senha incorretos.",
        });
      }
      setIsLoading(false);
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Entrando..." : "Entrar"}
        </Button>
      </form>
    </Form>
  );
}
