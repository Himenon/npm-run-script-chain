import * as Types from "@this/types";
import { ActionTypes } from "./Action";
import * as Factory from "./Factory";
import { State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_KEY": {
      return Factory.generateState(action.currentKey, state.pkg, state.library);
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = ({ key, pkg, library }: { key: string; pkg: Types.Package; library: Types.Library }): Reducer => {
  const initialState = Factory.generateState(key, pkg, library);
  return [reducer, initialState];
};
