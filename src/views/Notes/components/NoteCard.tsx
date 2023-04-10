import { useState } from 'react';
import { Paper, Typography, Box, IconButton, CardHeader, Menu, MenuItem, ListItemIcon } from '@mui/material';
import { FavoriteBorder, Edit, Delete } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// Hook Context
import { useNotesContext } from '../../../context/notesContext';
import { useIsLoadingContext } from '../../../context/isLoadingContext';
// Service
import { deleteNote } from '../../../services/notesService';

import type { MouseEvent } from 'react';
import { CreateNoteDialog } from './CreateNoteDialog';

interface Props {
  index: number;
  noteId: string;
  title: string;
  date: string;
  description: string;
  content: string;
  handleDialogOpen: () => void;
}

export const NoteCard = ({ index, noteId, title, date, description, content }: Props): JSX.Element => {
  const { setIsLoading } = useIsLoadingContext();
  const { notes, setNotes } = useNotesContext();
  const [isOpenMenu, setIstOpenMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleToglleDialog = (): void => {
    setIsOpenDialog(!isOpenDialog);
    setIstOpenMenu(false);
  };

  const handleDelete = (): void => {
    if (notes === null) return;
    void deleteNote(noteId, notes, setNotes, setIsLoading);
    if (isOpenMenu) setIstOpenMenu(!isOpenMenu);
  };

  const toggleMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
    setIstOpenMenu(!isOpenMenu);
  };

  return (
    <Box>
      <Paper elevation={4} sx={{ padding: '20px' }}>
        <CardHeader
          sx={{ padding: '0px' }}
          action={
            <>
              <IconButton>
                <FavoriteBorder />
              </IconButton>
              <IconButton aria-label="settings" onClick={toggleMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu open={isOpenMenu} onClose={toggleMenu} anchorEl={anchorEl}>
                <MenuItem onClick={handleToglleDialog}>
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  Edit
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                  <ListItemIcon>
                    <Delete />
                  </ListItemIcon>
                  Delete
                </MenuItem>
              </Menu>
            </>
          }
          title={<Typography variant="h4">{title}</Typography>}
          subheader={new Date(date).toLocaleString()}
        />
        <Box marginBottom={2}>
          <Typography variant="subtitle2">{description}</Typography>
        </Box>

        <Typography variant="body1" component="p">
          {content}
        </Typography>
        <CreateNoteDialog
          create={false}
          openDialog={isOpenDialog}
          handleToglleDialog={handleToglleDialog}
          currentNote={{ index, noteId, title, description, content }}
        />
      </Paper>
    </Box>
  );
};
