import { useObserver } from "mobx-react-lite";
import * as React from "react";
import * as Link from "../TreeLink";
import * as Node from "../TreeNode";
import { Store } from "./Store";

export const Container = ({ store }: { store: Store }) =>
  useObserver(() => (
    <svg height={"100%"} width={"100%"}>
      <Link.Container store={store.linkStore} />
      <Node.Container store={store.nodeStore} />
    </svg>
  ));
