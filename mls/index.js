function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let i = start;
  let j = end;
  const item = arr[i];
  while (i <= j) {
    while (arr[i] <= item) {
      i += 1;
    }
    while (arr[j] > item) {
      j -= 1;
    }
    if (i < j) {
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    } else {
      const temp = item;
      arr[start] = arr[j];
      arr[j] = temp;
    }
  }
  quickSort(arr, start, j - 1);
  quickSort(arr, j + 1, end);
  return arr;
}
function MLS(arr) {
  // write code here
  const sortArr = quickSort(arr, 0, arr.length - 1);
  let long = 1;
  let longRes = 1;
  for (let i = 0; i < sortArr.length - 1; i++) {
    const item = sortArr[i];
    const next = sortArr[i + 1];
    longRes = longRes > long ? longRes : long;
    if (item + 1 === next) {
      long += 1;
    } else if (item === next) {
      continue;
    } else {
      long = 1;
    }
  }
  return longRes;
}

// example
// console.log(MLS([7, 8, 2, 6, 1, 1, 7, 2, 4, 3, 4, 7, 5, 6, 8, 2])); //8

module.export = {
  MLS,
};
