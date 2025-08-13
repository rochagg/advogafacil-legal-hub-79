
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Download, FileText } from "lucide-react";

const GuiaPecas = () => {
  const handleDownloadGuide = () => {
    // Google Drive direct download link
    const driveFileId = "1FCEThTdhwRbHyoeefJYcBH2I5vnujg_U";
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${driveFileId}`;
    
    // Open in new tab for download
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Guia de Peças Jurídicas</h1>
              <p className="text-lg text-muted-foreground">
                Guia definitivo para elaboração de peças jurídicas com inteligência artificial
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="shadow-card-legal">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Guia Definitivo de Elaboração de Peças Jurídicas com IA
              </CardTitle>
              <CardDescription>
                Material completo para potencializar sua prática jurídica com inteligência artificial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-lg mb-3 text-primary">O que você encontrará no guia:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Metodologia completa para uso de IA na elaboração de peças jurídicas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Prompts otimizados para diferentes tipos de documentos legais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Boas práticas e técnicas avançadas de prompt engineering</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Exemplos práticos e casos de uso reais</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                    <span>Diretrizes éticas para uso responsável da IA no direito</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleDownloadGuide}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download do Guia (PDF)
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Arquivo PDF - Material exclusivo AdvogaFácil
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5 shadow-card-legal">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Guia Disponível</h3>
                  <p className="text-sm text-muted-foreground">
                    O guia definitivo já está disponível para download. 
                    Este material foi desenvolvido especialmente para potencializar 
                    sua prática jurídica com inteligência artificial.
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

export default GuiaPecas;
