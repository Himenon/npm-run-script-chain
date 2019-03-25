import * as Domain from "@domain";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";

export interface ViewStore {
  menuStore: Menu.Store;
  dendrogram: Dendrogram.Store;
}

export const createViewStores = (stores: Domain.Stores): ViewStore => {
  return {
    menuStore: Menu.generateStore(stores),
    dendrogram: Dendrogram.generateStore(stores),
  };
};
