import * as Domain from "@domain";
import * as Types from "@this/types";
import { State } from "./State";

export interface Store {
  updateKey: (key: string) => void;
  scale: Types.Adjustment;
  radius: number;
  offset: number;
  nodes: Types.Node[];
}

export const generateStore = (domainStores: Domain.Stores, state: State): Store => ({
  updateKey: (key: string) => {
    domainStores.app.dispatch({
      type: "UPDATE_KEY",
      currentKey: key,
    });
  },
  scale: state.scale,
  radius: state.radius,
  offset: state.offset,
  nodes: state.nodes,
});
