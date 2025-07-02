'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "As novas senhas não coincidem.",
      });
      return;
    }

    if (newPassword.length < 6) {
        toast({
            variant: "destructive",
            title: "Senha fraca",
            description: "A nova senha deve ter pelo menos 6 caracteres.",
        });
        return;
    }

    setIsLoading(true);

    setTimeout(() => {
        try {
            const storedUserRaw = localStorage.getItem("user");
            const storedUsersRaw = localStorage.getItem("users");
            
            if (!storedUserRaw || !storedUsersRaw) {
                toast({
                    variant: "destructive",
                    title: "Erro de Autenticação",
                    description: "Usuário não encontrado. Por favor, faça login novamente.",
                });
                router.push('/login');
                return;
            }

            const currentUser = JSON.parse(storedUserRaw);
            const users = JSON.parse(storedUsersRaw);

            if (currentUser.password !== currentPassword) {
                toast({
                    variant: "destructive",
                    title: "Erro de Autenticação",
                    description: "A senha atual está incorreta.",
                });
                return;
            }

            // Update password for the current user session
            currentUser.password = newPassword;
            localStorage.setItem("user", JSON.stringify(currentUser));

            // Update password in the users list
            const userIndex = users.findIndex((u: any) => u.email === currentUser.email);
            if (userIndex > -1) {
                users[userIndex].password = newPassword;
                localStorage.setItem("users", JSON.stringify(users));
            }

            toast({
                title: "Sucesso!",
                description: "Sua senha foi alterada com sucesso.",
            });

            // Clear fields
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');

        } catch (error) {
            console.error("Falha ao alterar a senha:", error);
            toast({
                variant: "destructive",
                title: "Erro no Servidor",
                description: "Não foi possível alterar a senha. Tente novamente mais tarde.",
            });
        } finally {
            setIsLoading(false);
        }
    }, 1000); // Simulate network delay
  };

  return (
    <div className="w-full space-y-8 py-8 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Crie uma nova senha para sua conta. Recomendamos uma senha forte e única.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input 
                id="current-password" 
                type="password" 
                placeholder="••••••••" 
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input 
                id="new-password" 
                type="password" 
                placeholder="••••••••" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Salvando..." : "Salvar Nova Senha"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
