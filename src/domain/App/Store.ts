import * as Types from "@this/types";
import { appReducer, generateState } from "./Reducer";
import { State } from "./State";

export interface Store {
  params: [typeof appReducer, State];
}

export const generateStore = ({ pkg }: { pkg: Types.Package }): Store => {
  const initialState = generateState("start", pkg);
  return {
    params: [appReducer, initialState],
  };
};
