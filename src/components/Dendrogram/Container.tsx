import * as Domain from "@domain";
import * as React from "react";
import * as Link from "../TreeLink";
import * as Node from "../TreeNode";

export const Container = ({ stores, nodeStore }: { stores: Domain.Stores; nodeStore: Node.Store }) => {
  console.log(nodeStore);
  return (
    <svg height={"100%"} width={"100%"}>
      <Link.Container {...stores} />
      <Node.Container store={nodeStore} />
    </svg>
  );
};
