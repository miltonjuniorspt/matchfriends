
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, X } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const MAX_PHOTOS = 8;

export default function ProfilePage() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true); // Previne erro de hidratação
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setPhotos(user.photos || []);
      }
    } catch (error) {
      console.error("Falha ao carregar fotos do localStorage", error);
    }
  }, []);

  const updateLocalStorage = (newPhotos: string[]) => {
    try {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : {};
      user.photos = newPhotos;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Falha ao salvar fotos no localStorage", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar a foto. O armazenamento pode estar cheio.",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (photos.length >= MAX_PHOTOS) {
      toast({
        variant: "destructive",
        title: "Limite Atingido",
        description: `Você só pode adicionar até ${MAX_PHOTOS} fotos.`,
      });
      return;
    }

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            const newPhotos = [...photos, dataUrl];
            setPhotos(newPhotos);
            updateLocalStorage(newPhotos);
            toast({
              title: "Foto Adicionada!",
              description: "Sua nova foto foi adicionada ao álbum.",
            });
          }
        };
        if (e.target?.result) {
            img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
    // Reseta o input de arquivo para permitir o upload do mesmo arquivo novamente
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemovePhoto = (indexToRemove: number) => {
    const newPhotos = photos.filter((_, index) => index !== indexToRemove);
    setPhotos(newPhotos);
    updateLocalStorage(newPhotos);
    toast({
        title: "Foto Removida",
        description: "A foto foi removida do seu álbum.",
    });
  };

  if (!isMounted) {
    return null; // ou um esqueleto de carregamento
  }

  return (
    <div className="w-full space-y-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Meu Álbum de Fotos</CardTitle>
          <CardDescription>
            Adicione até {MAX_PHOTOS} fotos para que outros possam te conhecer melhor.
            Você tem {photos.length} / {MAX_PHOTOS} fotos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="relative group aspect-square">
                <Image
                  src={photo}
                  alt={`Foto do usuário ${index + 1}`}
                  fill
                  className="rounded-lg object-cover"
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                     <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso removerá permanentemente a foto do seu perfil.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleRemovePhoto(index)}>
                        Remover
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            ))}
            {photos.length < MAX_PHOTOS && (
              <button
                onClick={handleAddClick}
                className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/50 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground hover:border-accent-foreground"
              >
                <div className="text-center">
                  <PlusCircle className="mx-auto h-8 w-8" />
                  <p className="mt-2 text-sm">Adicionar Foto</p>
                </div>
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />
        </CardContent>
      </Card>
    </div>
  );
}
