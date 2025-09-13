'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Mail, MessageCircle, Clock, Users, Phone, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function SuportePage() {
  const canaisSuportes = [
    {
      id: 1,
      titulo: "Chat Online",
      descricao: "Suporte instantâneo via chat em tempo real",
      icone: MessageCircle,
      disponibilidade: "24/7",
      tempo: "Resposta imediata",
      acao: "Iniciar Chat"
    },
    {
      id: 2,
      titulo: "Email Suporte",
      descricao: "Envie suas dúvidas detalhadas por email",
      icone: Mail,
      disponibilidade: "24/7",
      tempo: "Até 2 horas",
      acao: "Enviar Email"
    },
    {
      id: 3,
      titulo: "Telefone",
      descricao: "Fale diretamente com nossa equipe",
      icone: Phone,
      disponibilidade: "Seg-Sex 8h-18h",
      tempo: "Atendimento direto",
      acao: "Ligar Agora"
    },
    {
      id: 4,
      titulo: "WhatsApp",
      descricao: "Suporte rápido pelo WhatsApp",
      icone: ExternalLink,
      disponibilidade: "24/7",
      tempo: "Poucos minutos",
      acao: "Abrir WhatsApp"
    }
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
                <Headphones className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Suporte Técnico</h1>
                <p className="text-lg text-muted-foreground">Nossa equipe está pronta para ajudá-lo</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {canaisSuportes.map((canal) => (
              <Card key={canal.id} className="shadow-card-legal hover:shadow-legal transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <canal.icone className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{canal.titulo}</CardTitle>
                  </div>
                  <CardDescription>{canal.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{canal.disponibilidade}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{canal.tempo}</span>
                    </div>
                  </div>
                  <Button className="w-full">
                    {canal.acao}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="shadow-card-legal">
            <CardHeader>
              <CardTitle>Perguntas Frequentes</CardTitle>
              <CardDescription>Respostas para as dúvidas mais comuns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-2">Como acessar a Plataforma de IA?</h4>
                  <p className="text-sm text-muted-foreground">
                    Use as credenciais disponíveis na seção &quot;Plataforma IA&quot; do menu principal. 
                    Lembre-se que a senha é atualizada a cada 5 dias.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-2">Os robôs jurídicos são gratuitos?</h4>
                  <p className="text-sm text-muted-foreground">
                    Sim! Todos os 20 robôs especializados estão disponíveis gratuitamente 
                    para nossos usuários cadastrados.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-medium mb-2">Como baixar os modelos de contratos?</h4>
                  <p className="text-sm text-muted-foreground">
                    Acesse a seção &quot;Modelos de Peças e Contratos&quot; e selecione a categoria desejada. 
                    Todos os modelos estão organizados por área de atuação.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
