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
      script: "npm run b",
      children: [],
    };
    const expectValue: TreeData = {
      name: "a",
      script: "npm run b",
      children: [
        {
          name: "b",
          script: "npm run c && npm run d",
          children: [
            {
              name: "c",
              script: "webpack",
              children: [],
            },
            {
              name: "d",
              script: "npm run e",
              children: [
                {
                  name: "e",
                  script: "node",
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
      script: "run-p build:*",
      children: [],
    };
    makeChain(results, parallelRunScript);
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
              script: "hoge1",
              children: [],
            },
            {
              name: "build:b",
              script: "hoge2",
              children: [],
            },
            {
              name: "build:c",
              script: "hoge3",
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
      script: "run-p build1:a build2:b build3:c",
      children: [],
    };
    makeChain(results, parallelRunScript2);
    const expectValue: TreeData = {
      name: "a",
      script: "run-p build1:a build2:b build3:c",
      children: [
        {
          name: "build1:a",
          script: "hoge1",
          children: [],
        },
        {
          name: "build2:b",
          script: "hoge2",
          children: [],
        },
        {
          name: "build3:c",
          script: "hoge3",
          children: [],
        },
      ],
    };
    expect(results).toEqual(expectValue);
  });

  test("mix run script", () => {
    const results: TreeData = {
      name: "a",
      script: "npm run b && run-p build:*",
      children: [],
    };
    makeChain(results, mixRunScript);
    const expectValue: TreeData = {
      name: "a",
      script: "npm run b && run-p build:*",
      children: [
        {
          name: "b",
          script: "hoge",
          children: [],
        },
        {
          name: "build:*",
          script: "run-p build:*", // TODO
          children: [
            {
              name: "build:a",
              script: "hoge1",
              children: [],
            },
            {
              name: "build:b",
              script: "hoge2",
              children: [],
            },
          ],
        },
      ],
    };
    expect(results).toEqual(expectValue);
  });
});
