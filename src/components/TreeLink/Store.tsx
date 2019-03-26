import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  scale: Types.Adjustment;
  links: Types.Link[];
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  scale: domainStores.app.state.scale,
  links: domainStores.app.state.links,
});
