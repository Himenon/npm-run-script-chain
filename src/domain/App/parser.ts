import { Package, TreeData } from "@this/types";

export interface SplitScript {
  name: string;
  description: string;
  option: {
    run_p: boolean;
  };
}

const NPM_RUN = /^npm run /;
const YARN_RUN = /^yarn run /;
const RUN_P = /^run-p /;

const makeTreeData = ({ name, description }: { name: string; description: string }): TreeData => ({
  name,
  description,
  children: [],
});

/**
 * SplitScript を返す
 * @param script
 */
const getFormatScript = (script: string): SplitScript => {
  return {
    name: script
      .trim()
      .replace(NPM_RUN, "")
      .replace(RUN_P, "")
      .replace(YARN_RUN, ""),
    description: script,
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
    const childResult = makeTreeData(childScript);
    // build:* などの正規表現にマッチした場合
    if (childScript.option.run_p && childScript.name.match(/\*/) !== null) {
      const pt = childScript.name.replace(/\*/, "(.+)");
      const regex = new RegExp(pt);
      const parallelScript = makeTreeData(childScript);
      for (const pkgKey in pkg.scripts) {
        if (pkgKey.match(regex) !== null) {
          const description = pkg.scripts[pkgKey];
          const subChildScript = makeTreeData({ name: pkgKey, description });
          makeChain(subChildScript, pkg, deleteKeys);
          parallelScript.children.push(subChildScript);
        }
      }
      parentResult.children.push(parallelScript);
    } else if (childScript.option.run_p && childScript.name.match(/\*/) === null) {
      const childScripts = getSplitScripts(childScript.name, " ");
      makeChildChain(parentResult, childScripts, pkg, deleteKeys);
    } else if (childResult.name in pkg.scripts) {
      makeChain(childResult, pkg, deleteKeys);
      parentResult.children.push(childResult);
    }
  });
};

export const makeChain = (parentResult: TreeData, pkg: Package, deleteKeys: string[] = []): TreeData => {
  const startKey = parentResult.name;
  if (!(startKey in pkg.scripts) || deleteKeys.includes(startKey)) {
    return parentResult;
  }
  deleteKeys.push(startKey);
  const runScriptString = pkg.scripts[startKey];
  const childScripts = getSplitScripts(runScriptString);
  makeChildChain(parentResult, childScripts, pkg, deleteKeys);
  return parentResult;
};
