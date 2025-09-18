'use client'

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  error?: string;
  usage?: any;
}

export class OpenAIService {
  private baseURL: string = '/api/chat';

  async sendMessage(message: string, userId: string): Promise<ChatResponse> {
    try {
      const response = await fetch(this.baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        message: data.message,
        usage: data.usage,
      };
    } catch (error) {
      console.error('OpenAI Service Error:', error);
      return {
        message: '',
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }

  // Método para verificar se a API está configurada
  static async checkApiStatus(): Promise<boolean> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: 'test',
          userId: 'test-user-id',
        }),
      });
      
      return response.status !== 500;
    } catch {
      return false;
    }
  }
}
