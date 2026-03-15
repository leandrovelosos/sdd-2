import { useState } from 'react'
import { api } from '../services/api'
import { validateUserForm } from '../utils/validation'

export default function UserForm({ onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const err = validateUserForm(form)
    if (err) return setError(err)
    try {
      await api.createUser(form)
      setForm({ name: '', email: '', password: '' })
      onSuccess()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="create-panel">
      <h2>Adicionar Usuário</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <input name="password" type="password" placeholder="Senha (mín. 8 caracteres)" value={form.password} onChange={handleChange} />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Criar Usuário</button>
        </div>
      </form>
    </div>
  )
}
