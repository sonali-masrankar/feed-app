/*
Given 2 sorted arrays A and B with n and m elements respectively. A has enough space
at the end of the array to fit in all elements of B. Write an algorithm to merge the
elements of A and B ensuring the resultant A is sorted as well. The code cannot use an
extra array.
*/

/*
Following implementation works with time complexity of O(a * b)
where a = number of elements in array A and  b = number of elements in array B
*/
function mergeArrays (arrayA, arrayB) {
  let i, j = 0
  const mergedArrayLength = arrayA.length + arrayB.length
  for (i = 0; i < mergedArrayLength; i++) {
    if (arrayB[j] < arrayA[i]) {
      let k
      for (k = arrayA.length - 1; k >= i; k--) {
        arrayA[k + 1] = arrayA[k]
      }
      arrayA[i] = arrayB[j]
      j++
    } else {
      if (arrayA[i] === undefined) {
        arrayA[i] = arrayB[j]
        j++
      }
    }
  }
  return arrayA
}

(function runTest () {
  const arrayA = [1, 3, 5, 6, 8]
  const arrayB = [0, 2, 10, 20]
  mergeArrays(arrayA, arrayB)
  console.log(arrayA)
})()