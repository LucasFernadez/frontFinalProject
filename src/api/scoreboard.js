import axios from 'axios';
import { auth } from '../firebase.js';

const baseURL = '/api/scoreboard';

async function withToken() {
  const user = auth.currentUser;
  if (!user) throw new Error('No hay usuario autenticado');
  const token = await user.getIdToken(true);
  return { headers: { Authorization: `Bearer ${token}` } };
}

export async function fetchScoreboard() {
  const config = await withToken();
  const res = await axios.get(baseURL, config);
  return res.data;
}

export async function updateScore(result) {
  const config = await withToken();
  const res = await axios.post(baseURL, { result }, config);
  return res.data;
}

export async function resetScoreboard() {
  const config = await withToken();
  const res = await axios.post(`${baseURL}/reset`, {}, config);
  return res.data;
}
