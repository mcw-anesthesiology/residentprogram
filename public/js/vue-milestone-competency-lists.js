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
return webpackJsonp([4],{

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.milestone-competency-question-lists[data-v-6739f1e8] {\n\tmargin-top: 10px;\n\ttext-align: left;\n}\n.milestone-competency-question-lists .panel-heading[data-v-6739f1e8] {\n\tposition: relative;\n}\n.description-button[data-v-6739f1e8] {\n\tposition: absolute;\n\ttop: 8px;\n\tright: 10px;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue?9de57d2c"],"names":[],"mappings":";AAmEA;CACA,iBAAA;CACA,iBAAA;CACA;AAEA;CACA,mBAAA;CACA;AAEA;CACA,mBAAA;CACA,SAAA;CACA,YAAA;CACA","file":"MilestoneCompetencyQuestionLists.vue","sourcesContent":["<template>\n\t<div v-show=\"showLists\" class=\"milestone-competency-question-lists row\">\n\t\t<div v-for=\"(group, groupName) of groups\" class=\"col-sm-6\">\n\t\t\t<div class=\"panel panel-info milestones-panel\">\n\t\t\t\t<div class=\"panel-heading\">\n\t\t\t\t\t<h4 class=\"panel-title\">\n\t\t\t\t\t\t{{ucfirst(groupName)}}\n\t\t\t\t\t</h4>\n\t\t\t\t\t<button v-on:click=\"toggleDescriptions(groupName)\"\n\t\t\t\t\t\t\ttype=\"button\" class=\"description-button btn btn-info btn-xs\"\n\t\t\t\t\t\t\tv-bind:class=\"{ active: showDescriptions[groupName] }\">\n\t\t\t\t\t\tShow descriptions\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<ul class=\"list-group\">\n\t\t\t\t\t<li v-for=\"item of group\" class=\"list-group-item\">\n\t\t\t\t\t\t<b>{{item.title}}</b>\n\t\t\t\t\t\t<span v-show=\"showDescriptions[groupName]\">\n\t\t\t\t\t\t\t— {{item.description}}\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</li>\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport { ucfirst } from '../modules/utils.js';\nexport default {\n\tprops: [\n\t\t'milestones',\n\t\t'competencies'\n\t],\n\tcomputed: {\n\t\tgroups(){\n\t\t\treturn {\n\t\t\t\t'milestones': this.milestones,\n\t\t\t\t'competencies': this.competencies\n\t\t\t};\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tshowLists: false,\n\t\t\tshowDescriptions: {\n\t\t\t\tmilestones: false,\n\t\t\t\tcompetencies: false\n\t\t\t}\n\t\t};\n\t},\n\tmethods: {\n\t\ttoggleLists(){\n\t\t\tthis.showLists = !this.showLists;\n\t\t},\n\t\ttoggleDescriptions(type){\n\t\t\tif(this.showDescriptions.hasOwnProperty(type))\n\t\t\t\tthis.showDescriptions[type] = !this.showDescriptions[type];\n\t\t},\n\t\tucfirst(str){\n\t\t\treturn ucfirst(str);\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.milestone-competency-question-lists {\n\t\tmargin-top: 10px;\n\t\ttext-align: left;\n\t}\n\n\t.milestone-competency-question-lists .panel-heading {\n\t\tposition: relative;\n\t}\n\n\t.description-button {\n\t\tposition: absolute;\n\t\ttop: 8px;\n\t\tright: 10px;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

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
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.ucfirst(groupName)) + "\n\t\t\t\t")]), _vm._v(" "), _c('button', {
      staticClass: "description-button btn btn-info btn-xs",
      class: {
        active: _vm.showDescriptions[groupName]
      },
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.toggleDescriptions(groupName)
        }
      }
    }, [_vm._v("\n\t\t\t\t\tShow descriptions\n\t\t\t\t")])]), _vm._v(" "), _c('ul', {
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
     require("vue-hot-reload-api").rerender("data-v-6739f1e8", module.exports)
  }
}

/***/ },

/***/ 317:
/***/ function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(169);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6739f1e8&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MilestoneCompetencyQuestionLists.vue", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-6739f1e8&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./MilestoneCompetencyQuestionLists.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ },

/***/ 323:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.renderMilestoneCompetencyLists = renderMilestoneCompetencyLists;

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _MilestoneCompetencyQuestionLists = __webpack_require__(54);

var _MilestoneCompetencyQuestionLists2 = _interopRequireDefault(_MilestoneCompetencyQuestionLists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		vms[_questionId3] = new _vue2.default({
			el: containers[_questionId3],
			render: function render(h) {
				return h(_MilestoneCompetencyQuestionLists2.default, {
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

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(317)

/* script */
__vue_exports__ = __webpack_require__(70)

/* template */
var __vue_template__ = __webpack_require__(298)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MilestoneCompetencyQuestionLists.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-6739f1e8"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6739f1e8", __vue_options__)
  } else {
    hotAPI.reload("data-v-6739f1e8", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] MilestoneCompetencyQuestionLists.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = __webpack_require__(3);

exports.default = {
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
			return (0, _utils.ucfirst)(str);
		}
	}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }

},[323]);
});
//# sourceMappingURL=vue-milestone-competency-lists.js.map