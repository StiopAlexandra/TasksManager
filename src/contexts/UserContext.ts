import { createContext } from "react";
import { User } from "../types";

type UserContextType = {
  user: User["email"] | null;
  signIn: (user: User["email"]) => void;
  signOut: () => void;
}

export default createContext<UserContextType>({
  signIn: () => {},
  signOut: () => {},
  user: null,
});
