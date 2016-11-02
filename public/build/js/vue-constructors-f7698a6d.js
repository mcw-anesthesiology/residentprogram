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
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createFormBuilder = createFormBuilder;
	exports.createReports = createReports;
	
	var _vue = __webpack_require__(62);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _FormBuilder = __webpack_require__(71);
	
	var _FormBuilder2 = _interopRequireDefault(_FormBuilder);
	
	var _Reports = __webpack_require__(92);
	
	var _Reports2 = _interopRequireDefault(_Reports);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function createFormBuilder(el) {
		return new _vue2.default({
			el: el,
			data: function data() {
				return {
					oldFormContents: {}
				};
			},
			render: function render(h) {
				return h(_FormBuilder2.default, { props: { oldFormContents: this.oldFormContents } });
			}
		});
	}
	
	function createReports(el) {
		return new _vue2.default({
			el: el,
			render: function render(h) {
				return h(_Reports2.default);
			}
		});
	}

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var NEW_ITEM_TAG = exports.NEW_ITEM_TAG = '<span class="label label-primary">NEW</span>';
	
	var UNSEEN_EVALUATION_PRIORITY = exports.UNSEEN_EVALUATION_PRIORITY = 1000000;
	
	var STANDARD_OPTIONS = exports.STANDARD_OPTIONS = {
		RESIDENT: [{ value: 0, text: "Not at CBY" }, { value: 1, text: "" }, { value: 2, text: "CBY" }, { value: 3, text: "" }, { value: 4, text: "CA-1" }, { value: 5, text: "" }, { value: 6, text: "CA-2" }, { value: 7, text: "" }, { value: 8, text: "CA-3" }, { value: 9, text: "" }, { value: 10, text: "Attending" }],
		FELLOW: [{ value: 0, text: "Not at fellowship level" }, { value: 1, text: "" }, { value: 2, text: "Fellow - 1" }, { value: 3, text: "" }, { value: 4, text: "Fellow - 2" }, { value: 5, text: "" }, { value: 6, text: "Fellow - 3" }, { value: 7, text: "" }, { value: 8, text: "Fellow - 4" }, { value: 9, text: "" }, { value: 10, text: "Fellow - 5" }],
		FACULTY: [{ value: "strongly-disagree", text: "Strongly Disagree" }, { value: "disagree", text: "Disagree" }, { value: "undecided", text: "Undecided" }, { value: "agree", text: "Agree" }, { value: "strongly-agree", text: "Strongly Agree" }, { value: "n-a", text: "N/A" }]
	};
	
	var REPORT_TYPES = exports.REPORT_TYPES = {
		TRAINEE: 'trainee',
		FORM: 'form'
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.appendAlert = appendAlert;
	exports.ucfirst = ucfirst;
	exports.fetchMilestoneGroups = fetchMilestoneGroups;
	
	__webpack_require__(60);
	
	function appendAlert(alertText) {
		var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#alert-container';
		var alertType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'danger';
		var dismissable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	
		var alert = document.createElement("div");
		alert.className = "alert alert-" + alertType;
		alert.role = "alert";
	
		if (dismissable) {
			alert.className += " alert-dismissable";
			var close = document.createElement("button");
			close.type = "button";
			close.className = "close";
			close.setAttribute("data-dismiss", "alert");
			close.setAttribute("aria-label", "Close");
	
			var innerClose = document.createElement("span");
			innerClose.setAttribute("aria-hidden", "true");
			innerClose.innerHTML = "&times;";
			close.appendChild(innerClose);
	
			alert.appendChild(close);
		}
	
		alert.insertAdjacentHTML("beforeend", alertText);
	
		$(parent).append(alert);
	}
	
	function ucfirst(str) {
		return str.charAt(0).toUpperCase() + str.substring(1);
	}
	
	function fetchMilestoneGroups() {
		return fetch('/milestones', { credentials: 'same-origin' }).then(function (response) {
			if (response.ok) return response.json();else {
				var err = new Error(response.statusText);
				err.response = response;
				throw err;
			}
		}).then(function (milestones) {
			var milestoneGroups = {};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = milestones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var milestone = _step.value;
	
					var _groupTitle = ucfirst(milestone.type);
					if (milestone.training_level) _groupTitle += ' \u2014 ' + milestone.training_level;
					if (!milestoneGroups[_groupTitle]) milestoneGroups[_groupTitle] = {
						text: _groupTitle,
						children: []
					};
					milestoneGroups[_groupTitle].children.push({
						id: milestone.id.toString(),
						text: milestone.title
					});
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
	
			for (var groupTitle in milestoneGroups) {
				var milestoneGroup = milestoneGroups[groupTitle];
				milestoneGroup.children.sort(function (a, b) {
					if (a.text < b.text) return 1;else if (a.text > b.text) return -1;else return 0;
				});
			}
			return Object.values(milestoneGroups);
		});
	}

/***/ },
/* 60 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 61 */,
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	/*  */
	
	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}
	
	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10)
	  return (n || n === 0) ? n : val
	}
	
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null)
	  var list = str.split(',')
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}
	
	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true)
	
	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item)
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}
	
	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}
	
	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null)
	  return function cachedFn (str) {
	    var hit = cache[str]
	    return hit || (cache[str] = fn(str))
	  }
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	})
	
	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	})
	
	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	})
	
	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length
	  return boundFn
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0
	  var i = list.length - start
	  var ret = new Array(i)
	  while (i--) {
	    ret[i] = list[i + start]
	  }
	  return ret
	}
	
	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key]
	  }
	  return to
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString
	var OBJECT_STRING = '[object Object]'
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}
	
	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {}
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i])
	    }
	  }
	  return res
	}
	
	/**
	 * Perform no operation.
	 */
	function noop () {}
	
	/**
	 * Always return false.
	 */
	var no = function () { return false; }
	
	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}
	
	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}
	
	/*  */
	
	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),
	
	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,
	
	  /**
	   * Whether to enable devtools
	   */
	  devtools: process.env.NODE_ENV !== 'production',
	
	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,
	
	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,
	
	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),
	
	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,
	
	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,
	
	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,
	
	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,
	
	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],
	
	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],
	
	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100,
	
	  /**
	   * Server rendering?
	   */
	  _isServer: process.env.VUE_ENV === 'server'
	}
	
	/*  */
	
	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0)
	  return c === 0x24 || c === 0x5F
	}
	
	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  })
	}
	
	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w\.\$]/
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.')
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]]
	      }
	      return obj
	    }
	  }
	}
	
	/*  */
	/* globals MutationObserver */
	
	// can we use __proto__?
	var hasProto = '__proto__' in {}
	
	// Browser environment sniffing
	var inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]'
	
	var UA = inBrowser && window.navigator.userAgent.toLowerCase()
	var isIE = UA && /msie|trident/.test(UA)
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0
	var isEdge = UA && UA.indexOf('edge/') > 0
	var isAndroid = UA && UA.indexOf('android') > 0
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA)
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__
	
	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}
	
	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = []
	  var pending = false
	  var timerFunc
	
	  function nextTickHandler () {
	    pending = false
	    var copies = callbacks.slice(0)
	    callbacks.length = 0
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]()
	    }
	  }
	
	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve()
	    timerFunc = function () {
	      p.then(nextTickHandler)
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop) }
	    }
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1
	    var observer = new MutationObserver(nextTickHandler)
	    var textNode = document.createTextNode(String(counter))
	    observer.observe(textNode, {
	      characterData: true
	    })
	    timerFunc = function () {
	      counter = (counter + 1) % 2
	      textNode.data = String(counter)
	    }
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = setTimeout
	  }
	
	  return function queueNextTick (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx) }
	      : cb
	    callbacks.push(func)
	    if (!pending) {
	      pending = true
	      timerFunc(nextTickHandler, 0)
	    }
	  }
	})()
	
	var _Set
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null)
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] !== undefined
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = 1
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null)
	    };
	
	    return Set;
	  }())
	}
	
	/* not type checking this file because flow doesn't play well with Proxy */
	
	var hasProxy;
	var proxyHandlers;
	var initProxy
	
	if (process.env.NODE_ENV !== 'production') {
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  )
	
	  hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/)
	
	  proxyHandlers = {
	    has: function has (target, key) {
	      var has = key in target
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_'
	      if (!has && !isAllowed) {
	        warn(
	          "Property or method \"" + key + "\" is not defined on the instance but " +
	          "referenced during render. Make sure to declare reactive data " +
	          "properties in the data option.",
	          target
	        )
	      }
	      return has || !isAllowed
	    }
	  }
	
	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      vm._renderProxy = new Proxy(vm, proxyHandlers)
	    } else {
	      vm._renderProxy = vm
	    }
	  }
	}
	
	/*  */
	
	
	var uid$2 = 0
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$2++
	  this.subs = []
	};
	
	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub)
	};
	
	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub)
	};
	
	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this)
	  }
	};
	
	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice()
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update()
	  }
	};
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null
	var targetStack = []
	
	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target) }
	  Dep.target = _target
	}
	
	function popTarget () {
	  Dep.target = targetStack.pop()
	}
	
	/*  */
	
	
	var queue = []
	var has$1 = {}
	var circular = {}
	var waiting = false
	var flushing = false
	var index = 0
	
	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0
	  has$1 = {}
	  if (process.env.NODE_ENV !== 'production') {
	    circular = {}
	  }
	  waiting = flushing = false
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true
	
	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; })
	
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index]
	    var id = watcher.id
	    has$1[id] = null
	    watcher.run()
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        )
	        break
	      }
	    }
	  }
	
	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush')
	  }
	
	  resetSchedulerState()
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id
	  if (has$1[id] == null) {
	    has$1[id] = true
	    if (!flushing) {
	      queue.push(watcher)
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher)
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true
	      nextTick(flushSchedulerQueue)
	    }
	  }
	}
	
	/*  */
	
	var uid$1 = 0
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};
	
	  this.vm = vm
	  vm._watchers.push(this)
	  // options
	  this.deep = !!options.deep
	  this.user = !!options.user
	  this.lazy = !!options.lazy
	  this.sync = !!options.sync
	  this.expression = expOrFn.toString()
	  this.cb = cb
	  this.id = ++uid$1 // uid for batching
	  this.active = true
	  this.dirty = this.lazy // for lazy watchers
	  this.deps = []
	  this.newDeps = []
	  this.depIds = new _Set()
	  this.newDepIds = new _Set()
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn
	  } else {
	    this.getter = parsePath(expOrFn)
	    if (!this.getter) {
	      this.getter = function () {}
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      )
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get()
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this)
	  var value = this.getter.call(this.vm, this.vm)
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value)
	  }
	  popTarget()
	  this.cleanupDeps()
	  return value
	};
	
	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id)
	    this.newDeps.push(dep)
	    if (!this.depIds.has(id)) {
	      dep.addSub(this)
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;
	
	  var i = this.deps.length
	  while (i--) {
	    var dep = this$1.deps[i]
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1)
	    }
	  }
	  var tmp = this.depIds
	  this.depIds = this.newDepIds
	  this.newDepIds = tmp
	  this.newDepIds.clear()
	  tmp = this.deps
	  this.deps = this.newDeps
	  this.newDeps = tmp
	  this.newDeps.length = 0
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true
	  } else if (this.sync) {
	    this.run()
	  } else {
	    queueWatcher(this)
	  }
	};
	
	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get()
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value
	      this.value = value
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue)
	        } catch (e) {
	          process.env.NODE_ENV !== 'production' && warn(
	            ("Error in watcher \"" + (this.expression) + "\""),
	            this.vm
	          )
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm)
	          } else {
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue)
	      }
	    }
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get()
	  this.dirty = false
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;
	
	  var i = this.deps.length
	  while (i--) {
	    this$1.deps[i].depend()
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;
	
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this)
	    }
	    var i = this.deps.length
	    while (i--) {
	      this$1.deps[i].removeSub(this$1)
	    }
	    this.active = false
	  }
	};
	
	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set()
	function traverse (val, seen) {
	  var i, keys
	  if (!seen) {
	    seen = seenObjects
	    seen.clear()
	  }
	  var isA = Array.isArray(val)
	  var isO = isObject(val)
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id
	      if (seen.has(depId)) {
	        return
	      } else {
	        seen.add(depId)
	      }
	    }
	    if (isA) {
	      i = val.length
	      while (i--) { traverse(val[i], seen) }
	    } else if (isO) {
	      keys = Object.keys(val)
	      i = keys.length
	      while (i--) { traverse(val[keys[i]], seen) }
	    }
	  }
	}
	
	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */
	
	var arrayProto = Array.prototype
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method]
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;
	
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length
	    var args = new Array(i)
	    while (i--) {
	      args[i] = arguments$1[i]
	    }
	    var result = original.apply(this, args)
	    var ob = this.__ob__
	    var inserted
	    switch (method) {
	      case 'push':
	        inserted = args
	        break
	      case 'unshift':
	        inserted = args
	        break
	      case 'splice':
	        inserted = args.slice(2)
	        break
	    }
	    if (inserted) { ob.observeArray(inserted) }
	    // notify change
	    ob.dep.notify()
	    return result
	  })
	})
	
	/*  */
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods)
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	}
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value
	  this.dep = new Dep()
	  this.vmCount = 0
	  def(value, '__ob__', this)
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment
	    augment(value, arrayMethods, arrayKeys)
	    this.observeArray(value)
	  } else {
	    this.walk(value)
	  }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj)
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]])
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i])
	  }
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * istanbul ignore next
	 */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i]
	    def(target, key, src[key])
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__
	  } else if (
	    observerState.shouldConvert &&
	    !config._isServer &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value)
	  }
	  return ob
	}
	
	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep()
	
	  var property = Object.getOwnPropertyDescriptor(obj, key)
	  if (property && property.configurable === false) {
	    return
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get
	  var setter = property && property.set
	
	  var childOb = observe(val)
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val
	      if (Dep.target) {
	        dep.depend()
	        if (childOb) {
	          childOb.dep.depend()
	        }
	        if (Array.isArray(value)) {
	          for (var e = void 0, i = 0, l = value.length; i < l; i++) {
	            e = value[i]
	            e && e.__ob__ && e.__ob__.dep.depend()
	          }
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val
	      if (newVal === value) {
	        return
	      }
	      if (process.env.NODE_ENV !== 'production' && customSetter) {
	        customSetter()
	      }
	      if (setter) {
	        setter.call(obj, newVal)
	      } else {
	        val = newVal
	      }
	      childOb = observe(newVal)
	      dep.notify()
	    }
	  })
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.splice(key, 1, val)
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val
	    return
	  }
	  var ob = obj.__ob__
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    )
	    return
	  }
	  if (!ob) {
	    obj[key] = val
	    return
	  }
	  defineReactive$$1(ob.value, key, val)
	  ob.dep.notify()
	  return val
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__
	  if (obj._isVue || (ob && ob.vmCount)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    )
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key]
	  if (!ob) {
	    return
	  }
	  ob.dep.notify()
	}
	
	/*  */
	
	function initState (vm) {
	  vm._watchers = []
	  initProps(vm)
	  initData(vm)
	  initComputed(vm)
	  initMethods(vm)
	  initWatch(vm)
	}
	
	function initProps (vm) {
	  var props = vm.$options.props
	  if (props) {
	    var propsData = vm.$options.propsData || {}
	    var keys = vm.$options._propKeys = Object.keys(props)
	    var isRoot = !vm.$parent
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot
	    var loop = function ( i ) {
	      var key = keys[i]
	      /* istanbul ignore else */
	      if (process.env.NODE_ENV !== 'production') {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            )
	          }
	        })
	      } else {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm))
	      }
	    };
	
	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true
	  }
	}
	
	function initData (vm) {
	  var data = vm.$options.data
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {}
	  if (!isPlainObject(data)) {
	    data = {}
	    process.env.NODE_ENV !== 'production' && warn(
	      'data functions should return an object.',
	      vm
	    )
	  }
	  // proxy data on instance
	  var keys = Object.keys(data)
	  var props = vm.$options.props
	  var i = keys.length
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      )
	    } else {
	      proxy(vm, keys[i])
	    }
	  }
	  // observe data
	  observe(data)
	  data.__ob__ && data.__ob__.vmCount++
	}
	
	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	}
	
	function initComputed (vm) {
	  var computed = vm.$options.computed
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key]
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm)
	        computedSharedDefinition.set = noop
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition)
	    }
	  }
	}
	
	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  })
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate()
	    }
	    if (Dep.target) {
	      watcher.depend()
	    }
	    return watcher.value
	  }
	}
	
	function initMethods (vm) {
	  var methods = vm.$options.methods
	  if (methods) {
	    for (var key in methods) {
	      if (methods[key] != null) {
	        vm[key] = bind$1(methods[key], vm)
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn(("Method \"" + key + "\" is undefined in options."), vm)
	      }
	    }
	  }
	}
	
	function initWatch (vm) {
	  var watch = vm.$options.watch
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key]
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i])
	        }
	      } else {
	        createWatcher(vm, key, handler)
	      }
	    }
	  }
	}
	
	function createWatcher (vm, key, handler) {
	  var options
	  if (isPlainObject(handler)) {
	    options = handler
	    handler = handler.handler
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler]
	  }
	  vm.$watch(key, handler, options)
	}
	
	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {}
	  dataDef.get = function () {
	    return this._data
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      )
	    }
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef)
	
	  Vue.prototype.$set = set
	  Vue.prototype.$delete = del
	
	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this
	    options = options || {}
	    options.user = true
	    var watcher = new Watcher(vm, expOrFn, cb, options)
	    if (options.immediate) {
	      cb.call(vm, watcher.value)
	    }
	    return function unwatchFn () {
	      watcher.teardown()
	    }
	  }
	}
	
	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val
	      }
	    })
	  }
	}
	
	/*  */
	
	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  ns,
	  context,
	  componentOptions
	) {
	  this.tag = tag
	  this.data = data
	  this.children = children
	  this.text = text
	  this.elm = elm
	  this.ns = ns
	  this.context = context
	  this.key = data && data.key
	  this.componentOptions = componentOptions
	  this.child = undefined
	  this.parent = undefined
	  this.raw = false
	  this.isStatic = false
	  this.isRootInsert = true
	  this.isComment = false
	  this.isCloned = false
	};
	
	var emptyVNode = function () {
	  var node = new VNode()
	  node.text = ''
	  node.isComment = true
	  return node
	}
	
	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.ns,
	    vnode.context,
	    vnode.componentOptions
	  )
	  cloned.isStatic = vnode.isStatic
	  cloned.key = vnode.key
	  cloned.isCloned = true
	  return cloned
	}
	
	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length)
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i])
	  }
	  return res
	}
	
	/*  */
	
	function normalizeChildren (
	  children,
	  ns,
	  nestedIndex
	) {
	  if (isPrimitive(children)) {
	    return [createTextVNode(children)]
	  }
	  if (Array.isArray(children)) {
	    var res = []
	    for (var i = 0, l = children.length; i < l; i++) {
	      var c = children[i]
	      var last = res[res.length - 1]
	      //  nested
	      if (Array.isArray(c)) {
	        res.push.apply(res, normalizeChildren(c, ns, i))
	      } else if (isPrimitive(c)) {
	        if (last && last.text) {
	          last.text += String(c)
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c))
	        }
	      } else if (c instanceof VNode) {
	        if (c.text && last && last.text) {
	          last.text += c.text
	        } else {
	          // inherit parent namespace
	          if (ns) {
	            applyNS(c, ns)
	          }
	          // default key for nested array children (likely generated by v-for)
	          if (c.tag && c.key == null && nestedIndex != null) {
	            c.key = "__vlist_" + nestedIndex + "_" + i + "__"
	          }
	          res.push(c)
	        }
	      }
	    }
	    return res
	  }
	}
	
	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}
	
	function applyNS (vnode, ns) {
	  if (vnode.tag && !vnode.ns) {
	    vnode.ns = ns
	    if (vnode.children) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        applyNS(vnode.children[i], ns)
	      }
	    }
	  }
	}
	
	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}
	
	function mergeVNodeHook (def$$1, key, hook) {
	  var oldHook = def$$1[key]
	  if (oldHook) {
	    var injectedHash = def$$1.__injected || (def$$1.__injected = {})
	    if (!injectedHash[key]) {
	      injectedHash[key] = true
	      def$$1[key] = function () {
	        oldHook.apply(this, arguments)
	        hook.apply(this, arguments)
	      }
	    }
	  } else {
	    def$$1[key] = hook
	  }
	}
	
	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1
	) {
	  var name, cur, old, fn, event, capture
	  for (name in on) {
	    cur = on[name]
	    old = oldOn[name]
	    if (!cur) {
	      process.env.NODE_ENV !== 'production' && warn(
	        ("Handler for event \"" + name + "\" is undefined.")
	      )
	    } else if (!old) {
	      capture = name.charAt(0) === '!'
	      event = capture ? name.slice(1) : name
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), capture)
	      } else {
	        if (!cur.invoker) {
	          fn = cur
	          cur = on[name] = {}
	          cur.fn = fn
	          cur.invoker = fnInvoker(cur)
	        }
	        add(event, cur.invoker, capture)
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i] }
	        on[name] = old
	      } else {
	        old.fn = cur
	        on[name] = old
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = name.charAt(0) === '!' ? name.slice(1) : name
	      remove$$1(event, oldOn[name].invoker)
	    }
	  }
	}
	
	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;
	
	    var single = arguments.length === 1
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1)
	    }
	  }
	}
	
	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1
	    single ? o.fn(ev) : o.fn.apply(null, arguments)
	  }
	}
	
	/*  */
	
	var activeInstance = null
	
	function initLifecycle (vm) {
	  var options = vm.$options
	
	  // locate first non-abstract parent
	  var parent = options.parent
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent
	    }
	    parent.$children.push(vm)
	  }
	
	  vm.$parent = parent
	  vm.$root = parent ? parent.$root : vm
	
	  vm.$children = []
	  vm.$refs = {}
	
	  vm._watcher = null
	  vm._inactive = false
	  vm._isMounted = false
	  vm._isDestroyed = false
	  vm._isBeingDestroyed = false
	}
	
	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this
	    vm.$el = el
	    if (!vm.$options.render) {
	      vm.$options.render = emptyVNode
	      if (process.env.NODE_ENV !== 'production') {
	        /* istanbul ignore if */
	        if (vm.$options.template) {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          )
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          )
	        }
	      }
	    }
	    callHook(vm, 'beforeMount')
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating)
	    }, noop)
	    hydrating = false
	    // root instance, call mounted on self
	    // mounted is called for child components in its inserted hook
	    if (vm.$root === vm) {
	      vm._isMounted = true
	      callHook(vm, 'mounted')
	    }
	    return vm
	  }
	
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate')
	    }
	    var prevEl = vm.$el
	    var prevActiveInstance = activeInstance
	    activeInstance = vm
	    var prevVnode = vm._vnode
	    vm._vnode = vnode
	    if (!prevVnode) {
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      vm.$el = vm.__patch__(vm.$el, vnode, hydrating)
	    } else {
	      vm.$el = vm.__patch__(prevVnode, vnode)
	    }
	    activeInstance = prevActiveInstance
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated')
	    }
	  }
	
	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren)
	    vm.$options._parentVnode = parentVnode
	    vm.$options._renderChildren = renderChildren
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = true
	      }
	      var propKeys = vm.$options._propKeys || []
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i]
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm)
	      }
	      observerState.shouldConvert = true
	      if (process.env.NODE_ENV !== 'production') {
	        observerState.isSettingProps = false
	      }
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners
	      vm.$options._parentListeners = listeners
	      vm._updateListeners(listeners, oldListeners)
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, vm._renderContext)
	      vm.$forceUpdate()
	    }
	  }
	
	  Vue.prototype.$forceUpdate = function () {
	    var vm = this
	    if (vm._watcher) {
	      vm._watcher.update()
	    }
	  }
	
	  Vue.prototype.$destroy = function () {
	    var vm = this
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy')
	    vm._isBeingDestroyed = true
	    // remove self from parent
	    var parent = vm.$parent
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm)
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown()
	    }
	    var i = vm._watchers.length
	    while (i--) {
	      vm._watchers[i].teardown()
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--
	    }
	    // call the last hook...
	    vm._isDestroyed = true
	    callHook(vm, 'destroyed')
	    // turn off all instance listeners.
	    vm.$off()
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null
	    }
	  }
	}
	
	function callHook (vm, hook) {
	  var handlers = vm.$options[hook]
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm)
	    }
	  }
	  vm.$emit('hook:' + hook)
	}
	
	/*  */
	
	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 }
	var hooksToMerge = Object.keys(hooks)
	
	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }
	
	  if (isObject(Ctor)) {
	    Ctor = Vue$2.extend(Ctor)
	  }
	
	  if (typeof Ctor !== 'function') {
	    if (process.env.NODE_ENV !== 'production') {
	      warn(("Invalid Component definition: " + (String(Ctor))), context)
	    }
	    return
	  }
	
	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate()
	      })
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }
	
	  data = data || {}
	
	  // extract props
	  var propsData = extractProps(data, Ctor)
	
	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }
	
	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn
	
	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {}
	  }
	
	  // merge component management hooks onto the placeholder node
	  mergeHooks(data)
	
	  // return a placeholder vnode
	  var name = Ctor.options.name || tag
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  )
	  return vnode
	}
	
	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {}
	  var propOptions = Ctor.options.props
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData)
	    }
	  }
	  return Ctor.options.render.call(
	    null,
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    bind$1(createElement, { _self: Object.create(context) }),
	    {
	      props: props,
	      data: data,
	      parent: context,
	      children: normalizeChildren(children),
	      slots: function () { return resolveSlots(children, context); }
	    }
	  )
	}
	
	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent // activeInstance in lifecycle state
	) {
	  var vnodeComponentOptions = vnode.componentOptions
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children
	  }
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render
	    options.staticRenderFns = inlineTemplate.staticRenderFns
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}
	
	function init (vnode, hydrating) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(vnode, activeInstance)
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating)
	  }
	}
	
	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions
	  var child = vnode.child = oldVnode.child
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  )
	}
	
	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true
	    callHook(vnode.child, 'mounted')
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false
	    callHook(vnode.child, 'activated')
	  }
	}
	
	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy()
	    } else {
	      vnode.child._inactive = true
	      callHook(vnode.child, 'deactivated')
	    }
	  }
	}
	
	function resolveAsyncComponent (
	  factory,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb)
	  } else {
	    factory.requested = true
	    var cbs = factory.pendingCallbacks = [cb]
	    var sync = true
	
	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = Vue$2.extend(res)
	      }
	      // cache resolved
	      factory.resolved = res
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res)
	        }
	      }
	    }
	
	    var reject = function (reason) {
	      process.env.NODE_ENV !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      )
	    }
	
	    var res = factory(resolve, reject)
	
	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject)
	    }
	
	    sync = false
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}
	
	function extractProps (data, Ctor) {
	  // we are only extrating raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props
	  if (!propOptions) {
	    return
	  }
	  var res = {}
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key)
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey)
	    }
	  }
	  return res
	}
	
	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key]
	      if (!preserve) {
	        delete hash[key]
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey]
	      if (!preserve) {
	        delete hash[altKey]
	      }
	      return true
	    }
	  }
	  return false
	}
	
	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {}
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i]
	    var fromParent = data.hook[key]
	    var ours = hooks[key]
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours
	  }
	}
	
	function mergeHook$1 (a, b) {
	  // since all hooks have at most two args, use fixed args
	  // to avoid having to use fn.apply().
	  return function (_, __) {
	    a(_, __)
	    b(_, __)
	  }
	}
	
	/*  */
	
	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  tag,
	  data,
	  children
	) {
	  if (data && (Array.isArray(data) || typeof data !== 'object')) {
	    children = data
	    data = undefined
	  }
	  // make sure to use real instance instead of proxy as context
	  return _createElement(this._self, tag, data, children)
	}
	
	function _createElement (
	  context,
	  tag,
	  data,
	  children
	) {
	  if (data && data.__ob__) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    )
	    return
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return emptyVNode()
	  }
	  if (typeof tag === 'string') {
	    var Ctor
	    var ns = config.getTagNamespace(tag)
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      return createComponent(Ctor, data, context, children, tag)
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    }
	  } else {
	    // direct component options / constructor
	    return createComponent(tag, data, context, children)
	  }
	}
	
	/*  */
	
	function initRender (vm) {
	  vm.$vnode = null // the placeholder node in parent tree
	  vm._vnode = null // the root of the child tree
	  vm._staticTrees = null
	  vm._renderContext = vm.$options._parentVnode && vm.$options._parentVnode.context
	  vm.$slots = resolveSlots(vm.$options._renderChildren, vm._renderContext)
	  // bind the public createElement fn to this instance
	  // so that we get proper render context inside it.
	  vm.$createElement = bind$1(createElement, vm)
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el)
	  }
	}
	
	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this)
	  }
	
	  Vue.prototype._render = function () {
	    var vm = this
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;
	
	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key])
	      }
	    }
	
	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = []
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode
	    // render self
	    var vnode
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement)
	    } catch (e) {
	      if (process.env.NODE_ENV !== 'production') {
	        warn(("Error when rendering " + (formatComponentName(vm)) + ":"))
	      }
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm)
	      } else {
	        if (config._isServer) {
	          throw e
	        } else {
	          setTimeout(function () { throw e }, 0)
	        }
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        )
	      }
	      vnode = emptyVNode()
	    }
	    // set parent
	    vnode.parent = _parentVnode
	    return vnode
	  }
	
	  // shorthands used in render functions
	  Vue.prototype._h = createElement
	  // toString for mustaches
	  Vue.prototype._s = _toString
	  // number conversion
	  Vue.prototype._n = toNumber
	  // empty vnode
	  Vue.prototype._e = emptyVNode
	  // loose equal
	  Vue.prototype._q = looseEqual
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf
	
	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index]
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy)
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        tree[i].isStatic = true
	        tree[i].key = "__static__" + index + "_" + i
	      }
	    } else {
	      tree.isStatic = true
	      tree.key = "__static__" + index
	    }
	    return tree
	  }
	
	  // filter resolution helper
	  var identity = function (_) { return _; }
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  }
	
	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key
	    if (Array.isArray(val)) {
	      ret = new Array(val.length)
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i)
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val)
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i)
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val)
	      ret = new Array(keys.length)
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i]
	        ret[i] = render(val[key], key, i)
	      }
	    }
	    return ret
	  }
	
	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback
	  ) {
	    var slotNodes = this.$slots[name]
	    // warn duplicate slot usage
	    if (slotNodes && process.env.NODE_ENV !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      )
	      slotNodes._rendered = true
	    }
	    return slotNodes || fallback
	  }
	
	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        process.env.NODE_ENV !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        )
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value)
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key]
	          } else {
	            var hash = asProp || config.mustUseProp(key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {})
	            hash[key] = value[key]
	          }
	        }
	      }
	    }
	    return data
	  }
	
	  // expose v-on keyCodes
	  Vue.prototype._k = function getKeyCodes (key) {
	    return config.keyCodes[key]
	  }
	}
	
	function resolveSlots (
	  renderChildren,
	  context
	) {
	  var slots = {}
	  if (!renderChildren) {
	    return slots
	  }
	  var children = normalizeChildren(renderChildren) || []
	  var defaultSlot = []
	  var name, child
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i]
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if (child.context === context &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []))
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children)
	      } else {
	        slot.push(child)
	      }
	    } else {
	      defaultSlot.push(child)
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot
	  }
	  return slots
	}
	
	/*  */
	
	function initEvents (vm) {
	  vm._events = Object.create(null)
	  // init parent attached events
	  var listeners = vm.$options._parentListeners
	  var on = bind$1(vm.$on, vm)
	  var off = bind$1(vm.$off, vm)
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, on, off)
	  }
	  if (listeners) {
	    vm._updateListeners(listeners)
	  }
	}
	
	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn)
	    return vm
	  }
	
	  Vue.prototype.$once = function (event, fn) {
	    var vm = this
	    function on () {
	      vm.$off(event, on)
	      fn.apply(vm, arguments)
	    }
	    on.fn = fn
	    vm.$on(event, on)
	    return vm
	  }
	
	  Vue.prototype.$off = function (event, fn) {
	    var vm = this
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null)
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event]
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null
	      return vm
	    }
	    // specific handler
	    var cb
	    var i = cbs.length
	    while (i--) {
	      cb = cbs[i]
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1)
	        break
	      }
	    }
	    return vm
	  }
	
	  Vue.prototype.$emit = function (event) {
	    var vm = this
	    var cbs = vm._events[event]
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs
	      var args = toArray(arguments, 1)
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args)
	      }
	    }
	    return vm
	  }
	}
	
	/*  */
	
	var uid = 0
	
	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this
	    // a uid
	    vm._uid = uid++
	    // a flag to avoid this being observed
	    vm._isVue = true
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options)
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm),
	        options || {},
	        vm
	      )
	    }
	    /* istanbul ignore else */
	    if (process.env.NODE_ENV !== 'production') {
	      initProxy(vm)
	    } else {
	      vm._renderProxy = vm
	    }
	    // expose real self
	    vm._self = vm
	    initLifecycle(vm)
	    initEvents(vm)
	    callHook(vm, 'beforeCreate')
	    initState(vm)
	    callHook(vm, 'created')
	    initRender(vm)
	  }
	
	  function initInternalComponent (vm, options) {
	    var opts = vm.$options = Object.create(resolveConstructorOptions(vm))
	    // doing this because it's faster than dynamic enumeration.
	    opts.parent = options.parent
	    opts.propsData = options.propsData
	    opts._parentVnode = options._parentVnode
	    opts._parentListeners = options._parentListeners
	    opts._renderChildren = options._renderChildren
	    opts._componentTag = options._componentTag
	    if (options.render) {
	      opts.render = options.render
	      opts.staticRenderFns = options.staticRenderFns
	    }
	  }
	
	  function resolveConstructorOptions (vm) {
	    var Ctor = vm.constructor
	    var options = Ctor.options
	    if (Ctor.super) {
	      var superOptions = Ctor.super.options
	      var cachedSuperOptions = Ctor.superOptions
	      if (superOptions !== cachedSuperOptions) {
	        // super option changed
	        Ctor.superOptions = superOptions
	        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions)
	        if (options.name) {
	          options.components[options.name] = Ctor
	        }
	      }
	    }
	    return options
	  }
	}
	
	function Vue$2 (options) {
	  if (process.env.NODE_ENV !== 'production' &&
	    !(this instanceof Vue$2)) {
	    warn('Vue is a constructor and should be called with the `new` keyword')
	  }
	  this._init(options)
	}
	
	initMixin(Vue$2)
	stateMixin(Vue$2)
	eventsMixin(Vue$2)
	lifecycleMixin(Vue$2)
	renderMixin(Vue$2)
	
	var warn = noop
	var formatComponentName
	
	if (process.env.NODE_ENV !== 'production') {
	  var hasConsole = typeof console !== 'undefined'
	
	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ))
	    }
	  }
	
	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name
	    return name ? ("component <" + name + ">") : "anonymous component"
	  }
	
	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages."
	    }
	    return ("(found in " + str + ")")
	  }
	}
	
	/*  */
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies
	
	/**
	 * Options with restrictions
	 */
	if (process.env.NODE_ENV !== 'production') {
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      )
	    }
	    return defaultStrat(parent, child)
	  }
	
	  strats.name = function (parent, child, vm) {
	    if (vm && child) {
	      warn(
	        'options "name" can only be used as a component definition option, ' +
	        'not during instance creation.'
	      )
	    }
	    return defaultStrat(parent, child)
	  }
	}
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  var key, toVal, fromVal
	  for (key in from) {
	    toVal = to[key]
	    fromVal = from[key]
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal)
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal)
	    }
	  }
	  return to
	}
	
	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      )
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	}
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}
	
	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook
	})
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null)
	  return childVal
	    ? extend(res, childVal)
	    : res
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets
	})
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {}
	  extend(ret, parentVal)
	  for (var key in childVal) {
	    var parent = ret[key]
	    var child = childVal[key]
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent]
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child]
	  }
	  return ret
	}
	
	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null)
	  extend(ret, parentVal)
	  extend(ret, childVal)
	  return ret
	}
	
	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	}
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 */
	function normalizeComponents (options) {
	  if (options.components) {
	    var components = options.components
	    var def
	    for (var key in components) {
	      var lower = key.toLowerCase()
	      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	        process.env.NODE_ENV !== 'production' && warn(
	          'Do not use built-in or reserved HTML elements as component ' +
	          'id: ' + key
	        )
	        continue
	      }
	      def = components[key]
	      if (isPlainObject(def)) {
	        components[key] = Vue$2.extend(def)
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props
	  if (!props) { return }
	  var res = {}
	  var i, val, name
	  if (Array.isArray(props)) {
	    i = props.length
	    while (i--) {
	      val = props[i]
	      if (typeof val === 'string') {
	        name = camelize(val)
	        res[name] = { type: null }
	      } else if (process.env.NODE_ENV !== 'production') {
	        warn('props must be strings when using array syntax.')
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key]
	      name = camelize(key)
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val }
	    }
	  }
	  options.props = res
	}
	
	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key]
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def }
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  normalizeComponents(child)
	  normalizeProps(child)
	  normalizeDirectives(child)
	  var extendsFrom = child.extends
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm)
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i]
	      if (mixin.prototype instanceof Vue$2) {
	        mixin = mixin.options
	      }
	      parent = mergeOptions(parent, mixin, vm)
	    }
	  }
	  var options = {}
	  var key
	  for (key in parent) {
	    mergeField(key)
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key)
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat
	    options[key] = strat(parent[key], child[key], vm, key)
	  }
	  return options
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type]
	  var res = assets[id] ||
	    // camelCase ID
	    assets[camelize(id)] ||
	    // Pascal Case ID
	    assets[capitalize(camelize(id))]
	  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    )
	  }
	  return res
	}
	
	/*  */
	
	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key]
	  var absent = !hasOwn(propsData, key)
	  var value = propsData[key]
	  // handle boolean props
	  if (getType(prop.type) === 'Boolean') {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key)
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert
	    observerState.shouldConvert = true
	    observe(value)
	    observerState.shouldConvert = prevShouldConvert
	  }
	  if (process.env.NODE_ENV !== 'production') {
	    assertProp(prop, key, value, vm, absent)
	  }
	  return value
	}
	
	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, name) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      'Invalid default value for prop "' + name + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    )
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}
	
	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    )
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type
	  var valid = !type || type === true
	  var expectedTypes = []
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type]
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i])
	      expectedTypes.push(assertedType.expectedType)
	      valid = assertedType.valid
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    )
	    return
	  }
	  var validator = prop.validator
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      )
	    }
	  }
	}
	
	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid
	  var expectedType = getType(type)
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string')
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number')
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean')
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function')
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value)
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value)
	  } else {
	    valid = value instanceof type
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}
	
	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/)
	  return match && match[1]
	}
	
	
	
	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});
	
	/*  */
	
	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1)
	    args.unshift(this)
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args)
	    } else {
	      plugin.apply(null, args)
	    }
	    plugin.installed = true
	    return this
	  }
	}
	
	/*  */
	
	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin)
	  }
	}
	
	/*  */
	
	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0
	  var cid = 1
	
	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {}
	    var Super = this
	    var isFirstExtend = Super.cid === 0
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor
	    }
	    var name = extendOptions.name || Super.options.name
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characaters and the hyphen.'
	        )
	        name = null
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options)
	    }
	    Sub.prototype = Object.create(Super.prototype)
	    Sub.prototype.constructor = Sub
	    Sub.cid = cid++
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    )
	    Sub['super'] = Super
	    // allow further extension
	    Sub.extend = Super.extend
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type]
	    })
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options
	    Sub.extendOptions = extendOptions
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub
	    }
	    return Sub
	  }
	}
	
	/*  */
	
	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            )
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id
	          definition = Vue.extend(definition)
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition }
	        }
	        this.options[type + 's'][id] = definition
	        return definition
	      }
	    }
	  })
	}
	
	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  created: function created () {
	    this.cache = Object.create(null)
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default)
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + '::' + opts.tag
	        : vnode.key
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child
	      } else {
	        this.cache[key] = vnode
	      }
	      vnode.data.keepAlive = true
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;
	
	    for (var key in this.cache) {
	      var vnode = this$1.cache[key]
	      callHook(vnode.child, 'deactivated')
	      vnode.child.$destroy()
	    }
	  }
	}
	
	var builtInComponents = {
	  KeepAlive: KeepAlive
	}
	
	/*  */
	
	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {}
	  configDef.get = function () { return config; }
	  if (process.env.NODE_ENV !== 'production') {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      )
	    }
	  }
	  Object.defineProperty(Vue, 'config', configDef)
	  Vue.util = util
	  Vue.set = set
	  Vue.delete = del
	  Vue.nextTick = nextTick
	
	  Vue.options = Object.create(null)
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null)
	  })
	
	  extend(Vue.options.components, builtInComponents)
	
	  initUse(Vue)
	  initMixin$1(Vue)
	  initExtend(Vue)
	  initAssetRegisters(Vue)
	}
	
	initGlobalAPI(Vue$2)
	
	Object.defineProperty(Vue$2.prototype, '$isServer', {
	  get: function () { return config._isServer; }
	})
	
	Vue$2.version = '2.0.1'
	
	/*  */
	
	// attributes that should be using props for binding
	var mustUseProp = makeMap('value,selected,checked,muted')
	
	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck')
	
	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	)
	
	var isAttr = makeMap(
	  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
	  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
	  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
	  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
	  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
	  'form,formaction,headers,<th>,height,hidden,high,href,hreflang,http-equiv,' +
	  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
	  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
	  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
	  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
	  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
	  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
	  'target,title,type,usemap,value,width,wrap'
	)
	
	
	
	var xlinkNS = 'http://www.w3.org/1999/xlink'
	
	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	}
	
	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	}
	
	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	}
	
	/*  */
	
	function genClassForVnode (vnode) {
	  var data = vnode.data
	  var parentNode = vnode
	  var childNode = vnode
	  while (childNode.child) {
	    childNode = childNode.child._vnode
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data)
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data)
	    }
	  }
	  return genClassFromData(data)
	}
	
	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}
	
	function genClassFromData (data) {
	  var dynamicClass = data.class
	  var staticClass = data.staticClass
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}
	
	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}
	
	function stringifyClass (value) {
	  var res = ''
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' '
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' ' }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}
	
	/*  */
	
	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	}
	
	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	)
	
	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	)
	
	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	)
	
	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	)
	
	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	)
	
	
	
	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	}
	
	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}
	
	var unknownElementCache = Object.create(null)
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase()
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag)
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}
	
	/*  */
	
	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el
	    el = document.querySelector(el)
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn(
	        'Cannot find element: ' + selector
	      )
	      return document.createElement('div')
	    }
	  }
	  return el
	}
	
	/*  */
	
	function createElement$1 (tagName) {
	  return document.createElement(tagName)
	}
	
	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}
	
	function createTextNode (text) {
	  return document.createTextNode(text)
	}
	
	function createComment (text) {
	  return document.createComment(text)
	}
	
	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode)
	}
	
	function removeChild (node, child) {
	  node.removeChild(child)
	}
	
	function appendChild (node, child) {
	  node.appendChild(child)
	}
	
	function parentNode (node) {
	  return node.parentNode
	}
	
	function nextSibling (node) {
	  return node.nextSibling
	}
	
	function tagName (node) {
	  return node.tagName
	}
	
	function setTextContent (node, text) {
	  node.textContent = text
	}
	
	function childNodes (node) {
	  return node.childNodes
	}
	
	function setAttribute (node, key, val) {
	  node.setAttribute(key, val)
	}
	
	
	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		childNodes: childNodes,
		setAttribute: setAttribute
	});
	
	/*  */
	
	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode)
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true)
	      registerRef(vnode)
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true)
	  }
	}
	
	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref
	  if (!key) { return }
	
	  var vm = vnode.context
	  var ref = vnode.child || vnode.elm
	  var refs = vm.$refs
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref)
	    } else if (refs[key] === ref) {
	      refs[key] = undefined
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key])) {
	        refs[key].push(ref)
	      } else {
	        refs[key] = [ref]
	      }
	    } else {
	      refs[key] = ref
	    }
	  }
	}
	
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	
	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */
	
	var emptyData = {}
	var emptyNode = new VNode('', emptyData, [])
	var hooks$1 = ['create', 'update', 'postpatch', 'remove', 'destroy']
	
	function isUndef (s) {
	  return s == null
	}
	
	function isDef (s) {
	  return s != null
	}
	
	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}
	
	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key
	  var map = {}
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key
	    if (isDef(key)) { map[key] = i }
	  }
	  return map
	}
	
	function createPatchFunction (backend) {
	  var i, j
	  var cbs = {}
	
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;
	
	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = []
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]) }
	    }
	  }
	
	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }
	
	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm)
	      }
	    }
	    remove$$1.listeners = listeners
	    return remove$$1
	  }
	
	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el)
	    nodeOps.removeChild(parent, el)
	  }
	
	  function createElm (vnode, insertedVnodeQueue, nested) {
	    var i
	    var data = vnode.data
	    vnode.isRootInsert = !nested
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode) }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(i = vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue)
	        return vnode.elm
	      }
	    }
	    var children = vnode.children
	    var tag = vnode.tag
	    if (isDef(tag)) {
	      if (process.env.NODE_ENV !== 'production') {
	        if (
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          )
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag)
	      setScope(vnode)
	      createChildren(vnode, children, insertedVnodeQueue)
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue)
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text)
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text)
	    }
	    return vnode.elm
	  }
	
	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        nodeOps.appendChild(vnode.elm, createElm(children[i], insertedVnodeQueue, true))
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text))
	    }
	  }
	
	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode
	    }
	    return isDef(vnode.tag)
	  }
	
	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode)
	    }
	    i = vnode.data.hook // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode) }
	      if (i.insert) { insertedVnodeQueue.push(vnode) }
	    }
	  }
	
	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert)
	    }
	    vnode.elm = vnode.child.$el
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue)
	      setScope(vnode)
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode)
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode)
	    }
	  }
	
	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '')
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '')
	    }
	  }
	
	  function addVnodes (parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before)
	    }
	  }
	
	  function invokeDestroyHook (vnode) {
	    var i, j
	    var data = vnode.data
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode) }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode) }
	    }
	    if (isDef(i = vnode.child) && !data.keepAlive) {
	      invokeDestroyHook(i._vnode)
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j])
	      }
	    }
	  }
	
	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx]
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch)
	          invokeDestroyHook(ch)
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm)
	        }
	      }
	    }
	  }
	
	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners)
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm)
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm)
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm)
	      } else {
	        rm()
	      }
	    } else {
	      removeElement(vnode.elm)
	    }
	  }
	
	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0
	    var newStartIdx = 0
	    var oldEndIdx = oldCh.length - 1
	    var oldStartVnode = oldCh[0]
	    var oldEndVnode = oldCh[oldEndIdx]
	    var newEndIdx = newCh.length - 1
	    var newStartVnode = newCh[0]
	    var newEndVnode = newCh[newEndIdx]
	    var oldKeyToIdx, idxInOld, elmToMove, before
	
	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx]
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
	        oldStartVnode = oldCh[++oldStartIdx]
	        newStartVnode = newCh[++newStartIdx]
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
	        oldEndVnode = oldCh[--oldEndIdx]
	        newEndVnode = newCh[--newEndIdx]
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
	        oldStartVnode = oldCh[++oldStartIdx]
	        newEndVnode = newCh[--newEndIdx]
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
	        oldEndVnode = oldCh[--oldEndIdx]
	        newStartVnode = newCh[++newStartIdx]
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null
	        if (isUndef(idxInOld)) { // New element
	          nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
	          newStartVnode = newCh[++newStartIdx]
	        } else {
	          elmToMove = oldCh[idxInOld]
	          /* istanbul ignore if */
	          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            )
	          }
	          if (elmToMove.tag !== newStartVnode.tag) {
	            // same key but different element. treat as new element
	            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm)
	            newStartVnode = newCh[++newStartIdx]
	          } else {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue)
	            oldCh[idxInOld] = undefined
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm)
	            newStartVnode = newCh[++newStartIdx]
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
	    }
	  }
	
	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        vnode.isCloned) {
	      vnode.elm = oldVnode.elm
	      return
	    }
	    var i, hook
	    var hasData = isDef(i = vnode.data)
	    if (hasData && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	      i(oldVnode, vnode)
	    }
	    var elm = vnode.elm = oldVnode.elm
	    var oldCh = oldVnode.children
	    var ch = vnode.children
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode) }
	      if (isDef(hook) && isDef(i = hook.update)) { i(oldVnode, vnode) }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly) }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, '') }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1)
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '')
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text)
	    }
	    if (hasData) {
	      for (i = 0; i < cbs.postpatch.length; ++i) { cbs.postpatch[i](oldVnode, vnode) }
	      if (isDef(hook) && isDef(i = hook.postpatch)) { i(oldVnode, vnode) }
	    }
	  }
	
	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i])
	      }
	    }
	  }
	
	  var bailed = false
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */) }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue)
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        var childNodes = nodeOps.childNodes(elm)
	        // empty element, allow client to pick up and populate children
	        if (!childNodes.length) {
	          createChildren(vnode, children, insertedVnodeQueue)
	        } else {
	          var childrenMatch = true
	          if (childNodes.length !== children.length) {
	            childrenMatch = false
	          } else {
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
	                childrenMatch = false
	                break
	              }
	            }
	          }
	          if (!childrenMatch) {
	            if (process.env.NODE_ENV !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true
	              console.warn('Parent: ', elm)
	              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children)
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue)
	      }
	    }
	    return true
	  }
	
	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag === nodeOps.tagName(node).toLowerCase()
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }
	
	  return function patch (oldVnode, vnode, hydrating, removeOnly) {
	    var elm, parent
	    var isInitialPatch = false
	    var insertedVnodeQueue = []
	
	    if (!oldVnode) {
	      // empty mount, create new root element
	      isInitialPatch = true
	      createElm(vnode, insertedVnodeQueue)
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType)
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly)
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered')
	            hydrating = true
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true)
	              return oldVnode
	            } else if (process.env.NODE_ENV !== 'production') {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              )
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode)
	        }
	        elm = oldVnode.elm
	        parent = nodeOps.parentNode(elm)
	
	        createElm(vnode, insertedVnodeQueue)
	
	        // component root element replaced.
	        // update parent placeholder node element.
	        if (vnode.parent) {
	          vnode.parent.elm = vnode.elm
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent)
	            }
	          }
	        }
	
	        if (parent !== null) {
	          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm))
	          removeVnodes(parent, [oldVnode], 0, 0)
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode)
	        }
	      }
	    }
	
	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch)
	    return vnode.elm
	  }
	}
	
	/*  */
	
	var directives = {
	  create: function bindDirectives (oldVnode, vnode) {
	    var hasInsert = false
	    forEachDirective(oldVnode, vnode, function (def, dir) {
	      callHook$1(def, dir, 'bind', vnode, oldVnode)
	      if (def.inserted) {
	        hasInsert = true
	      }
	    })
	    if (hasInsert) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	        applyDirectives(oldVnode, vnode, 'inserted')
	      })
	    }
	  },
	  update: function updateDirectives (oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'update')
	    // if old vnode has directives but new vnode doesn't
	    // we need to teardown the directives on the old one.
	    if (oldVnode.data.directives && !vnode.data.directives) {
	      applyDirectives(oldVnode, oldVnode, 'unbind')
	    }
	  },
	  postpatch: function postupdateDirectives (oldVnode, vnode) {
	    applyDirectives(oldVnode, vnode, 'componentUpdated')
	  },
	  destroy: function unbindDirectives (vnode) {
	    applyDirectives(vnode, vnode, 'unbind')
	  }
	}
	
	var emptyModifiers = Object.create(null)
	
	function forEachDirective (
	  oldVnode,
	  vnode,
	  fn
	) {
	  var dirs = vnode.data.directives
	  if (dirs) {
	    for (var i = 0; i < dirs.length; i++) {
	      var dir = dirs[i]
	      var def = resolveAsset(vnode.context.$options, 'directives', dir.name, true)
	      if (def) {
	        var oldDirs = oldVnode && oldVnode.data.directives
	        if (oldDirs) {
	          dir.oldValue = oldDirs[i].value
	        }
	        if (!dir.modifiers) {
	          dir.modifiers = emptyModifiers
	        }
	        fn(def, dir)
	      }
	    }
	  }
	}
	
	function applyDirectives (
	  oldVnode,
	  vnode,
	  hook
	) {
	  forEachDirective(oldVnode, vnode, function (def, dir) {
	    callHook$1(def, dir, hook, vnode, oldVnode)
	  })
	}
	
	function callHook$1 (def, dir, hook, vnode, oldVnode) {
	  var fn = def && def[hook]
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode)
	  }
	}
	
	var baseModules = [
	  ref,
	  directives
	]
	
	/*  */
	
	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old
	  var elm = vnode.elm
	  var oldAttrs = oldVnode.data.attrs || {}
	  var attrs = vnode.data.attrs || {}
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs)
	  }
	
	  for (key in attrs) {
	    cur = attrs[key]
	    old = oldAttrs[key]
	    if (old !== cur) {
	      setAttr(elm, key, cur)
	    }
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key))
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key)
	      }
	    }
	  }
	}
	
	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key)
	    } else {
	      el.setAttribute(key, key)
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true')
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key))
	    } else {
	      el.setAttributeNS(xlinkNS, key, value)
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key)
	    } else {
	      el.setAttribute(key, value)
	    }
	  }
	}
	
	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	}
	
	/*  */
	
	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm
	  var data = vnode.data
	  var oldData = oldVnode.data
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }
	
	  var cls = genClassForVnode(vnode)
	
	  // handle transition classes
	  var transitionClass = el._transitionClasses
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass))
	  }
	
	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls)
	    el._prevClass = cls
	  }
	}
	
	var klass = {
	  create: updateClass,
	  update: updateClass
	}
	
	// skip type checking this file because we need to attach private properties
	// to elements
	
	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {}
	  var oldOn = oldVnode.data.on || {}
	  var add = vnode.elm._v_add || (vnode.elm._v_add = function (event, handler, capture) {
	    vnode.elm.addEventListener(event, handler, capture)
	  })
	  var remove = vnode.elm._v_remove || (vnode.elm._v_remove = function (event, handler) {
	    vnode.elm.removeEventListener(event, handler)
	  })
	  updateListeners(on, oldOn, add, remove)
	}
	
	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	}
	
	/*  */
	
	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur
	  var elm = vnode.elm
	  var oldProps = oldVnode.data.domProps || {}
	  var props = vnode.data.domProps || {}
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props)
	  }
	
	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = undefined
	    }
	  }
	  for (key in props) {
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if ((key === 'textContent' || key === 'innerHTML') && vnode.children) {
	      vnode.children.length = 0
	    }
	    cur = props[key]
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur)
	      if (elm.value !== strCur) {
	        elm.value = strCur
	      }
	    } else {
	      elm[key] = cur
	    }
	  }
	}
	
	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	}
	
	/*  */
	
	var prefixes = ['Webkit', 'Moz', 'ms']
	
	var testEl
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div')
	  prop = camelize(prop)
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1)
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	})
	
	function updateStyle (oldVnode, vnode) {
	  if ((!oldVnode.data || !oldVnode.data.style) && !vnode.data.style) {
	    return
	  }
	  var cur, name
	  var el = vnode.elm
	  var oldStyle = oldVnode.data.style || {}
	  var style = vnode.data.style || {}
	
	  // handle string
	  if (typeof style === 'string') {
	    el.style.cssText = style
	    return
	  }
	
	  var needClone = style.__ob__
	
	  // handle array syntax
	  if (Array.isArray(style)) {
	    style = vnode.data.style = toObject(style)
	  }
	
	  // clone the style for future updates,
	  // in case the user mutates the style object in-place.
	  if (needClone) {
	    style = vnode.data.style = extend({}, style)
	  }
	
	  for (name in oldStyle) {
	    if (!style[name]) {
	      el.style[normalize(name)] = ''
	    }
	  }
	  for (name in style) {
	    cur = style[name]
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      el.style[normalize(name)] = cur == null ? '' : cur
	    }
	  }
	}
	
	var style = {
	  create: updateStyle,
	  update: updateStyle
	}
	
	/*  */
	
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); })
	    } else {
	      el.classList.add(cls)
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' '
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim())
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); })
	    } else {
	      el.classList.remove(cls)
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' '
	    var tar = ' ' + cls + ' '
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ')
	    }
	    el.setAttribute('class', cur.trim())
	  }
	}
	
	/*  */
	
	var hasTransition = inBrowser && !isIE9
	var TRANSITION = 'transition'
	var ANIMATION = 'animation'
	
	// Transition property/event sniffing
	var transitionProp = 'transition'
	var transitionEndEvent = 'transitionend'
	var animationProp = 'animation'
	var animationEndEvent = 'animationend'
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition'
	    transitionEndEvent = 'webkitTransitionEnd'
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation'
	    animationEndEvent = 'webkitAnimationEnd'
	  }
	}
	
	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn)
	  })
	}
	
	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls)
	  addClass(el, cls)
	}
	
	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls)
	  }
	  removeClass(el, cls)
	}
	
	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent
	  var ended = 0
	  var end = function () {
	    el.removeEventListener(event, onEnd)
	    cb()
	  }
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end()
	      }
	    }
	  }
	  setTimeout(function () {
	    if (ended < propCount) {
	      end()
	    }
	  }, timeout + 1)
	  el.addEventListener(event, onEnd)
	}
	
	var transformRE = /\b(transform|all)(,|$)/
	
	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el)
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ')
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ')
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations)
	  var animationDelays = styles[animationProp + 'Delay'].split(', ')
	  var animationDurations = styles[animationProp + 'Duration'].split(', ')
	  var animationTimeout = getTimeout(animationDelays, animationDurations)
	
	  var type
	  var timeout = 0
	  var propCount = 0
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION
	      timeout = transitionTimeout
	      propCount = transitionDurations.length
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION
	      timeout = animationTimeout
	      propCount = animationDurations.length
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout)
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property'])
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}
	
	function getTimeout (delays, durations) {
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}
	
	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}
	
	/*  */
	
	function enter (vnode) {
	  var el = vnode.elm
	
	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true
	    el._leaveCb()
	  }
	
	  var data = resolveTransition(vnode.data.transition)
	  if (!data) {
	    return
	  }
	
	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	
	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var transitionNode = activeInstance.$vnode
	  var context = transitionNode && transitionNode.parent
	    ? transitionNode.parent.context
	    : activeInstance
	
	  var isAppear = !context._isMounted || !vnode.isRootInsert
	
	  if (isAppear && !appear && appear !== '') {
	    return
	  }
	
	  var startClass = isAppear ? appearClass : enterClass
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled
	
	  var expectsCSS = css !== false && !isIE9
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1
	
	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass)
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass)
	      }
	      enterCancelledHook && enterCancelledHook(el)
	    } else {
	      afterEnterHook && afterEnterHook(el)
	    }
	    el._enterCb = null
	  })
	
	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key]
	      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb()
	      }
	      enterHook && enterHook(el, cb)
	    })
	  }
	
	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el)
	  if (expectsCSS) {
	    addTransitionClass(el, startClass)
	    addTransitionClass(el, activeClass)
	    nextFrame(function () {
	      removeTransitionClass(el, startClass)
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb)
	      }
	    })
	  }
	
	  if (vnode.data.show) {
	    enterHook && enterHook(el, cb)
	  }
	
	  if (!expectsCSS && !userWantsControl) {
	    cb()
	  }
	}
	
	function leave (vnode, rm) {
	  var el = vnode.elm
	
	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true
	    el._enterCb()
	  }
	
	  var data = resolveTransition(vnode.data.transition)
	  if (!data) {
	    return rm()
	  }
	
	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	
	  var expectsCSS = css !== false && !isIE9
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1
	
	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass)
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass)
	      }
	      leaveCancelled && leaveCancelled(el)
	    } else {
	      rm()
	      afterLeave && afterLeave(el)
	    }
	    el._leaveCb = null
	  })
	
	  if (delayLeave) {
	    delayLeave(performLeave)
	  } else {
	    performLeave()
	  }
	
	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode
	    }
	    beforeLeave && beforeLeave(el)
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass)
	      addTransitionClass(el, leaveActiveClass)
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass)
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb)
	        }
	      })
	    }
	    leave && leave(el, cb)
	    if (!expectsCSS && !userWantsControl) {
	      cb()
	    }
	  }
	}
	
	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {}
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'))
	    }
	    extend(res, def$$1)
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}
	
	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	})
	
	function once (fn) {
	  var called = false
	  return function () {
	    if (!called) {
	      called = true
	      fn()
	    }
	  }
	}
	
	var transition = inBrowser ? {
	  create: function create (_, vnode) {
	    if (!vnode.data.show) {
	      enter(vnode)
	    }
	  },
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm)
	    } else {
	      rm()
	    }
	  }
	} : {}
	
	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	]
	
	/*  */
	
	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules)
	
	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules })
	
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */
	
	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_\-]*)?$/
	
	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement
	    if (el && el.vmodel) {
	      trigger(el, 'input')
	    }
	  })
	}
	
	var model = {
	  bind: function bind (el, binding, vnode) {
	    if (process.env.NODE_ENV !== 'production') {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        )
	      }
	    }
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context)
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        var cb = function () {
	          setSelected(el, binding, vnode.context)
	        }
	        nextTick(cb)
	        setTimeout(cb, 0)
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text') {
	      if (!isAndroid) {
	        el.addEventListener('compositionstart', onCompositionStart)
	        el.addEventListener('compositionend', onCompositionEnd)
	      }
	      /* istanbul ignore if */
	      if (isIE9) {
	        el.vmodel = true
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context)
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matchig
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : hasNoMatchingOption(binding.value, el.options)
	      if (needReset) {
	        trigger(el, 'change')
	      }
	    }
	  }
	}
	
	function setSelected (el, binding, vm) {
	  var value = binding.value
	  var isMultiple = el.multiple
	  if (isMultiple && !Array.isArray(value)) {
	    process.env.NODE_ENV !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    )
	    return
	  }
	  var selected, option
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i]
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1
	      if (option.selected !== selected) {
	        option.selected = selected
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1
	  }
	}
	
	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}
	
	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}
	
	function onCompositionStart (e) {
	  e.target.composing = true
	}
	
	function onCompositionEnd (e) {
	  e.target.composing = false
	  trigger(e.target, 'input')
	}
	
	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents')
	  e.initEvent(type, true, true)
	  el.dispatchEvent(e)
	}
	
	/*  */
	
	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}
	
	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;
	
	    vnode = locateNode(vnode)
	    var transition = vnode.data && vnode.data.transition
	    if (value && transition && !isIE9) {
	      enter(vnode)
	    }
	    var originalDisplay = el.style.display === 'none' ? '' : el.style.display
	    el.style.display = value ? originalDisplay : 'none'
	    el.__vOriginalDisplay = originalDisplay
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;
	
	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode)
	    var transition = vnode.data && vnode.data.transition
	    if (transition && !isIE9) {
	      if (value) {
	        enter(vnode)
	        el.style.display = el.__vOriginalDisplay
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none'
	        })
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none'
	    }
	  }
	}
	
	var platformDirectives = {
	  model: model,
	  show: show
	}
	
	/*  */
	
	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)
	
	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	}
	
	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recrusively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}
	
	function extractTransitionData (comp) {
	  var data = {}
	  var options = comp.$options
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key]
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn
	  }
	  return data
	}
	
	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}
	
	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}
	
	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;
	
	    var children = this.$slots.default
	    if (!children) {
	      return
	    }
	
	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; })
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }
	
	    // warn multiple elements
	    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      )
	    }
	
	    var mode = this.mode
	
	    // warn invalid mode
	    if (process.env.NODE_ENV !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      )
	    }
	
	    var rawChild = children[0]
	
	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }
	
	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild)
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }
	
	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }
	
	    child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this)
	    var oldRawChild = this._vnode
	    var oldChild = getRealChild(oldRawChild)
	
	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true
	    }
	
	    if (oldChild && oldChild.data && oldChild.key !== child.key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data)
	
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false
	          this$1.$forceUpdate()
	        })
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave
	        var performLeave = function () { delayedLeave() }
	        mergeVNodeHook(data, 'afterEnter', performLeave)
	        mergeVNodeHook(data, 'enterCancelled', performLeave)
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave
	        })
	      }
	    }
	
	    return rawChild
	  }
	}
	
	/*  */
	
	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.
	
	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.
	
	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps)
	
	delete props.mode
	
	var TransitionGroup = {
	  props: props,
	
	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span'
	    var map = Object.create(null)
	    var prevChildren = this.prevChildren = this.children
	    var rawChildren = this.$slots.default || []
	    var children = this.children = []
	    var transitionData = extractTransitionData(this)
	
	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i]
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c)
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData
	        } else if (process.env.NODE_ENV !== 'production') {
	          var opts = c.componentOptions
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag
	          warn(("<transition-group> children must be keyed: <" + name + ">"))
	        }
	      }
	    }
	
	    if (prevChildren) {
	      var kept = []
	      var removed = []
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1]
	        c$1.data.transition = transitionData
	        c$1.data.pos = c$1.elm.getBoundingClientRect()
	        if (map[c$1.key]) {
	          kept.push(c$1)
	        } else {
	          removed.push(c$1)
	        }
	      }
	      this.kept = h(tag, null, kept)
	      this.removed = removed
	    }
	
	    return h(tag, null, children)
	  },
	
	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    )
	    this._vnode = this.kept
	  },
	
	  updated: function updated () {
	    var children = this.prevChildren
	    var moveClass = this.moveClass || (this.name + '-move')
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }
	
	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs)
	    children.forEach(recordPosition)
	    children.forEach(applyTranslation)
	
	    // force reflow to put everything in position
	    var f = document.body.offsetHeight // eslint-disable-line
	
	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm
	        var s = el.style
	        addTransitionClass(el, moveClass)
	        s.transform = s.WebkitTransform = s.transitionDuration = ''
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb)
	            el._moveCb = null
	            removeTransitionClass(el, moveClass)
	          }
	        })
	      }
	    })
	  },
	
	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass)
	      var info = getTransitionInfo(el)
	      removeTransitionClass(el, moveClass)
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	}
	
	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb()
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb()
	  }
	}
	
	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect()
	}
	
	function applyTranslation (c) {
	  var oldPos = c.data.pos
	  var newPos = c.data.newPos
	  var dx = oldPos.left - newPos.left
	  var dy = oldPos.top - newPos.top
	  if (dx || dy) {
	    c.data.moved = true
	    var s = c.elm.style
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)"
	    s.transitionDuration = '0s'
	  }
	}
	
	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	}
	
	/*  */
	
	// install platform specific utils
	Vue$2.config.isUnknownElement = isUnknownElement
	Vue$2.config.isReservedTag = isReservedTag
	Vue$2.config.getTagNamespace = getTagNamespace
	Vue$2.config.mustUseProp = mustUseProp
	
	// install platform runtime directives & components
	extend(Vue$2.options.directives, platformDirectives)
	extend(Vue$2.options.components, platformComponents)
	
	// install platform patch function
	Vue$2.prototype.__patch__ = config._isServer ? noop : patch$1
	
	// wrap mount
	Vue$2.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && !config._isServer ? query(el) : undefined
	  return this._mount(el, hydrating)
	}
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$2)
	    } else if (
	      process.env.NODE_ENV !== 'production' &&
	      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      )
	    }
	  }
	}, 0)
	
	module.exports = Vue$2;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(63)))

/***/ },
/* 63 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 69 */,
/* 70 */,
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(72)
	
	/* script */
	__vue_exports__ = __webpack_require__(74)
	
	/* template */
	var __vue_template__ = __webpack_require__(91)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "FormBuilder"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-c94fb106"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-c94fb106", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-c94fb106", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] FormBuilder.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(73);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(68)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c94fb106&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilder.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-c94fb106&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilder.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(67)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"FormBuilder.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(60);
	
	var _FormBuilderInstruction = __webpack_require__(75);
	
	var _FormBuilderInstruction2 = _interopRequireDefault(_FormBuilderInstruction);
	
	var _FormBuilderQuestion = __webpack_require__(78);
	
	var _FormBuilderQuestion2 = _interopRequireDefault(_FormBuilderQuestion);
	
	var _utils = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
		props: ['oldFormContents'],
		created: function created() {
			var _this = this;
	
			(0, _utils.fetchMilestoneGroups)().then(function (milestoneGroups) {
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
		},
		data: function data() {
			return {
				title: '',
				formType: 'resident',
				nextQuestionIdNum: 1,
				groupedMilestones: [],
				competencies: [],
				items: [],
				customOptions: []
			};
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
					milestones: [],
					competencies: '',
					options: [],
					required: false,
					weight: 100
				});
			},
			changeItem: function changeItem(index, item) {
				this.items.splice(index, 1, Object.assign(this.items[index], item));
			},
			removeItem: function removeItem(index) {
				var item = this.items[index];
				if (item.type === 'question' && item.questionIdNum === this.nextQuestionIdNum - 1) this.nextQuestionIdNum--;
				this.items.splice(index, 1);
			},
			submitForm: function submitForm(event) {
				event.preventDefault();
				var requestBody = JSON.stringify({
					title: this.title,
					formType: this.formType,
					items: this.items.map(function (item) {
						item.questionId = 'q' + item.questionIdNum;
						return item;
					})
				});
	
				var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	
				var headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('X-Requested-With', 'XMLHttpRequest');
				headers.append('X-CSRF-TOKEN', csrfToken);
	
				if (this.isFormValid()) {
					fetch('/forms', {
						method: 'POST',
						headers: headers,
						credentials: 'same-origin',
						body: requestBody
					}).then(function (response) {
						if (response.ok) return response.text();else throw new Error(response);
					}).then(function (response) {
						if (response === 'success') window.location = '/manage/forms';else throw new Error(response);
					}).catch(function (err) {
						(0, _utils.appendAlert)('Error saving form');
						console.error(err);
					});
				}
			},
			isFormValid: function isFormValid() {
				if (!this.title) {
					(0, _utils.appendAlert)('Please enter a title for the form');
					return false;
				}
	
				if (!this.items || this.items.length < 1) {
					(0, _utils.appendAlert)('Please enter at least one question');
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
								(0, _utils.appendAlert)('Please enter question text for question ' + item.questionIdNum);
								return false;
							}
							if (['radio', 'radiononnumeric', 'checkbox'].indexOf(item.questionType) !== -1) {
								if (!item.options || item.options.length < 1) {
									(0, _utils.appendAlert)('Please add at least one option for each multiple-choice question');
									return false;
								}
	
								var _iteratorNormalCompletion2 = true;
								var _didIteratorError2 = false;
								var _iteratorError2 = undefined;
	
								try {
									for (var _iterator2 = item.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
										var option = _step2.value;
	
										if (!option.value) {
											(0, _utils.appendAlert)('An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question ' + item.questionIdNum);
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
								(0, _utils.appendAlert)('Please complete or remove all empty instruction blocks');
								return false;
							}
						} else {
							(0, _utils.appendAlert)('Unrecognized item type in form');
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
			FormBuilderInstruction: _FormBuilderInstruction2.default,
			FormBuilderQuestion: _FormBuilderQuestion2.default
		}
	};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* script */
	__vue_exports__ = __webpack_require__(76)
	
	/* template */
	var __vue_template__ = __webpack_require__(77)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "FormBuilderInstruction"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilderInstruction.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-03145a01", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-03145a01", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] FormBuilderInstruction.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 76 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
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

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "container-fluid form-instruction-block form-block"
	  }, [_h('div', {
	    staticClass: "row"
	  }, [_h('div', {
	    staticClass: "col-md-10"
	  }, [_m(0), " ", _m(1), " ", _h('textarea', {
	    staticClass: "form-control form-instruction-text",
	    attrs: {
	      "required": ""
	    },
	    domProps: {
	      "value": text
	    },
	    on: {
	      "input": function($event) {
	        $emit('change', {
	          text: $event.target.value
	        })
	      }
	    }
	  })]), " ", _h('div', {
	    staticClass: "col-md-1 col-md-offset-1"
	  }, [_h('button', {
	    staticClass: "form-block-delete btn btn-danger del-btn",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        $emit('remove')
	      }
	    }
	  }, ["Delete"])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('label', ["Instruction block"])
	}},function (){with(this) {
	  return _h('small', ["Supports ", _h('a', {
	    attrs: {
	      "href": "http://daringfireball.net/projects/markdown/basics",
	      "target": "_blank"
	    }
	  }, ["markdown"]), " (except inline HTML)"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-03145a01", module.exports)
	  }
	}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(79)
	
	/* script */
	__vue_exports__ = __webpack_require__(81)
	
	/* template */
	var __vue_template__ = __webpack_require__(90)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "FormBuilderQuestion"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilderQuestion.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-6d3c9f83"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-6d3c9f83", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-6d3c9f83", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] FormBuilderQuestion.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(68)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6d3c9f83&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderQuestion.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6d3c9f83&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderQuestion.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(67)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.question-id[data-v-6d3c9f83] {\n\tfont-size: larger;\n\ttext-transform: uppercase;\n\tfont-weight: bold;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/FormBuilderQuestion.vue?81b2c786"],"names":[],"mappings":";AA2QA;CACA,kBAAA;CACA,0BAAA;CACA,kBAAA;CACA","file":"FormBuilderQuestion.vue","sourcesContent":["<template>\n\t<div v-bind:id=\"questionId\" class=\"form-question panel panel-default form-block\">\n\t\t<div class=\"panel-heading form-horizontal\">\n\t\t\t<div class=\"panel-title form-group\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tQuestion Text\n\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t<span class=\"question-id input-group-addon\">{{questionId}}</span>\n\t\t\t\t\t\t\t<input type=\"text\" v-bind:value=\"text\" v-on:input=\"$emit('change', {text: $event.target.value})\" class=\"form-input form-question-text form-control\" placeholder=\"Question Text\" required />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"hr-question\"></div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tQuestion Type\n\t\t\t\t\t\t<select v-bind:value=\"questionType\" v-on:change=\"changeQuestionType\" class=\"form-control form-question-type\" name=\"questionType\">\n\t\t\t\t\t\t\t<option value=\"radio\">Radio</option>\n\t\t\t\t\t\t\t<option value=\"text\">Text</option>\n\t\t\t\t\t\t\t<option value=\"radiononnumeric\">Radio (non-numeric)</option>\n\t\t\t\t\t\t\t<option value=\"number\">Number</option>\n\t\t\t\t\t\t\t<option value=\"checkbox\">Checkbox</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<label>Question Options</label>\n\t\t\t\t\t<div class=\"btn-group btn-group-justified\">\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button v-on:click=\"setStandardOptions\" class=\"form-question-standard-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button v-bind:disabled=\"!milestones || milestones.length !== 1\" v-on:click=\"setMilestoneOptions\"\n\t\t\t\t\t\t\t\t\tclass=\"form-question-milestone-level-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button v-bind:disabled=\"!customOptions || customOptions.length < 1\" v-on:click=\"setCustomOptions\"\n\t\t\t\t\t\t\t\t\tclass=\"form-question-custom-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-1 labelless-button\">\n\t\t\t\t\t<button v-on:click=\"$emit('remove')\" class=\"form-block-delete btn btn-danger del-btn\" type=\"button\">\n\t\t\t\t\t\tDelete\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-1\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tRequired\n\t\t\t\t\t\t<input type=\"checkbox\" v-bind:checked=\"required\"\n\t\t\t\t\t\t\tclass=\"form-control form-question-required\" value=\"required\"\n\t\t\t\t\t\t\tv-on:change=\"$emit('change', {required: $event.target.checked})\"\n\t\t\t\t\t\t\t/>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"hr-question\"></div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-8\">\n\t\t\t\t\t<label v-show=\"shouldShowMilestonesAndCompetencies\" class=\"containing-label\">\n\t\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t\t<select-two v-bind:value=\"milestones\" v-bind:options=\"groupedMilestones\" v-bind:multiple=\"true\" v-on:input=\"$emit('change', {milestones: arguments[0]})\" class=\"form-control form-question-milestone\"></select-two>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t<label v-show=\"shouldShowMilestonesAndCompetencies\" class=\"containing-label\">\n\t\t\t\t\t\tQuestion Competency\n\t\t\t\t\t\t<select v-on:change=\"$emit('change', {competencies: $event.target.value})\" class=\"form-control form-question-competency\" placeholder=\"Competency\">\n\t\t\t\t\t\t\t<option value=\"\" disabled>Select a competency</option>\n\t\t\t\t\t\t\t<option v-for=\"competency of allCompetencies\" v-bind:value=\"competency.id\" v-bind:selected=\"competencies == competency.id\">{{ competency.title }}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"panel-body\">\n\t\t\t<div class=\"row form-options\" style=\"margin-bottom:5px;\">\n\t\t\t\t<template v-if=\"['radio', 'radiononnumeric', 'checkbox'].includes(questionType)\">\n\t\t\t\t\t<form-builder-option v-for=\"(option, index) of optionsWithWorking\"\n\t\t\t\t\t\tv-bind=\"option\" v-bind:type=\"questionType\"\n\t\t\t\t\t\tv-bind:is-working-option=\"option === workingOption\"\n\t\t\t\t\t\tv-on:input=\"handleWorkingOptionInput(index, arguments[0])\"\n\t\t\t\t\t\tv-on:change=\"handleOptionChange(index, arguments[0])\"\n\t\t\t\t\t\t>\n\t\t\t\t\t</form-builder-option>\n\t\t\t\t</template>\n\n\t\t\t\t<div v-if=\"questionType === 'text'\" class=\"col-sm-12\">\n\t\t\t\t\t<textarea class=\"form-control\" placeholder=\"Text\" disabled />\n\t\t\t\t</div>\n\n\t\t\t\t<div v-if=\"questionType === 'number'\" class=\"col-md-8\">\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"Number\" disabled />\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport 'whatwg-fetch';\n\nimport FormBuilderOption from './FormBuilderOption.vue';\nimport SelectTwo from './SelectTwo.vue';\n\nimport { STANDARD_OPTIONS } from '../modules/constants.js';\nimport { appendAlert } from '../modules/utils.js';\n\nexport default {\n\tprops: [\n\t\t'formType',\n\t\t'groupedMilestones',\n\t\t'allCompetencies',\n\t\t'questionIdNum',\n\t\t'text',\n\t\t'questionType',\n\t\t'milestones',\n\t\t'competencies',\n\t\t'options',\n\t\t'required',\n\t\t'customOptions'\n\t],\n\tdata(){\n\t\treturn {\n\t\t\tworkingOption: {\n\t\t\t\ttext: '',\n\t\t\t\tvalue: '',\n\t\t\t\tdescription: ''\n\t\t\t}\n\t\t}\n\t},\n\tcomputed: {\n\t\tquestionId(){\n\t\t\treturn `q${this.questionIdNum}`;\n\t\t},\n\t\tshouldShowMilestonesAndCompetencies(){\n\t\t\treturn ['radio', 'number'].includes(this.questionType) && [\n\t\t\t\t'resident',\n\t\t\t\t'self-resident',\n\t\t\t\t'fellow',\n\t\t\t\t'self-fellow'\n\t\t\t].includes(this.formType);\n\t\t},\n\t\toptionsWithWorking(){\n\t\t\tif(this.options){\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions.push(this.workingOption);\n\t\t\t\treturn options;\n\t\t\t}\n\t\t},\n\t\tworkingOptionIndex(){\n\t\t\tif(this.options)\n\t\t\t\treturn this.options.length;\n\t\t}\n\t},\n\tmethods: {\n\t\tchangeQuestionType(event){\n\t\t\tconst questionType = event.target.value;\n\t\t\tlet options = [];\n\n\t\t\tthis.$emit('change', {questionType: questionType, options: options});\n\t\t},\n\t\thandleWorkingOptionInput(index, option){\n\t\t\tif(index === this.workingOptionIndex)\n\t\t\t\tthis.workingOption = Object.assign({}, this.workingOption, option);\n\t\t},\n\t\thandleOptionChange(index, option){\n\t\t\tif(index === this.workingOptionIndex){\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions.push(Object.assign({}, this.workingOption, option));\n\t\t\t\tthis.workingOption = {\n\t\t\t\t\ttext: '',\n\t\t\t\t\tvalue: '',\n\t\t\t\t\tdescription: ''\n\t\t\t\t};\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}\n\t\t\telse {\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions[index] = Object.assign(options[index], option);\n\t\t\t\tif(!options[index].text && !options[index].value && !options[index].description)\n\t\t\t\t\toptions.splice(index, 1);\n\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}\n\t\t},\n\n\t\tsetStandardOptions(){\n\t\t\tlet options;\n\t\t\tswitch(this.formType){\n\t\t\t\tcase 'resident':\n\t\t\t\tcase 'self-resident':\n\t\t\t\t\toptions = STANDARD_OPTIONS.RESIDENT;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'fellow':\n\t\t\t\tcase 'self-fellow':\n\t\t\t\t\toptions = STANDARD_OPTIONS.FELLOW;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'faculty':\n\t\t\t\t\tif(this.questionType === 'radiononnumeric')\n\t\t\t\t\t\toptions = STANDARD_OPTIONS.FACULTY;\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif(!options){\n\t\t\t\tappendAlert('No standard options found for form type and question type');\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.$emit('change', {options: options});\n\t\t},\n\t\tsetMilestoneOptions(){\n\t\t\tif(this.milestones.length !== 1){\n\t\t\t\tappendAlert('You can only use milestone options with a single selected milestone');\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tfetch(`/milestones/${this.milestones[0]}`, { credentials: 'same-origin' }).then(response => {\n\t\t\t\tif(response.ok)\n\t\t\t\t\treturn response.json();\n\t\t\t\telse\n\t\t\t\t\tthrow new Error(response);\n\t\t\t}).then(milestone => {\n\t\t\t\tif(!milestone || !milestone.levels || milestone.levels.length < 1){\n\t\t\t\t\tappendAlert('No milestone levels found');\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\tlet options = [{\n\t\t\t\t\tvalue: 0,\n\t\t\t\t\ttext: `Not yet ${milestone.levels[0].name}`\n\t\t\t\t}];\n\t\t\t\tfor(let level of milestone.levels){\n\t\t\t\t\tlet value = 2 * parseInt(level.level_number, 10);\n\t\t\t\t\toptions.push({value: value - 1, text: '', description: ''});\n\t\t\t\t\toptions.push({value: value, text: level.name, description: level.description});\n\t\t\t\t}\n\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}).catch(err => {\n\t\t\t\tconsole.error(err);\n\t\t\t});\n\t\t},\n\t\tsetCustomOptions(){\n\t\t\tif(this.customOptions.length < 1){\n\t\t\t\tappentAlert('No custom options set');\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.$emit('change', {options: this.customOptions});\n\t\t}\n\t},\n\tcomponents: {\n\t\tFormBuilderOption,\n\t\tSelectTwo\n\t}\n}\n</script>\n\n<style scoped>\n\t.question-id {\n\t\tfont-size: larger;\n\t\ttext-transform: uppercase;\n\t\tfont-weight: bold;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(60);
	
	var _FormBuilderOption = __webpack_require__(82);
	
	var _FormBuilderOption2 = _interopRequireDefault(_FormBuilderOption);
	
	var _SelectTwo = __webpack_require__(87);
	
	var _SelectTwo2 = _interopRequireDefault(_SelectTwo);
	
	var _constants = __webpack_require__(58);
	
	var _utils = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		props: ['formType', 'groupedMilestones', 'allCompetencies', 'questionIdNum', 'text', 'questionType', 'milestones', 'competencies', 'options', 'required', 'customOptions'],
		data: function data() {
			return {
				workingOption: {
					text: '',
					value: '',
					description: ''
				}
			};
		},
	
		computed: {
			questionId: function questionId() {
				return 'q' + this.questionIdNum;
			},
			shouldShowMilestonesAndCompetencies: function shouldShowMilestonesAndCompetencies() {
				return ['radio', 'number'].indexOf(this.questionType) !== -1 && ['resident', 'self-resident', 'fellow', 'self-fellow'].indexOf(this.formType) !== -1;
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
						options = _constants.STANDARD_OPTIONS.RESIDENT;
						break;
					case 'fellow':
					case 'self-fellow':
						options = _constants.STANDARD_OPTIONS.FELLOW;
						break;
					case 'faculty':
						if (this.questionType === 'radiononnumeric') options = _constants.STANDARD_OPTIONS.FACULTY;
						break;
				}
	
				if (!options) {
					(0, _utils.appendAlert)('No standard options found for form type and question type');
					return;
				}
	
				this.$emit('change', { options: options });
			},
			setMilestoneOptions: function setMilestoneOptions() {
				var _this = this;
	
				if (this.milestones.length !== 1) {
					(0, _utils.appendAlert)('You can only use milestone options with a single selected milestone');
					return;
				}
				fetch('/milestones/' + this.milestones[0], { credentials: 'same-origin' }).then(function (response) {
					if (response.ok) return response.json();else throw new Error(response);
				}).then(function (milestone) {
					if (!milestone || !milestone.levels || milestone.levels.length < 1) {
						(0, _utils.appendAlert)('No milestone levels found');
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
					appentAlert('No custom options set');
					return;
				}
	
				this.$emit('change', { options: this.customOptions });
			}
		},
		components: {
			FormBuilderOption: _FormBuilderOption2.default,
			SelectTwo: _SelectTwo2.default
		}
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(83)
	
	/* script */
	__vue_exports__ = __webpack_require__(85)
	
	/* template */
	var __vue_template__ = __webpack_require__(86)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "FormBuilderOption"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilderOption.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-58256c5c"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-58256c5c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-58256c5c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] FormBuilderOption.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(84);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(68)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-58256c5c&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderOption.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-58256c5c&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderOption.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(67)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.form-builder-question-option[data-v-58256c5c] {\n\tmargin-top: 10px;\n}\n.working-option[data-v-58256c5c] {\n\topacity: 0.5;\n}\n.working-option[data-v-58256c5c]:hover,\n.working-option.is-focused[data-v-58256c5c],\n.working-option[data-v-58256c5c]:active {\n\topacity: 1;\n}\ntextarea.form-option-description[data-v-58256c5c] {\n\tresize: vertical;\n\theight: 100px;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/FormBuilderOption.vue?0ee82ebb"],"names":[],"mappings":";AAoEA;CACA,iBAAA;CACA;AAEA;CACA,aAAA;CACA;AAEA;;;CAGA,WAAA;CACA;AAEA;CACA,iBAAA;CACA,cAAA;CACA","file":"FormBuilderOption.vue","sourcesContent":["<template>\n\t<div class=\"form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center\" v-bind:class=\"{ 'working-option': isWorkingOption, 'is-focused': isFocused }\">\n\t\t<input v-bind:type=\"displayType\" disabled/>\n\t\t<input type=\"text\" v-bind:value=\"text\"\n\t\t\tclass=\"form-input form-option form-option-text form-control\"\n\t\t\tplaceholder=\"Option Text\"\n\t\t\tv-on:input=\"$emit('input', {text: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {text: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('text')\"\n\t\t\tv-on:blur=\"handleInputBlur('text')\"\n\t\t\t/>\n\t\t<input v-bind:type=\"type === 'radio' ? 'number' : 'text'\"\n\t\t\tv-bind:value=\"value\"\n\t\t\tclass=\"form-input form-option form-option-value form-control\"\n\t\t\tplaceholder=\"Option Value\"\n\t\t\tv-on:input=\"$emit('input', {value: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {value: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('value')\"\n\t\t\tv-on:blur=\"handleInputBlur('value')\"\n\t\t\t/>\n\t\t<textarea v-bind:value=\"description\"\n\t\t\tclass=\"form-input form-option form-option-description form-control\"\n\t\t\tplaceholder=\"Hover Description\"\n\t\t\tv-on:input=\"$emit('input', {description: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {description: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('description')\"\n\t\t\tv-on:blur=\"handleInputBlur('description')\"\n\t\t\t>\n\t\t</textarea>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tprops: [\n\t\t'type',\n\t\t'text',\n\t\t'value',\n\t\t'description',\n\t\t'isWorkingOption'\n\t],\n\tcomputed: {\n\t\tdisplayType(){\n\t\t\tif(this.type === 'checkbox')\n\t\t\t\treturn 'checkbox';\n\t\t\telse\n\t\t\t\treturn 'radio';\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tisFocused: false\n\t\t};\n\t},\n\tmethods: {\n\t\thandleInputFocus(field){\n\t\t\tthis.isFocused = true;\n\t\t\tthis.$emit('focus', field);\n\t\t},\n\t\thandleInputBlur(field){\n\t\t\tthis.isFocused = false;\n\t\t\tthis.$emit('blur', field);\n\t\t}\n\t}\n}\n</script>\n\n<style scoped>\n\t.form-builder-question-option {\n\t\tmargin-top: 10px;\n\t}\n\n\t.working-option {\n\t\topacity: 0.5;\n\t}\n\n\t.working-option:hover,\n\t.working-option.is-focused,\n\t.working-option:active {\n\t\topacity: 1;\n\t}\n\n\ttextarea.form-option-description {\n\t\tresize: vertical;\n\t\theight: 100px;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 85 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
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

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center",
	    class: {
	      'working-option': isWorkingOption, 'is-focused': isFocused
	    }
	  }, [_h('input', {
	    attrs: {
	      "type": displayType,
	      "disabled": ""
	    }
	  }), " ", _h('input', {
	    staticClass: "form-input form-option form-option-text form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "Option Text"
	    },
	    domProps: {
	      "value": text
	    },
	    on: {
	      "input": function($event) {
	        $emit('input', {
	          text: $event.target.value
	        })
	      },
	      "change": function($event) {
	        $emit('change', {
	          text: $event.target.value
	        })
	      },
	      "focus": function($event) {
	        handleInputFocus('text')
	      },
	      "blur": function($event) {
	        handleInputBlur('text')
	      }
	    }
	  }), " ", _h('input', {
	    staticClass: "form-input form-option form-option-value form-control",
	    attrs: {
	      "type": type === 'radio' ? 'number' : 'text',
	      "placeholder": "Option Value"
	    },
	    domProps: {
	      "value": value
	    },
	    on: {
	      "input": function($event) {
	        $emit('input', {
	          value: $event.target.value
	        })
	      },
	      "change": function($event) {
	        $emit('change', {
	          value: $event.target.value
	        })
	      },
	      "focus": function($event) {
	        handleInputFocus('value')
	      },
	      "blur": function($event) {
	        handleInputBlur('value')
	      }
	    }
	  }), " ", _h('textarea', {
	    staticClass: "form-input form-option form-option-description form-control",
	    attrs: {
	      "placeholder": "Hover Description"
	    },
	    domProps: {
	      "value": description
	    },
	    on: {
	      "input": function($event) {
	        $emit('input', {
	          description: $event.target.value
	        })
	      },
	      "change": function($event) {
	        $emit('change', {
	          description: $event.target.value
	        })
	      },
	      "focus": function($event) {
	        handleInputFocus('description')
	      },
	      "blur": function($event) {
	        handleInputBlur('description')
	      }
	    }
	  })])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-58256c5c", module.exports)
	  }
	}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* script */
	__vue_exports__ = __webpack_require__(88)
	
	/* template */
	var __vue_template__ = __webpack_require__(89)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "SelectTwo"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/SelectTwo.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e84f7814", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e84f7814", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] SelectTwo.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	//
	//
	//
	//
	//
	//
	
	exports.default = {
		props: ['options', 'value', 'multiple'],
		computed: {
			stringOptions: function stringOptions() {
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
				_this.$emit('input', $(_this.$el).val());
			});
	
			if (this.stringOptions && this.stringOptions.length > 0) {
				$(this.$el).select2({
					data: this.stringOptions,
					tags: true,
					createTag: function createTag() {
						return undefined;
					}
				}).val(this.stringValue).trigger('change.select2');
			}
		},
	
		watch: {
			stringValue: function stringValue(_stringValue) {
				$(this.$el).val(_stringValue).trigger('change.select2');
			},
			stringOptions: function stringOptions(_stringOptions) {
				$(this.$el).select2({
					data: _stringOptions,
					tags: true,
					createTag: function createTag() {
						return undefined;
					}
				}).val(this.stringValue).trigger('change.select2');
			}
		},
		destroyed: function destroyed() {
			$(this.$el).off().select2('destroy');
		}
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('select', {
	    attrs: {
	      "multiple": multiple
	    }
	  }, [_t("default")])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e84f7814", module.exports)
	  }
	}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "form-question panel panel-default form-block",
	    attrs: {
	      "id": questionId
	    }
	  }, [_h('div', {
	    staticClass: "panel-heading form-horizontal"
	  }, [_h('div', {
	    staticClass: "panel-title form-group"
	  }, [_h('div', {
	    staticClass: "col-sm-12"
	  }, [_h('label', {
	    staticClass: "containing-label"
	  }, ["\n\t\t\t\t\tQuestion Text\n\t\t\t\t\t", _h('div', {
	    staticClass: "input-group"
	  }, [_h('span', {
	    staticClass: "question-id input-group-addon"
	  }, [_s(questionId)]), " ", _h('input', {
	    staticClass: "form-input form-question-text form-control",
	    attrs: {
	      "type": "text",
	      "placeholder": "Question Text",
	      "required": ""
	    },
	    domProps: {
	      "value": text
	    },
	    on: {
	      "input": function($event) {
	        $emit('change', {
	          text: $event.target.value
	        })
	      }
	    }
	  })])])])]), " ", _m(0), " ", _h('div', {
	    staticClass: "row"
	  }, [_h('div', {
	    staticClass: "col-md-4"
	  }, [_h('label', {
	    staticClass: "containing-label"
	  }, ["\n\t\t\t\t\tQuestion Type\n\t\t\t\t\t", _h('select', {
	    staticClass: "form-control form-question-type",
	    attrs: {
	      "name": "questionType"
	    },
	    domProps: {
	      "value": questionType
	    },
	    on: {
	      "change": changeQuestionType
	    }
	  }, [_m(1), " ", _m(2), " ", _m(3), " ", _m(4), " ", _m(5)])])]), " ", _h('div', {
	    staticClass: "col-md-6"
	  }, [_m(6), " ", _h('div', {
	    staticClass: "btn-group btn-group-justified"
	  }, [_h('div', {
	    staticClass: "btn-group"
	  }, [_h('button', {
	    staticClass: "form-question-standard-options btn btn-info",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": setStandardOptions
	    }
	  }, ["\n\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t"])]), " ", _h('div', {
	    staticClass: "btn-group"
	  }, [_h('button', {
	    staticClass: "form-question-milestone-level-options btn btn-info",
	    attrs: {
	      "disabled": !milestones || milestones.length !== 1,
	      "type": "button"
	    },
	    on: {
	      "click": setMilestoneOptions
	    }
	  }, ["\n\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t"])]), " ", _h('div', {
	    staticClass: "btn-group"
	  }, [_h('button', {
	    staticClass: "form-question-custom-options btn btn-info",
	    attrs: {
	      "disabled": !customOptions || customOptions.length < 1,
	      "type": "button"
	    },
	    on: {
	      "click": setCustomOptions
	    }
	  }, ["\n\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t"])])])]), " ", _h('div', {
	    staticClass: "col-md-1 labelless-button"
	  }, [_h('button', {
	    staticClass: "form-block-delete btn btn-danger del-btn",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        $emit('remove')
	      }
	    }
	  }, ["\n\t\t\t\t\tDelete\n\t\t\t\t"])]), " ", _h('div', {
	    staticClass: "col-md-1"
	  }, [_h('label', {
	    staticClass: "containing-label"
	  }, ["\n\t\t\t\t\tRequired\n\t\t\t\t\t", _h('input', {
	    staticClass: "form-control form-question-required",
	    attrs: {
	      "type": "checkbox",
	      "value": "required"
	    },
	    domProps: {
	      "checked": required
	    },
	    on: {
	      "change": function($event) {
	        $emit('change', {
	          required: $event.target.checked
	        })
	      }
	    }
	  })])])]), " ", _m(7), " ", _h('div', {
	    staticClass: "row"
	  }, [_h('div', {
	    staticClass: "col-md-8"
	  }, [_h('label', {
	    directives: [{
	      name: "show",
	      value: (shouldShowMilestonesAndCompetencies),
	      expression: "shouldShowMilestonesAndCompetencies"
	    }],
	    staticClass: "containing-label"
	  }, ["\n\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t", _h('select-two', {
	    staticClass: "form-control form-question-milestone",
	    attrs: {
	      "options": groupedMilestones,
	      "multiple": true
	    },
	    domProps: {
	      "value": milestones
	    },
	    on: {
	      "input": function($event) {
	        $emit('change', {
	          milestones: arguments[0]
	        })
	      }
	    }
	  })])]), " ", _h('div', {
	    staticClass: "col-md-4"
	  }, [_h('label', {
	    directives: [{
	      name: "show",
	      value: (shouldShowMilestonesAndCompetencies),
	      expression: "shouldShowMilestonesAndCompetencies"
	    }],
	    staticClass: "containing-label"
	  }, ["\n\t\t\t\t\tQuestion Competency\n\t\t\t\t\t", _h('select', {
	    staticClass: "form-control form-question-competency",
	    attrs: {
	      "placeholder": "Competency"
	    },
	    on: {
	      "change": function($event) {
	        $emit('change', {
	          competencies: $event.target.value
	        })
	      }
	    }
	  }, [_m(8), " ", _l((allCompetencies), function(competency) {
	    return _h('option', {
	      domProps: {
	        "value": competency.id,
	        "selected": competencies == competency.id
	      }
	    }, [_s(competency.title)])
	  })])])])])]), " ", _h('div', {
	    staticClass: "panel-body"
	  }, [_h('div', {
	    staticClass: "row form-options",
	    attrs: {
	      "style": "margin-bottom:5px;"
	    }
	  }, [(['radio', 'radiononnumeric', 'checkbox'].includes(questionType)) ? [_l((optionsWithWorking), function(option, index) {
	    return _h('form-builder-option', _b({
	      attrs: {
	        "type": questionType,
	        "is-working-option": option === workingOption
	      },
	      on: {
	        "input": function($event) {
	          handleWorkingOptionInput(index, arguments[0])
	        },
	        "change": function($event) {
	          handleOptionChange(index, arguments[0])
	        }
	      }
	    }, option))
	  })] : _e(), " ", (questionType === 'text') ? _h('div', {
	    staticClass: "col-sm-12"
	  }, [_m(9)]) : _e(), " ", (questionType === 'number') ? _h('div', {
	    staticClass: "col-md-8"
	  }, [_m(10)]) : _e()])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('div', {
	    staticClass: "hr-question"
	  })
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "radio"
	    }
	  }, ["Radio"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "text"
	    }
	  }, ["Text"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "radiononnumeric"
	    }
	  }, ["Radio (non-numeric)"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "number"
	    }
	  }, ["Number"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "checkbox"
	    }
	  }, ["Checkbox"])
	}},function (){with(this) {
	  return _h('label', ["Question Options"])
	}},function (){with(this) {
	  return _h('div', {
	    staticClass: "hr-question"
	  })
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "",
	      "disabled": ""
	    }
	  }, ["Select a competency"])
	}},function (){with(this) {
	  return _h('textarea', {
	    staticClass: "form-control",
	    attrs: {
	      "placeholder": "Text",
	      "disabled": ""
	    }
	  })
	}},function (){with(this) {
	  return _h('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "number",
	      "placeholder": "Number",
	      "disabled": ""
	    }
	  })
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-6d3c9f83", module.exports)
	  }
	}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "form-header"
	  }, [_h('div', {
	    staticClass: "container-fluid"
	  }, [_h('div', {
	    staticClass: "row"
	  }, [_h('div', {
	    staticClass: "col-md-8"
	  }, [_h('div', {
	    staticClass: "form-group"
	  }, [_m(0), " ", _h('input', {
	    directives: [{
	      name: "model",
	      value: (title),
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
	      "value": _s(title)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        title = $event.target.value.trim()
	      }
	    }
	  })])]), " ", _h('div', {
	    staticClass: "col-md-4"
	  }, [_h('div', {
	    staticClass: "form-group"
	  }, [_m(1), " ", _h('select', {
	    directives: [{
	      name: "model",
	      value: (formType),
	      expression: "formType"
	    }],
	    staticClass: "form-control input-lg",
	    attrs: {
	      "id": "form-type",
	      "name": "form_type"
	    },
	    on: {
	      "change": function($event) {
	        formType = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          return "_value" in o ? o._value : o.value
	        })[0]
	      }
	    }
	  }, [_m(2), " ", _m(3), " ", _m(4), " ", _m(5), " ", _m(6), " ", _m(7)])])])])]), " ", _h('div', {
	    staticClass: "form-body"
	  }, [_h('div', {
	    staticClass: "form-items"
	  }, [_l((items), function(item, index) {
	    return [(item.type === 'instruction') ? _h('form-builder-instruction', _b({
	      on: {
	        "change": function($event) {
	          changeItem(index, $event)
	        },
	        "input": function($event) {
	          changeItem(index, $event)
	        },
	        "remove": function($event) {
	          removeItem(index)
	        }
	      }
	    }, item)) : _e(), " ", (item.type === 'question') ? _h('form-builder-question', _b({
	      attrs: {
	        "formType": formType,
	        "groupedMilestones": groupedMilestones,
	        "allCompetencies": competencies,
	        "customOptions": customOptions
	      },
	      on: {
	        "change": function($event) {
	          changeItem(index, $event)
	        },
	        "remove": function($event) {
	          removeItem(index)
	        }
	      }
	    }, item)) : _e()]
	  })])]), " ", _h('div', {
	    attrs: {
	      "id": "form-footer"
	    }
	  }, [_h('button', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "type": "button",
	      "id": "add-instruction-block"
	    },
	    on: {
	      "click": addInstruction
	    }
	  }, ["Add instruction block"]), " ", _h('button', {
	    staticClass: "btn btn-info",
	    attrs: {
	      "type": "button",
	      "id": "addQuestion"
	    },
	    on: {
	      "click": addQuestion
	    }
	  }, ["Add Question"]), " ", _h('button', {
	    staticClass: "btn btn-success",
	    attrs: {
	      "type": "submit"
	    },
	    on: {
	      "click": submitForm
	    }
	  }, ["Submit Form"])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('label', {
	    attrs: {
	      "for": "form-title"
	    }
	  }, ["Form title"])
	}},function (){with(this) {
	  return _h('label', {
	    attrs: {
	      "for": "form-type"
	    }
	  }, ["Form type"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "resident"
	    }
	  }, ["Resident/Intern"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "self-resident"
	    }
	  }, ["Resident/Intern (self)"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "fellow"
	    }
	  }, ["Fellow"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "self-fellow"
	    }
	  }, ["Fellow (self)"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "faculty"
	    }
	  }, ["Faculty"])
	}},function (){with(this) {
	  return _h('option', {
	    attrs: {
	      "value": "staff"
	    }
	  }, ["Staff"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-c94fb106", module.exports)
	  }
	}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(93)
	
	/* script */
	__vue_exports__ = __webpack_require__(95)
	
	/* template */
	var __vue_template__ = __webpack_require__(106)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "Reports"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Reports.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-25c733f6"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-25c733f6", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-25c733f6", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Reports.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(94);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(68)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-25c733f6&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Reports.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-25c733f6&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Reports.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(67)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"Reports.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _TraineeReport = __webpack_require__(96);
	
	var _TraineeReport2 = _interopRequireDefault(_TraineeReport);
	
	var _constants = __webpack_require__(58);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
		data: function data() {
			return {
				reportType: ''
			};
		},
	
		computed: {
			REPORT_TYPES: function REPORT_TYPES() {
				return _constants.REPORT_TYPES;
			}
		},
		methods: {
			ucfirst: ucfirst,
			setReportType: function setReportType(type) {
				this.reportType = type;
			},
			handleResetClick: function handleResetClick() {
				this.reportType = '';
			}
		},
		components: {
			TraineeReport: _TraineeReport2.default
		}
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(97)
	
	/* script */
	__vue_exports__ = __webpack_require__(99)
	
	/* template */
	var __vue_template__ = __webpack_require__(105)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "TraineeReport"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/TraineeReport.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-155d597c"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-155d597c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-155d597c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] TraineeReport.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(98);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(68)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-155d597c&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TraineeReport.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-155d597c&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./TraineeReport.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(67)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.milestone-group .panel-body[data-v-155d597c] {\n\theight: 300px;\n\toverflow: auto;\n}\n.milestone-group .panel-body label[data-v-155d597c] {\n\tfont-weight: normal;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/TraineeReport.vue?110036be"],"names":[],"mappings":";AA4VA;CACA,cAAA;CACA,eAAA;CACA;AAEA;CACA,oBAAA;CACA","file":"TraineeReport.vue","sourcesContent":["<template>\n\t<div>\n\t\t<div class=\"container body-block\">\n\t\t\t<h2>Trainee report</h2>\n\t\t\t<report-date v-model=\"dates\" />\n\t\t\t<div class=\"form-group\">\n\t\t\t\t<label>\n\t\t\t\t\t<input type=\"checkbox\" v-model=\"filterMilestones\" />\n\t\t\t\t\tFilter milestones\n\t\t\t\t</label>\n\t\t\t</div>\n\n\t\t\t<fieldset v-if=\"filterMilestones\">\n\t\t\t\t<legend>Milestones</legend>\n\t\t\t\t<div v-for=\"(milestoneGroup, index) of milestoneGroups\" class=\"milestone-group col-xs-6 col-sm-4 col-md-3 col-lg-2\">\n\t\t\t\t\t<div class=\"panel panel-default\">\n\t\t\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t\t\t<label class=\"panel-title\">\n\t\t\t\t\t\t\t\t<input type=\"checkbox\"\n\t\t\t\t\t\t\t\t\t\t:checked=\"isEntireMilestoneGroupSelected(index)\"\n\t\t\t\t\t\t\t\t\t\t@click=\"toggleEntireMilestoneGroup(index)\" />\n\t\t\t\t\t\t\t\t{{ milestoneGroup.text }}\n\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"panel-body\">\n\t\t\t\t\t\t\t<div v-for=\"child of milestoneGroup.children\" class=\"form-group\">\n\t\t\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t\t\t<input type=\"checkbox\"\n\t\t\t\t\t\t\t\t\t\t\t:value=\"child.id\"\n\t\t\t\t\t\t\t\t\t\t\tv-model=\"milestones\" />\n\t\t\t\t\t\t\t\t\t{{ child.text }}\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</fieldset>\n\n\t\t\t<fieldset>\n\t\t\t\t<legend>Graphs</legend>\n\t\t\t\t<label>\n\t\t\t\t\t<input type=\"radio\" value=\"average\" v-model=\"graphOption\" />\n\t\t\t\t\tAverage only\n\t\t\t\t</label>\n\t\t\t\t<label>\n\t\t\t\t\t<input type=\"radio\" value=\"all\" v-model=\"graphOption\" />\n\t\t\t\t\tAll\n\t\t\t\t</label>\n\t\t\t\t<label>\n\t\t\t\t\t<input type=\"radio\" value=\"none\" v-model=\"graphOption\" />\n\t\t\t\t\tNone\n\t\t\t\t</label>\n\t\t\t</fieldset>\n\n\t\t\t<button type=\"button\" class=\"btn btn-lg btn-primary\"\n\t\t\t\t\t@click=\"runReport\">\n\t\t\t\tRun report\n\t\t\t</button>\n\t\t</div>\n\n\t\t<div v-if=\"report\">\n\t\t\t<div v-if=\"report.stats\" class=\"container body-block\">\n\n\t\t\t</div>\n\n\t\t\t<div v-if=\"report.aggregate\">\n\t\t\t\t<div class=\"container body-block\">\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<legend>Show in report</legend>\n\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t<input type=\"checkbox\" value=\"milestones\" v-model=\"aggregateShow\" />\n\t\t\t\t\t\t\tMilestones\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t<input type=\"checkbox\" value=\"competencies\" v-model=\"aggregateShow\" />\n\t\t\t\t\t\t\tCompetencies\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<label>\n\t\t\t\t\t\t\t<input type=\"checkbox\" value=\"standardDeviations\" v-model=\"aggregateShow\" />\n\t\t\t\t\t\t\tStandard Deviations\n\t\t\t\t\t\t</label>\n\t\t\t\t\t</fieldset>\n\n\t\t\t\t\t<table id=\"aggregate-table\" class=\"table table-striped table-bordered\" width=\"100%\">\n\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th rowspan=\"3\">Trainee</th>\n\t\t\t\t\t\t\t\t<th v-if=\"aggregateShow.includes('milestones')\"\n\t\t\t\t\t\t\t\t\t\t:colspan=\"milestoneColspan\">\n\t\t\t\t\t\t\t\t\tMilestones\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t<th v-if=\"aggregateShow.includes('competencies')\"\n\t\t\t\t\t\t\t\t\t\t:colspan=\"competencyColspan\">\n\t\t\t\t\t\t\t\t\tCompetencies\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t<th colspan=\"3\">All</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<th v-if=\"aggregateShow.includes('milestones')\"\n\t\t\t\t\t\t\t\t\t\tv-for=\"(milestone, milestoneId) of report.aggregate.milestones\"\n\t\t\t\t\t\t\t\t\t\t:colspan=\"colsPerItem\"\n\t\t\t\t\t\t\t\t\t\t:key=\"`milestone-title-${milestoneId}`\">\n\t\t\t\t\t\t\t\t\t{{ milestone }}\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t<th v-if=\"aggregateShow.includes('competencies')\"\n\t\t\t\t\t\t\t\t\t\tv-for=\"(competency, competencyId) of report.aggregate.competencies\"\n\t\t\t\t\t\t\t\t\t\t:colspan=\"colsPerItem\"\n\t\t\t\t\t\t\t\t\t\t:key=\"`competency-title-${competencyId}`\">\n\t\t\t\t\t\t\t\t\t{{ competency }}\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t<th colspan=\"3\">Total</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<template v-if=\"aggregateShow.includes('milestones')\"\n\t\t\t\t\t\t\t\t\tv-for=\"(milestone, milestoneId) of report.aggregate.milestones\">\n\t\t\t\t\t\t\t\t<th :key=\"`milestone-avg-${milestoneId}`\">Average</th>\n\t\t\t\t\t\t\t\t<th v-if=\"aggregateShow.includes('standardDeviations')\"\n\t\t\t\t\t\t\t\t\t\t:key=\"`milestone-stddev-${milestoneId}`\">\n\t\t\t\t\t\t\t\t\tStd. Dev.\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t<th :key=\"`milestone-num-${milestoneId}`\">#</th>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t<template v-if=\"aggregateShow.includes('competencies')\"\n\t\t\t\t\t\t\t\t\tv-for=\"(competency, competencyId) of report.aggregate.competencies\">\n\t\t\t\t\t\t\t\t<th :key=\"`competency-avg-${competencyId}`\">Average</th>\n\t\t\t\t\t\t\t\t<th v-if=\"aggregateShow.includes('standardDeviations')\"\n\t\t\t\t\t\t\t\t\t\t:key=\"`competency-stddev-${competencyId}`\">\n\t\t\t\t\t\t\t\t\tStd. Dev.\n\t\t\t\t\t\t\t\t</th>\n\t\t\t\t\t\t\t\t<th :key=\"`competency-num-${competencyId}`\">#</th>\n\t\t\t\t\t\t\t</template>\n\t\t\t\t\t\t\t\t<th># Faculty</th>\n\t\t\t\t\t\t\t\t<th># Evals</th>\n\t\t\t\t\t\t\t\t<th># Trainee Requests</th>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</thead>\n\t\t\t\t\t</table>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport 'whatwg-fetch';\n\nimport ReportDate from './ReportDate.vue';\n\nimport { fetchMilestoneGroups } from '../modules/utils.js';\n\nexport default {\n\tdata(){\n\t\treturn {\n\t\t\tdates: {\n\t\t\t\tstartDate: '',\n\t\t\t\tendDate: ''\n\t\t\t},\n\t\t\ttrainingLevel: 'all',\n\t\t\tfilterMilestones: false,\n\t\t\tmilestones: [],\n\t\t\tgraphOption: 'average',\n\t\t\treport: null,\n\n\t\t\taggregateShow: [\n\t\t\t\t'competencies'\n\t\t\t],\n\n\t\t\tmilestoneGroups: [],\n\t\t\tuserGroups: {}\n\t\t};\n\t},\n\twatch: {\n\t\tfilterMilestones(shouldFilter){\n\t\t\tif(shouldFilter){\n\t\t\t\tfetchMilestoneGroups().then(milestoneGroups => {\n\t\t\t\t\tthis.milestoneGroups = milestoneGroups;\n\t\t\t\t});\n\t\t\t}\n\t\t},\n\t\treport(report){\n\t\t\t// if(report.aggregate){\n\t\t\t// \tthis.destroyAggregateDatatable();\n\t\t\t// \tthis.$nextTick(this.renderAggregateDatatable);\n\t\t\t// }\n\t\t},\n\t\taggregateShow(){\n\t\t\t// if(this.report && this.report.aggregate){\n\t\t\t// \tthis.destroyAggregateDatatable();\n\t\t\t// \tthis.$nextTick(this.renderAggregateDatatable);\n\t\t\t// }\n\t\t}\n\t},\n\tcomputed: {\n\t\tcolsPerItem(){\n\t\t\treturn this.aggregateShow.includes('standardDeviations')\n\t\t\t\t? 3\n\t\t\t\t: 2;\n\t\t},\n\t\tmilestoneColspan(){\n\t\t\treturn this.colsPerItem * Object.keys(this.report.aggregate.milestones).length;\n\t\t},\n\t\tcompetencyColspan(){\n\t\t\treturn this.colsPerItem * Object.keys(this.report.aggregate.competencies).length;\n\t\t}\n\t},\n\tmethods: {\n\t\tisEntireMilestoneGroupSelected(index){\n\t\t\tlet groupIds = this.milestoneGroups[index].children.map(child => child.id);\n\t\t\treturn groupIds.every(id => {\n\t\t\t\treturn this.milestones.includes(id);\n\t\t\t});\n\t\t},\n\t\ttoggleEntireMilestoneGroup(index){\n\t\t\tlet groupIds = this.milestoneGroups[index].children.map(child => child.id);\n\t\t\tlet newMilestones = this.milestones.filter(milestone => {\n\t\t\t\treturn !groupIds.includes(milestone);\n\t\t\t});\n\t\t\tif(!this.isEntireMilestoneGroupSelected(index)){\n\t\t\t\tnewMilestones = newMilestones.concat(groupIds);\n\t\t\t}\n\t\t\tthis.milestones = newMilestones;\n\t\t},\n\t\trunReport(){\n\t\t\tlet csrfToken = document.querySelector('meta[name=\"csrf-token\"]').getAttribute('content');\n\n\t\t\tlet headers = new Headers();\n\t\t\theaders.append('Content-Type', 'application/json');\n\t\t\theaders.append('X-Requested-With', 'XMLHttpRequest');\n\t\t\theaders.append('X-CSRF-TOKEN', csrfToken);\n\n\t\t\tfetch('/report/aggregate', {\n\t\t\t\tmethod: 'POST',\n\t\t\t\theaders: headers,\n\t\t\t\tcredentials: 'same-origin',\n\t\t\t\tbody: JSON.stringify({\n\t\t\t\t\tstartDate: this.dates.startDate,\n\t\t\t\t\tendDate: this.dates.endDate,\n\t\t\t\t\ttrainingLevel: this.trainingLevel,\n\t\t\t\t\tgraphs: this.graphOption,\n\t\t\t\t\tmilestones: this.milestones\n\t\t\t\t})\n\t\t\t}).then(response => {\n\t\t\t\tif(response.ok)\n\t\t\t\t\treturn response.json();\n\t\t\t\tlet err = new Error(response.statusText);\n\t\t\t\terr.response = response;\n\t\t\t\tthrow err;\n\t\t\t}).then(aggregate => {\n\t\t\t\tthis.report = Object.assign({}, this.report, {aggregate: aggregate});\n\t\t\t}).catch(err => {\n\t\t\t\tconsole.error(err);\n\t\t\t});\n\t\t},\n\t\trenderAggregateDatatable(){\n\t\t\tlet data = [];\n\t\t\tfor(let subjectId in this.report.aggregate.subjects){\n\t\t\t\tlet row = [];\n\t\t\t\trow.push(this.report.aggregate.subjects[subjectId]);\n\t\t\t\tif(this.aggregateShow.includes('milestones')){\n\t\t\t\t\tfor(let milestoneId in this.report.aggregate.milestones){\n\t\t\t\t\t\trow.push(\n\t\t\t\t\t\t\tthis.report.aggregate.subjectMilestone\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectMilestone[subjectId]\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectMilestone[subjectId][milestoneId]\n\t\t\t\t\t\t\t\t? parseFloat(this.report.aggregate.subjectMilestone[subjectId][milestoneId]).toFixed(2)\n\t\t\t\t\t\t\t\t: ''\n\t\t\t\t\t\t);\n\n\t\t\t\t\t\tif(this.aggregateShow.includes('standardDeviations'))\n\t\t\t\t\t\t\trow.push(\n\t\t\t\t\t\t\t\tthis.report.aggregate.subjectMilestoneDeviations\n\t\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectMilestoneDeviations[subjectId]\n\t\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectMilestoneDeviations[subjectId][milestoneId]\n\t\t\t\t\t\t\t\t\t? parseFloat(this.report.aggregate.subjectMilestoneDeviations[subjectId][milestoneId]).toFixed(2)\n\t\t\t\t\t\t\t\t\t: ''\n\t\t\t\t\t\t\t);\n\n\t\t\t\t\t\trow.push(\n\t\t\t\t\t\t\tthis.report.aggregate.subjectMilestoneEvals\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectMilestoneEvals[subjectId]\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectMilestoneEvals[subjectId][milestoneId]\n\t\t\t\t\t\t\t\t? parseFloat(this.report.aggregate.subjectMilestoneEvals[subjectId][milestoneId]).toFixed()\n\t\t\t\t\t\t\t\t: 0\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\tif(this.aggregateShow.includes('competencies')){\n\t\t\t\t\tfor(let competencyId in this.report.aggregate.competencies){\n\t\t\t\t\t\trow.push(\n\t\t\t\t\t\t\tthis.report.aggregate.subjectCompetency\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectCompetency[subjectId]\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectCompetency[subjectId][competencyId]\n\t\t\t\t\t\t\t\t? parseFloat(this.report.aggregate.subjectCompetency[subjectId][competencyId]).toFixed(2)\n\t\t\t\t\t\t\t\t: ''\n\t\t\t\t\t\t);\n\n\t\t\t\t\t\tif(this.aggregateShow.includes('standardDeviations'))\n\t\t\t\t\t\t\trow.push(\n\t\t\t\t\t\t\t\tthis.report.aggregate.subjectCompetencyDeviations\n\t\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectCompetencyDeviations[subjectId]\n\t\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectCompetencyDeviations[subjectId][competencyId]\n\t\t\t\t\t\t\t\t\t? parseFloat(this.report.aggregate.subjectCompetencyDeviations[subjectId][competencyId]).toFixed(2)\n\t\t\t\t\t\t\t\t\t: ''\n\t\t\t\t\t\t\t);\n\n\t\t\t\t\t\trow.push(\n\t\t\t\t\t\t\tthis.report.aggregate.subjectCompetencyEvals\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectCompetencyEvals[subjectId]\n\t\t\t\t\t\t\t\t\t&& this.report.aggregate.subjectCompetencyEvals[subjectId][competencyId]\n\t\t\t\t\t\t\t\t? parseFloat(this.report.aggregate.subjectCompetencyEvals[subjectId][competencyId]).toFixed()\n\t\t\t\t\t\t\t\t: 0\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\trow.push(Object.keys(this.report.aggregate.subjectEvaluators[subjectId]).length);\n\t\t\t\trow.push(Object.keys(this.report.aggregate.subjectEvals[subjectId]).length);\n\t\t\t\trow.push(Object.keys(this.report.aggregate.subjectRequests[subjectId]).length);\n\n\t\t\t\tdata.push(row);\n\t\t\t}\n\n\t\t\t$('#aggregate-table').DataTable({\n\t\t\t\torder: [[0, 'asc']],\n\t\t\t\tstateSave: true,\n\t\t\t\tdom: 'lfprtip',\n\t\t\t\tscrollX: true,\n\t\t\t\tscrollY: '500px',\n\t\t\t\tscrollCollapse: true,\n\t\t\t\tpaging: false,\n\t\t\t\tfixedColumns: true,\n\t\t\t\tdata: data\n\t\t\t});\n\t\t},\n\t\tdestroyAggregateDatatable(){\n\t\t\t$('#aggregate-table').DataTable({\n\t\t\t\tretrieve: true\n\t\t\t}).clear().destroy();\n\t\t}\n\t},\n\tcomponents: {\n\t\tReportDate\n\t}\n}\n</script>\n\n<style scoped>\n\t.milestone-group .panel-body {\n\t\theight: 300px;\n\t\toverflow: auto;\n\t}\n\n\t.milestone-group .panel-body label {\n\t\tfont-weight: normal;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	__webpack_require__(60);
	
	var _ReportDate = __webpack_require__(100);
	
	var _ReportDate2 = _interopRequireDefault(_ReportDate);
	
	var _utils = __webpack_require__(59);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
		data: function data() {
			return {
				dates: {
					startDate: '',
					endDate: ''
				},
				trainingLevel: 'all',
				filterMilestones: false,
				milestones: [],
				graphOption: 'average',
				report: null,
	
				aggregateShow: ['competencies'],
	
				milestoneGroups: [],
				userGroups: {}
			};
		},
	
		watch: {
			filterMilestones: function filterMilestones(shouldFilter) {
				var _this = this;
	
				if (shouldFilter) {
					(0, _utils.fetchMilestoneGroups)().then(function (milestoneGroups) {
						_this.milestoneGroups = milestoneGroups;
					});
				}
			},
			report: function report(_report) {
				// if(report.aggregate){
				// 	this.destroyAggregateDatatable();
				// 	this.$nextTick(this.renderAggregateDatatable);
				// }
			},
			aggregateShow: function aggregateShow() {
				// if(this.report && this.report.aggregate){
				// 	this.destroyAggregateDatatable();
				// 	this.$nextTick(this.renderAggregateDatatable);
				// }
			}
		},
		computed: {
			colsPerItem: function colsPerItem() {
				return this.aggregateShow.indexOf('standardDeviations') !== -1 ? 3 : 2;
			},
			milestoneColspan: function milestoneColspan() {
				return this.colsPerItem * Object.keys(this.report.aggregate.milestones).length;
			},
			competencyColspan: function competencyColspan() {
				return this.colsPerItem * Object.keys(this.report.aggregate.competencies).length;
			}
		},
		methods: {
			isEntireMilestoneGroupSelected: function isEntireMilestoneGroupSelected(index) {
				var _this2 = this;
	
				var groupIds = this.milestoneGroups[index].children.map(function (child) {
					return child.id;
				});
				return groupIds.every(function (id) {
					return _this2.milestones.indexOf(id) !== -1;
				});
			},
			toggleEntireMilestoneGroup: function toggleEntireMilestoneGroup(index) {
				var groupIds = this.milestoneGroups[index].children.map(function (child) {
					return child.id;
				});
				var newMilestones = this.milestones.filter(function (milestone) {
					return !(groupIds.indexOf(milestone) !== -1);
				});
				if (!this.isEntireMilestoneGroupSelected(index)) {
					newMilestones = newMilestones.concat(groupIds);
				}
				this.milestones = newMilestones;
			},
			runReport: function runReport() {
				var _this3 = this;
	
				var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
	
				var headers = new Headers();
				headers.append('Content-Type', 'application/json');
				headers.append('X-Requested-With', 'XMLHttpRequest');
				headers.append('X-CSRF-TOKEN', csrfToken);
	
				fetch('/report/aggregate', {
					method: 'POST',
					headers: headers,
					credentials: 'same-origin',
					body: JSON.stringify({
						startDate: this.dates.startDate,
						endDate: this.dates.endDate,
						trainingLevel: this.trainingLevel,
						graphs: this.graphOption,
						milestones: this.milestones
					})
				}).then(function (response) {
					if (response.ok) return response.json();
					var err = new Error(response.statusText);
					err.response = response;
					throw err;
				}).then(function (aggregate) {
					_this3.report = Object.assign({}, _this3.report, { aggregate: aggregate });
				}).catch(function (err) {
					console.error(err);
				});
			},
			renderAggregateDatatable: function renderAggregateDatatable() {
				var data = [];
				for (var subjectId in this.report.aggregate.subjects) {
					var row = [];
					row.push(this.report.aggregate.subjects[subjectId]);
					if (this.aggregateShow.indexOf('milestones') !== -1) {
						for (var milestoneId in this.report.aggregate.milestones) {
							row.push(this.report.aggregate.subjectMilestone && this.report.aggregate.subjectMilestone[subjectId] && this.report.aggregate.subjectMilestone[subjectId][milestoneId] ? parseFloat(this.report.aggregate.subjectMilestone[subjectId][milestoneId]).toFixed(2) : '');
	
							if (this.aggregateShow.indexOf('standardDeviations') !== -1) row.push(this.report.aggregate.subjectMilestoneDeviations && this.report.aggregate.subjectMilestoneDeviations[subjectId] && this.report.aggregate.subjectMilestoneDeviations[subjectId][milestoneId] ? parseFloat(this.report.aggregate.subjectMilestoneDeviations[subjectId][milestoneId]).toFixed(2) : '');
	
							row.push(this.report.aggregate.subjectMilestoneEvals && this.report.aggregate.subjectMilestoneEvals[subjectId] && this.report.aggregate.subjectMilestoneEvals[subjectId][milestoneId] ? parseFloat(this.report.aggregate.subjectMilestoneEvals[subjectId][milestoneId]).toFixed() : 0);
						}
					}
	
					if (this.aggregateShow.indexOf('competencies') !== -1) {
						for (var competencyId in this.report.aggregate.competencies) {
							row.push(this.report.aggregate.subjectCompetency && this.report.aggregate.subjectCompetency[subjectId] && this.report.aggregate.subjectCompetency[subjectId][competencyId] ? parseFloat(this.report.aggregate.subjectCompetency[subjectId][competencyId]).toFixed(2) : '');
	
							if (this.aggregateShow.indexOf('standardDeviations') !== -1) row.push(this.report.aggregate.subjectCompetencyDeviations && this.report.aggregate.subjectCompetencyDeviations[subjectId] && this.report.aggregate.subjectCompetencyDeviations[subjectId][competencyId] ? parseFloat(this.report.aggregate.subjectCompetencyDeviations[subjectId][competencyId]).toFixed(2) : '');
	
							row.push(this.report.aggregate.subjectCompetencyEvals && this.report.aggregate.subjectCompetencyEvals[subjectId] && this.report.aggregate.subjectCompetencyEvals[subjectId][competencyId] ? parseFloat(this.report.aggregate.subjectCompetencyEvals[subjectId][competencyId]).toFixed() : 0);
						}
					}
	
					row.push(Object.keys(this.report.aggregate.subjectEvaluators[subjectId]).length);
					row.push(Object.keys(this.report.aggregate.subjectEvals[subjectId]).length);
					row.push(Object.keys(this.report.aggregate.subjectRequests[subjectId]).length);
	
					data.push(row);
				}
	
				$('#aggregate-table').DataTable({
					order: [[0, 'asc']],
					stateSave: true,
					dom: 'lfprtip',
					scrollX: true,
					scrollY: '500px',
					scrollCollapse: true,
					paging: false,
					fixedColumns: true,
					data: data
				});
			},
			destroyAggregateDatatable: function destroyAggregateDatatable() {
				$('#aggregate-table').DataTable({
					retrieve: true
				}).clear().destroy();
			}
		},
		components: {
			ReportDate: _ReportDate2.default
		}
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	
	/* styles */
	__webpack_require__(101)
	
	/* script */
	__vue_exports__ = __webpack_require__(103)
	
	/* template */
	var __vue_template__ = __webpack_require__(104)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.name = __vue_options__.name || "ReportDate"
	__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ReportDate.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-4ee850ac"
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-4ee850ac", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-4ee850ac", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] ReportDate.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(102);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(68)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4ee850ac&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ReportDate.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-4ee850ac&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ReportDate.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(67)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"ReportDate.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
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
	
	exports.default = {
		props: ['value'],
		mounted: function mounted() {
			$('#reports-start-date, #reports-end-date').datepicker({
				dateFormat: "yy-mm-dd",
				onSelect: function onSelect() {
					this.dispatchEvent(new Event('input'));
				}
			});
		},
	
		methods: {
			handleInput: function handleInput(prop, value) {
				var newValue = Object.assign({}, this.value, _defineProperty({}, prop, value));
				this.$emit('input', newValue);
			}
		}
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "form-horizontal"
	  }, [_h('div', {
	    staticClass: "form-group"
	  }, [_h('div', {
	    staticClass: "col-md-4"
	  }, [_m(0), " ", _h('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "id": "reports-start-date"
	    },
	    domProps: {
	      "value": value.startDate
	    },
	    on: {
	      "input": function($event) {
	        handleInput('startDate', $event.target.value)
	      }
	    }
	  })]), " ", _h('div', {
	    staticClass: "col-md-4"
	  }, [_m(1), " ", _h('input', {
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "id": "reports-end-date"
	    },
	    domProps: {
	      "value": value.endDate
	    },
	    on: {
	      "input": function($event) {
	        handleInput('endDate', $event.target.value)
	      }
	    }
	  })]), " ", _m(2)])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('label', {
	    attrs: {
	      "for": "reports-start-date"
	    }
	  }, ["Start Date"])
	}},function (){with(this) {
	  return _h('label', {
	    attrs: {
	      "for": "reports-end-date"
	    }
	  }, ["End Date"])
	}},function (){with(this) {
	  return _h('div', {
	    staticClass: "col-md-4"
	  })
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-4ee850ac", module.exports)
	  }
	}

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', [_h('div', {
	    staticClass: "container body-block"
	  }, [_m(0), " ", _h('report-date', {
	    directives: [{
	      name: "model",
	      value: (dates),
	      expression: "dates"
	    }],
	    domProps: {
	      "value": (dates)
	    },
	    on: {
	      "input": function($event) {
	        dates = $event
	      }
	    }
	  }), " ", _h('div', {
	    staticClass: "form-group"
	  }, [_h('label', [_h('input', {
	    attrs: {
	      "type": "checkbox"
	    },
	    domProps: {
	      "checked": Array.isArray(filterMilestones) ? _i(filterMilestones, null) > -1 : _q(filterMilestones, true)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = filterMilestones,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = null,
	            $$i = _i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (filterMilestones = $$a.concat($$v))
	          } else {
	            $$i > -1 && (filterMilestones = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          filterMilestones = $$c
	        }
	      }
	    }
	  }), "\n\t\t\t\tFilter milestones\n\t\t\t"])]), " ", (filterMilestones) ? _h('fieldset', [_m(1), " ", _l((milestoneGroups), function(milestoneGroup, index) {
	    return _h('div', {
	      staticClass: "milestone-group col-xs-6 col-sm-4 col-md-3 col-lg-2"
	    }, [_h('div', {
	      staticClass: "panel panel-default"
	    }, [_h('div', {
	      staticClass: "panel-heading"
	    }, [_h('label', {
	      staticClass: "panel-title"
	    }, [_h('input', {
	      attrs: {
	        "type": "checkbox"
	      },
	      domProps: {
	        "checked": isEntireMilestoneGroupSelected(index)
	      },
	      on: {
	        "click": function($event) {
	          toggleEntireMilestoneGroup(index)
	        }
	      }
	    }), "\n\t\t\t\t\t\t\t" + _s(milestoneGroup.text) + "\n\t\t\t\t\t\t"])]), " ", _h('div', {
	      staticClass: "panel-body"
	    }, [_l((milestoneGroup.children), function(child) {
	      return _h('div', {
	        staticClass: "form-group"
	      }, [_h('label', [_h('input', {
	        attrs: {
	          "type": "checkbox"
	        },
	        domProps: {
	          "value": child.id,
	          "checked": Array.isArray(milestones) ? _i(milestones, child.id) > -1 : _q(milestones, true)
	        },
	        on: {
	          "change": function($event) {
	            var $$a = milestones,
	              $$el = $event.target,
	              $$c = $$el.checked ? (true) : (false);
	            if (Array.isArray($$a)) {
	              var $$v = child.id,
	                $$i = _i($$a, $$v);
	              if ($$c) {
	                $$i < 0 && (milestones = $$a.concat($$v))
	              } else {
	                $$i > -1 && (milestones = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	              }
	            } else {
	              milestones = $$c
	            }
	          }
	        }
	      }), "\n\t\t\t\t\t\t\t\t" + _s(child.text) + "\n\t\t\t\t\t\t\t"])])
	    })])])])
	  })]) : _e(), " ", _h('fieldset', [_m(2), " ", _h('label', [_h('input', {
	    attrs: {
	      "type": "radio",
	      "value": "average"
	    },
	    domProps: {
	      "checked": _q(graphOption, "average")
	    },
	    on: {
	      "change": function($event) {
	        graphOption = "average"
	      }
	    }
	  }), "\n\t\t\t\tAverage only\n\t\t\t"]), " ", _h('label', [_h('input', {
	    attrs: {
	      "type": "radio",
	      "value": "all"
	    },
	    domProps: {
	      "checked": _q(graphOption, "all")
	    },
	    on: {
	      "change": function($event) {
	        graphOption = "all"
	      }
	    }
	  }), "\n\t\t\t\tAll\n\t\t\t"]), " ", _h('label', [_h('input', {
	    attrs: {
	      "type": "radio",
	      "value": "none"
	    },
	    domProps: {
	      "checked": _q(graphOption, "none")
	    },
	    on: {
	      "change": function($event) {
	        graphOption = "none"
	      }
	    }
	  }), "\n\t\t\t\tNone\n\t\t\t"])]), " ", _h('button', {
	    staticClass: "btn btn-lg btn-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": runReport
	    }
	  }, ["\n\t\t\tRun report\n\t\t"])]), " ", (report) ? _h('div', [(report.stats) ? _h('div', {
	    staticClass: "container body-block"
	  }) : _e(), " ", (report.aggregate) ? _h('div', [_h('div', {
	    staticClass: "container body-block"
	  }, [_h('fieldset', [_m(3), " ", _h('label', [_h('input', {
	    attrs: {
	      "type": "checkbox",
	      "value": "milestones"
	    },
	    domProps: {
	      "checked": Array.isArray(aggregateShow) ? _i(aggregateShow, "milestones") > -1 : _q(aggregateShow, true)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = aggregateShow,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = "milestones",
	            $$i = _i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (aggregateShow = $$a.concat($$v))
	          } else {
	            $$i > -1 && (aggregateShow = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          aggregateShow = $$c
	        }
	      }
	    }
	  }), "\n\t\t\t\t\t\tMilestones\n\t\t\t\t\t"]), " ", _h('label', [_h('input', {
	    attrs: {
	      "type": "checkbox",
	      "value": "competencies"
	    },
	    domProps: {
	      "checked": Array.isArray(aggregateShow) ? _i(aggregateShow, "competencies") > -1 : _q(aggregateShow, true)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = aggregateShow,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = "competencies",
	            $$i = _i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (aggregateShow = $$a.concat($$v))
	          } else {
	            $$i > -1 && (aggregateShow = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          aggregateShow = $$c
	        }
	      }
	    }
	  }), "\n\t\t\t\t\t\tCompetencies\n\t\t\t\t\t"]), " ", _h('label', [_h('input', {
	    attrs: {
	      "type": "checkbox",
	      "value": "standardDeviations"
	    },
	    domProps: {
	      "checked": Array.isArray(aggregateShow) ? _i(aggregateShow, "standardDeviations") > -1 : _q(aggregateShow, true)
	    },
	    on: {
	      "change": function($event) {
	        var $$a = aggregateShow,
	          $$el = $event.target,
	          $$c = $$el.checked ? (true) : (false);
	        if (Array.isArray($$a)) {
	          var $$v = "standardDeviations",
	            $$i = _i($$a, $$v);
	          if ($$c) {
	            $$i < 0 && (aggregateShow = $$a.concat($$v))
	          } else {
	            $$i > -1 && (aggregateShow = $$a.slice(0, $$i).concat($$a.slice($$i + 1)))
	          }
	        } else {
	          aggregateShow = $$c
	        }
	      }
	    }
	  }), "\n\t\t\t\t\t\tStandard Deviations\n\t\t\t\t\t"])]), " ", _h('table', {
	    staticClass: "table table-striped table-bordered",
	    attrs: {
	      "id": "aggregate-table",
	      "width": "100%"
	    }
	  }, [_h('thead', [_h('tr', [_m(4), " ", (aggregateShow.includes('milestones')) ? _h('th', {
	    attrs: {
	      "colspan": milestoneColspan
	    }
	  }, ["\n\t\t\t\t\t\t\t\tMilestones\n\t\t\t\t\t\t\t"]) : _e(), " ", (aggregateShow.includes('competencies')) ? _h('th', {
	    attrs: {
	      "colspan": competencyColspan
	    }
	  }, ["\n\t\t\t\t\t\t\t\tCompetencies\n\t\t\t\t\t\t\t"]) : _e(), " ", _m(5)]), " ", _h('tr', [_l((report.aggregate.milestones), function(milestone, milestoneId) {
	    return (aggregateShow.includes('milestones')) ? _h('th', {
	      key: ("milestone-title-" + milestoneId),
	      attrs: {
	        "colspan": colsPerItem
	      }
	    }, ["\n\t\t\t\t\t\t\t\t" + _s(milestone) + "\n\t\t\t\t\t\t\t"]) : _e()
	  }), " ", _l((report.aggregate.competencies), function(competency, competencyId) {
	    return (aggregateShow.includes('competencies')) ? _h('th', {
	      key: ("competency-title-" + competencyId),
	      attrs: {
	        "colspan": colsPerItem
	      }
	    }, ["\n\t\t\t\t\t\t\t\t" + _s(competency) + "\n\t\t\t\t\t\t\t"]) : _e()
	  }), " ", _m(6)]), " ", _h('tr', [_l((report.aggregate.milestones), function(milestone, milestoneId) {
	    return (aggregateShow.includes('milestones')) ? [_h('th', {
	      key: ("milestone-avg-" + milestoneId)
	    }, ["Average"]), " ", (aggregateShow.includes('standardDeviations')) ? _h('th', {
	      key: ("milestone-stddev-" + milestoneId)
	    }, ["\n\t\t\t\t\t\t\t\tStd. Dev.\n\t\t\t\t\t\t\t"]) : _e(), " ", _h('th', {
	      key: ("milestone-num-" + milestoneId)
	    }, ["#"])] : _e()
	  }), " ", _l((report.aggregate.competencies), function(competency, competencyId) {
	    return (aggregateShow.includes('competencies')) ? [_h('th', {
	      key: ("competency-avg-" + competencyId)
	    }, ["Average"]), " ", (aggregateShow.includes('standardDeviations')) ? _h('th', {
	      key: ("competency-stddev-" + competencyId)
	    }, ["\n\t\t\t\t\t\t\t\tStd. Dev.\n\t\t\t\t\t\t\t"]) : _e(), " ", _h('th', {
	      key: ("competency-num-" + competencyId)
	    }, ["#"])] : _e()
	  }), " ", _m(7), " ", _m(8), " ", _m(9)])])])])]) : _e()]) : _e()])
	}},staticRenderFns: [function (){with(this) {
	  return _h('h2', ["Trainee report"])
	}},function (){with(this) {
	  return _h('legend', ["Milestones"])
	}},function (){with(this) {
	  return _h('legend', ["Graphs"])
	}},function (){with(this) {
	  return _h('legend', ["Show in report"])
	}},function (){with(this) {
	  return _h('th', {
	    attrs: {
	      "rowspan": "3"
	    }
	  }, ["Trainee"])
	}},function (){with(this) {
	  return _h('th', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, ["All"])
	}},function (){with(this) {
	  return _h('th', {
	    attrs: {
	      "colspan": "3"
	    }
	  }, ["Total"])
	}},function (){with(this) {
	  return _h('th', ["# Faculty"])
	}},function (){with(this) {
	  return _h('th', ["# Evals"])
	}},function (){with(this) {
	  return _h('th', ["# Trainee Requests"])
	}}]}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-155d597c", module.exports)
	  }
	}

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', [(reportType) ? _h('div', [(reportType === REPORT_TYPES.TRAINEE) ? _h('trainee-report') : _e(), " ", (reportType === REPORT_TYPES.FORM) ? _h('form-report') : _e(), " ", _h('div', {
	    staticClass: "text-center"
	  }, [_h('button', {
	    staticClass: "btn btn-lg btn-default",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": handleResetClick
	    }
	  }, ["\n\t\t\t\tStart over\n\t\t\t"])])]) : _h('div', {
	    staticClass: "container body-block"
	  }, [_h('fieldset', [_h('legend', ["Report type"]), " ", _h('div', {
	    staticClass: "form-inline"
	  }, [_l((REPORT_TYPES), function(type) {
	    return _h('div', {
	      staticClass: "form-group col-sm-2"
	    }, [_h('button', {
	      staticClass: "btn lg btn-primary",
	      attrs: {
	        "type": "button"
	      },
	      on: {
	        "click": function($event) {
	          setReportType(type)
	        }
	      }
	    }, ["\n\t\t\t\t\t\t" + _s(ucfirst(type)) + "\n\t\t\t\t\t"])])
	  })])])]), " "])
	}},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-25c733f6", module.exports)
	  }
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-constructors.js.map
//# sourceMappingURL=vue-constructors.js.map
