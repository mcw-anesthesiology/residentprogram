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
return webpackJsonp([10],{

/***/ 112:
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

/***/ 113:
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

/***/ 120:
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

/***/ 123:
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

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__ = __webpack_require__(5);
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

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.6.0
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also regiseter instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    var val = extraQuery[key];
    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (index$1(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!index$1(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (index$1(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var normalizedPath = normalizePath(path, parent);
  var pathToRegexpOptions = route.pathToRegexpOptions || {};

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = index(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = {};
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
        offset = normalizeOffset(offset);
        position = getElementPosition(el, offset);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      var current = this$1.current;
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  window.location.replace((base + "#" + path));
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.6.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(125)))

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(217)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(197),
  /* template */
  __webpack_require__(287),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-9ec25dd4",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Alumni/Edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Edit.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ec25dd4", Component.options)
  } else {
    hotAPI.reload("data-v-9ec25dd4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		manage: {
			type: Boolean,
			default: false
		},
		alum: {
			type: Object,
			required: false
		}
	},
	data: function data() {
		var alum = this.alum;

		return {
			first_name: alum ? alum.first_name : '',
			last_name: alum ? alum.last_name : '',
			email: alum ? alum.email : '',
			phone: alum ? alum.phone : '',
			employer: alum ? alum.employer : '',
			country: alum ? alum.country : '',
			address: alum ? alum.address : '',
			address_2: alum ? alum.address_2 : '',
			city: alum ? alum.city : '',
			state: alum ? alum.state : '',
			zip: alum ? alum.zip : '',
			graduation_date: alum ? alum.graduation_date : '',
			notes: alum ? alum.notes : ''
		};
	},


	computed: {
		props: function props() {
			return ['first_name', 'last_name', 'email', 'phone', 'employer', 'country', 'address_2', 'city', 'state', 'zip'];
		},
		manageProps: function manageProps() {
			return ['graduation_date', 'notes'];
		},
		addEditText: function addEditText() {
			return this.alum ? 'Edit' : 'Add';
		},
		flatpickrOptions: function flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: 'form-control appear-not-readonly'
			};
		}
	},

	watch: {
		alum: function alum(_alum) {
			Object.assign(this, this.assignProps(_alum));
		}
	},

	methods: {
		assignProps: function assignProps(src) {
			var dest = {};

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.props[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var prop = _step.value;

					if (src && src[prop]) dest[prop] = src[prop];else dest[prop] = null;
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

			if (this.manage) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.manageProps[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _prop = _step2.value;

						if (src && src[_prop]) dest[_prop] = src[_prop];else dest[_prop] = null;
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

			return dest;
		},
		saveAlum: function saveAlum(event) {
			var _this = this;

			event.preventDefault();

			var url = this.alum ? '/alumni/' + this.alum.id : '/alumni';

			var body = this.assignProps(this);

			if (this.alum) body._method = 'PATCH';

			fetch(url, {
				method: 'POST',
				headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["a" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(body)
			}).then(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["b" /* okOrThrow */]).then(function () {
				_this.$emit('reload');
				_this.$router.go(-1);
			}).catch(function (err) {
				console.error(err);
				_this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem saving the alum'
				});
			});
		}
	},

	components: {
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default.a,
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue___default.a
	}
});

/***/ }),

/***/ 217:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(120),
  /* template */
  __webpack_require__(123),
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

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container body-block edit-alum"
  }, [_c('h2', [_vm._v(_vm._s(_vm.addEditText) + " alum")]), _vm._v(" "), _c('form', {
    staticClass: "form"
  }, [_c('div', {
    staticClass: "row"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "col-md-5 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tFirst name\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.first_name),
      expression: "first_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "First name",
      "required": ""
    },
    domProps: {
      "value": (_vm.first_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.first_name = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-5 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tLast name\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.last_name),
      expression: "last_name"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "Last name",
      "required": ""
    },
    domProps: {
      "value": (_vm.last_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.last_name = $event.target.value
      }
    }
  })])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 col-sm-8"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tEmail\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.email),
      expression: "email"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "email",
      "placeholder": "Email"
    },
    domProps: {
      "value": (_vm.email)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.email = $event.target.value
      }
    }
  })]), _vm._v(" "), _c('small', [_vm._v("\n\t\t\t\t\t\tNot required, but can't send update requests without one\n\t\t\t\t\t")])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4 col-sm-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tPhone\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.phone),
      expression: "phone"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "tel",
      "placeholder": "Phone number"
    },
    domProps: {
      "value": (_vm.phone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.phone = $event.target.value
      }
    }
  })])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 col-sm-8"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tEmployer\n\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.employer),
      expression: "employer"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "Employer"
    },
    domProps: {
      "value": (_vm.employer)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.employer = $event.target.value
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4 col-sm-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tCountry\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.country),
      expression: "country"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "Country"
    },
    domProps: {
      "value": (_vm.country)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.country = $event.target.value
      }
    }
  })])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "col-md-6 col-sm-8"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tAddress\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.address),
      expression: "address"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "Address"
    },
    domProps: {
      "value": (_vm.address)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.address = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4 col-sm-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tAddress (continued)\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.address_2),
      expression: "address_2"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "Apartment #, etc"
    },
    domProps: {
      "value": (_vm.address_2)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.address_2 = $event.target.value
      }
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4 col-md-offset-2 col-sm-6"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tCity\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.city),
      expression: "city"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "City"
    },
    domProps: {
      "value": (_vm.city)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.city = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4 col-sm-3"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tState / Region\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.state),
      expression: "state"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "State / Region"
    },
    domProps: {
      "value": (_vm.state)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.state = $event.target.value
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-2 col-sm-3"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tZIP Code\n\t\t\t\t\t\t"), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.zip),
      expression: "zip"
    }],
    staticClass: "form-control",
    attrs: {
      "type": "text",
      "placeholder": "ZIP Code"
    },
    domProps: {
      "value": (_vm.zip)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.zip = $event.target.value
      }
    }
  })])])])]), _vm._v(" "), _c('hr'), _vm._v(" "), (_vm.manage) ? _c('div', {
    staticClass: "row"
  }, [_vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "col-sm-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tGraduation date\n\t\t\t\t\t\t"), _c('vue-flatpickr', {
    attrs: {
      "placeholder": "Graduation date",
      "options": _vm.flatpickrOptions
    },
    model: {
      value: (_vm.graduation_date),
      callback: function($$v) {
        _vm.graduation_date = $$v
      },
      expression: "graduation_date"
    }
  })], 1)])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-8"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\t\tNotes\n\t\t\t\t\t\t"), _c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.notes),
      expression: "notes"
    }],
    staticClass: "form-control",
    attrs: {
      "placeholder": "Notes"
    },
    domProps: {
      "value": (_vm.notes)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.notes = $event.target.value
      }
    }
  })])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "btn-lg-submit-container"
  }, [_c('confirmation-button', {
    staticClass: "btn btn-lg",
    attrs: {
      "unpressed-class": "btn-default",
      "pressed-class": "btn-warning"
    },
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_vm._v("\n\t\t\t\tCancel\n\t\t\t")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-lg btn-primary",
    attrs: {
      "type": "submit"
    },
    on: {
      "click": _vm.saveAlum
    }
  }, [_vm._v("\n\t\t\t\tSubmit\n\t\t\t")])], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-2 glyph-container"
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-user"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-2 glyph-container"
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-send"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-2 glyph-container"
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-briefcase"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-2 glyph-container"
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-envelope"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "col-md-2 glyph-container"
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-pencil"
  })])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-9ec25dd4", module.exports)
  }
}

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(42)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(39),
  /* template */
  __webpack_require__(113),
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

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(387),
  /* template */
  __webpack_require__(688),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Alumni/Subscription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Subscription.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8e5d72ae", Component.options)
  } else {
    hotAPI.reload("data-v-8e5d72ae", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.INDEX=t():e.INDEX=t()}(this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p=".",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),i=a(r),o=n(42),l=a(o),c=function(e){e.component("Flatpickr",l.default)};t.default=(0,i.default)(l.default,{install:c})},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){e.exports=!n(3)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){e.exports={default:n(14),__esModule:!0}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var a=n(18);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==a(e)?e.split(""):Object(e)}},function(e,t){var n=Math.ceil,a=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?a:n)(e)}},function(e,t,n){var a=n(8),r=n(7);e.exports=function(e){return a(r(e))}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),i=a(r),o=n(12),l=a(o),c=n(41),s=a(c);t.default={props:{placeholder:{type:String,default:""},options:{type:Object,default:function(){return{}}},value:{type:String,default:""}},data:function(){return{fp:null}},computed:{fpOptions:function(){return(0,l.default)(this.options)}},watch:{value:function(e){this.fp.setDate(e)},fpOptions:function(e){var t=JSON.parse(e);for(var n in t)this.fp.set(n,t[n])}},mounted:function(){var e=this,t=this.options.onValueUpdate;this.fp=new s.default(this.$el,(0,i.default)(this.options,{onValueUpdate:function(){e.onInput(e.$el.value),"function"==typeof t&&t()}})),this.$emit("FlatpickrRef",this.fp)},destroyed:function(){this.fp.destroy(),this.fp=null},methods:{onInput:function(e){"string"==typeof e?this.$emit("input",e):this.$emit("input",e.target.value)}}}},function(e,t,n){e.exports={default:n(13),__esModule:!0}},function(e,t,n){var a=n(1),r=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},function(e,t,n){n(40),e.exports=n(1).Object.assign},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var a=n(5);e.exports=function(e){if(!a(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var a=n(10),r=n(36),i=n(35);e.exports=function(e){return function(t,n,o){var l,c=a(t),s=r(c.length),u=i(o,s);if(e&&n!=n){for(;s>u;)if(l=c[u++],l!=l)return!0}else for(;s>u;u++)if((e||u in c)&&c[u]===n)return e||u||0;return!e&&-1}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var a=n(15);e.exports=function(e,t,n){if(a(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,a){return e.call(t,n,a)};case 3:return function(n,a,r){return e.call(t,n,a,r)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var a=n(5),r=n(4).document,i=a(r)&&a(r.createElement);e.exports=function(e){return i?r.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var a=n(4),r=n(1),i=n(19),o=n(24),l="prototype",c=function(e,t,n){var s,u,d,f=e&c.F,p=e&c.G,m=e&c.S,g=e&c.P,h=e&c.B,v=e&c.W,D=p?r:r[t]||(r[t]={}),y=D[l],b=p?a:m?a[t]:(a[t]||{})[l];p&&(n=t);for(s in n)u=!f&&b&&void 0!==b[s],u&&s in D||(d=u?b[s]:n[s],D[s]=p&&"function"!=typeof b[s]?n[s]:h&&u?i(d,a):v&&b[s]==d?function(e){var t=function(t,n,a){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,a)}return e.apply(this,arguments)};return t[l]=e[l],t}(d):g&&"function"==typeof d?i(Function.call,d):d,g&&((D.virtual||(D.virtual={}))[s]=d,e&c.R&&y&&!y[s]&&o(y,s,d)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var a=n(27),r=n(32);e.exports=n(2)?function(e,t,n){return a.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){e.exports=!n(2)&&!n(3)(function(){return 7!=Object.defineProperty(n(20)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){"use strict";var a=n(30),r=n(28),i=n(31),o=n(37),l=n(8),c=Object.assign;e.exports=!c||n(3)(function(){var e={},t={},n=Symbol(),a="abcdefghijklmnopqrst";return e[n]=7,a.split("").forEach(function(e){t[e]=e}),7!=c({},e)[n]||Object.keys(c({},t)).join("")!=a})?function(e,t){for(var n=o(e),c=arguments.length,s=1,u=r.f,d=i.f;c>s;)for(var f,p=l(arguments[s++]),m=u?a(p).concat(u(p)):a(p),g=m.length,h=0;g>h;)d.call(p,f=m[h++])&&(n[f]=p[f]);return n}:c},function(e,t,n){var a=n(16),r=n(25),i=n(38),o=Object.defineProperty;t.f=n(2)?Object.defineProperty:function(e,t,n){if(a(e),t=i(t,!0),a(n),r)try{return o(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var a=n(23),r=n(10),i=n(17)(!1),o=n(33)("IE_PROTO");e.exports=function(e,t){var n,l=r(e),c=0,s=[];for(n in l)n!=o&&a(l,n)&&s.push(n);for(;t.length>c;)a(l,n=t[c++])&&(~i(s,n)||s.push(n));return s}},function(e,t,n){var a=n(29),r=n(21);e.exports=Object.keys||function(e){return a(e,r)}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var a=n(34)("keys"),r=n(39);e.exports=function(e){return a[e]||(a[e]=r(e))}},function(e,t,n){var a=n(4),r="__core-js_shared__",i=a[r]||(a[r]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t,n){var a=n(9),r=Math.max,i=Math.min;e.exports=function(e,t){return e=a(e),e<0?r(e+t,0):i(e,t)}},function(e,t,n){var a=n(9),r=Math.min;e.exports=function(e){return e>0?r(a(e),9007199254740991):0}},function(e,t,n){var a=n(7);e.exports=function(e){return Object(a(e))}},function(e,t,n){var a=n(5);e.exports=function(e,t){if(!a(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!a(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},function(e,t){var n=0,a=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+a).toString(36))}},function(e,t,n){var a=n(22);a(a.S+a.F,"Object",{assign:n(26)})},function(e,t,n){/*! flatpickr v3.0.5-1, @license MIT */
function a(e,t){function n(){Ce.element=Ce.input=e,Ce.instanceConfig=t||{},Ce.parseDate=a.prototype.parseDate.bind(Ce),Ce.formatDate=a.prototype.formatDate.bind(Ce),ae(),K(),z(),re(),te(),ne(),Ce.isOpen=!1,Ce.isMobile=!Ce.config.disableMobile&&!Ce.config.inline&&"single"===Ce.config.mode&&!Ce.config.disable.length&&!Ce.config.enable.length&&!Ce.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),Ce.isMobile||M(),g(),(Ce.selectedDates.length||Ce.config.noCalendar)&&(Ce.config.enableTime&&u(Ce.config.noCalendar?Ce.latestSelectedDateObj||Ce.config.minDate:null),fe()),Ce.showTimeInput=Ce.selectedDates.length>0||Ce.config.noCalendar,Ce.config.weekNumbers&&(Ce.calendarContainer.style.width=Ce.daysContainer.offsetWidth+Ce.weekWrapper.offsetWidth+"px"),Ce.isMobile||q(),le("Ready")}function r(e){return e.bind(Ce)}function c(e){Ce.config.noCalendar&&!Ce.selectedDates.length&&(Ce.selectedDates=[Ce.now]),we(e),Ce.selectedDates.length&&(!Ce.minDateHasTime||"input"!==e.type||e.target.value.length>=2?(s(),fe()):setTimeout(function(){s(),fe()},1e3))}function s(){if(Ce.config.enableTime){var e=(parseInt(Ce.hourElement.value,10)||0)%(Ce.amPM?12:24),t=(parseInt(Ce.minuteElement.value,10)||0)%60,n=Ce.config.enableSeconds?(parseInt(Ce.secondElement.value,10)||0)%60:0;void 0!==Ce.amPM&&(e=e%12+12*("PM"===Ce.amPM.textContent)),Ce.minDateHasTime&&0===be(Ce.latestSelectedDateObj,Ce.config.minDate)&&(e=Math.max(e,Ce.config.minDate.getHours()),e===Ce.config.minDate.getHours()&&(t=Math.max(t,Ce.config.minDate.getMinutes()))),Ce.maxDateHasTime&&0===be(Ce.latestSelectedDateObj,Ce.config.maxDate)&&(e=Math.min(e,Ce.config.maxDate.getHours()),e===Ce.config.maxDate.getHours()&&(t=Math.min(t,Ce.config.maxDate.getMinutes()))),d(e,t,n)}}function u(e){var t=e||Ce.latestSelectedDateObj;t&&d(t.getHours(),t.getMinutes(),t.getSeconds())}function d(e,t,n){Ce.selectedDates.length&&Ce.latestSelectedDateObj.setHours(e%24,t,n||0,0),Ce.config.enableTime&&!Ce.isMobile&&(Ce.hourElement.value=Ce.pad(Ce.config.time_24hr?e:(12+e)%12+12*(e%12===0)),Ce.minuteElement.value=Ce.pad(t),Ce.config.time_24hr||(Ce.amPM.textContent=e>=12?"PM":"AM"),Ce.config.enableSeconds===!0&&(Ce.secondElement.value=Ce.pad(n)))}function f(e){var t=e.target.value;e.delta&&(t=(parseInt(t)+e.delta).toString()),4!==t.length&&"Enter"!==e.key||(Ce.currentYearElement.blur(),/[^\d]/.test(t)||R(t))}function p(e,t,n){return t instanceof Array?t.forEach(function(t){return p(e,t,n)}):e instanceof Array?e.forEach(function(e){return p(e,t,n)}):(e.addEventListener(t,n),void Ce._handlers.push({element:e,event:t,handler:n}))}function m(e){return function(t){return 1===t.which&&e(t)}}function g(){if(Ce._handlers=[],Ce._animationLoop=[],Ce.config.wrap&&["open","close","toggle","clear"].forEach(function(e){Array.prototype.forEach.call(Ce.element.querySelectorAll("[data-"+e+"]"),function(t){return p(t,"mousedown",m(Ce[e]))})}),Ce.isMobile)return ie();if(Ce.debouncedResize=ye($,50),Ce.triggerChange=function(){le("Change")},Ce.debouncedChange=ye(Ce.triggerChange,300),"range"===Ce.config.mode&&Ce.daysContainer&&p(Ce.daysContainer,"mouseover",function(e){return J(e.target)}),p(window.document.body,"keydown",W),Ce.config.static||p(Ce._input,"keydown",W),Ce.config.inline||Ce.config.static||p(window,"resize",Ce.debouncedResize),void 0!==window.ontouchstart&&p(window.document,"touchstart",L),p(window.document,"mousedown",m(L)),p(Ce._input,"blur",L),Ce.config.clickOpens===!0&&(p(Ce._input,"focus",Ce.open),p(Ce._input,"mousedown",m(Ce.open))),Ce.config.noCalendar||(Ce.monthNav.addEventListener("wheel",function(e){return e.preventDefault()}),p(Ce.monthNav,"wheel",ye(me,10)),p(Ce.monthNav,"mousedown",m(ge)),p(Ce.monthNav,["keyup","increment"],f),p(Ce.daysContainer,"mousedown",m(V)),Ce.config.animate&&(p(Ce.daysContainer,["webkitAnimationEnd","animationend"],v),p(Ce.monthNav,["webkitAnimationEnd","animationend"],D))),Ce.config.enableTime){var e=function(e){return e.target.select()};p(Ce.timeContainer,["wheel","input","increment"],c),p(Ce.timeContainer,"mousedown",m(b)),p(Ce.timeContainer,["wheel","increment"],Ce.debouncedChange),p(Ce.timeContainer,"input",Ce.triggerChange),p([Ce.hourElement,Ce.minuteElement],"focus",e),void 0!==Ce.secondElement&&p(Ce.secondElement,"focus",function(){return Ce.secondElement.select()}),void 0!==Ce.amPM&&p(Ce.amPM,"mousedown",m(function(e){c(e),Ce.triggerChange(e)}))}}function h(){for(var e=Ce._animationLoop.length;e--;)Ce._animationLoop[e](),Ce._animationLoop.splice(e,1)}function v(e){if(Ce.daysContainer.childNodes.length>1)switch(e.animationName){case"fpSlideLeft":Ce.daysContainer.lastChild.classList.remove("slideLeftNew"),Ce.daysContainer.removeChild(Ce.daysContainer.firstChild),Ce.days=Ce.daysContainer.firstChild,h();break;case"fpSlideRight":Ce.daysContainer.firstChild.classList.remove("slideRightNew"),Ce.daysContainer.removeChild(Ce.daysContainer.lastChild),Ce.days=Ce.daysContainer.firstChild,h()}}function D(e){switch(e.animationName){case"fpSlideLeftNew":case"fpSlideRightNew":Ce.navigationCurrentMonth.classList.remove("slideLeftNew"),Ce.navigationCurrentMonth.classList.remove("slideRightNew");for(var t=Ce.navigationCurrentMonth;t.nextSibling&&/curr/.test(t.nextSibling.className);)Ce.monthNav.removeChild(t.nextSibling);for(;t.previousSibling&&/curr/.test(t.previousSibling.className);)Ce.monthNav.removeChild(t.previousSibling);Ce.oldCurMonth=null}}function y(e){e=e?Ce.parseDate(e):Ce.latestSelectedDateObj||(Ce.config.minDate>Ce.now?Ce.config.minDate:Ce.config.maxDate&&Ce.config.maxDate<Ce.now?Ce.config.maxDate:Ce.now);try{Ce.currentYear=e.getFullYear(),Ce.currentMonth=e.getMonth()}catch(t){console.error(t.stack),console.warn("Invalid date supplied: "+e)}Ce.redraw()}function b(e){~e.target.className.indexOf("arrow")&&w(e,e.target.classList.contains("arrowUp")?1:-1)}function w(e,t,n){var a=n||e.target.parentNode.childNodes[0],r=ce("increment");r.delta=t,a.dispatchEvent(r)}function C(e){var t=he("div","numInputWrapper"),n=he("input","numInput "+e),a=he("span","arrowUp"),r=he("span","arrowDown");return n.type="text",n.pattern="\\d*",t.appendChild(n),t.appendChild(a),t.appendChild(r),t}function M(){var e=window.document.createDocumentFragment();Ce.calendarContainer=he("div","flatpickr-calendar"),Ce.calendarContainer.tabIndex=-1,Ce.config.noCalendar||(e.appendChild(S()),Ce.innerContainer=he("div","flatpickr-innerContainer"),Ce.config.weekNumbers&&Ce.innerContainer.appendChild(I()),Ce.rContainer=he("div","flatpickr-rContainer"),Ce.rContainer.appendChild(O()),Ce.daysContainer||(Ce.daysContainer=he("div","flatpickr-days"),Ce.daysContainer.tabIndex=-1),k(),Ce.rContainer.appendChild(Ce.daysContainer),Ce.innerContainer.appendChild(Ce.rContainer),e.appendChild(Ce.innerContainer)),Ce.config.enableTime&&e.appendChild(T()),De(Ce.calendarContainer,"rangeMode","range"===Ce.config.mode),De(Ce.calendarContainer,"animate",Ce.config.animate),Ce.calendarContainer.appendChild(e);var t=Ce.config.appendTo&&Ce.config.appendTo.nodeType;if(Ce.config.inline||Ce.config.static){if(Ce.calendarContainer.classList.add(Ce.config.inline?"inline":"static"),Ce.config.inline&&!t)return Ce.element.parentNode.insertBefore(Ce.calendarContainer,Ce._input.nextSibling);if(Ce.config.static){var n=he("div","flatpickr-wrapper");return Ce.element.parentNode.insertBefore(n,Ce.element),n.appendChild(Ce.element),Ce.altInput&&n.appendChild(Ce.altInput),void n.appendChild(Ce.calendarContainer)}}(t?Ce.config.appendTo:window.document.body).appendChild(Ce.calendarContainer)}function x(e,t,n,a){var r=H(t,!0),i=he("span","flatpickr-day "+e,t.getDate());return i.dateObj=t,i.$i=a,i.setAttribute("aria-label",Ce.formatDate(t,Ce.config.ariaDateFormat)),0===be(t,Ce.now)&&(Ce.todayDateElem=i,i.classList.add("today")),r?(i.tabIndex=-1,se(t)&&(i.classList.add("selected"),Ce.selectedDateElem=i,"range"===Ce.config.mode&&(De(i,"startRange",0===be(t,Ce.selectedDates[0])),De(i,"endRange",0===be(t,Ce.selectedDates[1]))))):(i.classList.add("disabled"),Ce.selectedDates[0]&&t>Ce.minRangeDate&&t<Ce.selectedDates[0]?Ce.minRangeDate=t:Ce.selectedDates[0]&&t<Ce.maxRangeDate&&t>Ce.selectedDates[0]&&(Ce.maxRangeDate=t)),"range"===Ce.config.mode&&(ue(t)&&!se(t)&&i.classList.add("inRange"),1===Ce.selectedDates.length&&(t<Ce.minRangeDate||t>Ce.maxRangeDate)&&i.classList.add("notAllowed")),Ce.config.weekNumbers&&"prevMonthDay"!==e&&n%7===1&&Ce.weekNumbers.insertAdjacentHTML("beforeend","<span class='disabled flatpickr-day'>"+Ce.config.getWeek(t)+"</span>"),le("DayCreate",i),i}function E(e,t){var n=e+t||0,a=void 0!==e?Ce.days.childNodes[n]:Ce.selectedDateElem||Ce.todayDateElem||Ce.days.childNodes[0],r=function(){a=a||Ce.days.childNodes[n],a.focus(),"range"===Ce.config.mode&&J(a)};return void 0===a&&0!==t?(t>0?(Ce.changeMonth(1),n%=42):t<0&&(Ce.changeMonth(-1),n+=42),_(r)):void r()}function _(e){return Ce.config.animate===!0?Ce._animationLoop.push(e):void e()}function k(e){var t=(new Date(Ce.currentYear,Ce.currentMonth,1).getDay()-Ce.l10n.firstDayOfWeek+7)%7,n="range"===Ce.config.mode;Ce.prevMonthDays=Ce.utils.getDaysinMonth((Ce.currentMonth-1+12)%12),Ce.selectedDateElem=void 0,Ce.todayDateElem=void 0;var a=Ce.utils.getDaysinMonth(),r=window.document.createDocumentFragment(),i=Ce.prevMonthDays+1-t,o=0;for(Ce.config.weekNumbers&&Ce.weekNumbers.firstChild&&(Ce.weekNumbers.textContent=""),n&&(Ce.minRangeDate=new Date(Ce.currentYear,Ce.currentMonth-1,i),Ce.maxRangeDate=new Date(Ce.currentYear,Ce.currentMonth+1,(42-t)%a));i<=Ce.prevMonthDays;i++,o++)r.appendChild(x("prevMonthDay",new Date(Ce.currentYear,Ce.currentMonth-1,i),i,o));for(i=1;i<=a;i++,o++)r.appendChild(x("",new Date(Ce.currentYear,Ce.currentMonth,i),i,o));for(var l=a+1;l<=42-t;l++,o++)r.appendChild(x("nextMonthDay",new Date(Ce.currentYear,Ce.currentMonth+1,l%a),l,o));n&&1===Ce.selectedDates.length&&r.childNodes[0]?(Ce._hidePrevMonthArrow=Ce._hidePrevMonthArrow||Ce.minRangeDate>r.childNodes[0].dateObj,Ce._hideNextMonthArrow=Ce._hideNextMonthArrow||Ce.maxRangeDate<new Date(Ce.currentYear,Ce.currentMonth+1,1)):de();var c=he("div","dayContainer");if(c.appendChild(r),Ce.config.animate&&void 0!==e)for(;Ce.daysContainer.childNodes.length>1;)Ce.daysContainer.removeChild(Ce.daysContainer.firstChild);else N(Ce.daysContainer);return e>=0?Ce.daysContainer.appendChild(c):Ce.daysContainer.insertBefore(c,Ce.daysContainer.firstChild),Ce.days=Ce.daysContainer.firstChild,Ce.daysContainer}function N(e){for(;e.firstChild;)e.removeChild(e.firstChild)}function S(){var e=window.document.createDocumentFragment();Ce.monthNav=he("div","flatpickr-month"),Ce.prevMonthNav=he("span","flatpickr-prev-month"),Ce.prevMonthNav.innerHTML=Ce.config.prevArrow,Ce.currentMonthElement=he("span","cur-month"),Ce.currentMonthElement.title=Ce.l10n.scrollTitle;var t=C("cur-year");return Ce.currentYearElement=t.childNodes[0],Ce.currentYearElement.title=Ce.l10n.scrollTitle,Ce.config.minDate&&(Ce.currentYearElement.min=Ce.config.minDate.getFullYear()),Ce.config.maxDate&&(Ce.currentYearElement.max=Ce.config.maxDate.getFullYear(),Ce.currentYearElement.disabled=Ce.config.minDate&&Ce.config.minDate.getFullYear()===Ce.config.maxDate.getFullYear()),Ce.nextMonthNav=he("span","flatpickr-next-month"),Ce.nextMonthNav.innerHTML=Ce.config.nextArrow,Ce.navigationCurrentMonth=he("span","flatpickr-current-month"),Ce.navigationCurrentMonth.appendChild(Ce.currentMonthElement),Ce.navigationCurrentMonth.appendChild(t),e.appendChild(Ce.prevMonthNav),e.appendChild(Ce.navigationCurrentMonth),e.appendChild(Ce.nextMonthNav),Ce.monthNav.appendChild(e),Object.defineProperty(Ce,"_hidePrevMonthArrow",{get:function(){return this.__hidePrevMonthArrow},set:function(e){this.__hidePrevMonthArrow!==e&&(Ce.prevMonthNav.style.display=e?"none":"block"),this.__hidePrevMonthArrow=e}}),Object.defineProperty(Ce,"_hideNextMonthArrow",{get:function(){return this.__hideNextMonthArrow},set:function(e){this.__hideNextMonthArrow!==e&&(Ce.nextMonthNav.style.display=e?"none":"block"),this.__hideNextMonthArrow=e}}),de(),Ce.monthNav}function T(){Ce.calendarContainer.classList.add("hasTime"),Ce.config.noCalendar&&Ce.calendarContainer.classList.add("noCalendar"),Ce.timeContainer=he("div","flatpickr-time"),Ce.timeContainer.tabIndex=-1;var e=he("span","flatpickr-time-separator",":"),t=C("flatpickr-hour");Ce.hourElement=t.childNodes[0];var n=C("flatpickr-minute");if(Ce.minuteElement=n.childNodes[0],Ce.hourElement.tabIndex=Ce.minuteElement.tabIndex=-1,Ce.hourElement.value=Ce.pad(Ce.latestSelectedDateObj?Ce.latestSelectedDateObj.getHours():Ce.config.defaultHour),Ce.minuteElement.value=Ce.pad(Ce.latestSelectedDateObj?Ce.latestSelectedDateObj.getMinutes():Ce.config.defaultMinute),Ce.hourElement.step=Ce.config.hourIncrement,Ce.minuteElement.step=Ce.config.minuteIncrement,Ce.hourElement.min=Ce.config.time_24hr?0:1,Ce.hourElement.max=Ce.config.time_24hr?23:12,Ce.minuteElement.min=0,Ce.minuteElement.max=59,Ce.hourElement.title=Ce.minuteElement.title=Ce.l10n.scrollTitle,Ce.timeContainer.appendChild(t),Ce.timeContainer.appendChild(e),Ce.timeContainer.appendChild(n),Ce.config.time_24hr&&Ce.timeContainer.classList.add("time24hr"),Ce.config.enableSeconds){Ce.timeContainer.classList.add("hasSeconds");var a=C("flatpickr-second");Ce.secondElement=a.childNodes[0],Ce.secondElement.value=Ce.latestSelectedDateObj?Ce.pad(Ce.latestSelectedDateObj.getSeconds()):"00",Ce.secondElement.step=Ce.minuteElement.step,Ce.secondElement.min=Ce.minuteElement.min,Ce.secondElement.max=Ce.minuteElement.max,Ce.timeContainer.appendChild(he("span","flatpickr-time-separator",":")),Ce.timeContainer.appendChild(a)}return Ce.config.time_24hr||(Ce.amPM=he("span","flatpickr-am-pm",["AM","PM"][Ce.hourElement.value>11|0]),Ce.amPM.title=Ce.l10n.toggleTitle,Ce.amPM.tabIndex=-1,Ce.timeContainer.appendChild(Ce.amPM)),Ce.timeContainer}function O(){Ce.weekdayContainer||(Ce.weekdayContainer=he("div","flatpickr-weekdays"));var e=Ce.l10n.firstDayOfWeek,t=Ce.l10n.weekdays.shorthand.slice();return e>0&&e<t.length&&(t=[].concat(t.splice(e,t.length),t.splice(0,e))),Ce.weekdayContainer.innerHTML="\n\t\t<span class=flatpickr-weekday>\n\t\t\t"+t.join("</span><span class=flatpickr-weekday>")+"\n\t\t</span>\n\t\t",Ce.weekdayContainer}function I(){return Ce.calendarContainer.classList.add("hasWeeks"),Ce.weekWrapper=he("div","flatpickr-weekwrapper"),Ce.weekWrapper.appendChild(he("span","flatpickr-weekday",Ce.l10n.weekAbbreviation)),Ce.weekNumbers=he("div","flatpickr-weeks"),Ce.weekWrapper.appendChild(Ce.weekNumbers),Ce.weekWrapper}function Y(e,t,n){t=void 0===t||t;var a=t?e:e-Ce.currentMonth,r=!Ce.config.animate||n===!1;if(!(a<0&&Ce._hidePrevMonthArrow||a>0&&Ce._hideNextMonthArrow)){if(Ce.currentMonth+=a,(Ce.currentMonth<0||Ce.currentMonth>11)&&(Ce.currentYear+=Ce.currentMonth>11?1:-1,Ce.currentMonth=(Ce.currentMonth+12)%12,le("YearChange")),k(r?void 0:a),r)return le("MonthChange"),de();var i=Ce.navigationCurrentMonth;if(a<0)for(;i.nextSibling&&/curr/.test(i.nextSibling.className);)Ce.monthNav.removeChild(i.nextSibling);else if(a>0)for(;i.previousSibling&&/curr/.test(i.previousSibling.className);)Ce.monthNav.removeChild(i.previousSibling);if(Ce.oldCurMonth=Ce.navigationCurrentMonth,Ce.navigationCurrentMonth=Ce.monthNav.insertBefore(Ce.oldCurMonth.cloneNode(!0),a>0?Ce.oldCurMonth.nextSibling:Ce.oldCurMonth),a>0?(Ce.daysContainer.firstChild.classList.add("slideLeft"),Ce.daysContainer.lastChild.classList.add("slideLeftNew"),Ce.oldCurMonth.classList.add("slideLeft"),Ce.navigationCurrentMonth.classList.add("slideLeftNew")):a<0&&(Ce.daysContainer.firstChild.classList.add("slideRightNew"),Ce.daysContainer.lastChild.classList.add("slideRight"),Ce.oldCurMonth.classList.add("slideRight"),Ce.navigationCurrentMonth.classList.add("slideRightNew")),Ce.currentMonthElement=Ce.navigationCurrentMonth.firstChild,Ce.currentYearElement=Ce.navigationCurrentMonth.lastChild.childNodes[0],de(),Ce.oldCurMonth.firstChild.textContent=Ce.utils.monthToStr(Ce.currentMonth-a),le("MonthChange"),document.activeElement&&document.activeElement.$i){var o=document.activeElement.$i;_(function(){E(o,0)})}}}function F(e){Ce.input.value="",Ce.altInput&&(Ce.altInput.value=""),Ce.mobileInput&&(Ce.mobileInput.value=""),Ce.selectedDates=[],Ce.latestSelectedDateObj=void 0,Ce.showTimeInput=!1,Ce.redraw(),e!==!1&&le("Change")}function j(){Ce.isOpen=!1,Ce.isMobile||(Ce.calendarContainer.classList.remove("open"),Ce._input.classList.remove("active")),le("Close")}function A(){void 0!==Ce.config&&le("Destroy");for(var e=Ce._handlers.length;e--;){var t=Ce._handlers[e];t.element.removeEventListener(t.event,t.handler)}Ce._handlers=[],Ce.mobileInput?(Ce.mobileInput.parentNode&&Ce.mobileInput.parentNode.removeChild(Ce.mobileInput),Ce.mobileInput=null):Ce.calendarContainer&&Ce.calendarContainer.parentNode&&Ce.calendarContainer.parentNode.removeChild(Ce.calendarContainer),Ce.altInput&&(Ce.input.type="text",Ce.altInput.parentNode&&Ce.altInput.parentNode.removeChild(Ce.altInput),delete Ce.altInput),Ce.input&&(Ce.input.type=Ce.input._type,Ce.input.classList.remove("flatpickr-input"),Ce.input.removeAttribute("readonly"),Ce.input.value=""),["_showTimeInput","latestSelectedDateObj","_hideNextMonthArrow","_hidePrevMonthArrow","__hideNextMonthArrow","__hidePrevMonthArrow","isMobile","isOpen","selectedDateElem","minDateHasTime","maxDateHasTime","days","daysContainer","_input","_positionElement","innerContainer","rContainer","monthNav","todayDateElem","calendarContainer","weekdayContainer","prevMonthNav","nextMonthNav","currentMonthElement","currentYearElement","navigationCurrentMonth","selectedDateElem","config"].forEach(function(e){return delete Ce[e]})}function P(e){return!(!Ce.config.appendTo||!Ce.config.appendTo.contains(e))||Ce.calendarContainer.contains(e)}function L(e){if(Ce.isOpen&&!Ce.config.inline){var t=P(e.target),n=e.target===Ce.input||e.target===Ce.altInput||Ce.element.contains(e.target)||e.path&&e.path.indexOf&&(~e.path.indexOf(Ce.input)||~e.path.indexOf(Ce.altInput)),a="blur"===e.type?n&&e.relatedTarget&&!P(e.relatedTarget):!n&&!t;a&&Ce.config.ignoredFocusElements.indexOf(e.target)===-1&&(Ce.close(),"range"===Ce.config.mode&&1===Ce.selectedDates.length&&(Ce.clear(!1),Ce.redraw()))}}function R(e){if(!(!e||Ce.currentYearElement.min&&e<Ce.currentYearElement.min||Ce.currentYearElement.max&&e>Ce.currentYearElement.max)){var t=parseInt(e,10),n=Ce.currentYear!==t;Ce.currentYear=t||Ce.currentYear,Ce.config.maxDate&&Ce.currentYear===Ce.config.maxDate.getFullYear()?Ce.currentMonth=Math.min(Ce.config.maxDate.getMonth(),Ce.currentMonth):Ce.config.minDate&&Ce.currentYear===Ce.config.minDate.getFullYear()&&(Ce.currentMonth=Math.max(Ce.config.minDate.getMonth(),Ce.currentMonth)),n&&(Ce.redraw(),le("YearChange"))}}function H(e,t){if(Ce.config.minDate&&be(e,Ce.config.minDate,void 0!==t?t:!Ce.minDateHasTime)<0||Ce.config.maxDate&&be(e,Ce.config.maxDate,void 0!==t?t:!Ce.maxDateHasTime)>0)return!1;if(!Ce.config.enable.length&&!Ce.config.disable.length)return!0;for(var n,a=Ce.parseDate(e,null,!0),r=Ce.config.enable.length>0,i=r?Ce.config.enable:Ce.config.disable,o=0;o<i.length;o++){if(n=i[o],n instanceof Function&&n(a))return r;if(n instanceof Date&&n.getTime()===a.getTime())return r;if("string"==typeof n&&Ce.parseDate(n,null,!0).getTime()===a.getTime())return r;if("object"===("undefined"==typeof n?"undefined":l(n))&&n.from&&n.to&&a>=n.from&&a<=n.to)return r}return!r}function W(e){var t=e.target===Ce._input,n=P(e.target),a=Ce.config.allowInput,r=Ce.isOpen&&(!a||!t),i=Ce.config.inline&&t&&!a;if("Enter"===e.key&&a&&t)return Ce.setDate(Ce._input.value,!0,e.target===Ce.altInput?Ce.config.altFormat:Ce.config.dateFormat),e.target.blur();if(n||r||i){var o=Ce.timeContainer&&Ce.timeContainer.contains(e.target);switch(e.key){case"Enter":o?fe():V(e);break;case"Escape":e.preventDefault(),Ce.close();break;case"ArrowLeft":case"ArrowRight":if(!o)if(e.preventDefault(),Ce.daysContainer){var l="ArrowRight"===e.key?1:-1;e.ctrlKey?Y(l,!0):E(e.target.$i,l)}else Ce.config.enableTime&&!o&&Ce.hourElement.focus();break;case"ArrowUp":case"ArrowDown":e.preventDefault();var u="ArrowDown"===e.key?1:-1;Ce.daysContainer?e.ctrlKey?(R(Ce.currentYear-u),E(e.target.$i,0)):o||E(e.target.$i,7*u):Ce.config.enableTime&&(o||Ce.hourElement.focus(),c(e));break;case"Tab":e.target===Ce.hourElement?(e.preventDefault(),Ce.minuteElement.select()):e.target===Ce.minuteElement&&(Ce.secondElement||Ce.amPM)?(e.preventDefault(),(Ce.secondElement||Ce.amPM).focus()):e.target===Ce.secondElement&&(e.preventDefault(),Ce.amPM.focus());break;case"a":e.target===Ce.amPM&&(Ce.amPM.textContent="AM",s(),fe());break;case"p":e.target===Ce.amPM&&(Ce.amPM.textContent="PM",s(),fe())}le("KeyDown",e)}}function J(e){if(1===Ce.selectedDates.length&&e.classList.contains("flatpickr-day")){for(var t=e.dateObj,n=Ce.parseDate(Ce.selectedDates[0],null,!0),a=Math.min(t.getTime(),Ce.selectedDates[0].getTime()),r=Math.max(t.getTime(),Ce.selectedDates[0].getTime()),i=!1,o=a;o<r;o+=Ce.utils.duration.DAY)if(!H(new Date(o))){i=!0;break}for(var l=function(o,l){var c=o<Ce.minRangeDate.getTime()||o>Ce.maxRangeDate.getTime(),s=Ce.days.childNodes[l];if(c)return Ce.days.childNodes[l].classList.add("notAllowed"),["inRange","startRange","endRange"].forEach(function(e){s.classList.remove(e)}),"continue";if(i&&!c)return"continue";["startRange","inRange","endRange","notAllowed"].forEach(function(e){s.classList.remove(e)});var u=Math.max(Ce.minRangeDate.getTime(),a),d=Math.min(Ce.maxRangeDate.getTime(),r);e.classList.add(t<Ce.selectedDates[0]?"startRange":"endRange"),n<t&&o===n.getTime()?s.classList.add("startRange"):n>t&&o===n.getTime()&&s.classList.add("endRange"),o>=u&&o<=d&&s.classList.add("inRange")},c=Ce.days.childNodes[0].dateObj.getTime(),s=0;s<42;s++,c+=Ce.utils.duration.DAY){l(c,s)}}}function $(){!Ce.isOpen||Ce.config.static||Ce.config.inline||q()}function B(e,t){return Ce.isMobile?(e&&(e.preventDefault(),e.target.blur()),setTimeout(function(){Ce.mobileInput.click()},0),void le("Open")):void(Ce.isOpen||Ce._input.disabled||Ce.config.inline||(Ce.isOpen=!0,Ce.calendarContainer.classList.add("open"),q(t),Ce._input.classList.add("active"),le("Open")))}function U(e){return function(t){var n=Ce.config["_"+e+"Date"]=Ce.parseDate(t),a=Ce.config["_"+("min"===e?"max":"min")+"Date"],r=t&&n instanceof Date;r&&(Ce[e+"DateHasTime"]=n.getHours()||n.getMinutes()||n.getSeconds()),Ce.selectedDates&&(Ce.selectedDates=Ce.selectedDates.filter(function(e){return H(e)}),Ce.selectedDates.length||"min"!==e||u(n),fe()),Ce.daysContainer&&(G(),r?Ce.currentYearElement[e]=n.getFullYear():Ce.currentYearElement.removeAttribute(e),Ce.currentYearElement.disabled=a&&n&&a.getFullYear()===n.getFullYear())}}function K(){var e=["wrap","weekNumbers","allowInput","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"],t=["onChange","onClose","onDayCreate","onDestroy","onKeyDown","onMonthChange","onOpen","onParseConfig","onReady","onValueUpdate","onYearChange"];Ce.config=Object.create(i.defaultConfig);var n=o({},Ce.instanceConfig,JSON.parse(JSON.stringify(Ce.element.dataset||{})));Ce.config.parseDate=n.parseDate,Ce.config.formatDate=n.formatDate,Object.defineProperty(Ce.config,"enable",{get:function(){return Ce.config._enable||[]},set:function(e){return Ce.config._enable=ee(e)}}),Object.defineProperty(Ce.config,"disable",{get:function(){return Ce.config._disable||[]},set:function(e){return Ce.config._disable=ee(e)}}),o(Ce.config,n),!n.dateFormat&&n.enableTime&&(Ce.config.dateFormat=Ce.config.noCalendar?"H:i"+(Ce.config.enableSeconds?":S":""):i.defaultConfig.dateFormat+" H:i"+(Ce.config.enableSeconds?":S":"")),n.altInput&&n.enableTime&&!n.altFormat&&(Ce.config.altFormat=Ce.config.noCalendar?"h:i"+(Ce.config.enableSeconds?":S K":" K"):i.defaultConfig.altFormat+(" h:i"+(Ce.config.enableSeconds?":S":"")+" K")),Object.defineProperty(Ce.config,"minDate",{get:function(){return this._minDate},set:U("min")}),Object.defineProperty(Ce.config,"maxDate",{get:function(){return this._maxDate},set:U("max")}),Ce.config.minDate=n.minDate,Ce.config.maxDate=n.maxDate;for(var a=0;a<e.length;a++)Ce.config[e[a]]=Ce.config[e[a]]===!0||"true"===Ce.config[e[a]];for(var l=t.length;l--;)void 0!==Ce.config[t[l]]&&(Ce.config[t[l]]=ve(Ce.config[t[l]]||[]).map(r));for(var c=0;c<Ce.config.plugins.length;c++){var s=Ce.config.plugins[c](Ce)||{};for(var u in s)Ce.config[u]instanceof Array||~t.indexOf(u)?Ce.config[u]=ve(s[u]).map(r).concat(Ce.config[u]):"undefined"==typeof n[u]&&(Ce.config[u]=s[u])}le("ParseConfig")}function z(){"object"!==l(Ce.config.locale)&&"undefined"==typeof i.l10ns[Ce.config.locale]&&console.warn("flatpickr: invalid locale "+Ce.config.locale),Ce.l10n=o(Object.create(i.l10ns.default),"object"===l(Ce.config.locale)?Ce.config.locale:"default"!==Ce.config.locale?i.l10ns[Ce.config.locale]||{}:{})}function q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ce._positionElement;if(void 0!==Ce.calendarContainer){var t=Ce.calendarContainer.offsetHeight,n=Ce.calendarContainer.offsetWidth,a=Ce.config.position,r=e.getBoundingClientRect(),i=window.innerHeight-r.bottom,o="above"===a||"below"!==a&&i<t&&r.top>t,l=window.pageYOffset+r.top+(o?-t-2:e.offsetHeight+2);if(De(Ce.calendarContainer,"arrowTop",!o),De(Ce.calendarContainer,"arrowBottom",o),!Ce.config.inline){var c=window.pageXOffset+r.left,s=window.document.body.offsetWidth-r.right,u=c+n>window.document.body.offsetWidth;De(Ce.calendarContainer,"rightMost",u),Ce.config.static||(Ce.calendarContainer.style.top=l+"px",u?(Ce.calendarContainer.style.left="auto",Ce.calendarContainer.style.right=s+"px"):(Ce.calendarContainer.style.left=c+"px",Ce.calendarContainer.style.right="auto"))}}}function G(){Ce.config.noCalendar||Ce.isMobile||(O(),de(),k())}function V(e){if(e.preventDefault(),e.stopPropagation(),e.target.classList.contains("flatpickr-day")&&!e.target.classList.contains("disabled")&&!e.target.classList.contains("notAllowed")){var t=Ce.latestSelectedDateObj=new Date(e.target.dateObj.getTime()),n=t.getMonth()!==Ce.currentMonth&&"range"!==Ce.config.mode;if(Ce.selectedDateElem=e.target,"single"===Ce.config.mode)Ce.selectedDates=[t];else if("multiple"===Ce.config.mode){var a=se(t);a?Ce.selectedDates.splice(a,1):Ce.selectedDates.push(t)}else"range"===Ce.config.mode&&(2===Ce.selectedDates.length&&Ce.clear(),Ce.selectedDates.push(t),0!==be(t,Ce.selectedDates[0],!0)&&Ce.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()}));if(s(),n){var r=Ce.currentYear!==t.getFullYear();Ce.currentYear=t.getFullYear(),Ce.currentMonth=t.getMonth(),r&&le("YearChange"),le("MonthChange")}if(k(),Ce.minDateHasTime&&Ce.config.enableTime&&0===be(t,Ce.config.minDate)&&u(Ce.config.minDate),fe(),Ce.config.enableTime&&setTimeout(function(){return Ce.showTimeInput=!0},50),"range"===Ce.config.mode&&(1===Ce.selectedDates.length?(J(e.target),Ce._hidePrevMonthArrow=Ce._hidePrevMonthArrow||Ce.minRangeDate>Ce.days.childNodes[0].dateObj,Ce._hideNextMonthArrow=Ce._hideNextMonthArrow||Ce.maxRangeDate<new Date(Ce.currentYear,Ce.currentMonth+1,1)):de()),le("Change"),n?_(function(){return Ce.selectedDateElem.focus()}):E(e.target.$i,0),Ce.config.enableTime&&setTimeout(function(){return Ce.hourElement.select()},451),Ce.config.closeOnSelect){var i="single"===Ce.config.mode&&!Ce.config.enableTime,o="range"===Ce.config.mode&&2===Ce.selectedDates.length&&!Ce.config.enableTime;(i||o)&&Ce.close()}}}function Z(e,t){Ce.config[e]=t,Ce.redraw(),y()}function X(e,t){if(e instanceof Array)Ce.selectedDates=e.map(function(e){return Ce.parseDate(e,t)});else if(e instanceof Date||!isNaN(e))Ce.selectedDates=[Ce.parseDate(e,t)];else if(e&&e.substring)switch(Ce.config.mode){case"single":Ce.selectedDates=[Ce.parseDate(e,t)];break;case"multiple":Ce.selectedDates=e.split("; ").map(function(e){return Ce.parseDate(e,t)});break;case"range":Ce.selectedDates=e.split(Ce.l10n.rangeSeparator).map(function(e){return Ce.parseDate(e,t)})}Ce.selectedDates=Ce.selectedDates.filter(function(e){return e instanceof Date&&H(e,!1)}),Ce.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()})}function Q(e,t,n){return 0===e||e?(X(e,n),Ce.showTimeInput=Ce.selectedDates.length>0,Ce.latestSelectedDateObj=Ce.selectedDates[0],Ce.redraw(),y(),u(),fe(t),void(t&&le("Change"))):Ce.clear(t)}function ee(e){for(var t=e.length;t--;)"string"==typeof e[t]||+e[t]?e[t]=Ce.parseDate(e[t],null,!0):e[t]&&e[t].from&&e[t].to&&(e[t].from=Ce.parseDate(e[t].from),e[t].to=Ce.parseDate(e[t].to));return e.filter(function(e){return e})}function te(){Ce.selectedDates=[],Ce.now=new Date;var e=Ce.config.defaultDate||Ce.input.value;e&&X(e,Ce.config.dateFormat);var t=Ce.selectedDates.length?Ce.selectedDates[0]:Ce.config.minDate&&Ce.config.minDate.getTime()>Ce.now?Ce.config.minDate:Ce.config.maxDate&&Ce.config.maxDate.getTime()<Ce.now?Ce.config.maxDate:Ce.now;Ce.currentYear=t.getFullYear(),Ce.currentMonth=t.getMonth(),Ce.selectedDates.length&&(Ce.latestSelectedDateObj=Ce.selectedDates[0]),Ce.minDateHasTime=Ce.config.minDate&&(Ce.config.minDate.getHours()||Ce.config.minDate.getMinutes()||Ce.config.minDate.getSeconds()),Ce.maxDateHasTime=Ce.config.maxDate&&(Ce.config.maxDate.getHours()||Ce.config.maxDate.getMinutes()||Ce.config.maxDate.getSeconds()),Object.defineProperty(Ce,"latestSelectedDateObj",{get:function(){return Ce._selectedDateObj||Ce.selectedDates[Ce.selectedDates.length-1]},set:function(e){Ce._selectedDateObj=e}}),Ce.isMobile||Object.defineProperty(Ce,"showTimeInput",{get:function(){return Ce._showTimeInput},set:function(e){Ce._showTimeInput=e,Ce.calendarContainer&&De(Ce.calendarContainer,"showTimeInput",e),q()}})}function ne(){Ce.utils={duration:{DAY:864e5},getDaysinMonth:function(e,t){return e="undefined"==typeof e?Ce.currentMonth:e,t="undefined"==typeof t?Ce.currentYear:t,1===e&&(t%4===0&&t%100!==0||t%400===0)?29:Ce.l10n.daysInMonth[e]},monthToStr:function(e,t){return t="undefined"==typeof t?Ce.config.shorthandCurrentMonth:t,Ce.l10n.months[(t?"short":"long")+"hand"][e]}}}function ae(){Ce.formats=Object.create(a.prototype.formats),["D","F","J","M","W","l"].forEach(function(e){Ce.formats[e]=a.prototype.formats[e].bind(Ce)}),Ce.revFormat.F=a.prototype.revFormat.F.bind(Ce),Ce.revFormat.M=a.prototype.revFormat.M.bind(Ce)}function re(){return Ce.input=Ce.config.wrap?Ce.element.querySelector("[data-input]"):Ce.element,Ce.input?(Ce.input._type=Ce.input.type,Ce.input.type="text",Ce.input.classList.add("flatpickr-input"),Ce._input=Ce.input,Ce.config.altInput&&(Ce.altInput=he(Ce.input.nodeName,Ce.input.className+" "+Ce.config.altInputClass),Ce._input=Ce.altInput,Ce.altInput.placeholder=Ce.input.placeholder,Ce.altInput.disabled=Ce.input.disabled,Ce.altInput.required=Ce.input.required,Ce.altInput.type="text",Ce.input.type="hidden",!Ce.config.static&&Ce.input.parentNode&&Ce.input.parentNode.insertBefore(Ce.altInput,Ce.input.nextSibling)),Ce.config.allowInput||Ce._input.setAttribute("readonly","readonly"),void(Ce._positionElement=Ce.config.positionElement||Ce._input)):console.warn("Error: invalid input element specified",Ce.input)}function ie(){var e=Ce.config.enableTime?Ce.config.noCalendar?"time":"datetime-local":"date";Ce.mobileInput=he("input",Ce.input.className+" flatpickr-mobile"),Ce.mobileInput.step="any",Ce.mobileInput.tabIndex=1,Ce.mobileInput.type=e,Ce.mobileInput.disabled=Ce.input.disabled,Ce.mobileInput.placeholder=Ce.input.placeholder,Ce.mobileFormatStr="datetime-local"===e?"Y-m-d\\TH:i:S":"date"===e?"Y-m-d":"H:i:S",Ce.selectedDates.length&&(Ce.mobileInput.defaultValue=Ce.mobileInput.value=Ce.formatDate(Ce.selectedDates[0],Ce.mobileFormatStr)),Ce.config.minDate&&(Ce.mobileInput.min=Ce.formatDate(Ce.config.minDate,"Y-m-d")),Ce.config.maxDate&&(Ce.mobileInput.max=Ce.formatDate(Ce.config.maxDate,"Y-m-d")),Ce.input.type="hidden",Ce.config.altInput&&(Ce.altInput.type="hidden");try{Ce.input.parentNode.insertBefore(Ce.mobileInput,Ce.input.nextSibling)}catch(e){}Ce.mobileInput.addEventListener("change",function(e){Ce.setDate(e.target.value,!1,Ce.mobileFormatStr),le("Change"),le("Close")})}function oe(){
return Ce.isOpen?Ce.close():void Ce.open()}function le(e,t){var n=Ce.config["on"+e];if(void 0!==n&&n.length>0)for(var a=0;n[a]&&a<n.length;a++)n[a](Ce.selectedDates,Ce.input.value,Ce,t);"Change"===e&&(Ce.input.dispatchEvent(ce("change")),Ce.input.dispatchEvent(ce("input")))}function ce(e){return Ce._supportsEvents?new Event(e,{bubbles:!0}):(Ce._[e+"Event"]=document.createEvent("Event"),Ce._[e+"Event"].initEvent(e,!0,!0),Ce._[e+"Event"])}function se(e){for(var t=0;t<Ce.selectedDates.length;t++)if(0===be(Ce.selectedDates[t],e))return""+t;return!1}function ue(e){return!("range"!==Ce.config.mode||Ce.selectedDates.length<2)&&(be(e,Ce.selectedDates[0])>=0&&be(e,Ce.selectedDates[1])<=0)}function de(){Ce.config.noCalendar||Ce.isMobile||!Ce.monthNav||(Ce.currentMonthElement.textContent=Ce.utils.monthToStr(Ce.currentMonth)+" ",Ce.currentYearElement.value=Ce.currentYear,Ce._hidePrevMonthArrow=Ce.config.minDate&&(Ce.currentYear===Ce.config.minDate.getFullYear()?Ce.currentMonth<=Ce.config.minDate.getMonth():Ce.currentYear<Ce.config.minDate.getFullYear()),Ce._hideNextMonthArrow=Ce.config.maxDate&&(Ce.currentYear===Ce.config.maxDate.getFullYear()?Ce.currentMonth+1>Ce.config.maxDate.getMonth():Ce.currentYear>Ce.config.maxDate.getFullYear()))}function fe(e){if(!Ce.selectedDates.length)return Ce.clear(e);Ce.isMobile&&(Ce.mobileInput.value=Ce.selectedDates.length?Ce.formatDate(Ce.latestSelectedDateObj,Ce.mobileFormatStr):"");var t="range"!==Ce.config.mode?"; ":Ce.l10n.rangeSeparator;Ce.input.value=Ce.selectedDates.map(function(e){return Ce.formatDate(e,Ce.config.dateFormat)}).join(t),Ce.config.altInput&&(Ce.altInput.value=Ce.selectedDates.map(function(e){return Ce.formatDate(e,Ce.config.altFormat)}).join(t)),e!==!1&&le("ValueUpdate")}function pe(e){return Math.max(-1,Math.min(1,e.wheelDelta||-e.deltaY))}function me(e){e.preventDefault();var t=Ce.currentYearElement.parentNode.contains(e.target);if(e.target===Ce.currentMonthElement||t){var n=pe(e);t?(R(Ce.currentYear+n),e.target.value=Ce.currentYear):Ce.changeMonth(n,!0,!1)}}function ge(e){var t=Ce.prevMonthNav.contains(e.target),n=Ce.nextMonthNav.contains(e.target);t||n?Y(t?-1:1):e.target===Ce.currentYearElement?(e.preventDefault(),Ce.currentYearElement.select()):"arrowUp"===e.target.className?Ce.changeYear(Ce.currentYear+1):"arrowDown"===e.target.className&&Ce.changeYear(Ce.currentYear-1)}function he(e,t,n){var a=window.document.createElement(e);return t=t||"",n=n||"",a.className=t,void 0!==n&&(a.textContent=n),a}function ve(e){return e instanceof Array?e:[e]}function De(e,t,n){return n?e.classList.add(t):void e.classList.remove(t)}function ye(e,t,n){var a=void 0;return function(){var r=this,i=arguments;clearTimeout(a),a=setTimeout(function(){a=null,n||e.apply(r,i)},t),n&&!a&&e.apply(r,i)}}function be(e,t,n){return e instanceof Date&&t instanceof Date&&(n!==!1?new Date(e.getTime()).setHours(0,0,0,0)-new Date(t.getTime()).setHours(0,0,0,0):e.getTime()-t.getTime())}function we(e){e.preventDefault();var t="keydown"===e.type,n=("wheel"===e.type,"increment"===e.type,e.target);if(Ce.amPM&&e.target===Ce.amPM)return e.target.textContent=["AM","PM"]["AM"===e.target.textContent|0];var a=Number(n.min),r=Number(n.max),i=Number(n.step),o=parseInt(n.value,10),l=e.delta||(t?38===e.which?1:-1:Math.max(-1,Math.min(1,e.wheelDelta||-e.deltaY))||0),c=o+i*l;if("undefined"!=typeof n.value&&2===n.value.length){var s=n===Ce.hourElement,u=n===Ce.minuteElement;c<a?(c=r+c+!s+(s&&!Ce.amPM),u&&w(null,-1,Ce.hourElement)):c>r&&(c=n===Ce.hourElement?c-r-!Ce.amPM:a,u&&w(null,1,Ce.hourElement)),Ce.amPM&&s&&(1===i?c+o===23:Math.abs(c-o)>i)&&(Ce.amPM.textContent="PM"===Ce.amPM.textContent?"AM":"PM"),n.value=Ce.pad(c)}}var Ce=this;return Ce._={},Ce._.afterDayAnim=_,Ce._bind=p,Ce._compareDates=be,Ce._setHoursFromDate=u,Ce.changeMonth=Y,Ce.changeYear=R,Ce.clear=F,Ce.close=j,Ce._createElement=he,Ce.destroy=A,Ce.isEnabled=H,Ce.jumpToDate=y,Ce.open=B,Ce.redraw=G,Ce.set=Z,Ce.setDate=Q,Ce.toggle=oe,n(),Ce}function r(e,t){for(var n=Array.prototype.slice.call(e),r=[],i=0;i<n.length;i++)try{if(null!==n[i].getAttribute("data-fp-omit"))continue;n[i]._flatpickr&&(n[i]._flatpickr.destroy(),n[i]._flatpickr=null),n[i]._flatpickr=new a(n[i],t||{}),r.push(n[i]._flatpickr)}catch(e){console.warn(e,e.stack)}return 1===r.length?r[0]:r}function i(e,t){return e instanceof NodeList?r(e,t):e instanceof HTMLElement?r([e],t):r(window.document.querySelectorAll(e),t)}var o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};a.prototype={formats:{Z:function(e){return e.toISOString()},D:function(e){return this.l10n.weekdays.shorthand[this.formats.w(e)]},F:function(e){return this.utils.monthToStr(this.formats.n(e)-1,!1)},G:function(e){return a.prototype.pad(a.prototype.formats.h(e))},H:function(e){return a.prototype.pad(e.getHours())},J:function(e){return e.getDate()+this.l10n.ordinal(e.getDate())},K:function(e){return e.getHours()>11?"PM":"AM"},M:function(e){return this.utils.monthToStr(e.getMonth(),!0)},S:function(e){return a.prototype.pad(e.getSeconds())},U:function(e){return e.getTime()/1e3},W:function(e){return this.config.getWeek(e)},Y:function(e){return e.getFullYear()},d:function(e){return a.prototype.pad(e.getDate())},h:function(e){return e.getHours()%12?e.getHours()%12:12},i:function(e){return a.prototype.pad(e.getMinutes())},j:function(e){return e.getDate()},l:function(e){return this.l10n.weekdays.longhand[e.getDay()]},m:function(e){return a.prototype.pad(e.getMonth()+1)},n:function(e){return e.getMonth()+1},s:function(e){return e.getSeconds()},w:function(e){return e.getDay()},y:function(e){return String(e.getFullYear()).substring(2)}},formatDate:function(e,t){var n=this;return void 0!==this.config&&void 0!==this.config.formatDate?this.config.formatDate(e,t):t.split("").map(function(t,a,r){return n.formats[t]&&"\\"!==r[a-1]?n.formats[t](e):"\\"!==t?t:""}).join("")},revFormat:{D:function(){},F:function(e,t){e.setMonth(this.l10n.months.longhand.indexOf(t))},G:function(e,t){e.setHours(parseFloat(t))},H:function(e,t){e.setHours(parseFloat(t))},J:function(e,t){e.setDate(parseFloat(t))},K:function(e,t){var n=e.getHours();12!==n&&e.setHours(n%12+12*/pm/i.test(t))},M:function(e,t){e.setMonth(this.l10n.months.shorthand.indexOf(t))},S:function(e,t){e.setSeconds(t)},U:function(e,t){return new Date(1e3*parseFloat(t))},W:function(e,t){return t=parseInt(t),new Date(e.getFullYear(),0,2+7*(t-1),0,0,0,0,0)},Y:function(e,t){e.setFullYear(t)},Z:function(e,t){return new Date(t)},d:function(e,t){e.setDate(parseFloat(t))},h:function(e,t){e.setHours(parseFloat(t))},i:function(e,t){e.setMinutes(parseFloat(t))},j:function(e,t){e.setDate(parseFloat(t))},l:function(){},m:function(e,t){e.setMonth(parseFloat(t)-1)},n:function(e,t){e.setMonth(parseFloat(t)-1)},s:function(e,t){e.setSeconds(parseFloat(t))},w:function(){},y:function(e,t){e.setFullYear(2e3+parseFloat(t))}},tokenRegex:{D:"(\\w+)",F:"(\\w+)",G:"(\\d\\d|\\d)",H:"(\\d\\d|\\d)",J:"(\\d\\d|\\d)\\w+",K:"(am|AM|Am|aM|pm|PM|Pm|pM)",M:"(\\w+)",S:"(\\d\\d|\\d)",U:"(.+)",W:"(\\d\\d|\\d)",Y:"(\\d{4})",Z:"(.+)",d:"(\\d\\d|\\d)",h:"(\\d\\d|\\d)",i:"(\\d\\d|\\d)",j:"(\\d\\d|\\d)",l:"(\\w+)",m:"(\\d\\d|\\d)",n:"(\\d\\d|\\d)",s:"(\\d\\d|\\d)",w:"(\\d\\d|\\d)",y:"(\\d{2})"},pad:function(e){return("0"+e).slice(-2)},parseDate:function(e,t,n){if(0!==e&&!e)return null;var a=e;if(e instanceof Date)e=new Date(e.getTime());else if(void 0!==e.toFixed)e=new Date(e);else{var r=t||(this.config||i.defaultConfig).dateFormat;if(e=String(e).trim(),"today"===e)e=new Date,n=!0;else if(/Z$/.test(e)||/GMT$/.test(e))e=new Date(e);else if(this.config&&this.config.parseDate)e=this.config.parseDate(e,r);else{for(var o=this.config&&this.config.noCalendar?new Date((new Date).setHours(0,0,0,0)):new Date((new Date).getFullYear(),0,1,0,0,0,0),l=void 0,c=0,s=0,u="";c<r.length;c++){var d=r[c],f="\\"===d,p="\\"===r[c-1]||f;if(this.tokenRegex[d]&&!p){u+=this.tokenRegex[d];var m=new RegExp(u).exec(e);m&&(l=!0)&&(o=this.revFormat[d](o,m[++s])||o)}else f||(u+=".")}e=l?o:null}}return e instanceof Date?(n===!0&&e.setHours(0,0,0,0),e):(console.warn("flatpickr: invalid date "+a),console.info(this.element),null)}},"undefined"!=typeof HTMLElement&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(e){return r(this,e)},HTMLElement.prototype.flatpickr=function(e){return r([this],e)}),i.defaultConfig=a.defaultConfig={mode:"single",position:"auto",animate:window.navigator.userAgent.indexOf("MSIE")===-1,wrap:!1,weekNumbers:!1,allowInput:!1,clickOpens:!0,closeOnSelect:!0,time_24hr:!1,enableTime:!1,noCalendar:!1,dateFormat:"Y-m-d",ariaDateFormat:"F j, Y",altInput:!1,altInputClass:"form-control input",altFormat:"F j, Y",defaultDate:null,minDate:null,maxDate:null,parseDate:null,formatDate:null,getWeek:function(e){var t=new Date(e.getTime()),n=new Date(t.getFullYear(),0,1);return Math.ceil(((t-n)/864e5+n.getDay()+1)/7)},enable:[],disable:[],shorthandCurrentMonth:!1,inline:!1,static:!1,appendTo:null,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",enableSeconds:!1,hourIncrement:1,minuteIncrement:5,defaultHour:12,defaultMinute:0,disableMobile:!1,locale:"default",plugins:[],ignoredFocusElements:[],onClose:void 0,onChange:void 0,onDayCreate:void 0,onMonthChange:void 0,onOpen:void 0,onParseConfig:void 0,onReady:void 0,onValueUpdate:void 0,onYearChange:void 0,onKeyDown:void 0,onDestroy:void 0},i.l10ns={en:{weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(e){var t=e%100;if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle"}},i.l10ns.default=Object.create(i.l10ns.en),i.localize=function(e){return o(i.l10ns.default,e||{})},i.setDefaults=function(e){return o(i.defaultConfig,e||{})},"undefined"!=typeof jQuery&&(jQuery.fn.flatpickr=function(e){return r(this,e)}),Date.prototype.fp_incr=function(e){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+parseInt(e,10))},e.exports=i},function(e,t,n){var a=n(43)(n(11),n(44),null,null);e.exports=a.exports},function(e,t){e.exports=function(e,t,n,a){var r,i=e=e||{},o=typeof e.default;"object"!==o&&"function"!==o||(r=e,i=e.default);var l="function"==typeof i?i.options:i;if(t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),n&&(l._scopeId=n),a){var c=l.computed||(l.computed={});Object.keys(a).forEach(function(e){var t=a[e];c[e]=function(){return t}})}return{esModule:r,exports:i,options:l}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.value}})},staticRenderFns:[]}}])});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 38:
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

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 39:
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

/***/ 42:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createAlumni"] = createAlumni;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_mixins_HasAlerts_js__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Edit_vue__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Edit_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Edit_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_Alumni_Subscription_vue__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_Alumni_Subscription_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__vue_components_Alumni_Subscription_vue__);








__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

function createAlumni(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		mixins: [__WEBPACK_IMPORTED_MODULE_2__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			alum: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,

		router: new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
			routes: [{
				path: '/',
				component: __WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Edit_vue___default.a,
				props: {
					alum: this.alum
				}
			}, {
				path: '/subscription',
				component: __WEBPACK_IMPORTED_MODULE_4__vue_components_Alumni_Subscription_vue___default.a,
				props: {
					alum: this.alum
				}
			}]
		})
	});
}

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(38),
  /* template */
  __webpack_require__(112),
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

/***/ 688:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c("div")
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8e5d72ae", module.exports)
  }
}

/***/ })

},[444]);
});
//# sourceMappingURL=vue-alumni.js.map