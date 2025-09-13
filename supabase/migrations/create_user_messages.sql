-- Criar tabela user_messages para armazenar histórico de chat
CREATE TABLE IF NOT EXISTS user_messages (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_user_messages_user_id ON user_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_user_messages_created_at ON user_messages(created_at);
CREATE INDEX IF NOT EXISTS idx_user_messages_user_created ON user_messages(user_id, created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE user_messages ENABLE ROW LEVEL SECURITY;

-- Política para que usuários só vejam suas próprias mensagens
CREATE POLICY "Users can view own messages" ON user_messages
  FOR SELECT USING (auth.uid() = user_id);

-- Política para que usuários só possam inserir suas próprias mensagens
CREATE POLICY "Users can insert own messages" ON user_messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para que usuários possam atualizar suas próprias mensagens (se necessário)
CREATE POLICY "Users can update own messages" ON user_messages
  FOR UPDATE USING (auth.uid() = user_id);

-- Política para que usuários possam deletar suas próprias mensagens (se necessário)
CREATE POLICY "Users can delete own messages" ON user_messages
  FOR DELETE USING (auth.uid() = user_id);
