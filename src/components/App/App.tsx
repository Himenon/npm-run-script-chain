import * as React from "react";
import { getClassNames } from "../../utils";

const styles = require("../../style.scss");

interface AppProps {
  currentKey: string;
  npmUrl: string;
  MenuContainer: any;
  Dendrogram: JSX.Element;
}

const App = ({ Dendrogram, MenuContainer, npmUrl, currentKey }: AppProps) => {
  return (
    <>
      <nav className={getClassNames("navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow")}>
        <a className={getClassNames("navbar-brand col-sm-3 col-md-2 mr-0")} href={npmUrl} target="_blank" rel="noopener">
          npm-run-script-chain
        </a>
      </nav>
      <div className={styles.containerFluid}>
        <div className={styles.row}>
          <nav className={getClassNames("col-md-2 d-none d-md-block bg-light sidebar")}>
            <div className={styles["sidebar-sticky"]}>{MenuContainer}</div>
          </nav>
          <main className={getClassNames("col-md-9 ml-sm-auto col-lg-10 px-4")}>
            <div
              className={getClassNames(
                "d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom",
              )}
            >
              <h1 className={styles.h2}>{currentKey}</h1>
            </div>
            {Dendrogram}
          </main>
        </div>
      </div>
    </>
  );
};

export { AppProps as Props, App as Component };
