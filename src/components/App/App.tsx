import * as React from "react";
import { getClassNames } from "../../utils";
import { ForkMe } from "../ForkMe";

const styles = require("../../style.scss");

interface AppProps {
  currentKey: string;
  npmUrl: string;
  Menu: JSX.Element;
  Dendrogram: JSX.Element;
}

const App = ({ Dendrogram, Menu, npmUrl, currentKey }: AppProps) => {
  return (
    <>
      <ForkMe url="https://github.com/Himenon/npm-run-script-chain" className={styles.nrscForkMe} />
      <nav className={getClassNames("navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow nrsc-top-nav")}>
        <a className={getClassNames("navbar-brand col-sm-3 col-md-2 mr-0")} href={npmUrl} target="_blank" rel="noopener">
          npm-run-script-chain
        </a>
      </nav>
      <div className={getClassNames("container-fluid nrsc-wrapper")}>
        <div className={getClassNames("row nrsc-wrapper")}>
          <nav className={getClassNames("col-md-2 d-none d-md-block bg-light sidebar nrsc-side-nav")}>
            <div className={styles["sidebar-sticky"]}>{Menu}</div>
          </nav>
          <main className={getClassNames("col-md-9 ml-sm-auto col-lg-10 px-4 nrsc-main")}>
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
