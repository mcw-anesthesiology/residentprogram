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
return webpackJsonp([14],{

/***/ 127:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 128:
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

/***/ 129:
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
    require("vue-hot-reload-api")      .rerender("data-v-d60b033e", esExports)
  }
}

/***/ }),

/***/ 668:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["renderMilestoneCompetencyLists"] = renderMilestoneCompetencyLists;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue__ = __webpack_require__(669);




function renderMilestoneCompetencyLists(milestoneQuestions, competencyQuestions) {
	var questionMilestonesCompetencies = {};
	for (var questionId in milestoneQuestions) {
		if (!questionMilestonesCompetencies[questionId]) questionMilestonesCompetencies[questionId] = {
			milestones: [],
			competencies: []
		};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = milestoneQuestions[questionId][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var mq = _step.value;

				questionMilestonesCompetencies[questionId].milestones.push(mq.milestone);
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
	}

	for (var _questionId in competencyQuestions) {
		if (!questionMilestonesCompetencies[_questionId]) questionMilestonesCompetencies[_questionId] = {
			milestones: [],
			competencies: []
		};
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = competencyQuestions[_questionId][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _mq = _step2.value;

				questionMilestonesCompetencies[_questionId].competencies.push(_mq.competency);
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

	var containers = {};
	var toggleButtons = {};
	for (var _questionId2 in questionMilestonesCompetencies) {
		containers[_questionId2] = document.createElement('div');

		var questionPanel = document.querySelector('#' + _questionId2);
		var questionFooter = questionPanel.querySelector('.question-footer');
		if (!questionFooter) {
			questionFooter = document.createElement('div');
			questionFooter.className = 'question-footer panel-footer';
			questionPanel.appendChild(questionFooter);
		}
		var toggleContainer = questionFooter.querySelector('.question-description-toggle');
		if (!toggleContainer) {
			toggleContainer = document.createElement('div');
			toggleContainer.className = 'question-description-toggle';
			questionFooter.appendChild(toggleContainer);
		}

		toggleButtons[_questionId2] = document.createElement('button');
		toggleButtons[_questionId2].type = 'button';
		toggleButtons[_questionId2].className = 'btn btn-info toggle-milestone-competencies-button';
		var glyph = document.createElement('span');
		glyph.className = 'glyphicon glyphicon-list';
		toggleButtons[_questionId2].appendChild(glyph);
		toggleButtons[_questionId2].appendChild(document.createTextNode(' Show milestones and competencies'));
		toggleContainer.appendChild(toggleButtons[_questionId2]);

		questionFooter.appendChild(containers[_questionId2]);
	}

	var vms = {};

	var _loop = function _loop(_questionId3) {
		vms[_questionId3] = new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
			el: containers[_questionId3],
			render: function render(h) {
				return h(__WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue__["a" /* default */], {
					props: {
						milestones: questionMilestonesCompetencies[_questionId3].milestones,
						competencies: questionMilestonesCompetencies[_questionId3].competencies
					}
				});
			}
		});

		toggleButtons[_questionId3].addEventListener('click', function () {
			toggleButtons[_questionId3].classList.toggle('active');
			vms[_questionId3].$children[0].toggleLists();
		});
	};

	for (var _questionId3 in questionMilestonesCompetencies) {
		_loop(_questionId3);
	}
}

/***/ }),

/***/ 669:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_MilestoneCompetencyQuestionLists_vue__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a6140d2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_MilestoneCompetencyQuestionLists_vue__ = __webpack_require__(672);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(670)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0a6140d2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_MilestoneCompetencyQuestionLists_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0a6140d2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_MilestoneCompetencyQuestionLists_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0a6140d2", Component.options)
  } else {
    hotAPI.reload("data-v-0a6140d2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 670:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 671:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['milestones', 'competencies'],
	computed: {
		groups: function groups() {
			return {
				'milestones': this.milestones,
				'competencies': this.competencies
			};
		}
	},
	data: function data() {
		return {
			showLists: false,
			showDescriptions: {
				milestones: false,
				competencies: false
			}
		};
	},

	methods: {
		toggleLists: function toggleLists() {
			this.showLists = !this.showLists;
		},
		toggleDescriptions: function toggleDescriptions(type) {
			if (this.showDescriptions.hasOwnProperty(type)) this.showDescriptions[type] = !this.showDescriptions[type];
		},
		ucfirst: function ucfirst(str) {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["L" /* ucfirst */])(str);
		}
	},
	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 672:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      directives: [
        {
          name: "show",
          rawName: "v-show",
          value: _vm.showLists,
          expression: "showLists"
        }
      ],
      staticClass: "milestone-competency-question-lists row"
    },
    _vm._l(_vm.groups, function(group, groupName) {
      return _c("div", { staticClass: "col-sm-6" }, [
        _c("div", { staticClass: "panel panel-info milestones-panel" }, [
          _c(
            "div",
            { staticClass: "panel-heading" },
            [
              _c("h4", { staticClass: "panel-title" }, [
                _vm._v(
                  "\n\t\t\t\t\t" + _vm._s(_vm.ucfirst(groupName)) + "\n\t\t\t\t"
                )
              ]),
              _vm._v(" "),
              _c(
                "show-hide-button",
                {
                  staticClass: "description-button btn btn-info btn-xs",
                  model: {
                    value: _vm.showDescriptions[groupName],
                    callback: function($$v) {
                      _vm.$set(_vm.showDescriptions, groupName, $$v)
                    },
                    expression: "showDescriptions[groupName]"
                  }
                },
                [_vm._v("\n\t\t\t\t\tdescriptions\n\t\t\t\t")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "ul",
            { staticClass: "list-group" },
            _vm._l(group, function(item) {
              return _c("li", { staticClass: "list-group-item" }, [
                _c("b", [_vm._v(_vm._s(item.title))]),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.showDescriptions[groupName],
                        expression: "showDescriptions[groupName]"
                      }
                    ]
                  },
                  [
                    _vm._v(
                      "\n\t\t\t\t\t\t— " +
                        _vm._s(item.description) +
                        "\n\t\t\t\t\t"
                    )
                  ]
                )
              ])
            })
          )
        ])
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
    require("vue-hot-reload-api")      .rerender("data-v-0a6140d2", esExports)
  }
}

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ShowHideButton_vue__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d60b033e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ShowHideButton_vue__ = __webpack_require__(129);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(127)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d60b033e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ShowHideButton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d60b033e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ShowHideButton_vue__["a" /* default */],
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
    hotAPI.createRecord("data-v-d60b033e", Component.options)
  } else {
    hotAPI.reload("data-v-d60b033e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ })

},[668]);
});
//# sourceMappingURL=vue-milestone-competency-lists.js.map