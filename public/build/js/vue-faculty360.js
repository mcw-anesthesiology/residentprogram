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

/***/ 122:
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
    require("vue-hot-reload-api")      .rerender("data-v-2434126b", esExports)
  }
}

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 124:
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
//
//
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

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "btn",
      attrs: { type: "button" },
      on: {
        click: function($event) {
          _vm.$emit("input", !_vm.value)
        }
      }
    },
    [
      _vm._t("left-glyph"),
      _vm._v(" "),
      _vm.value
        ? _vm._t("true", [_vm._v("\n\t\tHide\n\t")])
        : _vm._t("false", [_vm._v("\n\t\tShow\n\t")]),
      _vm._v(" "),
      _vm._t("default", [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t")]),
      _vm._v(" "),
      _vm._t("glyph", [
        _c("span", { staticClass: "glyphicon glyphicon-triangle-bottom" })
      ])
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
    require("vue-hot-reload-api")      .rerender("data-v-38459c74", esExports)
  }
}

/***/ }),

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

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilder_vue__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c14a78c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilder_vue__ = __webpack_require__(188);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(175)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2c14a78c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilder_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c14a78c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilder_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/FormBuilder/FormBuilder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 175:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			title: this.oldFormContents ? this.oldFormContents.title : '',
			formType: this.oldFormContents ? this.oldFormContents.formType : this.fixedFormType || this.defaultFormType || 'resident',
			periodType: this.fixedPeriodType || this.defaultPeriodType || 'month',
			nextQuestionIdNum: 1,
			groupedMilestones: [],
			competencies: [],
			items: this.oldFormContents ? this.oldFormContents.items : [],
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
			Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["i" /* fetchMilestoneGroups */])().then(function (milestoneGroups) {
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
		formTypes: function formTypes() {
			return {
				resident: 'Resident/Intern',
				'self-resident': 'Resident/Intern (self)',
				fellow: 'Fellow',
				'self-fellow': 'Fellow (self)',
				faculty: 'Faculty',
				staff: 'Staff',
				app: 'APP'
			};
		},
		periodTypes: function periodTypes() {
			return ['month', 'quarter', 'year'];
		},
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
		ucfirst: __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["H" /* ucfirst */],
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
		FormBuilderInstruction: __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__["a" /* default */],
		FormBuilderQuestion: __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__["a" /* default */],
		AlertList: __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__["a" /* default */],
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_4__ConfirmationButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilderInstruction_vue__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b07925b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilderInstruction_vue__ = __webpack_require__(179);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilderInstruction_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b07925b8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilderInstruction_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/FormBuilder/FormBuilderInstruction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 178:
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
//
//
//
//
//
//
//
//
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
	props: ['text'],
	data: function data() {
		return {};
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', event.target.value);
		}
	}
});

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-instruction-block panel panel-default form-block" },
    [
      _c("div", { staticClass: "panel-heading" }, [
        _c("div", { staticClass: "row" }, [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-1 col-md-offset-1" }, [
            _c(
              "button",
              {
                staticClass: "form-block-delete btn btn-danger del-btn",
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    _vm.$emit("remove")
                  }
                }
              },
              [_vm._v("Delete")]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "panel-body" }, [
        _c("textarea", {
          staticClass: "form-control form-instruction-text",
          attrs: { required: "" },
          domProps: { value: _vm.text },
          on: {
            input: function($event) {
              _vm.$emit("change", { text: $event.target.value })
            }
          }
        })
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-10" }, [
      _c("h3", { staticClass: "panel-title" }, [
        _vm._v("\n\t\t\t\t\tInstruction block\n\t\t\t\t")
      ]),
      _vm._v(" "),
      _c("small", [
        _vm._v("\n\t\t\t\t\tSupports\n\t\t\t\t\t"),
        _c(
          "a",
          {
            attrs: {
              href: "http://daringfireball.net/projects/markdown/basics",
              target: "_blank"
            }
          },
          [_vm._v("\n\t\t\t\t\t\t\tmarkdown\n\t\t\t\t\t")]
        ),
        _vm._v("\n\t\t\t\t\t(except inline HTML)\n\t\t\t\t")
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b07925b8", esExports)
  }
}

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilderQuestion_vue__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e2c7d180_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilderQuestion_vue__ = __webpack_require__(187);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(181)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e2c7d180"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilderQuestion_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e2c7d180_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilderQuestion_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/FormBuilder/FormBuilderQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 181:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SelectTwo_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			}).sort(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["G" /* sortSelect2Objects */]);
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
					options = __WEBPACK_IMPORTED_MODULE_4__modules_constants_js__["i" /* STANDARD_OPTIONS */].RESIDENT.slice();
					break;
				case 'fellow':
				case 'self-fellow':
					options = __WEBPACK_IMPORTED_MODULE_4__modules_constants_js__["i" /* STANDARD_OPTIONS */].FELLOW.slice();
					break;
				case 'faculty':
					if (this.questionType === 'radiononnumeric') options = __WEBPACK_IMPORTED_MODULE_4__modules_constants_js__["i" /* STANDARD_OPTIONS */].FACULTY.slice();
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
		FormBuilderOption: __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__["a" /* default */],
		AlertList: __WEBPACK_IMPORTED_MODULE_1__AlertList_vue__["a" /* default */],
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_2__ConfirmationButton_vue__["a" /* default */],
		SelectTwo: __WEBPACK_IMPORTED_MODULE_3__SelectTwo_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilderOption_vue__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_855ce662_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilderOption_vue__ = __webpack_require__(186);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(184)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-855ce662"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormBuilderOption_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_855ce662_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormBuilderOption_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/FormBuilder/FormBuilderOption.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 184:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 185:
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
//
//
//
//
//
//
//
//
//
//
//
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
});

/***/ }),

/***/ 186:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass:
        "form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center",
      class: {
        "working-option": _vm.isWorkingOption,
        "is-focused": _vm.isFocused
      }
    },
    [
      _c("input", { attrs: { type: _vm.displayType, disabled: "" } }),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-input form-option form-option-text form-control",
        attrs: { type: "text", placeholder: "Option Text" },
        domProps: { value: _vm.text },
        on: {
          input: function($event) {
            _vm.$emit("input", { text: $event.target.value })
          },
          change: function($event) {
            _vm.$emit("change", { text: $event.target.value })
          },
          focus: function($event) {
            _vm.handleInputFocus("text")
          },
          blur: function($event) {
            _vm.handleInputBlur("text")
          }
        }
      }),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-input form-option form-option-value form-control",
        attrs: {
          type: _vm.type === "radio" ? "number" : "text",
          placeholder: "Option Value"
        },
        domProps: { value: _vm.value },
        on: {
          input: function($event) {
            _vm.$emit("input", { value: $event.target.value })
          },
          change: function($event) {
            _vm.$emit("change", { value: $event.target.value })
          },
          focus: function($event) {
            _vm.handleInputFocus("value")
          },
          blur: function($event) {
            _vm.handleInputBlur("value")
          }
        }
      }),
      _vm._v(" "),
      _c("textarea", {
        staticClass:
          "form-input form-option form-option-description form-control",
        attrs: { placeholder: "Hover Description" },
        domProps: { value: _vm.description },
        on: {
          input: function($event) {
            _vm.$emit("input", { description: $event.target.value })
          },
          change: function($event) {
            _vm.$emit("change", { description: $event.target.value })
          },
          focus: function($event) {
            _vm.handleInputFocus("description")
          },
          blur: function($event) {
            _vm.handleInputBlur("description")
          }
        }
      })
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-855ce662", esExports)
  }
}

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-question panel panel-default form-block",
      attrs: { id: _vm.questionId }
    },
    [
      _c(
        "div",
        { staticClass: "panel-heading form-horizontal" },
        [
          _c("div", { staticClass: "panel-title form-group" }, [
            _c("div", { staticClass: "col-sm-12" }, [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\t\t\tQuestion Text\n\t\t\t\t\t"),
                _c("div", { staticClass: "input-group" }, [
                  _c("span", { staticClass: "question-id input-group-addon" }, [
                    _vm._v(_vm._s(_vm.questionId))
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    staticClass: "form-input form-question-text form-control",
                    attrs: {
                      type: "text",
                      placeholder: "Question Text",
                      required: ""
                    },
                    domProps: { value: _vm.text },
                    on: {
                      input: function($event) {
                        _vm.$emit("change", { text: $event.target.value })
                      }
                    }
                  })
                ])
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "hr-question" }),
          _vm._v(" "),
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-md-4" }, [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\t\t\tQuestion Type\n\t\t\t\t\t"),
                _c(
                  "select",
                  {
                    staticClass: "form-control form-question-type",
                    attrs: { name: "questionType" },
                    domProps: { value: _vm.questionType },
                    on: { change: _vm.changeQuestionType }
                  },
                  [
                    _c("option", { attrs: { value: "radio" } }, [
                      _vm._v("Radio")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "text" } }, [
                      _vm._v("Text")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "radiononnumeric" } }, [
                      _vm._v("Radio (non-numeric)")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "number" } }, [
                      _vm._v("Number")
                    ]),
                    _vm._v(" "),
                    _c("option", { attrs: { value: "checkbox" } }, [
                      _vm._v("Checkbox")
                    ])
                  ]
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-6" }, [
              _c("label", [_vm._v("Question Options")]),
              _vm._v(" "),
              _c("div", { staticClass: "btn-group btn-group-justified" }, [
                _c("div", { staticClass: "btn-group" }, [
                  _c(
                    "button",
                    {
                      staticClass:
                        "form-question-standard-options btn btn-info",
                      attrs: { type: "button" },
                      on: { click: _vm.setStandardOptions }
                    },
                    [_vm._v("\n\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t")]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "btn-group" }, [
                  _c(
                    "button",
                    {
                      staticClass:
                        "form-question-milestone-level-options btn btn-info",
                      attrs: {
                        disabled:
                          !_vm.milestones || _vm.milestones.length !== 1,
                        type: "button"
                      },
                      on: { click: _vm.setMilestoneOptions }
                    },
                    [_vm._v("\n\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t")]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "btn-group" }, [
                  _c(
                    "button",
                    {
                      staticClass: "form-question-custom-options btn btn-info",
                      attrs: {
                        disabled:
                          !_vm.customOptions || _vm.customOptions.length < 1,
                        type: "button"
                      },
                      on: { click: _vm.setCustomOptions }
                    },
                    [_vm._v("\n\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t")]
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-md-1 labelless-button" },
              [
                _c(
                  "confirmation-button",
                  {
                    staticClass: "form-block-delete btn",
                    attrs: {
                      "unpressed-class": "btn-danger",
                      "pressed-class": "btn-warning"
                    },
                    on: {
                      click: function($event) {
                        _vm.$emit("remove")
                      }
                    }
                  },
                  [
                    _vm._v("\n\t\t\t\t\tDelete\n\t\t\t\t\t"),
                    _c(
                      "template",
                      { attrs: { slot: "pressed" }, slot: "pressed" },
                      [_vm._v("\n\t\t\t\t\t\tConfirm\n\t\t\t\t\t")]
                    )
                  ],
                  2
                )
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-1" }, [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\t\t\tRequired\n\t\t\t\t\t"),
                _c("input", {
                  staticClass: "form-control form-question-required",
                  attrs: { type: "checkbox", value: "required" },
                  domProps: { checked: _vm.required },
                  on: {
                    change: function($event) {
                      _vm.$emit("change", { required: $event.target.checked })
                    }
                  }
                })
              ])
            ])
          ]),
          _vm._v(" "),
          _vm.showMilestonesCompetencies
            ? [
                _c("div", { staticClass: "hr-question" }),
                _vm._v(" "),
                _c("div", { staticClass: "row" }, [
                  _c("div", { staticClass: "col-md-8" }, [
                    _c(
                      "label",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.shouldShowMilestonesAndCompetencies,
                            expression: "shouldShowMilestonesAndCompetencies"
                          }
                        ],
                        staticClass: "containing-label"
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t\t"
                        ),
                        _c("select-two", {
                          staticClass: "form-control form-question-milestone",
                          attrs: {
                            value: _vm.milestones,
                            options: _vm.groupedMilestones,
                            multiple: true
                          },
                          on: {
                            input: function($event) {
                              _vm.$emit("change", { milestones: arguments[0] })
                            }
                          }
                        })
                      ],
                      1
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-md-4" }, [
                    _c(
                      "label",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: _vm.shouldShowMilestonesAndCompetencies,
                            expression: "shouldShowMilestonesAndCompetencies"
                          }
                        ],
                        staticClass: "containing-label"
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t\tQuestion Competency\n\t\t\t\t\t\t"
                        ),
                        _c("select-two", {
                          staticClass: "form-control form-question-competency",
                          attrs: {
                            value: _vm.competencies,
                            placeholder: "Competency",
                            options: _vm.competencyOptions,
                            multiple: true
                          },
                          on: {
                            input: function($event) {
                              _vm.$emit("change", {
                                competencies: arguments[0]
                              })
                            }
                          }
                        })
                      ],
                      1
                    )
                  ])
                ])
              ]
            : _vm._e()
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "panel-body" }, [
        _c(
          "div",
          {
            staticClass: "row form-options",
            staticStyle: { "margin-bottom": "5px" }
          },
          [
            ["radio", "radiononnumeric", "checkbox"].includes(_vm.questionType)
              ? _vm._l(_vm.optionsWithWorking, function(option, index) {
                  return _c(
                    "form-builder-option",
                    _vm._b(
                      {
                        key: index,
                        attrs: {
                          type: _vm.questionType,
                          "is-working-option": option === _vm.workingOption
                        },
                        on: {
                          input: function($event) {
                            _vm.handleWorkingOptionInput(index, arguments[0])
                          },
                          change: function($event) {
                            _vm.handleOptionChange(index, arguments[0])
                          }
                        }
                      },
                      "form-builder-option",
                      option,
                      false
                    )
                  )
                })
              : _vm._e(),
            _vm._v(" "),
            _vm.questionType === "text"
              ? _c("div", { staticClass: "col-sm-12" }, [
                  _c("textarea", {
                    staticClass: "form-control",
                    attrs: { placeholder: "Text", disabled: "" }
                  })
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.questionType === "number"
              ? _c("div", { staticClass: "col-md-8" }, [
                  _c("input", {
                    staticClass: "form-control",
                    attrs: {
                      type: "number",
                      placeholder: "Number",
                      disabled: ""
                    }
                  })
                ])
              : _vm._e()
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("alert-list", {
        model: {
          value: _vm.alerts,
          callback: function($$v) {
            _vm.alerts = $$v
          },
          expression: "alerts"
        }
      })
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
    require("vue-hot-reload-api")      .rerender("data-v-e2c7d180", esExports)
  }
}

/***/ }),

/***/ 188:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-header" }, [
    _c("div", { staticClass: "container-fluid" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { class: _vm.fixedFormType ? "col-md-9" : "col-md-6" }, [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "form-title" } }, [
              _vm._v("Form title")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model.trim",
                  value: _vm.title,
                  expression: "title",
                  modifiers: { trim: true }
                }
              ],
              staticClass: "form-control input-lg",
              attrs: {
                type: "text",
                id: "form-title",
                name: "formTitle",
                placeholder: "Form Title",
                required: ""
              },
              domProps: { value: _vm.title },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.title = $event.target.value.trim()
                },
                blur: function($event) {
                  _vm.$forceUpdate()
                }
              }
            })
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          !_vm.fixedFormType
            ? _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "form-type" } }, [
                  _vm._v("Form type")
                ]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.formType,
                        expression: "formType"
                      }
                    ],
                    staticClass: "form-control input-lg",
                    attrs: { id: "form-type", name: "form_type" },
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
                        _vm.formType = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      }
                    }
                  },
                  _vm._l(_vm.formTypes, function(displayText, type) {
                    return _c("option", { domProps: { value: type } }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t\t" +
                          _vm._s(displayText) +
                          "\n\t\t\t\t\t\t"
                      )
                    ])
                  })
                )
              ])
            : _vm._e()
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-3" }, [
          !_vm.fixedPeriodType
            ? _c("div", { staticClass: "form-group" }, [
                _c("label", { attrs: { for: "form-period-type" } }, [
                  _vm._v("Evaluation period type")
                ]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.periodType,
                        expression: "periodType"
                      }
                    ],
                    staticClass: "form-control input-lg",
                    attrs: { id: "form-period-type" },
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
                        _vm.periodType = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      }
                    }
                  },
                  _vm._l(_vm.periodTypes, function(type) {
                    return _c("option", { domProps: { value: type } }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t\t" +
                          _vm._s(_vm.ucfirst(type)) +
                          "\n\t\t\t\t\t\t"
                      )
                    ])
                  })
                )
              ])
            : _vm._e()
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "form-body" }, [
      _c(
        "div",
        { staticClass: "form-items" },
        [
          _vm._l(_vm.items, function(item, index) {
            return [
              _c(
                "div",
                { staticClass: "form-item" },
                [
                  item.type === "instruction"
                    ? _c(
                        "form-builder-instruction",
                        _vm._b(
                          {
                            on: {
                              change: function($event) {
                                _vm.changeItem(index, $event)
                              },
                              input: function($event) {
                                _vm.changeItem(index, $event)
                              },
                              remove: function($event) {
                                _vm.removeItem(index)
                              }
                            }
                          },
                          "form-builder-instruction",
                          item,
                          false
                        )
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  item.type === "question"
                    ? _c(
                        "form-builder-question",
                        _vm._b(
                          {
                            attrs: {
                              "form-type": _vm.formType,
                              "grouped-milestones": _vm.groupedMilestones,
                              "all-competencies": _vm.competencies,
                              "custom-options": _vm.customOptions,
                              "show-milestones-competencies":
                                _vm.showMilestonesCompetencies
                            },
                            on: {
                              change: function($event) {
                                _vm.changeItem(index, $event)
                              },
                              remove: function($event) {
                                _vm.removeItem(index)
                              }
                            }
                          },
                          "form-builder-question",
                          item,
                          false
                        )
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("div", { staticClass: "btn-group-vertical" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-default",
                        attrs: { type: "button", disabled: index === 0 },
                        on: {
                          click: function($event) {
                            _vm.moveItem(index, index - 1)
                          }
                        }
                      },
                      [
                        _c("span", {
                          staticClass: "glyphicon glyphicon-arrow-up"
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-default",
                        attrs: {
                          type: "button",
                          disabled: index === _vm.items.length - 1
                        },
                        on: {
                          click: function($event) {
                            _vm.moveItem(index, index + 1)
                          }
                        }
                      },
                      [
                        _c("span", {
                          staticClass: "glyphicon glyphicon-arrow-down"
                        })
                      ]
                    )
                  ])
                ],
                1
              )
            ]
          })
        ],
        2
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { attrs: { id: "form-footer" } },
      [
        _c("alert-list", {
          model: {
            value: _vm.alerts,
            callback: function($$v) {
              _vm.alerts = $$v
            },
            expression: "alerts"
          }
        }),
        _vm._v(" "),
        _c(
          "div",
          [
            _c(
              "button",
              {
                staticClass: "btn btn-default",
                attrs: { type: "button", id: "add-instruction-block" },
                on: { click: _vm.addInstruction }
              },
              [
                _c("span", { staticClass: "glyphicon glyphicon-pencil" }),
                _vm._v("\n\t\t\t\tAdd instruction block\n\t\t\t")
              ]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-info",
                attrs: { type: "button", id: "addQuestion" },
                on: { click: _vm.addQuestion }
              },
              [
                _c("span", {
                  staticClass: "glyphicon glyphicon-question-sign"
                }),
                _vm._v("\n\t\t\t\tAdd question\n\t\t\t")
              ]
            ),
            _vm._v(" "),
            _c(
              "show-hide-button",
              {
                staticClass: "btn btn-default",
                model: {
                  value: _vm.show.customOptionsEditor,
                  callback: function($$v) {
                    _vm.show.customOptionsEditor = $$v
                  },
                  expression: "show.customOptionsEditor"
                }
              },
              [_vm._v("\n\t\t\t\tcustom options editor\n\t\t\t")]
            )
          ],
          1
        ),
        _vm._v(" "),
        _vm.show.customOptionsEditor
          ? _c("div", { staticClass: "custom-options-editor-container" }, [
              _c("textarea", {
                staticClass: "custom-options-editor form-control",
                attrs: { rows: "10" },
                domProps: { value: _vm.customOptionsString },
                on: { change: _vm.changeCustomOptions }
              })
            ])
          : _vm._e(),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "btn-lg-submit-container" },
          [
            _c(
              "confirmation-button",
              {
                staticClass: "btn btn-lg btn-primary",
                on: { click: _vm.submitForm }
              },
              [_vm._v("\n\t\t\t\tSubmit form\n\t\t\t")]
            )
          ],
          1
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2c14a78c", esExports)
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

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReaderQuestionOption_vue__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_587e8505_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReaderQuestionOption_vue__ = __webpack_require__(196);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReaderQuestionOption_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_587e8505_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReaderQuestionOption_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/FormReader/FormReaderQuestionOption.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snarkdown__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		snarkdown: __WEBPACK_IMPORTED_MODULE_0_snarkdown__["default"],
		handleInput: function handleInput(event) {
			this.$emit('input', { checked: event.target.checked });
		}
	}
});

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "question-option" },
    [
      _c("label", [
        _c("span", { attrs: { title: _vm.description } }, [
          _vm.questionType === "checkbox"
            ? _c("input", {
                attrs: {
                  type: "checkbox",
                  name: _vm.questionId + "[]",
                  required: _vm.required,
                  disabled: _vm.readonly
                },
                domProps: { value: _vm.value, checked: _vm.checked },
                on: { change: _vm.handleInput }
              })
            : _c("input", {
                attrs: {
                  type: "radio",
                  name: _vm.questionId,
                  required: _vm.required,
                  disabled: _vm.readonly
                },
                domProps: { value: _vm.value, checked: _vm.checked },
                on: { change: _vm.handleInput }
              }),
          _vm._v(" "),
          _c("br"),
          _vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")
        ])
      ]),
      _vm._v(" "),
      _vm.description
        ? _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.showDescription,
                expression: "showDescription"
              }
            ],
            staticClass: "description well",
            domProps: { innerHTML: _vm._s(_vm.snarkdown(_vm.description)) }
          })
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
    require("vue-hot-reload-api")      .rerender("data-v-587e8505", esExports)
  }
}

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReader_vue__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_439e6c2c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReader_vue__ = __webpack_require__(316);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(311)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-439e6c2c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReader_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_439e6c2c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReader_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/FormReader/FormReader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/snarkdown/dist/snarkdown.es.js'");

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

/***/ 311:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 312:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormReaderQuestion_vue__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_snarkdown__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		snarkdown: __WEBPACK_IMPORTED_MODULE_1_snarkdown__["default"],
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
		FormReaderQuestion: __WEBPACK_IMPORTED_MODULE_0__FormReaderQuestion_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 313:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReaderQuestion_vue__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7112f620_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReaderQuestion_vue__ = __webpack_require__(315);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReaderQuestion_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7112f620_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReaderQuestion_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/FormReader/FormReaderQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 314:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_snarkdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormReaderQuestionOption_vue__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			return !this.readonly && this.isOptionQuestion && !this.required;
		},
		showFooter: function showFooter() {
			return this.hasDescriptions || this.resettable;
		},
		isOptionQuestion: function isOptionQuestion() {
			return ['radio', 'radiononnumeric', 'checkbox'].includes(this.questionType);
		},
		renderedText: function renderedText() {
			return Object(__WEBPACK_IMPORTED_MODULE_0_snarkdown__["default"])(this.text.replace('{{', '`{{').replace('}}', '}}`'));
		}
	},

	methods: {
		ucfirst: __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["H" /* ucfirst */],
		resetOptions: function resetOptions() {
			if (this.readonly) return;

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
		FormReaderQuestionOption: __WEBPACK_IMPORTED_MODULE_1__FormReaderQuestionOption_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      class:
        "question panel " + (_vm.required ? "panel-primary" : "panel-default")
    },
    [
      _vm.text
        ? _c("div", { staticClass: "question-header panel-heading" }, [
            _c("h3", { staticClass: "question-title panel-title" }, [
              _c("b", [_vm._v(_vm._s(_vm.ucfirst(_vm.questionId)) + ": ")]),
              _vm._v(" "),
              _c("span", { domProps: { innerHTML: _vm._s(_vm.renderedText) } })
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "question-body panel-body" },
        [
          _vm.isOptionQuestion
            ? _vm._l(_vm.options, function(option, index) {
                return _c(
                  "form-reader-question-option",
                  _vm._b(
                    {
                      key: index,
                      attrs: {
                        questionType: _vm.questionType,
                        questionId: _vm.questionId,
                        required: _vm.required,
                        showDescription: _vm.showDescriptions,
                        readonly: _vm.readonly
                      },
                      on: {
                        input: function($event) {
                          _vm.handleOptionInput(index, arguments[0])
                        }
                      }
                    },
                    "form-reader-question-option",
                    option,
                    false
                  )
                )
              })
            : _c("div", { staticClass: "question-option" }, [
                _vm.questionType === "text"
                  ? _c("textarea", {
                      staticClass: "form-control",
                      attrs: {
                        name: _vm.questionId,
                        required: _vm.required,
                        readonly: _vm.readonly
                      },
                      domProps: { value: _vm.value },
                      on: { input: _vm.handleInput }
                    })
                  : _vm._e(),
                _vm._v(" "),
                _vm.questionType === "number"
                  ? _c("input", {
                      staticClass: "form-control",
                      attrs: {
                        type: "number",
                        name: _vm.questionId,
                        required: _vm.required,
                        readonly: _vm.readonly
                      },
                      domProps: { value: _vm.value },
                      on: { input: _vm.handleInput }
                    })
                  : _vm._e()
              ])
        ],
        2
      ),
      _vm._v(" "),
      _vm.showFooter
        ? _c("div", { staticClass: "question-footer panel-footer" }, [
            _c(
              "div",
              [
                _vm.hasDescriptions
                  ? _c(
                      "show-hide-button",
                      {
                        staticClass: "btn btn-info",
                        model: {
                          value: _vm.showDescriptions,
                          callback: function($$v) {
                            _vm.showDescriptions = $$v
                          },
                          expression: "showDescriptions"
                        }
                      },
                      [_vm._v("\n\t\t\t\tdescriptions\n\t\t\t")]
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.resettable
                  ? _c(
                      "button",
                      {
                        staticClass: "btn btn-default",
                        attrs: { type: "button", disabled: !_vm.hasResponse },
                        on: { click: _vm.resetOptions }
                      },
                      [_vm._v("\n\t\t\t\tReset response\n\t\t\t")]
                    )
                  : _vm._e()
              ],
              1
            ),
            _vm._v(" "),
            _vm.resettable ? _c("div", [_vm._m(0)]) : _vm._e()
          ])
        : _vm._e()
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", [
      _c("small", [
        _vm._v(
          "\n\t\t\t\t\tIf you do not feel you are able to accurately respond to\n\t\t\t\t\tthis question, please do not select any response.\n\t\t\t\t\tIf you would like to clear your response, please press\n\t\t\t\t\tthe "
        ),
        _c("i", [_vm._v("Reset response")]),
        _vm._v(" button above.\n\t\t\t\t")
      ])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7112f620", esExports)
  }
}

/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.title
        ? _c("h2", [_vm._v("\n\t\t" + _vm._s(_vm.title) + "\n\t")])
        : _vm._e(),
      _vm._v(" "),
      _vm._l(_vm.contents.items, function(item, index) {
        return [
          item.type === "question"
            ? _c(
                "form-reader-question",
                _vm._b(
                  {
                    key: index,
                    attrs: { readonly: _vm.readonly },
                    on: {
                      input: function($event) {
                        _vm.handleInput(index, arguments[0])
                      }
                    }
                  },
                  "form-reader-question",
                  item,
                  false
                )
              )
            : _vm._e(),
          _vm._v(" "),
          item.type === "instruction"
            ? _c("div", {
                staticClass: "instruction-block",
                domProps: { innerHTML: _vm._s(_vm.snarkdown(item.text)) }
              })
            : _vm._e()
        ]
      }),
      _vm._v(" "),
      !_vm.readonly
        ? _c("div", { staticClass: "btn-lg-submit-container" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-default",
                attrs: { type: "button" },
                on: { click: _vm.handleSave }
              },
              [_vm._v("\n\t\t\tSave\n\t\t")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-primary",
                attrs: { type: "button", disabled: !_vm.formIsValid },
                on: { click: _vm.handleSubmit }
              },
              [_vm._v("\n\t\t\tSubmit\n\t\t")]
            )
          ])
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-439e6c2c", esExports)
  }
}

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SelectTwo_vue__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2434126b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SelectTwo_vue__ = __webpack_require__(122);
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2434126b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SelectTwo_vue__["a" /* default */],
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
    hotAPI.createRecord("data-v-2434126b", Component.options)
  } else {
    hotAPI.reload("data-v-2434126b", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


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

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_isEqual__ = __webpack_require__(54);
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
			if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_isEqual__["default"])(val, _this.stringValue)) _this.$emit('input', val);
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

/***/ 54:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/lodash/isEqual.js'");

/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ShowHideButton_vue__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38459c74_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ShowHideButton_vue__ = __webpack_require__(125);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(123)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-38459c74"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ShowHideButton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38459c74_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ShowHideButton_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ShowHideButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 720:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__create_request_js__ = __webpack_require__(721);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360Request", function() { return __WEBPACK_IMPORTED_MODULE_0__create_request_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create_form_js__ = __webpack_require__(722);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360CreateForm", function() { return __WEBPACK_IMPORTED_MODULE_1__create_form_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__view_form_js__ = __webpack_require__(723);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360ViewForm", function() { return __WEBPACK_IMPORTED_MODULE_2__view_form_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__evaluate_js__ = __webpack_require__(724);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360Evaluate", function() { return __WEBPACK_IMPORTED_MODULE_3__evaluate_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__view_evaluation_js__ = __webpack_require__(726);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFaculty360ViewEvaluation", function() { return __WEBPACK_IMPORTED_MODULE_4__view_evaluation_js__["a"]; });






/***/ }),

/***/ 721:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360Request;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);







function createFaculty360Request(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
				faculty.sort(Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["E" /* sortPropIgnoreCase */])('full_name'));

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
					headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
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
					_this.alerts.push(Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["c" /* errorToAlert */])(err));
				});
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			SelectTwo: __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 722:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360CreateForm;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormBuilder_FormBuilder_vue__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);







function createFaculty360CreateForm(el) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
					headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify(form)
				}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["t" /* jsonOrThrow */]).then(function (response) {
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
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			FormBuilder: __WEBPACK_IMPORTED_MODULE_2__vue_components_FormBuilder_FormBuilder_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 723:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360ViewForm;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__ = __webpack_require__(212);





function createFaculty360ViewForm(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			FormReader: __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 724:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360Evaluate;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_evaluation_utils_js__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__ = __webpack_require__(52);









var questionTemplates = new Map([['{{ subject_name }}', function (evaluation) {
	return evaluation.subject.full_name;
}], ['{{ subject_first }}', function (evaluation) {
	return evaluation.subject.first_name;
}], ['{{ subject_last }}', function (evaluation) {
	return evaluation.subject.last_name;
}]]);

function createFaculty360Evaluate(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		el: el,
		props: {
			evaluation: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {
				contents: Object(__WEBPACK_IMPORTED_MODULE_4__modules_evaluation_utils_js__["a" /* processQuestionTemplates */])(this.evaluation, questionTemplates),

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
					headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						contents: form.contents
					})
				}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["t" /* jsonOrThrow */]).then(function () {
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
			},
			handleSubmit: function handleSubmit(form) {
				var _this2 = this;

				fetch('/faculty360/evaluations/' + this.evaluation.hash + '/submit', {
					method: 'POST', // PATCH
					headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'PATCH',
						contents: form.contents
					})
				}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["t" /* jsonOrThrow */]).then(function () {
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
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			FormReader: __WEBPACK_IMPORTED_MODULE_2__vue_components_FormReader_FormReader_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 725:
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

/***/ }),

/***/ 726:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFaculty360ViewEvaluation;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_FormReader_FormReader_vue__ = __webpack_require__(212);




function createFaculty360ViewEvaluation(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
			FormReader: __WEBPACK_IMPORTED_MODULE_1__vue_components_FormReader_FormReader_vue__["a" /* default */]
		}
	});
}

/***/ })

},[720]);
});
//# sourceMappingURL=vue-faculty360.js.map