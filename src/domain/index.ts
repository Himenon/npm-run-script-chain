import * as Types from "@this/types";

import * as App from "./App";
export { App };

export interface Reducers {
  app: App.Store;
}

export interface Stores {
  app: {
    state: App.State;
    dispatch: Types.Dispatcher;
  };
}

export interface States {
  app: App.State;
}

export interface Dispatchers {
  app: Types.Dispatcher;
}

export interface ContainerParams {
  domainState: States;
  dispatchers: Dispatchers;
}

export const generateDomainStore = (pkg: Types.Package): Reducers => {
  const app = App.generateStore({ pkg });
  return {
    app,
  };
};
