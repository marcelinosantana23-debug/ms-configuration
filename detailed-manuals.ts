// Manuais completos e específicos para cada moto com todas as especificações
import { DETAILED_MANUALS_EXPANDED } from './detailed-manuals-expanded';

export const DETAILED_MANUALS = {
  ...DETAILED_MANUALS_EXPANDED,
  'h-pop-110i': {
    model: 'Honda Pop 110i',
    year: '2018-2024',
    cc: '110cc',
    sections: [
      {
        id: 'especificacoes-gerais',
        title: '📋 Especificações Gerais',
        content: `HONDA POP 110i - ESPECIFICAÇÕES COMPLETAS

🔧 MOTOR:
- Tipo: Monocilindro 4 tempos, refrigerado a ar
- Cilindrada: 109.1 cc
- Potência: 8.4 cv @ 7.500 RPM
- Torque: 0.95 kgf.m @ 5.500 RPM
- Diâmetro x Curso: 50.0 x 55.0 mm
- Taxa de Compressão: 9.3:1
- Comando de Válvulas: SOHC (comando único no cabeçote)
- Válvulas: 2 (admissão e escape)
- Ignição: CDI (Capacitor Discharge Ignition)
- Sistema de Partida: Elétrico

⛽ COMBUSTÍVEL:
- Tipo: Gasolina comum (sem chumbo)
- Octanagem Mínima: 87 RON
- Tanque: 4.2 litros
- Consumo Urbano: 59 km/l
- Consumo Rodovia: 65 km/l
- Autonomia Teórica: 247 km

🛢️ ÓLEOS E FLUIDOS:
- Óleo do Motor: SAE 10W-30 (SL/JASO MA)
- Capacidade (sem troca filtro): 1.0 litro
- Capacidade (com troca filtro): 1.1 litro
- Óleo Câmbio: SAE 90 (0.8 litro)
- Fluido Freio: DOT 3 (0.2 litro)
- Refrigerante: Não utiliza (ar)

🔋 SISTEMA ELÉTRICO:
- Bateria: 12V - 4Ah
- Alternador: 12V - 150W
- Fusível Principal: 15A
- Fusível Secundário: 10A
- Vela de Ignição: NGK BR8ECM ou equivalente
- Lâmpada Farol: 35/35W (H4)
- Lâmpada Traseira: 5W
- Lâmpada Freio: 5W

🏍️ DIMENSÕES E PESO:
- Comprimento: 1.920 mm
- Largura: 720 mm
- Altura: 1.095 mm
- Distância entre Eixos: 1.260 mm
- Altura do Assento: 775 mm
- Peso Seco: 99 kg
- Peso Bruto: 145 kg
- Capacidade de Carga: 150 kg

⚙️ TRANSMISSÃO:
- Tipo: Manual com 4 velocidades
- Embreagem: Seca, centrífuga
- Corrente Primária: Correia de borracha
- Corrente Secundária: Corrente 415H
- Redução Final: 3.5:1

🛞 PNEUS:
- Dianteiro: 2.50-17 (Pressão: 1.5 bar / 22 psi)
- Traseiro: 2.75-17 (Pressão: 1.8 bar / 26 psi)
- Tipo: Diagonal (não radial)
- Profundidade Mínima: 1.6 mm

🛑 FREIOS:
- Dianteiro: Disco (190mm)
- Traseiro: Tambor (110mm)
- Sistema: Combi Brake (freio traseiro ativa freio dianteiro)
- Fluido: DOT 3

🔧 TORQUES PRINCIPAIS (N.m):
- Cabeçote: 12 N.m
- Bujão Óleo: 25 N.m
- Eixo Dianteiro: 60 N.m
- Eixo Traseiro: 90 N.m
- Parafuso Roda: 60 N.m
- Porca Corrente: 40 N.m
- Parafuso Mesa: 22 N.m

📊 DESEMPENHO:
- Velocidade Máxima: 130 km/h
- Aceleração 0-100: ~15 segundos
- Consumo Médio: 62 km/l
- Emissões: Euro 3 / PROCONVE L5`
      },
      {
        id: 'manutencao-preventiva',
        title: '🔧 Manutenção Preventiva',
        content: `TABELA DE MANUTENÇÃO - HONDA POP 110i

INTERVALO DE MANUTENÇÃO:

A CADA 500 KM (Primeiros):
☐ Verificar nível de óleo do motor
☐ Verificar pressão dos pneus
☐ Verificar funcionamento dos freios
☐ Verificar luzes e sinalizadores
☐ Verificar corrente (folga e lubrificação)

A CADA 1.000 KM:
☐ Trocar óleo do motor
☐ Trocar filtro de óleo
☐ Limpar filtro de ar
☐ Verificar folga de válvulas
☐ Verificar corrente de transmissão

A CADA 5.000 KM:
☐ Trocar óleo do motor
☐ Trocar filtro de óleo
☐ Limpar/trocar filtro de ar
☐ Verificar corrente e correia
☐ Verificar pneus (desgaste e pressão)
☐ Verificar freios (pastilhas e fluido)
☐ Verificar bateria

A CADA 10.000 KM:
☐ Trocar óleo do motor
☐ Trocar filtro de óleo
☐ Trocar filtro de ar
☐ Verificar folga de válvulas
☐ Limpar vela de ignição
☐ Verificar corrente e correia
☐ Verificar sistema de freios completo
☐ Verificar suspensão

A CADA 20.000 KM:
☐ Trocar óleo do motor
☐ Trocar filtro de óleo
☐ Trocar vela de ignição
☐ Trocar filtro de ar
☐ Verificar folga de válvulas
☐ Trocar óleo da caixa de câmbio
☐ Verificar corrente e correia
☐ Verificar sistema de freios
☐ Verificar suspensão e amortecedores

A CADA 40.000 KM:
☐ Revisão completa do motor
☐ Verificar compressão do motor
☐ Trocar óleo do câmbio
☐ Verificar embreagem
☐ Verificar sistema elétrico
☐ Verificar corrente e correia
☐ Verificar pneus (desgaste)
☐ Verificar freios (desgaste de pastilhas)

A CADA 60.000 KM:
☐ Revisão geral da motocicleta
☐ Verificar motor (compressão, vazamentos)
☐ Trocar fluido de freio
☐ Verificar corrente (possível troca)
☐ Verificar pneus (possível troca)
☐ Verificar suspensão
☐ Verificar sistema elétrico completo

CAPACIDADES:
- Óleo Motor: 1.0 L (sem filtro) / 1.1 L (com filtro)
- Óleo Câmbio: 0.8 L
- Fluido Freio: 0.2 L
- Combustível: 4.2 L
- Refrigerante: Não utiliza`
      },
      {
        id: 'pecas-oem',
        title: '🔧 Peças OEM Originais',
        content: `PEÇAS DE REPOSIÇÃO ORIGINAIS - HONDA POP 110i

MOTOR:
- Jogo Anéis Pistão: 13010-KZZ-901
- Pistão Completo: 13100-KZZ-901
- Corrente Distribuição: 14400-KZZ-901
- Jogo Juntas Motor: 06110-KZZ-901
- Filtro Óleo: 15400-KZZ-901
- Vela Ignição: BR8ECM (NGK)
- Óleo Motor SAE 10W-30: 08207-9957 (1L)

SISTEMA ELÉTRICO:
- Alternador: 31100-KZZ-901
- Bobina Ignição: 30500-KZZ-901
- Bateria 12V 4Ah: YTX4L-BS
- Regulador Voltagem: 32100-KZZ-901
- Relé Partida: 35850-KZZ-901
- Interruptor Ignição: 35010-KZZ-901

TRANSMISSÃO:
- Correia Primária: 23121-KZZ-901
- Corrente Secundária: 23421-KZZ-901
- Óleo Câmbio SAE 90: 08200-9013 (0.8L)
- Embreagem (Jogo): 22100-KZZ-901

FREIOS:
- Pastilhas Dianteiras: 06435-KZZ-901
- Pastilhas Traseiras: 06450-KZZ-901
- Fluido Freio DOT 3: 08201-9008 (0.5L)
- Cilindro Mestre Dianteiro: 45100-KZZ-901
- Cilindro Escravo Traseiro: 45500-KZZ-901

PNEUS E RODAS:
- Pneu Dianteiro 2.50-17: Marca Pirelli/Michelin
- Pneu Traseiro 2.75-17: Marca Pirelli/Michelin
- Câmara Dianteira: 17" padrão
- Câmara Traseira: 17" padrão
- Aros: Alumínio 17"

SUSPENSÃO:
- Garfo Dianteiro Completo: 51400-KZZ-901
- Amortecedor Traseiro: 52400-KZZ-901
- Óleo Garfo: ATF (0.5L por lado)
- Molas Garfo: 51300-KZZ-901

CARBURADOR:
- Carburador Completo: 16100-KZZ-901
- Jogo Juntas Carburador: 16110-KZZ-901
- Agulha Carburador: 16210-KZZ-901
- Flutuador: 16220-KZZ-901

ESCAPAMENTO:
- Coletor Escape: 18100-KZZ-901
- Silencioso: 18310-KZZ-901
- Junta Escape: 18120-KZZ-901

CARENAGEM:
- Painel Frontal: 64100-KZZ-901
- Lateral Esquerda: 64200-KZZ-901
- Lateral Direita: 64300-KZZ-901
- Banco: 77100-KZZ-901
- Protetor Corrente: 23500-KZZ-901

FORNECEDORES AUTORIZADOS:
- Concessionárias Honda Oficiais
- Distribuidoras Honda Regionais
- Lojas Especializadas em Peças Honda
- Importadoras Certificadas`
      },
      {
        id: 'procedimentos-reparo',
        title: '🔨 Procedimentos de Reparo',
        content: `PROCEDIMENTOS PASSO A PASSO - HONDA POP 110i

1️⃣ TROCA DE ÓLEO E FILTRO:

Materiais Necessários:
- Óleo SAE 10W-30 (1.1L)
- Filtro de óleo novo
- Chave de filtro (ou fita)
- Chave Phillips
- Recipiente para óleo usado
- Pano limpo

Procedimento:
1. Aquecer motor por 2-3 minutos
2. Desligar motor e aguardar 1 minuto
3. Remover protetor lateral (2 parafusos)
4. Localizar bujão de drenagem (parte inferior do motor)
5. Colocar recipiente sob bujão
6. Remover bujão com chave Phillips (apertar com 25 N.m depois)
7. Deixar drenar por 5 minutos
8. Localizar filtro de óleo (lado esquerdo do motor)
9. Girar filtro no sentido anti-horário com chave de filtro
10. Deixar drenar óleo do filtro
11. Limpar a rosca do filtro
12. Aplicar fina camada de óleo novo na borracha do novo filtro
13. Instalar novo filtro (apertar 3/4 de volta após contato)
14. Adicionar óleo novo (1.1L)
15. Verificar nível com moto em pé (deve estar entre marcas)
16. Reinstalar protetor lateral
17. Ligar motor e verificar vazamentos
18. Desligar e aguardar 1 minuto
19. Verificar nível novamente
20. Descartar óleo usado em local apropriado

Tempo Estimado: 15-20 minutos

2️⃣ LIMPEZA DE CARBURADOR:

Materiais:
- Chave Phillips
- Chave de tubo 10mm
- Querosene ou gasolina
- Escova de aço macia
- Ar comprimido (máx 3 bar)
- Pano limpo

Procedimento:
1. Drenar combustível do tanque
2. Remover protetor lateral
3. Desconectar mangueira de combustível do carburador
4. Remover 4 parafusos Phillips da cuba
5. Remover cuba com cuidado
6. Remover agulha e flutuador
7. Limpar cuba com querosene
8. Soprar com ar comprimido (máx 3 bar)
9. Limpar agulha e flutuador
10. Verificar desgaste de agulha
11. Remontar na ordem inversa
12. Reconectar mangueira de combustível
13. Ajustar parafuso de marcha lenta (1.5 voltas)
14. Testar marcha lenta (deve estar entre 1.200-1.400 RPM)

Tempo Estimado: 30-45 minutos

3️⃣ AJUSTE DE FOLGA DE VÁLVULAS:

Materiais:
- Chave Phillips
- Calibrador de folga (0.05mm e 0.10mm)
- Chave de tubo 8mm
- Chave inglesa

Procedimento:
1. Aquecer motor por 5 minutos
2. Desligar motor e aguardar esfriar completamente
3. Remover protetor lateral
4. Remover tampa de válvulas (4 parafusos)
5. Posicionar pistão em PMS (ponto morto superior)
6. Verificar marca de PMS no volante
7. Afrouxar parafuso de fixação do comando
8. Inserir calibrador de 0.05mm na válvula de admissão
9. Girar comando até resistência
10. Apertar parafuso de fixação
11. Remover calibrador
12. Inserir calibrador de 0.10mm na válvula de escape
13. Repetir processo para válvula de escape
14. Verificar com motor frio (diferença máxima 0.05mm)
15. Reinstalar tampa de válvulas
16. Testar motor

Tempo Estimado: 20-30 minutos

4️⃣ TROCA DE VELA DE IGNIÇÃO:

Materiais:
- Vela NGK BR8ECM
- Chave de vela 21mm
- Pano limpo

Procedimento:
1. Desligar motor e aguardar esfriar
2. Remover protetor lateral
3. Localizar vela (topo do motor)
4. Desconectar cabo da vela
5. Remover vela com chave de vela 21mm
6. Verificar gap (deve estar 0.6-0.7mm)
7. Limpar vela com escova de aço macia (se reutilizar)
8. Instalar nova vela
9. Apertar com torque de 15 N.m
10. Reconectar cabo
11. Testar motor

Tempo Estimado: 10-15 minutos

5️⃣ AJUSTE DE CORRENTE:

Materiais:
- Chave de tubo 10mm
- Chave inglesa
- Régua ou calibrador

Procedimento:
1. Colocar moto em cavalete central
2. Localizar tensor de corrente (lado esquerdo)
3. Medir folga da corrente (deve estar 25-35mm)
4. Afrouxar parafuso de fixação do tensor
5. Girar parafuso de ajuste até obter folga correta
6. Apertar parafuso de fixação
7. Verificar alinhamento com roda traseira
8. Lubrificar corrente com spray específico
9. Testar corrente em marcha lenta

Tempo Estimado: 15-20 minutos

6️⃣ SANGRIA DE FREIOS:

Materiais:
- Mangueira transparente
- Recipiente pequeno
- Fluido DOT 3
- Chave Phillips

Procedimento:
1. Remover tampa do cilindro mestre
2. Verificar nível de fluido
3. Conectar mangueira em cilindro escravo
4. Colocar recipiente sob mangueira
5. Bombear manete 10-15 vezes
6. Fechar válvula de sangria
7. Soltar manete
8. Repetir até sair ar (mangueira deve ficar cheia de fluido)
9. Fechar válvula de sangria
10. Remover mangueira
11. Verificar nível de fluido
12. Testar freios

Tempo Estimado: 20-30 minutos`
      },
      {
        id: 'diagnostico',
        title: '🔍 Diagnóstico de Problemas',
        content: `GUIA DE DIAGNÓSTICO - HONDA POP 110i

❌ PROBLEMA: Moto não liga

Verificações:
1. Bateria descarregada?
   - Testar com voltímetro (deve estar 12V)
   - Verificar correntes de bateria
   - Testar alternador (deve gerar 14.5V a 5k RPM)
   
2. Fusível queimado?
   - Verificar fusível principal (15A)
   - Verificar fusível secundário (10A)
   - Procurar causa de queima (curto-circuito?)
   
3. Contato de massa solto?
   - Verificar cabo negativo da bateria
   - Verificar aterramento do motor
   - Verificar conectores soltos

4. Relé de partida com defeito?
   - Testar relé com multímetro
   - Verificar contatos do relé
   
5. Motor de partida com defeito?
   - Testar motor com voltímetro
   - Verificar engrenagem de partida

Soluções:
→ Trocar bateria (se voltagem < 10V)
→ Trocar fusível (se queimado)
→ Apertar conectores
→ Trocar relé ou motor de partida

❌ PROBLEMA: Marcha lenta instável

Verificações:
1. Folga de válvulas incorreta?
   - Medir com calibrador
   - Ajustar se necessário (ADM: 0.05mm / EX: 0.10mm)
   
2. Carburador entupido?
   - Verificar jatos principais
   - Limpar com querosene
   
3. Vela queimada ou suja?
   - Verificar cor da vela
   - Limpar ou trocar
   
4. Corrente de distribuição frouxa?
   - Verificar folga
   - Ajustar se necessário
   
5. Vazamento de ar?
   - Verificar mangueiras
   - Verificar juntas do carburador

Soluções:
→ Ajustar folga de válvulas
→ Limpar carburador
→ Trocar vela
→ Apertar corrente
→ Verificar e selar vazamentos

❌ PROBLEMA: Perda de potência

Verificações:
1. Filtro de ar entupido?
   - Verificar cor do filtro
   - Limpar ou trocar
   
2. Carburador com jatos entupidos?
   - Desmontar e limpar
   - Usar querosene
   
3. Óleo do motor sujo?
   - Verificar cor do óleo
   - Trocar se necessário
   
4. Vela com depósito de carbono?
   - Limpar vela
   - Trocar se muito desgastada
   
5. Compressão baixa?
   - Testar com compressômetro
   - Deve estar acima de 120 psi

Soluções:
→ Trocar filtro de ar
→ Limpar carburador
→ Trocar óleo
→ Trocar vela
→ Verificar compressão do motor

❌ PROBLEMA: Freios moles

Verificações:
1. Nível de fluido baixo?
   - Verificar cilindro mestre
   - Procurar vazamentos
   
2. Ar no sistema de freios?
   - Fazer sangria de freios
   - Verificar mangueiras
   
3. Pastilhas muito desgastadas?
   - Verificar espessura
   - Trocar se < 1.5mm
   
4. Cilindro mestre com defeito?
   - Verificar vazamentos
   - Testar funcionamento
   
5. Mangueiras rachadas?
   - Inspecionar visualmente
   - Trocar se danificadas

Soluções:
→ Adicionar fluido DOT 3
→ Fazer sangria de freios
→ Trocar pastilhas
→ Trocar cilindro mestre
→ Trocar mangueiras

❌ PROBLEMA: Corrente barulhenta

Verificações:
1. Folga incorreta?
   - Medir com régua
   - Deve estar 25-35mm
   
2. Corrente desgastada?
   - Verificar elos
   - Procurar elos soltos
   
3. Correia primária com problema?
   - Verificar desgaste
   - Procurar rachaduras
   
4. Alinhamento incorreto?
   - Verificar alinhamento com roda
   - Ajustar se necessário

Soluções:
→ Ajustar folga da corrente
→ Trocar corrente
→ Trocar correia primária
→ Alinhar roda traseira

❌ PROBLEMA: Vazamento de óleo

Verificações:
1. Bujão de drenagem solto?
   - Verificar aperto
   - Trocar junta se necessário
   
2. Filtro de óleo solto?
   - Verificar aperto
   - Trocar se danificado
   
3. Juntas do motor com defeito?
   - Inspecionar visualmente
   - Procurar óleo seco
   
4. Retém de comando com defeito?
   - Verificar vazamento na tampa
   - Trocar se necessário

Soluções:
→ Apertar bujão (25 N.m)
→ Apertar filtro (3/4 volta)
→ Trocar juntas do motor
→ Trocar retém

❌ PROBLEMA: Bateria descarrega rápido

Verificações:
1. Alternador não carrega?
   - Testar voltagem (deve ser 14.5V a 5k RPM)
   - Verificar bobinas
   
2. Bateria com defeito?
   - Fazer teste de carga
   - Verificar idade da bateria
   
3. Correntes parasitas?
   - Desconectar bateria
   - Medir consumo com multímetro
   
4. Regulador de voltagem com defeito?
   - Testar com voltímetro
   - Verificar conexões

Soluções:
→ Trocar alternador
→ Trocar bateria
→ Encontrar e desligar circuito parasita
→ Trocar regulador de voltagem

❌ PROBLEMA: Pneu furado

Verificações:
1. Furo ou vazamento de válvula?
   - Imergir em água
   - Procurar bolhas
   
2. Espinho ou prego?
   - Inspecionar pneu
   - Procurar objeto estranho

Soluções:
→ Usar selante temporário
→ Reparar câmara
→ Trocar pneu se necessário
→ Verificar pressão regularmente`
      }
    ]
  },
  'h-biz-125': {
    model: 'Honda Biz 125',
    year: '2005-2024',
    cc: '125cc',
    sections: [
      {
        id: 'especificacoes-gerais',
        title: '📋 Especificações Gerais',
        content: `HONDA BIZ 125 - ESPECIFICAÇÕES COMPLETAS

🔧 MOTOR:
- Tipo: Monocilindro 4 tempos, refrigerado a ar
- Cilindrada: 124.9 cc
- Potência: 11.0 cv @ 8.000 RPM
- Torque: 1.1 kgf.m @ 6.000 RPM
- Diâmetro x Curso: 54.0 x 54.0 mm
- Taxa de Compressão: 9.5:1
- Comando de Válvulas: SOHC
- Válvulas: 2 (admissão e escape)
- Ignição: CDI
- Sistema de Partida: Elétrico

⛽ COMBUSTÍVEL:
- Tipo: Gasolina comum (sem chumbo)
- Octanagem Mínima: 87 RON
- Tanque: 5.0 litros
- Consumo Urbano: 55 km/l
- Consumo Rodovia: 60 km/l
- Autonomia Teórica: 275 km

🛢️ ÓLEOS E FLUIDOS:
- Óleo do Motor: SAE 10W-30 (SL/JASO MA)
- Capacidade (sem troca filtro): 1.0 litro
- Capacidade (com troca filtro): 1.1 litro
- Óleo Câmbio: SAE 90 (0.9 litro)
- Fluido Freio: DOT 3 (0.3 litro)

🔋 SISTEMA ELÉTRICO:
- Bateria: 12V - 5Ah
- Alternador: 12V - 180W
- Fusível Principal: 20A
- Vela de Ignição: NGK BR8ECM
- Lâmpada Farol: 35/35W
- Lâmpada Traseira: 5W

🏍️ DIMENSÕES E PESO:
- Comprimento: 1.920 mm
- Largura: 730 mm
- Altura: 1.105 mm
- Distância entre Eixos: 1.285 mm
- Altura do Assento: 780 mm
- Peso Seco: 109 kg
- Peso Bruto: 160 kg

⚙️ TRANSMISSÃO:
- Tipo: Manual com 4 velocidades
- Embreagem: Seca, centrífuga
- Corrente Primária: Correia de borracha
- Corrente Secundária: Corrente 415H
- Redução Final: 3.5:1

🛞 PNEUS:
- Dianteiro: 2.75-17 (Pressão: 1.5 bar / 22 psi)
- Traseiro: 3.00-17 (Pressão: 1.8 bar / 26 psi)

🛑 FREIOS:
- Dianteiro: Disco (190mm)
- Traseiro: Tambor (110mm)
- Sistema: Combi Brake

🔧 TORQUES PRINCIPAIS (N.m):
- Cabeçote: 12 N.m
- Bujão Óleo: 25 N.m
- Eixo Dianteiro: 60 N.m
- Eixo Traseiro: 90 N.m
- Parafuso Roda: 60 N.m

📊 DESEMPENHO:
- Velocidade Máxima: 140 km/h
- Aceleração 0-100: ~13 segundos
- Consumo Médio: 57 km/l`
      },
      {
        id: 'pecas-oem',
        title: '🔧 Peças OEM Originais',
        content: `PEÇAS DE REPOSIÇÃO ORIGINAIS - HONDA BIZ 125

MOTOR:
- Jogo Anéis Pistão: 13010-KZZ-901
- Pistão Completo: 13100-KZZ-901
- Filtro Óleo: 15400-KZZ-901
- Vela Ignição: BR8ECM (NGK)
- Óleo Motor SAE 10W-30: 08207-9957 (1L)

SISTEMA ELÉTRICO:
- Alternador: 31100-KZZ-901
- Bobina Ignição: 30500-KZZ-901
- Bateria 12V 5Ah: YTX5L-BS
- Regulador Voltagem: 32100-KZZ-901

TRANSMISSÃO:
- Correia Primária: 23121-KZZ-901
- Corrente Secundária: 23421-KZZ-901
- Óleo Câmbio SAE 90: 08200-9013 (0.9L)

FREIOS:
- Pastilhas Dianteiras: 06435-KZZ-901
- Pastilhas Traseiras: 06450-KZZ-901
- Fluido Freio DOT 3: 08201-9008 (0.5L)

PNEUS:
- Pneu Dianteiro 2.75-17: Pirelli/Michelin
- Pneu Traseiro 3.00-17: Pirelli/Michelin

CARBURADOR:
- Carburador Completo: 16100-KZZ-901
- Jogo Juntas: 16110-KZZ-901`
      },
      {
        id: 'procedimentos-reparo',
        title: '🔨 Procedimentos de Reparo',
        content: `PROCEDIMENTOS - HONDA BIZ 125

1️⃣ TROCA DE ÓLEO:
1. Aquecer motor por 2-3 minutos
2. Remover bujão de drenagem
3. Deixar drenar por 5 minutos
4. Remover filtro de óleo
5. Instalar novo filtro (apertar 3/4 volta)
6. Adicionar 1.1L de óleo novo
7. Verificar nível com moto em pé
8. Testar motor

Tempo: 15-20 minutos

2️⃣ LIMPEZA DE CARBURADOR:
1. Drenar combustível
2. Remover 4 parafusos da cuba
3. Remover cuba
4. Limpar com querosene
5. Soprar com ar comprimido
6. Remontar na ordem inversa
7. Ajustar marcha lenta (1.5 voltas)
8. Testar motor

Tempo: 30-45 minutos

3️⃣ AJUSTE DE FOLGA DE VÁLVULAS:
1. Aquecer motor por 5 minutos
2. Desligar e aguardar esfriar
3. Remover tampa de válvulas
4. Posicionar pistão em PMS
5. Ajustar válvula de admissão (0.05mm)
6. Ajustar válvula de escape (0.10mm)
7. Reinstalar tampa
8. Testar motor

Tempo: 20-30 minutos`
      },
      {
        id: 'diagnostico',
        title: '🔍 Diagnóstico de Problemas',
        content: `DIAGNÓSTICO - HONDA BIZ 125

❌ PROBLEMA: Moto não liga
✓ Verificar bateria (12V mínimo)
✓ Testar fusível principal (20A)
✓ Verificar contato de massa
✓ Testar relé de partida
→ Solução: Trocar bateria ou relé

❌ PROBLEMA: Marcha lenta instável
✓ Verificar folga de válvulas
✓ Limpar carburador
✓ Verificar vela
✓ Testar corrente de distribuição
→ Solução: Ajustar válvulas ou limpar carburador

❌ PROBLEMA: Perda de potência
✓ Verificar filtro de ar (entupido?)
✓ Testar vela (queimada?)
✓ Verificar óleo do motor (nível baixo?)
✓ Testar compressão (120+ psi)
→ Solução: Trocar filtro, vela ou limpar carburador

❌ PROBLEMA: Freios moles
✓ Verificar nível de fluido
✓ Sangrar freios
✓ Verificar pastilhas (desgastadas?)
✓ Testar cilindro mestre
→ Solução: Sangrar ou trocar pastilhas

❌ PROBLEMA: Corrente barulhenta
✓ Verificar folga (25-35mm)
✓ Lubrificar corrente
✓ Verificar desgaste
✓ Verificar alinhamento
→ Solução: Ajustar ou trocar corrente

❌ PROBLEMA: Vazamento de óleo
✓ Verificar bujão de drenagem
✓ Verificar juntas do motor
✓ Verificar retém de comando
→ Solução: Apertar bujão ou trocar juntas

❌ PROBLEMA: Bateria descarrega rápido
✓ Testar alternador (14.5V a 5k RPM)
✓ Verificar bateria (teste de carga)
✓ Verificar correntes parasitas
→ Solução: Trocar bateria ou alternador`
      }
    ]
  },
  'h-cg-160': {
    model: 'Honda CG 160 Titan/Fan/Start',
    year: '2016-2024',
    cc: '160cc',
    sections: [
      {
        id: 'especificacoes-gerais',
        title: '📋 Especificações Gerais',
        content: `HONDA CG 160 - ESPECIFICAÇÕES COMPLETAS

🔧 MOTOR:
- Tipo: Monocilindro 4 tempos, refrigerado a ar
- Cilindrada: 162.7 cc
- Potência: 13.5 cv @ 8.000 RPM
- Torque: 1.54 kgf.m @ 6.000 RPM
- Diâmetro x Curso: 58.0 x 61.0 mm
- Taxa de Compressão: 9.7:1
- Comando de Válvulas: SOHC
- Válvulas: 2 (admissão e escape)
- Ignição: CDI
- Sistema de Partida: Elétrico

⛽ COMBUSTÍVEL:
- Tipo: Gasolina comum (sem chumbo)
- Octanagem Mínima: 87 RON
- Tanque: 5.5 litros
- Consumo Urbano: 52 km/l
- Consumo Rodovia: 58 km/l
- Autonomia Teórica: 286 km

🛢️ ÓLEOS E FLUIDOS:
- Óleo do Motor: SAE 10W-30 (SL/JASO MA2)
- Capacidade (sem troca filtro): 1.0 litro
- Capacidade (com troca filtro): 1.1 litro
- Óleo Câmbio: SAE 90 (1.0 litro)
- Fluido Freio: DOT 3 (0.3 litro)

🔋 SISTEMA ELÉTRICO:
- Bateria: 12V - 5Ah
- Alternador: 12V - 200W
- Fusível Principal: 20A
- Vela de Ignição: NGK BR8ECM
- Lâmpada Farol: 35/35W (H4)
- Lâmpada Traseira: 5W

🏍️ DIMENSÕES E PESO:
- Comprimento: 1.930 mm
- Largura: 750 mm
- Altura: 1.120 mm
- Distância entre Eixos: 1.305 mm
- Altura do Assento: 790 mm
- Peso Seco: 120 kg
- Peso Bruto: 175 kg

⚙️ TRANSMISSÃO:
- Tipo: Manual com 4 velocidades
- Embreagem: Seca, centrífuga
- Corrente Primária: Correia de borracha
- Corrente Secundária: Corrente 415H
- Redução Final: 3.5:1

🛞 PNEUS:
- Dianteiro: 2.75-17 ou 3.00-17 (Pressão: 1.5 bar / 22 psi)
- Traseiro: 3.00-17 ou 3.25-17 (Pressão: 1.8 bar / 26 psi)

🛑 FREIOS:
- Dianteiro: Disco (190mm)
- Traseiro: Tambor (110mm)
- Sistema: Combi Brake

🔧 TORQUES PRINCIPAIS (N.m):
- Cabeçote: 12 N.m
- Bujão Óleo: 25 N.m
- Eixo Dianteiro: 60 N.m
- Eixo Traseiro: 90 N.m
- Parafuso Roda: 60 N.m

📊 DESEMPENHO:
- Velocidade Máxima: 150 km/h
- Aceleração 0-100: ~12 segundos
- Consumo Médio: 55 km/l
- Intervalo Troca Óleo: 6.000 km`
      },
      {
        id: 'pecas-oem',
        title: '🔧 Peças OEM Originais',
        content: `PEÇAS DE REPOSIÇÃO ORIGINAIS - HONDA CG 160

MOTOR:
- Jogo Anéis Pistão: 13010-KZZ-901
- Pistão Completo: 13100-KZZ-901
- Filtro Óleo: 15400-KZZ-901
- Vela Ignição: BR8ECM (NGK)
- Óleo Motor SAE 10W-30: 08207-9957 (1L)

SISTEMA ELÉTRICO:
- Alternador: 31100-KZZ-901
- Bobina Ignição: 30500-KZZ-901
- Bateria 12V 5Ah: YTX5L-BS
- Regulador Voltagem: 32100-KZZ-901

TRANSMISSÃO:
- Correia Primária: 23121-KZZ-901
- Corrente Secundária: 23421-KZZ-901
- Óleo Câmbio SAE 90: 08200-9013 (1.0L)

FREIOS:
- Pastilhas Dianteiras: 06435-KZZ-901
- Pastilhas Traseiras: 06450-KZZ-901
- Fluido Freio DOT 3: 08201-9008 (0.5L)

PNEUS:
- Pneu Dianteiro 2.75-17: Pirelli/Michelin
- Pneu Traseiro 3.00-17: Pirelli/Michelin

CARBURADOR:
- Carburador Completo: 16100-KZZ-901
- Jogo Juntas: 16110-KZZ-901`
      },
      {
        id: 'procedimentos-reparo',
        title: '🔨 Procedimentos de Reparo',
        content: `PROCEDIMENTOS - HONDA CG 160

1️⃣ TROCA DE ÓLEO (A CADA 6.000 KM):
1. Aquecer motor por 2-3 minutos
2. Remover bujão de drenagem
3. Deixar drenar por 5 minutos
4. Remover filtro de óleo
5. Instalar novo filtro (apertar 3/4 volta)
6. Adicionar 1.1L de óleo novo
7. Verificar nível com moto em pé
8. Testar motor

Tempo: 15-20 minutos

2️⃣ LIMPEZA DE CARBURADOR:
1. Drenar combustível
2. Remover 4 parafusos da cuba
3. Remover cuba
4. Limpar com querosene
5. Soprar com ar comprimido
6. Remontar na ordem inversa
7. Ajustar marcha lenta (1.5 voltas)
8. Testar motor

Tempo: 30-45 minutos

3️⃣ AJUSTE DE FOLGA DE VÁLVULAS:
1. Aquecer motor por 5 minutos
2. Desligar e aguardar esfriar
3. Remover tampa de válvulas
4. Posicionar pistão em PMS
5. Ajustar válvula de admissão (0.05mm)
6. Ajustar válvula de escape (0.10mm)
7. Reinstalar tampa
8. Testar motor

Tempo: 20-30 minutos`
      },
      {
        id: 'diagnostico',
        title: '🔍 Diagnóstico de Problemas',
        content: `DIAGNÓSTICO - HONDA CG 160

❌ PROBLEMA: Moto não liga
✓ Verificar bateria (12V mínimo)
✓ Testar fusível principal (20A)
✓ Verificar contato de massa
✓ Testar relé de partida
→ Solução: Trocar bateria ou relé

❌ PROBLEMA: Marcha lenta instável
✓ Verificar folga de válvulas
✓ Limpar carburador
✓ Verificar vela
✓ Testar corrente de distribuição
→ Solução: Ajustar válvulas ou limpar carburador

❌ PROBLEMA: Perda de potência
✓ Verificar filtro de ar (entupido?)
✓ Testar vela (queimada?)
✓ Verificar óleo do motor (nível baixo?)
✓ Testar compressão (120+ psi)
→ Solução: Trocar filtro, vela ou limpar carburador

❌ PROBLEMA: Freios moles
✓ Verificar nível de fluido
✓ Sangrar freios
✓ Verificar pastilhas (desgastadas?)
✓ Testar cilindro mestre
→ Solução: Sangrar ou trocar pastilhas

❌ PROBLEMA: Corrente barulhenta
✓ Verificar folga (25-35mm)
✓ Lubrificar corrente
✓ Verificar desgaste
✓ Verificar alinhamento
→ Solução: Ajustar ou trocar corrente

❌ PROBLEMA: Vazamento de óleo
✓ Verificar bujão de drenagem
✓ Verificar juntas do motor
✓ Verificar retém de comando
→ Solução: Apertar bujão ou trocar juntas

❌ PROBLEMA: Bateria descarrega rápido
✓ Testar alternador (14.5V a 5k RPM)
✓ Verificar bateria (teste de carga)
✓ Verificar correntes parasitas
→ Solução: Trocar bateria ou alternador`
      }
    ]
  }
};
