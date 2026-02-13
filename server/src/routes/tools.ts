import { Router, Request, Response } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * POST /tools/torque-calculator
 * Calcula o torque necessário baseado em especificações
 */
router.post('/torque-calculator', (req: Request, res: Response) => {
  try {
    const { diameter, material, coefficient } = req.body;
    
    if (!diameter || !material) {
      return res.status(400).json({
        success: false,
        error: 'Diâmetro e material são obrigatórios',
      });
    }
    
    // Tabela de coeficientes de atrito por material
    const coefficients: Record<string, number> = {
      'aço-seco': 0.15,
      'aço-oleado': 0.12,
      'aço-galvanizado': 0.18,
      'inox-seco': 0.20,
      'inox-oleado': 0.15,
      'bronze': 0.10,
      'alumínio': 0.12,
    };
    
    const coef = coefficient || coefficients[material] || 0.15;
    
    // Fórmula: T = (P * d * coef) / 2000
    // Onde P é a carga de pré-tensão (estimada por diâmetro)
    const loadEstimates: Record<string, number> = {
      'M4': 1000,
      'M5': 1500,
      'M6': 2000,
      'M8': 4000,
      'M10': 6000,
      'M12': 10000,
      'M14': 15000,
      'M16': 20000,
      'M18': 25000,
      'M20': 30000,
    };
    
    const load = loadEstimates[diameter] || 5000;
    const torque = (load * parseFloat(diameter.replace('M', '')) * coef) / 2000;
    
    return res.status(200).json({
      success: true,
      data: {
        diameter,
        material,
        coefficient: coef,
        estimatedTorque: parseFloat(torque.toFixed(2)),
        unit: 'N.m',
        recommendation: `Aplicar entre ${parseFloat((torque * 0.9).toFixed(2))} e ${parseFloat((torque * 1.1).toFixed(2))} N.m`,
      },
    });
  } catch (error) {
    console.error('Torque calculator error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao calcular torque',
    });
  }
});

/**
 * POST /tools/displacement-calculator
 * Calcula cilindrada baseado em diâmetro e curso
 */
router.post('/displacement-calculator', (req: Request, res: Response) => {
  try {
    const { bore, stroke, cylinders } = req.body;
    
    if (!bore || !stroke || !cylinders) {
      return res.status(400).json({
        success: false,
        error: 'Diâmetro, curso e número de cilindros são obrigatórios',
      });
    }
    
    // Fórmula: Cilindrada = (π/4) * d² * s * n
    // d = diâmetro (bore) em mm
    // s = curso (stroke) em mm
    // n = número de cilindros
    
    const boreNum = parseFloat(bore);
    const strokeNum = parseFloat(stroke);
    const cylindersNum = parseInt(cylinders);
    
    const displacement = (Math.PI / 4) * Math.pow(boreNum, 2) * strokeNum * cylindersNum / 1000;
    
    // Calcular potência estimada (aproximação)
    const estimatedPower = displacement * 0.05; // Aproximação: 50W por cc
    
    return res.status(200).json({
      success: true,
      data: {
        bore: boreNum,
        stroke: strokeNum,
        cylinders: cylindersNum,
        displacement: parseFloat(displacement.toFixed(2)),
        unit: 'cc',
        estimatedPower: parseFloat(estimatedPower.toFixed(1)),
        powerUnit: 'cv',
      },
    });
  } catch (error) {
    console.error('Displacement calculator error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao calcular cilindrada',
    });
  }
});

/**
 * POST /tools/compression-ratio
 * Calcula taxa de compressão
 */
router.post('/compression-ratio', (req: Request, res: Response) => {
  try {
    const { bore, stroke, combustionChamber, pistonCup } = req.body;
    
    if (!bore || !stroke || !combustionChamber) {
      return res.status(400).json({
        success: false,
        error: 'Diâmetro, curso e câmara de combustão são obrigatórios',
      });
    }
    
    const boreNum = parseFloat(bore);
    const strokeNum = parseFloat(stroke);
    const chamberNum = parseFloat(combustionChamber);
    const cupNum = pistonCup ? parseFloat(pistonCup) : 0;
    
    // Volume do cilindro
    const cylinderVolume = (Math.PI / 4) * Math.pow(boreNum, 2) * strokeNum;
    
    // Volume total (cilindro + câmara + xícara do pistão)
    const totalVolume = cylinderVolume + chamberNum + cupNum;
    
    // Volume morto (câmara + xícara)
    const deadVolume = chamberNum + cupNum;
    
    // Taxa de compressão
    const compressionRatio = totalVolume / deadVolume;
    
    return res.status(200).json({
      success: true,
      data: {
        bore: boreNum,
        stroke: strokeNum,
        combustionChamber: chamberNum,
        pistonCup: cupNum,
        cylinderVolume: parseFloat(cylinderVolume.toFixed(2)),
        totalVolume: parseFloat(totalVolume.toFixed(2)),
        deadVolume: parseFloat(deadVolume.toFixed(2)),
        compressionRatio: parseFloat(compressionRatio.toFixed(2)),
        ratio: `${parseFloat(compressionRatio.toFixed(2))}:1`,
      },
    });
  } catch (error) {
    console.error('Compression ratio error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao calcular taxa de compressão',
    });
  }
});

/**
 * GET /tools/unit-converter
 * Converte unidades
 */
router.get('/unit-converter', (req: Request, res: Response) => {
  try {
    const { value, from, to } = req.query;
    
    if (!value || !from || !to) {
      return res.status(400).json({
        success: false,
        error: 'Valor, unidade de origem e destino são obrigatórios',
      });
    }
    
    const val = parseFloat(value as string);
    const fromUnit = (from as string).toLowerCase();
    const toUnit = (to as string).toLowerCase();
    
    // Conversões suportadas
    const conversions: Record<string, Record<string, number>> = {
      // Comprimento
      'mm-cm': 0.1,
      'cm-mm': 10,
      'mm-m': 0.001,
      'm-mm': 1000,
      'cm-m': 0.01,
      'm-cm': 100,
      'mm-polegada': 0.03937,
      'polegada-mm': 25.4,
      
      // Peso
      'kg-lb': 2.20462,
      'lb-kg': 0.453592,
      'g-kg': 0.001,
      'kg-g': 1000,
      'mg-g': 0.001,
      'g-mg': 1000,
      
      // Pressão
      'bar-psi': 14.5038,
      'psi-bar': 0.0689476,
      'kgf/cm2-bar': 0.980665,
      'bar-kgf/cm2': 1.01972,
      'atm-bar': 1.01325,
      'bar-atm': 0.986923,
      
      // Temperatura (especial)
      'celsius-fahrenheit': (v: number) => (v * 9/5) + 32,
      'fahrenheit-celsius': (v: number) => (v - 32) * 5/9,
      
      // Velocidade
      'km/h-m/s': 0.277778,
      'm/s-km/h': 3.6,
      'mph-km/h': 1.60934,
      'km/h-mph': 0.621371,
      
      // Torque
      'nm-kgfm': 0.101972,
      'kgfm-nm': 9.80665,
      'nm-lbfft': 0.737562,
      'lbfft-nm': 1.35582,
    };
    
    const key = `${fromUnit}-${toUnit}`;
    
    if (!conversions[key]) {
      return res.status(400).json({
        success: false,
        error: `Conversão de ${fromUnit} para ${toUnit} não suportada`,
      });
    }
    
    let result: number;
    if (typeof conversions[key] === 'function') {
      result = (conversions[key] as any)(val);
    } else {
      result = val * (conversions[key] as number);
    }
    
    return res.status(200).json({
      success: true,
      data: {
        originalValue: val,
        originalUnit: from,
        convertedValue: parseFloat(result.toFixed(4)),
        convertedUnit: to,
        formula: `${val} ${from} = ${parseFloat(result.toFixed(4))} ${to}`,
      },
    });
  } catch (error) {
    console.error('Unit converter error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao converter unidades',
    });
  }
});

/**
 * GET /tools/tire-pressure-calculator
 * Calcula pressão de pneu recomendada
 */
router.get('/tire-pressure-calculator', (req: Request, res: Response) => {
  try {
    const { weight, tireSize, type } = req.query;
    
    if (!weight || !tireSize) {
      return res.status(400).json({
        success: false,
        error: 'Peso e tamanho do pneu são obrigatórios',
      });
    }
    
    const weightNum = parseFloat(weight as string);
    const tireType = (type as string) || 'street';
    
    // Tabela de pressões recomendadas por tipo
    const pressureFactors: Record<string, number> = {
      'street': 0.008,      // Rua
      'offroad': 0.006,     // Off-road (menor pressão)
      'racing': 0.010,      // Racing (maior pressão)
      'touring': 0.009,     // Touring
    };
    
    const factor = pressureFactors[tireType] || 0.008;
    const pressureBar = weightNum * factor;
    const pressurePsi = pressureBar * 14.5038;
    const pressureKgf = pressureBar * 1.01972;
    
    return res.status(200).json({
      success: true,
      data: {
        weight: weightNum,
        tireSize,
        type: tireType,
        pressureBar: parseFloat(pressureBar.toFixed(2)),
        pressurePsi: parseFloat(pressurePsi.toFixed(1)),
        pressureKgf: parseFloat(pressureKgf.toFixed(2)),
        recommendation: `Pressão recomendada: ${parseFloat(pressureBar.toFixed(2))} bar (${parseFloat(pressurePsi.toFixed(1))} psi)`,
      },
    });
  } catch (error) {
    console.error('Tire pressure calculator error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao calcular pressão de pneu',
    });
  }
});

/**
 * GET /tools/oil-capacity-calculator
 * Calcula capacidade de óleo baseado em cilindrada
 */
router.get('/oil-capacity-calculator', (req: Request, res: Response) => {
  try {
    const { displacement, type } = req.query;
    
    if (!displacement) {
      return res.status(400).json({
        success: false,
        error: 'Cilindrada é obrigatória',
      });
    }
    
    const cc = parseFloat(displacement as string);
    const oilType = (type as string) || 'engine';
    
    // Tabela de capacidades por cilindrada e tipo
    let capacity: number;
    
    if (oilType === 'engine') {
      if (cc <= 50) capacity = 0.5;
      else if (cc <= 100) capacity = 0.8;
      else if (cc <= 125) capacity = 1.0;
      else if (cc <= 150) capacity = 1.2;
      else if (cc <= 250) capacity = 1.5;
      else if (cc <= 400) capacity = 2.0;
      else if (cc <= 600) capacity = 2.5;
      else capacity = 3.0;
    } else if (oilType === 'transmission') {
      capacity = cc * 0.008; // Aproximação
    } else {
      capacity = cc * 0.005;
    }
    
    return res.status(200).json({
      success: true,
      data: {
        displacement: cc,
        type: oilType,
        capacity: parseFloat(capacity.toFixed(2)),
        unit: 'L',
        recommendation: `Capacidade aproximada: ${parseFloat(capacity.toFixed(2))} litros`,
      },
    });
  } catch (error) {
    console.error('Oil capacity calculator error:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro ao calcular capacidade de óleo',
    });
  }
});

export default router;
