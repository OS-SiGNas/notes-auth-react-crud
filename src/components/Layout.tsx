import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const Layout = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
