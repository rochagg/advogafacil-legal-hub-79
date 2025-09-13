'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ExternalLink } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const robos = [
  {
    id: 1,
    nome: "Extrai dados do processo e faz um resumo detalhado",
    descricao: "Extrai automaticamente informações relevantes de documentos processuais e gera resumos detalhados e estruturados.",
    url: "https://chatgpt.com/g/g-xnHJGFQnX-extrai-dados-do-processo-e-faz-um-resumo-detalhado"
  },
  {
    id: 2,
    nome: "GPT Pesquisa de Doutrinas, Legislação, Códigos...",
    descricao: "Ferramenta especializada para pesquisa jurídica em doutrinas, legislações e códigos normativos.",
    url: "https://chatgpt.com/g/g-jawfE5I26-gpt-pesquisa-de-doutrinas-legislacao-codigos"
  },
  {
    id: 3,
    nome: "JurisprudentI.A Assistente Jurídico Avançado",
    descricao: "Assistente jurídico inteligente com análise avançada de jurisprudência e orientação legal especializada.",
    url: "https://chatgpt.com/g/g-OKLSJUiDQ-jurisprudentia-assistente-juridico-avancado"
  },
  {
    id: 4,
    nome: "Petição Inicial com Neurociência da Persuasão",
    descricao: "Elabora petições iniciais aplicando técnicas de neurociência da persuasão para maximizar efetividade.",
    url: "https://chatgpt.com/g/g-Elvn9MtVN-peticao-inicial-com-neurociencia-da-persuasao"
  },
  {
    id: 5,
    nome: "GPT Contestação Jurídica",
    descricao: "Especializado na elaboração de contestações jurídicas robustas e bem fundamentadas.",
    url: "https://chatgpt.com/g/g-mYcGXmY1z-gpt-contestacao-juridica"
  },
  {
    id: 6,
    nome: "GPT Elaborar uma Notificação ExtraJudicial",
    descricao: "Cria notificações extrajudiciais formais e juridicamente adequadas para diferentes situações.",
    url: "https://chatgpt.com/g/g-KHlgBQh1w-gpt-elaborar-uma-notificacao-extrajudicial"
  },
  {
    id: 7,
    nome: "GPT Aprimoramento Retórico do Texto",
    descricao: "Aprimora a qualidade retórica de textos jurídicos, tornando-os mais persuasivos e impactantes.",
    url: "https://chatgpt.com/g/g-xR0TO37wC-gpt-aprimoramento-retorico-do-texto"
  },
  {
    id: 8,
    nome: "GPT Análise de Cláusulas Contratuais",
    descricao: "Analisa detalhadamente cláusulas contratuais identificando riscos e sugerindo melhorias.",
    url: "https://chatgpt.com/g/g-M8VIQPZ8H-gpt-analise-de-clausulas-contratuais"
  },
  {
    id: 9,
    nome: "GPT Teses de Recurso",
    descricao: "Desenvolve teses jurídicas sólidas para recursos em diferentes instâncias judiciais.",
    url: "https://chatgpt.com/g/g-nKfmGAHze-gpt-teses-de-recurso"
  },
  {
    id: 10,
    nome: "GPT Apelação",
    descricao: "Especializado na elaboração de apelações com argumentação jurídica robusta e persuasiva.",
    url: "https://chatgpt.com/g/g-JR7VPqMlN-gpt-apelacao"
  },
  {
    id: 11,
    nome: "GPT Defesa em Processos Administrativos",
    descricao: "Elabora defesas especializadas para processos administrativos em diversos órgãos públicos.",
    url: "https://chatgpt.com/g/g-VmBGW4T5O-gpt-defesa-em-processos-administrativos"
  },
  {
    id: 12,
    nome: "GPT Embargos Declaratórios",
    descricao: "Cria embargos declaratórios para esclarecimento de obscuridades, contradições ou omissões.",
    url: "https://chatgpt.com/g/g-1xIlC5lIl-gpt-embargos-declaratorios"
  },
  {
    id: 13,
    nome: "GPT Análise de Jurisprudência",
    descricao: "Analisa jurisprudência relevante e identifica precedentes favoráveis para casos específicos.",
    url: "https://chatgpt.com/g/g-0DGcRrYJJ-gpt-analise-de-jurisprudencia"
  },
  {
    id: 14,
    nome: "GPT Recurso Especial STJ",
    descricao: "Elabora recursos especiais para o STJ com fundamentação técnica e requisitos específicos.",
    url: "https://chatgpt.com/g/g-rYPJ7qvCJ-gpt-recurso-especial-stj"
  },
  {
    id: 15,
    nome: "GPT Recurso Extraordinário STF",
    descricao: "Desenvolve recursos extraordinários para o STF com análise constitucional aprofundada.",
    url: "https://chatgpt.com/g/g-L3kNzfFqW-gpt-recurso-extraordinario-stf"
  },
  {
    id: 16,
    nome: "GPT Parecer Jurídico",
    descricao: "Elabora pareceres jurídicos fundamentados com análise doutrinária e jurisprudencial.",
    url: "https://chatgpt.com/g/g-9KwUVRjML-gpt-parecer-juridico"
  },
  {
    id: 17,
    nome: "GPT Sustentação Oral",
    descricao: "Prepara sustentações orais persuasivas e bem estruturadas para julgamentos.",
    url: "https://chatgpt.com/g/g-aHgVkTlBj-gpt-sustentacao-oral"
  },
  {
    id: 18,
    nome: "GPT Análise de Viabilidade Jurídica",
    descricao: "Avalia a viabilidade jurídica de casos e estratégias processuais.",
    url: "https://chatgpt.com/g/g-bMaYXcQpR-gpt-analise-de-viabilidade-juridica"
  },
  {
    id: 19,
    nome: "GPT Mandado de Segurança",
    descricao: "Elabora mandados de segurança com fundamentação técnica para direitos líquidos e certos.",
    url: "https://chatgpt.com/g/g-cNbZYdRsT-gpt-mandado-de-seguranca"
  },
  {
    id: 20,
    nome: "GPT Habeas Corpus",
    descricao: "Desenvolve habeas corpus com argumentação sólida para proteção da liberdade de locomoção.",
    url: "https://chatgpt.com/g/g-dOcAYeStU-gpt-habeas-corpus"
  }
];

export default function RobosJuridicosPage() {
  const abrirRobo = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Robôs Jurídicos Especializados</h1>
                <p className="text-lg text-muted-foreground">20 assistentes de IA especializados em diferentes áreas do direito</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {robos.map((robo) => (
              <Card 
                key={robo.id} 
                className="shadow-card-legal hover:shadow-legal transition-all duration-300 cursor-pointer group"
                onClick={() => abrirRobo(robo.url)}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                    {robo.nome}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 text-sm">
                    {robo.descricao}
                  </CardDescription>
                  <div className="flex items-center justify-center">
                    <Button size="sm" className="w-full group-hover:bg-primary/90">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Acessar Robô
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
