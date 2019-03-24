import * as Types from "@this/types";
import { useObserver } from "mobx-react-lite";
import * as React from "react";
import { Store } from "./Store";
import * as Link from "./TreeLink";

const generateProps = (store: Store, link: Types.Link): Link.Props => {
  return {
    x1: link.source.x * store.scale.x + store.scale.offsetX,
    x2: link.target.x * store.scale.x + store.scale.offsetX,
    y1: link.source.y * store.scale.y + store.scale.offsetY,
    y2: link.target.y * store.scale.y + store.scale.offsetY,
  };
};

export const Container = ({ store }: { store: Store }) =>
  useObserver(() => (
    <>
      {store.links.map((link, idx) => {
        return <Link.Component {...generateProps(store, link)} key={`link-${idx}`} />;
      })}
    </>
  ));
