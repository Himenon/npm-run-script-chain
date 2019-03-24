import * as Domain from "@domain";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";

export interface Store {
  domainStores: Domain.Stores;
  menuStore: Menu.Store;
  dendrogram: Dendrogram.Store;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    domainStores,
    menuStore: Menu.generateStore(domainStores),
    dendrogram: Dendrogram.generateStore(domainStores),
  };
};
