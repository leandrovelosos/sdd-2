import { useState, useEffect } from 'react'
import { api } from '../services/api'
import { validateEditForm } from '../utils/validation'

export default function EditUserModal({ user, onSuccess, onCancel }) {
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
    const err = validateEditForm(form)
    if (err) return setError(err)
    try {
      await api.updateUser(user.id, form)
      onSuccess()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Editar Usuário</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-primary">Salvar Alterações</button>
            <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
