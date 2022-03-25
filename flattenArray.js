const arr = [1, 1, 2, 2, 2, [2, 2, 2, 3, 4, 4, 3, 3, 4, [3, 4, 5, 4, 3, 4, 5]]];

function flattenArr(arr) {
  let result = [];
  for (const el of arr) {
    if (typeof el !== "object") {
      if (!result.includes(el)) {
        result.push(el);
      }
    } else {
      result = [...result, ...flattenArr(el, result)];
    }
  }
  return result;
}

const res = flattenArr(arr, []);
console.log("res", res);
