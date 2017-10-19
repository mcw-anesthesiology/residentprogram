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
return webpackJsonp([5],{

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

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ValidatedFormGroup_vue__ = __webpack_require__(320);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_500d5102_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ValidatedFormGroup_vue__ = __webpack_require__(321);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ValidatedFormGroup_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_500d5102_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ValidatedFormGroup_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ValidatedFormGroup.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-500d5102", Component.options)
  } else {
    hotAPI.reload("data-v-500d5102", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 129:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/flatpickr/dist/flatpickr.css'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

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

/***/ 135:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_downloadjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_report_utils_js__ = __webpack_require__(38);
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
					return Object(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["d" /* escapeCsv */])(cell.toString());
				}).join(',');
			}).sort(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["B" /* sortIgnoreCase */]);
			var table = header.concat(rows);
			Object(__WEBPACK_IMPORTED_MODULE_0_downloadjs__["default"])(table.join('\n'), this.exportFilename + '.csv', 'text/csv');
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

/***/ 137:
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
    require("vue-hot-reload-api")      .rerender("data-v-4d4c1aff", esExports)
  }
}

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConditionChecker;
/* harmony export (immutable) */ __webpack_exports__["b"] = getQuestions;
/* harmony export (immutable) */ __webpack_exports__["d"] = isValidItem;
/* unused harmony export isQuestion */
/* unused harmony export getQuestionnaireIdMap */
/* unused harmony export getQuestionsIdMap */
/* unused harmony export questionMatchesValue */
/* harmony export (immutable) */ __webpack_exports__["c"] = getSelectValue;
/* unused harmony export getRadioCheckboxValues */
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getConditionChecker(questions) {
	var questionIdMap = getQuestionsIdMap(questions);
	return function (condition) {
		return questionIdMap.has(condition.questionId) && questionMatchesValue(
		// $FlowFixMe: Okay flow I tested has right above here can you read
		questionIdMap.get(condition.questionId), condition.questionValue);
	};
}

function getQuestions(questionnaire) {
	var questions = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = questionnaire.sections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var section = _step.value;

			// $FlowFixMe: This is right but I can't prove it
			questions.push.apply(questions, _toConsumableArray(section.items.filter(isQuestion)));
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

	return questions;
}

function isValidItem(item) {
	return Boolean(item.type && typeof item.type === 'string' && (item.type === 'instruction' || isQuestion(item)));
}

function isQuestion(item) {
	return ['text', 'number', 'select', 'checkbox', 'radio', 'list'].includes(item.type);
}

function getQuestionnaireIdMap(questionnaire) {
	return getQuestionsIdMap(getQuestions(questionnaire));
}

function getQuestionsIdMap(questions) {
	var map = new Map();

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = questions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var question = _step2.value;

			if (question.id && !map.has(question.id)) map.set(question.id, question);
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

	return map;
}

function questionMatchesValue(question, value) {
	switch (question.type) {
		case 'text':
			question;
			if (typeof value === 'boolean' && question.value || typeof value === 'string' && value === question.value) return true;
			break;
		case 'number':
			question;
			if (typeof value === 'boolean' && question.value || typeof value === 'number' && value === question.value) return true;
			break;
		case 'select':
			{
				question;
				var selectValue = getSelectValue(question);
				if (typeof value === 'boolean' && selectValue || (typeof value === 'string' || typeof value === 'number') && value === selectValue) return true;
				break;
			}
		case 'checkbox':
		case 'radio':
			{
				question = question;
				var values = getRadioCheckboxValues(question);
				if (typeof value === 'boolean' && values.length > 0 || (typeof value === 'string' || typeof value === 'number') && values.includes(value)) return true;
				break;
			}
		case 'list':
			question;
			if (typeof value === 'boolean' && question.items.length > 0) return true;
			break;
	}

	return false;
}

function getSelectValue(question) {
	var selectedOption = question.options.find(function (option) {
		return option.selected;
	});
	return selectedOption ? selectedOption.value : null;
}

function getRadioCheckboxValues(question) {
	return question.options.filter(function (option) {
		return option.checked;
	}).map(function (option) {
		return option.value;
	});
}

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ListPaginator_vue__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lunr__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lunr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lunr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_report_utils_js__ = __webpack_require__(38);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		},
		sortFunctions: {
			type: Map,
			default: function _default() {
				return __WEBPACK_IMPORTED_MODULE_3__modules_report_utils_js__["k" /* sortFunctions */];
			}
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

			var index = Object(__WEBPACK_IMPORTED_MODULE_1_lunr__["default"])(function () {
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

				return __WEBPACK_IMPORTED_MODULE_3__modules_report_utils_js__["k" /* sortFunctions */].has(this.sortBy) ? this.filteredItems.sort(__WEBPACK_IMPORTED_MODULE_3__modules_report_utils_js__["k" /* sortFunctions */].get(this.sortBy)) : this.filteredItems.sort(function (a, b) {
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

			return Object(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["y" /* snakeCaseToWords */])(field);
		}
	},
	components: {
		ListPaginator: __WEBPACK_IMPORTED_MODULE_0__ListPaginator_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ListPaginator_vue__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_05c830ce_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ListPaginator_vue__ = __webpack_require__(156);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(151)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-05c830ce"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ListPaginator_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_05c830ce_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ListPaginator_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ListPaginator.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 151:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 152:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PaginatorLink_vue__ = __webpack_require__(153);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		PaginatorLink: __WEBPACK_IMPORTED_MODULE_0__PaginatorLink_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PaginatorLink_vue__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_115d9766_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PaginatorLink_vue__ = __webpack_require__(155);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PaginatorLink_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_115d9766_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PaginatorLink_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/PaginatorLink.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
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

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "button",
    {
      staticClass: "btn btn-default",
      attrs: { type: "button", href: "#", disabled: _vm.active },
      on: { click: _vm.emitPage }
    },
    [_vm._v("\n\t" + _vm._s(_vm.text || _vm.value + 1) + "\n")]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-115d9766", esExports)
  }
}

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "paginator" }, [
    _c("div", { staticClass: "form-inline" }, [
      _c("div", { staticClass: "form-group" }, [
        _c("label", { staticClass: "containing-label" }, [
          _vm._v("\n\t\t\t\tCurrent page:\n\t\t\t\t"),
          _c("input", {
            staticClass: "form-control",
            attrs: { type: "number", min: "1", max: _vm.paginatedItems.length },
            domProps: { value: _vm.value + 1 },
            on: {
              input: function($event) {
                _vm.$emit("input", Number($event.target.value) - 1)
              }
            }
          })
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "form-group" }, [
        _c("label", { staticClass: "containing-label" }, [
          _vm._v("\n\t\t\t\tItems per page:\n\t\t\t\t"),
          _c(
            "select",
            {
              staticClass: "form-control",
              domProps: { value: _vm.itemsPerPage },
              on: {
                input: function($event) {
                  _vm.$emit("pageSize", Number($event.target.value))
                }
              }
            },
            [
              _c("option", { attrs: { value: "5" } }, [_vm._v("5")]),
              _vm._v(" "),
              _c("option", { attrs: { value: "10" } }, [_vm._v("10")]),
              _vm._v(" "),
              _c("option", { attrs: { value: "20" } }, [_vm._v("20")]),
              _vm._v(" "),
              _c("option", { attrs: { value: "50" } }, [_vm._v("50")]),
              _vm._v(" "),
              _c("option", { attrs: { value: "100" } }, [_vm._v("100")])
            ]
          )
        ])
      ])
    ]),
    _vm._v(" "),
    _vm.itemsPerPage && _vm.paginatedItems.length > 1
      ? _c("nav", [
          _c(
            "div",
            { staticClass: "btn-group" },
            [
              _c("paginator-link", {
                attrs: {
                  value: _vm.value - 1,
                  text: "← Prev",
                  active: _vm.value === 0
                },
                on: { click: _vm.setPage }
              }),
              _vm._v(" "),
              _vm._l(_vm.paginatedItems, function(pageItems, pageNum) {
                return _c("paginator-link", {
                  key: pageNum,
                  attrs: { value: pageNum, active: pageNum === _vm.value },
                  on: { click: _vm.setPage }
                })
              }),
              _vm._v(" "),
              _c("paginator-link", {
                attrs: {
                  value: _vm.value + 1,
                  text: "Next →",
                  active: _vm.value === _vm.paginatedItems.length - 1
                },
                on: { click: _vm.setPage }
              })
            ],
            2
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
    require("vue-hot-reload-api")      .rerender("data-v-05c830ce", esExports)
  }
}

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/lunr/lunr.js'");

/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "list-header-controls form-inline" }, [
        _c("div", { staticClass: "form-group" }, [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t\tSort\n\t\t\t\t"),
            _c("div", { staticClass: "input-group" }, [
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.sortBy,
                      expression: "sortBy"
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
                      _vm.sortBy = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                _vm._l(_vm.fields, function(field) {
                  return _c("option", { domProps: { value: field } }, [
                    _vm._v(
                      "\n\t\t\t\t\t\t\t" +
                        _vm._s(_vm.renderFieldName(field)) +
                        "\n\t\t\t\t\t\t"
                    )
                  ])
                })
              ),
              _vm._v(" "),
              _c("span", { staticClass: "input-group-btn" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-default",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        _vm.sortOrder = _vm.sortOrder === "asc" ? "desc" : "asc"
                      }
                    }
                  },
                  [
                    _vm.sortOrder === "asc"
                      ? _c("span", {
                          staticClass: "glyphicon glyphicon-sort-by-alphabet"
                        })
                      : _c("span", {
                          staticClass:
                            "glyphicon glyphicon-sort-by-alphabet-alt"
                        })
                  ]
                )
              ])
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group" }, [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t\tSearch\n\t\t\t\t"),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.query,
                  expression: "query"
                }
              ],
              staticClass: "form-control",
              attrs: { type: "search", placeholder: "Search" },
              domProps: { value: _vm.query },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.query = $event.target.value
                }
              }
            })
          ])
        ]),
        _vm._v(" "),
        _vm.reloadable
          ? _c("div", { staticClass: "form-group" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default labelless-button",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      _vm.$emit("reload")
                    }
                  }
                },
                [_c("span", { staticClass: "glyphicon glyphicon-refresh" })]
              )
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "list-container" },
        [
          _vm._t("header"),
          _vm._v(" "),
          _vm.itemsToShow
            ? _c(
                "ol",
                { staticClass: "list" },
                [
                  _vm._l(_vm.currentPageItems, function(item) {
                    return _vm._t("default", null, null, item)
                  })
                ],
                2
              )
            : _c("p", { staticClass: "no-items-text" }, [
                _vm._v("\n\t\t\tNo items to show\n\t\t")
              ]),
          _vm._v(" "),
          _vm._t("footer")
        ],
        2
      ),
      _vm._v(" "),
      _vm.paginate
        ? _c("list-paginator", {
            attrs: {
              paginatedItems: _vm.paginatedItems,
              itemsPerPage: _vm.itemsPerPage
            },
            on: {
              pageSize: function($event) {
                _vm.itemsPerPage = arguments[0]
              }
            },
            model: {
              value: _vm.page,
              callback: function($$v) {
                _vm.page = $$v
              },
              expression: "page"
            }
          })
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-6d54e2f6", esExports)
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

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Instruction_vue__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_16c471bd_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Instruction_vue__ = __webpack_require__(398);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(382)
  __webpack_require__(383)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-16c471bd"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Instruction_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_16c471bd_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Instruction_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Instruction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Question_vue__ = __webpack_require__(317);
var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Question_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Question.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Section_vue__ = __webpack_require__(400);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(399)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6c066414"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Section_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Item_vue__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1548f2c8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Item_vue__ = __webpack_require__(347);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(344)
  __webpack_require__(345)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1548f2c8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Item_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1548f2c8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/Item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_vue__ = __webpack_require__(318);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Number_vue__ = __webpack_require__(323);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Select_vue__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Checkbox_vue__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Radio_vue__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__List_List_vue__ = __webpack_require__(337);








/* harmony default export */ __webpack_exports__["a"] = ({
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
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		conditionMet: {
			type: Boolean,
			default: false
		}
	},

	render: function render(h) {
		var _this = this;

		var type = this.question.type === 'textarea' ? 'text' : this.question.type;

		var questionComponent = type + '-question';

		var style = {};
		if (this.question.condition && !this.conditionMet) style.display = 'none';

		return h(questionComponent, {
			props: Object.assign({
				readonly: this.readonly,
				showErrors: this.showErrors
			}, this.question),
			style: style,
			on: {
				input: function input(question) {
					_this.$emit('input', question);
				}
			}
		});
	},


	components: {
		TextQuestion: __WEBPACK_IMPORTED_MODULE_0__Text_vue__["a" /* default */],
		NumberQuestion: __WEBPACK_IMPORTED_MODULE_1__Number_vue__["a" /* default */],
		SelectQuestion: __WEBPACK_IMPORTED_MODULE_2__Select_vue__["a" /* default */],
		CheckboxQuestion: __WEBPACK_IMPORTED_MODULE_3__Checkbox_vue__["a" /* default */],
		RadioQuestion: __WEBPACK_IMPORTED_MODULE_4__Radio_vue__["a" /* default */],
		ListQuestion: __WEBPACK_IMPORTED_MODULE_5__List_List_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Text_vue__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3340e545_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Text_vue__ = __webpack_require__(322);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Text_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3340e545_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Text_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 319:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_snarkdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
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
		},
		showErrors: {
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
			if (this.description) return Object(__WEBPACK_IMPORTED_MODULE_2_snarkdown__["default"])(this.description);
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__["q" /* textQuestion */])(this);
		}
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', { value: event.target.value });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__["a" /* default */],
		ValidatedFormGroup: __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 320:
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

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		showErrors: {
			type: Boolean,
			default: true
		},
		errors: {
			type: Map,
			required: true
		},
		prop: {
			type: String,
			required: true
		},
		invalidClass: {
			type: String,
			default: 'has-error'
		}
	}
});

/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "form-group",
      class: ((_obj = {}),
      (_obj[_vm.invalidClass] = _vm.errors.has(_vm.prop)),
      _obj)
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _vm.showErrors && _vm.errors.has(_vm.prop)
        ? _c("span", { staticClass: "help-block invalid-container" }, [
            _vm._v("\n\t\t" + _vm._s(_vm.errors.get(_vm.prop)) + "\n\t")
          ])
        : _vm._e()
    ],
    2
  )
  var _obj
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-500d5102", esExports)
  }
}

/***/ }),

/***/ 322:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "validated-form-group",
    {
      staticClass: "text-question",
      attrs: {
        errors: _vm.validation.errors,
        "show-errors": _vm.showErrors,
        prop: "value"
      }
    },
    [
      _c(
        "label",
        {
          staticClass: "containing-label",
          class: { "has-warning": _vm.required && !_vm.value },
          attrs: { title: _vm.description }
        },
        [
          _vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t\t"),
          _c("textarea", {
            staticClass: "form-control",
            attrs: { readonly: _vm.readonly },
            domProps: { value: _vm.value },
            on: { input: _vm.onInput }
          })
        ]
      ),
      _vm._v(" "),
      _vm.description
        ? _c(
            "show-hide-button",
            {
              model: {
                value: _vm.show.description,
                callback: function($$v) {
                  _vm.show.description = $$v
                },
                expression: "show.description"
              }
            },
            [_vm._v("\n\t\tdescription\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.description
        ? _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.show.description,
                expression: "show.description"
              }
            ],
            domProps: { innerHTML: _vm._s(_vm.markedUpDescription) }
          })
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-3340e545", esExports)
  }
}

/***/ }),

/***/ 323:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Number_vue__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fd00d61_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Number_vue__ = __webpack_require__(325);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Number_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1fd00d61_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Number_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Number.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 324:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_snarkdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
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
		},
		showErrors: {
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
			if (this.description) return Object(__WEBPACK_IMPORTED_MODULE_2_snarkdown__["default"])(this.description);
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__["h" /* numberQuestion */])(this);
		}
	},

	methods: {
		onInput: function onInput(event) {
			// FIXME: Firefox sends a 0 for non-numbers for some reason
			this.$emit('input', { value: Number(event.target.value) });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__["a" /* default */],
		ValidatedFormGroup: __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "validated-form-group",
    {
      staticClass: "number-question",
      attrs: {
        errors: _vm.validation.errors,
        "show-errors": _vm.showErrors,
        prop: "value"
      }
    },
    [
      _c(
        "label",
        { staticClass: "containing-label", attrs: { title: _vm.description } },
        [
          _vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t\t"),
          _c("input", {
            staticClass: "form-control",
            attrs: {
              type: "number",
              min: _vm.min,
              max: _vm.max,
              readonly: _vm.readonly
            },
            domProps: { value: _vm.value },
            on: { input: _vm.onInput }
          })
        ]
      ),
      _vm._v(" "),
      _vm.description
        ? _c(
            "show-hide-button",
            {
              model: {
                value: _vm.show.description,
                callback: function($$v) {
                  _vm.show.description = $$v
                },
                expression: "show.description"
              }
            },
            [_vm._v("\n\t\tdescription\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.description
        ? _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.show.description,
                expression: "show.description"
              }
            ],
            domProps: { innerHTML: _vm._s(_vm.markedUpDescription) }
          })
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-1fd00d61", esExports)
  }
}

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Select_vue__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_570754d8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Select_vue__ = __webpack_require__(328);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Select_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_570754d8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Select_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Select.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-570754d8", Component.options)
  } else {
    hotAPI.reload("data-v-570754d8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_snarkdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			validator: function validator(type) {
				return type === 'select';
			}
		},
		text: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
			default: 'Please select an option'
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
		},
		showErrors: {
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
			if (this.description) return Object(__WEBPACK_IMPORTED_MODULE_2_snarkdown__["default"])(this.description);
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__["n" /* selectQuestion */])(this);
		}
	},

	methods: {
		handleSelect: function handleSelect(event) {
			var value = event.target.value;
			var options = this.options.map(function (option) {
				option = Object.assign({}, option);

				// Because html values are always strings
				// eslint-disable-next-line eqeqeq
				option.selected = option.value == value;

				return option;
			});
			this.$emit('input', { options: options });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__["a" /* default */],
		ValidatedFormGroup: __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "validated-form-group",
    {
      staticClass: "select-question",
      attrs: {
        errors: _vm.validation.errors,
        "show-errors": _vm.showErrors,
        prop: "options"
      }
    },
    [
      _c(
        "label",
        { staticClass: "containing-label", attrs: { title: _vm.description } },
        [
          _vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t\t"),
          _c(
            "select",
            {
              staticClass: "form-control",
              attrs: { disabled: _vm.readonly },
              on: { change: _vm.handleSelect }
            },
            [
              _c("option", { attrs: { value: "" } }, [
                _vm._v(_vm._s(_vm.placeholder))
              ]),
              _vm._v(" "),
              _vm._l(_vm.options, function(option, index) {
                return _c(
                  "option",
                  {
                    key: index,
                    domProps: { value: option.value, selected: option.selected }
                  },
                  [_vm._v("\n\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t")]
                )
              })
            ],
            2
          )
        ]
      ),
      _vm._v(" "),
      _vm.description
        ? _c(
            "show-hide-button",
            {
              staticClass: "btn-default",
              model: {
                value: _vm.show.description,
                callback: function($$v) {
                  _vm.show.description = $$v
                },
                expression: "show.description"
              }
            },
            [_vm._v("\n\t\tdescription\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.description
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show.description,
                  expression: "show.description"
                }
              ]
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]
          )
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-570754d8", esExports)
  }
}

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checkbox_vue__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_098680db_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checkbox_vue__ = __webpack_require__(332);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(330)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-098680db"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checkbox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_098680db_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checkbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 330:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_snarkdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		},
		showErrors: {
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
			if (this.description) return Object(__WEBPACK_IMPORTED_MODULE_2_snarkdown__["default"])(this.description);
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__["b" /* checkboxQuestion */])(this);
		}
	},

	methods: {
		snarkdown: __WEBPACK_IMPORTED_MODULE_2_snarkdown__["default"],
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
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__["a" /* default */],
		ValidatedFormGroup: __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "validated-form-group",
    {
      staticClass: "checkbox-question",
      attrs: {
        errors: _vm.validation.errors,
        "show-errors": _vm.showErrors,
        prop: "options"
      }
    },
    [
      _c("fieldset", { attrs: { title: _vm.description } }, [
        _c("legend", [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "options" },
          _vm._l(_vm.options, function(option, index) {
            return _c(
              "label",
              { attrs: { title: option.description } },
              [
                _c("input", {
                  attrs: { type: "checkbox", disabled: _vm.readonly },
                  domProps: { value: option.value, checked: option.checked },
                  on: {
                    change: function($event) {
                      _vm.handleCheck(index)
                    }
                  }
                }),
                _vm._v(" "),
                option.editable
                  ? _c("input", {
                      staticClass: "form-control",
                      attrs: { type: "text", placholder: "Other" },
                      domProps: { value: option.text },
                      on: {
                        click: function($event) {
                          _vm.handleCheck(index)
                        },
                        input: function($event) {
                          _vm.handleEditableOptionInput(
                            index,
                            $event.target.value
                          )
                        }
                      }
                    })
                  : [
                      _vm._v(
                        "\n\t\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t\t"
                      )
                    ],
                _vm._v(" "),
                option.description
                  ? _c("div", {
                      staticClass: "question-description",
                      domProps: {
                        innerHTML: _vm._s(_vm.snarkdown(option.description))
                      }
                    })
                  : _vm._e()
              ],
              2
            )
          })
        )
      ]),
      _vm._v(" "),
      _vm.description
        ? _c(
            "show-hide-button",
            {
              model: {
                value: _vm.show.description,
                callback: function($$v) {
                  _vm.show.description = $$v
                },
                expression: "show.description"
              }
            },
            [_vm._v("\n\t\tdescription\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.description
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show.description,
                  expression: "show.description"
                }
              ]
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]
          )
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-098680db", esExports)
  }
}

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Radio_vue__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3b7f8513_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Radio_vue__ = __webpack_require__(336);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(334)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3b7f8513"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Radio_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3b7f8513_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Radio_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Radio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 334:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_snarkdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		},
		showErrors: {
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
			if (this.description) return Object(__WEBPACK_IMPORTED_MODULE_2_snarkdown__["default"])(this.description);
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__["l" /* radioQuestion */])(this);
		}
	},

	methods: {
		snarkdown: __WEBPACK_IMPORTED_MODULE_2_snarkdown__["default"],
		handleCheck: function handleCheck(index) {
			var options = this.options.map(function (option, i) {
				var newOption = Object.assign({}, option);

				newOption.checked = i === index;

				return newOption;
			});

			this.$emit('input', { options: options });
		},
		resetValue: function resetValue() {
			this.handleCheck(-1);
		},
		handleEditableOptionInput: function handleEditableOptionInput(index, value) {
			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], { text: value, value: value });

			this.$emit('input', { options: options });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__["a" /* default */],
		ValidatedFormGroup: __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "validated-form-group",
    {
      staticClass: "radio-question",
      attrs: {
        errors: _vm.validation.errors,
        "show-errors": _vm.showErrors,
        prop: "options"
      }
    },
    [
      _c("fieldset", { attrs: { title: _vm.description } }, [
        _c("legend", { staticClass: "control-label" }, [
          _vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "options" },
          _vm._l(_vm.options, function(option, index) {
            return _c(
              "label",
              { attrs: { title: option.description } },
              [
                _c("input", {
                  attrs: { type: "radio", disabled: _vm.readonly },
                  domProps: { value: option.value, checked: option.checked },
                  on: {
                    change: function($event) {
                      _vm.handleCheck(index)
                    }
                  }
                }),
                _vm._v(" "),
                option.editable
                  ? _c("input", {
                      staticClass: "form-control editable-option-text",
                      attrs: { type: "text", placholder: "Other" },
                      domProps: { value: option.text },
                      on: {
                        click: function($event) {
                          _vm.handleCheck(index)
                        },
                        input: function($event) {
                          _vm.handleEditableOptionInput(
                            index,
                            $event.target.value
                          )
                        }
                      }
                    })
                  : [
                      _vm._v(
                        "\n\t\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t\t"
                      )
                    ],
                _vm._v(" "),
                option.description
                  ? _c("div", {
                      staticClass: "question-description",
                      domProps: {
                        innerHTML: _vm._s(_vm.snarkdown(option.description))
                      }
                    })
                  : _vm._e()
              ],
              2
            )
          })
        )
      ]),
      _vm._v(" "),
      !_vm.required
        ? _c(
            "button",
            {
              staticClass: "btn btn-sm btn-default",
              attrs: { type: "button" },
              on: { click: _vm.resetValue }
            },
            [_vm._v("\n\t\tClear response\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.description
        ? _c(
            "show-hide-button",
            {
              model: {
                value: _vm.show.description,
                callback: function($$v) {
                  _vm.show.description = $$v
                },
                expression: "show.description"
              }
            },
            [_vm._v("\n\t\tdescription\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.description
        ? _c(
            "div",
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value: _vm.show.description,
                  expression: "show.description"
                }
              ]
            },
            [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]
          )
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-3b7f8513", esExports)
  }
}

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__ = __webpack_require__(338);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_013e02b2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_List_vue__ = __webpack_require__(381);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_013e02b2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_List_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/List.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 338:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Items_vue__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BootstrapAlert_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_snarkdown__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
				return ['text', 'publication', 'committee', 'study', 'grant', 'grantOther', 'certification', 'editorialBoard', 'review', 'lecture', 'audienceLecture', 'mentorship', 'subjectMentorship'].includes(type);
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
		itemLabels: {
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
		},
		showErrors: {
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
			if (this.description) return Object(__WEBPACK_IMPORTED_MODULE_3_snarkdown__["default"])(this.description);
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

			if (this.itemLabels) newItem.labels = this.itemLabels;

			items.push(newItem);

			this.$emit('input', { items: items });
		},
		onChange: function onChange(items) {
			if (this.readonly) return;

			this.$emit('input', { items: items });
		},

		snarkdown: __WEBPACK_IMPORTED_MODULE_3_snarkdown__["default"]
	},

	components: {
		ListItems: __WEBPACK_IMPORTED_MODULE_0__Items_vue__["a" /* default */],
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_1__BootstrapAlert_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_2__ShowHideButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 339:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Items_vue__ = __webpack_require__(341);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(340)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8c7e23f2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Items_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/Items.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 340:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextItem_vue__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PublicationItem_vue__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CommitteeItem_vue__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StudyItem_vue__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__GrantItem_vue__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__CertificationItem_vue__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__EditorialBoardItem_vue__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ReviewItem_vue__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__LectureItem_vue__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__MentorshipItem_vue__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ProjectItem_vue__ = __webpack_require__(378);













/* harmony default export */ __webpack_exports__["a"] = ({
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
		},
		showErrors: {
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
					readonly: _this.readonly,
					showErrors: _this.showErrors
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
					return 'study-item';
				case 'grant':
				case 'grantOther':
					return 'grant-item';
				case 'certification':
					return 'certification-item';
				case 'editorialBoard':
					return 'editorial-board-item';
				case 'review':
					return 'review-item';
				case 'lecture':
				case 'audienceLecture':
					return 'lecture-item';
				case 'mentorship':
				case 'subjectMentorship':
					return 'mentorship-item';
				case 'project':
					return 'project-item';
			}
		}
	},

	components: {
		TextItem: __WEBPACK_IMPORTED_MODULE_0__TextItem_vue__["a" /* default */],
		PublicationItem: __WEBPACK_IMPORTED_MODULE_1__PublicationItem_vue__["a" /* default */],
		CommitteeItem: __WEBPACK_IMPORTED_MODULE_2__CommitteeItem_vue__["a" /* default */],
		StudyItem: __WEBPACK_IMPORTED_MODULE_3__StudyItem_vue__["a" /* default */],
		GrantItem: __WEBPACK_IMPORTED_MODULE_4__GrantItem_vue__["a" /* default */],
		CertificationItem: __WEBPACK_IMPORTED_MODULE_5__CertificationItem_vue__["a" /* default */],
		EditorialBoardItem: __WEBPACK_IMPORTED_MODULE_6__EditorialBoardItem_vue__["a" /* default */],
		ReviewItem: __WEBPACK_IMPORTED_MODULE_7__ReviewItem_vue__["a" /* default */],
		LectureItem: __WEBPACK_IMPORTED_MODULE_8__LectureItem_vue__["a" /* default */],
		MentorshipItem: __WEBPACK_IMPORTED_MODULE_9__MentorshipItem_vue__["a" /* default */],
		ProjectItem: __WEBPACK_IMPORTED_MODULE_10__ProjectItem_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_TextItem_vue__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_737a1269_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_TextItem_vue__ = __webpack_require__(348);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_TextItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_737a1269_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_TextItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/TextItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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

	computed: {
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["p" /* textListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 344:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 345:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__ = __webpack_require__(127);
//
//
//
//
//
//
//
//
//
//
//
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
		readonly: {
			type: Boolean,
			default: false
		},
		invalid: {
			type: Boolean,
			default: false
		},
		showErrors: {
			type: Boolean,
			default: false
		}
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__["a" /* default */],
		ValidatedFormGroup: __WEBPACK_IMPORTED_MODULE_1__ValidatedFormGroup_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("li", { staticClass: "questionnaire-list-item" }, [
    _c(
      "div",
      { staticClass: "item-controls" },
      [
        !_vm.readonly
          ? _c(
              "confirmation-button",
              {
                staticClass: "btn btn-sm",
                attrs: {
                  "unpressed-class": "btn-warning",
                  "pressed-class": "btn-danger"
                },
                on: {
                  click: function($event) {
                    _vm.$emit("remove")
                  }
                }
              },
              [
                _c("span", { staticClass: "glyphicon glyphicon-remove" }),
                _vm._v("\n\t\t\tRemove item\n\t\t")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.showErrors && _vm.invalid
          ? _c("div", { staticClass: "invalid-container" }, [
              _c("span", { staticClass: "glyphicon glyphicon-warning-sign" })
            ])
          : _vm._e()
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "item-contents" }, [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1548f2c8", esExports)
  }
}

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "text" } },
        [
          _c("textarea", {
            staticClass: "form-control",
            attrs: { readonly: _vm.readonly },
            domProps: { value: _vm.text },
            on: {
              input: function($event) {
                _vm.$emit("input", { text: $event.target.value })
              }
            }
          })
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
    require("vue-hot-reload-api")      .rerender("data-v-737a1269", esExports)
  }
}

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PublicationItem_vue__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ce3a934_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PublicationItem_vue__ = __webpack_require__(351);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PublicationItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9ce3a934_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PublicationItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/PublicationItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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

	computed: {
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["j" /* publicationListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "title" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tTitle of publication\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.title },
              on: {
                input: function($event) {
                  _vm.$emit("input", { title: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "author" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tPrimary author(s)\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.author },
              on: {
                input: function($event) {
                  _vm.$emit("input", { author: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "link" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tLink (PubMed, MCW FCD, etc.)\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "text", readonly: _vm.readonly },
              domProps: { value: _vm.link },
              on: {
                input: function($event) {
                  _vm.$emit("input", { link: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "role" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tYour role on the project\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.role },
              on: {
                input: function($event) {
                  _vm.$emit("input", { role: $event.target.value })
                }
              }
            })
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-9ce3a934", esExports)
  }
}

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CommitteeItem_vue__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6233e112_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CommitteeItem_vue__ = __webpack_require__(354);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CommitteeItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6233e112_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CommitteeItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/CommitteeItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

	computed: {
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_validate_js__["c" /* committeeListItem */])(this);
		}
	},

	methods: {
		ucfirst: __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["H" /* ucfirst */]
	},

	components: {
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "name" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tCommittee name\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.name },
              on: {
                input: function($event) {
                  _vm.$emit("input", { name: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "role" } },
        [
          _c("fieldset", [
            _c("legend", [_vm._v("\n\t\t\t\tYour role\n\t\t\t")])
          ]),
          _vm._v(" "),
          _vm._l(["chair", "member"], function(value) {
            return _c("label", { staticClass: "containing-label" }, [
              _c("input", {
                attrs: { type: "radio" },
                domProps: { value: value, checked: _vm.role === value },
                on: {
                  change: function($event) {
                    _vm.$emit("input", { role: $event.target.value })
                  }
                }
              }),
              _vm._v("\n\t\t\t" + _vm._s(_vm.ucfirst(value)) + "\n\t\t")
            ])
          })
        ],
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
    require("vue-hot-reload-api")      .rerender("data-v-6233e112", esExports)
  }
}

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StudyItem_vue__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_32ce6d7a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StudyItem_vue__ = __webpack_require__(357);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StudyItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_32ce6d7a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StudyItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/StudyItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32ce6d7a", Component.options)
  } else {
    hotAPI.reload("data-v-32ce6d7a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 356:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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
		yearInitiated: {
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

	computed: {
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["o" /* studyListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "title" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tStudy title\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.title },
              on: {
                input: function($event) {
                  _vm.$emit("input", { title: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "role" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tYour role in study\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.role },
              on: {
                input: function($event) {
                  _vm.$emit("input", { role: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "yearInitiated" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tYear initiated\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "text", readonly: _vm.readonly },
              domProps: { value: _vm.yearInitiated },
              on: {
                input: function($event) {
                  _vm.$emit("input", { yearInitiated: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "approvalNumber" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tApproval number (IRB / ACUC)\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "text", readonly: _vm.readonly },
              domProps: { value: _vm.approvalNumber },
              on: {
                input: function($event) {
                  _vm.$emit("input", { approvalNumber: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "progress" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tProgress\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.progress },
              on: {
                input: function($event) {
                  _vm.$emit("input", { progress: $event.target.value })
                }
              }
            })
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-32ce6d7a", esExports)
  }
}

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_GrantItem_vue__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a6890cd4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_GrantItem_vue__ = __webpack_require__(360);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_GrantItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a6890cd4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_GrantItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/GrantItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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

	computed: {
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["e" /* grantListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _vm.type === "grantOther"
        ? _c(
            "validated-form-group",
            { attrs: { errors: _vm.validation.errors, prop: "agency" } },
            [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\tFunding agency\n\t\t\t"),
                _c("input", {
                  staticClass: "form-control",
                  attrs: { type: "text", readonly: _vm.readonly },
                  domProps: { value: _vm.agency },
                  on: {
                    input: function($event) {
                      _vm.$emit("input", { agency: $event.target.value })
                    }
                  }
                })
              ])
            ]
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "project" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tProject\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.project },
              on: {
                input: function($event) {
                  _vm.$emit("input", { project: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "amount" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tFunding amount\n\t\t\t"),
            _c("div", { staticClass: "input-group" }, [
              _c("span", { staticClass: "input-group-addon" }, [_vm._v("$")]),
              _vm._v(" "),
              _c("input", {
                staticClass: "form-control",
                attrs: { type: "number", readonly: _vm.readonly },
                domProps: { value: _vm.amount },
                on: {
                  input: function($event) {
                    _vm.$emit("input", { amount: Number($event.target.value) })
                  }
                }
              })
            ])
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-a6890cd4", esExports)
  }
}

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CertificationItem_vue__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c141f98_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CertificationItem_vue__ = __webpack_require__(363);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CertificationItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c141f98_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CertificationItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/CertificationItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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

	computed: {
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["a" /* certificationListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "board" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tBoard\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "text", readonly: _vm.readonly },
              domProps: { value: _vm.board },
              on: {
                input: function($event) {
                  _vm.$emit("input", { board: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "specialty" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tSpecialty\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.specialty },
              on: {
                input: function($event) {
                  _vm.$emit("input", { specialty: $event.target.value })
                }
              }
            })
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-3c141f98", esExports)
  }
}

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EditorialBoardItem_vue__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2186235b_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EditorialBoardItem_vue__ = __webpack_require__(367);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(365)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2186235b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EditorialBoardItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2186235b_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EditorialBoardItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/EditorialBoardItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 365:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






var _predefinedRoles = ['editor-in-chief', 'associate-editor', 'executive-editor', 'statistical-editor'];

/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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
			otherRole: _predefinedRoles.includes(this.role) ? '' : this.role
		};
	},


	computed: {
		predefinedRoles: function predefinedRoles() {
			return _predefinedRoles;
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_validate_js__["d" /* editorialBoardListItem */])(this);
		}
	},

	watch: {
		otherRole: function otherRole(_otherRole) {
			this.$emit('input', { role: _otherRole });
		}
	},

	methods: {
		kebabCaseToWords: __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["u" /* kebabCaseToWords */],
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
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "journal" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tJournal\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "text", readonly: _vm.readonly },
              domProps: { value: _vm.journal },
              on: {
                input: function($event) {
                  _vm.$emit("input", { journal: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "role" } },
        [
          _c("fieldset", { staticClass: "radio-question" }, [
            _c("legend", [_vm._v("\n\t\t\t\tRole\n\t\t\t")]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "options" },
              [
                _vm._l(_vm.predefinedRoles, function(predefinedRole) {
                  return _c("label", [
                    _c("input", {
                      attrs: { type: "radio", disabled: _vm.readonly },
                      domProps: {
                        value: predefinedRole,
                        checked: _vm.role === predefinedRole
                      },
                      on: { change: _vm.handleCheck }
                    }),
                    _vm._v(
                      "\n\t\t\t\t\t" +
                        _vm._s(_vm.kebabCaseToWords(predefinedRole)) +
                        "\n\t\t\t\t"
                    )
                  ])
                }),
                _vm._v(" "),
                _c("label", [
                  _c("input", {
                    attrs: { type: "radio", disabled: _vm.readonly },
                    domProps: {
                      value: _vm.otherRole,
                      checked: _vm.role === _vm.otherRole
                    },
                    on: { change: _vm.handleCheck }
                  }),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.otherRole,
                        expression: "otherRole"
                      }
                    ],
                    staticClass: "form-control editable-option-text",
                    attrs: {
                      type: "text",
                      placeholder: "Other",
                      readonly: _vm.readonly
                    },
                    domProps: { value: _vm.otherRole },
                    on: {
                      click: _vm.handleOtherCheck,
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.otherRole = $event.target.value
                      }
                    }
                  })
                ])
              ],
              2
            )
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-2186235b", esExports)
  }
}

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReviewItem_vue__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c08b154_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReviewItem_vue__ = __webpack_require__(370);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReviewItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2c08b154_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReviewItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/ReviewItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c08b154", Component.options)
  } else {
    hotAPI.reload("data-v-2c08b154", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'review';
			}
		},
		work: {
			type: String,
			default: ''
		},
		reviews: {
			type: Number,
			default: 0
		},
		labels: {
			type: Object,
			required: false
		}
	},

	computed: {
		workLabel: function workLabel() {
			return this.labels && this.labels.work ? this.labels.work : "What's being reviewed";
		},
		reviewsLabel: function reviewsLabel() {
			return this.labels && this.labels.reviews ? this.labels.reviews : 'Number of reviews';
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["m" /* reviewListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "work" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t" + _vm._s(_vm.workLabel) + "\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.work },
              on: {
                input: function($event) {
                  _vm.$emit("input", { work: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "reviews" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t" + _vm._s(_vm.reviewsLabel) + "\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "number", readonly: _vm.readonly },
              domProps: { value: _vm.reviews },
              on: {
                input: function($event) {
                  _vm.$emit("input", { reviews: Number($event.target.value) })
                }
              }
            })
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-2c08b154", esExports)
  }
}

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_LectureItem_vue__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3784f438_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_LectureItem_vue__ = __webpack_require__(374);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(372)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3784f438"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_LectureItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3784f438_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_LectureItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/LectureItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 372:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_flatpickr_dist_flatpickr_css__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_flatpickr_dist_flatpickr_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_flatpickr_dist_flatpickr_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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

	data: function data() {
		return {
			multipleDates: this.date && this.date.includes(';'),
			dateUnknown: this.date && this.date === 'Unknown'
		};
	},


	computed: {
		flatpickrOptions: function flatpickrOptions() {
			return {
				altInput: true,
				altInputClass: this.readonly ? 'form-control' : 'form-control appear-not-readonly',
				altFormat: 'M j, Y',
				clickOpens: !this.readonly,
				mode: this.multipleDates ? 'multiple' : 'single'
			};
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_questionnaire_validate_js__["f" /* lectureListItem */])(this);
		},
		errors: function errors() {
			return this.validation ? this.validation.errors : new Map();
		}
	},

	watch: {
		multipleDates: function multipleDates(_multipleDates) {
			if (!_multipleDates) {
				var date = this.date;
				if (date && date.includes(';')) date = date.split(';')[0];

				this.$emit('input', { date: date });
			}
		},
		dateUnknown: function dateUnknown(_dateUnknown) {
			if (_dateUnknown) this.$emit('input', { date: 'Unknown' });else if (this.date === 'Unknown') this.$emit('input', { date: null });
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__["default"]
	}
});

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.errors, prop: "title" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\tLecture title\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.title },
              on: {
                input: function($event) {
                  _vm.$emit("input", { title: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.errors, prop: "date" } },
        [
          _c(
            "label",
            { staticClass: "containing-label" },
            [
              _vm._v("\n\t\t\tLecture date\n\t\t\t"),
              _vm.dateUnknown
                ? _c("input", {
                    staticClass: "form-control",
                    attrs: { type: "text", readonly: "" },
                    domProps: { value: _vm.date }
                  })
                : _c("vue-flatpickr", {
                    key: "multiple-" + _vm.multipleDates,
                    staticClass: "form-control",
                    attrs: { options: _vm.flatpickrOptions, value: _vm.date },
                    on: {
                      input: function($event) {
                        _vm.$emit("input", { date: arguments[0] })
                      }
                    }
                  })
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "checkbox-label-container" }, [
            _c("label", { staticClass: "checkbox-label" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.multipleDates,
                    expression: "multipleDates"
                  }
                ],
                attrs: { type: "checkbox", disabled: _vm.dateUnknown },
                domProps: {
                  checked: Array.isArray(_vm.multipleDates)
                    ? _vm._i(_vm.multipleDates, null) > -1
                    : _vm.multipleDates
                },
                on: {
                  __c: function($event) {
                    var $$a = _vm.multipleDates,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.multipleDates = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.multipleDates = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.multipleDates = $$c
                    }
                  }
                }
              }),
              _vm._v("\n\t\t\t\tMultiple\n\t\t\t")
            ]),
            _vm._v(" "),
            _c("label", { staticClass: "checkbox-label" }, [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.dateUnknown,
                    expression: "dateUnknown"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.dateUnknown)
                    ? _vm._i(_vm.dateUnknown, null) > -1
                    : _vm.dateUnknown
                },
                on: {
                  __c: function($event) {
                    var $$a = _vm.dateUnknown,
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.dateUnknown = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.dateUnknown = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.dateUnknown = $$c
                    }
                  }
                }
              }),
              _vm._v("\n\t\t\t\tUnknown date\n\t\t\t")
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _vm.type !== "audienceLecture"
        ? _c(
            "validated-form-group",
            { attrs: { errors: _vm.errors, prop: "audience" } },
            [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v(
                  "\n\t\t\tLecture audience (department, society, group, location, etc.)\n\t\t\t"
                ),
                _c("textarea", {
                  staticClass: "form-control",
                  attrs: { readonly: _vm.readonly },
                  domProps: { value: _vm.audience },
                  on: {
                    input: function($event) {
                      _vm.$emit("input", { audience: $event.target.value })
                    }
                  }
                })
              ])
            ]
          )
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-3784f438", esExports)
  }
}

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_MentorshipItem_vue__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1494d9f9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_MentorshipItem_vue__ = __webpack_require__(377);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_MentorshipItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1494d9f9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_MentorshipItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/MentorshipItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return ['mentorship', 'subjectMentorship'].includes(type);
			}
		},
		mentee: {
			type: String,
			default: ''
		},
		subject: {
			type: String,
			default: ''
		},
		labels: {
			type: Object,
			required: false
		}
	},

	computed: {
		menteeLabel: function menteeLabel() {
			return this.labels && this.labels.mentee ? this.labels.mentee : 'Mentee name';
		},
		subjectLabel: function subjectLabel() {
			return this.labels && this.labels.subject ? this.labels.subject : 'Project / program / mentorship subject';
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["g" /* mentorshipListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "mentee" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t" + _vm._s(_vm.menteeLabel) + "\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "text", readonly: _vm.readonly },
              domProps: { value: _vm.mentee },
              on: {
                input: function($event) {
                  _vm.$emit("input", { mentee: $event.target.value })
                }
              }
            })
          ]),
          _vm._v(" "),
          !_vm.mentee
            ? _c("span", { staticClass: "help-block" }, [
                _vm._v(
                  "\n\t\t\tPlease enter the mentee / trainee name or remove this list item\n\t\t"
                )
              ])
            : _vm._e()
        ]
      ),
      _vm._v(" "),
      _vm.type !== "subjectMentorship"
        ? _c(
            "validated-form-group",
            { attrs: { errors: _vm.validation.errors, prop: "subject" } },
            [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\t" + _vm._s(_vm.subjectLabel) + "\n\t\t\t"),
                _c("textarea", {
                  staticClass: "form-control",
                  attrs: { readonly: _vm.readonly },
                  domProps: { value: _vm.subject },
                  on: {
                    input: function($event) {
                      _vm.$emit("input", { subject: $event.target.value })
                    }
                  }
                })
              ]),
              _vm._v(" "),
              !_vm.subject
                ? _c("span", { staticClass: "help-block" }, [
                    _vm._v(
                      "\n\t\t\tPlease enter the mentorship subject or remove this list item\n\t\t"
                    )
                  ])
                : _vm._e()
            ]
          )
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-1494d9f9", esExports)
  }
}

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ProjectItem_vue__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09d366d3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ProjectItem_vue__ = __webpack_require__(380);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ProjectItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09d366d3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ProjectItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/ProjectItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09d366d3", Component.options)
  } else {
    hotAPI.reload("data-v-09d366d3", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__ = __webpack_require__(6);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
	props: {
		type: {
			type: String,
			required: true,
			validator: function validator(type) {
				return type === 'project';
			}
		},
		description: {
			type: String,
			default: ''
		},
		hours: {
			type: Number,
			default: 0
		},
		labels: {
			type: Object,
			required: false
		}
	},

	computed: {
		descriptionLabel: function descriptionLabel() {
			return this.labels && this.labels.description ? this.labels.description : 'Description of the project and your involvement';
		},
		hoursLabel: function hoursLabel() {
			return this.labels && this.labels.reviews ? this.labels.reviews : 'Number of hours spent';
		},
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_questionnaire_validate_js__["i" /* projectListItem */])(this);
		}
	},

	components: {
		ListItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 38:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs__ = __webpack_require__(42);
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

	Object(__WEBPACK_IMPORTED_MODULE_0_downloadjs__["default"])(file, filename, 'text/csv');
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

	var keys = Array.from(valueMap.keys()).sort(__WEBPACK_IMPORTED_MODULE_1__utils_js__["C" /* sortNumbers */]);

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

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "list-item",
    {
      attrs: {
        readonly: _vm.readonly,
        invalid: !_vm.validation.valid,
        "show-errors": _vm.showErrors
      },
      on: {
        remove: function($event) {
          _vm.$emit("remove")
        }
      }
    },
    [
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "description" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t" + _vm._s(_vm.descriptionLabel) + "\n\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { readonly: _vm.readonly },
              domProps: { value: _vm.description },
              on: {
                input: function($event) {
                  _vm.$emit("input", { description: $event.target.value })
                }
              }
            })
          ])
        ]
      ),
      _vm._v(" "),
      _c(
        "validated-form-group",
        { attrs: { errors: _vm.validation.errors, prop: "hours" } },
        [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t" + _vm._s(_vm.hoursLabel) + "\n\t\t\t"),
            _c("input", {
              staticClass: "form-control",
              attrs: { type: "number", readonly: _vm.readonly },
              domProps: { value: _vm.hours },
              on: {
                input: function($event) {
                  _vm.$emit("input", { hours: Number($event.target.value) })
                }
              }
            })
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-09d366d3", esExports)
  }
}

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "form-group" },
    [
      _c(
        "fieldset",
        { attrs: { title: _vm.description } },
        [
          _vm.text || _vm.itemCount
            ? _c("legend", [
                _vm._v(
                  "\n\t\t\t" +
                    _vm._s(_vm.text) +
                    "\n\t\t\t" +
                    _vm._s(_vm.text && _vm.itemCount != null ? "-" : "") +
                    "\n\t\t\t"
                ),
                _c("span", [
                  _vm._v(
                    "\n\t\t\t\t" +
                      _vm._s(_vm.itemCount) +
                      "\n\t\t\t\t" +
                      _vm._s(_vm.itemCount === 1 ? "item" : "items") +
                      "\n\t\t\t"
                  )
                ])
              ])
            : _vm._e(),
          _vm._v(" "),
          _vm.items.length === 0
            ? _c("bootstrap-alert", {
                staticClass: "invalid-container",
                attrs: { type: "error", text: "Please add at least one item" }
              })
            : _vm._e(),
          _vm._v(" "),
          _c("list-items", {
            attrs: {
              ordered: _vm.ordered,
              items: _vm.items,
              readonly: _vm.readonly,
              "show-errors": _vm.showErrors
            },
            on: { change: _vm.onChange }
          }),
          _vm._v(" "),
          !_vm.readonly
            ? _c(
                "button",
                {
                  staticClass: "btn btn-sm btn-info",
                  attrs: { type: "button" },
                  on: { click: _vm.addItem }
                },
                [
                  _c("span", { staticClass: "glyphicon glyphicon-plus" }),
                  _vm._v("\n\t\t\tAdd item\n\t\t")
                ]
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _vm.description
        ? _c(
            "show-hide-button",
            {
              model: {
                value: _vm.show.description,
                callback: function($$v) {
                  _vm.show.description = $$v
                },
                expression: "show.description"
              }
            },
            [_vm._v("\n\t\tdescription\n\t")]
          )
        : _vm._e(),
      _vm._v(" "),
      _vm.description
        ? _c("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: _vm.show.description,
                expression: "show.description"
              }
            ],
            domProps: { innerHTML: _vm._s(_vm.markedUpDescription) }
          })
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-013e02b2", esExports)
  }
}

/***/ }),

/***/ 382:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 383:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_commonmark__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_commonmark___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_commonmark__);
//
//
//
//



var reader = new __WEBPACK_IMPORTED_MODULE_0_commonmark__["Parser"]();
var writer = new __WEBPACK_IMPORTED_MODULE_0_commonmark__["HtmlRenderer"]();

/* harmony default export */ __webpack_exports__["a"] = ({
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
			return writer.render(reader.parse(this.text));
		}
	}
});

/***/ }),

/***/ 385:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/commonmark/lib/index.js'");

/***/ }),

/***/ 39:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/@jacobmischka/vue-flatpickr/dist/index.js'");

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", {
    staticClass: "instruction-block",
    domProps: { innerHTML: _vm._s(_vm.markedUpText) }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-16c471bd", esExports)
  }
}

/***/ }),

/***/ 399:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Instruction_vue__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Question_Question_vue__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_index_js__ = __webpack_require__(140);






/* harmony default export */ __webpack_exports__["a"] = ({
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
		direction: {
			type: String,
			default: 'vertical',
			validator: function validator(direction) {
				return ['vertical', 'horizontal'].includes(direction);
			}
		},
		readonly: {
			type: Boolean,
			default: false
		},
		showErrors: {
			type: Boolean,
			default: false
		},
		conditionChecker: {
			type: Function,
			required: false
		}
	},

	render: function render(h) {
		var _this = this;

		var validItems = this.items.filter(__WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_index_js__["d" /* isValidItem */]);

		var items = validItems.map(function (item, index) {
			var componentName = item.type === 'instruction' ? 'questionnaire-instruction' : 'questionnaire-question';
			var props = componentName === 'questionnaire-question' ? { question: item } : Object.assign({}, item);

			return h(componentName, {
				props: Object.assign({
					readonly: _this.readonly,
					showErrors: _this.showErrors,
					conditionMet: item.condition && _this.conditionChecker(item.condition)
				}, props),
				on: {
					input: function input(item) {
						var items = _this.items.slice();
						items[index] = Object.assign({}, items[index], item);

						_this.$emit('input', { items: items });
					}
				}
			});
		});

		if (this.title) items.unshift(h('h2', this.title));

		return h('section', {
			class: {
				page: this.page,
				'questionnaire-section': true,
				'direction-horizontal': this.direction === 'horizontal'
			}
		}, items);
	},


	components: {
		QuestionnaireInstruction: __WEBPACK_IMPORTED_MODULE_0__Instruction_vue__["a" /* default */],
		QuestionnaireQuestion: __WEBPACK_IMPORTED_MODULE_1__Question_Question_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_DataTable_vue__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d4c1aff_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_DataTable_vue__ = __webpack_require__(137);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(135)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4d4c1aff"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_DataTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d4c1aff_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_DataTable_vue__["a" /* default */],
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
    hotAPI.createRecord("data-v-4d4c1aff", Component.options)
  } else {
    hotAPI.reload("data-v-4d4c1aff", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 42:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/downloadjs/download.js'");

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ComponentList_vue__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d54e2f6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ComponentList_vue__ = __webpack_require__(158);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(148)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6d54e2f6"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ComponentList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6d54e2f6_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ComponentList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ComponentList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["k"] = question;
/* harmony export (immutable) */ __webpack_exports__["q"] = textQuestion;
/* harmony export (immutable) */ __webpack_exports__["h"] = numberQuestion;
/* harmony export (immutable) */ __webpack_exports__["n"] = selectQuestion;
/* harmony export (immutable) */ __webpack_exports__["l"] = radioQuestion;
/* harmony export (immutable) */ __webpack_exports__["b"] = checkboxQuestion;
/* unused harmony export radioCheckboxQuestion */
/* unused harmony export listQuestion */
/* unused harmony export listItem */
/* harmony export (immutable) */ __webpack_exports__["p"] = textListItem;
/* harmony export (immutable) */ __webpack_exports__["j"] = publicationListItem;
/* harmony export (immutable) */ __webpack_exports__["a"] = certificationListItem;
/* harmony export (immutable) */ __webpack_exports__["c"] = committeeListItem;
/* harmony export (immutable) */ __webpack_exports__["d"] = editorialBoardListItem;
/* harmony export (immutable) */ __webpack_exports__["e"] = grantListItem;
/* harmony export (immutable) */ __webpack_exports__["f"] = lectureListItem;
/* harmony export (immutable) */ __webpack_exports__["g"] = mentorshipListItem;
/* harmony export (immutable) */ __webpack_exports__["m"] = reviewListItem;
/* harmony export (immutable) */ __webpack_exports__["o"] = studyListItem;
/* harmony export (immutable) */ __webpack_exports__["i"] = projectListItem;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(140);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



// TODO: Consider making not a map so multiple errors can be returned per prop


function question(question) {
	var valid = true;
	var errors = new Map();

	if (question.type !== 'list' && !question.required) return {
		valid: valid,
		errors: errors
	};

	switch (question.type) {
		case 'text':
			return textQuestion(question);
		case 'number':
			return numberQuestion(question);
		case 'checkbox':
			return checkboxQuestion(question);
		case 'radio':
			return radioQuestion(question);
		case 'list':
			return listQuestion(question);
	}

	throw new Error('Unrecognized question type');
}

function textQuestion(question) {
	var valid = true;
	var errors = new Map();

	if (question.required && !question.value) {
		valid = false;
		errors.set('value', 'Please complete the question');
	}

	return {
		valid: valid,
		errors: errors
	};
}

function numberQuestion(question) {
	var valid = true;
	var errors = new Map();

	if (question.required && question.value == null) {
		valid = false;
		errors.set('value', 'Please complete the question');
	}

	var value = Number(question.value);

	if (valid && Number.isNaN(value)) {
		valid = false;
		errors.set('value', 'Please enter a valid number');
	}

	if (valid && question.min && value < question.min) {
		valid = false;
		errors.set('value', 'Value must be greater than min (' + question.min + ')');
	}

	if (valid && question.max && value > question.max) {
		valid = false;
		errors.set('value', 'Value must be less than max (' + question.max + ')');
	}

	return {
		valid: valid,
		errors: errors
	};
}

function selectQuestion(question) {
	var valid = true;
	var errors = new Map();

	var value = Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["c" /* getSelectValue */])(question);

	if (question.required && value == null) {
		valid = false;
		errors.set('options', 'Please complete the question');
	}

	return {
		valid: valid,
		errors: errors
	};
}

function radioQuestion(question) {
	return radioCheckboxQuestion(question);
}

function checkboxQuestion(question) {
	return radioCheckboxQuestion(question);
}

function radioCheckboxQuestion(question) {
	var valid = true;
	var errors = new Map();

	if (question.required) {
		var optionChecked = false;
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = question.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var option = _step.value;

				if (option.checked) optionChecked = true;
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

		if (!optionChecked) {
			valid = false;
			errors.set('options', 'Please select an option');
		}
	}

	return {
		valid: valid,
		errors: errors
	};
}

function listQuestion(list) {
	var valid = true;
	var errors = new Map();

	if (!list.items || !Array.isArray(list.items) || list.items.length === 0) {
		valid = false;
		errors.set('items', 'Please enter a list item');
	}

	if (valid) {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = list.items.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _ref = _step2.value;

				var _ref2 = _slicedToArray(_ref, 2);

				var index = _ref2[0];
				var item = _ref2[1];

				if ('itemProps' in list) {
					var _iteratorNormalCompletion3 = true;
					var _didIteratorError3 = false;
					var _iteratorError3 = undefined;

					try {
						for (var _iterator3 = Object.entries(list.itemProps)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
							var _ref3 = _step3.value;

							var _ref4 = _slicedToArray(_ref3, 2);

							var key = _ref4[0];
							var value = _ref4[1];

							if (item[key] !== value) {
								valid = false;
								// This string interp thing kinda stinks
								errors.set('item[' + index + '][' + key + ']', 'Predefined itemProp ' + key + ' not present in list item');
							}
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

				if (!errors.has('item[' + index + ']')) {
					var listItemValidation = listItem(item);
					if (!listItemValidation.valid) {
						valid = false;
						var _iteratorNormalCompletion4 = true;
						var _didIteratorError4 = false;
						var _iteratorError4 = undefined;

						try {
							for (var _iterator4 = listItemValidation.errors.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
								var _ref5 = _step4.value;

								var _ref6 = _slicedToArray(_ref5, 2);

								var itemKey = _ref6[0];
								var itemVal = _ref6[1];

								// This string interp thing kinda stinks
								errors.set('item[' + index + '][' + itemKey + ']', itemVal);
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
					}
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

	return {
		valid: valid,
		errors: errors
	};
}

function listItem(item) {
	switch (item.type) {
		case 'text':
			return textListItem(item);
		case 'publication':
			return publicationListItem(item);
		case 'committee':
			return committeeListItem(item);
		case 'study':
			return studyListItem(item);
		case 'grant':
		case 'grantOther':
			return grantListItem(item);
		case 'certification':
			return certificationListItem(item);
		case 'editorialBoard':
			return editorialBoardListItem(item);
		case 'review':
			return reviewListItem(item);
		case 'lecture':
		case 'audienceLecture':
			return lectureListItem(item);
		case 'mentorship':
		case 'subjectMentorship':
			return mentorshipListItem(item);
		case 'project':
			return projectListItem(item);
	}

	// Unrecognized list type
	throw new Error('Unrecognized list type');
}

function requiredListItem(item, requiredMap) {
	var valid = true;
	var errors = new Map();

	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = requiredMap.entries()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var _ref7 = _step5.value;

			var _ref8 = _slicedToArray(_ref7, 2);

			var prop = _ref8[0];
			var str = _ref8[1];

			if (!item[prop]) {
				valid = false;
				errors.set(prop, 'Please ' + str + ' or remove this list item');
			}
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

	return {
		valid: valid,
		errors: errors
	};
}

function textListItem(item) {
	var valid = true;
	var errors = new Map();

	if (!item.text) {
		valid = false;
		errors.set('text', 'Please complete or remove this list item');
	}

	return {
		valid: valid,
		errors: errors
	};
}

function publicationListItem(item) {
	return requiredListItem(item, new Map([['title', 'enter the publication title'], ['role', 'describe your role']]));
}

function certificationListItem(item) {
	return requiredListItem(item, new Map([['board', 'enter the certification board'], ['specialty', 'enter the certification specialty']]));
}

function committeeListItem(item) {
	return requiredListItem(item, new Map([['name', 'enter the committee name'], ['role', 'select your role in the committee']]));
}

function editorialBoardListItem(item) {
	return requiredListItem(item, new Map([['journal', 'enter the journal'], ['role', 'describe your role']]));
}

function grantListItem(item) {
	return requiredListItem(item, new Map([['agency', 'enter the funding agency'], ['project', 'enter the name of the project'], ['amount', 'enter the funding amount']]));
}

function lectureListItem(item) {
	return requiredListItem(item, new Map([['title', 'enter the lecture title'], ['date', 'enter the lecture date(s)'], ['audience', 'enter the lecture audience']]));
}

function mentorshipListItem(item) {
	return requiredListItem(item, new Map([['mentee', 'enter the mentee / trainee name'], ['subject', 'enter the mentorship subject']]));
}

function reviewListItem(item) {
	return requiredListItem(item, new Map([['work', "enter the name of what's being reviewed"]]));
}

function studyListItem(item) {
	return requiredListItem(item, new Map([['title', 'the study title'], ['role', 'describe your role'], ['yearInitiated', 'enter the year the study was initiated'], ['approvalNumber', 'enter the study approval number'], ['progress', "describe the study's progress"]]));
}

function projectListItem(item) {
	return requiredListItem(item, new Map([['description', 'describe the project and your involvement'], ['hours', 'estimate the number of hours you spent on the project']]));
}

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

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createCaseLog"] = createCaseLog;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_flatpickr_dist_flatpickr_css__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_flatpickr_dist_flatpickr_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_flatpickr_dist_flatpickr_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_mixins_HasAlerts_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_components_ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_components_CaseLog_CaseLogs_vue__ = __webpack_require__(827);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vue_components_CaseLog_Editor_vue__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__vue_components_CaseLog_V1_Editor_vue__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_utils_js__ = __webpack_require__(1);















function createCaseLog(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		mixins: [__WEBPACK_IMPORTED_MODULE_3__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			},
			detailsSchema: {
				type: Object,
				required: true
			},
			locations: {
				type: Array,
				required: true
			}
		},
		propsData: propsData,
		data: function data() {
			return {
				caseLogs: [],
				show: {
					charts: false,
					addCaseLog: false
				}
			};
		},


		computed: {
			editorComponent: function editorComponent() {
				if (this.detailsSchema.case_log_version === 2) return 'CaseLogEditor';

				return 'CaseLogEditorV1';
			},
			subsections: function subsections() {
				var subsections = [];
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.detailsSchema.schema[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var schema = _step.value;
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = schema.subsections[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var subsection = _step2.value;

								subsections.push(subsection);
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

				return subsections;
			},
			isAdmin: function isAdmin() {
				return Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["J" /* userIsType */])(this.user, 'admin');
			},
			caseLogFields: function caseLogFields() {
				return ['full_name'];
			},
			groupedCaseLogs: function groupedCaseLogs() {
				if (!this.caseLogs || this.caseLogs.length < 1) return [];

				var groupedCaseLogs = new Map();

				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.caseLogs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var caseLog = _step3.value;

						var user = groupedCaseLogs.get(caseLog.user.id);
						if (!user) {
							user = Object.assign(caseLog.user);
							user.caseLogs = [];
						}
						user.caseLogs.push(caseLog);
						groupedCaseLogs.set(user.id, user);
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

				return Array.from(groupedCaseLogs.values());
			}
		},

		mounted: function mounted() {
			this.fetchCaseLogs();
		},


		methods: {
			fetchCaseLogs: function fetchCaseLogs() {
				var _this = this;

				var query = $.param({
					with: {
						location: ['name'],
						user: ['full_name'],
						detailsSchema: true
					}
				});

				fetch('/case_logs?' + query, {
					headers: Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["t" /* jsonOrThrow */]).then(function (caseLogs) {
					_this.caseLogs = caseLogs;
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching case logs'
					});
				});
			},
			deleteCaseLog: function deleteCaseLog(caseLogId) {
				var _this2 = this;

				fetch('/case_logs/' + caseLogId, {
					method: 'POST', // DELETE
					headers: Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						_method: 'DELETE'
					})
				}).then(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["w" /* okOrThrow */]).then(function () {
					_this2.removeCaseLog(caseLogId);
				}).catch(function (err) {
					console.error(err);
					_this2.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> there was a problem deleting the case log entry'
					});
				});
			},
			removeCaseLog: function removeCaseLog(id) {
				this.caseLogs = this.caseLogs.filter(function (caseLog) {
					return caseLog.id !== id;
				});
			},
			handleEditorSubmit: function handleEditorSubmit() {
				this.show.addCaseLog = false;
				this.fetchCaseLogs();
			}
		},

		components: {
			ComponentList: __WEBPACK_IMPORTED_MODULE_4__vue_components_ComponentList_vue__["a" /* default */],
			ShowHideButton: __WEBPACK_IMPORTED_MODULE_5__vue_components_ShowHideButton_vue__["a" /* default */],
			CaseLogs: __WEBPACK_IMPORTED_MODULE_6__vue_components_CaseLog_CaseLogs_vue__["a" /* default */],
			VueFlatpickr: __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__["default"],
			CaseLogEditor: __WEBPACK_IMPORTED_MODULE_7__vue_components_CaseLog_Editor_vue__["a" /* default */],
			CaseLogEditorV1: __WEBPACK_IMPORTED_MODULE_8__vue_components_CaseLog_V1_Editor_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 827:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CaseLogs_vue__ = __webpack_require__(828);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6e2f1222_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CaseLogs_vue__ = __webpack_require__(838);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_CaseLogs_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6e2f1222_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_CaseLogs_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/CaseLog/CaseLogs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6e2f1222", Component.options)
  } else {
    hotAPI.reload("data-v-6e2f1222", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 828:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Viewer_vue__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__V1_Details_vue__ = __webpack_require__(852);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__V1_DetailsReport_vue__ = __webpack_require__(855);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		caseLogs: {
			type: Array,
			required: true
		},
		locations: {
			type: Array,
			required: true
		},
		removable: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			detailsCaseLog: null,

			show: {
				charts: false
			}
		};
	},


	computed: {
		detailsComponent: function detailsComponent() {
			try {
				if (this.detailsCaseLog.details_schema.case_log_version === 2) return 'CaseLogViewer';
			} catch (e) {
				console.error(e);
			}

			return 'CaseLogDetailsV1';
		},
		thead: function thead() {
			return [['#', 'Location', 'Date', 'Type', '']];
		},
		tconfig: function tconfig() {
			var removeCaseLog = this.removeCaseLog;
			var renderCaseLog = this.renderCaseLog;
			var alerts = this.alerts;
			var removable = this.removable;

			var columns = [{ data: 'id' }, { data: 'location.name' }, { data: 'case_date', render: __WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__["i" /* renderDateCell */], createdCell: __WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__["a" /* createDateCell */] }, { data: 'details_schema.details_type', render: function render(detailsType) {
					if (detailsType) return detailsType.toUpperCase();

					return '';
				}
			}, {
				data: null,
				orderable: false,
				searchable: false,
				render: function render() {
					var parts = [];
					parts.push('<span>');
					parts.push('<button class="btn btn-sm btn-info"\n\t\t\t\t\t\t\t\t\t@click="viewCaseLog">\n\t\t\t\t\t\t\t\t<span class="glyphicon glyphicon-list-alt"></span>\n\t\t\t\t\t\t\t\tView\n\t\t\t\t\t\t\t</button>');

					if (removable) parts.push('<confirmation-button class="btn btn-sm"\n\t\t\t\t\t\t\t\t\t\tunpressed-class="btn-danger"\n\t\t\t\t\t\t\t\t\t\tpressed-class="btn-warning"\n\t\t\t\t\t\t\t\t\t\t@click="deleteCaseLog">\n\t\t\t\t\t\t\t\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t\t\t\t\t\t\t\tDelete\n\t\t\t\t\t\t\t\t</confirmation-button>');

					parts.push('</span>');
					return parts.join(' ');
				},
				createdCell: function createdCell(el, caseLog) {
					el.className = 'text-right';

					new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
						el: el,
						methods: {
							deleteCaseLog: function deleteCaseLog() {
								fetch('/case_logs/' + caseLog.id, {
									method: 'POST', // DELETE
									headers: Object(__WEBPACK_IMPORTED_MODULE_8__modules_utils_js__["n" /* getFetchHeaders */])(),
									credentials: 'same-origin',
									body: JSON.stringify({
										_method: 'DELETE'
									})
								}).then(__WEBPACK_IMPORTED_MODULE_8__modules_utils_js__["w" /* okOrThrow */]).then(function () {
									removeCaseLog(caseLog.id);
								}).catch(function (err) {
									console.error(err);
									alerts.push({
										type: 'error',
										html: '<strong>\n\t\t\t\t\t\t\t\t\t\t\t\tError:\n\t\t\t\t\t\t\t\t\t\t\t</strong>\n\t\t\t\t\t\t\t\t\t\t\tThere was a problem deleting the case log entry'
									});
								});
							},
							viewCaseLog: function viewCaseLog() {
								renderCaseLog(caseLog);
							}
						},
						components: {
							ConfirmationButton: __WEBPACK_IMPORTED_MODULE_1__ConfirmationButton_vue__["a" /* default */]
						}
					});
				}
			}];

			return {
				columns: columns,
				order: [[0, 'desc']]
			};
		}
	},

	methods: {
		renderCaseLog: function renderCaseLog(caseLog) {
			this.detailsCaseLog = caseLog;
		},
		removeCaseLog: function removeCaseLog(caseLogId) {
			this.$emit('delete', caseLogId);
		},
		closeCaseLog: function closeCaseLog() {
			this.detailsCaseLog = null;
		}
	},

	components: {
		DataTable: __WEBPACK_IMPORTED_MODULE_2__DataTable_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__["a" /* default */],
		CaseLogViewer: __WEBPACK_IMPORTED_MODULE_4__Viewer_vue__["a" /* default */],

		CaseLogDetailsV1: __WEBPACK_IMPORTED_MODULE_5__V1_Details_vue__["a" /* default */],
		CaseLogDetailsReportV1: __WEBPACK_IMPORTED_MODULE_6__V1_DetailsReport_vue__["a" /* default */]

	}
});

/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _vm.show.charts
        ? _c("case-log-details-report", {
            attrs: { "case-logs": _vm.caseLogs }
          })
        : _vm._e(),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "text-center" },
        [
          _c(
            "show-hide-button",
            {
              staticClass: "btn btn-info",
              model: {
                value: _vm.show.charts,
                callback: function($$v) {
                  _vm.show.charts = $$v
                },
                expression: "show.charts"
              }
            },
            [
              _vm._v("\n\t\t\tcharts\n\t\t\t"),
              _c("template", { attrs: { slot: "glyph" }, slot: "glyph" })
            ],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("data-table", {
        attrs: { thead: _vm.thead, config: _vm.tconfig, data: _vm.caseLogs }
      }),
      _vm._v(" "),
      _vm.detailsCaseLog
        ? _c(_vm.detailsComponent, {
            tag: "component",
            attrs: { "case-log": _vm.detailsCaseLog, locations: _vm.locations },
            on: { close: _vm.closeCaseLog }
          })
        : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-6e2f1222", esExports)
  }
}

/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Editor_vue__ = __webpack_require__(841);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_139e2b46_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Editor_vue__ = __webpack_require__(846);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(840)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Editor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_139e2b46_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Editor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/CaseLog/Editor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-139e2b46", Component.options)
  } else {
    hotAPI.reload("data-v-139e2b46", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 840:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_vue__ = __webpack_require__(858);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		formTitle: {
			type: String,
			required: false
		},
		schema: {
			type: Object,
			required: true
		},
		detailsSchemaId: {
			type: Number,
			required: true
		},
		locations: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	data: function data() {
		return {
			location: null,
			caseDate: Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateString"])(new Date()),
			comments: '',

			schemaTitle: this.schema ? this.schema.title || '' : '',
			sections: this.schema ? this.schema.sections || [] : []
		};
	},
	mounted: function mounted() {},


	methods: {
		handleInput: function handleInput(_ref) {
			var sections = _ref.sections;

			this.sections = sections;
		},
		handleSubmit: function handleSubmit(event) {
			var _this = this;

			event.preventDefault();

			fetch('/case_logs', Object.assign({
				method: 'POST'
			}, Object(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["f" /* fetchConfig */])(), {
				body: JSON.stringify({
					location_id: this.location,
					case_date: this.caseDate,
					comment: this.comments,
					details_schema_id: this.detailsSchemaId,
					details: {
						title: this.schemaTitle,
						sections: this.sections
					}
				})
			})).then(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["w" /* okOrThrow */]).then(function () {
				_this.$emit('submit');
			}).catch(function (err) {
				console.error(err);
				_this.$emit('alert', Object(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["x" /* simpleErrorAlert */])('There was a problem submitting the case log'));
			});
		}
	},

	components: {
		CaseLogForm: __WEBPACK_IMPORTED_MODULE_0__Form_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Questionnaire_vue__ = __webpack_require__(844);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_81e012dc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Questionnaire_vue__ = __webpack_require__(845);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(843)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Questionnaire_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_81e012dc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Questionnaire_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Questionnaire.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-81e012dc", Component.options)
  } else {
    hotAPI.reload("data-v-81e012dc", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 843:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_index_js__ = __webpack_require__(140);
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		formTitle: {
			type: String,
			default: ''
		},
		sections: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	data: function data() {
		return {
			showErrors: false
		};
	},


	computed: {
		questions: function questions() {
			return Object(__WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_index_js__["b" /* getQuestions */])(this);
		},
		conditionChecker: function conditionChecker() {
			return Object(__WEBPACK_IMPORTED_MODULE_2__modules_questionnaire_index_js__["a" /* getConditionChecker */])(this.questions);
		}
	},

	methods: {
		handleInput: function handleInput(index, section) {
			var sections = this.sections.slice();
			sections[index] = Object.assign({}, sections[index], section);

			this.$emit('input', { sections: sections });
		}
	},

	components: {
		QuestionnaireSection: __WEBPACK_IMPORTED_MODULE_0__Section_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "questionnaire" }, [
    _c("h1", [_vm._v(_vm._s(_vm.formTitle))]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "questionnaire-sections" },
      _vm._l(_vm.sections, function(section, index) {
        return _c(
          "questionnaire-section",
          _vm._b(
            {
              directives: [
                {
                  name: "show",
                  rawName: "v-show",
                  value:
                    !section.condition ||
                    _vm.conditionChecker(section.condition),
                  expression:
                    "!section.condition || conditionChecker(section.condition)"
                }
              ],
              key: index,
              attrs: {
                "condition-checker": _vm.conditionChecker,
                "show-errors": _vm.showErrors,
                readonly: _vm.readonly
              },
              on: {
                input: function($event) {
                  _vm.handleInput(index, arguments[0])
                }
              }
            },
            "questionnaire-section",
            section,
            false
          )
        )
      })
    ),
    _vm._v(" "),
    _c(
      "div",
      [
        _c(
          "show-hide-button",
          {
            staticClass: "btn-default",
            model: {
              value: _vm.showErrors,
              callback: function($$v) {
                _vm.showErrors = $$v
              },
              expression: "showErrors"
            }
          },
          [
            _vm._v("\n\t\t\terror messages\n\t\t\t"),
            _c("template", { attrs: { slot: "glyph" }, slot: "glyph" })
          ],
          2
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
    require("vue-hot-reload-api")      .rerender("data-v-81e012dc", esExports)
  }
}

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container body-block" }, [
    _c(
      "form",
      {
        staticClass: "case-log-editor",
        attrs: { role: "form" },
        on: { submit: _vm.handleSubmit }
      },
      [
        _c("h3", [_vm._v(_vm._s(_vm.formTitle))]),
        _vm._v(" "),
        _c("case-log-form", {
          attrs: {
            "form-title": _vm.formTitle,
            locations: _vm.locations,
            sections: _vm.sections,
            location: _vm.location,
            "case-date": _vm.caseDate,
            comments: _vm.comments,
            readonly: _vm.readonly
          },
          on: {
            "location-input": function($event) {
              _vm.location = arguments[0]
            },
            "case-date-input": function($event) {
              _vm.caseDate = arguments[0]
            },
            "comments-input": function($event) {
              _vm.comments = arguments[0]
            },
            "questionnaire-input": _vm.handleInput
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "text-center" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-default",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.$emit("close")
                }
              }
            },
            [_vm._v("\n\t\t\t\tCancel\n\t\t\t")]
          ),
          _vm._v(" "),
          _c(
            "button",
            { staticClass: "btn btn-primary", attrs: { type: "submit" } },
            [_vm._v("\n\t\t\t\tSubmit\n\t\t\t")]
          )
        ])
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
    require("vue-hot-reload-api")      .rerender("data-v-139e2b46", esExports)
  }
}

/***/ }),

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Editor_vue__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b77c743e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Editor_vue__ = __webpack_require__(849);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Editor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b77c743e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Editor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/CaseLog/V1/Editor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b77c743e", Component.options)
  } else {
    hotAPI.reload("data-v-b77c743e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 848:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_case_log_details_schema_js__ = __webpack_require__(171);
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







/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		formTitle: {
			type: String,
			default: ''
		},
		schema: {
			type: Object,
			required: true
		},
		locations: {
			type: Array,
			required: true
		}
	},

	mounted: function mounted() {
		Object(__WEBPACK_IMPORTED_MODULE_1__modules_case_log_details_schema_js__["e" /* renderCaseLogDetailsSchema */])(this.schema, undefined, this.$refs.detailsContainer);
	},


	methods: {
		addCaseLog: function addCaseLog(event) {
			var _this = this;

			event.preventDefault();

			var body = new FormData(this.$refs.addLogForm);
			fetch('/case_logs', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["n" /* getFetchHeaders */])({ contentType: null }),
				credentials: 'same-origin',
				body: body
			}).then(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["w" /* okOrThrow */]).then(function () {
				_this.$emit('submit');
			}).catch(function (err) {
				console.error(err);
				_this.$emit('alert', Object(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["x" /* simpleErrorAlert */])('There was a problem adding the case log entry'));
			});
		}
	},

	components: {
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__["default"]
	}
});

/***/ }),

/***/ 849:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container body-block" }, [
    _c("h2", [_vm._v("Add entry")]),
    _vm._v(" "),
    _c(
      "form",
      {
        ref: "addLogForm",
        attrs: { role: "form", method: "post", action: "/case_logs" },
        on: { submit: _vm.addCaseLog }
      },
      [
        _c("h3", [_vm._v(_vm._s(_vm.formTitle))]),
        _vm._v(" "),
        _c("section", { staticClass: "case-info" }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-md-4" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", { staticClass: "containing-label" }, [
                  _vm._v("\n\t\t\t\t\t\t\tLocation\n\t\t\t\t\t\t\t"),
                  _c(
                    "select",
                    {
                      staticClass: "form-control",
                      attrs: { name: "location_id" }
                    },
                    _vm._l(_vm.locations, function(location) {
                      return _c(
                        "option",
                        { domProps: { value: location.id } },
                        [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t\t\t" +
                              _vm._s(location.name) +
                              "\n\t\t\t\t\t\t\t\t"
                          )
                        ]
                      )
                    })
                  )
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-4" }, [
              _c("div", { staticClass: "form-group" }, [
                _c(
                  "label",
                  { staticClass: "containing-label" },
                  [
                    _vm._v("\n\t\t\t\t\t\t\tCase Date\n\t\t\t\t\t\t\t"),
                    _c("vue-flatpickr", {
                      staticClass: "form-control appear-not-readonly",
                      attrs: { name: "case_date" }
                    })
                  ],
                  1
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _vm._m(0)
        ]),
        _vm._v(" "),
        _c("input", {
          attrs: { type: "hidden", name: "details_schema_id" },
          domProps: { value: _vm.detailsSchema.id }
        }),
        _vm._v(" "),
        _c("section", { ref: "detailsContainer", staticClass: "case-details" }),
        _vm._v(" "),
        _vm._m(1)
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-12" }, [
        _c("div", { staticClass: "form-group" }, [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("\n\t\t\t\t\t\t\tComments\n\t\t\t\t\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { name: "comment" }
            })
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-primary center-block",
        attrs: { type: "submit" }
      },
      [
        _c("span", { staticClass: "glyphicon glyphicon-plus" }),
        _vm._v("\n\t\t\tAdd entry\n\t\t")
      ]
    )
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-b77c743e", esExports)
  }
}

/***/ }),

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Details_vue__ = __webpack_require__(853);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aec16204_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Details_vue__ = __webpack_require__(854);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Details_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_aec16204_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Details_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/CaseLog/V1/Details.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aec16204", Component.options)
  } else {
    hotAPI.reload("data-v-aec16204", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 853:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_case_log_details_schema_js__ = __webpack_require__(171);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		caseLog: {
			type: Object,
			required: true
		},
		locations: {
			type: Array,
			required: true
		}
	},

	mounted: function mounted() {
		this.renderDetails();
	},


	watch: {
		caseLog: function caseLog() {
			this.renderDetails();
		}
	},

	methods: {
		renderDetails: function renderDetails() {
			$(this.$refs.container).find("select[name='location_id']").val(this.caseLog.location_id).change();
			$(this.$refs.container).find("input[name='case_date']").val(__WEBPACK_IMPORTED_MODULE_0_moment___default()(this.caseLog.case_date).format("ll")).change();
			$(this.$refs.container).find("textarea[name='comment']").val(this.caseLog.comment);

			while (this.$refs.schemaContainer.firstChild) {
				this.$refs.schemaContainer.removeChild(this.$refs.schemaContainer.firstChild);
			}Object(__WEBPACK_IMPORTED_MODULE_1__modules_case_log_details_schema_js__["e" /* renderCaseLogDetailsSchema */])(this.caseLog.details_schema.schema, this.caseLog.details, this.$refs.schemaContainer);
			$(this.$refs.container).find("input, select").prop("disabled", true);
			$(this.$refs.container).find("textarea").prop("readonly", true);
			$(this.$refs.container).velocity("fadeIn");
		}
	}
});

/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "container", staticClass: "panel panel-default" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "panel-body" }, [
      _c("section", { staticClass: "case-info" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-4" }, [
            _c("div", { staticClass: "form-group" }, [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\t\t\t\t\tLocation\n\t\t\t\t\t\t\t"),
                _c(
                  "select",
                  {
                    staticClass: "form-control",
                    attrs: { name: "location_id" }
                  },
                  _vm._l(_vm.locations, function(location) {
                    return _c("option", { domProps: { value: location.id } }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t\t\t\t" +
                          _vm._s(location.name) +
                          "\n\t\t\t\t\t\t\t\t"
                      )
                    ])
                  })
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _vm._m(1)
        ]),
        _vm._v(" "),
        _vm._m(2)
      ]),
      _vm._v(" "),
      _c("div", { ref: "schemaContainer" })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "panel-footer text-center" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-default",
          on: {
            click: function($event) {
              _vm.$emit("close")
            }
          }
        },
        [_vm._v("\n\t\t\tClose\n\t\t")]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "panel-heading" }, [
      _c("span", { staticClass: "panel-title" }, [_vm._v("Case log details")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-4" }, [
      _c("div", { staticClass: "form-group" }, [
        _c("label", { staticClass: "containing-label" }, [
          _vm._v("Case Date\n\t\t\t\t\t\t\t"),
          _c("div", { staticClass: "input-group date datetimepicker" }, [
            _c("input", {
              staticClass: "form-control case-log-case-date",
              attrs: { type: "text", name: "case_date" }
            }),
            _vm._v(" "),
            _c("span", { staticClass: "input-group-addon" }, [
              _c("span", { staticClass: "glyphicon glyphicon-calendar" })
            ])
          ])
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-12" }, [
        _c("div", { staticClass: "form-group" }, [
          _c("label", { staticClass: "containing-label" }, [
            _vm._v("Comments\n\t\t\t\t\t\t\t"),
            _c("textarea", {
              staticClass: "form-control",
              attrs: { name: "comment" }
            })
          ])
        ])
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
    require("vue-hot-reload-api")      .rerender("data-v-aec16204", esExports)
  }
}

/***/ }),

/***/ 855:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_DetailsReport_vue__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6c3e61d2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_DetailsReport_vue__ = __webpack_require__(857);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_DetailsReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6c3e61d2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_DetailsReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/CaseLog/V1/DetailsReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c3e61d2", Component.options)
  } else {
    hotAPI.reload("data-v-6c3e61d2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 856:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_case_log_details_schema_js__ = __webpack_require__(171);
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		caseLogs: {
			type: Array,
			required: true
		}
	},

	data: function data() {
		return {
			charts: {}
		};
	},
	mounted: function mounted() {
		this.renderReport();
		$('#case-log-details-report-name').change(this.renderReport);
	},


	methods: {
		renderReport: function renderReport() {
			var name = $('#case-log-details-report-name').val();
			var report = Object(__WEBPACK_IMPORTED_MODULE_0__modules_case_log_details_schema_js__["b" /* generateCaseLogDetailsReport */])(this.caseLogs);
			this.charts = Object(__WEBPACK_IMPORTED_MODULE_0__modules_case_log_details_schema_js__["c" /* generateCaseLogDetailsReportCharts */])(report, name, this.$refs.statsContainer, this.charts);
			Object(__WEBPACK_IMPORTED_MODULE_0__modules_case_log_details_schema_js__["d" /* generateCaseLogLocationReportTable */])(report, name, this.$refs.statsContainer);
		}
	},

	destroyed: function destroyed() {
		$('#case-log-details-report-name').off('change', this.renderReport);
	}
});

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "statsContainer" })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6c3e61d2", esExports)
  }
}

/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Form_vue__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d00a834_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Form_vue__ = __webpack_require__(860);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Form_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4d00a834_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Form_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/CaseLog/Form.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4d00a834", Component.options)
  } else {
    hotAPI.reload("data-v-4d00a834", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Questionnaire_vue__ = __webpack_require__(842);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		locations: {
			type: Array,
			required: true
		},
		sections: {
			type: Array,
			required: true
		},
		location: {
			type: Number,
			required: false
		},
		caseDate: {
			type: String,
			required: false
		},
		comments: {
			type: String,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	components: {
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__["default"],
		QuestionnaireQuestionnaire: __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Questionnaire_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("section", { staticClass: "case-info" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-4" }, [
            _c("div", { staticClass: "form-group" }, [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\t\t\t\tLocation\n\t\t\t\t\t\t"),
                _c(
                  "select",
                  {
                    staticClass: "form-control",
                    attrs: { disabled: _vm.readonly, required: "" },
                    domProps: { value: _vm.location },
                    on: {
                      change: function($event) {
                        _vm.$emit("location-input", Number($event.target.value))
                      }
                    }
                  },
                  _vm._l(_vm.locations, function(loc) {
                    return _c("option", { domProps: { value: loc.id } }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t\t\t" +
                          _vm._s(loc.name) +
                          "\n\t\t\t\t\t\t\t"
                      )
                    ])
                  })
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-4" }, [
            _c("div", { staticClass: "form-group" }, [
              _c(
                "label",
                { staticClass: "containing-label" },
                [
                  _vm._v("\n\t\t\t\t\t\tCase Date\n\t\t\t\t\t\t"),
                  _c("vue-flatpickr", {
                    staticClass: "form-control",
                    class: { "appear-not-readonly": !_vm.readonly },
                    attrs: {
                      value: _vm.caseDate,
                      readonly: _vm.readonly,
                      required: ""
                    },
                    on: {
                      input: function($event) {
                        _vm.$emit("case-date-input", arguments[0])
                      }
                    }
                  })
                ],
                1
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-12" }, [
            _c("div", { staticClass: "form-group" }, [
              _c("label", { staticClass: "containing-label" }, [
                _vm._v("\n\t\t\t\t\t\tComments\n\t\t\t\t\t\t"),
                _c("textarea", {
                  staticClass: "form-control",
                  attrs: { readonly: _vm.readonly, required: "" },
                  domProps: { value: _vm.comments },
                  on: {
                    input: function($event) {
                      _vm.$emit("comments-input", $event.target.value)
                    }
                  }
                })
              ])
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _c("questionnaire-questionnaire", {
        attrs: { sections: _vm.sections, readonly: _vm.readonly },
        on: {
          input: function($event) {
            _vm.$emit("questionnaire-input", arguments[0])
          }
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
    require("vue-hot-reload-api")      .rerender("data-v-4d00a834", esExports)
  }
}

/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Viewer_vue__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02852082_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Viewer_vue__ = __webpack_require__(863);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Viewer_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02852082_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Viewer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/CaseLog/Viewer.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02852082", Component.options)
  } else {
    hotAPI.reload("data-v-02852082", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 862:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form_vue__ = __webpack_require__(858);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		caseLog: {
			type: Object,
			required: true
		},
		locations: {
			type: Array,
			required: true
		}
	},

	computed: {
		title: function title() {
			return this.caseLog && this.caseLog.details && this.caseLog.details.title ? this.caseLog.details.title : '';
		}
	},

	components: {
		CaseLogForm: __WEBPACK_IMPORTED_MODULE_0__Form_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 863:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "case-log-viewer panel panel-default" }, [
    _c("div", { staticClass: "panel-heading" }, [
      _c("h3", { staticClass: "panel-title" }, [_vm._v(_vm._s(_vm.title))])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "panel-body" },
      [
        _c("case-log-form", {
          attrs: {
            sections: _vm.caseLog.details.sections,
            location: _vm.caseLog.location_id,
            "case-date": _vm.caseLog.case_date,
            comments: _vm.caseLog.comment,
            locations: _vm.locations,
            readonly: ""
          }
        })
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "panel-footer text-center" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-default",
          attrs: { type: "button" },
          on: {
            click: function($event) {
              _vm.$emit("close")
            }
          }
        },
        [_vm._v("\n\t\t\tClose\n\t\t")]
      )
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
    require("vue-hot-reload-api")      .rerender("data-v-02852082", esExports)
  }
}

/***/ })

},[826]);
});
//# sourceMappingURL=vue-case-log.js.map