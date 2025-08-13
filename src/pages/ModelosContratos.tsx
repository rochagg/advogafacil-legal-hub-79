import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ExternalLink, Clock, Sparkles } from "lucide-react";

const ModelosContratos = () => {
  const handleOpenDrive = () => {
    window.open('https://drive.google.com/drive/folders/1xII4tcgQpHQie3l9ox8WO6WK4l9LYmzi?usp=sharing', '_blank');
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Modelos de Peças e Contratos Jurídicos</h1>
              <p className="text-lg text-muted-foreground">
                Acesso completo ao nosso extenso banco de modelos jurídicos
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-card-legal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Pack Completo de Modelos Jurídicos
              </CardTitle>
              <CardDescription>
                Mais de 100.000 documentos jurídicos atualizados e prontos para uso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-4 text-primary">O que está incluído:</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Peças Jurídicas
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span>Mais de 80.000 modelos de peças jurídicas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span>Teses prontas de 2015 a 2025</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span>Atualizações mensais com novos modelos</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      Contratos Jurídicos
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span>Mais de 20.000 modelos de contratos</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span>Todas as áreas do direito</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                        <span>Modelos constantemente atualizados</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-accent mb-2">Novidade em Breve!</h3>
                      <p className="text-sm text-muted-foreground">
                        Em breve serão adicionados modelos com <strong>VisualLaw</strong>, 
                        revolucionando a apresentação e compreensão dos documentos jurídicos 
                        com design visual moderno e intuitivo.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-muted bg-muted/30">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Sempre Atualizado</h3>
                      <p className="text-sm text-muted-foreground">
                        Nosso banco de dados é constantemente atualizado com novos modelos 
                        a cada mês, garantindo que você tenha sempre acesso às mais recentes 
                        tendências e mudanças legislativas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button 
                  onClick={handleOpenDrive}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Acessar Pack de Modelos
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Acesso via Google Drive - Material exclusivo AdvogaFácil
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModelosContratos;