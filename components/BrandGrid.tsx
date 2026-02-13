
import React from 'react';
import { BRANDS } from '../data';

interface BrandGridProps {
  onSelectBrand: (brandName: string) => void;
}

const BrandLogo: React.FC<{ name: string }> = ({ name }) => {
  const brand = name.toLowerCase();
  
  if (brand === 'honda') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#ff6b00]">
        <path d="M2.5 13.5c4.5-2 10.5-5.5 14-8.5.5-.5.5-1 0-1.5-.5-.5-1.5-.5-2 0-3.5 3-9.5 6.5-14 8.5C.2 12 0 12.5.5 13.5s1.5 1.5 2 0z"/>
        <path d="M5.5 17.5c4-2 9.5-5.5 13-8.5.5-.5.5-1 0-1.5s-1.5-.5-2 0c-3.5 3-9 6.5-13 8.5-.3.5-.5 1 0 1.5s1.5 1.5 2 0z"/>
        <path d="M9 20.5c3.5-2 8.5-5 11.5-7.5.5-.5.5-1 0-1.5s-1.5-.5-2 0c-3 2.5-8 5.5-11.5 7.5-.3.5-.5 1 0 1.5s1.5 1.5 2 0z"/>
      </svg>
    );
  }

  if (brand === 'yamaha') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-[#ff6b00]">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
      </svg>
    );
  }

  if (brand === 'suzuki') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#ff6b00]">
        <path d="M19.5 4h-9l-5 6h9l-5 10h9l5-6h-9l5-10z" />
      </svg>
    );
  }

  if (brand === 'kawasaki') {
    return (
      <div className="font-radical text-4xl font-black italic tracking-tighter text-[#ff6b00]">K</div>
    );
  }

  if (brand === 'bmw') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 text-[#ff6b00]">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v20M2 12h20" fill="currentColor" fillOpacity="0.2" />
      </svg>
    );
  }

  if (brand === 'ktm') {
    return (
      <div className="font-radical text-2xl font-black bg-[#ff6b00] text-black px-2 transform -skew-x-12">KTM</div>
    );
  }

  if (brand === 'shineray') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-12 h-12 text-[#ff6b00]">
        <path d="M18 6L6 18M6 6l12 12" strokeLinecap="square" />
        <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <div className="font-radical text-3xl font-black text-[#ff6b00] opacity-80">{name.charAt(0)}</div>
  );
};

const BrandGrid: React.FC<BrandGridProps> = ({ onSelectBrand }) => {
  return (
    <div className="grid grid-cols-2 gap-3 p-2">
      {BRANDS.map((brand) => (
        <button
          key={brand.name}
          onClick={() => onSelectBrand(brand.name)}
          className="bg-[#16161a] p-6 rounded-lg border-b-4 border-slate-900 hover:border-[#ff6b00] flex flex-col items-center justify-center gap-3 group transition-all relative overflow-hidden active:scale-95 min-h-[140px]"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-[#ff6b00] transform -translate-x-full group-hover:translate-x-0 transition-transform"></div>
          <div className="flex items-center justify-center h-16 w-16 group-hover:scale-110 transition-transform duration-300">
            <BrandLogo name={brand.name} />
          </div>
          <span className="font-radical text-[11px] font-black text-slate-500 group-hover:text-white uppercase tracking-[0.2em] transition-colors">{brand.name}</span>
          
          <div className="absolute bottom-2 right-2 opacity-10 group-hover:opacity-100 transition-opacity">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      ))}
    </div>
  );
};

export default BrandGrid;
