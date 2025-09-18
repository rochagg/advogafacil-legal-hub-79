'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Download, FileText, Building, Users, Briefcase } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ModelosContratosPage() {
  const handleAcessarModelos = () => {
    const url = "https://drive.google.com/drive/folders/1xII4tcgQpHQie3l9ox8WO6WK4l9LYmzi?usp=sharing";
    window.open(url, '_blank');
  };

  const categorias = [
    {
      id: 1,
      titulo: "Contratos Empresariais",
      descricao: "Modelos para relações comerciais e empresariais",
      icone: Building,
      quantidade: "25,000+",
      exemplos: ["Compra e Venda", "Prestação de Serviços", "Sociedade", "Distribuição"]
    },
    {
      id: 2,
      titulo: "Contratos Trabalhistas",
      descricao: "Documentos para relações de trabalho",
      icone: Users,
      quantidade: "15,000+",
      exemplos: ["CLT", "Terceirização", "Consultoria", "Acordo Coletivo"]
    },
    {
      id: 3,
      titulo: "Peças Processuais",
      descricao: "Modelos de petições e peças jurídicas",
      icone: FileText,
      quantidade: "40,000+",
      exemplos: ["Petição Inicial", "Contestação", "Recurso", "Parecer"]
    },
    {
      id: 4,
      titulo: "Contratos Imobiliários",
      descricao: "Documentos para transações imobiliárias",
      icone: Briefcase,
      quantidade: "20,000+",
      exemplos: ["Compra e Venda", "Locação", "Financiamento", "Incorporação"]
    }
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Modelos de Peças e Contratos</h1>
                <p className="text-lg text-muted-foreground">+100k modelos de peças jurídicas, teses e contratos</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {categorias.map((categoria) => (
              <Card key={categoria.id} className="shadow-card-legal hover:shadow-legal transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <categoria.icone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{categoria.titulo}</CardTitle>
                      <p className="text-sm text-primary font-medium">{categoria.quantidade} modelos</p>
                    </div>
                  </div>
                  <CardDescription>{categoria.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Exemplos inclusos:</h4>
                    <div className="flex flex-wrap gap-1">
                      {categoria.exemplos.map((exemplo, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                        >
                          {exemplo}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleAcessarModelos}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Acessar Modelos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-primary text-white shadow-legal">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Biblioteca Jurídica Completa</h3>
              <p className="text-lg mb-6 opacity-90">
                Acesse nossa vasta coleção de modelos jurídicos atualizados e revisados por especialistas. 
                Todos os documentos são baseados na legislação vigente e jurisprudência consolidada.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold">100k+</p>
                  <p className="text-sm opacity-80">Modelos</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-sm opacity-80">Categorias</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-sm opacity-80">Acesso</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">100%</p>
                  <p className="text-sm opacity-80">Atualizados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
