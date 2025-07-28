# Reclama Ali - Frontend

Este é o projeto front-end do **Reclama Ali**, uma plataforma robusta e intuitiva para o registro e acompanhamento de reclamações. Desenvolvida com as tecnologias mais modernas, a aplicação oferece uma experiência de usuário fluida e responsiva, garantindo escalabilidade e manutenibilidade através de uma arquitetura bem definida.

## 📖 Índice

- [Visão Geral da Arquitetura](#visão-geral-da-arquitetura)
- [Funcionalidades Implementadas](#funcionalidades-implementadas)
- [Endpoints da API](#endpoints-da-api)
- [Tecnologias e Bibliotecas](#tecnologias-e-bibliotecas)
- [Setup e Instalação](#setup-e-instalação)
- [Estrutura de Diretórios](#estrutura-de-diretórios)

---

## 🏛️ Visão Geral da Arquitetura

A principal decisão arquitetural para este projeto foi a adoção de uma **Arquitetura Orientada a Features (Feature-Driven Architecture)**. Esta abordagem organiza o código com base nas funcionalidades de negócio, em vez da tradicional separação por tipo de arquivo (como `components`, `services`, `hooks`).

### Justificativa da Escolha

Cada funcionalidade de negócio (`auth`, `complaints`) é encapsulada como um módulo autocontido. Isso significa que todos os componentes, hooks, schemas de validação, constantes e serviços de API relacionados a uma feature específica residem em seu próprio diretório (`src/features/[nome-da-feature]`).

### Benefícios Estratégicos

-   **Escalabilidade e Manutenibilidade:** Adicionar novas features (ex: um módulo de `perfil-do-usuário`) torna-se um processo isolado, minimizando o impacto no código existente. A co-localização de arquivos facilita a manutenção e a correção de bugs.
-   **Clareza e Organização:** A lógica de negócio de cada feature é autocontida, tornando o código mais intuitivo e fácil de entender.
-   **Autonomia da Equipe:** Em ambientes colaborativos, essa estrutura permite que diferentes desenvolvedores trabalhem em features distintas com menor risco de conflitos.
-   **Reusabilidade Controlada:** Componentes de UI genéricos (`src/components/ui`) e de layout (`src/components/layout`) são desenvolvidos de forma agnóstica ao domínio, promovendo o reuso sem criar acoplamento indesejado entre as features.

### Integração Tecnológica

-   **Next.js (App Router):** Utilizado para o roteamento e a criação de layouts específicos para diferentes seções da aplicação (rotas públicas vs. privadas), mantendo a separação de responsabilidades.
-   **TanStack Query (React Query):** Essencial para o gerenciamento do estado do servidor, lidando com fetching, caching e atualização de dados de forma declarativa e eficiente.
-   **Context API (React):** Usada para gerenciar o estado de autenticação (`AuthContext`), permitindo que informações globais sejam acessíveis em toda a aplicação de forma controlada.
-   **Zod e React Hook Form:** Garantem a validação robusta de dados e a construção de formulários, com os schemas de validação localizados dentro de suas respectivas features.
-   **Axios com Interceptores:** O cliente HTTP é configurado com interceptores para anexar automaticamente o token JWT às requisições, centralizando a lógica de autenticação da API.

---

## ✨ Funcionalidades Implementadas

### Autenticação de Usuários
- **Cadastro (`Sign Up`):** Permite que novos usuários criem uma conta.
- **Login (`Sign In`):** Autenticação de usuários existentes para acesso à plataforma.
- **Validação de Formulários:** Validação em tempo real com Zod para garantir a integridade dos dados.
- **Feedback ao Usuário:** Notificações (toasts) para sucesso e erro nas operações.

### Gestão de Reclamações (CRUD)
- **Criação (Create):** Modal reutilizável (`ComplaintFormModal`) para registrar novas reclamações.
- **Leitura (Read):**
    - Listagem de reclamações (`ComplaintSummaryCard`) com informações resumidas.
    - Paginação para navegar entre as reclamações.
    - Visualização de detalhes completos de uma reclamação em um modal (`ComplaintDetailsModal`).
- **Atualização (Update):** O mesmo modal de criação é reutilizado para editar reclamações existentes.
- **Exclusão (Delete):** Modal de confirmação (`ConfirmationModal`) para evitar a exclusão acidental de uma reclamação.

---

## Endpoints da API

O frontend interage com uma API REST para realizar as operações de autenticação e gestão de reclamações. Abaixo estão os principais endpoints consumidos.

### Autenticação (`/auth`)
-   `POST /auth/signin`: Realiza o login do usuário, retornando um token JWT e informações do usuário.
-   `POST /auth/signup`: Registra um novo usuário no sistema.

### Reclamações (`/complaints`)
-   `GET /complaints?page={page}&size={size}`: Retorna uma lista paginada de reclamações.
-   `POST /complaints`: Cria uma nova reclamação.
-   `GET /complaints/{id}`: Busca os detalhes de uma reclamação específica pelo seu ID.
-   `PATCH /complaints/{id}`: Atualiza o título e/ou a descrição de uma reclamação.
-   `PATCH /complaints/{id}/status`: Atualiza o status de uma reclamação (ex: de `PENDENTE` para `EM_ANALISE`).
-   `DELETE /complaints/{id}`: Remove uma reclamação do sistema.

---

## 🛠️ Tecnologias e Bibliotecas

- **Framework:** [Next.js](https://nextjs.org/) (com App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Gerenciamento de Estado (Servidor):** [TanStack Query](https://tanstack.com/query/latest)
- **Validação de Schemas:** [Zod](https://zod.dev/)
- **Formulários:** [React Hook Form](https://react-hook-form.com/)
- **Notificações (Toasts):** [Sonner](https://sonner.emilkowal.ski/)
- **Cliente HTTP:** [Axios](https://axios-http.com/)

---

## 🚀 Setup e Instalação

Siga os passos abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20.x ou superior)
- [pnpm](https://pnpm.io/installation) (ou outro gerenciador de pacotes como npm ou yarn)

### 1. Clonar o Repositório

```bash
git clone https://github.com/Marck-vsv/Teste-Etipi.git
cd reclama-ali-frontend
```

### 2. Instalar as Dependências

Recomenda-se o uso do `pnpm` para garantir a consistência das dependências com o arquivo `pnpm-lock.yaml`.

```bash
pnpm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo chamado `.env.local` na raiz do projeto e adicione a URL da sua API de backend.

```bash
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:8080
```
*Substitua `http://localhost:8080` pela URL correta do seu backend, se necessário.*

### 4. Rodar o Servidor de Desenvolvimento

Após a instalação e configuração, inicie o servidor:

```bash
pnpm dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

---

## 📁 Estrutura de Diretórios

A estrutura de diretórios foi projetada para ser intuitiva e escalável, seguindo a arquitetura orientada a features.

```
src/
├── app/                # Rotas e Layouts (Next.js App Router)
│   ├── (auth)/         # Grupo de rotas para autenticação (públicas)
│   ├── (private)/      # Grupo de rotas protegidas por autenticação
│   └── layout.tsx      # Layout raiz da aplicação
│
├── components/
│   ├── layout/         # Componentes de layout (Navbar, Sidebar)
│   └── ui/             # Componentes de UI genéricos e reutilizáveis (Button, Card, Modal)
│
├── features/           # Coração da arquitetura: cada pasta é uma feature de negócio
│   ├── auth/           # Feature de Autenticação
│   └── complaints/     # Feature de Reclamações
│       ├── components/ # Componentes React específicos da feature
│       ├── constants/  # Constantes (ex: URLs de endpoints)
│       ├── mutations/  # Hooks de mutação (create, update, delete) do React Query
│       ├── queries/    # Hooks de query (read) do React Query
│       ├── schemas/    # Schemas de validação (Zod) e tipos TypeScript
│       └── services/   # Funções que interagem com a API (Axios)
│
├── lib/                # Código compartilhado que não pertence a uma feature específica
│   └── api.ts          # Configuração da instância do Axios com interceptores
│
├── providers/          # Provedores de Contexto React
│   └── react-query-provider.tsx
│
├── contexts/           # Contextos React para gerenciamento de estado global
│   └── AuthContext.tsx # Gerencia o estado de autenticação do usuário
│
└── utils/              # Funções utilitárias genéricas
    ├── formatters.ts   # Funções de formatação (ex: datas)
    └── validators.ts   # Funções de validação (ex: CPF)
```
