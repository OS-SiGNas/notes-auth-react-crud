import { Service } from './Service';

import type { User, UserApi, LoginType } from '../entities/UserInterface';
import type { FetchState } from '../context/fetchContext';

/* 
interface ApiResponse { status: number; statusMsg: string; }
interface AuthResponse extends ApiResponse { data: User; }
interface UsersResponse extends ApiResponse {data: UserApi[];}
interface UserResponse extends ApiResponse {data: UserApi;}
 */

class UserService extends Service {
  // =>
  public loginHandler = async (
    credentials: LoginType,
    setUser: (arg: User | null) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await fetch(`${this.url}/auth`, { ...this.options('POST'), ...this.body(credentials) });
      if (res.status !== 200) return undefined;
      const json = await res.json();
      setUser(json.data);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setUser(null);
      setFetching('error');
    }
  };

  public getAllUsers = async (
    token: string,
    setUsers: (arg: UserApi[] | null) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await fetch(`${this.url}/users/`, this.options('GET', token));
      if (res.status !== 200) return undefined;
      const json = await res.json();
      setUsers(json.data);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setUsers(null);
      setFetching('error');
    }
  };

  public getOneUser = async (
    token: string,
    userId: string,
    setUserCard: (arg: UserApi | null) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await fetch(`${this.url}/users/${userId}`, this.options('GET', token));
      if (res.status !== 200) return undefined;
      const json = await res.json();
      setUserCard(json.data);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setUserCard(null);
      setFetching('error');
    }
  };

  /* 
  public createUser = async (token: string, user: UserApi, setFetching: (arg: FetchState) => void): Promise<void> => {
    try {
      setFetching(true);
      const res = await fetch(`${this.url}/users/`, { ...this.options('POST', token), ...this.body(user) });
      if (res.status !== 200) return undefined;
      const json = await res.json();

      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching('error');
    }
  };

  public updateUser = async (token: string, user: UserApi, setFetching: (arg: FetchState) => void): Promise<void> => {
    try {
      setFetching(true);
      const res = await fetch(`${this.url}/users/`, { ...this.options('PUT', token), ...this.body(user) });
      if (res.status !== 200) return undefined;
      const json = await res.json();

      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching(true);
    }
  };

  public deleteUser = async (token: string, userId: string, setFetching: (arg: FetchState) => void): Promise<void> => {
    try {
      setFetching(true);
      const res = await fetch(`${this.url}/users/${userId}`, this.options('DELETE', token));
      if (res.status !== 200) return undefined;
      const json = await res.json();

      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching('error');
    }
  };
  */
}

export const { loginHandler, getAllUsers, getOneUser } = new UserService();
