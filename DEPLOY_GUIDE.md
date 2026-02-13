# 🚀 Guia de Deploy - MS-Configuration

## Deploy em Vercel (Recomendado - 5 minutos)

### Passo 1: Preparar o Repositório Git
```bash
cd /home/ubuntu/app-manual-moto
git init
git add .
git commit -m "Initial commit - MS-Configuration ready for production"
git branch -M main
```

### Passo 2: Criar Repositório no GitHub
1. Acesse https://github.com/new
2. Crie um repositório chamado `ms-configuration`
3. Copie o comando para adicionar remote:
```bash
git remote add origin https://github.com/SEU_USUARIO/ms-configuration.git
git push -u origin main
```

### Passo 3: Deploy no Vercel
1. Acesse https://vercel.com
2. Clique em **"New Project"**
3. Selecione **"Import Git Repository"**
4. Cole a URL do seu repositório GitHub
5. Clique em **"Import"**
6. Configure as variáveis de ambiente:
   - `GEMINI_API_KEY`: (deixe em branco se não usar)
7. Clique em **"Deploy"**

✅ **Pronto!** Seu app estará disponível em `https://seu-projeto.vercel.app`

---

## Alternativa: Deploy em Netlify

### Passo 1-2: Mesmo do Vercel (Git)

### Passo 3: Deploy no Netlify
1. Acesse https://app.netlify.com
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Selecione GitHub
4. Escolha o repositório `ms-configuration`
5. Configurações:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Clique em **"Deploy site"**

✅ **Pronto!** Seu app estará disponível em `https://seu-projeto.netlify.app`

---

## Alternativa: Deploy em GitHub Pages

### Passo 1: Atualizar vite.config.ts
```typescript
export default defineConfig({
  base: '/ms-configuration/', // Se for subdomínio
  // ou
  base: '/', // Se for domínio próprio
  // ... resto da config
});
```

### Passo 2: Fazer Build
```bash
npm run build
```

### Passo 3: Fazer Push
```bash
git add .
git commit -m "Update for GitHub Pages"
git push origin main
```

### Passo 4: Ativar GitHub Pages
1. Acesse seu repositório no GitHub
2. Vá em **Settings** → **Pages**
3. Selecione **"Deploy from a branch"**
4. Branch: `main`, Pasta: `dist`
5. Clique em **"Save"**

✅ **Pronto!** Seu app estará disponível em `https://seu-usuario.github.io/ms-configuration`

---

## Variáveis de Ambiente

### Vercel
```
GEMINI_API_KEY=sua_chave_aqui
VITE_API_URL=https://seu-servidor.com
```

### .env.local (Local)
```
GEMINI_API_KEY=sua_chave_aqui
VITE_API_URL=http://localhost:3000
```

---

## Estrutura de Arquivos para Deploy

```
dist/
├── index.html          (Arquivo principal)
├── assets/
│   └── index-XXXXX.js  (Bundle JavaScript)
└── ...
```

O arquivo `vercel.json` já está configurado para:
- ✅ Fazer rewrite de rotas (SPA)
- ✅ Cache de assets
- ✅ Build automático

---

## Checklist Pré-Deploy

- [ ] Build sem erros: `npm run build`
- [ ] Testado localmente: `npm run dev`
- [ ] Repositório Git criado
- [ ] `.env.local` não foi commitado
- [ ] `vercel.json` está presente
- [ ] `.vercelignore` está presente

---

## Troubleshooting

### Erro: "Cannot find module"
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro: "Build failed"
Verifique se há erros TypeScript:
```bash
npx tsc --noEmit
```

### App não carrega rotas
Verifique se `vercel.json` tem a configuração de rewrite:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```

### Dados não sincronizam
Verifique se a URL do servidor está correta em:
- `App.tsx` (linhas com `https://3001-...`)
- `.env.local` (VITE_API_URL)

---

## Depois do Deploy

### Atualizar App
```bash
# Fazer mudanças
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

Vercel/Netlify fará deploy automático!

### Monitorar Performance
- **Vercel**: https://vercel.com/dashboard
- **Netlify**: https://app.netlify.com

### Adicionar Domínio Customizado
1. Vá em Project Settings
2. Clique em "Domains"
3. Adicione seu domínio
4. Siga instruções de DNS

---

## Suporte

Dúvidas? Consulte:
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Netlify](https://docs.netlify.com)
- [Documentação Vite](https://vitejs.dev)

Bom deploy! 🚀
