import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

export const Home = (): JSX.Element => {
  const { user } = useUserContext();
  if (user !== null) {
    return <Navigate to="/notes" />;
  } else {
    return <Navigate to="/login" />;
  }
};
