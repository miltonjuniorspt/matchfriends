import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, CreditCard, Music, Plane, Gift } from "lucide-react";

const stats = [
    { title: "Total de Usuários", value: "1,254", icon: Users, change: "+15.2% desde o mês passado" },
    { title: "Receita Mensal", value: "R$ 25,480.00", icon: DollarSign, change: "+8.1% desde o mês passado" },
    { title: "Assinantes Ativos", value: "389", icon: CreditCard, change: "+25 novos esta semana" },
    { title: "Playlists Gerenciadas", value: "42", icon: Music, change: "+5 novas playlists" },
    { title: "Pacotes de Viagem", value: "12", icon: Plane, change: "2 novos pacotes no Rio" },
    { title: "Mimos Disponíveis", value: "25", icon: Gift, change: "Novos bombons adicionados" },
];

export default function AdminDashboardPage() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
                <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
