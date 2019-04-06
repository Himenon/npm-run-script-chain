import * as React from "react";
import { getClassNames } from "../../utils";
import { ForkMe } from "../ForkMe";

const styles = require("../../style.scss");

interface AppProps {
  currentKey: string;
  npmUrl: string;
  library: {
    name: string;
    version: string;
    repository: string;
  };
  Menu: JSX.Element;
  Dendrogram: JSX.Element;
  Description: JSX.Element;
}

const App = ({ Description, Dendrogram, Menu, npmUrl, currentKey, library }: AppProps) => {
  return (
    <>
      <ForkMe url={library.repository} className={styles.nrscForkMe} />
      <nav className={getClassNames("navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow nrsc-top-nav")}>
        <a className={getClassNames("navbar-brand col-sm-3 col-md-2 mr-0")} href={npmUrl} target="_blank" rel="noopener">
          {library.name} v{library.version}
        </a>
      </nav>
      <div className={getClassNames("container-fluid nrsc-container")}>
        <div className={getClassNames("row nrsc-wrapper")}>
          <nav className={getClassNames("col-md-2 d-none d-md-block bg-light sidebar nrsc-side-nav")}>
            <div className={getClassNames("sidebar-sticky")}>{Menu}</div>
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
        <div className={getClassNames("col-md-9 ml-sm-auto col-lg-10 px-4 fixed-bottom nrsc-bottom")}>{Description}</div>
      </div>
    </>
  );
};

export { AppProps as Props, App as Component };
