import * as Domain from "@domain";

export interface Store {
  scripts: string[];
  onClick: (key: string) => void;
  currentKey: string;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    scripts: Object.keys(domainStores.app.pkg.scripts),
    currentKey: domainStores.app.currentKey,
    onClick: domainStores.app.updateKey,
  };
};
