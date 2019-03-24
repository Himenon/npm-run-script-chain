import * as Domain from "@domain";

export interface Store {
  scripts: string[];
  onClick: (key: string) => void;
  currentKey: string;
}

export const generateStore = (appStore: Domain.App.Store): Store => {
  return {
    scripts: Object.keys(appStore.pkg.scripts),
    currentKey: appStore.currentKey,
    onClick: appStore.updateKey,
  };
};
