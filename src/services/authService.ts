import { type LoginType } from '../entities/UserInterface';

export const loginHandler = async (credentials: LoginType): Promise<any> => {
  const options: RequestInit = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  };
  try {
    const res = await fetch('http://localhost:3334/auth', options);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
