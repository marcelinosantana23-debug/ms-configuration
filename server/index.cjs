/**
 * Servidor Backend - MS-Configuration
 * Sincronização de dados
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Armazenamento em memória
let clients = [];
let services = [];
let config = {
  supportWhatsApp: '',
  updatedAt: new Date().toISOString()
};

// ========== ROTAS DE CLIENTES ==========

app.get('/api/sync/clients', (req, res) => {
  res.json({
    success: true,
    data: clients,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/sync/clients', (req, res) => {
  try {
    const { clients: newClients } = req.body;

    if (!Array.isArray(newClients)) {
      return res.status(400).json({
        success: false,
        error: 'Formato inválido'
      });
    }

    newClients.forEach((newClient) => {
      const existingIndex = clients.findIndex(c => c.id === newClient.id);
      
      if (existingIndex >= 0) {
        clients[existingIndex] = {
          ...clients[existingIndex],
          ...newClient,
          updatedAt: new Date().toISOString()
        };
      } else {
        clients.push({
          ...newClient,
          createdAt: new Date().toISOString()
        });
      }
    });

    res.json({
      success: true,
      data: clients,
      message: `${newClients.length} clientes sincronizados`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao sincronizar clientes'
    });
  }
});

app.post('/api/sync/clients/add', (req, res) => {
  try {
    const { id, linkedDeviceId } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID é obrigatório'
      });
    }

    if (clients.some(c => c.id === id)) {
      return res.status(409).json({
        success: false,
        error: 'ID já existe'
      });
    }

    const newClient = {
      id,
      linkedDeviceId,
      createdAt: new Date().toISOString()
    };

    clients.push(newClient);

    res.json({
      success: true,
      data: newClient,
      message: 'Cliente criado com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao criar cliente'
    });
  }
});

app.delete('/api/sync/clients/:id', (req, res) => {
  try {
    const { id } = req.params;

    const index = clients.findIndex(c => c.id === id);
    if (index < 0) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado'
      });
    }

    clients.splice(index, 1);

    res.json({
      success: true,
      message: 'Cliente removido com sucesso'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao remover cliente'
    });
  }
});

// ========== ROTAS DE SERVIÇOS ==========

app.get('/api/sync/services', (req, res) => {
  try {
    const { clientId } = req.query;

    let filtered = services;
    if (clientId) {
      filtered = services.filter(s => s.clientId === clientId);
    }

    res.json({
      success: true,
      data: filtered,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar serviços'
    });
  }
});

app.post('/api/sync/services', (req, res) => {
  try {
    const { services: newServices } = req.body;

    if (!Array.isArray(newServices)) {
      return res.status(400).json({
        success: false,
        error: 'Formato inválido'
      });
    }

    newServices.forEach((newService) => {
      const existingIndex = services.findIndex(s => s.id === newService.id);
      
      if (existingIndex >= 0) {
        services[existingIndex] = {
          ...services[existingIndex],
          ...newService
        };
      } else {
        services.push({
          ...newService,
          createdAt: new Date().toISOString()
        });
      }
    });

    res.json({
      success: true,
      data: services,
      message: `${newServices.length} serviços sincronizados`
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao sincronizar serviços'
    });
  }
});

// ========== ROTAS DE CONFIGURAÇÃO ==========

app.get('/api/sync/config', (req, res) => {
  res.json({
    success: true,
    data: config
  });
});

app.post('/api/sync/config', (req, res) => {
  try {
    const { supportWhatsApp } = req.body;

    config = {
      supportWhatsApp: supportWhatsApp || config.supportWhatsApp,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      data: config,
      message: 'Configurações atualizadas'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao atualizar configurações'
    });
  }
});

// ========== HEALTH CHECK ==========

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'online',
    timestamp: new Date().toISOString(),
    clients: clients.length,
    services: services.length
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
