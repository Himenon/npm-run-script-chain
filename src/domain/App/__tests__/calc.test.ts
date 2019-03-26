jest.unmock("../parser");
import { makeChain } from "../parser";
import { Package, TreeData } from "../types";

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
  const parallelRunScript: Package = {
    scripts: {
      a: "run-p build:*",
      "build:a": "hoge1",
      "build:b": "hoge2",
      "build:c": "hoge3",
    },
  };
  const mixRunScript: Package = {
    scripts: {
      a: "npm run b && run-p build:*",
      b: "hoge",
      "build:a": "hoge1",
      "build:b": "hoge2",
    },
  };
  const parallelRunScript2: Package = {
    scripts: {
      a: "run-p build1:a build2:b build3:c",
      "build1:a": "hoge1",
      "build2:b": "hoge2",
      "build3:c": "hoge3",
    },
  };

  test("parse check", () => {
    const results: TreeData = {
      name: "a",
      children: [],
    };
    const expectValue: TreeData = {
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
    };
    makeChain(results, packageScript);
    expect(results).toEqual(expectValue);
  });

  test("parallel run script", () => {
    const results: TreeData = {
      name: "a",
      children: [],
    };
    makeChain(results, parallelRunScript);
    const expectValue: TreeData = {
      name: "a",
      children: [
        {
          name: "build:*",
          children: [
            {
              name: "build:a",
              children: [],
            },
            {
              name: "build:b",
              children: [],
            },
            {
              name: "build:c",
              children: [],
            },
          ],
        },
      ],
    };
    expect(results).toEqual(expectValue);
  });

  test("parallel run script2", () => {
    const results: TreeData = {
      name: "a",
      children: [],
    };
    makeChain(results, parallelRunScript2);
    const expectValue: TreeData = {
      name: "a",
      children: [
        {
          name: "build1:a",
          children: [],
        },
        {
          name: "build2:b",
          children: [],
        },
        {
          name: "build3:c",
          children: [],
        },
      ],
    };
    expect(results).toEqual(expectValue);
  });

  test("mix run script", () => {
    const results: TreeData = {
      name: "a",
      children: [],
    };
    makeChain(results, mixRunScript);
    const expectValue: TreeData = {
      name: "a",
      children: [
        {
          name: "b",
          children: [],
        },
        {
          name: "build:*",
          children: [
            {
              name: "build:a",
              children: [],
            },
            {
              name: "build:b",
              children: [],
            },
          ],
        },
      ],
    };
    expect(results).toEqual(expectValue);
  });
});
