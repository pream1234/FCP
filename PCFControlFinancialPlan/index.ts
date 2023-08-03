import ReactDOM = require("react-dom");
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import React = require("react");
import { App, IAppProps } from "./App";
import {
  Configuration,
  PopupRequest,
  PublicClientApplication,
} from "@azure/msal-browser";

import AsyncLock = require("async-lock");

export class PCFControlFinancialPlan
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  /**
   * Empty constructor.
   */
  constructor() {}
  private _container: HTMLDivElement;
  private _msalInstance: PublicClientApplication;
  private _tokenRequest: PopupRequest;

  private _props: IAppProps;
  private _lock: any = new AsyncLock();

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    this._container = container;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    this._lock
      .acquire("init", async () => {
        if (
          this._msalInstance == null ||
          context.updatedProperties.includes("env_msalConfig")
        ) {
          this._msalInstance = await this.getMsalConfig("");
        }

        if (
          this._tokenRequest == null ||
          context.updatedProperties.includes("env_scopes")
        ) {
          this._tokenRequest = {
            scopes: await this.getScopes(""),
          };
        }
      })
      .then(() => {
        if (this._msalInstance) {
          this._props = {
            componentContext: context,
            msalInstance: this._msalInstance,
            tokenRequest: this._tokenRequest,
          };
          ReactDOM.render(
            React.createElement(App, this._props),
            this._container
          );
        }
      });
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  private getMsalConfig = async (envVarName: string) => {
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

  private getScopes = async (envVarName: string) => {
    let scopes: string[] = [];
    if (envVarName) {
      // scopes = (<string>(await this._environmentHelper.getValue(envVarName)))
      // 	.split(",")
      // 	.map(s => s.trim());
      scopes = [""];
    }
    return scopes;
  };
}
