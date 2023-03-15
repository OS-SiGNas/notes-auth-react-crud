import { useState, useContext, useEffect } from 'react';
import { getNotes } from '../services/notesService';
import { UserContext } from '../context/userContext';
import { FetchContext } from '../context/fetchContext';
import { NoteCard } from '../components/NoteCard';

import { Grid } from '@mui/material';

import type { Note } from '../entities/NoteInterfaces';
import type { UserContextProps } from '../context/userContext';
import type { FetchContextProps } from '../context/fetchContext';
import { Navigate } from 'react-router-dom';

export const MyNotes = (): JSX.Element => {
  const { setFetching } = useContext(FetchContext) as FetchContextProps;
  const { user } = useContext(UserContext) as UserContextProps;
  const [notes, setNotes] = useState<Note[] | null>(null);

  useEffect(() => {
    if (user !== null) void getNotes(user?.token, setNotes, setFetching);
  }, []);

  const notesMapping = notes?.map((note) => (
    <Grid item key={note._id} xs={12} sm={6} md={4}>
      <NoteCard title={note.title} description={note.description} content={note.content} />
    </Grid>
  ));

  return (
    <Grid container spacing={5}>
      {user !== null ? notesMapping : <Navigate to="/login" />}
    </Grid>
  );
};
