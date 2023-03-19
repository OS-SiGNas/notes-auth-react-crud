import { createContext, useState, useContext } from 'react';

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import type { Note } from '../entities/NoteInterfaces';

interface NotesContextProps {
  notes: Note[] | null;
  setNotes: Dispatch<SetStateAction<Note[] | null>>;
}

// Context
const NotesContext = createContext<NotesContextProps | null>(null);

// Provider
export const NotesProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [notes, setNotes] = useState<Note[] | null>(null);

  return <NotesContext.Provider value={{ notes, setNotes }}>{children}</NotesContext.Provider>;
};

// Hook
export const useNotesContext = (): NotesContextProps => {
  const context = useContext(NotesContext) as NotesContextProps;
  if (context === undefined) throw new Error('useNotesContext must be within a NotesProvider');
  return context;
};
