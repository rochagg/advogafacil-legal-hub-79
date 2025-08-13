import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Headphones, Mail, Clock, Calendar, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Suporte = () => {
  const suporteEmail = "advogafacil4.0@gmail.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(suporteEmail).then(() => {
      toast({
        title: "Email copiado!",
        description: "O email de suporte foi copiado para a área de transferência.",
      });
    });
  };

  const abrirEmail = () => {
    window.location.href = `mailto:${suporteEmail}`;
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Suporte AdvogaFácil</h1>
              <p className="text-lg text-muted-foreground">
                Estamos aqui para ajudá-lo com qualquer dúvida ou dificuldade
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="shadow-card-legal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Entre em Contato
              </CardTitle>
              <CardDescription>
                Nossa equipe de suporte está pronta para atendê-lo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email de Suporte:</label>
                    <p className="font-mono text-lg">{suporteEmail}</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={copyEmail}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={abrirEmail}
                  className="flex-1 bg-gradient-primary hover:opacity-90 text-white"
                  size="lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Email
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 shadow-card-legal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Horários de Atendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Dias de Atendimento:</p>
                    <p className="text-muted-foreground">Segunda, Quarta e Sexta-feira</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Horário:</p>
                    <p className="text-muted-foreground">9h às 18h</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-legal">
            <CardHeader>
              <CardTitle>Como podemos ajudar?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-primary">Problemas Técnicos</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Dificuldade para acessar a plataforma</li>
                    <li>• Problemas com login</li>
                    <li>• Erros nos robôs jurídicos</li>
                    <li>• Questões de performance</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-primary">Dúvidas de Uso</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Como usar os robôs jurídicos</li>
                    <li>• Orientações sobre funcionalidades</li>
                    <li>• Sugestões de melhorias</li>
                    <li>• Solicitação de novos recursos</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-accent/5 shadow-card-legal">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-accent rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-accent mb-2">Resposta Garantida</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa equipe se compromete a responder todos os emails de suporte 
                    dentro do horário comercial estabelecido. Para urgências, 
                    recomendamos entrar em contato nos dias e horários especificados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Suporte;