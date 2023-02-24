import { type Dispatch, type SetStateAction, type ReactNode, createContext, useState } from 'react';
import { type User } from '../entities/UserInterface';

export interface UserContextProps {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  // setUser: (arg: User | null) => void;
}

// type Props = { children: JSX.Element | JSX.Element[] };
interface Props {
  children: ReactNode;
}

// Context
export const UserContext = createContext<UserContextProps | null>(null);
// Provider
export const UserProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
