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

Minha principal decisão arquitetural para este projeto foi a adoção de uma **Arquitetura Orientada a Features (Feature-Driven Architecture)**. Esta abordagem difere da organização tradicional por tipo de arquivo, optando por agrupar o código com base em funcionalidades de negócio.

### Fundamentação da Escolha

Em vez de diretórios como `components`, `services` ou `hooks` globais, cada funcionalidade de negócio (`auth`, `complaints`) é tratada como um módulo autocontido. Isso significa que todos os componentes, hooks, schemas de validação, constantes e serviços de API relacionados a uma feature específica residem em seu próprio diretório (`src/features/[nome-da-feature]`).

### Benefícios Estratégicos

Esta escolha arquitetural oferece vantagens significativas:

-   **Escalabilidade e Manutenibilidade:** A adição de novas funcionalidades (e.g., um módulo de `perfil-do-usuário`) torna-se um processo isolado, minimizando o impacto no código existente. Isso facilita a expansão do projeto e a correção de bugs, pois todas as partes relevantes de uma funcionalidade estão co-localizadas.
-   **Clareza e Co-localização:** A lógica de negócio de cada feature é encapsulada, tornando o código mais intuitivo de entender e raciocinar sobre. Desenvolvedores podem focar em uma funcionalidade sem se perder em uma estrutura de diretórios dispersa.
-   **Autonomia da Equipe:** Em ambientes de desenvolvimento colaborativos, essa estrutura permite que diferentes membros da equipe trabalhem em features distintas com menor risco de conflitos e dependências cruzadas.
-   **Reusabilidade Controlada:** Componentes de UI genéricos (`src/components/ui/`) e de layout (`src/components/layout/`) são desenvolvidos de forma agnóstica ao domínio, promovendo a reutilização sem introduzir acoplamento indesejado entre as features.

### Integração Tecnológica

Para suportar esta arquitetura, foram selecionadas tecnologias que complementam e reforçam seus princípios:

-   **Next.js (App Router):** Seu sistema de roteamento e layouts (`src/app/(grupo)/layout.tsx`) é fundamental para aplicar estruturas visuais e lógicas específicas a diferentes seções da aplicação (e.g., rotas autenticadas vs. não autenticadas), mantendo a separação de preocupações.
-   **TanStack Query (React Query):** Essencial para o gerenciamento do estado do servidor. Ele permite que as features lidem com fetching, caching, sincronização e atualização de dados de forma declarativa e eficiente, reduzindo o boilerplate e melhorando a experiência do desenvolvedor.
-   **Context API (React):** Utilizada para gerenciar estados globais que não são de servidor, como o estado de autenticação (`AuthContext`). Isso permite que informações cruciais sejam acessíveis em toda a aplicação de forma controlada, sem a necessidade de prop-drilling excessivo.
-   **Zod e React Hook Form:** Garantem a validação robusta de dados e a construção eficiente de formulários, com os schemas de validação residindo diretamente nas features correspondentes.
-   **Axios com Interceptores:** O cliente HTTP é configurado globalmente com interceptores (e.g., para anexar o token JWT), centralizando a lógica de comunicação com a API e garantindo que as features não precisem se preocupar com detalhes de autenticação em cada requisição.

Esta combinação de arquitetura e tecnologias visa entregar uma aplicação robusta, escalável e de fácil manutenção.

---

## Recursos Implementados

### Autenticação
- Cadastro de novos usuários (`Sign Up`).
- Login de usuários existentes (`Sign In`).
- Validação de formulários em tempo real com Zod.
- Feedback ao usuário com toasts (notificações) para sucesso e erro.

### Gestão de Reclamações
- **Criação (Create):** Implementação de um modal reutilizável (`ComplaintFormModal`) para criar novas reclamações.
- **Leitura (Read):**
    - Listagem de reclamações (`ComplaintSummaryCard`) com resumo (título, descrição truncada, status, data).
    - Visualização de detalhes de uma reclamação específica através de um modal (`ComplaintDetailsModal`).
- **Atualização (Update):** Implementação do modal reutilizável (`ComplaintFormModal`) para edição de reclamações existentes.
- **Exclusão (Delete):** Implementação de um modal de confirmação (`ConfirmationModal`) antes da exclusão de uma reclamação.

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

- [Node.js](https://nodejs.org/) (versão 23 ou superior)
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
│   └── layout.tsx      # Layout raiz da aplicação (com AuthProvider e ReactQueryProvider)
│
├── components/
│   ├── layout/         # Componentes de layout (Navbar, Sidebar)
│   └── ui/             # Componentes de UI genéricos e reutilizáveis (Button, Card, Modal, Input, TextArea, Badge, ConfirmationModal, Toaster)
│
├── features/           # Coração da arquitetura, cada pasta é uma feature
│   ├── auth/           # Feature de Autenticação
│   └── complaints/     # Feature de Reclamações
│       ├── components/ # Componentes React específicos da feature (ComplaintSummaryCard, ComplaintActionsDropdown, ComplaintFormModal, ComplaintDetailsModal)
│       ├── constants/  # Constantes (ex: URLs de endpoints)
│       ├── mutations/  # Hooks de mutação (create, update, delete) do React Query
│       ├── queries/    # Hooks de query (read) do React Query
│       ├── schemas/    # Schemas de validação (Zod) e tipos
│       └── services/   # Funções que interagem com a API
│
├── lib/                # Código compartilhado que não pertence a nenhuma feature
│   └── api.ts          # Configuração da instância do Axios (com interceptor para JWT)
│
├── providers/          # Provedores de Contexto React
│   └── react-query-provider.tsx
│
├── contexts/           # Contextos React (ex: AuthContext)
│   └── AuthContext.tsx # Gerencia o estado de autenticação
│
└── utils/              # Funções utilitárias genéricas
    ├── formatters.ts   # Funções de formatação (ex: datas)
    └── validators.ts
```