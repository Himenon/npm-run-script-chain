import * as React from "react";

import { Anchor, Tree } from "./components";
import { TreeData } from "./types";

interface AppProps {
  treeData?: TreeData;
  anchors: Anchor.Props[];
}

class App extends React.Component<AppProps, {}> {
  public render() {
    const anchors = Anchor.createAnchors(this.props.anchors);
    const treeData = this.props.treeData;
    return (
      <>
        {anchors}
        {treeData && <Tree.Component {...{ treeData }} />}
      </>
    );
  }
}

export { AppProps as Props, App as Component };
