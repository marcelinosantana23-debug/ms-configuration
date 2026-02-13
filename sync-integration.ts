/**
 * Sync Integration
 * Integra App.tsx com o servidor de sincronização
 */

const SYNC_API_URL = process.env.REACT_APP_SYNC_URL || 'http://localhost:3001/api/sync';

interface Client {
  id: string;
  linkedDeviceId?: string;
}

/**
 * Sincroniza clientes com o servidor
 */
export async function syncClientsWithServer(clients: Client[]): Promise<boolean> {
  try {
    const response = await fetch(`${SYNC_API_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clients })
    });

    if (!response.ok) return false;
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao sincronizar com servidor:', error);
    return false;
  }
}

/**
 * Busca clientes do servidor
 */
export async function fetchClientsFromServer(): Promise<Client[] | null> {
  try {
    const response = await fetch(`${SYNC_API_URL}/clients`);
    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.warn('Erro ao buscar clientes do servidor:', error);
    return null;
  }
}

/**
 * Adiciona cliente no servidor
 */
export async function addClientToServer(id: string, linkedDeviceId?: string): Promise<boolean> {
  try {
    const response = await fetch(`${SYNC_API_URL}/clients/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, linkedDeviceId })
    });

    if (!response.ok) return false;
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao adicionar cliente no servidor:', error);
    return false;
  }
}

/**
 * Remove cliente do servidor
 */
export async function removeClientFromServer(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${SYNC_API_URL}/clients/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) return false;
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao remover cliente do servidor:', error);
    return false;
  }
}

/**
 * Verifica se servidor está online
 */
export async function isServerOnline(): Promise<boolean> {
  try {
    const response = await fetch(`${SYNC_API_URL.replace('/api/sync', '')}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Hook para sincronizar clientes automaticamente
 */
export function useSyncClients(clients: Client[], enabled: boolean = true) {
  React.useEffect(() => {
    if (!enabled || clients.length === 0) return;

    const syncTimer = setTimeout(async () => {
      const isOnline = await isServerOnline();
      if (isOnline) {
        await syncClientsWithServer(clients);
        console.log('✅ Clientes sincronizados com servidor');
      }
    }, 2000); // Sincronizar após 2 segundos

    return () => clearTimeout(syncTimer);
  }, [clients, enabled]);
}

/**
 * Hook para buscar clientes do servidor ao iniciar
 */
export function useFetchClientsFromServer(onFetch: (clients: Client[]) => void) {
  React.useEffect(() => {
    const fetchClients = async () => {
      const isOnline = await isServerOnline();
      if (isOnline) {
        const clients = await fetchClientsFromServer();
        if (clients) {
          onFetch(clients);
          console.log('✅ Clientes carregados do servidor');
        }
      }
    };

    fetchClients();
  }, [onFetch]);
}

export default {
  syncClientsWithServer,
  fetchClientsFromServer,
  addClientToServer,
  removeClientFromServer,
  isServerOnline,
  useSyncClients,
  useFetchClientsFromServer
};
