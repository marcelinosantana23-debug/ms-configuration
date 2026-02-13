# TODO - MS-Configuration: Manual de Moto para Mecânicos

## Fase 1: Estrutura de Dados
- [x] Expandir data.ts com especificações técnicas completas para cada moto
- [x] Adicionar seções: óleo, válvulas, velas, corrente, pneus, fluido freio, torques, diagnóstico, peças
- [x] Criar estrutura de dados para manutenção e procedimentos

## Fase 2: Backend com Banco de Dados
- [ ] Configurar PostgreSQL e Drizzle ORM
- [ ] Criar schema de usuários, clientes, manuais, serviços
- [ ] Implementar autenticação JWT segura
- [ ] Criar sistema de IDs únicos por cliente (vinculado a dispositivo)
- [ ] Implementar hash de senhas com bcrypt
- [ ] Criar APIs RESTful para todas as funcionalidades

## Fase 3: Sistema de IDs Seguro
- [ ] Gerar IDs únicos e não compartilháveis
- [ ] Validar acesso por ID + fingerprint do dispositivo
- [ ] Implementar bloqueio de acesso quando cliente é deletado
- [ ] Criar logs de acesso para auditoria

## Fase 4: Painel de Controle (Admin)
- [ ] Criar interface para gerenciar clientes
- [ ] Implementar criar/editar/deletar IDs
- [ ] Adicionar controle de acesso por cliente
- [ ] Implementar bloqueio/desbloqueio de usuários
- [ ] Adicionar edição de WhatsApp de suporte
- [ ] Criar relatórios de uso

## Fase 5: Interface e UX
- [ ] Melhorar busca de manuais
- [ ] Adicionar filtros avançados
- [ ] Otimizar para uso em oficina (rápido, prático)
- [ ] Adicionar modo offline
- [ ] Melhorar visualização de tabelas de torques
- [ ] Incrementar ferramentas (calculadoras de torque, cilindrada, conversões)
- [ ] Melhorar gerenciador financeiro com motos em serviço
- [ ] Adicionar formas de pagamento
- [ ] Criar histórico completo por cliente
- [ ] Sincronizar histórico com banco de dados

## Fase 6: Segurança e Deploy
- [ ] Validar todas as entradas
- [ ] Implementar rate limiting
- [ ] Adicionar HTTPS/SSL
- [ ] Configurar variáveis de ambiente
- [ ] Preparar para deploy em produção
- [ ] Criar documentação de uso

## Dados a Expandir em Cada Moto

### Informações Básicas
- Marca e modelo
- Ano de fabricação
- Cilindrada
- Tipo de motor (4T, 2T, etc)
- Potência máxima
- Torque máximo
- Combustível recomendado

### Manutenção - Óleos
- Óleo do motor: tipo, viscosidade, capacidade, intervalo
- Óleo da transmissão: tipo, capacidade, intervalo
- Óleo do freio: tipo, capacidade

### Regulagens
- Válvulas: folga entrada/saída, procedimento
- Velas: tipo, gap, intervalo
- Corrente/Correia: folga, intervalo
- Embreagem: folga do cabo

### Consumíveis
- Filtro de ar: tipo, intervalo
- Filtro de óleo: tipo, intervalo
- Pneus: pressão, tamanho, tipo
- Fluido de freio: tipo, intervalo

### Capacidades
- Combustível
- Óleo motor
- Óleo transmissão
- Óleo freio
- Refrigerante (se aplicável)
- Fluido de embreagem

### Tabela de Torques
- Parafusos do cabeçote
- Parafusos da biela
- Parafusos da roda
- Parafusos do motor
- Parafusos críticos

### Procedimentos
- Troca de óleo
- Regulagem de válvulas
- Troca de velas
- Ajuste de corrente
- Troca de pneus
- Sangria de freio

### Diagnóstico
- Problemas comuns
- Sintomas
- Possíveis causas
- Soluções

### Peças de Reposição
- Códigos OEM
- Fornecedores
- Preços aproximados
