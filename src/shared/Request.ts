type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default class Request {
  readonly #url: string;
  constructor(url?: string) {
    if (url !== undefined) {
      this.#url = url;
    } else {
      this.#url = import.meta.env.VITE_BACKEND ?? 'http://localhost:3000';
    }
  }

  readonly #options = ({ method, token, body }: { method?: Method; token?: string; body?: object }): RequestInit => {
    return {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token !== undefined ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    };
  };

  public get = async <T>(endpoint: string, token: string): Promise<T> => {
    const res = await fetch(`${this.#url}${endpoint}`, this.#options({ method: 'GET', token }));
    return await res.json();
  };

  public post = async <T>(endpoint: string, { token, body }: { token?: string; body?: object }): Promise<T> => {
    const res = await fetch(`${this.#url}${endpoint}`, this.#options({ method: 'POST', token, body }));
    return await res.json();
  };

  public put = async <T>(endpoint: string, { token, body }: { token: string; body: object }): Promise<T> => {
    const res = await fetch(`${this.#url}${endpoint}`, this.#options({ method: 'PUT', token, body }));
    return await res.json();
  };

  public del = async <T>(endpoint: string, token: string): Promise<T> => {
    const res = await fetch(`${this.#url}${endpoint}`, this.#options({ method: 'DELETE', token }));
    return await res.json();
  };
}
