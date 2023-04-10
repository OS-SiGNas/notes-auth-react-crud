import { useState, useEffect } from 'react';
import { getUsers } from '../services/usersService';
import { useUserContext } from '../context/userContext';
import { useIsLoadingContext } from '../context/isLoadingContext';

import type { UserApi } from '../entities/UserInterfaces';

export const Users = (): JSX.Element => {
  const { user } = useUserContext();
  const { setIsLoading } = useIsLoadingContext();
  const [users, setUsers] = useState<UserApi[] | null>(null);

  useEffect(() => {
    if (user !== null) void getUsers(setUsers, setIsLoading);
  }, [setIsLoading, user]);

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
