
export interface ManualCategory {
  id: string;
  title: string;
  content: string | Record<string, string>;
}

export interface MSConfiguration {
  id: string;
  brand: string;
  model: string;
  year: string;
  displacement: string; // cilindrada
  manual: ManualCategory[];
  externalManualUrl?: string; // Link para manual completo online
}

export interface Brand {
  name: string;
  logo: string;
}

export type ServiceStatus = 'Pago' | 'Pendente';
export type PaymentMethod = 'Dinheiro' | 'Pix' | 'Cartão';

export interface ServiceRecord {
  id: string;
  client: string;
  description: string;
  value: number;
  date: number; // timestamp
  status: ServiceStatus;
  paymentMethod: PaymentMethod;
  monthYear: string; // Formato "YYYY-MM" para filtragem fácil
}

export type AppView = 'home' | 'models' | 'manual' | 'favorites' | 'utilities' | 'admin_panel';
