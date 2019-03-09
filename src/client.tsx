import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";
import "./index.css";

const getInitialProps = (): App.Props => {
  return {
    treeData: {
      name: "no tree data",
      children: [],
    },
    anchors: [],
  };
};

export const render = () => {
  const props = getInitialProps();
  ReactDOM.hydrate(<App.Component {...props} />, document.getElementById("root"));
};
