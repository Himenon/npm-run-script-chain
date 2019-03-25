import * as Type from "@this/types";
import * as React from "react";

export interface UpdateKeyAction {
  type: "UPDATE_KEY";
  currentKey: string;
  pkg: Type.Package;
}

export type ActionTypes = UpdateKeyAction;

export type Dispatch = React.Dispatch<ActionTypes>;
