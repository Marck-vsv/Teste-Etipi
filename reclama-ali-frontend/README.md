# Reclama Ali - Frontend

Este é o frontend do projeto **Reclama Ali**, uma plataforma para registro e visualização de reclamações de usuários. A aplicação foi desenvolvida com Next.js e TypeScript, seguindo uma arquitetura moderna e escalável.

## Índice

- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Recursos Implementados](#recursos-implementados)
- [Tecnologias e Bibliotecas](#tecnologias-e-bibliotecas)
- [Setup e Instalação](#setup-e-instalação)
- [Estrutura de Diretórios](#estrutura-de-diretórios)

---

## Visão Geral da Arquitetura

A principal decisão arquitetural deste projeto foi a adoção de uma **Arquitetura Baseada em Features (Feature-Based Architecture)**.

### O que é?

Em vez de organizar o código por tipo de arquivo (ex: uma pasta para todos os componentes, outra para todos os serviços), nós organizamos o código por funcionalidade de negócio. Cada "feature" (como `auth` ou `complaints`) é um módulo autocontido que possui seus próprios componentes, serviços, hooks e schemas.

### Por que essa abordagem?

- **Escalabilidade:** Adicionar uma nova funcionalidade (ex: "perfil do usuário") é tão simples quanto criar um novo diretório em `src/features`. O impacto no código existente é mínimo.
- **Manutenibilidade:** Quando um bug precisa ser corrigido ou uma funcionalidade alterada, todos os arquivos relevantes estão no mesmo lugar, facilitando a localização e a modificação do código.
- **Co-localização:** A lógica de uma feature está co-localizada, o que torna o código mais fácil de entender e raciocinar sobre.
- **Autonomia:** Em um cenário de equipe, diferentes desenvolvedores podem trabalhar em features distintas com menor risco de conflitos.

As features se comunicam com o resto da aplicação de forma controlada, principalmente através de **Provedores de Contexto** (como o `AuthProvider`) e do sistema de **Roteamento** do Next.js.

---

## Recursos Implementados

### Autenticação
- Cadastro de novos usuários (`Sign Up`).
- Login de usuários existentes (`Sign In`).
- Validação de formulários em tempo real com Zod.
- Feedback ao usuário com toasts (notificações) para sucesso e erro.

### Gestão de Reclamações (a ser implementado na UI)
- **Criação (Create):** Endpoint e lógica para criar novas reclamações.
- **Leitura (Read):** Endpoints para buscar a lista de reclamações e os detalhes de uma reclamação específica.
- **Atualização (Update):**
    - Endpoint para atualizar o conteúdo (título/descrição) de uma reclamação.
    - Endpoint dedicado para atualizar apenas o **status** da reclamação.
- **Exclusão (Delete):** Endpoint para remover uma reclamação.

---

## Tecnologias e Bibliotecas

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Estado do Servidor:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Validação de Schemas:** [Zod](https://zod.dev/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Notificações (Toasts):** [Sonner](https://sonner.emilkowal.ski/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)

---

## Setup e Instalação

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [pnpm](https://pnpm.io/installation) (ou outro gerenciador de pacotes como npm ou yarn)

### 1. Clonar o Repositório

```bash
git clone https://github.com/Marck-vsv/Teste-Etipi.git
cd reclama-ali-frontend
```

### 2. Instalar as Dependências

Recomenda-se o uso do `pnpm` para garantir que as versões das dependências sejam as mesmas do arquivo `pnpm-lock.yaml`.

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto. Este arquivo armazenará a URL da sua API de backend.

```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```
*Substitua `http://localhost:8080` pela URL correta do seu backend, se for diferente.*

### 4. Rodar o Servidor de Desenvolvimento

Após a instalação e configuração, inicie o servidor de desenvolvimento:

```bash
pnpm dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## Estrutura de Diretórios

```
src/
├── app/                # Rotas e Layouts (Next.js App Router)
│   ├── (auth)/         # Grupo de rotas para autenticação
│   ├── (private)/      # Grupo de rotas protegidas
│   └── layout.tsx      # Layout raiz da aplicação
│
├── components/
│   └── ui/             # Componentes de UI genéricos e reutilizáveis (Button, Card, etc.)
│
├── features/           # Coração da arquitetura, cada pasta é uma feature
│   ├── auth/           # Feature de Autenticação
│   └── complaints/     # Feature de Reclamações
│       ├── components/ # Componentes React específicos da feature
│       ├── constants/  # Constantes (ex: URLs de endpoints)
│       ├── mutations/  # Hooks de mutação (create, update, delete) do React Query
│       ├── queries/    # Hooks de query (read) do React Query
│       ├── schemas/    # Schemas de validação (Zod) e tipos
│       └── services/   # Funções que interagem com a API
│
├── lib/                # Código compartilhado que não pertence a nenhuma feature
│   └── api.ts          # Configuração da instância do Axios
│
├── providers/          # Provedores de Contexto React
│   ├── auth-provider.tsx # (A ser criado) Gerencia o estado de autenticação
│   └── react-query-provider.tsx
│
└── utils/              # Funções utilitárias genéricas
    └── validators.ts
```