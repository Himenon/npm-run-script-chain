import { TreeData } from "./types";

export interface Package {
  scripts: {
    [key: string]: string;
  };
}

export interface SplitScript {
  key: string;
  script: string;
  option: {
    run_p: boolean;
  };
}

const NPM_RUN = /^npm run /;
const YARN_RUN = /^yarn run /;
const RUN_P = /^run-p /;

const makeTreeData = (key: string, script: string): TreeData => ({
  name: key,
  script,
  children: [],
});

/**
 * SplitScript を返す
 * @param script
 */
const getFormatScript = (script: string): SplitScript => {
  return {
    key: script
      .trim()
      .replace(NPM_RUN, "")
      .replace(RUN_P, "")
      .replace(YARN_RUN, ""),
    script: script.trim(),
    option: {
      run_p: script.trim().match(RUN_P) !== null,
    },
  };
};

/**
 * "a 6& b && c" を　[{ key: "a", options:{} }, ... ] にする
 * @param runScriptString
 */
const getSplitScripts = (runScriptString: string, splitPattern: string = "&&"): SplitScript[] => {
  const scripts = runScriptString.split(splitPattern);
  return scripts.map(getFormatScript);
};

export const makeChildChain = (parentResult: TreeData, scripts: SplitScript[], pkg: Package, deleteKeys: string[]) => {
  scripts.forEach(childScript => {
    const childResult = makeTreeData(childScript.key, childScript.script);
    // build:* などの正規表現にマッチした場合
    if (childScript.option.run_p && childScript.key.match(/\*/) !== null) {
      const pt = childScript.key.replace(/\*/, "(.+)");
      const regex = new RegExp(pt);
      const parallelScript = makeTreeData(childScript.key, childScript.script);
      for (const pkgKey in pkg.scripts) {
        if (pkgKey.match(regex) !== null) {
          const subChildScript = makeTreeData(pkgKey, pkg.scripts[pkgKey]);
          makeChain(subChildScript, pkg, deleteKeys);
          if (parallelScript.children) {
            parallelScript.children.push(subChildScript);
          } else {
            parallelScript.children = [subChildScript];
          }
        }
      }
      if (parentResult.children) {
        parentResult.children.push(parallelScript);
      } else {
        parentResult.children = [parallelScript];
      }
    } else if (childScript.option.run_p && childScript.key.match(/\*/) === null) {
      const childScripts = getSplitScripts(childScript.key, " ");
      makeChildChain(parentResult, childScripts, pkg, deleteKeys);
    } else if (childResult.name in pkg.scripts) {
      makeChain(childResult, pkg, deleteKeys);
      if (parentResult.children) {
        parentResult.children.push(childResult);
      } else {
        parentResult.children = [childResult];
      }
    }
  });
};

export const makeChain = (parentResult: TreeData, pkg: Package, deleteKeys: string[] = []): void => {
  const startKey = parentResult.name;
  if (!(startKey in pkg.scripts) || deleteKeys.includes(startKey)) {
    return;
  }
  if (!parentResult.children) {
    parentResult.children = [];
  }
  deleteKeys.push(startKey);
  const runScriptString = pkg.scripts[startKey];
  const childScripts = getSplitScripts(runScriptString);
  makeChildChain(parentResult, childScripts, pkg, deleteKeys);
};
