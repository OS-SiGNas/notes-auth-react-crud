import { useContext, useState } from 'react';
import { FetchContext } from '../context/fetchContext';
import { UserContext } from '../context/userContext';
import { loginHandler } from '../services/usersService';

import type { FormEvent, ChangeEvent } from 'react';
import type { FetchContextProps } from '../context/fetchContext';
import type { UserContextProps } from '../context/userContext';
import type { LoginType } from '../entities/UserInterfaces';

export const Login = (): JSX.Element => {
  const { setFetching } = useContext(FetchContext) as FetchContextProps;
  const { user, setUser } = useContext(UserContext) as UserContextProps;
  const [login, setLogin] = useState<LoginType>({ username: '', password: '' });
  // const { user, dispatch } = useContext(UserContext);

  // handlers
  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void loginHandler(login, setUser, setFetching);
    // if (data) dispatch({ type: "login", payload: data });
  };

  const handleInputChanche = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  // Main Element
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="username" name="username" onChange={handleInputChanche} />
        <input type="password" placeholder="password" name="password" onChange={handleInputChanche} />
        <button>Login</button>
      </form>
      <pre>{user !== null ? JSON.stringify(user.username) : 'without user'}</pre>
    </>
  );
};
