import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const getInitialProps = (): App.Props => (window as any).__INITIAL_STATE__;

export const render = () => {
  const props = getInitialProps();
  ReactDOM.render(<App.Component {...props} />, document.getElementById("root"));
};

render();
