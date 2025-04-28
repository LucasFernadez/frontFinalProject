import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Scoreboard from './pages/Scoreboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import TresEnRaya from './pages/TresEnRaya.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
          <Route path="scoreboard" element={<Scoreboard />} />
          <Route path="tresenraya" element={<TresEnRaya />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}