(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return webpackJsonp([6],{

/***/ 10:
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(101),
    isArray = __webpack_require__(20);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),

/***/ 101:
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(103),
    stubArray = __webpack_require__(104);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),

/***/ 103:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),

/***/ 104:
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(106),
    baseKeys = __webpack_require__(115),
    isArrayLike = __webpack_require__(119);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(107),
    isArguments = __webpack_require__(108),
    isArray = __webpack_require__(20),
    isBuffer = __webpack_require__(35),
    isIndex = __webpack_require__(111),
    isTypedArray = __webpack_require__(36);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),

/***/ 107:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(109),
    isObjectLike = __webpack_require__(10);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isObjectLike = __webpack_require__(10);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(61),
    listCacheDelete = __webpack_require__(62),
    listCacheGet = __webpack_require__(63),
    listCacheHas = __webpack_require__(64),
    listCacheSet = __webpack_require__(65);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),

/***/ 110:
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),

/***/ 111:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),

/***/ 112:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isLength = __webpack_require__(37),
    isObjectLike = __webpack_require__(10);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),

/***/ 113:
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(31);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)(module)))

/***/ }),

/***/ 115:
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(116),
    nativeKeys = __webpack_require__(117);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),

/***/ 116:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(118);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ 118:
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(30),
    isLength = __webpack_require__(37);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(29);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(121),
    Map = __webpack_require__(21),
    Promise = __webpack_require__(122),
    Set = __webpack_require__(123),
    WeakMap = __webpack_require__(124),
    baseGetTag = __webpack_require__(9),
    toSource = __webpack_require__(32);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "select",
    {
      attrs: {
        name: _vm.name,
        id: _vm.id,
        required: _vm.required,
        multiple: _vm.multiple,
        disabled: _vm.readonly
      }
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm._l(_vm.stringOptions, function(option) {
        return [
          option.children && option.children.length > 0
            ? _c(
                "optgroup",
                { attrs: { label: option.text } },
                _vm._l(option.children, function(child) {
                  return _c("option", { domProps: { value: child.id } }, [
                    _vm._v("\n\t\t\t\t" + _vm._s(child.text) + "\n\t\t\t")
                  ])
                })
              )
            : option.id
              ? _c("option", { domProps: { value: option.id } }, [
                  _vm._v("\n\t\t\t" + _vm._s(option.text) + "\n\t\t")
                ])
              : _vm._e()
        ]
      })
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-27cbde20", esExports)
  }
}

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StartEndDate_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_272d3bd7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StartEndDate_vue__ = __webpack_require__(143);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(141)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-272d3bd7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StartEndDate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_272d3bd7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StartEndDate_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/StartEndDate.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-272d3bd7", Component.options)
  } else {
    hotAPI.reload("data-v-272d3bd7", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

/* flatpickr v4.0.7, @license MIT */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.flatpickr = factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function compareDates(date1, date2, timeless) {
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var getWeek = function (givenDate) {
    var onejan = new Date(givenDate.getFullYear(), 0, 1);
    return Math.ceil(((givenDate.getTime() - onejan.getTime()) / 86400000 +
        onejan.getDay() +
        1) /
        7);
};
var duration = {
    DAY: 86400000,
};

var defaults = {
    _disable: [],
    _enable: [],
    allowInput: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enable: [],
    enableSeconds: false,
    enableTime: false,
    getWeek: getWeek,
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
};

var pad = function (number) { return ("0" + number).slice(-2); };
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        timeout !== null && clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
        if (immediate && !timeout)
            func.apply(context, args);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};
function mouseDelta(e) {
    var delta = e.wheelDelta || -e.deltaY;
    return delta >= 0 ? 1 : -1;
}

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    numInput.type = "text";
    numInput.pattern = "\\d*";
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}

var do_nothing = function () { return undefined; };
var revFormat = {
    D: do_nothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM) {
        dateObj.setHours(dateObj.getHours() % 12 + 12 * int(/pm/i.test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum) {
        var weekNumber = parseInt(weekNum);
        return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: do_nothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    w: do_nothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "(am|AM|Am|aM|pm|PM|Pm|pM)",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date) { return (date.getHours() > 11 ? "PM" : "AM"); },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return date.getFullYear(); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

"use strict";
if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}

function FlatpickrInstance(element, instanceConfig) {
    var self = {};
    self.parseDate = parseDate;
    self.formatDate = formatDate;
    self._animationLoop = [];
    self._handlers = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar
                    ? self.latestSelectedDateObj || self.config.minDate
                    : undefined);
            }
            updateValue(false);
        }
        self.showTimeInput =
            self.selectedDates.length > 0 || self.config.noCalendar;
        if (self.weekWrapper !== undefined && self.daysContainer !== undefined) {
            self.calendarContainer.style.width =
                self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
        }
        if (!self.isMobile)
            positionCalendar();
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function updateTime(e) {
        if (self.config.noCalendar && !self.selectedDates.length) {
            self.setDate(new Date().setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds), false);
            setHoursFromInputs();
            updateValue();
        }
        timeWrapper(e);
        if (self.selectedDates.length === 0)
            return;
        if (!self.minDateHasTime ||
            e.type !== "input" ||
            e.target.value.length >= 2) {
            setHoursFromInputs();
            updateValue();
        }
        else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, 1000);
        }
    }
    function ampm2military(hour, amPM) {
        return hour % 12 + 12 * int(amPM === "PM");
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined)
            hours = ampm2military(hours, self.amPM.textContent);
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {
            hours = Math.max(hours, self.config.minDate.getHours());
            if (hours === self.config.minDate.getHours())
                minutes = Math.max(minutes, self.config.minDate.getMinutes());
        }
        if (self.config.maxDate &&
            self.maxDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
            hours = Math.min(hours, self.config.maxDate.getHours());
            if (hours === self.config.maxDate.getHours())
                minutes = Math.min(minutes, self.config.maxDate.getMinutes());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date)
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? (12 + hours) % 12 + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = hours >= 12 ? "PM" : "AM";
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var year = parseInt(event.target.value) + (event.delta || 0);
        if (year.toString().length === 4 || event.key === "Enter") {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year.toString()))
                changeYear(year);
        }
    }
    function bind(element, event, handler) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler); });
        element.addEventListener(event, handler);
        self._handlers.push({ element: element, event: event, handler: handler });
    }
    function onClick(handler) {
        return function (evt) { return evt.which === 1 && handler(evt); };
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, 300);
        if (self.config.mode === "range" && self.daysContainer)
            bind(self.daysContainer, "mouseover", function (e) {
                return onMouseOver(e.target);
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.static)
            bind(self._input, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document.body, "touchstart", documentClick);
        bind(window.document.body, "mousedown", onClick(documentClick));
        bind(self._input, "blur", documentClick);
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "mousedown", onClick(self.open));
        }
        if (self.daysContainer !== undefined) {
            self.monthNav.addEventListener("wheel", function (e) { return e.preventDefault(); });
            bind(self.monthNav, "wheel", debounce(onMonthNavScroll, 10));
            bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "mousedown", onClick(selectDate));
            if (self.config.animate) {
                bind(self.daysContainer, ["webkitAnimationEnd", "animationend"], animateDays);
                bind(self.monthNav, ["webkitAnimationEnd", "animationend"], animateMonths);
            }
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return e.target.select();
            };
            bind(self.timeContainer, ["wheel", "input", "increment"], updateTime);
            bind(self.timeContainer, "mousedown", onClick(timeIncrement));
            bind(self.timeContainer, ["wheel", "increment"], self._debouncedChange);
            bind(self.timeContainer, "input", triggerChange);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "mousedown", onClick(function (e) {
                    updateTime(e);
                    triggerChange();
                }));
            }
        }
    }
    function processPostDayAnimation() {
        self._animationLoop.forEach(function (f) { return f(); });
        self._animationLoop = [];
    }
    function animateDays(e) {
        if (self.daysContainer && self.daysContainer.childNodes.length > 1) {
            switch (e.animationName) {
                case "fpSlideLeft":
                    self.daysContainer.lastChild &&
                        self.daysContainer.lastChild.classList.remove("slideLeftNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .firstChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                case "fpSlideRight":
                    self.daysContainer.firstChild &&
                        self.daysContainer.firstChild.classList.remove("slideRightNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .lastChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                default:
                    break;
            }
        }
    }
    function animateMonths(e) {
        switch (e.animationName) {
            case "fpSlideLeftNew":
            case "fpSlideRightNew":
                self.navigationCurrentMonth.classList.remove("slideLeftNew");
                self.navigationCurrentMonth.classList.remove("slideRightNew");
                var nav = self.navigationCurrentMonth;
                while (nav.nextSibling &&
                    /curr/.test(nav.nextSibling.className))
                    self.monthNav.removeChild(nav.nextSibling);
                while (nav.previousSibling &&
                    /curr/.test(nav.previousSibling.className))
                    self.monthNav.removeChild(nav.previousSibling);
                self.oldCurMonth = undefined;
                break;
        }
    }
    function jumpToDate(jumpDate) {
        var jumpTo = jumpDate !== undefined
            ? parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            console.error(e.stack);
            console.warn("Invalid date supplied: " + jumpTo);
        }
        self.redraw();
    }
    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow"))
            incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && e.target;
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0]) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        }
        else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] &&
                self.minRangeDate &&
                date > self.minRangeDate &&
                date < self.selectedDates[0])
                self.minRangeDate = date;
            else if (self.selectedDates[0] &&
                self.maxRangeDate &&
                date < self.maxRangeDate &&
                date > self.selectedDates[0])
                self.maxRangeDate = date;
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
            if (self.selectedDates.length === 1 &&
                self.minRangeDate !== undefined &&
                self.maxRangeDate !== undefined &&
                (date < self.minRangeDate || date > self.maxRangeDate))
                dayElement.classList.add("notAllowed");
        }
        if (self.weekNumbers &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" +
                self.config.getWeek(date) +
                "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0, targetNode = (currentIndex !== undefined
            ? self.days.childNodes[newIndex]
            : self.selectedDateElem ||
                self.todayDateElem ||
                self.days.childNodes[0]);
        var focus = function () {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        };
        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1, true, undefined, true);
                newIndex = newIndex % 42;
            }
            else if (offset < 0) {
                self.changeMonth(-1, true, undefined, true);
                newIndex += 42;
            }
            return afterDayAnim(focus);
        }
        focus();
    }
    function afterDayAnim(fn) {
        self.config.animate === true ? self._animationLoop.push(fn) : fn();
    }
    function buildDays(delta) {
        if (self.daysContainer === undefined) {
            return;
        }
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() -
            self.l10n.firstDayOfWeek +
            7) %
            7, isRangeMode = self.config.mode === "range";
        var prevMonthDays = self.utils.getDaysInMonth((self.currentMonth - 1 + 12) % 12);
        var daysInMonth = self.utils.getDaysInMonth(), days = window.document.createDocumentFragment();
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        if (self.weekNumbers && self.weekNumbers.firstChild)
            self.weekNumbers.textContent = "";
        if (isRangeMode) {
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow =
                self._hidePrevMonthArrow ||
                    (!!self.minRangeDate &&
                        self.minRangeDate > days.childNodes[0].dateObj);
            self._hideNextMonthArrow =
                self._hideNextMonthArrow ||
                    (!!self.maxRangeDate &&
                        self.maxRangeDate <
                            new Date(self.currentYear, self.currentMonth + 1, 1));
        }
        else
            updateNavigationCurrentMonth();
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        if (!self.config.animate || delta === undefined)
            clearNode(self.daysContainer);
        else {
            while (self.daysContainer.childNodes.length > 1)
                self.daysContainer.removeChild(self.daysContainer.firstChild);
        }
        if (delta && delta >= 0)
            self.daysContainer.appendChild(dayContainer);
        else
            self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
        self.days = self.daysContainer.childNodes[0];
    }
    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.currentMonthElement = createElement("span", "cur-month");
        self.currentMonthElement.title = self.l10n.scrollTitle;
        var yearInput = createNumberInput("cur-year");
        self.currentYearElement = yearInput.childNodes[0];
        self.currentYearElement.title = self.l10n.scrollTitle;
        if (self.config.minDate)
            self.currentYearElement.min = self.config.minDate
                .getFullYear()
                .toString();
        if (self.config.maxDate) {
            self.currentYearElement.max = self.config.maxDate
                .getFullYear()
                .toString();
            self.currentYearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        self.navigationCurrentMonth = createElement("span", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool)
                    self.prevMonthNav.style.display = bool ? "none" : "block";
                self.__hidePrevMonthArrow = bool;
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool)
                    self.nextMonthNav.style.display = bool ? "none" : "block";
                self.__hideNextMonthArrow = bool;
            },
        });
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];
        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? self.config.defaultHour
                : military2ampm(self.config.defaultHour));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : self.config.defaultMinute);
        self.hourElement.step = self.config.hourIncrement.toString();
        self.minuteElement.step = self.config.minuteIncrement.toString();
        self.hourElement.min = self.config.time_24hr ? "0" : "1";
        self.hourElement.max = self.config.time_24hr ? "23" : "12";
        self.minuteElement.min = "0";
        self.minuteElement.max = "59";
        self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : self.config.defaultSeconds);
            self.secondElement.step = self.minuteElement.step;
            self.secondElement.min = self.minuteElement.min;
            self.secondElement.max = self.minuteElement.max;
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
        }
        self.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + weekdays.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ";
        return self.weekdayContainer;
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, is_offset, animate, from_keyboard) {
        if (is_offset === void 0) { is_offset = true; }
        if (animate === void 0) { animate = self.config.animate; }
        if (from_keyboard === void 0) { from_keyboard = false; }
        var delta = is_offset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow) ||
            (delta > 0 && self._hideNextMonthArrow))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
        }
        buildDays(animate ? delta : undefined);
        if (!animate) {
            triggerEvent("onMonthChange");
            return updateNavigationCurrentMonth();
        }
        var nav = self.navigationCurrentMonth;
        if (delta < 0) {
            while (nav.nextSibling &&
                /curr/.test(nav.nextSibling.className))
                self.monthNav.removeChild(nav.nextSibling);
        }
        else if (delta > 0) {
            while (nav.previousSibling &&
                /curr/.test(nav.previousSibling.className))
                self.monthNav.removeChild(nav.previousSibling);
        }
        self.oldCurMonth = self.navigationCurrentMonth;
        self.navigationCurrentMonth = self.monthNav.insertBefore(self.oldCurMonth.cloneNode(true), delta > 0 ? self.oldCurMonth.nextSibling : self.oldCurMonth);
        var daysContainer = self.daysContainer;
        if (daysContainer.firstChild && daysContainer.lastChild) {
            if (delta > 0) {
                daysContainer.firstChild.classList.add("slideLeft");
                daysContainer.lastChild.classList.add("slideLeftNew");
                self.oldCurMonth.classList.add("slideLeft");
                self.navigationCurrentMonth.classList.add("slideLeftNew");
            }
            else if (delta < 0) {
                daysContainer.firstChild.classList.add("slideRightNew");
                daysContainer.lastChild.classList.add("slideRight");
                self.oldCurMonth.classList.add("slideRight");
                self.navigationCurrentMonth.classList.add("slideRightNew");
            }
        }
        self.currentMonthElement = self.navigationCurrentMonth
            .firstChild;
        self.currentYearElement = self.navigationCurrentMonth.lastChild
            .childNodes[0];
        updateNavigationCurrentMonth();
        if (self.oldCurMonth.firstChild)
            self.oldCurMonth.firstChild.textContent = monthToStr(self.currentMonth - delta, self.config.shorthandCurrentMonth, self.l10n);
        triggerEvent("onMonthChange");
        if (from_keyboard &&
            document.activeElement &&
            document.activeElement.$i) {
            var index_1 = document.activeElement.$i;
            afterDayAnim(function () {
                focusOnDay(index_1, 0);
            });
        }
    }
    function clear(triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        self.input.value = "";
        if (self.altInput)
            self.altInput.value = "";
        if (self.mobileInput)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        self.showTimeInput = false;
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            self._input.classList.remove("active");
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            var h = self._handlers[i];
            h.element.removeEventListener(h.event, h.handler);
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode)
            self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
            self.input.value = "";
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input ||
                e.target === self.altInput ||
                self.element.contains(e.target) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput && !isCalendarElement;
            if (lostFocus &&
                self.config.ignoredFocusElements.indexOf(e.target) === -1) {
                self.close();
                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.currentYearElement.min &&
                newYear < parseInt(self.currentYearElement.min)) ||
            (self.currentYearElement.max &&
                newYear > parseInt(self.currentYearElement.max)))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
        }
    }
    function isEnabled(date, timeless) {
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable.length && !self.config.disable.length)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string" && dateToCheck !== undefined) {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function onKeyDown(e) {
        var isInput = e.target === self._input;
        var calendarElem = isCalendarElem(e.target);
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.key === "Enter" && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return e.target.blur();
            }
            else
                self.open();
        }
        else if (calendarElem || allowKeydown || allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(e.target);
            switch (e.key) {
                case "Enter":
                    if (isTimeObj)
                        updateValue();
                    else
                        selectDate(e);
                    break;
                case "Escape":
                    e.preventDefault();
                    self.close();
                    break;
                case "Backspace":
                case "Delete":
                    if (isInput && !self.config.allowInput)
                        self.clear();
                    break;
                case "ArrowLeft":
                case "ArrowRight":
                    if (!isTimeObj) {
                        e.preventDefault();
                        if (self.daysContainer) {
                            var delta_1 = e.key === "ArrowRight" ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(e.target.$i, delta_1);
                            else
                                changeMonth(delta_1, true, undefined, true);
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    e.preventDefault();
                    var delta = e.key === "ArrowDown" ? 1 : -1;
                    if (self.daysContainer && e.target.$i !== undefined) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(e.target.$i, delta * 7);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case "Tab":
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    }
                    else if (e.target === self.minuteElement &&
                        (self.secondElement || self.amPM)) {
                        e.preventDefault();
                        if (self.secondElement !== undefined)
                            self.secondElement.focus();
                        else if (self.amPM !== undefined)
                            self.amPM.focus();
                    }
                    else if (e.target === self.secondElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }
                    break;
                case "a":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "AM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                case "p":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "PM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                default:
                    break;
            }
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            !elem.classList.contains("flatpickr-day") ||
            self.minRangeDate === undefined ||
            self.maxRangeDate === undefined)
            return;
        var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], undefined, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }
        var _loop_1 = function (i, date) {
            var timestamp = date.getTime();
            var outOfRange = timestamp < self.minRangeDate.getTime() ||
                timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            }
            else if (containsDisabled && !outOfRange)
                return "continue";
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("startRange");
            else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("endRange");
            if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                dayElem.classList.add("inRange");
        };
        for (var i = 0, date = self.days.childNodes[i].dateObj; i < 42; i++,
            date =
                self.days.childNodes[i] &&
                    self.days.childNodes[i].dateObj) {
            _loop_1(i, date);
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._input; }
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target && e.target.blur();
            }
            setTimeout(function () {
                self.mobileInput !== undefined && self.mobileInput.click();
            }, 0);
            triggerEvent("onOpen");
            return;
        }
        if (self._input.disabled || self.config.inline)
            return;
        var wasOpen = self.isOpen;
        self.isOpen = true;
        positionCalendar(positionElement);
        self.calendarContainer.classList.add("open");
        self._input.classList.add("active");
        !wasOpen && triggerEvent("onOpen");
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var hooks = [
            "onChange",
            "onClose",
            "onDayCreate",
            "onDestroy",
            "onKeyDown",
            "onMonthChange",
            "onOpen",
            "onParseConfig",
            "onReady",
            "onValueUpdate",
            "onYearChange",
        ];
        self.config = __assign({}, flatpickr.defaultConfig);
        var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
        var formats$$1 = {};
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable || []; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable || []; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        if (!userConfig.dateFormat && userConfig.enableTime) {
            formats$$1.dateFormat = userConfig.noCalendar
                ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                : flatpickr.defaultConfig.dateFormat +
                    " H:i" +
                    (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            formats$$1.altFormat = userConfig.noCalendar
                ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                : flatpickr.defaultConfig.altFormat +
                    (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        Object.assign(self.config, formats$$1, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        for (var i = hooks.length; i--;) {
            if (self.config[hooks[i]] !== undefined) {
                self.config[hooks[i]] = arrayify(self.config[hooks[i]] || []).map(bindToInstance);
            }
        }
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (~hooks.indexOf(key)) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable.length &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        triggerEvent("onParseConfig");
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            console.warn("flatpickr: invalid locale " + self.config.locale);
        self.l10n = __assign({}, flatpickr.l10ns.default, typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined);
    }
    function positionCalendar(positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.calendarContainer === undefined)
            return;
        var calendarHeight = self.calendarContainer.offsetHeight, calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" ||
            (configPos !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(e.target, isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2)
                self.clear();
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear)
                triggerEvent("onYearChange");
            triggerEvent("onMonthChange");
        }
        buildDays();
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.config.enableTime &&
            compareDates(selectedDate, self.config.minDate) === 0)
            setHoursFromDate(self.config.minDate);
        updateValue();
        if (self.config.enableTime)
            setTimeout(function () { return (self.showTimeInput = true); }, 50);
        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(target);
                self._hidePrevMonthArrow =
                    self._hidePrevMonthArrow ||
                        (self.minRangeDate !== undefined &&
                            self.minRangeDate >
                                self.days.childNodes[0].dateObj);
                self._hideNextMonthArrow =
                    self._hideNextMonthArrow ||
                        (self.maxRangeDate !== undefined &&
                            self.maxRangeDate <
                                new Date(self.currentYear, self.currentMonth + 1, 1));
            }
            else
                updateNavigationCurrentMonth();
        }
        triggerEvent("onChange");
        if (!shouldChangeMonth)
            focusOnDay(target.$i, 0);
        else
            afterDayAnim(function () { return self.selectedDateElem && self.selectedDateElem.focus(); });
        if (self.hourElement !== undefined)
            setTimeout(function () { return self.hourElement !== undefined && self.hourElement.select(); }, 451);
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range)
                self.close();
        }
    }
    function set(option, value) {
        if (option !== null && typeof option === "object")
            Object.assign(self.config, option);
        else
            self.config[option] = value;
        self.redraw();
        jumpToDate();
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split("; ")
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
        self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (date !== 0 && !date)
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];
        self.redraw();
        jumpToDate();
        setHoursFromDate();
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = new Date();
        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        var initialDate = self.selectedDates.length
            ? self.selectedDates[0]
            : self.config.minDate &&
                self.config.minDate.getTime() > self.now.getTime()
                ? self.config.minDate
                : self.config.maxDate &&
                    self.config.maxDate.getTime() < self.now.getTime()
                    ? self.config.maxDate
                    : self.now;
        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();
        if (self.selectedDates.length)
            self.latestSelectedDateObj = self.selectedDates[0];
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
        Object.defineProperty(self, "showTimeInput", {
            get: function () { return self._showTimeInput; },
            set: function (bool) {
                self._showTimeInput = bool;
                if (self.calendarContainer)
                    toggleClass(self.calendarContainer, "showTimeInput", bool);
                positionCalendar();
            },
        });
    }
    function formatDate(dateObj, frmt) {
        if (self.config !== undefined && self.config.formatDate !== undefined)
            return self.config.formatDate(dateObj, frmt);
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, self.l10n, self.config)
                : c !== "\\" ? c : "";
        })
            .join("");
    }
    function parseDate(date, givenFormat, timeless) {
        if (date !== 0 && !date)
            return undefined;
        var parsedDate;
        var date_orig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (self.config || flatpickr.defaultConfig).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr))
                parsedDate = new Date(date);
            else if (self.config && self.config.parseDate)
                parsedDate = self.config.parseDate(date, format);
            else {
                parsedDate =
                    !self.config || !self.config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate =
                            fn(parsedDate, val, self.l10n) || parsedDate);
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date)) {
            console.warn("flatpickr: invalid date " + date_orig);
            console.info(self.element);
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    }
    function setupInputs() {
        self.input = self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
        if (!self.input) {
            console.warn("Error: invalid input element specified", self.input);
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.type = "text";
            self.input.type = "hidden";
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar ? "time" : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = self.input.getAttribute("step") || "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date" ? "Y-m-d" : "H:i:S";
        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        self.mobileInput.addEventListener("change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle() {
        if (self.isOpen)
            return self.close();
        self.open();
    }
    function triggerEvent(event, data) {
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.currentMonthElement.textContent =
            monthToStr(self.currentMonth, self.config.shorthandCurrentMonth, self.l10n) + " ";
        self.currentYearElement.value = self.currentYear.toString();
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (!self.selectedDates.length)
            return self.clear(triggerChange);
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        var joinChar = self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator;
        self.input.value = self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, self.config.dateFormat); })
            .join(joinChar);
        if (self.altInput !== undefined) {
            self.altInput.value = self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, self.config.altFormat); })
                .join(joinChar);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavScroll(e) {
        e.preventDefault();
        var isYear = self.currentYearElement.parentNode &&
            self.currentYearElement.parentNode.contains(e.target);
        if (e.target === self.currentMonthElement || isYear) {
            var delta = mouseDelta(e);
            if (isYear) {
                changeYear(self.currentYear + delta);
                e.target.value = self.currentYear.toString();
            }
            else
                self.changeMonth(delta, true, false);
        }
    }
    function onMonthNavClick(e) {
        var isPrevMonth = self.prevMonthNav.contains(e.target);
        var isNextMonth = self.nextMonthNav.contains(e.target);
        if (isPrevMonth || isNextMonth)
            changeMonth(isPrevMonth ? -1 : 1);
        else if (e.target === self.currentYearElement) {
            e.preventDefault();
            self.currentYearElement.select();
        }
        else if (e.target.className === "arrowUp")
            self.changeYear(self.currentYear + 1);
        else if (e.target.className === "arrowDown")
            self.changeYear(self.currentYear - 1);
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", input = e.target;
        if (self.amPM !== undefined && e.target === self.amPM)
            self.amPM.textContent =
                self.l10n.amPM[self.amPM.textContent === "AM" ? 1 : 0];
        var min = Number(input.min), max = Number(input.max), step = Number(input.step), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown
                ? e.which === 38 ? 1 : -1
                : Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step))
                self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList);
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.warn(e, e.stack);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr;
flatpickr = function (selector, config) {
    if (selector instanceof NodeList)
        return _flatpickr(selector, config);
    else if (typeof selector === "string")
        return _flatpickr(window.document.querySelectorAll(selector), config);
    return _flatpickr([selector], config);
};
if (typeof window === "object")
    window.flatpickr = flatpickr;
flatpickr.defaultConfig = defaults;
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign({}, flatpickr.l10ns.default, l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
};
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
var flatpickr$1 = flatpickr;

return flatpickr$1;

})));


/***/ }),

/***/ 131:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationDataTable_vue__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5eaa9cb0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationDataTable_vue__ = __webpack_require__(219);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationDataTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5eaa9cb0_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationDataTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/EvaluationDataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5eaa9cb0", Component.options)
  } else {
    hotAPI.reload("data-v-5eaa9cb0", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 137:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_downloadjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_report_utils_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		id: {
			type: String,
			required: false
		},
		striped: {
			type: Boolean,
			default: true
		},
		bordered: {
			type: Boolean,
			default: false
		},

		thead: {
			type: Array,
			required: false
		},
		config: {
			type: Object,
			required: false
		},
		data: {
			type: Array,
			required: false
		},

		reloadable: {
			type: Boolean,
			default: false
		},
		exportable: {
			type: Boolean,
			default: false
		},
		exportFilename: {
			type: String,
			default: function _default() {
				return 'Table Export ' + new Date().toLocaleString();
			}
		}
	},
	data: function data() {
		return {
			updateData: false
		};
	},
	mounted: function mounted() {
		$(this.$refs.table).DataTable(Object.assign({}, this.config, { data: this.data }));
	},

	computed: {
		tableClass: function tableClass() {
			return {
				'table-striped': this.striped,
				'table-bordered': this.bordered
			};
		},
		canReload: function canReload() {
			return this.config && 'ajax' in this.config || this.reloadable;
		}
	},
	watch: {
		config: function config() {
			var config = Object.assign({ destroy: true }, this.config, { data: this.data });
			$(this.$refs.table).DataTable(config);
		},
		data: function data(_data) {
			var _this = this;

			this.updateData = true;
			this.$nextTick(function () {
				// only set data if table not already recreated with new data
				if (_this.updateData) {
					$(_this.$refs.table).DataTable({
						retrieve: true
					}).clear().rows.add(_data).draw();
					_this.updateData = false;
				}
			});
		}
	},
	methods: {
		reloadTable: function reloadTable() {
			if (!this.canReload) return;

			if (this.config && 'ajax' in this.config) $(this.$refs.table).DataTable({
				retrieve: true
			}).ajax.reload(null, false);else this.$emit('reload');
		},
		exportCsv: function exportCsv() {
			if (!this.exportable) return;

			var header = Object(__WEBPACK_IMPORTED_MODULE_1__modules_report_utils_js__["f" /* csvHeader */])(this.thead);
			var rows = this.data.map(function (row) {
				return row.map(function (cell) {
					return Object(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["e" /* escapeCsv */])(cell.toString());
				}).join(',');
			}).sort(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["D" /* sortIgnoreCase */]);
			var table = header.concat(rows);
			__WEBPACK_IMPORTED_MODULE_0_downloadjs___default()(table.join('\n'), this.exportFilename + '.csv', 'text/csv');
		}
	},
	beforeUpdate: function beforeUpdate() {
		$(this.$refs.table).DataTable({
			retrieve: true
		}).clear().destroy();
		this.updateData = false;
	},
	updated: function updated() {
		$(this.$refs.table).DataTable(Object.assign({}, this.config, { data: this.data }));
	},
	beforeDestroy: function beforeDestroy() {
		$(this.$refs.table).DataTable({
			retrieve: true
		}).clear().destroy();
	}
});

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "table-responsive" }, [
    _vm.canReload
      ? _c("div", { staticClass: "refresh-button-container" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-default",
              attrs: { type: "button", title: "Reload table" },
              on: { click: _vm.reloadTable }
            },
            [_c("span", { staticClass: "glyphicon glyphicon-refresh" })]
          )
        ])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "table",
      {
        ref: "table",
        staticClass: "table",
        class: _vm.tableClass,
        attrs: { id: _vm.id, width: "100%" }
      },
      [
        _vm._t("default", [
          _c(
            "thead",
            _vm._l(_vm.thead, function(row, rowIndex) {
              return _c(
                "tr",
                { key: "row-" + rowIndex },
                _vm._l(row, function(th, thIndex) {
                  return _c(
                    "th",
                    {
                      key: thIndex,
                      attrs: { rowspan: th.rowspan, colspan: th.colspan }
                    },
                    [
                      _vm._v(
                        "\n\t\t\t\t\t\t" +
                          _vm._s(th.text || th) +
                          "\n\t\t\t\t\t"
                      )
                    ]
                  )
                })
              )
            })
          )
        ])
      ],
      2
    ),
    _vm._v(" "),
    _vm.exportable && _vm.data && _vm.data.length > 0
      ? _c("div", { staticClass: "text-center" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-default",
              attrs: { type: "button" },
              on: { click: _vm.exportCsv }
            },
            [_vm._v("\n\t\t\tExport CSV\n\t\t")]
          )
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-15321984", esExports)
  }
}

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(85);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),

/***/ 141:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flatpickr_dist_flatpickr_css__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flatpickr_dist_flatpickr_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flatpickr_dist_flatpickr_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__ = __webpack_require__(6);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		value: {
			type: Object,
			required: true
		},
		hideDates: {
			type: Boolean,
			default: false
		},
		allTime: {
			type: Boolean,
			default: false
		},
		ranges: {
			type: Object,
			default: function _default() {
				var _ref;

				return _ref = {}, _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CUSTOM, null), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CURRENT_QUARTER, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["currentQuarter"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].LAST_QUARTER, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["lastQuarter"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CURRENT_SEMESTER, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["currentSemester"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].LAST_SEMESTER, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["lastSemester"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CURRENT_YEAR, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["currentYear"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].LAST_YEAR, __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["lastYear"]()), _ref;
			}
		},
		clearable: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			startDate: this.value && this.value.startDate && __WEBPACK_IMPORTED_MODULE_2_moment___default()(this.value.startDate).isValid() ? this.value.startDate : null,
			endDate: this.value && this.value.endDate && __WEBPACK_IMPORTED_MODULE_2_moment___default()(this.value.endDate).isValid() ? this.value.endDate : null,
			dateRange: __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CUSTOM
		};
	},
	created: function created() {
		this.matchDateRangeWithValue();
	},

	computed: {
		dates: function dates() {
			var startDate = this.startDate && __WEBPACK_IMPORTED_MODULE_2_moment___default()(this.startDate).isValid() ? this.startDate : null;

			var endDate = this.endDate && __WEBPACK_IMPORTED_MODULE_2_moment___default()(this.endDate).isValid() ? this.endDate : null;

			return {
				startDate: startDate,
				endDate: endDate
			};
		},
		dateRanges: function dateRanges() {
			var ranges = Object.assign({}, this.ranges);
			if (this.allTime && !ranges[__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].ALL_TIME]) ranges[__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].ALL_TIME] = __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["allTime"]();else delete ranges[__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].ALL_TIME];

			return ranges;
		},
		flatpickrOptions: function flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: 'form-control appear-not-readonly',
				altFormat: 'M j, Y'
			};
		}
	},
	watch: {
		dates: function dates(_dates) {
			this.$emit('input', _dates);
		},
		value: function value(_value) {
			this.matchDateRangeWithValue();
			this.startDate = _value.startDate;
			this.endDate = _value.endDate;
		},
		dateRange: function dateRange(_dateRange) {
			if (_dateRange === __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].ALL_TIME) this.setDate(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["allTime"]());

			if (_dateRange !== __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CUSTOM && this.dateRanges[_dateRange] && !__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["datesEqual"](this.value, this.dateRanges[_dateRange])) this.setDate(this.dateRanges[_dateRange]);
		}
	},
	methods: {
		matchDateRangeWithValue: function matchDateRangeWithValue() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;

			if (this.allTime && !value.startDate && !value.endDate) {
				this.dateRange = __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].ALL_TIME;
				return;
			}

			if (this.dateRange && this.dateRange !== __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CUSTOM && this.dateRanges[this.dateRange] && __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["datesEqual"](value, this.dateRanges[this.dateRange])) return;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.values(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var range = _step.value;

					if (this.dateRanges[range] && __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["datesEqual"](value, this.dateRanges[range])) {
						this.dateRange = range;
						return;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.dateRange = __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CUSTOM;
		},
		setDate: function setDate(dates) {
			dates = __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateStringObject"](dates);
			this.startDate = dates.startDate;
			this.endDate = dates.endDate;
		},

		camelCaseToWords: __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["c" /* camelCaseToWords */]
	},
	components: {
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__["a" /* default */]
	}
});

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "container", staticClass: "form-horizontal" }, [
    _c("div", { staticClass: "form-group" }, [
      _c("div", { staticClass: "col-md-4" }, [
        _c("label", { staticClass: "containing-label" }, [
          _vm._v("\n\t\t\t\tDate Range\n\t\t\t\t"),
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.dateRange,
                  expression: "dateRange"
                }
              ],
              staticClass: "form-control",
              on: {
                change: function($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function(o) {
                      return o.selected
                    })
                    .map(function(o) {
                      var val = "_value" in o ? o._value : o.value
                      return val
                    })
                  _vm.dateRange = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0]
                }
              }
            },
            _vm._l(_vm.dateRanges, function(range, name) {
              return _c("option", { domProps: { value: name } }, [
                _vm._v(
                  "\n\t\t\t\t\t\t" +
                    _vm._s(_vm.camelCaseToWords(name)) +
                    "\n\t\t\t\t\t"
                )
              ])
            })
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 col-md-4" }, [
        _c(
          "label",
          { staticClass: "containing-label" },
          [
            _vm._v("\n\t\t\t\tStart Date\n\t\t\t\t"),
            _vm.clearable
              ? _c(
                  "div",
                  { staticClass: "input-group" },
                  [
                    _c("vue-flatpickr", {
                      staticClass: "form-control",
                      attrs: { options: _vm.flatpickrOptions },
                      model: {
                        value: _vm.startDate,
                        callback: function($$v) {
                          _vm.startDate = $$v
                        },
                        expression: "startDate"
                      }
                    }),
                    _vm._v(" "),
                    _c("span", { staticClass: "input-group-btn" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-default",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              _vm.startDate = null
                            }
                          }
                        },
                        [_vm._v("\n\t\t\t\t\t\t\tClear\n\t\t\t\t\t\t")]
                      )
                    ])
                  ],
                  1
                )
              : _c("vue-flatpickr", {
                  staticClass: "form-control",
                  attrs: { options: _vm.flatpickrOptions },
                  model: {
                    value: _vm.startDate,
                    callback: function($$v) {
                      _vm.startDate = $$v
                    },
                    expression: "startDate"
                  }
                })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 col-md-4" }, [
        _c(
          "label",
          { staticClass: "containing-label" },
          [
            _vm._v("\n\t\t\t\tEnd Date\n\t\t\t\t"),
            _vm.clearable
              ? _c(
                  "div",
                  { staticClass: "input-group" },
                  [
                    _c("vue-flatpickr", {
                      staticClass: "form-control",
                      attrs: { options: _vm.flatpickrOptions },
                      model: {
                        value: _vm.endDate,
                        callback: function($$v) {
                          _vm.endDate = $$v
                        },
                        expression: "endDate"
                      }
                    }),
                    _vm._v(" "),
                    _c("span", { staticClass: "input-group-btn" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-default",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              _vm.endDate = null
                            }
                          }
                        },
                        [_vm._v("\n\t\t\t\t\t\t\tClear\n\t\t\t\t\t\t")]
                      )
                    ])
                  ],
                  1
                )
              : _c("vue-flatpickr", {
                  staticClass: "form-control",
                  attrs: { options: _vm.flatpickrOptions },
                  model: {
                    value: _vm.endDate,
                    callback: function($$v) {
                      _vm.endDate = $$v
                    },
                    expression: "endDate"
                  }
                })
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-272d3bd7", esExports)
  }
}

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearSelector_vue__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5678615a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearSelector_vue__ = __webpack_require__(167);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearSelector_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5678615a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearSelector_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/AcademicYearSelector.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5678615a", Component.options)
  } else {
    hotAPI.reload("data-v-5678615a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		value: {
			type: Object,
			required: true
		},
		minDate: {
			type: String,
			default: function _default() {
				return Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateString"])(Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(__WEBPACK_IMPORTED_MODULE_1_moment___default()()).endDate);
			}
		},
		maxDate: {
			type: String,
			default: function _default() {
				return Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateString"])(Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(__WEBPACK_IMPORTED_MODULE_1_moment___default()().add(1, 'year')).startDate);
			}
		},
		descending: {
			type: Boolean,
			default: true
		},
		allTime: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	data: function data() {
		return {
			yearIndex: 0
		};
	},


	computed: {
		academicYears: function academicYears() {
			var maxDate = __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.maxDate);
			var d = __WEBPACK_IMPORTED_MODULE_1_moment___default()(this.minDate);

			var years = [];

			do {
				years.push(Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(d.clone()));

				d.add(1, 'year');
			} while (d < maxDate);

			if (this.descending) years.reverse();

			if (this.allTime) years.push({
				startDate: null,
				endDate: null
			});

			return years;
		}
	},

	mounted: function mounted() {
		this.matchIndexWithValue(this.value);
	},


	watch: {
		value: function value(_value) {
			this.matchIndexWithValue(_value);
		},
		yearIndex: function yearIndex(index, lastIndex) {
			index = Number(index);
			lastIndex = Number(lastIndex);
			if (index !== lastIndex) this.$emit('input', Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateStringObject"])(this.academicYears[index]));
		}
	},

	methods: {
		matchIndexWithValue: function matchIndexWithValue(value) {
			var newIndex = this.academicYears.findIndex(function (year) {
				return Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["datesEqual"])(year, value);
			});

			if (newIndex !== -1) this.yearIndex = newIndex;
		},

		renderDateRange: __WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["renderDateRange"]
	},

	components: {
		SelectTwo: __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "select-two",
    {
      staticClass: "form-control",
      attrs: { readonly: _vm.readonly },
      model: {
        value: _vm.yearIndex,
        callback: function($$v) {
          _vm.yearIndex = _vm._n($$v)
        },
        expression: "yearIndex"
      }
    },
    _vm._l(_vm.academicYears, function(year, index) {
      return _c("option", { domProps: { value: index } }, [
        _vm._v(
          "\n\t\t" +
            _vm._s(_vm.renderDateRange(year.startDate, year.endDate)) +
            "\n\t"
        )
      ])
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5678615a", esExports)
  }
}

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return USER_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SETTINGS_HELP; });
/* harmony export (immutable) */ __webpack_exports__["c"] = getUserSetting;


var USER_SETTINGS = {
	defaultEvaluationRange: ['currentQuarter', 'currentSemester', 'currentYear', 'allTime']
};

var SETTINGS_HELP = {
	defaultEvaluationRange: 'Warning: selecting "All time" by default may result in longer loading times'
};

function getUserSetting(user, settingName) {
	if (user && user.user_settings) {
		var setting = user.user_settings.find(function (s) {
			return s.name === settingName;
		});
		if (setting) return setting.value;
	}
}

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ConfirmationButton_vue__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26ab7592_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ConfirmationButton_vue__ = __webpack_require__(55);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ConfirmationButton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26ab7592_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ConfirmationButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ConfirmationButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26ab7592", Component.options)
  } else {
    hotAPI.reload("data-v-26ab7592", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(31);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 20:
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ 217:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_localforage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









window.localforage = __WEBPACK_IMPORTED_MODULE_2_localforage__;

/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__["a" /* default */],
	props: {
		id: {
			type: String,
			required: false
		},
		range: {
			type: String,
			default: __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"].CURRENT_QUARTER,
			validator: function validator(value) {
				return Object.values(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["DATE_RANGES"]).includes(value);
			}
		},
		startProp: {
			type: String,
			default: 'evaluation_date_start'
		},
		endProp: {
			type: String,
			default: 'evaluation_date_end'
		}
	},
	data: function data() {
		return {
			// eslint-disable-next-line import/namespace
			dates: __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateStringObject"](__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__[this.range]())
		};
	},
	mounted: function mounted() {
		var _this = this;

		if (this.id) {
			__WEBPACK_IMPORTED_MODULE_2_localforage__["getItem"](this.localforageKey).then(function (state) {
				if (state) {
					var now = __WEBPACK_IMPORTED_MODULE_3_moment___default()();
					if (state.createdAt >= now.subtract(6, 'hours').toDate()) {
						_this.dates = state.dates;
					} else {
						__WEBPACK_IMPORTED_MODULE_2_localforage__["removeItem"](_this.localforageKey);
					}
				}
			});
		}
	},

	computed: {
		localforageKey: function localforageKey() {
			if (this.id) return this.id + '-evaluation-data-table';
		},
		evaluationConfig: function evaluationConfig() {
			return Object.assign({
				stateSave: true,
				deferRender: true
			}, this.config);
		},
		datedConfig: function datedConfig() {
			if (!this.evaluationConfig || !('ajax' in this.evaluationConfig) || !this.dates.startDate && !this.dates.endDate) return this.evaluationConfig;

			var config = Object.assign({}, this.evaluationConfig, {
				ajax: JSON.parse(JSON.stringify(this.evaluationConfig.ajax))
			});

			if (this.dates.endDate) config.ajax.data[this.startProp] = ['<=', __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateString"](this.dates.endDate)];
			if (this.dates.startDate) config.ajax.data[this.endProp] = ['>=', __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateString"](this.dates.startDate)];

			return config;
		}
	},
	watch: {
		dates: function dates(_dates) {
			if (this.id) {
				__WEBPACK_IMPORTED_MODULE_2_localforage__["setItem"](this.localforageKey, {
					dates: _dates,
					createdAt: new Date()
				}).catch(function (err) {
					console.error(err);
				});
			}
		}
	},
	components: {
		DataTable: __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__["a" /* default */],
		StartEndDate: __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.5.3
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/
(function(f){if(true){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.localforage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw (f.code="MODULE_NOT_FOUND", f)}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(_dereq_,module,exports){
'use strict';
var immediate = _dereq_(1);

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && typeof obj === 'object' && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

exports.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

exports.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

exports.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

exports.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"1":1}],3:[function(_dereq_,module,exports){
(function (global){
'use strict';
if (typeof global.Promise !== 'function') {
  global.Promise = _dereq_(2);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"2":2}],4:[function(_dereq_,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getIDB() {
    /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
    try {
        if (typeof indexedDB !== 'undefined') {
            return indexedDB;
        }
        if (typeof webkitIndexedDB !== 'undefined') {
            return webkitIndexedDB;
        }
        if (typeof mozIndexedDB !== 'undefined') {
            return mozIndexedDB;
        }
        if (typeof OIndexedDB !== 'undefined') {
            return OIndexedDB;
        }
        if (typeof msIndexedDB !== 'undefined') {
            return msIndexedDB;
        }
    } catch (e) {
        return;
    }
}

var idb = getIDB();

function isIndexedDBValid() {
    try {
        // Initialize IndexedDB; fall back to vendor-prefixed versions
        // if needed.
        if (!idb) {
            return false;
        }
        // We mimic PouchDB here;
        //
        // We test for openDatabase because IE Mobile identifies itself
        // as Safari. Oh the lulz...
        var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);

        var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1;

        // Safari <10.1 does not meet our requirements for IDB support (#5572)
        // since Safari 10.1 shipped with fetch, we can use that to detect it
        return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' &&
        // some outdated implementations of IDB that appear on Samsung
        // and HTC Android devices <4.4 are missing IDBKeyRange
        // See: https://github.com/mozilla/localForage/issues/128
        // See: https://github.com/mozilla/localForage/issues/272
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
// Abstracts constructing a Blob object, so it also works in older
// browsers that don't support the native Blob constructor. (i.e.
// old QtWebKit versions, at least).
function createBlob(parts, properties) {
    /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
    parts = parts || [];
    properties = properties || {};
    try {
        return new Blob(parts, properties);
    } catch (e) {
        if (e.name !== 'TypeError') {
            throw e;
        }
        var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
        var builder = new Builder();
        for (var i = 0; i < parts.length; i += 1) {
            builder.append(parts[i]);
        }
        return builder.getBlob(properties.type);
    }
}

// This is CommonJS because lie is an external dependency, so Rollup
// can just ignore it.
if (typeof Promise === 'undefined') {
    // In the "nopromises" build this will just throw if you don't have
    // a global promise object, but it would throw anyway later.
    _dereq_(3);
}
var Promise$1 = Promise;

function executeCallback(promise, callback) {
    if (callback) {
        promise.then(function (result) {
            callback(null, result);
        }, function (error) {
            callback(error);
        });
    }
}

function executeTwoCallbacks(promise, callback, errorCallback) {
    if (typeof callback === 'function') {
        promise.then(callback);
    }

    if (typeof errorCallback === 'function') {
        promise["catch"](errorCallback);
    }
}

function normalizeKey(key) {
    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    return key;
}

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs;
var dbContexts;
var toString = Object.prototype.toString;

// Transaction Modes
var READ_ONLY = 'readonly';
var READ_WRITE = 'readwrite';

// Transform a binary string to an array buffer, because otherwise
// weird stuff happens when you try to work with the binary string directly.
// It is known.
// From http://stackoverflow.com/questions/14967647/ (continues on next line)
// encode-decode-image-with-base64-breaks-image (2013-04-21)
function _binStringToArrayBuffer(bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
    }
    return buf;
}

//
// Blobs are not supported in all versions of IndexedDB, notably
// Chrome <37 and Android <5. In those versions, storing a blob will throw.
//
// Various other blob bugs exist in Chrome v37-42 (inclusive).
// Detecting them is expensive and confusing to users, and Chrome 37-42
// is at very low usage worldwide, so we do a hacky userAgent check instead.
//
// content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
// 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
// FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
//
// Code borrowed from PouchDB. See:
// https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
//
function _checkBlobSupportWithoutCaching(idb) {
    return new Promise$1(function (resolve) {
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
        var blob = createBlob(['']);
        txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

        txn.onabort = function (e) {
            // If the transaction aborts now its due to not being able to
            // write to the database, likely due to the disk being full
            e.preventDefault();
            e.stopPropagation();
            resolve(false);
        };

        txn.oncomplete = function () {
            var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
            var matchedEdge = navigator.userAgent.match(/Edge\//);
            // MS Edge pretends to be Chrome 42:
            // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx
            resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
        };
    })["catch"](function () {
        return false; // error, so assume unsupported
    });
}

function _checkBlobSupport(idb) {
    if (typeof supportsBlobs === 'boolean') {
        return Promise$1.resolve(supportsBlobs);
    }
    return _checkBlobSupportWithoutCaching(idb).then(function (value) {
        supportsBlobs = value;
        return supportsBlobs;
    });
}

function _deferReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Create a deferred object representing the current database operation.
    var deferredOperation = {};

    deferredOperation.promise = new Promise$1(function (resolve) {
        deferredOperation.resolve = resolve;
    });

    // Enqueue the deferred operation.
    dbContext.deferredOperations.push(deferredOperation);

    // Chain its promise to the database readiness.
    if (!dbContext.dbReady) {
        dbContext.dbReady = deferredOperation.promise;
    } else {
        dbContext.dbReady = dbContext.dbReady.then(function () {
            return deferredOperation.promise;
        });
    }
}

function _advanceReadiness(dbInfo) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Resolve its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.resolve();
    }
}

function _rejectReadiness(dbInfo, err) {
    var dbContext = dbContexts[dbInfo.name];

    // Dequeue a deferred operation.
    var deferredOperation = dbContext.deferredOperations.pop();

    // Reject its promise (which is part of the database readiness
    // chain of promises).
    if (deferredOperation) {
        deferredOperation.reject(err);
    }
}

function _getConnection(dbInfo, upgradeNeeded) {
    return new Promise$1(function (resolve, reject) {

        if (dbInfo.db) {
            if (upgradeNeeded) {
                _deferReadiness(dbInfo);
                dbInfo.db.close();
            } else {
                return resolve(dbInfo.db);
            }
        }

        var dbArgs = [dbInfo.name];

        if (upgradeNeeded) {
            dbArgs.push(dbInfo.version);
        }

        var openreq = idb.open.apply(idb, dbArgs);

        if (upgradeNeeded) {
            openreq.onupgradeneeded = function (e) {
                var db = openreq.result;
                try {
                    db.createObjectStore(dbInfo.storeName);
                    if (e.oldVersion <= 1) {
                        // Added when support for blob shims was added
                        db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                    }
                } catch (ex) {
                    if (ex.name === 'ConstraintError') {
                        console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                    } else {
                        throw ex;
                    }
                }
            };
        }

        openreq.onerror = function (e) {
            e.preventDefault();
            reject(openreq.error);
        };

        openreq.onsuccess = function () {
            resolve(openreq.result);
            _advanceReadiness(dbInfo);
        };
    });
}

function _getOriginalConnection(dbInfo) {
    return _getConnection(dbInfo, false);
}

function _getUpgradedConnection(dbInfo) {
    return _getConnection(dbInfo, true);
}

function _isUpgradeNeeded(dbInfo, defaultVersion) {
    if (!dbInfo.db) {
        return true;
    }

    var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
    var isDowngrade = dbInfo.version < dbInfo.db.version;
    var isUpgrade = dbInfo.version > dbInfo.db.version;

    if (isDowngrade) {
        // If the version is not the default one
        // then warn for impossible downgrade.
        if (dbInfo.version !== defaultVersion) {
            console.warn('The database "' + dbInfo.name + '"' + ' can\'t be downgraded from version ' + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
        }
        // Align the versions to prevent errors.
        dbInfo.version = dbInfo.db.version;
    }

    if (isUpgrade || isNewStore) {
        // If the store is new then increment the version (if needed).
        // This will trigger an "upgradeneeded" event which is required
        // for creating a store.
        if (isNewStore) {
            var incVersion = dbInfo.db.version + 1;
            if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
            }
        }

        return true;
    }

    return false;
}

// encode a blob for indexeddb engines that don't support blobs
function _encodeBlob(blob) {
    return new Promise$1(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onloadend = function (e) {
            var base64 = btoa(e.target.result || '');
            resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
            });
        };
        reader.readAsBinaryString(blob);
    });
}

// decode an encoded blob
function _decodeBlob(encodedBlob) {
    var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
    return createBlob([arrayBuff], { type: encodedBlob.type });
}

// is this one of our fancy encoded blobs?
function _isEncodedBlob(value) {
    return value && value.__local_forage_encoded_blob;
}

// Specialize the default `ready()` function by making it dependent
// on the current database operations. Thus, the driver will be actually
// ready when it's been initialized (default) *and* there are no pending
// operations on the database (initiated by some other instances).
function _fullyReady(callback) {
    var self = this;

    var promise = self._initReady().then(function () {
        var dbContext = dbContexts[self._dbInfo.name];

        if (dbContext && dbContext.dbReady) {
            return dbContext.dbReady;
        }
    });

    executeTwoCallbacks(promise, callback, callback);
    return promise;
}

// Try to establish a new db connection to replace the
// current one which is broken (i.e. experiencing
// InvalidStateError while creating a transaction).
function _tryReconnect(dbInfo) {
    _deferReadiness(dbInfo);

    var dbContext = dbContexts[dbInfo.name];
    var forages = dbContext.forages;

    for (var i = 0; i < forages.length; i++) {
        if (forages[i]._dbInfo.db) {
            forages[i]._dbInfo.db.close();
            forages[i]._dbInfo.db = null;
        }
    }

    return _getConnection(dbInfo, false).then(function (db) {
        for (var j = 0; j < forages.length; j++) {
            forages[j]._dbInfo.db = db;
        }
    })["catch"](function (err) {
        _rejectReadiness(dbInfo, err);
        throw err;
    });
}

// FF doesn't like Promises (micro-tasks) and IDDB store operations,
// so we have to do it with callbacks
function createTransaction(dbInfo, mode, callback) {
    try {
        var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
        callback(null, tx);
    } catch (err) {
        if (!dbInfo.db || err.name === 'InvalidStateError') {
            return _tryReconnect(dbInfo).then(function () {

                var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
                callback(null, tx);
            });
        }

        callback(err);
    }
}

// Open the IndexedDB database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    // Initialize a singleton container for all running localForages.
    if (!dbContexts) {
        dbContexts = {};
    }

    // Get the current context of the database;
    var dbContext = dbContexts[dbInfo.name];

    // ...or create a new context.
    if (!dbContext) {
        dbContext = {
            // Running localForages sharing a database.
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
        };
        // Register the new context in the global container.
        dbContexts[dbInfo.name] = dbContext;
    }

    // Register itself as a running localForage in the current context.
    dbContext.forages.push(self);

    // Replace the default `ready()` function with the specialized one.
    if (!self._initReady) {
        self._initReady = self.ready;
        self.ready = _fullyReady;
    }

    // Create an array of initialization states of the related localForages.
    var initPromises = [];

    function ignoreErrors() {
        // Don't handle errors here,
        // just makes sure related localForages aren't pending.
        return Promise$1.resolve();
    }

    for (var j = 0; j < dbContext.forages.length; j++) {
        var forage = dbContext.forages[j];
        if (forage !== self) {
            // Don't wait for itself...
            initPromises.push(forage._initReady()["catch"](ignoreErrors));
        }
    }

    // Take a snapshot of the related localForages.
    var forages = dbContext.forages.slice(0);

    // Initialize the connection process only when
    // all the related localForages aren't pending.
    return Promise$1.all(initPromises).then(function () {
        dbInfo.db = dbContext.db;
        // Get the connection or open a new one without upgrade.
        return _getOriginalConnection(dbInfo);
    }).then(function (db) {
        dbInfo.db = db;
        if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
            // Reopen the database for upgrading.
            return _getUpgradedConnection(dbInfo);
        }
        return db;
    }).then(function (db) {
        dbInfo.db = dbContext.db = db;
        self._dbInfo = dbInfo;
        // Share the final connection amongst related localForages.
        for (var k = 0; k < forages.length; k++) {
            var forage = forages[k];
            if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
            }
        }
    });
}

function getItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.get(key);

                    req.onsuccess = function () {
                        var value = req.result;
                        if (value === undefined) {
                            value = null;
                        }
                        if (_isEncodedBlob(value)) {
                            value = _decodeBlob(value);
                        }
                        resolve(value);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items stored in database.
function iterate(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var iterationNumber = 1;

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (cursor) {
                            var value = cursor.value;
                            if (_isEncodedBlob(value)) {
                                value = _decodeBlob(value);
                            }
                            var result = iterator(value, cursor.key, iterationNumber++);

                            // when the iterator callback retuns any
                            // (non-`undefined`) value, then we stop
                            // the iteration immediately
                            if (result !== void 0) {
                                resolve(result);
                            } else {
                                cursor["continue"]();
                            }
                        } else {
                            resolve();
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        var dbInfo;
        self.ready().then(function () {
            dbInfo = self._dbInfo;
            if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                    if (blobSupport) {
                        return value;
                    }
                    return _encodeBlob(value);
                });
            }
            return value;
        }).then(function (value) {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.put(value, key);

                    // The reason we don't _save_ null is because IE 10 does
                    // not support saving the `null` type in IndexedDB. How
                    // ironic, given the bug below!
                    // See: https://github.com/mozilla/localForage/issues/161
                    if (value === null) {
                        value = undefined;
                    }

                    transaction.oncomplete = function () {
                        // Cast to undefined so the value passed to
                        // callback/promise is the same as what one would get out
                        // of `getItem()` later. This leads to some weirdness
                        // (setItem('foo', undefined) will return `null`), but
                        // it's not my fault localStorage is our baseline and that
                        // it's weird.
                        if (value === undefined) {
                            value = null;
                        }

                        resolve(value);
                    };
                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    // We use a Grunt task to make this safe for IE and some
                    // versions of Android (including those used by Cordova).
                    // Normally IE won't like `.delete()` and will insist on
                    // using `['delete']()`, but we have a build step that
                    // fixes this for us now.
                    var req = store["delete"](key);
                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onerror = function () {
                        reject(req.error);
                    };

                    // The request will be also be aborted if we've exceeded our storage
                    // space.
                    transaction.onabort = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.clear();

                    transaction.oncomplete = function () {
                        resolve();
                    };

                    transaction.onabort = transaction.onerror = function () {
                        var err = req.error ? req.error : req.transaction.error;
                        reject(err);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.count();

                    req.onsuccess = function () {
                        resolve(req.result);
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function key(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        if (n < 0) {
            resolve(null);

            return;
        }

        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var advanced = false;
                    var req = store.openCursor();

                    req.onsuccess = function () {
                        var cursor = req.result;
                        if (!cursor) {
                            // this means there weren't enough keys
                            resolve(null);

                            return;
                        }

                        if (n === 0) {
                            // We have the first key, return it if that's what they
                            // wanted.
                            resolve(cursor.key);
                        } else {
                            if (!advanced) {
                                // Otherwise, ask the cursor to skip ahead n
                                // records.
                                advanced = true;
                                cursor.advance(n);
                            } else {
                                // When we get here, we've got the nth key.
                                resolve(cursor.key);
                            }
                        }
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                    return reject(err);
                }

                try {
                    var store = transaction.objectStore(self._dbInfo.storeName);
                    var req = store.openCursor();
                    var keys = [];

                    req.onsuccess = function () {
                        var cursor = req.result;

                        if (!cursor) {
                            resolve(keys);
                            return;
                        }

                        keys.push(cursor.key);
                        cursor["continue"]();
                    };

                    req.onerror = function () {
                        reject(req.error);
                    };
                } catch (e) {
                    reject(e);
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    _support: isIndexedDBValid(),
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys
};

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

// Sadly, the best way to save binary data in WebSQL/localStorage is serializing
// it to Base64, so this is how we store it to prevent very strange errors with less
// verbose ways of binary <-> string data storage.
var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

var BLOB_TYPE_PREFIX = '~~local_forage_type~';
var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;

var SERIALIZED_MARKER = '__lfsc__:';
var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length;

// OMG the serializations!
var TYPE_ARRAYBUFFER = 'arbf';
var TYPE_BLOB = 'blob';
var TYPE_INT8ARRAY = 'si08';
var TYPE_UINT8ARRAY = 'ui08';
var TYPE_UINT8CLAMPEDARRAY = 'uic8';
var TYPE_INT16ARRAY = 'si16';
var TYPE_INT32ARRAY = 'si32';
var TYPE_UINT16ARRAY = 'ur16';
var TYPE_UINT32ARRAY = 'ui32';
var TYPE_FLOAT32ARRAY = 'fl32';
var TYPE_FLOAT64ARRAY = 'fl64';
var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;

var toString$1 = Object.prototype.toString;

function stringToBuffer(serializedString) {
    // Fill the string into a ArrayBuffer.
    var bufferLength = serializedString.length * 0.75;
    var len = serializedString.length;
    var i;
    var p = 0;
    var encoded1, encoded2, encoded3, encoded4;

    if (serializedString[serializedString.length - 1] === '=') {
        bufferLength--;
        if (serializedString[serializedString.length - 2] === '=') {
            bufferLength--;
        }
    }

    var buffer = new ArrayBuffer(bufferLength);
    var bytes = new Uint8Array(buffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = BASE_CHARS.indexOf(serializedString[i]);
        encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
        encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
        encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);

        /*jslint bitwise: true */
        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return buffer;
}

// Converts a buffer to a string to store, serialized, in the backend
// storage library.
function bufferToString(buffer) {
    // base64-arraybuffer
    var bytes = new Uint8Array(buffer);
    var base64String = '';
    var i;

    for (i = 0; i < bytes.length; i += 3) {
        /*jslint bitwise: true */
        base64String += BASE_CHARS[bytes[i] >> 2];
        base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64String += BASE_CHARS[bytes[i + 2] & 63];
    }

    if (bytes.length % 3 === 2) {
        base64String = base64String.substring(0, base64String.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
        base64String = base64String.substring(0, base64String.length - 2) + '==';
    }

    return base64String;
}

// Serialize a value, afterwards executing a callback (which usually
// instructs the `setItem()` callback/promise to be executed). This is how
// we store binary data with localStorage.
function serialize(value, callback) {
    var valueType = '';
    if (value) {
        valueType = toString$1.call(value);
    }

    // Cannot use `value instanceof ArrayBuffer` or such here, as these
    // checks fail when running the tests using casper.js...
    //
    // TODO: See why those tests fail and use a better solution.
    if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
        // Convert binary arrays to a string and prefix the string with
        // a special marker.
        var buffer;
        var marker = SERIALIZED_MARKER;

        if (value instanceof ArrayBuffer) {
            buffer = value;
            marker += TYPE_ARRAYBUFFER;
        } else {
            buffer = value.buffer;

            if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
            } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
            } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
            } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
            } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
            } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
            } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
            } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
            } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
            } else {
                callback(new Error('Failed to get type for BinaryArray'));
            }
        }

        callback(marker + bufferToString(buffer));
    } else if (valueType === '[object Blob]') {
        // Conver the blob to a binaryArray and then to a string.
        var fileReader = new FileReader();

        fileReader.onload = function () {
            // Backwards-compatible prefix for the blob type.
            var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);

            callback(SERIALIZED_MARKER + TYPE_BLOB + str);
        };

        fileReader.readAsArrayBuffer(value);
    } else {
        try {
            callback(JSON.stringify(value));
        } catch (e) {
            console.error("Couldn't convert value into a JSON string: ", value);

            callback(null, e);
        }
    }
}

// Deserialize data we've inserted into a value column/field. We place
// special markers into our strings to mark them as encoded; this isn't
// as nice as a meta field, but it's the only sane thing we can do whilst
// keeping localStorage support intact.
//
// Oftentimes this will just deserialize JSON content, but if we have a
// special marker (SERIALIZED_MARKER, defined above), we will extract
// some kind of arraybuffer/binary data/typed array out of the string.
function deserialize(value) {
    // If we haven't marked this string as being specially serialized (i.e.
    // something other than serialized JSON), we can just return it and be
    // done with it.
    if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
        return JSON.parse(value);
    }

    // The following code deals with deserializing some kind of Blob or
    // TypedArray. First we separate out the type of data we're dealing
    // with from the data itself.
    var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
    var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);

    var blobType;
    // Backwards-compatible blob type serialization strategy.
    // DBs created with older versions of localForage will simply not have the blob type.
    if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
        var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
        blobType = matcher[1];
        serializedString = serializedString.substring(matcher[0].length);
    }
    var buffer = stringToBuffer(serializedString);

    // Return the right type based on the code/type set during
    // serialization.
    switch (type) {
        case TYPE_ARRAYBUFFER:
            return buffer;
        case TYPE_BLOB:
            return createBlob([buffer], { type: blobType });
        case TYPE_INT8ARRAY:
            return new Int8Array(buffer);
        case TYPE_UINT8ARRAY:
            return new Uint8Array(buffer);
        case TYPE_UINT8CLAMPEDARRAY:
            return new Uint8ClampedArray(buffer);
        case TYPE_INT16ARRAY:
            return new Int16Array(buffer);
        case TYPE_UINT16ARRAY:
            return new Uint16Array(buffer);
        case TYPE_INT32ARRAY:
            return new Int32Array(buffer);
        case TYPE_UINT32ARRAY:
            return new Uint32Array(buffer);
        case TYPE_FLOAT32ARRAY:
            return new Float32Array(buffer);
        case TYPE_FLOAT64ARRAY:
            return new Float64Array(buffer);
        default:
            throw new Error('Unkown type: ' + type);
    }
}

var localforageSerializer = {
    serialize: serialize,
    deserialize: deserialize,
    stringToBuffer: stringToBuffer,
    bufferToString: bufferToString
};

/*
 * Includes code from:
 *
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
// Open the WebSQL database (automatically creates one if one didn't
// previously exist), using any options set in the config.
function _initStorage$1(options) {
    var self = this;
    var dbInfo = {
        db: null
    };

    if (options) {
        for (var i in options) {
            dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
        }
    }

    var dbInfoPromise = new Promise$1(function (resolve, reject) {
        // Open the database; the openDatabase API will automatically
        // create it for us if it doesn't exist.
        try {
            dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
        } catch (e) {
            return reject(e);
        }

        // Create our key/value table if it doesn't exist.
        dbInfo.db.transaction(function (t) {
            t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' (id INTEGER PRIMARY KEY, key unique, value)', [], function () {
                self._dbInfo = dbInfo;
                resolve();
            }, function (t, error) {
                reject(error);
            });
        });
    });

    dbInfo.serializer = localforageSerializer;
    return dbInfoPromise;
}

function getItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).value : null;

                    // Check to see if this is serialized content we need to
                    // unpack.
                    if (result) {
                        result = dbInfo.serializer.deserialize(result);
                    }

                    resolve(result);
                }, function (t, error) {

                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function iterate$1(iterator, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;

            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                    var rows = results.rows;
                    var length = rows.length;

                    for (var i = 0; i < length; i++) {
                        var item = rows.item(i);
                        var result = item.value;

                        // Check to see if this is serialized content
                        // we need to unpack.
                        if (result) {
                            result = dbInfo.serializer.deserialize(result);
                        }

                        result = iterator(result, item.key, i + 1);

                        // void(0) prevents problems with redefinition
                        // of `undefined`.
                        if (result !== void 0) {
                            resolve(result);
                            return;
                        }
                    }

                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function _setItem(key, value, callback, retriesLeft) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            // The localStorage API doesn't return undefined values in an
            // "expected" way, so undefined is always cast to null in all
            // drivers. See: https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
                value = null;
            }

            // Save the original value to pass to the callback.
            var originalValue = value;

            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    dbInfo.db.transaction(function (t) {
                        t.executeSql('INSERT OR REPLACE INTO ' + dbInfo.storeName + ' (key, value) VALUES (?, ?)', [key, value], function () {
                            resolve(originalValue);
                        }, function (t, error) {
                            reject(error);
                        });
                    }, function (sqlError) {
                        // The transaction failed; check
                        // to see if it's a quota error.
                        if (sqlError.code === sqlError.QUOTA_ERR) {
                            // We reject the callback outright for now, but
                            // it's worth trying to re-run the transaction.
                            // Even if the user accepts the prompt to use
                            // more storage on Safari, this error will
                            // be called.
                            //
                            // Try to re-run the transaction.
                            if (retriesLeft > 0) {
                                resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                                return;
                            }
                            reject(sqlError);
                        }
                    });
                }
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function setItem$1(key, value, callback) {
    return _setItem.apply(this, [key, value, callback, 1]);
}

function removeItem$1(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Deletes every item in the table.
// TODO: Find out if this resets the AUTO_INCREMENT number.
function clear$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('DELETE FROM ' + dbInfo.storeName, [], function () {
                    resolve();
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Does a simple `COUNT(key)` to get the number of items stored in
// localForage.
function length$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                t.executeSql('SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                    var result = results.rows.item(0).c;

                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

// Return the key located at key index X; essentially gets the key from a
// `WHERE id = ?`. This is the most efficient way I can think to implement
// this rarely-used (in my experience) part of the API, but it can seem
// inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
// the ID of each key will change every time it's updated. Perhaps a stored
// procedure for the `setItem()` SQL would solve this problem?
// TODO: Don't change ID on `setItem()`.
function key$1(n, callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                    var result = results.rows.length ? results.rows.item(0).key : null;
                    resolve(result);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$1(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            dbInfo.db.transaction(function (t) {
                t.executeSql('SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                    var keys = [];

                    for (var i = 0; i < results.rows.length; i++) {
                        keys.push(results.rows.item(i).key);
                    }

                    resolve(keys);
                }, function (t, error) {
                    reject(error);
                });
            });
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

var webSQLStorage = {
    _driver: 'webSQLStorage',
    _initStorage: _initStorage$1,
    _support: isWebSQLValid(),
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1
};

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage && typeof localStorage.setItem === 'function';
    } catch (e) {
        return false;
    }
}

// Check if localStorage throws when saving an item
function checkIfLocalStorageThrows() {
    var localStorageTestKey = '_localforage_support_test';

    try {
        localStorage.setItem(localStorageTestKey, true);
        localStorage.removeItem(localStorageTestKey);

        return false;
    } catch (e) {
        return true;
    }
}

// Check if localStorage is usable and allows to save an item
// This method checks if localStorage is usable in Safari Private Browsing
// mode, or in any other case where the available quota for localStorage
// is 0 and there wasn't any saved items yet.
function _isLocalStorageUsable() {
    return !checkIfLocalStorageThrows() || localStorage.length > 0;
}

// Config the localStorage backend, using options set in the config.
function _initStorage$2(options) {
    var self = this;
    var dbInfo = {};
    if (options) {
        for (var i in options) {
            dbInfo[i] = options[i];
        }
    }

    dbInfo.keyPrefix = dbInfo.name + '/';

    if (dbInfo.storeName !== self._defaultConfig.storeName) {
        dbInfo.keyPrefix += dbInfo.storeName + '/';
    }

    if (!_isLocalStorageUsable()) {
        return Promise$1.reject();
    }

    self._dbInfo = dbInfo;
    dbInfo.serializer = localforageSerializer;

    return Promise$1.resolve();
}

// Remove all keys from the datastore, effectively destroying all data in
// the app's key/value store!
function clear$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var keyPrefix = self._dbInfo.keyPrefix;

        for (var i = localStorage.length - 1; i >= 0; i--) {
            var key = localStorage.key(i);

            if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Retrieve an item from the store. Unlike the original async_storage
// library in Gaia, we don't modify return values at all. If a key's value
// is `undefined`, we pass that value to the callback function.
function getItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result = localStorage.getItem(dbInfo.keyPrefix + key);

        // If a result was found, parse it from the serialized
        // string into a JS object. If result isn't truthy, the key
        // is likely undefined and we'll pass it straight to the
        // callback.
        if (result) {
            result = dbInfo.serializer.deserialize(result);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

// Iterate over all items in the store.
function iterate$2(iterator, callback) {
    var self = this;

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var keyPrefix = dbInfo.keyPrefix;
        var keyPrefixLength = keyPrefix.length;
        var length = localStorage.length;

        // We use a dedicated iterator instead of the `i` variable below
        // so other keys we fetch in localStorage aren't counted in
        // the `iterationNumber` argument passed to the `iterate()`
        // callback.
        //
        // See: github.com/mozilla/localForage/pull/435#discussion_r38061530
        var iterationNumber = 1;

        for (var i = 0; i < length; i++) {
            var key = localStorage.key(i);
            if (key.indexOf(keyPrefix) !== 0) {
                continue;
            }
            var value = localStorage.getItem(key);

            // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the
            // key is likely undefined and we'll pass it straight
            // to the iterator.
            if (value) {
                value = dbInfo.serializer.deserialize(value);
            }

            value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

            if (value !== void 0) {
                return value;
            }
        }
    });

    executeCallback(promise, callback);
    return promise;
}

// Same as localStorage's key() method, except takes a callback.
function key$2(n, callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var result;
        try {
            result = localStorage.key(n);
        } catch (error) {
            result = null;
        }

        // Remove the prefix from the key, if a key is found.
        if (result) {
            result = result.substring(dbInfo.keyPrefix.length);
        }

        return result;
    });

    executeCallback(promise, callback);
    return promise;
}

function keys$2(callback) {
    var self = this;
    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        var length = localStorage.length;
        var keys = [];

        for (var i = 0; i < length; i++) {
            var itemKey = localStorage.key(i);
            if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
            }
        }

        return keys;
    });

    executeCallback(promise, callback);
    return promise;
}

// Supply the number of keys in the datastore to the callback function.
function length$2(callback) {
    var self = this;
    var promise = self.keys().then(function (keys) {
        return keys.length;
    });

    executeCallback(promise, callback);
    return promise;
}

// Remove an item from the store, nice and simple.
function removeItem$2(key, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        var dbInfo = self._dbInfo;
        localStorage.removeItem(dbInfo.keyPrefix + key);
    });

    executeCallback(promise, callback);
    return promise;
}

// Set a key's value and run an optional callback once the value is set.
// Unlike Gaia's implementation, the callback function is passed the value,
// in case you want to operate on that value only after you're sure it
// saved, or something like that.
function setItem$2(key, value, callback) {
    var self = this;

    key = normalizeKey(key);

    var promise = self.ready().then(function () {
        // Convert undefined values to null.
        // https://github.com/mozilla/localForage/pull/42
        if (value === undefined) {
            value = null;
        }

        // Save the original value to pass to the callback.
        var originalValue = value;

        return new Promise$1(function (resolve, reject) {
            var dbInfo = self._dbInfo;
            dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        localStorage.setItem(dbInfo.keyPrefix + key, value);
                        resolve(originalValue);
                    } catch (e) {
                        // localStorage capacity exceeded.
                        // TODO: Make this a specific error/event.
                        if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            reject(e);
                        }
                        reject(e);
                    }
                }
            });
        });
    });

    executeCallback(promise, callback);
    return promise;
}

var localStorageWrapper = {
    _driver: 'localStorageWrapper',
    _initStorage: _initStorage$2,
    _support: isLocalStorageValid(),
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2
};

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
};

// Drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var DefinedDrivers = {};

var DriverSupport = {};

var DefaultDrivers = {
    INDEXEDDB: asyncStorage,
    WEBSQL: webSQLStorage,
    LOCALSTORAGE: localStorageWrapper
};

var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];

var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'];

var DefaultConfig = {
    description: '',
    driver: DefaultDriverOrder.slice(),
    name: 'localforage',
    // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
    // we can use without a prompt.
    size: 4980736,
    storeName: 'keyvaluepairs',
    version: 1.0
};

function callWhenReady(localForageInstance, libraryMethod) {
    localForageInstance[libraryMethod] = function () {
        var _args = arguments;
        return localForageInstance.ready().then(function () {
            return localForageInstance[libraryMethod].apply(localForageInstance, _args);
        });
    };
}

function extend() {
    for (var i = 1; i < arguments.length; i++) {
        var arg = arguments[i];

        if (arg) {
            for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                    if (isArray(arg[_key])) {
                        arguments[0][_key] = arg[_key].slice();
                    } else {
                        arguments[0][_key] = arg[_key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        for (var driverTypeKey in DefaultDrivers) {
            if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                    // we don't need to wait for the promise,
                    // since the default drivers can be defined
                    // in a blocking manner
                    this.defineDriver(driver);
                }
            }
        }

        this._defaultConfig = extend({}, DefaultConfig);
        this._config = extend({}, this._defaultConfig, options);
        this._driverSet = null;
        this._initDriver = null;
        this._ready = false;
        this._dbInfo = null;

        this._wrapLibraryMethodsWithReady();
        this.setDriver(this._config.driver)["catch"](function () {});
    }

    // Set any config values for localForage; can be called anytime before
    // the first API call (e.g. `getItem`, `setItem`).
    // We loop through options so we don't overwrite existing config
    // values.


    LocalForage.prototype.config = function config(options) {
        // If the options argument is an object, we use it to set values.
        // Otherwise, we return either a specified config value or all
        // config values.
        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            // If localforage is ready and fully initialized, we can't set
            // any new configuration values. Instead, we return an error.
            if (this._ready) {
                return new Error('Can\'t call config() after localforage ' + 'has been used.');
            }

            for (var i in options) {
                if (i === 'storeName') {
                    options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                    return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
            }

            // after all config options are set and
            // the driver option is used, try setting it
            if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
            }

            return true;
        } else if (typeof options === 'string') {
            return this._config[options];
        } else {
            return this._config;
        }
    };

    // Used to define a custom driver, shared across all instances of
    // localForage.


    LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
        var promise = new Promise$1(function (resolve, reject) {
            try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver');

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0, len = driverMethods.length; i < len; i++) {
                    var customDriverMethod = driverMethods[i];
                    if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var setDriverSupport = function setDriverSupport(support) {
                    if (DefinedDrivers[driverName]) {
                        console.info('Redefining LocalForage driver: ' + driverName);
                    }
                    DefinedDrivers[driverName] = driverObject;
                    DriverSupport[driverName] = support;
                    // don't use a then, so that we can define
                    // drivers that have simple _support methods
                    // in a blocking manner
                    resolve();
                };

                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        driverObject._support().then(setDriverSupport, reject);
                    } else {
                        setDriverSupport(!!driverObject._support);
                    }
                } else {
                    setDriverSupport(true);
                }
            } catch (e) {
                reject(e);
            }
        });

        executeTwoCallbacks(promise, callback, errorCallback);
        return promise;
    };

    LocalForage.prototype.driver = function driver() {
        return this._driver || null;
    };

    LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
        var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));

        executeTwoCallbacks(getDriverPromise, callback, errorCallback);
        return getDriverPromise;
    };

    LocalForage.prototype.getSerializer = function getSerializer(callback) {
        var serializerPromise = Promise$1.resolve(localforageSerializer);
        executeTwoCallbacks(serializerPromise, callback);
        return serializerPromise;
    };

    LocalForage.prototype.ready = function ready(callback) {
        var self = this;

        var promise = self._driverSet.then(function () {
            if (self._ready === null) {
                self._ready = self._initDriver();
            }

            return self._ready;
        });

        executeTwoCallbacks(promise, callback, callback);
        return promise;
    };

    LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
        var self = this;

        if (!isArray(drivers)) {
            drivers = [drivers];
        }

        var supportedDrivers = this._getSupportedDrivers(drivers);

        function setDriverToConfig() {
            self._config.driver = self.driver();
        }

        function extendSelfWithDriver(driver) {
            self._extend(driver);
            setDriverToConfig();

            self._ready = self._initStorage(self._config);
            return self._ready;
        }

        function initDriver(supportedDrivers) {
            return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                    while (currentDriverIndex < supportedDrivers.length) {
                        var driverName = supportedDrivers[currentDriverIndex];
                        currentDriverIndex++;

                        self._dbInfo = null;
                        self._ready = null;

                        return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                    }

                    setDriverToConfig();
                    var error = new Error('No available storage method found.');
                    self._driverSet = Promise$1.reject(error);
                    return self._driverSet;
                }

                return driverPromiseLoop();
            };
        }

        // There might be a driver initialization in progress
        // so wait for it to finish in order to avoid a possible
        // race condition to set _dbInfo
        var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
            return Promise$1.resolve();
        }) : Promise$1.resolve();

        this._driverSet = oldDriverSetDone.then(function () {
            var driverName = supportedDrivers[0];
            self._dbInfo = null;
            self._ready = null;

            return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();
                self._wrapLibraryMethodsWithReady();
                self._initDriver = initDriver(supportedDrivers);
            });
        })["catch"](function () {
            setDriverToConfig();
            var error = new Error('No available storage method found.');
            self._driverSet = Promise$1.reject(error);
            return self._driverSet;
        });

        executeTwoCallbacks(this._driverSet, callback, errorCallback);
        return this._driverSet;
    };

    LocalForage.prototype.supports = function supports(driverName) {
        return !!DriverSupport[driverName];
    };

    LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
        extend(this, libraryMethodsAndProperties);
    };

    LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
        var supportedDrivers = [];
        for (var i = 0, len = drivers.length; i < len; i++) {
            var driverName = drivers[i];
            if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
            }
        }
        return supportedDrivers;
    };

    LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
        // Add a stub for each driver API method that delays the call to the
        // corresponding driver method until localForage is ready. These stubs
        // will be replaced by the driver methods as soon as the driver is
        // loaded, so there is no performance impact.
        for (var i = 0, len = LibraryMethods.length; i < len; i++) {
            callWhenReady(this, LibraryMethods[i]);
        }
    };

    LocalForage.prototype.createInstance = function createInstance(options) {
        return new LocalForage(options);
    };

    return LocalForage;
}();

// The actual localForage object that we expose as a module or via a
// global. It's extended by pulling in one of our other libraries.


var localforage_js = new LocalForage();

module.exports = localforage_js;

},{"3":3}]},{},[4])(4)
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "fieldset",
        [
          _c("legend", [_vm._v("Evaluation Date filter")]),
          _vm._v(" "),
          _c("start-end-date", {
            attrs: { "all-time": "" },
            model: {
              value: _vm.dates,
              callback: function($$v) {
                _vm.dates = $$v
              },
              expression: "dates"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "data-table",
        {
          attrs: {
            id: _vm.id,
            striped: _vm.striped,
            bordered: _vm.bordered,
            thead: _vm.thead,
            config: _vm.datedConfig,
            data: _vm.data,
            exportable: _vm.exportable,
            "export-filename": _vm.exportFilename
          }
        },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5eaa9cb0", esExports)
  }
}

/***/ }),

/***/ 24:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapAlert_vue__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a9bb17e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapAlert_vue__ = __webpack_require__(47);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6a9bb17e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapAlert_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6a9bb17e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapAlert_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/BootstrapAlert.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6a9bb17e", Component.options)
  } else {
    hotAPI.reload("data-v-6a9bb17e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 25:
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flatpickr__);


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var hooks = new Set(['onChange', 'onOpen', 'onClose', 'onMonthChange', 'onYearChange', 'onReady', 'onValueUpdate']);

var VueFlatpickr$1 = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('input', { attrs: { "type": "text", "placeholder": _vm.placeholder }, domProps: { "value": _vm.value } });
	}, staticRenderFns: [],
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		options: {
			type: Object,
			default: function _default() {
				return {};
			}
		},
		value: {
			type: String,
			default: ''
		}
	},
	data: function data() {
		return {
			fp: null
		};
	},


	computed: {
		hookedOptions: function hookedOptions() {
			return this.addHooks(this.options);
		}
	},

	watch: {
		value: function value(val) {
			this.fp.setDate(val);
		},
		hookedOptions: function hookedOptions(options, oldOptions) {
			for (var _ref in Object.entries(options)) {
				var _ref2 = _slicedToArray(_ref, 2);

				var key = _ref2[0];
				var val = _ref2[1];

				if (val !== oldOptions[key]) this.fp.set(key, val);
			}
		}
	},

	mounted: function mounted() {
		this.fp = new __WEBPACK_IMPORTED_MODULE_0_flatpickr___default.a(this.$el, this.hookedOptions);
		this.$emit('FlatpickrRef', this.fp);
	},
	destroyed: function destroyed() {
		this.fp.destroy();
		this.fp = null;
	},


	methods: {
		onInput: function onInput(e) {
			typeof e === 'string' ? this.$emit('input', e) : this.$emit('input', e.target.value);
		},
		addHooks: function addHooks(options) {
			var _this = this;

			options = Object.assign({}, options);

			if (!options.onChange) {
				options.onChange = [];
			} else if (!Array.isArray(options.onChange)) {
				options.onChange = [options.onChange];
			}

			options.onChange.push(function (selectedDates, dateStr) {
				_this.$emit('input', dateStr);
			});

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				var _loop = function _loop() {
					var hook = _step.value;

					var firer = function firer(selectedDates, dateStr, instance) {
						_this.$emit(stripOn(hook), [selectedDates, dateStr, instance]);
					};

					if (hook in options) {
						if (!Array.isArray(options[hook])) options[hook] = [options[hook]];

						options[hook].push(firer);
					} else {
						options[hook] = [firer];
					}
				};

				for (var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					_loop();
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return options;
		}
	}
};

function stripOn(hook) {
	return hook.charAt(2).toLowerCase() + hook.substring(3);
}

/* harmony default export */ __webpack_exports__["a"] = (VueFlatpickr$1);


/***/ }),

/***/ 29:
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isObject = __webpack_require__(25);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(41)))

/***/ }),

/***/ 32:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b72e1b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(677);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearEvaluationDataTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0b72e1b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearEvaluationDataTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/AcademicYearEvaluationDataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0b72e1b8", Component.options)
  } else {
    hotAPI.reload("data-v-0b72e1b8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(77),
    mapCacheDelete = __webpack_require__(84),
    mapCacheGet = __webpack_require__(86),
    mapCacheHas = __webpack_require__(87),
    mapCacheSet = __webpack_require__(88);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(89),
    arraySome = __webpack_require__(92),
    cacheHas = __webpack_require__(93);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(2),
    stubFalse = __webpack_require__(110);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(42)(module)))

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(112),
    baseUnary = __webpack_require__(113),
    nodeUtil = __webpack_require__(114);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),

/***/ 37:
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SelectTwo_vue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27cbde20_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SelectTwo_vue__ = __webpack_require__(125);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SelectTwo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_27cbde20_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SelectTwo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/SelectTwo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27cbde20", Component.options)
  } else {
    hotAPI.reload("data-v-27cbde20", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export quoteValue */
/* harmony export (immutable) */ __webpack_exports__["g"] = downloadCsv;
/* harmony export (immutable) */ __webpack_exports__["f"] = csvHeader;
/* unused harmony export getHeaderCellText */
/* harmony export (immutable) */ __webpack_exports__["d"] = createRadarScaleCallback;
/* harmony export (immutable) */ __webpack_exports__["e"] = createResponseLegend;
/* harmony export (immutable) */ __webpack_exports__["j"] = pdfmakeStyle;
/* harmony export (immutable) */ __webpack_exports__["l"] = tableHeader;
/* harmony export (immutable) */ __webpack_exports__["h"] = fullWidthTable;
/* harmony export (immutable) */ __webpack_exports__["c"] = borderedStripedTable;
/* harmony export (immutable) */ __webpack_exports__["i"] = getAverageLevel;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return sortFunctions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CUSTOM_OPTION_VALUES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DISREGARD_OPTION; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_downloadjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_js__ = __webpack_require__(1);




function quoteValue(value) {
	return '"' + value + '"';
}

function downloadCsv(csv, name, dates) {

	var filename = '' + name;
	if (dates) filename += ' - ' + dates.startDate.toString() + '-' + dates.endDate.toString();
	filename += '.csv';

	var file = csv.map(function (row) {
		return row.map(quoteValue).join(',');
	}).join("\n");

	__WEBPACK_IMPORTED_MODULE_0_downloadjs___default()(file, filename, 'text/csv');
}

function csvHeader(thead) {
	var header = [];
	header.fill([], thead.length);
	thead.map(function (row, rowIndex) {
		if (!header[rowIndex]) header[rowIndex] = [];

		row.map(function (cell, cellIndex) {
			while (header[rowIndex][cellIndex]) {
				cellIndex++;
			}if (cell.rowspan && typeof cell.rowspan === 'number') {
				for (var i = 0; i < cell.rowspan; i++) {
					if (!header[rowIndex + i]) header[rowIndex + i] = [];

					header[rowIndex + i][cellIndex] = getHeaderCellText(cell);
					if (cell.colspan && typeof cell.colspan === 'number') {
						for (var j = 0; j < cell.colspan; j++) {
							header[rowIndex][cellIndex + j] = getHeaderCellText(cell);
						}
					}
				}
			} else if (cell.colspan && typeof cell.colspan === 'number') {
				for (var _j = 0; _j < cell.colspan; _j++) {
					header[rowIndex][cellIndex + _j] = getHeaderCellText(cell);
				}
			} else {
				header[rowIndex][cellIndex] = getHeaderCellText(cell);
			}
		});
	});

	return header;
}

function getHeaderCellText(cell) {
	if (cell.text && (typeof cell.text === 'string' || typeof cell.text === 'number')) return '' + cell.text;else if (typeof cell === 'string' || typeof cell === 'number') return '' + cell;

	return '';
}

function createRadarScaleCallback(valueMap) {
	return function (value) {
		return valueMap.get(value) || '';
	};
}

function createResponseLegend(valueMap) {
	var labels = [];
	var values = [];

	var keys = Array.from(valueMap.keys()).sort(__WEBPACK_IMPORTED_MODULE_1__utils_js__["E" /* sortNumbers */]);

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var key = _step.value;

			var label = valueMap.get(key);
			if (label) {
				labels.push(label);
				values.push(key.toString());
			}
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	return {
		table: {
			headerRows: 1,
			body: [labels.map(tableHeader), values]
		}
	};
}

function pdfmakeStyle(style) {
	return function (text) {
		return {
			text: text,
			style: style
		};
	};
}

function tableHeader(text) {
	return pdfmakeStyle('tableHeader')(text);
}

function fullWidthTable(table) {
	table.widths = Array(table.body[0].length).fill('*');
	return table;
}

function borderedStripedTable(element) {
	element.layout = {
		hLineWidth: function hLineWidth(i, node) {
			return i === node.table.headerRows ? 2 : 1;
		},
		vLineWidth: function vLineWidth() {
			return 1;
		},
		hLineColor: function hLineColor() {
			return '#555';
		},
		vLineColor: function vLineColor() {
			return '#555';
		},
		fillColor: function fillColor(i, node) {
			return i >= node.table.headerRows && i % 2 === 1 ? '#f3f3f3' : '#fff';
		}
	};

	return element;
}

function getAverageLevel(average) {
	var level = Math.floor(average) / 2;
	return level >= 1 ? 'Level ' + level : 'Not Level 1';
}

var sortFunctions = new Map([['training_level', function (a, b) {
	var sortOrder = ['intern', 'ca-1', 'ca-2', 'ca-3', 'fellow'];

	var aLevel = a.training_level.toLowerCase();
	var bLevel = b.training_level.toLowerCase();

	return sortOrder.indexOf(aLevel) - sortOrder.indexOf(bLevel);
}]]);

var CUSTOM_OPTION_VALUES = new Map([['faculty', {
	'strongly-disagree': 1,
	'disagree': 2,
	'undecided': 3,
	'agree': 4,
	'strongly-agree': 5,

	'yes': 1,
	'no': 0,

	'unacceptable': 1,
	'needs-improvement': 2,
	'meets-expectations': 3,
	'exceeds-expectations': 4,
	'outstanding': 5
}]]);

var DISREGARD_OPTION = new Map([['faculty', {
	'n-a': true
}]]);

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(71),
    getValue = __webpack_require__(76);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__ = __webpack_require__(5);


/* harmony default export */ __webpack_exports__["a"] = ({
	data: function data() {
		return {
			alerts: []
		};
	},


	components: {
		AlertList: __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(24);
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		value: {
			type: Array,
			required: true
		}
	},
	methods: {
		removeAlert: function removeAlert(index) {
			var alerts = this.value.slice();
			alerts.splice(index, 1);
			this.$emit('input', alerts);
		}
	},
	components: {
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 45:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		type: {
			type: String,
			default: 'error',
			validator: function validator(type) {
				return ['info', 'success', 'warning', 'error', 'danger'].includes(type);
			}
		},
		text: {
			type: String,
			required: false
		},
		html: {
			type: String,
			required: false
		},
		dismissable: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		alertTypeClass: function alertTypeClass() {
			if (this.type === 'error') return 'alert-danger';

			return 'alert-' + this.type;
		}
	}
});

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "alert", class: _vm.alertTypeClass },
    [
      _vm.dismissable
        ? _c(
            "button",
            {
              staticClass: "close",
              attrs: { type: "button", "aria-label": "Close" },
              on: {
                click: function($event) {
                  _vm.$emit("close")
                }
              }
            },
            [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
          )
        : _vm._e(),
      _vm._v("\n\t" + _vm._s(_vm.text) + "\n\t"),
      _vm.html
        ? _c("div", { domProps: { innerHTML: _vm._s(_vm.html) } })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6a9bb17e", esExports)
  }
}

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    _vm._l(_vm.value, function(alert, index) {
      return _c(
        "bootstrap-alert",
        _vm._b(
          {
            key: index,
            attrs: { dismissable: "" },
            on: {
              close: function($event) {
                _vm.removeAlert(index)
              }
            }
          },
          "bootstrap-alert",
          alert,
          false
        )
      )
    })
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c0296f4c", esExports)
  }
}

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_DataTable_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_15321984_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_DataTable_vue__ = __webpack_require__(139);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(137)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-15321984"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_DataTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_15321984_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_DataTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/DataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-15321984", Component.options)
  } else {
    hotAPI.reload("data-v-15321984", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AlertList_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c0296f4c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AlertList_vue__ = __webpack_require__(48);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AlertList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c0296f4c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AlertList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/AlertList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c0296f4c", Component.options)
  } else {
    hotAPI.reload("data-v-c0296f4c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.download = factory();
  }
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else{//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));


/***/ }),

/***/ 54:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		unpressedClass: {
			type: String,
			required: false
		},
		pressedClass: {
			type: String,
			required: false
		},
		timeout: {
			type: Number,
			required: false,
			default: 3000
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			pressed: false
		};
	},


	computed: {
		currentClass: function currentClass() {
			return this.pressedClass && this.pressed ? this.pressedClass : this.unpressedClass;
		}
	},

	methods: {
		handleClick: function handleClick(event) {
			var _this = this;

			if (this.pressed) {
				this.$emit('click', event);
				this.pressed = false;
				if (this.pressedTimeout) clearTimeout(this.pressedTimeout);
			} else {
				this.pressed = true;
				this.pressedTimeout = setTimeout(function () {
					_this.pressed = false;
				}, this.timeout);
			}
		}
	}
});

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      class: _vm.currentClass,
      attrs: { type: "button", disabled: _vm.disabled },
      on: { click: _vm.handleClick }
    },
    [
      _vm.pressed
        ? _vm._t("pressed", [
            _c("span", { staticClass: "glyphicon glyphicon-warning-sign" }),
            _vm._v("\n\t\tClick again to confirm\n\t")
          ])
        : _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-26ab7592", esExports)
  }
}

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEqual__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEqual___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash_isEqual__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		options: {
			type: Array,
			required: false
		},
		name: {
			type: String,
			required: false
		},
		id: {
			type: String,
			required: false
		},
		required: {
			type: Boolean,
			required: false
		},
		value: {
			required: true
		},
		multiple: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: 'Please select'
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		stringOptions: function stringOptions() {
			if (!this.options) return [];

			var options = this.options.slice();
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var option = _step.value;

					if (option.id) option.id = option.id.toString();
					if (option.children) {
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = option.children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var child = _step2.value;

								if (child.id) child.id = child.id.toString();
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return options;
		},
		stringValue: function stringValue() {
			if (!this.value && this.value !== 0) return '';

			if (Array.isArray(this.value)) {
				return this.value.slice().map(function (value) {
					return value.toString();
				});
			} else {
				return this.value.toString();
			}
		}
	},
	mounted: function mounted() {
		var _this = this;

		$(this.$el).on('change', function () {
			var val = $(_this.$el).val();
			if (!__WEBPACK_IMPORTED_MODULE_0_lodash_isEqual___default()(val, _this.stringValue)) _this.$emit('input', val);
		});

		$(this.$el).val(this.stringValue).select2({
			placeholder: this.placeholder,
			tags: this.multiple,
			createTag: function createTag() {
				return undefined;
			}
		});
	},
	updated: function updated() {
		$(this.$el).val(this.stringValue).select2({
			placeholder: this.placeholder,
			tags: this.multiple,
			createTag: function createTag() {
				return undefined;
			}
		}).trigger('change');
	},

	watch: {
		multiple: function multiple(_multiple) {
			if (this.value) {
				if (_multiple && !Array.isArray(this.value)) this.$emit('input', [this.value]);else if (!_multiple && Array.isArray(this.value)) this.$emit('input', this.value[0]);
			}
		},
		stringValue: function stringValue(_stringValue) {
			$(this.$el).val(_stringValue).trigger('change.select2');
		}
	},
	beforeDestroyed: function beforeDestroyed() {
		$(this.$el).off().select2('destroy');
	}
});

/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(58);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(59),
    isObjectLike = __webpack_require__(10);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(60),
    equalArrays = __webpack_require__(34),
    equalByTag = __webpack_require__(94),
    equalObjects = __webpack_require__(98),
    getTag = __webpack_require__(120),
    isArray = __webpack_require__(20),
    isBuffer = __webpack_require__(35),
    isTypedArray = __webpack_require__(36);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(11),
    stackClear = __webpack_require__(66),
    stackDelete = __webpack_require__(67),
    stackGet = __webpack_require__(68),
    stackHas = __webpack_require__(69),
    stackSet = __webpack_require__(70);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),

/***/ 61:
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(11);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),

/***/ 665:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_js__ = __webpack_require__(666);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminDashboard", function() { return __WEBPACK_IMPORTED_MODULE_0__admin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resident_js__ = __webpack_require__(671);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createResidentDashboard", function() { return __WEBPACK_IMPORTED_MODULE_1__resident_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__faculty_js__ = __webpack_require__(672);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_2__faculty_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__staff_js__ = __webpack_require__(673);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStaffDashboard", function() { return __WEBPACK_IMPORTED_MODULE_3__staff_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_js__ = __webpack_require__(674);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAPPDashboard", function() { return __WEBPACK_IMPORTED_MODULE_4__app_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__faculty_admin_js__ = __webpack_require__(675);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_5__faculty_admin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__faculty_anonymous_js__ = __webpack_require__(678);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAnonymousFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_6__faculty_anonymous_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__faculty_faculty_js__ = __webpack_require__(679);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFacultyFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_7__faculty_faculty_js__["a"]; });









/***/ }),

/***/ 666:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_Dashboard_FlaggedEvaluationControls_vue__ = __webpack_require__(667);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_user_utils_js__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_utils_js__ = __webpack_require__(1);












function createAdminDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			},
			flaggedActions: {
				type: Object,
				required: true
			},
			watchedForms: {
				type: Array,
				required: false
			}
		},
		propsData: propsData,

		data: function data() {
			return {
				flaggedEvals: null
			};
		},
		mounted: function mounted() {
			var _this = this;

			var flaggedEvalsBody = {
				with: {
					evaluation: true,
					'evaluation.evaluator': true,
					'evaluation.subject': true
				}
			};

			fetch('/flagged_evaluations?' + $.param(flaggedEvalsBody), {
				method: 'GET',
				headers: Object(__WEBPACK_IMPORTED_MODULE_7__modules_utils_js__["o" /* getFetchHeaders */])(),
				credentials: 'same-origin'
			}).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response.type);
			}).then(function (flaggedEvals) {
				_this.flaggedEvals = flaggedEvals;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<b>Error</b>: Problem fetching flagged evaluations'
				});
			});
		},


		computed: {
			defaultUserEvaluationRange: function defaultUserEvaluationRange() {
				return Object(__WEBPACK_IMPORTED_MODULE_6__modules_user_utils_js__["c" /* getUserSetting */])(this.user, 'defaultEvaluationRange');
			},
			flaggedEvalsThead: function flaggedEvalsThead() {
				return [['#', 'Evaluator', 'Subject', 'Requested Action', 'Reason', '']];
			},
			flaggedEvalsConfig: function flaggedEvalsConfig() {
				var _this2 = this;

				return {
					columns: [{ data: 'evaluation.url' }, { data: 'evaluation.evaluator.full_name' }, { data: 'evaluation.subject.full_name' }, { data: 'requested_action', render: function render(action) {
							return _this2.flaggedActions[action];
						} }, { data: 'reason' }, { data: null, orderable: false, searchable: false,
						createdCell: function createdCell(el, flaggedEval) {
							var adminComponent = _this2;
							new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
								el: el,
								render: function render(h) {
									return h(__WEBPACK_IMPORTED_MODULE_4__vue_components_Dashboard_FlaggedEvaluationControls_vue__["a" /* default */], {
										props: {
											flaggedEval: flaggedEval
										},
										on: {
											alert: function alert(_alert) {
												adminComponent.alerts.push(_alert);
											},
											remove: function remove() {
												adminComponent.flaggedEvals = adminComponent.flaggedEvals.filter(function (fe) {
													return Number(fe.id) !== Number(flaggedEval.id);
												});
											}
										}
									});
								}
							});
						}
					}],
					order: [[0, 'desc']]
				};
			},
			traineeEvalsThead: function traineeEvalsThead() {
				return [['#', 'Trainee', 'Faculty', 'Form', 'Evaluation date', 'Requested', 'Completed', 'Status']];
			},
			traineeEvalsConfig: function traineeEvalsConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								evaluator: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									type: ['resident', 'fellow'],
									evaluator_type: 'faculty'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					},
					deferRender: true
				};
			},
			watchedFormThead: function watchedFormThead() {
				return [['#', 'Subject', 'Evaluator', 'Evaluation date', 'Completed', 'Status', '']];
			},
			watchedFormConfigs: function watchedFormConfigs() {
				return this.watchedForms.map(function (watchedForm) {
					return {
						ajax: {
							url: '/evaluations',
							data: {
								with: {
									subject: true,
									evaluator: true
								},
								form_id: watchedForm.form_id,
								status: 'complete'
							},
							dataSrc: ''
						},
						columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, {
							data: null,
							render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
								return '';
							}
						}],
						order: [[0, 'desc']],
						createdRow: function createdRow(row) {
							$(row).addClass('view-evaluation');
						}
					};
				});
			},
			intern360Thead: function intern360Thead() {
				return [['#', 'Intern', 'Resident', 'Form', 'Evaluation date', 'Completed', 'Status', '']];
			},
			intern360Config: function intern360Config() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								evaluator: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'intern',
									evaluator_type: 'ca-1'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
							return ''; // FIXME
						}
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			selfEvalThead: function selfEvalThead() {
				return [['#', 'Evaluator', 'Form', 'Evaluation date', 'Completed', 'Status', '']];
			},
			selfEvalConfig: function selfEvalConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									evaluator_type: 'self'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'evaluator.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
							return ''; // FIXME
						}
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			staffEvalThead: function staffEvalThead() {
				return [['#', 'Resident/Fellow', 'Staff', 'Form', 'Evaluation Date', 'Created', 'Completed', 'Status']];
			},
			staffEvalConfig: function staffEvalConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								subject: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									evaluator_type: 'staff'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			appEvalThead: function appEvalThead() {
				return [['#', 'APP', 'Evaluator', 'Form', 'Evaluation date', 'Created', 'Completed', 'Status']];
			},
			appEvalConfig: function appEvalConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								subject: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'app'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			DataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue__["a" /* default */],
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 667:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FlaggedEvaluationControls_vue__ = __webpack_require__(669);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b703d21e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FlaggedEvaluationControls_vue__ = __webpack_require__(670);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(668)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b703d21e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FlaggedEvaluationControls_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b703d21e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FlaggedEvaluationControls_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Dashboard/FlaggedEvaluationControls.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b703d21e", Component.options)
  } else {
    hotAPI.reload("data-v-b703d21e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 668:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		flaggedEval: {
			type: Object,
			required: true
		}
	},

	computed: {
		cancellable: function cancellable() {
			return this.flaggedEval.requested_action === 'delete' && this.flaggedEval.evaluation.status === 'pending';
		}
	},

	methods: {
		cancelRequest: function cancelRequest() {
			var _this = this;

			if (!this.cancellable) return;

			fetch('/evaluations/' + this.flaggedEval.evaluation.id + '/cancel', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["g" /* fetchConfig */])(), {
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH'
				})
			})).then(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["x" /* okOrThrow */]).then(function () {
				_this.handleComplete();
			}).catch(function (err) {
				console.error(err);
				_this.$emit('alert', Object(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["z" /* simpleErrorAlert */])('There was a problem cancelling the evaluation request'));
			});
		},
		handleComplete: function handleComplete() {
			var _this2 = this;

			fetch('/flagged_evaluations/' + this.flaggedEval.id, Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["g" /* fetchConfig */])(), {
				method: 'POST', // DELETE
				body: JSON.stringify({
					_method: 'DELETE'
				})
			})).then(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["x" /* okOrThrow */]).then(function () {
				_this2.$emit('remove');
			}).catch(function (err) {
				console.error(err);
				_this2.$emit('alert', Object(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["z" /* simpleErrorAlert */])('There was a problem completing the flagged evaluation'));
			});
		}
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),

/***/ 670:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "td",
    [
      _vm.cancellable
        ? _c(
            "confirmation-button",
            {
              staticClass: "btn btn-xs btn-warning",
              on: { click: _vm.cancelRequest }
            },
            [
              _c("span", { staticClass: "glyphicon glyphicon-remove" }),
              _vm._v("\n\t\tCancel request\n\t")
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "confirmation-button",
        {
          staticClass: "btn btn-xs btn-primary",
          on: { click: _vm.handleComplete }
        },
        [
          _c("span", { staticClass: "glyphicon glyphicon-ok" }),
          _vm._v("\n\t\tComplete\n\t")
        ]
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b703d21e", esExports)
  }
}

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createResidentDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__ = __webpack_require__(168);









function createResidentDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,

		computed: {
			defaultUserEvaluationRange: function defaultUserEvaluationRange() {
				return Object(__WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__["c" /* getUserSetting */])(this.user, 'defaultEvaluationRange');
			},
			pendingSubjectThead: function pendingSubjectThead() {
				return [['#', 'Faculty', 'Form', 'Requested', '']];
			},
			pendingSubjectConfig: function pendingSubjectConfig() {
				var _this = this;

				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title']
							},
							subject_id: this.user.id,
							status: 'pending',
							visibility: 'visible'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
							if (evaluation.requested_by_id === _this.user.id) return '<button class="btn btn-danger btn-xs cancel-eval-button"\n\t\t\t\t\t\t\t\t\t\tdata-id="' + evaluation.id + '">\n\t\t\t\t\t\t\t\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t</button>';

							return '';
						} }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			pendingEvaluatorThead: function pendingEvaluatorThead() {
				return [['#', 'Subject', 'Form', 'Evaluation date', 'Requested', '']];
			},
			pendingEvaluatorConfig: function pendingEvaluatorConfig() {
				var _this2 = this;

				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							evaluator_id: this.user.id,
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
							if (evaluation.requested_by_id === _this2.user.id) return '<button class="btn btn-danger btn-xs cancel-eval-button"\n\t\t\t\t\t\t\t\t\t\tdata-id="' + evaluation.id + '">\n\t\t\t\t\t\t\t\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t</button>';

							return '';
						} }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeThead: function completeThead() {
				return [['#', 'Faculty', 'Form', 'Evaluation date', 'Requested', 'Completed']];
			},
			completeConfig: function completeConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title', 'evaluator_type']
							},
							whereHas: {
								form: {
									evaluator_type: 'faculty'
								}
							},
							subject_id: this.user.id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeIntern360EvaluatorThead: function completeIntern360EvaluatorThead() {
				return [['#', 'Intern', 'Form', 'Evaluation Date', 'Created', 'Completed']];
			},
			completeIntern360EvaluatorConfig: function completeIntern360EvaluatorConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title', 'type']
							},
							whereHas: {
								form: {
									type: 'intern'
								}
							},
							evaluator_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeIntern360SubjectThead: function completeIntern360SubjectThead() {
				return [['#', 'Resident', 'Form', 'Evaluation Date', 'Created', 'Completed']];
			},
			completeIntern360SubjectConfig: function completeIntern360SubjectConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title', 'type']
							},
							whereHas: {
								form: {
									type: 'intern'
								}
							},
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						} }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeStaffThead: function completeStaffThead() {
				return [['#', 'Staff', 'Form', 'Evaluation Date', 'Created', 'Completed']];
			},
			completeStaffConfig: function completeStaffConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title', 'evaluator_type']
							},
							whereHas: {
								form: {
									evaluator_type: 'staff'
								}
							},
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						} }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeSelfThead: function completeSelfThead() {
				return [['#', 'Form', 'Evaluation Date', 'Completed']];
			},
			completeSelfConfig: function completeSelfConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title', 'evaluator_type']
							},
							whereHas: {
								form: {
									evaluator_type: 'self'
								}
							},
							evaluator_id: this.user.id,
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		components: {
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__ = __webpack_require__(168);








function createFacultyDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			},
			mentees: {
				type: Array,
				required: false
			},
			watchedForms: {
				type: Array,
				required: false
			}
		},
		propsData: propsData,

		data: function data() {
			return {
				alerts: []
			};
		},


		computed: {
			defaultUserEvaluationRange: function defaultUserEvaluationRange() {
				return Object(__WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__["c" /* getUserSetting */])(this.user, 'defaultEvaluationRange');
			},
			pendingThead: function pendingThead() {
				return [['#', 'Resident/Fellow', 'Evaluation Form', 'Evaluation Date', 'Requested', '']];
			},
			pendingConfig: function pendingConfig() {
				var _this = this;

				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							evaluator_id: this.user.id,
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, orderable: false, searchable: false, render: function render(evaluation) {
							if (evaluation.requested_by_id === _this.user.id) return '<button class=\'btn btn-danger btn-xs cancel-eval-button\'\n\t\t\t\t\t\t\t\t\t\tdata-id=\'' + evaluation.id + '\'>\n\t\t\t\t\t\t\t\t\t<span class=\'glyphicon glyphicon-remove\'></span>\n\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t</button>';

							return '';
						} }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeThead: function completeThead() {
				return [['#', 'Resident/Fellow', 'Evaluation Form', 'Evaluation Date', 'Requested', 'Completed']];
			},
			completeConfig: function completeConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							evaluator_id: this.user.id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			menteeThead: function menteeThead() {
				return [['#', 'Evaluation Form', 'Evaluation Date', 'Requested', 'Completed']];
			},
			menteeConfigs: function menteeConfigs() {
				return this.mentees.map(function (mentee) {
					return {
						ajax: {
							url: '/evaluations',
							data: {
								with: {
									form: ['title']
								},
								subject_id: mentee.id,
								status: 'complete'
							},
							dataSrc: ''
						},
						columns: [{ data: 'url' }, { data: 'form.title' }, {
							data: null,
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
						order: [[0, 'desc']],
						createdRow: function createdRow(row) {
							$(row).addClass('view-evaluation');
						}
					};
				});
			},
			watchedFormThead: function watchedFormThead() {
				return [['#', 'Subject', 'Evaluator', 'Evaluation date', 'Completed', 'Status', '']];
			},
			watchedFormConfigs: function watchedFormConfigs() {
				return this.watchedForms.map(function (watchedForm) {
					return {
						ajax: {
							url: '/evaluations',
							data: {
								with: {
									subject: true,
									evaluator: true
								},
								form_id: watchedForm.form_id,
								status: 'complete'
							},
							dataSrc: ''
						},
						columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, {
							data: null,
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
								return '';
							}
						}],
						order: [[0, 'desc']],
						createdRow: function createdRow(row) {
							$(row).addClass('view-evaluation');
						}
					};
				});
			},
			allThead: function allThead() {
				return [['#', 'Resident', 'Evaluation Form', 'Evaluation Date', 'Requested', 'Completed']];
			},
			allConfig: function allConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'resident',
									evaluator_type: 'faculty'
								}
							},
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["q" /* renderSubjectCell */] }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 673:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStaffDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__ = __webpack_require__(168);








function createStaffDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			},
			mentees: {
				type: Array,
				required: false
			},
			watchedForms: {
				type: Array,
				required: false
			}
		},
		propsData: propsData,

		data: function data() {
			return {
				alerts: []
			};
		},


		computed: {
			defaultUserEvaluationRange: function defaultUserEvaluationRange() {
				return Object(__WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__["c" /* getUserSetting */])(this.user, 'defaultEvaluationRange');
			},
			pendingThead: function pendingThead() {
				return [['#', 'Resident', 'Form', 'Evaluation Date', 'Created']];
			},
			pendingConfig: function pendingConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title'],
								subject: ['full_name']
							},
							evaluator_id: this.user.id,
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			menteeThead: function menteeThead() {
				return [['#', 'Evaluator', 'Evaluation Form', 'Evaluation Date', 'Requested', 'Completed']];
			},
			menteeConfigs: function menteeConfigs() {
				return this.mentees.map(function (mentee) {
					return {
						ajax: {
							url: '/evaluations',
							data: {
								with: {
									evaluator: ['full_name'],
									form: ['title']
								},
								subject_id: mentee.id,
								status: 'complete'
							},
							dataSrc: ''
						},
						columns: [{ data: 'url' }, { data: 'evaluator.full_name', render: function render(name) {
								if (!name) return '<i>Anonymous</i>';
								return name;
							}
						}, { data: 'form.title' }, {
							data: null,
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
						order: [[0, 'desc']],
						createdRow: function createdRow(row) {
							$(row).addClass('view-evaluation');
						}
					};
				});
			},
			watchedFormThead: function watchedFormThead() {
				return [['#', 'Subject', 'Evaluator', 'Evaluation date', 'Completed', 'Status', '']];
			},
			watchedFormConfigs: function watchedFormConfigs() {
				return this.watchedForms.map(function (watchedForm) {
					return {
						ajax: {
							url: '/evaluations',
							data: {
								with: {
									subject: true,
									evaluator: true
								},
								form_id: watchedForm.form_id,
								status: 'complete'
							},
							dataSrc: ''
						},
						columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, {
							data: null,
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
								return '';
							}
						}],
						order: [[0, 'desc']],
						createdRow: function createdRow(row) {
							$(row).addClass('view-evaluation');
						}
					};
				});
			},
			completeThead: function completeThead() {
				return [['#', 'Resident', 'Form', 'Evaluation Date', 'Created', 'Completed']];
			},
			completeConfig: function completeConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title'],
								subject: ['full_name']
							},
							evaluator_id: this.user.id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 674:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAPPDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__ = __webpack_require__(168);









function createAPPDashboard(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,

		computed: {
			defaultUserEvaluationRange: function defaultUserEvaluationRange() {
				return Object(__WEBPACK_IMPORTED_MODULE_4__modules_user_utils_js__["c" /* getUserSetting */])(this.user, 'defaultEvaluationRange');
			},
			pendingSubjectThead: function pendingSubjectThead() {
				return [['#', 'Evaluator', 'Form', 'Requested', '']];
			},
			pendingSubjectConfig: function pendingSubjectConfig() {
				var _this = this;

				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title']
							},
							subject_id: this.user.id,
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
							if (evaluation.requested_by_id === _this.user.id) return '<button class="btn btn-danger btn-xs cancel-eval-button"\n\t\t\t\t\t\t\t\t\t\tdata-id="' + evaluation.id + '">\n\t\t\t\t\t\t\t\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t</button>';

							return '';
						} }]
				};
			},
			completeThead: function completeThead() {
				return [['#', 'Evaluator', 'Form', 'Evaluation date', 'Requested', 'Completed']];
			},
			completeConfig: function completeConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								evaluator: ['full_name'],
								form: ['title', 'evaluator_type']
							},
							whereHas: {
								form: {
									evaluator_type: 'faculty'
								}
							},
							subject_id: this.user.id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }]
				};
			}
		},

		components: {
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 675:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(28);







function createAdminFacultyDashboard(el) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		data: function data() {
			return {
				alerts: []
			};
		},


		computed: {
			facultyEvalsThead: function facultyEvalsThead() {
				return [['#', 'Faculty', 'Form', 'Evaluator', 'Evaluation Date', '']];
			},
			facultyEvalsConfig: function facultyEvalsConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								evaluator: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'faculty'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'form.title' }, { data: 'evaluator.full_name' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: null, render: function render() {
							return '';
						}
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 676:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataTable_vue__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue__["a" /* default */],
	props: {
		startDate: {
			type: String,
			default: '2015-07-01' // Year faculty evals released
		}
	},
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["academicYearForDate"])(new Date())
		};
	},


	components: {
		AcademicYearSelector: __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__["a" /* default */],
		DataTable: __WEBPACK_IMPORTED_MODULE_1__DataTable_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "form-group" }, [
          _c(
            "label",
            { staticClass: "containing-label" },
            [
              _vm._v("\n\t\t\t\tAcademic year\n\t\t\t\t"),
              _c("academic-year-selector", {
                attrs: { "min-date": _vm.startDate },
                model: {
                  value: _vm.dates,
                  callback: function($$v) {
                    _vm.dates = $$v
                  },
                  expression: "dates"
                }
              })
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "data-table",
        {
          attrs: {
            id: _vm.id,
            striped: _vm.striped,
            bordered: _vm.bordered,
            thead: _vm.thead,
            config: _vm.datedConfig,
            data: _vm.data,
            exportable: _vm.exportable,
            exportFilename: _vm.exportFilename
          }
        },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0b72e1b8", esExports)
  }
}

/***/ }),

/***/ 678:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAnonymousFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(28);







function createAnonymousFacultyDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {
				alerts: []
			};
		},

		propsData: propsData,

		computed: {
			anonymousFacultyEvalsThead: function anonymousFacultyEvalsThead() {
				return [['#', 'Faculty', 'Evaluation form', 'Academic year']];
			},
			anonymousFacultyEvalsConfig: function anonymousFacultyEvalsConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'faculty'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			anonymousFaculty360Thead: function anonymousFaculty360Thead() {
				return [['#', 'Faculty', 'Evaluation form', 'Academic year']];
			},
			anonymousFaculty360Config: function anonymousFaculty360Config() {
				return {
					ajax: {
						url: '/faculty360/evaluations',
						data: {
							with: {
								subject: ['full_name'],
								form: ['title']
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 679:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFacultyFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(28);







function createFacultyFacultyDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {
				alerts: []
			};
		},

		propsData: propsData,

		computed: {
			facultyEvalsThead: function facultyEvalsThead() {
				return [['#', 'Evaluation form', 'Academic year']];
			},
			facultyEvalsConfig: function facultyEvalsConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							with: {
								form: ['title']
							},
							whereHas: {
								form: {
									type: 'faculty'
								}
							},
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			faculty360Thead: function faculty360Thead() {
				return [['#', 'Evaluation form', 'Academic year']];
			},
			faculty360Config: function faculty360Config() {
				return {
					ajax: {
						url: '/faculty360/evaluations',
						data: {
							with: {
								form: ['title']
							},
							subject_id: this.user.id
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 68:
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),

/***/ 69:
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(11),
    Map = __webpack_require__(21),
    MapCache = __webpack_require__(33);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(30),
    isMasked = __webpack_require__(74),
    isObject = __webpack_require__(25),
    toSource = __webpack_require__(32);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(19);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ 73:
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(75);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ 76:
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(78),
    ListCache = __webpack_require__(11),
    Map = __webpack_require__(21);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(79),
    hashDelete = __webpack_require__(80),
    hashGet = __webpack_require__(81),
    hashHas = __webpack_require__(82),
    hashSet = __webpack_require__(83);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),

/***/ 80:
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),

/***/ 85:
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(33),
    setCacheAdd = __webpack_require__(90),
    setCacheHas = __webpack_require__(91);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(19),
    getRawTag = __webpack_require__(72),
    objectToString = __webpack_require__(73);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ 90:
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),

/***/ 91:
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),

/***/ 92:
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),

/***/ 93:
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(19),
    Uint8Array = __webpack_require__(95),
    eq = __webpack_require__(29),
    equalArrays = __webpack_require__(34),
    mapToArray = __webpack_require__(96),
    setToArray = __webpack_require__(97);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),

/***/ 96:
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),

/***/ 97:
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(99);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(100),
    getSymbols = __webpack_require__(102),
    keys = __webpack_require__(105);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ })

},[665]);
});
//# sourceMappingURL=vue-dashboard.js.map