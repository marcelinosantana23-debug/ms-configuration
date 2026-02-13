import { Router, Request, Response } from 'express';
import { db } from '../db';
import { admins, clients, serviceRecords, accessLogs } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { authMiddleware, adminMiddleware } from '../middleware/auth';
import { generateClientId, hashPassword } from '../utils/auth';

const router = Router();

/**
 * POST /admin/clients
 * Cria um novo cliente (ID único)
 */
router.post('/clients', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = req.adminId;
    const { name, email, phone, businessName } = req.body;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Nome do cliente é obrigatório',
      });
    }
    
    // Gerar ID único para o cliente
    const clientId = generateClientId();
    
    const result = await db.insert(clients).values({
      adminId: adminId!,
      clientId,
      name,
      email,
      phone,
      businessName,
      isActive: true,
    }).returning();
    
    return res.status(201).json({
      success: true,
      data: {
        id: result[0].id,
        clientId: result[0].clientId,
        name: result[0].name,
        email: result[0].email,
        businessName: result[0].businessName,
        isActive: result[0].isActive,
      },
      message: `Cliente criado com sucesso. ID: ${clientId}`,
    });
  } catch (error) {
    console.error('Create client error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar cliente',
    });
  }
});

/**
 * GET /admin/clients
 * Lista todos os clientes do admin
 */
router.get('/clients', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = req.adminId;
    
    const result = await db
      .select()
      .from(clients)
      .where(eq(clients.adminId, adminId!));
    
    return res.status(200).json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Get clients error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar clientes',
    });
  }
});

/**
 * GET /admin/clients/:id
 * Obtém detalhes de um cliente específico
 */
router.get('/clients/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.adminId;
    
    const client = await db
      .select()
      .from(clients)
      .where(
        and(
          eq(clients.id, id),
          eq(clients.adminId, adminId!)
        )
      )
      .limit(1);
    
    if (!client || client.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
      });
    }
    
    // Buscar estatísticas do cliente
    const services = await db
      .select()
      .from(serviceRecords)
      .where(eq(serviceRecords.clientId, id));
    
    const totalServices = services.length;
    const totalValue = services.reduce((sum, s) => sum + s.value, 0);
    const paidValue = services
      .filter(s => s.status === 'Pago')
      .reduce((sum, s) => sum + s.value, 0);
    const pendingValue = services
      .filter(s => s.status === 'Pendente')
      .reduce((sum, s) => sum + s.value, 0);
    
    return res.status(200).json({
      success: true,
      data: {
        ...client[0],
        stats: {
          totalServices,
          totalValue,
          paidValue,
          pendingValue,
        },
      },
    });
  } catch (error) {
    console.error('Get client error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar cliente',
    });
  }
});

/**
 * PUT /admin/clients/:id
 * Atualiza informações de um cliente
 */
router.put('/clients/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.adminId;
    const updateData = req.body;
    
    // Verificar se cliente existe e pertence ao admin
    const client = await db
      .select()
      .from(clients)
      .where(
        and(
          eq(clients.id, id),
          eq(clients.adminId, adminId!)
        )
      )
      .limit(1);
    
    if (!client || client.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
      });
    }
    
    await db
      .update(clients)
      .set(updateData)
      .where(eq(clients.id, id));
    
    return res.status(200).json({
      success: true,
      message: 'Cliente atualizado com sucesso',
    });
  } catch (error) {
    console.error('Update client error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar cliente',
    });
  }
});

/**
 * DELETE /admin/clients/:id
 * Deleta um cliente (desativa o acesso)
 */
router.delete('/clients/:id', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.adminId;
    
    // Verificar se cliente existe e pertence ao admin
    const client = await db
      .select()
      .from(clients)
      .where(
        and(
          eq(clients.id, id),
          eq(clients.adminId, adminId!)
        )
      )
      .limit(1);
    
    if (!client || client.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
      });
    }
    
    // Desativar cliente em vez de deletar
    await db
      .update(clients)
      .set({ isActive: false })
      .where(eq(clients.id, id));
    
    return res.status(200).json({
      success: true,
      message: 'Cliente desativado com sucesso. Acesso revogado.',
    });
  } catch (error) {
    console.error('Delete client error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar cliente',
    });
  }
});

/**
 * POST /admin/clients/:id/reactivate
 * Reativa um cliente desativado
 */
router.post('/clients/:id/reactivate', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const adminId = req.adminId;
    
    // Verificar se cliente existe e pertence ao admin
    const client = await db
      .select()
      .from(clients)
      .where(
        and(
          eq(clients.id, id),
          eq(clients.adminId, adminId!)
        )
      )
      .limit(1);
    
    if (!client || client.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
      });
    }
    
    // Reativar cliente
    await db
      .update(clients)
      .set({ isActive: true })
      .where(eq(clients.id, id));
    
    return res.status(200).json({
      success: true,
      message: 'Cliente reativado com sucesso',
    });
  } catch (error) {
    console.error('Reactivate client error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao reativar cliente',
    });
  }
});

/**
 * PUT /admin/settings
 * Atualiza configurações do admin (WhatsApp de suporte, etc)
 */
router.put('/settings', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = req.adminId;
    const { supportWhatsapp, name } = req.body;
    
    const updateData: any = {};
    if (supportWhatsapp) updateData.supportWhatsapp = supportWhatsapp;
    if (name) updateData.name = name;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nenhum dado para atualizar',
      });
    }
    
    await db
      .update(admins)
      .set(updateData)
      .where(eq(admins.id, adminId!));
    
    return res.status(200).json({
      success: true,
      message: 'Configurações atualizadas com sucesso',
    });
  } catch (error) {
    console.error('Update settings error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar configurações',
    });
  }
});

/**
 * GET /admin/stats
 * Retorna estatísticas gerais do admin
 */
router.get('/stats', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const adminId = req.adminId;
    
    // Contar clientes ativos
    const allClients = await db
      .select()
      .from(clients)
      .where(eq(clients.adminId, adminId!));
    
    const activeClients = allClients.filter(c => c.isActive).length;
    const inactiveClients = allClients.filter(c => !c.isActive).length;
    
    // Buscar serviços de todos os clientes
    const clientIds = allClients.map(c => c.id);
    let totalServices = 0;
    let totalValue = 0;
    let paidValue = 0;
    let pendingValue = 0;
    
    for (const clientId of clientIds) {
      const services = await db
        .select()
        .from(serviceRecords)
        .where(eq(serviceRecords.clientId, clientId));
      
      totalServices += services.length;
      totalValue += services.reduce((sum, s) => sum + s.value, 0);
      paidValue += services
        .filter(s => s.status === 'Pago')
        .reduce((sum, s) => sum + s.value, 0);
      pendingValue += services
        .filter(s => s.status === 'Pendente')
        .reduce((sum, s) => sum + s.value, 0);
    }
    
    return res.status(200).json({
      success: true,
      data: {
        totalClients: allClients.length,
        activeClients,
        inactiveClients,
        totalServices,
        totalValue,
        paidValue,
        pendingValue,
      },
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar estatísticas',
    });
  }
});

export default router;
