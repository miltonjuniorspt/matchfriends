"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { handleImageModeration, handleChatModeration } from './actions';
import { Loader2, CheckCircle, XCircle, Send, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

type ModerationResult = {
  isSafe: boolean;
  reason: string;
} | null;

export default function ModerationPage() {
  // Image moderation state
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageResult, setImageResult] = useState<ModerationResult>(null);

  // Chat moderation state
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatResult, setChatResult] = useState<ModerationResult>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageResult(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onImageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile || !imagePreview) return;

    setIsImageLoading(true);
    setImageResult(null);

    const result = await handleImageModeration({ photoDataUri: imagePreview });
    setImageResult(result);
    setIsImageLoading(false);
  };
  
  const onChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setIsChatLoading(true);
    setChatResult(null);

    const result = await handleChatModeration({ text: chatInput });
    setChatResult(result);
    setIsChatLoading(false);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Moderação de Imagem</CardTitle>
          <CardDescription>
            Faça upload de uma imagem para verificar se ela contém conteúdo impróprio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onImageSubmit} className="space-y-4">
            <Input type="file" accept="image/*" onChange={handleFileChange} disabled={isImageLoading} />
            {imagePreview && (
              <div className="mt-4 p-4 border rounded-md flex justify-center items-center bg-muted/40">
                <Image src={imagePreview} alt="Preview" width={200} height={200} className="rounded-md object-contain" />
              </div>
            )}
            <Button type="submit" disabled={!imageFile || isImageLoading} className="w-full">
              {isImageLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
              Verificar Imagem
            </Button>
          </form>
          {imageResult && (
            <Alert variant={imageResult.isSafe ? "default" : "destructive"} className="mt-4">
              {imageResult.isSafe ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{imageResult.isSafe ? "Imagem Segura" : "Conteúdo Impróprio Detectado"}</AlertTitle>
              <AlertDescription>{imageResult.reason}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moderação de Chat</CardTitle>
          <CardDescription>
            Digite um texto para verificar se ele contém linguagem inadequada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onChatSubmit} className="space-y-4">
            <div className="flex gap-2">
                <Input
                placeholder="Digite uma mensagem..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isChatLoading}
                />
                <Button type="submit" disabled={!chatInput.trim() || isChatLoading} size="icon">
                    {isChatLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
            </div>
          </form>
           {chatResult && (
            <Alert variant={chatResult.isSafe ? "default" : "destructive"} className="mt-4">
              {chatResult.isSafe ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{chatResult.isSafe ? "Texto Seguro" : "Linguagem Inadequada Detectada"}</AlertTitle>
              <AlertDescription>{chatResult.reason}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
