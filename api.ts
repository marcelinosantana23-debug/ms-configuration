/**
 * API Integration Layer
 * Sincroniza dados com o backend PostgreSQL
 * Mantém compatibilidade com localStorage como fallback
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface Client {
  id: string;
  linkedDeviceId?: string;
}

interface ServiceRecord {
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
 * Sincroniza clientes com o backend
 */
export async function syncClientsToBackend(clients: Client[]): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/clients/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('ms_auth_token') || ''}`
      },
      body: JSON.stringify({ clients })
    });

    if (!response.ok) {
      console.warn('Falha ao sincronizar clientes com backend, usando localStorage');
      return false;
    }

    const data: ApiResponse<any> = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao conectar com backend:', error);
    return false;
  }
}

/**
 * Busca clientes do backend
 */
export async function fetchClientsFromBackend(): Promise<Client[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/clients`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('ms_auth_token') || ''}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const data: ApiResponse<Client[]> = await response.json();
    return data.success && data.data ? data.data : null;
  } catch (error) {
    console.warn('Erro ao buscar clientes:', error);
    return null;
  }
}

/**
 * Faz login e obtém token JWT
 */
export async function loginToBackend(clientId: string, deviceId: string): Promise<string | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ clientId, deviceId })
    });

    if (!response.ok) {
      return null;
    }

    const data: ApiResponse<{ token: string }> = await response.json();
    
    if (data.success && data.data?.token) {
      localStorage.setItem('ms_auth_token', data.data.token);
      return data.data.token;
    }

    return null;
  } catch (error) {
    console.warn('Erro ao fazer login:', error);
    return null;
  }
}

/**
 * Salva serviço no backend
 */
export async function saveServiceRecord(service: ServiceRecord): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('ms_auth_token') || ''}`
      },
      body: JSON.stringify(service)
    });

    if (!response.ok) {
      console.warn('Falha ao salvar serviço no backend');
      return false;
    }

    const data: ApiResponse<any> = await response.json();
    return data.success;
  } catch (error) {
    console.warn('Erro ao salvar serviço:', error);
    return false;
  }
}

/**
 * Busca serviços do cliente
 */
export async function fetchClientServices(clientId: string): Promise<ServiceRecord[] | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/services?clientId=${clientId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('ms_auth_token') || ''}`
      }
    });

    if (!response.ok) {
      return null;
    }

    const data: ApiResponse<ServiceRecord[]> = await response.json();
    return data.success && data.data ? data.data : null;
  } catch (error) {
    console.warn('Erro ao buscar serviços:', error);
    return null;
  }
}

/**
 * Sincroniza dados com backend (com fallback para localStorage)
 * Função principal que o App.tsx deve chamar
 */
export async function syncWithBackend(
  action: 'save_clients' | 'fetch_clients' | 'save_service' | 'fetch_services',
  payload?: any
): Promise<any> {
  try {
    switch (action) {
      case 'save_clients':
        return await syncClientsToBackend(payload);
      
      case 'fetch_clients':
        return await fetchClientsFromBackend();
      
      case 'save_service':
        return await saveServiceRecord(payload);
      
      case 'fetch_services':
        return await fetchClientServices(payload);
      
      default:
        return null;
    }
  } catch (error) {
    console.error('Erro na sincronização:', error);
    return null;
  }
}

/**
 * Verifica se backend está disponível
 */
export async function isBackendAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`, {
      method: 'GET'
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Hook para sincronização automática (usar em useEffect)
 */
export function useBackendSync(
  data: any,
  action: 'save_clients' | 'fetch_clients' | 'save_service' | 'fetch_services',
  delay: number = 5000
) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      syncWithBackend(action, data).catch(err => {
        console.warn('Falha na sincronização automática:', err);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [data, action, delay]);
}

export default {
  syncClientsToBackend,
  fetchClientsFromBackend,
  loginToBackend,
  saveServiceRecord,
  fetchClientServices,
  syncWithBackend,
  isBackendAvailable,
  useBackendSync
};
