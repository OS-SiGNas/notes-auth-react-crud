import { type Dispatch, type SetStateAction, type ReactNode, createContext, useState } from "react";
import { User } from "../entities/UserInterface";

type UserContextProps = { user: User | null; setUser: Dispatch<SetStateAction<User | null>> };
type Props = { children: ReactNode };
//type Props = { children: JSX.Element | JSX.Element[] };

// Context
export const UserContext = createContext<UserContextProps>({} as UserContextProps);
// Provider
export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
