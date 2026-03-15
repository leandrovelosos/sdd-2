export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateUserForm({ name, email, password }) {
  if (!name.trim()) return 'Nome é obrigatório.'
  if (!email.trim()) return 'Email é obrigatório.'
  if (!validateEmail(email)) return 'Email inválido.'
  if (password !== undefined) {
    if (!password.trim()) return 'Senha é obrigatória.'
    if (password.length < 8) return 'A senha deve ter no mínimo 8 caracteres.'
  }
  return null
}

export function validateEditForm({ name, email }) {
  if (!name.trim()) return 'Nome é obrigatório.'
  if (!email.trim()) return 'Email é obrigatório.'
  if (!validateEmail(email)) return 'Email inválido.'
  return null
}
