import React, { ReactNode } from "react";
import { Provider } from "react-redux/es/exports";
import { AuthProvider } from "./auth-context";
import { store } from "../store/index";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
