import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const travelPackages = [
    { id: '1', title: "Fim de Semana Romântico em Copacabana", description: "Hospedagem de 2 noites em hotel de frente para o mar, com jantar romântico incluso.", price: 1850.00, image: "https://placehold.co/600x400", dataAiHint: "copacabana beach" },
    { id: '2', title: "Aventura na Cidade Maravilhosa", description: "Passeio de helicóptero pelo Cristo Redentor e trilha guiada na Floresta da Tijuca.", price: 2500.00, image: "https://placehold.co/600x400", dataAiHint: "christ redeemer" },
    { id: '3', title: "Cultura e Sabor na Lapa", description: "Tour pelos bares históricos da Lapa com aula de samba e degustação de caipirinhas.", price: 980.00, image: "https://placehold.co/600x400", dataAiHint: "lapa arches" },
    { id: '4', title: "Luxo e Relaxamento em Ipanema", description: "Estadia em suíte de luxo, spa para casal e acesso exclusivo a um beach club.", price: 3200.00, image: "https://placehold.co/600x400", dataAiHint: "ipanema beach" },
];

export default function TravelManagementPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold font-headline">Pacotes de Viagem</h2>
                    <p className="text-muted-foreground">Gerencie os pacotes de viagem para o Rio de Janeiro.</p>
                </div>
                <Button>Adicionar Pacote</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
                {travelPackages.map((pkg) => (
                    <Card key={pkg.id} className="overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-1/3">
                            <Image src={pkg.image} alt={pkg.title} width={600} height={400} className="w-full h-full object-cover" data-ai-hint={pkg.dataAiHint} />
                        </div>
                        <div className="flex flex-col justify-between p-4 md:w-2/3">
                            <div>
                                <CardTitle className="text-lg mb-2">{pkg.title}</CardTitle>
                                <CardDescription>{pkg.description}</CardDescription>
                            </div>
                            <div className="flex items-end justify-between mt-4">
                                <span className="text-2xl font-semibold text-primary">
                                    R$ {pkg.price.toFixed(2).replace('.', ',')}
                                </span>
                                <div className="flex gap-2">
                                    <Button variant="outline">Editar</Button>
                                    <Button variant="destructive">Remover</Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
