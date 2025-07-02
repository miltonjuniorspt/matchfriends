
"use client";

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dados de exemplo
const conversations = [
  { 
    id: 1, 
    name: 'Juliana, 25', 
    avatar: 'https://placehold.co/100x100', 
    dataAiHint: 'woman portrait',
    lastMessage: 'Que legal! 😄',
    lastMessageTime: '10:42',
    online: true,
  },
  { 
    id: 2, 
    name: 'Fernando, 29', 
    avatar: 'https://placehold.co/100x100', 
    dataAiHint: 'man portrait',
    lastMessage: 'Combinado então!',
    lastMessageTime: 'Ontem',
    online: false,
  },
  { 
    id: 3, 
    name: 'Carla, 22', 
    avatar: 'https://placehold.co/100x100', 
    dataAiHint: 'woman portrait smiling',
    lastMessage: 'hahaha, pode deixar',
    lastMessageTime: '2d',
    online: false,
  }
];

const initialMessages = [
  { id: 1, text: "Olá! Tudo bem? Gostei do seu perfil 😊", sender: 'Juliana, 25' },
  { id: 2, text: "Oii, tudo ótimo e com você? Obrigado! Também gostei do seu.", sender: 'me' },
  { id: 3, text: "Tudo bem também! O que você mais gosta de fazer no seu tempo livre?", sender: 'Juliana, 25' },
  { id: 4, text: "Gosto muito de ir à praia, ler um bom livro e sair pra conhecer lugares novos. E você?", sender: 'me' },
  { id: 5, text: "Que legal! 😄", sender: 'Juliana, 25' },
];

export default function MessagesPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [activeConversation, setActiveConversation] = useState(conversations[0]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const myMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'me',
        };

        setMessages(prev => [...prev, myMessage]);
        setNewMessage('');

        // Simula uma resposta
        setTimeout(() => {
            const replyMessage = {
                id: messages.length + 3,
                text: "Adorei a resposta! 😁",
                sender: activeConversation.name,
            };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] gap-4 h-[calc(100vh-10rem)]">
            {/* Lista de Conversas */}
            <Card className="hidden md:flex md:flex-col h-full">
                <CardHeader className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar conversas..." className="pl-8" />
                    </div>
                </CardHeader>
                <CardContent className="p-0 flex-1">
                    <ScrollArea className="h-full">
                        <div className="p-2 space-y-1">
                            {conversations.map((convo) => (
                                <Button
                                    key={convo.id}
                                    variant={activeConversation.id === convo.id ? 'secondary' : 'ghost'}
                                    className="w-full h-auto justify-start p-3"
                                    onClick={() => setActiveConversation(convo)}
                                >
                                    <div className="relative">
                                        <Avatar className="h-10 w-10 mr-4">
                                            <AvatarImage src={convo.avatar} data-ai-hint={convo.dataAiHint} />
                                            <AvatarFallback>{convo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        {convo.online && <div className="absolute bottom-0 right-4 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></div>}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold">{convo.name}</p>
                                        <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{convo.lastMessageTime}</span>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Janela de Bate-papo */}
            <Card className="flex flex-col h-full">
                <CardHeader className="flex flex-row items-center gap-4 p-4 border-b">
                     <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                            <AvatarFallback>{activeConversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                         {activeConversation.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></div>}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">{activeConversation.name}</h2>
                        {activeConversation.online && <p className="text-sm text-green-500">Online</p>}
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-0 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-6">
                            {messages.map((msg) => (
                                <div key={msg.id} className={cn("flex w-full items-end gap-2", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
                                    {msg.sender !== 'me' && 
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                                            <AvatarFallback>{activeConversation.name.substring(0,2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    }
                                    <div className={cn(
                                        "max-w-[70%] rounded-lg px-4 py-2",
                                        msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none'
                                    )}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                    {msg.sender === 'me' && 
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="https://placehold.co/100x100" data-ai-hint="person portrait" />
                                            <AvatarFallback>EU</AvatarFallback>
                                        </Avatar>
                                    }
                                </div>
                            ))}
                             <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="p-4 border-t bg-background">
                    <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                        <Input 
                            id="message" 
                            placeholder="Digite uma mensagem..." 
                            className="flex-1" 
                            autoComplete="off" 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Enviar</span>
                        </Button>
                    </form>
                </CardFooter>
            </Card>
        </div>
    );
}
