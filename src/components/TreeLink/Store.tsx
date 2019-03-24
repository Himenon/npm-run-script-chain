import * as Types from "@this/types";

export interface Store {
  links: Types.Link[];
  scale: Types.Adjustment;
}

export const generateStore = (links: Types.Link[], scale: Types.Adjustment): Store => {
  return {
    links,
    scale,
  };
};
