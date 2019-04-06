import * as Domain from "@domain";
import * as Types from "@this/types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Main from "./Main";

const getCsrProps = (): Types.InitialProps | undefined => (window as any).__INITIAL_STATE__;

export function initialize() {
  const defaultProps: Types.InitialProps = {
    pkg: {
      scripts: {},
    },
    library: {
      name: "",
      version: "",
    },
  };
  const csrProps = getCsrProps();
  const props: Types.InitialProps = !!csrProps ? csrProps : defaultProps;
  const reducers = Domain.createReducers({ key: "start", pkg: props.pkg, library: props.library });
  const render = !!csrProps ? ReactDOM.render : ReactDOM.render;
  render(<Main.Component reducers={reducers} />, document.getElementById("root"));
}

initialize();
