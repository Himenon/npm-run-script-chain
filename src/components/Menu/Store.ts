import * as Domain from "@domain";

export interface Store {
  domainStores: Domain.Stores;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    domainStores,
  };
};
