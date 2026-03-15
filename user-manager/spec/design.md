# Design — Frontend Gerenciamento de Usuários

## Arquitetura

SPA (Single Page Application) construída com React + Vite.

## Estrutura de componentes

```
App
└── UsersPage
    ├── UserForm          — formulário de criação
    ├── UserList          — tabela de usuários
    └── EditUserModal     — modal de edição (condicional)
```

## Fluxo de dados

- `UsersPage` controla o estado global: usuário em edição e trigger de refresh
- `UserList` recebe `refreshTrigger` e recarrega via `GET /users` sempre que muda
- Após criar, editar ou excluir: `handleSuccess` incrementa `refresh` e fecha modal

## Comunicação com API

Centralizada em `src/services/api.js` usando Fetch API nativa.
Todas as funções lançam erro para respostas não-ok (status >= 400).

## Componentes

| Componente     | Responsabilidade                          |
|----------------|-------------------------------------------|
| UserForm       | Formulário de criação com validação       |
| UserList       | Tabela com ações de editar e excluir      |
| EditUserModal  | Modal sobreposto para edição de usuário   |
| UsersPage      | Orquestra estado e composição da página   |

## Estilo

CSS simples inline e global (`index.css`). Sem framework de UI externo.
