<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function trace

Calculate the trace of a matrix: the sum of the elements on the main
diagonal of a square matrix.


## Syntax

```js
math.trace(x)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | Array &#124; Matrix | A matrix

### Returns

Type | Description
---- | -----------
number | The trace of `x`


## Examples

```js
math.trace([[1, 2], [3, 4]]) // returns 5

const A = [
  [1, 2, 3],
  [-1, 2, 3],
  [2, 0, 3]
]
math.trace(A) // returns 6
```


## See also

[diag](diag.md)
