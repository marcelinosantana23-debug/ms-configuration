import { Router, Request, Response } from 'express';
import { db } from '../db';
import { clients, sessions } from '../db/schema';
import { eq, and } from 'drizzle-orm';
import { 
  generateToken, 
  verifyPassword, 
  generateDeviceFingerprint,
  isValidClientId 
} from '../utils/auth';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * POST /auth/login
 * Autentica um cliente usando seu ID único
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { clientId, deviceFingerprint } = req.body;
    
    if (!clientId || !isValidClientId(clientId)) {
      return res.status(400).json({
        success: false,
        error: 'ID de cliente inválido',
      });
    }
    
    // Buscar cliente no banco de dados
    const client = await db
      .select()
      .from(clients)
      .where(eq(clients.clientId, clientId))
      .limit(1);
    
    if (!client || client.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
      });
    }
    
    const clientData = client[0];
    
    // Verificar se cliente está ativo
    if (!clientData.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Acesso negado. Cliente desativado pelo administrador.',
      });
    }
    
    // Verificar fingerprint do dispositivo (se foi registrado)
    if (clientData.deviceFingerprint && clientData.deviceFingerprint !== deviceFingerprint) {
      return res.status(403).json({
        success: false,
        error: 'Acesso negado. Este ID não pode ser acessado deste dispositivo.',
      });
    }
    
    // Gerar token JWT
    const token = generateToken(clientData.id, clientData.adminId);
    
    // Criar sessão
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ipAddress = req.ip || 'unknown';
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias
    
    await db.insert(sessions).values({
      clientId: clientData.id,
      token,
      deviceFingerprint: deviceFingerprint || 'unknown',
      ipAddress,
      userAgent,
      expiresAt,
    });
    
    // Atualizar último acesso
    await db
      .update(clients)
      .set({ lastAccessAt: new Date() })
      .where(eq(clients.id, clientData.id));
    
    return res.status(200).json({
      success: true,
      data: {
        token,
        client: {
          id: clientData.id,
          clientId: clientData.clientId,
          name: clientData.name,
          businessName: clientData.businessName,
          email: clientData.email,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao fazer login',
    });
  }
});

/**
 * POST /auth/logout
 * Faz logout do cliente
 */
router.post('/logout', authMiddleware, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.substring(7);
    
    if (!token) {
      return res.status(400).json({
        success: false,
        error: 'Token não fornecido',
      });
    }
    
    // Remover sessão
    await db
      .delete(sessions)
      .where(eq(sessions.token, token));
    
    return res.status(200).json({
      success: true,
      message: 'Logout realizado com sucesso',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao fazer logout',
    });
  }
});

/**
 * GET /auth/me
 * Retorna informações do cliente autenticado
 */
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    
    const client = await db
      .select()
      .from(clients)
      .where(eq(clients.id, clientId))
      .limit(1);
    
    if (!client || client.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Cliente não encontrado',
      });
    }
    
    const clientData = client[0];
    
    return res.status(200).json({
      success: true,
      data: {
        id: clientData.id,
        clientId: clientData.clientId,
        name: clientData.name,
        email: clientData.email,
        phone: clientData.phone,
        businessName: clientData.businessName,
        isActive: clientData.isActive,
        lastAccessAt: clientData.lastAccessAt,
        createdAt: clientData.createdAt,
      },
    });
  } catch (error) {
    console.error('Get me error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao buscar informações do cliente',
    });
  }
});

/**
 * PUT /auth/me
 * Atualiza informações do cliente
 */
router.put('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    const clientId = req.clientId;
    const { name, email, phone, businessName } = req.body;
    
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (businessName) updateData.businessName = businessName;
    
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Nenhum dado para atualizar',
      });
    }
    
    await db
      .update(clients)
      .set(updateData)
      .where(eq(clients.id, clientId));
    
    return res.status(200).json({
      success: true,
      message: 'Informações atualizadas com sucesso',
    });
  } catch (error) {
    console.error('Update me error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao atualizar informações',
    });
  }
});

export default router;
