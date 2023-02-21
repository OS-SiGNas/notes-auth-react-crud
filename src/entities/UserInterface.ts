export type Rol = "admin" | "dev" | "audit" | "user";

export interface User {
  token: string | null;
  _id: string | null;
  username: string | null;
  name: string | null;
  email: string | null;
  roles: Rol[];
  telf: string | null;
}
/*
export interface User {
  _id: string;
  token: string;
  username: string | null;
  name: string;
  email: string;
  roles: Rol[];
  telf: string;
}
*/

export type LoginType = { username: string; password: string };
