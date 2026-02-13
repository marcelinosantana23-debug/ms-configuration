import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection, closeConnection } from './db';
import { loggingMiddleware, errorHandler } from './middleware/auth';

// Importar rotas
import authRoutes from './routes/auth';
import manualsRoutes from './routes/manuals';
import servicesRoutes from './routes/services';
import adminRoutes from './routes/admin';
import toolsRoutes from './routes/tools';
import motorcyclesRoutes from './routes/motorcycles';

// Carregar variáveis de ambiente
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3001', 'http://localhost:5173'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(loggingMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/manuals', manualsRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tools', toolsRoutes);
app.use('/api/motorcycles', motorcyclesRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Rota não encontrada',
  });
});

// Error handler
app.use(errorHandler);

// Iniciar servidor
async function startServer() {
  try {
    // Testar conexão com banco de dados
    const dbConnected = await testConnection();
    
    if (!dbConnected) {
      console.error('❌ Falha ao conectar ao banco de dados. Encerrando...');
      process.exit(1);
    }
    
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════════╗
║  MS-Configuration Server                                   ║
║  Backend para Manual de Moto para Mecânicos                ║
╚════════════════════════════════════════════════════════════╝

✅ Servidor iniciado com sucesso!
📍 Porta: ${PORT}
🌐 URL: http://localhost:${PORT}
🔗 API Base: http://localhost:${PORT}/api

📚 Rotas disponíveis:
  - POST   /api/auth/login           - Fazer login
  - POST   /api/auth/logout          - Fazer logout
  - GET    /api/auth/me              - Obter dados do cliente
  - PUT    /api/auth/me              - Atualizar dados do cliente
  
  - GET    /api/manuals              - Listar manuais
  - GET    /api/manuals/:id          - Obter manual específico
  - GET    /api/manuals/brand/:brand - Listar por marca
  
  - GET    /api/services             - Listar serviços
  - POST   /api/services             - Criar serviço
  - PUT    /api/services/:id         - Atualizar serviço
  - DELETE /api/services/:id         - Deletar serviço
  
  - GET    /api/admin/clients        - Listar clientes
  - POST   /api/admin/clients        - Criar cliente
  - PUT    /api/admin/settings       - Atualizar configurações
  - GET    /api/admin/stats          - Obter estatísticas

⚠️  Certifique-se de que:
  - DATABASE_URL está configurada em .env
  - JWT_SECRET está configurada em .env
  - Banco de dados PostgreSQL está rodando
      `);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar servidor:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n\n📛 Encerrando servidor...');
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n📛 Encerrando servidor...');
  await closeConnection();
  process.exit(0);
});

// Iniciar servidor
startServer();

export default app;
