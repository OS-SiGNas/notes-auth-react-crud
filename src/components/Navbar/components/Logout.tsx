import { Button } from '@mui/material';
import { logOut } from '../../../services/usersService';

interface Props {
  setUser: (arg: null) => void;
}

export const LogoutButton = ({ setUser }: Props): JSX.Element => {
  return (
    <Button
      color="inherit"
      onClick={() => {
        logOut(setUser);
      }}
    >
      Logout
    </Button>
  );
};
