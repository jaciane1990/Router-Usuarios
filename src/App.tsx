import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import NaoEncontrada from './pages/NaoEncontrada'
import BuscarUsuario from './pages/BuscarUsuario'
import Usuario from './pages/Usuario'

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
          <li><Link to="/contato">Contato</Link></li>
          <li><Link to="/buscarusuario">Buscar Usuário</Link></li> {/* Link para a página de busca */}
          <li><Link to="/usuario/3">Usuário 3</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/buscarusuario" element={<BuscarUsuario />} />
        <Route path="/usuario/:id" element={<Usuario />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </Router>
  )
}

export default App
