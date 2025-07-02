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
  name: z.string().min(1, { message: "O nome é obrigatório." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem.",
  path: ["confirmPassword"], // path of error
});

export function UserSignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simula uma chamada de rede e registro
    setTimeout(() => {
      try {
        const storedUsers = localStorage.getItem("users");
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const emailExists = users.some((user: any) => user.email === values.email);

        if (emailExists) {
          toast({
            variant: "destructive",
            title: "Erro de cadastro",
            description: "Este e-mail já está em uso.",
          });
          form.setError("email", {
            type: "manual",
            message: "Este e-mail já está em uso.",
          });
          setIsLoading(false);
          return;
        }

        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password, // ATENÇÃO: Armazenar senhas em texto puro não é seguro para produção.
          avatar: null,
          photos: [],
        };
        
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        
        // Objeto de sessão leve
        const sessionUser = {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            avatar: newUser.avatar,
        };
        localStorage.setItem("user", JSON.stringify(sessionUser));
        
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Redirecionando para o bate-papo.",
        });
        router.push("/messages");

      } catch (error) {
        console.error("Falha ao salvar usuário no localStorage", error);
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: "Não foi possível salvar seus dados. Tente novamente.",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
          {isLoading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </Form>
  );
}
