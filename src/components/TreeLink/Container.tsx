import * as Types from "@this/types";

import * as Domain from "@domain";
import * as React from "react";
import { Store } from "./Store";
import * as Link from "./TreeLink";

const generateProps = (domainState: Domain.App.State, link: Types.Link): Link.Props => {
  return {
    x1: link.source.x * domainState.scale.x + domainState.scale.offsetX,
    x2: link.target.x * domainState.scale.x + domainState.scale.offsetX,
    y1: link.source.y * domainState.scale.y + domainState.scale.offsetY,
    y2: link.target.y * domainState.scale.y + domainState.scale.offsetY,
  };
};

export const Container = ({ store }: { store: Store }) => {
  const domainState = React.useReducer(...store.domainStores.app.params)[0];
  return (
    <>
      {domainState.links.map((link, idx) => {
        return <Link.Component {...generateProps(domainState, link)} key={`link-${idx}`} />;
      })}
    </>
  );
};
