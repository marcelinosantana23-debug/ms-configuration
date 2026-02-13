// Tipos para Autenticação
export interface AuthPayload {
  clientId: string;
  adminId: string;
  iat: number;
  exp: number;
}

export interface LoginRequest {
  clientId: string;
  password?: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  client?: {
    id: string;
    clientId: string;
    name: string;
    businessName?: string;
    email?: string;
  };
  error?: string;
}

// Tipos para Cliente
export interface ClientData {
  clientId: string;
  name: string;
  email?: string;
  phone?: string;
  businessName?: string;
  deviceFingerprint?: string;
}

export interface ClientUpdate {
  name?: string;
  email?: string;
  phone?: string;
  businessName?: string;
}

// Tipos para Serviço
export interface ServiceRecordData {
  description: string;
  value: number; // em centavos
  date: Date;
  status: 'Pago' | 'Pendente';
  paymentMethod?: 'Dinheiro' | 'Pix' | 'Cartão';
  manualId?: string;
  notes?: string;
}

export interface ServiceRecordResponse extends ServiceRecordData {
  id: string;
  clientId: string;
  monthYear: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para Manual
export interface ManualData {
  brand: string;
  model: string;
  year: string;
  displacement: string;
  engineType?: string;
  maxPower?: string;
  maxTorque?: string;
  fuelType?: string;
  engineOil?: Record<string, any>;
  transmissionOil?: Record<string, any>;
  brakeFluid?: Record<string, any>;
  coolant?: Record<string, any>;
  valveAdjustment?: Record<string, any>;
  sparkPlug?: Record<string, any>;
  chain?: Record<string, any>;
  tires?: Record<string, any>;
  brakes?: Record<string, any>;
  fuelCapacity?: string;
  torqueValues?: Record<string, string>;
  procedures?: Record<string, string>;
  commonIssues?: Array<{
    symptom: string;
    possibleCauses: string[];
    solution: string;
  }>;
  replacementParts?: Array<{
    name: string;
    oemCode: string;
    interval: string;
  }>;
  externalManualUrl?: string;
}

export interface ManualResponse extends ManualData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para Resposta de API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Tipos para Erro
export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
}

// Tipos para Admin
export interface AdminData {
  email: string;
  name: string;
  masterPassword: string;
  supportWhatsapp?: string;
}

export interface AdminUpdate {
  name?: string;
  supportWhatsapp?: string;
  masterPassword?: string;
}

// Tipos para Acesso
export interface AccessLogData {
  clientId?: string;
  action: string;
  resourceId?: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  errorMessage?: string;
}
