import { createContext, useState, useContext } from 'react';

import type { ReactNode, Dispatch, SetStateAction } from 'react';

export type IsLoadingState = boolean | 'error';
interface IsLoadingContextProps {
  isLoading: IsLoadingState;
  setIsLoading: Dispatch<SetStateAction<IsLoadingState>>;
}

// Context
const IsLoadingContext = createContext<IsLoadingContextProps | null>(null);

// Provider
export const IsLoadingProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isLoading, setIsLoading] = useState<IsLoadingState>(false);

  return <IsLoadingContext.Provider value={{ isLoading, setIsLoading }}>{children}</IsLoadingContext.Provider>;
};

// Hook
export const useIsLoadingContext = (): IsLoadingContextProps => {
  const context = useContext(IsLoadingContext) as IsLoadingContextProps;
  if (context === undefined) throw new Error('useIsLoadingContext must be within a isLoadingProvider');
  return context;
};
