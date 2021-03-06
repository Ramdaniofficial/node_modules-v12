<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function atan

Calculate the inverse tangent of a value.

For matrices, the function is evaluated element wise.


## Syntax

```js
math.atan(x)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`x` | number &#124; BigNumber &#124; Complex &#124; Array &#124; Matrix | Function input

### Returns

Type | Description
---- | -----------
number &#124; BigNumber &#124; Complex &#124; Array &#124; Matrix | The arc tangent of x


## Examples

```js
math.atan(0.5)           // returns number 0.4636476090008061
math.atan(math.tan(1.5)) // returns number 1.5

math.atan(2)             // returns Complex 1.5707963267948966 -1.3169578969248166 i
```


## See also

[tan](tan.md),
[asin](asin.md),
[acos](acos.md)
