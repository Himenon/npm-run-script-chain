jest.unmock("../parser");
import { Package, parser } from "../parser";
import { TreeData } from "../types";

describe("package.json parser", () => {
  const packageScript: Package = {
    scripts: {
      start: "develop && develop:server",
      develop: "webpack --watch --config webpack.config.js",
      "develop:server": "node ./bin/cli.js",
    },
  };
  let results: TreeData;
  beforeAll(() => {
    results = {
      name: "start",
    };
  });
  test("parse check", () => {
    parser(results)(packageScript);
    expect(parser(results)).not.toBeUndefined();
    expect(results).toEqual({
      name: "start",
      children: [
        {
          name: "develop",
        },
        {
          name: "develop:server",
        },
      ],
    });
  });
});
