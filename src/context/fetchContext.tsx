import { createContext, useState, useContext } from 'react';

import type { ReactNode, Dispatch, SetStateAction } from 'react';

export type FetchState = boolean | 'error';
interface FetchContextProps {
  fetching: FetchState;
  setFetching: Dispatch<SetStateAction<FetchState>>;
}

// Context
const FetchContext = createContext<FetchContextProps | null>(null);

// Provider
export const FetchProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [fetching, setFetching] = useState<FetchState>(false);

  return <FetchContext.Provider value={{ fetching, setFetching }}>{children}</FetchContext.Provider>;
};

// Hook
export const useFetchContext = (): FetchContextProps => {
  const context = useContext(FetchContext) as FetchContextProps;
  if (context === undefined) throw new Error('useFetchContext must be within a FetchProvider');
  return context;
};
