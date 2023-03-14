import { useState, useContext, useEffect } from 'react';
import { getNotes } from '../services/notesService';
import { UserContext } from '../context/userContext';
import { FetchContext } from '../context/fetchContext';
import { NoteCard } from '../components/Note';

import type { Note } from '../entities/NoteInterfaces';
import type { UserContextProps } from '../context/userContext';
import type { FetchContextProps } from '../context/fetchContext';

export const MyNotes = (): JSX.Element => {
  const { setFetching } = useContext(FetchContext) as FetchContextProps;
  const { user } = useContext(UserContext) as UserContextProps;
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    void getNotes(user.token, setNotes, setFetching);
  }, []);

  const notesMapping = notes?.map((note) => (
    <NoteCard key={note._id} title={note.title} description={note.description} content={note.content} />
  ));

  return (
    <>
      <h1>Notes</h1>
      {notes !== null ? notesMapping : 'with outh notes'}
    </>
  );
};
