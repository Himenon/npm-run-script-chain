jest.unmock("../parser");
import { Package, TreeData } from "../../../types";
import { makeChain } from "../parser";

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
      description: "npm run b",
      children: [],
    };
    const expectValue: TreeData = {
      name: "a",
      description: "npm run b",
      children: [
        {
          name: "b",
          description: "npm run b",
          children: [{ name: "a", description: "npm run a", children: [] }],
        },
      ],
    };
    makeChain(results, packageScript);
    expect(results).toEqual(expectValue);
  });

  test("npm run a -> b -> a", () => {
    const results: TreeData = {
      name: "a",
      description: "",
      children: [],
    };
    const expectValue: TreeData = {
      name: "a",
      description: "",
      children: [
        {
          name: "build:*",
          description: "run-p build:*",
          children: [
            {
              name: "build:a",
              description: "npm run a",
              children: [
                {
                  name: "a",
                  description: "npm run a",
                  children: [],
                },
              ],
            },
            {
              name: "build:b",
              description: "npm run a",
              children: [
                {
                  name: "a",
                  description: "npm run a",
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
