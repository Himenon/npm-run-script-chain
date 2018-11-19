#! /usr/bin/env node

import * as meow from "meow";
import opn = require("opn");
import { Server } from "./server";

const cli = meow(``, {
  flags: {
    file: {
      alias: "f",
      type: "string",
    },
    port: {
      alias: "p",
      type: "string",
    },
  },
});

interface CliArguments {
  port?: number;
  file?: string;
}

const [baseDir = process.cwd()] = cli.input;
const cliArgs = cli.flags as CliArguments;

const main = async (commandLineArguments: CliArguments) => {
  if (!commandLineArguments.file) {
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
