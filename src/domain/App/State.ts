import * as Types from "@this/types";

export interface State {
  npmUrl: string;
  currentKey: string;
  pkg: Types.Package;
  scripts: string[];
}
