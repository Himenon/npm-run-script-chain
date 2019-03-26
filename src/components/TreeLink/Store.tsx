import * as Types from "@this/types";
import { State } from "./State";

export interface Store {
  scale: Types.Adjustment;
  links: Types.Link[];
}

export const generateStore = (state: State): Store => ({
  scale: state.scale,
  links: state.links,
});
