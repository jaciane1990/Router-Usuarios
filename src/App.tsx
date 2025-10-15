import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from 'react-router-dom'
import { useState, useEffect } from 'react'

// Suas páginas
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import NaoEncontrada from './pages/NaoEncontrada'
import BuscarUsuario from './pages/BuscarUsuario'
import Usuario from './pages/Usuario'
import Dashboard from './pages/Dashboard'
import Perfil from './pages/dashboard/Perfil'
import Configuracoes from './pages/dashboard/Configuracoes'

// Componente de Login embutido
function LoginPage() {
  const [username, setUsername] = useState('mor_2314')
  const [password, setPassword] = useState('83r5^_')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) throw new Error('Login falhou')

      const data = await response.json()

      // Salva token e username no localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('username', username)

      // Redireciona
      navigate('/dashboard')
    } catch (err) {
      setError('Usuário ou senha inválidos')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuário:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Entrar</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

// Verifica se o usuário está autenticado
function isAuthenticated() {
  return !!localStorage.getItem('token')
}

// Rota protegida embutida
function PrivateRoute({ element }: { element: JSX.Element }) {
  return isAuthenticated() ? element : <Navigate to="/login" replace />
}

function App() {
  const [username, setUsername] = useState<string | null>(null)

  // Busca o nome do usuário do localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('username')
    setUsername(savedUsername)
  }, [])

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/contato">Contato</Link></li>
          <li><Link to="/buscarusuario">Buscar Usuário</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>

        {/* Mostra o nome do usuário logado */}
        {username && (
          <p style={{ marginLeft: '1rem' }}>
            👤 Logado como: <strong>{username}</strong>
          </p>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/buscarusuario" element={<BuscarUsuario />} />
        <Route path="/usuario/:id" element={<Usuario />} />

        <Route path="/login" element={<LoginPage />} />

        {/* Rota protegida para dashboard */}
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        >
          <Route path="perfil" element={<Perfil />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>

        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </Router>
  )
}

export default App
