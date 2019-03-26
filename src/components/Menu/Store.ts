import * as Domain from "@domain";

export interface Store {
  currentKey: string;
  scripts: string[];
  updateKey: (key: string) => void;
}

export const generateStore = (domainStores: Domain.Stores): Store => ({
  currentKey: domainStores.app.state.currentKey,
  scripts: domainStores.app.state.scripts,
  updateKey: (key: string) => {
    domainStores.app.dispatch({
      type: "UPDATE_KEY",
      currentKey: key,
    });
  },
});
