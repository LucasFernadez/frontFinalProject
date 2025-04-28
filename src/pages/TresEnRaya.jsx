import { useEffect } from 'react';
import { updateScore } from '../api/scoreboard.js';

export default function TresEnRaya() {
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.origin !== window.location.origin) return;
      const { result } = e.data || {};
      if (['X','O','draw'].includes(result)) {
        updateScore(result).catch(console.error);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

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