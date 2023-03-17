import { useReducer, useMemo } from "react";
import { LoginProviderProps } from "./interface";

export const LoginProvider = ({children}: LoginProviderProps) => {
  const [state, dispatch] = useReducer(enrollmentReducer, initialState);
  const value = useMemo(() => ({state, dispatch}), [state]);
  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};
