import { useState, useEffect } from 'react';
import { getUsers } from '../services/usersService';
import { useUserContext } from '../context/userContext';
import { useFetchContext } from '../context/fetchContext';

import type { UserApi } from '../entities/UserInterfaces';

export const Users = (): JSX.Element => {
  const { user } = useUserContext();
  const { setFetching } = useFetchContext();
  const [users, setUsers] = useState<UserApi[] | null>(null);

  useEffect(() => {
    if (user !== null) void getUsers(user.token, setUsers, setFetching);
  }, [setFetching, user]);

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
