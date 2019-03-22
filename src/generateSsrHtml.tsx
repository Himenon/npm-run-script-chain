import * as React from "react";
import { renderToString } from "react-dom/server";
import * as App from "./App";

export const generateSsrHtml = (props: App.Props): string => {
  return renderToString(<App.Component {...props} />);
};
