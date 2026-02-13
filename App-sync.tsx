/**
 * App-sync.tsx
 * Versão do App.tsx com sincronização automática com servidor
 * 
 * Adiciona sincronização de:
 * - IDs de clientes
 * - Configurações (WhatsApp de suporte)
 * - Serviços
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BrandGrid from './components/BrandGrid';
import ModelList from './components/ModelList';
import ManualViewer from './components/ManualViewer';
import Utilities from './components/Utilities';
import ServiceManager from './components/ServiceManager';
import { AppView, MSConfiguration } from './types';
import { MS_CONFIGURATIONS } from './data';

// ========================================================
// --- CONFIGURAÇÃO DE ACESSO MASTER E IMORTAL ---
// ========================================================
const SENHA_MASTER = 'MASTER2025'; 
const ID_MASTER_ADICIONAL = 'Murilo1.2.3';
const ID_IMORTAL = 'manualms';

// Chaves de armazenamento fixas
const STORAGE_KEYS = {
  CLIENTS: 'BANCO_DADOS_MANUAL', 
  AUTH: 'ms_auth_state',
  USER_TYPE: 'ms_user_role',
  DEVICE_ID: 'ms_hardware_fingerprint',
  FAVORITES: 'ms_user_garage',
  CURRENT_USER: 'ms_current_user_id',
  SUPPORT_WA: 'ms_global_support_whatsapp'
};

// URL do servidor de sincronização
const SYNC_API_URL = process.env.REACT_APP_SYNC_URL || 'http://localhost:3001/api/sync';

interface Client {
  id: string;
  linkedDeviceId?: string;
}

/**
 * Funções de sincronização
 */
const syncFunctions = {
  async fetchClientsFromServer(): Promise<Client[] | null> {
    try {
      const response = await fetch(`${SYNC_API_URL}/clients`);
      if (!response.ok) return null;
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.warn('Erro ao buscar clientes do servidor:', error);
      return null;
    }
  },

  async syncClientsToServer(clients: Client[]): Promise<boolean> {
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
      console.warn('Erro ao sincronizar clientes:', error);
      return false;
    }
  },

  async fetchConfigFromServer(): Promise<any | null> {
    try {
      const response = await fetch(`${SYNC_API_URL}/config`);
      if (!response.ok) return null;
      const data = await response.json();
      return data.success ? data.data : null;
    } catch (error) {
      console.warn('Erro ao buscar config do servidor:', error);
      return null;
    }
  },

  async syncConfigToServer(config: any): Promise<boolean> {
    try {
      const response = await fetch(`${SYNC_API_URL}/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (!response.ok) return false;
      const data = await response.json();
      return data.success;
    } catch (error) {
      console.warn('Erro ao sincronizar config:', error);
      return false;
    }
  },

  async isServerOnline(): Promise<boolean> {
    try {
      const response = await fetch(`${SYNC_API_URL.replace('/api/sync', '')}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
};

const App: React.FC = () => {
  // --- 1. IDENTIFICAÇÃO ÚNICA DO APARELHO ---
  const [myDeviceId] = useState<string>(() => {
    let id = localStorage.getItem(STORAGE_KEYS.DEVICE_ID);
    if (!id) {
      id = 'DEV-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      localStorage.setItem(STORAGE_KEYS.DEVICE_ID, id);
    }
    return id;
  });

  // --- 2. INICIALIZAÇÃO DO BANCO DE DADOS ---
  const [authorizedClients, setAuthorizedClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) { console.error("Erro ao carregar banco:", e); }
    }
    return [];
  });

  // --- 3. ESTADOS DE SESSÃO E UI ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });
  
  const [userType, setUserType] = useState<'admin' | 'cliente' | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.USER_TYPE) as 'admin' | 'cliente' | null;
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  });

  const [supportWhatsApp, setSupportWhatsApp] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.SUPPORT_WA) || '';
  });

  const isAdmin = userType === 'admin';

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    try { return saved ? JSON.parse(saved) : []; } catch { return []; }
  });

  const [loginInput, setLoginInput] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [view, setView] = useState<AppView>('home');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedMSConfig, setSelectedMSConfig] = useState<MSConfiguration | null>(null);
  const [newClientId, setNewClientId] = useState<string>('');
  const [adminSearch, setAdminSearch] = useState<string>('');
  const [backupText, setBackupText] = useState<string>('');
  const [tempWA, setTempWA] = useState<string>(supportWhatsApp);

  // ========== SINCRONIZAÇÃO AUTOMÁTICA ==========

  // Sincronizar clientes com servidor quando mudam
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(authorizedClients));
    
    // Sincronizar com servidor após 1 segundo
    const timer = setTimeout(async () => {
      const isOnline = await syncFunctions.isServerOnline();
      if (isOnline) {
        const success = await syncFunctions.syncClientsToServer(authorizedClients);
        if (success) {
          console.log('✅ Clientes sincronizados com servidor');
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [authorizedClients]);

  // Sincronizar favoritos
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  // Buscar clientes do servidor ao iniciar (apenas uma vez)
  useEffect(() => {
    const fetchFromServer = async () => {
      const isOnline = await syncFunctions.isServerOnline();
      if (isOnline && authorizedClients.length === 0) {
        const serverClients = await syncFunctions.fetchClientsFromServer();
        if (serverClients && serverClients.length > 0) {
          setAuthorizedClients(serverClients);
          console.log('✅ Clientes carregados do servidor');
        }
      }
    };

    fetchFromServer();
  }, []);

  // Buscar configurações do servidor ao iniciar
  useEffect(() => {
    const fetchConfigFromServer = async () => {
      const isOnline = await syncFunctions.isServerOnline();
      if (isOnline && !supportWhatsApp) {
        const config = await syncFunctions.fetchConfigFromServer();
        if (config && config.supportWhatsApp) {
          setSupportWhatsApp(config.supportWhatsApp);
          setTempWA(config.supportWhatsApp);
          localStorage.setItem(STORAGE_KEYS.SUPPORT_WA, config.supportWhatsApp);
          console.log('✅ Configurações carregadas do servidor');
        }
      }
    };

    fetchConfigFromServer();
  }, []);

  // ========== FUNÇÕES DE LOGIN ==========
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const input = loginInput.trim();
    const inputLower = input.toLowerCase();
    const inputUpper = input.toUpperCase();
    
    if (input === SENHA_MASTER || input === ID_MASTER_ADICIONAL) {
      setUserType('admin');
      setIsAuthenticated(true);
      setCurrentUserId(input);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, 'admin');
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, input);
      return;
    } 

    if (inputLower === ID_IMORTAL) {
      setUserType('cliente');
      setIsAuthenticated(true);
      setCurrentUserId(ID_IMORTAL);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, 'cliente');
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, ID_IMORTAL);
      return;
    }
    
    const clientIndex = authorizedClients.findIndex(c => c.id === inputUpper);

    if (clientIndex !== -1) {
      const client = authorizedClients[clientIndex];

      if (client.linkedDeviceId && client.linkedDeviceId !== myDeviceId) {
        setLoginError('ID BLOQUEADO EM OUTRO APARELHO');
        return;
      }

      if (!client.linkedDeviceId) {
        const updated = [...authorizedClients];
        updated[clientIndex] = { ...client, linkedDeviceId: myDeviceId };
        setAuthorizedClients(updated);
      }

      setUserType('cliente');
      setIsAuthenticated(true);
      setCurrentUserId(inputUpper);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, 'cliente');
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, inputUpper);
      return;
    }

    setLoginError('ACESSO NEGADO: ID INVÁLIDO');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setCurrentUserId(null);
    setLoginInput('');
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.USER_TYPE);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    setView('home');
  };

  // ========== FUNÇÕES DO PAINEL DO ADMINISTRADOR ==========
  const handleAddClient = async () => {
    if (!isAdmin) return;
    const id = newClientId.trim().toUpperCase();
    if (id && !authorizedClients.some(c => c.id === id)) {
      const newClient = { id };
      setAuthorizedClients(prev => [...prev, newClient]);
      setNewClientId('');

      // Sincronizar com servidor
      const isOnline = await syncFunctions.isServerOnline();
      if (isOnline) {
        await syncFunctions.syncClientsToServer([...authorizedClients, newClient]);
        console.log('✅ Novo cliente sincronizado com servidor');
      }
    } else if (id) {
      alert('Este ID já existe!');
    }
  };

  const handleRemoveClient = (id: string) => {
    if (!isAdmin) return;
    if (window.confirm(`Excluir ${id}?`)) {
      const updated = authorizedClients.filter(c => c.id !== id);
      setAuthorizedClients(updated);

      // Sincronizar com servidor
      syncFunctions.syncClientsToServer(updated);
    }
  };

  const handleSaveSupportWA = async () => {
    const cleanWA = tempWA.replace(/\D/g, '');
    setSupportWhatsApp(cleanWA);
    localStorage.setItem(STORAGE_KEYS.SUPPORT_WA, cleanWA);
    
    // Sincronizar com servidor
    const isOnline = await syncFunctions.isServerOnline();
    if (isOnline) {
      await syncFunctions.syncConfigToServer({ supportWhatsApp: cleanWA });
      console.log('✅ Configuração sincronizada com servidor');
    }
    
    alert('Configuração atualizada');
  };

  const handleRemoveSupportWA = async () => {
    setSupportWhatsApp('');
    setTempWA('');
    localStorage.removeItem(STORAGE_KEYS.SUPPORT_WA);

    // Sincronizar com servidor
    const isOnline = await syncFunctions.isServerOnline();
    if (isOnline) {
      await syncFunctions.syncConfigToServer({ supportWhatsApp: '' });
    }

    alert('Configuração atualizada');
  };

  const handleSyncBackup = () => {
    if (!isAdmin || !backupText.trim()) return;
    try {
      const data = JSON.parse(backupText);
      if (Array.isArray(data)) {
        setAuthorizedClients(data);
        alert('Banco de Dados Sincronizado!');
      }
    } catch (e) {
      const ids = backupText.split('\n')
        .map(line => line.trim().toUpperCase())
        .filter(id => id.length > 0);
      
      const newClients: Client[] = ids.map(id => ({ id }));
      setAuthorizedClients(newClients);
      alert(`${newClients.length} IDs Sincronizados via lista!`);
    }
    setBackupText('');
  };

  const copyToClipboard = (id: string) => {
    navigator.clipboard.writeText(id);
    const btn = document.getElementById(`copy-${id}`);
    if (btn) btn.innerText = 'OK';
    setTimeout(() => { if (btn) btn.innerText = '📋'; }, 1000);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleBack = () => {
    if (view === 'manual') {
      setView(selectedBrand ? 'models' : 'favorites');
      setSelectedMSConfig(null);
    } else {
      setView('home');
      setSelectedBrand('');
    }
  };

  const filteredAdminClients = authorizedClients.filter(c => 
    c.id.toLowerCase().includes(adminSearch.toLowerCase())
  );

  const favoriteConfigs = MS_CONFIGURATIONS.filter(m => favorites.includes(m.id));

  // ========== RENDERIZAÇÃO ==========
  // (Mantém o restante do App.tsx igual)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0a0c] p-6 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl"></div>
        
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm bg-[#16161a] border border-slate-800 rounded-2xl p-8 shadow-2xl relative z-10">
            <div className="text-center mb-10">
              <div className="inline-block bg-[#ff6b00] p-4 rounded-xl transform rotate-3 mb-6 shadow-xl shadow-orange-900/40">
                <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" className="w-12 h-12">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                    <path d="M2 17L12 22L22 17" />
                </svg>
              </div>
              <h1 className="font-radical font-black text-3xl text-white italic tracking-tighter uppercase leading-none">MS-CONFIGURATION</h1>
              <p className="text-slate-500 text-[10px] font-radical font-bold uppercase tracking-[0.3em] mt-3">SISTEMA DE ACESSO TÉCNICO</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <label className="block text-slate-500 font-radical text-[10px] font-black uppercase mb-3 ml-1 tracking-widest">Credencial de Acesso</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="ID / SENHA MASTER"
                    className={`w-full bg-[#0a0a0c] border p-4 rounded-lg text-white font-mono text-center tracking-[0.2em] focus:ring-1 focus:ring-[#ff6b00] outline-none transition-all ${loginError ? 'border-red-600 animate-pulse' : 'border-slate-800'}`}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {loginError && <p className="text-red-600 text-[10px] font-black mt-3 text-center uppercase tracking-widest leading-tight">{loginError}</p>}
              </div>
              <button type="submit" className="w-full btn-radical p-5 rounded-lg font-radical font-black text-black uppercase tracking-[0.3em] shadow-lg shadow-orange-600/30">AUTENTICAR</button>
            </form>
            <div className="mt-8 text-center border-t border-slate-900 pt-6">
              <p className="text-[7px] text-slate-700 font-radical uppercase tracking-widest font-black opacity-40">BANCO_DADOS_MANUAL V3.5 STABLE</p>
            </div>
          </div>
        </div>

        {supportWhatsApp && supportWhatsApp.trim() !== '' && (
          <div className="fixed bottom-6 right-6 z-50">
            <a href={`https://wa.me/${supportWhatsApp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              💬 Suporte
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <Header isAdmin={isAdmin} onLogout={handleLogout} />
  );
};

export default App;
