import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Image from "next/image";

const suggestedProfiles = [
    { name: "Juliana, 25", location: "Rio de Janeiro, RJ", image: "https://placehold.co/400x400", dataAiHint: "woman portrait" },
    { name: "Fernando, 29", location: "Niterói, RJ", image: "https://placehold.co/400x400", dataAiHint: "man portrait" },
    { name: "Carla, 22", location: "Duque de Caxias, RJ", image: "https://placehold.co/400x400", dataAiHint: "woman portrait smiling" },
    { name: "Ricardo, 31", location: "São Gonçalo, RJ", image: "https://placehold.co/400x400", dataAiHint: "man portrait smiling" },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Encontre seu par perfeito</h1>
            <p className="text-muted-foreground mt-2">Perfis que talvez você goste no Match Friends</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {suggestedProfiles.map(profile => (
                 <Card key={profile.name} className="overflow-hidden transform transition-all hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader className="p-0">
                        <Image src={profile.image} alt={`Foto de ${profile.name}`} width={400} height={400} className="w-full h-72 object-cover" data-ai-hint={profile.dataAiHint} />
                    </CardHeader>
                    <CardContent className="p-4">
                        <CardTitle className="text-xl">{profile.name}</CardTitle>
                        <CardDescription>{profile.location}</CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                         <Button className="w-full">
                            <Heart className="mr-2 h-4 w-4" /> Curtir
                        </Button>
                    </CardFooter>
                 </Card>
            ))}
        </div>
    </div>
  )
}
