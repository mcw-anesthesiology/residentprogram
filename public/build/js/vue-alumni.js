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
return webpackJsonp([11],{

/***/ 131:
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

/***/ 132:
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
    require("vue-hot-reload-api")      .rerender("data-v-4aea83c8", esExports)
  }
}

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ConfirmationButton_vue__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4aea83c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ConfirmationButton_vue__ = __webpack_require__(132);
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4aea83c8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ConfirmationButton_vue__["a" /* default */],
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
    hotAPI.createRecord("data-v-4aea83c8", Component.options)
  } else {
    hotAPI.reload("data-v-4aea83c8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapAlert_vue__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8d03363a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapAlert_vue__ = __webpack_require__(48);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(46)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8d03363a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapAlert_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8d03363a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapAlert_vue__["a" /* default */],
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
    hotAPI.createRecord("data-v-8d03363a", Component.options)
  } else {
    hotAPI.reload("data-v-8d03363a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Edit_vue__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ec25dd4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Edit_vue__ = __webpack_require__(304);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(302)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9ec25dd4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Edit_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ec25dd4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Edit_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Alumni/Edit.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 302:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__ = __webpack_require__(19);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		manage: {
			type: Boolean,
			default: false
		},
		alum: {
			type: Object,
			required: false
		},
		saveUrl: {
			type: String,
			required: true
		},
		showClose: {
			type: Boolean,
			default: true
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

			var body = this.assignProps(this);

			if (this.alum) body._method = 'PATCH';

			fetch(this.saveUrl, {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(body)
			}).then(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["w" /* okOrThrow */]).then(function () {
				_this.$emit('reload');
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
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__["default"],
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 304:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container body-block edit-alum" }, [
    _c("h2", [_vm._v(_vm._s(_vm.addEditText) + " alum")]),
    _vm._v(" "),
    _c("form", { staticClass: "form" }, [
      _c("div", { staticClass: "row" }, [
        _vm._m(0),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-5 col-sm-6" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tFirst name\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.first_name,
                    expression: "first_name"
                  }
                ],
                staticClass: "form-control",
                attrs: {
                  type: "text",
                  placeholder: "First name",
                  required: ""
                },
                domProps: { value: _vm.first_name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.first_name = $event.target.value
                  }
                }
              })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-5 col-sm-6" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tLast name\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.last_name,
                    expression: "last_name"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "Last name", required: "" },
                domProps: { value: _vm.last_name },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.last_name = $event.target.value
                  }
                }
              })
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-sm-8" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tEmail\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.email,
                    expression: "email"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "email", placeholder: "Email" },
                domProps: { value: _vm.email },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.email = $event.target.value
                  }
                }
              })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-4 col-sm-4" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tPhone\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.phone,
                    expression: "phone"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "tel", placeholder: "Phone number" },
                domProps: { value: _vm.phone },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.phone = $event.target.value
                  }
                }
              })
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _vm._m(2),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-sm-8" }, [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t\t\tEmployer\n\t\t\t\t\t"),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.employer,
                  expression: "employer"
                }
              ],
              staticClass: "form-control",
              attrs: { type: "text", placeholder: "Employer" },
              domProps: { value: _vm.employer },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.employer = $event.target.value
                }
              }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-4 col-sm-4" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tCountry\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.country,
                    expression: "country"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "Country" },
                domProps: { value: _vm.country },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.country = $event.target.value
                  }
                }
              })
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _vm._m(3),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6 col-sm-8" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tAddress\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.address,
                    expression: "address"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "Address" },
                domProps: { value: _vm.address },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.address = $event.target.value
                  }
                }
              })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-4 col-sm-4" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tAddress (continued)\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.address_2,
                    expression: "address_2"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "Apartment #, etc" },
                domProps: { value: _vm.address_2 },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.address_2 = $event.target.value
                  }
                }
              })
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-4 col-md-offset-2 col-sm-6" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tCity\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.city,
                    expression: "city"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "City" },
                domProps: { value: _vm.city },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.city = $event.target.value
                  }
                }
              })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-4 col-sm-3" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tState / Region\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.state,
                    expression: "state"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "State / Region" },
                domProps: { value: _vm.state },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.state = $event.target.value
                  }
                }
              })
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-2 col-sm-3" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\t\tZIP Code\n\t\t\t\t\t\t"),
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.zip,
                    expression: "zip"
                  }
                ],
                staticClass: "form-control",
                attrs: { type: "text", placeholder: "ZIP Code" },
                domProps: { value: _vm.zip },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.zip = $event.target.value
                  }
                }
              })
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("hr"),
      _vm._v(" "),
      _vm.manage
        ? _c("div", { staticClass: "row" }, [
            _vm._m(4),
            _vm._v(" "),
            _c("div", { staticClass: "col-sm-4" }, [
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "label",
                  { staticClass: "containing-label" },
                  [
                    _vm._v("\n\t\t\t\t\t\tGraduation date\n\t\t\t\t\t\t"),
                    _c("vue-flatpickr", {
                      attrs: {
                        placeholder: "Graduation date",
                        options: _vm.flatpickrOptions
                      },
                      model: {
                        value: _vm.graduation_date,
                        callback: function($$v) {
                          _vm.graduation_date = $$v
                        },
                        expression: "graduation_date"
                      }
                    })
                  ],
                  1
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-sm-8" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { staticClass: "containing-label" }, [
                  _vm._v("\n\t\t\t\t\t\tNotes\n\t\t\t\t\t\t"),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.notes,
                        expression: "notes"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { placeholder: "Notes" },
                    domProps: { value: _vm.notes },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.notes = $event.target.value
                      }
                    }
                  })
                ])
              ])
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "btn-lg-submit-container" },
        [
          _vm.showClose
            ? _c(
                "confirmation-button",
                {
                  staticClass: "btn btn-lg",
                  attrs: {
                    "unpressed-class": "btn-default",
                    "pressed-class": "btn-warning"
                  },
                  on: {
                    click: function($event) {
                      _vm.$emit("close")
                    }
                  }
                },
                [_vm._v("\n\t\t\t\tCancel\n\t\t\t")]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-lg btn-primary",
              attrs: { type: "submit" },
              on: { click: _vm.saveAlum }
            },
            [_vm._v("\n\t\t\t\tSubmit\n\t\t\t")]
          )
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-2 glyph-container" }, [
      _c("span", { staticClass: "glyphicon glyphicon-user" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-2 glyph-container" }, [
      _c("span", { staticClass: "glyphicon glyphicon-send" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-2 glyph-container" }, [
      _c("span", { staticClass: "glyphicon glyphicon-briefcase" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-2 glyph-container" }, [
      _c("span", { staticClass: "glyphicon glyphicon-envelope" })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-2 glyph-container" }, [
      _c("span", { staticClass: "glyphicon glyphicon-pencil" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9ec25dd4", esExports)
  }
}

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/@jacobmischka/vue-flatpickr/dist/index.js'");

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(25);
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

/***/ 46:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 47:
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

/***/ 48:
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
    require("vue-hot-reload-api")      .rerender("data-v-8d03363a", esExports)
  }
}

/***/ }),

/***/ 49:
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
    require("vue-hot-reload-api")      .rerender("data-v-4ff56c56", esExports)
  }
}

/***/ }),

/***/ 5:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AlertList_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ff56c56_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AlertList_vue__ = __webpack_require__(49);
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4ff56c56_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AlertList_vue__["a" /* default */],
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
    hotAPI.createRecord("data-v-4ff56c56", Component.options)
  } else {
    hotAPI.reload("data-v-4ff56c56", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 50:
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

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createAlumni"] = createAlumni;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_Alumni_Edit_vue__ = __webpack_require__(301);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Subscription_vue__ = __webpack_require__(823);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(1);









function createAlumni(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			defaultAlum: {
				type: Object,
				required: true
			},
			hash: {
				type: String,
				required: true
			}
		},
		propsData: propsData,
		data: {
			alum: propsData.defaultAlum,
			show: {
				edit: true,
				sub: true
			}
		},

		computed: {
			editSaveUrl: function editSaveUrl() {
				return '/alumni/hash/' + this.hash;
			},
			subSaveUrl: function subSaveUrl() {
				return '/alumni/subscription/' + this.hash;
			}
		},

		methods: {
			reloadAlum: function reloadAlum() {
				var _this = this;

				fetch('/alumni/hash/' + this.hash, {
					method: 'GET',
					headers: Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["t" /* jsonOrThrow */]).then(function (alum) {
					_this.alum = alum;
					_this.alerts.push({
						type: 'success',
						text: 'Profile information saved successfully!'
					});
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem reloading the alum data'
					});
				});
			},
			reloadEditAlum: function reloadEditAlum() {
				this.show.edit = false;
				this.reloadAlum();
			}
		},

		components: {
			EditAlumni: __WEBPACK_IMPORTED_MODULE_2__vue_components_Alumni_Edit_vue__["a" /* default */],
			AlumniSubscription: __WEBPACK_IMPORTED_MODULE_3__vue_components_Alumni_Subscription_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Subscription_vue__ = __webpack_require__(824);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8e5d72ae_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Subscription_vue__ = __webpack_require__(825);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Subscription_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8e5d72ae_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Subscription_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Alumni/Subscription.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		alum: {
			type: Object,
			required: true
		},
		saveUrl: {
			type: String,
			required: true
		}
	},

	methods: {
		toggleSub: function toggleSub() {
			var _this = this;

			fetch(this.saveUrl, {
				method: 'POST', // PATCH
				headers: Object(__WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify({
					_method: 'PATCH',
					do_not_contact: !this.alum.do_not_contact
				})
			}).then(__WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["w" /* okOrThrow */]).then(function () {
				_this.$emit('reload');
			}).catch(function (err) {
				console.error(err);
				_this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem updating your subscription'
				});
			});
		}
	}
});

/***/ }),

/***/ 825:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container body-block" }, [
    _c("h2", [_vm._v("MCW Alumni subscription")]),
    _vm._v(" "),
    _vm.alum.do_not_contact
      ? _c("div", [
          _c("p", [
            _vm._v(
              "\n\t\t\tYou are successfully unsubscribed from receiving emails from us.\n\t\t\tWe're sorry to see you go!\n\t\t"
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "btn-lg-submit-container" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-success",
                attrs: { type: "button" },
                on: { click: _vm.toggleSub }
              },
              [
                _c("span", { staticClass: "glyphicon glyphicon-plus" }),
                _vm._v("\n\t\t\t\tSubscribe\n\t\t\t")
              ]
            )
          ])
        ])
      : _c("div", [
          _c("p", [
            _vm._v(
              "\n\t\t\tAre you sure you would like to unsubscribe from all\n\t\t\talumni contact from MCW Anesthesiology?\n\t\t"
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "btn-lg-submit-container" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-danger",
                attrs: { type: "button" },
                on: { click: _vm.toggleSub }
              },
              [
                _c("span", { staticClass: "glyphicon glyphicon-remove" }),
                _vm._v("\n\t\t\t\tUnsubscribe\n\t\t\t")
              ]
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
    require("vue-hot-reload-api")      .rerender("data-v-8e5d72ae", esExports)
  }
}

/***/ })

},[822]);
});
//# sourceMappingURL=vue-alumni.js.map