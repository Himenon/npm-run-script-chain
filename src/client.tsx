import * as Types from "@this/types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const getCsrProps = (): Types.InitialProps | undefined => (window as any).__INITIAL_STATE__;

export const initialize = () => {
  const defaultProps: Types.InitialProps = {
    raw: {
      scripts: {},
    },
  };
  const csrProps = getCsrProps();
  const props: Types.InitialProps = !!csrProps ? csrProps : defaultProps;
  const domainStores = App.generateDomainStore(props.raw);
  const render = !!csrProps ? ReactDOM.render : ReactDOM.render;
  render(<App.Component domainStores={domainStores} />, document.getElementById("root"));
};

initialize();
