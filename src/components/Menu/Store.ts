import * as Domain from "@domain";

export interface Store {
  domainStores: Domain.Reducers;
}

export const generateStore = (domainStores: Domain.Reducers): Store => {
  return {
    domainStores,
  };
};
