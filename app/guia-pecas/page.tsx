'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileText, Scale, Users, BookMarked, PenTool, Download } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { toast } from "@/hooks/use-toast";

export default function GuiaPecasPage() {
  const guias = [
    {
      id: 1,
      titulo: "Petição Inicial",
      descricao: "Guia completo para elaboração de petições iniciais eficazes",
      icone: FileText,
      conteudo: "Como estruturar adequadamente uma petição inicial, incluindo requisitos legais, fundamentação jurídica e estratégias persuasivas.",
      arquivo: "guia-peticao-inicial.pdf"
    },
    {
      id: 2,
      titulo: "Contestação",
      descricao: "Técnicas avançadas para elaboração de contestações robustas",
      icone: Scale,
      conteudo: "Estratégias defensivas, análise de preliminares, defesa de mérito e construção de argumentos sólidos.",
      arquivo: "guia-contestacao.pdf"
    },
    {
      id: 3,
      titulo: "Recursos",
      descricao: "Domínio completo da técnica recursal",
      icone: BookMarked,
      conteudo: "Apelação, agravo, embargos e recursos especiais/extraordinários com fundamentação técnica especializada.",
      arquivo: "guia-recursos.pdf"
    },
    {
      id: 4,
      titulo: "Pareceres Jurídicos",
      descricao: "Elaboração de pareceres técnicos fundamentados",
      icone: PenTool,
      conteudo: "Estruturação de pareceres jurídicos com análise doutrinária, jurisprudencial e conclusões técnicas.",
      arquivo: "guia-pareceres.pdf"
    }
  ];

  const handleDownload = (nomeArquivo: string, tituloGuia: string) => {
    try {
      // Fazer download do arquivo
      const link = document.createElement('a');
      link.href = `/docs/${nomeArquivo}`;
      link.download = nomeArquivo;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Mostrar feedback de sucesso
      toast({
        title: "Download iniciado!",
        description: `O guia "${tituloGuia}" está sendo baixado.`,
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadCompleto = () => {
    try {
      // Fazer download do guia completo
      const link = document.createElement('a');
      link.href = '/docs/guia-completo-pecas-juridicas.pdf';
      link.download = 'guia-completo-pecas-juridicas.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Mostrar feedback de sucesso
      toast({
        title: "Download iniciado!",
        description: "O Guia Completo de Peças Jurídicas está sendo baixado.",
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Guia de Peças Jurídicas</h1>
                  <p className="text-lg text-muted-foreground">Guia definitivo para elaboração de peças jurídicas com IA</p>
                </div>
              </div>
              <Button 
                onClick={handleDownloadCompleto}
                className="flex items-center gap-2"
                size="lg"
              >
                <Download className="w-5 h-5" />
                Baixar Guia Completo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guias.map((guia) => (
              <Card key={guia.id} className="shadow-card-legal hover:shadow-legal transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <guia.icone className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{guia.titulo}</CardTitle>
                  </div>
                  <CardDescription>{guia.descricao}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{guia.conteudo}</p>
                  {/* <Button 
                    onClick={() => handleDownload(guia.arquivo, guia.titulo)}
                    variant="outline"
                    className="w-full flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Baixar {guia.titulo}
                  </Button> */}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8 shadow-card-legal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Metodologia Exclusiva
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Nosso guia de peças jurídicas é desenvolvido com base em anos de experiência prática e 
                análise de jurisprudência atualizada. Cada seção contém técnicas comprovadas para 
                maximizar a efetividade de suas peças processuais, combinando tradição jurídica com 
                inovação tecnológica da inteligência artificial.
              </p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
