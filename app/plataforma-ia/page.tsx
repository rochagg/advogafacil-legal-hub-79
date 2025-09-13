'use client'

import { Brain } from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ChatInterface } from "@/components/ChatInterface";

export default function PlataformaIAPage() {


  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Assistente Jurídico com IA</h1>
                  <p className="text-lg text-muted-foreground">Chat especializado em direito brasileiro powered by GPT-4</p>
                </div>
              </div>
            </div>

            {/* Chat Interface */}
            <ChatInterface />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

