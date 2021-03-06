<!-- Note: This file is automatically generated from source code comments. Changes made in this file will be overridden. -->

# Function mean

Compute the mean value of matrix or a list with values.
In case of a multi dimensional array, the mean of the flattened array
will be calculated. When `dim` is provided, the maximum over the selected
dimension will be calculated. Parameter `dim` is zero-based.


## Syntax

```js
math.mean(a, b, c, ...)
math.mean(A)
math.mean(A, dim)
```

### Parameters

Parameter | Type | Description
--------- | ---- | -----------
`args` | ... * | A single matrix or or multiple scalar values

### Returns

Type | Description
---- | -----------
* | The mean of all values


## Examples

```js
math.mean(2, 1, 4, 3)                     // returns 2.5
math.mean([1, 2.7, 3.2, 4])               // returns 2.725

math.mean([[2, 5], [6, 3], [1, 7]], 0)    // returns [3, 5]
math.mean([[2, 5], [6, 3], [1, 7]], 1)    // returns [3.5, 4.5, 4]
```


## See also

[median](median.md),
[min](min.md),
[max](max.md),
[sum](sum.md),
[prod](prod.md),
[std](std.md),
[variance](variance.md)
