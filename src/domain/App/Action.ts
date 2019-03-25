import * as React from "react";

export interface UpdateKeyAction {
  type: "UPDATE_KEY";
  currentKey: string;
}

export type ActionTypes = UpdateKeyAction;

export type Dispatch = React.Dispatch<ActionTypes>;
