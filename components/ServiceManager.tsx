
import React, { useState, useEffect, useMemo } from 'react';
import { ServiceRecord, ServiceStatus, PaymentMethod } from '../types';

interface ServiceManagerProps {
  userId: string;
}

const ServiceManager: React.FC<ServiceManagerProps> = ({ userId }) => {
  const storageKey = `ms_oficina_servicos_${userId.toLowerCase()}`;

  // Estado dos serviços
  const [services, setServices] = useState<ServiceRecord[]>(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [];
  });

  // Estado dos campos do formulário
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<ServiceStatus>('Pendente');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Pix');

  // Estado do filtro mensal (Padrão: Mês Atual)
  const currentMonthStr = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }, []);
  
  const [selectedMonth, setSelectedMonth] = useState(currentMonthStr);

  // Sincronização localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(services));
  }, [services, storageKey]);

  // Lista de meses disponíveis para o seletor (baseado no histórico + mês atual)
  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    months.add(currentMonthStr);
    services.forEach(s => months.add(s.monthYear));
    return Array.from(months).sort((a, b) => b.localeCompare(a));
  }, [services, currentMonthStr]);

  // Filtragem e Cálculo
  const filteredServices = services.filter(s => s.monthYear === selectedMonth);
  const monthlyTotal = filteredServices.reduce((acc, curr) => acc + curr.value, 0);

  const addService = (e: React.FormEvent) => {
    e.preventDefault();
    const valNum = parseFloat(value.replace(',', '.'));
    
    if (client.trim() && description.trim() && !isNaN(valNum)) {
      const now = new Date();
      const newService: ServiceRecord = {
        id: Math.random().toString(36).substring(2, 9),
        client: client.trim(),
        description: description.trim(),
        value: valNum,
        date: now.getTime(),
        status,
        paymentMethod,
        monthYear: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
      };
      
      setServices([newService, ...services]);
      setClient('');
      setDescription('');
      setValue('');
      // Mantém o status e método de pagamento padrão para o próximo
    }
  };

  const removeService = (id: string) => {
    if (window.confirm("Deseja excluir este registro?")) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch(method) {
      case 'Pix': return '💎';
      case 'Dinheiro': return '💵';
      case 'Cartão': return '💳';
      default: return '💰';
    }
  };

  const formatMonth = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const monthsNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    return `${monthsNames[parseInt(month) - 1]} / ${year}`;
  };

  return (
    <div className="flex flex-col gap-6">
      {/* SELETOR MENSAL */}
      <div className="flex items-center justify-between px-1">
        <label className="text-[10px] font-radical font-black text-slate-500 uppercase tracking-widest">Período de Gestão</label>
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-[#16161a] border border-slate-800 text-[#ff6b00] font-radical font-black text-[10px] uppercase p-2 rounded-lg outline-none focus:border-[#ff6b00] cursor-pointer"
        >
          {availableMonths.map(m => (
            <option key={m} value={m}>{formatMonth(m)}</option>
          ))}
        </select>
      </div>

      {/* PAINEL DE FATURAMENTO MENSAL */}
      <div className="bg-gradient-to-br from-[#16161a] to-[#0a0a0c] p-6 rounded-2xl border border-slate-800 border-l-4 border-l-[#ff6b00] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </div>
        <p className="text-[10px] font-radical font-black text-slate-500 uppercase tracking-widest mb-1">Faturamento {formatMonth(selectedMonth)}</p>
        <h2 className="text-3xl font-radical font-black text-white italic">
          R$ {monthlyTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </h2>
        <p className="text-[8px] font-radical font-bold text-slate-600 mt-2 uppercase tracking-tighter">ID Técnico: {userId}</p>
      </div>

      {/* FORMULÁRIO DE ENTRADA PROFISSIONAL */}
      <form onSubmit={addService} className="bg-[#16161a] p-5 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-[9px] font-radical font-black text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">Novo Registro de Serviço</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <label className="text-[9px] font-radical font-black text-slate-500 uppercase ml-1">Moto / Cliente</label>
            <input 
              type="text" 
              value={client}
              onChange={(e) => setClient(e.target.value)}
              placeholder="Ex: Hornet 600 - Marcos"
              className="w-full bg-[#0a0a0c] border border-slate-800 p-3 rounded-lg text-white font-bold text-xs outline-none focus:border-[#ff6b00]"
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-[9px] font-radical font-black text-slate-500 uppercase ml-1">Descrição do Serviço</label>
            <input 
              type="text" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Revisão de 20k + Pastilhas"
              className="w-full bg-[#0a0a0c] border border-slate-800 p-3 rounded-lg text-white font-bold text-xs outline-none focus:border-[#ff6b00]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-radical font-black text-slate-500 uppercase ml-1">Valor (R$)</label>
              <input 
                type="text" 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0,00"
                className="w-full bg-[#0a0a0c] border border-slate-800 p-3 rounded-lg text-green-500 font-mono font-black text-sm outline-none focus:border-green-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-radical font-black text-slate-500 uppercase ml-1">Pagamento</label>
              <select 
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full bg-[#0a0a0c] border border-slate-800 p-3 rounded-lg text-white font-bold text-xs outline-none focus:border-[#ff6b00]"
              >
                <option value="Pix">Pix</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Cartão">Cartão</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-radical font-black text-slate-500 uppercase ml-1">Status do Serviço</label>
            <div className="flex gap-2">
              <button 
                type="button"
                onClick={() => setStatus('Pago')}
                className={`flex-1 p-2 rounded-lg font-radical font-black text-[9px] uppercase border transition-all ${status === 'Pago' ? 'bg-green-600 border-green-500 text-black' : 'bg-[#0a0a0c] border-slate-800 text-slate-600'}`}
              >
                ✓ Pago
              </button>
              <button 
                type="button"
                onClick={() => setStatus('Pendente')}
                className={`flex-1 p-2 rounded-lg font-radical font-black text-[9px] uppercase border transition-all ${status === 'Pendente' ? 'bg-yellow-600 border-yellow-500 text-black' : 'bg-[#0a0a0c] border-slate-800 text-slate-600'}`}
              >
                ⏳ Pendente
              </button>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="w-full bg-[#ff6b00] hover:bg-orange-500 text-black font-radical font-black p-4 rounded-lg text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-orange-900/20 active:scale-95 mt-4"
        >
          Lançar na Ficha Mensal
        </button>
      </form>

      {/* LISTA DE SERVIÇOS DO MÊS */}
      <div className="space-y-3 pb-10">
        <div className="flex items-center gap-2 px-1 mb-2">
           <div className="w-1 h-3 bg-[#ff6b00]"></div>
           <h3 className="text-[9px] font-radical font-black text-slate-500 uppercase tracking-widest">
             Histórico: {formatMonth(selectedMonth)}
           </h3>
        </div>
        
        {filteredServices.length > 0 ? (
          filteredServices.map((s) => (
            <div key={s.id} className={`bg-[#16161a] p-4 rounded-xl border border-slate-900 flex justify-between items-center group animate-in slide-in-from-right-2 duration-300 ${s.status === 'Pago' ? 'border-l-4 border-l-green-600' : 'border-l-4 border-l-yellow-600'}`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-radical font-black text-[11px] uppercase italic">{s.client}</span>
                  <span className={`text-[7px] px-1.5 py-0.5 rounded font-black uppercase ${s.status === 'Pago' ? 'bg-green-900/30 text-green-500' : 'bg-yellow-900/30 text-yellow-500'}`}>
                    {s.status}
                  </span>
                </div>
                <p className="text-slate-500 text-[9px] font-bold leading-tight">{s.description}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-green-500 font-mono text-[11px] font-black">
                    R$ {s.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-slate-600 text-[10px] flex items-center gap-1">
                    {getPaymentIcon(s.paymentMethod)} <span className="font-bold uppercase text-[8px]">{s.paymentMethod}</span>
                  </span>
                </div>
              </div>
              <button 
                onClick={() => removeService(s.id)}
                className="w-9 h-9 bg-[#0a0a0c] border border-slate-800 text-red-900 rounded-lg flex items-center justify-center hover:bg-red-950 hover:text-red-500 hover:border-red-900 transition-all ml-4"
                title="Excluir"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="py-16 text-center border-2 border-dashed border-slate-900 rounded-2xl opacity-20">
            <p className="text-[10px] font-radical font-black text-slate-500 uppercase tracking-widest">Nenhum lançamento em {formatMonth(selectedMonth)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceManager;
