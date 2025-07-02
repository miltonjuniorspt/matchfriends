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
      let users: any[] = [];
      
      try {
        const storedUsers = localStorage.getItem("users");
        users = storedUsers ? JSON.parse(storedUsers) : [];

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
          } else {
              userToLogin = users[demoUserIndex];
          }
        }
      } catch (error) {
        console.error("Falha ao ler dados do localStorage", error);
      }
      
      if (loggedIn && userToLogin) {
        // Para resolver o problema de cota e atender ao pedido de limpeza,
        // limpamos o avatar e as fotos do usuário no momento do login.
        // Isso permite que o usuário envie novamente as imagens compactadas.
        const userIndex = users.findIndex((u: any) => u.email === userToLogin.email);
        if (userIndex > -1) {
            users[userIndex].avatar = null;
            users[userIndex].photos = [];
        }

        try {
            localStorage.setItem("users", JSON.stringify(users));
        } catch (error) {
            console.error("Falha ao limpar e salvar a lista de usuários.", error);
        }

        const sessionUser = {
            name: userToLogin.name,
            email: userToLogin.email,
            password: userToLogin.password,
            avatar: null, // Garante que a sessão também esteja limpa
        };

        localStorage.setItem("user", JSON.stringify(sessionUser));
        
        toast({
          title: "Login bem-sucedido!",
          description: "Redirecionando... Suas fotos antigas foram removidas para que você possa enviá-las novamente.",
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
