type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class Service {
  protected readonly url: string;
  constructor() {
    if (import.meta.env.VITE_BACKEND === undefined) {
      this.url = 'http://localhost:3334';
    } else {
      this.url = import.meta.env.VITE_BACKEND;
    }
  }

  protected options = (method: Method, token = ''): RequestInit => {
    return {
      method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  };

  protected body = (body: any): { body: string } => {
    return {
      body: JSON.stringify(body),
    };
  };

  /* 
  protected req = async (endpoint: string, method: Method, body?: any, token?: string): Promise<Response> => {
    return await fetch(`${this.url}${endpoint}`, { ...this.options(method, token), ...this.body(body) });
  };
  */
}
