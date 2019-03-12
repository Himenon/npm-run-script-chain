import * as React from "react";

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

const getClassNames = (className: string): string => {
  return className
    .split(" ")
    .map(name => styles[name])
    .join(" ");
};

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
        <nav className={getClassNames("navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow")}>
          <span className={getClassNames("navbar-brand col-sm-3 col-md-2 mr-0")}>npm-run-script-chain</span>
        </nav>
        <div className={styles.containerFluid}>
          <div className={styles.row}>
            <nav className={getClassNames("col-md-2 d-none d-md-block bg-light sidebar")}>
              <div className={styles["sidebar-sticky"]}>{menu}</div>
            </nav>
            <main className={getClassNames("col-md-9 ml-sm-auto col-lg-10 px-4")}>
              <div
                className={getClassNames(
                  "d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom",
                )}
              >
                <h1 className={styles.h2}>{"タイトル"}</h1>
              </div>
              {treeData && <Tree.Component {...{ treeData }} />}
            </main>
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
