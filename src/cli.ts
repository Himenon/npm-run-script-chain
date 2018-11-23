#! /usr/bin/env node

import * as meow from "meow";
import opn = require("opn");
import { UpdateNotifier } from "update-notifier";
import { Server } from "./server";

const pkg = require("../package.json");
new UpdateNotifier({ pkg }).notify();

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
    return;
  }
  try {
    const server = new Server(baseDir, commandLineArguments.file);
    const serverAddress = await server.run(commandLineArguments.port || 8001);
    console.log(`open: ${serverAddress}`);
    opn(serverAddress);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

main(cliArgs);
