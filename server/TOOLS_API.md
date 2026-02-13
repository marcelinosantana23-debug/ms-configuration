# Ferramentas de Cálculo - API

Documentação das ferramentas de cálculo disponíveis para mecânicos.

## Endpoints

### 1. Calculadora de Torque

**POST** `/api/tools/torque-calculator`

Calcula o torque necessário baseado em diâmetro do parafuso e material.

**Request:**
```json
{
  "diameter": "M8",
  "material": "aço-oleado",
  "coefficient": 0.12
}
```

**Parameters:**
- `diameter` (string, obrigatório): Tamanho do parafuso (M4, M5, M6, M8, M10, M12, M14, M16, M18, M20)
- `material` (string, obrigatório): Tipo de material
  - `aço-seco` - Aço sem lubrificação
  - `aço-oleado` - Aço com óleo
  - `aço-galvanizado` - Aço galvanizado
  - `inox-seco` - Inox sem lubrificação
  - `inox-oleado` - Inox com óleo
  - `bronze` - Bronze
  - `alumínio` - Alumínio
- `coefficient` (number, opcional): Coeficiente de atrito personalizado

**Response:**
```json
{
  "success": true,
  "data": {
    "diameter": "M8",
    "material": "aço-oleado",
    "coefficient": 0.12,
    "estimatedTorque": 4.8,
    "unit": "N.m",
    "recommendation": "Aplicar entre 4.32 e 5.28 N.m"
  }
}
```

---

### 2. Calculadora de Cilindrada

**POST** `/api/tools/displacement-calculator`

Calcula a cilindrada do motor baseado em diâmetro e curso.

**Request:**
```json
{
  "bore": 80,
  "stroke": 90,
  "cylinders": 1
}
```

**Parameters:**
- `bore` (number, obrigatório): Diâmetro do cilindro em mm
- `stroke` (number, obrigatório): Curso do pistão em mm
- `cylinders` (number, obrigatório): Número de cilindros

**Response:**
```json
{
  "success": true,
  "data": {
    "bore": 80,
    "stroke": 90,
    "cylinders": 1,
    "displacement": 452.39,
    "unit": "cc",
    "estimatedPower": 22.6,
    "powerUnit": "cv"
  }
}
```

---

### 3. Calculadora de Taxa de Compressão

**POST** `/api/tools/compression-ratio`

Calcula a taxa de compressão do motor.

**Request:**
```json
{
  "bore": 80,
  "stroke": 90,
  "combustionChamber": 50,
  "pistonCup": 5
}
```

**Parameters:**
- `bore` (number, obrigatório): Diâmetro do cilindro em mm
- `stroke` (number, obrigatório): Curso do pistão em mm
- `combustionChamber` (number, obrigatório): Volume da câmara de combustão em cc
- `pistonCup` (number, opcional): Volume da xícara do pistão em cc

**Response:**
```json
{
  "success": true,
  "data": {
    "bore": 80,
    "stroke": 90,
    "combustionChamber": 50,
    "pistonCup": 5,
    "cylinderVolume": 452.39,
    "totalVolume": 507.39,
    "deadVolume": 55,
    "compressionRatio": 9.22,
    "ratio": "9.22:1"
  }
}
```

---

### 4. Conversor de Unidades

**GET** `/api/tools/unit-converter`

Converte entre diferentes unidades de medida.

**Request:**
```
GET /api/tools/unit-converter?value=100&from=mm&to=cm
```

**Parameters:**
- `value` (number, obrigatório): Valor a converter
- `from` (string, obrigatório): Unidade de origem
- `to` (string, obrigatório): Unidade de destino

**Conversões Suportadas:**

**Comprimento:**
- mm ↔ cm, m, polegada

**Peso:**
- kg ↔ lb, g
- g ↔ mg, kg

**Pressão:**
- bar ↔ psi, kgf/cm², atm

**Temperatura:**
- celsius ↔ fahrenheit

**Velocidade:**
- km/h ↔ m/s, mph

**Torque:**
- nm ↔ kgfm, lbfft

**Response:**
```json
{
  "success": true,
  "data": {
    "originalValue": 100,
    "originalUnit": "mm",
    "convertedValue": 10,
    "convertedUnit": "cm",
    "formula": "100 mm = 10 cm"
  }
}
```

---

### 5. Calculadora de Pressão de Pneu

**GET** `/api/tools/tire-pressure-calculator`

Calcula a pressão recomendada de pneu baseado no peso da moto.

**Request:**
```
GET /api/tools/tire-pressure-calculator?weight=150&tireSize=80/100-17&type=street
```

**Parameters:**
- `weight` (number, obrigatório): Peso da moto em kg
- `tireSize` (string, obrigatório): Tamanho do pneu (ex: 80/100-17)
- `type` (string, opcional): Tipo de uso
  - `street` - Uso em rua (padrão)
  - `offroad` - Off-road
  - `racing` - Racing
  - `touring` - Touring

**Response:**
```json
{
  "success": true,
  "data": {
    "weight": 150,
    "tireSize": "80/100-17",
    "type": "street",
    "pressureBar": 1.2,
    "pressurePsi": 17.4,
    "pressureKgf": 1.22,
    "recommendation": "Pressão recomendada: 1.2 bar (17.4 psi)"
  }
}
```

---

### 6. Calculadora de Capacidade de Óleo

**GET** `/api/tools/oil-capacity-calculator`

Calcula a capacidade aproximada de óleo baseado na cilindrada.

**Request:**
```
GET /api/tools/oil-capacity-calculator?displacement=160&type=engine
```

**Parameters:**
- `displacement` (number, obrigatório): Cilindrada em cc
- `type` (string, opcional): Tipo de óleo
  - `engine` - Óleo do motor (padrão)
  - `transmission` - Óleo da transmissão
  - `brake` - Óleo de freio

**Response:**
```json
{
  "success": true,
  "data": {
    "displacement": 160,
    "type": "engine",
    "capacity": 1.0,
    "unit": "L",
    "recommendation": "Capacidade aproximada: 1.0 litros"
  }
}
```

---

## Exemplos de Uso

### Exemplo 1: Calcular torque para parafuso M10 em aço

```bash
curl -X POST http://localhost:3000/api/tools/torque-calculator \
  -H "Content-Type: application/json" \
  -d '{
    "diameter": "M10",
    "material": "aço-oleado"
  }'
```

### Exemplo 2: Converter 80 mm para polegadas

```bash
curl "http://localhost:3000/api/tools/unit-converter?value=80&from=mm&to=polegada"
```

### Exemplo 3: Calcular cilindrada de um motor

```bash
curl -X POST http://localhost:3000/api/tools/displacement-calculator \
  -H "Content-Type: application/json" \
  -d '{
    "bore": 80,
    "stroke": 90,
    "cylinders": 1
  }'
```

---

## Tabelas de Referência

### Coeficientes de Atrito por Material

| Material | Coeficiente |
|----------|------------|
| Aço seco | 0.15 |
| Aço oleado | 0.12 |
| Aço galvanizado | 0.18 |
| Inox seco | 0.20 |
| Inox oleado | 0.15 |
| Bronze | 0.10 |
| Alumínio | 0.12 |

### Tamanhos de Parafusos e Cargas Estimadas

| Tamanho | Carga (N) |
|--------|-----------|
| M4 | 1.000 |
| M5 | 1.500 |
| M6 | 2.000 |
| M8 | 4.000 |
| M10 | 6.000 |
| M12 | 10.000 |
| M14 | 15.000 |
| M16 | 20.000 |
| M18 | 25.000 |
| M20 | 30.000 |

### Capacidade de Óleo por Cilindrada

| Cilindrada | Capacidade |
|-----------|-----------|
| ≤ 50 cc | 0.5 L |
| ≤ 100 cc | 0.8 L |
| ≤ 125 cc | 1.0 L |
| ≤ 150 cc | 1.2 L |
| ≤ 250 cc | 1.5 L |
| ≤ 400 cc | 2.0 L |
| ≤ 600 cc | 2.5 L |
| > 600 cc | 3.0 L |

---

## Notas Importantes

- Todos os cálculos são aproximações baseadas em fórmulas padrão
- Para valores críticos, sempre consulte o manual técnico do fabricante
- Os coeficientes de atrito podem variar dependendo das condições
- As pressões de pneu devem ser verificadas no manual da moto
- Mantenha sempre uma margem de segurança nos cálculos de torque
