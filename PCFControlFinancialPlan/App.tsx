import * as React from "react";
import { IInputs } from "./generated/ManifestTypes";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
  useMsal,
  useMsalAuthentication,
} from "@azure/msal-react";
import {
  Configuration,
  IPublicClientApplication,
  InteractionRequiredAuthError,
  InteractionType,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";
import { Text } from "@fluentui/react/lib/Text";
import PcfForm from "./UI/PcfForm";
import "./App.css";
import { AppContext, AppProvider, IAppContext } from "./AppContext";

// import { AppProvider  } from "./AppContext";
// import { Layout } from "./ui/Layout";
// import { UserLookup } from "./components/UserLookup";

export interface IAppProps {
  componentContext: ComponentFramework.Context<IInputs>;
  msalInstance: IPublicClientApplication;
  tokenRequest: PopupRequest;
}
const getMsalConfig = () => {
  //const config: IConfig = await this._environmentHelper.getValue(envVarName);
  return new PublicClientApplication({
    auth: {
      clientId: "",
      authority: "" || "https://login.microsoftonline.com/common",
      redirectUri: "" || window.location.href,
      postLogoutRedirectUri: "" || window.location.href,
    },
  } as Configuration);
};
const msalInstance = getMsalConfig();
export const App: React.FC<IAppProps> = () => {
  const contextObj = React.useContext<IAppContext | null>(AppContext);

  const request = {
    scopes: ["User.Read"],
  };
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    request
  );
  const func = async () => {
    const silentRequest = {
      scopes: ["User.Read", "Mail.Read"],
    };

    try {
      const loginResponse = await msalInstance.ssoSilent(silentRequest);
      console.log("test", loginResponse);
    } catch (err) {
      if (err instanceof InteractionRequiredAuthError) {
        const loginResponse = await msalInstance
          .loginPopup(silentRequest)
          .catch((error) => {
            // handle error
          });
      } else {
        // handle error
      }
    }
  };
  React.useEffect(() => {
    func();
    contextObj?.setAccessToken("Token");
  }, []);
  return (
    <div className="App">
      <AppProvider>
        <MsalProvider instance={msalInstance}>
          <PcfForm lanaguage={"1035"} />
          {/* <Login /> */}
          {/* <AuthenticatedTemplate> */}
          {/* <PcfForm lanaguage={componentContext.userSettings.languageId} /> */}
          {/* </AuthenticatedTemplate> */}
          {/* <UnauthenticatedTemplate>
          <Text>Please use the Sign in button to login.</Text>
        </UnauthenticatedTemplate> */}
          {/* <PcfForm lanaguage={componentContext.userSettings.languageId} /> */}
        </MsalProvider>
      </AppProvider>
    </div>
  );
};
