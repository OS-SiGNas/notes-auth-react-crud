import { useState, useEffect, useContext } from 'react';
import { getUsers } from '../services/usersService';
import { UserContext, type UserContextProps } from '../context/userContext';
import { FetchContext, type FetchContextProps } from '../context/fetchContext';

import type { UserApi } from '../entities/UserInterfaces';

export const Users = (): JSX.Element => {
  const { user } = useContext(UserContext) as UserContextProps;
  const { setFetching } = useContext(FetchContext) as FetchContextProps;
  const [users, setUsers] = useState<UserApi[] | null>(null);

  useEffect(() => {
    if (user !== null) void getUsers(user.token, setUsers, setFetching);
    console.log('efecto');
  }, []);

  const usersMapped = users?.map(({ _id, name }): JSX.Element => {
    return (
      <li key={_id}>
        {_id} : {name}
      </li>
    );
  });

  return (
    <>
      <h1>USERS:</h1>
      {users !== null ? <ul>{usersMapped}</ul> : 'Sin usuarios'}
    </>
  );
};
