/**
 * Servidor Backend - MS-Configuration
 * Sincronização de dados com PostgreSQL
 */

import express from 'express';
import cors from 'cors';
import syncRouter from './sync-api';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas de sincronização
app.use('/api/sync', syncRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor de sincronização rodando na porta ${PORT}`);
  console.log(`📡 Endpoints disponíveis:`);
  console.log(`   GET  /api/sync/clients`);
  console.log(`   POST /api/sync/clients`);
  console.log(`   POST /api/sync/clients/add`);
  console.log(`   DELETE /api/sync/clients/:id`);
  console.log(`   GET  /api/sync/services`);
  console.log(`   POST /api/sync/services`);
  console.log(`   GET  /api/sync/config`);
  console.log(`   POST /api/sync/config`);
  console.log(`   GET  /health`);
});

export default app;
