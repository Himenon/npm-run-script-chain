import * as Domain from "@domain";
import * as Types from "@this/types";
import * as React from "react";
import { renderToString } from "react-dom/server";
import * as Main from "./Main";

export const generateSsrHtml = (props: Types.InitialProps): string => {
  const reducers = Domain.createReducers(props.raw);
  return renderToString(<Main.Component reducers={reducers} />);
};
