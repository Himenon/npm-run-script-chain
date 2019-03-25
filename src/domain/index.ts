import * as Types from "@this/types";

import * as App from "./App";
export { App };

export interface Stores {
  app: App.Store;
}

export const generateDomainStore = (pkg: Types.Package): Stores => {
  const app = App.generateStore({ pkg });
  return {
    app,
  };
};
