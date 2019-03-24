import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  radius: number;
  offset: number;
  scale: Types.Adjustment;
  nodes: Types.Node[];
  updateKey: (key: string) => void;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    nodes: domainStores.app.nodes,
    radius: 5,
    offset: 1,
    scale: domainStores.app.scale,
    updateKey: domainStores.app.updateKey,
  };
};
