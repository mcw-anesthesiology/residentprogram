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

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(21);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(79);

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

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(8);

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

/***/ 101:
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

/***/ 102:
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

/***/ 103:
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

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(8),
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

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(56),
    isObjectLike = __webpack_require__(7);

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

/***/ 106:
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

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(57);

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

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(52),
    baseKeys = __webpack_require__(61),
    isArrayLike = __webpack_require__(106);

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

/***/ 109:
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

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


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

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(129)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(127),
  /* template */
  __webpack_require__(135),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-7d00f708",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/StartEndDate.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] StartEndDate.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d00f708", Component.options)
  } else {
    hotAPI.reload("data-v-7d00f708", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(144),
  /* template */
  __webpack_require__(188),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/EvaluationDataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EvaluationDataTable.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c24d553a", Component.options)
  } else {
    hotAPI.reload("data-v-c24d553a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 122:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 124:
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

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_downloadjs__);
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





/* harmony default export */ __webpack_exports__["default"] = ({
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

		reloader: {
			type: Function,
			required: false
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
		reloadable: function reloadable() {
			return this.config && 'ajax' in this.config || this.reloader;
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
			if (this.reloader) this.reloader();else $(this.$refs.table).DataTable({
				retrieve: true
			}).ajax.reload(null, false);
		},
		exportCsv: function exportCsv() {
			var header = [];
			header.fill([], this.thead.length);
			this.thead.map(function (row, rowIndex) {
				if (!header[rowIndex]) header[rowIndex] = [];

				row.map(function (cell, cellIndex) {
					while (header[rowIndex][cellIndex]) {
						cellIndex++;
					}if (cell.rowspan) {
						for (var i = 0; i < cell.rowspan; i++) {
							if (!header[rowIndex + i]) header[rowIndex + i] = [];

							header[rowIndex + i][cellIndex] = cell.text;
							if (cell.colspan) {
								for (var j = 0; j < cell.colspan; j++) {
									header[rowIndex][cellIndex + j] = cell.text;
								}
							}
						}
					} else if (cell.colspan) {
						for (var _j = 0; _j < cell.colspan; _j++) {
							header[rowIndex][cellIndex + _j] = cell.text;
						}
					} else {
						header[rowIndex][cellIndex] = cell.text;
					}
				});
			});

			var rows = this.data.map(function (row) {
				return row.map(function (cell) {
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["p" /* escapeCsv */])(cell.toString());
				}).join(',');
			}).sort(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["q" /* sortIgnoreCase */]);
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

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr_theme_flatpickr_min_css__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr_theme_flatpickr_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr_theme_flatpickr_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__ = __webpack_require__(16);
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







/* harmony default export */ __webpack_exports__["default"] = ({
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

				return _ref = {}, _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CUSTOM, null), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CURRENT_QUARTER, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["currentQuarter"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].LAST_QUARTER, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["lastQuarter"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CURRENT_SEMESTER, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["currentSemester"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].LAST_SEMESTER, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["lastSemester"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CURRENT_YEAR, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["currentYear"]()), _defineProperty(_ref, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].LAST_YEAR, __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["lastYear"]()), _ref;
			}
		}
	},
	data: function data() {
		return {
			startDate: this.value.startDate,
			endDate: this.value.endDate,
			dateRange: __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CUSTOM
		};
	},
	created: function created() {
		this.matchDateRangeWithValue();
	},

	computed: {
		dates: function dates() {
			return {
				startDate: this.startDate,
				endDate: this.endDate
			};
		},
		dateRanges: function dateRanges() {
			var ranges = Object.assign({}, this.ranges);
			if (this.allTime && !ranges[__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].ALL_TIME]) ranges[__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].ALL_TIME] = __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["allTime"]();else delete ranges[__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].ALL_TIME];

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
			if (_dateRange === __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].ALL_TIME) this.setDate(__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["allTime"]());

			if (_dateRange !== __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CUSTOM && this.dateRanges[_dateRange] && !__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["datesEqual"](this.value, this.dateRanges[_dateRange])) this.setDate(this.dateRanges[_dateRange]);
		}
	},
	methods: {
		matchDateRangeWithValue: function matchDateRangeWithValue() {
			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.value;

			if (this.allTime && !value.startDate && !value.endDate) {
				this.dateRange = __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].ALL_TIME;
				return;
			}

			if (this.dateRange && this.dateRange !== __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CUSTOM && this.dateRanges[this.dateRange] && __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["datesEqual"](value, this.dateRanges[this.dateRange])) return;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.values(__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var range = _step.value;

					if (this.dateRanges[range] && __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["datesEqual"](value, this.dateRanges[range])) {
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

			this.dateRange = __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["DATE_RANGES"].CUSTOM;
		},
		setDate: function setDate(dates) {
			dates = __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["isoDateStringObject"](dates);
			this.startDate = dates.startDate;
			this.endDate = dates.endDate;
		},

		camelCaseToWords: __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["r" /* camelCaseToWords */]
	},
	components: {
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default.a
	}
});

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "table-responsive"
  }, [(_vm.reloadable) ? _c('div', {
    staticClass: "refresh-button-container"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "title": "Reload table"
    },
    on: {
      "click": _vm.reloadTable
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-refresh"
  })])]) : _vm._e(), _vm._v(" "), _c('table', {
    ref: "table",
    staticClass: "table",
    class: _vm.tableClass,
    attrs: {
      "id": _vm.id,
      "width": "100%"
    }
  }, [_vm._t("default", [_c('thead', _vm._l((_vm.thead), function(row, rowIndex) {
    return _c('tr', {
      key: ("row-" + rowIndex)
    }, _vm._l((row), function(th, thIndex) {
      return _c('th', {
        key: thIndex,
        attrs: {
          "rowspan": th.rowspan,
          "colspan": th.colspan
        }
      }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(th.text || th) + "\n\t\t\t\t\t")])
    }))
  }))])], 2), _vm._v(" "), (_vm.exportable && _vm.data) ? _c('div', {
    staticClass: "text-center"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.exportCsv
    }
  }, [_vm._v("\n\t\t\tExport CSV\n\t\t")])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4d4c1aff", module.exports)
  }
}

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "container",
    staticClass: "form-horizontal"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('div', {
    staticClass: "col-md-4"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tDate Range\n\t\t\t\t"), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.dateRange),
      expression: "dateRange"
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
        _vm.dateRange = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, _vm._l((_vm.dateRanges), function(range, name) {
    return _c('option', {
      domProps: {
        "value": name
      }
    }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(_vm.camelCaseToWords(name)) + "\n\t\t\t\t\t")])
  }))])]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6 col-md-4"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tStart Date\n\t\t\t\t"), _c('vue-flatpickr', {
    staticClass: "form-control",
    attrs: {
      "options": _vm.flatpickrOptions
    },
    model: {
      value: (_vm.startDate),
      callback: function($$v) {
        _vm.startDate = $$v
      },
      expression: "startDate"
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-sm-6 col-md-4"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tEnd Date\n\t\t\t\t"), _c('vue-flatpickr', {
    staticClass: "form-control",
    attrs: {
      "options": _vm.flatpickrOptions
    },
    model: {
      value: (_vm.endDate),
      callback: function($$v) {
        _vm.endDate = $$v
      },
      expression: "endDate"
    }
  })], 1)])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7d00f708", module.exports)
  }
}

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(30);
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

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__DataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_localforage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__ = __webpack_require__(16);
//
//
//
//
//
//
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

/* harmony default export */ __webpack_exports__["default"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__DataTable_vue___default.a,
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

			if (this.dates.endDate) config.ajax.data.evaluation_date_start = ['<=', __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateString"](this.dates.endDate)];
			if (this.dates.startDate) config.ajax.data.evaluation_date_end = ['>=', __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateString"](this.dates.startDate)];

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
		DataTable: __WEBPACK_IMPORTED_MODULE_0__DataTable_vue___default.a,
		StartEndDate: __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue___default.a
	}
});

/***/ }),

/***/ 15:
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

/***/ 159:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*!
    localForage -- Offline Storage, Improved
    Version 1.5.0
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
    } catch (e) {}
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
        typeof IDBKeyRange !== 'undefined';
    } catch (e) {
        return false;
    }
}

function isWebSQLValid() {
    return typeof openDatabase === 'function';
}

function isLocalStorageValid() {
    try {
        return typeof localStorage !== 'undefined' && 'setItem' in localStorage && localStorage.setItem;
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

// Some code originally from async_storage.js in
// [Gaia](https://github.com/mozilla-b2g/gaia).

var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
var supportsBlobs;
var dbContexts;
var toString = Object.prototype.toString;

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
        var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, 'readwrite');
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

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);
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
            var dbInfo = self._dbInfo;
            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);

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
        })["catch"](reject);
    });

    executeCallback(promise, callback);

    return promise;
}

function setItem(key, value, callback) {
    var self = this;

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

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
            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
            var store = transaction.objectStore(dbInfo.storeName);
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
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function removeItem(key, callback) {
    var self = this;

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
            var store = transaction.objectStore(dbInfo.storeName);

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
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function clear(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var transaction = dbInfo.db.transaction(dbInfo.storeName, 'readwrite');
            var store = transaction.objectStore(dbInfo.storeName);
            var req = store.clear();

            transaction.oncomplete = function () {
                resolve();
            };

            transaction.onabort = transaction.onerror = function () {
                var err = req.error ? req.error : req.transaction.error;
                reject(err);
            };
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function length(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);
            var req = store.count();

            req.onsuccess = function () {
                resolve(req.result);
            };

            req.onerror = function () {
                reject(req.error);
            };
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
            var dbInfo = self._dbInfo;
            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);

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
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

function keys(callback) {
    var self = this;

    var promise = new Promise$1(function (resolve, reject) {
        self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var store = dbInfo.db.transaction(dbInfo.storeName, 'readonly').objectStore(dbInfo.storeName);

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
        })["catch"](reject);
    });

    executeCallback(promise, callback);
    return promise;
}

var asyncStorage = {
    _driver: 'asyncStorage',
    _initStorage: _initStorage,
    iterate: iterate,
    getItem: getItem,
    setItem: setItem,
    removeItem: removeItem,
    clear: clear,
    length: length,
    key: key,
    keys: keys
};

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

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

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

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

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

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

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
    iterate: iterate$1,
    getItem: getItem$1,
    setItem: setItem$1,
    removeItem: removeItem$1,
    clear: clear$1,
    length: length$1,
    key: key$1,
    keys: keys$1
};

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

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

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
            if (localStorage.key(i).indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(localStorage.key(i).substring(dbInfo.keyPrefix.length));
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

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

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

    // Cast the key to a string, as that's all we can set as a key.
    if (typeof key !== 'string') {
        console.warn(key + ' used as a key, but it is not a string.');
        key = String(key);
    }

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
    // Default API, from Gaia/localStorage.
    iterate: iterate$2,
    getItem: getItem$2,
    setItem: setItem$2,
    removeItem: removeItem$2,
    clear: clear$2,
    length: length$2,
    key: key$2,
    keys: keys$2
};

// Custom drivers are stored here when `defineDriver()` is called.
// They are shared across all instances of localForage.
var CustomDrivers = {};

var DriverType = {
    INDEXEDDB: 'asyncStorage',
    LOCALSTORAGE: 'localStorageWrapper',
    WEBSQL: 'webSQLStorage'
};

var DefaultDriverOrder = [DriverType.INDEXEDDB, DriverType.WEBSQL, DriverType.LOCALSTORAGE];

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

var driverSupport = {};
// Check to see if IndexedDB is available and if it is the latest
// implementation; it's our preferred backend library. We use "_spec_test"
// as the name of the database because it's not the one we'll operate on,
// but it's useful to make sure its using the right spec.
// See: https://github.com/mozilla/localForage/issues/128
driverSupport[DriverType.INDEXEDDB] = isIndexedDBValid();

driverSupport[DriverType.WEBSQL] = isWebSQLValid();

driverSupport[DriverType.LOCALSTORAGE] = isLocalStorageValid();

var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
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
            for (var key in arg) {
                if (arg.hasOwnProperty(key)) {
                    if (isArray(arg[key])) {
                        arguments[0][key] = arg[key].slice();
                    } else {
                        arguments[0][key] = arg[key];
                    }
                }
            }
        }
    }

    return arguments[0];
}

function isLibraryDriver(driverName) {
    for (var driver in DriverType) {
        if (DriverType.hasOwnProperty(driver) && DriverType[driver] === driverName) {
            return true;
        }
    }

    return false;
}

var LocalForage = function () {
    function LocalForage(options) {
        _classCallCheck(this, LocalForage);

        this.INDEXEDDB = DriverType.INDEXEDDB;
        this.LOCALSTORAGE = DriverType.LOCALSTORAGE;
        this.WEBSQL = DriverType.WEBSQL;

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
                return new Error("Can't call config() after localforage " + 'has been used.');
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
                var namingError = new Error('Custom driver name already in use: ' + driverObject._driver);

                // A driver name should be defined and not overlap with the
                // library-defined, default drivers.
                if (!driverObject._driver) {
                    reject(complianceError);
                    return;
                }
                if (isLibraryDriver(driverObject._driver)) {
                    reject(namingError);
                    return;
                }

                var customDriverMethods = LibraryMethods.concat('_initStorage');
                for (var i = 0; i < customDriverMethods.length; i++) {
                    var customDriverMethod = customDriverMethods[i];
                    if (!customDriverMethod || !driverObject[customDriverMethod] || typeof driverObject[customDriverMethod] !== 'function') {
                        reject(complianceError);
                        return;
                    }
                }

                var supportPromise = Promise$1.resolve(true);
                if ('_support' in driverObject) {
                    if (driverObject._support && typeof driverObject._support === 'function') {
                        supportPromise = driverObject._support();
                    } else {
                        supportPromise = Promise$1.resolve(!!driverObject._support);
                    }
                }

                supportPromise.then(function (supportResult) {
                    driverSupport[driverName] = supportResult;
                    CustomDrivers[driverName] = driverObject;
                    resolve();
                }, reject);
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
        var self = this;
        var getDriverPromise = Promise$1.resolve().then(function () {
            if (isLibraryDriver(driverName)) {
                switch (driverName) {
                    case self.INDEXEDDB:
                        return asyncStorage;
                    case self.LOCALSTORAGE:
                        return localStorageWrapper;
                    case self.WEBSQL:
                        return webSQLStorage;
                }
            } else if (CustomDrivers[driverName]) {
                return CustomDrivers[driverName];
            } else {
                throw new Error('Driver not found.');
            }
        });
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
        return !!driverSupport[driverName];
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
        for (var i = 0; i < LibraryMethods.length; i++) {
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ }),

/***/ 171:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(142),
  /* template */
  __webpack_require__(184),
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

/***/ 18:
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

/***/ 184:
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

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('fieldset', [_c('legend', [_vm._v("Evaluation Date filter")]), _vm._v(" "), _c('start-end-date', {
    attrs: {
      "allTime": true
    },
    model: {
      value: (_vm.dates),
      callback: function($$v) {
        _vm.dates = $$v
      },
      expression: "dates"
    }
  })], 1), _vm._v(" "), _c('data-table', {
    attrs: {
      "id": _vm.id,
      "striped": _vm.striped,
      "bordered": _vm.bordered,
      "thead": _vm.thead,
      "config": _vm.datedConfig,
      "data": _vm.data,
      "exportable": _vm.exportable,
      "exportFilename": _vm.exportFilename
    }
  }, [_vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-c24d553a", module.exports)
  }
}

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(87),
    mapCacheDelete = __webpack_require__(88),
    mapCacheGet = __webpack_require__(89),
    mapCacheHas = __webpack_require__(90),
    mapCacheSet = __webpack_require__(91);

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

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(47),
    arraySome = __webpack_require__(54),
    cacheHas = __webpack_require__(64);

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

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35)))

/***/ }),

/***/ 22:
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

/***/ 23:
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

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(1),
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)(module)))

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(6),
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

/***/ 26:
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

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(60),
    baseUnary = __webpack_require__(63),
    nodeUtil = __webpack_require__(94);

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

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(384),
  /* template */
  __webpack_require__(695),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/AcademicYearEvaluationDataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AcademicYearEvaluationDataTable.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cb631b42", Component.options)
  } else {
    hotAPI.reload("data-v-cb631b42", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(111),
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

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__ = __webpack_require__(29);









function createAdminDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
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
				flaggedEvals: null,

				alerts: []
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
				headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["a" /* getFetchHeaders */])(),
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
		updated: function updated() {
			var _this2 = this;

			if (this.flaggedEvals && this.flaggedEvals.length > 0) {
				$('.table').on('click', '.remove-flag', function (event) {
					event.preventDefault();
					event.stopPropagation();

					var flaggedEvalId = $(event.target).data('id');
					fetch('/flagged_evaluations/' + flaggedEvalId, {
						method: 'POST', // DELETE
						headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["a" /* getFetchHeaders */])(),
						credentials: 'same-origin',
						body: JSON.stringify({
							_method: 'DELETE'
						})
					}).then(function (response) {
						if (response.ok) return response.text();else throw new Error(response.statusText);
					}).then(function (response) {
						if (response === 'success') _this2.flaggedEvals = _this2.flaggedEvals.filter(function (flaggedEval) {
							return flaggedEval.id !== Number(flaggedEvalId);
						});else throw new Error(response);
					}).catch(function (err) {
						console.error(err);
						_this2.alerts.push({
							type: 'error',
							html: '<b>Error:</b> Unable to complete flagged evaluation'
						});
					});
				});
			}
		},


		computed: {
			flaggedEvalsThead: function flaggedEvalsThead() {
				return [['#', 'Evaluator', 'Subject', 'Requested Action', 'Reason', '']];
			},
			flaggedEvalsConfig: function flaggedEvalsConfig() {
				var _this3 = this;

				return {
					columns: [{ data: 'evaluation.url' }, { data: 'evaluation.evaluator.full_name' }, { data: 'evaluation.subject.full_name' }, { data: 'requested_action', render: function render(action) {
							return _this3.flaggedActions[action];
						} }, { data: 'reason' }, { data: null, orderable: false, searchable: false, render: function render(flaggedEval) {
							return '<button type="button"\n\t\t\t\t\t\t\t\t\tclass="remove-flag btn btn-primary btn-xs"\n\t\t\t\t\t\t\t\t\tdata-id="' + flaggedEval.id + '">\n\t\t\t\t\t\t\t\t<span class="glyphicon glyphicon-ok"></span>\n\t\t\t\t\t\t\t\tComplete\n\t\t\t\t\t\t\t</button>';
						}
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderEvaluationStatus */] }],
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
							render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderEvaluationStatus */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			DataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue___default.a,
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue___default.a
		}
	});
}

/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(29);







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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["i" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: null, orderable: false, searchable: false, render: function render(evaluation) {
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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
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
							render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
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
							render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
				return [['#', 'Resident', 'Evaluator', 'Evaluation Form', 'Evaluation Date', 'Requested', 'Completed']];
			},
			allConfig: function allConfig() {
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
									type: 'resident',
									evaluator_type: 'faculty'
								}
							},
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderSubjectCell */] }, { data: 'evaluator.full_name' }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue___default.a
		}
	});
}

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(29);







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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
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
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue___default.a
		}
	});
}

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAnonymousFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(29);







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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue___default.a
		}
	});
}

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFacultyFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(29);







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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["h" /* renderSubjectEvalUrl */] }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["h" /* renderSubjectEvalUrl */] }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue___default.a
		}
	});
}

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createResidentDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(29);







function createResidentDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,

		data: function data() {
			return {
				alerts: []
			};
		},


		computed: {
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
					}, { data: 'form.title' }, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["i" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["h" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["h" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						} }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue___default.a
		}
	});
}

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStaffDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(29);







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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["i" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
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
							render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
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
							render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["d" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["e" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["f" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["g" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue___default.a,
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue___default.a
		}
	});
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

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(128)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(126),
  /* template */
  __webpack_require__(134),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4d4c1aff",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/DataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DataTable.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d4c1aff", Component.options)
  } else {
    hotAPI.reload("data-v-4d4c1aff", Component.options)
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

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataTable_vue__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__DataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__ = __webpack_require__(16);
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue___default.a,
	props: {
		startDate: {
			type: String,
			default: '2015-07-01' // Year faculty evals released
		}
	},
	data: function data() {
		return {
			dates: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["academicYearForDate"])(new Date())
		};
	},


	components: {
		AcademicYearSelector: __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue___default.a,
		DataTable: __WEBPACK_IMPORTED_MODULE_1__DataTable_vue___default.a
	}
});

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

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(59),
    getValue = __webpack_require__(72);

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
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEqual__ = __webpack_require__(107);
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

/***/ 42:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(73),
    hashDelete = __webpack_require__(74),
    hashGet = __webpack_require__(75),
    hashHas = __webpack_require__(76),
    hashSet = __webpack_require__(77);

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

/***/ 445:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_js__ = __webpack_require__(323);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminDashboard", function() { return __WEBPACK_IMPORTED_MODULE_0__admin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resident_js__ = __webpack_require__(328);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createResidentDashboard", function() { return __WEBPACK_IMPORTED_MODULE_1__resident_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__faculty_js__ = __webpack_require__(324);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_2__faculty_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__staff_js__ = __webpack_require__(329);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStaffDashboard", function() { return __WEBPACK_IMPORTED_MODULE_3__staff_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__faculty_admin_js__ = __webpack_require__(325);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_4__faculty_admin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__faculty_anonymous_js__ = __webpack_require__(326);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAnonymousFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_5__faculty_anonymous_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__faculty_faculty_js__ = __webpack_require__(327);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFacultyFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_6__faculty_faculty_js__["a"]; });








/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(19),
    setCacheAdd = __webpack_require__(97),
    setCacheHas = __webpack_require__(98);

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

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(8),
    stackClear = __webpack_require__(100),
    stackDelete = __webpack_require__(101),
    stackGet = __webpack_require__(102),
    stackHas = __webpack_require__(103),
    stackSet = __webpack_require__(104);

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

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


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

/***/ 50:
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),

/***/ 51:
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

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(62),
    isArguments = __webpack_require__(105),
    isArray = __webpack_require__(15),
    isBuffer = __webpack_require__(24),
    isIndex = __webpack_require__(78),
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

/***/ 53:
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

/***/ 54:
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

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(53),
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

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(6),
    isObjectLike = __webpack_require__(7);

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

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(58),
    isObjectLike = __webpack_require__(7);

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

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(48),
    equalArrays = __webpack_require__(20),
    equalByTag = __webpack_require__(66),
    equalObjects = __webpack_require__(67),
    getTag = __webpack_require__(71),
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

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(25),
    isMasked = __webpack_require__(80),
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

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    getRawTag = __webpack_require__(69),
    objectToString = __webpack_require__(95);

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

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(6),
    isLength = __webpack_require__(26),
    isObjectLike = __webpack_require__(7);

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

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(81),
    nativeKeys = __webpack_require__(93);

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

/***/ 62:
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

/***/ 63:
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

/***/ 64:
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

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(1);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    Uint8Array = __webpack_require__(49),
    eq = __webpack_require__(23),
    equalArrays = __webpack_require__(20),
    mapToArray = __webpack_require__(92),
    setToArray = __webpack_require__(99);

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

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(68);

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

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(55),
    getSymbols = __webpack_require__(70),
    keys = __webpack_require__(108);

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

/***/ 69:
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

/***/ 695:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\tAcademic year\n\t\t\t\t"), _c('academic-year-selector', {
    attrs: {
      "min-date": _vm.startDate
    },
    model: {
      value: (_vm.dates),
      callback: function($$v) {
        _vm.dates = $$v
      },
      expression: "dates"
    }
  })], 1)])]), _vm._v(" "), _c('data-table', {
    attrs: {
      "id": _vm.id,
      "striped": _vm.striped,
      "bordered": _vm.bordered,
      "thead": _vm.thead,
      "config": _vm.datedConfig,
      "data": _vm.data,
      "exportable": _vm.exportable,
      "exportFilename": _vm.exportFilename
    }
  }, [_vm._t("default")], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cb631b42", module.exports)
  }
}

/***/ }),

/***/ 7:
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

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(51),
    stubArray = __webpack_require__(109);

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

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(43),
    Map = __webpack_require__(13),
    Promise = __webpack_require__(45),
    Set = __webpack_require__(46),
    WeakMap = __webpack_require__(50),
    baseGetTag = __webpack_require__(6),
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

/***/ 72:
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

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

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

/***/ 74:
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

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

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

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

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

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(11);

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

/***/ 78:
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

/***/ 79:
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

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(82),
    listCacheDelete = __webpack_require__(83),
    listCacheGet = __webpack_require__(84),
    listCacheHas = __webpack_require__(85),
    listCacheSet = __webpack_require__(86);

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

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(65);

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

/***/ 81:
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

/***/ 82:
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

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

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

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

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

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

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

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(9);

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

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(44),
    ListCache = __webpack_require__(8),
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

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

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

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

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

/***/ 9:
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

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

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

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(10);

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

/***/ 92:
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

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(96);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),

/***/ 94:
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(34)(module)))

/***/ }),

/***/ 95:
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

/***/ 96:
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

/***/ 97:
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

/***/ 98:
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

/***/ 99:
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


/***/ })

},[445]);
});
//# sourceMappingURL=vue-dashboard.js.map