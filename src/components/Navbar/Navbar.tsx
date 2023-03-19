import { Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// Hook Context
import { useUserContext } from '../../context/userContext';
// components
import { LoginButton } from './components/LoginButton';
import { LogoutButton } from './components/Logout';
// styled
import { AppBar } from './styled/styledAppBar';

interface Props {
  open: boolean;
  handleDrawerOpen: () => void;
}

export const Navbar = ({ open, handleDrawerOpen }: Props): JSX.Element => {
  const { user, setUser } = useUserContext();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
          onClick={handleDrawerOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyNotes
        </Typography>
        {user !== null ? <LogoutButton setUser={setUser} /> : <LoginButton />}
      </Toolbar>
    </AppBar>
  );
};
