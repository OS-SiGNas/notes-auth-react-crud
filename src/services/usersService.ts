import Request from '../shared/Request';

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
  #req: Request;
  constructor() {
    this.#req = new Request();
  }

  public loginHandler = async (
    body: LoginType,
    setUser: (arg: User | null) => void,
    setFetching: (arg: FetchState) => void
  ): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.post<AuthResponse>('/auth', { body });
      if (res.status !== 200) throw new Error(res.statusMsg);
      setUser(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
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
      if (res.status !== 200) throw new Error(res.statusMsg);
      setUsers(res.data);
      setFetching(false);
    } catch (error) {
      console.log(error);
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
      if (res.status !== 200) throw new Error(res.statusMsg);
      setUserCard(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
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
      if (res.status !== 201) throw new Error(res.statusMsg);
      setUserCard(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
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
      if (res.status !== 200) throw new Error(res.statusMsg);
      setUserCard(res.data);
      setFetching(false);
    } catch (error) {
      console.error(error);
      setFetching('error');
    }
  };

  public deleteUser = async (token: string, userId: string, setFetching: (arg: FetchState) => void): Promise<void> => {
    try {
      setFetching(true);
      const res = await this.#req.del<UserResponse>(`/users/${userId}`, token);
      if (res.status !== 200) throw new Error(res.statusMsg);
      setFetching(false);
    } catch (error) {
      console.log(error);
      setFetching('error');
    }
  };
} // end

export const { loginHandler, getUsers, getUser, createUser, updateUser, deleteUser } = new UserService();
