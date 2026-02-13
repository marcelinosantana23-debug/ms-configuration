
import { Brand, MSConfiguration } from './types';
import { EXPANDED_SECTIONS } from './expanded-sections';

export const BRANDS: Brand[] = [
  { name: 'Honda', logo: '' },
  { name: 'Yamaha', logo: '' },
  { name: 'Shineray', logo: '' },
  { name: 'Suzuki', logo: '' },
  { name: 'Kawasaki', logo: '' },
  { name: 'BMW', logo: '' },
  { name: 'Dafra', logo: '' },
  { name: 'Traxx', logo: '' },
  { name: 'KTM', logo: '' },
  { name: 'Bajaj', logo: '' },
];

const ENHANCED_SECTIONS = (model: string, cc: string) => [
  { 
    id: 'motor', 
    title: 'Motor & Injeção', 
    content: `ESPECIFICAÇÕES: ${model} (${cc})\n\n- Óleo: SAE 10W30 ou 20W50 (conforme manual). Troca: 1.0L.\n- Filtro: Limpeza de peneira interna e filtro centrífugo em modelos CG/Biz.\n- Injeção: Reset via jumper no conector DLC (fio azul e verde/preto).\n- Carbonização: Limpeza de válvula de admissão comum em 50cc.` 
  },
  { 
    id: 'eletrico', 
    title: 'Sistema Elétrico', 
    content: `VALORES:\n- Carga Bateria: 14.0V ~ 14.5V a 5k RPM.\n- Fusível Principal: Geralmente 15A ou 20A.\n- Estator: Medir resistência entre fios de carga e massa.\n- Lâmpada Farol: 35/35W (modelos pequenos) ou 60/55W.` 
  },
  { 
    id: 'torques', 
    title: 'Tabela de Torques', 
    content: `PRINCIPAIS (N.m):\n- Cabeçote: 30-32 N.m\n- Bujão Óleo: 24 N.m\n- Eixo Traseiro: 90 N.m\n- Eixo Dianteiro: 60 N.m\n- Mesa: 22 N.m` 
  },
  { 
    id: 'valvulas', 
    title: 'Folga de Válvulas', 
    content: `AJUSTE (FRIO):\n- ADM: 0.05 a 0.10 mm\n- EX: 0.10 a 0.15 mm\n* Crucial para modelos 50cc não "morrerem" em marcha lenta.` 
  },
  { 
    id: 'transmissao', 
    title: 'Transmissão', 
    content: `- Corrente: Folga 25-35mm.\n- Embreagem: Ajuste de folga no manete 10-20mm.\n- CVT (Scooters): Largura da correia e peso dos roletes conforme manual.` 
  },
  { 
    id: 'suspensao', 
    title: 'Suspensão', 
    content: `- Garfo Dianteiro: Óleo ATF ou 10W.\n- Quantidade: Verificar volume específico para não causar batida de fim de curso.` 
  },
  { 
    id: 'freios', 
    title: 'Freios', 
    content: `- Fluido: DOT 3 ou DOT 4.\n- Sapata (Tambor): Verifique desgaste e molas de retorno.\n- Pastilhas: Troca com 1.5mm de sulco.` 
  },
  { 
    id: 'manutencao', 
    title: 'Manutenção', 
    content: `- Velas: Trocar a cada 12.000km.\n- Filtro de Ar: Trocar a cada 8.000km.\n- Corrente: Lubrificar a cada 500km.` 
  },
];

const OFFROAD_SECTIONS = (model: string, cc: string, is2Stroke: boolean = false) => [
  { 
    id: 'motor', 
    title: 'Motor Competition', 
    content: `ESPECIFICAÇÕES OFF-ROAD: ${model}\n\n- ${is2Stroke ? 'Mistura: Óleo 2T sintético (60:1 ou 50:1).' : 'Troca Óleo: SAE 10W-50 ou 10W-40 (Verificar a cada 10h de uso severo).'}\n- Filtro de Ar: Limpeza e lubrificação a cada trilha/corrida.\n- Pistão: Inspeção sugerida a cada 50h-80h (4T) ou 25h-40h (2T).` 
  },
  { 
    id: 'eletrico', 
    title: 'Sistema Elétrico', 
    content: `VALORES:\n- Vela: NGK BR8ECM (2T) / LMAR8AD-9 (4T).\n- Estator: Verificar resistência dos enrolamentos de ignição.\n- Kill Switch: Verificar aterramento para evitar falha de desligamento.` 
  },
  { 
    id: 'torques', 
    title: 'Tabela de Torques', 
    content: `ESTRUTURAIS (N.m):\n- Eixo Rodas: 80 N.m (Trás) / 60 N.m (Frente)\n- Parafusos Mesa: 17 N.m (Superior) / 20 N.m (Inferior)\n- Raios: 3.7 N.m\n- Coroa: 32 N.m` 
  },
  { 
    id: 'valvulas', 
    title: 'Folga / Palhetas', 
    content: `${is2Stroke ? 'PALHETAS: Inspecionar trincas nas pétalas de fibra de carbono/vidro.' : 'VÁLVULAS (FRIO): ADM: 0.12mm / EX: 0.22mm (Típico Unicam)'}` 
  },
  { 
    id: 'suspensao', 
    title: 'Suspensão Showa/KYB', 
    content: `- Sangria de Ar: Realizar a cada treino com a moto no cavalete.\n- Clickers: Comp (10-12) / Reb (10-14) cliques.\n- Óleo: SAE 5W Pro.` 
  },
  { 
    id: 'manutencao', 
    title: 'Race Maintenance', 
    content: `- Lubrificar Linkage (Pro-Link) a cada 20h.\n- Raios: Ajustar após as primeiras 2h de uso novo.\n- Corrente: Limpeza pesada e lubrificação com spray seco.` 
  },
];

const HONDA_PDF = (file: string) => `https://www.honda.com.br/pos-venda/motos/sites/default/files/manuais/${file}`;
const SEARCH_PDF = (brand: string, model: string) => `https://www.google.com/search?q=manual+servico+${brand}+${encodeURIComponent(model)}+pdf+download+direto`;

export const MS_CONFIGURATIONS: MSConfiguration[] = [
  // --- HONDA ---
  { id: 'h-crf-230f', brand: 'Honda', model: 'CRF 230F (Trilha)', year: '2007-2020', displacement: '230cc', manual: OFFROAD_SECTIONS('CRF 230F', '230cc', false), externalManualUrl: SEARCH_PDF('Honda', 'CRF 230F') },
  { id: 'h-crf-250f', brand: 'Honda', model: 'CRF 250F (Trilha)', year: '2019-2024', displacement: '250cc', manual: OFFROAD_SECTIONS('CRF 250F', '250cc', false), externalManualUrl: SEARCH_PDF('Honda', 'CRF 250F') },
  { id: 'h-crf-250r', brand: 'Honda', model: 'CRF 250R (Motocross)', year: '2010-2024', displacement: '250cc', manual: OFFROAD_SECTIONS('CRF 250R', '250cc', false), externalManualUrl: SEARCH_PDF('Honda', 'CRF 250R') },
  { id: 'h-crf-450r', brand: 'Honda', model: 'CRF 450R (Motocross)', year: '2010-2024', displacement: '450cc', manual: OFFROAD_SECTIONS('CRF 450R', '450cc', false), externalManualUrl: SEARCH_PDF('Honda', 'CRF 450R') },
  { id: 'h-crf-450x', brand: 'Honda', model: 'CRF 450X (Enduro)', year: '2005-2024', displacement: '450cc', manual: OFFROAD_SECTIONS('CRF 450X', '450cc', false), externalManualUrl: SEARCH_PDF('Honda', 'CRF 450X') },
  { id: 'h-cr-250r', brand: 'Honda', model: 'CR 250R (2-Stroke)', year: '1992-2007', displacement: '250cc', manual: OFFROAD_SECTIONS('CR 250R', '250cc', true), externalManualUrl: SEARCH_PDF('Honda', 'CR 250R') },
  { id: 'h-cr-125r', brand: 'Honda', model: 'CR 125R (2-Stroke)', year: '1992-2007', displacement: '125cc', manual: OFFROAD_SECTIONS('CR 125R', '125cc', true), externalManualUrl: SEARCH_PDF('Honda', 'CR 125R') },
  { id: 'h-pop-100', brand: 'Honda', model: 'Pop 100', year: '2007-2015', displacement: '100cc', manual: ENHANCED_SECTIONS('Pop 100', '100cc'), externalManualUrl: HONDA_PDF('MANUAL_POP100.pdf') },
  { id: 'h-pop-110i', brand: 'Honda', model: 'Pop 110i', year: '2016-2024', displacement: '110cc', manual: EXPANDED_SECTIONS('Pop 110i', '110cc', 'Honda'), externalManualUrl: HONDA_PDF('MANUAL_POP110I_2023.pdf') },
  { id: 'h-biz-100-old', brand: 'Honda', model: 'C100 Biz', year: '1998-2005', displacement: '100cc', manual: ENHANCED_SECTIONS('C100 Biz', '100cc'), externalManualUrl: HONDA_PDF('MANUAL_BIZ100_2005.pdf') },
  { id: 'h-biz-110i', brand: 'Honda', model: 'Biz 110i', year: '2016-2024', displacement: '110cc', manual: ENHANCED_SECTIONS('Biz 110i', '110cc'), externalManualUrl: HONDA_PDF('MANUAL_BIZ110I_2023.pdf') },
  { id: 'h-biz-125', brand: 'Honda', model: 'Biz 125', year: '2005-2024', displacement: '125cc', manual: EXPANDED_SECTIONS('Biz 125', '125cc', 'Honda'), externalManualUrl: HONDA_PDF('MANUAL_BIZ125_2024.pdf') },
  { id: 'h-cg-125-titan', brand: 'Honda', model: 'CG 125 Titan', year: '1995-2004', displacement: '125cc', manual: ENHANCED_SECTIONS('CG 125 Titan', '125cc'), externalManualUrl: HONDA_PDF('MANUAL_CG125_TITAN_1999.pdf') },
  { id: 'h-cg-150-titan', brand: 'Honda', model: 'CG 150 Titan', year: '2004-2015', displacement: '150cc', manual: ENHANCED_SECTIONS('CG 150 Titan', '150cc'), externalManualUrl: HONDA_PDF('MANUAL_CG150_TITAN_2015.pdf') },
  { id: 'h-cg-160', brand: 'Honda', model: 'CG 160 Titan/Fan/Start', year: '2016-2024', displacement: '160cc', manual: EXPANDED_SECTIONS('CG 160', '160cc', 'Honda'), externalManualUrl: HONDA_PDF('MANUAL_CG160_TITAN_2024.pdf') },
  { id: 'h-bros-125', brand: 'Honda', model: 'NXR 125 Bros', year: '2003-2015', displacement: '125cc', manual: ENHANCED_SECTIONS('NXR 125 Bros', '125cc'), externalManualUrl: HONDA_PDF('MANUAL_NXR125_BROS.pdf') },
  { id: 'h-bros-150', brand: 'Honda', model: 'NXR 150 Bros', year: '2003-2014', displacement: '150cc', manual: ENHANCED_SECTIONS('NXR 150 Bros', '150cc'), externalManualUrl: HONDA_PDF('MANUAL_NXR150_BROS_2014.pdf') },
  { id: 'h-bros-160', brand: 'Honda', model: 'NXR 160 Bros', year: '2015-2024', displacement: '160cc', manual: ENHANCED_SECTIONS('NXR 160 Bros', '160cc'), externalManualUrl: HONDA_PDF('MANUAL_NXR160_BROS_2024.pdf') },
  { id: 'h-twister-250', brand: 'Honda', model: 'CBX 250 Twister', year: '2001-2008', displacement: '250cc', manual: ENHANCED_SECTIONS('CBX 250', '250cc'), externalManualUrl: HONDA_PDF('MANUAL_CBX250_TWISTER.pdf') },
  { id: 'h-cb250f', brand: 'Honda', model: 'CB 250F Twister', year: '2016-2022', displacement: '250cc', manual: ENHANCED_SECTIONS('CB 250F', '250cc'), externalManualUrl: HONDA_PDF('MANUAL_CB250F_TWISTER_2022.pdf') },
  { id: 'h-cb300r', brand: 'Honda', model: 'CB 300R', year: '2009-2015', displacement: '300cc', manual: ENHANCED_SECTIONS('CB 300R', '300cc'), externalManualUrl: HONDA_PDF('MANUAL_CB300R_2015.pdf') },
  { id: 'h-cb300f', brand: 'Honda', model: 'CB 300F Twister', year: '2023-2024', displacement: '300cc', manual: ENHANCED_SECTIONS('CB 300F', '300cc'), externalManualUrl: HONDA_PDF('MANUAL_CB300F_2023.pdf') },
  { id: 'h-xre-190', brand: 'Honda', model: 'XRE 190', year: '2016-2024', displacement: '190cc', manual: ENHANCED_SECTIONS('XRE 190', '190cc'), externalManualUrl: HONDA_PDF('MANUAL_XRE190_2024.pdf') },
  { id: 'h-xre-300', brand: 'Honda', model: 'XRE 300', year: '2009-2023', displacement: '300cc', manual: ENHANCED_SECTIONS('XRE 300', '300cc'), externalManualUrl: HONDA_PDF('MANUAL_XRE300_2023.pdf') },
  { id: 'h-sahara-300', brand: 'Honda', model: 'CB 300 Sahara', year: '2024', displacement: '300cc', manual: ENHANCED_SECTIONS('Sahara 300', '300cc'), externalManualUrl: HONDA_PDF('MANUAL_XRE300_SAHARA_2024.pdf') },
  { id: 'h-falcon', brand: 'Honda', model: 'NX 400 Falcon', year: '1999-2008', displacement: '400cc', manual: ENHANCED_SECTIONS('Falcon 400', '400cc'), externalManualUrl: HONDA_PDF('MANUAL_NX400_FALCON.pdf') },
  { id: 'h-hornet', brand: 'Honda', model: 'CB 600F Hornet', year: '2005-2014', displacement: '600cc', manual: ENHANCED_SECTIONS('Hornet 600', '600cc'), externalManualUrl: HONDA_PDF('MANUAL_CB600F_HORNET_2014.pdf') },
  { id: 'h-cb500-old', brand: 'Honda', model: 'CB 500', year: '1997-2005', displacement: '500cc', manual: ENHANCED_SECTIONS('CB 500', '500cc'), externalManualUrl: HONDA_PDF('MANUAL_CB500.pdf') },
  { id: 'h-cb500x', brand: 'Honda', model: 'CB 500X', year: '2014-2024', displacement: '500cc', manual: ENHANCED_SECTIONS('CB 500X', '500cc'), externalManualUrl: HONDA_PDF('MANUAL_CB500X_2024.pdf') },

  // --- SHINERAY ---
  { id: 'sh-jet-50', brand: 'Shineray', model: 'Jet 50', year: '2012-2024', displacement: '50cc', manual: ENHANCED_SECTIONS('Jet 50', '50cc'), externalManualUrl: SEARCH_PDF('Shineray', 'Jet 50') },
  { id: 'sh-phoenix-50', brand: 'Shineray', model: 'Phoenix 50 / Gold', year: '2011-2024', displacement: '50cc', manual: ENHANCED_SECTIONS('Phoenix 50', '50cc'), externalManualUrl: SEARCH_PDF('Shineray', 'Phoenix 50') },
  { id: 'sh-xy50q', brand: 'Shineray', model: 'XY 50 Q', year: '2008-2020', displacement: '50cc', manual: ENHANCED_SECTIONS('XY 50 Q', '50cc'), externalManualUrl: SEARCH_PDF('Shineray', 'XY 50 Q') },
  { id: 'sh-super-smart', brand: 'Shineray', model: 'New Super Smart 50', year: '2015-2024', displacement: '50cc', manual: ENHANCED_SECTIONS('New Super Smart 50', '50cc'), externalManualUrl: SEARCH_PDF('Shineray', 'New Super Smart 50') },
  { id: 'sh-rio-50', brand: 'Shineray', model: 'Rio 50', year: '2023-2024', displacement: '50cc', manual: ENHANCED_SECTIONS('Rio 50', '50cc'), externalManualUrl: SEARCH_PDF('Shineray', 'Rio 50') },
  { id: 'sh-bravo-50', brand: 'Shineray', model: 'Bravo 50', year: '2020-2024', displacement: '50cc', manual: ENHANCED_SECTIONS('Bravo 50', '50cc'), externalManualUrl: SEARCH_PDF('Shineray', 'Bravo 50') },
  { id: 'sh-jet-125', brand: 'Shineray', model: 'Jet 125', year: '2014-2024', displacement: '125cc', manual: ENHANCED_SECTIONS('Jet 125', '125cc'), externalManualUrl: SEARCH_PDF('Shineray', 'Jet 125') },
  { id: 'sh-worker-125', brand: 'Shineray', model: 'Worker 125', year: '2021-2024', displacement: '125cc', manual: ENHANCED_SECTIONS('Worker 125', '125cc'), externalManualUrl: SEARCH_PDF('Shineray', 'Worker 125') },
  { id: 'sh-shi-175', brand: 'Shineray', model: 'SHI 175', year: '2022-2024', displacement: '175cc', manual: ENHANCED_SECTIONS('SHI 175', '175cc'), externalManualUrl: SEARCH_PDF('Shineray', 'SHI 175') },

  // --- YAMAHA ---
  { id: 'y-ttr230', brand: 'Yamaha', model: 'TT-R 230 (Trilha)', year: '2006-2024', displacement: '230cc', manual: OFFROAD_SECTIONS('TT-R 230', '230cc', false), externalManualUrl: SEARCH_PDF('Yamaha', 'TTR 230') },
  { id: 'y-wr250f', brand: 'Yamaha', model: 'WR 250F (Enduro)', year: '2010-2024', displacement: '250cc', manual: OFFROAD_SECTIONS('WR 250F', '250cc', false), externalManualUrl: SEARCH_PDF('Yamaha', 'WR 250F') },
  { id: 'y-wr450f', brand: 'Yamaha', model: 'WR 450F (Enduro)', year: '2012-2024', displacement: '450cc', manual: OFFROAD_SECTIONS('WR 450F', '450cc', false), externalManualUrl: SEARCH_PDF('Yamaha', 'WR 450F') },
  { id: 'y-yz250f', brand: 'Yamaha', model: 'YZ 250F (Motocross)', year: '2012-2024', displacement: '250cc', manual: OFFROAD_SECTIONS('YZ 250F', '250cc', false), externalManualUrl: SEARCH_PDF('Yamaha', 'YZ 250F') },
  { id: 'y-yz450f', brand: 'Yamaha', model: 'YZ 450F (Motocross)', year: '2012-2024', displacement: '450cc', manual: OFFROAD_SECTIONS('YZ 450F', '450cc', false), externalManualUrl: SEARCH_PDF('Yamaha', 'YZ 450F') },
  { id: 'y-xtz125', brand: 'Yamaha', model: 'XTZ 125', year: '2003-2016', displacement: '125cc', manual: ENHANCED_SECTIONS('XTZ 125', '125cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'XTZ 125') },
  { id: 'y-crypton-115', brand: 'Yamaha', model: 'Crypton T115', year: '2010-2016', displacement: '115cc', manual: ENHANCED_SECTIONS('Crypton 115', '115cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'Crypton 115') },
  { id: 'y-neo-125', brand: 'Yamaha', model: 'Neo 125', year: '2017-2024', displacement: '125cc', manual: ENHANCED_SECTIONS('Neo 125', '125cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'Neo 125') },
  { id: 'y-ybr-125', brand: 'Yamaha', model: 'YBR 125 / Factor', year: '2000-2016', displacement: '125cc', manual: ENHANCED_SECTIONS('YBR 125', '125cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'YBR 125 Factor') },
  { id: 'y-factor-150', brand: 'Yamaha', model: 'Factor 150', year: '2016-2024', displacement: '150cc', manual: ENHANCED_SECTIONS('Factor 150', '150cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'Factor 150') },
  { id: 'y-fazer-150', brand: 'Yamaha', model: 'Fazer 150', year: '2014-2024', displacement: '150cc', manual: ENHANCED_SECTIONS('Fazer 150', '150cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'Fazer 150') },
  { id: 'y-fazer-250', brand: 'Yamaha', model: 'Fazer 250 / FZ25', year: '2005-2024', displacement: '250cc', manual: ENHANCED_SECTIONS('Fazer 250', '250cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'Fazer 250') },
  { id: 'y-lander-250', brand: 'Yamaha', model: 'XTZ 250 Lander', year: '2007-2024', displacement: '250cc', manual: ENHANCED_SECTIONS('Lander 250', '250cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'Lander 250') },
  { id: 'y-tenere-250', brand: 'Yamaha', model: 'XTZ 250 Ténéré', year: '2011-2019', displacement: '250cc', manual: ENHANCED_SECTIONS('Ténéré 250', '250cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'Tenere 250') },
  { id: 'y-r3', brand: 'Yamaha', model: 'YZF-R3', year: '2016-2024', displacement: '321cc', manual: ENHANCED_SECTIONS('R3', '321cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'YZF R3') },
  { id: 'y-mt03', brand: 'Yamaha', model: 'MT-03', year: '2016-2024', displacement: '321cc', manual: ENHANCED_SECTIONS('MT-03', '321cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'MT 03') },
  { id: 'y-xt660r', brand: 'Yamaha', model: 'XT 660R', year: '2005-2018', displacement: '660cc', manual: ENHANCED_SECTIONS('XT 660R', '660cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'XT 660R') },
  { id: 'y-xj6', brand: 'Yamaha', model: 'XJ6 N/F', year: '2010-2019', displacement: '600cc', manual: ENHANCED_SECTIONS('XJ6', '600cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'XJ6') },
  { id: 'y-mt07', brand: 'Yamaha', model: 'MT-07', year: '2015-2024', displacement: '689cc', manual: ENHANCED_SECTIONS('MT-07', '689cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'MT 07') },
  { id: 'y-mt09', brand: 'Yamaha', model: 'MT-09', year: '2014-2024', displacement: '847cc', manual: ENHANCED_SECTIONS('MT-09', '847cc'), externalManualUrl: SEARCH_PDF('Yamaha', 'MT 09') },

  // --- KAWASAKI ---
  { id: 'k-kx65', brand: 'Kawasaki', model: 'KX 65 (Motocross)', year: '2010-2024', displacement: '65cc', manual: OFFROAD_SECTIONS('KX 65', '65cc', true), externalManualUrl: SEARCH_PDF('Kawasaki', 'KX 65') },
  { id: 'k-kx85', brand: 'Kawasaki', model: 'KX 85 (Motocross)', year: '2010-2024', displacement: '85cc', manual: OFFROAD_SECTIONS('KX 85', '85cc', true), externalManualUrl: SEARCH_PDF('Kawasaki', 'KX 85') },
  { id: 'k-kx250', brand: 'Kawasaki', model: 'KX 250 / KXF (Motocross)', year: '2012-2024', displacement: '250cc', manual: OFFROAD_SECTIONS('KX 250', '250cc', false), externalManualUrl: SEARCH_PDF('Kawasaki', 'KX 250') },
  { id: 'k-kx450', brand: 'Kawasaki', model: 'KX 450 / KXF (Motocross)', year: '2012-2024', displacement: '450cc', manual: OFFROAD_SECTIONS('KX 450', '450cc', false), externalManualUrl: SEARCH_PDF('Kawasaki', 'KX 450') },
  { id: 'k-klx230', brand: 'Kawasaki', model: 'KLX 230 / R (Trilha)', year: '2020-2024', displacement: '230cc', manual: OFFROAD_SECTIONS('KLX 230', '230cc', false), externalManualUrl: SEARCH_PDF('Kawasaki', 'KLX 230') },
  { id: 'k-klx300', brand: 'Kawasaki', model: 'KLX 300 / R (Trilha)', year: '2021-2024', displacement: '300cc', manual: OFFROAD_SECTIONS('KLX 300', '300cc', false), externalManualUrl: SEARCH_PDF('Kawasaki', 'KLX 300') },
  { id: 'k-klr650', brand: 'Kawasaki', model: 'KLR 650 (Dual Sport)', year: '2008-2024', displacement: '650cc', manual: ENHANCED_SECTIONS('KLR 650', '650cc'), externalManualUrl: SEARCH_PDF('Kawasaki', 'KLR 650') },
  { id: 'k-ninja-300', brand: 'Kawasaki', model: 'Ninja 300', year: '2013-2018', displacement: '300cc', manual: ENHANCED_SECTIONS('Ninja 300', '300cc'), externalManualUrl: SEARCH_PDF('Kawasaki', 'Ninja 300') },
  { id: 'k-ninja-400', brand: 'Kawasaki', model: 'Ninja 400', year: '2019-2024', displacement: '400cc', manual: ENHANCED_SECTIONS('Ninja 400', '400cc'), externalManualUrl: SEARCH_PDF('Kawasaki', 'Ninja 400') },
  { id: 'k-z400', brand: 'Kawasaki', model: 'Z400', year: '2019-2024', displacement: '400cc', manual: ENHANCED_SECTIONS('Z400', '400cc'), externalManualUrl: SEARCH_PDF('Kawasaki', 'Z400') },
  { id: 'k-z900', brand: 'Kawasaki', model: 'Z900', year: '2017-2024', displacement: '948cc', manual: ENHANCED_SECTIONS('Z900', '948cc'), externalManualUrl: SEARCH_PDF('Kawasaki', 'Z900') },

  // --- TRAXX ---
  { id: 'tr-star-50', brand: 'Traxx', model: 'Star 50', year: '2008-2016', displacement: '50cc', manual: ENHANCED_SECTIONS('Star 50', '50cc'), externalManualUrl: SEARCH_PDF('Traxx', 'Star 50') },
  { id: 'tr-sky-50', brand: 'Traxx', model: 'Sky 50', year: '2010-2016', displacement: '50cc', manual: ENHANCED_SECTIONS('Sky 50', '50cc'), externalManualUrl: SEARCH_PDF('Traxx', 'Sky 50') },
  { id: 'tr-moby-50', brand: 'Traxx', model: 'Moby 50', year: '2012-2016', displacement: '50cc', manual: ENHANCED_SECTIONS('Moby 50', '50cc'), externalManualUrl: SEARCH_PDF('Traxx', 'Moby 50') },
  { id: 'tr-joto-125', brand: 'Traxx', model: 'Joto 125', year: '2008-2013', displacement: '125cc', manual: ENHANCED_SECTIONS('Joto 125', '125cc'), externalManualUrl: SEARCH_PDF('Traxx', 'Joto 125') },

  // --- SUZUKI ---
  { id: 's-yes-125', brand: 'Suzuki', model: 'Yes EN125', year: '2005-2016', displacement: '125cc', manual: ENHANCED_SECTIONS('Yes 125', '125cc'), externalManualUrl: SEARCH_PDF('Suzuki', 'Yes 125') },
  { id: 's-intruder-125', brand: 'Suzuki', model: 'Intruder 125', year: '2002-2016', displacement: '125cc', manual: ENHANCED_SECTIONS('Intruder 125', '125cc'), externalManualUrl: SEARCH_PDF('Suzuki', 'Intruder 125') },
  { id: 's-burgman-125', brand: 'Suzuki', model: 'Burgman 125 i', year: '2005-2018', displacement: '125cc', manual: ENHANCED_SECTIONS('Burgman 125', '125cc'), externalManualUrl: SEARCH_PDF('Suzuki', 'Burgman 125 i') },
  { id: 's-vstrom-650', brand: 'Suzuki', model: 'V-Strom 650', year: '2009-2024', displacement: '650cc', manual: ENHANCED_SECTIONS('V-Strom 650', '650cc'), externalManualUrl: SEARCH_PDF('Suzuki', 'V-Strom 650') },
  { id: 's-gsxr-750', brand: 'Suzuki', model: 'GSX-R 750 (Srad)', year: '2006-2024', displacement: '750cc', manual: ENHANCED_SECTIONS('GSX-R 750', '750cc'), externalManualUrl: SEARCH_PDF('Suzuki', 'GSX R 750') },

  // --- DAFRA ---
  { id: 'd-apache-200', brand: 'Dafra', model: 'Apache RTR 200', year: '2019-2024', displacement: '200cc', manual: ENHANCED_SECTIONS('Apache 200', '200cc'), externalManualUrl: SEARCH_PDF('Dafra', 'Apache 200') },
  { id: 'd-citycom-300', brand: 'Dafra', model: 'Citycom 300 i', year: '2011-2024', displacement: '300cc', manual: ENHANCED_SECTIONS('Citycom 300', '300cc'), externalManualUrl: SEARCH_PDF('Dafra', 'Citycom 300') },
  { id: 'd-next-250', brand: 'Dafra', model: 'Next 250', year: '2012-2017', displacement: '250cc', manual: ENHANCED_SECTIONS('Next 250', '250cc'), externalManualUrl: SEARCH_PDF('Dafra', 'Next 250') },
  { id: 'd-horizon-250', brand: 'Dafra', model: 'Horizon 250', year: '2013-2017', displacement: '250cc', manual: ENHANCED_SECTIONS('Horizon 250', '250cc'), externalManualUrl: SEARCH_PDF('Dafra', 'Horizon 250') },

  // --- BMW ---
  { id: 'b-g310gs', brand: 'BMW', model: 'G 310 GS', year: '2018-2024', displacement: '313cc', manual: ENHANCED_SECTIONS('G 310 GS', '313cc'), externalManualUrl: 'https://www.bmw-motorrad.com.br/pt/service/manuals/manuals-main.html' },
  { id: 'b-f800gs', brand: 'BMW', model: 'F 800 GS', year: '2008-2017', displacement: '800cc', manual: ENHANCED_SECTIONS('F 800 GS', '800cc'), externalManualUrl: SEARCH_PDF('BMW', 'F 800 GS') },
  { id: 'b-f850gs', brand: 'BMW', model: 'F 850 GS', year: '2019-2024', displacement: '853cc', manual: ENHANCED_SECTIONS('F 850 GS', '853cc'), externalManualUrl: SEARCH_PDF('BMW', 'F 850 GS') },
  { id: 'b-r1200gs', brand: 'BMW', model: 'R 1200 GS', year: '2004-2018', displacement: '1200cc', manual: ENHANCED_SECTIONS('R 1200 GS', '1200cc'), externalManualUrl: SEARCH_PDF('BMW', 'R 1200 GS') },
  { id: 'b-r1250gs', brand: 'BMW', model: 'R 1250 GS', year: '2019-2024', displacement: '1254cc', manual: ENHANCED_SECTIONS('R 1250 GS', '1254cc'), externalManualUrl: SEARCH_PDF('BMW', 'R 1250 GS') },

  // --- BAJAJ ---
  { id: 'ba-dominar-160', brand: 'Bajaj', model: 'Dominar 160', year: '2023-2024', displacement: '160cc', manual: ENHANCED_SECTIONS('Dominar 160', '160cc'), externalManualUrl: SEARCH_PDF('Bajaj', 'Dominar 160') },
  { id: 'ba-dominar-200', brand: 'Bajaj', model: 'Dominar 200', year: '2023-2024', displacement: '200cc', manual: ENHANCED_SECTIONS('Dominar 200', '200cc'), externalManualUrl: SEARCH_PDF('Bajaj', 'Dominar 200') },
  { id: 'ba-dominar-400', brand: 'Bajaj', model: 'Dominar 400', year: '2023-2024', displacement: '400cc', manual: ENHANCED_SECTIONS('Dominar 400', '400cc'), externalManualUrl: SEARCH_PDF('Bajaj', 'Dominar 400') },

  // --- KTM ---
  { id: 'kt-50-sx', brand: 'KTM', model: '50 SX (Motocross)', year: '2010-2024', displacement: '50cc', manual: OFFROAD_SECTIONS('50 SX', '50cc', true), externalManualUrl: SEARCH_PDF('KTM', '50 SX') },
  { id: 'kt-300-exc', brand: 'KTM', model: '300 EXC / XC (Trilha)', year: '2012-2024', displacement: '300cc', manual: OFFROAD_SECTIONS('300 EXC', '300cc', true), externalManualUrl: SEARCH_PDF('KTM', '300 EXC') },
  { id: 'kt-350-exc-f', brand: 'KTM', model: '350 EXC-F (Trilha)', year: '2012-2024', displacement: '350cc', manual: OFFROAD_SECTIONS('350 EXC-F', '350cc', false), externalManualUrl: SEARCH_PDF('KTM', '350 EXC-F') },
  { id: 'kt-250-sx', brand: 'KTM', model: '250 SX (Motocross)', year: '2010-2024', displacement: '250cc', manual: OFFROAD_SECTIONS('250 SX', '250cc', true), externalManualUrl: SEARCH_PDF('KTM', '250 SX') },
  { id: 'kt-450-sx-f', brand: 'KTM', model: '450 SX-F (Motocross)', year: '2012-2024', displacement: '450cc', manual: OFFROAD_SECTIONS('450 SX-F', '450cc', false), externalManualUrl: SEARCH_PDF('KTM', '450 SX-F') },
  { id: 'kt-duke-200', brand: 'KTM', model: 'Duke 200', year: '2015-2024', displacement: '200cc', manual: ENHANCED_SECTIONS('Duke 200', '200cc'), externalManualUrl: SEARCH_PDF('KTM', 'Duke 200') },
  { id: 'kt-duke-390', brand: 'KTM', model: 'Duke 390', year: '2015-2024', displacement: '373cc', manual: ENHANCED_SECTIONS('Duke 390', '373cc'), externalManualUrl: SEARCH_PDF('KTM', 'Duke 390') },
  { id: 'kt-390-adv', brand: 'KTM', model: '390 Adventure', year: '2020-2024', displacement: '373cc', manual: ENHANCED_SECTIONS('390 Adventure', '373cc'), externalManualUrl: SEARCH_PDF('KTM', '390 Adventure') },
];
