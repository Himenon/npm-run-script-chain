import * as Types from "@this/types";

import * as Domain from "@domain";
import * as React from "react";
import * as Link from "./TreeLink";

const generateProps = (stores: Domain.Stores, link: Types.Link): Link.Props => {
  return {
    x1: link.source.x * stores.app.state.scale.x + stores.app.state.scale.offsetX,
    x2: link.target.x * stores.app.state.scale.x + stores.app.state.scale.offsetX,
    y1: link.source.y * stores.app.state.scale.y + stores.app.state.scale.offsetY,
    y2: link.target.y * stores.app.state.scale.y + stores.app.state.scale.offsetY,
  };
};

export const Container = (stores: Domain.Stores) => {
  return (
    <>
      {stores.app.state.links.map((link, idx) => {
        return <Link.Component {...generateProps(stores, link)} key={`link-${idx}`} />;
      })}
    </>
  );
};
