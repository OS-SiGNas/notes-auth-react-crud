import { Link } from 'react-router-dom';

import { Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const Navbar = (): JSX.Element => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyNotes
        </Typography>

        <Button color="inherit" variant="contained">
          <Link to="/notes">Notes</Link>
        </Button>

        <Button color="inherit">
          <Link to="/">Home</Link>
        </Button>

        <Button color="inherit">
          <Link to="/login">Login</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
