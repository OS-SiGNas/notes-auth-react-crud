import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

export const LoginButton = (): JSX.Element => {
  return (
    <Button color="inherit" variant="outlined">
      <Link to="/login">Login</Link>
    </Button>
  );
};
