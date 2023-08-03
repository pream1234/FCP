import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { IPublicClientApplication, PopupRequest } from "@azure/msal-browser";
import { Text } from "@fluentui/react/lib/Text";
import PcfForm from "./UI/PcfForm";
import "./App.css";
import { AppProvider } from "./AppContext";
import { Login } from "./UI/Login";
// import { AppProvider } from "./AppContext";
// import { Layout } from "./ui/Layout";
// import { UserLookup } from "./components/UserLookup";

export interface IAppProps {
  componentContext: ComponentFramework.Context<IInputs>;
  msalInstance: IPublicClientApplication;
  tokenRequest: PopupRequest;
}

export const App: React.FC<IAppProps> = (props: IAppProps) => {
  const { componentContext, msalInstance, tokenRequest } = props;

  return (
    <div className="App">
      <AppProvider
        componentContext={componentContext}
        tokenRequest={tokenRequest}
      >
        <MsalProvider instance={msalInstance}>
          <Login />
          <AuthenticatedTemplate>
            <PcfForm />
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Text>Please use the Sign in button to login.</Text>
          </UnauthenticatedTemplate>
        </MsalProvider>
      </AppProvider>
    </div>
  );
};
