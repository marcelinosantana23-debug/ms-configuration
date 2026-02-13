// Especificações técnicas completas para manuais de motos
// Este arquivo contém dados detalhados para cada modelo

export interface TechnicalSpecs {
  id: string;
  brand: string;
  model: string;
  year: string;
  displacement: string;
  
  // Informações Gerais
  engineType: string; // 4T, 2T, etc
  maxPower: string;
  maxTorque: string;
  fuelType: string;
  
  // Óleos e Fluidos
  engineOil: {
    type: string;
    viscosity: string;
    capacity: string;
    changeInterval: string;
  };
  transmissionOil?: {
    type: string;
    capacity: string;
    changeInterval: string;
  };
  brakeFluid: {
    type: string;
    capacity: string;
    changeInterval: string;
  };
  coolant?: {
    type: string;
    capacity: string;
    changeInterval: string;
  };
  
  // Regulagens
  valveAdjustment: {
    intake: string;
    exhaust: string;
    procedure: string;
  };
  sparkPlug: {
    type: string;
    gap: string;
    interval: string;
  };
  chain?: {
    type: string;
    slack: string;
    interval: string;
  };
  
  // Pneus e Freios
  tires: {
    front: string;
    rear: string;
    pressureFront: string;
    pressureRear: string;
  };
  brakes: {
    type: string;
    padType: string;
    rotor?: string;
  };
  
  // Capacidades
  fuelCapacity: string;
  
  // Tabela de Torques (em N.m)
  torqueValues: {
    cylinderHead: string;
    oilDrain: string;
    frontAxle: string;
    rearAxle: string;
    wheelRim: string;
    engineCasing: string;
    [key: string]: string;
  };
  
  // Procedimentos Comuns
  procedures: {
    oilChange: string;
    valveAdjustment: string;
    sparkPlugChange: string;
    chainAdjustment: string;
    tireChange: string;
    brakeBleeding: string;
  };
  
  // Diagnóstico
  commonIssues: Array<{
    symptom: string;
    possibleCauses: string[];
    solution: string;
  }>;
  
  // Peças de Reposição
  replacementParts: Array<{
    name: string;
    oemCode: string;
    interval: string;
  }>;
}

// Exemplo de especificação completa para Honda CG 160
export const HONDA_CG160_SPECS: TechnicalSpecs = {
  id: 'h-cg-160',
  brand: 'Honda',
  model: 'CG 160 Titan/Fan/Start',
  year: '2016-2024',
  displacement: '160cc',
  
  engineType: '4T, monocilíndrico, refrigerado a ar',
  maxPower: '14.0 cv @ 8.000 rpm',
  maxTorque: '1.5 kgf.m @ 6.000 rpm',
  fuelType: 'Gasolina comum (sem chumbo)',
  
  engineOil: {
    type: 'SAE 10W-30 ou 20W-50',
    viscosity: '10W-30 (recomendado)',
    capacity: '1.0 L (com troca de filtro)',
    changeInterval: 'A cada 5.000 km ou 3 meses',
  },
  
  brakeFluid: {
    type: 'DOT 3 ou DOT 4',
    capacity: '0.15 L (aproximado)',
    changeInterval: 'A cada 2 anos ou conforme necessário',
  },
  
  valveAdjustment: {
    intake: '0.05 a 0.10 mm (motor frio)',
    exhaust: '0.10 a 0.15 mm (motor frio)',
    procedure: '1. Remover tampa de válvulas; 2. Alinhar marcas de comando; 3. Medir folga com calibre; 4. Afrouxar contraporca do parafuso de ajuste; 5. Girar parafuso até atingir folga correta; 6. Apertar contraporca; 7. Verificar novamente.',
  },
  
  sparkPlug: {
    type: 'NGK CR8E ou equivalente',
    gap: '0.6 a 0.7 mm',
    interval: 'A cada 8.000 km',
  },
  
  tires: {
    front: '80/100-17 (CG 160)',
    rear: '100/80-17 (CG 160)',
    pressureFront: '1.5 kgf/cm² (21 psi)',
    pressureRear: '1.75 kgf/cm² (25 psi)',
  },
  
  brakes: {
    type: 'Tambor dianteiro e traseiro',
    padType: 'Sapata de freio (não usa pastilha)',
    rotor: 'N/A',
  },
  
  fuelCapacity: '11 L',
  
  torqueValues: {
    cylinderHead: '30-32 N.m',
    oilDrain: '24 N.m',
    frontAxle: '60 N.m',
    rearAxle: '90 N.m',
    wheelRim: '80 N.m',
    engineCasing: '22 N.m',
    sparkPlug: '18-22 N.m',
    filterCap: '12 N.m',
  },
  
  procedures: {
    oilChange: '1. Aquecer o motor por 2-3 minutos; 2. Desligar e aguardar 5 minutos; 3. Remover bujão de drenagem; 4. Deixar óleo escoar completamente; 5. Limpar e instalar novo bujão; 6. Remover filtro de óleo (se aplicável); 7. Instalar novo filtro; 8. Adicionar óleo novo até marca máxima; 9. Ligar motor e verificar vazamentos; 10. Desligar e aguardar 2 minutos; 11. Verificar nível novamente.',
    
    valveAdjustment: '1. Motor frio; 2. Remover tampa de válvulas; 3. Alinhar marcas de comando de válvulas; 4. Medir folga com calibre de lâminas; 5. Se fora da especificação, afrouxar contraporca do parafuso de ajuste; 6. Girar parafuso com chave Phillips até atingir folga correta; 7. Apertar contraporca com chave de boca; 8. Verificar novamente; 9. Instalar tampa de válvulas com novo vedador.',
    
    sparkPlugChange: '1. Desligar motor e aguardar esfriar; 2. Remover tampa de vela; 3. Remover vela com chave de vela (tamanho 21mm); 4. Verificar gap da nova vela (0.6-0.7mm); 5. Instalar nova vela; 6. Apertar com torque de 18-22 N.m; 7. Instalar tampa de vela.',
    
    chainAdjustment: 'N/A - Modelo com corrente de distribuição interna',
    
    tireChange: '1. Remover roda com chave de roda; 2. Desmontar pneu com máquina de desmontar; 3. Verificar aro para danos; 4. Montar novo pneu; 5. Balancear roda; 6. Instalar roda; 7. Apertar parafusos em sequência cruzada com torque de 80 N.m.',
    
    brakeBleeding: '1. Remover tampa do cilindro mestre; 2. Remover mangueira de freio; 3. Conectar mangueira de sangria; 4. Bombear alavanca de freio até sair ar; 5. Apertar parafuso de sangria; 6. Repetir até não sair mais ar; 7. Verificar nível de fluido; 8. Instalar tampa.',
  },
  
  commonIssues: [
    {
      symptom: 'Motor não pega',
      possibleCauses: ['Bateria fraca', 'Vela queimada', 'Combustível vencido', 'Carburador entupido'],
      solution: 'Verificar carga da bateria (12V); Trocar vela; Drenar combustível vencido; Limpar carburador com ar comprimido',
    },
    {
      symptom: 'Motor perde potência',
      possibleCauses: ['Óleo sujo', 'Vela queimada', 'Filtro de ar entupido', 'Válvulas desreguladas'],
      solution: 'Trocar óleo; Trocar vela; Limpar filtro de ar; Ajustar válvulas conforme procedimento',
    },
    {
      symptom: 'Freio mole',
      possibleCauses: ['Ar na tubulação', 'Fluido de freio vencido', 'Vazamento de fluido', 'Sapata desgastada'],
      solution: 'Sangrar freio; Trocar fluido de freio; Verificar vazamentos; Trocar sapata de freio',
    },
    {
      symptom: 'Corrente barulhenta',
      possibleCauses: ['Corrente suja', 'Corrente desgastada', 'Corrente muito solta'],
      solution: 'Limpar e lubrificar corrente; Verificar desgaste; Ajustar folga da corrente',
    },
  ],
  
  replacementParts: [
    { name: 'Óleo do Motor', oemCode: '08207-0010', interval: '5.000 km' },
    { name: 'Filtro de Óleo', oemCode: '15400-RTA-004', interval: '5.000 km' },
    { name: 'Vela de Ignição', oemCode: 'CR8E', interval: '8.000 km' },
    { name: 'Filtro de Ar', oemCode: '17211-KZZ-901', interval: '10.000 km' },
    { name: 'Corrente de Distribuição', oemCode: '14100-KZZ-901', interval: '40.000 km' },
    { name: 'Sapata de Freio Dianteira', oemCode: '06430-KZZ-901', interval: '20.000 km' },
    { name: 'Sapata de Freio Traseira', oemCode: '06435-KZZ-901', interval: '20.000 km' },
    { name: 'Pneu Dianteiro', oemCode: '80/100-17', interval: '15.000 km' },
    { name: 'Pneu Traseiro', oemCode: '100/80-17', interval: '15.000 km' },
  ],
};

// Exemplo para Honda CRF 230F (Off-Road)
export const HONDA_CRF230F_SPECS: TechnicalSpecs = {
  id: 'h-crf-230f',
  brand: 'Honda',
  model: 'CRF 230F (Trilha)',
  year: '2007-2020',
  displacement: '230cc',
  
  engineType: '4T, monocilíndrico, refrigerado a ar, comando único',
  maxPower: '18.0 cv @ 8.000 rpm',
  maxTorque: '1.9 kgf.m @ 6.500 rpm',
  fuelType: 'Gasolina comum (sem chumbo)',
  
  engineOil: {
    type: 'SAE 10W-40 ou 10W-50',
    viscosity: '10W-40 (recomendado)',
    capacity: '1.5 L (com troca de filtro)',
    changeInterval: 'A cada 1.000 km (trilha severa) ou 2.000 km (uso normal)',
  },
  
  brakeFluid: {
    type: 'DOT 4',
    capacity: '0.2 L (aproximado)',
    changeInterval: 'A cada 2 anos',
  },
  
  valveAdjustment: {
    intake: '0.12 mm (motor frio)',
    exhaust: '0.22 mm (motor frio)',
    procedure: '1. Motor frio; 2. Remover tampa de válvulas; 3. Alinhar marcas de comando; 4. Medir folga com calibre; 5. Afrouxar contraporca; 6. Girar parafuso de ajuste; 7. Apertar contraporca; 8. Verificar novamente.',
  },
  
  sparkPlug: {
    type: 'NGK CR8E ou LMAR8AD-9',
    gap: '0.6 a 0.7 mm',
    interval: 'A cada 1.000 km ou conforme necessário',
  },
  
  tires: {
    front: '80/100-21 (CRF 230F)',
    rear: '100/90-18 (CRF 230F)',
    pressureFront: '0.9 kgf/cm² (13 psi)',
    pressureRear: '1.1 kgf/cm² (16 psi)',
  },
  
  brakes: {
    type: 'Disco dianteiro / Tambor traseiro',
    padType: 'Pastilha de freio (dianteiro)',
    rotor: 'Disco de 190mm',
  },
  
  fuelCapacity: '7.7 L',
  
  torqueValues: {
    cylinderHead: '30-32 N.m',
    oilDrain: '24 N.m',
    frontAxle: '60 N.m',
    rearAxle: '80 N.m',
    wheelRim: '70 N.m',
    engineCasing: '22 N.m',
    sparkPlug: '18-22 N.m',
    filterCap: '12 N.m',
  },
  
  procedures: {
    oilChange: '1. Aquecer motor por 5 minutos; 2. Desligar e aguardar 5 minutos; 3. Remover bujão de drenagem; 4. Deixar óleo escoar completamente; 5. Limpar e instalar novo bujão com torque de 24 N.m; 6. Remover filtro de óleo; 7. Instalar novo filtro (apertar 3/4 de volta após tocar); 8. Adicionar óleo novo até marca máxima; 9. Ligar motor e verificar vazamentos; 10. Desligar e aguardar 2 minutos; 11. Verificar nível novamente.',
    
    valveAdjustment: '1. Motor completamente frio; 2. Remover tampa de válvulas; 3. Alinhar marcas de comando (ponto de referência); 4. Medir folga com calibre de lâminas; 5. Se fora da especificação, afrouxar contraporca do parafuso de ajuste; 6. Girar parafuso com chave Phillips até atingir folga correta; 7. Apertar contraporca; 8. Verificar novamente; 9. Instalar tampa com novo vedador.',
    
    sparkPlugChange: '1. Desligar motor e aguardar esfriar; 2. Remover tampa de vela; 3. Remover vela com chave de vela (tamanho 21mm); 4. Verificar gap da nova vela (0.6-0.7mm); 5. Instalar nova vela com torque de 18-22 N.m; 6. Instalar tampa de vela.',
    
    chainAdjustment: '1. Colocar moto em cavalete; 2. Localizar corrente de transmissão; 3. Medir folga no ponto mais frouxo (deve ser 25-35mm); 4. Se necessário, afrouxar parafusos do eixo traseiro; 5. Girar parafusos de ajuste da corrente igualmente em ambos os lados; 6. Apertar parafusos do eixo traseiro com torque de 80 N.m; 7. Verificar folga novamente.',
    
    tireChange: '1. Remover roda com chave de roda; 2. Desmontar pneu com máquina de desmontar; 3. Verificar aro para danos; 4. Montar novo pneu; 5. Balancear roda; 6. Instalar roda; 7. Apertar parafusos em sequência cruzada com torque de 70 N.m.',
    
    brakeBleeding: '1. Remover tampa do cilindro mestre; 2. Remover mangueira de freio; 3. Conectar mangueira de sangria; 4. Bombear alavanca de freio até sair ar; 5. Apertar parafuso de sangria; 6. Repetir até não sair mais ar; 7. Verificar nível de fluido; 8. Instalar tampa.',
  },
  
  commonIssues: [
    {
      symptom: 'Motor não pega após queda',
      possibleCauses: ['Chave de parada acionada', 'Combustível vencido', 'Vela molhada', 'Carburador entupido'],
      solution: 'Verificar chave de parada; Drenar combustível; Trocar vela; Limpar carburador',
    },
    {
      symptom: 'Perda de potência em trilha',
      possibleCauses: ['Óleo sujo', 'Filtro de ar entupido', 'Vela queimada', 'Válvulas desreguladas'],
      solution: 'Trocar óleo; Limpar filtro de ar; Trocar vela; Ajustar válvulas',
    },
    {
      symptom: 'Freio dianteiro mole',
      possibleCauses: ['Ar na tubulação', 'Pastilha desgastada', 'Vazamento de fluido'],
      solution: 'Sangrar freio; Trocar pastilha; Verificar vazamentos',
    },
    {
      symptom: 'Corrente barulhenta e solta',
      possibleCauses: ['Corrente desgastada', 'Corrente muito solta', 'Corrente suja'],
      solution: 'Trocar corrente; Ajustar folga; Limpar e lubrificar corrente',
    },
  ],
  
  replacementParts: [
    { name: 'Óleo do Motor', oemCode: '08207-0010', interval: '1.000 km' },
    { name: 'Filtro de Óleo', oemCode: '15400-KZZ-901', interval: '1.000 km' },
    { name: 'Vela de Ignição', oemCode: 'CR8E', interval: '1.000 km' },
    { name: 'Filtro de Ar', oemCode: '17211-KZZ-901', interval: '500 km' },
    { name: 'Corrente de Transmissão', oemCode: '14100-KZZ-901', interval: '2.000 km' },
    { name: 'Pastilha de Freio Dianteira', oemCode: '06430-KZZ-901', interval: '1.000 km' },
    { name: 'Sapata de Freio Traseira', oemCode: '06435-KZZ-901', interval: '1.000 km' },
    { name: 'Pneu Dianteiro', oemCode: '80/100-21', interval: '1.500 km' },
    { name: 'Pneu Traseiro', oemCode: '100/90-18', interval: '1.500 km' },
    { name: 'Correia de Distribuição', oemCode: '14100-KZZ-901', interval: '5.000 km' },
  ],
};
