
import axios from 'axios';
import { auth } from '../firebase.js';

const API_BASE = import.meta.env.DEV
  ? 'http://localhost:4000/api/scoreboard'
  : 'https://backfinalproject-production.up.railway.app/api/scoreboard';

async function withToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('No hay usuario autenticado');
  const token = await user.getIdToken(true);
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function fetchScoreboard() {
  const config = await withToken();
  const res = await axios.get(API_BASE, config);
  return res.data;
}

export async function updateScore(result) {
  const config = await withToken();
  const res = await axios.post(API_BASE, { result }, config);
  return res.data;
}

export async function resetScoreboard() {
  const config = await withToken();
  const url = `${API_BASE}/reset`;
  const res = await axios.post(url, {}, config);
  return res.data;
}
