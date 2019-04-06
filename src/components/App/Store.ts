import * as Domain from "@domain";
import * as Definition from "../Definition";
import * as Dendrogram from "../Dendrogram";
import * as Menu from "../Menu";

export interface ViewStore {
  menu: Menu.Store;
  dendrogram: Dendrogram.Store;
  description: Definition.Store;
}

export const createViewStore = (stores: Domain.Stores): ViewStore => {
  return {
    menu: Menu.generateStore(stores),
    dendrogram: Dendrogram.generateStore(stores),
    description: Definition.generateStore(stores),
  };
};
