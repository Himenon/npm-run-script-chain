jest.unmock("../parser");
import { Package, parser } from "../parser";

describe("package.json parser", () => {
  const packageScript: Package = {
    scripts: {
      start: "develop && develop:server",
      develop: "webpack --watch --config webpack.config.js",
      "develop:server": "node ./bin/cli.js",
    },
  };
  let results: Array<{ [key: string]: string[] | string }> = [];
  beforeAll(() => {
    results = [];
  });
  test("parse check", () => {
    parser(results)(packageScript, "start");
    expect(parser(results)).not.toBeUndefined();
    expect(results).toEqual([
      {
        start: ["develop", "develop:server"],
      },
    ]);
  });
});
