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
return webpackJsonp([9,11],{

/***/ 127:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(403)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(147),
  /* template */
  __webpack_require__(380),
  /* scopeId */
  "data-v-6b55c4f7",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_utils_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = {
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
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__modules_utils_js__["g" /* ucfirst */])(str);
		}
	},
	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
};

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(48)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(40),
  /* template */
  __webpack_require__(46),
  /* scopeId */
  "data-v-38459c74",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ShowHideButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
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
})()}

module.exports = Component.exports


/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.milestone-competency-question-lists[data-v-6b55c4f7] {\n\tmargin-top: 10px;\n\ttext-align: left;\n}\n.milestone-competency-question-lists .panel-heading[data-v-6b55c4f7] {\n\tposition: relative;\n}\n.description-button[data-v-6b55c4f7] {\n\tposition: absolute;\n\ttop: 8px;\n\tright: 10px;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue?2ede2732"],"names":[],"mappings":";AAwEA;CACA,iBAAA;CACA,iBAAA;CACA;AAEA;CACA,mBAAA;CACA;AAEA;CACA,mBAAA;CACA,SAAA;CACA,YAAA;CACA","file":"MilestoneCompetencyQuestionLists.vue","sourcesContent":["<template>\n\t<div v-show=\"showLists\" class=\"milestone-competency-question-lists row\">\n\t\t<div v-for=\"(group, groupName) of groups\" class=\"col-sm-6\">\n\t\t\t<div class=\"panel panel-info milestones-panel\">\n\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t<h4 class=\"panel-title\">\n\t\t\t\t\t\t{{ ucfirst(groupName) }}\n\t\t\t\t\t</h4>\n\t\t\t\t\t<show-hide-button class=\"description-button btn btn-info btn-xs\"\n\t\t\t\t\t\t\tv-model=\"showDescriptions[groupName]\">\n\t\t\t\t\t\tdescriptions\n\t\t\t\t\t</show-hide-button>\n\t\t\t\t</div>\n\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t<li v-for=\"item of group\" class=\"list-group-item\">\n\t\t\t\t\t\t<b>{{item.title}}</b>\n\t\t\t\t\t\t<span v-show=\"showDescriptions[groupName]\">\n\t\t\t\t\t\t\t— {{ item.description }}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport ShowHideButton from './ShowHideButton.vue';\n\nimport { ucfirst } from 'modules/utils.js';\n\nexport default {\n\tprops: [\n\t\t'milestones',\n\t\t'competencies'\n\t],\n\tcomputed: {\n\t\tgroups(){\n\t\t\treturn {\n\t\t\t\t'milestones': this.milestones,\n\t\t\t\t'competencies': this.competencies\n\t\t\t};\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tshowLists: false,\n\t\t\tshowDescriptions: {\n\t\t\t\tmilestones: false,\n\t\t\t\tcompetencies: false\n\t\t\t}\n\t\t};\n\t},\n\tmethods: {\n\t\ttoggleLists(){\n\t\t\tthis.showLists = !this.showLists;\n\t\t},\n\t\ttoggleDescriptions(type){\n\t\t\tif(this.showDescriptions.hasOwnProperty(type))\n\t\t\t\tthis.showDescriptions[type] = !this.showDescriptions[type];\n\t\t},\n\t\tucfirst(str){\n\t\t\treturn ucfirst(str);\n\t\t}\n\t},\n\tcomponents: {\n\t\tShowHideButton\n\t}\n};\n</script>\n\n<style scoped>\n\t.milestone-competency-question-lists {\n\t\tmargin-top: 10px;\n\t\ttext-align: left;\n\t}\n\n\t.milestone-competency-question-lists .panel-heading {\n\t\tposition: relative;\n\t}\n\n\t.description-button {\n\t\tposition: absolute;\n\t\ttop: 8px;\n\t\tright: 10px;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 380:
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

/***/ }),

/***/ 40:
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

/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),

/***/ 403:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(252);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("eb112970", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6b55c4f7&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MilestoneCompetencyQuestionLists.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6b55c4f7&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MilestoneCompetencyQuestionLists.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 418:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_MilestoneCompetencyQuestionLists_vue__);
/* harmony export (immutable) */ __webpack_exports__["renderMilestoneCompetencyLists"] = renderMilestoneCompetencyLists;




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

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n@media print {\nbutton[data-v-38459c74] {\n\t\tdisplay: none;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ShowHideButton.vue?47c685e9"],"names":[],"mappings":";AAuCA;AACA;EACA,cAAA;CACA;CACA","file":"ShowHideButton.vue","sourcesContent":["<template>\n\t<button type=\"button\" class=\"btn\"\n\t\t\t@click=\"$emit('input', !value)\">\n\t\t\t\n\t\t<slot name=\"left-glyph\"></slot>\n\t\t\t\n\t\t<slot v-if=\"value\" name=\"true\">\n\t\t\tHide\n\t\t</slot>\n\t\t<slot v-else name=\"false\">\n\t\t\tShow\n\t\t</slot>\n\n\t\t<slot>\n\t\t\t{{ text }}\n\t\t</slot>\n\t\t\n\t\t<slot name=\"glyph\">\n\t\t\t<span class=\"glyphicon glyphicon-triangle-bottom\"></span>\n\t\t</slot>\n\t</button>\n</template>\n\n<script>\nexport default {\n\tprops: {\n\t\tvalue: {\n\t\t\ttype: Boolean,\n\t\t\trequired: true\n\t\t},\n\t\ttext: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t@media print {\n\t\tbutton {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 46:
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

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3a51e218", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-38459c74&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowHideButton.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-38459c74&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ShowHideButton.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ })

},[418]);
});
//# sourceMappingURL=vue-milestone-competency-lists.js.map