import { InjectionToken } from "@angular/core";

export const APP_CONFIG = new InjectionToken<IAppConfig>("APP_CONFIG");

export interface IAppConfig {
  icsApiEndpoint: string;
  authGrantType: string;
}

export const AppConfig: IAppConfig = {
    icsApiEndpoint: "https://localhost:44305/",
    authGrantType: "password"
};
