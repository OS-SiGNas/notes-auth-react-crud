import { useState } from 'react';
import { Paper, Box } from '@mui/material';
// Hook Context
import { useNotesContext } from '../../../context/notesContext';
// Service
import { createNote } from '../../../services/notesService';
// Types
import type { FormEvent, ChangeEvent } from 'react';
import type { NewNote } from '../../../entities/NoteInterfaces';
import type { FetchState } from '../../../context/fetchContext';

interface Props {
  userToken: string;
  setFetching: (arg: FetchState) => void;
}

export const CreateNoteForm = ({ userToken, setFetching }: Props): JSX.Element => {
  const { notes, setNotes } = useNotesContext();
  const [newNote, setNewNote] = useState<NewNote>({ title: '', description: '', content: '' });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (notes !== null) void createNote(userToken, newNote, setFetching, notes, setNotes);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  return (
    <Paper elevation={4}>
      <Box padding={1}>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="title" name="title" onChange={handleInputChange} />
          <br />
          <input type="text" placeholder="description" name="description" onChange={handleInputChange} />
          <br />
          <textarea name="content" onChange={handleTextAreaChange} />
          <button>Save</button>
        </form>
      </Box>
    </Paper>
  );
};
