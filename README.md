# User Manager

Frontend de gerenciamento de usuários construído com React + Vite.

## Sobre o projeto

SPA (Single Page Application) que consome uma API REST para listar, criar, editar e excluir usuários.

## Tecnologias

- React 18
- Vite 5
- Fetch API nativa (sem bibliotecas externas de HTTP)
- CSS puro (sem framework de UI)

## Pré-requisitos

- Node.js 18+
- API REST rodando em `http://localhost:3000`

## Instalação e uso

```bash
cd user-manager
npm install
npm run dev
```

## Estrutura do projeto

```
src/
├── pages/
│   └── UsersPage.jsx       — página principal, orquestra estado
├── components/
│   ├── UserForm.jsx         — formulário de criação
│   ├── UserList.jsx         — tabela com ações
│   └── EditUserModal.jsx    — modal de edição
├── services/
│   └── api.js               — comunicação com a API
└── utils/
    └── validation.js        — funções de validação
```

## Funcionalidades

| Funcionalidade   | Descrição                                           |
| ---------------- | --------------------------------------------------- |
| Listar usuários  | Carrega e exibe todos os usuários ao abrir a página |
| Criar usuário    | Formulário com Nome, Email e Senha                  |
| Editar usuário   | Modal com Nome e Email (senha não é alterada)       |
| Excluir usuário  | Confirmação antes de deletar                        |
| Atualização auto | Lista recarregada após qualquer operação de escrita |

## API

Base URL: `http://localhost:3000`

| Método | Endpoint    | Uso             |
| ------ | ----------- | --------------- |
| GET    | /users      | Listar usuários |
| GET    | /users/{id} | Buscar usuário  |
| POST   | /users      | Criar usuário   |
| PUT    | /users/{id} | Editar usuário  |
| DELETE | /users/{id} | Excluir usuário |

## Validações

- Campos obrigatórios não podem estar vazios
- Email deve ter formato válido
- Senha deve ter no mínimo 8 caracteres
- Senhas nunca são exibidas na interface

## Tratamento de erros

Erros da API são mapeados para mensagens amigáveis:

| Status | Mensagem                              |
| ------ | ------------------------------------- |
| 400    | Dados inválidos. Verifique os campos. |
| 401    | Não autorizado.                       |
| 404    | Usuário não encontrado.               |
| 409    | Este email já está em uso.            |
| 500    | Erro interno do servidor.             |
| rede   | Falha de comunicação com a API.       |
