/**
 * Sistema de notificações por WhatsApp para manutenção preventiva
 * Integra com WhatsApp Web API para enviar mensagens automáticas
 */

export interface WhatsAppNotificationPayload {
  clientId: string;
  clientPhone: string;
  motorcycleBrand: string;
  motorcycleModel: string;
  maintenanceType: string;
  daysUntil: number;
  kmUntil: number;
  isDue: boolean;
}

/**
 * Gera mensagem de manutenção para WhatsApp
 */
export function generateWhatsAppMessage(payload: WhatsAppNotificationPayload): string {
  const { motorcycleBrand, motorcycleModel, maintenanceType, daysUntil, kmUntil, isDue } = payload;

  if (isDue) {
    return `⚠️ *MANUTENÇÃO VENCIDA!*

Sua ${motorcycleBrand} ${motorcycleModel} precisa de *${maintenanceType}* AGORA!

Favor agendar o serviço com urgência.

_Mensagem automática do MS-Configuration_`;
  }

  if (daysUntil <= 7 || kmUntil <= 500) {
    return `🔴 *MANUTENÇÃO PRÓXIMA*

Sua ${motorcycleBrand} ${motorcycleModel} precisa de:
*${maintenanceType}*

⏰ Em ${daysUntil} dias
🛣️ Em ${kmUntil} km

Agende com antecedência!

_Mensagem automática do MS-Configuration_`;
  }

  return `🟡 *LEMBRETE DE MANUTENÇÃO*

Sua ${motorcycleBrand} ${motorcycleModel} vai precisar de:
*${maintenanceType}*

⏰ Em ${daysUntil} dias
🛣️ Em ${kmUntil} km

_Mensagem automática do MS-Configuration_`;
}

/**
 * Envia notificação via WhatsApp usando API
 * Suporta múltiplos serviços: WhatsApp Business API, Twilio, etc.
 */
export async function sendWhatsAppNotification(
  payload: WhatsAppNotificationPayload,
  apiEndpoint?: string
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const message = generateWhatsAppMessage(payload);
    const phoneNumber = payload.clientPhone.replace(/\D/g, '');

    // Se tiver endpoint customizado, usar ele
    if (apiEndpoint) {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: `55${phoneNumber}`,
          message,
          clientId: payload.clientId
        })
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, messageId: data.messageId };
      } else {
        return { success: false, error: 'Erro ao enviar mensagem' };
      }
    }

    // Fallback: usar WhatsApp Web (link)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodedMessage}`;

    // Salvar no histórico de tentativas
    saveWhatsAppAttempt({
      clientId: payload.clientId,
      phone: phoneNumber,
      message,
      timestamp: new Date().toISOString(),
      status: 'pending',
      url: whatsappUrl
    });

    return { success: true, messageId: `wa_${Date.now()}` };
  } catch (error) {
    console.error('Erro ao enviar notificação WhatsApp:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Salva tentativa de envio de mensagem WhatsApp
 */
export function saveWhatsAppAttempt(attempt: {
  clientId: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
  url?: string;
}): void {
  const history = getWhatsAppHistory();
  history.push(attempt);

  // Manter apenas últimas 500 tentativas
  if (history.length > 500) {
    history.splice(0, history.length - 500);
  }

  localStorage.setItem('whatsapp_notification_history', JSON.stringify(history));
}

/**
 * Obtém histórico de notificações WhatsApp
 */
export function getWhatsAppHistory(): Array<{
  clientId: string;
  phone: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
  url?: string;
}> {
  const stored = localStorage.getItem('whatsapp_notification_history');
  return stored ? JSON.parse(stored) : [];
}

/**
 * Verifica se notificação WhatsApp já foi enviada para cliente hoje
 */
export function hasWhatsAppNotificationBeenSentToday(clientId: string): boolean {
  const history = getWhatsAppHistory();
  const today = new Date().toISOString().split('T')[0];

  return history.some(
    attempt =>
      attempt.clientId === clientId &&
      attempt.timestamp.startsWith(today) &&
      attempt.status !== 'failed'
  );
}

/**
 * Gera link direto para WhatsApp
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/55${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Limpa histórico de notificações WhatsApp
 */
export function clearWhatsAppHistory(): void {
  localStorage.removeItem('whatsapp_notification_history');
}

/**
 * Obtém estatísticas de notificações WhatsApp
 */
export function getWhatsAppStats(): {
  totalAttempts: number;
  successfulToday: number;
  failedToday: number;
  pendingToday: number;
} {
  const history = getWhatsAppHistory();
  const today = new Date().toISOString().split('T')[0];
  const todayAttempts = history.filter(a => a.timestamp.startsWith(today));

  return {
    totalAttempts: history.length,
    successfulToday: todayAttempts.filter(a => a.status === 'sent').length,
    failedToday: todayAttempts.filter(a => a.status === 'failed').length,
    pendingToday: todayAttempts.filter(a => a.status === 'pending').length
  };
}
