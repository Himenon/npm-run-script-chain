import * as Types from "@this/types";

import * as App from "./App";
export { App };

import * as Dendrogram from "./Dendrogram";
export { Dendrogram };

export interface Reducers {
  app: App.Reducer;
  dendrogram: Dendrogram.Reducer;
}

export interface Stores {
  app: {
    state: App.State;
    dispatch: App.Dispatch;
  };
  dendrogram: {
    state: Dendrogram.State;
    dispatch: Dendrogram.Dispatch;
  };
}

export const createReducers = ({ key, pkg }: { key: string; pkg: Types.Package }): Reducers => {
  return {
    app: App.createReducer({ key, pkg }),
    dendrogram: Dendrogram.createReducer({ key, pkg }),
  };
};
