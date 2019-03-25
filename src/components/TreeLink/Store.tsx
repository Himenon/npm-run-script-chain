import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  scale: Types.Adjustment;
  links: Types.Link[];
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    scale: domainStores.dendrogram.state.scale,
    links: domainStores.dendrogram.state.links,
  };
};
