/**
 * AppWithBackend.tsx
 * 
 * Wrapper que integra o App.tsx original com sincronização de banco de dados
 * Mantém 100% da interface original, adiciona sincronização nos bastidores
 */

import React, { useEffect, useState } from 'react';
import App from './App';
import { syncWithBackend, isBackendAvailable } from './api';

const AppWithBackend: React.FC = () => {
  const [backendAvailable, setBackendAvailable] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');

  // Verificar se backend está disponível ao iniciar
  useEffect(() => {
    const checkBackend = async () => {
      const available = await isBackendAvailable();
      setBackendAvailable(available);
      
      if (available) {
        console.log('✅ Backend disponível - Sincronização ativada');
      } else {
        console.log('⚠️ Backend indisponível - Usando localStorage como fallback');
      }
    };

    checkBackend();
    
    // Verificar a cada 30 segundos
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  // Sincronizar dados periodicamente
  useEffect(() => {
    if (!backendAvailable) return;

    const syncTimer = setInterval(async () => {
      try {
        setSyncStatus('syncing');
        
        // Sincronizar clientes
        const clients = JSON.parse(localStorage.getItem('BANCO_DADOS_MANUAL') || '[]');
        if (clients.length > 0) {
          await syncWithBackend('save_clients', clients);
        }

        setSyncStatus('synced');
        setTimeout(() => setSyncStatus('idle'), 2000);
      } catch (error) {
        console.error('Erro na sincronização:', error);
        setSyncStatus('error');
      }
    }, 60000); // Sincronizar a cada 1 minuto

    return () => clearInterval(syncTimer);
  }, [backendAvailable]);

  return (
    <>
      {/* Indicador de status de sincronização (opcional, pode ser removido) */}
      {syncStatus !== 'idle' && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 9999,
          backgroundColor: syncStatus === 'syncing' ? '#ff6b00' : 
                          syncStatus === 'synced' ? '#22c55e' : '#ef4444',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {syncStatus === 'syncing' ? '⏳ Sincronizando...' :
           syncStatus === 'synced' ? '✅ Sincronizado' :
           '❌ Erro na sincronização'}
        </div>
      )}

      {/* App original sem nenhuma alteração */}
      <App />
    </>
  );
};

export default AppWithBackend;
