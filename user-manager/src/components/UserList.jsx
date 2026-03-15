import { useEffect, useState } from 'react'
import { api } from '../services/api'

function getInitials(name = '') {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()
}

export default function UserList({ onEdit, refreshTrigger }) {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    api.getUsers()
      .then(setUsers)
      .catch((e) => setError(e.message))
  }, [refreshTrigger])

  const handleDelete = async (id) => {
    if (!confirm('Deseja excluir este usuário?')) return
    try {
      await api.deleteUser(id)
      const updated = await api.getUsers()
      setUsers(updated)
    } catch (e) {
      setError(e.message)
    }
  }

  if (error) return <p className="error">{error}</p>

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>ID</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>
                <div className="user-cell">
                  <div className="avatar">{getInitials(u.name)}</div>
                  {u.name}
                </div>
              </td>
              <td>{u.email}</td>
              <td>{u.id}</td>
              <td>
                <button className="btn-icon" title="Editar" onClick={() => onEdit(u)}>✏️</button>
                <button className="btn-icon" title="Excluir" onClick={() => handleDelete(u.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
