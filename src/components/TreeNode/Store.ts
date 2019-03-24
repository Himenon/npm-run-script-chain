import * as Types from "@this/types";

export interface Store {
  radius: number;
  offset: number;
  scale: Types.Adjustment;
  nodes: Types.Node[];
  updateKey: (key: string) => void;
}

export const generateStore = (nodes: Types.Node[], scale: Types.Adjustment, updateKey: (key: string) => void): Store => {
  return {
    nodes,
    radius: 5,
    offset: 1,
    scale,
    updateKey,
  };
};
