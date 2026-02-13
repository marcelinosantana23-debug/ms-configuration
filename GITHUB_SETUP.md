# 📚 Guia Passo a Passo: GitHub + Vercel

## Parte 1: Criar Conta GitHub (Se não tiver)

### Passo 1.1: Acessar GitHub
1. Abra seu navegador
2. Acesse https://github.com
3. Clique em **"Sign up"** (canto superior direito)

### Passo 1.2: Preencher Dados
1. **Email**: Digite seu email
2. **Senha**: Crie uma senha forte
3. **Username**: Escolha um nome de usuário (ex: `seu-nome`)
4. Clique em **"Create account"**

### Passo 1.3: Confirmar Email
1. Abra seu email
2. Clique no link de confirmação do GitHub
3. Pronto! Conta criada ✅

---

## Parte 2: Criar Repositório no GitHub

### Passo 2.1: Novo Repositório
1. Acesse https://github.com/new
2. Ou clique no ícone **"+"** (canto superior direito) → **"New repository"**

### Passo 2.2: Configurar Repositório
Preencha os campos:

| Campo | Valor |
|-------|-------|
| **Repository name** | `ms-configuration` |
| **Description** | `Catálogo técnico de motos com notificações` |
| **Public/Private** | Selecione **"Public"** |
| **Add .gitignore** | Selecione **"Node"** |
| **Add a license** | Selecione **"MIT License"** |

### Passo 2.3: Criar Repositório
Clique em **"Create repository"** (botão verde)

✅ **Repositório criado!** Você verá uma página com instruções.

---

## Parte 3: Preparar Seu Computador

### Passo 3.1: Instalar Git
Se ainda não tiver Git instalado:

**Windows:**
1. Acesse https://git-scm.com/download/win
2. Baixe e instale (deixe tudo padrão)
3. Reinicie o computador

**Mac:**
1. Abra Terminal
2. Digite: `brew install git`

**Linux:**
```bash
sudo apt-get install git
```

### Passo 3.2: Configurar Git
Abra **Terminal** (Mac/Linux) ou **Git Bash** (Windows) e digite:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@gmail.com"
```

**Exemplo:**
```bash
git config --global user.name "João Silva"
git config --global user.email "joao@gmail.com"
```

---

## Parte 4: Fazer Upload do Projeto

### Passo 4.1: Abrir Terminal/Git Bash
- **Windows**: Clique com botão direito na pasta do projeto → **"Git Bash Here"**
- **Mac/Linux**: Abra Terminal e navegue até a pasta

### Passo 4.2: Navegar até a Pasta
```bash
cd /caminho/para/app-manual-moto
```

**Exemplo Windows:**
```bash
cd C:\Users\SeuUsuario\Downloads\app-manual-moto
```

**Exemplo Mac:**
```bash
cd ~/Downloads/app-manual-moto
```

### Passo 4.3: Inicializar Git (Se ainda não estiver)
```bash
git init
```

### Passo 4.4: Adicionar Todos os Arquivos
```bash
git add .
```

### Passo 4.5: Fazer Commit
```bash
git commit -m "Initial commit - MS-Configuration ready for production"
```

### Passo 4.6: Renomear Branch para Main
```bash
git branch -M main
```

### Passo 4.7: Adicionar Remote do GitHub
Volte à página do seu repositório no GitHub e copie o comando que aparece. Será algo como:

```bash
git remote add origin https://github.com/SEU_USUARIO/ms-configuration.git
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub!**

### Passo 4.8: Fazer Push (Enviar para GitHub)
```bash
git push -u origin main
```

**Primeira vez:** Pode pedir seu usuário e senha do GitHub
- **Username**: Seu nome de usuário do GitHub
- **Password**: Seu token (veja Passo 4.9)

### Passo 4.9: Criar Token (Se Pedir)
Se pedir "password" em vez de aceitar sua senha:

1. Acesse https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Preencha:
   - **Note**: `Git Push Token`
   - **Expiration**: `90 days`
   - **Scopes**: Marque `repo` (completo)
4. Clique em **"Generate token"**
5. **Copie o token** (aparece uma única vez!)
6. Use esse token como "password" no Git

✅ **Projeto enviado para GitHub!**

---

## Parte 5: Verificar no GitHub

### Passo 5.1: Confirmar Upload
1. Acesse seu repositório: `https://github.com/SEU_USUARIO/ms-configuration`
2. Você deve ver:
   - ✅ Pasta `dist/`
   - ✅ Arquivo `package.json`
   - ✅ Arquivo `vercel.json`
   - ✅ Arquivo `DEPLOY_GUIDE.md`
   - ✅ Arquivo `README_PRODUCAO.md`

---

## Parte 6: Deploy no Vercel

### Passo 6.1: Acessar Vercel
1. Abra https://vercel.com
2. Clique em **"Sign Up"** (se não tiver conta)
3. Clique em **"Continue with GitHub"**
4. Autorize Vercel a acessar seus repositórios

### Passo 6.2: Novo Projeto
1. Clique em **"Add New..."** → **"Project"**
2. Clique em **"Import Git Repository"**

### Passo 6.3: Selecionar Repositório
1. Procure por `ms-configuration`
2. Clique em **"Import"**

### Passo 6.4: Configurar Projeto
1. **Project Name**: `ms-configuration` (ou outro nome)
2. **Framework Preset**: Deixe em branco (Vite será detectado)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Environment Variables**: (deixe em branco por enquanto)

### Passo 6.5: Deploy
Clique em **"Deploy"**

⏳ **Aguarde 2-3 minutos...**

✅ **Seu app está online!**

---

## Resultado Final

Você receberá um link como:
```
https://ms-configuration.vercel.app
```

**Compartilhe este link com seus clientes!** 🎉

---

## Próximas Atualizações

Sempre que quiser fazer mudanças:

```bash
# 1. Fazer mudanças no código
# 2. Adicionar mudanças
git add .

# 3. Fazer commit
git commit -m "Descrição das mudanças"

# 4. Enviar para GitHub
git push origin main
```

**Vercel fará deploy automático!** ✅

---

## Troubleshooting

### Erro: "fatal: not a git repository"
```bash
git init
```

### Erro: "Permission denied"
Você pode precisar gerar um token (Passo 4.9)

### Erro: "Repository not found"
Verifique se o comando `git remote add origin` está correto

### Vercel não encontra o repositório
1. Vá em https://vercel.com/account/connected-services
2. Reconecte sua conta GitHub

---

## Dúvidas?

- **GitHub Help**: https://docs.github.com
- **Vercel Docs**: https://vercel.com/docs
- **Git Tutorial**: https://git-scm.com/book/pt-BR/v2

**Você consegue! Qualquer dúvida, tente novamente.** 💪
