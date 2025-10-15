import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Inicio from './pages/Inicio';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import NaoEncontrada from './pages/NaoEncontrada';
import BuscarUsuario from './pages/BuscarUsuario';
import Usuario from './pages/Usuario';
import Dashboard from './pages/Dashboard';
import Perfil from './pages/dashboard/Perfil';
import Configuracoes from './pages/dashboard/Configuracoes';
import Login from './pages/Login';

function App() {
 const token = localStorage.getItem('token');
 console.log('Token:', token);
 const isLoggedIn = !!token;


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
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/buscarusuario" element={<BuscarUsuario />} />
        <Route path="/usuario/:id" element={<Usuario />} />
        <Route path="/login" element={<Login />} />

        {/* Protegendo o dashboard inline */}
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route path="perfil" element={<Perfil />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>

        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </Router>
  );
}

export default App;
