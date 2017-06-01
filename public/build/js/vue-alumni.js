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

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(34);
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

/***/ 110:
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

/***/ 113:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 117:
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

/***/ 118:
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

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.5.3
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
    while (parent) {
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
      val.slice().forEach(function (val2) {
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
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
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
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
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

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this.$root._route }
  });

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
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
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
  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath),
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
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
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
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
    }
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

function compileRouteRegex (path) {
  var regex = index(path);
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
    } else if (current.matched) {
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
        position = getElementPosition(el);
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

function getElementPosition (el) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
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
    if (called) { return }
    called = true;
    return fn.apply(this, arguments)
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
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
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
  var i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  );
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
  this.fallback = mode === 'history' && !supportsPushState;
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
VueRouter.version = '2.5.3';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(133)))

/***/ }),

/***/ 175:
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

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(197)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(184),
  /* template */
  __webpack_require__(209),
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

/***/ 184:
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

/***/ 197:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 209:
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

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(699),
  /* template */
  __webpack_require__(700),
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

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(113)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(110),
  /* template */
  __webpack_require__(118),
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

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.INDEX=t():e.INDEX=t()}(this,function(){return function(e){function t(a){if(n[a])return n[a].exports;var r=n[a]={exports:{},id:a,loaded:!1};return e[a].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p=".",t(0)}([function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),i=a(r),o=n(42),c=a(o),l=function(e){e.component("Flatpickr",c.default)};t.default=(0,i.default)(c.default,{install:l})},function(e,t){var n=e.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(e,t,n){e.exports=!n(3)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t){e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t){var n=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(e,t){e.exports=function(e){return"object"==typeof e?null!==e:"function"==typeof e}},function(e,t,n){e.exports={default:n(14),__esModule:!0}},function(e,t){e.exports=function(e){if(void 0==e)throw TypeError("Can't call method on  "+e);return e}},function(e,t,n){var a=n(18);e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==a(e)?e.split(""):Object(e)}},function(e,t){var n=Math.ceil,a=Math.floor;e.exports=function(e){return isNaN(e=+e)?0:(e>0?a:n)(e)}},function(e,t,n){var a=n(8),r=n(7);e.exports=function(e){return a(r(e))}},function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(6),i=a(r),o=n(12),c=a(o),l=n(41),s=a(l);t.default={props:{placeholder:{type:String,default:""},options:{type:Object,default:function(){return{}}},value:{type:String,default:""}},data:function(){return{fp:null}},computed:{fpOptions:function(){return(0,c.default)(this.options)}},watch:{value:function(e){this.fp.setDate(e)},fpOptions:function(e){var t=JSON.parse(e);for(var n in t)this.fp.set(n,t[n])}},mounted:function(){var e=this,t=this.options.onValueUpdate;this.fp=new s.default(this.$el,(0,i.default)(this.options,{onValueUpdate:function(){e.onInput(e.$el.value),"function"==typeof t&&t()}})),this.$emit("FlatpickrRef",this.fp)},destroyed:function(){this.fp.destroy(),this.fp=null},methods:{onInput:function(e){"string"==typeof e?this.$emit("input",e):this.$emit("input",e.target.value)}}}},function(e,t,n){e.exports={default:n(13),__esModule:!0}},function(e,t,n){var a=n(1),r=a.JSON||(a.JSON={stringify:JSON.stringify});e.exports=function(e){return r.stringify.apply(r,arguments)}},function(e,t,n){n(40),e.exports=n(1).Object.assign},function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},function(e,t,n){var a=n(5);e.exports=function(e){if(!a(e))throw TypeError(e+" is not an object!");return e}},function(e,t,n){var a=n(10),r=n(36),i=n(35);e.exports=function(e){return function(t,n,o){var c,l=a(t),s=r(l.length),u=i(o,s);if(e&&n!=n){for(;s>u;)if(c=l[u++],c!=c)return!0}else for(;s>u;u++)if((e||u in l)&&l[u]===n)return e||u||0;return!e&&-1}}},function(e,t){var n={}.toString;e.exports=function(e){return n.call(e).slice(8,-1)}},function(e,t,n){var a=n(15);e.exports=function(e,t,n){if(a(e),void 0===t)return e;switch(n){case 1:return function(n){return e.call(t,n)};case 2:return function(n,a){return e.call(t,n,a)};case 3:return function(n,a,r){return e.call(t,n,a,r)}}return function(){return e.apply(t,arguments)}}},function(e,t,n){var a=n(5),r=n(4).document,i=a(r)&&a(r.createElement);e.exports=function(e){return i?r.createElement(e):{}}},function(e,t){e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,n){var a=n(4),r=n(1),i=n(19),o=n(24),c="prototype",l=function(e,t,n){var s,u,d,f=e&l.F,p=e&l.G,m=e&l.S,g=e&l.P,h=e&l.B,v=e&l.W,D=p?r:r[t]||(r[t]={}),b=D[c],y=p?a:m?a[t]:(a[t]||{})[c];p&&(n=t);for(s in n)u=!f&&y&&void 0!==y[s],u&&s in D||(d=u?y[s]:n[s],D[s]=p&&"function"!=typeof y[s]?n[s]:h&&u?i(d,a):v&&y[s]==d?function(e){var t=function(t,n,a){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,n)}return new e(t,n,a)}return e.apply(this,arguments)};return t[c]=e[c],t}(d):g&&"function"==typeof d?i(Function.call,d):d,g&&((D.virtual||(D.virtual={}))[s]=d,e&l.R&&b&&!b[s]&&o(b,s,d)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,e.exports=l},function(e,t){var n={}.hasOwnProperty;e.exports=function(e,t){return n.call(e,t)}},function(e,t,n){var a=n(27),r=n(32);e.exports=n(2)?function(e,t,n){return a.f(e,t,r(1,n))}:function(e,t,n){return e[t]=n,e}},function(e,t,n){e.exports=!n(2)&&!n(3)(function(){return 7!=Object.defineProperty(n(20)("div"),"a",{get:function(){return 7}}).a})},function(e,t,n){"use strict";var a=n(30),r=n(28),i=n(31),o=n(37),c=n(8),l=Object.assign;e.exports=!l||n(3)(function(){var e={},t={},n=Symbol(),a="abcdefghijklmnopqrst";return e[n]=7,a.split("").forEach(function(e){t[e]=e}),7!=l({},e)[n]||Object.keys(l({},t)).join("")!=a})?function(e,t){for(var n=o(e),l=arguments.length,s=1,u=r.f,d=i.f;l>s;)for(var f,p=c(arguments[s++]),m=u?a(p).concat(u(p)):a(p),g=m.length,h=0;g>h;)d.call(p,f=m[h++])&&(n[f]=p[f]);return n}:l},function(e,t,n){var a=n(16),r=n(25),i=n(38),o=Object.defineProperty;t.f=n(2)?Object.defineProperty:function(e,t,n){if(a(e),t=i(t,!0),a(n),r)try{return o(e,t,n)}catch(e){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(e[t]=n.value),e}},function(e,t){t.f=Object.getOwnPropertySymbols},function(e,t,n){var a=n(23),r=n(10),i=n(17)(!1),o=n(33)("IE_PROTO");e.exports=function(e,t){var n,c=r(e),l=0,s=[];for(n in c)n!=o&&a(c,n)&&s.push(n);for(;t.length>l;)a(c,n=t[l++])&&(~i(s,n)||s.push(n));return s}},function(e,t,n){var a=n(29),r=n(21);e.exports=Object.keys||function(e){return a(e,r)}},function(e,t){t.f={}.propertyIsEnumerable},function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,n){var a=n(34)("keys"),r=n(39);e.exports=function(e){return a[e]||(a[e]=r(e))}},function(e,t,n){var a=n(4),r="__core-js_shared__",i=a[r]||(a[r]={});e.exports=function(e){return i[e]||(i[e]={})}},function(e,t,n){var a=n(9),r=Math.max,i=Math.min;e.exports=function(e,t){return e=a(e),e<0?r(e+t,0):i(e,t)}},function(e,t,n){var a=n(9),r=Math.min;e.exports=function(e){return e>0?r(a(e),9007199254740991):0}},function(e,t,n){var a=n(7);e.exports=function(e){return Object(a(e))}},function(e,t,n){var a=n(5);e.exports=function(e,t){if(!a(e))return e;var n,r;if(t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;if("function"==typeof(n=e.valueOf)&&!a(r=n.call(e)))return r;if(!t&&"function"==typeof(n=e.toString)&&!a(r=n.call(e)))return r;throw TypeError("Can't convert object to primitive value")}},function(e,t){var n=0,a=Math.random();e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++n+a).toString(36))}},function(e,t,n){var a=n(22);a(a.S+a.F,"Object",{assign:n(26)})},function(e,t,n){/*! flatpickr v2.3.4, @license MIT */
function a(e,t){function n(){e._flatpickr&&E(e._flatpickr),e._flatpickr=oe,oe.element=e,oe.instanceConfig=t||{},$(),P(),F(),V(),B(),z(),oe.isOpen=oe.config.inline,oe.changeMonth=C,oe.clear=M,oe.close=x,oe.destroy=E,oe.formatDate=O,oe.jumpToDate=f,oe.open=N,oe.redraw=R,oe.set=W,oe.setDate=J,oe.toggle=q,oe.isMobile=!oe.config.disableMobile&&!oe.config.inline&&"single"===oe.config.mode&&!oe.config.disable.length&&!oe.config.enable.length&&!oe.config.weekNumbers&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),oe.isMobile||g(),d(),oe.isMobile||Object.defineProperty(oe,"dateIsPicked",{set:function(e){return e?oe.calendarContainer.classList.add("dateIsPicked"):void oe.calendarContainer.classList.remove("dateIsPicked")}}),oe.dateIsPicked=oe.selectedDates.length>0||oe.config.noCalendar,oe.selectedDates.length&&(oe.config.enableTime&&l(),ee()),oe.config.weekNumbers&&(oe.calendarContainer.style.width=oe.days.clientWidth+oe.weekWrapper.clientWidth+"px"),G("Ready")}function r(e){oe.config.noCalendar&&!oe.selectedDates.length&&(oe.selectedDates=[oe.now]),ie(e),oe.selectedDates.length&&(!oe.minDateHasTime||"input"!==e.type||e.target.value.length>=2?(c(),ee()):setTimeout(function(){c(),ee()},1e3))}function c(){if(oe.config.enableTime){var e=parseInt(oe.hourElement.value,10)||0,t=parseInt(oe.minuteElement.value,10)||0,n=oe.config.enableSeconds?parseInt(oe.secondElement.value,10)||0:0;oe.amPM&&(e=e%12+12*("PM"===oe.amPM.textContent)),oe.minDateHasTime&&0===re(oe.latestSelectedDateObj,oe.config.minDate)?(e=Math.max(e,oe.config.minDate.getHours()),e===oe.config.minDate.getHours()&&(t=Math.max(t,oe.config.minDate.getMinutes()))):oe.maxDateHasTime&&0===re(oe.latestSelectedDateObj,oe.config.maxDate)&&(e=Math.min(e,oe.config.maxDate.getHours()),e===oe.config.maxDate.getHours()&&(t=Math.min(t,oe.config.maxDate.getMinutes()))),s(e,t,n)}}function l(e){var t=e||oe.latestSelectedDateObj;t&&s(t.getHours(),t.getMinutes(),t.getSeconds())}function s(e,t,n){oe.selectedDates.length&&oe.latestSelectedDateObj.setHours(e%24,t,n||0,0),oe.config.enableTime&&!oe.isMobile&&(oe.hourElement.value=oe.pad(oe.config.time_24hr?e:(12+e)%12+12*(e%12===0)),oe.minuteElement.value=oe.pad(t),!oe.config.time_24hr&&oe.selectedDates.length&&(oe.amPM.textContent=oe.latestSelectedDateObj.getHours()>=12?"PM":"AM"),oe.config.enableSeconds&&(oe.secondElement.value=oe.pad(n)))}function u(e){4===e.target.value.length&&(oe.currentYearElement.blur(),I(e.target.value),e.target.value=oe.currentYear)}function d(){return oe.config.wrap&&["open","close","toggle","clear"].forEach(function(e){try{oe.element.querySelector("[data-"+e+"]").addEventListener("click",oe[e])}catch(e){}}),void 0!==window.document.createEvent&&(oe.changeEvent=window.document.createEvent("HTMLEvents"),oe.changeEvent.initEvent("change",!1,!0)),oe.isMobile?K():(oe.debouncedResize=ae(Y,50),oe.triggerChange=function(){G("Change")},oe.debouncedChange=ae(oe.triggerChange,300),"range"===oe.config.mode&&oe.days&&oe.days.addEventListener("mouseover",j),window.document.addEventListener("keydown",L),oe.config.inline||oe.config.static||window.addEventListener("resize",oe.debouncedResize),window.ontouchstart&&window.document.addEventListener("touchstart",T),window.document.addEventListener("click",T),window.document.addEventListener("blur",T),oe.config.clickOpens&&(oe.altInput||oe.input).addEventListener("focus",N),oe.config.noCalendar||(oe.prevMonthNav.addEventListener("click",function(){return C(-1)}),oe.nextMonthNav.addEventListener("click",function(){return C(1)}),oe.currentYearElement.addEventListener("wheel",function(e){return ae(te(e),50)}),oe.currentYearElement.addEventListener("focus",function(){oe.currentYearElement.select()}),oe.currentYearElement.addEventListener("input",u),oe.currentYearElement.addEventListener("increment",u),oe.days.addEventListener("click",A)),void(oe.config.enableTime&&(oe.timeContainer.addEventListener("transitionend",H),oe.timeContainer.addEventListener("wheel",function(e){return ae(r(e),5)}),oe.timeContainer.addEventListener("input",r),oe.timeContainer.addEventListener("increment",r),oe.timeContainer.addEventListener("increment",oe.debouncedChange),oe.timeContainer.addEventListener("wheel",oe.debouncedChange),oe.timeContainer.addEventListener("input",oe.triggerChange),oe.hourElement.addEventListener("focus",function(){oe.hourElement.select()}),oe.minuteElement.addEventListener("focus",function(){oe.minuteElement.select()}),oe.secondElement&&oe.secondElement.addEventListener("focus",function(){oe.secondElement.select()}),oe.amPM&&oe.amPM.addEventListener("click",function(e){r(e),oe.triggerChange(e)}))))}function f(e){e=e?oe.parseDate(e):oe.latestSelectedDateObj||(oe.config.minDate>oe.now?oe.config.minDate:oe.config.maxDate&&oe.config.maxDate<oe.now?oe.config.maxDate:oe.now);try{oe.currentYear=e.getFullYear(),oe.currentMonth=e.getMonth()}catch(t){console.error(t.stack),console.warn("Invalid date supplied: "+e)}oe.redraw()}function p(e,t){var n=e.target.parentNode.childNodes[0];n.value=parseInt(n.value,10)+t*(n.step||1);try{n.dispatchEvent(new Event("increment",{bubbles:!0}))}catch(e){var a=window.document.createEvent("CustomEvent");a.initCustomEvent("increment",!0,!0,{}),n.dispatchEvent(a)}}function m(e){var t=ne("div","numInputWrapper"),n=ne("input","numInput "+e),a=ne("span","arrowUp"),r=ne("span","arrowDown");return n.type="text",t.appendChild(n),t.appendChild(a),t.appendChild(r),a.addEventListener("click",function(e){return p(e,1)}),r.addEventListener("click",function(e){return p(e,-1)}),t}function g(){var e=window.document.createDocumentFragment();oe.calendarContainer=ne("div","flatpickr-calendar"),oe.numInputType=navigator.userAgent.indexOf("MSIE 9.0")>0?"text":"number",oe.config.noCalendar||(e.appendChild(D()),oe.innerContainer=ne("div","flatpickr-innerContainer"),oe.config.weekNumbers&&oe.innerContainer.appendChild(w()),oe.rContainer=ne("div","flatpickr-rContainer"),oe.rContainer.appendChild(y()),oe.rContainer.appendChild(v()),oe.innerContainer.appendChild(oe.rContainer),e.appendChild(oe.innerContainer)),oe.config.enableTime&&e.appendChild(b()),"range"===oe.config.mode&&oe.calendarContainer.classList.add("rangeMode"),oe.calendarContainer.appendChild(e),oe.config.inline||oe.config.static?(oe.calendarContainer.classList.add(oe.config.inline?"inline":"static"),H(),oe.config.appendTo&&oe.config.appendTo.nodeType?oe.config.appendTo.appendChild(oe.calendarContainer):oe.element.parentNode.insertBefore(oe.calendarContainer,(oe.altInput||oe.input).nextSibling)):window.document.body.appendChild(oe.calendarContainer)}function h(e,t,n){var a=S(t,!0),r=ne("span","flatpickr-day "+e,t.getDate());return r.dateObj=t,0===re(t,oe.now)&&r.classList.add("today"),a?(r.tabIndex=0,X(t)&&(r.classList.add("selected"),"range"===oe.config.mode?r.classList.add(0===re(t,oe.selectedDates[0])?"startRange":"endRange"):oe.selectedDateElem=r)):(r.classList.add("disabled"),oe.selectedDates[0]&&t>oe.minRangeDate&&t<oe.selectedDates[0]?oe.minRangeDate=t:oe.selectedDates[0]&&t<oe.maxRangeDate&&t>oe.selectedDates[0]&&(oe.maxRangeDate=t)),"range"===oe.config.mode&&(Q(t)&&!X(t)&&r.classList.add("inRange"),1===oe.selectedDates.length&&(t<oe.minRangeDate||t>oe.maxRangeDate)&&r.classList.add("notAllowed")),oe.config.weekNumbers&&"prevMonthDay"!==e&&n%7===1&&oe.weekNumbers.insertAdjacentHTML("beforeend","<span class='disabled flatpickr-day'>"+oe.config.getWeek(t)+"</span>"),G("DayCreate",r),r}function v(){oe.days||(oe.days=ne("div","flatpickr-days"),oe.days.tabIndex=-1),oe.firstOfMonth=(new Date(oe.currentYear,oe.currentMonth,1).getDay()-oe.l10n.firstDayOfWeek+7)%7,oe.prevMonthDays=oe.utils.getDaysinMonth((oe.currentMonth-1+12)%12);var e=oe.utils.getDaysinMonth(),t=window.document.createDocumentFragment(),n=oe.prevMonthDays+1-oe.firstOfMonth;oe.config.weekNumbers&&oe.weekNumbers.firstChild&&(oe.weekNumbers.textContent=""),"range"===oe.config.mode&&(oe.minRangeDate=new Date(oe.currentYear,oe.currentMonth-1,n),oe.maxRangeDate=new Date(oe.currentYear,oe.currentMonth+1,(42-oe.firstOfMonth)%e)),oe.days.firstChild&&(oe.days.textContent="");for(var a=0;n<=oe.prevMonthDays;a++,n++)t.appendChild(h("prevMonthDay",new Date(oe.currentYear,oe.currentMonth-1,n),n));for(n=1;n<=e;n++)t.appendChild(h("",new Date(oe.currentYear,oe.currentMonth,n),n));for(var r=e+1;r<=42-oe.firstOfMonth;r++)t.appendChild(h("nextMonthDay",new Date(oe.currentYear,oe.currentMonth+1,r%e),r));return oe.days.appendChild(t),oe.days}function D(){var e=window.document.createDocumentFragment();oe.monthNav=ne("div","flatpickr-month"),oe.prevMonthNav=ne("span","flatpickr-prev-month"),oe.prevMonthNav.innerHTML=oe.config.prevArrow,oe.currentMonthElement=ne("span","cur-month");var t=m("cur-year");return oe.currentYearElement=t.childNodes[0],oe.currentYearElement.title=oe.l10n.scrollTitle,oe.config.minDate&&(oe.currentYearElement.min=oe.config.minDate.getFullYear()),oe.config.maxDate&&(oe.currentYearElement.max=oe.config.maxDate.getFullYear(),oe.currentYearElement.disabled=oe.config.minDate&&oe.config.minDate.getFullYear()===oe.config.maxDate.getFullYear()),oe.nextMonthNav=ne("span","flatpickr-next-month"),oe.nextMonthNav.innerHTML=oe.config.nextArrow,oe.navigationCurrentMonth=ne("span","flatpickr-current-month"),oe.navigationCurrentMonth.appendChild(oe.currentMonthElement),oe.navigationCurrentMonth.appendChild(t),e.appendChild(oe.prevMonthNav),e.appendChild(oe.navigationCurrentMonth),e.appendChild(oe.nextMonthNav),oe.monthNav.appendChild(e),Z(),oe.monthNav}function b(){oe.calendarContainer.classList.add("hasTime"),oe.config.noCalendar&&oe.calendarContainer.classList.add("noCalendar"),oe.timeContainer=ne("div","flatpickr-time"),oe.timeContainer.tabIndex=-1;var e=ne("span","flatpickr-time-separator",":"),t=m("flatpickr-hour");oe.hourElement=t.childNodes[0];var n=m("flatpickr-minute");if(oe.minuteElement=n.childNodes[0],oe.hourElement.tabIndex=oe.minuteElement.tabIndex=0,oe.hourElement.pattern=oe.minuteElement.pattern="\\d*",oe.hourElement.value=oe.pad(oe.latestSelectedDateObj?oe.latestSelectedDateObj.getHours():oe.config.defaultHour),oe.minuteElement.value=oe.pad(oe.latestSelectedDateObj?oe.latestSelectedDateObj.getMinutes():oe.config.defaultMinute),oe.hourElement.step=oe.config.hourIncrement,oe.minuteElement.step=oe.config.minuteIncrement,oe.hourElement.min=oe.config.time_24hr?0:1,oe.hourElement.max=oe.config.time_24hr?23:12,oe.minuteElement.min=0,oe.minuteElement.max=59,oe.hourElement.title=oe.minuteElement.title=oe.l10n.scrollTitle,oe.timeContainer.appendChild(t),oe.timeContainer.appendChild(e),oe.timeContainer.appendChild(n),oe.config.time_24hr&&oe.timeContainer.classList.add("time24hr"),oe.config.enableSeconds){oe.timeContainer.classList.add("hasSeconds");var a=m("flatpickr-second");oe.secondElement=a.childNodes[0],oe.secondElement.pattern=oe.hourElement.pattern,oe.secondElement.value=oe.latestSelectedDateObj?oe.pad(oe.latestSelectedDateObj.getSeconds()):"00",oe.secondElement.step=oe.minuteElement.step,oe.secondElement.min=oe.minuteElement.min,oe.secondElement.max=oe.minuteElement.max,oe.timeContainer.appendChild(ne("span","flatpickr-time-separator",":")),oe.timeContainer.appendChild(a)}return oe.config.time_24hr||(oe.amPM=ne("span","flatpickr-am-pm",["AM","PM"][oe.hourElement.value>11|0]),oe.amPM.title=oe.l10n.toggleTitle,oe.amPM.tabIndex=0,oe.timeContainer.appendChild(oe.amPM)),oe.timeContainer}function y(){oe.weekdayContainer||(oe.weekdayContainer=ne("div","flatpickr-weekdays"));var e=oe.l10n.firstDayOfWeek,t=oe.l10n.weekdays.shorthand.slice();return e>0&&e<t.length&&(t=[].concat(t.splice(e,t.length),t.splice(0,e))),oe.weekdayContainer.innerHTML="\n\t\t<span class=flatpickr-weekday>\n\t\t\t"+t.join("</span><span class=flatpickr-weekday>")+"\n\t\t</span>\n\t\t",oe.weekdayContainer}function w(){return oe.calendarContainer.classList.add("hasWeeks"),oe.weekWrapper=ne("div","flatpickr-weekwrapper"),oe.weekWrapper.appendChild(ne("span","flatpickr-weekday",oe.l10n.weekAbbreviation)),oe.weekNumbers=ne("div","flatpickr-weeks"),oe.weekWrapper.appendChild(oe.weekNumbers),oe.weekWrapper}function C(e,t){oe.currentMonth="undefined"==typeof t||t?oe.currentMonth+e:e,I(),Z(),v(),oe.config.noCalendar||oe.days.focus(),G("MonthChange")}function M(e){oe.input.value="",oe.altInput&&(oe.altInput.value=""),oe.mobileInput&&(oe.mobileInput.value=""),oe.selectedDates=[],oe.latestSelectedDateObj=null,oe.dateIsPicked=!1,oe.redraw(),e!==!1&&G("Change")}function x(){oe.isOpen=!1,oe.isMobile||(oe.calendarContainer.classList.remove("open"),(oe.altInput||oe.input).classList.remove("active")),G("Close")}function E(e){e=e||oe,e.clear(!1),window.document.removeEventListener("keydown",L),window.removeEventListener("resize",e.debouncedResize),window.document.removeEventListener("click",T),window.document.removeEventListener("touchstart",T),window.document.removeEventListener("blur",T),e.timeContainer&&e.timeContainer.removeEventListener("transitionend",H),e.mobileInput&&e.mobileInput.parentNode?e.mobileInput.parentNode.removeChild(e.mobileInput):e.calendarContainer&&e.calendarContainer.parentNode&&e.calendarContainer.parentNode.removeChild(e.calendarContainer),e.altInput&&(e.input.type="text",e.altInput.parentNode&&e.altInput.parentNode.removeChild(e.altInput)),e.input.type=e.input._type,e.input.classList.remove("flatpickr-input"),e.input.removeEventListener("focus",N),e.input.removeAttribute("readonly"),delete e.input._flatpickr}function k(e){for(var t=e;t;){if(/flatpickr-day|flatpickr-calendar/.test(t.className))return!0;t=t.parentNode}return!1}function T(e){var t=oe.element.contains(e.target)||e.target===oe.input||e.target===oe.altInput||e.path&&(~e.path.indexOf(oe.input)||~e.path.indexOf(oe.altInput));!oe.isOpen||oe.config.inline||k(e.target)||t||(e.preventDefault(),oe.close(),"range"===oe.config.mode&&1===oe.selectedDates.length&&(oe.clear(),oe.redraw()))}function O(e,t){if(oe.config.formatDate)return oe.config.formatDate(e,t);var n=e.split("");return n.map(function(e,a){return oe.formats[e]&&"\\"!==n[a-1]?oe.formats[e](t):"\\"!==e?e:""}).join("")}function I(e){oe.currentMonth<0||oe.currentMonth>11?(oe.currentYear+=oe.currentMonth%11,oe.currentMonth=(oe.currentMonth+12)%12,G("YearChange")):e&&(!oe.currentYearElement.min||e>=oe.currentYearElement.min)&&(!oe.currentYearElement.max||e<=oe.currentYearElement.max)&&(oe.currentYear=parseInt(e,10)||oe.currentYear,oe.config.maxDate&&oe.currentYear===oe.config.maxDate.getFullYear()?oe.currentMonth=Math.min(oe.config.maxDate.getMonth(),oe.currentMonth):oe.config.minDate&&oe.currentYear===oe.config.minDate.getFullYear()&&(oe.currentMonth=Math.max(oe.config.minDate.getMonth(),oe.currentMonth)),oe.redraw(),G("YearChange"))}function S(e,t){var n=re(e,oe.config.minDate,"undefined"!=typeof t?t:!oe.minDateHasTime)<0,a=re(e,oe.config.maxDate,"undefined"!=typeof t?t:!oe.maxDateHasTime)>0;if(n||a)return!1;if(!oe.config.enable.length&&!oe.config.disable.length)return!0;for(var r,i=oe.parseDate(e,!0),c=oe.config.enable.length>0,l=c?oe.config.enable:oe.config.disable,s=0;s<l.length;s++){if(r=l[s],r instanceof Function&&r(i))return c;if(r instanceof Date&&r.getTime()===i.getTime())return c;if("string"==typeof r&&oe.parseDate(r,!0).getTime()===i.getTime())return c;if("object"===("undefined"==typeof r?"undefined":o(r))&&r.from&&r.to&&i>=r.from&&i<=r.to)return c}return!c}function L(e){if(oe.isOpen)switch(e.which){case 13:oe.timeContainer&&oe.timeContainer.contains(e.target)?ee():A(e);break;case 27:oe.clear(),oe.redraw(),oe.close();break;case 37:e.target!==oe.input&e.target!==oe.altInput&&C(-1);break;case 38:e.preventDefault(),oe.timeContainer&&oe.timeContainer.contains(e.target)?r(e):(oe.currentYear++,oe.redraw());break;case 39:e.target!==oe.input&e.target!==oe.altInput&&C(1);break;case 40:e.preventDefault(),oe.timeContainer&&oe.timeContainer.contains(e.target)?r(e):(oe.currentYear--,oe.redraw())}}function j(e){if(1===oe.selectedDates.length&&e.target.classList.contains("flatpickr-day")){for(var t=e.target.dateObj,n=oe.parseDate(oe.selectedDates[0],!0),a=Math.min(t.getTime(),oe.selectedDates[0].getTime()),r=Math.max(t.getTime(),oe.selectedDates[0].getTime()),i=!1,o=a;o<r;o+=oe.utils.duration.DAY)if(!S(new Date(o))){i=!0;break}for(var c=oe.days.childNodes[0].dateObj.getTime(),l=0;l<42;l++,c+=oe.utils.duration.DAY){var s=c<oe.minRangeDate.getTime()||c>oe.maxRangeDate.getTime();if(s)oe.days.childNodes[l].classList.add("notAllowed"),oe.days.childNodes[l].classList.remove("inRange","startRange","endRange");else if(!i||s){oe.days.childNodes[l].classList.remove("startRange","inRange","endRange","notAllowed");var u=Math.max(oe.minRangeDate.getTime(),a),d=Math.min(oe.maxRangeDate.getTime(),r);e.target.classList.add(t<oe.selectedDates[0]?"startRange":"endRange"),n>t&&c===n.getTime()?oe.days.childNodes[l].classList.add("endRange"):n<t&&c===n.getTime()?oe.days.childNodes[l].classList.add("startRange"):c>u&&c<d&&oe.days.childNodes[l].classList.add("inRange")}}}}function Y(){!oe.isOpen||oe.config.static||oe.config.inline||H()}function N(e){return oe.isMobile?(e&&(e.preventDefault(),e.target.blur()),setTimeout(function(){oe.mobileInput.click()},0),void G("Open")):void(oe.isOpen||(oe.altInput||oe.input).disabled||oe.config.inline||(oe.calendarContainer.classList.add("open"),oe.config.static||oe.config.inline||H(),oe.isOpen=!0,oe.config.allowInput||((oe.altInput||oe.input).blur(),(oe.config.noCalendar?oe.timeContainer:oe.selectedDateElem?oe.selectedDateElem:oe.days).focus()),(oe.altInput||oe.input).classList.add("active"),G("Open")))}function _(e){return function(t){var n=oe.config["_"+e+"Date"]=oe.parseDate(t),a=oe.config["_"+("min"===e?"max":"min")+"Date"];oe.selectedDates&&(oe.selectedDates=oe.selectedDates.filter(S),ee()),oe.days&&R(),oe.currentYearElement&&(t&&n instanceof Date?(oe[e+"DateHasTime"]=n.getHours()||n.getMinutes()||n.getSeconds(),oe.currentYearElement[e]=n.getFullYear()):oe.currentYearElement.removeAttribute(e),oe.currentYearElement.disabled=a&&n&&a.getFullYear()===n.getFullYear())}}function P(){var e=["utc","wrap","weekNumbers","allowInput","clickOpens","time_24hr","enableTime","noCalendar","altInput","shorthandCurrentMonth","inline","static","enableSeconds","disableMobile"];oe.config=Object.create(a.defaultConfig),Object.defineProperty(oe.config,"minDate",{get:function(){return this._minDate},set:_("min")}),Object.defineProperty(oe.config,"maxDate",{get:function(){return this._maxDate},set:_("max")});var t=i({},oe.instanceConfig,JSON.parse(JSON.stringify(oe.element.dataset||{})));i(oe.config,t);for(var n=0;n<e.length;n++)oe.config[e[n]]=oe.config[e[n]]===!0||"true"===oe.config[e[n]];!t.dateFormat&&t.enableTime&&(oe.config.dateFormat=oe.config.noCalendar?"H:i"+(oe.config.enableSeconds?":S":""):a.defaultConfig.dateFormat+" H:i"+(oe.config.enableSeconds?":S":"")),t.altInput&&t.enableTime&&!t.altFormat&&(oe.config.altFormat=oe.config.noCalendar?"h:i"+(oe.config.enableSeconds?":S K":" K"):a.defaultConfig.altFormat+(" h:i"+(oe.config.enableSeconds?":S":"")+" K"))}function F(){"object"!==o(oe.config.locale)&&"undefined"==typeof a.l10ns[oe.config.locale]&&console.warn("flatpickr: invalid locale "+oe.config.locale),oe.l10n=i(Object.create(a.l10ns.default),"object"===o(oe.config.locale)?oe.config.locale:"default"!==oe.config.locale?a.l10ns[oe.config.locale]||{}:{})}function H(e){if(!e||e.target===oe.timeContainer){var t=oe.calendarContainer.offsetHeight,n=oe.calendarContainer.offsetWidth,a=oe.altInput||oe.input,r=a.getBoundingClientRect(),i=window.innerHeight-r.bottom+a.offsetHeight,o=void 0;if(i<t+60?(o=window.pageYOffset-t+r.top-2,oe.calendarContainer.classList.remove("arrowTop"),oe.calendarContainer.classList.add("arrowBottom")):(o=window.pageYOffset+a.offsetHeight+r.top+2,oe.calendarContainer.classList.remove("arrowBottom"),oe.calendarContainer.classList.add("arrowTop")),!oe.config.static&&!oe.config.inline){oe.calendarContainer.style.top=o+"px";var c=window.pageXOffset+r.left,l=window.document.body.offsetWidth-r.right;c+n<=window.document.body.offsetWidth?(oe.calendarContainer.style.left=c+"px",oe.calendarContainer.style.right="auto",oe.calendarContainer.classList.remove("rightMost")):(oe.calendarContainer.style.left="auto",oe.calendarContainer.style.right=l+"px",oe.calendarContainer.classList.add("rightMost"))}}}function R(){oe.config.noCalendar||oe.isMobile||(y(),Z(),v())}function A(e){if(e.preventDefault(),oe.config.allowInput&&13===e.which&&e.target===(oe.altInput||oe.input))return oe.setDate((oe.altInput||oe.input).value),e.target.blur();if(e.target.classList.contains("flatpickr-day")&&!e.target.classList.contains("disabled")&&!e.target.classList.contains("notAllowed")){var t=oe.latestSelectedDateObj=new Date(e.target.dateObj.getTime());if(oe.selectedDateElem=e.target,"single"===oe.config.mode)oe.selectedDates=[t];else if("multiple"===oe.config.mode){var n=X(t);n?oe.selectedDates.splice(n,1):oe.selectedDates.push(t)}else"range"===oe.config.mode&&(2===oe.selectedDates.length&&oe.clear(),oe.selectedDates.push(t),oe.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()}));c(),t.getMonth()!==oe.currentMonth&&"range"!==oe.config.mode&&(oe.currentYear=t.getFullYear(),oe.currentMonth=t.getMonth(),Z()),v(),oe.minDateHasTime&&oe.config.enableTime&&0===re(t,oe.config.minDate)&&l(oe.config.minDate),ee(),setTimeout(function(){return oe.dateIsPicked=!0},50),"range"===oe.config.mode&&1===oe.selectedDates.length&&j(e),"single"!==oe.config.mode||oe.config.enableTime||oe.close(),G("Change")}}function W(e,t){oe.config[e]=t,oe.redraw(),f()}function U(e){if(Array.isArray(e))oe.selectedDates=e.map(oe.parseDate);else if(e)switch(oe.config.mode){case"single":oe.selectedDates=[oe.parseDate(e)];break;case"multiple":oe.selectedDates=e.split("; ").map(oe.parseDate);break;case"range":oe.selectedDates=e.split(oe.l10n.rangeSeparator).map(oe.parseDate)}oe.selectedDates=oe.selectedDates.filter(function(e){return e instanceof Date&&e.getTime()&&S(e,!1)}),oe.selectedDates.sort(function(e,t){return e.getTime()-t.getTime()})}function J(e,t){return e?(U(e),oe.selectedDates.length>0?(oe.dateIsPicked=!0,oe.latestSelectedDateObj=oe.selectedDates[0]):oe.latestSelectedDateObj=null,oe.redraw(),f(),l(),ee(),void(t===!0&&G("Change"))):oe.clear()}function B(){function e(e){for(var t=e.length;t--;)"string"==typeof e[t]||+e[t]?e[t]=oe.parseDate(e[t],!0):e[t]&&e[t].from&&e[t].to&&(e[t].from=oe.parseDate(e[t].from),e[t].to=oe.parseDate(e[t].to));return e.filter(function(e){return e})}oe.selectedDates=[],oe.now=new Date,U(oe.config.defaultDate||oe.input.value),oe.config.disable.length&&(oe.config.disable=e(oe.config.disable)),oe.config.enable.length&&(oe.config.enable=e(oe.config.enable));var t=oe.selectedDates.length?oe.selectedDates[0]:oe.config.minDate&&oe.config.minDate.getTime()>oe.now?oe.config.minDate:oe.config.maxDate&&oe.config.maxDate.getTime()<oe.now?oe.config.maxDate:oe.now;oe.currentYear=t.getFullYear(),oe.currentMonth=t.getMonth(),oe.selectedDates.length&&(oe.latestSelectedDateObj=oe.selectedDates[0]),oe.minDateHasTime=oe.config.minDate&&(oe.config.minDate.getHours()||oe.config.minDate.getMinutes()||oe.config.minDate.getSeconds()),oe.maxDateHasTime=oe.config.maxDate&&(oe.config.maxDate.getHours()||oe.config.maxDate.getMinutes()||oe.config.maxDate.getSeconds()),Object.defineProperty(oe,"latestSelectedDateObj",{get:function(){return oe._selectedDateObj||oe.selectedDates[oe.selectedDates.length-1]||null},set:function(e){oe._selectedDateObj=e}})}function z(){oe.utils={duration:{DAY:864e5},getDaysinMonth:function(e,t){return e="undefined"==typeof e?oe.currentMonth:e,t="undefined"==typeof t?oe.currentYear:t,1===e&&(t%4===0&&t%100!==0||t%400===0)?29:oe.l10n.daysInMonth[e]},monthToStr:function(e,t){return t="undefined"==typeof t?oe.config.shorthandCurrentMonth:t,oe.l10n.months[(t?"short":"long")+"hand"][e]}}}function $(){oe.formats={D:function(e){return oe.l10n.weekdays.shorthand[oe.formats.w(e)]},F:function(e){return oe.utils.monthToStr(oe.formats.n(e)-1,!1)},H:function(e){return a.prototype.pad(e.getHours())},J:function(e){return e.getDate()+oe.l10n.ordinal(e.getDate())},K:function(e){return e.getHours()>11?"PM":"AM"},M:function(e){return oe.utils.monthToStr(e.getMonth(),!0)},S:function(e){return a.prototype.pad(e.getSeconds())},U:function(e){return e.getTime()/1e3},Y:function(e){return e.getFullYear()},d:function(e){return a.prototype.pad(oe.formats.j(e))},h:function(e){return e.getHours()%12?e.getHours()%12:12},i:function(e){return a.prototype.pad(e.getMinutes())},j:function(e){return e.getDate()},l:function(e){return oe.l10n.weekdays.longhand[oe.formats.w(e)]},m:function(e){return a.prototype.pad(oe.formats.n(e))},n:function(e){return e.getMonth()+1},s:function(e){return e.getSeconds()},w:function(e){return e.getDay()},y:function(e){return String(oe.formats.Y(e)).substring(2)}}}function V(){return oe.input=oe.config.wrap?oe.element.querySelector("[data-input]"):oe.element,oe.input?(oe.input._type=oe.input.type,oe.input.type="text",oe.input.classList.add("flatpickr-input"),oe.config.altInput&&(oe.altInput=ne(oe.input.nodeName,oe.input.className+" "+oe.config.altInputClass),oe.altInput.placeholder=oe.input.placeholder,oe.altInput.type="text",oe.input.type="hidden",oe.input.parentNode&&oe.input.parentNode.insertBefore(oe.altInput,oe.input.nextSibling)),void(oe.config.allowInput||(oe.altInput||oe.input).setAttribute("readonly","readonly"))):console.warn("Error: invalid input element specified",oe.input)}function K(){var e=oe.config.enableTime?oe.config.noCalendar?"time":"datetime-local":"date";oe.mobileInput=ne("input",oe.input.className+" flatpickr-mobile"),oe.mobileInput.step="any",oe.mobileInput.tabIndex=1,oe.mobileInput.type=e,oe.mobileInput.disabled=oe.input.disabled,oe.mobileFormatStr="datetime-local"===e?"Y-m-d\\TH:i:S":"date"===e?"Y-m-d":"H:i:S",oe.selectedDates.length&&(oe.mobileInput.defaultValue=oe.mobileInput.value=O(oe.mobileFormatStr,oe.selectedDates[0])),oe.config.minDate&&(oe.mobileInput.min=O("Y-m-d",oe.config.minDate)),oe.config.maxDate&&(oe.mobileInput.max=O("Y-m-d",oe.config.maxDate)),oe.input.type="hidden",oe.config.altInput&&(oe.altInput.type="hidden");try{oe.input.parentNode.insertBefore(oe.mobileInput,oe.input.nextSibling)}catch(e){}oe.mobileInput.addEventListener("change",function(e){oe.latestSelectedDateObj=oe.parseDate(e.target.value),oe.setDate(oe.latestSelectedDateObj),G("Change"),G("Close")})}function q(){oe.isOpen?oe.close():oe.open()}function G(e,t){if(oe.config["on"+e])for(var n=Array.isArray(oe.config["on"+e])?oe.config["on"+e]:[oe.config["on"+e]],a=0;a<n.length;a++)n[a](oe.selectedDates,oe.input.value,oe,t);if("Change"===e)if("function"==typeof Event&&Event.constructor)oe.input.dispatchEvent(new Event("change",{bubbles:!0})),oe.input.dispatchEvent(new Event("input",{bubbles:!0}));else{if(void 0!==window.document.createEvent)return oe.input.dispatchEvent(oe.changeEvent);oe.input.fireEvent("onchange")}}function X(e){for(var t=0;t<oe.selectedDates.length;t++)if(0===re(oe.selectedDates[t],e))return""+t;return!1}function Q(e){return!("range"!==oe.config.mode||oe.selectedDates.length<2)&&(re(e,oe.selectedDates[0])>=0&&re(e,oe.selectedDates[1])<=0)}function Z(){if(!oe.config.noCalendar&&!oe.isMobile&&oe.monthNav){if(oe.currentMonthElement.textContent=oe.utils.monthToStr(oe.currentMonth)+" ",oe.currentYearElement.value=oe.currentYear,oe.config.minDate){var e=oe.currentYear===oe.config.minDate.getFullYear()?oe.currentMonth<=oe.config.minDate.getMonth():oe.currentYear<oe.config.minDate.getFullYear();oe.prevMonthNav.style.display=e?"none":"block"}else oe.prevMonthNav.style.display="block";if(oe.config.maxDate){var t=oe.currentYear===oe.config.maxDate.getFullYear()?oe.currentMonth+1>oe.config.maxDate.getMonth():oe.currentYear>oe.config.maxDate.getFullYear();oe.nextMonthNav.style.display=t?"none":"block"}else oe.nextMonthNav.style.display="block"}}function ee(){if(!oe.selectedDates.length)return oe.clear();oe.isMobile&&(oe.mobileInput.value=oe.selectedDates.length?O(oe.mobileFormatStr,oe.latestSelectedDateObj):"");var e="range"!==oe.config.mode?"; ":oe.l10n.rangeSeparator;oe.input.value=oe.selectedDates.map(function(e){return O(oe.config.dateFormat,e)}).join(e),oe.config.altInput&&(oe.altInput.value=oe.selectedDates.map(function(e){return O(oe.config.altFormat,e)}).join(e)),G("ValueUpdate")}function te(e){e.preventDefault();var t=Math.max(-1,Math.min(1,e.wheelDelta||-e.deltaY)),n=parseInt(e.target.value,10)+t;I(n),e.target.value=oe.currentYear}function ne(e,t,n){var a=window.document.createElement(e);return t=t||"",n=n||"",a.className=t,n&&(a.textContent=n),a}function ae(e,t,n){var a=void 0;return function(){for(var r=arguments.length,i=Array(r),o=0;o<r;o++)i[o]=arguments[o];var c=this,l=function(){a=null,n||e.apply(c,i)};clearTimeout(a),a=setTimeout(l,t),n&&!a&&e.apply(c,i)}}function re(e,t,n){return e instanceof Date&&t instanceof Date&&(n!==!1?new Date(e.getTime()).setHours(0,0,0,0)-new Date(t.getTime()).setHours(0,0,0,0):e.getTime()-t.getTime())}function ie(e){if(e.preventDefault(),e&&((e.target.value||e.target.textContent).length>=2||"keydown"!==e.type&&"input"!==e.type)&&e.target.blur(),oe.amPM&&e.target===oe.amPM)return e.target.textContent=["AM","PM"]["AM"===e.target.textContent|0];var t=Number(e.target.min),n=Number(e.target.max),a=Number(e.target.step),r=parseInt(e.target.value,10),i=Math.max(-1,Math.min(1,e.wheelDelta||-e.deltaY)),o=Number(r);switch(e.type){case"wheel":o=r+a*i;break;case"keydown":o=r+a*(38===e.which?1:-1)}"input"!==e.type||2===e.target.value.length?(o<t?o=n+o+(e.target!==oe.hourElement)+(e.target===oe.hourElement&&!oe.amPM):o>n&&(o=e.target===oe.hourElement?o-n-!oe.amPM:t),oe.amPM&&e.target===oe.hourElement&&(1===a?o+r===23:Math.abs(o-r)>a)&&(oe.amPM.textContent="PM"===oe.amPM.textContent?"AM":"PM"),e.target.value=oe.pad(o)):e.target.value=o}var oe=this;return n(),oe}function r(e,t){for(var n=Array.prototype.slice.call(e),r=[],i=0;i<n.length;i++)try{n[i]._flatpickr=new a(n[i],t||{}),r.push(n[i]._flatpickr)}catch(e){console.warn(e,e.stack)}return 1===r.length?r[0]:r}var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};a.defaultConfig={mode:"single",utc:!1,wrap:!1,weekNumbers:!1,allowInput:!1,clickOpens:!0,time_24hr:!1,enableTime:!1,noCalendar:!1,dateFormat:"Y-m-d",altInput:!1,altInputClass:"flatpickr-input form-control input",altFormat:"F j, Y",defaultDate:null,minDate:null,maxDate:null,parseDate:null,formatDate:null,getWeek:function(e){var t=new Date(e.getTime());t.setHours(0,0,0,0),t.setDate(t.getDate()+3-(t.getDay()+6)%7);var n=new Date(t.getFullYear(),0,4);return 1+Math.round(((t.getTime()-n.getTime())/864e5-3+(n.getDay()+6)%7)/7)},enable:[],disable:[],shorthandCurrentMonth:!1,inline:!1,static:!1,appendTo:null,prevArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",nextArrow:"<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",enableSeconds:!1,hourIncrement:1,minuteIncrement:5,defaultHour:12,defaultMinute:0,disableMobile:!1,locale:"default",onChange:null,onOpen:null,onClose:null,onReady:null,onValueUpdate:null,onDayCreate:null},a.l10ns={en:{weekdays:{shorthand:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],longhand:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},months:{shorthand:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],longhand:["January","February","March","April","May","June","July","August","September","October","November","December"]
},daysInMonth:[31,28,31,30,31,30,31,31,30,31,30,31],firstDayOfWeek:0,ordinal:function(e){var t=e%100;if(t>3&&t<21)return"th";switch(t%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}},rangeSeparator:" to ",weekAbbreviation:"Wk",scrollTitle:"Scroll to increment",toggleTitle:"Click to toggle"}},a.l10ns.default=Object.create(a.l10ns.en),a.localize=function(e){return i(a.l10ns.default,e||{})},a.setDefaults=function(e){return i(a.defaultConfig,e||{})},a.prototype={pad:function(e){return("0"+e).slice(-2)},parseDate:function(e,t){if(!e)return null;var n=/(\d+)/g,a=/^(\d{1,2})[:\s](\d\d)?[:\s]?(\d\d)?\s?(a|p)?/i,r=/^(\d+)$/g,i=e;if(e.toFixed||r.test(e))e=new Date(e);else if("string"==typeof e)if(e=e.trim(),"today"===e)e=new Date,t=!0;else if(this.config&&this.config.parseDate)e=this.config.parseDate(e);else if(a.test(e)){var o=e.match(a),c=o[4]?o[1]%12+("p"===o[4].toLowerCase()?12:0):o[1];e=new Date,e.setHours(c,o[2]||0,o[3]||0)}else if(/Z$/.test(e)||/GMT$/.test(e))e=new Date(e);else if(n.test(e)&&/^[0-9]/.test(e)){var l=e.match(n);e=new Date(l[0]+"/"+(l[1]||1)+"/"+(l[2]||1)+" "+(l[3]||0)+":"+(l[4]||0)+":"+(l[5]||0))}else e=new Date(e);else e instanceof Date&&(e=new Date(e.getTime()));return e instanceof Date?(this.config&&this.config.utc&&!e.fp_isUTC&&(e=e.fp_toUTC()),t===!0&&e.setHours(0,0,0,0),e):(console.warn("flatpickr: invalid date "+i),console.info(this.element),null)}},"undefined"!=typeof HTMLElement&&(HTMLCollection.prototype.flatpickr=NodeList.prototype.flatpickr=function(e){return r(this,e)},HTMLElement.prototype.flatpickr=function(e){return r([this],e)}),"undefined"!=typeof jQuery&&(jQuery.fn.flatpickr=function(e){return r(this,e)}),Date.prototype.fp_incr=function(e){return new Date(this.getFullYear(),this.getMonth(),this.getDate()+parseInt(e,10))},Date.prototype.fp_isUTC=!1,Date.prototype.fp_toUTC=function(){var e=new Date(this.getUTCFullYear(),this.getUTCMonth(),this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds());return e.fp_isUTC=!0,e},!window.document.documentElement.classList&&Object.defineProperty&&"undefined"!=typeof HTMLElement&&Object.defineProperty(HTMLElement.prototype,"classList",{get:function(){function e(e){return function(n){var a=t.className.split(/\s+/),r=a.indexOf(n);e(a,r,n),t.className=a.join(" ")}}var t=this,n={add:e(function(e,t,n){~t||e.push(n)}),remove:e(function(e,t){~t&&e.splice(t,1)}),toggle:e(function(e,t,n){~t?e.splice(t,1):e.push(n)}),contains:function(e){return!!~t.className.split(/\s+/).indexOf(e)},item:function(e){return t.className.split(/\s+/)[e]||null}};return Object.defineProperty(n,"length",{get:function(){return t.className.split(/\s+/).length}}),n}}),e.exports=a},function(e,t,n){var a,r;a=n(11);var i=n(43);r=a=a||{},"object"!=typeof a.default&&"function"!=typeof a.default||(r=a=a.default),"function"==typeof r&&(r=r.options),r.render=i.render,r.staticRenderFns=i.staticRenderFns,e.exports=a},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("input",{attrs:{type:"text",placeholder:e.placeholder},domProps:{value:e.value}})},staticRenderFns:[]}}])});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createAlumni"] = createAlumni;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_mixins_HasAlerts_js__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Edit_vue__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Edit_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Edit_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_Alumni_Subscription_vue__ = __webpack_require__(275);
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

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(109),
  /* template */
  __webpack_require__(117),
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

/***/ 699:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),

/***/ 700:
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

},[377]);
});
//# sourceMappingURL=vue-alumni.js.map