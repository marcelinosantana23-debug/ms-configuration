// Seções expandidas com Peças de Reposição, Procedimentos Avançados e Diagnóstico

export const EXPANDED_SECTIONS = (model: string, cc: string, brand: string) => [
  { 
    id: 'motor', 
    title: 'Motor & Injeção', 
    content: `ESPECIFICAÇÕES: ${model} (${cc})\n\n- Óleo: SAE 10W30 ou 20W50 (conforme manual). Troca: 1.0L.\n- Filtro: Limpeza de peneira interna e filtro centrífugo em modelos CG/Biz.\n- Injeção: Reset via jumper no conector DLC (fio azul e verde/preto).\n- Carbonização: Limpeza de válvula de admissão comum em 50cc.` 
  },
  { 
    id: 'pecas-reposicao', 
    title: '🔧 Peças de Reposição', 
    content: `CÓDIGOS OEM PRINCIPAIS - ${brand} ${model}:\n\n📌 MOTOR:\n- Jogo Anéis Pistão: ${brand === 'Honda' ? '13010-KZZ-901' : 'Consultar manual'}\n- Corrente Distribuição: ${brand === 'Honda' ? '14400-KZZ-901' : 'Consultar manual'}\n- Jogo Juntas Motor: ${brand === 'Honda' ? '06110-KZZ-901' : 'Consultar manual'}\n- Filtro Óleo: ${brand === 'Honda' ? '15400-KZZ-901' : 'Consultar manual'}\n\n⚡ ELÉTRICO:\n- Alternador: ${brand === 'Honda' ? '31100-KZZ-901' : 'Consultar manual'}\n- Bobina Ignição: ${brand === 'Honda' ? '30500-KZZ-901' : 'Consultar manual'}\n- Bateria 12V: ${brand === 'Honda' ? 'YTX7L-BS' : 'Consultar manual'}\n- Vela NGK: ${brand === 'Honda' ? 'BR8ECM' : 'Consultar manual'}\n\n🛞 TRANSMISSÃO:\n- Corrente Primária: ${brand === 'Honda' ? '23121-KZZ-901' : 'Consultar manual'}\n- Corrente Secundária: ${brand === 'Honda' ? '23421-KZZ-901' : 'Consultar manual'}\n- Óleo Câmbio: SAE 90 (1.2L)\n\n🛑 FREIOS:\n- Pastilhas Dianteiras: ${brand === 'Honda' ? '06435-KZZ-901' : 'Consultar manual'}\n- Pastilhas Traseiras: ${brand === 'Honda' ? '06450-KZZ-901' : 'Consultar manual'}\n- Fluido Freio: DOT 4 (0.5L)\n\n🛞 PNEUS:\n- Dianteiro: ${cc === '50cc' ? '2.50-17' : cc === '125cc' ? '2.75-17' : '3.00-18'} (Pressão: ${cc === '50cc' ? '1.5 bar' : '1.8 bar'})\n- Traseiro: ${cc === '50cc' ? '2.75-17' : cc === '125cc' ? '3.00-17' : '3.50-18'} (Pressão: ${cc === '50cc' ? '1.8 bar' : '2.0 bar'})\n\n💧 FLUIDOS:\n- Óleo Motor: SAE 10W-30 (1.0L)\n- Óleo Câmbio: SAE 90 (1.2L)\n- Fluido Freio: DOT 4 (0.5L)\n- Refrigerante: 50% água destilada + 50% etileno glicol (1.5L)\n\n⚙️ FILTROS:\n- Filtro Óleo: Troca a cada 1.000km\n- Filtro Ar: Limpeza a cada 500km, troca a cada 5.000km\n- Vela: Troca a cada 5.000km\n\n📍 FORNECEDORES:\n- Peças Originais: Concessionárias ${brand}\n- Alternativas: Importadoras especializadas (verificar compatibilidade)\n- Genéricas: Cuidado com qualidade inferior` 
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
    id: 'procedimentos-avancados', 
    title: '🔨 Procedimentos de Reparo Avançado', 
    content: `PROCEDIMENTOS PASSO A PASSO:\n\n1️⃣ LIMPEZA DE CARBURADOR:\n   - Drenar combustível\n   - Remover 4 parafusos (Phillips)\n   - Desmontar cuba e agulha\n   - Limpar com querosene (não usar gasolina)\n   - Soprar com ar comprimido (máx 3 bar)\n   - Remontar na ordem inversa\n   - Testar marcha lenta\n\n2️⃣ TROCA DE CORRENTE:\n   - Remover protetor lateral\n   - Soltar tensor (parafuso de 10mm)\n   - Remover corrente antiga\n   - Limpar correntes com escova\n   - Instalar corrente nova com folga 25-35mm\n   - Ajustar tensor\n   - Verificar alinhamento com roda traseira\n\n3️⃣ SANGRIA DE FREIOS:\n   - Remover tampa do cilindro mestre\n   - Conectar mangueira em cilindro escravo\n   - Bombear manete 10-15 vezes\n   - Fechar válvula de sangria\n   - Repetir até sair ar\n   - Verificar nível de fluido\n\n4️⃣ AJUSTE DE EMBREAGEM:\n   - Afrouxar porca de travamento\n   - Girar parafuso de ajuste até resistência\n   - Voltar 1/4 de volta\n   - Apertar porca de travamento\n   - Testar folga no manete (10-20mm)\n\n5️⃣ LIMPEZA DE VELA:\n   - Remover cobertura\n   - Desconectar cabo\n   - Remover vela com chave de 21mm\n   - Limpar com escova de aço\n   - Verificar gap (0.6-0.7mm)\n   - Reinstalar e apertar com torque de 15 N.m\n\n6️⃣ TROCA DE ÓLEO:\n   - Aquecer motor por 2 minutos\n   - Remover bujão de drenagem\n   - Deixar drenar por 5 minutos\n   - Remover filtro (girar no sentido anti-horário)\n   - Instalar novo filtro (apertar 3/4 de volta após contato)\n   - Adicionar óleo novo\n   - Verificar nível com moto em pé\n\n7️⃣ REGULAGEM DE VÁLVULAS:\n   - Posicionar pistão em PMS (ponto morto superior)\n   - Afrouxar parafusos de fixação do comando\n   - Inserir calibrador de 0.05mm na válvula de admissão\n   - Girar comando até resistência\n   - Apertar parafuso de fixação\n   - Repetir para válvula de escape (0.10mm)\n   - Verificar com motor frio\n\n8️⃣ SUBSTITUIÇÃO DE PNEU:\n   - Remover roda (parafusos de 17mm)\n   - Desmontar pneu com desmontadora\n   - Verificar câmara interna\n   - Instalar novo pneu\n   - Balancear roda\n   - Reinstalar com torque de 60 N.m (dianteiro) / 90 N.m (traseiro)\n   - Verificar pressão após 10km\n\n⚠️ DICAS IMPORTANTES:\n   - Sempre desconectar bateria antes de trabalhar\n   - Usar ferramenta correta para cada parafuso\n   - Não forçar componentes\n   - Testar tudo antes de rodar\n   - Guardar parafusos em ordem` 
  },
  { 
    id: 'diagnostico-problemas', 
    title: '🔍 Diagnóstico de Problemas', 
    content: `GUIA RÁPIDO DE DIAGNÓSTICO:\n\n❌ PROBLEMA: Moto não liga\n   ✓ Verificar bateria (voltímetro: 12V mínimo)\n   ✓ Testar fusível principal\n   ✓ Verificar contato de massa\n   ✓ Testar relé de partida\n   ✓ Verificar chave de ignição\n   → Solução: Trocar bateria ou relé\n\n❌ PROBLEMA: Marcha lenta instável\n   ✓ Verificar folga de válvulas\n   ✓ Limpar carburador\n   ✓ Verificar vela\n   ✓ Testar corrente de distribuição\n   ✓ Verificar vácuo do motor\n   → Solução: Ajustar válvulas ou limpar carburador\n\n❌ PROBLEMA: Perda de potência\n   ✓ Verificar filtro de ar (entupido?)\n   ✓ Testar vela (queimada?)\n   ✓ Verificar óleo do motor (nível baixo?)\n   ✓ Testar compressão (120+ psi)\n   ✓ Verificar carburador (jato entupido?)\n   → Solução: Trocar filtro, vela ou limpar carburador\n\n❌ PROBLEMA: Freios moles\n   ✓ Verificar nível de fluido\n   ✓ Sangrar freios\n   ✓ Verificar pastilhas (desgastadas?)\n   ✓ Testar cilindro mestre\n   ✓ Verificar mangueiras (rachadas?)\n   → Solução: Sangrar ou trocar pastilhas\n\n❌ PROBLEMA: Corrente barulhenta\n   ✓ Verificar folga (25-35mm)\n   ✓ Lubrificar corrente\n   ✓ Verificar desgaste de correntes\n   ✓ Verificar alinhamento de rodas\n   → Solução: Ajustar ou trocar corrente\n\n❌ PROBLEMA: Vazamento de óleo\n   ✓ Verificar bujão de drenagem\n   ✓ Verificar juntas do motor\n   ✓ Verificar retém de comando\n   ✓ Verificar junta do cilindro\n   → Solução: Apertar bujão ou trocar juntas\n\n❌ PROBLEMA: Superaquecimento\n   ✓ Verificar nível de refrigerante\n   ✓ Verificar radiador (entupido?)\n   ✓ Verificar termostato\n   ✓ Verificar ventilador\n   ✓ Verificar correia de distribuição\n   → Solução: Limpar radiador ou trocar termostato\n\n❌ PROBLEMA: Bateria descarrega rápido\n   ✓ Testar alternador (14.5V a 5k RPM)\n   ✓ Verificar bateria (teste de carga)\n   ✓ Verificar correntes parasitas\n   ✓ Verificar regulador de voltagem\n   → Solução: Trocar bateria ou alternador\n\n❌ PROBLEMA: Pneu furado\n   ✓ Verificar se é furo ou vazamento de válvula\n   ✓ Usar selante temporário\n   ✓ Verificar pressão regularmente\n   ✓ Procurar espinho/prego\n   → Solução: Reparar câmara ou trocar pneu\n\n❌ PROBLEMA: Embreagem patina\n   ✓ Verificar nível de óleo\n   ✓ Ajustar folga de embreagem\n   ✓ Verificar discos de embreagem\n   ✓ Verificar mola de retorno\n   → Solução: Ajustar ou trocar discos\n\n📞 QUANDO PROCURAR OFICINA:\n   - Problemas elétricos complexos\n   - Vazamento de óleo no motor\n   - Barulhos estranhos no motor\n   - Problemas de compressão\n   - Falhas intermitentes` 
  },
  { 
    id: 'manutencao', 
    title: 'Manutenção', 
    content: `- Velas: Trocar a cada 12.000km.\n- Filtro de Ar: Trocar a cada 8.000km.\n- Corrente: Lubrificar a cada 500km.` 
  },
];
