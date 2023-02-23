import { Service } from './Service';
import type { User, UserApi, LoginType } from '../entities/UserInterface';

interface ApiResponse {
  status: number;
  statusMsg: string;
}

interface AuthResponse extends ApiResponse {
  data: User;
}

interface UsersResponse extends ApiResponse {
  data: UserApi[];
}
interface UserResponse extends ApiResponse {
  data: UserApi;
}

class UserService extends Service {
  // =>
  public loginHandler = async (credentials: LoginType): Promise<AuthResponse | null> => {
    try {
      const res = await fetch(`${this.url}/auth`, { ...this.getOptions('POST'), body: JSON.stringify(credentials) });
      if (res.status !== 200) return null;
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public getAllUsers = async (token: string): Promise<UsersResponse | null> => {
    try {
      const res = await fetch(`${this.url}/users/`, this.getOptions('GET', token));
      if (res.status !== 200) return null;
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public getOneUser = async (token: string, userId: string): Promise<UserResponse | null> => {
    try {
      const res = await fetch(`${this.url}/users/${userId}`, this.getOptions('GET', token));
      if (res.status !== 200) return null;
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public createUser = async (token: string, user: UserApi): Promise<UserResponse | null> => {
    try {
      const res = await fetch(`${this.url}/users/`, { ...this.getOptions('POST', token), body: JSON.stringify(user) });
      if (res.status !== 200) return null;
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public updateUser = async (token: string, user: UserApi): Promise<UserResponse | null> => {
    try {
      const res = await fetch(`${this.url}/users/`, { ...this.getOptions('PUT', token), body: JSON.stringify(user) });
      if (res.status !== 200) return null;
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public deleteUser = async (token: string, userId: string): Promise<UserResponse | null> => {
    try {
      const res = await fetch(`${this.url}/users/${userId}`, this.getOptions('DELETE', token));
      if (res.status !== 200) return null;
      return await res.json();
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export const { loginHandler, getAllUsers, getOneUser, updateUser, deleteUser } = new UserService();
