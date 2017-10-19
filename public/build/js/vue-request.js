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

/***/ 636:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createRequest"] = createRequest;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_SelectTwo_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_indefinite__ = __webpack_require__(637);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_indefinite___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_indefinite__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__ = __webpack_require__(26);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();














function createRequest(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		el: el,
		props: {
			user: Object,
			evaluators: Array,
			subjects: Array,
			forms: Array
		},
		propsData: propsData,
		data: function data() {
			var requestType = getRequestType();
			return {
				requestType: requestType,
				subjectId: null,
				evaluatorId: null,
				formId: null,
				evaluationDateJson: null,
				useCustomEvaluationDate: false,
				customEvaluationDate: null,

				requestNote: null,

				sendHash: requestType === 'staff',
				forceNotification: false,
				hashExpiresIn: '30',

				schedule: false,
				requestDate: Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["isoDateString"])(new Date()),

				allowMultiple: {
					subjects: false,
					evaluators: false,
					evaluationDate: false
				},

				error: {
					subjectId: null,
					evaluatorId: null,
					formId: null,
					evaluationDate: null
				}
			};
		},

		computed: {
			flatpickrOptions: function flatpickrOptions() {
				var academicYear = Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["academicYearForDate"])(new Date());

				return {
					altInput: true,
					altInputClass: 'form-control appear-not-readonly',
					enableTime: true,
					enableSeconds: true,
					minuteIncrement: 60,
					minDate: academicYear.startDate,
					maxDate: academicYear.endDate
				};
			},
			customEvalFlatpickrOptions: function customEvalFlatpickrOptions() {
				return {
					altInput: true,
					altInputClass: 'form-control appear-not-readonly',
					mode: 'range'
				};
			},
			required: function required() {
				var required = {
					subjectId: true,
					evaluatorId: true,
					formId: true,
					evaluationDate: true
				};

				if (['resident', 'self'].includes(this.requestType) && this.user.type === 'resident' || this.requestType === 'app' && this.user.type === 'app') required.subjectId = false;

				if (this.requestType === 'resident' && this.user.type === 'faculty' || this.requestType === 'staff' && this.user.type === 'staff' || this.requestType === 'faculty' && this.user.type === 'resident' || this.requestType === 'app' && this.user.type === 'faculty' || this.requestType === 'self') required.evaluatorId = false;

				return required;
			},
			requirementsAreMet: function requirementsAreMet() {
				var _this = this;

				return !Object.keys(this.required).some(function (requirement) {
					return _this.required[requirement] && (!_this[requirement] || _this[requirement].length === 0);
				});
			},
			fieldNouns: function fieldNouns() {
				return {
					subjectId: 'subject',
					evaluatorId: 'evaluator',
					formId: 'form',
					evaluationDate: 'evaluation date'
				};
			},
			subject: function subject() {
				var subjectId = Number(this.subjectId);
				return this.subjects[0].find(function (subject) {
					return subject.id === subjectId;
				});
			},
			evaluatorOptions: function evaluatorOptions() {
				return Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["q" /* groupUsers */])(this.evaluators[0]);
			},
			subjectOptions: function subjectOptions() {
				return Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["q" /* groupUsers */])(this.subjects[0]);
			},
			subjectForms: function subjectForms() {
				var forms = this.forms;
				if (this.subjectId && this.subject && this.subject.type === 'resident') {
					forms = this.subject.training_level === 'fellow' ? forms.filter(function (form) {
						return form.type === 'fellow';
					}) : forms.filter(function (form) {
						return form.type === 'resident';
					});
				}

				return forms;
			},
			formOptions: function formOptions() {
				return Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["o" /* groupForms */])(this.subjectForms);
			},
			evaluationDate: function evaluationDate() {
				if (this.useCustomEvaluationDate && this.customEvaluationDate) {
					try {
						var _customEvaluationDate = this.customEvaluationDate.split('to').map(function (s) {
							return s.trim();
						}),
						    _customEvaluationDate2 = _slicedToArray(_customEvaluationDate, 2),
						    startDate = _customEvaluationDate2[0],
						    endDate = _customEvaluationDate2[1];

						return {
							startDate: startDate,
							endDate: endDate
						};
					} catch (e) {
						console.error('Error with custom eval date, using non-custom', e);
					}
				}

				if (this.evaluationDateJson) return Array.isArray(this.evaluationDateJson) ? this.evaluationDateJson.map(JSON.parse) : JSON.parse(this.evaluationDateJson);
			},
			evaluationDates: function evaluationDates() {
				var _this2 = this;

				var form = this.forms.find(function (form) {
					return form.id === Number(_this2.formId);
				});

				if (!form) return;

				var dates = [];

				if (this.user.type === 'admin' && this.schedule) {
					var requestDate = __WEBPACK_IMPORTED_MODULE_4_moment___default()(this.requestDate);
					switch (form.evaluation_period_type) {
						case 'year':
							dates = [Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["currentYear"])()];
							break;
						case 'quarter':
							dates = Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["quartersInAcademicYear"])().filter(function (quarter) {
								return quarter.startDate <= requestDate;
							});
							break;
						case 'month':
						default:
							dates = Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["monthsInAcademicYear"])().filter(function (month) {
								return month.startDate <= requestDate;
							});
					}
				} else {
					var today = __WEBPACK_IMPORTED_MODULE_4_moment___default()();
					var threeMonthsAgo = __WEBPACK_IMPORTED_MODULE_4_moment___default()().subtract(3, 'months');
					switch (form.evaluation_period_type) {
						case 'year':
							dates = [Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["currentYear"])()];

							if (today.month() === 6 && form.type === 'faculty') {
								dates.unshift(Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["lastYear"])());
							}
							break;
						case 'quarter':
							dates = Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["quartersInAcademicYear"])().filter(function (quarter) {
								return quarter.startDate <= today && quarter.endDate >= threeMonthsAgo;
							});
							break;
						case 'month':
						default:
							dates = Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["monthsInAcademicYear"])().filter(function (month) {
								return month.startDate <= today && month.endDate >= threeMonthsAgo;
							});
							break;
					}
				}

				return dates;
			},
			evaluationDateOptions: function evaluationDateOptions() {
				if (this.evaluationDates) return this.evaluationDates.map(function (date) {
					return {
						id: JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["isoDateStringObject"])(date)),
						text: Object(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["renderDateRange"])(date.startDate, date.endDate)
					};
				});
			},
			requestorIsNotEvaluator: function requestorIsNotEvaluator() {
				return !(['resident', 'app'].includes(this.requestType) && this.user.type === 'faculty' || this.requestType === 'staff' && this.user.type === 'staff' || this.requestType === 'faculty' && this.user.type === 'resident' || this.requestType === 'app' && this.user.type === 'faculty');
			},
			pendingFacultyEvalsThead: function pendingFacultyEvalsThead() {
				return [['#', 'Faculty', 'Form', 'Evaluation date', 'Started', '']];
			},
			pendingFacultyEvalsConfig: function pendingFacultyEvalsConfig() {
				var _this3 = this;

				if (this.user.type !== 'resident' || this.requestType !== 'faculty') return;

				return {
					ajax: {
						url: '/evaluations',
						data: {
							whereHas: {
								form: {
									type: 'faculty'
								}
							},
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							evaluator_id: this.user.id,
							status: 'pending'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
							if (evaluation.requested_by_id === _this3.user.id) return '<button class="btn btn-danger btn-xs cancel-eval-button" ' + 'data-id="' + evaluation.id + '"><span class="glyphicon glyphicon-remove"></span> ' + 'Cancel</button>';

							return '';
						} }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			},
			completeFacultyEvalsThead: function completeFacultyEvalsThead() {
				return [['#', 'Faculty', 'Form', 'Evaluation date', 'Started', 'Completed']];
			},
			completeFacultyEvalsConfig: function completeFacultyEvalsConfig() {
				return {
					ajax: {
						url: '/evaluations',
						data: {
							whereHas: {
								form: {
									type: 'faculty'
								}
							},
							with: {
								subject: ['full_name'],
								form: ['title']
							},
							evaluator_id: this.user.id,
							status: 'complete'
						},
						dataSrc: ''
					},
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["m" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: Object(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: Object(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["c" /* createDateTimeCell */] }],
					order: [[0, 'desc']],
					createdRow: function createdRow(row) {
						$(row).addClass('view-evaluation');
					}
				};
			}
		},
		watch: {
			allowMultiple: function allowMultiple(_allowMultiple) {
				var _this4 = this;

				Object.keys(_allowMultiple).map(function (field) {
					if (_allowMultiple[field] && !Array.isArray(_this4[field])) _this4[field] = [_this4[field]];else if (!_allowMultiple[field] && Array.isArray(_this4[field])) _this4[field] = _this4[field][0];
				});
			},
			subjectId: function subjectId() {
				this.checkField('subjectId', 'subject');
			},
			evaluatorId: function evaluatorId() {
				this.checkField('evaluatorId', 'evaluator');
			},
			formId: function formId() {
				this.checkField('formId', 'form');
			},
			evaluationDate: function evaluationDate() {
				this.checkField('evaluationDate', 'evaluation date');
			},
			evaluationDateOptions: function evaluationDateOptions(options) {
				var _this5 = this;

				if (!options && this.evaluationDateJson) this.evaluationDateJson = null;

				if (!options || !this.evaluationDateJson) return;

				if (Array.isArray(this.evaluationDateJson)) {
					var newJson = options.filter(function (_ref) {
						var id = _ref.id;
						return _this5.evaluationDateJson.includes(id);
					}).map(function (_ref2) {
						var id = _ref2.id;
						return id;
					});

					if (newJson.length !== this.evaluationDateJson.length) this.evaluationDateJson = newJson;
				} else {
					if (!options.some(function (_ref3) {
						var id = _ref3.id;
						return id === _this5.evaluationDateJson;
					})) this.evaluationDateJson = null;
				}
			},
			formOptions: function formOptions() {
				var formId = Number(this.formId);
				if (formId && !this.subjectForms.find(function (form) {
					return form.id === formId;
				})) this.formId = null;
			}
		},
		methods: {
			clearDay: function clearDay() {
				this.$refs.evaluationDayFlatpickr.fp.clear();
			},
			checkField: function checkField(field, noun) {
				this.error[field] = this.required[field] && (!this[field] || this[field].length === 0) ? 'Please select ' + Object(__WEBPACK_IMPORTED_MODULE_5_indefinite__["default"])(noun) : null;

				return this.error[field];
			},
			checkSubmit: function checkSubmit(event) {
				var _this6 = this;

				Object.keys(this.required).map(function (field) {
					_this6.checkField(field, _this6.fieldNouns[field]);
				});

				if (!this.requirementsAreMet) event.preventDefault();
			}
		},
		components: {
			VueFlatpickr: __WEBPACK_IMPORTED_MODULE_1__jacobmischka_vue_flatpickr__["default"],
			EvaluationDataTable: __WEBPACK_IMPORTED_MODULE_2__vue_components_EvaluationDataTable_vue__["a" /* default */],
			SelectTwo: __WEBPACK_IMPORTED_MODULE_3__vue_components_SelectTwo_vue__["a" /* default */]
		}
	});
}

function getRequestType() {
	var paths = window.location.pathname.split('/');
	paths = paths.filter(function (path) {
		return path.length > 0;
	});
	var type = paths[paths.length - 1];

	if (['faculty', 'app', 'staff', 'self'].includes(type)) return type;

	return 'resident';
}

/***/ }),

/***/ 637:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/indefinite/lib/indefinite.js'");

/***/ })

},[636]);
});
//# sourceMappingURL=vue-request.js.map