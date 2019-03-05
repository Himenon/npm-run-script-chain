import * as React from "react";
import { Dendrogram, DendrogramProps } from "./Dendrogram";

export interface AppProps {
  dendrogram: DendrogramProps;
}

export class App extends React.Component<AppProps, {}> {
  public render() {
    const { dendrogram } = this.props;
    return (
      <div id="root">
        <Dendrogram {...dendrogram} />
      </div>
    );
  }
}
