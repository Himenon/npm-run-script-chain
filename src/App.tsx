import * as React from "react";

import { Anchor, Tree } from "./components";
import * as Tools from "./generator";
import { Package, TreeData } from "./types";

const classNames = require("./index.scss");

interface AppProps {
  raw: Package;
}

interface AppState {
  raw: Package;
  key: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      raw: props.raw,
      key: "start",
    };
  }
  public render() {
    const anchors = this.generateAnchors(this.props.raw);
    const treeData = this.getTreeData();
    return (
      <div className={classNames.container}>
        <div className={classNames.row}>
          <div className={classNames.col2}>{anchors}</div>
          {treeData && (
            <div className={[classNames.col8, classNames.overflowAuto].join(" ")}>
              <Tree.Component {...{ treeData }} />
            </div>
          )}
        </div>
      </div>
    );
  }
  private getTreeData(): TreeData | undefined {
    return Tools.generateTreeData(this.state.key, this.props.raw);
  }
  private generateAnchors(pkg: Package) {
    const anchors: Anchor.Props[] = Object.keys(pkg.scripts).map(key => {
      const props = {
        text: key,
        isActive: key === this.state.key,
        onClick: () => {
          this.setState({
            key,
          });
        },
      };
      return props;
    });
    return Anchor.createAnchors(anchors);
  }
}

export { AppProps as Props, App as Component };
