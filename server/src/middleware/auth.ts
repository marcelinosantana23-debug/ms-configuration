import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';
import { AuthPayload } from '../types/index';

// Estender o tipo Request para incluir dados de autenticação
declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
      clientId?: string;
      adminId?: string;
    }
  }
}

/**
 * Middleware para verificar token JWT
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Token não fornecido',
      });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer '
    const payload = verifyToken(token);
    
    if (!payload) {
      return res.status(401).json({
        success: false,
        error: 'Token inválido ou expirado',
      });
    }
    
    req.auth = payload;
    req.clientId = payload.clientId;
    req.adminId = payload.adminId;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao verificar autenticação',
    });
  }
}

/**
 * Middleware para verificar se é admin
 */
export function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.auth || !req.adminId) {
    return res.status(403).json({
      success: false,
      error: 'Acesso negado. Apenas administradores podem acessar este recurso.',
    });
  }
  
  next();
}

/**
 * Middleware para logging de acesso
 */
export function loggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  
  next();
}

/**
 * Middleware para tratamento de erros
 */
export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);
  
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';
  
  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
