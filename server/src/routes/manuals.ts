import { Router, Request, Response } from 'express';
import { db } from '../db';
import { manuals, favorites } from '../db/schema';
import { eq, like, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth';
import { ManualData } from '../types/index';

const router = Router();

/**
 * GET /manuals
 * Lista todos os manuais com filtros opcionais
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { brand, model, displacement, search } = req.query;
    
    let query = db.select().from(manuals);
    
    const conditions: any[] = [];
    
    if (brand) {
      conditions.push(eq(manuals.brand, brand as string));
    }
    if (model) {
      conditions.push(like(manuals.model, `%${model}%`));
    }
    if (displacement) {
      conditions.push(eq(manuals.displacement, displacement as string));
    }
    if (search) {
      conditions.push(
        like(manuals.brand, `%${search}%`) || 
        like(manuals.model, `%${search}%`)
      );
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    const result = await query;
    
    return res.status(200).json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Get manuals error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar manuais',
    });
  }
});

/**
 * GET /manuals/:id
 * Obtém um manual específico
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const manual = await db
      .select()
      .from(manuals)
      .where(eq(manuals.id, id))
      .limit(1);
    
    if (!manual || manual.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Manual não encontrado',
      });
    }
    
    return res.status(200).json({
      success: true,
      data: manual[0],
    });
  } catch (error) {
    console.error('Get manual error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar manual',
    });
  }
});

/**
 * GET /manuals/brand/:brand
 * Lista manuais de uma marca específica
 */
router.get('/brand/:brand', async (req: Request, res: Response) => {
  try {
    const { brand } = req.params;
    
    const result = await db
      .select()
      .from(manuals)
      .where(eq(manuals.brand, brand));
    
    return res.status(200).json({
      success: true,
      data: result,
      total: result.length,
    });
  } catch (error) {
    console.error('Get brand manuals error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar manuais da marca',
    });
  }
});

/**
 * POST /manuals
 * Cria um novo manual (apenas admin)
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const manualData: ManualData = req.body;
    
    // Validações básicas
    if (!manualData.brand || !manualData.model || !manualData.year || !manualData.displacement) {
      return res.status(400).json({
        success: false,
        error: 'Dados obrigatórios faltando: brand, model, year, displacement',
      });
    }
    
    const result = await db.insert(manuals).values(manualData).returning();
    
    return res.status(201).json({
      success: true,
      data: result[0],
      message: 'Manual criado com sucesso',
    });
  } catch (error) {
    console.error('Create manual error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao criar manual',
    });
  }
});

/**
 * PUT /manuals/:id
 * Atualiza um manual (apenas admin)
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Verificar se manual existe
    const manual = await db
      .select()
      .from(manuals)
      .where(eq(manuals.id, id))
      .limit(1);
    
    if (!manual || manual.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Manual não encontrado',
      });
    }
    
    await db
      .update(manuals)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(manuals.id, id));
    
    return res.status(200).json({
      success: true,
      message: 'Manual atualizado com sucesso',
    });
  } catch (error) {
    console.error('Update manual error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar manual',
    });
  }
});

/**
 * DELETE /manuals/:id
 * Deleta um manual (apenas admin)
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Verificar se manual existe
    const manual = await db
      .select()
      .from(manuals)
      .where(eq(manuals.id, id))
      .limit(1);
    
    if (!manual || manual.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Manual não encontrado',
      });
    }
    
    await db
      .delete(manuals)
      .where(eq(manuals.id, id));
    
    return res.status(200).json({
      success: true,
      message: 'Manual deletado com sucesso',
    });
  } catch (error) {
    console.error('Delete manual error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao deletar manual',
    });
  }
});

/**
 * GET /manuals/:id/favorites
 * Verifica se um manual está nos favoritos do cliente
 */
router.get('/:id/favorites', authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientId = req.clientId;
    
    const favorite = await db
      .select()
      .from(favorites)
      .where(
        and(
          eq(favorites.clientId, clientId!),
          eq(favorites.manualId, id)
        )
      )
      .limit(1);
    
    return res.status(200).json({
      success: true,
      data: {
        isFavorite: favorite.length > 0,
      },
    });
  } catch (error) {
    console.error('Check favorite error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao verificar favorito',
    });
  }
});

export default router;
