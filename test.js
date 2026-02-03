(() => {
const output = document.getElementById("output");

const print = (value) => {
  output.textContent += `${value}\n`;
};

const chunkTests = [
  { input: [["a", "b", "c", "d"], 2], expected: [["a", "b"], ["c", "d"]] },
  { input: [["a", "b", "c", "d"], 3], expected: [["a", "b", "c"], ["d"]] },
  { input: [["a", "b", "c", "d"], 1], expected: [["a"], ["b"], ["c"], ["d"]] },
  { input: [["a", "b", "c", "d"], 4], expected: [["a", "b", "c", "d"]] },
  { input: [["a", "b", "c", "d"], 5], expected: [["a", "b", "c", "d"]] },
  { input: [["a", "b", "c"], 2], expected: [["a", "b"], ["c"]] },
  { input: [["x"], 2], expected: [["x"]] },
  { input: [[], 3], expected: [] },
  { input: [[1, 2, 3, 4, 5], 2], expected: [[1, 2], [3, 4], [5]] },
  { input: [[1, 2, 3, 4, 5], 3], expected: [[1, 2, 3], [4, 5]] },
  { input: [[true, false, true], 2], expected: [[true, false], [true]] },
];

const deepEqual = (a, b) => {
  if (a === b) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i += 1) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }
  return false;
};

const format = (value) => JSON.stringify(value);

const cloneArray = (value) => {
  if (!Array.isArray(value)) return value;
  return value.map(cloneArray);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getChunkSolution = () => window.chunkArray || window.solution;
const getDebounceSolution = () => window.debounce;
const getThrottleSolution = () => window.throttle;

const runChunkTests = () => {
  const solution = getChunkSolution();
  if (typeof solution !== "function") {
    print("Chunk tests: define window.chunkArray or window.solution.");
    return { passed: 0, total: 0 };
  }

  let passed = 0;
  for (let i = 0; i < chunkTests.length; i += 1) {
    const { input, expected } = chunkTests[i];
    let actual;
    let error = null;
    const inputCopy = cloneArray(input);
    try {
      actual = solution(...inputCopy);
    } catch (err) {
      error = err;
    }

    const ok = error === null && deepEqual(actual, expected);
    if (ok) passed += 1;

    print(`${ok ? "PASS" : "FAIL"} chunk #${i + 1}`);
    if (!ok) {
      print(`  input: ${format(input)}`);
      if (error) {
        print(`  error: ${error.message || error}`);
      } else {
        print(`  expected: ${format(expected)}`);
        print(`  actual: ${format(actual)}`);
      }
    }
  }

  print(`\nchunk: ${passed}/${chunkTests.length} passed\n`);
  return { passed, total: chunkTests.length };
};

const runDebounceTests = async () => {
  const debounce = getDebounceSolution();
  if (typeof debounce !== "function") {
    print("Debounce tests: define window.debounce.");
    return { passed: 0, total: 0 };
  }

  const tests = [];

  tests.push({
    name: "trailing default",
    run: async () => {
      const calls = [];
      const fn = (value) => calls.push(value);
      const d = debounce(fn, 40);
      d("a");
      d("b");
      d("c");
      await wait(70);
      return deepEqual(calls, ["c"]);
    },
  });

  tests.push({
    name: "leading true, trailing false",
    run: async () => {
      const calls = [];
      const fn = (value) => calls.push(value);
      const d = debounce(fn, 40, { leading: true, trailing: false });
      d("a");
      d("b");
      await wait(70);
      return deepEqual(calls, ["a"]);
    },
  });

  tests.push({
    name: "leading true, trailing true",
    run: async () => {
      const calls = [];
      const fn = (value) => calls.push(value);
      const d = debounce(fn, 40, { leading: true, trailing: true });
      d("a");
      d("b");
      d("c");
      await wait(70);
      return deepEqual(calls, ["a", "c"]);
    },
  });

  let passed = 0;
  for (let i = 0; i < tests.length; i += 1) {
    const { name, run } = tests[i];
    let ok = false;
    let error = null;
    try {
      ok = await run();
    } catch (err) {
      error = err;
      ok = false;
    }

    if (ok) passed += 1;
    print(`${ok ? "PASS" : "FAIL"} debounce #${i + 1} (${name})`);
    if (!ok && error) {
      print(`  error: ${error.message || error}`);
    }
  }

  print(`\ndebounce: ${passed}/${tests.length} passed`);
  return { passed, total: tests.length };
};

const runThrottleTests = async () => {
  const throttle = getThrottleSolution();
  if (typeof throttle !== "function") {
    print("Throttle tests: define window.throttle.");
    return { passed: 0, total: 0 };
  }

  const tests = [];

  tests.push({
    name: "default leading+trailing",
    run: async () => {
      const calls = [];
      const fn = (value) => calls.push(value);
      const t = throttle(fn, 40);
      t("a");
      t("b");
      t("c");
      await wait(70);
      return deepEqual(calls, ["a", "c"]);
    },
  });

  tests.push({
    name: "leading true, trailing false",
    run: async () => {
      const calls = [];
      const fn = (value) => calls.push(value);
      const t = throttle(fn, 40, { leading: true, trailing: false });
      t("a");
      t("b");
      t("c");
      await wait(70);
      return deepEqual(calls, ["a"]);
    },
  });

  tests.push({
    name: "leading false, trailing true",
    run: async () => {
      const calls = [];
      const fn = (value) => calls.push(value);
      const t = throttle(fn, 40, { leading: false, trailing: true });
      t("a");
      t("b");
      t("c");
      await wait(70);
      return deepEqual(calls, ["c"]);
    },
  });

  let passed = 0;
  for (let i = 0; i < tests.length; i += 1) {
    const { name, run } = tests[i];
    let ok = false;
    let error = null;
    try {
      ok = await run();
    } catch (err) {
      error = err;
      ok = false;
    }

    if (ok) passed += 1;
    print(`${ok ? "PASS" : "FAIL"} throttle #${i + 1} (${name})`);
    if (!ok && error) {
      print(`  error: ${error.message || error}`);
    }
  }

  print(`\nthrottle: ${passed}/${tests.length} passed`);
  return { passed, total: tests.length };
};

const runAll = async () => {
  runChunkTests();
  await runDebounceTests();
  await runThrottleTests();
};

runAll();
})();
