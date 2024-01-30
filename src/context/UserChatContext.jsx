import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firesbaseConfig";
import { AuthContext } from "./AuthContext";

export const UserChatContext = createContext();

export const UserChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <UserChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </UserChatContext.Provider>
  );
};
