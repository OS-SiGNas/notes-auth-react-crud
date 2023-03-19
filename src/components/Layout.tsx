import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';

import { Navbar } from './Navbar';
import { LeftDrawer } from './LeftDrawer';

export const Layout = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = (): void => {
    setOpen(true);
  };

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <LeftDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Container fixed sx={{ marginY: 5 }}>
        <Outlet />
      </Container>
    </>
  );
};
