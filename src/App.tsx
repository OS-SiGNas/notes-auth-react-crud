import { Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout';
import { UserProvider } from './context/userContext';
import { FetchProvider } from './context/fetchContext';

import { Login } from './views/Login';
import { Home } from './views/Home';
import { MyNotes } from './views/Notes';
import './App.css';

export const App = (): JSX.Element => {
  return (
    <>
      <h1>APP</h1>
      <FetchProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={<MyNotes />} />
              <Route index path="/" element={<Home />} />
            </Route>
          </Routes>
        </UserProvider>
      </FetchProvider>
    </>
  );
};
