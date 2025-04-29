// src/pages/TresEnRaya.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateScore } from '../api/scoreboard.js';

export default function TresEnRaya() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = async (e) => {
      console.log('[TresEnRaya] Mensaje recibido:', e.data, 'origen:', e.origin);
      // Asegurarnos de que viene de nuestro propio dominio
      if (e.origin !== window.location.origin) {
        console.warn('[TresEnRaya] Origen no válido, ignorando mensaje');
        return;
      }

      const { result } = e.data || {};
      if (!['X', 'O', 'draw'].includes(result)) {
        console.warn('[TresEnRaya] Result inválido:', result);
        return;
      }

      try {
        console.log('[TresEnRaya] Llamando a updateScore con:', result);
        await updateScore(result);
        console.log('[TresEnRaya] Marcador actualizado, navegando a /app/scoreboard');
        navigate('/app/scoreboard', { replace: true });
      } catch (err) {
        console.error('[TresEnRaya] Error en updateScore:', err);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [navigate]);

  const src = `${import.meta.env.BASE_URL}tresenraya/index.html`;
  console.log('[TresEnRaya] Iframe src =', src);

  return (
    <iframe
      src={src}
      title="Tres en Raya"
      style={{ width: '100vw', height: '100vh', border: 'none', display: 'block' }}
    />
  );
}
