import { Route, Routes } from 'react-router-dom';

import { Login } from './views/Login';
import { Home } from './views/Home';
import { Layout } from './components/Layout';
import { UserProvider } from './context/userContext';
import './App.css';

export const App = (): JSX.Element => {
  return (
    <>
      <h1>APP</h1>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route index path="/" element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </>
  );
};
