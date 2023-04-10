import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button, Box, Grid, Paper, TextField } from '@mui/material';
// Hooks Context
import { useIsLoadingContext } from '../context/isLoadingContext';
import { useUserContext } from '../context/userContext';
// Service
import { loginHandler } from '../services/usersService';

// types
import type { FormEvent, ChangeEvent } from 'react';
import type { LoginType } from '../entities/UserInterfaces';

export const Login = (): JSX.Element => {
  const { setIsLoading } = useIsLoadingContext();
  const { user, setUser } = useUserContext();
  const [login, setLogin] = useState<LoginType>({ username: '', password: '' });

  // handlers
  const handleLogin = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void loginHandler(login, setUser, setIsLoading);
  };

  const handleInputChanche = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {user !== null ? <Navigate to="/" /> : null}
      <Paper elevation={3}>
        <Grid container sx={{ margin: '40px' }}>
          <form onSubmit={handleLogin}>
            <Grid item xs={12} md={12}>
              <TextField
                sx={{ marginBottom: '10px' }}
                required
                label="Username"
                type="text"
                placeholder="username"
                name="username"
                onChange={handleInputChanche}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                sx={{ marginBottom: '10px' }}
                required
                label="Password"
                type="password"
                placeholder="password"
                name="password"
                onChange={handleInputChanche}
              />
            </Grid>

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </form>
        </Grid>
      </Paper>
    </Box>
  );
};
