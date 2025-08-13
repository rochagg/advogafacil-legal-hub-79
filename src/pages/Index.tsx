import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Brain, Bot, BookOpen, Headphones, ArrowRight, Sparkles, FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Plataforma de IA",
      description: "Acesse nossa plataforma exclusiva de inteligência artificial jurídica",
      path: "/plataforma-ia",
      color: "bg-blue-500"
    },
    {
      icon: Bot,
      title: "Robôs Jurídicos",
      description: "20 assistentes especializados em diferentes áreas do direito",
      path: "/robos-juridicos",
      color: "bg-purple-500"
    },
    {
      icon: BookOpen,
      title: "Guia de Peças",
      description: "Guia definitivo para elaboração de peças jurídicas com IA",
      path: "/guia-pecas",
      color: "bg-green-500"
    },
    {
      icon: FolderOpen,
      title: "Modelos de Peças e Contratos Jurídicos",
      description: "+100k modelos de peças jurídicas, teses e contratos",
      path: "/modelos-contratos",
      color: "bg-red-500"
    },
    {
      icon: Headphones,
      title: "Suporte",
      description: "Nossa equipe está pronta para ajudá-lo",
      path: "/suporte",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/10">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-xl shadow-legal">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AdvogaFácil
              </h1>
              <p className="text-lg text-muted-foreground">Tecnologia Jurídica Inteligente</p>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Revolucione sua prática jurídica com 
              <span className="text-primary"> Inteligência Artificial</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Plataforma completa com robôs especializados, ferramentas de IA e recursos 
              exclusivos para advogados, juízes e profissionais do direito.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Mais de 20 assistentes jurídicos especializados</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="shadow-card-legal hover:shadow-legal transition-all duration-300 cursor-pointer group border-border/50"
                onClick={() => navigate(feature.path)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center justify-center text-primary text-sm font-medium group-hover:text-accent transition-colors">
                    Acessar <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-primary text-white shadow-legal">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold mb-4">
                Pronto para transformar sua prática jurídica?
              </h3>
              <p className="text-lg mb-6 opacity-90">
                Comece explorando nossa plataforma de IA ou acesse diretamente nossos robôs especializados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate("/plataforma-ia")}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Acessar Plataforma de IA
                </Button>
                <Button
                  onClick={() => navigate("/robos-juridicos")}
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Bot className="w-4 h-4 mr-2" />
                  Ver Robôs Jurídicos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
