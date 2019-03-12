import * as React from "react";

import classNames from "classnames";
import { Button, Tree } from "./components";
import * as Tools from "./generator";
import { Package, TreeData } from "./types";

const styles = require("./style.scss");

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
    const menu = this.generateMenu(this.props.raw);
    const treeData = this.getTreeData();
    return (
      <>
        <nav
          className={classNames(
            styles.navbar,
            styles["navbar-dark"],
            styles["fixed-top"],
            styles["bg-dark"],
            styles["flex-md-nowrap"],
            styles["p-0"],
            styles.shadow,
          )}
        >
          <span className={classNames(styles["navbar-brand"], styles["col-sm-3"], styles["col-md-2"], styles["mr-0"])}>
            npm-run-script-chain
          </span>
        </nav>
        <div className={styles.containerFluid}>
          <div className={styles.row}>
            <div className={classNames(styles["col-md-2"], styles["d-none"], styles["d-md-block"], styles["bg-light"], styles.sidebar)}>
              <div className={styles["sidebar-sticky"]}>{menu}</div>
            </div>
            {treeData && (
              <div className={classNames(styles.col8, styles.overflowAuto)}>
                <Tree.Component {...{ treeData }} />
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  private getTreeData(): TreeData | undefined {
    return Tools.generateTreeData(this.state.key, this.props.raw);
  }
  private generateMenu(pkg: Package) {
    const buttons: Button.Props[] = Object.keys(pkg.scripts).map(key => {
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
    return Button.createElements(buttons);
  }
}

export { AppProps as Props, App as Component };
