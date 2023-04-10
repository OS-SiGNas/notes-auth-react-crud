import { createContext, useState, useContext, useEffect } from 'react';
import { checkLocalUser } from '../services/usersService';
// Types
import type { Dispatch, SetStateAction, ReactNode } from 'react';
import type { User } from '../entities/UserInterfaces';

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

// Context
const UserContext = createContext<UserContextProps | null>(null);
// Provider
export const UserProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    void checkLocalUser(setUser);
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

// Hook
export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext) as UserContextProps;
  if (context === undefined) throw new Error('useUserContext must be within a UserProvider');
  return context;
};
