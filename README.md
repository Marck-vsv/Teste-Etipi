# Reclame Ali

Este é o repositório principal do projeto Reclame Ali, que inclui o frontend e o backend da aplicação.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado em sua máquina:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Como Executar a Aplicação com Docker

Para executar a aplicação completa (frontend, backend e banco de dados), siga estas etapas:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/Marck-vsv/reclame-ali.git
   cd reclame-ali
   ```

2. **Execute o Docker Compose:**

   Na raiz do projeto (onde o arquivo `docker-compose.yml` está localizado), execute o seguinte comando:

   ```bash
   docker-compose up --build
   ```

   O comando `--build` força a reconstrução das imagens Docker, o que é útil na primeira vez que você executa ou se houver alterações nos `Dockerfiles`.

   O Docker Compose irá:
   - Construir as imagens para os serviços `backend` e `frontend`.
   - Baixar a imagem do `mysql:8.0` para o banco de dados.
   - Iniciar os três contêineres em uma rede compartilhada.

## Acessando a Aplicação

Depois que todos os contêineres estiverem em execução, você poderá acessar os serviços:

- **Frontend:** Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000)
- **Backend:** A API estará disponível em [http://localhost:8080](http://localhost:8080)
- **Banco de Dados:** O banco de dados MySQL estará acessível na porta `3306` da sua máquina local.

## Parando a Aplicação

Para parar e remover os contêineres, redes e volumes criados, pressione `Ctrl + C` no terminal onde o `docker-compose` está em execução e, em seguida, execute:

```bash
docker-compose down
```

## Persistência de Dados

Os dados do banco de dados MySQL são persistidos em um volume Docker chamado `db_data`. Isso garante que seus dados não sejam perdidos ao parar e iniciar os contêineres.
