import req from './Fetch';

import type { User, UserApi, LoginType } from '../entities/UserInterfaces';
import type { IsLoadingState } from '../context/isLoadingContext';
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

class UsersService {
  public checkLocalUser = async (setUser: (arg: User | null) => void): Promise<void> => {
    const localUser = window.localStorage.getItem('user');
    if (localUser === null) return;
    const user: User = JSON.parse(localUser);
    req.token = user.token;
    const res = await req.get<Response>('/auth');
    res.status === 204 ? setUser(user) : this.logOut(setUser);
  };

  public loginHandler = async (
    body: LoginType,
    setUser: (arg: User | null) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.post<AuthResponse>('/auth', body);
      if (res.status === 200) {
        setIsLoading(false);
        setUser(res.data);
        window.localStorage.setItem('user', JSON.stringify(res.data));
        req.token = res.data.token;
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public logOut = (setUser: (arg: null) => void): void => {
    setUser(null);
    window.localStorage.removeItem('user');
    req.token = '';
  };

  public getUsers = async (
    setUsers: (arg: UserApi[] | null) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.get<UsersResponse>('/users');
      if (res.status === 200) {
        setUsers(res.data);
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setUsers(null);
      setIsLoading('error');
    }
  };

  public getUser = async (
    userId: string,
    setUserCard: (arg: UserApi) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.get<UserResponse>(`/users/${userId}`);
      if (res.status === 200) {
        setUserCard(res.data);
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public createUser = async (
    body: UserApi,
    setUserCard: (arg: UserApi) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.post<UserResponse>('/users', body);
      if (res.status === 201) {
        setUserCard(res.data);
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public updateUser = async (
    body: UserApi,
    setUserCard: (arg: UserApi) => void,
    setIsLoading: (arg: IsLoadingState) => void
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.put<UserResponse>('/users', body);
      if (res.status === 200) {
        setUserCard(res.data);
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };

  public deleteUser = async (userId: string, setIsLoading: (arg: IsLoadingState) => void): Promise<void> => {
    try {
      setIsLoading(true);
      const res = await req.del<UserResponse>(`/users/${userId}`);
      if (res.status === 204) {
        setIsLoading(false);
      } else throw new Error(res.message);
    } catch (error) {
      console.info(error);
      setIsLoading('error');
    }
  };
}

export const { checkLocalUser, loginHandler, logOut, getUser, getUsers, createUser, updateUser, deleteUser } =
  new UsersService();
