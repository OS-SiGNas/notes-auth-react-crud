import { Route, Routes } from 'react-router-dom';
// Providers
import { UserProvider } from './context/userContext';
import { FetchProvider } from './context/fetchContext';
import { NotesProvider } from './context/notesContext';
// components
import { Layout } from './components/Layout';
import { Login } from './views/Login';
import { Home } from './views/Home';
import { MyNotes } from './views/Notes';
import './App.css';

export const App = (): JSX.Element => {
  return (
    <FetchProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/notes"
              element={
                <NotesProvider>
                  <MyNotes />
                </NotesProvider>
              }
            />
            <Route index path="/" element={<Home />} />
          </Route>
        </Routes>
      </UserProvider>
    </FetchProvider>
  );
};
