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
return webpackJsonp([4],[
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(21);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(54),
    getValue = __webpack_require__(67);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(108),
  /* template */
  __webpack_require__(115),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/AlertList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    getRawTag = __webpack_require__(64),
    objectToString = __webpack_require__(90);

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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(77),
    listCacheDelete = __webpack_require__(78),
    listCacheGet = __webpack_require__(79),
    listCacheHas = __webpack_require__(80),
    listCacheSet = __webpack_require__(81);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(23);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(74);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(3);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(3),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 15 */
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
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(111)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(110),
  /* template */
  __webpack_require__(114),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-38459c74",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ShowHideButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(82),
    mapCacheDelete = __webpack_require__(83),
    mapCacheGet = __webpack_require__(84),
    mapCacheHas = __webpack_require__(85),
    mapCacheSet = __webpack_require__(86);

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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(42),
    arraySome = __webpack_require__(49),
    cacheHas = __webpack_require__(59);

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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(36)))

/***/ }),
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(1),
    stubFalse = __webpack_require__(105);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module)))

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObject = __webpack_require__(18);

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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(55),
    baseUnary = __webpack_require__(58),
    nodeUtil = __webpack_require__(89);

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
/* 28 */,
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(37),
  /* template */
  __webpack_require__(106),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/SelectTwo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 30 */
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

/* harmony default export */ __webpack_exports__["a"] = (parse);
//# sourceMappingURL=snarkdown.es.js.map


/***/ }),
/* 31 */,
/* 32 */,
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(112)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(109),
  /* template */
  __webpack_require__(116),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8d03363a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/BootstrapAlert.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(122),
  /* template */
  __webpack_require__(128),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ConfirmationButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
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
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 35 */,
/* 36 */,
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEqual__ = __webpack_require__(102);
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



/* harmony default export */ __webpack_exports__["default"] = ({
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(3),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(68),
    hashDelete = __webpack_require__(69),
    hashGet = __webpack_require__(70),
    hashHas = __webpack_require__(71),
    hashSet = __webpack_require__(72);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(3),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(3),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(19),
    setCacheAdd = __webpack_require__(92),
    setCacheHas = __webpack_require__(93);

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(7),
    stackClear = __webpack_require__(95),
    stackDelete = __webpack_require__(96),
    stackGet = __webpack_require__(97),
    stackHas = __webpack_require__(98),
    stackSet = __webpack_require__(99);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(3),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(57),
    isArguments = __webpack_require__(100),
    isArray = __webpack_require__(15),
    isBuffer = __webpack_require__(24),
    isIndex = __webpack_require__(73),
    isTypedArray = __webpack_require__(27);

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
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(48),
    isArray = __webpack_require__(15);

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(6);

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
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(53),
    isObjectLike = __webpack_require__(6);

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(43),
    equalArrays = __webpack_require__(20),
    equalByTag = __webpack_require__(61),
    equalObjects = __webpack_require__(62),
    getTag = __webpack_require__(66),
    isArray = __webpack_require__(15),
    isBuffer = __webpack_require__(24),
    isTypedArray = __webpack_require__(27);

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
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(25),
    isMasked = __webpack_require__(75),
    isObject = __webpack_require__(18),
    toSource = __webpack_require__(22);

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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isLength = __webpack_require__(26),
    isObjectLike = __webpack_require__(6);

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
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(76),
    nativeKeys = __webpack_require__(88);

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
/* 57 */
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
/* 58 */
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
/* 59 */
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
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    Uint8Array = __webpack_require__(44),
    eq = __webpack_require__(23),
    equalArrays = __webpack_require__(20),
    mapToArray = __webpack_require__(87),
    setToArray = __webpack_require__(94);

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
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(63);

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
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(50),
    getSymbols = __webpack_require__(65),
    keys = __webpack_require__(103);

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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14);

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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(46),
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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(38),
    Map = __webpack_require__(13),
    Promise = __webpack_require__(40),
    Set = __webpack_require__(41),
    WeakMap = __webpack_require__(45),
    baseGetTag = __webpack_require__(5),
    toSource = __webpack_require__(22);

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
/* 67 */
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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

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
/* 69 */
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
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

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
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(10);

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
/* 73 */
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
/* 74 */
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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(60);

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
/* 76 */
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
/* 77 */
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
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(8);

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
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(8);

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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(8);

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
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(8);

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
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(39),
    ListCache = __webpack_require__(7),
    Map = __webpack_require__(13);

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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

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
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

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
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

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
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

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
/* 87 */
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
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(91);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(21);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(32)(module)))

/***/ }),
/* 90 */
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
/* 91 */
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
/* 92 */
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
/* 93 */
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
/* 94 */
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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(7);

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
/* 96 */
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
/* 97 */
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
/* 98 */
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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(7),
    Map = __webpack_require__(13),
    MapCache = __webpack_require__(19);

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
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(51),
    isObjectLike = __webpack_require__(6);

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
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(25),
    isLength = __webpack_require__(26);

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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(52);

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
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(47),
    baseKeys = __webpack_require__(56),
    isArrayLike = __webpack_require__(101);

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
/* 104 */
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
/* 105 */
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
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    attrs: {
      "name": _vm.name,
      "id": _vm.id,
      "required": _vm.required,
      "multiple": _vm.multiple,
      "disabled": _vm.readonly
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
/* 107 */,
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__);
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),
/* 109 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
/* 110 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),
/* 111 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 112 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 113 */,
/* 114 */
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
/* 117 */,
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = createRadarScaleCallback;
/* harmony export (immutable) */ __webpack_exports__["f"] = createResponseLegend;
/* harmony export (immutable) */ __webpack_exports__["c"] = tableHeader;
/* harmony export (immutable) */ __webpack_exports__["b"] = fullWidthTable;
/* harmony export (immutable) */ __webpack_exports__["d"] = borderedStripedTable;
/* harmony export (immutable) */ __webpack_exports__["g"] = getAverageLevel;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return sortFunctions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(2);


function createRadarScaleCallback(valueMap) {
	return function (value) {
		return valueMap.get(value) || '';
	};
}

function createResponseLegend(valueMap) {
	var labels = [];
	var values = [];

	var keys = Array.from(valueMap.keys()).sort(__WEBPACK_IMPORTED_MODULE_0__utils_js__["g" /* sortNumbers */]);

	keys.map(function (key) {
		labels.push(valueMap.get(key));
		values.push(key.toString());
	});

	return {
		table: {
			headerRows: 1,
			body: [labels.map(tableHeader), values]
		}
	};
}

function tableHeader(text) {
	return {
		text: text,
		style: 'tableHeader'
	};
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

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(147)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(134),
  /* template */
  __webpack_require__(169),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6d54e2f6",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ComponentList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ComponentList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d54e2f6", Component.options)
  } else {
    hotAPI.reload("data-v-6d54e2f6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 120 */,
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.INDEX=t():e.INDEX=t()}(this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p=".",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),i=a(r),o=n(42),c=a(o),l=function(e){e.component("Flatpickr",c.default)};t.default=(0,i.default)(c.default,{install:l})},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){e.exports=!n(3)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){e.exports={default:n(14),__esModule:!0}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var a=n(18);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==a(e)?e.split(""):Object(e)}},function(e,t){var n=Math.ceil,a=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?a:n)(e)}},function(e,t,n){var a=n(8),r=n(7);e.exports=function(e){return a(r(e))}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),i=a(r),o=n(12),c=a(o),l=n(41),s=a(l);t.default={props:{placeholder:{type:String,default:""},options:{type:Object,default:function(){return{}}},value:{type:String,default:""}},data:function(){return{fp:null}},computed:{fpOptions:function(){return(0,c.default)(this.options)}},watch:{value:function(e){this.fp.setDate(e)},fpOptions:function(e){var t=JSON.parse(e);for(var n in t)this.fp.set(n,t[n])}},mounted:function(){var e=this,t=this.options.onValueUpdate;this.fp=new s.default(this.$el,(0,i.default)(this.options,{onValueUpdate:function(){e.onInput(e.$el.value),"function"==typeof t&&t()}})),this.$emit("FlatpickrRef",this.fp)},destroyed:function(){this.fp.destroy(),this.fp=null},methods:{onInput:function(e){"string"==typeof e?this.$emit("input",e):this.$emit("input",e.target.value)}}}},function(e,t,n){e.exports={default:n(13),__esModule:!0}},function(e,t,n){var a=n(1),r=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},function(e,t,n){n(40),e.exports=n(1).Object.assign},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var a=n(5);e.exports=function(e){if(!a(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var a=n(10),r=n(36),i=n(35);e.exports=function(e){return function(t,n,o){var c,l=a(t),s=r(l.length),u=i(o,s);if(e&&n!=n){for(;s>u;)if(c=l[u++],c!=c)return!0}else for(;s>u;u++)if((e||u in l)&&l[u]===n)return e||u||0;return!e&&-1}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var a=n(15);e.exports=function(e,t,n){if(a(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,a){return e.call(t,n,a)};case 3:return function(n,a,r){return e.call(t,n,a,r)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var a=n(5),r=n(4).document,i=a(r)&&a(r.createElement);e.exports=function(e){return i?r.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var a=n(4),r=n(1),i=n(19),o=n(24),c="prototype",l=function(e,t,n){var s,u,d,f=e&l.F,p=e&l.G,m=e&l.S,g=e&l.P,h=e&l.B,v=e&l.W,D=p?r:r[t]||(r[t]={}),b=D[c],y=p?a:m?a[t]:(a[t]||{})[c];p&&(n=t);for(s in n)u=!f&&y&&void 0!==y[s],u&&s in D||(d=u?y[s]:n[s],D[s]=p&&"function"!=typeof y[s]?n[s]:h&&u?i(d,a):v&&y[s]==d?function(e){var t=function(t,n,a){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,a)}return e.apply(this,arguments)};return t[c]=e[c],t}(d):g&&"function"==typeof d?i(Function.call,d):d,g&&((D.virtual||(D.virtual={}))[s]=d,e&l.R&&b&&!b[s]&&o(b,s,d)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var a=n(27),r=n(32);e.exports=n(2)?function(e,t,n){return a.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){e.exports=!n(2)&&!n(3)(function(){return 7!=Object.defineProperty(n(20)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){"use strict";var a=n(30),r=n(28),i=n(31),o=n(37),c=n(8),l=Object.assign;e.exports=!l||n(3)(function(){var e={},t={},n=Symbol(),a="abcdefghijklmnopqrst";return e[n]=7,a.split("").forEach(function(e){t[e]=e}),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=a})?function(e,t){for(var n=o(e),l=arguments.length,s=1,u=r.f,d=i.f;l>s;)for(var f,p=c(arguments[s++]),m=u?a(p).concat(u(p)):a(p),g=m.length,h=0;g>h;)d.call(p,f=m[h++])&&(n[f]=p[f]);return n}:l},function(e,t,n){var a=n(16),r=n(25),i=n(38),o=Object.defineProperty;t.f=n(2)?Object.defineProperty:function(e,t,n){if(a(e),t=i(t,!0),a(n),r)try{return o(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var a=n(23),r=n(10),i=n(17)(!1),o=n(33)("IE_PROTO");e.exports=function(e,t){var n,c=r(e),l=0,s=[];for(n in c)n!=o&&a(c,n)&&s.push(n);for(;t.length>l;)a(c,n=t[l++])&&(~i(s,n)||s.push(n));return s}},function(e,t,n){var a=n(29),r=n(21);e.exports=Object.keys||function(e){return a(e,r)}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var a=n(34)("keys"),r=n(39);e.exports=function(e){return a[e]||(a[e]=r(e))}},function(e,t,n){var a=n(4),r="__core-js_shared__",i=a[r]||(a[r]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t,n){var a=n(9),r=Math.max,i=Math.min;e.exports=function(e,t){return e=a(e),e<0?r(e+t,0):i(e,t)}},function(e,t,n){var a=n(9),r=Math.min;e.exports=function(e){return e>0?r(a(e),9007199254740991):0}},function(e,t,n){var a=n(7);e.exports=function(e){return Object(a(e))}},function(e,t,n){var a=n(5);e.exports=function(e,t){if(!a(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!a(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},function(e,t){var n=0,a=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+a).toString(36))}},function(e,t,n){var a=n(22);a(a.S+a.F,"Object",{assign:n(26)})},function(e,t,n){/*! flatpickr v2.3.4, @license MIT */
function a(e,t){function n(){e._flatpickr&&E(e._flatpickr),e._flatpickr=oe,oe.element=e,oe.instanceConfig=t||{},$(),P(),F(),V(),B(),z(),oe.isOpen=oe.config.inline,oe.changeMonth=C,oe.clear=M,oe.close=x,oe.destroy=E,oe.formatDate=O,oe.jumpToDate=f,oe.open=N,oe.redraw=R,oe.set=W,oe.setDate=J,oe.toggle=q,oe.isMobile=!oe.config.disableMobile&&!oe.config.inline&&"single"===oe.config.mode&&!oe.config.disable.length&&!oe.config.enable.length&&!oe.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),oe.isMobile||g(),d(),oe.isMobile||Object.defineProperty(oe,"dateIsPicked",{set:function(e){return e?oe.calendarContainer.classList.add("dateIsPicked"):void oe.calendarContainer.classList.remove("dateIsPicked")}}),oe.dateIsPicked=oe.selectedDates.length>0||oe.config.noCalendar,oe.selectedDates.length&&(oe.config.enableTime&&l(),ee()),oe.config.weekNumbers&&(oe.calendarContainer.style.width=oe.days.clientWidth+oe.weekWrapper.clientWidth+"px"),G("Ready")}function r(e){oe.config.noCalendar&&!oe.selectedDates.length&&(oe.selectedDates=[oe.now]),ie(e),oe.selectedDates.length&&(!oe.minDateHasTime||"input"!==e.type||e.target.value.length>=2?(c(),ee()):setTimeout(function(){c(),ee()},1e3))}function c(){if(oe.config.enableTime){var e=parseInt(oe.hourElement.value,10)||0,t=parseInt(oe.minuteElement.value,10)||0,n=oe.config.enableSeconds?parseInt(oe.secondElement.value,10)||0:0;oe.amPM&&(e=e%12+12*("PM"===oe.amPM.textContent)),oe.minDateHasTime&&0===re(oe.latestSelectedDateObj,oe.config.minDate)?(e=Math.max(e,oe.config.minDate.getHours()),e===oe.config.minDate.getHours()&&(t=Math.max(t,oe.config.minDate.getMinutes()))):oe.maxDateHasTime&&0===re(oe.latestSelectedDateObj,oe.config.maxDate)&&(e=Math.min(e,oe.config.maxDate.getHours()),e===oe.config.maxDate.getHours()&&(t=Math.min(t,oe.config.maxDate.getMinutes()))),s(e,t,n)}}function l(e){var t=e||oe.latestSelectedDateObj;t&&s(t.getHours(),t.getMinutes(),t.getSeconds())}function s(e,t,n){oe.selectedDates.length&&oe.latestSelectedDateObj.setHours(e%24,t,n||0,0),oe.config.enableTime&&!oe.isMobile&&(oe.hourElement.value=oe.pad(oe.config.time_24hr?e:(12+e)%12+12*(e%12===0)),oe.minuteElement.value=oe.pad(t),!oe.config.time_24hr&&oe.selectedDates.length&&(oe.amPM.textContent=oe.latestSelectedDateObj.getHours()>=12?"PM":"AM"),oe.config.enableSeconds&&(oe.secondElement.value=oe.pad(n)))}function u(e){4===e.target.value.length&&(oe.currentYearElement.blur(),I(e.target.value),e.target.value=oe.currentYear)}function d(){return oe.config.wrap&&["open","close","toggle","clear"].forEach(function(e){try{oe.element.querySelector("[data-"+e+"]").addEventListener("click",oe[e])}catch(e){}}),void 0!==window.document.createEvent&&(oe.changeEvent=window.document.createEvent("HTMLEvents"),oe.changeEvent.initEvent("change",!1,!0)),oe.isMobile?K():(oe.debouncedResize=ae(Y,50),oe.triggerChange=function(){G("Change")},oe.debouncedChange=ae(oe.triggerChange,300),"range"===oe.config.mode&&oe.days&&oe.days.addEventListener("mouseover",j),window.document.addEventListener("keydown",L),oe.config.inline||oe.config.static||window.addEventListener("resize",oe.debouncedResize),window.ontouchstart&&window.document.addEventListener("touchstart",T),window.document.addEventListener("click",T),window.document.addEventListener("blur",T),oe.config.clickOpens&&(oe.altInput||oe.input).addEventListener("focus",N),oe.config.noCalendar||(oe.prevMonthNav.addEventListener("click",function(){return C(-1)}),oe.nextMonthNav.addEventListener("click",function(){return C(1)}),oe.currentYearElement.addEventListener("wheel",function(e){return ae(te(e),50)}),oe.currentYearElement.addEventListener("focus",function(){oe.currentYearElement.select()}),oe.currentYearElement.addEventListener("input",u),oe.currentYearElement.addEventListener("increment",u),oe.days.addEventListener("click",A)),void(oe.config.enableTime&&(oe.timeContainer.addEventListener("transitionend",H),oe.timeContainer.addEventListener("wheel",function(e){return ae(r(e),5)}),oe.timeContainer.addEventListener("input",r),oe.timeContainer.addEventListener("increment",r),oe.timeContainer.addEventListener("increment",oe.debouncedChange),oe.timeContainer.addEventListener("wheel",oe.debouncedChange),oe.timeContainer.addEventListener("input",oe.triggerChange),oe.hourElement.addEventListener("focus",function(){oe.hourElement.select()}),oe.minuteElement.addEventListener("focus",function(){oe.minuteElement.select()}),oe.secondElement&&oe.secondElement.addEventListener("focus",function(){oe.secondElement.select()}),oe.amPM&&oe.amPM.addEventListener("click",function(e){r(e),oe.triggerChange(e)}))))}function f(e){e=e?oe.parseDate(e):oe.latestSelectedDateObj||(oe.config.minDate>oe.now?oe.config.minDate:oe.config.maxDate&&oe.config.maxDate<oe.now?oe.config.maxDate:oe.now);try{oe.currentYear=e.getFullYear(),oe.currentMonth=e.getMonth()}catch(t){console.error(t.stack),console.warn("Invalid date supplied: "+e)}oe.redraw()}function p(e,t){var n=e.target.parentNode.childNodes[0];n.value=parseInt(n.value,10)+t*(n.step||1);try{n.dispatchEvent(new Event("increment",{bubbles:!0}))}catch(e){var a=window.document.createEvent("CustomEvent");a.initCustomEvent("increment",!0,!0,{}),n.dispatchEvent(a)}}function m(e){var t=ne("div","numInputWrapper"),n=ne("input","numInput "+e),a=ne("span","arrowUp"),r=ne("span","arrowDown");return n.type="text",t.appendChild(n),t.appendChild(a),t.appendChild(r),a.addEventListener("click",function(e){return p(e,1)}),r.addEventListener("click",function(e){return p(e,-1)}),t}function g(){var e=window.document.createDocumentFragment();oe.calendarContainer=ne("div","flatpickr-calendar"),oe.numInputType=navigator.userAgent.indexOf("MSIE 9.0")>0?"text":"number",oe.config.noCalendar||(e.appendChild(D()),oe.innerContainer=ne("div","flatpickr-innerContainer"),oe.config.weekNumbers&&oe.innerContainer.appendChild(w()),oe.rContainer=ne("div","flatpickr-rContainer"),oe.rContainer.appendChild(y()),oe.rContainer.appendChild(v()),oe.innerContainer.appendChild(oe.rContainer),e.appendChild(oe.innerContainer)),oe.config.enableTime&&e.appendChild(b()),"range"===oe.config.mode&&oe.calendarContainer.classList.add("rangeMode"),oe.calendarContainer.appendChild(e),oe.config.inline||oe.config.static?(oe.calendarContainer.classList.add(oe.config.inline?"inline":"static"),H(),oe.config.appendTo&&oe.config.appendTo.nodeType?oe.config.appendTo.appendChild(oe.calendarContainer):oe.element.parentNode.insertBefore(oe.calendarContainer,(oe.altInput||oe.input).nextSibling)):window.document.body.appendChild(oe.calendarContainer)}function h(e,t,n){var a=S(t,!0),r=ne("span","flatpickr-day "+e,t.getDate());return r.dateObj=t,0===re(t,oe.now)&&r.classList.add("today"),a?(r.tabIndex=0,X(t)&&(r.classList.add("selected"),"range"===oe.config.mode?r.classList.add(0===re(t,oe.selectedDates[0])?"startRange":"endRange"):oe.selectedDateElem=r)):(r.classList.add("disabled"),oe.selectedDates[0]&&t>oe.minRangeDate&&t<oe.selectedDates[0]?oe.minRangeDate=t:oe.selectedDates[0]&&t<oe.maxRangeDate&&t>oe.selectedDates[0]&&(oe.maxRangeDate=t)),"range"===oe.config.mode&&(Q(t)&&!X(t)&&r.classList.add("inRange"),1===oe.selectedDates.length&&(t<oe.minRangeDate||t>oe.maxRangeDate)&&r.classList.add("notAllowed")),oe.config.weekNumbers&&"prevMonthDay"!==e&&n%7===1&&oe.weekNumbers.insertAdjacentHTML("beforeend","<span class='disabled flatpickr-day'>"+oe.config.getWeek(t)+"</span>"),G("DayCreate",r),r}function v(){oe.days||(oe.days=ne("div","flatpickr-days"),oe.days.tabIndex=-1),oe.firstOfMonth=(new Date(oe.currentYear,oe.currentMonth,1).getDay()-oe.l10n.firstDayOfWeek+7)%7,oe.prevMonthDays=oe.utils.getDaysinMonth((oe.currentMonth-1+12)%12);var e=oe.utils.getDaysinMonth(),t=window.document.createDocumentFragment(),n=oe.prevMonthDays+1-oe.firstOfMonth;oe.config.weekNumbers&&oe.weekNumbers.firstChild&&(oe.weekNumbers.textContent=""),"range"===oe.config.mode&&(oe.minRangeDate=new Date(oe.currentYear,oe.currentMonth-1,n),oe.maxRangeDate=new Date(oe.currentYear,oe.currentMonth+1,(42-oe.firstOfMonth)%e)),oe.days.firstChild&&(oe.days.textContent="");for(var a=0;n<=oe.prevMonthDays;a++,n++)t.appendChild(h("prevMonthDay",new Date(oe.currentYear,oe.currentMonth-1,n),n));for(n=1;n<=e;n++)t.appendChild(h("",new Date(oe.currentYear,oe.currentMonth,n),n));for(var r=e+1;r<=42-oe.firstOfMonth;r++)t.appendChild(h("nextMonthDay",new Date(oe.currentYear,oe.currentMonth+1,r%e),r));return oe.days.appendChild(t),oe.days}function D(){var e=window.document.createDocumentFragment();oe.monthNav=ne("div","flatpickr-month"),oe.prevMonthNav=ne("span","flatpickr-prev-month"),oe.prevMonthNav.innerHTML=oe.config.prevArrow,oe.currentMonthElement=ne("span","cur-month");var t=m("cur-year");return oe.currentYearElement=t.childNodes[0],oe.currentYearElement.title=oe.l10n.scrollTitle,oe.config.minDate&&(oe.currentYearElement.min=oe.config.minDate.getFullYear()),oe.config.maxDate&&(oe.currentYearElement.max=oe.config.maxDate.getFullYear(),oe.currentYearElement.disabled=oe.config.minDate&&oe.config.minDate.getFullYear()===oe.config.maxDate.getFullYear()),oe.nextMonthNav=ne("span","flatpickr-next-month"),oe.nextMonthNav.innerHTML=oe.config.nextArrow,oe.navigationCurrentMonth=ne("span","flatpickr-current-month"),oe.navigationCurrentMonth.appendChild(oe.currentMonthElement),oe.navigationCurrentMonth.appendChild(t),e.appendChild(oe.prevMonthNav),e.appendChild(oe.navigationCurrentMonth),e.appendChild(oe.nextMonthNav),oe.monthNav.appendChild(e),Z(),oe.monthNav}function b(){oe.calendarContainer.classList.add("hasTime"),oe.config.noCalendar&&oe.calendarContainer.classList.add("noCalendar"),oe.timeContainer=ne("div","flatpickr-time"),oe.timeContainer.tabIndex=-1;var e=ne("span","flatpickr-time-separator",":"),t=m("flatpickr-hour");oe.hourElement=t.childNodes[0];var n=m("flatpickr-minute");if(oe.minuteElement=n.childNodes[0],oe.hourElement.tabIndex=oe.minuteElement.tabIndex=0,oe.hourElement.pattern=oe.minuteElement.pattern="\\d*",oe.hourElement.value=oe.pad(oe.latestSelectedDateObj?oe.latestSelectedDateObj.getHours():oe.config.defaultHour),oe.minuteElement.value=oe.pad(oe.latestSelectedDateObj?oe.latestSelectedDateObj.getMinutes():oe.config.defaultMinute),oe.hourElement.step=oe.config.hourIncrement,oe.minuteElement.step=oe.config.minuteIncrement,oe.hourElement.min=oe.config.time_24hr?0:1,oe.hourElement.max=oe.config.time_24hr?23:12,oe.minuteElement.min=0,oe.minuteElement.max=59,oe.hourElement.title=oe.minuteElement.title=oe.l10n.scrollTitle,oe.timeContainer.appendChild(t),oe.timeContainer.appendChild(e),oe.timeContainer.appendChild(n),oe.config.time_24hr&&oe.timeContainer.classList.add("time24hr"),oe.config.enableSeconds){oe.timeContainer.classList.add("hasSeconds");var a=m("flatpickr-second");oe.secondElement=a.childNodes[0],oe.secondElement.pattern=oe.hourElement.pattern,oe.secondElement.value=oe.latestSelectedDateObj?oe.pad(oe.latestSelectedDateObj.getSeconds()):"00",oe.secondElement.step=oe.minuteElement.step,oe.secondElement.min=oe.minuteElement.min,oe.secondElement.max=oe.minuteElement.max,oe.timeContainer.appendChild(ne("span","flatpickr-time-separator",":")),oe.timeContainer.appendChild(a)}return oe.config.time_24hr||(oe.amPM=ne("span","flatpickr-am-pm",["AM","PM"][oe.hourElement.value>11|0]),oe.amPM.title=oe.l10n.toggleTitle,oe.amPM.tabIndex=0,oe.timeContainer.appendChild(oe.amPM)),oe.timeContainer}function y(){oe.weekdayContainer||(oe.weekdayContainer=ne("div","flatpickr-weekdays"));var e=oe.l10n.firstDayOfWeek,t=oe.l10n.weekdays.shorthand.slice();return e>0&&e<t.length&&(t=[].concat(t.splice(e,t.length),t.splice(0,e))),oe.weekdayContainer.innerHTML="\n\t\t<span class=flatpickr-weekday>\n\t\t\t"+t.join("</span><span class=flatpickr-weekday>")+"\n\t\t</span>\n\t\t",oe.weekdayContainer}function w(){return oe.calendarContainer.classList.add("hasWeeks"),oe.weekWrapper=ne("div","flatpickr-weekwrapper"),oe.weekWrapper.appendChild(ne("span","flatpickr-weekday",oe.l10n.weekAbbreviation)),oe.weekNumbers=ne("div","flatpickr-weeks"),oe.weekWrapper.appendChild(oe.weekNumbers),oe.weekWrapper}function C(e,t){oe.currentMonth="undefined"==typeof t||t?oe.currentMonth+e:e,I(),Z(),v(),oe.config.noCalendar||oe.days.focus(),G("MonthChange")}function M(e){oe.input.value="",oe.altInput&&(oe.altInput.value=""),oe.mobileInput&&(oe.mobileInput.value=""),oe.selectedDates=[],oe.latestSelectedDateObj=null,oe.dateIsPicked=!1,oe.redraw(),e!==!1&&G("Change")}function x(){oe.isOpen=!1,oe.isMobile||(oe.calendarContainer.classList.remove("open"),(oe.altInput||oe.input).classList.remove("active")),G("Close")}function E(e){e=e||oe,e.clear(!1),window.document.removeEventListener("keydown",L),window.removeEventListener("resize",e.debouncedResize),window.document.removeEventListener("click",T),window.document.removeEventListener("touchstart",T),window.document.removeEventListener("blur",T),e.timeContainer&&e.timeContainer.removeEventListener("transitionend",H),e.mobileInput&&e.mobileInput.parentNode?e.mobileInput.parentNode.removeChild(e.mobileInput):e.calendarContainer&&e.calendarContainer.parentNode&&e.calendarContainer.parentNode.removeChild(e.calendarContainer),e.altInput&&(e.input.type="text",e.altInput.parentNode&&e.altInput.parentNode.removeChild(e.altInput)),e.input.type=e.input._type,e.input.classList.remove("flatpickr-input"),e.input.removeEventListener("focus",N),e.input.removeAttribute("readonly"),delete e.input._flatpickr}function k(e){for(var t=e;t;){if(/flatpickr-day|flatpickr-calendar/.test(t.className))return!0;t=t.parentNode}return!1}function T(e){var t=oe.element.contains(e.target)||e.target===oe.input||e.target===oe.altInput||e.path&&(~e.path.indexOf(oe.input)||~e.path.indexOf(oe.altInput));!oe.isOpen||oe.config.inline||k(e.target)||t||(e.preventDefault(),oe.close(),"range"===oe.config.mode&&1===oe.selectedDates.length&&(oe.clear(),oe.redraw()))}function O(e,t){if(oe.config.formatDate)return oe.config.formatDate(e,t);var n=e.split("");return n.map(function(e,a){return oe.formats[e]&&"\\"!==n[a-1]?oe.formats[e](t):"\\"!==e?e:""}).join("")}function I(e){oe.currentMonth<0||oe.currentMonth>11?(oe.currentYear+=oe.currentMonth%11,oe.currentMonth=(oe.currentMonth+12)%12,G("YearChange")):e&&(!oe.currentYearElement.min||e>=oe.currentYearElement.min)&&(!oe.currentYearElement.max||e<=oe.currentYearElement.max)&&(oe.currentYear=parseInt(e,10)||oe.currentYear,oe.config.maxDate&&oe.currentYear===oe.config.maxDate.getFullYear()?oe.currentMonth=Math.min(oe.config.maxDate.getMonth(),oe.currentMonth):oe.config.minDate&&oe.currentYear===oe.config.minDate.getFullYear()&&(oe.currentMonth=Math.max(oe.config.minDate.getMonth(),oe.currentMonth)),oe.redraw(),G("YearChange"))}function S(e,t){var n=re(e,oe.config.minDate,"undefined"!=typeof t?t:!oe.minDateHasTime)<0,a=re(e,oe.config.maxDate,"undefined"!=typeof t?t:!oe.maxDateHasTime)>0;if(n||a)return!1;if(!oe.config.enable.length&&!oe.config.disable.length)return!0;for(var r,i=oe.parseDate(e,!0),c=oe.config.enable.length>0,l=c?oe.config.enable:oe.config.disable,s=0;s<l.length;s++){if(r=l[s],r instanceof Function&&r(i))return c;if(r instanceof Date&&r.getTime()===i.getTime())return c;if("string"==typeof r&&oe.parseDate(r,!0).getTime()===i.getTime())return c;if("object"===("undefined"==typeof r?"undefined":o(r))&&r.from&&r.to&&i>=r.from&&i<=r.to)return c}return!c}function L(e){if(oe.isOpen)switch(e.which){case 13:oe.timeContainer&&oe.timeContainer.contains(e.target)?ee():A(e);break;case 27:oe.clear(),oe.redraw(),oe.close();break;case 37:e.target!==oe.input&e.target!==oe.altInput&&C(-1);break;case 38:e.preventDefault(),oe.timeContainer&&oe.timeContainer.contains(e.target)?r(e):(oe.currentYear++,oe.redraw());break;case 39:e.target!==oe.input&e.target!==oe.altInput&&C(1);break;case 40:e.preventDefault(),oe.timeContainer&&oe.timeContainer.contains(e.target)?r(e):(oe.currentYear--,oe.redraw())}}function j(e){if(1===oe.selectedDates.length&&e.target.classList.contains("flatpickr-day")){for(var t=e.target.dateObj,n=oe.parseDate(oe.selectedDates[0],!0),a=Math.min(t.getTime(),oe.selectedDates[0].getTime()),r=Math.max(t.getTime(),oe.selectedDates[0].getTime()),i=!1,o=a;o<r;o+=oe.utils.duration.DAY)if(!S(new Date(o))){i=!0;break}for(var c=oe.days.childNodes[0].dateObj.getTime(),l=0;l<42;l++,c+=oe.utils.duration.DAY){var s=c<oe.minRangeDate.getTime()||c>oe.maxRangeDate.getTime();if(s)oe.days.childNodes[l].classList.add("notAllowed"),oe.days.childNodes[l].classList.remove("inRange","startRange","endRange");else if(!i||s){oe.days.childNodes[l].classList.remove("startRange","inRange","endRange","notAllowed");var u=Math.max(oe.minRangeDate.getTime(),a),d=Math.min(oe.maxRangeDate.getTime(),r);e.target.classList.add(t<oe.selectedDates[0]?"startRange":"endRange"),n>t&&c===n.getTime()?oe.days.childNodes[l].classList.add("endRange"):n<t&&c===n.getTime()?oe.days.childNodes[l].classList.add("startRange"):c>u&&c<d&&oe.days.childNodes[l].classList.add("inRange")}}}}function Y(){!oe.isOpen||oe.config.static||oe.config.inline||H()}function N(e){return oe.isMobile?(e&&(e.preventDefault(),e.target.blur()),setTimeout(function(){oe.mobileInput.click()},0),void G("Open")):void(oe.isOpen||(oe.altInput||oe.input).disabled||oe.config.inline||(oe.calendarContainer.classList.add("open"),oe.config.static||oe.config.inline||H(),oe.isOpen=!0,oe.config.allowInput||((oe.altInput||oe.input).blur(),(oe.config.noCalendar?oe.timeContainer:oe.selectedDateElem?oe.selectedDateElem:oe.days).focus()),(oe.altInput||oe.input).classList.add("active"),G("Open")))}function _(e){return function(t){var n=oe.config["_"+e+"Date"]=oe.parseDate(t),a=oe.config["_"+("min"===e?"max":"min")+"Date"];oe.selectedDates&&(oe.selectedDates=oe.selectedDates.filter(S),ee()),oe.days&&R(),oe.currentYearElement&&(t&&n instanceof Date?(oe[e+"DateHasTime"]=n.getHours()||n.getMinutes()||n.getSeconds(),oe.currentYearElement[e]=n.getFullYear()):oe.currentYearElement.removeAttribute(e),oe.currentYearElement.disabled=a&&n&&a.getFullYear()===n.getFullYear())}}function P(){var e=["utc","wrap","weekNumbers","allowInput","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"];oe.config=Object.create(a.defaultConfig),Object.defineProperty(oe.config,"minDate",{get:function(){return this._minDate},set:_("min")}),Object.defineProperty(oe.config,"maxDate",{get:function(){return this._maxDate},set:_("max")});var t=i({},oe.instanceConfig,JSON.parse(JSON.stringify(oe.element.dataset||{})));i(oe.config,t);for(var n=0;n<e.length;n++)oe.config[e[n]]=oe.config[e[n]]===!0||"true"===oe.config[e[n]];!t.dateFormat&&t.enableTime&&(oe.config.dateFormat=oe.config.noCalendar?"H:i"+(oe.config.enableSeconds?":S":""):a.defaultConfig.dateFormat+" H:i"+(oe.config.enableSeconds?":S":"")),t.altInput&&t.enableTime&&!t.altFormat&&(oe.config.altFormat=oe.config.noCalendar?"h:i"+(oe.config.enableSeconds?":S K":" K"):a.defaultConfig.altFormat+(" h:i"+(oe.config.enableSeconds?":S":"")+" K"))}function F(){"object"!==o(oe.config.locale)&&"undefined"==typeof a.l10ns[oe.config.locale]&&console.warn("flatpickr: invalid locale "+oe.config.locale),oe.l10n=i(Object.create(a.l10ns.default),"object"===o(oe.config.locale)?oe.config.locale:"default"!==oe.config.locale?a.l10ns[oe.config.locale]||{}:{})}function H(e){if(!e||e.target===oe.timeContainer){var t=oe.calendarContainer.offsetHeight,n=oe.calendarContainer.offsetWidth,a=oe.altInput||oe.input,r=a.getBoundingClientRect(),i=window.innerHeight-r.bottom+a.offsetHeight,o=void 0;if(i<t+60?(o=window.pageYOffset-t+r.top-2,oe.calendarContainer.classList.remove("arrowTop"),oe.calendarContainer.classList.add("arrowBottom")):(o=window.pageYOffset+a.offsetHeight+r.top+2,oe.calendarContainer.classList.remove("arrowBottom"),oe.calendarContainer.classList.add("arrowTop")),!oe.config.static&&!oe.config.inline){oe.calendarContainer.style.top=o+"px";var c=window.pageXOffset+r.left,l=window.document.body.offsetWidth-r.right;c+n<=window.document.body.offsetWidth?(oe.calendarContainer.style.left=c+"px",oe.calendarContainer.style.right="auto",oe.calendarContainer.classList.remove("rightMost")):(oe.calendarContainer.style.left="auto",oe.calendarContainer.style.right=l+"px",oe.calendarContainer.classList.add("rightMost"))}}}function R(){oe.config.noCalendar||oe.isMobile||(y(),Z(),v())}function A(e){if(e.preventDefault(),oe.config.allowInput&&13===e.which&&e.target===(oe.altInput||oe.input))return oe.setDate((oe.altInput||oe.input).value),e.target.blur();if(e.target.classList.contains("flatpickr-day")&&!e.target.classList.contains("disabled")&&!e.target.classList.contains("notAllowed")){var t=oe.latestSelectedDateObj=new Date(e.target.dateObj.getTime());if(oe.selectedDateElem=e.target,"single"===oe.config.mode)oe.selectedDates=[t];else if("multiple"===oe.config.mode){var n=X(t);n?oe.selectedDates.splice(n,1):oe.selectedDates.push(t)}else"range"===oe.config.mode&&(2===oe.selectedDates.length&&oe.clear(),oe.selectedDates.push(t),oe.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()}));c(),t.getMonth()!==oe.currentMonth&&"range"!==oe.config.mode&&(oe.currentYear=t.getFullYear(),oe.currentMonth=t.getMonth(),Z()),v(),oe.minDateHasTime&&oe.config.enableTime&&0===re(t,oe.config.minDate)&&l(oe.config.minDate),ee(),setTimeout(function(){return oe.dateIsPicked=!0},50),"range"===oe.config.mode&&1===oe.selectedDates.length&&j(e),"single"!==oe.config.mode||oe.config.enableTime||oe.close(),G("Change")}}function W(e,t){oe.config[e]=t,oe.redraw(),f()}function U(e){if(Array.isArray(e))oe.selectedDates=e.map(oe.parseDate);else if(e)switch(oe.config.mode){case"single":oe.selectedDates=[oe.parseDate(e)];break;case"multiple":oe.selectedDates=e.split("; ").map(oe.parseDate);break;case"range":oe.selectedDates=e.split(oe.l10n.rangeSeparator).map(oe.parseDate)}oe.selectedDates=oe.selectedDates.filter(function(e){return e instanceof Date&&e.getTime()&&S(e,!1)}),oe.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()})}function J(e,t){return e?(U(e),oe.selectedDates.length>0?(oe.dateIsPicked=!0,oe.latestSelectedDateObj=oe.selectedDates[0]):oe.latestSelectedDateObj=null,oe.redraw(),f(),l(),ee(),void(t===!0&&G("Change"))):oe.clear()}function B(){function e(e){for(var t=e.length;t--;)"string"==typeof e[t]||+e[t]?e[t]=oe.parseDate(e[t],!0):e[t]&&e[t].from&&e[t].to&&(e[t].from=oe.parseDate(e[t].from),e[t].to=oe.parseDate(e[t].to));return e.filter(function(e){return e})}oe.selectedDates=[],oe.now=new Date,U(oe.config.defaultDate||oe.input.value),oe.config.disable.length&&(oe.config.disable=e(oe.config.disable)),oe.config.enable.length&&(oe.config.enable=e(oe.config.enable));var t=oe.selectedDates.length?oe.selectedDates[0]:oe.config.minDate&&oe.config.minDate.getTime()>oe.now?oe.config.minDate:oe.config.maxDate&&oe.config.maxDate.getTime()<oe.now?oe.config.maxDate:oe.now;oe.currentYear=t.getFullYear(),oe.currentMonth=t.getMonth(),oe.selectedDates.length&&(oe.latestSelectedDateObj=oe.selectedDates[0]),oe.minDateHasTime=oe.config.minDate&&(oe.config.minDate.getHours()||oe.config.minDate.getMinutes()||oe.config.minDate.getSeconds()),oe.maxDateHasTime=oe.config.maxDate&&(oe.config.maxDate.getHours()||oe.config.maxDate.getMinutes()||oe.config.maxDate.getSeconds()),Object.defineProperty(oe,"latestSelectedDateObj",{get:function(){return oe._selectedDateObj||oe.selectedDates[oe.selectedDates.length-1]||null},set:function(e){oe._selectedDateObj=e}})}function z(){oe.utils={duration:{DAY:864e5},getDaysinMonth:function(e,t){return e="undefined"==typeof e?oe.currentMonth:e,t="undefined"==typeof t?oe.currentYear:t,1===e&&(t%4===0&&t%100!==0||t%400===0)?29:oe.l10n.daysInMonth[e]},monthToStr:function(e,t){return t="undefined"==typeof t?oe.config.shorthandCurrentMonth:t,oe.l10n.months[(t?"short":"long")+"hand"][e]}}}function $(){oe.formats={D:function(e){return oe.l10n.weekdays.shorthand[oe.formats.w(e)]},F:function(e){return oe.utils.monthToStr(oe.formats.n(e)-1,!1)},H:function(e){return a.prototype.pad(e.getHours())},J:function(e){return e.getDate()+oe.l10n.ordinal(e.getDate())},K:function(e){return e.getHours()>11?"PM":"AM"},M:function(e){return oe.utils.monthToStr(e.getMonth(),!0)},S:function(e){return a.prototype.pad(e.getSeconds())},U:function(e){return e.getTime()/1e3},Y:function(e){return e.getFullYear()},d:function(e){return a.prototype.pad(oe.formats.j(e))},h:function(e){return e.getHours()%12?e.getHours()%12:12},i:function(e){return a.prototype.pad(e.getMinutes())},j:function(e){return e.getDate()},l:function(e){return oe.l10n.weekdays.longhand[oe.formats.w(e)]},m:function(e){return a.prototype.pad(oe.formats.n(e))},n:function(e){return e.getMonth()+1},s:function(e){return e.getSeconds()},w:function(e){return e.getDay()},y:function(e){return String(oe.formats.Y(e)).substring(2)}}}function V(){return oe.input=oe.config.wrap?oe.element.querySelector("[data-input]"):oe.element,oe.input?(oe.input._type=oe.input.type,oe.input.type="text",oe.input.classList.add("flatpickr-input"),oe.config.altInput&&(oe.altInput=ne(oe.input.nodeName,oe.input.className+" "+oe.config.altInputClass),oe.altInput.placeholder=oe.input.placeholder,oe.altInput.type="text",oe.input.type="hidden",oe.input.parentNode&&oe.input.parentNode.insertBefore(oe.altInput,oe.input.nextSibling)),void(oe.config.allowInput||(oe.altInput||oe.input).setAttribute("readonly","readonly"))):console.warn("Error: invalid input element specified",oe.input)}function K(){var e=oe.config.enableTime?oe.config.noCalendar?"time":"datetime-local":"date";oe.mobileInput=ne("input",oe.input.className+" flatpickr-mobile"),oe.mobileInput.step="any",oe.mobileInput.tabIndex=1,oe.mobileInput.type=e,oe.mobileInput.disabled=oe.input.disabled,oe.mobileFormatStr="datetime-local"===e?"Y-m-d\\TH:i:S":"date"===e?"Y-m-d":"H:i:S",oe.selectedDates.length&&(oe.mobileInput.defaultValue=oe.mobileInput.value=O(oe.mobileFormatStr,oe.selectedDates[0])),oe.config.minDate&&(oe.mobileInput.min=O("Y-m-d",oe.config.minDate)),oe.config.maxDate&&(oe.mobileInput.max=O("Y-m-d",oe.config.maxDate)),oe.input.type="hidden",oe.config.altInput&&(oe.altInput.type="hidden");try{oe.input.parentNode.insertBefore(oe.mobileInput,oe.input.nextSibling)}catch(e){}oe.mobileInput.addEventListener("change",function(e){oe.latestSelectedDateObj=oe.parseDate(e.target.value),oe.setDate(oe.latestSelectedDateObj),G("Change"),G("Close")})}function q(){oe.isOpen?oe.close():oe.open()}function G(e,t){if(oe.config["on"+e])for(var n=Array.isArray(oe.config["on"+e])?oe.config["on"+e]:[oe.config["on"+e]],a=0;a<n.length;a++)n[a](oe.selectedDates,oe.input.value,oe,t);if("Change"===e)if("function"==typeof Event&&Event.constructor)oe.input.dispatchEvent(new Event("change",{bubbles:!0})),oe.input.dispatchEvent(new Event("input",{bubbles:!0}));else{if(void 0!==window.document.createEvent)return oe.input.dispatchEvent(oe.changeEvent);oe.input.fireEvent("onchange")}}function X(e){for(var t=0;t<oe.selectedDates.length;t++)if(0===re(oe.selectedDates[t],e))return""+t;return!1}function Q(e){return!("range"!==oe.config.mode||oe.selectedDates.length<2)&&(re(e,oe.selectedDates[0])>=0&&re(e,oe.selectedDates[1])<=0)}function Z(){if(!oe.config.noCalendar&&!oe.isMobile&&oe.monthNav){if(oe.currentMonthElement.textContent=oe.utils.monthToStr(oe.currentMonth)+" ",oe.currentYearElement.value=oe.currentYear,oe.config.minDate){var e=oe.currentYear===oe.config.minDate.getFullYear()?oe.currentMonth<=oe.config.minDate.getMonth():oe.currentYear<oe.config.minDate.getFullYear();oe.prevMonthNav.style.display=e?"none":"block"}else oe.prevMonthNav.style.display="block";if(oe.config.maxDate){var t=oe.currentYear===oe.config.maxDate.getFullYear()?oe.currentMonth+1>oe.config.maxDate.getMonth():oe.currentYear>oe.config.maxDate.getFullYear();oe.nextMonthNav.style.display=t?"none":"block"}else oe.nextMonthNav.style.display="block"}}function ee(){if(!oe.selectedDates.length)return oe.clear();oe.isMobile&&(oe.mobileInput.value=oe.selectedDates.length?O(oe.mobileFormatStr,oe.latestSelectedDateObj):"");var e="range"!==oe.config.mode?"; ":oe.l10n.rangeSeparator;oe.input.value=oe.selectedDates.map(function(e){return O(oe.config.dateFormat,e)}).join(e),oe.config.altInput&&(oe.altInput.value=oe.selectedDates.map(function(e){return O(oe.config.altFormat,e)}).join(e)),G("ValueUpdate")}function te(e){e.preventDefault();var t=Math.max(-1,Math.min(1,e.wheelDelta||-e.deltaY)),n=parseInt(e.target.value,10)+t;I(n),e.target.value=oe.currentYear}function ne(e,t,n){var a=window.document.createElement(e);return t=t||"",n=n||"",a.className=t,n&&(a.textContent=n),a}function ae(e,t,n){var a=void 0;return function(){for(var r=arguments.length,i=Array(r),o=0;o<r;o++)i[o]=arguments[o];var c=this,l=function(){a=null,n||e.apply(c,i)};clearTimeout(a),a=setTimeout(l,t),n&&!a&&e.apply(c,i)}}function re(e,t,n){return e instanceof Date&&t instanceof Date&&(n!==!1?new Date(e.getTime()).setHours(0,0,0,0)-new Date(t.getTime()).setHours(0,0,0,0):e.getTime()-t.getTime())}function ie(e){if(e.preventDefault(),e&&((e.target.value||e.target.textContent).length>=2||"keydown"!==e.type&&"input"!==e.type)&&e.target.blur(),oe.amPM&&e.target===oe.amPM)return e.target.textContent=["AM","PM"]["AM"===e.target.textContent|0];var t=Number(e.target.min),n=Number(e.target.max),a=Number(e.target.step),r=parseInt(e.target.value,10),i=Math.max(-1,Math.min(1,e.wheelDelta||-e.deltaY)),o=Number(r);switch(e.type){case"wheel":o=r+a*i;break;case"keydown":o=r+a*(38===e.which?1:-1)}"input"!==e.type||2===e.target.value.length?(o<t?o=n+o+(e.target!==oe.hourElement)+(e.target===oe.hourElement&&!oe.amPM):o>n&&(o=e.target===oe.hourElement?o-n-!oe.amPM:t),oe.amPM&&e.target===oe.hourElement&&(1===a?o+r===23:Math.abs(o-r)>a)&&(oe.amPM.textContent="PM"===oe.amPM.textContent?"AM":"PM"),e.target.value=oe.pad(o)):e.target.value=o}var oe=this;return n(),oe}function r(e,t){for(var n=Array.prototype.slice.call(e),r=[],i=0;i<n.length;i++)try{n[i]._flatpickr=new a(n[i],t||{}),r.push(n[i]._flatpickr)}catch(e){console.warn(e,e.stack)}return 1===r.length?r[0]:r}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};a.defaultConfig={mode:"single",utc:!1,wrap:!1,weekNumbers:!1,allowInput:!1,clickOpens:!0,time_24hr:!1,enableTime:!1,noCalendar:!1,dateFormat:"Y-m-d",altInput:!1,altInputClass:"flatpickr-input form-control input",altFormat:"F j, Y",defaultDate:null,minDate:null,maxDate:null,parseDate:null,formatDate:null,getWeek:function(e){var t=new Date(e.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);var n=new Date(t.getFullYear(),0,4);return 1+Math.round(((t.getTime()-n.getTime())/864e5-3+(n.getDay()+6)%7)/7)},enable:[],disable:[],shorthandCurrentMonth:!1,inline:!1,static:!1,appendTo:null,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",enableSeconds:!1,hourIncrement:1,minuteIncrement:5,defaultHour:12,defaultMinute:0,disableMobile:!1,locale:"default",onChange:null,onOpen:null,onClose:null,onReady:null,onValueUpdate:null,onDayCreate:null},a.l10ns={en:{weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]
},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(e){var t=e%100;if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle"}},a.l10ns.default=Object.create(a.l10ns.en),a.localize=function(e){return i(a.l10ns.default,e||{})},a.setDefaults=function(e){return i(a.defaultConfig,e||{})},a.prototype={pad:function(e){return("0"+e).slice(-2)},parseDate:function(e,t){if(!e)return null;var n=/(\d+)/g,a=/^(\d{1,2})[:\s](\d\d)?[:\s]?(\d\d)?\s?(a|p)?/i,r=/^(\d+)$/g,i=e;if(e.toFixed||r.test(e))e=new Date(e);else if("string"==typeof e)if(e=e.trim(),"today"===e)e=new Date,t=!0;else if(this.config&&this.config.parseDate)e=this.config.parseDate(e);else if(a.test(e)){var o=e.match(a),c=o[4]?o[1]%12+("p"===o[4].toLowerCase()?12:0):o[1];e=new Date,e.setHours(c,o[2]||0,o[3]||0)}else if(/Z$/.test(e)||/GMT$/.test(e))e=new Date(e);else if(n.test(e)&&/^[0-9]/.test(e)){var l=e.match(n);e=new Date(l[0]+"/"+(l[1]||1)+"/"+(l[2]||1)+" "+(l[3]||0)+":"+(l[4]||0)+":"+(l[5]||0))}else e=new Date(e);else e instanceof Date&&(e=new Date(e.getTime()));return e instanceof Date?(this.config&&this.config.utc&&!e.fp_isUTC&&(e=e.fp_toUTC()),t===!0&&e.setHours(0,0,0,0),e):(console.warn("flatpickr: invalid date "+i),console.info(this.element),null)}},"undefined"!=typeof HTMLElement&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(e){return r(this,e)},HTMLElement.prototype.flatpickr=function(e){return r([this],e)}),"undefined"!=typeof jQuery&&(jQuery.fn.flatpickr=function(e){return r(this,e)}),Date.prototype.fp_incr=function(e){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+parseInt(e,10))},Date.prototype.fp_isUTC=!1,Date.prototype.fp_toUTC=function(){var e=new Date(this.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds());return e.fp_isUTC=!0,e},!window.document.documentElement.classList&&Object.defineProperty&&"undefined"!=typeof HTMLElement&&Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){function e(e){return function(n){var a=t.className.split(/\s+/),r=a.indexOf(n);e(a,r,n),t.className=a.join(" ")}}var t=this,n={add:e(function(e,t,n){~t||e.push(n)}),remove:e(function(e,t){~t&&e.splice(t,1)}),toggle:e(function(e,t,n){~t?e.splice(t,1):e.push(n)}),contains:function(e){return!!~t.className.split(/\s+/).indexOf(e)},item:function(e){return t.className.split(/\s+/)[e]||null}};return Object.defineProperty(n,"length",{get:function(){return t.className.split(/\s+/).length}}),n}}),e.exports=a},function(e,t,n){var a,r;a=n(11);var i=n(43);r=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(r=a=a.default),"function"==typeof r&&(r=r.options),r.render=i.render,r.staticRenderFns=i.staticRenderFns,e.exports=a},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.value}})},staticRenderFns:[]}}])});
//# sourceMappingURL=index.js.map

/***/ }),
/* 122 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),
/* 123 */,
/* 124 */,
/* 125 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 126 */,
/* 127 */,
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    class: _vm.currentClass,
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
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
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__ = __webpack_require__(16);
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		value: {
			type: Object,
			required: true
		},
		minDate: {
			type: String,
			default: function _default() {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateString"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(__WEBPACK_IMPORTED_MODULE_1_moment___default()()).endDate);
			}
		},
		maxDate: {
			type: String,
			default: function _default() {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateString"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(__WEBPACK_IMPORTED_MODULE_1_moment___default()().add(1, 'year')).startDate);
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
				years.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(d.clone()));

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
			if (index !== lastIndex) this.$emit('input', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateStringObject"])(this.academicYears[index]));
		}
	},

	methods: {
		matchIndexWithValue: function matchIndexWithValue(value) {
			var newIndex = this.academicYears.findIndex(function (year) {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["datesEqual"])(year, value);
			});

			if (newIndex !== -1) this.yearIndex = newIndex;
		},

		renderDateRange: __WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["renderDateRange"]
	},

	components: {
		SelectTwo: __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue___default.a
	}
});

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListPaginator_vue__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListPaginator_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ListPaginator_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lunr__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lunr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lunr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_report_utils_js__ = __webpack_require__(118);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		fields: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		items: {
			type: Array,
			required: true
		},
		fieldAccessors: {
			type: Object,
			required: false
		},
		defaultSortBy: {
			type: String,
			required: false
		},
		defaultSortOrder: {
			type: String,
			validator: function validator(order) {
				return ['asc', 'desc'].includes(order);
			},

			default: 'asc'
		},
		paginate: {
			type: Boolean,
			default: true
		},
		reloadable: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			query: null,
			page: 0,
			itemsPerPage: 10,
			sortBy: this.defaultSortBy || this.fields[0],
			sortOrder: this.defaultSortOrder
		};
	},

	computed: {
		itemMap: function itemMap() {
			var map = new Map();
			this.items.map(function (item) {
				map.set(item.id, item);
			});

			return map;
		},
		index: function index() {
			var _this2 = this;

			var fields = this.fields;

			var index = __WEBPACK_IMPORTED_MODULE_1_lunr___default()(function () {
				var _this = this;

				fields.map(function (field) {
					var name = void 0,
					    options = void 0;
					if (typeof field === 'string') {
						name = field;
					} else {
						name = field.name;
						options = field;
					}
					_this.field(name, options);
				});
			});

			this.items.map(function (item) {
				if (_this2.fieldAccessors) {
					for (var field in _this2.fieldAccessors) {
						item[field] = _this2.fieldAccessors[field](item, 'search');
					}
				}
				index.add(item);
			});

			return index;
		},
		filteredItems: function filteredItems() {
			var _this3 = this;

			if (this.query) {
				var refs = this.index.search(this.query);
				return refs.map(function (ref) {
					return _this3.itemMap.get(ref.ref);
				});
			}

			return this.items;
		},
		sortedItems: function sortedItems() {
			var _this4 = this;

			if (this.sortBy && this.sortOrder) {

				return __WEBPACK_IMPORTED_MODULE_3__modules_report_utils_js__["a" /* sortFunctions */].has(this.sortBy) ? this.filteredItems.sort(__WEBPACK_IMPORTED_MODULE_3__modules_report_utils_js__["a" /* sortFunctions */].get(this.sortBy)) : this.filteredItems.sort(function (a, b) {
					var aValue = void 0;
					var bValue = void 0;

					if (_this4.fieldAccessors && _this4.sortBy in _this4.fieldAccessors) {
						aValue = _this4.fieldAccessors[_this4.sortBy](a, 'sort');
						bValue = _this4.fieldAccessors[_this4.sortBy](b, 'sort');
					} else {
						aValue = a[_this4.sortBy];
						bValue = b[_this4.sortBy];
					}

					if (Number.isNaN(aValue)) aValue = aValue.toUpperCase();

					if (Number.isNaN(bValue)) bValue = bValue.toUpperCase();

					if (aValue < bValue) return _this4.sortOrder === 'asc' ? -1 : 1;
					if (aValue > bValue) return _this4.sortOrder === 'asc' ? 1 : -1;
					return 0;
				});
			}

			return this.filteredItems;
		},
		paginatedItems: function paginatedItems() {
			if (!this.paginate) return this.sortedItems;

			var paginatedItems = [];
			var items = this.sortedItems.slice();
			while (items.length > 0) {
				paginatedItems.push(items.splice(0, this.itemsPerPage));
			}return paginatedItems;
		},
		currentPageItems: function currentPageItems() {
			if (!this.paginate) return this.sortedItems;

			return this.paginatedItems[this.page];
		},
		itemsToShow: function itemsToShow() {
			return this.filteredItems && this.filteredItems.length > 0;
		}
	},
	methods: {
		renderFieldName: function renderFieldName(field) {
			if (field === 'id') return 'ID';

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["f" /* snakeCaseToWords */])(field);
		}
	},
	components: {
		ListPaginator: __WEBPACK_IMPORTED_MODULE_0__ListPaginator_vue___default.a
	}
});

/***/ }),
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PaginatorLink_vue__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PaginatorLink_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__PaginatorLink_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		value: Number,
		itemsPerPage: Number,
		paginatedItems: Array
	},
	watch: {
		itemsPerPage: function itemsPerPage() {
			if (this.value >= this.paginatedItems.length) this.setPage(this.paginatedItems.length - 1);
		}
	},
	methods: {
		setPage: function setPage(page) {
			this.$emit('input', page);
		}
	},
	components: {
		PaginatorLink: __WEBPACK_IMPORTED_MODULE_0__PaginatorLink_vue___default.a
	}
});

/***/ }),
/* 143 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		value: Number,
		text: {
			type: String,
			required: false
		},
		active: Boolean
	},
	methods: {
		emitPage: function emitPage() {
			if (!this.active) this.$emit('click', this.value);
		}
	}
});

/***/ }),
/* 144 */,
/* 145 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 146 */,
/* 147 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.2
 * Copyright (C) 2016 Oliver Nightingale
 * @license MIT
 */

;(function(){

/**
 * Convenience function for instantiating a new lunr index and configuring it
 * with the default pipeline functions and the passed config function.
 *
 * When using this convenience function a new index will be created with the
 * following functions already in the pipeline:
 *
 * lunr.StopWordFilter - filters out any stop words before they enter the
 * index
 *
 * lunr.stemmer - stems the tokens before entering the index.
 *
 * Example:
 *
 *     var idx = lunr(function () {
 *       this.field('title', 10)
 *       this.field('tags', 100)
 *       this.field('body')
 *       
 *       this.ref('cid')
 *       
 *       this.pipeline.add(function () {
 *         // some custom pipeline function
 *       })
 *       
 *     })
 *
 * @param {Function} config A function that will be called with the new instance
 * of the lunr.Index as both its context and first parameter. It can be used to
 * customize the instance of new lunr.Index.
 * @namespace
 * @module
 * @returns {lunr.Index}
 *
 */
var lunr = function (config) {
  var idx = new lunr.Index

  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  if (config) config.call(idx, idx)

  return idx
}

lunr.version = "0.7.2"
/*!
 * lunr.utils
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
})(this)

/**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf Utils
 */
lunr.utils.asString = function (obj) {
  if (obj === void 0 || obj === null) {
    return ""
  } else {
    return obj.toString()
  }
}
/*!
 * lunr.EventEmitter
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
 *
 * @constructor
 */
lunr.EventEmitter = function () {
  this.events = {}
}

/**
 * Binds a handler function to a specific event(s).
 *
 * Can bind a single function to many different events in one call.
 *
 * @param {String} [eventName] The name(s) of events to bind this function to.
 * @param {Function} fn The function to call when an event is fired.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.addListener = function () {
  var args = Array.prototype.slice.call(arguments),
      fn = args.pop(),
      names = args

  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

  names.forEach(function (name) {
    if (!this.hasHandler(name)) this.events[name] = []
    this.events[name].push(fn)
  }, this)
}

/**
 * Removes a handler function from a specific event.
 *
 * @param {String} eventName The name of the event to remove this function from.
 * @param {Function} fn The function to remove from an event.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.removeListener = function (name, fn) {
  if (!this.hasHandler(name)) return

  var fnIndex = this.events[name].indexOf(fn)
  this.events[name].splice(fnIndex, 1)

  if (!this.events[name].length) delete this.events[name]
}

/**
 * Calls all functions bound to the given event.
 *
 * Additional data can be passed to the event handler as arguments to `emit`
 * after the event name.
 *
 * @param {String} eventName The name of the event to emit.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.emit = function (name) {
  if (!this.hasHandler(name)) return

  var args = Array.prototype.slice.call(arguments, 1)

  this.events[name].forEach(function (fn) {
    fn.apply(undefined, args)
  })
}

/**
 * Checks whether a handler has ever been stored against an event.
 *
 * @param {String} eventName The name of the event to check.
 * @private
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.hasHandler = function (name) {
  return name in this.events
}

/*!
 * lunr.tokenizer
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @see lunr.tokenizer.separator
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return lunr.utils.asString(t).toLowerCase() })

  // TODO: This exists so that the deprecated property lunr.tokenizer.seperator can still be used. By
  // default it is set to false and so the correctly spelt lunr.tokenizer.separator is used unless
  // the user is using the old property to customise the tokenizer.
  //
  // This should be removed when version 1.0.0 is released.
  var separator = lunr.tokenizer.seperator || lunr.tokenizer.separator

  return obj.toString().trim().toLowerCase().split(separator)
}

/**
 * This property is legacy alias for lunr.tokenizer.separator to maintain backwards compatability.
 * When introduced the token was spelt incorrectly. It will remain until 1.0.0 when it will be removed,
 * all code should use the correctly spelt lunr.tokenizer.separator property instead.
 *
 * @static
 * @see lunr.tokenizer.separator
 * @deprecated since 0.7.2 will be removed in 1.0.0
 * @private
 * @see lunr.tokenizer
 */
lunr.tokenizer.seperator = false

/**
 * The sperator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */
lunr.tokenizer.separator = /[\s\-]+/

/**
 * Loads a previously serialised tokenizer.
 *
 * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
 * If the serialised tokenizer has not been registered then an error will be thrown.
 *
 * @param {String} label The label of the serialised tokenizer.
 * @returns {Function}
 * @memberOf tokenizer
 */
lunr.tokenizer.load = function (label) {
  var fn = this.registeredFunctions[label]

  if (!fn) {
    throw new Error('Cannot load un-registered function: ' + label)
  }

  return fn
}

lunr.tokenizer.label = 'default'

lunr.tokenizer.registeredFunctions = {
  'default': lunr.tokenizer
}

/**
 * Register a tokenizer function.
 *
 * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
 *
 * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
 *
 * @param {Function} fn The function to register.
 * @param {String} label The label to register this function with
 * @memberOf tokenizer
 */
lunr.tokenizer.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing tokenizer: ' + label)
  }

  fn.label = label
  this.registeredFunctions[label] = fn
}
/*!
 * lunr.Pipeline
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = {}

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {Function} fn The function to check for.
 * @param {String} label The label to register this function with
 * @memberOf Pipeline
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {Function} fn The function to check for.
 * @private
 * @memberOf Pipeline
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 * @memberOf Pipeline
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error('Cannot load un-registered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} functions Any number of functions to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0 || token === '') break
    };

    if (token !== void 0 && token !== '') out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  this._magnitude = undefined;
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  if (idx < list.idx) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  var i, element

  for (i = 0; i < arguments.length; i++) {
    element = arguments[i]
    if (~this.indexOf(element)) continue
    this.elements.splice(this.locationFor(element), 0, element)
  }

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem === elem) return pivot

    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem === elem) return pivot

  return -1
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem > elem) return pivot
  if (pivotElem < elem) return pivot + 1
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  for(var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++){
    unionSet.add(shortSetElements[i])
  }

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter
  this.tokenizerFn = lunr.tokenizer

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer))
  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * The value of ref can be of any type but it _must_ be stably comparable and
 * orderable.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Sets the tokenizer used for this index.
 *
 * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
 * should only be changed before adding documents to the index. Changing the tokenizer
 * without re-building the index can lead to unexpected results.
 *
 * @param {Function} fn The function to use as a tokenizer.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.tokenizer = function (fn) {
  var isRegistered = fn.label && (fn.label in lunr.tokenizer.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index')
  }

  this.tokenizerFn = fn
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]))

    docTokens[field.name] = fieldTokens

    for (var i = 0; i < fieldTokens.length; i++) {
      var token = fieldTokens[i]
      allDocumentTokens.add(token)
      this.corpusTokens.add(token)
    }
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = 0;

    for (var j = 0; j < this._fields.length; j++){
      var field = this._fields[j]
      var fieldTokens = docTokens[field.name]
      var fieldLength = fieldTokens.length

      if (!fieldLength) continue

      var tokenCount = 0
      for (var k = 0; k < fieldLength; k++){
        if (fieldTokens[k] === token){
          tokenCount++
        }
      }

      tf += (tokenCount / fieldLength * field.boost)
    }

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.documentStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        // ensuring that the type of key is preserved
        var matchingDocuments = self.tokenStore.get(key),
            refs = Object.keys(matchingDocuments),
            refsLen = refs.length

        for (var i = 0; i < refsLen; i++) {
          set.add(matchingDocuments[refs[i]].ref)
        }

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    tokenizer: this.tokenizerFn.label,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  if (!this.has(id)) this.length++
  this.store[id] = tokens
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2016 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return porterStemmer;
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @module
 * @param {Array} token The token to pass through the filter
 * @returns {Function}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */
lunr.generateStopWordFilter = function (stopWords) {
  var words = stopWords.reduce(function (memo, stopWord) {
    memo[stopWord] = stopWord
    return memo
  }, {})

  return function (token) {
    if (token && words[token] !== token) return token
  }
}

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = lunr.generateStopWordFilter([
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'least',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'most',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your'
])

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token.replace(/^\W+/, '').replace(/\W+$/, '')
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2016 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token.charAt(0),
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return false

    node = node[token.charAt(i)]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return {}

    node = node[token.charAt(i)]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token.charAt(i) in node)) return
    node = node[token.charAt(i)]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})();


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(133),
  /* template */
  __webpack_require__(168),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/AcademicYearSelector.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AcademicYearSelector.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-672cba10", Component.options)
  } else {
    hotAPI.reload("data-v-672cba10", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(145)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(142),
  /* template */
  __webpack_require__(164),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-05c830ce",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ListPaginator.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ListPaginator.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05c830ce", Component.options)
  } else {
    hotAPI.reload("data-v-05c830ce", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(143),
  /* template */
  __webpack_require__(165),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/PaginatorLink.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PaginatorLink.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-115d9766", Component.options)
  } else {
    hotAPI.reload("data-v-115d9766", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(455)
  __webpack_require__(454)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(323),
  /* template */
  __webpack_require__(605),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-1548f2c8",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/Item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1548f2c8", Component.options)
  } else {
    hotAPI.reload("data-v-1548f2c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(189)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(196),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7a8a5f24",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/RichDateRange.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] RichDateRange.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a8a5f24", Component.options)
  } else {
    hotAPI.reload("data-v-7a8a5f24", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', {
    staticClass: "paginator"
  }, [_c('div', {
    staticClass: "form-inline"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tCurrent page:\n\t\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "min": "1",
      "max": _vm.paginatedItems.length
    },
    domProps: {
      "value": _vm.value + 1
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', Number($event.target.value) - 1)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tItems per page:\n\t\t\t\t"), _c('select', {
    staticClass: "form-control",
    domProps: {
      "value": _vm.itemsPerPage
    },
    on: {
      "input": function($event) {
        _vm.$emit('pageSize', Number($event.target.value))
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "5"
    }
  }, [_vm._v("5")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "10"
    }
  }, [_vm._v("10")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "20"
    }
  }, [_vm._v("20")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "50"
    }
  }, [_vm._v("50")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "100"
    }
  }, [_vm._v("100")])])])])]), _vm._v(" "), (_vm.itemsPerPage && _vm.paginatedItems.length > 1) ? _c('nav', [_c('div', {
    staticClass: "btn-group"
  }, [_c('paginator-link', {
    attrs: {
      "value": _vm.value - 1,
      "text": "← Prev",
      "active": _vm.value === 0
    },
    on: {
      "click": _vm.setPage
    }
  }), _vm._v(" "), _vm._l((_vm.paginatedItems), function(pageItems, pageNum) {
    return _c('paginator-link', {
      attrs: {
        "value": pageNum,
        "active": pageNum === _vm.value
      },
      on: {
        "click": _vm.setPage
      }
    })
  }), _vm._v(" "), _c('paginator-link', {
    attrs: {
      "value": _vm.value + 1,
      "text": "Next →",
      "active": _vm.value === _vm.paginatedItems.length - 1
    },
    on: {
      "click": _vm.setPage
    }
  })], 2)]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-05c830ce", module.exports)
  }
}

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "href": "#",
      "disabled": _vm.active
    },
    on: {
      "click": _vm.emitPage
    }
  }, [_vm._v("\n\t" + _vm._s(_vm.text || _vm.value + 1) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-115d9766", module.exports)
  }
}

/***/ }),
/* 166 */,
/* 167 */,
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select-two', {
    attrs: {
      "readonly": _vm.readonly
    },
    model: {
      value: (_vm.yearIndex),
      callback: function($$v) {
        _vm.yearIndex = _vm._n($$v)
      },
      expression: "yearIndex"
    }
  }, _vm._l((_vm.academicYears), function(year, index) {
    return _c('option', {
      domProps: {
        "value": index
      }
    }, [_vm._v("\n\t\t" + _vm._s(_vm.renderDateRange(year.startDate, year.endDate)) + "\n\t")])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-672cba10", module.exports)
  }
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "list-header-controls form-inline"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tSort\n\t\t\t\t"), _c('div', {
    staticClass: "input-group"
  }, [_c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.sortBy),
      expression: "sortBy"
    }],
    staticClass: "form-control",
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.sortBy = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.fields), function(field) {
    return _c('option', {
      domProps: {
        "value": field
      }
    }, [_vm._v("\n\t\t\t\t\t\t\t" + _vm._s(_vm.renderFieldName(field)) + "\n\t\t\t\t\t\t")])
  })), _vm._v(" "), _c('span', {
    staticClass: "input-group-btn"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.sortOrder = _vm.sortOrder === 'asc' ? 'desc' : 'asc'
      }
    }
  }, [(_vm.sortOrder === 'asc') ? _c('span', {
    staticClass: "glyphicon glyphicon-sort-by-alphabet"
  }) : _c('span', {
    staticClass: "glyphicon glyphicon-sort-by-alphabet-alt"
  })])])])])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tSearch\n\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.query),
      expression: "query"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "search",
      "placeholder": "Search"
    },
    domProps: {
      "value": (_vm.query)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.query = $event.target.value
      }
    }
  })])]), _vm._v(" "), (_vm.reloadable) ? _c('div', {
    staticClass: "form-group"
  }, [_c('button', {
    staticClass: "btn btn-default labelless-button",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('reload')
      }
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-refresh"
  })])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "list-container"
  }, [_vm._t("header"), _vm._v(" "), (_vm.itemsToShow) ? _c('ol', {
    staticClass: "list"
  }, [_vm._l((_vm.currentPageItems), function(item) {
    return _vm._t("default", null, null, item)
  })], 2) : _c('p', {
    staticClass: "no-items-text"
  }, [_vm._v("\n\t\t\tNo items to show\n\t\t")]), _vm._v(" "), _vm._t("footer")], 2), _vm._v(" "), (_vm.paginate) ? _c('list-paginator', {
    attrs: {
      "paginatedItems": _vm.paginatedItems,
      "itemsPerPage": _vm.itemsPerPage
    },
    on: {
      "pageSize": function($event) {
        _vm.itemsPerPage = arguments[0]
      }
    },
    model: {
      value: (_vm.page),
      callback: function($$v) {
        _vm.page = $$v
      },
      expression: "page"
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6d54e2f6", module.exports)
  }
}

/***/ }),
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_date_utils_js__ = __webpack_require__(16);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		dates: {
			type: Object,
			required: true
		},
		start: {
			type: String,
			default: 'startDate'
		},
		end: {
			type: String,
			default: 'endDate'
		},
		time: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			hovered: false
		};
	},
	mounted: function mounted() {
		this.$refs.container.addEventListener('mouseenter', this.handleMouseEnter);

		this.$refs.container.addEventListener('mouseleave', this.handleMouseLeave);
	},


	computed: {
		startDate: function startDate() {
			return this.dates[this.start];
		},
		endDate: function endDate() {
			return this.dates[this.end];
		},
		dateString: function dateString() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__modules_date_utils_js__["renderDateRange"])(this.startDate, this.endDate, this.hovered);
		}
	},

	methods: {
		handleMouseEnter: function handleMouseEnter() {
			this.hovered = true;
		},
		handleMouseLeave: function handleMouseLeave() {
			this.hovered = false;
		}
	},

	beforeDestroy: function beforeDestroy() {
		this.$refs.container.removeEventListener('mouseenter', this.handleMouseEnter);

		this.$refs.container.removeEventListener('mouseleave', this.handleMouseLeave);
	}
});

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getCheckedItemCount;
/* harmony export (immutable) */ __webpack_exports__["b"] = sectionIsValid;
/* unused harmony export itemIsValid */
/* unused harmony export questionIsValid */
/* unused harmony export listQuestionIsValid */
/* unused harmony export listItemIsValid */
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function getCheckedItemCount(report) {
	if ('type' in report && report.type === 'item') return report.checked ? 1 : 0;

	var count = 0;

	var prop = 'type' in report && report.type === 'section' ? 'items' : 'pages';

	if (prop in report) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = report[prop][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var item = _step.value;

				count += getCheckedItemCount(item);
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
	}

	return count;
}

function sectionIsValid(section) {
	if (!('items' in section) || section.items.length === 0) return true;

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = section.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var item = _step2.value;

			switch (item.type) {
				case 'section':
					if (!sectionIsValid(item)) return false;
					break;
				case 'item':
					if (!itemIsValid(item)) return false;
					break;
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

	return true;
}

function itemIsValid(item) {
	if (!item.checked || !('questions' in item) || item.questions.length === 0) return true;

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = item.questions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var question = _step3.value;

			if (!questionIsValid(question)) return false;
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

	return true;
}

function questionIsValid(question) {
	if (question.type !== 'list' && !question.required) return true;

	switch (question.type) {
		case 'text':
			if (!question.value) return false;
			break;
		case 'number':
			if (question.value == null) return false;
			if (question.min && question.value < question.min) return false;
			if (question.max && question.value > question.max) return false;
			break;
		case 'checkbox':
		case 'radio':
			{
				var optionChecked = false;
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = question.options[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var option = _step4.value;

						if (option.checked) optionChecked = true;
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}

				if (!optionChecked) return false;
			}
			break;
		case 'list':
			return listQuestionIsValid(question);
	}

	return true;
}

function listQuestionIsValid(list) {
	if (!('items' in list) || list.items.length === 0) return false;

	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = list.items[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var listItem = _step5.value;

			if ('itemProps' in list) {
				var _iteratorNormalCompletion6 = true;
				var _didIteratorError6 = false;
				var _iteratorError6 = undefined;

				try {
					for (var _iterator6 = Object.entries(list.itemProps)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
						var _ref = _step6.value;

						var _ref2 = _slicedToArray(_ref, 2);

						var key = _ref2[0];
						var value = _ref2[1];

						if (listItem[key] !== value) return false;
					}
				} catch (err) {
					_didIteratorError6 = true;
					_iteratorError6 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion6 && _iterator6.return) {
							_iterator6.return();
						}
					} finally {
						if (_didIteratorError6) {
							throw _iteratorError6;
						}
					}
				}
			}

			if (!listItemIsValid(listItem)) return false;
		}
	} catch (err) {
		_didIteratorError5 = true;
		_iteratorError5 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion5 && _iterator5.return) {
				_iterator5.return();
			}
		} finally {
			if (_didIteratorError5) {
				throw _iteratorError5;
			}
		}
	}

	return true;
}

function listItemIsValid(listItem) {
	switch (listItem.type) {
		case 'text':
			if (!listItem.text) return false;
			break;
		case 'publication':
			if (!listItem.title || !listItem.role) return false;
			break;
		case 'committee':
			if (!listItem.name || !listItem.role) return false;
			break;
		case 'study':
			if (!listItem.title || !listItem.role || !listItem.approvalNumber || !listItem.progress) return false;
			break;
		case 'grant':
		case 'grantOther':
			if (!listItem.agency || !listItem.project || listItem.amount == null) return false;
			break;
		case 'certification':
			if (!listItem.board || !listItem.specialty) return false;
			break;
		case 'editorialBoard':
			if (!listItem.journal || !listItem.role) return false;
			break;
		case 'journalReview':
			if (!listItem.journal || !listItem.reviews) return false;
			break;
		case 'lecture':
		case 'audienceLecture':
			if (!listItem.title || !listItem.date || !listItem.audience) return false;
			break;
		case 'mentorship':
			if (!listItem.mentee || !listItem.subject) return false;
			break;
	}

	return true;
}

/***/ }),
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', {
    ref: "container"
  }, [_vm._v("\n\t" + _vm._s(_vm.dateString) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7a8a5f24", module.exports)
  }
}

/***/ }),
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__);


/* harmony default export */ __webpack_exports__["a"] = ({
	data: function data() {
		return {
			alerts: []
		};
	},


	components: {
		AlertList: __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue___default.a
	}
});

/***/ }),
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
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(474)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(309),
  /* template */
  __webpack_require__(632),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6ff62c0e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Report.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Report.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ff62c0e", Component.options)
  } else {
    hotAPI.reload("data-v-6ff62c0e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(473)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(310),
  /* template */
  __webpack_require__(631),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6c389d6a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/ReportListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ReportListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c389d6a", Component.options)
  } else {
    hotAPI.reload("data-v-6c389d6a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(456)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(315),
  /* template */
  __webpack_require__(606),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-16c471bd",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Instruction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Instruction.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-16c471bd", Component.options)
  } else {
    hotAPI.reload("data-v-16c471bd", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 234 */,
/* 235 */,
/* 236 */,
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
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminSupervisorMeritReports;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_UserWithReportListItem_vue__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_UserWithReportListItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_UserWithReportListItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(2);








function createAdminSupervisorMeritReports(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			},
			meritReportTypes: {
				type: Object,
				required: true
			},
			meritReportTypeForms: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {
				usersWithReports: null,
				meritForms: null,

				alerts: []
			};
		},

		propsData: propsData,

		mounted: function mounted() {
			this.fetchUsersWithReports();
			this.fetchMeritForms();
		},


		computed: {},

		methods: {
			fetchUsersWithReports: function fetchUsersWithReports() {
				var _this = this;

				fetch('/merits/by-user', {
					method: 'GET',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["a" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["b" /* jsonOrThrow */]).then(function (usersWithReports) {
					_this.usersWithReports = usersWithReports;
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching users with reports'
					});
				});
			},
			fetchMeritForms: function fetchMeritForms() {
				var _this2 = this;

				fetch('/merit-forms', {
					method: 'GET',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["a" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["b" /* jsonOrThrow */]).then(function (meritForms) {
					_this2.meritForms = meritForms;
				}).catch(function (err) {
					console.error(err);
					_this2.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching merit forms'
					});
				});
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			ComponentList: __WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue___default.a,
			UserWithMeritReportListItem: __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_UserWithReportListItem_vue___default.a
		}
	});
}

/***/ }),
/* 256 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFacultyMeritReports;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_Report_vue__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_Report_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_Report_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_MeritCompensation_ReportListItem_vue__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_MeritCompensation_ReportListItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__vue_components_MeritCompensation_ReportListItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_components_RichDateRange_vue__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_components_RichDateRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__vue_components_RichDateRange_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_utils_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__ = __webpack_require__(16);











function createFacultyMeritReports(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		props: {
			user: {
				type: Object,
				required: true
			},
			meritReportTypes: {
				type: Object,
				required: true
			},
			meritReportTypeForms: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {
				meritForms: null,

				meritCompensationReport: null,

				meritReports: null,

				alerts: []
			};
		},

		propsData: propsData,

		mounted: function mounted() {
			this.fetchMeritForms();
			this.fetchPastMeritReports();
		},


		computed: {
			yearlyFacultyMeritForm: function yearlyFacultyMeritForm() {
				var _this = this;

				if (this.meritReportTypes.faculty_yearly && this.meritReportTypeForms.faculty_yearly && this.meritForms) {
					var forms = Array.slice(this.meritForms);
					forms.sort(function (a, b) {
						return Number(b.version) - Number(a.version);
					});
					return forms.find(function (form) {
						return form.name === _this.meritReportTypeForms.faculty_yearly;
					});
				}
			},
			currentYearlyMeritDateRange: function currentYearlyMeritDateRange() {
				// FIXME
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["isoDateStringObject"])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["academicYearForDate"])(new Date()));
			},
			meritReportFields: function meritReportFields() {
				return ['id', 'form_name'];
			},
			meritReportFieldAccessors: function meritReportFieldAccessors() {
				return {
					'form_name': function form_name(meritReport) {
						return meritReport.form.name;
					}
				};
			},
			meritReportReadonly: function meritReportReadonly() {
				return !['pending', 'open for editing'].includes(this.meritCompensationReport.status);
			},
			needsToStartReport: function needsToStartReport() {
				var _this2 = this;

				if (!this.meritReports || this.meritReports.length === 0) return true;

				return !this.meritReports.some(function (report) {
					var periodDates = {
						startDate: report.period_start,
						endDate: report.period_end
					};

					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["datesEqual"])(periodDates, _this2.currentYearlyMeritDateRange) && report.status === 'complete';
				});
			},
			inProgressReport: function inProgressReport() {
				if (!this.meritReports || this.meritReports.length === 0) return false;

				return this.meritReports.find(function (report) {
					return ['pending', 'open for editing'].includes(report.status);
				});
			}
		},

		methods: {
			fetchPastMeritReports: function fetchPastMeritReports() {
				var _this3 = this;

				var query = $.param({
					where: {
						user_id: this.user.id
					},
					with: {
						form: true
					}
				});

				fetch('/merits?' + query, {
					method: 'GET',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["a" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["b" /* jsonOrThrow */]).then(function (merits) {
					_this3.meritReports = merits;
				}).catch(function (err) {
					console.error(err);
					_this3.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching past merit reports'
					});
				});
			},
			addMeritReport: function addMeritReport() {
				if (!this.yearlyFacultyMeritForm) return;

				var dates = this.currentYearlyMeritDateRange;

				this.meritCompensationReport = {
					period_start: dates.startDate,
					period_end: dates.endDate,
					report: JSON.parse(this.yearlyFacultyMeritForm.form),
					status: 'pending'
				};
			},
			finishMeritReport: function finishMeritReport() {
				this.meritCompensationReport = Object.assign({}, this.inProgressReport);
			},
			fetchMeritForms: function fetchMeritForms() {
				var _this4 = this;

				fetch('/merit-forms', {
					method: 'GET',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["a" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["b" /* jsonOrThrow */]).then(function (meritForms) {
					_this4.meritForms = meritForms;
				}).catch(function (err) {
					console.error(err);
					_this4.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching merit forms'
					});
				});
			},
			handleClose: function handleClose() {
				this.meritCompensationReport = null;
			},
			handleSubmit: function handleSubmit(meritReport) {
				var _this5 = this;

				if (this.meritReportReadonly) return;

				var url = meritReport.id ? '/merits/' + meritReport.id : '/merits';

				var method = 'POST';
				if (meritReport.id) {
					// method = 'PATCH';
					meritReport._method = 'PATCH';
				}

				meritReport.user_id = this.user.id;
				meritReport.form_id = this.yearlyFacultyMeritForm.id;

				fetch(url, {
					method: method,
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["a" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify(meritReport)
				}).then(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["c" /* okOrThrow */]).then(function () {
					_this5.meritCompensationReport = null;
					_this5.fetchPastMeritReports();
				}).catch(function (err) {
					console.error(err);
					_this5.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem saving the report'
					});
				});
			},
			handleViewReport: function handleViewReport(id) {
				this.meritCompensationReport = this.meritReports.find(function (report) {
					return report.id === id;
				});
			},
			viewMostRecentSubmission: function viewMostRecentSubmission() {
				this.meritCompensationReport = this.meritReports[0];
			}
		},

		components: {
			ComponentList: __WEBPACK_IMPORTED_MODULE_2__vue_components_ComponentList_vue___default.a,
			MeritCompensationReport: __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_Report_vue___default.a,
			MeritReportListItem: __WEBPACK_IMPORTED_MODULE_4__vue_components_MeritCompensation_ReportListItem_vue___default.a,
			RichDateRange: __WEBPACK_IMPORTED_MODULE_5__vue_components_RichDateRange_vue___default.a
		}
	});
}

/***/ }),
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
/* 301 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		defaultClass: {
			type: String,
			required: false
		},
		yesClass: {
			type: String,
			required: false
		},
		noClass: {
			type: String,
			required: false
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


	methods: {
		handleConfirm: function handleConfirm() {
			this.$emit('click');
			this.pressed = false;
		}
	}
});

/***/ }),
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Section_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Pager_vue__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Pager_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Questionnaire_Pager_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__ = __webpack_require__(183);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		title: {
			type: String,
			required: true
		},
		pages: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: false
		}
	},

	methods: {
		validatePage: function validatePage(page) {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__["b" /* sectionIsValid */])(page);
		},
		handleInput: function handleInput(pageNum, page) {
			var pages = this.pages.slice();
			pages[pageNum] = Object.assign({}, pages[pageNum], page);

			this.$emit('input', { pages: pages });
		},
		handleSave: function handleSave() {
			this.$emit('save');
		},
		handleSubmit: function handleSubmit() {
			this.$emit('submit');
		},
		handleClose: function handleClose() {
			this.$emit('close');
		}
	},

	components: {
		ChecklistSection: __WEBPACK_IMPORTED_MODULE_0__Section_vue___default.a,
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue___default.a,
		QuestionnairePager: __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Pager_vue___default.a
	}
});

/***/ }),
/* 307 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(30);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'item';
			}
		},
		text: {
			type: String,
			required: true
		},
		checked: {
			type: Boolean,
			default: false
		},
		questions: {
			type: Array,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		subjectReadonly: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: false
		}
	},

	computed: {
		hasQuestions: function hasQuestions() {
			return this.questions && this.questions.length > 0;
		},
		markedUpText: function markedUpText() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.text);
		},
		readonlyToUser: function readonlyToUser() {
			return this.readonly || this.subjectReadonly && (!this.user || this.user.type !== 'admin');
		}
	},

	methods: {
		handleCheck: function handleCheck() {
			if (this.readonlyToUser) return;

			var checked = !this.checked;
			var item = { checked: checked };

			if (!checked && this.questions) {
				var questions = this.questions.map(this.clearQuestion);
				item.questions = questions;
			}

			this.$emit('input', item);
		},
		handleQuestionInput: function handleQuestionInput(index, question) {
			if (this.readonlyToUser) return;

			var questions = this.questions.slice();
			questions[index] = Object.assign({}, questions[index], question);

			this.$emit('input', { questions: questions });
		},
		clearQuestion: function clearQuestion(question) {
			if (this.readonlyToUser) return;

			question = Object.assign({}, question);
			switch (question.type) {
				case 'text':
				case 'number':
					delete question.value;
					break;
				case 'checkbox':
				case 'radio':
					question.options = question.options.map(function (option) {
						return Object.assign({}, option, { checked: false });
					});
					break;
				case 'list':
					delete question.items;
					break;
			}

			return question;
		}
	},

	components: {
		QuestionnaireQuestion: __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue___default.a
	}
});

/***/ }),
/* 308 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__);





/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue___default.a,
	name: 'checklist-section',

	props: {
		user: {
			type: Object,
			required: false
		}
	},

	render: function render(h) {
		var _this = this;

		var items = this.items.map(function (item, index) {
			var componentName = void 0;
			switch (item.type) {
				case 'section':
					componentName = 'checklist-section';
					break;
				case 'instruction':
					componentName = 'questionnaire-instruction';
					break;
				case 'item':
					componentName = 'checklist-item';
					break;
			}

			return h(componentName, {
				props: Object.assign({
					readonly: _this.readonly,
					user: _this.user
				}, item),
				on: {
					input: function input(item) {
						var items = _this.items.slice();
						items[index] = Object.assign({}, items[index], item);

						_this.$emit('input', { items: items });
					}
				}
			});
		});

		if (this.title) items.unshift(h('h1', this.title));

		return h('section', {
			class: {
				page: this.page
			}
		}, items);
	},


	components: {
		ChecklistItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
		QuestionnaireInstruction: __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue___default.a
	}
});

/***/ }),
/* 309 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Checklist_Checklist_vue__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Checklist_Checklist_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Checklist_Checklist_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AcademicYearSelector_vue__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AcademicYearSelector_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__AcademicYearSelector_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__ = __webpack_require__(183);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		id: {
			type: Number,
			required: false
		},
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		},
		status: {
			type: String,
			default: 'pending'
		},
		title: {
			type: String,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},
	data: function data() {
		return {
			dates: {
				startDate: this.period_start,
				endDate: this.period_end
			},
			checklist: this.report
		};
	},


	computed: {
		readonly: function readonly() {
			return !['pending', 'open for editing'].includes(this.status);
		},
		checkedItems: function checkedItems() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__["a" /* getCheckedItemCount */])(this.report);
		}
	},

	methods: {
		handleChecklistInput: function handleChecklistInput(checklist) {
			this.checklist = Object.assign({}, this.checklist, checklist);
		},
		handleSave: function handleSave() {
			this.$emit('save', {
				id: this.id,
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				status: this.status
			});
		},
		handleSubmit: function handleSubmit() {
			this.$emit('submit', {
				id: this.id,
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				status: 'complete'
			});
		},
		handleClose: function handleClose() {
			this.$emit('close');
		}
	},

	components: {
		MeritCompensationChecklist: __WEBPACK_IMPORTED_MODULE_0__Checklist_Checklist_vue___default.a,

		AcademicYearSelector: __WEBPACK_IMPORTED_MODULE_1__AcademicYearSelector_vue___default.a,
		RichDateRange: __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue___default.a
	}
});

/***/ }),
/* 310 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationYesNo_vue__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationYesNo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ConfirmationYesNo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue__ = __webpack_require__(163);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_datatable_utils_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__ = __webpack_require__(183);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		id: {
			type: Number,
			required: true
		},
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		form: {
			type: Object,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},

	computed: {
		userIsAdmin: function userIsAdmin() {
			return this.user && this.user.type === 'admin';
		},
		dates: function dates() {
			return {
				startDate: this.period_start,
				endDate: this.period_end
			};
		},
		viewEditText: function viewEditText() {
			return ['pending', 'open for editing'].includes(this.status) ? 'Complete' : 'View';
		},
		viewEditGlyph: function viewEditGlyph() {
			return ['pending', 'open for editing'].includes(this.status) ? 'glyphicon-pencil' : 'glyphicon-list-alt';
		},
		statusLabel: function statusLabel() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_datatable_utils_js__["a" /* getEvaluationStatusLabel */])(this.status);
		},
		checkedItems: function checkedItems() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__["a" /* getCheckedItemCount */])(this.report);
		}
	},

	methods: {
		ucfirst: __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["d" /* ucfirst */],
		openForEditing: function openForEditing() {
			if (this.user.type !== 'admin' || this.status !== 'complete') return;

			this.updateReport({
				status: 'open for editing'
			});
		},
		closeEditing: function closeEditing() {
			if (this.user.type !== 'admin' || this.status !== 'open for editing') return;

			this.updateReport({
				status: 'complete'
			});
		},
		disableReport: function disableReport() {
			if (this.user.type !== 'admin') return;

			this.updateReport({
				status: 'disabled'
			});
		},
		enableReport: function enableReport() {
			if (this.user.type !== 'admin') return;

			this.updateReport({
				status: 'open for editing'
			});
		},
		updateReport: function updateReport(changes) {
			var _this = this;

			fetch('/merits/' + this.id, {
				method: 'POST', // PATCH
				headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["a" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign(changes, {
					_method: 'PATCH'
				}))
			}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["c" /* okOrThrow */]).then(function () {
				_this.$emit('change');
			}).catch(function (err) {
				console.error(err);
				_this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem updating the merit report'
				});
			});
		}
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default.a,
		ConfirmationYesNo: __WEBPACK_IMPORTED_MODULE_1__ConfirmationYesNo_vue___default.a,
		RichDateRange: __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue___default.a
	}
});

/***/ }),
/* 311 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_mixins_HasAlerts_js__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ComponentList_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ComponentList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ComponentList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ReportListItem_vue__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ReportListItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ReportListItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Report_vue__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Report_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Report_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ __webpack_exports__["default"] = ({
	mixins: [__WEBPACK_IMPORTED_MODULE_0__vue_mixins_HasAlerts_js__["a" /* default */]],
	props: {
		full_name: {
			type: String,
			required: true
		},
		merit_reports: {
			type: Array,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},
	data: function data() {
		return {
			viewedReport: null
		};
	},


	computed: {
		meritReportFields: function meritReportFields() {
			return ['id', 'form_name'];
		},
		meritReportFieldAccessors: function meritReportFieldAccessors() {
			return {
				'form_name': function form_name(meritReport) {
					return meritReport.form.name;
				}
			};
		}
	},

	methods: {
		handleReportClick: function handleReportClick(reportId) {
			this.viewedReport = this.merit_reports.find(function (meritReport) {
				return meritReport.id === reportId;
			});
		},
		handleReportClose: function handleReportClose() {
			this.viewedReport = null;
		},
		handleReportSave: function handleReportSave(changes) {
			var _this = this;

			this.updateReport(changes).then(function () {
				_this.viewedReport = null;
			});
		},
		handleReportSubmit: function handleReportSubmit(changes) {
			var _this2 = this;

			this.updateReport(Object.assign(changes, {
				status: 'complete'
			})).then(function () {
				_this2.viewedReport = null;
			});
		},
		updateReport: function updateReport(changes) {
			var _this3 = this;

			return fetch('/merits/' + changes.id, {
				method: 'POST', // PATCH
				headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["a" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign(changes, {
					_method: 'PATCH'
				}))
			}).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["c" /* okOrThrow */]).then(function () {
				_this3.$emit('change');
			}).catch(function (err) {
				console.error(err);
				_this3.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem updating the merit report'
				});
			});
		}
	},

	components: {
		ComponentList: __WEBPACK_IMPORTED_MODULE_1__ComponentList_vue___default.a,
		MeritReportListItem: __WEBPACK_IMPORTED_MODULE_2__ReportListItem_vue___default.a,
		MeritReport: __WEBPACK_IMPORTED_MODULE_3__Report_vue___default.a
	}
});

/***/ }),
/* 312 */,
/* 313 */,
/* 314 */
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		type: {
			type: String,
			default: 'bar'
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		stepName: {
			type: String,
			default: 'Page'
		}
	},

	computed: {
		label: function label() {
			return this.stepName + ' ' + this.value + ' of ' + this.max;
		}
	}
});

/***/ }),
/* 315 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown__ = __webpack_require__(30);
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'instruction';
			}
		},
		text: {
			type: String,
			required: true
		}
	},

	computed: {
		markedUpText: function markedUpText() {
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_snarkdown__["a" /* default */])(this.text);
		}
	}
});

/***/ }),
/* 316 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PagerControls_vue__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PagerControls_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__PagerControls_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_dom_utils_js__ = __webpack_require__(354);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		pages: {
			type: Array,
			required: true
		},
		pageValidator: {
			type: Function,
			default: function _default() {
				return true;
			}
		},
		submitText: {
			type: String,
			default: 'Submit'
		},
		forwardText: {
			type: String,
			default: 'Next page'
		},
		backText: {
			type: String,
			default: 'Back'
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			currentPage: 0
		};
	},


	computed: {
		page: function page() {
			return this.pages[this.currentPage];
		},
		canGoBackPage: function canGoBackPage() {
			return this.currentPage > 0;
		},
		canAdvancePage: function canAdvancePage() {
			return this.pageValidator(this.pages[this.currentPage]);
		}
	},

	methods: {
		scrollToTop: function scrollToTop() {
			$(this.$refs.pager).velocity('scroll', {
				offset: -1 * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__modules_dom_utils_js__["a" /* getHeaderHeight */])()
			});
		},
		scrollToBottom: function scrollToBottom() {
			$(this.$refs.pager).velocity('scroll', {
				offset: this.$refs.pager.clientHeight - window.innerHeight
			});
		},
		goBack: function goBack() {
			if (this.canGoBackPage) {
				this.scrollToTop();
				this.currentPage--;
			}
		},
		advance: function advance() {
			if (this.canAdvancePage) {
				this.scrollToTop();
				this.currentPage++;
			}
		},
		submit: function submit() {
			if (this.canAdvancePage) this.$emit('submit');
		}
	},

	components: {
		PagerControls: __WEBPACK_IMPORTED_MODULE_0__PagerControls_vue___default.a
	}
});

/***/ }),
/* 317 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressBullets_vue__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressBullets_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ProgressBullets_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		currentPage: {
			type: Number,
			required: true
		},
		totalPages: {
			type: Number,
			required: true
		},
		submitText: {
			type: String,
			default: 'Submit'
		},
		forwardText: {
			type: String,
			default: 'Next page'
		},
		backText: {
			type: String,
			default: 'Back'
		},
		canGoBackPage: {
			type: Boolean,
			required: true
		},
		canAdvancePage: {
			type: Boolean,
			required: true
		},
		readonly: {
			type: Boolean,
			required: true
		}
	},

	computed: {},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default.a,
		ProgressBullets: __WEBPACK_IMPORTED_MODULE_1__ProgressBullets_vue___default.a
	}
});

/***/ }),
/* 318 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(30);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	model: {
		prop: 'options'
	},
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'checkbox';
			}
		},
		text: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: true
		},
		required: {
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
			show: {
				description: false
			}
		};
	},


	computed: {
		markedUpDescription: function markedUpDescription() {
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		},
		hasResponse: function hasResponse() {
			return this.options.some(function (option) {
				return option.checked;
			});
		}
	},

	methods: {
		handleCheck: function handleCheck(index) {
			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], {
				checked: !options[index].checked
			});

			this.$emit('input', { options: options });
		},
		handleEditableOptionInput: function handleEditableOptionInput(index, value) {
			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], { text: value, value: value });

			this.$emit('input', { options: options });
		},

		snarkdown: __WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */]
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
});

/***/ }),
/* 319 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'certification';
			}
		},
		board: {
			type: String,
			default: ''
		},
		specialty: {
			type: String,
			default: ''
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a
	}
});

/***/ }),
/* 320 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'committee';
			}
		},
		name: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		ucfirst: __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["d" /* ucfirst */]
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default.a
	}
});

/***/ }),
/* 321 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'editorialBoard';
			}
		},
		journal: {
			type: String,
			default: ''
		},
		role: {
			type: String
		}
	},
	data: function data() {
		return {
			otherRole: ''
		};
	},


	computed: {
		predefinedRoles: function predefinedRoles() {
			return ['editor-in-chief', 'associate-editor', 'executive-editor', 'statistical-editor'];
		}
	},

	methods: {
		kebabCaseToWords: __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["e" /* kebabCaseToWords */],
		handleCheck: function handleCheck(event) {
			if (this.readonly) return;

			this.$emit('input', { role: event.target.value });
		},
		handleOtherCheck: function handleOtherCheck() {
			if (this.readonly) return;

			this.$emit('input', { role: this.otherRole });
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a
	}
});

/***/ }),
/* 322 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return ['grant', 'grantOther'].includes(type);
			}
		},
		agency: {
			type: String,
			default: ''
		},
		project: {
			type: String,
			default: ''
		},
		amount: {
			type: Number,
			default: 0
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a
	}
});

/***/ }),
/* 323 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		readonly: {
			type: Boolean,
			default: false
		}
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default.a
	}
});

/***/ }),
/* 324 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextItem_vue__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__TextItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PublicationItem_vue__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PublicationItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__PublicationItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CommitteeItem_vue__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CommitteeItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__CommitteeItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OngoingStudyItem_vue__ = __webpack_require__(581);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OngoingStudyItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__OngoingStudyItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GrantItem_vue__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GrantItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__GrantItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CertificationItem_vue__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CertificationItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__CertificationItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EditorialBoardItem_vue__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EditorialBoardItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__EditorialBoardItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__JournalReviewItem_vue__ = __webpack_require__(579);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__JournalReviewItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__JournalReviewItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__LectureItem_vue__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__LectureItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__LectureItem_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__MentorshipItem_vue__ = __webpack_require__(656);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__MentorshipItem_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__MentorshipItem_vue__);












/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		items: {
			type: Array,
			required: true
		},
		ordered: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	render: function render(h) {
		var _this = this;

		var listEl = this.ordered ? 'ol' : 'ul';
		return h(listEl, this.items.map(function (item, index) {
			var itemComponent = _this.getItemComponent(item.type);

			return h(itemComponent, {
				props: Object.assign({
					readonly: _this.readonly
				}, item),
				on: {
					input: function input(item) {
						var items = Array.slice(_this.items);
						items[index] = Object.assign({}, items[index], item);

						_this.$emit('change', items);
					},
					remove: function remove() {
						var items = Array.slice(_this.items);
						items.splice(index, 1);

						_this.$emit('change', items);
					}
				}
			});
		}));
	},


	methods: {
		getItemComponent: function getItemComponent(type) {
			switch (type) {
				case 'text':
					return 'text-item';
				case 'publication':
					return 'publication-item';
				case 'committee':
					return 'committee-item';
				case 'study':
					return 'ongoing-study-item';
				case 'grant':
				case 'grantOther':
					return 'grant-item';
				case 'certification':
					return 'certification-item';
				case 'editorialBoard':
					return 'editorial-board-item';
				case 'journalReview':
					return 'journal-review-item';
				case 'lecture':
				case 'audienceLecture':
					return 'lecture-item';
				case 'mentorship':
					return 'mentorship-item';
			}
		}
	},

	components: {
		TextItem: __WEBPACK_IMPORTED_MODULE_0__TextItem_vue___default.a,
		PublicationItem: __WEBPACK_IMPORTED_MODULE_1__PublicationItem_vue___default.a,
		CommitteeItem: __WEBPACK_IMPORTED_MODULE_2__CommitteeItem_vue___default.a,
		OngoingStudyItem: __WEBPACK_IMPORTED_MODULE_3__OngoingStudyItem_vue___default.a,
		GrantItem: __WEBPACK_IMPORTED_MODULE_4__GrantItem_vue___default.a,
		CertificationItem: __WEBPACK_IMPORTED_MODULE_5__CertificationItem_vue___default.a,
		EditorialBoardItem: __WEBPACK_IMPORTED_MODULE_6__EditorialBoardItem_vue___default.a,
		JournalReviewItem: __WEBPACK_IMPORTED_MODULE_7__JournalReviewItem_vue___default.a,
		LectureItem: __WEBPACK_IMPORTED_MODULE_8__LectureItem_vue___default.a,
		MentorshipItem: __WEBPACK_IMPORTED_MODULE_9__MentorshipItem_vue___default.a
	}
});

/***/ }),
/* 325 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'journalReview';
			}
		},
		journal: {
			type: String,
			default: ''
		},
		reviews: {
			type: Number,
			default: 0
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a
	}
});

/***/ }),
/* 326 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Items_vue__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Items_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Items_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BootstrapAlert_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BootstrapAlert_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__BootstrapAlert_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snarkdown__ = __webpack_require__(30);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ __webpack_exports__["default"] = ({
	model: {
		prop: 'items'
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'list';
			}
		},
		listType: {
			type: String,
			required: true,
			validator: function validator(type) {
				return ['text', 'publication', 'committee', 'study', 'grant', 'grantOther', 'certification', 'editorialBoard', 'journalReview', 'lecture', 'audienceLecture', 'mentorship'].includes(type);
			}
		},
		text: {
			type: String,
			required: false
		},
		description: {
			type: String,
			required: false
		},
		itemProps: {
			type: Object,
			required: false
		},
		items: {
			type: Array,
			default: function _default() {
				return [];
			}
		},
		ordered: {
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
			show: {
				description: false
			}
		};
	},


	computed: {
		itemCount: function itemCount() {
			return this.items.length;
		},
		markedUpDescription: function markedUpDescription() {
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		addItem: function addItem() {
			if (this.readonly) return;

			var items = Array.slice(this.items);

			var newItem = {
				type: this.listType
			};

			if (this.itemProps) {
				Object.assign(newItem, this.itemProps);
			}

			items.push(newItem);

			this.$emit('input', { items: items });
		},
		onChange: function onChange(items) {
			if (this.readonly) return;

			this.$emit('input', { items: items });
		},

		snarkdown: __WEBPACK_IMPORTED_MODULE_3_snarkdown__["a" /* default */]
	},

	components: {
		ListItems: __WEBPACK_IMPORTED_MODULE_0__Items_vue___default.a,
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_1__BootstrapAlert_vue___default.a,
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue___default.a
	}
});

/***/ }),
/* 327 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'study';
			}
		},
		title: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		approvalNumber: {
			type: String,
			default: ''
		},
		progress: {
			type: String,
			default: ''
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a
	}
});

/***/ }),
/* 328 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	model: {
		prop: 'text'
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'publication';
			}
		},
		title: {
			type: String,
			default: ''
		},
		author: {
			type: String,
			default: ''
		},
		link: {
			type: String,
			default: ''
		},
		role: {
			type: String,
			default: ''
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default.a
	}
});

/***/ }),
/* 329 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
	model: {
		prop: 'text'
	},
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'text';
			}
		},
		text: {
			type: String,
			default: ''
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue___default.a
	}
});

/***/ }),
/* 330 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(30);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'number';
			}
		},
		text: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		min: {
			type: Number,
			required: false
		},
		max: {
			type: Number,
			required: false
		},
		properties: {
			type: Array,
			required: false
		},
		value: {
			type: Number,
			default: null
		},
		required: {
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
			show: {
				description: false
			}
		};
	},


	computed: {
		markedUpDescription: function markedUpDescription() {
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', { value: Number(event.target.value) });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
});

/***/ }),
/* 331 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_vue__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Text_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Number_vue__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Number_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Number_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Checkbox_vue__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Checkbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Checkbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Radio_vue__ = __webpack_require__(586);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Radio_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Radio_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__List_List_vue__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__List_List_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__List_List_vue__);







/* harmony default export */ __webpack_exports__["default"] = ({
	model: {
		prop: 'question'
	},
	props: {
		question: {
			type: Object,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	render: function render(h) {
		var _this = this;

		var type = void 0;
		if (this.question.type === 'textarea') type = 'text';else type = this.question.type;

		var questionComponent = type + '-question';

		return h(questionComponent, {
			props: Object.assign({
				readonly: this.readonly
			}, this.question),
			on: {
				input: function input(question) {
					_this.$emit('input', question);
				}
			}
		});
	},


	components: {
		TextQuestion: __WEBPACK_IMPORTED_MODULE_0__Text_vue___default.a,
		NumberQuestion: __WEBPACK_IMPORTED_MODULE_1__Number_vue___default.a,
		CheckboxQuestion: __WEBPACK_IMPORTED_MODULE_2__Checkbox_vue___default.a,
		RadioQuestion: __WEBPACK_IMPORTED_MODULE_3__Radio_vue___default.a,
		ListQuestion: __WEBPACK_IMPORTED_MODULE_4__List_List_vue___default.a
	}
});

/***/ }),
/* 332 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(30);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	model: {
		prop: 'options'
	},
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'radio';
			}
		},
		text: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: true
		},
		required: {
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
			show: {
				description: false
			}
		};
	},


	computed: {
		markedUpDescription: function markedUpDescription() {
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		},
		hasResponse: function hasResponse() {
			return this.options.some(function (option) {
				return option.checked;
			});
		}
	},

	methods: {
		handleCheck: function handleCheck(index) {
			var options = this.options.map(function (option, i) {
				var newOption = Object.assign({}, option);

				newOption.checked = i === index;

				return newOption;
			});

			this.$emit('input', { options: options });
		},
		handleEditableOptionInput: function handleEditableOptionInput(index, value) {
			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], { text: value, value: value });

			this.$emit('input', { options: options });
		},

		snarkdown: __WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */]
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
});

/***/ }),
/* 333 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(30);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return ['text', 'textarea'].includes(type);
			}
		},
		text: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		value: {
			type: String,
			default: ''
		},
		required: {
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
			show: {
				description: false
			}
		};
	},


	computed: {
		markedUpDescription: function markedUpDescription() {
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', { value: event.target.value });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
});

/***/ }),
/* 334 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Instruction_vue__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Instruction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Instruction_vue__);



/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'questionnaire-section',
	model: {
		prop: 'items'
	},
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'section';
			}
		},
		title: {
			type: String,
			required: false
		},
		items: {
			type: Array,
			required: true
		},
		page: {
			type: Boolean,
			default: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	render: function render(h) {
		var _this = this;

		var items = this.items.map(function (item, index) {
			var componentName = 'question-' + item.type;

			return h(componentName, {
				props: Object.assign({
					readonly: _this.readonly
				}, item),
				on: {
					input: function input(item) {
						var items = _this.items.slice();
						items[index] = Object.assign({}, items[index], item);

						_this.$emit('input', { items: items });
					}
				}
			});
		});

		if (this.title) items.unshift(h('h1', this.title));

		return h('section', {
			class: {
				page: this.page
			}
		}, items);
	},


	components: {
		QuestionnaireInstruction: __WEBPACK_IMPORTED_MODULE_0__Instruction_vue___default.a
	}
});

/***/ }),
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
/* 354 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getHeaderHeight;
function getHeaderHeight() {
	return document.querySelector('#main-navbar').clientHeight;
}

/***/ }),
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_supervisor_js__ = __webpack_require__(255);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminSupervisorMeritReports", function() { return __WEBPACK_IMPORTED_MODULE_0__admin_supervisor_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__faculty_js__ = __webpack_require__(256);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFacultyMeritReports", function() { return __WEBPACK_IMPORTED_MODULE_1__faculty_js__["a"]; });



/***/ }),
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
/* 449 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 450 */,
/* 451 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 452 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 453 */,
/* 454 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 455 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 456 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 457 */,
/* 458 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 472 */,
/* 473 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 474 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 475 */,
/* 476 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 477 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 478 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 479 */,
/* 480 */,
/* 481 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 482 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 483 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 484 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 485 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
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
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(301),
  /* template */
  __webpack_require__(642),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ConfirmationYesNo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ConfirmationYesNo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1d823e4", Component.options)
  } else {
    hotAPI.reload("data-v-c1d823e4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(451)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(306),
  /* template */
  __webpack_require__(601),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-08bc7d30",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checklist.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-08bc7d30", Component.options)
  } else {
    hotAPI.reload("data-v-08bc7d30", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 566 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(449)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(307),
  /* template */
  __webpack_require__(598),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-024c0c7e",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Item.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-024c0c7e", Component.options)
  } else {
    hotAPI.reload("data-v-024c0c7e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 567 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(485)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(308),
  /* template */
  null,
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a8188cb2",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8188cb2", Component.options)
  } else {
    hotAPI.reload("data-v-a8188cb2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 568 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(311),
  /* template */
  __webpack_require__(603),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/UserWithReportListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] UserWithReportListItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-142bf50a", Component.options)
  } else {
    hotAPI.reload("data-v-142bf50a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 569 */,
/* 570 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(478)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(314),
  /* template */
  __webpack_require__(635),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7b09133f",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ProgressBullets.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProgressBullets.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b09133f", Component.options)
  } else {
    hotAPI.reload("data-v-7b09133f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 571 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(484)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(316),
  /* template */
  __webpack_require__(640),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-a814e09c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Pager.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Pager.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a814e09c", Component.options)
  } else {
    hotAPI.reload("data-v-a814e09c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 572 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(481)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(317),
  /* template */
  __webpack_require__(637),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8aa3b4f0",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/PagerControls.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PagerControls.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8aa3b4f0", Component.options)
  } else {
    hotAPI.reload("data-v-8aa3b4f0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 573 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(452)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(318),
  /* template */
  __webpack_require__(602),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-098680db",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checkbox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-098680db", Component.options)
  } else {
    hotAPI.reload("data-v-098680db", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 574 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(319),
  /* template */
  __webpack_require__(620),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/CertificationItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CertificationItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c141f98", Component.options)
  } else {
    hotAPI.reload("data-v-3c141f98", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 575 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(471)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(320),
  /* template */
  __webpack_require__(629),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6233e112",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/CommitteeItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CommitteeItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6233e112", Component.options)
  } else {
    hotAPI.reload("data-v-6233e112", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 576 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(458)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(321),
  /* template */
  __webpack_require__(609),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2186235b",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/EditorialBoardItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditorialBoardItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2186235b", Component.options)
  } else {
    hotAPI.reload("data-v-2186235b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 577 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(322),
  /* template */
  __webpack_require__(639),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/GrantItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] GrantItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a6890cd4", Component.options)
  } else {
    hotAPI.reload("data-v-a6890cd4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 578 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(324),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/Items.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c7e23f2", Component.options)
  } else {
    hotAPI.reload("data-v-8c7e23f2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 579 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(325),
  /* template */
  __webpack_require__(626),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/JournalReviewItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] JournalReviewItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56c9b82e", Component.options)
  } else {
    hotAPI.reload("data-v-56c9b82e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 580 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(326),
  /* template */
  __webpack_require__(597),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/List.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] List.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-013e02b2", Component.options)
  } else {
    hotAPI.reload("data-v-013e02b2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 581 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(327),
  /* template */
  __webpack_require__(624),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/OngoingStudyItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] OngoingStudyItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a5fb36c", Component.options)
  } else {
    hotAPI.reload("data-v-4a5fb36c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 582 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(483)
  __webpack_require__(482)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(328),
  /* template */
  __webpack_require__(638),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9ce3a934",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/PublicationItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] PublicationItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ce3a934", Component.options)
  } else {
    hotAPI.reload("data-v-9ce3a934", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 583 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(477)
  __webpack_require__(476)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(329),
  /* template */
  __webpack_require__(634),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-737a1269",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/TextItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] TextItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-737a1269", Component.options)
  } else {
    hotAPI.reload("data-v-737a1269", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 584 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(330),
  /* template */
  __webpack_require__(608),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Number.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Number.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fd00d61", Component.options)
  } else {
    hotAPI.reload("data-v-1fd00d61", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 585 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(331),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Question.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61cad77e", Component.options)
  } else {
    hotAPI.reload("data-v-61cad77e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 586 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(466)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(332),
  /* template */
  __webpack_require__(619),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-3b7f8513",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Radio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Radio.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b7f8513", Component.options)
  } else {
    hotAPI.reload("data-v-3b7f8513", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 587 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(333),
  /* template */
  __webpack_require__(614),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Text.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3340e545", Component.options)
  } else {
    hotAPI.reload("data-v-3340e545", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 588 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(334),
  /* template */
  null,
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c066414", Component.options)
  } else {
    hotAPI.reload("data-v-6c066414", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [(_vm.text || _vm.itemCount) ? _c('legend', [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t\t" + _vm._s(_vm.text && _vm.itemCount != null ? '-' : '') + "\n\t\t\t"), _c('span', [_vm._v("\n\t\t\t\t" + _vm._s(_vm.itemCount) + "\n\t\t\t\t" + _vm._s(_vm.itemCount === 1 ? 'item' : 'items') + "\n\t\t\t")])]) : _vm._e(), _vm._v(" "), (_vm.items.length === 0) ? _c('bootstrap-alert', {
    attrs: {
      "type": "warning",
      "text": "Please add at least one item"
    }
  }) : _vm._e(), _vm._v(" "), _c('list-items', {
    attrs: {
      "ordered": _vm.ordered,
      "items": _vm.items,
      "readonly": _vm.readonly
    },
    on: {
      "change": _vm.onChange
    }
  }), _vm._v(" "), (!_vm.readonly) ? _c('button', {
    staticClass: "btn btn-sm btn-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.addItem
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-plus"
  }), _vm._v("\n\t\t\tAdd item\n\t\t")]) : _vm._e()], 1), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }],
    domProps: {
      "innerHTML": _vm._s(_vm.markedUpDescription)
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-013e02b2", module.exports)
  }
}

/***/ }),
/* 598 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checklist-item",
    class: {
      checked: _vm.checked, readonly: _vm.readonly, editable: !_vm.readonlyToUser
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "disabled": _vm.readonlyToUser
    },
    domProps: {
      "checked": _vm.checked
    },
    on: {
      "change": _vm.handleCheck
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "item-text",
    domProps: {
      "innerHTML": _vm._s(_vm.markedUpText)
    }
  })]), _vm._v(" "), (_vm.checked && _vm.hasQuestions) ? _c('div', {
    staticClass: "item-questions"
  }, _vm._l((_vm.questions), function(question, index) {
    return _c('questionnaire-question', {
      attrs: {
        "question": question,
        "readonly": _vm.readonlyToUser
      },
      on: {
        "input": function($event) {
          _vm.handleQuestionInput(index, arguments[0])
        }
      }
    })
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-024c0c7e", module.exports)
  }
}

/***/ }),
/* 599 */,
/* 600 */,
/* 601 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checklist"
  }, [_c('h1', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('questionnaire-pager', {
    attrs: {
      "pages": _vm.pages,
      "readonly": _vm.readonly,
      "page-validator": _vm.validatePage
    },
    on: {
      "submit": _vm.handleSubmit
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(pager) {
        return [_c('checklist-section', _vm._b({
          attrs: {
            "page": true,
            "readonly": _vm.readonly,
            "user": _vm.user
          },
          on: {
            "input": function($event) {
              _vm.handleInput(pager.pageNum, arguments[0])
            }
          }
        }, 'checklist-section', pager.page))]
      }
    }])
  }), _vm._v(" "), _c('div', {
    staticClass: "text-center"
  }, [(_vm.readonly) ? _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleClose
    }
  }, [_vm._v("\n\t\t\tClose\n\t\t")]) : _c('confirmation-button', {
    staticClass: "btn btn-default",
    attrs: {
      "pressed-class": "btn btn-warning"
    },
    on: {
      "click": _vm.handleClose
    }
  }, [_vm._v("\n\t\t\tClose\n\t\t\t"), _c('template', {
    slot: "pressed"
  }, [_vm._v("\n\t\t\t\tYes, close without saving\n\t\t\t")])], 2), _vm._v(" "), (!_vm.readonly) ? _c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleSave
    }
  }, [_vm._v("\n\t\t\tSave and close\n\t\t")]) : _vm._e()], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-08bc7d30", module.exports)
  }
}

/***/ }),
/* 602 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checkbox-question form-group",
    class: {
      'has-warning': (_vm.required && !_vm.hasResponse)
    }
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [_c('legend', [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "options"
  }, _vm._l((_vm.options), function(option, index) {
    return _c('label', {
      attrs: {
        "title": option.description
      }
    }, [_c('input', {
      attrs: {
        "type": "checkbox",
        "disabled": _vm.readonly
      },
      domProps: {
        "value": option.value,
        "checked": option.checked
      },
      on: {
        "change": function($event) {
          _vm.handleCheck(index)
        }
      }
    }), _vm._v(" "), (option.editable) ? _c('input', {
      staticClass: "form-control",
      attrs: {
        "type": "text",
        "placholder": "Other"
      },
      domProps: {
        "value": option.text
      },
      on: {
        "click": function($event) {
          _vm.handleCheck(index)
        },
        "input": function($event) {
          _vm.handleEditableOptionInput(index, $event.target.value)
        }
      }
    }) : [_vm._v("\n\t\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t\t")], _vm._v(" "), (option.description) ? _c('div', {
      staticClass: "question-description",
      domProps: {
        "innerHTML": _vm._s(_vm.snarkdown(option.description))
      }
    }) : _vm._e()], 2)
  }))]), _vm._v(" "), (_vm.required && !_vm.hasResponse) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\tPlease select at least one response\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-098680db", module.exports)
  }
}

/***/ }),
/* 603 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user-with-report-list-item"
  }, [_c('div', {
    staticClass: "panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-2"
  }, [_c('h3', [_vm._v(_vm._s(_vm.full_name))])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-10"
  }, [_c('component-list', {
    attrs: {
      "fields": _vm.meritReportFields,
      "items": _vm.merit_reports,
      "field-accessors": _vm.meritReportFieldAccessors,
      "paginate": false,
      "default-sort-order": "desc"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(item) {
        return [_c('merit-report-list-item', _vm._b({
          attrs: {
            "user": _vm.user
          },
          on: {
            "click": _vm.handleReportClick,
            "change": function($event) {
              _vm.$emit('change')
            }
          }
        }, 'merit-report-list-item', item))]
      }
    }])
  })], 1)]), _vm._v(" "), (_vm.viewedReport) ? _c('div', {
    staticClass: "row"
  }, [_c('merit-report', _vm._b({
    attrs: {
      "title": _vm.viewedReport.form.name,
      "user": _vm.user
    },
    on: {
      "close": _vm.handleReportClose,
      "save": _vm.handleReportSave,
      "submit": _vm.handleReportSubmit
    }
  }, 'merit-report', _vm.viewedReport))], 1) : _vm._e(), _vm._v(" "), _c('alert-list', {
    model: {
      value: (_vm.alerts),
      callback: function($$v) {
        _vm.alerts = $$v
      },
      expression: "alerts"
    }
  })], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-142bf50a", module.exports)
  }
}

/***/ }),
/* 604 */,
/* 605 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "questionnaire-list-item"
  }, [_c('div', {
    staticClass: "item-controls"
  }, [(!_vm.readonly) ? _c('confirmation-button', {
    staticClass: "btn btn-sm",
    attrs: {
      "unpressed-class": "btn-danger",
      "pressed-class": "btn-warning"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-remove"
  }), _vm._v("\n\t\t\tRemove item\n\t\t")]) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "item-contents"
  }, [_vm._t("default")], 2)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1548f2c8", module.exports)
  }
}

/***/ }),
/* 606 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "instruction-block",
    domProps: {
      "innerHTML": _vm._s(_vm.markedUpText)
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16c471bd", module.exports)
  }
}

/***/ }),
/* 607 */,
/* 608 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label",
    class: {
      'has-warning': _vm.required && !_vm.value
    },
    attrs: {
      "title": _vm.description
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "min": _vm.min,
      "max": _vm.max,
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onInput
    }
  })]), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }],
    domProps: {
      "innerHTML": _vm._s(_vm.markedUpDescription)
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1fd00d61", module.exports)
  }
}

/***/ }),
/* 609 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list-item', {
    attrs: {
      "readonly": _vm.readonly
    },
    on: {
      "remove": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.journal
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tJournal\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.journal
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          journal: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.journal) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the journal name or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.role
    }
  }, [_c('fieldset', {
    staticClass: "radio-question"
  }, [_c('legend', [_vm._v("\n\t\t\t\tRole\n\t\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "options"
  }, [_vm._l((_vm.predefinedRoles), function(predefinedRole) {
    return _c('label', [_c('input', {
      attrs: {
        "type": "radio",
        "readonly": _vm.readonly
      },
      domProps: {
        "value": predefinedRole,
        "checked": _vm.role === predefinedRole
      },
      on: {
        "change": _vm.handleCheck
      }
    }), _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.kebabCaseToWords(predefinedRole)) + "\n\t\t\t\t")])
  }), _vm._v(" "), _c('label', [_c('input', {
    attrs: {
      "type": "radio",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.otherRole,
      "checked": _vm.role === _vm.otherRole
    },
    on: {
      "change": _vm.handleCheck
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.otherRole),
      expression: "otherRole"
    }],
    staticClass: "form-control editable-option-text",
    attrs: {
      "type": "text",
      "placeholder": "Other",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": (_vm.otherRole)
    },
    on: {
      "click": _vm.handleOtherCheck,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.otherRole = $event.target.value
      }
    }
  })])], 2)]), _vm._v(" "), (!_vm.role) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease select a role or remove this list item\n\t\t")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2186235b", module.exports)
  }
}

/***/ }),
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label",
    class: {
      'has-warning': (_vm.required && !_vm.value)
    },
    attrs: {
      "title": _vm.description
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t\t"), (_vm.type === 'texarea') ? _c('textarea', {
    staticClass: "form-control",
    attrs: {
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onInput
    }
  }) : _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onInput
    }
  })]), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }],
    domProps: {
      "innerHTML": _vm._s(_vm.markedUpDescription)
    }
  }) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3340e545", module.exports)
  }
}

/***/ }),
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "radio-question form-group",
    class: {
      'has-warning': (_vm.required && !_vm.hasResponse)
    }
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [_c('legend', {
    staticClass: "control-label"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "options"
  }, _vm._l((_vm.options), function(option, index) {
    return _c('label', {
      attrs: {
        "title": option.description
      }
    }, [_c('input', {
      attrs: {
        "type": "radio",
        "disabled": _vm.readonly
      },
      domProps: {
        "value": option.value,
        "checked": option.checked
      },
      on: {
        "change": function($event) {
          _vm.handleCheck(index)
        }
      }
    }), _vm._v(" "), (option.editable) ? _c('input', {
      staticClass: "form-control editable-option-text",
      attrs: {
        "type": "text",
        "placholder": "Other"
      },
      domProps: {
        "value": option.text
      },
      on: {
        "click": function($event) {
          _vm.handleCheck(index)
        },
        "input": function($event) {
          _vm.handleEditableOptionInput(index, $event.target.value)
        }
      }
    }) : [_vm._v("\n\t\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t\t")], _vm._v(" "), (option.description) ? _c('div', {
      staticClass: "question-description",
      domProps: {
        "innerHTML": _vm._s(_vm.snarkdown(option.description))
      }
    }) : _vm._e()], 2)
  }))]), _vm._v(" "), (_vm.required && !_vm.hasResponse) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\tPlease select a response\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3b7f8513", module.exports)
  }
}

/***/ }),
/* 620 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list-item', {
    attrs: {
      "readonly": _vm.readonly
    },
    on: {
      "remove": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.board
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tBoard\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.board
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          board: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.board) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the certifying board or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.specialty
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tSpecialty\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.specialty
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          specialty: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.specialty) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the certification specialty or remove this list item\n\t\t")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3c141f98", module.exports)
  }
}

/***/ }),
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list-item', {
    attrs: {
      "readonly": _vm.readonly
    },
    on: {
      "remove": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.title
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tStudy title\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.title
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          title: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.title) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the study title or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.role
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tYour role in study\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.role
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          role: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.role) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease describe your role or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.approvalNumber
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tApproval number (IRB / ACUC)\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.approvalNumber
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          approvalNumber: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.approvalNumber) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the study approval number or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.progress
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tProgress\n\t\t\t"), _c('textarea', {
    staticClass: "form-control",
    attrs: {
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.progress
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          progress: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.progress) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease describe the study's progress or remove this list item\n\t\t")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4a5fb36c", module.exports)
  }
}

/***/ }),
/* 625 */,
/* 626 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list-item', {
    attrs: {
      "readonly": _vm.readonly
    },
    on: {
      "remove": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.journal
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tJournal\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.journal
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          journal: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.journal) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the journal name or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.reviews
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tNumber of reviews\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.reviews
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          reviews: Number($event.target.value)
        })
      }
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-56c9b82e", module.exports)
  }
}

/***/ }),
/* 627 */,
/* 628 */,
/* 629 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "committee-list-item"
  }, [_c('div', {
    staticClass: "item-controls"
  }, [(!_vm.readonly) ? _c('confirmation-button', {
    staticClass: "btn btn-sm",
    attrs: {
      "unpressed-class": "btn-danger",
      "pressed-class": "btn-warning"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-remove"
  }), _vm._v("\n\t\t\tRemove item\n\t\t")]) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "item-contents"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.name
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tCommittee name\n\t\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.name
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          name: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.name) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\t\tPlease enter the committee name or remove this list item\n\t\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.role
    }
  }, [_vm._m(0), _vm._v(" "), _vm._l((['chair', 'member']), function(value) {
    return _c('label', {
      staticClass: "containing-label"
    }, [_c('input', {
      attrs: {
        "type": "radio"
      },
      domProps: {
        "value": value,
        "checked": _vm.role === value
      },
      on: {
        "change": function($event) {
          _vm.$emit('input', {
            role: $event.target.value
          })
        }
      }
    }), _vm._v("\n\t\t\t\t" + _vm._s(_vm.ucfirst(value)) + "\n\t\t\t")])
  }), _vm._v(" "), (!_vm.role) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\t\tPlease select your role or remove this list item\n\t\t\t")]) : _vm._e()], 2)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('fieldset', [_c('legend', [_vm._v("\n\t\t\t\t\tYour role\n\t\t\t\t")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6233e112", module.exports)
  }
}

/***/ }),
/* 630 */,
/* 631 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "merit-report-list-item"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-1"
  }, [_c('small', [_vm._v("#")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.id))])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-2"
  }, [_c('small', [_vm._v("Form")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(_vm.form.name))])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-3"
  }, [_c('small', [_vm._v("Period")]), _vm._v(" "), _c('rich-date-range', {
    attrs: {
      "dates": _vm.dates
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-sm-2 checked-items-cell"
  }, [_c('small', [_vm._v("Checked items")]), _vm._v("\n\t\t\t" + _vm._s(_vm.checkedItems) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-2"
  }, [_c('span', {
    staticClass: "label",
    class: _vm.statusLabel
  }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.ucfirst(_vm.status)) + "\n\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-2 controls-cell"
  }, [_c('button', {
    staticClass: "btn btn-info btn-xs",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('click', _vm.id)
      }
    }
  }, [_c('span', {
    staticClass: "glyphicon",
    class: _vm.viewEditGlyph
  }), _vm._v("\n\t\t\t\t" + _vm._s(_vm.viewEditText) + "\n\t\t\t")]), _vm._v(" "), (_vm.userIsAdmin) ? [(_vm.status === 'complete') ? _c('confirmation-button', {
    staticClass: "btn btn-xs btn-primary",
    on: {
      "click": _vm.openForEditing
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-edit"
  }), _vm._v("\n\t\t\t\t\tOpen for editing\n\t\t\t\t")]) : (_vm.status === 'open for editing') ? _c('confirmation-button', {
    staticClass: "btn btn-xs btn-primary",
    on: {
      "click": _vm.closeEditing
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-check"
  }), _vm._v("\n\t\t\t\t\tClose editing\n\t\t\t\t")]) : _vm._e(), _vm._v(" "), (_vm.status === 'disabled') ? _c('confirmation-button', {
    staticClass: "btn btn-xs btn-success",
    on: {
      "click": _vm.enableReport
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-check"
  }), _vm._v("\n\t\t\t\t\tEnable report\n\t\t\t\t")]) : _c('confirmation-yes-no', {
    attrs: {
      "default-class": "btn btn-xs btn-danger",
      "yes-class": "btn btn-xs btn-danger",
      "no-class": "btn btn-xs btn-default"
    },
    on: {
      "click": _vm.disableReport
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-remove"
  }), _vm._v("\n\t\t\t\t\tDisable report\n\n\t\t\t\t\t"), _c('template', {
    slot: "yes"
  }, [_vm._v("\n\t\t\t\t\t\tYes, disable report\n\t\t\t\t\t")]), _vm._v(" "), _c('template', {
    slot: "no"
  }, [_vm._v("\n\t\t\t\t\t\tCancel\n\t\t\t\t\t")])], 2)] : _vm._e()], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6c389d6a", module.exports)
  }
}

/***/ }),
/* 632 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.readonly) ? _c('div', {
    staticClass: "form-summary panel panel-default"
  }, [_c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-sm-6"
  }, [_c('small', [_vm._v("Report period")]), _vm._v(" "), _c('rich-date-range', {
    attrs: {
      "dates": _vm.dates
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6"
  }, [_c('small', [_vm._v("Checked items")]), _vm._v("\n\t\t\t\t\t" + _vm._s(_vm.checkedItems) + "\n\t\t\t\t")])])])]) : _c('div', [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tReport period\n\t\t\t\t"), _c('academic-year-selector', {
    model: {
      value: (_vm.dates),
      callback: function($$v) {
        _vm.dates = $$v
      },
      expression: "dates"
    }
  })], 1)])]), _vm._v(" "), _c('merit-compensation-checklist', _vm._b({
    attrs: {
      "title": _vm.title,
      "readonly": _vm.readonly,
      "user": _vm.user
    },
    on: {
      "input": _vm.handleChecklistInput,
      "save": _vm.handleSave,
      "close": _vm.handleClose,
      "submit": _vm.handleSubmit
    }
  }, 'merit-compensation-checklist', _vm.checklist))], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6ff62c0e", module.exports)
  }
}

/***/ }),
/* 633 */,
/* 634 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "text-list-item"
  }, [_c('div', {
    staticClass: "item-controls"
  }, [(!_vm.readonly) ? _c('confirmation-button', {
    staticClass: "btn btn-sm",
    attrs: {
      "unpressed-class": "btn-danger",
      "pressed-class": "btn-warning"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-remove"
  }), _vm._v("\n\t\t\tRemove item\n\t\t")]) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "item-contents"
  }, [_c('div', {
    class: {
      'has-warning': !_vm.text
    }
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          text: $event.target.value
        })
      }
    }
  }), _vm._v(" "), (!_vm.text) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\t\tPlease complete or remove this list item\n\t\t\t")]) : _vm._e()])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-737a1269", module.exports)
  }
}

/***/ }),
/* 635 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress-bullets",
    attrs: {
      "role": "progressbar",
      "aria-valuemin": _vm.min,
      "aria-valuemax": _vm.max,
      "aria-valuenow": _vm.value,
      "title": _vm.label
    }
  }, _vm._l((_vm.max), function(i) {
    return _c('div', {
      staticClass: "bullet",
      class: {
        filled: i <= _vm.value
      }
    })
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7b09133f", module.exports)
  }
}

/***/ }),
/* 636 */,
/* 637 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "pager-controls"
  }, [_c('div', {
    staticClass: "button-container"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": !_vm.canGoBackPage
    },
    on: {
      "click": function($event) {
        _vm.$emit('back')
      }
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.backText) + "\n\t\t")])]), _vm._v(" "), _c('progress-bullets', {
    attrs: {
      "max": _vm.totalPages,
      "value": _vm.currentPage + 1
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "button-container"
  }, [(_vm.currentPage < _vm.totalPages - 1) ? _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": !_vm.canAdvancePage
    },
    on: {
      "click": function($event) {
        _vm.$emit('forward')
      }
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.forwardText) + "\n\t\t")]) : (!_vm.readonly) ? _c('confirmation-button', {
    staticClass: "btn btn-primary",
    attrs: {
      "pressed-class": "btn-success",
      "disabled": !_vm.canAdvancePage
    },
    on: {
      "click": function($event) {
        _vm.$emit('submit')
      }
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.submitText) + "\n\t\t\t"), _c('template', {
    slot: "pressed"
  }, [_vm._v("\n\t\t\t\tConfirm\n\t\t\t")])], 2) : _vm._e()], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8aa3b4f0", module.exports)
  }
}

/***/ }),
/* 638 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', {
    staticClass: "publication-list-item"
  }, [_c('div', {
    staticClass: "item-controls"
  }, [(!_vm.readonly) ? _c('confirmation-button', {
    staticClass: "btn btn-sm",
    attrs: {
      "unpressed-class": "btn-danger",
      "pressed-class": "btn-warning"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-remove"
  }), _vm._v("\n\t\t\tRemove item\n\t\t")]) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "item-contents"
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.title
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tTitle of publication\n\t\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.title
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          title: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.title) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\t\tPlease enter a title or remove this list item\n\t\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tPrimary author(s)\n\t\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.author
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          author: $event.target.value
        })
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tLink (PubMed, MCW FCD, etc.)\n\t\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.link
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          link: $event.target.value
        })
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.role
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tYour role on the project\n\t\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.role
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          role: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.role) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\t\tPlease enter your role or remove this list item\n\t\t\t")]) : _vm._e()])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9ce3a934", module.exports)
  }
}

/***/ }),
/* 639 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list-item', {
    attrs: {
      "readonly": _vm.readonly
    },
    on: {
      "remove": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [(_vm.type === 'grantOther') ? _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.agency
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tFunding agency\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.agency
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          agency: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.agency) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the funding agency or remove this list item\n\t\t")]) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.project
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tProject\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.project
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          project: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.project) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the name of the project or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.amount
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tFunding amount\n\t\t\t"), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "input-group-addon"
  }, [_vm._v("$")]), _vm._v(" "), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.amount
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          amount: Number($event.target.value)
        })
      }
    }
  })])]), _vm._v(" "), (!_vm.amount) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the funding amount or remove this list item\n\t\t")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a6890cd4", module.exports)
  }
}

/***/ }),
/* 640 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "pager",
    staticClass: "questionnaire-pager"
  }, [_c('pager-controls', {
    attrs: {
      "current-page": _vm.currentPage,
      "total-pages": _vm.pages.length,
      "submit-text": _vm.submitText,
      "forward-text": _vm.forwardText,
      "back-text": _vm.backText,
      "can-advance-page": _vm.canAdvancePage,
      "can-go-back-page": _vm.canGoBackPage,
      "readonly": _vm.readonly
    },
    on: {
      "back": _vm.goBack,
      "forward": _vm.advance,
      "submit": _vm.submit
    }
  }), _vm._v(" "), _c('button', {
    staticClass: "scroll-button btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.scrollToBottom
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-arrow-down"
  }), _vm._v("\n\t\tScroll to bottom\n\t")]), _vm._v(" "), _c('div', {
    staticClass: "pager-content"
  }, [_vm._t("default", null, {
    page: _vm.page,
    pageNum: _vm.currentPage
  })], 2), _vm._v(" "), _c('button', {
    staticClass: "scroll-button btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.scrollToTop
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-arrow-up"
  }), _vm._v("\n\t\tScroll to top\n\t")]), _vm._v(" "), _c('pager-controls', {
    attrs: {
      "current-page": _vm.currentPage,
      "total-pages": _vm.pages.length,
      "submit-text": _vm.submitText,
      "forward-text": _vm.forwardText,
      "back-text": _vm.backText,
      "can-advance-page": _vm.canAdvancePage,
      "can-go-back-page": _vm.canGoBackPage,
      "readonly": _vm.readonly
    },
    on: {
      "back": _vm.goBack,
      "forward": _vm.advance,
      "submit": _vm.submit
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a814e09c", module.exports)
  }
}

/***/ }),
/* 641 */,
/* 642 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('span', [(!_vm.pressed) ? _c('button', {
    class: _vm.defaultClass,
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.pressed = true
      }
    }
  }, [_vm._t("default")], 2) : [_c('button', {
    class: _vm.yesClass,
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleConfirm
    }
  }, [_vm._t("yes", [_c('span', {
    staticClass: "glyphicon glyphicon-thumbs-up"
  })])], 2), _vm._v(" "), _c('button', {
    class: _vm.noClass,
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.pressed = false
      }
    }
  }, [_vm._t("no", [_c('span', {
    staticClass: "glyphicon glyphicon-thumbs-down"
  })])], 2)]], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c1d823e4", module.exports)
  }
}

/***/ }),
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jacobmischka_vue_flatpickr_theme_flatpickr_min_css__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__jacobmischka_vue_flatpickr_theme_flatpickr_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__jacobmischka_vue_flatpickr_theme_flatpickr_min_css__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return ['lecture', 'audienceLecture'].includes(type);
			}
		},
		title: {
			type: String,
			default: ''
		},
		date: {
			type: String,
			default: ''
		},
		audience: {
			type: String,
			default: ''
		}
	},

	computed: {
		flatpickrOptions: function flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: 'form-control appear-not-readonly',
				altFormat: 'M j, Y'
			};
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr___default.a
	}
});

/***/ }),
/* 653 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(652),
  /* template */
  __webpack_require__(654),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/LectureItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] LectureItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3784f438", Component.options)
  } else {
    hotAPI.reload("data-v-3784f438", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 654 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list-item', {
    attrs: {
      "readonly": _vm.readonly
    },
    on: {
      "remove": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.title
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tLecture title\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.title
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          board: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.title) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the lecture title or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.date
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tLecture date\n\t\t\t"), _c('vue-flatpickr', {
    staticClass: "form-control",
    attrs: {
      "options": _vm.flatpickrOptions,
      "value": _vm.date
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          date: arguments[0]
        })
      }
    }
  })], 1), _vm._v(" "), (!_vm.date) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the lecture date or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), (_vm.type !== 'audienceLecture') ? _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.audience
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tLecture audience (department, society, group, etc.)\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.audience
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          audience: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.audience) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the lecture audience or remove this list item\n\t\t")]) : _vm._e()]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3784f438", module.exports)
  }
}

/***/ }),
/* 655 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: 'return' outside of function (31:0)\n\n\u001b[0m \u001b[90m 29 | \u001b[39m\u001b[36mimport\u001b[39m \u001b[33mListItem\u001b[39m from \u001b[32m'./Item.vue'\u001b[39m\u001b[33m;\u001b[39m\n \u001b[90m 30 | \u001b[39m\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 31 | \u001b[39m\u001b[36mreturn\u001b[39m {\n \u001b[90m    | \u001b[39m\u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 32 | \u001b[39m\t\u001b[36mextends\u001b[39m\u001b[33m:\u001b[39m \u001b[33mListItem\u001b[39m\u001b[33m,\u001b[39m\n \u001b[90m 33 | \u001b[39m\tprops\u001b[33m:\u001b[39m {\n \u001b[90m 34 | \u001b[39m\t\ttype\u001b[33m:\u001b[39m {\u001b[0m\n");

/***/ }),
/* 656 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(655),
  /* template */
  __webpack_require__(657),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/MentorshipItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MentorshipItem.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1494d9f9", Component.options)
  } else {
    hotAPI.reload("data-v-1494d9f9", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 657 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('list-item', {
    attrs: {
      "readonly": _vm.readonly
    },
    on: {
      "remove": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.mentee
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tMentee name\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.board
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          mentee: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.mentee) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the mentee / trainee name or remove this list item\n\t\t")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "form-group",
    class: {
      'has-warning': !_vm.subject
    }
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\tProject / program / mentorship subject\n\t\t\t"), _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.subject
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          subject: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), (!_vm.subject) ? _c('span', {
    staticClass: "help-block"
  }, [_vm._v("\n\t\t\tPlease enter the mentorship subject or remove this list item\n\t\t")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1494d9f9", module.exports)
  }
}

/***/ })
],[361]);
});
//# sourceMappingURL=vue-merit-reports.js.map