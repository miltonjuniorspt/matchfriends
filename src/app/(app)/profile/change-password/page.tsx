
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ChangePasswordPage() {
  return (
    <div className="w-full space-y-8 py-8 flex justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
          <CardDescription>
            Crie uma nova senha para sua conta. Recomendamos uma senha forte e única.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input id="current-password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input id="new-password" type="password" placeholder="••••••••" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" />
          </div>
           <Button className="w-full">Salvar Nova Senha</Button>
        </CardContent>
      </Card>
    </div>
  );
}
