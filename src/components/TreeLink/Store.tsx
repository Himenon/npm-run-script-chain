import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  links: Types.Link[];
  scale: Types.Adjustment;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    links: domainStores.app.links,
    scale: domainStores.app.scale,
  };
};
