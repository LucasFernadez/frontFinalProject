// src/pages/TresEnRaya.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateScore } from '../api/scoreboard.js';

export default function TresEnRaya() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = async (e) => {
      if (e.origin !== window.location.origin) return;
      const { result } = e.data || {};
      if (['X', 'O', 'draw'].includes(result)) {
        try {
          await updateScore(result);
          navigate('/app/scoreboard');
        } catch (err) {
          console.error('Error actualizando marcador:', err);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  const src = `${import.meta.env.BASE_URL}tresenraya/index.html`;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src={src}
        title="Tres en Raya"
        style={{ width: '100%', height: '100vh', border: 'none' }}
      />
    </div>
  );
}
