// Sistema de rastreamento de manutenção preventiva com notificações

export interface MaintenanceRecord {
  id: string;
  motorcycleId: string;
  type: 'oil' | 'filter' | 'spark_plug' | 'chain' | 'brakes' | 'tires' | 'general';
  date: Date;
  km: number;
  notes: string;
}

export interface MaintenanceSchedule {
  type: 'oil' | 'filter' | 'spark_plug' | 'chain' | 'brakes' | 'tires' | 'general';
  intervalKm: number;
  intervalDays: number;
  description: string;
}

// Intervalos de manutenção padrão por tipo
export const MAINTENANCE_SCHEDULES: Record<string, MaintenanceSchedule> = {
  oil: {
    type: 'oil',
    intervalKm: 5000,
    intervalDays: 180,
    description: 'Troca de óleo do motor'
  },
  filter: {
    type: 'filter',
    intervalKm: 10000,
    intervalDays: 365,
    description: 'Troca de filtro de ar'
  },
  spark_plug: {
    type: 'spark_plug',
    intervalKm: 20000,
    intervalDays: 730,
    description: 'Troca de vela de ignição'
  },
  chain: {
    type: 'chain',
    intervalKm: 10000,
    intervalDays: 365,
    description: 'Limpeza e lubrificação da corrente'
  },
  brakes: {
    type: 'brakes',
    intervalKm: 15000,
    intervalDays: 365,
    description: 'Verificação e possível troca de pastilhas de freio'
  },
  tires: {
    type: 'tires',
    intervalKm: 20000,
    intervalDays: 730,
    description: 'Verificação e possível troca de pneus'
  },
  general: {
    type: 'general',
    intervalKm: 5000,
    intervalDays: 180,
    description: 'Manutenção geral (verificação de fluidos, correntes, etc)'
  }
};

// Calcular próxima manutenção
export function getNextMaintenanceDate(
  lastMaintenanceDate: Date,
  lastMaintenanceKm: number,
  currentKm: number,
  schedule: MaintenanceSchedule
): { daysUntil: number; kmUntil: number; isDue: boolean } {
  const today = new Date();
  const daysSinceLastMaintenance = Math.floor(
    (today.getTime() - lastMaintenanceDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const kmSinceLastMaintenance = currentKm - lastMaintenanceKm;

  const daysUntil = Math.max(0, schedule.intervalDays - daysSinceLastMaintenance);
  const kmUntil = Math.max(0, schedule.intervalKm - kmSinceLastMaintenance);

  const isDue =
    daysSinceLastMaintenance >= schedule.intervalDays ||
    kmSinceLastMaintenance >= schedule.intervalKm;

  return { daysUntil, kmUntil, isDue };
}

// Verificar se manutenção está próxima (dentro de 7 dias ou 500 km)
export function isMaintenanceNearby(
  lastMaintenanceDate: Date,
  lastMaintenanceKm: number,
  currentKm: number,
  schedule: MaintenanceSchedule
): boolean {
  const { daysUntil, kmUntil, isDue } = getNextMaintenanceDate(
    lastMaintenanceDate,
    lastMaintenanceKm,
    currentKm,
    schedule
  );

  return isDue || daysUntil <= 7 || kmUntil <= 500;
}

// Gerar mensagem de notificação
export function generateMaintenanceNotification(
  motorcycleBrand: string,
  motorcycleModel: string,
  schedule: MaintenanceSchedule,
  daysUntil: number,
  kmUntil: number,
  isDue: boolean
): string {
  if (isDue) {
    return `⚠️ MANUTENÇÃO VENCIDA!\n\n${motorcycleBrand} ${motorcycleModel}\n\n${schedule.description}\n\nEntrar em contato com o mecânico para agendar.`;
  }

  if (daysUntil <= 7 && kmUntil <= 500) {
    return `🔧 MANUTENÇÃO PRÓXIMA\n\n${motorcycleBrand} ${motorcycleModel}\n\n${schedule.description}\n\nFaltam ${daysUntil} dias ou ${kmUntil} km`;
  }

  if (daysUntil <= 7) {
    return `📅 MANUTENÇÃO EM ${daysUntil} DIAS\n\n${motorcycleBrand} ${motorcycleModel}\n\n${schedule.description}`;
  }

  return `📍 MANUTENÇÃO EM ${kmUntil} KM\n\n${motorcycleBrand} ${motorcycleModel}\n\n${schedule.description}`;
}
