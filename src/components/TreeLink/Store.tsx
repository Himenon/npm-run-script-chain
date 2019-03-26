import * as Domain from "@domain";
import * as Types from "@this/types";

export interface Store {
  links: Types.Link[];
  position: {
    scale: {
      x: number;
      y: number;
    };
    offset: {
      x: number;
      y: number;
    };
  };
  canShow: boolean;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  links: domainStores.app.state.links,
  position: {
    scale: {
      x: domainStores.dendrogram.state.size.height,
      y: domainStores.dendrogram.state.size.width / 1.5,
    },
    offset: {
      x: 0,
      y: domainStores.dendrogram.state.size.width / 7,
    },
  },
  canShow: !isNaN(domainStores.dendrogram.state.size.width) && !isNaN(domainStores.dendrogram.state.size.height),
});
