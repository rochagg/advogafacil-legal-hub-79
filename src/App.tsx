import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "./pages/Index";
import PlataformaIA from "./pages/PlataformaIA";
import RobosJuridicos from "./pages/RobosJuridicos";
import GuiaPecas from "./pages/GuiaPecas";
import ModelosContratos from "./pages/ModelosContratos";
import Suporte from "./pages/Suporte";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/plataforma-ia" element={<PlataformaIA />} />
            <Route path="/robos-juridicos" element={<RobosJuridicos />} />
            <Route path="/guia-pecas" element={<GuiaPecas />} />
            <Route path="/modelos-contratos" element={<ModelosContratos />} />
            <Route path="/suporte" element={<Suporte />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
