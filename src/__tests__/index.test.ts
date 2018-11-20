jest.unmock("../parser");
import { makeChain, Package } from "../parser";
import { TreeData } from "../types";

describe("package.json parser", () => {
  const packageScript: Package = {
    scripts: {
      a: "npm run b",
      b: "npm run c && npm run d",
      c: "webpack",
      d: "npm run e",
      e: "node",
    },
  };

  test("parse check", () => {
    const results: TreeData = {
      name: "a",
      children: [],
    };
    makeChain(results, packageScript);
    expect(results).toEqual({
      name: "a",
      children: [
        {
          name: "b",
          children: [
            {
              name: "c",
              children: [],
            },
            {
              name: "d",
              children: [
                {
                  name: "e",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    });
  });
});
