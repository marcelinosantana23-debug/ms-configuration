// Sistema de notificações push para manutenção preventiva

export interface PushNotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  requireInteraction?: boolean;
}

// Verificar suporte a notificações
export function isPushNotificationSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator;
}

// Solicitar permissão para notificações
export async function requestNotificationPermission(): Promise<boolean> {
  if (!isPushNotificationSupported()) {
    console.warn('Notificações push não são suportadas neste navegador');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission === 'denied') {
    console.warn('Permissão de notificações foi negada');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Erro ao solicitar permissão de notificações:', error);
    return false;
  }
}

// Enviar notificação push
export async function sendPushNotification(
  options: PushNotificationOptions
): Promise<Notification | null> {
  if (!isPushNotificationSupported()) {
    console.warn('Notificações push não são suportadas');
    return null;
  }

  if (Notification.permission !== 'granted') {
    console.warn('Permissão de notificações não foi concedida');
    return null;
  }

  try {
    const notification = new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/icon.png',
      badge: options.badge || '/badge.png',
      tag: options.tag || 'maintenance-notification',
      requireInteraction: options.requireInteraction ?? true,
      vibrate: [200, 100, 200],
    });

    // Fechar notificação após 10 segundos se não for interativa
    if (!options.requireInteraction) {
      setTimeout(() => notification.close(), 10000);
    }

    return notification;
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return null;
  }
}

// Agendar notificações periódicas
export function scheduleMaintenanceNotifications(
  checkIntervalMinutes: number = 60
): NodeJS.Timer {
  // Verificar notificações a cada intervalo
  return setInterval(() => {
    // Este intervalo será preenchido pela integração com o App.tsx
    console.log('Verificando manutenção preventiva...');
  }, checkIntervalMinutes * 60 * 1000);
}

// Armazenar preferências de notificação
export function saveNotificationPreferences(preferences: {
  enabled: boolean;
  checkIntervalMinutes: number;
  notifyDaysBefore: number;
  notifyKmBefore: number;
}): void {
  localStorage.setItem(
    'maintenanceNotificationPreferences',
    JSON.stringify(preferences)
  );
}

// Recuperar preferências de notificação
export function getNotificationPreferences(): {
  enabled: boolean;
  checkIntervalMinutes: number;
  notifyDaysBefore: number;
  notifyKmBefore: number;
} {
  const stored = localStorage.getItem('maintenanceNotificationPreferences');
  if (stored) {
    return JSON.parse(stored);
  }

  return {
    enabled: true,
    checkIntervalMinutes: 60,
    notifyDaysBefore: 7,
    notifyKmBefore: 500,
  };
}

// Armazenar histórico de notificações enviadas
export function saveNotificationHistory(
  motorcycleId: string,
  maintenanceType: string,
  timestamp: Date
): void {
  const history = JSON.parse(
    localStorage.getItem('notificationHistory') || '[]'
  );
  history.push({
    motorcycleId,
    maintenanceType,
    timestamp: timestamp.toISOString(),
  });

  // Manter apenas últimas 100 notificações
  if (history.length > 100) {
    history.shift();
  }

  localStorage.setItem('notificationHistory', JSON.stringify(history));
}

// Verificar se notificação já foi enviada hoje
export function hasNotificationBeenSentToday(
  motorcycleId: string,
  maintenanceType: string
): boolean {
  const history = JSON.parse(
    localStorage.getItem('notificationHistory') || '[]'
  );
  const today = new Date().toDateString();

  return history.some(
    (record: any) =>
      record.motorcycleId === motorcycleId &&
      record.maintenanceType === maintenanceType &&
      new Date(record.timestamp).toDateString() === today
  );
}
