'use client'

import { supabase } from '@/integrations/supabase/client';

export interface MessageRecord {
  id?: number;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatHistoryService {
  /**
   * Busca o histórico de mensagens de um usuário específico
   * @param userId - ID do usuário
   * @param limit - Número máximo de mensagens (padrão: 20)
   * @returns Array de mensagens ordenadas cronologicamente
   */
  static async getUserMessageHistory(userId: string, limit: number = 20): Promise<MessageRecord[]> {
    try {
      const { data, error } = await supabase
        .from('user_messages')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) {
        console.error('Erro ao buscar histórico:', error);
        throw new Error(`Erro ao buscar histórico: ${error.message}`);
      }

      return data || [];
    } catch (error) {
      console.error('Erro no ChatHistoryService.getUserMessageHistory:', error);
      throw error;
    }
  }

  /**
   * Salva uma mensagem no histórico do usuário
   * @param userId - ID do usuário
   * @param role - Papel da mensagem ('user' ou 'assistant')
   * @param content - Conteúdo da mensagem
   * @returns Promise com o resultado da inserção
   */
  static async saveMessage(userId: string, role: 'user' | 'assistant', content: string): Promise<MessageRecord> {
    try {
      const { data, error } = await supabase
        .from('user_messages')
        .insert({
          user_id: userId,
          role,
          content,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Erro ao salvar mensagem:', error);
        throw new Error(`Erro ao salvar mensagem: ${error.message}`);
      }

      return data;
    } catch (error) {
      console.error('Erro no ChatHistoryService.saveMessage:', error);
      throw error;
    }
  }

  /**
   * Converte histórico do banco para formato da API OpenAI
   * @param history - Array de MessageRecord do banco
   * @returns Array de ChatMessage para a API
   */
  static formatHistoryForAPI(history: MessageRecord[]): ChatMessage[] {
    return history.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }

  /**
   * Prepara o payload completo para a API OpenAI
   * @param userId - ID do usuário
   * @param newUserMessage - Nova mensagem do usuário
   * @param historyLimit - Número de mensagens históricas a incluir
   * @returns Array de mensagens formatado para a API
   */
  static async prepareMessagesForAPI(
    userId: string, 
    newUserMessage: string, 
    historyLimit: number = 20
  ): Promise<ChatMessage[]> {
    try {
      // Buscar histórico do usuário
      const history = await this.getUserMessageHistory(userId, historyLimit);
      
      // Converter para formato da API
      const apiMessages = this.formatHistoryForAPI(history);
      
      // Adicionar nova mensagem do usuário
      apiMessages.push({
        role: 'user',
        content: newUserMessage
      });

      return apiMessages;
    } catch (error) {
      console.error('Erro no ChatHistoryService.prepareMessagesForAPI:', error);
      throw error;
    }
  }

  /**
   * Limpa o histórico de um usuário (opcional - para funcionalidades de reset)
   * @param userId - ID do usuário
   * @returns Promise com resultado da operação
   */
  static async clearUserHistory(userId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('user_messages')
        .delete()
        .eq('user_id', userId);

      if (error) {
        console.error('Erro ao limpar histórico:', error);
        throw new Error(`Erro ao limpar histórico: ${error.message}`);
      }
    } catch (error) {
      console.error('Erro no ChatHistoryService.clearUserHistory:', error);
      throw error;
    }
  }

  /**
   * Verifica se a tabela user_messages existe
   * @returns Promise<boolean>
   */
  static async checkTableExists(): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_messages')
        .select('id')
        .limit(1);

      // Se não há erro, a tabela existe
      return !error;
    } catch (error) {
      console.error('Tabela user_messages não existe:', error);
      return false;
    }
  }
}
