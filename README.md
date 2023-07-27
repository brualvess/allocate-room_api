# Projeto Allocate Room API

Este é o repositório da API Allocate Room, um sistema de alocação de alunos em salas, onde os professores podem cadastrar salas, alunos e realizar a alocação dos alunos nas salas.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter os seguintes pré-requisitos instalados em sua máquina:

- Node.js (versão 14 ou superior)
- NPM (Node Package Manager) ou Yarn
- Banco de dados SQLite ou outro suportado pelo Adonis.js

## Instalação

1. Clone este repositório em sua máquina local:

```
git clone https://github.com/brualvess/allocate-room_api.git
```

2. Navegue para o diretório do projeto, por exemplo:

```
cd allocate-room-api
```

3. Instale as dependências do projeto:

Se estiver usando o NPM:

```
npm install
```

Se estiver usando o Yarn:

```
yarn install
```

4. Configure o banco de dados:

Certifique-se de ter um banco de dados SQLite criado e configurado corretamente no arquivo `.env` na raiz do projeto.

5. Execute as migrações:

```
node ace migration:run
```

## Executando o servidor

Após instalar as dependências e configurar o banco de dados, você pode iniciar o servidor:

Se estiver usando o NPM:

```
npm run dev
```

Se estiver usando o Yarn:

```
yarn dev
```

O servidor será iniciado em `http://localhost:3333`.

 