import * as React from "react";
const PathTree = require("paths-js/tree");
import * as Anchor from ".//components/Anchor";
import * as Tree from ".//components/Tree";
import { TreeData } from "./types";

interface AppProps {
  treeData: TreeData;
  anchors: Anchor.Props[];
}

const generateTreeProps = (data: any, size: { width: number; height: number }, anchors: Anchor.Props[]): Tree.Props => {
  return {
    tree: PathTree({
      data,
      children: Tree.children,
      width: size.width,
      height: size.height,
    }),
    size,
    anchors,
  };
};

class App extends React.Component<AppProps, {}> {
  public render() {
    const props = generateTreeProps(this.props.treeData, { width: 350, height: 300 }, this.props.anchors);
    return <Tree.Component {...props} />;
  }
}

export { AppProps as Props, App as Component };
