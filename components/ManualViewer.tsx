
import React, { useState } from 'react';
import { MSConfiguration, ManualCategory } from '../types';
import { jsPDF } from 'https://esm.sh/jspdf@2.5.1';
import { DETAILED_MANUALS } from '../detailed-manuals';

interface ManualViewerProps {
  msConfiguration: MSConfiguration;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const ManualViewer: React.FC<ManualViewerProps> = ({ msConfiguration, isFavorite, onToggleFavorite }) => {
  const [activeSection, setActiveSection] = useState<ManualCategory | null>(msConfiguration.manual[0] || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredSections = msConfiguration.manual.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof s.content === 'string' && s.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const generatePDF = async () => {
    if (!activeSection) return;
    
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      const margin = 20;
      let cursorY = 20;
      doc.setFontSize(10);
      doc.text(`MS configuration: ${msConfiguration.brand}`, margin, cursorY);
      cursorY += 10;
      doc.setFontSize(22);
      doc.text(msConfiguration.model, margin, cursorY);
      cursorY += 15;
      doc.setFontSize(12);
      doc.text(activeSection.title, margin, cursorY);
      cursorY += 10;
      const content = typeof activeSection.content === 'string' ? activeSection.content : JSON.stringify(activeSection.content, null, 2);
      const splitText = doc.splitTextToSize(content, 170);
      doc.text(splitText, margin, cursorY);
      doc.save(`${msConfiguration.model}_${activeSection.id}.pdf`);
    } catch (e) {
      alert('Erro ao gerar PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0c]">
      <div className="p-4 bg-[#16161a] border-b border-slate-800 space-y-3">
        <div className="flex items-center gap-2">
           <input
              type="text"
              placeholder="Filtrar specs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-[#0a0a0c] border border-slate-700 p-2 rounded text-xs text-white focus:border-[#ff6b00] outline-none"
            />
            <button 
              onClick={onToggleFavorite}
              className={`p-2 rounded border transition-all ${isFavorite ? 'bg-red-950 border-red-500 text-red-500' : 'bg-[#0a0a0c] border-slate-700 text-slate-500'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
        </div>

        <div className="space-y-2">
          {msConfiguration.externalManualUrl && (
            <a 
            href={msConfiguration.externalManualUrl}
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-[#ff6b00] to-orange-700 rounded text-white font-radical text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-900/20 active:scale-95 transition-all"
          >
            <span>Manual de Serviço Original</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            </a>
          )}
          
          {DETAILED_MANUALS[msConfiguration.id as keyof typeof DETAILED_MANUALS] && (
            <button
              onClick={() => {
                const detailedManual = DETAILED_MANUALS[msConfiguration.id as keyof typeof DETAILED_MANUALS];
                if (detailedManual && detailedManual.sections && detailedManual.sections.length > 0) {
                  setActiveSection(detailedManual.sections[0] as any);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded text-white font-radical text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
            >
              <span>Manual Completo</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 bg-[#0f0f12] border-r border-slate-800 overflow-y-auto">
          {filteredSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section)}
              className={`w-full p-4 text-left border-b border-slate-900 transition-all font-radical text-[9px] font-bold uppercase ${
                activeSection?.id === section.id 
                  ? 'bg-slate-900 text-[#ff6b00] border-l-4 border-l-[#ff6b00]' 
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {section.title}
            </button>
          ))}
        </div>

        <div className="w-2/3 p-4 overflow-y-auto bg-[#0a0a0c]">
          {activeSection ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h2 className="font-radical font-black text-[#ff6b00] uppercase italic text-sm neon-text">{activeSection.title}</h2>
                <button onClick={generatePDF} className="text-[9px] bg-slate-800 px-2 py-1 rounded text-white font-bold hover:bg-slate-700">PDF</button>
              </div>
              
              <div className="bg-[#16161a] p-4 rounded border border-slate-800 relative">
                <div className="absolute top-0 right-0 p-1 opacity-10">
                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </div>
                <pre className="text-slate-300 text-[12px] font-mono leading-relaxed whitespace-pre-wrap font-bold">
                  {typeof activeSection.content === 'string' ? activeSection.content : JSON.stringify(activeSection.content, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-800">
               <span className="font-radical text-xs uppercase font-black opacity-20">No Section Selected</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManualViewer;
