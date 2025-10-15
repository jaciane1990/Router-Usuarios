import { Outlet, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); // ou use '/login' se quiser forçar novo login
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <button className="voltar-btn" onClick={handleLogout}>Voltar</button>
      <Outlet />
    </div>
  );
}
