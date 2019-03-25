import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  updateKey: (key: string) => void;
  scale: Types.Adjustment;
  radius: number;
  offset: number;
  nodes: Types.Node[];
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    updateKey: (key: string) => {
      domainStores.app.dispatch({
        type: "UPDATE_KEY",
        currentKey: key,
      });
    },
    scale: domainStores.app.state.scale,
    radius: domainStores.app.state.radius,
    offset: domainStores.app.state.offset,
    nodes: domainStores.app.state.nodes,
  };
};
