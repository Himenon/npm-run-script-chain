import * as Domain from "@domain";
import * as Link from "../TreeLink";
import * as Node from "../TreeNode";

export interface Store {
  linkStore: Link.Store;
  nodeStore: Node.Store;
}

export const generateStore = (domainStores: Domain.Reducers): Store => {
  return {
    nodeStore: Node.generateStore(domainStores),
    linkStore: Link.generateStore(domainStores),
  };
};
