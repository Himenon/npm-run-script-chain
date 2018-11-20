import { TreeData } from "./types";

export interface Package {
  scripts: {
    [key: string]: string;
  };
}

const NPM_RUN = /^npm run /;
const YARN_RUN = /^yarn run /;
const RUN_P = /^run-p /;

// start: "develop && develop:server"
// "npm run develop && npm run develop:server" // npm runで砂漠
// ["develop", "develop:server"]
// package.jsonにそれぞれあるか確認

// develop: "webpack --watch --config webpack.config.js"
// "webpack --watch --config webpack.config.js"
// ["webpack --watch --config webpack.config.js"].length === 1  ---> 現在のkeyをparentにchildrenに入れる

// start の children.push({ name: "develop", children: [] })

const makeTreeData = (key: string): TreeData => ({
  name: key,
  children: [],
});

const getSplitScripts = (runScriptString: string): string[] => {
  const scripts = runScriptString.split("&&");
  return scripts.map(script =>
    script
      .trim()
      .replace(NPM_RUN, "")
      .replace(RUN_P, "")
      .replace(YARN_RUN, ""),
  );
};

export const makeChain = (results: TreeData, pkg: Package): void => {
  const startKey = results.name;
  if (!(startKey in pkg.scripts)) {
    return;
  }
  const runScriptString = pkg.scripts[startKey];
  const childScriptKeys = getSplitScripts(runScriptString);
  childScriptKeys.forEach(key => {
    const childResult: TreeData = makeTreeData(key);
    if (childResult.name in pkg.scripts) {
      makeChain(childResult, pkg);
      results.children.push(childResult);
    }
  });
};
