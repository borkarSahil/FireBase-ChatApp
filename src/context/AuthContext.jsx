import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firesbaseConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect( () => {
    const res =  onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("Current user", user);
    });

    return () => {
      res();
    }
    
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
