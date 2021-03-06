<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function inv

Calculate the inverse of a square matrix.


## Syntax

```js
math.inv(x)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | number &#124; Complex &#124; Array &#124; Matrix | Matrix to be inversed

### Returns

Type | Description
---- | -----------
number &#124; Complex &#124; Array &#124; Matrix | The inverse of `x`.


## Examples

```js
math.inv([[1, 2], [3, 4]])  // returns [[-2, 1], [1.5, -0.5]]
math.inv(4)                 // returns 0.25
1 / 4                       // returns 0.25
```


## See also

[det](det.md),
[transpose](transpose.md)
