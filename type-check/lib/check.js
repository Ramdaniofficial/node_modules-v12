// Generated by LiveScript 1.4.0
(function(){
  var ref$, any, all, isItNaN, types, defaultType, customTypes, toString$ = {}.toString;
  ref$ = require('prelude-ls'), any = ref$.any, all = ref$.all, isItNaN = ref$.isItNaN;
  types = {
    Number: {
      typeOf: 'Number',
      validate: function(it){
        return !isItNaN(it);
      }
    },
    NaN: {
      typeOf: 'Number',
      validate: isItNaN
    },
    Int: {
      typeOf: 'Number',
      validate: function(it){
        return !isItNaN(it) && it % 1 === 0;
      }
    },
    Float: {
      typeOf: 'Number',
      validate: function(it){
        return !isItNaN(it);
      }
    },
    Date: {
      typeOf: 'Date',
      validate: function(it){
        return !isItNaN(it.getTime());
      }
    }
  };
  defaultType = {
    array: 'Array',
    tuple: 'Array'
  };
  function checkArray(input, type){
    return all(function(it){
      return checkMultiple(it, type.of);
    }, input);
  }
  function checkTuple(input, type){
    var i, i$, ref$, len$, types;
    i = 0;
    for (i$ = 0, len$ = (ref$ = type.of).length; i$ < len$; ++i$) {
      types = ref$[i$];
      if (!checkMultiple(input[i], types)) {
        return false;
      }
      i++;
    }
    return input.length <= i;
  }
  function checkFields(input, type){
    var inputKeys, numInputKeys, k, numOfKeys, key, ref$, types;
    inputKeys = {};
    numInputKeys = 0;
    for (k in input) {
      inputKeys[k] = true;
      numInputKeys++;
    }
    numOfKeys = 0;
    for (key in ref$ = type.of) {
      types = ref$[key];
      if (!checkMultiple(input[key], types)) {
        return false;
      }
      if (inputKeys[key]) {
        numOfKeys++;
      }
    }
    return type.subset || numInputKeys === numOfKeys;
  }
  function checkStructure(input, type){
    if (!(input instanceof Object)) {
      return false;
    }
    switch (type.structure) {
    case 'fields':
      return checkFields(input, type);
    case 'array':
      return checkArray(input, type);
    case 'tuple':
      return checkTuple(input, type);
    }
  }
  function check(input, typeObj){
    var type, structure, setting, that;
    type = typeObj.type, structure = typeObj.structure;
    if (type) {
      if (type === '*') {
        return true;
      }
      setting = customTypes[type] || types[type];
      if (setting) {
        return setting.typeOf === toString$.call(input).slice(8, -1) && setting.validate(input);
      } else {
        return type === toString$.call(input).slice(8, -1) && (!structure || checkStructure(input, typeObj));
      }
    } else if (structure) {
      if (that = defaultType[structure]) {
        if (that !== toString$.call(input).slice(8, -1)) {
          return false;
        }
      }
      return checkStructure(input, typeObj);
    } else {
      throw new Error("No type defined. Input: " + input + ".");
    }
  }
  function checkMultiple(input, types){
    if (toString$.call(types).slice(8, -1) !== 'Array') {
      throw new Error("Types must be in an array. Input: " + input + ".");
    }
    return any(function(it){
      return check(input, it);
    }, types);
  }
  module.exports = function(parsedType, input, options){
    options == null && (options = {});
    customTypes = options.customTypes || {};
    return checkMultiple(input, parsedType);
  };
}).call(this);
