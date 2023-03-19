import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, FormControl, Input, Grid } from '@mui/material';
import { useFetchContext } from '../context/fetchContext';
import { useUserContext } from '../context/userContext';
import { loginHandler } from '../services/usersService';

import type { ChangeEvent } from 'react';
import type { LoginType } from '../entities/UserInterfaces';

export const Login = (): JSX.Element => {
  const { setFetching } = useFetchContext();
  const { user, setUser } = useUserContext();
  const [login, setLogin] = useState<LoginType>({ username: '', password: '' });

  // handlers
  const handleLogin = (): void => {
    // event.preventDefault();
    void loginHandler(login, setUser, setFetching);
  };

  const handleInputChanche = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <FormControl>
          <Input required fullWidth type="text" placeholder="username" name="username" onChange={handleInputChanche} />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <FormControl>
          <Input
            required
            fullWidth
            type="password"
            placeholder="password"
            name="password"
            onChange={handleInputChanche}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={12}>
        <Button onClick={handleLogin}>Login</Button>
      </Grid>

      {user !== null ? <Navigate to="/notes" /> : null}
    </Grid>
  );
};
