import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

export const Home = (): JSX.Element => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      <h1>Home page</h1>
      <pre>{user ? JSON.stringify(user.token, null, 2) : "without user"}</pre>
    </>
  );
};
