import { useState, useEffect, useContext } from 'react';
import { getAllUsers } from '../services/authService';
import { UserContext, type UserContextProps } from '../context/userContext';

import type { UserApi } from '../entities/UserInterface';

export const Users = (): JSX.Element => {
  const { user } = useContext(UserContext) as UserContextProps;
  const [users, setUsers] = useState<UserApi[] | null>(null);

  useEffect(() => {
    if (user !== null) void getAllUsers(user.token, setUsers);
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
