import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const getCsrProps = (): App.Props | undefined => (window as any).__INITIAL_STATE__;

export const initialize = () => {
  const defaultProps: App.Props = {
    raw: {
      scripts: {},
    },
  };
  const csrProps = getCsrProps();
  const props = csrProps ? csrProps : defaultProps;
  const render = csrProps ? ReactDOM.hydrate : ReactDOM.render;
  render(<App.Component {...props} />, document.getElementById("root"));
};

initialize();
