import { Route, Routes } from 'react-router-dom';
// Providers
import { UserProvider } from './context/userContext';
import { IsLoadingProvider } from './context/isLoadingContext';
import { NotesProvider } from './context/notesContext';
// components
import { Layout } from './components/Layout';
import { Home } from './views/Home';
import { Login } from './views/Login';
import { MyNotes } from './views/Notes';

export const App = (): JSX.Element => {
  return (
    <IsLoadingProvider>
      <UserProvider>
        <NotesProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/notes" element={<MyNotes />} />
            </Route>
          </Routes>
        </NotesProvider>
      </UserProvider>
    </IsLoadingProvider>
  );
};
