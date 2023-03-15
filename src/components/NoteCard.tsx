import { Paper, Typography, Box, IconButton } from '@mui/material';
import { FavoriteBorder, Edit, Delete } from '@mui/icons-material';

interface Props {
  title: string;
  description: string;
  content: string;
}

export const NoteCard = ({ title, description, content }: Props): JSX.Element => {
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
          <IconButton size="large">
            <Delete />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
};
