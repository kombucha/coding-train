// https://www.quora.com/How-would-you-explain-an-algorithm-that-generates-permutations-using-lexicographic-ordering

(function(global) {
  function nextLexicalPermutation(arr) {
    let result = copyArr(arr);
    let x = -1;

    // 1. Find the largest x such that P[x]<P[x+1].
    // (If there is no such x, P is the last permutation.)
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i] < result[i + 1] && i > x) {
        x = i;
      }
    }

    // No x ? it was the last permutation
    if (x === -1) {
      return result;
    }

    // 2. Find the largest y such that P[x]<P[y].
    let y = -1;
    for (let i = 0; i < result.length; i++) {
      if (result[x] < result[i] && i > y) {
        y = i;
      }
    }

    // 3. Swap P[x] and P[y].
    result = swap(result, x, y);

    // 4. Reverse P[x+1 .. n].
    const reversedEnd = result.splice(x + 1).reverse();
    result = result.concat(reversedEnd);

    return result;
  }

  function generateAllPermutations(arr) {
    const result = [copyArr(arr).sort()];

    while (true) {
      const prev = result[result.length - 1];
      const next = nextLexicalPermutation(prev);

      if (String(next) === String(prev)) {
        break;
      }

      result.push(next);
    }

    return result;
  }

  function copyArr(arr) {
    return arr.slice();
  }

  function swap(arr, i, j) {
    const result = copyArr(arr);

    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;

    return result;
  }

  global.nextLexicalPermutation = nextLexicalPermutation;
  global.generateAllPermutations = generateAllPermutations;
})(window);
