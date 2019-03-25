import * as Domain from "@domain";
import * as React from "react";
import { App } from "./components";

interface MainProps {
  reducers: Domain.Reducers;
}

export const Main = ({ reducers }: MainProps) => {
  return <App.Container reducers={reducers} />;
};

export { MainProps as Props, Main as Component };
