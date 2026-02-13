
import React, { useState, useEffect } from 'react';

const Utilities: React.FC = () => {
  // Conversor de Torque
  const [nm, setNm] = useState<string>('');
  const [kgfm, setKgfm] = useState<string>('');

  // Calculadora de Mistura 2 Tempos
  const [liters, setLiters] = useState<string>('');
  const [ratio, setRatio] = useState<string>('50'); // 50:1 padrão
  const [oilResult, setOilResult] = useState<number | null>(null);

  // Cálculo de Cilindrada
  const [piston, setPiston] = useState<string>('');
  const [stroke, setStroke] = useState<string>('');
  const [ccResult, setCcResult] = useState<string | null>(null);

  // Cálculo de Taxa de Compressão
  const [chamber, setChamber] = useState<string>('');
  const [engineCC, setEngineCC] = useState<string>('');
  const [compressionResult, setCompressionResult] = useState<string | null>(null);

  // Redimensionamento de Giclagem
  const [origCC, setOrigCC] = useState<string>('');
  const [newCC, setNewCC] = useState<string>('');
  const [origMainJet, setOrigMainJet] = useState<string>('');
  const [origPilotJet, setOrigPilotJet] = useState<string>('');
  const [suggestedMainJet, setSuggestedMainJet] = useState<string | null>(null);
  const [suggestedPilotJet, setSuggestedPilotJet] = useState<string | null>(null);

  const handleNmChange = (val: string) => {
    setNm(val);
    if (val && !isNaN(Number(val))) {
      setKgfm((Number(val) * 0.10197).toFixed(3));
    } else { setKgfm(''); }
  };

  const handleKgfmChange = (val: string) => {
    setKgfm(val);
    if (val && !isNaN(Number(val))) {
      setNm((Number(val) / 0.10197).toFixed(3));
    } else { setNm(''); }
  };

  const calculate2Stroke = () => {
    const L = Number(liters);
    const R = Number(ratio);
    if (L > 0 && R > 0) {
      setOilResult((L * 1000) / R);
    } else {
      setOilResult(null);
    }
  };

  // Cálculo de Cilindrada em tempo real
  useEffect(() => {
    const d = Number(piston);
    const s = Number(stroke);
    if (d > 0 && s > 0) {
      const radius = d / 2;
      const area = Math.PI * Math.pow(radius, 2);
      const volume = (area * s) / 1000;
      setCcResult(volume.toFixed(2));
    } else {
      setCcResult(null);
    }
  }, [piston, stroke]);

  // Cálculo de Taxa de Compressão em tempo real
  useEffect(() => {
    const vC = Number(chamber);
    const vE = Number(engineCC);
    if (vC > 0 && vE > 0) {
      const result = (vE + vC) / vC;
      setCompressionResult(`${result.toFixed(1)} : 1`);
    } else {
      setCompressionResult(null);
    }
  }, [chamber, engineCC]);

  // Redimensionamento de Giclagem em tempo real
  useEffect(() => {
    const oCC = Number(origCC);
    const nCC = Number(newCC);
    const oMain = Number(origMainJet);
    const oPilot = Number(origPilotJet);

    if (oCC > 0 && nCC > 0) {
      const ratioSqrt = Math.sqrt(nCC / oCC);
      
      if (oMain > 0) {
        setSuggestedMainJet((oMain * ratioSqrt).toFixed(1));
      } else {
        setSuggestedMainJet(null);
      }

      if (oPilot > 0) {
        setSuggestedPilotJet((oPilot * ratioSqrt).toFixed(1));
      } else {
        setSuggestedPilotJet(null);
      }
    } else {
      setSuggestedMainJet(null);
      setSuggestedPilotJet(null);
    }
  }, [origCC, newCC, origMainJet, origPilotJet]);

  return (
    <div className="p-4 flex flex-col gap-8 bg-[#0a0a0c]">
      {/* TORQUE CONVERTER */}
      <div className="bg-[#16161a] p-6 rounded-2xl border border-slate-800 border-b-4 border-b-[#ff6b00] shadow-xl">
        <h2 className="font-radical text-xs font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-widest neon-text">
          <span className="text-[#ff6b00] text-xl">⚡</span>
          Conversor de Torque
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-2">
            <label className="text-[10px] font-radical font-bold text-slate-500 uppercase ml-1">Newton-metros (Nm)</label>
            <input
              type="number"
              value={nm}
              onChange={(e) => handleNmChange(e.target.value)}
              placeholder="0.0"
              className="w-full bg-[#0a0a0c] p-4 rounded-lg text-white font-mono border border-slate-800 focus:border-[#ff6b00] outline-none text-xl font-black"
            />
          </div>
          
          <div className="flex justify-center relative">
             <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-800 z-0"></div>
             <div className="h-10 w-10 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center z-10 text-[#ff6b00]">
               ⇌
             </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <label className="text-[10px] font-radical font-bold text-slate-500 uppercase ml-1">Quilogramas (kgf.m)</label>
            <input
              type="number"
              value={kgfm}
              onChange={(e) => handleKgfmChange(e.target.value)}
              placeholder="0.0"
              className="w-full bg-[#0a0a0c] p-4 rounded-lg text-white font-mono border border-slate-800 focus:border-[#ff6b00] outline-none text-xl font-black"
            />
          </div>
        </div>
      </div>

      {/* CÁLCULO DE CILINDRADA */}
      <div className="bg-[#16161a] p-6 rounded-2xl border border-slate-800 border-b-4 border-b-green-600 shadow-xl">
        <h2 className="font-radical text-xs font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-widest">
          <span className="text-green-500 text-xl">📐</span>
          Cálculo de Cilindrada
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Diâmetro do Pistão (mm)</label>
               <input 
                 type="number" 
                 value={piston} 
                 onChange={(e) => setPiston(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-green-600"
                 placeholder="0.00"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Curso do Virabrequim (mm)</label>
               <input 
                 type="number" 
                 value={stroke} 
                 onChange={(e) => setStroke(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-green-600"
                 placeholder="0.00"
               />
             </div>
          </div>

          {ccResult !== null && (
            <div className="bg-green-600/20 border border-green-600/50 p-6 rounded-xl text-center animate-in zoom-in-95 duration-200">
               <p className="text-[10px] font-radical font-black text-green-400 uppercase mb-1">Cilindrada Real</p>
               <p className="text-3xl font-radical font-black text-white italic">{ccResult} <span className="text-sm not-italic">CC</span></p>
            </div>
          )}
        </div>
      </div>

      {/* CÁLCULO DE TAXA DE COMPRESSÃO */}
      <div className="bg-[#16161a] p-6 rounded-2xl border border-slate-800 border-b-4 border-b-purple-600 shadow-xl">
        <h2 className="font-radical text-xs font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-widest">
          <span className="text-purple-500 text-xl">📉</span>
          Cálculo de Taxa de Compressão
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Volume da Câmara (ml ou cc)</label>
               <input 
                 type="number" 
                 value={chamber} 
                 onChange={(e) => setChamber(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-purple-600"
                 placeholder="0.0"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Cilindrada do Motor (cc)</label>
               <input 
                 type="number" 
                 value={engineCC} 
                 onChange={(e) => setEngineCC(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-purple-600"
                 placeholder="0.0"
               />
             </div>
          </div>

          {compressionResult !== null && (
            <div className="bg-purple-600/20 border border-purple-600/50 p-6 rounded-xl text-center animate-in zoom-in-95 duration-200">
               <p className="text-[10px] font-radical font-black text-purple-400 uppercase mb-1">Taxa de Compressão</p>
               <p className="text-3xl font-radical font-black text-white italic">{compressionResult}</p>
            </div>
          )}
        </div>
      </div>

      {/* REDIMENSIONAMENTO DE GICLAGEM (NOVA SEÇÃO) */}
      <div className="bg-[#16161a] p-6 rounded-2xl border border-slate-800 border-b-4 border-b-red-600 shadow-xl">
        <h2 className="font-radical text-xs font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-widest">
          <span className="text-red-500 text-xl">⛽</span>
          Redimensionamento de Giclagem (Alta e Baixa)
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Cilindrada Original (cc)</label>
               <input 
                 type="number" 
                 value={origCC} 
                 onChange={(e) => setOrigCC(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-red-600"
                 placeholder="0"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Nova Cilindrada (cc)</label>
               <input 
                 type="number" 
                 value={newCC} 
                 onChange={(e) => setNewCC(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-red-600"
                 placeholder="0"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Giclê de Alta Original</label>
               <input 
                 type="number" 
                 value={origMainJet} 
                 onChange={(e) => setOrigMainJet(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-red-600"
                 placeholder="Ex: 100"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase leading-tight">Giclê de Baixa Original</label>
               <input 
                 type="number" 
                 value={origPilotJet} 
                 onChange={(e) => setOrigPilotJet(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-red-600"
                 placeholder="Ex: 35"
               />
             </div>
          </div>

          {(suggestedMainJet || suggestedPilotJet) && (
            <div className="bg-red-600/20 border border-red-600/50 p-4 rounded-xl space-y-3 animate-in slide-in-from-top-2 duration-200">
               {suggestedMainJet && (
                 <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-radical font-black text-red-400 uppercase tracking-widest">Novo Giclê de Alta Sugerido</span>
                    <span className="text-xl font-radical font-black text-white italic">#{suggestedMainJet}</span>
                 </div>
               )}
               {suggestedPilotJet && (
                 <div className="flex justify-between items-center px-2 pt-2 border-t border-red-900/30">
                    <span className="text-[10px] font-radical font-black text-red-400 uppercase tracking-widest">Novo Giclê de Baixa Sugerido</span>
                    <span className="text-xl font-radical font-black text-white italic">#{suggestedPilotJet}</span>
                 </div>
               )}
            </div>
          )}
        </div>
      </div>

      {/* 2-STROKE MIXER */}
      <div className="bg-[#16161a] p-6 rounded-2xl border border-slate-800 border-b-4 border-b-blue-600 shadow-xl">
        <h2 className="font-radical text-xs font-black text-white mb-6 flex items-center gap-3 uppercase italic tracking-widest">
          <span className="text-blue-500 text-xl">🧪</span>
          Mistura 2 Tempos
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase">Gasolina (Litros)</label>
               <input 
                 type="number" 
                 value={liters} 
                 onChange={(e) => setLiters(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-blue-600"
                 placeholder="0"
               />
             </div>
             <div className="space-y-2">
               <label className="text-[9px] font-radical font-black text-slate-500 uppercase">Ratio (Ex: 50 p/ 50:1)</label>
               <input 
                 type="number" 
                 value={ratio} 
                 onChange={(e) => setRatio(e.target.value)}
                 className="w-full bg-[#0a0a0c] p-4 border border-slate-800 rounded-lg text-white font-black outline-none focus:border-blue-600"
               />
             </div>
          </div>
          
          <button 
            onClick={calculate2Stroke}
            className="w-full bg-blue-600/20 text-blue-400 border border-blue-600/50 p-4 rounded-lg font-radical font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
          >
            Calcular Aditivo
          </button>

          {oilResult !== null && (
            <div className="bg-blue-600 p-6 rounded-xl text-center">
               <p className="text-[10px] font-radical font-black text-blue-100 uppercase mb-1">Óleo Necessário</p>
               <p className="text-3xl font-radical font-black text-white italic">{oilResult.toFixed(0)} <span className="text-sm not-italic">ML</span></p>
            </div>
          )}
        </div>
      </div>

      {/* QUICK SPECS SECTION */}
      <div className="bg-[#16161a] p-6 rounded-2xl border border-slate-800">
        <h2 className="font-radical text-xs font-black text-slate-400 mb-6 uppercase tracking-widest border-b border-slate-800 pb-2">Referência de Óleo</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
             <p className="text-[#ff6b00] font-radical text-[10px] font-black italic">PADRÃO 100-150cc</p>
             <p className="text-white font-mono text-xs">800ml - 1000ml</p>
          </div>
          <div className="space-y-1">
             <p className="text-[#ff6b00] font-radical text-[10px] font-black italic">PADRÃO 250-300cc</p>
             <p className="text-white font-mono text-xs">1300ml - 1500ml</p>
          </div>
          <div className="space-y-1">
             <p className="text-[#ff6b00] font-radical text-[10px] font-black italic">GARFOS (MÉDIA)</p>
             <p className="text-white font-mono text-xs">150ml - 350ml/Lado</p>
          </div>
          <div className="space-y-1">
             <p className="text-[#ff6b00] font-radical text-[10px] font-black italic">FREIOS</p>
             <p className="text-white font-mono text-xs">Sangria: 100ml DOT4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utilities;
