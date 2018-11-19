export interface Package {
  scripts: {
    [key: string]: string;
  };
}

const NPM_RUN = /^npm run /;
const RUN_P = /^run-p /;

const splitScript = (scriptString: string, splitter: RegExp) => {
  return scriptString.replace(splitter, "").split(" ");
};

const separateRunScript = (scriptString: string): string[] => {
  const scripts = scriptString.split("&&").map(t => t.trim());
  let results: string[] = [];
  scripts.forEach(script => {
    if (script.match(NPM_RUN)) {
      results = results.concat(splitScript(script, NPM_RUN));
    }
    if (script.match(RUN_P)) {
      results = results.concat(splitScript(script, RUN_P));
    }
  });
  return results;
};

const scriptMap: Array<{ [key: string]: string[] | string }> = [];
export const parser = (pkg: Package, startKey: string): void => {
  if (startKey in pkg.scripts) {
    const scriptArray = separateRunScript(pkg.scripts[startKey]);
    if (scriptArray.length === 0) {
      scriptMap.push({
        [startKey]: pkg.scripts[startKey].split("&&").map(t => t.trim()),
      });
    } else {
      scriptArray.forEach(scriptKey => parser(pkg, scriptKey));
    }
  }
};
