jest.unmock("../parser");
import { makeChain, Package } from "../parser";
import { TreeData } from "../types";

describe("Loop Script", () => {
  const packageScript: Package = {
    scripts: {
      a: "npm run b",
      b: "npm run a",
    },
  };

  const parallelRunScript: Package = {
    scripts: {
      a: "run-p build:*",
      "build:a": "npm run a",
      "build:b": "npm run a",
    },
  };

  test("npm run a -> b -> a", () => {
    const results: TreeData = {
      name: "a",
      children: [],
    };
    const expectValue: TreeData = {
      name: "a",
      children: [
        {
          name: "b",
          children: [{ name: "a", children: [] }],
        },
      ],
    };
    makeChain(results, packageScript);
    expect(results).toEqual(expectValue);
  });

  test("npm run a -> b -> a", () => {
    const results: TreeData = {
      name: "a",
      children: [],
    };
    const expectValue: TreeData = {
      name: "a",
      children: [
        {
          name: "build:*",
          children: [
            {
              name: "build:a",
              children: [
                {
                  name: "a",
                  children: [],
                },
              ],
            },
            {
              name: "build:b",
              children: [
                {
                  name: "a",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    };
    makeChain(results, parallelRunScript);
    expect(results).toEqual(expectValue);
  });
});
