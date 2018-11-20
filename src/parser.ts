import { TreeData } from "./types";

export interface Package {
  scripts: {
    [key: string]: string;
  };
}

const NPM_RUN = /^npm run /;
const RUN_P = /^run-p /;

const runScriptsSplit = (runScriptString: string): TreeData[] => {
  return [];
};

export const parser = (results: TreeData) => (pkg: Package): void => {
  const startKey = results.name;
  if (!(startKey in pkg.scripts)) {
    results.children = [];
  }
  const runScriptString = pkg.scripts[startKey];
  results.children = runScriptsSplit(runScriptString);
};
