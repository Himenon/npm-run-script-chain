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
      script: "run-p build:*",
      children: [],
    };
    const expectValue: TreeData = {
      name: "a",
      script: "npm run b",
      children: [
        {
          name: "b",
          script: "npm run a",
          children: [{ name: "a", script: "npm run b", children: [] }],
        },
      ],
    };
    makeChain(results, packageScript);
    expect(results).toEqual(expectValue);
  });

  test("run-p a -> b -> a", () => {
    const results: TreeData = {
      name: "a",
      script: "run-p build:*",
      children: [],
    };
    const expectValue: TreeData = {
      name: "a",
      script: "run-p build:*",
      children: [
        {
          name: "build:*",
          script: "run-p build:*",
          children: [
            {
              name: "build:a",
              script: "npm run a",
              children: [
                {
                  name: "a",
                  script: "npm run a",
                  children: [],
                },
              ],
            },
            {
              name: "build:b",
              script: "npm run a",
              children: [
                {
                  name: "a",
                  script: "npm run a",
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
