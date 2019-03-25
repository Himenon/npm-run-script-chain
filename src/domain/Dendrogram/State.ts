import * as Types from "@this/types";

export interface State {
  scale: Types.Adjustment;
  nodes: Types.Node[];
  links: Types.Link[];
  radius: number;
  offset: number;
}
