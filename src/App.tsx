import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PlataformaIA from "./pages/PlataformaIA";
import RobosJuridicos from "./pages/RobosJuridicos";
import GuiaPecas from "./pages/GuiaPecas";
import ModelosContratos from "./pages/ModelosContratos";
import Suporte from "./pages/Suporte";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Index />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/plataforma-ia" element={
              <ProtectedRoute>
                <Layout>
                  <PlataformaIA />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/robos-juridicos" element={
              <ProtectedRoute>
                <Layout>
                  <RobosJuridicos />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/guia-pecas" element={
              <ProtectedRoute>
                <Layout>
                  <GuiaPecas />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/modelos-contratos" element={
              <ProtectedRoute>
                <Layout>
                  <ModelosContratos />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/suporte" element={
              <ProtectedRoute>
                <Layout>
                  <Suporte />
                </Layout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
