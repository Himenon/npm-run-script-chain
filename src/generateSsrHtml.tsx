import * as Domain from "@domain";
import * as Types from "@this/types";
import * as React from "react";
import { renderToString } from "react-dom/server";
import * as App from "./components/App";
import * as Main from "./Main";

export const generateSsrHtml = (props: Types.InitialProps): string => {
  const domainStores = Domain.createReducers(props.raw);
  const store = App.generateStore(domainStores);
  return renderToString(<Main.Component store={store} />);
};
