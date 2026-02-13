
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BrandGrid from './components/BrandGrid';
import ModelList from './components/ModelList';
import ManualViewer from './components/ManualViewer';
import Utilities from './components/Utilities';
import ServiceManager from './components/ServiceManager';
import NotificationManager from './components/NotificationManager';
import { AppView, MSConfiguration } from './types';
import { MS_CONFIGURATIONS } from './data';
import { requestNotificationPermission, sendPushNotification, getNotificationPreferences, hasNotificationBeenSentToday, saveNotificationHistory } from './push-notifications';
import { MAINTENANCE_SCHEDULES, getNextMaintenanceDate, generateMaintenanceNotification } from './maintenance-tracker';

// ========================================================
// --- CONFIGURAÇÃO DE ACESSO MASTER E IMORTAL ---
// ========================================================
const SENHA_MASTER = 'MASTER2025'; 
const ID_MASTER_ADICIONAL = 'Murilo1.2.3';
const ID_IMORTAL = 'manualms'; // ID Imortal: Acesso total sem trava de aparelho

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

interface Client {
  id: string;
  linkedDeviceId?: string;
  paused?: boolean;
  createdAt?: string;
  whatsapp?: string;
}

const App: React.FC = () => {
  // --- 0. INICIALIZAR NOTIFICAÇÕES ---
  useEffect(() => {
    // Solicitar permissão de notificações ao carregar
    if (requestNotificationPermission) {
      requestNotificationPermission().catch(() => {});
    }
  }, []);

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
  const [showNotificationManager, setShowNotificationManager] = useState<boolean>(false);

  // Sincronização automática para o Banco de Dados Manual
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(authorizedClients));
    
    // Sincronizar com servidor quando clientes mudam
    const syncToServer = async () => {
      try {
        const response = await fetch('https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clients: authorizedClients })
        });
        if (response.ok) {
          const result = await response.json();
          console.log('✅ Todos os clientes sincronizados:', result);
        }
      } catch (error) {
        console.error('Erro ao sincronizar clientes:', error);
      }
    };
    
    if (authorizedClients.length > 0) {
      syncToServer();
    }
  }, [authorizedClients]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPORT_WA, supportWhatsApp);
    
    // Sincronizar config com servidor
    if (supportWhatsApp) {
      const syncConfig = async () => {
        try {
          await fetch('https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ supportWhatsApp })
          });
          console.log('✅ WhatsApp sincronizado:', supportWhatsApp);
        } catch (error) {
          console.error('Erro ao sincronizar WhatsApp:', error);
        }
      };
      syncConfig();
    }
  }, [supportWhatsApp]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  // Buscar clientes do servidor ao iniciar
  useEffect(() => {
    const fetchFromServer = async () => {
      try {
        const response = await fetch('https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.length > 0) {
            const serverClients = data.data;
            const localClients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
            const merged = [...serverClients];
            localClients.forEach((local: Client) => {
              if (!merged.some(s => s.id === local.id)) {
                merged.push(local);
              }
            });
            setAuthorizedClients(merged);
            localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(merged));
            console.log('✅ Clientes carregados do servidor');
          }
        }
      } catch (error) {
        console.warn('Servidor offline - usando dados locais');
      }
    };
    fetchFromServer();
  }, []);

  // Buscar configuração de WhatsApp do servidor
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/config');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.supportWhatsApp) {
            setSupportWhatsApp(data.data.supportWhatsApp);
            setTempWA(data.data.supportWhatsApp);
            localStorage.setItem(STORAGE_KEYS.SUPPORT_WA, data.data.supportWhatsApp);
            console.log('✅ Configuração carregada do servidor');
          }
        }
      } catch (error) {
        console.warn('Servidor offline - usando configuração local');
      }
    };
    fetchConfig();
  }, []);

  // --- 4. LÓGICA DE LOGIN INTELIGENTE ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const input = loginInput.trim();
    const inputLower = input.toLowerCase();
    const inputUpper = input.toUpperCase();
    
    // A. Verificação de Senha Master (Admin)
    if (input === SENHA_MASTER || input === ID_MASTER_ADICIONAL) {
      setUserType('admin');
      setIsAuthenticated(true);
      setCurrentUserId(input);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, 'admin');
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, input);
      return;
    } 

    // B. Verificação de ID Mestre Imortal (Cliente sem trava)
    if (inputLower === ID_IMORTAL) {
      setUserType('cliente');
      setIsAuthenticated(true);
      setCurrentUserId(ID_IMORTAL);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      localStorage.setItem(STORAGE_KEYS.USER_TYPE, 'cliente');
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, ID_IMORTAL);
      return;
    }
    
    // C. Verificação de ID de Cliente (Com trava de hardware)
    const clientIndex = authorizedClients.findIndex(c => c.id === inputUpper);

    if (clientIndex !== -1) {
      const client = authorizedClients[clientIndex];
      
      // Verificar se ID está pausada
      if (client.paused) {
        setLoginError('ID PAUSADA - CONTATE O ADMINISTRADOR');
        return;
      }

      if (client.linkedDeviceId && client.linkedDeviceId !== myDeviceId) {
        setLoginError('ID BLOQUEADO EM OUTRO APARELHO');
        return;
      }

      if (!client.linkedDeviceId) {
        const updated = [...authorizedClients];
        updated[clientIndex] = { ...client, linkedDeviceId: myDeviceId };
        setAuthorizedClients(updated);
        
        // Sincronizar vinculacao com servidor
        try {
          fetch(`https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients/${inputUpper}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ linkedDeviceId: myDeviceId })
          }).then(r => r.json()).then(d => console.log('Vinculado:', d));
        } catch (error) {
          console.error('Erro ao vincular:', error);
        }
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

  // --- 5. FUNÇÕES DO PAINEL DO ADMINISTRADOR ---
  const handleAddClient = async () => {
    if (!isAdmin) return;
    const id = newClientId.trim().toUpperCase();
    if (id && !authorizedClients.some(c => c.id === id)) {
      setAuthorizedClients(prev => [...prev, { id }]);
      setNewClientId('');
      try {
        const response = await fetch('https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, paused: false, createdAt: new Date().toISOString() })
        });
        const result = await response.json();
        console.log('✅ ID sincronizado:', result);
      } catch (error) {
        console.error('Erro ao sincronizar ID:', error);
      }
    } else if (id) {
      alert('Este ID já existe!');
    }
  };

  const handleRemoveClient = async (id: string) => {
    if (!isAdmin) return;
    if (window.confirm(`Excluir ${id}?`)) {
      setAuthorizedClients(prev => prev.filter(c => c.id !== id));
      try {
        const response = await fetch(`https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients/${id}`, {
          method: 'DELETE'
        });
        const result = await response.json();
        console.log('✅ ID removido:', result);
        
        // Sincronizar deleção com todos os dispositivos
        const updatedClients = authorizedClients.filter(c => c.id !== id);
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(updatedClients));
      } catch (error) {
        console.error('Erro ao remover ID:', error);
      }
    }
  };

  const handleSaveSupportWA = async () => {
    const cleanWA = tempWA.replace(/\D/g, '');
    setSupportWhatsApp(cleanWA);
    localStorage.setItem(STORAGE_KEYS.SUPPORT_WA, cleanWA);
    try {
      const response = await fetch('https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supportWhatsApp: cleanWA })
      });
      const result = await response.json();
      console.log('✅ Configuração sincronizada:', result);
    } catch (error) {
      console.error('Erro ao sincronizar config:', error);
    }
    alert('Configuração atualizada');
  };

  const handleRemoveSupportWA = () => {
    setSupportWhatsApp('');
    setTempWA('');
    localStorage.removeItem(STORAGE_KEYS.SUPPORT_WA);
    alert('Configuração atualizada');
  };

  const handleSyncBackup = () => {
    if (!isAdmin || !backupText.trim()) return;
    try {
      // Tenta interpretar como JSON (formato completo com vínculos)
      const data = JSON.parse(backupText);
      if (Array.isArray(data)) {
        setAuthorizedClients(data);
        alert('Banco de Dados Sincronizado!');
      }
    } catch (e) {
      // Se falhar o JSON, interpreta como lista de IDs (um por linha)
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

  // --- UI: TELA DE LOGIN ---
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
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-slate-500 font-radical text-[10px] font-black uppercase ml-1 tracking-widest">Credencial de Acesso</label>
                  <button 
                    type="button"
                    onClick={async () => {
                      try {
                        const response = await fetch('https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients');
                        if (response.ok) {
                          const data = await response.json();
                          if (data.success && data.data && data.data.length > 0) {
                            const serverClients = data.data;
                            const localClients = JSON.parse(localStorage.getItem(STORAGE_KEYS.CLIENTS) || '[]');
                            const merged = [...serverClients];
                            localClients.forEach((local: Client) => {
                              if (!merged.some(s => s.id === local.id)) {
                                merged.push(local);
                              }
                            });
                            setAuthorizedClients(merged);
                            localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(merged));
                            alert('✅ Dados sincronizados com sucesso!');
                          }
                        }
                      } catch (error) {
                        alert('❌ Erro ao sincronizar. Verifique sua conexão.');
                      }
                    }}
                    className="text-[10px] font-radical font-black text-orange-500 hover:text-orange-400 uppercase tracking-widest transition-colors"
                    title="Sincronizar dados com servidor"
                  >
                    🔄 SINCRONIZAR
                  </button>
                </div>
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

        {/* SUPORTE WHATSAPP LINK NA TELA DE LOGIN (Condicional) */}
        {supportWhatsApp && supportWhatsApp.trim() !== '' && (
          <div className="pb-4 text-center z-10">
            <a 
              href={`https://wa.me/55${supportWhatsApp}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[10px] font-radical font-black text-green-500 hover:text-green-400 uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.539 2.016 2.069-.54c.953.572 1.908.931 3.22.931 3.181 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.767-5.768-5.767m4.108 8.238c-.144.405-.831.747-1.155.795-.295.044-.67.078-1.077-.054-.242-.078-.553-.19-.949-.356-1.688-.707-2.774-2.42-2.859-2.533-.085-.114-.693-.923-.693-1.762 0-.839.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1.44-.1z"/></svg>
              Precisa de ajuda? Suporte Técnico
            </a>
          </div>
        )}
      </div>
    );
  }

  // --- UI: INTERFACE PRINCIPAL ---
  return (
    <div className="min-h-screen flex flex-col max-w-lg mx-auto bg-[#0a0a0c] shadow-2xl shadow-black overflow-hidden border-x border-slate-900">
      <Header 
        title={view === 'admin_panel' ? 'PAINEL DO ADMINISTRADOR' : (isAdmin ? 'DONO / MASTER' : (selectedMSConfig?.model || selectedBrand || 'MS Configuration'))} 
        showBack={view !== 'home'} 
        onBack={handleBack} 
      />

      <main className="flex-1 overflow-y-auto pb-24">
        {view === 'home' && (
          <div className="p-4 space-y-8 animate-in fade-in duration-500">
            {isAdmin && (
              <button onClick={() => setView('admin_panel')} className="w-full bg-[#16161a] p-4 border border-red-900/50 rounded-xl flex items-center justify-between shadow-lg relative overflow-hidden">
                <div className="relative z-10 flex items-center gap-4">
                   <div className="bg-red-600 p-2 rounded-lg rotate-12">
                     <svg width="20" height="20" fill="black" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                   </div>
                   <div className="text-left">
                     <p className="text-white font-radical font-black text-xs uppercase italic tracking-tighter">Gestão Master</p>
                     <p className="text-red-500 text-[9px] font-bold uppercase tracking-widest">Backup & Configurações</p>
                   </div>
                </div>
                <span className="text-red-600 font-black text-lg">›</span>
              </button>
            )}

            <section>
              <div className="flex items-center gap-3 mb-6 px-1">
                <div className="w-1.5 h-6 bg-[#ff6b00]"></div>
                <h2 className="text-sm font-radical font-black text-slate-100 uppercase tracking-[0.2em]">DNA DO MECÂNICO</h2>
              </div>
              <BrandGrid onSelectBrand={(brand) => { setSelectedBrand(brand); setView('models'); }} />
            </section>
            
            <section className="px-1 grid grid-cols-2 gap-3">
              <button onClick={() => setView('favorites')} className="bg-[#16161a] p-6 rounded-xl border border-slate-800 flex flex-col items-center gap-3 group shadow-lg">
                <div className="p-3 bg-red-600/10 rounded-full group-hover:bg-red-600/20"><span className="text-2xl">💼</span></div>
                <span className="font-radical text-[10px] font-black text-slate-400 uppercase tracking-widest">Minha Oficina</span>
              </button>
              <button onClick={() => setView('utilities')} className="bg-[#16161a] p-6 rounded-xl border border-slate-800 flex flex-col items-center gap-3 group shadow-lg">
                <div className="p-3 bg-orange-600/10 rounded-full group-hover:bg-orange-600/20"><span className="text-2xl">🔧</span></div>
                <span className="font-radical text-[10px] font-black text-slate-400 uppercase tracking-widest">Ferramentas</span>
              </button>
              <button onClick={() => setShowNotificationManager(true)} className="bg-[#16161a] p-6 rounded-xl border border-slate-800 flex flex-col items-center gap-3 group shadow-lg">
                <div className="p-3 bg-blue-600/10 rounded-full group-hover:bg-blue-600/20"><span className="text-2xl">🔔</span></div>
                <span className="font-radical text-[10px] font-black text-slate-400 uppercase tracking-widest">Notificacoes</span>
              </button>
              <button onClick={() => setView('services')} className="bg-[#16161a] p-6 rounded-xl border border-slate-800 flex flex-col items-center gap-3 group shadow-lg">
                <div className="p-3 bg-purple-600/10 rounded-full group-hover:bg-purple-600/20"><span className="text-2xl">📋</span></div>
                <span className="font-radical text-[10px] font-black text-slate-400 uppercase tracking-widest">Servicos</span>
              </button>
            </section>

            <div className="pt-10">
              <button onClick={handleLogout} className="w-full p-4 bg-slate-900/30 text-slate-700 font-radical text-[9px] uppercase tracking-[0.4em] rounded-lg border border-slate-900">ENCERRAR SESSÃO</button>
            </div>
          </div>
        )}

        {/* UI: PAINEL ADMINISTRATIVO (BLOQUEADO PARA CLIENTES) */}
        {view === 'admin_panel' && isAdmin && (
          <div className="p-6 space-y-8 animate-in slide-in-from-bottom duration-300 pb-20">
             {/* CONFIGURAÇÃO DE SUPORTE */}
             <div className="bg-[#16161a] p-6 rounded-xl border border-slate-800 border-b-4 border-b-green-600">
                <h2 className="font-radical text-white text-xs font-black mb-5 uppercase italic flex items-center gap-2">
                   <span className="text-green-500">⚙️</span>
                   Configurar WhatsApp do Suporte
                </h2>
                <div className="flex flex-col gap-4">
                  <input 
                    type="text" 
                    value={tempWA} 
                    onChange={(e) => setTempWA(e.target.value)} 
                    placeholder="DDD + NÚMERO (Ex: 11999999999)" 
                    className="w-full bg-[#0a0a0c] border border-slate-800 p-4 rounded-lg text-white font-mono outline-none focus:border-green-600" 
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={handleSaveSupportWA} className="bg-green-600 text-black font-radical font-black p-4 rounded-lg text-[10px] uppercase shadow-lg shadow-green-900/30">SALVAR NÚMERO</button>
                    <button onClick={handleRemoveSupportWA} className="bg-red-600 text-white font-radical font-black p-4 rounded-lg text-[10px] uppercase shadow-lg shadow-red-900/30">REMOVER SUPORTE</button>
                  </div>
                </div>
             </div>

             <div className="bg-[#16161a] p-6 rounded-xl border border-slate-800 border-b-4 border-b-red-600">
                <h2 className="font-radical text-white text-xs font-black mb-5 uppercase italic flex items-center gap-2">
                   <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                   Adicionar Acesso Único
                </h2>
                <div className="flex flex-col gap-4">
                  <input type="text" value={newClientId} onChange={(e) => setNewClientId(e.target.value)} placeholder="NOVO ID" className="w-full bg-[#0a0a0c] border border-slate-800 p-4 rounded-lg text-white font-mono outline-none focus:border-red-600" />
                  <button onClick={handleAddClient} className="w-full bg-red-600 text-white font-radical font-black p-4 rounded-lg text-xs uppercase shadow-lg shadow-red-900/30">ADICIONAR</button>
                </div>
             </div>

             <div className="bg-[#16161a] p-6 rounded-xl border border-slate-800">
                <h2 className="font-radical text-white text-[10px] font-black mb-4 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-xl">📥</span> Sincronização de Backup
                </h2>
                <textarea 
                  value={backupText}
                  onChange={(e) => setBackupText(e.target.value)}
                  placeholder="Cole sua lista de IDs (um por linha) ou JSON completo aqui..."
                  className="w-full h-32 bg-[#0a0a0c] border border-slate-800 p-3 rounded-lg text-white font-mono text-[10px] outline-none focus:border-blue-500 mb-4"
                />
                <button onClick={handleSyncBackup} className="w-full bg-blue-600/20 text-blue-400 border border-blue-600/50 p-4 rounded-lg font-radical font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">SINCRONIZAR</button>
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                   <h2 className="font-radical text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">BANCO DE DADOS ({authorizedClients.length})</h2>
                   <input type="text" placeholder="Filtrar..." value={adminSearch} onChange={(e) => setAdminSearch(e.target.value)} className="bg-transparent border-b border-slate-800 text-[10px] text-slate-500 p-1 outline-none focus:border-red-600 w-24 font-bold" />
                </div>
                <div className="grid gap-3">
                  {filteredAdminClients.map(client => (
                    <div key={client.id} className="bg-[#16161a] p-4 rounded-xl border border-slate-900 space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col flex-1">
                           <span className="text-white font-mono text-sm tracking-widest font-black">{client.id}</span>
                           <span className={`text-[7px] font-radical font-black uppercase mt-1 ${client.linkedDeviceId ? 'text-green-500 animate-pulse' : 'text-slate-700'}`}>
                             {client.linkedDeviceId ? `🔒 Vinculado: ${client.linkedDeviceId}` : '🔓 Disponível'}
                           </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="WhatsApp (ex: 11999999999)"
                          value={client.whatsapp || ''}
                          onChange={(e) => {
                            const updatedClients = authorizedClients.map(c => c.id === client.id ? { ...c, whatsapp: e.target.value } : c);
                            setAuthorizedClients(updatedClients);
                          }}
                          onBlur={() => {
                            try {
                              fetch(`https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients/${client.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ whatsapp: client.whatsapp })
                              });
                            } catch (error) {
                              console.error('Erro ao sincronizar WhatsApp:', error);
                            }
                          }}
                          className="flex-1 bg-[#0a0a0c] border border-slate-800 p-2 rounded text-white text-[10px] font-mono outline-none focus:border-green-600"
                        />
                        {client.whatsapp && (
                          <a href={`https://wa.me/55${client.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-green-600 text-white rounded flex items-center justify-center text-sm hover:bg-green-700" title="Abrir WhatsApp">💬</a>
                        )}
                      </div>
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => copyToClipboard(client.id)} id={`copy-${client.id}`} className="w-8 h-8 bg-slate-900 text-slate-500 rounded text-xs flex items-center justify-center" title="Copiar ID">📋</button>
                        <button 
                          onClick={async () => {
                            const newPausedState = !client.paused;
                            const updatedClients = authorizedClients.map(c => 
                              c.id === client.id ? { ...c, paused: newPausedState } : c
                            );
                            setAuthorizedClients(updatedClients);
                            
                            try {
                              await fetch(`https://3001-iddt2unpqpbbrpmidaszi-09d1f0fa.us1.manus.computer/api/sync/clients/${client.id}`, {
                                method: 'PUT',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ paused: newPausedState })
                              });
                            } catch (error) {
                              console.error('Erro ao sincronizar pausa:', error);
                            }
                          }}
                          className={`w-8 h-8 rounded text-sm flex items-center justify-center ${
                            client.paused 
                              ? 'bg-yellow-900/30 text-yellow-500 border border-yellow-600' 
                              : 'bg-green-900/30 text-green-500 border border-green-600'
                          }`}
                          title={client.paused ? 'Despausar ID' : 'Pausar ID'}
                        >
                          {client.paused ? '▶️' : '⏸️'}
                        </button>
                        <button onClick={() => handleRemoveClient(client.id)} className="w-8 h-8 bg-slate-900 text-red-900 rounded border border-slate-800 text-sm flex items-center justify-center" title="Deletar ID">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        )}

        {view === 'models' && <ModelList brand={selectedBrand} onSelectMSConfiguration={(c) => { setSelectedMSConfig(c); setView('manual'); }} />}
        
        {view === 'favorites' && (
          <div className="p-4 animate-in fade-in space-y-10">
             <section>
                <h2 className="text-sm font-radical font-black text-[#ff6b00] mb-6 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-10 h-0.5 bg-[#ff6b00]"></span>
                  GESTOR DE SERVIÇOS
                </h2>
                {currentUserId && <ServiceManager userId={currentUserId} />}
             </section>

             <section>
                <h2 className="text-sm font-radical font-black text-slate-500 mb-6 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-10 h-0.5 bg-slate-800"></span>
                  OFICINA ATIVA (MOTOS)
                </h2>
                {favoriteConfigs.length > 0 ? (
                  <div className="grid gap-4">
                    {favoriteConfigs.map(c => (
                      <button key={c.id} onClick={() => { setSelectedMSConfig(c); setView('manual'); }} className="bg-[#16161a] p-5 rounded-xl border-l-4 border-red-600 flex justify-between items-center group shadow-lg text-left">
                        <div>
                          <p className="font-radical font-black text-white italic uppercase text-sm group-hover:text-red-500 transition-colors">{c.brand} {c.model}</p>
                          <p className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter mt-1">{c.year} <span className="text-red-900">•</span> {c.displacement}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center opacity-20 font-radical text-[10px] uppercase font-black border-2 border-dashed border-slate-900 rounded-3xl">
                    Nenhuma moto favoritada
                  </div>
                )}
             </section>
          </div>
        )}

        {view === 'utilities' && <Utilities />}
        {view === 'services' && <ServiceManager />}
        {view === 'manual' && selectedMSConfig && <ManualViewer msConfiguration={selectedMSConfig} isFavorite={favorites.includes(selectedMSConfig.id)} onToggleFavorite={() => toggleFavorite(selectedMSConfig.id)} />}
      </main>

      {showNotificationManager && (
        <NotificationManager onClose={() => setShowNotificationManager(false)} />
      )}

      <footer className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#0a0a0c]/90 backdrop-blur-md border-t border-slate-900 p-4 text-center z-40">
        <p className="font-radical text-[8px] font-black text-slate-700 uppercase tracking-[0.5em] italic">
          MS-CONFIGURATION // DATABASE: BANCO_DADOS_MANUAL
        </p>
      </footer>
    </div>
  );
};

export default App;
