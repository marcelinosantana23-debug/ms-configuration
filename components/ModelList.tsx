
import React, { useState } from 'react';
import { MS_CONFIGURATIONS } from '../data';
import { MSConfiguration } from '../types';

interface ModelListProps {
  brand: string;
  onSelectMSConfiguration: (config: MSConfiguration) => void;
}

const ModelList: React.FC<ModelListProps> = ({ brand, onSelectMSConfiguration }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredModels = MS_CONFIGURATIONS.filter(m => 
    m.brand === brand && 
    (m.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
     m.year.includes(searchTerm) ||
     m.displacement.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-4 flex flex-col gap-5 bg-[#0a0a0c]">
      <div className="relative">
        <input
          type="text"
          placeholder="Rastrear modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-[#16161a] p-4 pl-12 rounded-md border border-slate-800 text-white font-bold placeholder-slate-600 focus:border-[#ff6b00] focus:ring-1 focus:ring-[#ff6b00] outline-none transition-all"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-4 top-1/2 -translate-y-1/2 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="flex flex-col gap-3">
        {filteredModels.length > 0 ? (
          filteredModels.map((config) => (
            <button
              key={config.id}
              onClick={() => onSelectMSConfiguration(config)}
              className="bg-[#16161a] p-4 rounded-md border-l-4 border-slate-800 hover:border-[#ff6b00] flex justify-between items-center transition-all group active:bg-[#1f1f25]"
            >
              <div>
                <h3 className="font-radical font-black text-lg text-white group-hover:text-[#ff6b00] transition-colors italic uppercase">{config.model}</h3>
                <p className="text-slate-500 font-bold text-[11px] uppercase tracking-tighter">{config.year} <span className="text-[#ff6b00]">/</span> {config.displacement}</p>
              </div>
              <div className="bg-[#0a0a0c] p-2 rounded border border-slate-800 group-hover:border-[#ff6b00]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff6b00]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </button>
          ))
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-xl">
             <span className="text-4xl block mb-2 opacity-20">⚠️</span>
            <p className="font-radical text-slate-600 text-xs uppercase font-bold">Base de dados vazia para esta busca</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelList;
