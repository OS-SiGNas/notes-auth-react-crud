import { useState } from 'react';
import { Button, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// Hooks context
import { useNotesContext } from '../../../context/notesContext';
import { useIsLoadingContext } from '../../../context/isLoadingContext';
// Service
import { createNote, updateNote } from '../../../services/notesService';
// type
import type { ChangeEvent } from 'react';
import type { NewNote } from '../../../entities/NoteInterfaces';

interface Props {
  create: boolean;
  openDialog: boolean;
  handleToglleDialog: () => void;
  currentNote: {
    index: number;
    noteId: string;
    title: string;
    description: string;
    content: string;
  };
}

export const CreateNoteDialog = ({ create, openDialog, handleToglleDialog, currentNote }: Props): JSX.Element => {
  const { notes, setNotes } = useNotesContext();
  const { setIsLoading } = useIsLoadingContext();
  const [newNote, setNewNote] = useState({
    title: currentNote.title,
    description: currentNote.description,
    content: currentNote.content,
  });

  const handleCreate = (): void => {
    // const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    // event.preventDefault();
    if (notes === null) return;
    void createNote(newNote, setIsLoading, notes, setNotes);
    handleToglleDialog();
  };

  const handleUpdate = (): void => {
    if (notes === null) return;
    const { index, noteId } = currentNote;
    const body: NewNote = {};
    if (notes[index].title !== newNote.title) body.title = newNote.title;
    if (notes[index].description !== newNote.description) body.description = newNote.description;
    if (notes[index].content !== newNote.content) body.content = newNote.content;
    void updateNote(noteId, body, notes, setNotes, setIsLoading);
    handleToglleDialog();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setNewNote({
      ...newNote,
      [name]: value,
    });
  };

  return (
    <Box>
      <Dialog open={openDialog} onClose={handleToglleDialog}>
        <DialogTitle>{create ? 'Create Note' : 'Update Note'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={newNote.title}
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newNote.description}
            onChange={handleInputChange}
          />
          <TextField
            rows={6}
            autoFocus
            multiline
            margin="dense"
            name="content"
            label="Content"
            type="text"
            fullWidth
            value={newNote.content}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleToglleDialog}>Cancel</Button>
          {create ? <Button onClick={handleCreate}>Create</Button> : <Button onClick={handleUpdate}>Update</Button>}
        </DialogActions>
      </Dialog>
    </Box>
  );
};
