/**
 * API Sync Client
 * Cliente para sincronizar com o servidor backend
 */

const API_BASE_URL = process.env.REACT_APP_SYNC_URL || 'http://localhost:3001/api/sync';

interface Client {
  id: string;
  linkedDeviceId?: string;
}

interface Service {
  id: string;
  clientId: string;
  brand: string;
  model: string;
  value: number;
  status: 'Pago' | 'Pendente';
  paymentMethod?: string;
  date: string;
}

/**
 * Busca todos os clientes do servidor
 */
export async function fetchClientsFromServer(): Promise<Client[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`);
    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.warn('Erro ao buscar clientes:', error);
    return null;
  }
}

/**
 * Sincroniza clientes com o servidor
 */
export async function syncClientsToServer(clients: Client[]): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clients })
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao sincronizar clientes:', error);
    return false;
  }
}

/**
 * Adiciona um novo cliente no servidor
 */
export async function addClientToServer(id: string, linkedDeviceId?: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, linkedDeviceId })
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao adicionar cliente:', error);
    return false;
  }
}

/**
 * Remove um cliente do servidor
 */
export async function removeClientFromServer(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao remover cliente:', error);
    return false;
  }
}

/**
 * Busca serviços do servidor
 */
export async function fetchServicesFromServer(clientId?: string): Promise<Service[] | null> {
  try {
    const url = clientId 
      ? `${API_BASE_URL}/services?clientId=${clientId}`
      : `${API_BASE_URL}/services`;

    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.warn('Erro ao buscar serviços:', error);
    return null;
  }
}

/**
 * Sincroniza serviços com o servidor
 */
export async function syncServicesToServer(services: Service[]): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ services })
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao sincronizar serviços:', error);
    return false;
  }
}

/**
 * Busca configurações do servidor
 */
export async function fetchConfigFromServer(): Promise<any | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/config`);
    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.warn('Erro ao buscar configurações:', error);
    return null;
  }
}

/**
 * Atualiza configurações no servidor
 */
export async function updateConfigOnServer(config: any): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao atualizar configurações:', error);
    return false;
  }
}

/**
 * Verifica se servidor está online
 */
export async function isServerOnline(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api/sync', '')}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Sincronização inteligente: tenta servidor, fallback para localStorage
 */
export async function smartSync(
  action: 'fetch_clients' | 'sync_clients' | 'fetch_services' | 'sync_services' | 'fetch_config' | 'update_config',
  payload?: any
): Promise<any> {
  const isOnline = await isServerOnline();

  try {
    switch (action) {
      case 'fetch_clients':
        if (isOnline) {
          return await fetchClientsFromServer();
        }
        break;

      case 'sync_clients':
        if (isOnline) {
          return await syncClientsToServer(payload);
        }
        break;

      case 'fetch_services':
        if (isOnline) {
          return await fetchServicesFromServer(payload);
        }
        break;

      case 'sync_services':
        if (isOnline) {
          return await syncServicesToServer(payload);
        }
        break;

      case 'fetch_config':
        if (isOnline) {
          return await fetchConfigFromServer();
        }
        break;

      case 'update_config':
        if (isOnline) {
          return await updateConfigOnServer(payload);
        }
        break;
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
  }

  return null;
}

export default {
  fetchClientsFromServer,
  syncClientsToServer,
  addClientToServer,
  removeClientFromServer,
  fetchServicesFromServer,
  syncServicesToServer,
  fetchConfigFromServer,
  updateConfigOnServer,
  isServerOnline,
  smartSync
};
