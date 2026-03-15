import { useState } from 'react'
import UserList from '../components/UserList'
import UserForm from '../components/UserForm'
import EditUserModal from '../components/EditUserModal'

export default function UsersPage() {
  const [editingUser, setEditingUser] = useState(null)
  const [refresh, setRefresh] = useState(0)
  const [showForm, setShowForm] = useState(false)

  const handleSuccess = () => {
    setEditingUser(null)
    setShowForm(false)
    setRefresh((r) => r + 1)
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <img src="/icon.png" alt="ícone" className="sidebar-icon" />
        <p className="sidebar-label">Sistema de<br />Gerenciamento</p>
      </aside>

      <div className="main-content">
        <header className="header">
          <h1>Administração</h1>
        </header>

        <div className="page-content">
          <div className="page-header-row">
            <div>
              <p className="page-title">Gerenciar Usuários</p>
              <p className="page-subtitle">Administre e gerencie as contas de usuário da plataforma.</p>
            </div>
            <button className="btn-primary" onClick={() => setShowForm((v) => !v)}>
              {showForm ? 'Cancelar' : '+ Adicionar Usuário'}
            </button>
          </div>

          {showForm && <UserForm onSuccess={handleSuccess} />}

          <UserList onEdit={setEditingUser} refreshTrigger={refresh} />
        </div>
      </div>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onSuccess={handleSuccess}
          onCancel={() => setEditingUser(null)}
        />
      )}
    </div>
  )
}
