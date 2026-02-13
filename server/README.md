# MS-Configuration Backend

Backend para o aplicativo MS-Configuration: Manual de Moto para Mecânicos.

## Tecnologias

- **Node.js** com Express
- **TypeScript** para type safety
- **PostgreSQL** como banco de dados
- **Drizzle ORM** para gerenciamento de banco de dados
- **JWT** para autenticação
- **bcryptjs** para hash de senhas

## Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

### Passos

1. **Instalar dependências**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente**
   ```bash
   cp .env.example .env
   ```
   
   Editar `.env` com suas configurações:
   ```
   DATABASE_URL=postgresql://user:password@localhost:5432/ms_configuration
   JWT_SECRET=sua-chave-secreta-aqui
   PORT=3000
   NODE_ENV=development
   ```

3. **Criar banco de dados**
   ```bash
   createdb ms_configuration
   ```

4. **Executar migrações**
   ```bash
   npm run db:push
   ```

5. **Iniciar servidor em desenvolvimento**
   ```bash
   npm run dev
   ```

O servidor estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
server/
├── src/
│   ├── db/
│   │   ├── index.ts          # Configuração do banco de dados
│   │   └── schema.ts         # Schema do banco de dados
│   ├── middleware/
│   │   └── auth.ts           # Middleware de autenticação
│   ├── routes/
│   │   ├── auth.ts           # Rotas de autenticação
│   │   ├── manuals.ts        # Rotas de manuais
│   │   ├── services.ts       # Rotas de serviços
│   │   └── admin.ts          # Rotas de administração
│   ├── types/
│   │   └── index.ts          # Tipos TypeScript
│   ├── utils/
│   │   └── auth.ts           # Utilitários de autenticação
│   └── index.ts              # Arquivo principal
├── migrations/               # Migrações do banco de dados
├── package.json
├── tsconfig.json
├── drizzle.config.ts
└── README.md
```

## API Endpoints

### Autenticação

- **POST** `/api/auth/login` - Fazer login com ID de cliente
- **POST** `/api/auth/logout` - Fazer logout
- **GET** `/api/auth/me` - Obter dados do cliente autenticado
- **PUT** `/api/auth/me` - Atualizar dados do cliente

### Manuais

- **GET** `/api/manuals` - Listar todos os manuais
- **GET** `/api/manuals/:id` - Obter manual específico
- **GET** `/api/manuals/brand/:brand` - Listar manuais por marca
- **POST** `/api/manuals` - Criar novo manual (requer autenticação)
- **PUT** `/api/manuals/:id` - Atualizar manual (requer autenticação)
- **DELETE** `/api/manuals/:id` - Deletar manual (requer autenticação)

### Serviços

- **GET** `/api/services` - Listar serviços do cliente
- **GET** `/api/services/:id` - Obter serviço específico
- **POST** `/api/services` - Criar novo serviço
- **PUT** `/api/services/:id` - Atualizar serviço
- **DELETE** `/api/services/:id` - Deletar serviço
- **GET** `/api/services/stats/monthly` - Obter estatísticas mensais

### Administração

- **GET** `/api/admin/clients` - Listar clientes
- **POST** `/api/admin/clients` - Criar novo cliente
- **GET** `/api/admin/clients/:id` - Obter detalhes do cliente
- **PUT** `/api/admin/clients/:id` - Atualizar cliente
- **DELETE** `/api/admin/clients/:id` - Desativar cliente
- **POST** `/api/admin/clients/:id/reactivate` - Reativar cliente
- **PUT** `/api/admin/settings` - Atualizar configurações do admin
- **GET** `/api/admin/stats` - Obter estatísticas gerais

## Autenticação

O sistema utiliza JWT (JSON Web Tokens) para autenticação. Cada cliente recebe um ID único que não pode ser compartilhado.

### Fluxo de Login

1. Cliente faz login com seu ID único
2. Sistema valida o ID e o fingerprint do dispositivo
3. Se válido, retorna um token JWT
4. Cliente usa o token em requisições subsequentes

### Headers de Autenticação

```
Authorization: Bearer <token>
```

## Segurança

- Senhas são hasheadas com bcryptjs
- IDs de cliente são únicos e não compartilháveis
- Fingerprint de dispositivo para validação adicional
- JWT tokens com expiração de 7 dias
- CORS configurado para domínios específicos
- Validação de entrada em todas as rotas

## Desenvolvimento

### Scripts Disponíveis

```bash
# Iniciar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Gerenciar banco de dados
npm run db:push      # Aplicar migrações
npm run db:migrate   # Executar migrações
npm run db:studio    # Abrir Drizzle Studio
```

### Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| DATABASE_URL | URL de conexão PostgreSQL | postgresql://postgres:postgres@localhost:5432/ms_configuration |
| JWT_SECRET | Chave secreta para JWT | your-secret-key-change-in-production |
| PORT | Porta do servidor | 3000 |
| NODE_ENV | Ambiente (development/production) | development |
| CORS_ORIGIN | Origens CORS permitidas | http://localhost:3001,http://localhost:5173 |

## Tratamento de Erros

Todas as respostas seguem o formato:

```json
{
  "success": true/false,
  "data": {},
  "error": "mensagem de erro",
  "message": "mensagem de sucesso"
}
```

## Logging

O servidor registra todas as requisições com timestamp, método, rota, status e duração.

## Deployment

Para fazer deploy em produção:

1. Configurar variáveis de ambiente
2. Executar migrações do banco de dados
3. Build da aplicação: `npm run build`
4. Iniciar servidor: `npm start`

Recomenda-se usar um gerenciador de processos como PM2 ou Docker.

## Suporte

Para reportar bugs ou sugerir melhorias, abra uma issue no repositório.
