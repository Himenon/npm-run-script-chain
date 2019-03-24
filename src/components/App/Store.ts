import * as Domain from "@domain";
import * as Types from "@this/types";
import * as Menu from "../Menu";
// import * as TreeLink from "../TreeLink";
// import * as TreeNode from "../TreeNode";

export interface Store {
  domainStores: {
    app: Domain.App.Store;
  };
  menuStore: Menu.Store;
  // nodeStore: TreeNode.Store;
  // treeLinkStore: TreeLink.Store;
}

export const generateStore = (pkg: Types.Package, currentKey: string) => {
  const app = Domain.App.generateStore(pkg, currentKey);
  const menuStore = Menu.generateStore(app);
  return {
    domainStores: {
      app,
    },
    menuStore,
  };
};
