import * as Types from "@this/types";

export interface State {
  npmUrl: string;
  currentKey: string;
  pkg: Types.Package;
  scripts: string[];
  scale: Types.Adjustment;
  nodes: Types.Node[];
  links: Types.Link[];
  radius: number;
  offset: number;
}
