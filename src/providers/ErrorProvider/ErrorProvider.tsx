import { useState } from "react";

import ErrorContext from "../../contexts/ErrorContext";
import { Alert, Snackbar } from "@mui/material";
import { ErrorType } from "../../types";

type ErrorProviderProps = {
  children: React.ReactNode;
};

const ErrorProvider = ({ children }: ErrorProviderProps) => {
  const [error, setErrorState] = useState<ErrorType>(null);

  const setError = (error: ErrorType) => {
    setErrorState(error);
  };

  const clearError = () => {
    setErrorState(null);
  };

  const errorAlert = (
    <Snackbar
      autoHideDuration={5000}
      onClose={clearError}
      open={Boolean(error)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={"error"} onClose={clearError}>
        {error}
      </Alert>
    </Snackbar>
  );

  return (
    <ErrorContext.Provider value={{ setError, error }}>
      {children}
      {errorAlert}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
