import { useEffect, useState } from 'react';
import { fetchScoreboard, resetScoreboard } from '../api/scoreboard.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Scoreboard() {
  const { user, loading: authLoading } = useAuth();
  const [board, setBoard]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  const load = async () => {
    try {
      setError(null);
      const data = await fetchScoreboard();
      setBoard(data);
    } catch (err) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setLoading(true);
      setError(null);
      await resetScoreboard();
      await load();
    } catch (err) {
      setError(err.message || 'No se pudo resetear');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      load();
    }
  }, [user, authLoading]);

  useEffect(() => {
    const onFocus = () => {
      if (user) load();
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [user]);

  if (authLoading || loading) return <div>Cargando marcador…</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!board) return <div>No hay datos para mostrar.</div>;

  return (
    <div className="scoreboard">
      <h2>Mi Marcador</h2>
      <div style={{ marginBottom: '1rem' }}>
        <button 
          onClick={handleReset} 
          disabled={loading} 
          style={{ marginLeft: '0.5rem' }}
        >
          🗑️ Reiniciar
        </button>
      </div>
      <p>Victorias X: {board.xWins}</p>
      <p>Victorias O: {board.oWins}</p>
      <p>Empates: {board.draws}</p>
    </div>
  );
}
