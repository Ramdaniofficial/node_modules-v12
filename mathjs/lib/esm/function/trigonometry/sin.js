import { factory } from '../../utils/factory.js';
import { deepMap } from '../../utils/collection.js';
var name = 'sin';
var dependencies = ['typed'];
export var createSin = /* #__PURE__ */factory(name, dependencies, _ref => {
  var {
    typed
  } = _ref;

  /**
   * Calculate the sine of a value.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.sin(x)
   *
   * Examples:
   *
   *    math.sin(2)                      // returns number 0.9092974268256813
   *    math.sin(math.pi / 4)            // returns number 0.7071067811865475
   *    math.sin(math.unit(90, 'deg'))   // returns number 1
   *    math.sin(math.unit(30, 'deg'))   // returns number 0.5
   *
   *    const angle = 0.2
   *    math.pow(math.sin(angle), 2) + math.pow(math.cos(angle), 2) // returns number ~1
   *
   * See also:
   *
   *    cos, tan
   *
   * @param {number | BigNumber | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | BigNumber | Complex | Array | Matrix} Sine of x
   */
  return typed(name, {
    number: Math.sin,
    Complex: function Complex(x) {
      return x.sin();
    },
    BigNumber: function BigNumber(x) {
      return x.sin();
    },
    Unit: function Unit(x) {
      if (!x.hasBase(x.constructor.BASE_UNITS.ANGLE)) {
        throw new TypeError('Unit in function sin is no angle');
      }

      return this(x.value);
    },
    'Array | Matrix': function ArrayMatrix(x) {
      // deep map collection, skip zeros since sin(0) = 0
      return deepMap(x, this, true);
    }
  });
});