import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Grid } from '@mui/material';
// Hooks Context
import { useFetchContext } from '../../context/fetchContext';
import { useUserContext } from '../../context/userContext';
import { useNotesContext } from '../../context/notesContext';
// Service
import { getNotes } from '../../services/notesService';
// Components
import { NoteCard } from './components/NoteCard';
import { CreateNoteForm } from './components/CreateNoteForm';

export const MyNotes = (): JSX.Element => {
  const { setFetching } = useFetchContext();
  const { user } = useUserContext();
  const { notes, setNotes } = useNotesContext();

  useEffect(() => {
    if (user !== null) void getNotes(user.token, setNotes, setFetching);
  }, [setFetching, setNotes, user]);

  const notesMapping = (): JSX.Element | JSX.Element[] | undefined => {
    if (notes?.length === 0) return <h1>No notes yet</h1>;
    return notes?.map((note) => (
      <Grid item key={note._id} xs={12} sm={6} md={4}>
        <NoteCard noteId={note._id} title={note.title} description={note.description} content={note.content} />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={1}>
      <Grid item>{user !== null ? <CreateNoteForm userToken={user.token} setFetching={setFetching} /> : null}</Grid>
      {user !== null ? notesMapping() : <Navigate to="/login" />}
    </Grid>
  );
};
