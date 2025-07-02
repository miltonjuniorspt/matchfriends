'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUsersRaw = localStorage.getItem("users");
      const storedUserRaw = localStorage.getItem("user");

      if (storedUsersRaw && storedUserRaw) {
        const allUsers = JSON.parse(storedUsersRaw);
        const loggedInUser = JSON.parse(storedUserRaw);

        const otherUsers = allUsers.filter((u: any) => u.email !== loggedInUser.email);
        
        const suggestedProfiles = otherUsers.map((user: any, index: number) => ({
            name: `${user.name}, ${22 + (index * 3)}`, // Mock age
            location: ['Rio de Janeiro, RJ', 'Niterói, RJ', 'Duque de Caxias, RJ', 'São Gonçalo, RJ'][index % 4], // Mock location
            image: user.avatar || 'https://placehold.co/400x400',
            dataAiHint: user.avatar ? 'person portrait' : (index % 2 === 0 ? 'woman portrait' : 'man portrait'),
        }));

        setProfiles(suggestedProfiles);
      }
    } catch (error) {
      console.error("Failed to load users from localStorage", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full justify-center py-8">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 py-8">
        <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-headline">Encontre seu par perfeito</h1>
            <p className="text-muted-foreground mt-2">Perfis que talvez você goste no Match Friends</p>
        </div>
        {profiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {profiles.map(profile => (
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
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Não há outros perfis para mostrar no momento.</p>
          </div>
        )}
    </div>
  )
}
