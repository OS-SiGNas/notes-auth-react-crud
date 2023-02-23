import { Button, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export const Navbar = (): JSX.Element => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My New App
        </Typography>
        <Button color="primary">
          <Link to="/login">Login</Link>
        </Button>
        <Button color="primary">
          <Link to="/">Home</Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};
