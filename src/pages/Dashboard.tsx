import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  return (
<div>
  <nav>
    <li><link to="/dashboard/perfil">Perfil</link></li>
    <li><link to= "/dashboard/configuracoes">Configuracoes</link></li>
    </nav>  
  <h1>Dashboard</h1>
  <Outlet /> {/* Renderiza os componentes filhos aqui */}
</div>
  )
}   