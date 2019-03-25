import * as Types from "@this/types";
import { State } from "./State";

export const generateState = (currentKey: string, pkg: Types.Package): State => {
  return {
    npmUrl: "https://www.npmjs.com/package/npm-run-script-chain",
    currentKey,
    pkg,
    scripts: Object.keys(pkg.scripts),
  };
};
