import { Router, Request, Response } from 'express';
import { db } from '../db';
import { serviceRecords } from '../db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { ServiceRecordData } from '../types/index';

const router = Router();

/**
 * GET /services
 * Lista serviços do cliente autenticado
 */
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    const { monthYear, status } = req.query;
    
    let query = db
      .select()
      .from(serviceRecords)
      .where(eq(serviceRecords.clientId, clientId!));
    
    if (monthYear) {
      query = query.where(eq(serviceRecords.monthYear, monthYear as string));
    }
    
    if (status) {
      query = query.where(eq(serviceRecords.status, status as string));
    }
    
    const result = await query;
    
    // Calcular totais
    const total = result.reduce((sum, record) => sum + record.value, 0);
    const paidTotal = result
      .filter(r => r.status === 'Pago')
      .reduce((sum, record) => sum + record.value, 0);
    const pendingTotal = result
      .filter(r => r.status === 'Pendente')
      .reduce((sum, record) => sum + record.value, 0);
    
    return res.status(200).json({
      success: true,
      data: result,
      summary: {
        total: result.length,
        totalValue: total,
        paidValue: paidTotal,
        pendingValue: pendingTotal,
      },
    });
  } catch (error) {
    console.error('Get services error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar serviços',
    });
  }
});

/**
 * GET /services/:id
 * Obtém um serviço específico
 */
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.clientId;
    
    const service = await db
      .select()
      .from(serviceRecords)
      .where(
        and(
          eq(serviceRecords.id, id),
          eq(serviceRecords.clientId, clientId!)
        )
      )
      .limit(1);
    
    if (!service || service.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Serviço não encontrado',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: service[0],
    });
  } catch (error) {
    console.error('Get service error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar serviço',
    });
  }
});

/**
 * POST /services
 * Cria um novo registro de serviço
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    const serviceData: ServiceRecordData = req.body;
    
    // Validações
    if (!serviceData.description || !serviceData.value || !serviceData.date || !serviceData.status) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios faltando: description, value, date, status',
      });
    }
    
    // Gerar monthYear
    const date = new Date(serviceData.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    const result = await db.insert(serviceRecords).values({
      ...serviceData,
      clientId: clientId!,
      monthYear,
    }).returning();
    
    return res.status(201).json({
      success: true,
      data: result[0],
      message: 'Serviço registrado com sucesso',
    });
  } catch (error) {
    console.error('Create service error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar serviço',
    });
  }
});

/**
 * PUT /services/:id
 * Atualiza um registro de serviço
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.clientId;
    const updateData = req.body;
    
    // Verificar se serviço existe e pertence ao cliente
    const service = await db
      .select()
      .from(serviceRecords)
      .where(
        and(
          eq(serviceRecords.id, id),
          eq(serviceRecords.clientId, clientId!)
        )
      )
      .limit(1);
    
    if (!service || service.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Serviço não encontrado',
      });
    }
    
    // Se a data foi alterada, recalcular monthYear
    if (updateData.date) {
      const date = new Date(updateData.date);
      updateData.monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    }
    
    await db
      .update(serviceRecords)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(serviceRecords.id, id));
    
    return res.status(200).json({
      success: true,
      message: 'Serviço atualizado com sucesso',
    });
  } catch (error) {
    console.error('Update service error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar serviço',
    });
  }
});

/**
 * DELETE /services/:id
 * Deleta um registro de serviço
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.clientId;
    
    // Verificar se serviço existe e pertence ao cliente
    const service = await db
      .select()
      .from(serviceRecords)
      .where(
        and(
          eq(serviceRecords.id, id),
          eq(serviceRecords.clientId, clientId!)
        )
      )
      .limit(1);
    
    if (!service || service.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Serviço não encontrado',
      });
    }
    
    await db
      .delete(serviceRecords)
      .where(eq(serviceRecords.id, id));
    
    return res.status(200).json({
      success: true,
      message: 'Serviço deletado com sucesso',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar serviço',
    });
  }
});

/**
 * GET /services/stats/monthly
 * Retorna estatísticas mensais de serviços
 */
router.get('/stats/monthly', authMiddleware, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    
    const services = await db
      .select()
      .from(serviceRecords)
      .where(eq(serviceRecords.clientId, clientId!));
    
    // Agrupar por mês
    const stats: Record<string, any> = {};
    
    services.forEach(service => {
      if (!stats[service.monthYear]) {
        stats[service.monthYear] = {
          month: service.monthYear,
          total: 0,
          paid: 0,
          pending: 0,
          count: 0,
        };
      }
      
      stats[service.monthYear].total += service.value;
      stats[service.monthYear].count += 1;
      
      if (service.status === 'Pago') {
        stats[service.monthYear].paid += service.value;
      } else {
        stats[service.monthYear].pending += service.value;
      }
    });
    
    return res.status(200).json({
      success: true,
      data: Object.values(stats),
    });
  } catch (error) {
    console.error('Get monthly stats error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar estatísticas',
    });
  }
});

export default router;
