import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.js';

export default function Dashboard() {
  const { user } = useAuth();

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="app-container">
      <header>
        <h1>Bienvenido</h1>
      </header>
      <nav>
        <Link to="/app/scoreboard">Marcador</Link>
      </nav>
      <div className="tres-button-container">
        <Link to="/app/tresenraya" className="btn tres-btn">
          Tres en Raya
        </Link>
      </div>
      <main>
        <Outlet />
      </main>
      <footer className="app-footer">
        <button onClick={logout} className="logout-btn">Cerrar sesión</button>
      </footer>
    </div>
  );
}