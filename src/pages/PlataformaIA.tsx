import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Copy, ExternalLink, Shield } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const PlataformaIA = () => {
  const credentials = {
    email: "advogafacil4.0@gmail.com",
    password: "Acessoexclusivo21@"
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copiado!",
        description: `${type} copiado para a área de transferência.`,
      });
    });
  };

  const openPlatform = () => {
    window.open("https://allcraft.ai/auth/login", "_blank");
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Plataforma de Inteligência Artificial</h1>
              <p className="text-lg text-muted-foreground">Acesse nossa plataforma exclusiva de IA jurídica</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <Card className="shadow-card-legal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Credenciais de Acesso
              </CardTitle>
              <CardDescription>
                Use as credenciais abaixo para acessar a plataforma de IA do AdvogaFácil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email:</label>
                    <p className="font-mono text-sm">{credentials.email}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(credentials.email, "Email")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Senha:</label>
                    <p className="font-mono text-sm">{credentials.password}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(credentials.password, "Senha")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  onClick={openPlatform}
                  className="w-full bg-gradient-primary hover:opacity-90 text-white font-medium"
                  size="lg"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Acessar Plataforma de IA
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 shadow-card-legal">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Instruções de Uso</h3>
                  <ol className="text-sm space-y-2 text-muted-foreground">
                    <li>1. Copie as credenciais de acesso usando os botões acima</li>
                    <li>2. Clique no botão "Acessar Plataforma de IA"</li>
                    <li>3. Faça login com as credenciais fornecidas</li>
                    <li>4. Explore as funcionalidades da nossa IA jurídica especializada</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlataformaIA;