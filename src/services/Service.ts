export abstract class Service {
  protected readonly url: string;
  constructor() {
    if (import.meta.env.VITE_BACKEND === undefined) {
      this.url = 'http://localhost:3334';
    } else {
      this.url = import.meta.env.VITE_BACKEND;
    }
  }

  protected getOptions = (method: string, token = ''): RequestInit => {
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

    // if (body !== null) options = { ...options, body: JSON.stringify(body) };
    // return options;
  };
}
