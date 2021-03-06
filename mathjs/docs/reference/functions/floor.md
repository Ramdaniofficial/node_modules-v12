<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function floor

Round a value towards minus infinity.
For matrices, the function is evaluated element wise.


## Syntax

```js
math.floor(x)
math.floor(x, n)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | number &#124; BigNumber &#124; Fraction &#124; Complex &#124; Array &#124; Matrix | Number to be rounded
`n` | number &#124; BigNumber &#124; Array | Number of decimals Default value: 0.

### Returns

Type | Description
---- | -----------
number &#124; BigNumber &#124; Fraction &#124; Complex &#124; Array &#124; Matrix | Rounded value


## Examples

```js
math.floor(3.2)              // returns number 3
math.floor(3.8)              // returns number 3
math.floor(-4.2)             // returns number -5
math.floor(-4.7)             // returns number -5

math.floor(3.212, 2)          // returns number 3.21
math.floor(3.288, 2)          // returns number 3.28
math.floor(-4.212, 2)         // returns number -4.22
math.floor(-4.782, 2)         // returns number -4.79

const c = math.complex(3.24, -2.71)
math.floor(c)                 // returns Complex 3 - 3i
math.floor(c, 1)              // returns Complex 3.2 - 2.8i

math.floor([3.2, 3.8, -4.7])       // returns Array [3, 3, -5]
math.floor([3.21, 3.82, -4.71], 1)  // returns Array [3.2, 3.8, -4.8]
```


## See also

[ceil](ceil.md),
[fix](fix.md),
[round](round.md)
