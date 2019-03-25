import * as Domain from "@domain";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";

export interface Store {
  domainStores: Domain.Reducers;
  menuStore: Menu.Store;
  dendrogram: Dendrogram.Store;
}

export const generateStore = (store: Domain.Reducers): Store => {
  return {
    domainStores: store,
    menuStore: Menu.generateStore(store),
    dendrogram: Dendrogram.generateStore(store),
  };
};
