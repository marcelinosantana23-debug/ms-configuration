
import React from 'react';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0c] border-b-2 border-[#ff6b00] text-white p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button 
            onClick={onBack}
            className="p-2 bg-[#16161a] border border-slate-800 rounded-md hover:border-[#ff6b00] transition-all"
            aria-label="Voltar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff6b00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
        )}
        <h1 className="text-xl font-radical font-black tracking-tighter uppercase italic neon-text">
          {title}
        </h1>
      </div>
      <div className="h-2 w-12 bg-[#ff6b00] rounded-full opacity-50 animate-pulse"></div>
    </header>
  );
};

export default Header;
