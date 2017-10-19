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
return webpackJsonp([7],{

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

/***/ 129:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/flatpickr/dist/flatpickr.css'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StartEndDate_vue__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d00f708_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StartEndDate_vue__ = __webpack_require__(147);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(145)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7d00f708"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StartEndDate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d00f708_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StartEndDate_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/StartEndDate.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationDataTable_vue__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c24d553a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationDataTable_vue__ = __webpack_require__(211);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationDataTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c24d553a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationDataTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/EvaluationDataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


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

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearSelector_vue__ = __webpack_require__(164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_672cba10_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearSelector_vue__ = __webpack_require__(165);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearSelector_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_672cba10_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearSelector_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/AcademicYearSelector.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 145:
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flatpickr_dist_flatpickr_css__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_flatpickr_dist_flatpickr_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_flatpickr_dist_flatpickr_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__ = __webpack_require__(10);
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







/* harmony default export */ __webpack_exports__["a"] = ({
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

		camelCaseToWords: __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["b" /* camelCaseToWords */]
	},
	components: {
		VueFlatpickr: __WEBPACK_IMPORTED_MODULE_0__jacobmischka_vue_flatpickr__["default"]
	}
});

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "container", staticClass: "form-horizontal" }, [
    _c("div", { staticClass: "form-group" }, [
      _c("div", { staticClass: "col-md-4" }, [
        _c("label", { staticClass: "containing-label" }, [
          _vm._v("\n\t\t\t\tDate Range\n\t\t\t\t"),
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.dateRange,
                  expression: "dateRange"
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
                  _vm.dateRange = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0]
                }
              }
            },
            _vm._l(_vm.dateRanges, function(range, name) {
              return _c("option", { domProps: { value: name } }, [
                _vm._v(
                  "\n\t\t\t\t\t\t" +
                    _vm._s(_vm.camelCaseToWords(name)) +
                    "\n\t\t\t\t\t"
                )
              ])
            })
          )
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 col-md-4" }, [
        _c(
          "label",
          { staticClass: "containing-label" },
          [
            _vm._v("\n\t\t\t\tStart Date\n\t\t\t\t"),
            _c("vue-flatpickr", {
              staticClass: "form-control",
              attrs: { options: _vm.flatpickrOptions },
              model: {
                value: _vm.startDate,
                callback: function($$v) {
                  _vm.startDate = $$v
                },
                expression: "startDate"
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-6 col-md-4" }, [
        _c(
          "label",
          { staticClass: "containing-label" },
          [
            _vm._v("\n\t\t\t\tEnd Date\n\t\t\t\t"),
            _c("vue-flatpickr", {
              staticClass: "form-control",
              attrs: { options: _vm.flatpickrOptions },
              model: {
                value: _vm.endDate,
                callback: function($$v) {
                  _vm.endDate = $$v
                },
                expression: "endDate"
              }
            })
          ],
          1
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
    require("vue-hot-reload-api")      .rerender("data-v-7d00f708", esExports)
  }
}

/***/ }),

/***/ 164:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__ = __webpack_require__(10);
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
			type: Object,
			required: true
		},
		minDate: {
			type: String,
			default: function _default() {
				return Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateString"])(Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(__WEBPACK_IMPORTED_MODULE_1_moment___default()()).endDate);
			}
		},
		maxDate: {
			type: String,
			default: function _default() {
				return Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateString"])(Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(__WEBPACK_IMPORTED_MODULE_1_moment___default()().add(1, 'year')).startDate);
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
				years.push(Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["academicYearForDate"])(d.clone()));

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
			if (index !== lastIndex) this.$emit('input', Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["isoDateStringObject"])(this.academicYears[index]));
		}
	},

	methods: {
		matchIndexWithValue: function matchIndexWithValue(value) {
			var newIndex = this.academicYears.findIndex(function (year) {
				return Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["datesEqual"])(year, value);
			});

			if (newIndex !== -1) this.yearIndex = newIndex;
		},

		renderDateRange: __WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["renderDateRange"]
	},

	components: {
		SelectTwo: __WEBPACK_IMPORTED_MODULE_0__SelectTwo_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "select-two",
    {
      staticClass: "form-control",
      attrs: { readonly: _vm.readonly },
      model: {
        value: _vm.yearIndex,
        callback: function($$v) {
          _vm.yearIndex = _vm._n($$v)
        },
        expression: "yearIndex"
      }
    },
    _vm._l(_vm.academicYears, function(year, index) {
      return _c("option", { domProps: { value: index } }, [
        _vm._v(
          "\n\t\t" +
            _vm._s(_vm.renderDateRange(year.startDate, year.endDate)) +
            "\n\t"
        )
      ])
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
    require("vue-hot-reload-api")      .rerender("data-v-672cba10", esExports)
  }
}

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_localforage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_localforage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//
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

/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__["a" /* default */],
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
		DataTable: __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__["a" /* default */],
		StartEndDate: __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 210:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/localforage/dist/localforage.js'");

/***/ }),

/***/ 211:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c(
        "fieldset",
        [
          _c("legend", [_vm._v("Evaluation Date filter")]),
          _vm._v(" "),
          _c("start-end-date", {
            attrs: { allTime: true },
            model: {
              value: _vm.dates,
              callback: function($$v) {
                _vm.dates = $$v
              },
              expression: "dates"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "data-table",
        {
          attrs: {
            id: _vm.id,
            striped: _vm.striped,
            bordered: _vm.bordered,
            thead: _vm.thead,
            config: _vm.datedConfig,
            data: _vm.data,
            exportable: _vm.exportable,
            exportFilename: _vm.exportFilename
          }
        },
        [_vm._t("default")],
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
    require("vue-hot-reload-api")      .rerender("data-v-c24d553a", esExports)
  }
}

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

/***/ 299:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cb631b42_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(646);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AcademicYearEvaluationDataTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_cb631b42_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AcademicYearEvaluationDataTable_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/AcademicYearEvaluationDataTable.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

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
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


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

/***/ 39:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/@jacobmischka/vue-flatpickr/dist/index.js'");

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

/***/ 638:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_js__ = __webpack_require__(639);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminDashboard", function() { return __WEBPACK_IMPORTED_MODULE_0__admin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resident_js__ = __webpack_require__(640);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createResidentDashboard", function() { return __WEBPACK_IMPORTED_MODULE_1__resident_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__faculty_js__ = __webpack_require__(641);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_2__faculty_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__staff_js__ = __webpack_require__(642);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStaffDashboard", function() { return __WEBPACK_IMPORTED_MODULE_3__staff_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_js__ = __webpack_require__(643);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAPPDashboard", function() { return __WEBPACK_IMPORTED_MODULE_4__app_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__faculty_admin_js__ = __webpack_require__(644);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_5__faculty_admin_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__faculty_anonymous_js__ = __webpack_require__(647);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAnonymousFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_6__faculty_anonymous_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__faculty_faculty_js__ = __webpack_require__(648);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createFacultyFacultyDashboard", function() { return __WEBPACK_IMPORTED_MODULE_7__faculty_faculty_js__["a"]; });









/***/ }),

/***/ 639:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__ = __webpack_require__(26);









function createAdminDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
				headers: Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["n" /* getFetchHeaders */])(),
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
						headers: Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["n" /* getFetchHeaders */])(),
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
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
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
							render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			appEvalThead: function appEvalThead() {
				return [['#', 'APP', 'Evaluator', 'Form', 'Evaluation date', 'Created', 'Completed', 'Status']];
			},
			appEvalConfig: function appEvalConfig() {
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
									type: 'app'
								}
							}
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_5__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			DataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_DataTable_vue__["a" /* default */],
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_3__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 640:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createResidentDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(26);








function createResidentDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,

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
					}, { data: 'form.title' }, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						} }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
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
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		components: {
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 641:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(26);







function createFacultyDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, orderable: false, searchable: false, render: function render(evaluation) {
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
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			menteeThead: function menteeThead() {
				return [['#', 'Evaluation Form', 'Evaluation Date', 'Requested', 'Completed']];
			},
			menteeConfigs: function menteeConfigs() {
				return this.mentees.map(function (mentee) {
					return {
						ajax: {
							url: '/evaluations',
							data: {
								with: {
									form: ['title']
								},
								subject_id: mentee.id,
								status: 'complete'
							},
							dataSrc: ''
						},
						columns: [{ data: 'url' }, { data: 'form.title' }, {
							data: null,
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
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
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
				return [['#', 'Resident', 'Evaluation Form', 'Evaluation Date', 'Requested', 'Completed']];
			},
			allConfig: function allConfig() {
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
									type: 'resident',
									evaluator_type: 'faculty'
								}
							},
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'subject.full_name', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["q" /* renderSubjectCell */] }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 642:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createStaffDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(26);







function createStaffDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
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
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
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
							render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
							createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
						}, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }, { data: null, orderable: false, searchable: false, render: function render() {
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
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 643:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAPPDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(26);








function createAPPDashboard(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,

		computed: {
			pendingSubjectThead: function pendingSubjectThead() {
				return [['#', 'Evaluator', 'Form', 'Requested', '']];
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
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url' }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
							if (evaluation.requested_by_id === _this.user.id) return '<button class="btn btn-danger btn-xs cancel-eval-button"\n\t\t\t\t\t\t\t\t\t\tdata-id="' + evaluation.id + '">\n\t\t\t\t\t\t\t\t\t<span class="glyphicon glyphicon-remove"></span>\n\t\t\t\t\t\t\t\t\tCancel\n\t\t\t\t\t\t\t\t</button>';

							return '';
						} }]
				};
			},
			completeThead: function completeThead() {
				return [['#', 'Evaluator', 'Form', 'Evaluation date', 'Requested', 'Completed']];
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'evaluator.full_name', render: function render(name) {
							if (!name) return '<i>Anonymous</i>';

							return name;
						}
					}, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["c" /* createDateTimeCell */] }]
				};
			}
		},

		components: {
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 644:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(26);







function createAdminFacultyDashboard(el) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
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
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_0__EvaluationDataTable_vue__["a" /* default */],
	props: {
		startDate: {
			type: String,
			default: '2015-07-01' // Year faculty evals released
		}
	},
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_3__modules_date_utils_js__["academicYearForDate"])(new Date())
		};
	},


	components: {
		AcademicYearSelector: __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__["a" /* default */],
		DataTable: __WEBPACK_IMPORTED_MODULE_1__DataTable_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 646:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "form-group" }, [
          _c(
            "label",
            { staticClass: "containing-label" },
            [
              _vm._v("\n\t\t\t\tAcademic year\n\t\t\t\t"),
              _c("academic-year-selector", {
                attrs: { "min-date": _vm.startDate },
                model: {
                  value: _vm.dates,
                  callback: function($$v) {
                    _vm.dates = $$v
                  },
                  expression: "dates"
                }
              })
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "data-table",
        {
          attrs: {
            id: _vm.id,
            striped: _vm.striped,
            bordered: _vm.bordered,
            thead: _vm.thead,
            config: _vm.datedConfig,
            data: _vm.data,
            exportable: _vm.exportable,
            exportFilename: _vm.exportFilename
          }
        },
        [_vm._t("default")],
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
    require("vue-hot-reload-api")      .rerender("data-v-cb631b42", esExports)
  }
}

/***/ }),

/***/ 647:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createAnonymousFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(26);







function createAnonymousFacultyDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
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
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 648:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createFacultyFacultyDashboard;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__ = __webpack_require__(26);







function createFacultyFacultyDashboard(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["r" /* renderSubjectEvalUrl */] }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_3__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},

		components: {
			AlertList: __WEBPACK_IMPORTED_MODULE_1__vue_components_AlertList_vue__["a" /* default */],
			AcademicYearEvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_AcademicYearEvaluationDataTable_vue__["a" /* default */]
		}
	});
}

/***/ })

},[638]);
});
//# sourceMappingURL=vue-dashboard.js.map