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
      domainStores.dendrogram.dispatch({
        type: "UPDATE_KEY",
        currentKey: key,
        pkg: domainStores.app.state.pkg,
      });
    },
    scale: domainStores.dendrogram.state.scale,
    radius: domainStores.dendrogram.state.radius,
    offset: domainStores.dendrogram.state.offset,
    nodes: domainStores.dendrogram.state.nodes,
  };
};
