import axios from 'axios';
import { auth } from '../firebase';

const baseURL = '/api/scoreboard';

async function withToken() {
  const token = await auth.currentUser.getIdToken();
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
  const res = await axios.post(
    import.meta.env.VITE_BACKEND_URL + '/api/scoreboard/reset',
    {},
    config
  );
  return res.data;
}
