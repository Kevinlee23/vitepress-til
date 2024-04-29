# 矩阵操作

## 矩阵转置

```js
function transpose(arr) {
  const row = arr.length;
  const col = arr[0].length;
  const transposedArr = new Array(col).fill().map(() => new Array(row).fill(0));

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      transposedArr[j][i] = arr[i][j];
    }
  }

  return transposedArr;
}

// output: [[1, 4], [2, 5], [3, 6]]
console.log(transpose([1, 2, 3], [4, 5, 6]));
```
