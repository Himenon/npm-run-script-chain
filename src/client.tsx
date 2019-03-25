import * as Domain from "@domain";
import * as Types from "@this/types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./components/App";
import * as Main from "./Main";

const getCsrProps = (): Types.InitialProps | undefined => (window as any).__INITIAL_STATE__;

export function initialize() {
  const defaultProps: Types.InitialProps = {
    raw: {
      scripts: {},
    },
  };
  const csrProps = getCsrProps();
  const props: Types.InitialProps = !!csrProps ? csrProps : defaultProps;
  const reducers = Domain.createReducers(props.raw);
  const store = App.generateStore(reducers);
  const render = !!csrProps ? ReactDOM.render : ReactDOM.render;
  render(<Main.Component store={store} />, document.getElementById("root"));
}

initialize();
