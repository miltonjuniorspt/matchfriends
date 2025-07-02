"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { List, ListItem } from "@/components/ui/list";
import { PlusCircle, Trash2, Music } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Playlist {
  id: string;
  url: string;
  name: string;
}

const initialPlaylists: Playlist[] = [
  { id: '1', url: 'https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M', name: 'Músicas para se apaixonar' },
  { id: '2', url: 'https://open.spotify.com/playlist/37i9dQZF1DX0s5kDeEUNjV', name: 'Pop Romântico' },
  { id: '3', url: 'https://open.spotify.com/playlist/37i9dQZF1DWVlYsZmvQZus', name: 'Sertanejo para dançar colado' },
];

export default function MusicManagementPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>(initialPlaylists);
  const [newPlaylistUrl, setNewPlaylistUrl] = useState('');
  const { toast } = useToast();

  const addPlaylist = () => {
    if (!newPlaylistUrl.trim().startsWith('https://open.spotify.com/playlist/')) {
      toast({
        variant: 'destructive',
        title: 'URL Inválida',
        description: 'Por favor, insira uma URL válida de playlist do Spotify.',
      });
      return;
    }
    const newPlaylist: Playlist = {
      id: new Date().toISOString(),
      url: newPlaylistUrl,
      name: `Nova Playlist ${playlists.length + 1}`, // Placeholder name
    };
    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistUrl('');
    toast({
        title: 'Playlist Adicionada!',
        description: 'A nova playlist foi adicionada com sucesso.',
    });
  };

  const removePlaylist = (id: string) => {
    setPlaylists(playlists.filter(p => p.id !== id));
    toast({
        title: 'Playlist Removida',
        description: 'A playlist foi removida da lista.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciamento de Músicas</CardTitle>
        <CardDescription>Adicione ou remova playlists do Spotify que serão sugeridas aos usuários do plano gratuito.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Adicionar Nova Playlist</h3>
          <div className="flex gap-2">
            <Input
              placeholder="https://open.spotify.com/playlist/..."
              value={newPlaylistUrl}
              onChange={(e) => setNewPlaylistUrl(e.target.value)}
            />
            <Button onClick={addPlaylist}>
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar
            </Button>
          </div>
        </div>
        <div>
            <h3 className="text-lg font-medium mb-2">Playlists Atuais</h3>
            <List>
                {playlists.map(playlist => (
                    <ListItem key={playlist.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Music className="h-5 w-5 text-green-500" />
                            <div className="flex flex-col">
                                <span className="font-medium">{playlist.name}</span>
                                <a href={playlist.url} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:underline truncate max-w-xs md:max-w-md">
                                    {playlist.url}
                                </a>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removePlaylist(playlist.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </ListItem>
                ))}
            </List>
        </div>
      </CardContent>
    </Card>
  );
}

// Dummy List component for structure
// In a real app, this would be a proper styled component
const List = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <ul className={`border rounded-md divide-y ${className}`}>{children}</ul>
);
const ListItem = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <li className={`p-3 ${className}`}>{children}</li>
);
