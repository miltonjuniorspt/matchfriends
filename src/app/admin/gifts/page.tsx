import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const gifts = [
    { id: '1', name: "Buquê de Rosas Vermelhas", price: 120.00, image: "https://placehold.co/600x400", dataAiHint: "rose bouquet" },
    { id: '2', name: "Caixa de Bombons Finos", price: 85.50, image: "https://placehold.co/600x400", dataAiHint: "chocolate box" },
    { id: '3', name: "Urso de Pelúcia Gigante", price: 250.00, image: "https://placehold.co/600x400", dataAiHint: "teddy bear" },
    { id: '4', name: "Cesta de Café da Manhã", price: 180.00, image: "https://placehold.co/600x400", dataAiHint: "breakfast basket" },
];

export default function GiftsManagementPage() {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold font-headline">Gerenciar Mimos</h2>
                    <p className="text-muted-foreground">Adicione, edite ou remova os mimos disponíveis no site.</p>
                </div>
                <Button>Adicionar Mimo</Button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {gifts.map((gift) => (
                    <Card key={gift.id} className="overflow-hidden">
                        <CardHeader className="p-0">
                             <Image src={gift.image} alt={gift.name} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint={gift.dataAiHint} />
                        </CardHeader>
                        <CardContent className="p-4">
                            <CardTitle className="text-lg mb-2">{gift.name}</CardTitle>
                            <CardDescription className="text-xl font-semibold text-primary">
                                R$ {gift.price.toFixed(2).replace('.', ',')}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="p-4 flex gap-2">
                            <Button variant="outline" className="w-full">Editar</Button>
                            <Button variant="destructive" className="w-full">Remover</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
