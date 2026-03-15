Especificação — Frontend para Sistema de Gerenciamento de Usuários
1. Visão Geral

O sistema frontend deve fornecer uma interface web para interação com a API de gerenciamento de usuários. A aplicação deve permitir visualizar, criar, editar e remover usuários por meio de uma interface gráfica simples.

O frontend deve consumir a API backend disponível em:

http://localhost:3000


A aplicação deve seguir arquitetura de Single Page Application (SPA).

Tecnologia recomendada:

React
ou

Vue.js

2. Funcionalidades
2.1 Listar usuários

A aplicação deve exibir uma tabela contendo todos os usuários cadastrados.

Campos exibidos:

ID

Nome

Email

A listagem deve consumir:

GET /users

2.2 Criar usuário

A interface deve possuir um formulário para criação de usuário.

Campos:

Nome

Email

Senha

A submissão do formulário deve enviar:

POST /users


Body:

{
  "name": "string",
  "email": "string",
  "password": "string"
}


Após criação bem sucedida:

atualizar lista de usuários

limpar formulário

2.3 Atualizar usuário

Cada usuário listado deve possuir um botão Editar.

Ao clicar:

abrir formulário preenchido com os dados atuais

permitir editar nome e email

A atualização deve consumir:

PUT /users/{id}

2.4 Remover usuário

Cada usuário deve possuir botão Excluir.

Ao clicar:

exibir confirmação

se confirmado, chamar

DELETE /users/{id}


Após exclusão:

atualizar lista de usuários

3. Interface de Usuário

A aplicação deve possuir três componentes principais.

3.1 Lista de Usuários

Tabela contendo:

| ID | Nome | Email | Ações |

Ações:

Editar

Excluir

3.2 Formulário de Criação

Campos:

Nome

Email

Senha

Botão:

Criar Usuário

3.3 Formulário de Edição

Campos:

Nome

Email

Botão:

Salvar Alterações

4. Estrutura de Componentes

Estrutura sugerida:

src
 ├── components
 │    ├── UserList
 │    ├── UserForm
 │    └── EditUserModal
 │
 ├── services
 │    └── api.js
 │
 ├── pages
 │    └── UsersPage
 │
 └── App

5. Serviço de API

O frontend deve possuir um módulo centralizado para chamadas HTTP.

Exemplo:

api.js


Funções esperadas:

getUsers()
createUser()
updateUser()
deleteUser()
getUserById()


As requisições podem ser feitas utilizando:

Axios
ou

Fetch API.

6. Tratamento de Erros

A interface deve exibir mensagens de erro quando:

email já existe

usuário não encontrado

falha de comunicação com API

7. Casos de Borda

O sistema deve tratar:

tentativa de envio com campos vazios

email inválido

senha menor que 8 caracteres

falha de conexão com API

8. Fluxo de Interação

Fluxo principal:

Usuário abre aplicação
        ↓
Frontend chama GET /users
        ↓
Lista exibida
        ↓
Usuário pode:
   - criar usuário
   - editar usuário
   - excluir usuário

9. Critérios de Aceitação

A aplicação será considerada correta quando:

todos os endpoints da API forem consumidos corretamente

lista de usuários for exibida

criação, edição e remoção funcionarem

erros forem tratados na interface

flowchart TD

START([Usuário acessa aplicação])

START --> INIT[Inicializar aplicação frontend]

INIT --> API_CALL[Enviar requisição GET /users]

API_CALL --> API_RESPONSE{Resposta da API}

API_RESPONSE -->|Sucesso| RENDER_LIST[Renderizar lista de usuários]
API_RESPONSE -->|Erro| ERROR_LOAD[Exibir erro de carregamento]

ERROR_LOAD --> RETRY{Usuário deseja tentar novamente?}

RETRY -->|Sim| API_CALL
RETRY -->|Não| END

RENDER_LIST --> USER_ACTION{Usuário escolhe ação}

%% CREATE USER

USER_ACTION -->|Criar usuário| OPEN_CREATE_FORM[Abrir formulário de criação]

OPEN_CREATE_FORM --> INPUT_CREATE[Usuário preenche nome email senha]

INPUT_CREATE --> VALIDATE_CREATE[Validar dados do formulário]

VALIDATE_CREATE --> VALID_CREATE{Dados válidos?}

VALID_CREATE -->|Não| SHOW_CREATE_ERROR[Mostrar erro de validação]
SHOW_CREATE_ERROR --> INPUT_CREATE

VALID_CREATE -->|Sim| SEND_CREATE[Enviar POST /users]

SEND_CREATE --> CREATE_RESPONSE{Resposta da API}

CREATE_RESPONSE -->|Sucesso| UPDATE_LIST_CREATE[Atualizar lista de usuários]

CREATE_RESPONSE -->|Erro| CREATE_API_ERROR[Exibir erro da API]

CREATE_API_ERROR --> INPUT_CREATE

UPDATE_LIST_CREATE --> REFRESH_LIST_CREATE[Recarregar lista GET /users]

REFRESH_LIST_CREATE --> RENDER_LIST

%% UPDATE USER

USER_ACTION -->|Editar usuário| OPEN_EDIT_FORM[Abrir formulário de edição]

OPEN_EDIT_FORM --> LOAD_USER_DATA[Carregar dados do usuário]

LOAD_USER_DATA --> EDIT_INPUT[Usuário altera dados]

EDIT_INPUT --> VALIDATE_EDIT[Validar dados editados]

VALIDATE_EDIT --> VALID_EDIT{Dados válidos?}

VALID_EDIT -->|Não| SHOW_EDIT_ERROR[Mostrar erro de validação]

SHOW_EDIT_ERROR --> EDIT_INPUT

VALID_EDIT -->|Sim| SEND_UPDATE[Enviar PUT /users/id]

SEND_UPDATE --> UPDATE_RESPONSE{Resposta da API}

UPDATE_RESPONSE -->|Sucesso| UPDATE_LIST_EDIT[Atualizar lista de usuários]

UPDATE_RESPONSE -->|Erro| UPDATE_API_ERROR[Mostrar erro da API]

UPDATE_API_ERROR --> EDIT_INPUT

UPDATE_LIST_EDIT --> REFRESH_LIST_EDIT[Recarregar lista GET /users]

REFRESH_LIST_EDIT --> RENDER_LIST

%% DELETE USER

USER_ACTION -->|Excluir usuário| CONFIRM_DELETE{Confirmar exclusão?}

CONFIRM_DELETE -->|Não| RENDER_LIST

CONFIRM_DELETE -->|Sim| SEND_DELETE[Enviar DELETE /users/id]

SEND_DELETE --> DELETE_RESPONSE{Resposta da API}

DELETE_RESPONSE -->|Sucesso| UPDATE_LIST_DELETE[Atualizar lista de usuários]

DELETE_RESPONSE -->|Erro| DELETE_ERROR[Mostrar erro de exclusão]

DELETE_ERROR --> RENDER_LIST

UPDATE_LIST_DELETE --> REFRESH_LIST_DELETE[Recarregar lista GET /users]

REFRESH_LIST_DELETE --> RENDER_LIST

%% EXIT

USER_ACTION -->|Sair| END([Fim da aplicação])