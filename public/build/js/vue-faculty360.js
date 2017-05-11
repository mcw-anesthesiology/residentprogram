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
return webpackJsonp([4,11],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(23);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(55),
    getValue = __webpack_require__(68);

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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(110),
  /* template */
  __webpack_require__(115),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/AlertList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AlertList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ff56c56", Component.options)
  } else {
    hotAPI.reload("data-v-4ff56c56", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(16),
    getRawTag = __webpack_require__(65),
    objectToString = __webpack_require__(91);

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
/* 9 */
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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(78),
    listCacheDelete = __webpack_require__(79),
    listCacheGet = __webpack_require__(80),
    listCacheHas = __webpack_require__(81),
    listCacheSet = __webpack_require__(82);

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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(25);

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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(75);

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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 17 */
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
/* 18 */,
/* 19 */
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
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(83),
    mapCacheDelete = __webpack_require__(84),
    mapCacheGet = __webpack_require__(85),
    mapCacheHas = __webpack_require__(86),
    mapCacheSet = __webpack_require__(87);

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
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(43),
    arraySome = __webpack_require__(50),
    cacheHas = __webpack_require__(60);

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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)))

/***/ }),
/* 24 */
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
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(1),
    stubFalse = __webpack_require__(106);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)(module)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isObject = __webpack_require__(19);

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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(56),
    baseUnary = __webpack_require__(59),
    nodeUtil = __webpack_require__(90);

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
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(107),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/SelectTwo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SelectTwo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2434126b", Component.options)
  } else {
    hotAPI.reload("data-v-2434126b", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(117)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(111),
  /* template */
  __webpack_require__(116),
  /* scopeId */
  "data-v-8d03363a",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/BootstrapAlert.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BootstrapAlert.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d03363a", Component.options)
  } else {
    hotAPI.reload("data-v-8d03363a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 37 */,
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEqual__ = __webpack_require__(103);
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



/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(69),
    hashDelete = __webpack_require__(70),
    hashGet = __webpack_require__(71),
    hashHas = __webpack_require__(72),
    hashSet = __webpack_require__(73);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(21),
    setCacheAdd = __webpack_require__(93),
    setCacheHas = __webpack_require__(94);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(10),
    stackClear = __webpack_require__(96),
    stackDelete = __webpack_require__(97),
    stackGet = __webpack_require__(98),
    stackHas = __webpack_require__(99),
    stackSet = __webpack_require__(100);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(5),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 47 */
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
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(58),
    isArguments = __webpack_require__(101),
    isArray = __webpack_require__(17),
    isBuffer = __webpack_require__(26),
    isIndex = __webpack_require__(74),
    isTypedArray = __webpack_require__(29);

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
/* 49 */
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
/* 50 */
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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(49),
    isArray = __webpack_require__(17);

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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isObjectLike = __webpack_require__(9);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(54),
    isObjectLike = __webpack_require__(9);

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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(44),
    equalArrays = __webpack_require__(22),
    equalByTag = __webpack_require__(62),
    equalObjects = __webpack_require__(63),
    getTag = __webpack_require__(67),
    isArray = __webpack_require__(17),
    isBuffer = __webpack_require__(26),
    isTypedArray = __webpack_require__(29);

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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(27),
    isMasked = __webpack_require__(76),
    isObject = __webpack_require__(19),
    toSource = __webpack_require__(24);

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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(8),
    isLength = __webpack_require__(28),
    isObjectLike = __webpack_require__(9);

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
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(77),
    nativeKeys = __webpack_require__(89);

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
/* 58 */
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
/* 59 */
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
/* 60 */
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(16),
    Uint8Array = __webpack_require__(45),
    eq = __webpack_require__(25),
    equalArrays = __webpack_require__(22),
    mapToArray = __webpack_require__(88),
    setToArray = __webpack_require__(95);

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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(64);

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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(51),
    getSymbols = __webpack_require__(66),
    keys = __webpack_require__(104);

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


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(16);

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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(47),
    stubArray = __webpack_require__(105);

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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(39),
    Map = __webpack_require__(15),
    Promise = __webpack_require__(41),
    Set = __webpack_require__(42),
    WeakMap = __webpack_require__(46),
    baseGetTag = __webpack_require__(8),
    toSource = __webpack_require__(24);

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
/* 68 */
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
/* 69 */
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
/* 70 */
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
/* 71 */
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
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */
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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(61);

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
/* 77 */
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
/* 78 */
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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(11);

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(40),
    ListCache = __webpack_require__(10),
    Map = __webpack_require__(15);

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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

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
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(12);

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
/* 88 */
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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(92);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(23);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(31)(module)))

/***/ }),
/* 91 */
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
/* 92 */
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
/* 93 */
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
/* 94 */
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
/* 95 */
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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(10);

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
/* 97 */
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
/* 98 */
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
/* 99 */
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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(10),
    Map = __webpack_require__(15),
    MapCache = __webpack_require__(21);

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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(52),
    isObjectLike = __webpack_require__(9);

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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(27),
    isLength = __webpack_require__(28);

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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(53);

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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(48),
    baseKeys = __webpack_require__(57),
    isArrayLike = __webpack_require__(102);

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
/* 105 */
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
/* 106 */
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
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    attrs: {
      "name": _vm.name,
      "id": _vm.id,
      "required": _vm.required,
      "multiple": _vm.multiple
    }
  }, [_vm._t("default"), _vm._v(" "), _vm._l((_vm.stringOptions), function(option) {
    return [(option.children && option.children.length > 0) ? _c('optgroup', {
      attrs: {
        "label": option.text
      }
    }, _vm._l((option.children), function(child) {
      return _c('option', {
        domProps: {
          "value": child.id
        }
      }, [_vm._v("\n\t\t\t\t" + _vm._s(child.text) + "\n\t\t\t")])
    })) : (option.id) ? _c('option', {
      domProps: {
        "value": option.id
      }
    }, [_vm._v("\n\t\t\t" + _vm._s(option.text) + "\n\t\t")]) : _vm._e()]
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2434126b", module.exports)
  }
}

/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var TAGS = {
	'' : ['<em>','</em>'],
	_ : ['<strong>','</strong>'],
	'\n' : ['<br />'],
	' ' : ['<br />'],
	'-': ['<hr />']
};

/** Outdent a string based on the first indented line's leading whitespace
 *	@private
 */
function outdent(str) {
	return str.replace(RegExp('^'+(str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

/** Encode special attribute characters to HTML entities in a String.
 *	@private
 */
function encodeAttr(str) {
	return (str+'').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Parse Markdown into an HTML String. */
function parse(md) {
	var tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm,
		context = [],
		out = '',
		last = 0,
		links = {},
		chunk, prev, token, inner, t;

	function tag(token) {
		var desc = TAGS[token.replace(/\*/g,'_')[1] || ''],
			end = context[context.length-1]==token;
		if (!desc) { return token; }
		if (!desc[1]) { return desc[0]; }
		context[end?'pop':'push'](token);
		return desc[end|0];
	}

	function flush() {
		var str = '';
		while (context.length) { str += tag(context[context.length-1]); }
		return str;
	}

	md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, function (s, name, url) {
		links[name.toLowerCase()] = url;
		return '';
	}).replace(/^\n+|\n+$/g, '');

	while ( (token=tokenizer.exec(md)) ) {
		prev = md.substring(last, token.index);
		last = tokenizer.lastIndex;
		chunk = token[0];
		if (prev.match(/[^\\](\\\\)*\\$/)) {
			// escaped
		}
		// Code/Indent blocks:
		else if (token[3] || token[4]) {
			chunk = '<pre class="code '+(token[4]?'poetry':token[2].toLowerCase())+'">'+outdent(encodeAttr(token[3] || token[4]).replace(/^\n+|\n+$/g, ''))+'</pre>';
		}
		// > Quotes, -* lists:
		else if (token[6]) {
			t = token[6];
			if (t.match(/\./)) {
				token[5] = token[5].replace(/^\d+/gm, '');
			}
			inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')));
			if (t==='>') { t = 'blockquote'; }
			else {
				t = t.match(/\./) ? 'ol' : 'ul';
				inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
			}
			chunk = '<'+t+'>' + inner + '</'+t+'>';
		}
		// Images:
		else if (token[8]) {
			chunk = "<img src=\"" + (encodeAttr(token[8])) + "\" alt=\"" + (encodeAttr(token[7])) + "\">";
		}
		// Links:
		else if (token[10]) {
			out = out.replace('<a>', ("<a href=\"" + (encodeAttr(token[11] || links[prev.toLowerCase()])) + "\">"));
			chunk = flush() + '</a>';
		}
		else if (token[9]) {
			chunk = '<a>';
		}
		// Headings:
		else if (token[12] || token[14]) {
			t = 'h' + (token[14] ? token[14].length : (token[13][0]==='='?1:2));
			chunk = '<'+t+'>' + parse(token[12] || token[15]) + '</'+t+'>';
		}
		// `code`:
		else if (token[16]) {
			chunk = '<code>'+encodeAttr(token[16])+'</code>';
		}
		// Inline formatting: *em*, **strong** & friends
		else if (token[17] || token[1]) {
			chunk = tag(token[17] || '--');
		}
		out += prev;
		out += chunk;
	}

	return (out + md.substring(last) + flush()).trim();
}

/* harmony default export */ __webpack_exports__["a"] = parse;
//# sourceMappingURL=snarkdown.es.js.map


/***/ }),
/* 109 */,
/* 110 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__);
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
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
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue___default.a
	}
};

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\n.alert[data-v-8d03363a] {\n\tpage-break-inside: avoid;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/BootstrapAlert.vue?6c1ead4e"],"names":[],"mappings":";AAqDA;CACA,yBAAA;CACA","file":"BootstrapAlert.vue","sourcesContent":["<template>\n\t<div class=\"alert\" :class=\"alertTypeClass\">\n\t\t<button v-if=\"dismissable\" type=\"button\" class=\"close\" aria-label=\"Close\"\n\t\t\t\t@click=\"$emit('close')\">\n\t\t\t<span aria-hidden=\"true\">&times;</span>\n\t\t</button>\n\t\t{{ text }}\n\t\t<div v-if=\"html\" v-html=\"html\"></div>\n\t\t<slot></slot>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tprops: {\n\t\ttype: {\n\t\t\ttype: String,\n\t\t\tdefault: 'error',\n\t\t\tvalidator(type){\n\t\t\t\treturn [\n\t\t\t\t\t'info',\n\t\t\t\t\t'success',\n\t\t\t\t\t'warning',\n\t\t\t\t\t'error',\n\t\t\t\t\t'danger'\n\t\t\t\t].includes(type);\n\t\t\t}\n\t\t},\n\t\ttext: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\thtml: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\tdismissable: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\tcomputed: {\n\t\talertTypeClass(){\n\t\t\tif(this.type === 'error')\n\t\t\t\treturn 'alert-danger';\n\t\t\t\n\t\t\treturn `alert-${this.type}`;\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.alert {\n\t\tpage-break-inside: avoid;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 113 */,
/* 114 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(162)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(139),
  /* template */
  __webpack_require__(154),
  /* scopeId */
  "data-v-38459c74",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ShowHideButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShowHideButton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38459c74", Component.options)
  } else {
    hotAPI.reload("data-v-38459c74", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', _vm._l((_vm.value), function(alert, index) {
    return _c('bootstrap-alert', _vm._b({
      attrs: {
        "dismissable": true
      },
      on: {
        "close": function($event) {
          _vm.removeAlert(index)
        }
      }
    }, 'bootstrap-alert', alert))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4ff56c56", module.exports)
  }
}

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert",
    class: _vm.alertTypeClass
  }, [(_vm.dismissable) ? _c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "aria-label": "Close"
    },
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_c('span', {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])]) : _vm._e(), _vm._v("\n\t" + _vm._s(_vm.text) + "\n\t"), (_vm.html) ? _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.html)
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8d03363a", module.exports)
  }
}

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(112);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("32a3a524", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8d03363a&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BootstrapAlert.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-8d03363a&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./BootstrapAlert.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(161)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(133),
  /* template */
  __webpack_require__(153),
  /* scopeId */
  "data-v-2c14a78c",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilder.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c14a78c", Component.options)
  } else {
    hotAPI.reload("data-v-2c14a78c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 132 */,
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ConfirmationButton_vue__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__ConfirmationButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__ = __webpack_require__(4);
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
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		oldFormContents: {
			type: Object,
			required: false
		},
		fixedFormType: {
			type: String,
			required: false
		},
		fixedPeriodType: {
			type: String,
			required: false
		},
		defaultFormType: {
			type: String,
			required: false
		},
		defaultPeriodType: {
			type: String,
			required: false
		},
		showMilestonesCompetencies: {
			type: Boolean,
			default: true
		}
	},
	data: function data() {
		return {
			title: '',
			formType: this.fixedFormType || this.defaultFormType || 'resident',
			periodType: this.fixedPeriodType || this.defaultPeriodType || 'month',
			nextQuestionIdNum: 1,
			groupedMilestones: [],
			competencies: [],
			items: [],
			customOptions: [],

			show: {
				customOptionsEditor: false
			},

			alerts: []
		};
	},
	mounted: function mounted() {
		var _this = this;

		if (this.showMilestonesCompetencies) {
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["d" /* fetchMilestoneGroups */])().then(function (milestoneGroups) {
				_this.groupedMilestones = milestoneGroups;
			}).catch(function (err) {
				console.error(err);
			});

			fetch('/competencies', { credentials: 'same-origin' }).then(function (response) {
				if (response.ok) return response.json();else {
					var err = new Error(response.statusText);
					err.response = response;
					throw err;
				}
			}).then(function (competencies) {
				_this.competencies = competencies;
			}).catch(function (err) {
				console.error(err);
			});
		}
	},


	computed: {
		customOptionsString: function customOptionsString() {
			try {
				return JSON.stringify(this.customOptions, null, 4);
			} catch (e) {
				console.error(e);
			}

			return 'ERROR DISPLAYING CUSTOM OPTIONS';
		}
	},

	methods: {
		addInstruction: function addInstruction() {
			this.items.push({
				type: 'instruction',
				text: ''
			});
		},
		addQuestion: function addQuestion() {
			this.items.push({
				type: 'question',
				text: '',
				questionIdNum: this.nextQuestionIdNum++,
				questionType: 'radio',
				milestones: null,
				competencies: null,
				options: [],
				required: false,
				weight: 100
			});
		},
		changeItem: function changeItem(index, item) {
			this.items.splice(index, 1, Object.assign({}, this.items[index], item));
		},
		moveItem: function moveItem(index, newIndex) {
			this.items.splice(newIndex, 0, this.items.splice(index, 1)[0]);
			this.adjustQuestionIdNums();
		},
		removeItem: function removeItem(index) {
			this.items.splice(index, 1);
			this.adjustQuestionIdNums();
		},
		adjustQuestionIdNums: function adjustQuestionIdNums() {
			var num = 1;
			this.items = this.items.map(function (item) {
				return item.type === 'question' ? Object.assign({}, item, { questionIdNum: num++ }) : Object.assign({}, item);
			});
			this.nextQuestionIdNum = num;
		},
		changeCustomOptions: function changeCustomOptions(event) {
			try {
				var customOptions = JSON.parse(event.target.value);
				if (Array.isArray(customOptions)) this.customOptions = customOptions;else throw new Error('Not an array');
			} catch (err) {
				console.error(err);
				this.alerts.push({
					type: 'error',
					text: 'Unable to set custom options'
				});
			}
		},
		submitForm: function submitForm() {
			if (this.isFormValid()) {
				this.$emit('submit', {
					title: this.title,
					formType: this.formType,
					evaluation_period_type: this.periodType,
					items: this.items.map(function (item) {
						if (item.type === 'question') item.questionId = 'q' + item.questionIdNum;

						return item;
					})
				});
			}
		},
		isFormValid: function isFormValid() {
			if (!this.title) {
				this.alerts.push({
					type: 'error',
					text: 'Please enter a title for the form'
				});
				return false;
			}

			if (!this.items || this.items.length < 1) {
				this.alerts.push({
					type: 'error',
					text: 'Please enter at least one question'
				});
				return false;
			}

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (item.type === 'question') {
						if (!item.text) {
							this.alerts.push({
								type: 'error',
								text: 'Please enter question text for question ' + item.questionIdNum
							});
							return false;
						}
						if (['radio', 'radiononnumeric', 'checkbox'].includes(item.questionType)) {
							if (!item.options || item.options.length < 1) {
								this.alerts.push({
									type: 'error',
									text: 'Please add at least one option for each multiple-choice question'
								});
								return false;
							}

							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = item.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var option = _step2.value;

									if (!('value' in option)) {
										this.alerts.push({
											type: 'error',
											text: 'An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question ' + item.questionIdNum
										});
										return false;
									}
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
					} else if (item.type === 'instruction') {
						if (!item.text) {
							this.alerts.push({
								type: 'error',
								text: 'Please complete or remove all empty instruction blocks'
							});
							return false;
						}
					} else {
						this.alerts.push({
							type: 'error',
							text: 'Unrecognized item type in form'
						});
						return false;
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

			return true;
		}
	},
	watch: {
		oldFormContents: function oldFormContents(formContents) {
			this.title = formContents.title;
			this.formType = formContents.formType;
			this.items = formContents.items.slice();
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var item = _step3.value;

					if (item.questionIdNum && item.questionIdNum >= this.nextQuestionIdNum) this.nextQuestionIdNum = item.questionIdNum + 1;
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		}
	},
	components: {
		FormBuilderInstruction: __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue___default.a,
		FormBuilderQuestion: __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue___default.a,
		AlertList: __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default.a,
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue___default.a,
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_4__ConfirmationButton_vue___default.a
	}
};

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: ['text'],
	data: function data() {
		return {};
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', event.target.value);
		}
	}
};

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: ['type', 'text', 'value', 'description', 'isWorkingOption'],
	computed: {
		displayType: function displayType() {
			if (this.type === 'checkbox') return 'checkbox';else return 'radio';
		}
	},
	data: function data() {
		return {
			isFocused: false
		};
	},

	methods: {
		handleInputFocus: function handleInputFocus(field) {
			this.isFocused = true;
			this.$emit('focus', field);
		},
		handleInputBlur: function handleInputBlur(field) {
			this.isFocused = false;
			this.$emit('blur', field);
		}
	}
};

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(4);
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
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		formType: {
			type: String,
			required: true
		},
		groupedMilestones: {
			type: Array,
			required: false
		},
		allCompetencies: {
			type: Array,
			required: false
		},
		questionIdNum: {
			type: Number,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		questionType: {
			type: String,
			required: true
		},
		milestones: {
			type: Array,
			required: false
		},
		competencies: {
			type: Array,
			required: false
		},
		options: {
			type: Array,
			required: false
		},
		required: {
			type: Boolean,
			default: false
		},
		customOptions: {
			type: Array,
			required: false
		},
		showMilestonesCompetencies: {
			type: Boolean,
			default: true
		}
	},
	data: function data() {
		return {
			workingOption: {
				text: '',
				value: '',
				description: ''
			},

			alerts: []
		};
	},

	computed: {
		questionId: function questionId() {
			return 'q' + this.questionIdNum;
		},
		shouldShowMilestonesAndCompetencies: function shouldShowMilestonesAndCompetencies() {
			return ['radio', 'number'].includes(this.questionType) && ['resident', 'self-resident', 'fellow', 'self-fellow'].includes(this.formType);
		},
		optionsWithWorking: function optionsWithWorking() {
			if (this.options) {
				var options = this.options.slice();
				options.push(this.workingOption);
				return options;
			}
		},
		workingOptionIndex: function workingOptionIndex() {
			if (this.options) return this.options.length;
		},
		competencyOptions: function competencyOptions() {
			return this.allCompetencies.map(function (competency) {
				return {
					id: competency.id,
					text: competency.title
				};
			}).sort(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["e" /* sortSelect2Objects */]);
		}
	},
	methods: {
		changeQuestionType: function changeQuestionType(event) {
			var questionType = event.target.value;
			var options = [];

			this.$emit('change', { questionType: questionType, options: options });
		},
		handleWorkingOptionInput: function handleWorkingOptionInput(index, option) {
			if (index === this.workingOptionIndex) this.workingOption = Object.assign({}, this.workingOption, option);
		},
		handleOptionChange: function handleOptionChange(index, option) {
			if (index === this.workingOptionIndex) {
				var options = this.options.slice();
				options.push(Object.assign({}, this.workingOption, option));
				this.workingOption = {
					text: '',
					value: '',
					description: ''
				};
				this.$emit('change', { options: options });
			} else {
				var _options = this.options.slice();
				_options[index] = Object.assign(_options[index], option);
				if (!_options[index].text && !_options[index].value && !_options[index].description) _options.splice(index, 1);

				this.$emit('change', { options: _options });
			}
		},
		setStandardOptions: function setStandardOptions() {
			var options = void 0;
			switch (this.formType) {
				case 'resident':
				case 'self-resident':
					options = __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__["b" /* STANDARD_OPTIONS */].RESIDENT.slice();
					break;
				case 'fellow':
				case 'self-fellow':
					options = __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__["b" /* STANDARD_OPTIONS */].FELLOW.slice();
					break;
				case 'faculty':
					if (this.questionType === 'radiononnumeric') options = __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__["b" /* STANDARD_OPTIONS */].FACULTY.slice();
					break;
			}

			if (!options) {
				this.alerts.push({
					type: 'error',
					text: 'No standard options found for form type and question type'
				});
				return;
			}

			this.$emit('change', { options: options });
		},
		setMilestoneOptions: function setMilestoneOptions() {
			var _this = this;

			if (this.milestones.length !== 1) {
				this.alerts.push({
					type: 'error',
					text: 'You can only use milestone options with a single selected milestone'
				});
				return;
			}
			fetch('/milestones/' + this.milestones[0], { credentials: 'same-origin' }).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response);
			}).then(function (milestone) {
				if (!milestone || !milestone.levels || milestone.levels.length < 1) {
					_this.alerts.push({
						type: 'error',
						text: 'No milestone levels found'
					});
					return;
				}
				var options = [{
					value: 0,
					text: 'Not yet ' + milestone.levels[0].name
				}];
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = milestone.levels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var level = _step.value;

						var value = 2 * parseInt(level.level_number, 10);
						options.push({ value: value - 1, text: '', description: '' });
						options.push({ value: value, text: level.name, description: level.description });
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

				_this.$emit('change', { options: options });
			}).catch(function (err) {
				console.error(err);
			});
		},
		setCustomOptions: function setCustomOptions() {
			if (this.customOptions.length < 1) {
				this.alerts.push({
					type: 'error',
					text: 'No custom options set'
				});
				return;
			}

			this.$emit('change', { options: this.customOptions.slice() });
		}
	},
	components: {
		FormBuilderOption: __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue___default.a,
		SelectTwo: __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue___default.a,
		AlertList: __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default.a
	}
};

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormReaderQuestionOption_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormReaderQuestionOption_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__FormReaderQuestionOption_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(4);
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








/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		questionId: {
			type: String,
			required: true
		},
		type: {
			type: String,
			required: true,
			validate: function validate(type) {
				return type === 'question';
			}
		},
		questionType: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		required: {
			type: Boolean,
			default: false
		},
		weight: {
			type: Number,
			default: 100
		},
		options: {
			type: Array,
			required: false
		},
		value: {
			type: [String, Number],
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			showDescriptions: false
		};
	},

	computed: {
		hasResponse: function hasResponse() {
			return this.isOptionQuestion ? this.options.some(function (option) {
				return option.checked;
			}) : this.value;
		},
		hasDescriptions: function hasDescriptions() {
			if (!this.options) return false;

			return this.options.some(function (option) {
				return option.description;
			});
		},
		resettable: function resettable() {
			return this.isOptionQuestion && !this.required;
		},
		showFooter: function showFooter() {
			return this.hasDescriptions || this.resettable;
		},
		isOptionQuestion: function isOptionQuestion() {
			return ['radio', 'radiononnumeric', 'checkbox'].includes(this.questionType);
		},
		renderedText: function renderedText() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_snarkdown__["a" /* default */])(this.text.replace('{{', '`{{').replace('}}', '}}`'));
		}
	},

	methods: {
		ucfirst: __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["a" /* ucfirst */],
		resetOptions: function resetOptions() {
			var options = this.options.map(function (option) {
				return Object.assign({}, option, { checked: false });
			});
			this.$emit('input', { options: options });
		},
		handleOptionInput: function handleOptionInput(index, option) {
			if (this.readonly) return;

			var options = ['radiononnumeric', 'radio'].includes(this.questionType) && option.checked ? this.options.map(function (option) {
				return Object.assign({}, option, { checked: false });
			}) : this.options.slice();
			options.splice(index, 1, Object.assign({}, options[index], option));
			this.$emit('input', { options: options });
		},
		handleInput: function handleInput(event) {
			if (this.readonly) return;

			this.$emit('input', { value: event.target.value });
		}
	},

	components: {
		FormReaderQuestionOption: __WEBPACK_IMPORTED_MODULE_1__FormReaderQuestionOption_vue___default.a,
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue___default.a
	}
};

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown__ = __webpack_require__(108);
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



/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		value: {
			type: [String, Number],
			required: true
		},
		text: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		},

		questionType: {
			type: String,
			required: true
		},
		questionId: {
			type: String,
			required: true
		},
		checked: {
			type: Boolean,
			default: false
		},

		required: {
			type: Boolean,
			default: false
		},

		showDescription: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		snarkdown: __WEBPACK_IMPORTED_MODULE_0_snarkdown__["a" /* default */],
		handleInput: function handleInput(event) {
			this.$emit('input', { checked: event.target.checked });
		}
	}
};

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		value: {
			type: Boolean,
			required: true
		},
		text: {
			type: String,
			required: false
		}
	}
};

/***/ }),
/* 140 */,
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\n.form-item[data-v-2c14a78c] {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: center;\n\talign-items: center;\n}\n.form-item .form-block[data-v-2c14a78c] {\n\tflex-grow: 1;\n}\n.custom-options-editor[data-v-2c14a78c] {\n\tdisplay: block;\n\tmargin: 1em auto;\n\tfont-family: monospace;\n\twhite-space: pre;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilder.vue?dcc384a0"],"names":[],"mappings":";AAwWA;CACA,cAAA;CACA,oBAAA;CACA,wBAAA;CACA,oBAAA;CACA;AAEA;CACA,aAAA;CACA;AAEA;CACA,eAAA;CACA,iBAAA;CACA,uBAAA;CACA,iBAAA;CACA","file":"FormBuilder.vue","sourcesContent":["<template>\n\t<div class=\"form-header\">\n\t\t<div class=\"container-fluid\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div :class=\"fixedFormType ? 'col-md-9' : 'col-md-6'\">\n\t\t\t\t\t<div class=\"form-group\">\n\t\t\t\t\t\t<label for=\"form-title\">Form title</label>\n\t\t\t\t\t\t<input type=\"text\" v-model.trim=\"title\" id=\"form-title\"\n\t\t\t\t\t\t\tclass=\"form-control input-lg\" name=\"formTitle\"\n\t\t\t\t\t\t\tplaceholder=\"Form Title\" required />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t<div class=\"form-group\" v-if=\"!fixedFormType\">\n\t\t\t\t\t\t<label for=\"form-type\">Form type</label>\n\t\t\t\t\t\t<select class=\"form-control input-lg\" v-model=\"formType\" id=\"form-type\" name=\"form_type\">\n\t\t\t\t\t\t\t<option value=\"resident\">Resident/Intern</option>\n\t\t\t\t\t\t\t<option value=\"self-resident\">Resident/Intern (self)</option>\n\t\t\t\t\t\t\t<option value=\"fellow\">Fellow</option>\n\t\t\t\t\t\t\t<option value=\"self-fellow\">Fellow (self)</option>\n\t\t\t\t\t\t\t<option value=\"faculty\">Faculty</option>\n\t\t\t\t\t\t\t<option value=\"staff\">Staff</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-3\">\n\t\t\t\t\t<div class=\"form-group\" v-if=\"!fixedPeriodType\">\n\t\t\t\t\t\t<label for=\"form-period-type\">Evaluation period type</label>\n\t\t\t\t\t\t<select class=\"form-control input-lg\" v-model=\"periodType\" id=\"form-period-type\">\n\t\t\t\t\t\t\t<option value=\"month\">Month</option>\n\t\t\t\t\t\t\t<option value=\"quarter\">Quarter</option>\n\t\t\t\t\t\t\t<option value=\"year\">Year</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"form-body\">\n\t\t\t<div class=\"form-items\">\n\t\t\t\t<template v-for=\"(item, index) of items\">\n\t\t\t\t\t<div class=\"form-item\">\n\t\t\t\t\t\t<form-builder-instruction v-if=\"item.type === 'instruction'\"\n\t\t\t\t\t\t\tv-bind=\"item\" @change=\"changeItem(index, $event)\"\n\t\t\t\t\t\t\t@input=\"changeItem(index, $event)\"\n\t\t\t\t\t\t\t@remove=\"removeItem(index)\">\n\t\t\t\t\t\t</form-builder-instruction>\n\t\t\t\t\t\t<form-builder-question v-if=\"item.type === 'question'\"\n\t\t\t\t\t\t\tv-bind=\"item\" :form-type=\"formType\"\n\t\t\t\t\t\t\t:grouped-milestones=\"groupedMilestones\"\n\t\t\t\t\t\t\t:all-competencies=\"competencies\"\n\t\t\t\t\t\t\t:custom-options=\"customOptions\"\n\t\t\t\t\t\t\t:show-milestones-competencies=\"showMilestonesCompetencies\"\n\t\t\t\t\t\t\t@change=\"changeItem(index, $event)\"\n\t\t\t\t\t\t\t@remove=\"removeItem(index)\">\n\t\t\t\t\t\t</form-builder-question>\n\t\t\t\t\t\t<div class=\"btn-group-vertical\">\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\"\n\t\t\t\t\t\t\t\t\t:disabled=\"index === 0\"\n\t\t\t\t\t\t\t\t\t@click=\"moveItem(index, index - 1)\">\n\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-arrow-up\"></span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\"\n\t\t\t\t\t\t\t\t\t:disabled=\"index === items.length - 1\"\n\t\t\t\t\t\t\t\t\t@click=\"moveItem(index, index + 1)\">\n\t\t\t\t\t\t\t\t<span class=\"glyphicon glyphicon-arrow-down\"></span>\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</template>\n\t\t\t</div>\n\t\t</div>\n\t\t<div id=\"form-footer\">\n\t\t\t<alert-list v-model=\"alerts\" />\n\t\t\t<div>\n\t\t\t\t<button type=\"button\" class=\"btn btn-default\"\n\t\t\t\t\t\tid=\"add-instruction-block\"\n\t\t\t\t\t\t@click=\"addInstruction\">\n\t\t\t\t\t<span class=\"glyphicon glyphicon-pencil\"></span>\n\t\t\t\t\tAdd instruction block\n\t\t\t\t</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-info\" id=\"addQuestion\"\n\t\t\t\t\t\t@click=\"addQuestion\">\n\t\t\t\t\t<span class=\"glyphicon glyphicon-question-sign\"></span>\n\t\t\t\t\tAdd question\n\t\t\t\t</button>\n\t\t\t\t<show-hide-button class=\"btn btn-default\"\n\t\t\t\t\t\tv-model=\"show.customOptionsEditor\">\n\t\t\t\t\tcustom options editor\n\t\t\t\t</show-hide-button>\n\t\t\t</div>\n\n\t\t\t<div v-if=\"show.customOptionsEditor\"\n\t\t\t\t\tclass=\"custom-options-editor-container\">\n\t\t\t\t<textarea class=\"custom-options-editor form-control\"\n\t\t\t\t\trows=\"10\"\n\t\t\t\t\t:value=\"customOptionsString\"\n\t\t\t\t\t@change=\"changeCustomOptions\">\n\t\t\t\t</textarea>\n\t\t\t</div>\n\n\t\t\t<div class=\"btn-lg-submit-container\">\n\t\t\t\t<confirmation-button class=\"btn btn-lg btn-primary\"\n\t\t\t\t\t\t@click=\"submitForm\">\n\t\t\t\t\tSubmit form\n\t\t\t\t</confirmation-button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport FormBuilderInstruction from './FormBuilderInstruction.vue';\nimport FormBuilderQuestion from './FormBuilderQuestion.vue';\nimport AlertList from '../AlertList.vue';\nimport ShowHideButton from '../ShowHideButton.vue';\nimport ConfirmationButton from '../ConfirmationButton.vue';\n\nimport { fetchMilestoneGroups } from 'modules/utils.js';\n\nexport default {\n\tprops: {\n\t\toldFormContents: {\n\t\t\ttype: Object,\n\t\t\trequired: false\n\t\t},\n\t\tfixedFormType: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\tfixedPeriodType: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\tdefaultFormType: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\tdefaultPeriodType: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\tshowMilestonesCompetencies: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: true\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\ttitle: '',\n\t\t\tformType: this.fixedFormType || this.defaultFormType || 'resident',\n\t\t\tperiodType: this.fixedPeriodType || this.defaultPeriodType || 'month',\n\t\t\tnextQuestionIdNum: 1,\n\t\t\tgroupedMilestones: [],\n\t\t\tcompetencies: [],\n\t\t\titems: [],\n\t\t\tcustomOptions: [],\n\n\t\t\tshow: {\n\t\t\t\tcustomOptionsEditor: false\n\t\t\t},\n\n\t\t\talerts: []\n\t\t};\n\t},\n\n\tmounted(){\n\t\tif (this.showMilestonesCompetencies) {\n\t\t\tfetchMilestoneGroups().then(milestoneGroups => {\n\t\t\t\tthis.groupedMilestones = milestoneGroups;\n\t\t\t}).catch(err => {\n\t\t\t\tconsole.error(err);\n\t\t\t});\n\n\t\t\tfetch('/competencies', { credentials: 'same-origin' }).then(response => {\n\t\t\t\tif(response.ok)\n\t\t\t\t\treturn response.json();\n\t\t\t\telse {\n\t\t\t\t\tlet err = new Error(response.statusText);\n\t\t\t\t\terr.response = response;\n\t\t\t\t\tthrow err;\n\t\t\t\t}\n\t\t\t}).then(competencies => {\n\t\t\t\tthis.competencies = competencies;\n\t\t\t}).catch(err => {\n\t\t\t\tconsole.error(err);\n\t\t\t});\n\t\t}\n\t},\n\n\tcomputed: {\n\t\tcustomOptionsString() {\n\t\t\ttry {\n\t\t\t\treturn JSON.stringify(this.customOptions, null, 4);\n\t\t\t} catch (e) {\n\t\t\t\tconsole.error(e);\n\t\t\t}\n\n\t\t\treturn 'ERROR DISPLAYING CUSTOM OPTIONS';\n\t\t}\n\t},\n\n\tmethods: {\n\t\taddInstruction() {\n\t\t\tthis.items.push({\n\t\t\t\ttype: 'instruction',\n\t\t\t\ttext: ''\n\t\t\t});\n\t\t},\n\t\taddQuestion() {\n\t\t\tthis.items.push({\n\t\t\t\ttype: 'question',\n\t\t\t\ttext: '',\n\t\t\t\tquestionIdNum: this.nextQuestionIdNum++,\n\t\t\t\tquestionType: 'radio',\n\t\t\t\tmilestones: null,\n\t\t\t\tcompetencies: null,\n\t\t\t\toptions: [],\n\t\t\t\trequired: false,\n\t\t\t\tweight: 100\n\t\t\t});\n\t\t},\n\t\tchangeItem(index, item) {\n\t\t\tthis.items.splice(index, 1, Object.assign({}, this.items[index], item));\n\t\t},\n\t\tmoveItem(index, newIndex) {\n\t\t\tthis.items.splice(newIndex, 0, this.items.splice(index, 1)[0]);\n\t\t\tthis.adjustQuestionIdNums();\n\t\t},\n\t\tremoveItem(index) {\n\t\t\tthis.items.splice(index, 1);\n\t\t\tthis.adjustQuestionIdNums();\n\t\t},\n\t\tadjustQuestionIdNums() {\n\t\t\tlet num = 1;\n\t\t\tthis.items = this.items.map(item =>\n\t\t\t\titem.type === 'question'\n\t\t\t\t\t? Object.assign({}, item, {questionIdNum: num++})\n\t\t\t\t\t: Object.assign({}, item)\n\t\t\t);\n\t\t\tthis.nextQuestionIdNum = num;\n\t\t},\n\t\tchangeCustomOptions(event) {\n\t\t\ttry {\n\t\t\t\tlet customOptions = JSON.parse(event.target.value);\n\t\t\t\tif (Array.isArray(customOptions))\n\t\t\t\t\tthis.customOptions = customOptions;\n\t\t\t\telse\n\t\t\t\t\tthrow new Error('Not an array');\n\t\t\t} catch (err) {\n\t\t\t\tconsole.error(err);\n\t\t\t\tthis.alerts.push({\n\t\t\t\t\ttype: 'error',\n\t\t\t\t\ttext: 'Unable to set custom options'\n\t\t\t\t});\n\t\t\t}\n\t\t},\n\t\tsubmitForm() {\n\t\t\tif (this.isFormValid()) {\n\t\t\t\tthis.$emit('submit', {\n\t\t\t\t\ttitle: this.title,\n\t\t\t\t\tformType: this.formType,\n\t\t\t\t\tevaluation_period_type: this.periodType,\n\t\t\t\t\titems: this.items.map(item => {\n\t\t\t\t\t\tif (item.type === 'question')\n\t\t\t\t\t\t\titem.questionId = `q${item.questionIdNum}`;\n\n\t\t\t\t\t\treturn item;\n\t\t\t\t\t})\n\t\t\t\t});\n\t\t\t}\n\t\t},\n\t\tisFormValid() {\n\t\t\tif (!this.title) {\n\t\t\t\tthis.alerts.push({\n\t\t\t\t\ttype: 'error',\n\t\t\t\t\ttext: 'Please enter a title for the form'\n\t\t\t\t});\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tif (!this.items || this.items.length < 1) {\n\t\t\t\tthis.alerts.push({\n\t\t\t\t\ttype: 'error',\n\t\t\t\t\ttext: 'Please enter at least one question'\n\t\t\t\t});\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tfor (let item of this.items) {\n\t\t\t\tif (item.type === 'question') {\n\t\t\t\t\tif (!item.text) {\n\t\t\t\t\t\tthis.alerts.push({\n\t\t\t\t\t\t\ttype: 'error',\n\t\t\t\t\t\t\ttext: `Please enter question text for question ${item.questionIdNum}`\n\t\t\t\t\t\t});\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t\tif (['radio', 'radiononnumeric', 'checkbox'].includes(item.questionType)) {\n\t\t\t\t\t\tif(!item.options || item.options.length < 1){\n\t\t\t\t\t\t\tthis.alerts.push({\n\t\t\t\t\t\t\t\ttype: 'error',\n\t\t\t\t\t\t\t\ttext: `Please add at least one option for each multiple-choice question`\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\tfor (let option of item.options) {\n\t\t\t\t\t\t\tif (!('value' in option)) {\n\t\t\t\t\t\t\t\tthis.alerts.push({\n\t\t\t\t\t\t\t\t\ttype: 'error',\n\t\t\t\t\t\t\t\t\ttext: `An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question ${item.questionIdNum}`\n\t\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse if (item.type === 'instruction') {\n\t\t\t\t\tif (!item.text) {\n\t\t\t\t\t\tthis.alerts.push({\n\t\t\t\t\t\t\ttype: 'error',\n\t\t\t\t\t\t\ttext: 'Please complete or remove all empty instruction blocks'\n\t\t\t\t\t\t});\n\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tthis.alerts.push({\n\t\t\t\t\t\ttype: 'error',\n\t\t\t\t\t\ttext: 'Unrecognized item type in form'\n\t\t\t\t\t});\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn true;\n\t\t}\n\t},\n\twatch: {\n\t\toldFormContents(formContents) {\n\t\t\tthis.title = formContents.title;\n\t\t\tthis.formType = formContents.formType;\n\t\t\tthis.items = formContents.items.slice();\n\t\t\tfor (let item of this.items) {\n\t\t\t\tif (item.questionIdNum && item.questionIdNum >= this.nextQuestionIdNum)\n\t\t\t\t\tthis.nextQuestionIdNum = item.questionIdNum + 1;\n\t\t\t}\n\t\t}\n\t},\n\tcomponents: {\n\t\tFormBuilderInstruction,\n\t\tFormBuilderQuestion,\n\t\tAlertList,\n\t\tShowHideButton,\n\t\tConfirmationButton\n\t}\n};\n</script>\n\n<style scoped>\n\t.form-item {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t}\n\n\t.form-item .form-block {\n\t\tflex-grow: 1;\n\t}\n\n\t.custom-options-editor {\n\t\tdisplay: block;\n\t\tmargin: 1em auto;\n\t\tfont-family: monospace;\n\t\twhite-space: pre;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\n@media print {\nbutton[data-v-38459c74] {\n\t\tdisplay: none;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ShowHideButton.vue?47c685e9"],"names":[],"mappings":";AAuCA;AACA;EACA,cAAA;CACA;CACA","file":"ShowHideButton.vue","sourcesContent":["<template>\n\t<button type=\"button\" class=\"btn\"\n\t\t\t@click=\"$emit('input', !value)\">\n\t\t\t\n\t\t<slot name=\"left-glyph\"></slot>\n\t\t\t\n\t\t<slot v-if=\"value\" name=\"true\">\n\t\t\tHide\n\t\t</slot>\n\t\t<slot v-else name=\"false\">\n\t\t\tShow\n\t\t</slot>\n\n\t\t<slot>\n\t\t\t{{ text }}\n\t\t</slot>\n\t\t\n\t\t<slot name=\"glyph\">\n\t\t\t<span class=\"glyphicon glyphicon-triangle-bottom\"></span>\n\t\t</slot>\n\t</button>\n</template>\n\n<script>\nexport default {\n\tprops: {\n\t\tvalue: {\n\t\t\ttype: Boolean,\n\t\t\trequired: true\n\t\t},\n\t\ttext: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t@media print {\n\t\tbutton {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\n.form-builder-question-option[data-v-855ce662] {\n\tmargin-top: 10px;\n}\n.working-option[data-v-855ce662] {\n\topacity: 0.5;\n}\n.working-option[data-v-855ce662]:hover,\n.working-option.is-focused[data-v-855ce662],\n.working-option[data-v-855ce662]:active {\n\topacity: 1;\n}\ntextarea.form-option-description[data-v-855ce662] {\n\tresize: vertical;\n\theight: 100px;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderOption.vue?42fcc6c0"],"names":[],"mappings":";AAoEA;CACA,iBAAA;CACA;AAEA;CACA,aAAA;CACA;AAEA;;;CAGA,WAAA;CACA;AAEA;CACA,iBAAA;CACA,cAAA;CACA","file":"FormBuilderOption.vue","sourcesContent":["<template>\n\t<div class=\"form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center\" v-bind:class=\"{ 'working-option': isWorkingOption, 'is-focused': isFocused }\">\n\t\t<input v-bind:type=\"displayType\" disabled/>\n\t\t<input type=\"text\" v-bind:value=\"text\"\n\t\t\tclass=\"form-input form-option form-option-text form-control\"\n\t\t\tplaceholder=\"Option Text\"\n\t\t\tv-on:input=\"$emit('input', {text: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {text: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('text')\"\n\t\t\tv-on:blur=\"handleInputBlur('text')\"\n\t\t\t/>\n\t\t<input v-bind:type=\"type === 'radio' ? 'number' : 'text'\"\n\t\t\tv-bind:value=\"value\"\n\t\t\tclass=\"form-input form-option form-option-value form-control\"\n\t\t\tplaceholder=\"Option Value\"\n\t\t\tv-on:input=\"$emit('input', {value: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {value: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('value')\"\n\t\t\tv-on:blur=\"handleInputBlur('value')\"\n\t\t\t/>\n\t\t<textarea v-bind:value=\"description\"\n\t\t\tclass=\"form-input form-option form-option-description form-control\"\n\t\t\tplaceholder=\"Hover Description\"\n\t\t\tv-on:input=\"$emit('input', {description: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {description: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('description')\"\n\t\t\tv-on:blur=\"handleInputBlur('description')\"\n\t\t\t>\n\t\t</textarea>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tprops: [\n\t\t'type',\n\t\t'text',\n\t\t'value',\n\t\t'description',\n\t\t'isWorkingOption'\n\t],\n\tcomputed: {\n\t\tdisplayType(){\n\t\t\tif(this.type === 'checkbox')\n\t\t\t\treturn 'checkbox';\n\t\t\telse\n\t\t\t\treturn 'radio';\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tisFocused: false\n\t\t};\n\t},\n\tmethods: {\n\t\thandleInputFocus(field){\n\t\t\tthis.isFocused = true;\n\t\t\tthis.$emit('focus', field);\n\t\t},\n\t\thandleInputBlur(field){\n\t\t\tthis.isFocused = false;\n\t\t\tthis.$emit('blur', field);\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.form-builder-question-option {\n\t\tmargin-top: 10px;\n\t}\n\n\t.working-option {\n\t\topacity: 0.5;\n\t}\n\n\t.working-option:hover,\n\t.working-option.is-focused,\n\t.working-option:active {\n\t\topacity: 1;\n\t}\n\n\ttextarea.form-option-description {\n\t\tresize: vertical;\n\t\theight: 100px;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\n.question-id[data-v-e2c7d180] {\n\tfont-size: larger;\n\ttext-transform: uppercase;\n\tfont-weight: bold;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderQuestion.vue?7628c427"],"names":[],"mappings":";AAsUA;CACA,kBAAA;CACA,0BAAA;CACA,kBAAA;CACA","file":"FormBuilderQuestion.vue","sourcesContent":["<template>\n\t<div :id=\"questionId\" class=\"form-question panel panel-default form-block\">\n\t\t<div class=\"panel-heading form-horizontal\">\n\t\t\t<div class=\"panel-title form-group\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tQuestion Text\n\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t<span class=\"question-id input-group-addon\">{{questionId}}</span>\n\t\t\t\t\t\t\t<input type=\"text\" :value=\"text\" @input=\"$emit('change', {text: $event.target.value})\" class=\"form-input form-question-text form-control\" placeholder=\"Question Text\" required />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"hr-question\"></div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tQuestion Type\n\t\t\t\t\t\t<select :value=\"questionType\" @change=\"changeQuestionType\" class=\"form-control form-question-type\" name=\"questionType\">\n\t\t\t\t\t\t\t<option value=\"radio\">Radio</option>\n\t\t\t\t\t\t\t<option value=\"text\">Text</option>\n\t\t\t\t\t\t\t<option value=\"radiononnumeric\">Radio (non-numeric)</option>\n\t\t\t\t\t\t\t<option value=\"number\">Number</option>\n\t\t\t\t\t\t\t<option value=\"checkbox\">Checkbox</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<label>Question Options</label>\n\t\t\t\t\t<div class=\"btn-group btn-group-justified\">\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button @click=\"setStandardOptions\" class=\"form-question-standard-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button :disabled=\"!milestones || milestones.length !== 1\" @click=\"setMilestoneOptions\"\n\t\t\t\t\t\t\t\t\tclass=\"form-question-milestone-level-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button :disabled=\"!customOptions || customOptions.length < 1\" @click=\"setCustomOptions\"\n\t\t\t\t\t\t\t\t\tclass=\"form-question-custom-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-1 labelless-button\">\n\t\t\t\t\t<button @click=\"$emit('remove')\" class=\"form-block-delete btn btn-danger del-btn\" type=\"button\">\n\t\t\t\t\t\tDelete\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-1\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tRequired\n\t\t\t\t\t\t<input type=\"checkbox\" :checked=\"required\"\n\t\t\t\t\t\t\tclass=\"form-control form-question-required\" value=\"required\"\n\t\t\t\t\t\t\t@change=\"$emit('change', {required: $event.target.checked})\" />\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<template v-if=\"showMilestonesCompetencies\">\n\t\t\t\t<div class=\"hr-question\"></div>\n\t\t\t\t<div class=\"row\">\n\t\t\t\t\t<div class=\"col-md-8\">\n\t\t\t\t\t\t<label v-show=\"shouldShowMilestonesAndCompetencies\" class=\"containing-label\">\n\t\t\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t\t\t<select-two :value=\"milestones\" :options=\"groupedMilestones\"\n\t\t\t\t\t\t\t\t:multiple=\"true\" @input=\"$emit('change', {milestones: arguments[0]})\"\n\t\t\t\t\t\t\t\tclass=\"form-control form-question-milestone\" />\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t\t<label v-show=\"shouldShowMilestonesAndCompetencies\" class=\"containing-label\">\n\t\t\t\t\t\t\tQuestion Competency\n\t\t\t\t\t\t\t<select-two :value=\"competencies\" placeholder=\"Competency\"\n\t\t\t\t\t\t\t\tclass=\"form-control form-question-competency\"\n\t\t\t\t\t\t\t\t:options=\"competencyOptions\" :multiple=\"true\"\n\t\t\t\t\t\t\t\t@input=\"$emit('change', {competencies: arguments[0]})\" />\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\t\t\t\t\n\t\t\t</template>\n\t\t</div>\n\t\t<div class=\"panel-body\">\n\t\t\t<div class=\"row form-options\" style=\"margin-bottom:5px;\">\n\t\t\t\t<template v-if=\"['radio', 'radiononnumeric', 'checkbox'].includes(questionType)\">\n\t\t\t\t\t<form-builder-option v-for=\"(option, index) of optionsWithWorking\"\n\t\t\t\t\t\tv-bind=\"option\" :type=\"questionType\"\n\t\t\t\t\t\t:is-working-option=\"option === workingOption\"\n\t\t\t\t\t\t@input=\"handleWorkingOptionInput(index, arguments[0])\"\n\t\t\t\t\t\t@change=\"handleOptionChange(index, arguments[0])\" />\n\t\t\t\t</template>\n\n\t\t\t\t<div v-if=\"questionType === 'text'\" class=\"col-sm-12\">\n\t\t\t\t\t<textarea class=\"form-control\" placeholder=\"Text\" disabled />\n\t\t\t\t</div>\n\n\t\t\t\t<div v-if=\"questionType === 'number'\" class=\"col-md-8\">\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"Number\" disabled />\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<alert-list v-model=\"alerts\" />\n\t</div>\n</template>\n\n<script>\nimport FormBuilderOption from './FormBuilderOption.vue';\nimport SelectTwo from '../SelectTwo.vue';\nimport AlertList from '../AlertList.vue';\n\nimport { STANDARD_OPTIONS } from 'modules/constants.js';\nimport { sortSelect2Objects } from 'modules/utils.js';\n\nexport default {\n\tprops: {\n\t\tformType: {\n\t\t\ttype: String,\n\t\t\trequired: true\n\t\t},\n\t\tgroupedMilestones: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\tallCompetencies: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\tquestionIdNum: {\n\t\t\ttype: Number,\n\t\t\trequired: true\n\t\t},\n\t\ttext: {\n\t\t\ttype: String,\n\t\t\trequired: true\n\t\t},\n\t\tquestionType: {\n\t\t\ttype: String,\n\t\t\trequired: true\n\t\t},\n\t\tmilestones: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\tcompetencies: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\toptions: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\trequired: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\tcustomOptions: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\tshowMilestonesCompetencies: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: true\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tworkingOption: {\n\t\t\t\ttext: '',\n\t\t\t\tvalue: '',\n\t\t\t\tdescription: ''\n\t\t\t},\n\t\t\t\n\t\t\talerts: []\n\t\t};\n\t},\n\tcomputed: {\n\t\tquestionId(){\n\t\t\treturn `q${this.questionIdNum}`;\n\t\t},\n\t\tshouldShowMilestonesAndCompetencies(){\n\t\t\treturn ['radio', 'number'].includes(this.questionType) && [\n\t\t\t\t'resident',\n\t\t\t\t'self-resident',\n\t\t\t\t'fellow',\n\t\t\t\t'self-fellow'\n\t\t\t].includes(this.formType);\n\t\t},\n\t\toptionsWithWorking(){\n\t\t\tif(this.options){\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions.push(this.workingOption);\n\t\t\t\treturn options;\n\t\t\t}\n\t\t},\n\t\tworkingOptionIndex(){\n\t\t\tif(this.options)\n\t\t\t\treturn this.options.length;\n\t\t},\n\t\tcompetencyOptions(){\n\t\t\treturn this.allCompetencies.map(competency => ({\n\t\t\t\tid: competency.id,\n\t\t\t\ttext: competency.title\n\t\t\t})).sort(sortSelect2Objects);\n\t\t}\n\t},\n\tmethods: {\n\t\tchangeQuestionType(event){\n\t\t\tconst questionType = event.target.value;\n\t\t\tlet options = [];\n\n\t\t\tthis.$emit('change', {questionType: questionType, options: options});\n\t\t},\n\t\thandleWorkingOptionInput(index, option){\n\t\t\tif(index === this.workingOptionIndex)\n\t\t\t\tthis.workingOption = Object.assign({}, this.workingOption, option);\n\t\t},\n\t\thandleOptionChange(index, option){\n\t\t\tif(index === this.workingOptionIndex){\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions.push(Object.assign({}, this.workingOption, option));\n\t\t\t\tthis.workingOption = {\n\t\t\t\t\ttext: '',\n\t\t\t\t\tvalue: '',\n\t\t\t\t\tdescription: ''\n\t\t\t\t};\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}\n\t\t\telse {\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions[index] = Object.assign(options[index], option);\n\t\t\t\tif(!options[index].text && !options[index].value && !options[index].description)\n\t\t\t\t\toptions.splice(index, 1);\n\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}\n\t\t},\n\n\t\tsetStandardOptions(){\n\t\t\tlet options;\n\t\t\tswitch(this.formType){\n\t\t\t\tcase 'resident':\n\t\t\t\tcase 'self-resident':\n\t\t\t\t\toptions = STANDARD_OPTIONS.RESIDENT.slice();\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'fellow':\n\t\t\t\tcase 'self-fellow':\n\t\t\t\t\toptions = STANDARD_OPTIONS.FELLOW.slice();\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'faculty':\n\t\t\t\t\tif(this.questionType === 'radiononnumeric')\n\t\t\t\t\t\toptions = STANDARD_OPTIONS.FACULTY.slice();\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif(!options){\n\t\t\t\tthis.alerts.push({\n\t\t\t\t\ttype: 'error',\n\t\t\t\t\ttext: 'No standard options found for form type and question type'\n\t\t\t\t});\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.$emit('change', {options: options});\n\t\t},\n\t\tsetMilestoneOptions(){\n\t\t\tif(this.milestones.length !== 1){\n\t\t\t\tthis.alerts.push({\n\t\t\t\t\ttype: 'error',\n\t\t\t\t\ttext: 'You can only use milestone options with a single selected milestone'\n\t\t\t\t});\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tfetch(`/milestones/${this.milestones[0]}`, { credentials: 'same-origin' }).then(response => {\n\t\t\t\tif(response.ok)\n\t\t\t\t\treturn response.json();\n\t\t\t\telse\n\t\t\t\t\tthrow new Error(response);\n\t\t\t}).then(milestone => {\n\t\t\t\tif(!milestone || !milestone.levels || milestone.levels.length < 1){\n\t\t\t\t\tthis.alerts.push({\n\t\t\t\t\t\ttype: 'error',\n\t\t\t\t\t\ttext: 'No milestone levels found'\n\t\t\t\t\t});\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\tlet options = [{\n\t\t\t\t\tvalue: 0,\n\t\t\t\t\ttext: `Not yet ${milestone.levels[0].name}`\n\t\t\t\t}];\n\t\t\t\tfor(let level of milestone.levels){\n\t\t\t\t\tlet value = 2 * parseInt(level.level_number, 10);\n\t\t\t\t\toptions.push({value: value - 1, text: '', description: ''});\n\t\t\t\t\toptions.push({value: value, text: level.name, description: level.description});\n\t\t\t\t}\n\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}).catch(err => {\n\t\t\t\tconsole.error(err);\n\t\t\t});\n\t\t},\n\t\tsetCustomOptions(){\n\t\t\tif(this.customOptions.length < 1){\n\t\t\t\tthis.alerts.push({\n\t\t\t\t\ttype: 'error',\n\t\t\t\t\ttext: 'No custom options set'\n\t\t\t\t});\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.$emit('change', {options: this.customOptions.slice()});\n\t\t}\n\t},\n\tcomponents: {\n\t\tFormBuilderOption,\n\t\tSelectTwo,\n\t\tAlertList\n\t}\n};\n</script>\n\n<style scoped>\n\t.question-id {\n\t\tfont-size: larger;\n\t\ttext-transform: uppercase;\n\t\tfont-weight: bold;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 145 */,
/* 146 */,
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(158),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderInstruction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilderInstruction.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b07925b8", Component.options)
  } else {
    hotAPI.reload("data-v-b07925b8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(163)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(157),
  /* scopeId */
  "data-v-855ce662",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderOption.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilderOption.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-855ce662", Component.options)
  } else {
    hotAPI.reload("data-v-855ce662", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(164)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(136),
  /* template */
  __webpack_require__(160),
  /* scopeId */
  "data-v-e2c7d180",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilderQuestion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e2c7d180", Component.options)
  } else {
    hotAPI.reload("data-v-e2c7d180", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(193)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(171),
  /* template */
  __webpack_require__(190),
  /* scopeId */
  "data-v-439e6c2c",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormReader/FormReader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormReader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-439e6c2c", Component.options)
  } else {
    hotAPI.reload("data-v-439e6c2c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(137),
  /* template */
  __webpack_require__(156),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormReader/FormReaderQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormReaderQuestion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7112f620", Component.options)
  } else {
    hotAPI.reload("data-v-7112f620", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(138),
  /* template */
  __webpack_require__(155),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormReader/FormReaderQuestionOption.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormReaderQuestionOption.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-587e8505", Component.options)
  } else {
    hotAPI.reload("data-v-587e8505", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-header"
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    class: _vm.fixedFormType ? 'col-md-9' : 'col-md-6'
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "form-title"
    }
  }, [_vm._v("Form title")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.title),
      expression: "title",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "form-control input-lg",
    attrs: {
      "type": "text",
      "id": "form-title",
      "name": "formTitle",
      "placeholder": "Form Title",
      "required": ""
    },
    domProps: {
      "value": (_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [(!_vm.fixedFormType) ? _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "form-type"
    }
  }, [_vm._v("Form type")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.formType),
      expression: "formType"
    }],
    staticClass: "form-control input-lg",
    attrs: {
      "id": "form-type",
      "name": "form_type"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.formType = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "resident"
    }
  }, [_vm._v("Resident/Intern")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "self-resident"
    }
  }, [_vm._v("Resident/Intern (self)")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "fellow"
    }
  }, [_vm._v("Fellow")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "self-fellow"
    }
  }, [_vm._v("Fellow (self)")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "faculty"
    }
  }, [_vm._v("Faculty")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "staff"
    }
  }, [_vm._v("Staff")])])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [(!_vm.fixedPeriodType) ? _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "form-period-type"
    }
  }, [_vm._v("Evaluation period type")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.periodType),
      expression: "periodType"
    }],
    staticClass: "form-control input-lg",
    attrs: {
      "id": "form-period-type"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.periodType = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "month"
    }
  }, [_vm._v("Month")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "quarter"
    }
  }, [_vm._v("Quarter")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "year"
    }
  }, [_vm._v("Year")])])]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "form-body"
  }, [_c('div', {
    staticClass: "form-items"
  }, [_vm._l((_vm.items), function(item, index) {
    return [_c('div', {
      staticClass: "form-item"
    }, [(item.type === 'instruction') ? _c('form-builder-instruction', _vm._b({
      on: {
        "change": function($event) {
          _vm.changeItem(index, $event)
        },
        "input": function($event) {
          _vm.changeItem(index, $event)
        },
        "remove": function($event) {
          _vm.removeItem(index)
        }
      }
    }, 'form-builder-instruction', item)) : _vm._e(), _vm._v(" "), (item.type === 'question') ? _c('form-builder-question', _vm._b({
      attrs: {
        "form-type": _vm.formType,
        "grouped-milestones": _vm.groupedMilestones,
        "all-competencies": _vm.competencies,
        "custom-options": _vm.customOptions,
        "show-milestones-competencies": _vm.showMilestonesCompetencies
      },
      on: {
        "change": function($event) {
          _vm.changeItem(index, $event)
        },
        "remove": function($event) {
          _vm.removeItem(index)
        }
      }
    }, 'form-builder-question', item)) : _vm._e(), _vm._v(" "), _c('div', {
      staticClass: "btn-group-vertical"
    }, [_c('button', {
      staticClass: "btn btn-default",
      attrs: {
        "type": "button",
        "disabled": index === 0
      },
      on: {
        "click": function($event) {
          _vm.moveItem(index, index - 1)
        }
      }
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-arrow-up"
    })]), _vm._v(" "), _c('button', {
      staticClass: "btn btn-default",
      attrs: {
        "type": "button",
        "disabled": index === _vm.items.length - 1
      },
      on: {
        "click": function($event) {
          _vm.moveItem(index, index + 1)
        }
      }
    }, [_c('span', {
      staticClass: "glyphicon glyphicon-arrow-down"
    })])])], 1)]
  })], 2)]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "form-footer"
    }
  }, [_c('alert-list', {
    model: {
      value: (_vm.alerts),
      callback: function($$v) {
        _vm.alerts = $$v
      },
      expression: "alerts"
    }
  }), _vm._v(" "), _c('div', [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "id": "add-instruction-block"
    },
    on: {
      "click": _vm.addInstruction
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-pencil"
  }), _vm._v("\n\t\t\t\tAdd instruction block\n\t\t\t")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "button",
      "id": "addQuestion"
    },
    on: {
      "click": _vm.addQuestion
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-question-sign"
  }), _vm._v("\n\t\t\t\tAdd question\n\t\t\t")]), _vm._v(" "), _c('show-hide-button', {
    staticClass: "btn btn-default",
    model: {
      value: (_vm.show.customOptionsEditor),
      callback: function($$v) {
        _vm.show.customOptionsEditor = $$v
      },
      expression: "show.customOptionsEditor"
    }
  }, [_vm._v("\n\t\t\t\tcustom options editor\n\t\t\t")])], 1), _vm._v(" "), (_vm.show.customOptionsEditor) ? _c('div', {
    staticClass: "custom-options-editor-container"
  }, [_c('textarea', {
    staticClass: "custom-options-editor form-control",
    attrs: {
      "rows": "10"
    },
    domProps: {
      "value": _vm.customOptionsString
    },
    on: {
      "change": _vm.changeCustomOptions
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "btn-lg-submit-container"
  }, [_c('confirmation-button', {
    staticClass: "btn btn-lg btn-primary",
    on: {
      "click": _vm.submitForm
    }
  }, [_vm._v("\n\t\t\t\tSubmit form\n\t\t\t")])], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c14a78c", module.exports)
  }
}

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('input', !_vm.value)
      }
    }
  }, [_vm._t("left-glyph"), _vm._v(" "), (_vm.value) ? _vm._t("true", [_vm._v("\n\t\tHide\n\t")]) : _vm._t("false", [_vm._v("\n\t\tShow\n\t")]), _vm._v(" "), _vm._t("default", [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t")]), _vm._v(" "), _vm._t("glyph", [_c('span', {
    staticClass: "glyphicon glyphicon-triangle-bottom"
  })])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-38459c74", module.exports)
  }
}

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "question-option"
  }, [_c('label', [_c('span', {
    attrs: {
      "title": _vm.description
    }
  }, [(_vm.questionType === 'checkbox') ? _c('input', {
    attrs: {
      "type": "checkbox",
      "name": (_vm.questionId + "[]"),
      "required": _vm.required,
      "disabled": _vm.readonly
    },
    domProps: {
      "value": _vm.value,
      "checked": _vm.checked
    },
    on: {
      "change": _vm.handleInput
    }
  }) : _c('input', {
    attrs: {
      "type": "radio",
      "name": _vm.questionId,
      "required": _vm.required,
      "disabled": _vm.readonly
    },
    domProps: {
      "value": _vm.value,
      "checked": _vm.checked
    },
    on: {
      "change": _vm.handleInput
    }
  }), _vm._v(" "), _c('br'), _vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")])]), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showDescription),
      expression: "showDescription"
    }],
    staticClass: "description well",
    domProps: {
      "innerHTML": _vm._s(_vm.snarkdown(_vm.description))
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-587e8505", module.exports)
  }
}

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: ("question panel " + (_vm.required ? 'panel-primary' : 'panel-default'))
  }, [(_vm.text) ? _c('div', {
    staticClass: "question-header panel-heading"
  }, [_c('h3', {
    staticClass: "question-title panel-title"
  }, [_c('b', [_vm._v(_vm._s(_vm.ucfirst(_vm.questionId)) + ": ")]), _vm._v(" "), _c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.renderedText)
    }
  })])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "question-body panel-body"
  }, [(_vm.isOptionQuestion) ? _vm._l((_vm.options), function(option, index) {
    return _c('form-reader-question-option', _vm._b({
      attrs: {
        "questionType": _vm.questionType,
        "questionId": _vm.questionId,
        "required": _vm.required,
        "showDescription": _vm.showDescriptions,
        "readonly": _vm.readonly
      },
      on: {
        "input": function($event) {
          _vm.handleOptionInput(index, arguments[0])
        }
      }
    }, 'form-reader-question-option', option))
  }) : _c('div', {
    staticClass: "question-option"
  }, [(_vm.questionType === 'text') ? _c('textarea', {
    staticClass: "form-control",
    attrs: {
      "name": _vm.questionId,
      "required": _vm.required,
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.handleInput
    }
  }) : _vm._e(), _vm._v(" "), (_vm.questionType === 'number') ? _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "name": _vm.questionId,
      "required": _vm.required,
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.handleInput
    }
  }) : _vm._e()])], 2), _vm._v(" "), (_vm.showFooter) ? _c('div', {
    staticClass: "question-footer panel-footer"
  }, [(_vm.hasDescriptions) ? _c('show-hide-button', {
    staticClass: "btn btn-info",
    model: {
      value: (_vm.showDescriptions),
      callback: function($$v) {
        _vm.showDescriptions = $$v
      },
      expression: "showDescriptions"
    }
  }, [_vm._v("\n\t\t\tdescriptions\n\t\t")]) : _vm._e(), _vm._v(" "), (_vm.resettable) ? _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": !_vm.hasResponse
    },
    on: {
      "click": _vm.resetOptions
    }
  }, [_vm._v("\n\t\t\tReset response\n\t\t")]) : _vm._e()], 1) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7112f620", module.exports)
  }
}

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center",
    class: {
      'working-option': _vm.isWorkingOption, 'is-focused': _vm.isFocused
    }
  }, [_c('input', {
    attrs: {
      "type": _vm.displayType,
      "disabled": ""
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "form-input form-option form-option-text form-control",
    attrs: {
      "type": "text",
      "placeholder": "Option Text"
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          text: $event.target.value
        })
      },
      "change": function($event) {
        _vm.$emit('change', {
          text: $event.target.value
        })
      },
      "focus": function($event) {
        _vm.handleInputFocus('text')
      },
      "blur": function($event) {
        _vm.handleInputBlur('text')
      }
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "form-input form-option form-option-value form-control",
    attrs: {
      "type": _vm.type === 'radio' ? 'number' : 'text',
      "placeholder": "Option Value"
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          value: $event.target.value
        })
      },
      "change": function($event) {
        _vm.$emit('change', {
          value: $event.target.value
        })
      },
      "focus": function($event) {
        _vm.handleInputFocus('value')
      },
      "blur": function($event) {
        _vm.handleInputBlur('value')
      }
    }
  }), _vm._v(" "), _c('textarea', {
    staticClass: "form-input form-option form-option-description form-control",
    attrs: {
      "placeholder": "Hover Description"
    },
    domProps: {
      "value": _vm.description
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          description: $event.target.value
        })
      },
      "change": function($event) {
        _vm.$emit('change', {
          description: $event.target.value
        })
      },
      "focus": function($event) {
        _vm.handleInputFocus('description')
      },
      "blur": function($event) {
        _vm.handleInputBlur('description')
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-855ce662", module.exports)
  }
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-instruction-block panel panel-default form-block"
  }, [_c('div', {
    staticClass: "panel-heading"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "col-md-1 col-md-offset-1"
  }, [_c('button', {
    staticClass: "form-block-delete btn btn-danger del-btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_vm._v("Delete")])])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('textarea', {
    staticClass: "form-control form-instruction-text",
    attrs: {
      "required": ""
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          text: $event.target.value
        })
      }
    }
  })])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-10"
  }, [_c('h3', {
    staticClass: "panel-title"
  }, [_vm._v("\n\t\t\t\t\tInstruction block\n\t\t\t\t")]), _vm._v(" "), _c('small', [_vm._v("\n\t\t\t\t\tSupports\n\t\t\t\t\t"), _c('a', {
    attrs: {
      "href": "http://daringfireball.net/projects/markdown/basics",
      "target": "_blank"
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tmarkdown\n\t\t\t\t\t")]), _vm._v("\n\t\t\t\t\t(except inline HTML)\n\t\t\t\t")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-b07925b8", module.exports)
  }
}

/***/ }),
/* 159 */,
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-question panel panel-default form-block",
    attrs: {
      "id": _vm.questionId
    }
  }, [_c('div', {
    staticClass: "panel-heading form-horizontal"
  }, [_c('div', {
    staticClass: "panel-title form-group"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tQuestion Text\n\t\t\t\t\t"), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "question-id input-group-addon"
  }, [_vm._v(_vm._s(_vm.questionId))]), _vm._v(" "), _c('input', {
    staticClass: "form-input form-question-text form-control",
    attrs: {
      "type": "text",
      "placeholder": "Question Text",
      "required": ""
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          text: $event.target.value
        })
      }
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "hr-question"
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tQuestion Type\n\t\t\t\t\t"), _c('select', {
    staticClass: "form-control form-question-type",
    attrs: {
      "name": "questionType"
    },
    domProps: {
      "value": _vm.questionType
    },
    on: {
      "change": _vm.changeQuestionType
    }
  }, [_c('option', {
    attrs: {
      "value": "radio"
    }
  }, [_vm._v("Radio")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "text"
    }
  }, [_vm._v("Text")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "radiononnumeric"
    }
  }, [_vm._v("Radio (non-numeric)")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "number"
    }
  }, [_vm._v("Number")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "checkbox"
    }
  }, [_vm._v("Checkbox")])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6"
  }, [_c('label', [_vm._v("Question Options")]), _vm._v(" "), _c('div', {
    staticClass: "btn-group btn-group-justified"
  }, [_c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "form-question-standard-options btn btn-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.setStandardOptions
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "form-question-milestone-level-options btn btn-info",
    attrs: {
      "disabled": !_vm.milestones || _vm.milestones.length !== 1,
      "type": "button"
    },
    on: {
      "click": _vm.setMilestoneOptions
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "form-question-custom-options btn btn-info",
    attrs: {
      "disabled": !_vm.customOptions || _vm.customOptions.length < 1,
      "type": "button"
    },
    on: {
      "click": _vm.setCustomOptions
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t")])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1 labelless-button"
  }, [_c('button', {
    staticClass: "form-block-delete btn btn-danger del-btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_vm._v("\n\t\t\t\t\tDelete\n\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tRequired\n\t\t\t\t\t"), _c('input', {
    staticClass: "form-control form-question-required",
    attrs: {
      "type": "checkbox",
      "value": "required"
    },
    domProps: {
      "checked": _vm.required
    },
    on: {
      "change": function($event) {
        _vm.$emit('change', {
          required: $event.target.checked
        })
      }
    }
  })])])]), _vm._v(" "), (_vm.showMilestonesCompetencies) ? [_c('div', {
    staticClass: "hr-question"
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8"
  }, [_c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shouldShowMilestonesAndCompetencies),
      expression: "shouldShowMilestonesAndCompetencies"
    }],
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t\t"), _c('select-two', {
    staticClass: "form-control form-question-milestone",
    attrs: {
      "value": _vm.milestones,
      "options": _vm.groupedMilestones,
      "multiple": true
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          milestones: arguments[0]
        })
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shouldShowMilestonesAndCompetencies),
      expression: "shouldShowMilestonesAndCompetencies"
    }],
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tQuestion Competency\n\t\t\t\t\t\t"), _c('select-two', {
    staticClass: "form-control form-question-competency",
    attrs: {
      "value": _vm.competencies,
      "placeholder": "Competency",
      "options": _vm.competencyOptions,
      "multiple": true
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          competencies: arguments[0]
        })
      }
    }
  })], 1)])])] : _vm._e()], 2), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "row form-options",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [(['radio', 'radiononnumeric', 'checkbox'].includes(_vm.questionType)) ? _vm._l((_vm.optionsWithWorking), function(option, index) {
    return _c('form-builder-option', _vm._b({
      attrs: {
        "type": _vm.questionType,
        "is-working-option": option === _vm.workingOption
      },
      on: {
        "input": function($event) {
          _vm.handleWorkingOptionInput(index, arguments[0])
        },
        "change": function($event) {
          _vm.handleOptionChange(index, arguments[0])
        }
      }
    }, 'form-builder-option', option))
  }) : _vm._e(), _vm._v(" "), (_vm.questionType === 'text') ? _c('div', {
    staticClass: "col-sm-12"
  }, [_c('textarea', {
    staticClass: "form-control",
    attrs: {
      "placeholder": "Text",
      "disabled": ""
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.questionType === 'number') ? _c('div', {
    staticClass: "col-md-8"
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "placeholder": "Number",
      "disabled": ""
    }
  })]) : _vm._e()], 2)]), _vm._v(" "), _c('alert-list', {
    model: {
      value: (_vm.alerts),
      callback: function($$v) {
        _vm.alerts = $$v
      },
      expression: "alerts"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e2c7d180", module.exports)
  }
}

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(141);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("6196982b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2c14a78c&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilder.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2c14a78c&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilder.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(142);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("3a51e218", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-38459c74&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowHideButton.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-38459c74&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowHideButton.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(143);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("8c924c0e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-855ce662&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderOption.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-855ce662&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderOption.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(144);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("942b6cd4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e2c7d180&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderQuestion.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e2c7d180&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderQuestion.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormReaderQuestion_vue__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormReaderQuestion_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormReaderQuestion_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(108);
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





/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		title: {
			type: String,
			required: true
		},
		contents: {
			type: Object,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		formIsValid: function formIsValid() {
			if (this.readonly) return;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.contents.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (item.type === 'question' && item.required) {
						if (['radio', 'radiononnumeric'].includes(item.questionType)) {
							if (!item.options.some(function (option) {
								return option.checked;
							})) return false;
						} else if (item.questionType !== 'checkbox') {
							if (!item.value) return false;
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

			return true;
		}
	},

	methods: {
		snarkdown: __WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */],
		handleInput: function handleInput(index, question) {
			if (this.readonly) return;

			var items = this.contents.items.slice();
			items.splice(index, 1, Object.assign({}, this.contents.items[index], question));
			var contents = Object.assign({}, contents, { items: items });
			this.$emit('input', { contents: contents });
		},
		handleSave: function handleSave() {
			if (!this.readonly) this.$emit('save', {
				contents: this.contents
			});
		},
		handleSubmit: function handleSubmit() {
			if (!this.readonly && this.formIsValid) this.$emit('submit', {
				contents: this.contents
			});
		}
	},

	components: {
		FormReaderQuestion: __WEBPACK_IMPORTED_MODULE_0__FormReaderQuestion_vue___default.a
	}
};

/***/ }),
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)();
// imports


// module
exports.push([module.i, "\nh2[data-v-439e6c2c] {\n\tmargin-bottom: 2em;\n}\n.instruction-block[data-v-439e6c2c] {\n\tfont-size: 1.25em;\n\tpadding: 1.5em;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormReader/FormReader.vue?fe460830"],"names":[],"mappings":";AAwGA;CACA,mBAAA;CACA;AAEA;CACA,kBAAA;CACA,eAAA;CACA","file":"FormReader.vue","sourcesContent":["<template>\n\t<div>\n\t\t<h2 v-if=\"title\">\n\t\t\t{{ title }}\n\t\t</h2>\n\t\t<template v-for=\"(item, index) of contents.items\">\n\t\t\t<form-reader-question v-if=\"item.type === 'question'\"\n\t\t\t\tv-bind=\"item\"\n\t\t\t\t:readonly=\"readonly\"\n\t\t\t\t@input=\"handleInput(index, arguments[0])\" />\n\t\t\t<div v-if=\"item.type === 'instruction'\"\n\t\t\t\tclass=\"instruction-block\"\n\t\t\t\tv-html=\"snarkdown(item.text)\">\n\t\t\t</div>\n\t\t</template>\n\n\t\t<div v-if=\"!readonly\" class=\"btn-lg-submit-container\">\n\t\t\t<button type=\"button\" class=\"btn btn-lg btn-default\"\n\t\t\t\t\t@click=\"handleSave\">\n\t\t\t\tSave\n\t\t\t</button>\n\t\t\t<button type=\"button\" class=\"btn btn-lg btn-primary\"\n\t\t\t\t\t:disabled=\"!formIsValid\"\n\t\t\t\t\t@click=\"handleSubmit\">\n\t\t\t\tSubmit\n\t\t\t</button>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport FormReaderQuestion from './FormReaderQuestion.vue';\n\nimport snarkdown from 'snarkdown';\n\nexport default {\n\tprops: {\n\t\ttitle: {\n\t\t\ttype: String,\n\t\t\trequired: true\n\t\t},\n\t\tcontents: {\n\t\t\ttype: Object,\n\t\t\trequired: true\n\t\t},\n\t\treadonly: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\n\tcomputed: {\n\t\tformIsValid() {\n\t\t\tif (this.readonly)\n\t\t\t\treturn;\n\n\t\t\tfor (let item of this.contents.items) {\n\t\t\t\tif (item.type === 'question' && item.required) {\n\t\t\t\t\tif (['radio', 'radiononnumeric'].includes(item.questionType)) {\n\t\t\t\t\t\tif (!item.options.some(option => option.checked))\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t} else if (item.questionType !== 'checkbox') {\n\t\t\t\t\t\tif (!item.value)\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\treturn true;\n\t\t}\n\t},\n\n\tmethods: {\n\t\tsnarkdown,\n\t\thandleInput(index, question) {\n\t\t\tif (this.readonly)\n\t\t\t\treturn;\n\n\t\t\tlet items = this.contents.items.slice();\n\t\t\titems.splice(index, 1, Object.assign({}, this.contents.items[index], question));\n\t\t\tlet contents = Object.assign({}, contents, {items});\n\t\t\tthis.$emit('input', {contents});\n\t\t},\n\t\thandleSave() {\n\t\t\tif (!this.readonly)\n\t\t\t\tthis.$emit('save', {\n\t\t\t\t\tcontents: this.contents\n\t\t\t\t});\n\t\t},\n\t\thandleSubmit() {\n\t\t\tif (!this.readonly && this.formIsValid)\n\t\t\t\tthis.$emit('submit', {\n\t\t\t\t\tcontents: this.contents\n\t\t\t\t});\n\t\t}\n\t},\n\n\tcomponents: {\n\t\tFormReaderQuestion\n\t}\n};\n</script>\n\n<style scoped>\n\th2 {\n\t\tmargin-bottom: 2em;\n\t}\n\n\t.instruction-block {\n\t\tfont-size: 1.25em;\n\t\tpadding: 1.5em;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.title) ? _c('h2', [_vm._v("\n\t\t" + _vm._s(_vm.title) + "\n\t")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.contents.items), function(item, index) {
    return [(item.type === 'question') ? _c('form-reader-question', _vm._b({
      attrs: {
        "readonly": _vm.readonly
      },
      on: {
        "input": function($event) {
          _vm.handleInput(index, arguments[0])
        }
      }
    }, 'form-reader-question', item)) : _vm._e(), _vm._v(" "), (item.type === 'instruction') ? _c('div', {
      staticClass: "instruction-block",
      domProps: {
        "innerHTML": _vm._s(_vm.snarkdown(item.text))
      }
    }) : _vm._e()]
  }), _vm._v(" "), (!_vm.readonly) ? _c('div', {
    staticClass: "btn-lg-submit-container"
  }, [_c('button', {
    staticClass: "btn btn-lg btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleSave
    }
  }, [_vm._v("\n\t\t\tSave\n\t\t")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-lg btn-primary",
    attrs: {
      "type": "button",
      "disabled": !_vm.formIsValid
    },
    on: {
      "click": _vm.handleSubmit
    }
  }, [_vm._v("\n\t\t\tSubmit\n\t\t")])]) : _vm._e()], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-439e6c2c", module.exports)
  }
}

/***/ }),
/* 191 */,
/* 192 */,
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(179);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("e6c560d2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-439e6c2c&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormReader.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-439e6c2c&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormReader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormBuilder_FormBuilder_vue__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormBuilder_FormBuilder_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_FormBuilder_FormBuilder_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360CreateForm;







function createFaculty360CreateForm(el) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		data: function data() {
			return {
				newFormId: null,

				alerts: []
			};
		},


		methods: {
			handleSubmit: function handleSubmit(form) {
				var _this = this;

				fetch('/faculty360/forms', {
					method: 'POST',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["b" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify(form)
				}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["c" /* jsonOrThrow */]).then(function (response) {
					_this.newFormId = response.id;
					_this.redirectTimeout = window.setTimeout(function () {
						window.location = '/faculty360/forms/' + response.id + '/view';
					}, 2000);
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem saving the form'
					});
				});
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			FormBuilder: __WEBPACK_IMPORTED_MODULE_2__vue_components_FormBuilder_FormBuilder_vue___default.a
		}
	});
}

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(4);
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360Request;







function createFaculty360Request(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: false
			},
			faculty: {
				type: Array,
				required: true
			},
			forms: {
				type: Array,
				required: true
			}
		},
		data: function data() {
			return {
				facultyId: null,
				formId: this.forms.length === 1 ? this.forms[0].id : null,
				email: null,

				emailError: null,

				requestSuccessful: false,

				alerts: []
			};
		},

		propsData: propsData,

		computed: {
			emailIsValid: function emailIsValid() {
				return this.email !== null && this.email.endsWith('@mcw.edu');
			},
			formIsValid: function formIsValid() {
				return this.facultyId !== null && (this.user || this.emailIsValid);
			},
			sortedFaculty: function sortedFaculty() {
				var faculty = this.faculty.slice();
				faculty.sort(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["f" /* sortPropIgnoreCase */])('full_name'));

				return faculty;
			}
		},

		methods: {
			validateEmail: function validateEmail() {
				if (!this.email || this.emailIsValid) this.emailError = null;else this.emailError = 'Please enter your mcw.edu email address';
			},
			handleSubmit: function handleSubmit() {
				var _this = this;

				if (!this.formIsValid) return;

				fetch('/faculty360/evaluations', {
					method: 'POST',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["b" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						subject_id: this.facultyId,
						form_id: this.formId,
						email: this.email
					})
				}).then(function (response) {
					if (response.ok) return response.json();

					if (response.status === 403) throw new Error("You aren't currently elligible to evaluate faculty");

					if (response.status === 404) throw new Error('Please complete all fields');

					throw new Error('There was a problem creating the evaluation');
				}).then(function (response) {
					_this.requestSuccessful = true;

					if (response.hash) window.location = '/faculty360/evaluate/' + response.hash;
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["g" /* errorToAlert */])(err));
				});
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			SelectTwo: __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue___default.a
		}
	});
}

/***/ }),
/* 234 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_evaluation_utils_js__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__ = __webpack_require__(35);
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360Evaluate;









var questionTemplates = new Map([['{{ subject_name }}', function (evaluation) {
	return evaluation.subject.full_name;
}], ['{{ subject_first }}', function (evaluation) {
	return evaluation.subject.first_name;
}], ['{{ subject_last }}', function (evaluation) {
	return evaluation.subject.last_name;
}]]);

function createFaculty360Evaluate(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			evaluation: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {
				contents: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_evaluation_utils_js__["a" /* processQuestionTemplates */])(this.evaluation, questionTemplates),

				submitSuccessful: false,

				alerts: []
			};
		},

		propsData: propsData,

		methods: {
			handleInput: function handleInput(form) {
				this.contents = form.contents;
			},
			handleSave: function handleSave(form) {
				var _this = this;

				fetch('/faculty360/evaluations/' + this.evaluation.hash + '/save', {
					method: 'POST', // PATCH
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["b" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						contents: form.contents
					})
				}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["c" /* jsonOrThrow */]).then(function () {
					_this.alerts.push({
						type: 'success',
						text: 'Progress saved successfully!'
					});
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem\n\t\t\t\t\t\t\tsaving your progress. Please let me know at\n\t\t\t\t\t\t\t<a href="mailto:' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + '">\n\t\t\t\t\t\t\t\t' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + '\n\t\t\t\t\t\t\t</a>'
					});
				});
				console.log(form);
			},
			handleSubmit: function handleSubmit(form) {
				var _this2 = this;

				fetch('/faculty360/evaluations/' + this.evaluation.hash + '/submit', {
					method: 'POST', // PATCH
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["b" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						contents: form.contents
					})
				}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["c" /* jsonOrThrow */]).then(function () {
					_this2.submitSuccessful = true;
				}).catch(function (err) {
					console.error(err);
					_this2.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem\n\t\t\t\t\t\t\tsubmitting the form. Please let me know at\n\t\t\t\t\t\t\t<a href="mailto:' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + '">\n\t\t\t\t\t\t\t\t' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + '\n\t\t\t\t\t\t\t</a>'
					});
				});
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			FormReader: __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue___default.a
		}
	});
}

/***/ }),
/* 235 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_FormReader_FormReader_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_FormReader_FormReader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_FormReader_FormReader_vue__);
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360ViewEvaluation;




function createFaculty360ViewEvaluation(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			evaluation: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {};
		},

		propsData: propsData,

		components: {
			FormReader: __WEBPACK_IMPORTED_MODULE_1__vue_components_FormReader_FormReader_vue___default.a
		}
	});
}

/***/ }),
/* 236 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__);
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360ViewForm;





function createFaculty360ViewForm(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			form: {
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

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			FormReader: __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue___default.a
		}
	});
}

/***/ }),
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: {
		class: {
			type: String,
			required: false
		},
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
		}
	},
	data: function data() {
		return {
			pressed: false
		};
	},


	computed: {
		currentClass: function currentClass() {
			return this.pressedClass && this.pressed ? this.pressedClass : this.unpressedClass || this.class;
		}
	},

	methods: {
		handleClick: function handleClick() {
			var _this = this;

			if (this.pressed) {
				this.$emit('click');
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
};

/***/ }),
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(255),
  /* template */
  __webpack_require__(480),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ConfirmationButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ConfirmationButton.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4aea83c8", Component.options)
  } else {
    hotAPI.reload("data-v-4aea83c8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    class: _vm.currentClass,
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleClick
    }
  }, [(_vm.pressed) ? _vm._t("pressed", [_c('span', {
    staticClass: "glyphicon glyphicon-warning-sign"
  }), _vm._v("\n\t\tClick again to confirm\n\t")]) : _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4aea83c8", module.exports)
  }
}

/***/ }),
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__create_request_js__ = __webpack_require__(233);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360Request", function() { return __WEBPACK_IMPORTED_MODULE_0__create_request_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create_form_js__ = __webpack_require__(232);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360CreateForm", function() { return __WEBPACK_IMPORTED_MODULE_1__create_form_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_form_js__ = __webpack_require__(236);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360ViewForm", function() { return __WEBPACK_IMPORTED_MODULE_2__view_form_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__evaluate_js__ = __webpack_require__(234);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360Evaluate", function() { return __WEBPACK_IMPORTED_MODULE_3__evaluate_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_evaluation_js__ = __webpack_require__(235);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360ViewEvaluation", function() { return __WEBPACK_IMPORTED_MODULE_4__view_evaluation_js__["a"]; });






/***/ }),
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = processQuestionTemplates;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function processQuestionTemplates(evaluation, templates) {
	if (!evaluation || !evaluation.contents || !evaluation.contents.items) return;

	if (!templates || templates.size === 0) return evaluation.contents;

	var items = evaluation.contents.items.map(function (item) {
		item = Object.assign({}, item);

		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = templates[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _ref = _step.value;

				var _ref2 = _slicedToArray(_ref, 2);

				var template = _ref2[0];
				var replacementFunc = _ref2[1];

				var replacement = replacementFunc(evaluation);
				item.text = item.text.replace(template, replacement);
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

		return item;
	});

	return Object.assign({}, evaluation.contents, { items: items });
}

/***/ })
],[518]);
});
//# sourceMappingURL=vue-faculty360.js.map