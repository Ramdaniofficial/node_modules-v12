"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRangeNode = void 0;

var _is = require("../../utils/is.js");

var _factory = require("../../utils/factory.js");

var _operators = require("../operators.js");

var name = 'RangeNode';
var dependencies = ['Node'];
var createRangeNode = /* #__PURE__ */(0, _factory.factory)(name, dependencies, function (_ref) {
  var Node = _ref.Node;

  /**
   * @constructor RangeNode
   * @extends {Node}
   * create a range
   * @param {Node} start  included lower-bound
   * @param {Node} end    included upper-bound
   * @param {Node} [step] optional step
   */
  function RangeNode(start, end, step) {
    if (!(this instanceof RangeNode)) {
      throw new SyntaxError('Constructor must be called with the new operator');
    } // validate inputs


    if (!(0, _is.isNode)(start)) throw new TypeError('Node expected');
    if (!(0, _is.isNode)(end)) throw new TypeError('Node expected');
    if (step && !(0, _is.isNode)(step)) throw new TypeError('Node expected');
    if (arguments.length > 3) throw new Error('Too many arguments');
    this.start = start; // included lower-bound

    this.end = end; // included upper-bound

    this.step = step || null; // optional step
  }

  RangeNode.prototype = new Node();
  RangeNode.prototype.type = 'RangeNode';
  RangeNode.prototype.isRangeNode = true;
  /**
   * Check whether the RangeNode needs the `end` symbol to be defined.
   * This end is the size of the Matrix in current dimension.
   * @return {boolean}
   */

  RangeNode.prototype.needsEnd = function () {
    // find all `end` symbols in this RangeNode
    var endSymbols = this.filter(function (node) {
      return (0, _is.isSymbolNode)(node) && node.name === 'end';
    });
    return endSymbols.length > 0;
  };
  /**
   * Compile a node into a JavaScript function.
   * This basically pre-calculates as much as possible and only leaves open
   * calculations which depend on a dynamic scope with variables.
   * @param {Object} math     Math.js namespace with functions and constants.
   * @param {Object} argNames An object with argument names as key and `true`
   *                          as value. Used in the SymbolNode to optimize
   *                          for arguments from user assigned functions
   *                          (see FunctionAssignmentNode) or special symbols
   *                          like `end` (see IndexNode).
   * @return {function} Returns a function which can be called like:
   *                        evalNode(scope: Object, args: Object, context: *)
   */


  RangeNode.prototype._compile = function (math, argNames) {
    var range = math.range;

    var evalStart = this.start._compile(math, argNames);

    var evalEnd = this.end._compile(math, argNames);

    if (this.step) {
      var evalStep = this.step._compile(math, argNames);

      return function evalRangeNode(scope, args, context) {
        return range(evalStart(scope, args, context), evalEnd(scope, args, context), evalStep(scope, args, context));
      };
    } else {
      return function evalRangeNode(scope, args, context) {
        return range(evalStart(scope, args, context), evalEnd(scope, args, context));
      };
    }
  };
  /**
   * Execute a callback for each of the child nodes of this node
   * @param {function(child: Node, path: string, parent: Node)} callback
   */


  RangeNode.prototype.forEach = function (callback) {
    callback(this.start, 'start', this);
    callback(this.end, 'end', this);

    if (this.step) {
      callback(this.step, 'step', this);
    }
  };
  /**
   * Create a new RangeNode having it's childs be the results of calling
   * the provided callback function for each of the childs of the original node.
   * @param {function(child: Node, path: string, parent: Node): Node} callback
   * @returns {RangeNode} Returns a transformed copy of the node
   */


  RangeNode.prototype.map = function (callback) {
    return new RangeNode(this._ifNode(callback(this.start, 'start', this)), this._ifNode(callback(this.end, 'end', this)), this.step && this._ifNode(callback(this.step, 'step', this)));
  };
  /**
   * Create a clone of this node, a shallow copy
   * @return {RangeNode}
   */


  RangeNode.prototype.clone = function () {
    return new RangeNode(this.start, this.end, this.step && this.step);
  };
  /**
   * Calculate the necessary parentheses
   * @param {Node} node
   * @param {string} parenthesis
   * @return {Object} parentheses
   * @private
   */


  function calculateNecessaryParentheses(node, parenthesis) {
    var precedence = (0, _operators.getPrecedence)(node, parenthesis);
    var parens = {};
    var startPrecedence = (0, _operators.getPrecedence)(node.start, parenthesis);
    parens.start = startPrecedence !== null && startPrecedence <= precedence || parenthesis === 'all';

    if (node.step) {
      var stepPrecedence = (0, _operators.getPrecedence)(node.step, parenthesis);
      parens.step = stepPrecedence !== null && stepPrecedence <= precedence || parenthesis === 'all';
    }

    var endPrecedence = (0, _operators.getPrecedence)(node.end, parenthesis);
    parens.end = endPrecedence !== null && endPrecedence <= precedence || parenthesis === 'all';
    return parens;
  }
  /**
   * Get string representation
   * @param {Object} options
   * @return {string} str
   */


  RangeNode.prototype._toString = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis); // format string as start:step:stop

    var str;
    var start = this.start.toString(options);

    if (parens.start) {
      start = '(' + start + ')';
    }

    str = start;

    if (this.step) {
      var step = this.step.toString(options);

      if (parens.step) {
        step = '(' + step + ')';
      }

      str += ':' + step;
    }

    var end = this.end.toString(options);

    if (parens.end) {
      end = '(' + end + ')';
    }

    str += ':' + end;
    return str;
  };
  /**
   * Get a JSON representation of the node
   * @returns {Object}
   */


  RangeNode.prototype.toJSON = function () {
    return {
      mathjs: 'RangeNode',
      start: this.start,
      end: this.end,
      step: this.step
    };
  };
  /**
   * Instantiate an RangeNode from its JSON representation
   * @param {Object} json  An object structured like
   *                       `{"mathjs": "RangeNode", "start": ..., "end": ..., "step": ...}`,
   *                       where mathjs is optional
   * @returns {RangeNode}
   */


  RangeNode.fromJSON = function (json) {
    return new RangeNode(json.start, json.end, json.step);
  };
  /**
   * Get HTML representation
   * @param {Object} options
   * @return {string} str
   */


  RangeNode.prototype.toHTML = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis); // format string as start:step:stop

    var str;
    var start = this.start.toHTML(options);

    if (parens.start) {
      start = '<span class="math-parenthesis math-round-parenthesis">(</span>' + start + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    str = start;

    if (this.step) {
      var step = this.step.toHTML(options);

      if (parens.step) {
        step = '<span class="math-parenthesis math-round-parenthesis">(</span>' + step + '<span class="math-parenthesis math-round-parenthesis">)</span>';
      }

      str += '<span class="math-operator math-range-operator">:</span>' + step;
    }

    var end = this.end.toHTML(options);

    if (parens.end) {
      end = '<span class="math-parenthesis math-round-parenthesis">(</span>' + end + '<span class="math-parenthesis math-round-parenthesis">)</span>';
    }

    str += '<span class="math-operator math-range-operator">:</span>' + end;
    return str;
  };
  /**
   * Get LaTeX representation
   * @params {Object} options
   * @return {string} str
   */


  RangeNode.prototype._toTex = function (options) {
    var parenthesis = options && options.parenthesis ? options.parenthesis : 'keep';
    var parens = calculateNecessaryParentheses(this, parenthesis);
    var str = this.start.toTex(options);

    if (parens.start) {
      str = "\\left(".concat(str, "\\right)");
    }

    if (this.step) {
      var step = this.step.toTex(options);

      if (parens.step) {
        step = "\\left(".concat(step, "\\right)");
      }

      str += ':' + step;
    }

    var end = this.end.toTex(options);

    if (parens.end) {
      end = "\\left(".concat(end, "\\right)");
    }

    str += ':' + end;
    return str;
  };

  return RangeNode;
}, {
  isClass: true,
  isNode: true
});
exports.createRangeNode = createRangeNode;