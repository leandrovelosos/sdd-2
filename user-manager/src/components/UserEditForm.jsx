import { useState, useEffect } from 'react'
import { api } from '../api/users'

export default function UserEditForm({ user, onSuccess, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [error, setError] = useState(null)

  useEffect(() => {
    setForm({ name: user.name, email: user.email })
    setError(null)
  }, [user])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    if (!form.name.trim() || !form.email.trim()) {
      return setError('Nome e email são obrigatórios.')
    }

    try {
      await api.updateUser(user.id, form)
      onSuccess()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', background: '#fff', padding: '1rem', border: '1px solid #ccc' }}>
      <h2>Editar Usuário #{user.id}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
      </div>
      <div>
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
      </div>
      <button type="submit">Salvar</button>{' '}
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  )
}
