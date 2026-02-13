/**
 * Sync API - Sincronização com PostgreSQL
 * Endpoints para sincronizar dados entre dispositivos
 */

import express, { Router, Request, Response } from 'express';

const router = Router();

// Simulação de banco de dados em memória (será substituído por PostgreSQL)
interface Client {
  id: string;
  linkedDeviceId?: string;
  createdAt: string;
}

interface Service {
  id: string;
  clientId: string;
  brand: string;
  model: string;
  value: number;
  status: 'Pago' | 'Pendente';
  paymentMethod?: string;
  date: string;
  createdAt: string;
}

interface Config {
  supportWhatsApp: string;
  updatedAt: string;
}

// Armazenamento em memória (será substituído por PostgreSQL)
let clients: Client[] = [];
let services: Service[] = [];
let config: Config = {
  supportWhatsApp: '',
  updatedAt: new Date().toISOString()
};

/**
 * GET /api/sync/clients
 * Busca todos os clientes
 */
router.get('/clients', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: clients,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar clientes'
    });
  }
});

/**
 * POST /api/sync/clients
 * Sincroniza clientes (cria ou atualiza)
 */
router.post('/clients', (req: Request, res: Response) => {
  try {
    const { clients: newClients } = req.body;

    if (!Array.isArray(newClients)) {
      return res.status(400).json({
        success: false,
        error: 'Formato inválido'
      });
    }

    // Atualizar clientes
    newClients.forEach((newClient: Client) => {
      const existingIndex = clients.findIndex(c => c.id === newClient.id);
      
      if (existingIndex >= 0) {
        // Atualizar existente
        clients[existingIndex] = {
          ...clients[existingIndex],
          ...newClient,
          updatedAt: new Date().toISOString()
        };
      } else {
        // Criar novo
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

/**
 * POST /api/sync/clients/add
 * Adiciona um novo cliente
 */
router.post('/clients/add', (req: Request, res: Response) => {
  try {
    const { id, linkedDeviceId } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID é obrigatório'
      });
    }

    // Verificar se já existe
    if (clients.some(c => c.id === id)) {
      return res.status(409).json({
        success: false,
        error: 'ID já existe'
      });
    }

    const newClient: Client = {
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

/**
 * DELETE /api/sync/clients/:id
 * Remove um cliente
 */
router.delete('/clients/:id', (req: Request, res: Response) => {
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

/**
 * GET /api/sync/services
 * Busca todos os serviços
 */
router.get('/services', (req: Request, res: Response) => {
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

/**
 * POST /api/sync/services
 * Sincroniza serviços
 */
router.post('/services', (req: Request, res: Response) => {
  try {
    const { services: newServices } = req.body;

    if (!Array.isArray(newServices)) {
      return res.status(400).json({
        success: false,
        error: 'Formato inválido'
      });
    }

    // Atualizar serviços
    newServices.forEach((newService: Service) => {
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

/**
 * GET /api/sync/config
 * Busca configurações
 */
router.get('/config', (req: Request, res: Response) => {
  try {
    res.json({
      success: true,
      data: config
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Erro ao buscar configurações'
    });
  }
});

/**
 * POST /api/sync/config
 * Atualiza configurações
 */
router.post('/config', (req: Request, res: Response) => {
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

/**
 * GET /api/sync/health
 * Verifica saúde da API
 */
router.get('/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'online',
    timestamp: new Date().toISOString(),
    clients: clients.length,
    services: services.length
  });
});

export default router;
