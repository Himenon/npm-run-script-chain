import * as Types from "@this/types";

import * as App from "./App";
export { App };

export interface Reducers {
  app: App.Reducer;
}

export interface Stores {
  app: {
    state: App.State;
    dispatch: Types.Dispatcher;
  };
}

export const createReducers = (pkg: Types.Package): Reducers => {
  return {
    app: App.createReducer({ pkg }),
  };
};
