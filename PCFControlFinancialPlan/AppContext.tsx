import * as React from "react";
import { createContext, useContext } from "react";
import { IInputs } from "./generated/ManifestTypes";
import { PopupRequest } from "@azure/msal-browser";

export interface IAppContext {
  componentContext?: ComponentFramework.Context<IInputs>;
  tokenRequest?: PopupRequest;
  accessToken?: any;
  setAccessToken?: any;
}

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider: React.FC<IAppContext> = ({ children }) => {
  const [accessToken, setAccessToken] = React.useState();

  return (
    <AppContext.Provider
      value={{
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
