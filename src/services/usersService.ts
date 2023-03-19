import requests from './Fetch';

import type { Fetch } from './Fetch';
import type { User, UserApi, LoginType } from '../entities/UserInterfaces';
import type { FetchState } from '../context/fetchContext';
import type { ApiResponse } from './types';
interface AuthResponse extends ApiResponse {
  data: User;
}
interface UsersResponse extends ApiResponse {
  data: UserApi[];
}
interface UserResponse extends ApiResponse {
  data: UserApi;
}

class UserService {
  #req: Fetch;
  constructor(requests: Fetch) {
    this.#req = requests;
  }

  public loginHandler = async (
    body: LoginType,
    setUser: (arg: User | null) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.post<AuthResponse>('/auth', { body });
      if (res.status === 200) {
        setFetching(false);
        setUser(res.data);
        window.localStorage.setItem('user', JSON.stringify(res.data));
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public getUsers = async (
    token: string,
    setUsers: (arg: UserApi[] | null) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.get<UsersResponse>('/users', token);
      if (res.status === 200) {
        setUsers(res.data);
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setUsers(null);
      setFetching('error');
    }
  };

  public getUser = async (
    token: string,
    userId: string,
    setUserCard: (arg: UserApi) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.get<UserResponse>(`/users/${userId}`, token);
      if (res.status === 200) {
        setUserCard(res.data);
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public createUser = async (
    token: string,
    body: UserApi,
    setUserCard: (arg: UserApi) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.post<UserResponse>('/users', { token, body });
      if (res.status === 201) {
        setUserCard(res.data);
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public updateUser = async (
    token: string,
    body: UserApi,
    setUserCard: (arg: UserApi) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.put<UserResponse>('/users', { token, body });
      if (res.status === 200) {
        setUserCard(res.data);
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };

  public deleteUser = async (token: string, userId: string, setFetching: (arg: FetchState) => void): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.del<UserResponse>(`/users/${userId}`, token);
      if (res.status === 200) {
        setFetching(false);
      } else throw new Error(res.statusMsg);
    } catch (error) {
      console.info(error);
      setFetching('error');
    }
  };
} // end

export const { loginHandler, getUsers, getUser, createUser, updateUser, deleteUser } = new UserService(requests);
