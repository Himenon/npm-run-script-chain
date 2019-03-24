import * as Types from "@this/types";
// import { observer, useObservable } from "mobx-react-lite";

export interface Store {
  radius: number;
  offset: number;
  scale: Types.Adjustment;
  nodes: Types.Node[];
}

export const generateStore = (nodes: Types.Node[], scale: Types.Adjustment): Store => {
  return {
    nodes,
    radius: 5,
    offset: 1,
    scale,
  };
};
