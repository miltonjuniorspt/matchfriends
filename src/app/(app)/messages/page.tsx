"use client";

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';


const initialMessages = [
  { id: 1, text: "Olá! Tudo bem? Gostei do seu perfil 😊", sender: 'other' },
  { id: 2, text: "Oii, tudo ótimo e com você? Obrigado! Também gostei do seu.", sender: 'me' },
  { id: 3, text: "Tudo bem também! O que você mais gosta de fazer no seu tempo livre?", sender: 'other' },
  { id: 4, text: "Gosto muito de ir à praia, ler um bom livro e sair pra conhecer lugares novos. E você?", sender: 'me' },
  { id: 5, text: "Que legal! 😄", sender: 'other' },
];

export default function MessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeConversation, setActiveConversation] = useState<any>(null);
    const [conversations, setConversations] = useState<any[]>([]);
    const [currentUserAvatar, setCurrentUserAvatar] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        try {
            const storedUsersRaw = localStorage.getItem("users");
            const storedUserRaw = localStorage.getItem("user");

            if (storedUsersRaw && storedUserRaw) {
                const allUsers = JSON.parse(storedUsersRaw);
                const loggedInUser = JSON.parse(storedUserRaw);
                
                setCurrentUserAvatar(loggedInUser.avatar);

                const otherUsers = allUsers.filter((u: any) => u.email !== loggedInUser.email);
                
                const conversationList = otherUsers.map((user: any, index: number) => ({
                    id: user.email,
                    name: user.name,
                    avatar: user.avatar || 'https://placehold.co/100x100',
                    dataAiHint: 'person portrait',
                    lastMessage: ['Que legal! 😄', 'Combinado então!', 'hahaha, pode deixar', 'Até mais!'][index % 4],
                    lastMessageTime: ['10:42', 'Ontem', '2d', '3d'][index % 4],
                    online: index % 2 === 0,
                }));
                
                setConversations(conversationList);
                if (conversationList.length > 0) {
                    setActiveConversation(conversationList[0]);
                }
            }
        } catch (error) {
            console.error("Falha ao carregar conversas do localStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        if (activeConversation) {
            const dynamicMessages = initialMessages.map(msg => ({
                ...msg,
                sender: msg.sender === 'me' ? 'me' : activeConversation.name,
            }));
            setMessages(dynamicMessages);
        }
    }, [activeConversation]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim() === '' || !activeConversation) return;

        const myMessage = {
            id: messages.length + 1,
            text: newMessage,
            sender: 'me',
        };

        setMessages(prev => [...prev, myMessage]);
        setNewMessage('');
    };

    if (isLoading) {
        return (
            <div className="flex w-full items-center justify-center py-8">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }
    
    if (conversations.length === 0) {
        return (
            <div className="flex w-full items-center justify-center py-8">
                <p className="text-muted-foreground">Nenhum outro usuário cadastrado para conversar.</p>
            </div>
        );
    }
    
    if (!activeConversation) {
        return (
             <div className="flex w-full items-center justify-center py-8">
                <p className="text-muted-foreground">Selecione uma conversa para começar.</p>
            </div>
        )
    }

    return (
        <div className="flex w-full flex-1 gap-4 py-8">
            {/* Lista de Conversas */}
            <Card className="hidden w-[300px] flex-col md:flex lg:w-[350px]">
                <CardHeader className="border-b p-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Buscar conversas..." className="pl-8" />
                    </div>
                </CardHeader>
                <CardContent className="flex-1 p-0">
                    <ScrollArea className="h-full">
                        <div className="space-y-1 p-2">
                            {conversations.map((convo) => (
                                <Button
                                    key={convo.id}
                                    variant={activeConversation.id === convo.id ? 'secondary' : 'ghost'}
                                    className="h-auto w-full justify-start p-3"
                                    onClick={() => setActiveConversation(convo)}
                                >
                                    <div className="relative">
                                        <Avatar className="mr-4 h-10 w-10">
                                            <AvatarImage src={convo.avatar} data-ai-hint={convo.dataAiHint} />
                                            <AvatarFallback>{convo.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        {convo.online && <div className="absolute bottom-0 right-4 h-3 w-3 rounded-full border-2 border-background bg-green-500"></div>}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-semibold">{convo.name}</p>
                                        <p className="truncate text-sm text-muted-foreground">{convo.lastMessage}</p>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{convo.lastMessageTime}</span>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Janela de Bate-papo */}
            <Card className="flex flex-1 flex-col">
                <CardHeader className="flex flex-row items-center gap-4 border-b p-4">
                     <div className="relative">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={activeConversation.avatar} data-ai-hint={activeConversation.dataAiHint} />
                            <AvatarFallback>{activeConversation.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                         {activeConversation.online && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-card bg-green-500"></div>}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">{activeConversation.name}</h2>
                        {activeConversation.online && <p className="text-sm text-green-500">Online</p>}
                    </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                    <ScrollArea className="h-full">
                        <div className="space-y-6 p-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={cn("flex w-full items-end gap-2", msg.sender === 'me' ? 'justify-end' : 'justify-start')}>
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
                                            <AvatarImage src={currentUserAvatar || "https://placehold.co/100x100"} data-ai-hint="person portrait" />
                                            <AvatarFallback>EU</AvatarFallback>
                                        </Avatar>
                                    }
                                </div>
                            ))}
                             <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>
                </CardContent>
                <CardFooter className="border-t bg-background p-4">
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
