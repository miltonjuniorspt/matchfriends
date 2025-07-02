import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

const users = [
  { id: '1', name: "Ana Clara", email: "ana.clara@example.com", avatar: "https://placehold.co/100x100", status: "Active", plan: "Lover" },
  { id: '2', name: "Bruno Gomes", email: "bruno.gomes@example.com", avatar: "https://placehold.co/100x100", status: "Active", plan: "Boyfriend" },
  { id: '3', name: "Carla Dias", email: "carla.dias@example.com", avatar: "https://placehold.co/100x100", status: "Banned", plan: "Free" },
  { id: '4', name: "Daniel Alves", email: "daniel.alves@example.com", avatar: "https://placehold.co/100x100", status: "Active", plan: "Free" },
  { id: '5', name: "Eduarda Lima", email: "eduarda.lima@example.com", avatar: "https://placehold.co/100x100", status: "Active", plan: "Boyfriend" },
];

const getPlanBadgeVariant = (plan: string) => {
    switch (plan) {
        case 'Lover': return 'default';
        case 'Boyfriend': return 'secondary';
        case 'Free': return 'outline';
        default: return 'outline';
    }
}


export default function UsersPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle>Usuários</CardTitle>
                <CardDescription>Gerencie as contas dos usuários do Amigo Romântico.</CardDescription>
            </div>
            <Button>Adicionar Usuário</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Plano</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person portrait" />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                    <Badge variant={user.status === 'Active' ? 'secondary' : 'destructive'} className={user.status === 'Active' ? 'bg-green-100 text-green-800' : ''}>
                        {user.status === 'Active' ? 'Ativo' : 'Banido'}
                    </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPlanBadgeVariant(user.plan)}>{user.plan}</Badge>
                </TableCell>
                <TableCell className="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Alterar Senha</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Banir Usuário</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">Excluir Conta</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
