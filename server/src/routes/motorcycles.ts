import { Router, Request, Response } from 'express';
import { db } from '../db';
import { authMiddleware } from '../middleware/auth';
import { pgTable, text, varchar, timestamp, uuid, integer, boolean } from 'drizzle-orm/pg-core';
import { eq, and } from 'drizzle-orm';

// Tabela de Motos em Serviço (será adicionada ao schema)
const motorcyclesInService = pgTable('motorcycles_in_service', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull(),
  brand: varchar('brand', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  year: varchar('year', { length: 20 }),
  licensePlate: varchar('license_plate', { length: 20 }),
  displacement: varchar('displacement', { length: 20 }),
  color: varchar('color', { length: 50 }),
  mileage: integer('mileage'),
  ownerName: varchar('owner_name', { length: 255 }),
  ownerPhone: varchar('owner_phone', { length: 20 }),
  description: text('description'),
  status: varchar('status', { length: 20 }).notNull(), // 'Em Serviço', 'Aguardando', 'Pronto', 'Entregue'
  entryDate: timestamp('entry_date').notNull(),
  estimatedDelivery: timestamp('estimated_delivery'),
  deliveryDate: timestamp('delivery_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

const router = Router();

/**
 * GET /motorcycles
 * Lista motos em serviço do cliente
 */
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    const { status } = req.query;
    
    // Simulação até integração com banco
    const mockMotorcycles = [
      {
        id: '1',
        brand: 'Honda',
        model: 'CG 160',
        year: '2022',
        licensePlate: 'ABC-1234',
        displacement: '160cc',
        color: 'Preto',
        mileage: 15000,
        ownerName: 'João Silva',
        ownerPhone: '(11) 98765-4321',
        description: 'Troca de óleo e filtro',
        status: 'Em Serviço',
        entryDate: new Date('2024-02-10'),
        estimatedDelivery: new Date('2024-02-12'),
      },
      {
        id: '2',
        brand: 'Yamaha',
        model: 'Factor 150',
        year: '2023',
        licensePlate: 'XYZ-5678',
        displacement: '150cc',
        color: 'Vermelho',
        mileage: 8000,
        ownerName: 'Maria Santos',
        ownerPhone: '(11) 99876-5432',
        description: 'Revisão completa e ajuste de corrente',
        status: 'Pronto',
        entryDate: new Date('2024-02-08'),
        estimatedDelivery: new Date('2024-02-11'),
      },
    ];
    
    let result = mockMotorcycles;
    
    if (status) {
      result = result.filter(m => m.status === status);
    }
    
    return res.status(200).json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Get motorcycles error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar motos',
    });
  }
});

/**
 * POST /motorcycles
 * Registra uma nova moto em serviço
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    const {
      brand,
      model,
      year,
      licensePlate,
      displacement,
      color,
      mileage,
      ownerName,
      ownerPhone,
      description,
      estimatedDelivery,
    } = req.body;
    
    if (!brand || !model || !ownerName) {
      return res.status(400).json({
        success: false,
        error: 'Marca, modelo e nome do proprietário são obrigatórios',
      });
    }
    
    const newMotorcycle = {
      id: Math.random().toString(36).substr(2, 9),
      clientId,
      brand,
      model,
      year,
      licensePlate,
      displacement,
      color,
      mileage,
      ownerName,
      ownerPhone,
      description,
      status: 'Em Serviço',
      entryDate: new Date(),
      estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
      deliveryDate: null,
    };
    
    return res.status(201).json({
      success: true,
      data: newMotorcycle,
      message: 'Moto registrada em serviço com sucesso',
    });
  } catch (error) {
    console.error('Create motorcycle error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao registrar moto',
    });
  }
});

/**
 * PUT /motorcycles/:id
 * Atualiza informações de uma moto em serviço
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    return res.status(200).json({
      success: true,
      message: 'Moto atualizada com sucesso',
      data: {
        id,
        ...updateData,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Update motorcycle error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar moto',
    });
  }
});

/**
 * PUT /motorcycles/:id/status
 * Atualiza status de uma moto
 */
router.put('/:id/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const validStatuses = ['Em Serviço', 'Aguardando', 'Pronto', 'Entregue'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Status inválido. Valores aceitos: ${validStatuses.join(', ')}`,
      });
    }
    
    const deliveryDate = status === 'Entregue' ? new Date() : null;
    
    return res.status(200).json({
      success: true,
      message: `Status atualizado para "${status}"`,
      data: {
        id,
        status,
        deliveryDate,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Update motorcycle status error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar status',
    });
  }
});

/**
 * DELETE /motorcycles/:id
 * Remove uma moto do registro
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    return res.status(200).json({
      success: true,
      message: 'Moto removida do registro com sucesso',
    });
  } catch (error) {
    console.error('Delete motorcycle error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao remover moto',
    });
  }
});

/**
 * GET /motorcycles/:id/history
 * Obtém histórico de serviços de uma moto
 */
router.get('/:id/history', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Simulação de histórico
    const mockHistory = [
      {
        date: new Date('2024-02-10'),
        service: 'Troca de óleo e filtro',
        value: 150,
        status: 'Pago',
        paymentMethod: 'Dinheiro',
      },
      {
        date: new Date('2024-01-15'),
        service: 'Revisão completa',
        value: 300,
        status: 'Pago',
        paymentMethod: 'Pix',
      },
      {
        date: new Date('2023-12-20'),
        service: 'Ajuste de corrente',
        value: 80,
        status: 'Pago',
        paymentMethod: 'Cartão',
      },
    ];
    
    return res.status(200).json({
      success: true,
      data: mockHistory,
      total: mockHistory.length,
    });
  } catch (error) {
    console.error('Get motorcycle history error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar histórico',
    });
  }
});

export default router;
