import * as Types from "@this/types";

export interface Store {
  scripts: string[];
  // App.Storeに寄せる
  onClick: (key: string) => void;
  currentKey: string;
}

export const generateStore = (pkg: Types.Package, currentKey: string, onClick: (key: string) => void): Store => {
  return {
    scripts: Object.keys(pkg.scripts),
    currentKey,
    onClick,
  };
};
