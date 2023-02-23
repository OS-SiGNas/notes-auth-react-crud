import { type Dispatch, type SetStateAction, type ReactNode, createContext, useState } from 'react';
import { type User } from '../entities/UserInterface';

interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface Props {
  children: ReactNode;
}

// type Props = { children: JSX.Element | JSX.Element[] };

// Context
export const UserContext = createContext<UserContextProps>({} as UserContextProps);
// Provider
export const UserProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
