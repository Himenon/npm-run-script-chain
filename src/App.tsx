import * as React from "react";

import { Anchor, Tree } from "./components";
import * as Tools from "./generator";
import { Package, TreeData } from "./types";

interface AppProps {
  raw: Package;
}

interface AppState {
  raw: Package;
  anchors: Anchor.Props[];
  key: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      raw: props.raw,
      anchors: this.generateAnchors(props.raw),
      key: "start",
    };
  }
  public render() {
    const anchors = Anchor.createAnchors(this.state.anchors);
    const treeData = this.getTreeData();
    return (
      <>
        {anchors}
        {treeData && <Tree.Component {...{ treeData }} />}
      </>
    );
  }
  private getTreeData(): TreeData | undefined {
    return Tools.generateTreeData(this.state.key, this.props.raw);
  }
  private generateAnchors(pkg: Package): Anchor.Props[] {
    return Object.keys(pkg.scripts).map(key => ({
      text: key,
      onClick: () => {
        this.setState({
          key,
        });
      },
    }));
  }
}

export { AppProps as Props, App as Component };
