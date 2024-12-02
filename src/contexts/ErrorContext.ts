import { createContext } from "react";
import { ErrorType } from "../types";

type ErrorContextType = {
  error: ErrorType;
  setError: (error: ErrorType) => void;
}

export default createContext<ErrorContextType>({
  error: null,
  setError: () => {},
});
