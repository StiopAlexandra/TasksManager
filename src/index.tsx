import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import UserProvider from "./providers/UserProvider/UserProvider.tsx";
import ErrorProvider from "./providers/ErrorProvider/ErrorProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ErrorProvider>
  </StrictMode>
);
