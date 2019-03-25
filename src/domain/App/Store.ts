import * as Types from "@this/types";
import { appReducer, generateState } from "./Reducer";
import { State } from "./State";

export type Reducer = [typeof appReducer, State];

export const createReducer = ({ pkg }: { pkg: Types.Package }): Reducer => {
  const initialState = generateState("start", pkg);
  return [appReducer, initialState];
};
