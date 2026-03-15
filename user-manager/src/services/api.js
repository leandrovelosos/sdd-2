const BASE_URL = ''

const ERROR_MESSAGES = {
  400: 'Dados inválidos. Verifique os campos e tente novamente.',
  401: 'Não autorizado.',
  404: 'Usuário não encontrado.',
  409: 'Este email já está em uso.',
  500: 'Erro interno do servidor. Tente novamente mais tarde.',
}

async function request(path, options = {}) {
  let res
  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error('Falha de comunicação com a API. Verifique sua conexão.')
  }
  if (!res.ok) {
    const msg = ERROR_MESSAGES[res.status] || `Erro ${res.status}: ${res.statusText}`
    throw new Error(msg)
  }
  return res.status === 204 ? null : res.json()
}

export const api = {
  getUsers: () => request('/users'),
  getUser: (id) => request(`/users/${id}`),
  createUser: (data) => request('/users', { method: 'POST', body: JSON.stringify(data) }),
  updateUser: (id, data) => request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteUser: (id) => request(`/users/${id}`, { method: 'DELETE' }),
}
