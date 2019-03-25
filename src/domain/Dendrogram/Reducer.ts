import * as Types from "@this/types";
import { ActionTypes } from "./Action";
import * as Factory from "./Factory";
import { State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_KEY": {
      return Factory.generateState(action.currentKey, action.pkg);
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = ({ key, pkg }: { key: string; pkg: Types.Package }): Reducer => {
  const initialState = Factory.generateState(key, pkg);
  return [reducer, initialState];
};
