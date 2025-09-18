'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2, RefreshCw } from "lucide-react";
import { OpenAIService } from "@/services/openai";
import { useAuth } from "@/contexts/AuthContext";
import { ChatHistoryService } from "@/services/chatHistory";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  // Removido apiKey já que agora está no servidor
}

export function ChatInterface({}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openaiService, setOpenaiService] = useState<OpenAIService | null>(null);
  const [apiStatus, setApiStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  // Função para carregar histórico do usuário
  const loadChatHistory = useCallback(async () => {
    if (!user?.id) return;

    try {
      const history = await ChatHistoryService.getUserMessageHistory(user.id, 50);
      
      if (history.length > 0) {
        const formattedMessages: Message[] = history.map(msg => ({
          id: msg.id?.toString() || Date.now().toString(),
          role: msg.role,
          content: msg.content,
          timestamp: new Date(msg.created_at || Date.now()),
        }));
        
        setMessages(formattedMessages);
        setHistoryLoaded(true);
      } else {
        // Primeira vez do usuário - mensagem de boas-vindas
        const welcomeMessage: Message = {
          id: 'welcome',
          role: 'assistant',
          content: 'Olá! Sou seu assistente jurídico da AdvogaFácil. Como posso ajudá-lo hoje? Este é o início do nosso histórico de conversas.',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
        setHistoryLoaded(true);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
      // Fallback para mensagem de boas-vindas
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: 'Olá! Sou seu assistente jurídico da AdvogaFácil. Como posso ajudá-lo hoje?',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
      setHistoryLoaded(true);
    }
  }, [user?.id]);

  // Função para limpar histórico
  const clearHistory = useCallback(async () => {
    if (!user?.id) return;

    try {
      await ChatHistoryService.clearUserHistory(user.id);
      setMessages([]);
      await loadChatHistory(); // Recarregar para mostrar mensagem de boas-vindas
    } catch (error) {
      console.error('Erro ao limpar histórico:', error);
    }
  }, [user?.id, loadChatHistory]);

  // Inicializar o serviço OpenAI e verificar status da API
  useEffect(() => {
    const initializeChat = async () => {
      // Verificar se a API está disponível
      const isApiAvailable = await OpenAIService.checkApiStatus();
      setApiStatus(isApiAvailable ? 'available' : 'unavailable');

      // Inicializar o serviço
      setOpenaiService(new OpenAIService());

      // Carregar histórico se usuário estiver logado
      if (user?.id && isApiAvailable) {
        await loadChatHistory();
      } else {
        // Adicionar mensagem inicial se não há usuário ou API não disponível
        const welcomeMessage: Message = {
          id: 'welcome',
          role: 'assistant',
          content: !user 
            ? '⚠️ Faça login para acessar o histórico do chat.'
            : !isApiAvailable 
            ? '⚠️ API OpenAI não está configurada no servidor. Entre em contato com o administrador.'
            : 'Olá! Sou seu assistente jurídico da AdvogaFácil. Como posso ajudá-lo hoje?',
          timestamp: new Date(),
        };
        setMessages([welcomeMessage]);
      }
    };

    initializeChat();
  }, [user, loadChatHistory]);

  // Scroll automático para a última mensagem
  useEffect(() => {
    const scrollToBottom = () => {
      // Método 1: Scroll usando referência direta
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Método 2: Scroll usando container div (fallback)
      if (scrollAreaRef.current) {
        setTimeout(() => {
          scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }, 100);
      }
    };

    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      if (!openaiService || apiStatus !== 'available') {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '⚠️ O serviço de IA não está disponível no momento. Verifique a configuração da API no servidor.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }

      if (!user?.id) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '⚠️ Você precisa estar logado para usar o chat.',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
      }

      // Chamar nova API que gerencia o histórico automaticamente
      const response = await openaiService.sendMessage(userMessage.content, user.id);

      if (response.error) {
        throw new Error(response.error);
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Forçar scroll após adicionar resposta
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
    } catch (error) {
      console.error('Erro no chat:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `❌ Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Focar novamente no input após enviar
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="w-full h-[75vh] max-h-[750px] flex flex-col overflow-hidden">
      <CardHeader className="pb-3 flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            Chat Jurídico IA
          </div>
          {user?.id && historyLoaded && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearHistory}
              className="text-xs"
              disabled={isLoading}
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Limpar histórico
            </Button>
          )}
        </CardTitle>
        <Separator />
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
        {/* Área de mensagens */}
        <div 
          ref={scrollAreaRef} 
          className="flex-1 overflow-y-scroll overflow-x-hidden"
          style={{ 
            scrollbarWidth: 'auto',
            scrollbarColor: 'rgba(156, 163, 175, 0.8) rgba(243, 244, 246, 0.5)'
          }}
        >
          <div className="space-y-4 py-4 px-4 pr-2">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.role === 'assistant' && (
                  <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-primary">
                      <Bot className="w-4 h-4 text-white" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`flex flex-col min-w-0 ${
                  message.role === 'user' 
                    ? 'max-w-[calc(100%-3rem)] items-end' 
                    : 'max-w-[calc(100%-3rem)] items-start'
                }`}>
                  <div
                    className={`rounded-lg px-3 py-2 word-wrap break-words overflow-wrap-anywhere max-w-full ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <p 
                      className="text-sm whitespace-pre-wrap"
                      style={{ 
                        wordBreak: 'break-word', 
                        overflowWrap: 'anywhere',
                        hyphens: 'auto',
                        maxWidth: '100%'
                      }}
                    >
                      {message.content}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {formatTime(message.timestamp)}
                  </p>
                </div>

                {message.role === 'user' && (
                  <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-secondary">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {/* Indicador de carregamento */}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8 mt-1">
                  <AvatarFallback className="bg-primary">
                    <Bot className="w-4 h-4 text-white" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-3 py-2 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Digitando...</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Referência para scroll automático */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de input */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex gap-2 w-full">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua pergunta jurídica..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}