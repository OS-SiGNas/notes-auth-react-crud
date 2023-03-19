import { Paper, Typography, Box, IconButton } from '@mui/material';
import { FavoriteBorder, Edit, Delete } from '@mui/icons-material';
// Hook Context
import { useUserContext } from '../../../context/userContext';
import { useNotesContext } from '../../../context/notesContext';
import { useFetchContext } from '../../../context/fetchContext';
// Service
import { deleteNote } from '../../../services/notesService';

interface Props {
  noteId: string;
  title: string;
  description: string;
  content: string;
}

export const NoteCard = ({ noteId, title, description, content }: Props): JSX.Element => {
  const { setFetching } = useFetchContext();
  const { user } = useUserContext();
  const { notes, setNotes } = useNotesContext();

  const handleDelete = (): void => {
    if (user !== null && notes !== null) void deleteNote(noteId, user.token, notes, setNotes, setFetching);
  };

  return (
    <Paper elevation={4}>
      <Box padding={1}>
        <Box>
          <Typography variant="h4">
            {title}
            <IconButton color="info">
              <FavoriteBorder />
            </IconButton>
          </Typography>
        </Box>
        <Typography variant="subtitle1" component="h2">
          {description}
        </Typography>
        <br />
        <Typography variant="body1" component="p">
          {content}
        </Typography>
        <Box padding={1}>
          <IconButton color="secondary" size="large">
            <Edit />
          </IconButton>
          <IconButton size="large" onClick={handleDelete}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
