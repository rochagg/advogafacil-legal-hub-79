import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Inicializar OpenAI apenas se a chave estiver disponível
const apiKey = process.env.OPENAI_API_KEY;
let openai: OpenAI | null = null;

if (apiKey) {
  openai = new OpenAI({
    apiKey: apiKey,
  });
}

// Inicializar Supabase para operações do servidor
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://lqamdpufgofyyuaaetxq.supabase.co";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxYW1kcHVmZ29meXl1YWFldHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwOTc5NjIsImV4cCI6MjA3MjY3Mzk2Mn0.oQD64DBtsgMJkf2wW4Pdzk5u9Ux6-g8uULsXxYXYnjE";

const supabaseServer = createClient(supabaseUrl, supabaseServiceKey);

// Função para carregar o prompt do arquivo
function loadSystemPrompt(): string {
  try {
    const promptPath = path.join(process.cwd(), 'app', 'services', 'prompts', 'default.txt');
    return fs.readFileSync(promptPath, 'utf-8').trim();
  } catch (error) {
    console.error('Erro ao carregar prompt:', error);
    // Fallback básico caso o arquivo não seja encontrado
    return 'Você é um assistente jurídico especializado da AdvogaFácil. Responda sempre em português brasileiro e mantenha o foco na área jurídica.';
  }
}

interface MessageRecord {
  id?: number;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Busca o histórico de mensagens de um usuário
 */
async function getUserMessageHistory(userId: string, limit: number = 20): Promise<MessageRecord[]> {
  try {
    const { data, error } = await supabaseServer
      .from('user_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('Erro ao buscar histórico:', error);
      return []; // Retorna array vazio em caso de erro (tabela pode não existir ainda)
    }

    return data || [];
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return [];
  }
}

/**
 * Salva uma mensagem no histórico do usuário
 */
async function saveMessage(userId: string, role: 'user' | 'assistant', content: string): Promise<void> {
  try {
    const { error } = await supabaseServer
      .from('user_messages')
      .insert({
        user_id: userId,
        role,
        content,
        created_at: new Date().toISOString()
      });

    if (error) {
      console.error('Erro ao salvar mensagem:', error);
      // Não quebra o fluxo se falhar ao salvar - apenas registra o erro
    }
  } catch (error) {
    console.error('Erro ao salvar mensagem:', error);
    // Não quebra o fluxo se falhar ao salvar
  }
}

/**
 * Prepara mensagens para a API OpenAI incluindo histórico
 */
async function prepareMessagesForAPI(userId: string, newUserMessage: string): Promise<ChatMessage[]> {
  try {
    // Carregar prompt do sistema do arquivo
    const systemPrompt = loadSystemPrompt();
    
    // Buscar histórico do usuário (últimas 20 mensagens)
    const history = await getUserMessageHistory(userId, 20);
    
    // Converter histórico para formato da API
    const apiMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt }
    ];
    
    // Adicionar histórico
    history.forEach(msg => {
      apiMessages.push({
        role: msg.role,
        content: msg.content
      });
    });
    
    // Adicionar nova mensagem do usuário
    apiMessages.push({
      role: 'user',
      content: newUserMessage
    });

    return apiMessages;
  } catch (error) {
    console.error('Erro ao preparar mensagens:', error);
    // Fallback: apenas system prompt + nova mensagem
    const fallbackPrompt = loadSystemPrompt();
    return [
      { role: 'system', content: fallbackPrompt },
      { role: 'user', content: newUserMessage }
    ];
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!openai) {
      return NextResponse.json(
        { error: 'Chave da API OpenAI não configurada no servidor' },
        { status: 500 }
      );
    }

    const { message, userId } = await request.json();

    // Validações
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem inválida' },
        { status: 400 }
      );
    }

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // Preparar mensagens incluindo histórico do usuário
    const apiMessages = await prepareMessagesForAPI(userId, message);

    // Salvar mensagem do usuário no histórico
    await saveMessage(userId, 'user', message);

    // Chamar OpenAI GPT
    const completion = await openai.chat.completions.create({
      model: 'gpt-4', // Mantendo GPT-4 por ser mais estável (gpt-5-mini ainda não está amplamente disponível)
      messages: apiMessages,
      max_tokens: 1000,
      temperature: 0.7,
    });

    const responseMessage = completion.choices[0]?.message?.content;

    if (!responseMessage) {
      return NextResponse.json(
        { error: 'Nenhuma resposta gerada' },
        { status: 500 }
      );
    }

    // Salvar resposta do assistente no histórico
    await saveMessage(userId, 'assistant', responseMessage);

    return NextResponse.json({
      message: responseMessage,
      usage: completion.usage,
      historyCount: apiMessages.length - 1, // -1 para excluir system prompt
    });

  } catch (error) {
    console.error('Erro na API do chat:', error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Erro na API: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}