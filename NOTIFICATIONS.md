# 🔔 Sistema de Notificações Push - MS-Configuration

## Visão Geral

O sistema de notificações push foi implementado para lembrar mecânicos sobre a manutenção preventiva de motos. As notificações são enviadas com base em:

- **Dias desde última manutenção** (intervalo em dias)
- **Quilometragem desde última manutenção** (intervalo em km)

## Funcionalidades

### 1. Rastreamento de Manutenção
- Registra data e quilometragem de cada manutenção realizada
- Calcula próxima manutenção automaticamente
- Suporta múltiplos tipos de manutenção:
  - Troca de óleo
  - Troca de filtro
  - Velas de ignição
  - Inspeção de freios
  - Manutenção de corrente
  - Inspeção de pneus
  - Verificação de líquido de arrefecimento
  - Verificação de bateria

### 2. Notificações Inteligentes
- **Notificação Urgente** (⚠️): Quando manutenção está vencida
- **Notificação Próxima** (🔴): Quando faltam 7 dias ou 500 km
- **Lembrete** (🟡): Notificações gerais de manutenção

### 3. Preferências Personalizáveis
- Ativar/desativar notificações
- Configurar intervalo de verificação (30 min, 1h, 4h, 24h)
- Definir quantos dias antes notificar (1-30 dias)
- Definir quantos km antes notificar (100-5000 km)

### 4. Histórico de Notificações
- Rastreia todas as notificações enviadas
- Evita duplicatas no mesmo dia
- Mantém últimas 100 notificações

## Como Usar

### Acessar Gerenciador de Notificações

1. **Login** com ID de cliente ou MASTER2025
2. Na tela inicial, clique no botão **🔔 Notificações**
3. Configure suas preferências

### Registrar Manutenção

1. Acesse **📋 Serviços** na tela inicial
2. Clique em **Adicionar Serviço**
3. Selecione a moto e tipo de manutenção
4. Insira a quilometragem atual
5. Clique em **Salvar**

### Receber Notificações

Após configurar:
1. O sistema verifica manutenção pendente automaticamente
2. Notificações aparecem quando próximas do vencimento
3. Clique na notificação para ir ao app

## Intervalos de Manutenção Padrão

| Tipo | KM | Dias | Descrição |
|------|-----|------|-----------|
| Troca de Óleo | 5.000 | 90 | Troca de óleo do motor |
| Troca de Filtro | 10.000 | 180 | Troca de filtro de ar e óleo |
| Velas | 15.000 | 365 | Inspeção e possível troca |
| Freios | 10.000 | 180 | Verificar desgaste |
| Corrente | 1.000 | 30 | Lubrificação e ajuste |
| Pneus | 5.000 | 60 | Verificar desgaste e pressão |
| Arrefecimento | 10.000 | 180 | Verificar nível |
| Bateria | 10.000 | 180 | Testar carga |

## Arquivos Principais

### `/push-notifications.ts`
Sistema de notificações push com:
- `requestNotificationPermission()` - Solicita permissão
- `sendPushNotification()` - Envia notificação
- `getNotificationPreferences()` - Obtém configurações
- `saveNotificationPreferences()` - Salva configurações
- `getNotificationHistory()` - Obtém histórico

### `/maintenance-tracker.ts`
Rastreamento de manutenção com:
- `MAINTENANCE_SCHEDULES` - Intervalos padrão
- `getNextMaintenanceDate()` - Calcula próxima data
- `getNextMaintenanceKm()` - Calcula próximo km
- `generateMaintenanceNotification()` - Gera mensagem
- `addMaintenanceRecord()` - Registra manutenção
- `getLastMaintenanceRecord()` - Obtém último registro

### `/components/NotificationManager.tsx`
Interface para gerenciar notificações:
- Toggle para ativar/desativar
- Configuração de intervalo
- Configuração de dias/km antes
- Botão de teste
- Informações sobre funcionamento

## Sincronização

As notificações são **sincronizadas entre dispositivos** via servidor:
- Configurações salvas no servidor
- Histórico sincronizado
- Mesmas preferências em PC e telefone

## Permissões Necessárias

O navegador solicitará permissão para:
- **Notificações Push**: Necessária para receber alertas
- **Service Worker**: Para notificações em background (opcional)

## Troubleshooting

### Notificações não aparecem
1. Verifique se permissão foi concedida
2. Verifique se notificações estão ativadas no gerenciador
3. Teste com o botão "🧪 Enviar Notificação de Teste"

### Notificações duplicadas
- O sistema evita automaticamente
- Verifica se notificação foi enviada no mesmo dia

### Histórico muito grande
- Mantém apenas últimas 100 notificações
- Limpar manualmente em Configurações

## Próximas Melhorias

- [ ] Integração com banco de dados para sincronização em tempo real
- [ ] Notificações por SMS ou WhatsApp
- [ ] Agendamento de manutenção automático
- [ ] Relatórios de manutenção por período
- [ ] Alertas de vencimento de documentos (IPVA, seguro)
- [ ] Integração com calendário do dispositivo

## Suporte

Para problemas ou sugestões, entre em contato via WhatsApp de suporte configurado no painel administrativo.
