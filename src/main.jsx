import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { UserChatContextProvider } from "./context/UserChatContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserChatContextProvider>
        <App />
      </UserChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
