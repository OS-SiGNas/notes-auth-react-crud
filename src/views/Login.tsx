import { type FormEvent, type ChangeEvent, useContext, useState } from "react";
import { UserContext } from "../context/userContext";

import { LoginType } from "../entities/UserInterface";
import { loginHandler } from "../services/authService";

export const Login = (): JSX.Element => {
  const { user, setUser } = useContext(UserContext);
  const [login, setLogin] = useState<LoginType>({ username: "", password: "" });
  //const { user, dispatch } = useContext(UserContext);

  //handlers
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await loginHandler(login);
    //if (data) dispatch({ type: "login", payload: data });
    if (response?.data) setUser(response?.data);
    console.log(user);
  };

  const handleInputChanche = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  // Main Element
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="username"
          name="username"
          onChange={handleInputChanche}
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleInputChanche}
        />
        <button>Login</button>
      </form>
      <pre>
        {user ? JSON.stringify(user.username, null, 2) : "without user"}
      </pre>
    </>
  );
};
