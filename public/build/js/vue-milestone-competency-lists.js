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
//
//
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

/***/ 111:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 114:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('button', {
    staticClass: "btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('input', !_vm.value)
      }
    }
  }, [_vm._t("left-glyph"), _vm._v(" "), (_vm.value) ? _vm._t("true", [_vm._v("\n\t\tHide\n\t")]) : _vm._t("false", [_vm._v("\n\t\tShow\n\t")]), _vm._v(" "), _vm._t("default", [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t")]), _vm._v(" "), _vm._t("glyph", [_c('span', {
    staticClass: "glyphicon glyphicon-triangle-bottom"
  })])], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-38459c74", module.exports)
  }
}

/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(111)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(110),
  /* template */
  __webpack_require__(114),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-38459c74",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ShowHideButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ShowHideButton.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(496)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(321),
  /* template */
  __webpack_require__(659),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-6b55c4f7",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MilestoneCompetencyQuestionLists.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6b55c4f7", Component.options)
  } else {
    hotAPI.reload("data-v-6b55c4f7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 321:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
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





/* harmony default export */ __webpack_exports__["default"] = ({
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
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["d" /* ucfirst */])(str);
		}
	},
	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
});

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["renderMilestoneCompetencyLists"] = renderMilestoneCompetencyLists;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue__);




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
				return h(__WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue___default.a, {
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

/***/ 496:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 659:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.showLists),
      expression: "showLists"
    }],
    staticClass: "milestone-competency-question-lists row"
  }, _vm._l((_vm.groups), function(group, groupName) {
    return _c('div', {
      staticClass: "col-sm-6"
    }, [_c('div', {
      staticClass: "panel panel-info milestones-panel"
    }, [_c('div', {
      staticClass: "panel-heading"
    }, [_c('h4', {
      staticClass: "panel-title"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.ucfirst(groupName)) + "\n\t\t\t\t")]), _vm._v(" "), _c('show-hide-button', {
      staticClass: "description-button btn btn-info btn-xs",
      model: {
        value: (_vm.showDescriptions[groupName]),
        callback: function($$v) {
          var $$exp = _vm.showDescriptions,
            $$idx = groupName;
          if (!Array.isArray($$exp)) {
            _vm.showDescriptions[groupName] = $$v
          } else {
            $$exp.splice($$idx, 1, $$v)
          }
        },
        expression: "showDescriptions[groupName]"
      }
    }, [_vm._v("\n\t\t\t\t\tdescriptions\n\t\t\t\t")])], 1), _vm._v(" "), _c('ul', {
      staticClass: "list-group"
    }, _vm._l((group), function(item) {
      return _c('li', {
        staticClass: "list-group-item"
      }, [_c('b', [_vm._v(_vm._s(item.title))]), _vm._v(" "), _c('span', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: (_vm.showDescriptions[groupName]),
          expression: "showDescriptions[groupName]"
        }]
      }, [_vm._v("\n\t\t\t\t\t\t— " + _vm._s(item.description) + "\n\t\t\t\t\t")])])
    }))])])
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-6b55c4f7", module.exports)
  }
}

/***/ })

},[373]);
});
//# sourceMappingURL=vue-milestone-competency-lists.js.map