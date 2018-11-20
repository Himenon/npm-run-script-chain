import { TreeData } from "./types";

export interface Package {
  scripts: {
    [key: string]: string;
  };
}

export interface SplitScript {
  key: string;
  option: {
    run_p: boolean;
  };
}

const NPM_RUN = /^npm run /;
const YARN_RUN = /^yarn run /;
const RUN_P = /^run-p /;

const makeTreeData = (key: string): TreeData => ({
  name: key,
  children: [],
});

const getFormatScript = (script: string): SplitScript => {
  return {
    key: script
      .trim()
      .replace(NPM_RUN, "")
      .replace(RUN_P, "")
      .replace(YARN_RUN, ""),
    option: {
      run_p: script.trim().match(RUN_P) !== null,
    },
  };
};

const getSplitScripts = (runScriptString: string): SplitScript[] => {
  const scripts = runScriptString.split("&&");
  return scripts.map(getFormatScript);
};

export const makeChain = (parentResult: TreeData, pkg: Package): void => {
  const startKey = parentResult.name;
  if (!(startKey in pkg.scripts)) {
    return;
  }
  const runScriptString = pkg.scripts[startKey];
  const childScripts = getSplitScripts(runScriptString);
  childScripts.forEach(childScript => {
    const childResult = makeTreeData(childScript.key);
    if (childScript.option.run_p) {
      const pt = childScript.key.replace(/\*/, "(.+)");
      const regex = new RegExp(pt);
      const parallelScript = makeTreeData(childScript.key);
      for (const pkgKey in pkg.scripts) {
        if (pkgKey.match(regex) !== null) {
          const subChildScript = makeTreeData(pkgKey);
          makeChain(subChildScript, pkg);
          parallelScript.children.push(subChildScript);
        }
      }
      parentResult.children.push(parallelScript);
    } else {
      if (childResult.name in pkg.scripts) {
        makeChain(childResult, pkg);
        parentResult.children.push(childResult);
      }
    }
  });
};
