import { type ReactNode, type Dispatch, type SetStateAction, createContext, useState } from 'react';

export type FetchState = boolean | 'error';
export interface FetchContextProps {
  fetching: FetchState;
  setFetching: Dispatch<SetStateAction<FetchState>>;
}

interface Props {
  children: ReactNode;
}

// Context
export const FetchContext = createContext<FetchContextProps | null>(null);

// Provider
export const FetchProvider = ({ children }: Props): JSX.Element => {
  const [fetching, setFetching] = useState<FetchState>(false);

  return <FetchContext.Provider value={{ fetching, setFetching }}>{children}</FetchContext.Provider>;
};
