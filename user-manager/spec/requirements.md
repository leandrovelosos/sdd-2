# Requirements — Frontend Gerenciamento de Usuários

## Funcionais

### RF01 — Listar usuários
- Ao carregar a aplicação, buscar e exibir todos os usuários via `GET /users`
- Exibir: ID, Nome, Email, botões Editar e Excluir

### RF02 — Criar usuário
- Formulário com campos: Nome, Email, Senha
- Enviar `POST /users` com `{ name, email, password }`
- Após sucesso: limpar formulário e atualizar lista

### RF03 — Editar usuário
- Botão Editar abre modal com dados atuais do usuário
- Campos editáveis: Nome e Email (senha não é alterada)
- Enviar `PUT /users/{id}` com `{ name, email }`
- Após sucesso: fechar modal e atualizar lista

### RF04 — Excluir usuário
- Botão Excluir solicita confirmação
- Se confirmado: enviar `DELETE /users/{id}`
- Após sucesso: atualizar lista

## Não-funcionais

### RNF01 — Validação de formulários
- Campos obrigatórios não podem estar vazios
- Email deve ter formato válido
- Senha deve ter no mínimo 8 caracteres

### RNF02 — Tratamento de erros
- Erros de API devem ser exibidos na interface
- Erros de validação devem ser exibidos antes do envio

### RNF03 — Senhas
- Senhas nunca devem ser exibidas na interface
- Campo senha usa `type="password"`

### RNF04 — Atualização automática
- A lista deve ser recarregada via `GET /users` após qualquer operação de escrita

## API

Base URL: `http://localhost:3000`

| Método | Endpoint        | Uso              |
|--------|-----------------|------------------|
| GET    | /users          | Listar usuários  |
| GET    | /users/{id}     | Buscar usuário   |
| POST   | /users          | Criar usuário    |
| PUT    | /users/{id}     | Editar usuário   |
| DELETE | /users/{id}     | Excluir usuário  |
