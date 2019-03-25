import * as Domain from "@domain";

export interface Store {
  scripts: string[];
  domainStores: Domain.Stores;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    scripts: Object.keys(domainStores.app.pkg.scripts),
    domainStores,
  };
};
