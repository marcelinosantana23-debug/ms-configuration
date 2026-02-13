import React, { useState, useEffect } from 'react';
import { 
  sendPushNotification, 
  getNotificationPreferences, 
  saveNotificationPreferences,
  requestNotificationPermission 
} from '../push-notifications';
import { generateWhatsAppMessage, generateWhatsAppLink } from '../whatsapp-notifications';

interface NotificationManagerProps {
  onClose: () => void;
}

const NotificationManager: React.FC<NotificationManagerProps> = ({ onClose }) => {
  const [preferences, setPreferences] = useState(getNotificationPreferences());
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>(
    'Notification' in window ? Notification.permission : 'denied'
  );

  const handleToggleNotifications = async () => {
    if (!preferences.enabled) {
      const granted = await requestNotificationPermission();
      if (granted) {
        setPreferences({ ...preferences, enabled: true });
        saveNotificationPreferences({ ...preferences, enabled: true });
        setNotificationPermission('granted');
        
        // Enviar notificação de teste
        await sendPushNotification({
          title: '✅ Notificações Ativadas',
          body: 'Você receberá lembretes de manutenção preventiva',
          requireInteraction: false
        });
      }
    } else {
      setPreferences({ ...preferences, enabled: false });
      saveNotificationPreferences({ ...preferences, enabled: false });
    }
  };

  const handleChangeInterval = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newInterval = parseInt(e.target.value);
    const newPrefs = { ...preferences, checkIntervalMinutes: newInterval };
    setPreferences(newPrefs);
    saveNotificationPreferences(newPrefs);
  };

  const handleChangeDaysBefore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const days = parseInt(e.target.value);
    const newPrefs = { ...preferences, notifyDaysBefore: days };
    setPreferences(newPrefs);
    saveNotificationPreferences(newPrefs);
  };

  const handleChangeKmBefore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const km = parseInt(e.target.value);
    const newPrefs = { ...preferences, notifyKmBefore: km };
    setPreferences(newPrefs);
    saveNotificationPreferences(newPrefs);
  };

  const handleTestNotification = async () => {
    await sendPushNotification({
      title: '🧪 Notificação de Teste',
      body: 'Sua moto precisa de manutenção em 5 dias ou 500 km',
      requireInteraction: true
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1e] rounded-lg max-w-md w-full border border-orange-600/30 flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-slate-700 sticky top-0 bg-[#1a1a1e]">
          <h2 className="text-xl font-bold text-orange-500">⚙️ Notificações</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 p-6 overflow-y-auto flex-1">
          {/* Status de permissão */}
          <div className="bg-[#0f0f12] p-4 rounded border border-slate-700">
            <p className="text-sm text-gray-400 mb-2">Status de Permissão:</p>
            <p className="text-orange-500 font-bold">
              {notificationPermission === 'granted' ? '✅ Ativado' : '❌ Desativado'}
            </p>
          </div>

          {/* Toggle de notificações */}
          <div className="flex items-center justify-between bg-[#0f0f12] p-4 rounded border border-slate-700">
            <span className="text-white">Ativar Notificações</span>
            <button
              onClick={handleToggleNotifications}
              className={`w-12 h-6 rounded-full transition-colors ${
                preferences.enabled ? 'bg-orange-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  preferences.enabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {preferences.enabled && (
            <>
              {/* Intervalo de verificação */}
              <div className="bg-[#0f0f12] p-4 rounded border border-slate-700">
                <label className="block text-sm text-gray-400 mb-2">
                  Intervalo de Verificação
                </label>
                <select
                  value={preferences.checkIntervalMinutes}
                  onChange={handleChangeInterval}
                  className="w-full bg-[#1a1a1e] text-white border border-slate-600 rounded px-3 py-2"
                >
                  <option value={30}>A cada 30 minutos</option>
                  <option value={60}>A cada 1 hora</option>
                  <option value={240}>A cada 4 horas</option>
                  <option value={1440}>A cada 24 horas</option>
                </select>
              </div>

              {/* Dias antes */}
              <div className="bg-[#0f0f12] p-4 rounded border border-slate-700">
                <label className="block text-sm text-gray-400 mb-2">
                  Notificar com quantos dias de antecedência?
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={preferences.notifyDaysBefore}
                  onChange={handleChangeDaysBefore}
                  className="w-full bg-[#1a1a1e] text-white border border-slate-600 rounded px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Padrão: {preferences.notifyDaysBefore} dias
                </p>
              </div>

              {/* KM antes */}
              <div className="bg-[#0f0f12] p-4 rounded border border-slate-700">
                <label className="block text-sm text-gray-400 mb-2">
                  Notificar com quantos km de antecedência?
                </label>
                <input
                  type="number"
                  min="100"
                  max="5000"
                  step="100"
                  value={preferences.notifyKmBefore}
                  onChange={handleChangeKmBefore}
                  className="w-full bg-[#1a1a1e] text-white border border-slate-600 rounded px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Padrão: {preferences.notifyKmBefore} km
                </p>
              </div>

              {/* Botão de teste */}
              <button
                onClick={handleTestNotification}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                🔬 Enviar Notificação de Teste
              </button>
            </>
          )}

          {/* Seção de WhatsApp */}
          <div className="bg-[#0f0f12] p-4 rounded border border-green-700/30 text-xs text-gray-400">
            <p className="mb-3 text-green-500 font-bold">
              📱 Notificações por WhatsApp
            </p>
            <p className="text-gray-400 mb-3">
              O número de WhatsApp do cliente deve ser adicionado no Painel do Administrador para receber mensagens automáticas de manutenção.
            </p>
            <div className="bg-[#1a1a1e] p-3 rounded border border-green-600/20 text-[10px]">
              <p className="font-bold text-green-400 mb-2">📌 Exemplo de mensagem:</p>
              <p className="text-gray-300 whitespace-pre-wrap">
                🔴 <strong>MANUTENÇÃO PRÓXIMA</strong>
              </p>
              <p className="text-gray-400 text-[9px] mt-2">Sua Honda CB 500 precisa de Troca de Óleo em 5 dias ou 300 km</p>
            </div>
          </div>

          {/* Informações */}
          <div className="bg-[#0f0f12] p-4 rounded border border-slate-700 text-xs text-gray-400 mb-2">
            <p className="mb-2">
              📋 <strong>Como funciona:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Rastreia a data e km da última manutenção</li>
              <li>Calcula próxima manutenção baseado em intervalo</li>
              <li>Envia notificação quando está próximo</li>
              <li>Envia WhatsApp se número estiver configurado</li>
              <li>Funciona mesmo com app fechado</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationManager;
