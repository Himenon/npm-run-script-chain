#! /usr/bin/env node

import * as meow from "meow";
import opn = require("opn");
import * as path from "path";
import { createServer } from "./server";

const cli = meow(
  `
  Usage:
    $ npm-run-script-chain -f ./package.json
    $ nrsc -f ./package.json
`,
  {
    flags: {
      file: {
        alias: "f",
        type: "string",
      },
      port: {
        alias: "p",
        type: "string",
      },
      version: {
        alias: "v",
        type: "boolean",
      },
    },
  },
);

interface CliArguments {
  port?: number;
  file?: string;
  version?: string;
}

const [baseDir = process.cwd()] = cli.input;
const cliArgs = cli.flags as CliArguments;

const main = async (commandLineArguments: CliArguments) => {
  if (!commandLineArguments.file) {
    console.log("$ npm-run-script-chain -f [file path]");
    console.log("$ nrsc -f [file path]");
    return;
  }
  try {
    const appDir = path.resolve(__dirname, "../");
    const server = createServer(appDir, baseDir, commandLineArguments.file);
    const port = commandLineArguments.port || 8001;
    const serverAddress = `http://localhost:${port}`;
    await server.listen(port);
    console.log(`open: ${serverAddress}`);
    opn(serverAddress);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

main(cliArgs);
