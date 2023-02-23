import { useState, useEffect, useContext } from 'react';
import { getAllUsers } from '../services/authService';
import { UserContext } from '../context/userContext';

import type { UserApi } from '../entities/UserInterface';

export const Users = (): JSX.Element => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState<UserApi[] | null>(null);

  useEffect(() => {
    void (async () => {
      if (user !== null) {
        const res = await getAllUsers(user?.token);
        if (res !== null) setUsers(res.data);
      }
    })();
  }, []);

  const usersMapped = users?.map(({ _id, name }): JSX.Element => {
    return (
      <li>
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
