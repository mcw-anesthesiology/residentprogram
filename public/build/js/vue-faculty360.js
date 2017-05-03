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

/***/ 106:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_SelectTwo_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = createRequest;






function createRequest(el, propsData) {
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
			}
		},
		data: function data() {
			return {
				facultyId: null,
				email: null,

				emailError: null
			};
		},

		propsData: propsData,

		computed: {
			emailIsValid: function emailIsValid() {
				return this.email && this.email.endsWith('@mcw.edu');
			},
			formIsValid: function formIsValid() {
				return this.facultyId && this.emailIsValid;
			},
			sortedFaculty: function sortedFaculty() {
				var faculty = this.faculty.slice();
				faculty.sort(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["a" /* sortPropIgnoreCase */])('full_name'));

				return faculty;
			}
		},

		methods: {
			validateEmail: function validateEmail() {
				if (!this.email || this.emailIsValid) this.emailError = null;

				this.emailError = 'Please enter your mcw.edu email address';
			},
			handleSubmit: function handleSubmit() {
				var _this = this;

				fetch('/faculty360', {
					method: 'POST',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["b" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						faculty_id: this.facultyId,
						email: this.email
					})
				}).then(function (response) {
					if (response.ok) return response.json();

					if (response.status === 403) throw new Error("You're not currently elligible to evaluate faculty");

					if (response.status === 400) throw new Error('Please select a faculty member to evaluate and enter your email address');

					throw new Error('There was a problem creating the evaluation');
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["c" /* errorToAlert */])(err));
				});
			}
		},

		components: {
			SelectTwo: __WEBPACK_IMPORTED_MODULE_1__vue_components_SelectTwo_vue___default.a
		}
	});
}

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(33),
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

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__create_request_js__ = __webpack_require__(106);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createRequest", function() { return __WEBPACK_IMPORTED_MODULE_0__create_request_js__["a"]; });


/***/ }),

/***/ 25:
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
			_this.$emit('input', $(_this.$el).val());
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

/***/ 33:
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

/***/ })

},[156]);
});
//# sourceMappingURL=vue-faculty360.js.map