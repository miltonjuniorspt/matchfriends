import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Amigo (Free)",
        price: "R$ 0,00",
        price_sub: "/mês",
        description: "O essencial para começar a se conectar.",
        features: [
            "Acesso limitado ao chat",
            "Sugestões de playlists do admin",
            "Visualizar perfis"
        ]
    },
    {
        name: "Namorado",
        price: "R$ 29,90",
        price_sub: "/mês",
        description: "Mais recursos para encontrar sua paquera.",
        features: [
            "Acesso ilimitado ao chat",
            "Compartilhar músicas e playlists do Spotify",
            "5 envios de mimos por mês",
            "Acesso a 50% dos jogos"
        ],
        popular: true,
    },
    {
        name: "Amante",
        price: "R$ 49,90",
        price_sub: "/mês",
        description: "A experiência completa para os mais apaixonados.",
        features: [
            "Todos os benefícios do plano Namorado",
            "Envios de mimos ilimitados",
            "Acesso a 100% dos jogos",
            "Destaque no perfil",
            "Suporte prioritário"
        ]
    }
];

export default function SubscriptionsPage() {
    return (
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
            {plans.map((plan) => (
                <Card key={plan.name} className={`flex flex-col ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
                    <CardHeader>
                        {plan.popular && <div className="text-xs font-bold uppercase text-primary text-center">Mais Popular</div>}
                        <CardTitle className="text-2xl font-headline text-center">{plan.name}</CardTitle>
                        <div className="flex items-baseline justify-center gap-1">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">{plan.price_sub}</span>
                        </div>
                        <CardDescription className="text-center min-h-[40px]">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-3">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    <Check className="h-5 w-5 text-green-500" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <div className="p-6">
                        <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                            Gerenciar Plano
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
}
