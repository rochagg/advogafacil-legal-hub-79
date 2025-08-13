
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, ExternalLink } from "lucide-react";

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
    nome: "Assistente Jurídico Inteligente",
    descricao: "Assistente completo para diversas demandas jurídicas com inteligência artificial avançada.",
    url: "https://chatgpt.com/g/g-voDufEYMc-assistente-juridico-inteligente-2-0"
  },
  {
    id: 9,
    nome: "GPT Criador de Perguntas para Audiências",
    descricao: "Desenvolve perguntas estratégicas e eficazes para audiências judiciais e administrativas.",
    url: "https://chatgpt.com/g/g-MXaPaxUDI-gpt-criador-de-perguntas-para-audiencia"
  },
  {
    id: 10,
    nome: "GPT Consulta de Direito Empresarial",
    descricao: "Especialista em questões de direito empresarial, societário e comercial.",
    url: "https://chatgpt.com/g/g-YqGF2p7pg-gpt-consulta-de-direito-empresarial"
  },
  {
    id: 11,
    nome: "GPT Criador de Minuta de Contrato",
    descricao: "Elabora minutas de contratos personalizadas para diferentes tipos de negócios jurídicos.",
    url: "https://chatgpt.com/g/g-s3Y4I9YXz-gpt-criacao-de-minuta-de-contrato"
  },
  {
    id: 12,
    nome: "GPT Elaboração de Roteiro para sustentação oral",
    descricao: "Cria roteiros estruturados e eficazes para sustentações orais em tribunais.",
    url: "https://chatgpt.com/g/g-7uFCRc0DW-gpt-elaboracao-de-roteiro-para-sustentacao-oral"
  },
  {
    id: 13,
    nome: "GPT Calendário de conteúdo de marketing jurídico atual",
    descricao: "Desenvolve estratégias de conteúdo e calendários de marketing para escritórios de advocacia.",
    url: "https://chatgpt.com/g/g-hZVT0Q9sb-gpt-calendario-de-conteudo-marketing-juridico"
  },
  {
    id: 14,
    nome: "GPT Criador de texto para redes sociais",
    descricao: "Cria conteúdo especializado para redes sociais de profissionais e escritórios jurídicos.",
    url: "https://chatgpt.com/g/g-UVBoL98MP-gpt-criador-de-texto-para-redes-sociais"
  },
  {
    id: 15,
    nome: "Assistente Jurídico Inteligente 2.0",
    descricao: "Versão aprimorada do assistente jurídico com funcionalidades expandidas e maior precisão.",
    url: "https://chatgpt.com/g/g-voDufEYMc-assistente-juridico-inteligente-2-0"
  },
  {
    id: 16,
    nome: "GPT Elaboração de Contranotificação",
    descricao: "Especializado na elaboração de contranotificações juridicamente fundamentadas.",
    url: "https://chatgpt.com/g/g-Qd5jls8dR-gpt-elaboracao-de-contranotificacao"
  },
  {
    id: 17,
    nome: "JARBAS Assessor de Juiz",
    descricao: "Assistente especializado para auxiliar magistrados em análises processuais e decisões judiciais.",
    url: "https://chatgpt.com/g/g-sQCbtYIhv-jarbas-assessor-de-juiz"
  },
  {
    id: 18,
    nome: "GPT Elaborador de Memoriais Finais (autor)",
    descricao: "Elabora memoriais finais completos e bem estruturados para a parte autora em processos judiciais.",
    url: "https://chatgpt.com/g/g-luEvadT1C-gpt-elaborar-memoriais-finais-autor"
  },
  {
    id: 19,
    nome: "Elaborador de Quesitos para Pericia Judicial",
    descricao: "Desenvolve quesitos técnicos e precisos para perícias judiciais em diversas áreas.",
    url: "https://chatgpt.com/g/g-7c9wBDUBM-gpt-elaboracao-de-quesitos-para-pericia-judicial"
  },
  {
    id: 20,
    nome: "GPT Judiciário - Sentenças Penais",
    descricao: "Especializado na elaboração e análise de sentenças penais com rigor técnico e jurídico.",
    url: "https://chatgpt.com/g/g-675855344a4c8191aad90d91150fe00f-gpt-judiciario-sentencas-penais"
  }
];

const RobosJuridicos = () => {
  const abrirRobo = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Robôs Jurídicos</h1>
              <p className="text-lg text-muted-foreground">
                Acesse nossa coleção completa de assistentes especializados
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {robos.map((robo) => (
            <Card key={robo.id} className="flex flex-col shadow-card-legal hover:shadow-legal transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg leading-tight line-clamp-2">{robo.nome}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <CardDescription className="text-sm leading-relaxed flex-1">
                  {robo.descricao}
                </CardDescription>
                <Button
                  onClick={() => abrirRobo(robo.url)}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white mt-auto"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Usar Robô
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="border-primary/20 bg-primary/5 shadow-card-legal">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Bot className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-primary">Como usar os robôs?</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Cada robô é especializado em uma função específica. Clique em "Usar Robô" para 
                acessar diretamente a ferramenta e começar a utilizá-la imediatamente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RobosJuridicos;
