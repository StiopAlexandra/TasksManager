import { useEffect, useMemo, useState } from "react";

import UserContext from "../../contexts/UserContext";
import { User } from "../../types";
import { ACCESS_KEY } from "../../config";
import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
} from "../../utils/storageUtils";

type UserProviderProps = {
  children: React.ReactNode;
};

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User["email"] | null>(null);

  const signOut = () => {
    removeFromStorage(ACCESS_KEY);
    setUser(null);
  };

  const signIn = (email: User["email"]) => {
    saveToStorage(ACCESS_KEY, email);
    setUser(email);
  };

  const contextValue = useMemo(
    () => ({
      signIn,
      signOut,
      user,
    }),
    [signIn, signOut, user]
  );

  useEffect(() => {
    const user = loadFromStorage<string>(ACCESS_KEY);
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
