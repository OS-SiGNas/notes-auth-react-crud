import { Button } from '@mui/material';
// Hook context

interface Props {
  setUser: (arg: null) => void;
}

export const LogoutButton = ({ setUser }: Props): JSX.Element => {
  return (
    <Button
      color="inherit"
      onClick={() => {
        setUser(null);
        window.localStorage.removeItem('user');
      }}
    >
      Logout
    </Button>
  );
};
