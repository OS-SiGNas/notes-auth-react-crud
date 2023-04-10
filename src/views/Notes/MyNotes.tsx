import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// Ui
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
// Hooks Context
import { useIsLoadingContext } from '../../context/isLoadingContext';
import { useUserContext } from '../../context/userContext';
import { useNotesContext } from '../../context/notesContext';
// Service
import { getNotes } from '../../services/notesService';
// Components
import { NoteCard } from './components/NoteCard';
import { CreateNoteDialog } from './components/CreateNoteDialog';

const StyledFab = styled(Fab)({
  position: 'fixed',
  zIndex: 1,
  bottom: 20,
  right: 20,
});

export const MyNotes = (): JSX.Element => {
  const { setIsLoading } = useIsLoadingContext();
  const { user } = useUserContext();
  const { notes, setNotes } = useNotesContext();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  useEffect(() => {
    if (user === null) return;
    void getNotes(setNotes, setIsLoading);
  }, [user, setNotes, setIsLoading]);

  const handleToglleDialog = (): void => {
    setIsOpenDialog(!isOpenDialog);
  };

  const notesMapping = (): JSX.Element | JSX.Element[] => {
    if (user === null) return <Navigate to="/login" />;
    if (notes === null) return <h1>No notes yet</h1>;
    if (notes.length === 0) return <h1>No notes yet</h1>;
    return notes.map((note, index) => (
      <Grid item key={note._id} xs={12} sm={6} md={4}>
        <NoteCard
          index={index}
          noteId={note._id}
          title={note.title}
          date={note.createAt}
          description={note.description}
          content={note.content}
          handleDialogOpen={handleToglleDialog}
        />
      </Grid>
    ));
  };

  return (
    <Grid container spacing={1}>
      {notesMapping()}
      <StyledFab color="warning" aria-label="add" onClick={handleToglleDialog}>
        <AddIcon />
      </StyledFab>
      <CreateNoteDialog
        create={true}
        openDialog={isOpenDialog}
        handleToglleDialog={handleToglleDialog}
        currentNote={{ title: '', description: '', content: '', index: 0, noteId: '' }}
      />
    </Grid>
  );
};

// {user !== null && notes !== null ? notesMapping() : <Navigate to="/login" />}
