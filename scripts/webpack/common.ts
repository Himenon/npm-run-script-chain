import * as webpack from "webpack";
import { resolveApp } from "../../config/paths";

export const externals: webpack.ExternalsElement | webpack.ExternalsElement[] = {
  electron: 'require("electron")',
  net: 'require("net")',
  remote: 'require("remote")',
  shell: 'require("shell")',
  app: 'require("app")',
  ipc: 'require("ipc")',
  fs: 'require("fs")',
  buffer: 'require("buffer")',
  system: "{}",
  file: "{}",
};

export const alias: { [key: string]: string } = {
  "@this/types": resolveApp("src/types.ts"),
  "@domain": resolveApp("src/domain/index.ts"),
  "@utils": resolveApp("src/utils.ts"),
};

export const nodepPolyfill: webpack.Node | false = {
  dgram: "empty",
  dns: "mock",
  fs: "empty",
  net: "empty",
  tls: "empty",
  child_process: "empty",
  __dirname: false,
  __filename: false,
};
