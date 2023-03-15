import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

import { Container } from '@mui/material';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Container fixed sx={{ marginY: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};
