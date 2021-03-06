<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function cbrt

Calculate the cubic root of a value.

For matrices, the function is evaluated element wise.


## Syntax

```js
math.cbrt(x)
math.cbrt(x, allRoots)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | number &#124; BigNumber &#124; Complex &#124; Unit &#124; Array &#124; Matrix |  Value for which to calculate the cubic root.
`allRoots` | boolean | Optional, false by default. Only applicable when `x` is a number or complex number. If true, all complex roots are returned, if false (default) the principal root is returned.

### Returns

Type | Description
---- | -----------
number &#124; BigNumber &#124; Complex &#124; Unit &#124; Array &#124; Matrix |  Returns the cubic root of `x`


## Examples

```js
math.cbrt(27)                  // returns 3
math.cube(3)                   // returns 27
math.cbrt(-64)                 // returns -4
math.cbrt(math.unit('27 m^3')) // returns Unit 3 m
math.cbrt([27, 64, 125])       // returns [3, 4, 5]

const x = math.complex('8i')
math.cbrt(x)                   // returns Complex 1.7320508075689 + i
math.cbrt(x, true)             // returns Matrix [
                                //    1.7320508075689 + i
                                //   -1.7320508075689 + i
                                //   -2i
                                // ]
```


## See also

[square](square.md),
[sqrt](sqrt.md),
[cube](cube.md)
