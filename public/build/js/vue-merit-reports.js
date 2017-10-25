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
return webpackJsonp([4],[
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(29);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(62),
    getValue = __webpack_require__(67);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./resources/assets/js/vue-components/BootstrapAlert.vue + 2 modules
var BootstrapAlert = __webpack_require__(25);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/AlertList.vue
//
//
//
//
//
//
//
//
//



/* harmony default export */ var AlertList = ({
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
		BootstrapAlert: BootstrapAlert["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4ff56c56","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/AlertList.vue
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
/* harmony default export */ var vue_components_AlertList = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4ff56c56", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/AlertList.vue
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
  AlertList,
  vue_components_AlertList,
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

/* harmony default export */ var js_vue_components_AlertList = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["l"] = questionnaire;
/* unused harmony export section */
/* harmony export (immutable) */ __webpack_exports__["k"] = question;
/* harmony export (immutable) */ __webpack_exports__["r"] = textQuestion;
/* harmony export (immutable) */ __webpack_exports__["h"] = numberQuestion;
/* harmony export (immutable) */ __webpack_exports__["o"] = selectQuestion;
/* harmony export (immutable) */ __webpack_exports__["m"] = radioQuestion;
/* harmony export (immutable) */ __webpack_exports__["b"] = checkboxQuestion;
/* unused harmony export radioCheckboxQuestion */
/* unused harmony export listQuestion */
/* unused harmony export listItem */
/* harmony export (immutable) */ __webpack_exports__["q"] = textListItem;
/* harmony export (immutable) */ __webpack_exports__["j"] = publicationListItem;
/* harmony export (immutable) */ __webpack_exports__["a"] = certificationListItem;
/* harmony export (immutable) */ __webpack_exports__["c"] = committeeListItem;
/* harmony export (immutable) */ __webpack_exports__["d"] = editorialBoardListItem;
/* harmony export (immutable) */ __webpack_exports__["e"] = grantListItem;
/* harmony export (immutable) */ __webpack_exports__["f"] = lectureListItem;
/* harmony export (immutable) */ __webpack_exports__["g"] = mentorshipListItem;
/* harmony export (immutable) */ __webpack_exports__["n"] = reviewListItem;
/* harmony export (immutable) */ __webpack_exports__["p"] = studyListItem;
/* harmony export (immutable) */ __webpack_exports__["i"] = projectListItem;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(120);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// This has to manually be kept in sync with server-side implementation
// in app/Helpers/QuestionnaireValidation.php



// TODO: Consider making not a map so multiple errors can be returned per prop


function questionnaire(thisQuestionnaire) {
	var valid = true;
	var errors = new Map();

	var meetsCondition = Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["a" /* getConditionChecker */])(Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["c" /* getQuestions */])(thisQuestionnaire));

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = thisQuestionnaire.sections.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _ref = _step.value;

			var _ref2 = _slicedToArray(_ref, 2);

			var index = _ref2[0];
			var thisSection = _ref2[1];

			if (!thisSection.condition || meetsCondition(thisSection.condition)) {
				var sectionValidation = section(thisSection);
				if (!sectionValidation.valid) {
					valid = false;
					errors.set(index, sectionValidation.errors);
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

	return {
		valid: valid,
		errors: errors
	};
}

function section(thisSection) {
	var meetsCondition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["a" /* getConditionChecker */])(
	/* $FlowFixMe This is right I promise */
	thisSection.items.filter(__WEBPACK_IMPORTED_MODULE_0__index_js__["g" /* isQuestion */]));

	var valid = true;
	var errors = new Map();

	// $FlowFixMe This is right I promise
	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = thisSection.items.filter(__WEBPACK_IMPORTED_MODULE_0__index_js__["g" /* isQuestion */]).entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var _ref3 = _step2.value;

			var _ref4 = _slicedToArray(_ref3, 2);

			var index = _ref4[0];
			var item = _ref4[1];

			if (!item.condition || meetsCondition(item.condition)) {
				var questionValidation = question(item);
				if (!questionValidation.valid) {
					valid = false;
					errors.set(index, questionValidation.errors);
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

	return {
		valid: valid,
		errors: errors
	};
}

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
		case 'select':
			return selectQuestion(question);
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

	var value = Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["e" /* getSelectValue */])(question);

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
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = question.options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var option = _step3.value;

				if (option.checked) optionChecked = true;
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
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = list.items.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var _ref5 = _step4.value;

				var _ref6 = _slicedToArray(_ref5, 2);

				var index = _ref6[0];
				var item = _ref6[1];

				if ('itemProps' in list) {
					var _iteratorNormalCompletion5 = true;
					var _didIteratorError5 = false;
					var _iteratorError5 = undefined;

					try {
						for (var _iterator5 = Object.entries(list.itemProps)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
							var _ref7 = _step5.value;

							var _ref8 = _slicedToArray(_ref7, 2);

							var key = _ref8[0];
							var value = _ref8[1];

							if (item[key] !== value) {
								valid = false;
								// This string interp thing kinda stinks
								errors.set('item[' + index + '][' + key + ']', 'Predefined itemProp ' + key + ' not present in list item');
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
				}

				if (!errors.has('item[' + index + ']')) {
					var listItemValidation = listItem(item);
					if (!listItemValidation.valid) {
						valid = false;
						var _iteratorNormalCompletion6 = true;
						var _didIteratorError6 = false;
						var _iteratorError6 = undefined;

						try {
							for (var _iterator6 = listItemValidation.errors.entries()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
								var _ref9 = _step6.value;

								var _ref10 = _slicedToArray(_ref9, 2);

								var itemKey = _ref10[0];
								var itemVal = _ref10[1];

								// This string interp thing kinda stinks
								errors.set('item[' + index + '][' + itemKey + ']', itemVal);
							}
						} catch (err) {
							_didIteratorError6 = true;
							_iteratorError6 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion6 && _iterator6.return) {
									_iterator6.return();
								}
							} finally {
								if (_didIteratorError6) {
									throw _iteratorError6;
								}
							}
						}
					}
				}
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

	var _iteratorNormalCompletion7 = true;
	var _didIteratorError7 = false;
	var _iteratorError7 = undefined;

	try {
		for (var _iterator7 = requiredMap.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
			var _ref11 = _step7.value;

			var _ref12 = _slicedToArray(_ref11, 2);

			var prop = _ref12[0];
			var str = _ref12[1];

			if (!item[prop]) {
				valid = false;
				errors.set(prop, 'Please ' + str + ' or remove this list item');
			}
		}
	} catch (err) {
		_didIteratorError7 = true;
		_iteratorError7 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion7 && _iterator7.return) {
				_iterator7.return();
			}
		} finally {
			if (_didIteratorError7) {
				throw _iteratorError7;
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
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/ShowHideButton.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ShowHideButton = ({
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-38459c74","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/ShowHideButton.vue
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
/* harmony default export */ var vue_components_ShowHideButton = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-38459c74", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/ShowHideButton.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(116)
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
  ShowHideButton,
  vue_components_ShowHideButton,
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

/* harmony default export */ var js_vue_components_ShowHideButton = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18),
    getRawTag = __webpack_require__(63),
    objectToString = __webpack_require__(64);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(52),
    listCacheDelete = __webpack_require__(53),
    listCacheGet = __webpack_require__(54),
    listCacheHas = __webpack_require__(55),
    listCacheSet = __webpack_require__(56);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(27);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(76);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/ConfirmationButton.vue
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ConfirmationButton = ({
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4aea83c8","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/ConfirmationButton.vue
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
/* harmony default export */ var vue_components_ConfirmationButton = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4aea83c8", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/ConfirmationButton.vue
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
  ConfirmationButton,
  vue_components_ConfirmationButton,
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

/* harmony default export */ var js_vue_components_ConfirmationButton = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var TAGS = {
	'' : ['<em>','</em>'],
	_ : ['<strong>','</strong>'],
	'\n' : ['<br />'],
	' ' : ['<br />'],
	'-': ['<hr />']
};

/** Outdent a string based on the first indented line's leading whitespace
 *	@private
 */
function outdent(str) {
	return str.replace(RegExp('^'+(str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

/** Encode special attribute characters to HTML entities in a String.
 *	@private
 */
function encodeAttr(str) {
	return (str+'').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Parse Markdown into an HTML String. */
function parse(md) {
	var tokenizer = /((?:^|\n+)(?:\n---+|\* \*(?: \*)+)\n)|(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm,
		context = [],
		out = '',
		last = 0,
		links = {},
		chunk, prev, token, inner, t;

	function tag(token) {
		var desc = TAGS[token.replace(/\*/g,'_')[1] || ''],
			end = context[context.length-1]==token;
		if (!desc) { return token; }
		if (!desc[1]) { return desc[0]; }
		context[end?'pop':'push'](token);
		return desc[end|0];
	}

	function flush() {
		var str = '';
		while (context.length) { str += tag(context[context.length-1]); }
		return str;
	}

	md = md.replace(/^\[(.+?)\]:\s*(.+)$/gm, function (s, name, url) {
		links[name.toLowerCase()] = url;
		return '';
	}).replace(/^\n+|\n+$/g, '');

	while ( (token=tokenizer.exec(md)) ) {
		prev = md.substring(last, token.index);
		last = tokenizer.lastIndex;
		chunk = token[0];
		if (prev.match(/[^\\](\\\\)*\\$/)) {
			// escaped
		}
		// Code/Indent blocks:
		else if (token[3] || token[4]) {
			chunk = '<pre class="code '+(token[4]?'poetry':token[2].toLowerCase())+'">'+outdent(encodeAttr(token[3] || token[4]).replace(/^\n+|\n+$/g, ''))+'</pre>';
		}
		// > Quotes, -* lists:
		else if (token[6]) {
			t = token[6];
			if (t.match(/\./)) {
				token[5] = token[5].replace(/^\d+/gm, '');
			}
			inner = parse(outdent(token[5].replace(/^\s*[>*+.-]/gm, '')));
			if (t==='>') { t = 'blockquote'; }
			else {
				t = t.match(/\./) ? 'ol' : 'ul';
				inner = inner.replace(/^(.*)(\n|$)/gm, '<li>$1</li>');
			}
			chunk = '<'+t+'>' + inner + '</'+t+'>';
		}
		// Images:
		else if (token[8]) {
			chunk = "<img src=\"" + (encodeAttr(token[8])) + "\" alt=\"" + (encodeAttr(token[7])) + "\">";
		}
		// Links:
		else if (token[10]) {
			out = out.replace('<a>', ("<a href=\"" + (encodeAttr(token[11] || links[prev.toLowerCase()])) + "\">"));
			chunk = flush() + '</a>';
		}
		else if (token[9]) {
			chunk = '<a>';
		}
		// Headings:
		else if (token[12] || token[14]) {
			t = 'h' + (token[14] ? token[14].length : (token[13][0]==='='?1:2));
			chunk = '<'+t+'>' + parse(token[12] || token[15]) + '</'+t+'>';
		}
		// `code`:
		else if (token[16]) {
			chunk = '<code>'+encodeAttr(token[16])+'</code>';
		}
		// Inline formatting: *em*, **strong** & friends
		else if (token[17] || token[1]) {
			chunk = tag(token[17] || '--');
		}
		out += prev;
		out += chunk;
	}

	return (out + md.substring(last) + flush()).trim();
}

/* harmony default export */ __webpack_exports__["a"] = (parse);
//# sourceMappingURL=snarkdown.es.js.map


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/BootstrapAlert.vue
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BootstrapAlert = ({
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8d03363a","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/BootstrapAlert.vue
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
/* harmony default export */ var vue_components_BootstrapAlert = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8d03363a", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/BootstrapAlert.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
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
  BootstrapAlert,
  vue_components_BootstrapAlert,
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

/* harmony default export */ var js_vue_components_BootstrapAlert = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 26 */,
/* 27 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isObject = __webpack_require__(24);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)))

/***/ }),
/* 30 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(68),
    mapCacheDelete = __webpack_require__(75),
    mapCacheGet = __webpack_require__(77),
    mapCacheHas = __webpack_require__(78),
    mapCacheSet = __webpack_require__(79);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var SetCache = __webpack_require__(80),
    arraySome = __webpack_require__(83),
    cacheHas = __webpack_require__(84);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(2),
    stubFalse = __webpack_require__(101);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)(module)))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(103),
    baseUnary = __webpack_require__(104),
    nodeUtil = __webpack_require__(105);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_flatpickr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_flatpickr__);


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var hooks = new Set(['onChange', 'onOpen', 'onClose', 'onMonthChange', 'onYearChange', 'onReady', 'onValueUpdate', 'onDayCreate']);

var VueFlatpickr$1 = { render: function render() {
		var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('input', { attrs: { "type": "text", "placeholder": _vm.placeholder }, domProps: { "value": _vm.value } });
	}, staticRenderFns: [],
	props: {
		placeholder: {
			type: String,
			default: ''
		},
		options: {
			type: Object,
			default: function _default() {
				return {};
			}
		},
		value: {
			type: String,
			default: ''
		}
	},
	data: function data() {
		return {
			fp: null
		};
	},


	computed: {
		hookedOptions: function hookedOptions() {
			return this.addHooks(this.options);
		}
	},

	watch: {
		value: function value(val) {
			this.fp.setDate(val);
		},
		hookedOptions: function hookedOptions(options) {
			for (var _ref in Object.entries(options)) {
				var _ref2 = _slicedToArray(_ref, 2);

				var key = _ref2[0];
				var val = _ref2[1];

				this.fp.set(key, val);
			}
		}
	},

	mounted: function mounted() {
		var self = this;
		var origOnValUpdate = this.hookedOptions.onValueUpdate;
		this.fp = new __WEBPACK_IMPORTED_MODULE_0_flatpickr___default.a(this.$el, Object.assign(this.hookedOptions, {
			onValueUpdate: function onValueUpdate() {
				self.onInput(self.$el.value);
				if (typeof origOnValUpdate === 'function') {
					origOnValUpdate();
				}
			}
		}));
		this.$emit('FlatpickrRef', this.fp);
	},
	destroyed: function destroyed() {
		this.fp.destroy();
		this.fp = null;
	},


	methods: {
		onInput: function onInput(e) {
			typeof e === 'string' ? this.$emit('input', e) : this.$emit('input', e.target.value);
		},
		addHooks: function addHooks(options) {
			var _this = this;

			options = Object.assign({}, options);

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				var _loop = function _loop() {
					var hook = _step.value;

					var firer = function firer(selectedDates, dateStr, instance) {
						_this.$emit(stripOn(hook), [selectedDates, dateStr, instance]);
					};

					if (hook in options) {
						if (!Array.isArray(options[hook])) options[hook] = [options[hook]];

						options[hook].push(firer);
					} else {
						options[hook] = [firer];
					}
				};

				for (var _iterator = hooks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					_loop();
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
		}
	}
};

function stripOn(hook) {
	return hook.charAt(2).toLowerCase() + hook.substring(3);
}

/* harmony default export */ __webpack_exports__["a"] = (VueFlatpickr$1);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/lodash/isEqual.js
var isEqual = __webpack_require__(48);
var isEqual_default = /*#__PURE__*/__webpack_require__.n(isEqual);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/SelectTwo.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SelectTwo = ({
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
			if (!isEqual_default()(val, _this.stringValue)) _this.$emit('input', val);
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2434126b","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/SelectTwo.vue
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
/* harmony default export */ var vue_components_SelectTwo = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2434126b", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/SelectTwo.vue
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
  SelectTwo,
  vue_components_SelectTwo,
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

/* harmony default export */ var js_vue_components_SelectTwo = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 38 */
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

	__WEBPACK_IMPORTED_MODULE_0_downloadjs___default()(file, filename, 'text/csv');
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

	var keys = Array.from(valueMap.keys()).sort(__WEBPACK_IMPORTED_MODULE_1__utils_js__["D" /* sortNumbers */]);

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
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;//download.js v4.2, by dandavis; 2008-2016. [MIT] see http://danml.com/download.html for tests/usage
// v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
// v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
// v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
// v4 adds AMD/UMD, commonJS, and plain browser support
// v4.1 adds url download capability via solo URL argument (same domain/CORS only)
// v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
// https://github.com/rndme/download

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		root.download = factory();
  }
}(this, function () {

	return function download(data, strFileName, strMimeType) {

		var self = window, // this script is only for browsers anyway...
			defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
			mimeType = strMimeType || defaultMime,
			payload = data,
			url = !strFileName && !strMimeType && payload,
			anchor = document.createElement("a"),
			toString = function(a){return String(a);},
			myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
			fileName = strFileName || "download",
			blob,
			reader;
			myBlob= myBlob.call ? myBlob.bind(self) : Blob ;
	  
		if(String(this)==="true"){ //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
			payload=[payload, mimeType];
			mimeType=payload[0];
			payload=payload[1];
		}


		if(url && url.length< 2048){ // if no filename and no mime, assume a url was passed as the only argument
			fileName = url.split("/").pop().split("?")[0];
			anchor.href = url; // assign href prop to temp anchor
		  	if(anchor.href.indexOf(url) !== -1){ // if the browser determines that it's a potentially valid url path:
        		var ajax=new XMLHttpRequest();
        		ajax.open( "GET", url, true);
        		ajax.responseType = 'blob';
        		ajax.onload= function(e){ 
				  download(e.target.response, fileName, defaultMime);
				};
        		setTimeout(function(){ ajax.send();}, 0); // allows setting custom ajax headers using the return:
			    return ajax;
			} // end if valid url?
		} // end if url?


		//go ahead and download dataURLs right away
		if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(payload)){
		
			if(payload.length > (1024*1024*1.999) && myBlob !== toString ){
				payload=dataUrlToBlob(payload);
				mimeType=payload.type || defaultMime;
			}else{			
				return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
					navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
					saver(payload) ; // everyone else can save dataURLs un-processed
			}
			
		}else{//not data url, is it a string with special needs?
			if(/([\x80-\xff])/.test(payload)){			  
				var i=0, tempUiArr= new Uint8Array(payload.length), mx=tempUiArr.length;
				for(i;i<mx;++i) tempUiArr[i]= payload.charCodeAt(i);
			 	payload=new myBlob([tempUiArr], {type: mimeType});
			}		  
		}
		blob = payload instanceof myBlob ?
			payload :
			new myBlob([payload], {type: mimeType}) ;


		function dataUrlToBlob(strUrl) {
			var parts= strUrl.split(/[:;,]/),
			type= parts[1],
			decoder= parts[2] == "base64" ? atob : decodeURIComponent,
			binData= decoder( parts.pop() ),
			mx= binData.length,
			i= 0,
			uiArr= new Uint8Array(mx);

			for(i;i<mx;++i) uiArr[i]= binData.charCodeAt(i);

			return new myBlob([uiArr], {type: type});
		 }

		function saver(url, winMode){

			if ('download' in anchor) { //html5 A[download]
				anchor.href = url;
				anchor.setAttribute("download", fileName);
				anchor.className = "download-js-link";
				anchor.innerHTML = "downloading...";
				anchor.style.display = "none";
				document.body.appendChild(anchor);
				setTimeout(function() {
					anchor.click();
					document.body.removeChild(anchor);
					if(winMode===true){setTimeout(function(){ self.URL.revokeObjectURL(anchor.href);}, 250 );}
				}, 66);
				return true;
			}

			// handle non-a[download] safari as best we can:
			if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
				if(/^data:/.test(url))	url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
				if(!window.open(url)){ // popup blocked, offer direct download:
					if(confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")){ location.href=url; }
				}
				return true;
			}

			//do iframe dataURL download (old ch+FF):
			var f = document.createElement("iframe");
			document.body.appendChild(f);

			if(!winMode && /^data:/.test(url)){ // force a mime that will download:
				url="data:"+url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
			}
			f.src=url;
			setTimeout(function(){ document.body.removeChild(f); }, 333);

		}//end saver




		if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
			return navigator.msSaveBlob(blob, fileName);
		}

		if(self.URL){ // simple fast and modern way using Blob and URL:
			saver(self.URL.createObjectURL(blob), true);
		}else{
			// handle non-Blob()+non-URL browsers:
			if(typeof blob === "string" || blob.constructor===toString ){
				try{
					return saver( "data:" +  mimeType   + ";base64,"  +  self.btoa(blob)  );
				}catch(y){
					return saver( "data:" +  mimeType   + "," + encodeURIComponent(blob)  );
				}
			}

			// Blob but not URL support:
			reader=new FileReader();
			reader.onload=function(e){
				saver(this.result);
			};
			reader.readAsDataURL(blob);
		}
		return true;
	}; /* end download() */
}));


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/PaginatorLink.vue
//
//
//
//
//
//
//

/* harmony default export */ var PaginatorLink = ({
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-115d9766","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/PaginatorLink.vue
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
/* harmony default export */ var vue_components_PaginatorLink = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-115d9766", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/PaginatorLink.vue
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
  PaginatorLink,
  vue_components_PaginatorLink,
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

/* harmony default export */ var js_vue_components_PaginatorLink = (Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/ListPaginator.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ListPaginator = ({
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
		PaginatorLink: js_vue_components_PaginatorLink
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-05c830ce","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/ListPaginator.vue
var ListPaginator_render = function() {
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
var ListPaginator_staticRenderFns = []
ListPaginator_render._withStripped = true
var ListPaginator_esExports = { render: ListPaginator_render, staticRenderFns: ListPaginator_staticRenderFns }
/* harmony default export */ var vue_components_ListPaginator = (ListPaginator_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-05c830ce", ListPaginator_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/ListPaginator.vue
var ListPaginator_disposed = false
function injectStyle (ssrContext) {
  if (ListPaginator_disposed) return
  __webpack_require__(134)
}
var ListPaginator_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ListPaginator___vue_template_functional__ = false
/* styles */
var ListPaginator___vue_styles__ = injectStyle
/* scopeId */
var ListPaginator___vue_scopeId__ = "data-v-05c830ce"
/* moduleIdentifier (server only) */
var ListPaginator___vue_module_identifier__ = null
var ListPaginator_Component = ListPaginator_normalizeComponent(
  ListPaginator,
  vue_components_ListPaginator,
  ListPaginator___vue_template_functional__,
  ListPaginator___vue_styles__,
  ListPaginator___vue_scopeId__,
  ListPaginator___vue_module_identifier__
)
ListPaginator_Component.options.__file = "resources/assets/js/vue-components/ListPaginator.vue"
if (ListPaginator_Component.esModule && Object.keys(ListPaginator_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05c830ce", ListPaginator_Component.options)
  } else {
    hotAPI.reload("data-v-05c830ce", ListPaginator_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ListPaginator_disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_ListPaginator = (ListPaginator_Component.exports);

// EXTERNAL MODULE: ./node_modules/lunr/lunr.js
var lunr = __webpack_require__(135);
var lunr_default = /*#__PURE__*/__webpack_require__.n(lunr);

// EXTERNAL MODULE: ./resources/assets/js/modules/utils.js
var utils = __webpack_require__(1);

// EXTERNAL MODULE: ./resources/assets/js/modules/report-utils.js
var report_utils = __webpack_require__(38);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/ComponentList.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var ComponentList = ({
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
				return report_utils["k" /* sortFunctions */];
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

			var index = lunr_default()(function () {
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

				return report_utils["k" /* sortFunctions */].has(this.sortBy) ? this.filteredItems.sort(report_utils["k" /* sortFunctions */].get(this.sortBy)) : this.filteredItems.sort(function (a, b) {
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

			return Object(utils["z" /* snakeCaseToWords */])(field);
		}
	},
	components: {
		ListPaginator: js_vue_components_ListPaginator
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6d54e2f6","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/ComponentList.vue
var ComponentList_render = function() {
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
var ComponentList_staticRenderFns = []
ComponentList_render._withStripped = true
var ComponentList_esExports = { render: ComponentList_render, staticRenderFns: ComponentList_staticRenderFns }
/* harmony default export */ var vue_components_ComponentList = (ComponentList_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6d54e2f6", ComponentList_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/ComponentList.vue
var ComponentList_disposed = false
function ComponentList_injectStyle (ssrContext) {
  if (ComponentList_disposed) return
  __webpack_require__(133)
}
var ComponentList_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ComponentList___vue_template_functional__ = false
/* styles */
var ComponentList___vue_styles__ = ComponentList_injectStyle
/* scopeId */
var ComponentList___vue_scopeId__ = "data-v-6d54e2f6"
/* moduleIdentifier (server only) */
var ComponentList___vue_module_identifier__ = null
var ComponentList_Component = ComponentList_normalizeComponent(
  ComponentList,
  vue_components_ComponentList,
  ComponentList___vue_template_functional__,
  ComponentList___vue_styles__,
  ComponentList___vue_scopeId__,
  ComponentList___vue_module_identifier__
)
ComponentList_Component.options.__file = "resources/assets/js/vue-components/ComponentList.vue"
if (ComponentList_Component.esModule && Object.keys(ComponentList_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6d54e2f6", ComponentList_Component.options)
  } else {
    hotAPI.reload("data-v-6d54e2f6", ComponentList_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ComponentList_disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_ComponentList = __webpack_exports__["a"] = (ComponentList_Component.exports);


/***/ }),
/* 44 */,
/* 45 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 46 */
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
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = getCheckedItemCount;
/* unused harmony export getSectionCheckedItemCount */
/* unused harmony export getItemCheckedItemCount */
/* harmony export (immutable) */ __webpack_exports__["e"] = getUsersWithCompleteMerit;
/* harmony export (immutable) */ __webpack_exports__["a"] = checklistIsValid;
/* unused harmony export sectionIsValid */
/* unused harmony export itemIsValid */
/* unused harmony export questionIsValid */
/* harmony export (immutable) */ __webpack_exports__["g"] = itemIsChecked;
/* harmony export (immutable) */ __webpack_exports__["f"] = getYearlyFacultyMeritForm;
/* unused harmony export getMostRecentCompleteReport */
/* harmony export (immutable) */ __webpack_exports__["d"] = getCurrentYearlyMeritDateRange;
/* harmony export (immutable) */ __webpack_exports__["b"] = fetchAllMeritReports;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_utils_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__questionnaire_validate_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__merits_validate_js__ = __webpack_require__(169);






function getCheckedItemCount(report) {
	var count = 0;

	if (report.pages) {
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = report.pages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var section = _step.value;

				count += getSectionCheckedItemCount(section);
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

	return count;
}

function getSectionCheckedItemCount(section) {
	var count = 0;

	if (section.items) {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = section.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var item = _step2.value;

				switch (item.type) {
					case 'section':
						count += getSectionCheckedItemCount(item);
						break;
					case 'item':
						count += getItemCheckedItemCount(item);
						break;
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

	return count;
}

function getItemCheckedItemCount(item) {
	return item.checked ? 1 : 0;
}

function getUsersWithCompleteMerit(usersWithMerits) {

	if (!usersWithMerits) return [];

	var usersWithMerit = [];

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = usersWithMerits[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var user = _step3.value;

			var _report = getMostRecentCompleteReport(user.merit_reports);

			if (_report) {
				usersWithMerit.push(Object.assign({}, user, { report: _report }));
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

	return usersWithMerit;
}

function checklistIsValid(checklist) {
	try {
		return __WEBPACK_IMPORTED_MODULE_4__merits_validate_js__["a" /* checklist */](checklist).valid;
	} catch (e) {
		console.error(e);
		return false;
	}
}

function sectionIsValid(section) {
	try {
		return __WEBPACK_IMPORTED_MODULE_4__merits_validate_js__["d" /* section */](section).valid;
	} catch (e) {
		console.error(e);
		return false;
	}
}

function itemIsValid(item) {
	try {
		return __WEBPACK_IMPORTED_MODULE_4__merits_validate_js__["c" /* item */](item).valid;
	} catch (e) {
		console.error(e);
		return false;
	}
}

function questionIsValid(question) {
	try {
		return __WEBPACK_IMPORTED_MODULE_3__questionnaire_validate_js__["k" /* question */](question).valid;
	} catch (e) {
		console.error(e);
		return false;
	}
}

function itemIsChecked(item) {
	switch (item.type) {
		case 'section':
			return item.items.some(function (item) {
				return itemIsChecked(item);
			});
		case 'item':
			if (item.checked) return true;
			break;
	}

	return false;
}

function getYearlyFacultyMeritForm(meritForms, meritReportTypes, meritReportTypeForms) {
	if (meritReportTypes.faculty_yearly && meritReportTypeForms.faculty_yearly && meritForms) {
		var forms = meritForms.slice();
		forms.sort(function (a, b) {
			return Number(b.version) - Number(a.version);
		});

		return forms.find(function (form) {
			return form.name === meritReportTypeForms.faculty_yearly;
		});
	}
}

function getMostRecentCompleteReport(meritReports) {
	if (!meritReports || meritReports.length < 1) return;

	var mostRecent = null;

	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = meritReports[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var meritReport = _step4.value;

			if (meritReport.status === 'complete' && (mostRecent == null || __WEBPACK_IMPORTED_MODULE_0_moment___default()(meritReport.period_end) >= __WEBPACK_IMPORTED_MODULE_0_moment___default()(mostRecent.period_end))) mostRecent = meritReport;
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

	return mostRecent;
}

function getCurrentYearlyMeritDateRange() {
	// FIXME: This is naive and not good
	return Object(__WEBPACK_IMPORTED_MODULE_1__date_utils_js__["isoDateStringObject"])(Object(__WEBPACK_IMPORTED_MODULE_1__date_utils_js__["academicYearForDate"])(new Date()));
}

function fetchAllMeritReports() {
	var query = $.param({
		with: {
			form: true,
			user: ['full_name']
		}
	});

	return fetch('/merits?' + query, {
		method: 'GET',
		headers: Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["o" /* getFetchHeaders */])(),
		credentials: 'same-origin'
	}).then(__WEBPACK_IMPORTED_MODULE_2__utils_js__["u" /* jsonOrThrow */]);
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(49);

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(50),
    isObjectLike = __webpack_require__(10);

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(51),
    equalArrays = __webpack_require__(32),
    equalByTag = __webpack_require__(85),
    equalObjects = __webpack_require__(89),
    getTag = __webpack_require__(111),
    isArray = __webpack_require__(19),
    isBuffer = __webpack_require__(33),
    isTypedArray = __webpack_require__(34);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(11),
    stackClear = __webpack_require__(57),
    stackDelete = __webpack_require__(58),
    stackGet = __webpack_require__(59),
    stackHas = __webpack_require__(60),
    stackSet = __webpack_require__(61);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(12);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(11);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(11),
    Map = __webpack_require__(21),
    MapCache = __webpack_require__(31);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(28),
    isMasked = __webpack_require__(65),
    isObject = __webpack_require__(24),
    toSource = __webpack_require__(30);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(66);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(69),
    ListCache = __webpack_require__(11),
    Map = __webpack_require__(21);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(70),
    hashDelete = __webpack_require__(71),
    hashGet = __webpack_require__(72),
    hashHas = __webpack_require__(73),
    hashSet = __webpack_require__(74);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(13);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 76 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(14);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var MapCache = __webpack_require__(31),
    setCacheAdd = __webpack_require__(81),
    setCacheHas = __webpack_require__(82);

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ }),
/* 82 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(18),
    Uint8Array = __webpack_require__(86),
    eq = __webpack_require__(27),
    equalArrays = __webpack_require__(32),
    mapToArray = __webpack_require__(87),
    setToArray = __webpack_require__(88);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 87 */
/***/ (function(module, exports) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ }),
/* 88 */
/***/ (function(module, exports) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var getAllKeys = __webpack_require__(90);

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(91),
    getSymbols = __webpack_require__(93),
    keys = __webpack_require__(96);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(92),
    isArray = __webpack_require__(19);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(94),
    stubArray = __webpack_require__(95);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 95 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(97),
    baseKeys = __webpack_require__(106),
    isArrayLike = __webpack_require__(110);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(98),
    isArguments = __webpack_require__(99),
    isArray = __webpack_require__(19),
    isBuffer = __webpack_require__(33),
    isIndex = __webpack_require__(102),
    isTypedArray = __webpack_require__(34);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 98 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(100),
    isObjectLike = __webpack_require__(10);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isObjectLike = __webpack_require__(10);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 101 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 102 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9),
    isLength = __webpack_require__(35),
    isObjectLike = __webpack_require__(10);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 104 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(29);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39)(module)))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(107),
    nativeKeys = __webpack_require__(108);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 107 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(109);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 109 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(28),
    isLength = __webpack_require__(35);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(112),
    Map = __webpack_require__(21),
    Promise = __webpack_require__(113),
    Set = __webpack_require__(114),
    WeakMap = __webpack_require__(115),
    baseGetTag = __webpack_require__(9),
    toSource = __webpack_require__(30);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(4),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 116 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 117 */,
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/* flatpickr v3.1.4, @license MIT */
(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.flatpickr = factory());
}(this, (function () { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

function compareDates(date1, date2, timeless) {
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}
var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var getWeek = function (givenDate) {
    var onejan = new Date(givenDate.getFullYear(), 0, 1);
    return Math.ceil(((givenDate.getTime() - onejan.getTime()) / 86400000 +
        onejan.getDay() +
        1) /
        7);
};
var duration = {
    DAY: 86400000,
};

var defaults = {
    _disable: [],
    _enable: [],
    allowInput: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: window && window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enable: [],
    enableSeconds: false,
    enableTime: false,
    getWeek: getWeek,
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
};

var pad = function (number) { return ("0" + number).slice(-2); };
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        timeout !== null && clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
        if (immediate && !timeout)
            func.apply(context, args);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};
function mouseDelta(e) {
    var delta = e.wheelDelta || -e.deltaY;
    return delta >= 0 ? 1 : -1;
}

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    numInput.type = "text";
    numInput.pattern = "\\d*";
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}

var do_nothing = function () { return undefined; };
var revFormat = {
    D: do_nothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM) {
        dateObj.setHours(dateObj.getHours() % 12 + 12 * int(/pm/i.test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum) {
        var weekNumber = parseInt(weekNum);
        return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: do_nothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    w: do_nothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "(am|AM|Am|aM|pm|PM|Pm|pM)",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date) { return (date.getHours() > 11 ? "PM" : "AM"); },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return date.getFullYear(); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

function FlatpickrInstance(element, instanceConfig) {
    var self = {};
    self.parseDate = parseDate;
    self.formatDate = formatDate;
    self._animationLoop = [];
    self._handlers = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar
                    ? self.latestSelectedDateObj || self.config.minDate
                    : undefined);
            }
            updateValue(false);
        }
        self.showTimeInput =
            self.selectedDates.length > 0 || self.config.noCalendar;
        if (self.weekWrapper !== undefined && self.daysContainer !== undefined) {
            self.calendarContainer.style.width =
                self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
        }
        if (!self.isMobile)
            positionCalendar();
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function updateTime(e) {
        if (self.config.noCalendar && !self.selectedDates.length) {
            self.setDate(new Date().setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds), false);
            setHoursFromInputs();
            updateValue();
        }
        timeWrapper(e);
        if (self.selectedDates.length === 0)
            return;
        if (!self.minDateHasTime ||
            e.type !== "input" ||
            e.target.value.length >= 2) {
            setHoursFromInputs();
            updateValue();
        }
        else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, 1000);
        }
    }
    function ampm2military(hour, amPM) {
        return hour % 12 + 12 * int(amPM === "PM");
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined)
            hours = ampm2military(hours, self.amPM.textContent);
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.minDate) === 0) {
            hours = Math.max(hours, self.config.minDate.getHours());
            if (hours === self.config.minDate.getHours())
                minutes = Math.max(minutes, self.config.minDate.getMinutes());
        }
        if (self.config.maxDate &&
            self.maxDateHasTime &&
            self.latestSelectedDateObj &&
            compareDates(self.latestSelectedDateObj, self.config.maxDate) === 0) {
            hours = Math.min(hours, self.config.maxDate.getHours());
            if (hours === self.config.maxDate.getHours())
                minutes = Math.min(minutes, self.config.maxDate.getMinutes());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date)
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? (12 + hours) % 12 + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = hours >= 12 ? "PM" : "AM";
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var year = parseInt(event.target.value) + (event.delta || 0);
        if (year.toString().length === 4 || event.key === "Enter") {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year.toString()))
                changeYear(year);
        }
    }
    function bind(element, event, handler) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler); });
        element.addEventListener(event, handler);
        self._handlers.push({ element: element, event: event, handler: handler });
    }
    function onClick(handler) {
        return function (evt) { return evt.which === 1 && handler(evt); };
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, 300);
        if (self.config.mode === "range" && self.daysContainer)
            bind(self.daysContainer, "mouseover", function (e) {
                return onMouseOver(e.target);
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.static)
            bind(self._input, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document.body, "touchstart", documentClick);
        bind(window.document.body, "mousedown", onClick(documentClick));
        bind(self._input, "blur", documentClick);
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "mousedown", onClick(self.open));
        }
        if (self.daysContainer !== undefined) {
            self.monthNav.addEventListener("wheel", function (e) { return e.preventDefault(); });
            bind(self.monthNav, "wheel", debounce(onMonthNavScroll, 10));
            bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "mousedown", onClick(selectDate));
            if (self.config.animate) {
                bind(self.daysContainer, ["webkitAnimationEnd", "animationend"], animateDays);
                bind(self.monthNav, ["webkitAnimationEnd", "animationend"], animateMonths);
            }
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return e.target.select();
            };
            bind(self.timeContainer, ["wheel", "input", "increment"], updateTime);
            bind(self.timeContainer, "mousedown", onClick(timeIncrement));
            bind(self.timeContainer, ["wheel", "increment"], self._debouncedChange);
            bind(self.timeContainer, "input", triggerChange);
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "mousedown", onClick(function (e) {
                    updateTime(e);
                    triggerChange();
                }));
            }
        }
    }
    function processPostDayAnimation() {
        self._animationLoop.forEach(function (f) { return f(); });
        self._animationLoop = [];
    }
    function animateDays(e) {
        if (self.daysContainer && self.daysContainer.childNodes.length > 1) {
            switch (e.animationName) {
                case "fpSlideLeft":
                    self.daysContainer.lastChild &&
                        self.daysContainer.lastChild.classList.remove("slideLeftNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .firstChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                case "fpSlideRight":
                    self.daysContainer.firstChild &&
                        self.daysContainer.firstChild.classList.remove("slideRightNew");
                    self.daysContainer.removeChild(self.daysContainer
                        .lastChild);
                    self.days = self.daysContainer.firstChild;
                    processPostDayAnimation();
                    break;
                default:
                    break;
            }
        }
    }
    function animateMonths(e) {
        switch (e.animationName) {
            case "fpSlideLeftNew":
            case "fpSlideRightNew":
                self.navigationCurrentMonth.classList.remove("slideLeftNew");
                self.navigationCurrentMonth.classList.remove("slideRightNew");
                var nav = self.navigationCurrentMonth;
                while (nav.nextSibling &&
                    /curr/.test(nav.nextSibling.className))
                    self.monthNav.removeChild(nav.nextSibling);
                while (nav.previousSibling &&
                    /curr/.test(nav.previousSibling.className))
                    self.monthNav.removeChild(nav.previousSibling);
                self.oldCurMonth = undefined;
                break;
        }
    }
    function jumpToDate(jumpDate) {
        var jumpTo = jumpDate !== undefined
            ? parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            console.error(e.stack);
            console.warn("Invalid date supplied: " + jumpTo);
        }
        self.redraw();
    }
    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow"))
            incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && e.target;
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline && !customAppend && self.element.parentNode) {
                self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0]) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        }
        else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] &&
                self.minRangeDate &&
                date > self.minRangeDate &&
                date < self.selectedDates[0])
                self.minRangeDate = date;
            else if (self.selectedDates[0] &&
                self.maxRangeDate &&
                date < self.maxRangeDate &&
                date > self.selectedDates[0])
                self.maxRangeDate = date;
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
            if (self.selectedDates.length === 1 &&
                self.minRangeDate !== undefined &&
                self.maxRangeDate !== undefined &&
                (date < self.minRangeDate || date > self.maxRangeDate))
                dayElement.classList.add("notAllowed");
        }
        if (self.weekNumbers &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='disabled flatpickr-day'>" +
                self.config.getWeek(date) +
                "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0, targetNode = (currentIndex !== undefined
            ? self.days.childNodes[newIndex]
            : self.selectedDateElem ||
                self.todayDateElem ||
                self.days.childNodes[0]);
        var focus = function () {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        };
        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1, true, undefined, true);
                newIndex = newIndex % 42;
            }
            else if (offset < 0) {
                self.changeMonth(-1, true, undefined, true);
                newIndex += 42;
            }
            return afterDayAnim(focus);
        }
        focus();
    }
    function afterDayAnim(fn) {
        self.config.animate === true ? self._animationLoop.push(fn) : fn();
    }
    function buildDays(delta) {
        if (self.daysContainer === undefined) {
            return;
        }
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() -
            self.l10n.firstDayOfWeek +
            7) %
            7, isRangeMode = self.config.mode === "range";
        var prevMonthDays = self.utils.getDaysInMonth((self.currentMonth - 1 + 12) % 12);
        var daysInMonth = self.utils.getDaysInMonth(), days = window.document.createDocumentFragment();
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        if (self.weekNumbers && self.weekNumbers.firstChild)
            self.weekNumbers.textContent = "";
        if (isRangeMode) {
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow =
                self._hidePrevMonthArrow ||
                    (!!self.minRangeDate &&
                        self.minRangeDate > days.childNodes[0].dateObj);
            self._hideNextMonthArrow =
                self._hideNextMonthArrow ||
                    (!!self.maxRangeDate &&
                        self.maxRangeDate <
                            new Date(self.currentYear, self.currentMonth + 1, 1));
        }
        else
            updateNavigationCurrentMonth();
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        if (!self.config.animate || delta === undefined)
            clearNode(self.daysContainer);
        else {
            while (self.daysContainer.childNodes.length > 1)
                self.daysContainer.removeChild(self.daysContainer.firstChild);
        }
        if (delta && delta >= 0)
            self.daysContainer.appendChild(dayContainer);
        else
            self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
        self.days = self.daysContainer.childNodes[0];
    }
    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.currentMonthElement = createElement("span", "cur-month");
        self.currentMonthElement.title = self.l10n.scrollTitle;
        var yearInput = createNumberInput("cur-year");
        self.currentYearElement = yearInput.childNodes[0];
        self.currentYearElement.title = self.l10n.scrollTitle;
        if (self.config.minDate)
            self.currentYearElement.min = self.config.minDate
                .getFullYear()
                .toString();
        if (self.config.maxDate) {
            self.currentYearElement.max = self.config.maxDate
                .getFullYear()
                .toString();
            self.currentYearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        self.navigationCurrentMonth = createElement("span", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool)
                    self.prevMonthNav.style.display = bool ? "none" : "block";
                self.__hidePrevMonthArrow = bool;
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool)
                    self.nextMonthNav.style.display = bool ? "none" : "block";
                self.__hideNextMonthArrow = bool;
            },
        });
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];
        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? self.config.defaultHour
                : military2ampm(self.config.defaultHour));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : self.config.defaultMinute);
        self.hourElement.step = self.config.hourIncrement.toString();
        self.minuteElement.step = self.config.minuteIncrement.toString();
        self.hourElement.min = self.config.time_24hr ? "0" : "1";
        self.hourElement.max = self.config.time_24hr ? "23" : "12";
        self.minuteElement.min = "0";
        self.minuteElement.max = "59";
        self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : self.config.defaultSeconds);
            self.secondElement.step = self.minuteElement.step;
            self.secondElement.min = self.minuteElement.min;
            self.secondElement.max = self.minuteElement.max;
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
        }
        self.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + weekdays.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ";
        return self.weekdayContainer;
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, is_offset, animate, from_keyboard) {
        if (is_offset === void 0) { is_offset = true; }
        if (animate === void 0) { animate = self.config.animate; }
        if (from_keyboard === void 0) { from_keyboard = false; }
        var delta = is_offset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow) ||
            (delta > 0 && self._hideNextMonthArrow))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
        }
        buildDays(animate ? delta : undefined);
        if (!animate) {
            triggerEvent("onMonthChange");
            return updateNavigationCurrentMonth();
        }
        var nav = self.navigationCurrentMonth;
        if (delta < 0) {
            while (nav.nextSibling &&
                /curr/.test(nav.nextSibling.className))
                self.monthNav.removeChild(nav.nextSibling);
        }
        else if (delta > 0) {
            while (nav.previousSibling &&
                /curr/.test(nav.previousSibling.className))
                self.monthNav.removeChild(nav.previousSibling);
        }
        self.oldCurMonth = self.navigationCurrentMonth;
        self.navigationCurrentMonth = self.monthNav.insertBefore(self.oldCurMonth.cloneNode(true), delta > 0 ? self.oldCurMonth.nextSibling : self.oldCurMonth);
        var daysContainer = self.daysContainer;
        if (daysContainer.firstChild && daysContainer.lastChild) {
            if (delta > 0) {
                daysContainer.firstChild.classList.add("slideLeft");
                daysContainer.lastChild.classList.add("slideLeftNew");
                self.oldCurMonth.classList.add("slideLeft");
                self.navigationCurrentMonth.classList.add("slideLeftNew");
            }
            else if (delta < 0) {
                daysContainer.firstChild.classList.add("slideRightNew");
                daysContainer.lastChild.classList.add("slideRight");
                self.oldCurMonth.classList.add("slideRight");
                self.navigationCurrentMonth.classList.add("slideRightNew");
            }
        }
        self.currentMonthElement = self.navigationCurrentMonth
            .firstChild;
        self.currentYearElement = self.navigationCurrentMonth.lastChild
            .childNodes[0];
        updateNavigationCurrentMonth();
        if (self.oldCurMonth.firstChild)
            self.oldCurMonth.firstChild.textContent = monthToStr(self.currentMonth - delta, self.config.shorthandCurrentMonth, self.l10n);
        triggerEvent("onMonthChange");
        if (from_keyboard &&
            document.activeElement &&
            document.activeElement.$i) {
            var index_1 = document.activeElement.$i;
            afterDayAnim(function () {
                focusOnDay(index_1, 0);
            });
        }
    }
    function clear(triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        self.input.value = "";
        if (self.altInput)
            self.altInput.value = "";
        if (self.mobileInput)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        self.showTimeInput = false;
        self.redraw();
        if (triggerChangeEvent === true)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            self._input.classList.remove("active");
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            var h = self._handlers[i];
            h.element.removeEventListener(h.event, h.handler);
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode)
            self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
            self.input.value = "";
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input ||
                e.target === self.altInput ||
                self.element.contains(e.target) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput && !isCalendarElement;
            if (lostFocus &&
                self.config.ignoredFocusElements.indexOf(e.target) === -1) {
                self.close();
                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.currentYearElement.min &&
                newYear < parseInt(self.currentYearElement.min)) ||
            (self.currentYearElement.max &&
                newYear > parseInt(self.currentYearElement.max)))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
        }
    }
    function isEnabled(date, timeless) {
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable.length && !self.config.disable.length)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string" && dateToCheck !== undefined) {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function onKeyDown(e) {
        var isInput = e.target === self._input;
        var calendarElem = isCalendarElem(e.target);
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.key === "Enter" && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return e.target.blur();
            }
            else
                self.open();
        }
        else if (calendarElem || allowKeydown || allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(e.target);
            switch (e.key) {
                case "Enter":
                    if (isTimeObj)
                        updateValue();
                    else
                        selectDate(e);
                    break;
                case "Escape":
                    e.preventDefault();
                    self.close();
                    break;
                case "Backspace":
                case "Delete":
                    if (isInput && !self.config.allowInput)
                        self.clear();
                    break;
                case "ArrowLeft":
                case "ArrowRight":
                    if (!isTimeObj) {
                        e.preventDefault();
                        if (self.daysContainer) {
                            var delta_1 = e.key === "ArrowRight" ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(e.target.$i, delta_1);
                            else
                                changeMonth(delta_1, true, undefined, true);
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case "ArrowUp":
                case "ArrowDown":
                    e.preventDefault();
                    var delta = e.key === "ArrowDown" ? 1 : -1;
                    if (self.daysContainer && e.target.$i !== undefined) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(e.target.$i, delta * 7);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case "Tab":
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    }
                    else if (e.target === self.minuteElement &&
                        (self.secondElement || self.amPM)) {
                        e.preventDefault();
                        if (self.secondElement !== undefined)
                            self.secondElement.focus();
                        else if (self.amPM !== undefined)
                            self.amPM.focus();
                    }
                    else if (e.target === self.secondElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }
                    break;
                case "a":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "AM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                case "p":
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = "PM";
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                default:
                    break;
            }
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            !elem.classList.contains("flatpickr-day") ||
            self.minRangeDate === undefined ||
            self.maxRangeDate === undefined)
            return;
        var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], undefined, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }
        var _loop_1 = function (timestamp, i) {
            var outOfRange = timestamp < self.minRangeDate.getTime() ||
                timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            }
            else if (containsDisabled && !outOfRange)
                return "continue";
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("startRange");
            else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("endRange");
            if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                dayElem.classList.add("inRange");
        };
        for (var timestamp = self.days.childNodes[0].dateObj.getTime(), i = 0; i < 42; i++, timestamp += duration.DAY) {
            _loop_1(timestamp, i);
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._input; }
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target && e.target.blur();
            }
            setTimeout(function () {
                self.mobileInput !== undefined && self.mobileInput.click();
            }, 0);
            triggerEvent("onOpen");
            return;
        }
        if (self.isOpen || self._input.disabled || self.config.inline)
            return;
        self.isOpen = true;
        self.calendarContainer.classList.add("open");
        positionCalendar(positionElement);
        self._input.classList.add("active");
        triggerEvent("onOpen");
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var hooks = [
            "onChange",
            "onClose",
            "onDayCreate",
            "onDestroy",
            "onKeyDown",
            "onMonthChange",
            "onOpen",
            "onParseConfig",
            "onReady",
            "onValueUpdate",
            "onYearChange",
        ];
        self.config = __assign({}, flatpickr.defaultConfig);
        var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
        var formats$$1 = {};
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable || []; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable || []; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        if (!userConfig.dateFormat && userConfig.enableTime) {
            formats$$1.dateFormat = userConfig.noCalendar
                ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                : flatpickr.defaultConfig.dateFormat +
                    " H:i" +
                    (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            formats$$1.altFormat = userConfig.noCalendar
                ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                : flatpickr.defaultConfig.altFormat +
                    (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        Object.assign(self.config, formats$$1, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        for (var i = hooks.length; i--;) {
            if (self.config[hooks[i]] !== undefined) {
                self.config[hooks[i]] = arrayify(self.config[hooks[i]] || []).map(bindToInstance);
            }
        }
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (~hooks.indexOf(key)) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable.length &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        triggerEvent("onParseConfig");
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            console.warn("flatpickr: invalid locale " + self.config.locale);
        self.l10n = __assign({}, flatpickr.l10ns.default, typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined);
    }
    function positionCalendar(positionElement) {
        if (positionElement === void 0) { positionElement = self._positionElement; }
        if (self.calendarContainer === undefined)
            return;
        var calendarHeight = self.calendarContainer.offsetHeight, calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" ||
            (configPos !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(e.target, isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2)
                self.clear();
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear)
                triggerEvent("onYearChange");
            triggerEvent("onMonthChange");
        }
        buildDays();
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.config.enableTime &&
            compareDates(selectedDate, self.config.minDate) === 0)
            setHoursFromDate(self.config.minDate);
        updateValue();
        if (self.config.enableTime)
            setTimeout(function () { return (self.showTimeInput = true); }, 50);
        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(target);
                self._hidePrevMonthArrow =
                    self._hidePrevMonthArrow ||
                        (self.minRangeDate !== undefined &&
                            self.minRangeDate >
                                self.days.childNodes[0].dateObj);
                self._hideNextMonthArrow =
                    self._hideNextMonthArrow ||
                        (self.maxRangeDate !== undefined &&
                            self.maxRangeDate <
                                new Date(self.currentYear, self.currentMonth + 1, 1));
            }
            else
                updateNavigationCurrentMonth();
        }
        triggerEvent("onChange");
        if (!shouldChangeMonth)
            focusOnDay(target.$i, 0);
        else
            afterDayAnim(function () { return self.selectedDateElem && self.selectedDateElem.focus(); });
        if (self.hourElement !== undefined)
            setTimeout(function () { return self.hourElement !== undefined && self.hourElement.select(); }, 451);
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range)
                self.close();
        }
    }
    function set(option, value) {
        if (option !== null && typeof option === "object")
            Object.assign(self.config, option);
        else
            self.config[option] = value;
        self.redraw();
        jumpToDate();
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split("; ")
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
        self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = undefined; }
        if (date !== 0 && !date)
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];
        self.redraw();
        jumpToDate();
        setHoursFromDate();
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = new Date();
        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        var initialDate = self.selectedDates.length
            ? self.selectedDates[0]
            : self.config.minDate &&
                self.config.minDate.getTime() > self.now.getTime()
                ? self.config.minDate
                : self.config.maxDate &&
                    self.config.maxDate.getTime() < self.now.getTime()
                    ? self.config.maxDate
                    : self.now;
        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();
        if (self.selectedDates.length)
            self.latestSelectedDateObj = self.selectedDates[0];
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
        Object.defineProperty(self, "showTimeInput", {
            get: function () { return self._showTimeInput; },
            set: function (bool) {
                self._showTimeInput = bool;
                if (self.calendarContainer)
                    toggleClass(self.calendarContainer, "showTimeInput", bool);
                positionCalendar();
            },
        });
    }
    function formatDate(dateObj, frmt) {
        if (self.config !== undefined && self.config.formatDate !== undefined)
            return self.config.formatDate(dateObj, frmt);
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, self.l10n, self.config)
                : c !== "\\" ? c : "";
        })
            .join("");
    }
    function parseDate(date, givenFormat, timeless) {
        if (date !== 0 && !date)
            return undefined;
        var parsedDate;
        var date_orig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (self.config || flatpickr.defaultConfig).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr))
                parsedDate = new Date(date);
            else if (self.config && self.config.parseDate)
                parsedDate = self.config.parseDate(date, format);
            else {
                parsedDate =
                    !self.config || !self.config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate =
                            fn(parsedDate, val, self.l10n) || parsedDate);
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date)) {
            console.warn("flatpickr: invalid date " + date_orig);
            console.info(self.element);
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    }
    function setupInputs() {
        self.input = self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
        if (!self.input) {
            console.warn("Error: invalid input element specified", self.input);
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.type = "text";
            self.input.type = "hidden";
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar ? "time" : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = self.input.getAttribute("step") || "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date" ? "Y-m-d" : "H:i:S";
        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        self.mobileInput.addEventListener("change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle() {
        if (self.isOpen)
            return self.close();
        self.open();
    }
    function triggerEvent(event, data) {
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.currentMonthElement.textContent =
            monthToStr(self.currentMonth, self.config.shorthandCurrentMonth, self.l10n) + " ";
        self.currentYearElement.value = self.currentYear.toString();
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (!self.selectedDates.length)
            return self.clear(triggerChange);
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        var joinChar = self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator;
        self.input.value = self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, self.config.dateFormat); })
            .join(joinChar);
        if (self.altInput !== undefined) {
            self.altInput.value = self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, self.config.altFormat); })
                .join(joinChar);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavScroll(e) {
        e.preventDefault();
        var isYear = self.currentYearElement.parentNode &&
            self.currentYearElement.parentNode.contains(e.target);
        if (e.target === self.currentMonthElement || isYear) {
            var delta = mouseDelta(e);
            if (isYear) {
                changeYear(self.currentYear + delta);
                e.target.value = self.currentYear.toString();
            }
            else
                self.changeMonth(delta, true, false);
        }
    }
    function onMonthNavClick(e) {
        var isPrevMonth = self.prevMonthNav.contains(e.target);
        var isNextMonth = self.nextMonthNav.contains(e.target);
        if (isPrevMonth || isNextMonth)
            changeMonth(isPrevMonth ? -1 : 1);
        else if (e.target === self.currentYearElement) {
            e.preventDefault();
            self.currentYearElement.select();
        }
        else if (e.target.className === "arrowUp")
            self.changeYear(self.currentYear + 1);
        else if (e.target.className === "arrowDown")
            self.changeYear(self.currentYear - 1);
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", input = e.target;
        if (self.amPM !== undefined && e.target === self.amPM)
            self.amPM.textContent =
                self.l10n.amPM[self.amPM.textContent === "AM" ? 1 : 0];
        var min = Number(input.min), max = Number(input.max), step = Number(input.step), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown
                ? e.which === 38 ? 1 : -1
                : Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY)) || 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step))
                self.amPM.textContent = self.amPM.textContent === "PM" ? "AM" : "PM";
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList);
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.warn(e, e.stack);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr;
flatpickr = function (selector, config) {
    if (selector instanceof NodeList)
        return _flatpickr(selector, config);
    else if (typeof selector === "string")
        return _flatpickr(window.document.querySelectorAll(selector), config);
    return _flatpickr([selector], config);
};
window.flatpickr = flatpickr;
flatpickr.defaultConfig = defaults;
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign({}, flatpickr.l10ns.default, l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
};
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
var flatpickr$1 = flatpickr;

return flatpickr$1;

})));


/***/ }),
/* 119 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getConditionChecker;
/* harmony export (immutable) */ __webpack_exports__["c"] = getQuestions;
/* harmony export (immutable) */ __webpack_exports__["h"] = isValidItem;
/* harmony export (immutable) */ __webpack_exports__["g"] = isQuestion;
/* harmony export (immutable) */ __webpack_exports__["b"] = getQuestionnaireIdMap;
/* unused harmony export getQuestionsIdMap */
/* unused harmony export questionMatchesValue */
/* harmony export (immutable) */ __webpack_exports__["i"] = walkQuestionnaireQuestions;
/* unused harmony export getValue */
/* harmony export (immutable) */ __webpack_exports__["f"] = getValues;
/* unused harmony export getResponse */
/* harmony export (immutable) */ __webpack_exports__["d"] = getResponses;
/* harmony export (immutable) */ __webpack_exports__["e"] = getSelectValue;
/* unused harmony export getRadioCheckboxValues */
/* unused harmony export getSelectResponse */
/* unused harmony export getRadioCheckboxResponses */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);
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
			if (question.value && (typeof value === 'boolean' && value || typeof value === 'string' && value === question.value || Array.isArray(value) && value.includes(question.value))) return true;
			break;
		case 'number':
			question;
			if (question.value && (typeof value === 'boolean' && value || typeof value === 'number' && value === question.value || Array.isArray(value) && value.includes(question.value))) return true;
			break;
		case 'select':
			{
				question;
				var selectValue = getSelectValue(question);
				if (selectValue && (typeof value === 'boolean' && value || (typeof value === 'string' || typeof value === 'number') && value === selectValue || Array.isArray(value) && value.includes(selectValue))) return true;
				break;
			}
		case 'checkbox':
		case 'radio':
			{
				question = question;
				var values = getRadioCheckboxValues(question);
				if (values.length > 0 && (typeof value === 'boolean' && value || (typeof value === 'string' || typeof value === 'number') && values.includes(value) || Array.isArray(value) && Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["b" /* arraysIntersect */])(value, values))) return true;
				break;
			}
		case 'list':
			question;
			if (typeof value === 'boolean' && question.items.length > 0) return true;
			break;
	}

	return false;
}

function walkQuestionnaireQuestions(questionnaire, questionCallback) {

	var newQuestionnaire = Object.assign({}, questionnaire);

	newQuestionnaire.sections = questionnaire.sections.map(function (section) {
		var newSection = Object.assign({}, section);
		newSection.items = section.items.map(function (item) {
			return (
				// $FlowFixMe
				questionCallback && isQuestion(item) ? // $FlowFixMe
				questionCallback(item, newSection) // $FlowFixMe
				: Object.assign({}, item)
			);
		});

		return newSection;
	});

	return newQuestionnaire;
}

function getValue(question) {
	switch (question.type) {
		case 'text':
		case 'number':
			return question.value;
		case 'select':
			return getSelectValue(question);
		case 'checkbox':
		case 'radio':
			{
				var values = getRadioCheckboxValues(question);
				if (values.length === 1) return values[0];
				if (values.length > 1) throw new RangeError('Question has multiple responses, use getValues');

				break;
			}
		case 'list':
			throw new TypeError('Cannot currently get value of list questions');
	}
}

function getValues(question) {
	switch (question.type) {
		case 'text':
		case 'number':
		case 'select':
			{
				var _value = getValue(question);
				if (_value) return [_value];

				break;
			}
		case 'checkbox':
		case 'radio':
			return getRadioCheckboxValues(question);
		case 'list':
			throw new TypeError('Cannot currently get values for list questions');
	}

	return [];
}

function getResponse(question) {
	switch (question.type) {
		case 'text':
		case 'number':
			{
				var _value2 = getValue(question);
				if (_value2 && typeof _value2 !== 'string') return '' + _value2;

				break;
			}
		case 'select':
			return getSelectResponse(question);
		case 'radio':
		case 'checkbox':
			{
				var responses = getRadioCheckboxResponses(question);
				if (responses.length === 1) return responses[0];
				if (responses.length > 1) throw new RangeError('Question has multiple responses, use getResponses');

				break;
			}
		case 'list':
			throw new TypeError('Cannot currently get responses for list questions');
	}
}

function getResponses(question) {
	switch (question.type) {
		case 'text':
		case 'number':
		case 'select':
			{
				var response = getResponse(question);
				if (response) return [response];

				break;
			}
		case 'radio':
		case 'checkbox':
			return getRadioCheckboxResponses(question);
		case 'list':
			throw new TypeError('Cannot currently get responses for list questions');
	}

	return [];
}

function getSelectValue(question) {
	var selectedOption = question.options.find(function (option) {
		return option.selected;
	});
	if (selectedOption) return selectedOption.value;
}

function getRadioCheckboxValues(question) {
	return question.options.filter(function (option) {
		return option.checked;
	}).map(function (option) {
		return option.value;
	});
}

function getSelectResponse(question) {
	var selectedOption = question.options.find(function (option) {
		return option.selected;
	});
	if (selectedOption) return selectedOption.text;
}

function getRadioCheckboxResponses(question) {
	return question.options.filter(function (option) {
		return option.checked;
	}).map(function (option) {
		return option.text;
	});
}

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var encode = __webpack_require__(137);
var decode = __webpack_require__(138);

var C_BACKSLASH = 92;

var decodeHTML = __webpack_require__(173).decodeHTML;

var ENTITY = "&(?:#x[a-f0-9]{1,8}|#[0-9]{1,8}|[a-z][a-z0-9]{1,31});";

var TAGNAME = '[A-Za-z][A-Za-z0-9-]*';
var ATTRIBUTENAME = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var UNQUOTEDVALUE = "[^\"'=<>`\\x00-\\x20]+";
var SINGLEQUOTEDVALUE = "'[^']*'";
var DOUBLEQUOTEDVALUE = '"[^"]*"';
var ATTRIBUTEVALUE = "(?:" + UNQUOTEDVALUE + "|" + SINGLEQUOTEDVALUE + "|" + DOUBLEQUOTEDVALUE + ")";
var ATTRIBUTEVALUESPEC = "(?:" + "\\s*=" + "\\s*" + ATTRIBUTEVALUE + ")";
var ATTRIBUTE = "(?:" + "\\s+" + ATTRIBUTENAME + ATTRIBUTEVALUESPEC + "?)";
var OPENTAG = "<" + TAGNAME + ATTRIBUTE + "*" + "\\s*/?>";
var CLOSETAG = "</" + TAGNAME + "\\s*[>]";
var HTMLCOMMENT = "<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->";
var PROCESSINGINSTRUCTION = "[<][?].*?[?][>]";
var DECLARATION = "<![A-Z]+" + "\\s+[^>]*>";
var CDATA = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>";
var HTMLTAG = "(?:" + OPENTAG + "|" + CLOSETAG + "|" + HTMLCOMMENT + "|" +
        PROCESSINGINSTRUCTION + "|" + DECLARATION + "|" + CDATA + ")";
var reHtmlTag = new RegExp('^' + HTMLTAG, 'i');

var reBackslashOrAmp = /[\\&]/;

var ESCAPABLE = '[!"#$%&\'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]';

var reEntityOrEscapedChar = new RegExp('\\\\' + ESCAPABLE + '|' + ENTITY, 'gi');

var XMLSPECIAL = '[&<>"]';

var reXmlSpecial = new RegExp(XMLSPECIAL, 'g');

var reXmlSpecialOrEntity = new RegExp(ENTITY + '|' + XMLSPECIAL, 'gi');

var unescapeChar = function(s) {
    if (s.charCodeAt(0) === C_BACKSLASH) {
        return s.charAt(1);
    } else {
        return decodeHTML(s);
    }
};

// Replace entities and backslash escapes with literal characters.
var unescapeString = function(s) {
    if (reBackslashOrAmp.test(s)) {
        return s.replace(reEntityOrEscapedChar, unescapeChar);
    } else {
        return s;
    }
};

var normalizeURI = function(uri) {
    try {
        return encode(decode(uri));
    }
    catch(err) {
        return uri;
    }
};

var replaceUnsafeChar = function(s) {
    switch (s) {
    case '&':
        return '&amp;';
    case '<':
        return '&lt;';
    case '>':
        return '&gt;';
    case '"':
        return '&quot;';
    default:
        return s;
    }
};

var escapeXml = function(s, preserve_entities) {
    if (reXmlSpecial.test(s)) {
        if (preserve_entities) {
            return s.replace(reXmlSpecialOrEntity, replaceUnsafeChar);
        } else {
            return s.replace(reXmlSpecial, replaceUnsafeChar);
        }
    } else {
        return s;
    }
};

module.exports = { unescapeString: unescapeString,
                   normalizeURI: normalizeURI,
                   escapeXml: escapeXml,
                   reHtmlTag: reHtmlTag,
                   OPENTAG: OPENTAG,
                   CLOSETAG: CLOSETAG,
                   ENTITY: ENTITY,
                   ESCAPABLE: ESCAPABLE
                 };


/***/ }),
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/SvgIcon.vue
//
//
//
//


/* harmony default export */ var SvgIcon = ({
	props: {
		src: {
			type: String,
			required: true
		}
	},
	data: function data() {
		return {
			svg: null
		};
	},
	created: function created() {
		var _this = this;

		fetch(this.src).then(function (response) {
			if (response.ok) return response.text();

			throw new Error('Unable to load icon');
		}).then(function (svg) {
			_this.svg = svg;
		}).catch(function (err) {
			console.error(err.message);
		});
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5137c9f8","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/SvgIcon.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", {
    staticClass: "svg-icon",
    domProps: { innerHTML: _vm._s(_vm.svg) }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var vue_components_SvgIcon = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5137c9f8", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/SvgIcon.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(157)
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
  SvgIcon,
  vue_components_SvgIcon,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/SvgIcon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5137c9f8", Component.options)
  } else {
    hotAPI.reload("data-v-5137c9f8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_SvgIcon = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 126 */,
/* 127 */
/***/ (function(module, exports) {

module.exports = {"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\"","QUOT":"\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}

/***/ }),
/* 128 */,
/* 129 */,
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./resources/assets/js/vue-components/SelectTwo.vue + 2 modules
var SelectTwo = __webpack_require__(37);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(16);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./resources/assets/js/modules/date-utils.js
var date_utils = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/AcademicYearSelector.vue
//
//
//
//
//
//
//
//







/* harmony default export */ var AcademicYearSelector = ({
	props: {
		value: {
			type: Object,
			required: true
		},
		minDate: {
			type: String,
			default: function _default() {
				return Object(date_utils["isoDateString"])(Object(date_utils["academicYearForDate"])(external__moment__default()()).endDate);
			}
		},
		maxDate: {
			type: String,
			default: function _default() {
				return Object(date_utils["isoDateString"])(Object(date_utils["academicYearForDate"])(external__moment__default()().add(1, 'year')).startDate);
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
			var maxDate = external__moment__default()(this.maxDate);
			var d = external__moment__default()(this.minDate);

			var years = [];

			do {
				years.push(Object(date_utils["academicYearForDate"])(d.clone()));

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
			if (index !== lastIndex) this.$emit('input', Object(date_utils["isoDateStringObject"])(this.academicYears[index]));
		}
	},

	methods: {
		matchIndexWithValue: function matchIndexWithValue(value) {
			var newIndex = this.academicYears.findIndex(function (year) {
				return Object(date_utils["datesEqual"])(year, value);
			});

			if (newIndex !== -1) this.yearIndex = newIndex;
		},

		renderDateRange: date_utils["renderDateRange"]
	},

	components: {
		SelectTwo: SelectTwo["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-672cba10","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/AcademicYearSelector.vue
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
/* harmony default export */ var vue_components_AcademicYearSelector = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-672cba10", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/AcademicYearSelector.vue
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
  AcademicYearSelector,
  vue_components_AcademicYearSelector,
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

/* harmony default export */ var js_vue_components_AcademicYearSelector = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./resources/assets/js/modules/date-utils.js
var date_utils = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/RichDateRange.vue
//
//
//
//
//
//



/* harmony default export */ var RichDateRange = ({
	props: {
		dates: {
			type: Object,
			required: true
		},
		start: {
			type: String,
			default: 'startDate'
		},
		end: {
			type: String,
			default: 'endDate'
		},
		time: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			hovered: false
		};
	},
	mounted: function mounted() {
		this.$refs.container.addEventListener('mouseenter', this.handleMouseEnter);

		this.$refs.container.addEventListener('mouseleave', this.handleMouseLeave);
	},


	computed: {
		startDate: function startDate() {
			return this.dates[this.start];
		},
		endDate: function endDate() {
			return this.dates[this.end];
		},
		dateString: function dateString() {
			return Object(date_utils["renderDateRange"])(this.startDate, this.endDate, this.hovered);
		}
	},

	methods: {
		handleMouseEnter: function handleMouseEnter() {
			this.hovered = true;
		},
		handleMouseLeave: function handleMouseLeave() {
			this.hovered = false;
		}
	},

	beforeDestroy: function beforeDestroy() {
		this.$refs.container.removeEventListener('mouseenter', this.handleMouseEnter);

		this.$refs.container.removeEventListener('mouseleave', this.handleMouseLeave);
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7a8a5f24","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/RichDateRange.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", { ref: "container" }, [
    _vm._v("\n\t" + _vm._s(_vm.dateString) + "\n")
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var vue_components_RichDateRange = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7a8a5f24", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/RichDateRange.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(270)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7a8a5f24"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  RichDateRange,
  vue_components_RichDateRange,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/RichDateRange.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7a8a5f24", Component.options)
  } else {
    hotAPI.reload("data-v-7a8a5f24", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_RichDateRange = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 132 */,
/* 133 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 134 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.2
 * Copyright (C) 2016 Oliver Nightingale
 * @license MIT
 */

;(function(){

/**
 * Convenience function for instantiating a new lunr index and configuring it
 * with the default pipeline functions and the passed config function.
 *
 * When using this convenience function a new index will be created with the
 * following functions already in the pipeline:
 *
 * lunr.StopWordFilter - filters out any stop words before they enter the
 * index
 *
 * lunr.stemmer - stems the tokens before entering the index.
 *
 * Example:
 *
 *     var idx = lunr(function () {
 *       this.field('title', 10)
 *       this.field('tags', 100)
 *       this.field('body')
 *       
 *       this.ref('cid')
 *       
 *       this.pipeline.add(function () {
 *         // some custom pipeline function
 *       })
 *       
 *     })
 *
 * @param {Function} config A function that will be called with the new instance
 * of the lunr.Index as both its context and first parameter. It can be used to
 * customize the instance of new lunr.Index.
 * @namespace
 * @module
 * @returns {lunr.Index}
 *
 */
var lunr = function (config) {
  var idx = new lunr.Index

  idx.pipeline.add(
    lunr.trimmer,
    lunr.stopWordFilter,
    lunr.stemmer
  )

  if (config) config.call(idx, idx)

  return idx
}

lunr.version = "0.7.2"
/*!
 * lunr.utils
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * A namespace containing utils for the rest of the lunr library
 */
lunr.utils = {}

/**
 * Print a warning message to the console.
 *
 * @param {String} message The message to be printed.
 * @memberOf Utils
 */
lunr.utils.warn = (function (global) {
  return function (message) {
    if (global.console && console.warn) {
      console.warn(message)
    }
  }
})(this)

/**
 * Convert an object to a string.
 *
 * In the case of `null` and `undefined` the function returns
 * the empty string, in all other cases the result of calling
 * `toString` on the passed object is returned.
 *
 * @param {Any} obj The object to convert to a string.
 * @return {String} string representation of the passed object.
 * @memberOf Utils
 */
lunr.utils.asString = function (obj) {
  if (obj === void 0 || obj === null) {
    return ""
  } else {
    return obj.toString()
  }
}
/*!
 * lunr.EventEmitter
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
 *
 * @constructor
 */
lunr.EventEmitter = function () {
  this.events = {}
}

/**
 * Binds a handler function to a specific event(s).
 *
 * Can bind a single function to many different events in one call.
 *
 * @param {String} [eventName] The name(s) of events to bind this function to.
 * @param {Function} fn The function to call when an event is fired.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.addListener = function () {
  var args = Array.prototype.slice.call(arguments),
      fn = args.pop(),
      names = args

  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

  names.forEach(function (name) {
    if (!this.hasHandler(name)) this.events[name] = []
    this.events[name].push(fn)
  }, this)
}

/**
 * Removes a handler function from a specific event.
 *
 * @param {String} eventName The name of the event to remove this function from.
 * @param {Function} fn The function to remove from an event.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.removeListener = function (name, fn) {
  if (!this.hasHandler(name)) return

  var fnIndex = this.events[name].indexOf(fn)
  this.events[name].splice(fnIndex, 1)

  if (!this.events[name].length) delete this.events[name]
}

/**
 * Calls all functions bound to the given event.
 *
 * Additional data can be passed to the event handler as arguments to `emit`
 * after the event name.
 *
 * @param {String} eventName The name of the event to emit.
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.emit = function (name) {
  if (!this.hasHandler(name)) return

  var args = Array.prototype.slice.call(arguments, 1)

  this.events[name].forEach(function (fn) {
    fn.apply(undefined, args)
  })
}

/**
 * Checks whether a handler has ever been stored against an event.
 *
 * @param {String} eventName The name of the event to check.
 * @private
 * @memberOf EventEmitter
 */
lunr.EventEmitter.prototype.hasHandler = function (name) {
  return name in this.events
}

/*!
 * lunr.tokenizer
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * A function for splitting a string into tokens ready to be inserted into
 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
 * the value of this property to change how strings are split into tokens.
 *
 * @module
 * @param {String} obj The string to convert into tokens
 * @see lunr.tokenizer.separator
 * @returns {Array}
 */
lunr.tokenizer = function (obj) {
  if (!arguments.length || obj == null || obj == undefined) return []
  if (Array.isArray(obj)) return obj.map(function (t) { return lunr.utils.asString(t).toLowerCase() })

  // TODO: This exists so that the deprecated property lunr.tokenizer.seperator can still be used. By
  // default it is set to false and so the correctly spelt lunr.tokenizer.separator is used unless
  // the user is using the old property to customise the tokenizer.
  //
  // This should be removed when version 1.0.0 is released.
  var separator = lunr.tokenizer.seperator || lunr.tokenizer.separator

  return obj.toString().trim().toLowerCase().split(separator)
}

/**
 * This property is legacy alias for lunr.tokenizer.separator to maintain backwards compatability.
 * When introduced the token was spelt incorrectly. It will remain until 1.0.0 when it will be removed,
 * all code should use the correctly spelt lunr.tokenizer.separator property instead.
 *
 * @static
 * @see lunr.tokenizer.separator
 * @deprecated since 0.7.2 will be removed in 1.0.0
 * @private
 * @see lunr.tokenizer
 */
lunr.tokenizer.seperator = false

/**
 * The sperator used to split a string into tokens. Override this property to change the behaviour of
 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
 *
 * @static
 * @see lunr.tokenizer
 */
lunr.tokenizer.separator = /[\s\-]+/

/**
 * Loads a previously serialised tokenizer.
 *
 * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
 * If the serialised tokenizer has not been registered then an error will be thrown.
 *
 * @param {String} label The label of the serialised tokenizer.
 * @returns {Function}
 * @memberOf tokenizer
 */
lunr.tokenizer.load = function (label) {
  var fn = this.registeredFunctions[label]

  if (!fn) {
    throw new Error('Cannot load un-registered function: ' + label)
  }

  return fn
}

lunr.tokenizer.label = 'default'

lunr.tokenizer.registeredFunctions = {
  'default': lunr.tokenizer
}

/**
 * Register a tokenizer function.
 *
 * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
 *
 * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
 *
 * @param {Function} fn The function to register.
 * @param {String} label The label to register this function with
 * @memberOf tokenizer
 */
lunr.tokenizer.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing tokenizer: ' + label)
  }

  fn.label = label
  this.registeredFunctions[label] = fn
}
/*!
 * lunr.Pipeline
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Pipelines maintain an ordered list of functions to be applied to all
 * tokens in documents entering the search index and queries being ran against
 * the index.
 *
 * An instance of lunr.Index created with the lunr shortcut will contain a
 * pipeline with a stop word filter and an English language stemmer. Extra
 * functions can be added before or after either of these functions or these
 * default functions can be removed.
 *
 * When run the pipeline will call each function in turn, passing a token, the
 * index of that token in the original list of all tokens and finally a list of
 * all the original tokens.
 *
 * The output of functions in the pipeline will be passed to the next function
 * in the pipeline. To exclude a token from entering the index the function
 * should return undefined, the rest of the pipeline will not be called with
 * this token.
 *
 * For serialisation of pipelines to work, all functions used in an instance of
 * a pipeline should be registered with lunr.Pipeline. Registered functions can
 * then be loaded. If trying to load a serialised pipeline that uses functions
 * that are not registered an error will be thrown.
 *
 * If not planning on serialising the pipeline then registering pipeline functions
 * is not necessary.
 *
 * @constructor
 */
lunr.Pipeline = function () {
  this._stack = []
}

lunr.Pipeline.registeredFunctions = {}

/**
 * Register a function with the pipeline.
 *
 * Functions that are used in the pipeline should be registered if the pipeline
 * needs to be serialised, or a serialised pipeline needs to be loaded.
 *
 * Registering a function does not add it to a pipeline, functions must still be
 * added to instances of the pipeline for them to be used when running a pipeline.
 *
 * @param {Function} fn The function to check for.
 * @param {String} label The label to register this function with
 * @memberOf Pipeline
 */
lunr.Pipeline.registerFunction = function (fn, label) {
  if (label in this.registeredFunctions) {
    lunr.utils.warn('Overwriting existing registered function: ' + label)
  }

  fn.label = label
  lunr.Pipeline.registeredFunctions[fn.label] = fn
}

/**
 * Warns if the function is not registered as a Pipeline function.
 *
 * @param {Function} fn The function to check for.
 * @private
 * @memberOf Pipeline
 */
lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
  }
}

/**
 * Loads a previously serialised pipeline.
 *
 * All functions to be loaded must already be registered with lunr.Pipeline.
 * If any function from the serialised data has not been registered then an
 * error will be thrown.
 *
 * @param {Object} serialised The serialised pipeline to load.
 * @returns {lunr.Pipeline}
 * @memberOf Pipeline
 */
lunr.Pipeline.load = function (serialised) {
  var pipeline = new lunr.Pipeline

  serialised.forEach(function (fnName) {
    var fn = lunr.Pipeline.registeredFunctions[fnName]

    if (fn) {
      pipeline.add(fn)
    } else {
      throw new Error('Cannot load un-registered function: ' + fnName)
    }
  })

  return pipeline
}

/**
 * Adds new functions to the end of the pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} functions Any number of functions to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.add = function () {
  var fns = Array.prototype.slice.call(arguments)

  fns.forEach(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
    this._stack.push(fn)
  }, this)
}

/**
 * Adds a single function after a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.after = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  pos = pos + 1
  this._stack.splice(pos, 0, newFn)
}

/**
 * Adds a single function before a function that already exists in the
 * pipeline.
 *
 * Logs a warning if the function has not been registered.
 *
 * @param {Function} existingFn A function that already exists in the pipeline.
 * @param {Function} newFn The new function to add to the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.before = function (existingFn, newFn) {
  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

  var pos = this._stack.indexOf(existingFn)
  if (pos == -1) {
    throw new Error('Cannot find existingFn')
  }

  this._stack.splice(pos, 0, newFn)
}

/**
 * Removes a function from the pipeline.
 *
 * @param {Function} fn The function to remove from the pipeline.
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.remove = function (fn) {
  var pos = this._stack.indexOf(fn)
  if (pos == -1) {
    return
  }

  this._stack.splice(pos, 1)
}

/**
 * Runs the current list of functions that make up the pipeline against the
 * passed tokens.
 *
 * @param {Array} tokens The tokens to run through the pipeline.
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.run = function (tokens) {
  var out = [],
      tokenLength = tokens.length,
      stackLength = this._stack.length

  for (var i = 0; i < tokenLength; i++) {
    var token = tokens[i]

    for (var j = 0; j < stackLength; j++) {
      token = this._stack[j](token, i, tokens)
      if (token === void 0 || token === '') break
    };

    if (token !== void 0 && token !== '') out.push(token)
  };

  return out
}

/**
 * Resets the pipeline by removing any existing processors.
 *
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.reset = function () {
  this._stack = []
}

/**
 * Returns a representation of the pipeline ready for serialisation.
 *
 * Logs a warning if the function has not been registered.
 *
 * @returns {Array}
 * @memberOf Pipeline
 */
lunr.Pipeline.prototype.toJSON = function () {
  return this._stack.map(function (fn) {
    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

    return fn.label
  })
}
/*!
 * lunr.Vector
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Vectors implement vector related operations for
 * a series of elements.
 *
 * @constructor
 */
lunr.Vector = function () {
  this._magnitude = null
  this.list = undefined
  this.length = 0
}

/**
 * lunr.Vector.Node is a simple struct for each node
 * in a lunr.Vector.
 *
 * @private
 * @param {Number} The index of the node in the vector.
 * @param {Object} The data at this node in the vector.
 * @param {lunr.Vector.Node} The node directly after this node in the vector.
 * @constructor
 * @memberOf Vector
 */
lunr.Vector.Node = function (idx, val, next) {
  this.idx = idx
  this.val = val
  this.next = next
}

/**
 * Inserts a new value at a position in a vector.
 *
 * @param {Number} The index at which to insert a value.
 * @param {Object} The object to insert in the vector.
 * @memberOf Vector.
 */
lunr.Vector.prototype.insert = function (idx, val) {
  this._magnitude = undefined;
  var list = this.list

  if (!list) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  if (idx < list.idx) {
    this.list = new lunr.Vector.Node (idx, val, list)
    return this.length++
  }

  var prev = list,
      next = list.next

  while (next != undefined) {
    if (idx < next.idx) {
      prev.next = new lunr.Vector.Node (idx, val, next)
      return this.length++
    }

    prev = next, next = next.next
  }

  prev.next = new lunr.Vector.Node (idx, val, next)
  return this.length++
}

/**
 * Calculates the magnitude of this vector.
 *
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.magnitude = function () {
  if (this._magnitude) return this._magnitude
  var node = this.list,
      sumOfSquares = 0,
      val

  while (node) {
    val = node.val
    sumOfSquares += val * val
    node = node.next
  }

  return this._magnitude = Math.sqrt(sumOfSquares)
}

/**
 * Calculates the dot product of this vector and another vector.
 *
 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.dot = function (otherVector) {
  var node = this.list,
      otherNode = otherVector.list,
      dotProduct = 0

  while (node && otherNode) {
    if (node.idx < otherNode.idx) {
      node = node.next
    } else if (node.idx > otherNode.idx) {
      otherNode = otherNode.next
    } else {
      dotProduct += node.val * otherNode.val
      node = node.next
      otherNode = otherNode.next
    }
  }

  return dotProduct
}

/**
 * Calculates the cosine similarity between this vector and another
 * vector.
 *
 * @param {lunr.Vector} otherVector The other vector to calculate the
 * similarity with.
 * @returns {Number}
 * @memberOf Vector
 */
lunr.Vector.prototype.similarity = function (otherVector) {
  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
}
/*!
 * lunr.SortedSet
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
 * order.
 *
 * @constructor
 */
lunr.SortedSet = function () {
  this.length = 0
  this.elements = []
}

/**
 * Loads a previously serialised sorted set.
 *
 * @param {Array} serialisedData The serialised set to load.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.load = function (serialisedData) {
  var set = new this

  set.elements = serialisedData
  set.length = serialisedData.length

  return set
}

/**
 * Inserts new items into the set in the correct position to maintain the
 * order.
 *
 * @param {Object} The objects to add to this set.
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.add = function () {
  var i, element

  for (i = 0; i < arguments.length; i++) {
    element = arguments[i]
    if (~this.indexOf(element)) continue
    this.elements.splice(this.locationFor(element), 0, element)
  }

  this.length = this.elements.length
}

/**
 * Converts this sorted set into an array.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toArray = function () {
  return this.elements.slice()
}

/**
 * Creates a new array with the results of calling a provided function on every
 * element in this sorted set.
 *
 * Delegates to Array.prototype.map and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * for the function fn.
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.map = function (fn, ctx) {
  return this.elements.map(fn, ctx)
}

/**
 * Executes a provided function once per sorted set element.
 *
 * Delegates to Array.prototype.forEach and has the same signature.
 *
 * @param {Function} fn The function that is called on each element of the
 * set.
 * @param {Object} ctx An optional object that can be used as the context
 * @memberOf SortedSet
 * for the function fn.
 */
lunr.SortedSet.prototype.forEach = function (fn, ctx) {
  return this.elements.forEach(fn, ctx)
}

/**
 * Returns the index at which a given element can be found in the
 * sorted set, or -1 if it is not present.
 *
 * @param {Object} elem The object to locate in the sorted set.
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.indexOf = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem === elem) return pivot

    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem === elem) return pivot

  return -1
}

/**
 * Returns the position within the sorted set that an element should be
 * inserted at to maintain the current order of the set.
 *
 * This function assumes that the element to search for does not already exist
 * in the sorted set.
 *
 * @param {Object} elem The elem to find the position for in the set
 * @returns {Number}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.locationFor = function (elem) {
  var start = 0,
      end = this.elements.length,
      sectionLength = end - start,
      pivot = start + Math.floor(sectionLength / 2),
      pivotElem = this.elements[pivot]

  while (sectionLength > 1) {
    if (pivotElem < elem) start = pivot
    if (pivotElem > elem) end = pivot

    sectionLength = end - start
    pivot = start + Math.floor(sectionLength / 2)
    pivotElem = this.elements[pivot]
  }

  if (pivotElem > elem) return pivot
  if (pivotElem < elem) return pivot + 1
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the intersection
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.intersect = function (otherSet) {
  var intersectSet = new lunr.SortedSet,
      i = 0, j = 0,
      a_len = this.length, b_len = otherSet.length,
      a = this.elements, b = otherSet.elements

  while (true) {
    if (i > a_len - 1 || j > b_len - 1) break

    if (a[i] === b[j]) {
      intersectSet.add(a[i])
      i++, j++
      continue
    }

    if (a[i] < b[j]) {
      i++
      continue
    }

    if (a[i] > b[j]) {
      j++
      continue
    }
  };

  return intersectSet
}

/**
 * Makes a copy of this set
 *
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.clone = function () {
  var clone = new lunr.SortedSet

  clone.elements = this.toArray()
  clone.length = clone.elements.length

  return clone
}

/**
 * Creates a new lunr.SortedSet that contains the elements in the union
 * of this set and the passed set.
 *
 * @param {lunr.SortedSet} otherSet The set to union with this set.
 * @returns {lunr.SortedSet}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.union = function (otherSet) {
  var longSet, shortSet, unionSet

  if (this.length >= otherSet.length) {
    longSet = this, shortSet = otherSet
  } else {
    longSet = otherSet, shortSet = this
  }

  unionSet = longSet.clone()

  for(var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++){
    unionSet.add(shortSetElements[i])
  }

  return unionSet
}

/**
 * Returns a representation of the sorted set ready for serialisation.
 *
 * @returns {Array}
 * @memberOf SortedSet
 */
lunr.SortedSet.prototype.toJSON = function () {
  return this.toArray()
}
/*!
 * lunr.Index
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Index is object that manages a search index.  It contains the indexes
 * and stores all the tokens and document lookups.  It also provides the main
 * user facing API for the library.
 *
 * @constructor
 */
lunr.Index = function () {
  this._fields = []
  this._ref = 'id'
  this.pipeline = new lunr.Pipeline
  this.documentStore = new lunr.Store
  this.tokenStore = new lunr.TokenStore
  this.corpusTokens = new lunr.SortedSet
  this.eventEmitter =  new lunr.EventEmitter
  this.tokenizerFn = lunr.tokenizer

  this._idfCache = {}

  this.on('add', 'remove', 'update', (function () {
    this._idfCache = {}
  }).bind(this))
}

/**
 * Bind a handler to events being emitted by the index.
 *
 * The handler can be bound to many events at the same time.
 *
 * @param {String} [eventName] The name(s) of events to bind the function to.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.on = function () {
  var args = Array.prototype.slice.call(arguments)
  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
}

/**
 * Removes a handler from an event being emitted by the index.
 *
 * @param {String} eventName The name of events to remove the function from.
 * @param {Function} fn The serialised set to load.
 * @memberOf Index
 */
lunr.Index.prototype.off = function (name, fn) {
  return this.eventEmitter.removeListener(name, fn)
}

/**
 * Loads a previously serialised index.
 *
 * Issues a warning if the index being imported was serialised
 * by a different version of lunr.
 *
 * @param {Object} serialisedData The serialised set to load.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.load = function (serialisedData) {
  if (serialisedData.version !== lunr.version) {
    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
  }

  var idx = new this

  idx._fields = serialisedData.fields
  idx._ref = serialisedData.ref

  idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer))
  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

  return idx
}

/**
 * Adds a field to the list of fields that will be searchable within documents
 * in the index.
 *
 * An optional boost param can be passed to affect how much tokens in this field
 * rank in search results, by default the boost value is 1.
 *
 * Fields should be added before any documents are added to the index, fields
 * that are added after documents are added to the index will only apply to new
 * documents added to the index.
 *
 * @param {String} fieldName The name of the field within the document that
 * should be indexed
 * @param {Number} boost An optional boost that can be applied to terms in this
 * field.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.field = function (fieldName, opts) {
  var opts = opts || {},
      field = { name: fieldName, boost: opts.boost || 1 }

  this._fields.push(field)
  return this
}

/**
 * Sets the property used to uniquely identify documents added to the index,
 * by default this property is 'id'.
 *
 * This should only be changed before adding documents to the index, changing
 * the ref property without resetting the index can lead to unexpected results.
 *
 * The value of ref can be of any type but it _must_ be stably comparable and
 * orderable.
 *
 * @param {String} refName The property to use to uniquely identify the
 * documents in the index.
 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.ref = function (refName) {
  this._ref = refName
  return this
}

/**
 * Sets the tokenizer used for this index.
 *
 * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
 * should only be changed before adding documents to the index. Changing the tokenizer
 * without re-building the index can lead to unexpected results.
 *
 * @param {Function} fn The function to use as a tokenizer.
 * @returns {lunr.Index}
 * @memberOf Index
 */
lunr.Index.prototype.tokenizer = function (fn) {
  var isRegistered = fn.label && (fn.label in lunr.tokenizer.registeredFunctions)

  if (!isRegistered) {
    lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index')
  }

  this.tokenizerFn = fn
  return this
}

/**
 * Add a document to the index.
 *
 * This is the way new documents enter the index, this function will run the
 * fields from the document through the index's pipeline and then add it to
 * the index, it will then show up in search results.
 *
 * An 'add' event is emitted with the document that has been added and the index
 * the document has been added to. This event can be silenced by passing false
 * as the second argument to add.
 *
 * @param {Object} doc The document to add to the index.
 * @param {Boolean} emitEvent Whether or not to emit events, default true.
 * @memberOf Index
 */
lunr.Index.prototype.add = function (doc, emitEvent) {
  var docTokens = {},
      allDocumentTokens = new lunr.SortedSet,
      docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  this._fields.forEach(function (field) {
    var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]))

    docTokens[field.name] = fieldTokens

    for (var i = 0; i < fieldTokens.length; i++) {
      var token = fieldTokens[i]
      allDocumentTokens.add(token)
      this.corpusTokens.add(token)
    }
  }, this)

  this.documentStore.set(docRef, allDocumentTokens)

  for (var i = 0; i < allDocumentTokens.length; i++) {
    var token = allDocumentTokens.elements[i]
    var tf = 0;

    for (var j = 0; j < this._fields.length; j++){
      var field = this._fields[j]
      var fieldTokens = docTokens[field.name]
      var fieldLength = fieldTokens.length

      if (!fieldLength) continue

      var tokenCount = 0
      for (var k = 0; k < fieldLength; k++){
        if (fieldTokens[k] === token){
          tokenCount++
        }
      }

      tf += (tokenCount / fieldLength * field.boost)
    }

    this.tokenStore.add(token, { ref: docRef, tf: tf })
  };

  if (emitEvent) this.eventEmitter.emit('add', doc, this)
}

/**
 * Removes a document from the index.
 *
 * To make sure documents no longer show up in search results they can be
 * removed from the index using this method.
 *
 * The document passed only needs to have the same ref property value as the
 * document that was added to the index, they could be completely different
 * objects.
 *
 * A 'remove' event is emitted with the document that has been removed and the index
 * the document has been removed from. This event can be silenced by passing false
 * as the second argument to remove.
 *
 * @param {Object} doc The document to remove from the index.
 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
 * @memberOf Index
 */
lunr.Index.prototype.remove = function (doc, emitEvent) {
  var docRef = doc[this._ref],
      emitEvent = emitEvent === undefined ? true : emitEvent

  if (!this.documentStore.has(docRef)) return

  var docTokens = this.documentStore.get(docRef)

  this.documentStore.remove(docRef)

  docTokens.forEach(function (token) {
    this.tokenStore.remove(token, docRef)
  }, this)

  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
}

/**
 * Updates a document in the index.
 *
 * When a document contained within the index gets updated, fields changed,
 * added or removed, to make sure it correctly matched against search queries,
 * it should be updated in the index.
 *
 * This method is just a wrapper around `remove` and `add`
 *
 * An 'update' event is emitted with the document that has been updated and the index.
 * This event can be silenced by passing false as the second argument to update. Only
 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
 * are silenced.
 *
 * @param {Object} doc The document to update in the index.
 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
 * @see Index.prototype.remove
 * @see Index.prototype.add
 * @memberOf Index
 */
lunr.Index.prototype.update = function (doc, emitEvent) {
  var emitEvent = emitEvent === undefined ? true : emitEvent

  this.remove(doc, false)
  this.add(doc, false)

  if (emitEvent) this.eventEmitter.emit('update', doc, this)
}

/**
 * Calculates the inverse document frequency for a token within the index.
 *
 * @param {String} token The token to calculate the idf of.
 * @see Index.prototype.idf
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.idf = function (term) {
  var cacheKey = "@" + term
  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

  var documentFrequency = this.tokenStore.count(term),
      idf = 1

  if (documentFrequency > 0) {
    idf = 1 + Math.log(this.documentStore.length / documentFrequency)
  }

  return this._idfCache[cacheKey] = idf
}

/**
 * Searches the index using the passed query.
 *
 * Queries should be a string, multiple words are allowed and will lead to an
 * AND based query, e.g. `idx.search('foo bar')` will run a search for
 * documents containing both 'foo' and 'bar'.
 *
 * All query tokens are passed through the same pipeline that document tokens
 * are passed through, so any language processing involved will be run on every
 * query term.
 *
 * Each query term is expanded, so that the term 'he' might be expanded to
 * 'hello' and 'help' if those terms were already included in the index.
 *
 * Matching documents are returned as an array of objects, each object contains
 * the matching document ref, as set for this index, and the similarity score
 * for this document against the query.
 *
 * @param {String} query The query to search the index with.
 * @returns {Object}
 * @see Index.prototype.idf
 * @see Index.prototype.documentVector
 * @memberOf Index
 */
lunr.Index.prototype.search = function (query) {
  var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
      queryVector = new lunr.Vector,
      documentSets = [],
      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

  var hasSomeToken = queryTokens.some(function (token) {
    return this.tokenStore.has(token)
  }, this)

  if (!hasSomeToken) return []

  queryTokens
    .forEach(function (token, i, tokens) {
      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
          self = this

      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
        var pos = self.corpusTokens.indexOf(key),
            idf = self.idf(key),
            similarityBoost = 1,
            set = new lunr.SortedSet

        // if the expanded key is not an exact match to the token then
        // penalise the score for this key by how different the key is
        // to the token.
        if (key !== token) {
          var diff = Math.max(3, key.length - token.length)
          similarityBoost = 1 / Math.log(diff)
        }

        // calculate the query tf-idf score for this token
        // applying an similarityBoost to ensure exact matches
        // these rank higher than expanded terms
        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

        // add all the documents that have this key into a set
        // ensuring that the type of key is preserved
        var matchingDocuments = self.tokenStore.get(key),
            refs = Object.keys(matchingDocuments),
            refsLen = refs.length

        for (var i = 0; i < refsLen; i++) {
          set.add(matchingDocuments[refs[i]].ref)
        }

        return memo.union(set)
      }, new lunr.SortedSet)

      documentSets.push(set)
    }, this)

  var documentSet = documentSets.reduce(function (memo, set) {
    return memo.intersect(set)
  })

  return documentSet
    .map(function (ref) {
      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
    }, this)
    .sort(function (a, b) {
      return b.score - a.score
    })
}

/**
 * Generates a vector containing all the tokens in the document matching the
 * passed documentRef.
 *
 * The vector contains the tf-idf score for each token contained in the
 * document with the passed documentRef.  The vector will contain an element
 * for every token in the indexes corpus, if the document does not contain that
 * token the element will be 0.
 *
 * @param {Object} documentRef The ref to find the document with.
 * @returns {lunr.Vector}
 * @private
 * @memberOf Index
 */
lunr.Index.prototype.documentVector = function (documentRef) {
  var documentTokens = this.documentStore.get(documentRef),
      documentTokensLength = documentTokens.length,
      documentVector = new lunr.Vector

  for (var i = 0; i < documentTokensLength; i++) {
    var token = documentTokens.elements[i],
        tf = this.tokenStore.get(token)[documentRef].tf,
        idf = this.idf(token)

    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
  };

  return documentVector
}

/**
 * Returns a representation of the index ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Index
 */
lunr.Index.prototype.toJSON = function () {
  return {
    version: lunr.version,
    fields: this._fields,
    ref: this._ref,
    tokenizer: this.tokenizerFn.label,
    documentStore: this.documentStore.toJSON(),
    tokenStore: this.tokenStore.toJSON(),
    corpusTokens: this.corpusTokens.toJSON(),
    pipeline: this.pipeline.toJSON()
  }
}

/**
 * Applies a plugin to the current index.
 *
 * A plugin is a function that is called with the index as its context.
 * Plugins can be used to customise or extend the behaviour the index
 * in some way. A plugin is just a function, that encapsulated the custom
 * behaviour that should be applied to the index.
 *
 * The plugin function will be called with the index as its argument, additional
 * arguments can also be passed when calling use. The function will be called
 * with the index as its context.
 *
 * Example:
 *
 *     var myPlugin = function (idx, arg1, arg2) {
 *       // `this` is the index to be extended
 *       // apply any extensions etc here.
 *     }
 *
 *     var idx = lunr(function () {
 *       this.use(myPlugin, 'arg1', 'arg2')
 *     })
 *
 * @param {Function} plugin The plugin to apply.
 * @memberOf Index
 */
lunr.Index.prototype.use = function (plugin) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.unshift(this)
  plugin.apply(this, args)
}
/*!
 * lunr.Store
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.Store is a simple key-value store used for storing sets of tokens for
 * documents stored in index.
 *
 * @constructor
 * @module
 */
lunr.Store = function () {
  this.store = {}
  this.length = 0
}

/**
 * Loads a previously serialised store
 *
 * @param {Object} serialisedData The serialised store to load.
 * @returns {lunr.Store}
 * @memberOf Store
 */
lunr.Store.load = function (serialisedData) {
  var store = new this

  store.length = serialisedData.length
  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
    return memo
  }, {})

  return store
}

/**
 * Stores the given tokens in the store against the given id.
 *
 * @param {Object} id The key used to store the tokens against.
 * @param {Object} tokens The tokens to store against the key.
 * @memberOf Store
 */
lunr.Store.prototype.set = function (id, tokens) {
  if (!this.has(id)) this.length++
  this.store[id] = tokens
}

/**
 * Retrieves the tokens from the store for a given key.
 *
 * @param {Object} id The key to lookup and retrieve from the store.
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.get = function (id) {
  return this.store[id]
}

/**
 * Checks whether the store contains a key.
 *
 * @param {Object} id The id to look up in the store.
 * @returns {Boolean}
 * @memberOf Store
 */
lunr.Store.prototype.has = function (id) {
  return id in this.store
}

/**
 * Removes the value for a key in the store.
 *
 * @param {Object} id The id to remove from the store.
 * @memberOf Store
 */
lunr.Store.prototype.remove = function (id) {
  if (!this.has(id)) return

  delete this.store[id]
  this.length--
}

/**
 * Returns a representation of the store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf Store
 */
lunr.Store.prototype.toJSON = function () {
  return {
    store: this.store,
    length: this.length
  }
}

/*!
 * lunr.stemmer
 * Copyright (C) 2016 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.stemmer is an english language stemmer, this is a JavaScript
 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
 *
 * @module
 * @param {String} str The string to stem
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stemmer = (function(){
  var step2list = {
      "ational" : "ate",
      "tional" : "tion",
      "enci" : "ence",
      "anci" : "ance",
      "izer" : "ize",
      "bli" : "ble",
      "alli" : "al",
      "entli" : "ent",
      "eli" : "e",
      "ousli" : "ous",
      "ization" : "ize",
      "ation" : "ate",
      "ator" : "ate",
      "alism" : "al",
      "iveness" : "ive",
      "fulness" : "ful",
      "ousness" : "ous",
      "aliti" : "al",
      "iviti" : "ive",
      "biliti" : "ble",
      "logi" : "log"
    },

    step3list = {
      "icate" : "ic",
      "ative" : "",
      "alize" : "al",
      "iciti" : "ic",
      "ical" : "ic",
      "ful" : "",
      "ness" : ""
    },

    c = "[^aeiou]",          // consonant
    v = "[aeiouy]",          // vowel
    C = c + "[^aeiouy]*",    // consonant sequence
    V = v + "[aeiou]*",      // vowel sequence

    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
    s_v = "^(" + C + ")?" + v;                   // vowel in stem

  var re_mgr0 = new RegExp(mgr0);
  var re_mgr1 = new RegExp(mgr1);
  var re_meq1 = new RegExp(meq1);
  var re_s_v = new RegExp(s_v);

  var re_1a = /^(.+?)(ss|i)es$/;
  var re2_1a = /^(.+?)([^s])s$/;
  var re_1b = /^(.+?)eed$/;
  var re2_1b = /^(.+?)(ed|ing)$/;
  var re_1b_2 = /.$/;
  var re2_1b_2 = /(at|bl|iz)$/;
  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var re_1c = /^(.+?[^aeiou])y$/;
  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
  var re2_4 = /^(.+?)(s|t)(ion)$/;

  var re_5 = /^(.+?)e$/;
  var re_5_1 = /ll$/;
  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

  var porterStemmer = function porterStemmer(w) {
    var   stem,
      suffix,
      firstch,
      re,
      re2,
      re3,
      re4;

    if (w.length < 3) { return w; }

    firstch = w.substr(0,1);
    if (firstch == "y") {
      w = firstch.toUpperCase() + w.substr(1);
    }

    // Step 1a
    re = re_1a
    re2 = re2_1a;

    if (re.test(w)) { w = w.replace(re,"$1$2"); }
    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

    // Step 1b
    re = re_1b;
    re2 = re2_1b;
    if (re.test(w)) {
      var fp = re.exec(w);
      re = re_mgr0;
      if (re.test(fp[1])) {
        re = re_1b_2;
        w = w.replace(re,"");
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1];
      re2 = re_s_v;
      if (re2.test(stem)) {
        w = stem;
        re2 = re2_1b_2;
        re3 = re3_1b_2;
        re4 = re4_1b_2;
        if (re2.test(w)) {  w = w + "e"; }
        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
        else if (re4.test(w)) { w = w + "e"; }
      }
    }

    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
    re = re_1c;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      w = stem + "i";
    }

    // Step 2
    re = re_2;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step2list[suffix];
      }
    }

    // Step 3
    re = re_3;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      suffix = fp[2];
      re = re_mgr0;
      if (re.test(stem)) {
        w = stem + step3list[suffix];
      }
    }

    // Step 4
    re = re_4;
    re2 = re2_4;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      if (re.test(stem)) {
        w = stem;
      }
    } else if (re2.test(w)) {
      var fp = re2.exec(w);
      stem = fp[1] + fp[2];
      re2 = re_mgr1;
      if (re2.test(stem)) {
        w = stem;
      }
    }

    // Step 5
    re = re_5;
    if (re.test(w)) {
      var fp = re.exec(w);
      stem = fp[1];
      re = re_mgr1;
      re2 = re_meq1;
      re3 = re3_5;
      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
        w = stem;
      }
    }

    re = re_5_1;
    re2 = re_mgr1;
    if (re.test(w) && re2.test(w)) {
      re = re_1b_2;
      w = w.replace(re,"");
    }

    // and turn initial Y back to y

    if (firstch == "y") {
      w = firstch.toLowerCase() + w.substr(1);
    }

    return w;
  };

  return porterStemmer;
})();

lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
/*!
 * lunr.stopWordFilter
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
 * list of stop words.
 *
 * The built in lunr.stopWordFilter is built using this generator and can be used
 * to generate custom stopWordFilters for applications or non English languages.
 *
 * @module
 * @param {Array} token The token to pass through the filter
 * @returns {Function}
 * @see lunr.Pipeline
 * @see lunr.stopWordFilter
 */
lunr.generateStopWordFilter = function (stopWords) {
  var words = stopWords.reduce(function (memo, stopWord) {
    memo[stopWord] = stopWord
    return memo
  }, {})

  return function (token) {
    if (token && words[token] !== token) return token
  }
}

/**
 * lunr.stopWordFilter is an English language stop word list filter, any words
 * contained in the list will not be passed through the filter.
 *
 * This is intended to be used in the Pipeline. If the token does not pass the
 * filter then undefined will be returned.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.stopWordFilter = lunr.generateStopWordFilter([
  'a',
  'able',
  'about',
  'across',
  'after',
  'all',
  'almost',
  'also',
  'am',
  'among',
  'an',
  'and',
  'any',
  'are',
  'as',
  'at',
  'be',
  'because',
  'been',
  'but',
  'by',
  'can',
  'cannot',
  'could',
  'dear',
  'did',
  'do',
  'does',
  'either',
  'else',
  'ever',
  'every',
  'for',
  'from',
  'get',
  'got',
  'had',
  'has',
  'have',
  'he',
  'her',
  'hers',
  'him',
  'his',
  'how',
  'however',
  'i',
  'if',
  'in',
  'into',
  'is',
  'it',
  'its',
  'just',
  'least',
  'let',
  'like',
  'likely',
  'may',
  'me',
  'might',
  'most',
  'must',
  'my',
  'neither',
  'no',
  'nor',
  'not',
  'of',
  'off',
  'often',
  'on',
  'only',
  'or',
  'other',
  'our',
  'own',
  'rather',
  'said',
  'say',
  'says',
  'she',
  'should',
  'since',
  'so',
  'some',
  'than',
  'that',
  'the',
  'their',
  'them',
  'then',
  'there',
  'these',
  'they',
  'this',
  'tis',
  'to',
  'too',
  'twas',
  'us',
  'wants',
  'was',
  'we',
  'were',
  'what',
  'when',
  'where',
  'which',
  'while',
  'who',
  'whom',
  'why',
  'will',
  'with',
  'would',
  'yet',
  'you',
  'your'
])

lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
/*!
 * lunr.trimmer
 * Copyright (C) 2016 Oliver Nightingale
 */

/**
 * lunr.trimmer is a pipeline function for trimming non word
 * characters from the begining and end of tokens before they
 * enter the index.
 *
 * This implementation may not work correctly for non latin
 * characters and should either be removed or adapted for use
 * with languages with non-latin characters.
 *
 * @module
 * @param {String} token The token to pass through the filter
 * @returns {String}
 * @see lunr.Pipeline
 */
lunr.trimmer = function (token) {
  return token.replace(/^\W+/, '').replace(/\W+$/, '')
}

lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
/*!
 * lunr.stemmer
 * Copyright (C) 2016 Oliver Nightingale
 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
 */

/**
 * lunr.TokenStore is used for efficient storing and lookup of the reverse
 * index of token to document ref.
 *
 * @constructor
 */
lunr.TokenStore = function () {
  this.root = { docs: {} }
  this.length = 0
}

/**
 * Loads a previously serialised token store
 *
 * @param {Object} serialisedData The serialised token store to load.
 * @returns {lunr.TokenStore}
 * @memberOf TokenStore
 */
lunr.TokenStore.load = function (serialisedData) {
  var store = new this

  store.root = serialisedData.root
  store.length = serialisedData.length

  return store
}

/**
 * Adds a new token doc pair to the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to store the doc under
 * @param {Object} doc The doc to store against the token
 * @param {Object} root An optional node at which to start looking for the
 * correct place to enter the doc, by default the root of this lunr.TokenStore
 * is used.
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.add = function (token, doc, root) {
  var root = root || this.root,
      key = token.charAt(0),
      rest = token.slice(1)

  if (!(key in root)) root[key] = {docs: {}}

  if (rest.length === 0) {
    root[key].docs[doc.ref] = doc
    this.length += 1
    return
  } else {
    return this.add(rest, doc, root[key])
  }
}

/**
 * Checks whether this key is contained within this lunr.TokenStore.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to check for
 * @param {Object} root An optional node at which to start
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.has = function (token) {
  if (!token) return false

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return false

    node = node[token.charAt(i)]
  }

  return true
}

/**
 * Retrieve a node from the token store for a given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the node for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @see TokenStore.prototype.get
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.getNode = function (token) {
  if (!token) return {}

  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!node[token.charAt(i)]) return {}

    node = node[token.charAt(i)]
  }

  return node
}

/**
 * Retrieve the documents for a node for the given token.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.get = function (token, root) {
  return this.getNode(token, root).docs || {}
}

lunr.TokenStore.prototype.count = function (token, root) {
  return Object.keys(this.get(token, root)).length
}

/**
 * Remove the document identified by ref from the token in the store.
 *
 * By default this function starts at the root of the current store, however
 * it can start at any node of any token store if required.
 *
 * @param {String} token The token to get the documents for.
 * @param {String} ref The ref of the document to remove from this token.
 * @param {Object} root An optional node at which to start.
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.remove = function (token, ref) {
  if (!token) return
  var node = this.root

  for (var i = 0; i < token.length; i++) {
    if (!(token.charAt(i) in node)) return
    node = node[token.charAt(i)]
  }

  delete node.docs[ref]
}

/**
 * Find all the possible suffixes of the passed token using tokens
 * currently in the store.
 *
 * @param {String} token The token to expand.
 * @returns {Array}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.expand = function (token, memo) {
  var root = this.getNode(token),
      docs = root.docs || {},
      memo = memo || []

  if (Object.keys(docs).length) memo.push(token)

  Object.keys(root)
    .forEach(function (key) {
      if (key === 'docs') return

      memo.concat(this.expand(token + key, memo))
    }, this)

  return memo
}

/**
 * Returns a representation of the token store ready for serialisation.
 *
 * @returns {Object}
 * @memberOf TokenStore
 */
lunr.TokenStore.prototype.toJSON = function () {
  return {
    root: this.root,
    length: this.length
  }
}

  /**
   * export the module via AMD, CommonJS or as a browser global
   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
   */
  ;(function (root, factory) {
    if (true) {
      // AMD. Register as an anonymous module.
      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
    } else if (typeof exports === 'object') {
      /**
       * Node. Does not work with strict CommonJS, but
       * only CommonJS-like enviroments that support module.exports,
       * like Node.
       */
      module.exports = factory()
    } else {
      // Browser globals (root is window)
      root.lunr = factory()
    }
  }(this, function () {
    /**
     * Just return a value to define the module export.
     * This example returns an object, but the module
     * can return a function as the exported value.
     */
    return lunr
  }))
})();


/***/ }),
/* 136 */,
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode.componentChars = "-_.!~*'()";


module.exports = encode;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";




/* eslint-disable no-bitwise */

var decodeCache = {};

function getDecodeCache(exclude) {
  var i, ch, cache = decodeCache[exclude];
  if (cache) { return cache; }

  cache = decodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);
    cache.push(ch);
  }

  for (i = 0; i < exclude.length; i++) {
    ch = exclude.charCodeAt(i);
    cache[ch] = '%' + ('0' + ch.toString(16).toUpperCase()).slice(-2);
  }

  return cache;
}


// Decode percent-encoded string.
//
function decode(string, exclude) {
  var cache;

  if (typeof exclude !== 'string') {
    exclude = decode.defaultChars;
  }

  cache = getDecodeCache(exclude);

  return string.replace(/(%[a-f0-9]{2})+/gi, function(seq) {
    var i, l, b1, b2, b3, b4, chr,
        result = '';

    for (i = 0, l = seq.length; i < l; i += 3) {
      b1 = parseInt(seq.slice(i + 1, i + 3), 16);

      if (b1 < 0x80) {
        result += cache[b1];
        continue;
      }

      if ((b1 & 0xE0) === 0xC0 && (i + 3 < l)) {
        // 110xxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);

        if ((b2 & 0xC0) === 0x80) {
          chr = ((b1 << 6) & 0x7C0) | (b2 & 0x3F);

          if (chr < 0x80) {
            result += '\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 3;
          continue;
        }
      }

      if ((b1 & 0xF0) === 0xE0 && (i + 6 < l)) {
        // 1110xxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80) {
          chr = ((b1 << 12) & 0xF000) | ((b2 << 6) & 0xFC0) | (b3 & 0x3F);

          if (chr < 0x800 || (chr >= 0xD800 && chr <= 0xDFFF)) {
            result += '\ufffd\ufffd\ufffd';
          } else {
            result += String.fromCharCode(chr);
          }

          i += 6;
          continue;
        }
      }

      if ((b1 & 0xF8) === 0xF0 && (i + 9 < l)) {
        // 111110xx 10xxxxxx 10xxxxxx 10xxxxxx
        b2 = parseInt(seq.slice(i + 4, i + 6), 16);
        b3 = parseInt(seq.slice(i + 7, i + 9), 16);
        b4 = parseInt(seq.slice(i + 10, i + 12), 16);

        if ((b2 & 0xC0) === 0x80 && (b3 & 0xC0) === 0x80 && (b4 & 0xC0) === 0x80) {
          chr = ((b1 << 18) & 0x1C0000) | ((b2 << 12) & 0x3F000) | ((b3 << 6) & 0xFC0) | (b4 & 0x3F);

          if (chr < 0x10000 || chr > 0x10FFFF) {
            result += '\ufffd\ufffd\ufffd\ufffd';
          } else {
            chr -= 0x10000;
            result += String.fromCharCode(0xD800 + (chr >> 10), 0xDC00 + (chr & 0x3FF));
          }

          i += 9;
          continue;
        }
      }

      result += '\ufffd';
    }

    return result;
  });
}


decode.defaultChars   = ';/?:@&=+$,#';
decode.componentChars = '';


module.exports = decode;


/***/ }),
/* 139 */,
/* 140 */,
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isContainer(node) {
    switch (node._type) {
    case 'document':
    case 'block_quote':
    case 'list':
    case 'item':
    case 'paragraph':
    case 'heading':
    case 'emph':
    case 'strong':
    case 'link':
    case 'image':
    case 'custom_inline':
    case 'custom_block':
        return true;
    default:
        return false;
    }
}

var resumeAt = function(node, entering) {
    this.current = node;
    this.entering = (entering === true);
};

var next = function(){
    var cur = this.current;
    var entering = this.entering;

    if (cur === null) {
        return null;
    }

    var container = isContainer(cur);

    if (entering && container) {
        if (cur._firstChild) {
            this.current = cur._firstChild;
            this.entering = true;
        } else {
            // stay on node but exit
            this.entering = false;
        }

    } else if (cur === this.root) {
        this.current = null;

    } else if (cur._next === null) {
        this.current = cur._parent;
        this.entering = false;

    } else {
        this.current = cur._next;
        this.entering = true;
    }

    return {entering: entering, node: cur};
};

var NodeWalker = function(root) {
    return { current: root,
             root: root,
             entering: true,
             next: next,
             resumeAt: resumeAt };
};

var Node = function(nodeType, sourcepos) {
    this._type = nodeType;
    this._parent = null;
    this._firstChild = null;
    this._lastChild = null;
    this._prev = null;
    this._next = null;
    this._sourcepos = sourcepos;
    this._lastLineBlank = false;
    this._open = true;
    this._string_content = null;
    this._literal = null;
    this._listData = {};
    this._info = null;
    this._destination = null;
    this._title = null;
    this._isFenced = false;
    this._fenceChar = null;
    this._fenceLength = 0;
    this._fenceOffset = null;
    this._level = null;
    this._onEnter = null;
    this._onExit = null;
};

var proto = Node.prototype;

Object.defineProperty(proto, 'isContainer', {
    get: function () { return isContainer(this); }
});

Object.defineProperty(proto, 'type', {
    get: function() { return this._type; }
});

Object.defineProperty(proto, 'firstChild', {
    get: function() { return this._firstChild; }
});

Object.defineProperty(proto, 'lastChild', {
    get: function() { return this._lastChild; }
});

Object.defineProperty(proto, 'next', {
    get: function() { return this._next; }
});

Object.defineProperty(proto, 'prev', {
    get: function() { return this._prev; }
});

Object.defineProperty(proto, 'parent', {
    get: function() { return this._parent; }
});

Object.defineProperty(proto, 'sourcepos', {
    get: function() { return this._sourcepos; }
});

Object.defineProperty(proto, 'literal', {
    get: function() { return this._literal; },
    set: function(s) { this._literal = s; }
});

Object.defineProperty(proto, 'destination', {
    get: function() { return this._destination; },
    set: function(s) { this._destination = s; }
});

Object.defineProperty(proto, 'title', {
    get: function() { return this._title; },
    set: function(s) { this._title = s; }
});

Object.defineProperty(proto, 'info', {
    get: function() { return this._info; },
    set: function(s) { this._info = s; }
});

Object.defineProperty(proto, 'level', {
    get: function() { return this._level; },
    set: function(s) { this._level = s; }
});

Object.defineProperty(proto, 'listType', {
    get: function() { return this._listData.type; },
    set: function(t) { this._listData.type = t; }
});

Object.defineProperty(proto, 'listTight', {
    get: function() { return this._listData.tight; },
    set: function(t) { this._listData.tight = t; }
});

Object.defineProperty(proto, 'listStart', {
    get: function() { return this._listData.start; },
    set: function(n) { this._listData.start = n; }
});

Object.defineProperty(proto, 'listDelimiter', {
    get: function() { return this._listData.delimiter; },
    set: function(delim) { this._listData.delimiter = delim; }
});

Object.defineProperty(proto, 'onEnter', {
    get: function() { return this._onEnter; },
    set: function(s) { this._onEnter = s; }
});

Object.defineProperty(proto, 'onExit', {
    get: function() { return this._onExit; },
    set: function(s) { this._onExit = s; }
});

Node.prototype.appendChild = function(child) {
    child.unlink();
    child._parent = this;
    if (this._lastChild) {
        this._lastChild._next = child;
        child._prev = this._lastChild;
        this._lastChild = child;
    } else {
        this._firstChild = child;
        this._lastChild = child;
    }
};

Node.prototype.prependChild = function(child) {
    child.unlink();
    child._parent = this;
    if (this._firstChild) {
        this._firstChild._prev = child;
        child._next = this._firstChild;
        this._firstChild = child;
    } else {
        this._firstChild = child;
        this._lastChild = child;
    }
};

Node.prototype.unlink = function() {
    if (this._prev) {
        this._prev._next = this._next;
    } else if (this._parent) {
        this._parent._firstChild = this._next;
    }
    if (this._next) {
        this._next._prev = this._prev;
    } else if (this._parent) {
        this._parent._lastChild = this._prev;
    }
    this._parent = null;
    this._next = null;
    this._prev = null;
};

Node.prototype.insertAfter = function(sibling) {
    sibling.unlink();
    sibling._next = this._next;
    if (sibling._next) {
        sibling._next._prev = sibling;
    }
    sibling._prev = this;
    this._next = sibling;
    sibling._parent = this._parent;
    if (!sibling._next) {
        sibling._parent._lastChild = sibling;
    }
};

Node.prototype.insertBefore = function(sibling) {
    sibling.unlink();
    sibling._prev = this._prev;
    if (sibling._prev) {
        sibling._prev._next = sibling;
    }
    sibling._next = this;
    this._prev = sibling;
    sibling._parent = this._parent;
    if (!sibling._prev) {
        sibling._parent._firstChild = sibling;
    }
};

Node.prototype.walker = function() {
    var walker = new NodeWalker(this);
    return walker;
};

module.exports = Node;


/* Example of use of walker:

 var walker = w.walker();
 var event;

 while (event = walker.next()) {
 console.log(event.entering, event.node.type);
 }

 */


/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (process.env.NODE_ENV !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    process.env.NODE_ENV !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (process.env.NODE_ENV !== 'production') {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (process.env.NODE_ENV !== 'production') {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (process.env.NODE_ENV !== 'production') {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          process.env.NODE_ENV !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(128)))

/***/ }),
/* 143 */,
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/v-tooltip/dist/v-tooltip.esm.js
var v_tooltip_esm = __webpack_require__(168);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/SvgIcon.vue + 2 modules
var SvgIcon = __webpack_require__(125);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/LoadingButton.vue
//
//
//
//
//
//
//
//
//





/* harmony default export */ var LoadingButton = ({
	directives: {
		tooltip: v_tooltip_esm["a" /* VTooltip */]
	},
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		loadingClass: {
			type: [String, Object],
			required: false
		},
		successful: {
			type: Boolean,
			default: false
		},
		tooltip: {
			type: String,
			default: 'Done!'
		},
		tooltipTimeout: {
			type: Number,
			default: 3000
		}
	},

	computed: {
		tooltipOptions: function tooltipOptions() {
			return {
				content: this.tooltip,
				trigger: 'manual'
			};
		}
	},

	watch: {
		loading: function loading(_loading, oldLoading) {
			var _this = this;

			if (!_loading && oldLoading && this.successful) {
				this.$refs.loadingContainer._tooltip.show();
				window.setTimeout(function () {
					_this.$refs.loadingContainer._tooltip.hide();
				}, this.tooltipTimeout);
			}
		}
	},

	components: {
		SvgIcon: SvgIcon["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1ae71dc9","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/LoadingButton.vue
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    {
      directives: [
        {
          name: "tooltip",
          rawName: "v-tooltip",
          value: _vm.tooltipOptions,
          expression: "tooltipOptions"
        }
      ],
      ref: "loadingContainer"
    },
    [
      _vm.loading
        ? _c(
            "button",
            {
              staticClass: "btn",
              class: _vm.loadingClass,
              attrs: { title: "Loading", disabled: "" }
            },
            [_c("svg-icon", { attrs: { src: "/img/ring.svg" } })],
            1
          )
        : _vm._t("default")
    ],
    2
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ var vue_components_LoadingButton = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1ae71dc9", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/LoadingButton.vue
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
  LoadingButton,
  vue_components_LoadingButton,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/LoadingButton.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1ae71dc9", Component.options)
  } else {
    hotAPI.reload("data-v-1ae71dc9", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_LoadingButton = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VTooltip; });
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.12.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
var nativeHints = ['native code', '[object MutationObserverConstructor]'];

/**
 * Determine if a function is implemented natively (as opposed to a polyfill).
 * @method
 * @memberof Popper.Utils
 * @argument {Function | undefined} fn the function to check
 * @returns {Boolean}
 */
var isNative = (function (fn) {
  return nativeHints.some(function (hint) {
    return (fn || '').toString().indexOf(hint) > -1;
  });
});

var isBrowser = typeof window !== 'undefined';
var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
var timeoutDuration = 0;
for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
  if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
    timeoutDuration = 1;
    break;
  }
}

function microtaskDebounce(fn) {
  var scheduled = false;
  var i = 0;
  var elem = document.createElement('span');

  // MutationObserver provides a mechanism for scheduling microtasks, which
  // are scheduled *before* the next task. This gives us a way to debounce
  // a function but ensure it's called *before* the next paint.
  var observer = new MutationObserver(function () {
    fn();
    scheduled = false;
  });

  observer.observe(elem, { attributes: true });

  return function () {
    if (!scheduled) {
      scheduled = true;
      elem.setAttribute('x-index', i);
      i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
    }
  };
}

function taskDebounce(fn) {
  var scheduled = false;
  return function () {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function () {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}

// It's common for MutationObserver polyfills to be seen in the wild, however
// these rely on Mutation Events which only occur when an element is connected
// to the DOM. The algorithm used in this module does not use a connected element,
// and so we must ensure that a *native* MutationObserver is available.
var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);

/**
* Create a debounced version of a method, that's asynchronously deferred
* but called in the minimum time possible.
*
* @method
* @memberof Popper.Utils
* @argument {Function} fn
* @returns {Function}
*/
var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;

/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction$1(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

/**
 * Get CSS computed property of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Eement} element
 * @argument {String} property
 */
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  // NOTE: 1 DOM access here
  var css = window.getComputedStyle(element, null);
  return property ? css[property] : css;
}

/**
 * Returns the parentNode or the host of the element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} parent
 */
function getParentNode(element) {
  if (element.nodeName === 'HTML') {
    return element;
  }
  return element.parentNode || element.host;
}

/**
 * Returns the scrolling parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} scroll parent
 */
function getScrollParent(element) {
  // Return body, `getScroll` will take care to get the correct `scrollTop` from it
  if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
    return window.document.body;
  }

  // Firefox want us to check `-x` and `-y` variations as well

  var _getStyleComputedProp = getStyleComputedProperty(element),
      overflow = _getStyleComputedProp.overflow,
      overflowX = _getStyleComputedProp.overflowX,
      overflowY = _getStyleComputedProp.overflowY;

  if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
    return element;
  }

  return getScrollParent(getParentNode(element));
}

/**
 * Returns the offset parent of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Element} offset parent
 */
function getOffsetParent(element) {
  // NOTE: 1 DOM access here
  var offsetParent = element && element.offsetParent;
  var nodeName = offsetParent && offsetParent.nodeName;

  if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
    return window.document.documentElement;
  }

  // .offsetParent will return the closest TD or TABLE in case
  // no offsetParent is present, I hate this job...
  if (['TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
    return getOffsetParent(offsetParent);
  }

  return offsetParent;
}

function isOffsetContainer(element) {
  var nodeName = element.nodeName;

  if (nodeName === 'BODY') {
    return false;
  }
  return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
}

/**
 * Finds the root node (document, shadowDOM root) of the given element
 * @method
 * @memberof Popper.Utils
 * @argument {Element} node
 * @returns {Element} root node
 */
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }

  return node;
}

/**
 * Finds the offset parent common to the two provided nodes
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element1
 * @argument {Element} element2
 * @returns {Element} common offset parent
 */
function findCommonOffsetParent(element1, element2) {
  // This check is needed to avoid errors in case one of the elements isn't defined for any reason
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return window.document.documentElement;
  }

  // Here we make sure to give as "start" the element that comes first in the DOM
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;

  // Get common ancestor container
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;

  // Both nodes are inside #document

  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }

    return getOffsetParent(commonAncestorContainer);
  }

  // one of the nodes is inside shadowDOM, find which one
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}

/**
 * Gets the scroll value of the given element in the given side (top and left)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {String} side `top` or `left`
 * @returns {number} amount of scrolled pixels
 */
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

  var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
  var nodeName = element.nodeName;

  if (nodeName === 'BODY' || nodeName === 'HTML') {
    var html = window.document.documentElement;
    var scrollingElement = window.document.scrollingElement || html;
    return scrollingElement[upperSide];
  }

  return element[upperSide];
}

/*
 * Sum or subtract the element scroll values (left and top) from a given rect object
 * @method
 * @memberof Popper.Utils
 * @param {Object} rect - Rect object you want to change
 * @param {HTMLElement} element - The element from the function reads the scroll values
 * @param {Boolean} subtract - set to true if you want to subtract the scroll values
 * @return {Object} rect - The modifier rect object
 */
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var scrollTop = getScroll(element, 'top');
  var scrollLeft = getScroll(element, 'left');
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}

/*
 * Helper to detect borders of a given element
 * @method
 * @memberof Popper.Utils
 * @param {CSSStyleDeclaration} styles
 * Result of `getStyleComputedProperty` on the given element
 * @param {String} axis - `x` or `y`
 * @return {number} borders - The borders size of the given axis
 */

function getBordersSize(styles, axis) {
  var sideA = axis === 'x' ? 'Left' : 'Top';
  var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

  return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
}

/**
 * Tells if you are running Internet Explorer 10
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean} isIE10
 */
var isIE10 = undefined;

var isIE10$1 = function () {
  if (isIE10 === undefined) {
    isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
  }
  return isIE10;
};

function getSize(axis, body, html, computedStyle) {
  return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
}

function getWindowSizes() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var computedStyle = isIE10$1() && window.getComputedStyle(html);

  return {
    height: getSize('Height', body, html, computedStyle),
    width: getSize('Width', body, html, computedStyle)
  };
}

var classCallCheck$1 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$1 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends$1 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

/**
 * Given element offsets, generate an output similar to getBoundingClientRect
 * @method
 * @memberof Popper.Utils
 * @argument {Object} offsets
 * @returns {Object} ClientRect like output
 */
function getClientRect(offsets) {
  return _extends$1({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}

/**
 * Get bounding client rect of given element
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} element
 * @return {Object} client rect
 */
function getBoundingClientRect(element) {
  var rect = {};

  // IE10 10 FIX: Please, don't ask, the element isn't
  // considered in DOM in some circumstances...
  // This isn't reproducible in IE10 compatibility mode of IE11
  if (isIE10$1()) {
    try {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } catch (err) {}
  } else {
    rect = element.getBoundingClientRect();
  }

  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };

  // subtract scrollbar size from sizes
  var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
  var width = sizes.width || element.clientWidth || result.right - result.left;
  var height = sizes.height || element.clientHeight || result.bottom - result.top;

  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;

  // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
  // we make this check conditional for performance reasons
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, 'x');
    vertScrollbar -= getBordersSize(styles, 'y');

    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }

  return getClientRect(result);
}

function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var isIE10 = isIE10$1();
  var isHTML = parent.nodeName === 'HTML';
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);

  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = +styles.borderTopWidth.split('px')[0];
  var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];

  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;

  // Subtract margins of documentElement in case it's being used as parent
  // we do this only on HTML because it's the only element that behaves
  // differently when margins are applied to it. The margins are included in
  // the box of the documentElement, in the other cases not.
  if (!isIE10 && isHTML) {
    var marginTop = +styles.marginTop.split('px')[0];
    var marginLeft = +styles.marginLeft.split('px')[0];

    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;

    // Attach marginTop and marginLeft because in some circumstances we may need them
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }

  if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
    offsets = includeScroll(offsets, parent);
  }

  return offsets;
}

function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var html = window.document.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);

  var scrollTop = getScroll(html);
  var scrollLeft = getScroll(html, 'left');

  var offset = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width: width,
    height: height
  };

  return getClientRect(offset);
}

/**
 * Check if the given element is fixed or is inside a fixed parent
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @argument {Element} customContainer
 * @returns {Boolean} answer to "isFixed?"
 */
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === 'BODY' || nodeName === 'HTML') {
    return false;
  }
  if (getStyleComputedProperty(element, 'position') === 'fixed') {
    return true;
  }
  return isFixed(getParentNode(element));
}

/**
 * Computed the boundaries limits and return them
 * @method
 * @memberof Popper.Utils
 * @param {HTMLElement} popper
 * @param {HTMLElement} reference
 * @param {number} padding
 * @param {HTMLElement} boundariesElement - Element used to define the boundaries
 * @returns {Object} Coordinates of the boundaries
 */
function getBoundaries(popper, reference, padding, boundariesElement) {
  // NOTE: 1 DOM access here
  var boundaries = { top: 0, left: 0 };
  var offsetParent = findCommonOffsetParent(popper, reference);

  // Handle viewport case
  if (boundariesElement === 'viewport') {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
  } else {
    // Handle other cases based on DOM element used as boundaries
    var boundariesNode = void 0;
    if (boundariesElement === 'scrollParent') {
      boundariesNode = getScrollParent(getParentNode(popper));
      if (boundariesNode.nodeName === 'BODY') {
        boundariesNode = window.document.documentElement;
      }
    } else if (boundariesElement === 'window') {
      boundariesNode = window.document.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }

    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);

    // In case of HTML, we need a different computation
    if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(),
          height = _getWindowSizes.height,
          width = _getWindowSizes.width;

      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      // for all the other DOM elements, this one is good
      boundaries = offsets;
    }
  }

  // Add paddings
  boundaries.left += padding;
  boundaries.top += padding;
  boundaries.right -= padding;
  boundaries.bottom -= padding;

  return boundaries;
}

function getArea(_ref) {
  var width = _ref.width,
      height = _ref.height;

  return width * height;
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (placement.indexOf('auto') === -1) {
    return placement;
  }

  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };

  var sortedAreas = Object.keys(rects).map(function (key) {
    return _extends$1({
      key: key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function (a, b) {
    return b.area - a.area;
  });

  var filteredAreas = sortedAreas.filter(function (_ref2) {
    var width = _ref2.width,
        height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });

  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

  var variation = placement.split('-')[1];

  return computedPlacement + (variation ? '-' + variation : '');
}

/**
 * Get offsets to the reference element
 * @method
 * @memberof Popper.Utils
 * @param {Object} state
 * @param {Element} popper - the popper element
 * @param {Element} reference - the reference element (the popper will be relative to this)
 * @returns {Object} An object containing the offsets which will be applied to the popper
 */
function getReferenceOffsets(state, popper, reference) {
  var commonOffsetParent = findCommonOffsetParent(popper, reference);
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
}

/**
 * Get the outer sizes of the given element (offset size + margins)
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element
 * @returns {Object} object containing width and height properties
 */
function getOuterSizes(element) {
  var styles = window.getComputedStyle(element);
  var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
  var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}

/**
 * Get the opposite placement of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement
 * @returns {String} flipped placement
 */
function getOppositePlacement(placement) {
  var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/**
 * Get offsets to the popper
 * @method
 * @memberof Popper.Utils
 * @param {Object} position - CSS position the Popper will get applied
 * @param {HTMLElement} popper - the popper element
 * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
 * @param {String} placement - one of the valid placement options
 * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
 */
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split('-')[0];

  // Get popper node sizes
  var popperRect = getOuterSizes(popper);

  // Add position, width and height to our offsets object
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };

  // depending by the popper placement we have to compute its offsets slightly differently
  var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
  var mainSide = isHoriz ? 'top' : 'left';
  var secondarySide = isHoriz ? 'left' : 'top';
  var measurement = isHoriz ? 'height' : 'width';
  var secondaryMeasurement = !isHoriz ? 'height' : 'width';

  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }

  return popperOffsets;
}

/**
 * Mimics the `find` method of Array
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function find(arr, check) {
  // use native find if supported
  if (Array.prototype.find) {
    return arr.find(check);
  }

  // use `filter` to obtain the same behavior of `find`
  return arr.filter(check)[0];
}

/**
 * Return the index of the matching object
 * @method
 * @memberof Popper.Utils
 * @argument {Array} arr
 * @argument prop
 * @argument value
 * @returns index or -1
 */
function findIndex(arr, prop, value) {
  // use native findIndex if supported
  if (Array.prototype.findIndex) {
    return arr.findIndex(function (cur) {
      return cur[prop] === value;
    });
  }

  // use `find` + `indexOf` if `findIndex` isn't supported
  var match = find(arr, function (obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}

/**
 * Loop trough the list of modifiers and run them in order,
 * each of them will then edit the data object.
 * @method
 * @memberof Popper.Utils
 * @param {dataObject} data
 * @param {Array} modifiers
 * @param {String} ends - Optional modifier name used as stopper
 * @returns {dataObject}
 */
function runModifiers(modifiers, data, ends) {
  var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

  modifiersToRun.forEach(function (modifier) {
    if (modifier.function) {
      console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
    }
    var fn = modifier.function || modifier.fn;
    if (modifier.enabled && isFunction$1(fn)) {
      // Add properties to offsets to make them a complete clientRect object
      // we do this before each modifier to make sure the previous one doesn't
      // mess with these values
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);

      data = fn(data, modifier);
    }
  });

  return data;
}

/**
 * Updates the position of the popper, computing the new offsets and applying
 * the new style.<br />
 * Prefer `scheduleUpdate` over `update` because of performance reasons.
 * @method
 * @memberof Popper
 */
function update() {
  // if popper is destroyed, don't perform any further update
  if (this.state.isDestroyed) {
    return;
  }

  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };

  // compute reference element offsets
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

  // store the computed placement inside `originalPlacement`
  data.originalPlacement = data.placement;

  // compute the popper offsets
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = 'absolute';

  // run the modifiers
  data = runModifiers(this.modifiers, data);

  // the first `update` will call `onCreate` callback
  // the other ones will call `onUpdate` callback
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}

/**
 * Helper used to know if the given modifier is enabled.
 * @method
 * @memberof Popper.Utils
 * @returns {Boolean}
 */
function isModifierEnabled(modifiers, modifierName) {
  return modifiers.some(function (_ref) {
    var name = _ref.name,
        enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}

/**
 * Get the prefixed supported property name
 * @method
 * @memberof Popper.Utils
 * @argument {String} property (camelCase)
 * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
 */
function getSupportedPropertyName(property) {
  var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

  for (var i = 0; i < prefixes.length - 1; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? '' + prefix + upperProp : property;
    if (typeof window.document.body.style[toCheck] !== 'undefined') {
      return toCheck;
    }
  }
  return null;
}

/**
 * Destroy the popper
 * @method
 * @memberof Popper
 */
function destroy() {
  this.state.isDestroyed = true;

  // touch DOM only if `applyStyle` modifier is enabled
  if (isModifierEnabled(this.modifiers, 'applyStyle')) {
    this.popper.removeAttribute('x-placement');
    this.popper.style.left = '';
    this.popper.style.position = '';
    this.popper.style.top = '';
    this.popper.style[getSupportedPropertyName('transform')] = '';
  }

  this.disableEventListeners();

  // remove the popper if user explicity asked for the deletion on destroy
  // do not use `remove` because IE11 doesn't support it
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}

function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === 'BODY';
  var target = isBody ? window : scrollParent;
  target.addEventListener(event, callback, { passive: true });

  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}

/**
 * Setup needed event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function setupEventListeners(reference, options, state, updateBound) {
  // Resize event listener on window
  state.updateBound = updateBound;
  window.addEventListener('resize', state.updateBound, { passive: true });

  // Scroll event listener on scroll parents
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;

  return state;
}

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}

/**
 * Remove event listeners used to update the popper position
 * @method
 * @memberof Popper.Utils
 * @private
 */
function removeEventListeners(reference, state) {
  // Remove resize event listener on window
  window.removeEventListener('resize', state.updateBound);

  // Remove scroll event listener on scroll parents
  state.scrollParents.forEach(function (target) {
    target.removeEventListener('scroll', state.updateBound);
  });

  // Reset state
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}

/**
 * It will remove resize/scroll events and won't recalculate popper position
 * when they are triggered. It also won't trigger onUpdate callback anymore,
 * unless you call `update` method manually.
 * @method
 * @memberof Popper
 */
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    window.cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}

/**
 * Tells if a given input is a number
 * @method
 * @memberof Popper.Utils
 * @param {*} input to check
 * @return {Boolean}
 */
function isNumeric(n) {
  return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Set the style to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the style to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setStyles(element, styles) {
  Object.keys(styles).forEach(function (prop) {
    var unit = '';
    // add unit if the value is numeric and is one of the following
    if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = 'px';
    }
    element.style[prop] = styles[prop] + unit;
  });
}

/**
 * Set the attributes to the given popper
 * @method
 * @memberof Popper.Utils
 * @argument {Element} element - Element to apply the attributes to
 * @argument {Object} styles
 * Object with a list of properties and values which will be applied to the element
 */
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function (prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} data.styles - List of style properties - values to apply to popper element
 * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The same data object
 */
function applyStyle(data) {
  // any property present in `data.styles` will be applied to the popper,
  // in this way we can make the 3rd party modifiers add custom styles to it
  // Be aware, modifiers could override the properties defined in the previous
  // lines of this modifier!
  setStyles(data.instance.popper, data.styles);

  // any property present in `data.attributes` will be applied to the popper,
  // they will be set as HTML attributes of the element
  setAttributes(data.instance.popper, data.attributes);

  // if arrowElement is defined and arrowStyles has some properties
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }

  return data;
}

/**
 * Set the x-placement attribute before everything else because it could be used
 * to add margins to the popper margins needs to be calculated to get the
 * correct popper offsets.
 * @method
 * @memberof Popper.modifiers
 * @param {HTMLElement} reference - The reference element used to position the popper
 * @param {HTMLElement} popper - The HTML element used as popper.
 * @param {Object} options - Popper.js options
 */
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  // compute reference element offsets
  var referenceOffsets = getReferenceOffsets(state, popper, reference);

  // compute auto placement, store placement inside the data object,
  // modifiers will be able to edit `placement` if needed
  // and refer to originalPlacement to know the original value
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

  popper.setAttribute('x-placement', placement);

  // Apply `position` to popper before anything else because
  // without the position applied we can't guarantee correct computations
  setStyles(popper, { position: 'absolute' });

  return options;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function computeStyle(data, options) {
  var x = options.x,
      y = options.y;
  var popper = data.offsets.popper;

  // Remove this legacy support in Popper.js v2

  var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'applyStyle';
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== undefined) {
    console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);

  // Styles
  var styles = {
    position: popper.position
  };

  // floor sides to avoid blurry text
  var offsets = {
    left: Math.floor(popper.left),
    top: Math.floor(popper.top),
    bottom: Math.floor(popper.bottom),
    right: Math.floor(popper.right)
  };

  var sideA = x === 'bottom' ? 'top' : 'bottom';
  var sideB = y === 'right' ? 'left' : 'right';

  // if gpuAcceleration is set to `true` and transform is supported,
  //  we use `translate3d` to apply the position to the popper we
  // automatically use the supported prefixed version if needed
  var prefixedProperty = getSupportedPropertyName('transform');

  // now, let's make a step back and look at this code closely (wtf?)
  // If the content of the popper grows once it's been positioned, it
  // may happen that the popper gets misplaced because of the new content
  // overflowing its reference element
  // To avoid this problem, we provide two options (x and y), which allow
  // the consumer to define the offset origin.
  // If we position a popper on top of a reference element, we can set
  // `x` to `top` to make the popper grow towards its top instead of
  // its bottom.
  var left = void 0,
      top = void 0;
  if (sideA === 'bottom') {
    top = -offsetParentRect.height + offsets.bottom;
  } else {
    top = offsets.top;
  }
  if (sideB === 'right') {
    left = -offsetParentRect.width + offsets.right;
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = 'transform';
  } else {
    // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
    var invertTop = sideA === 'bottom' ? -1 : 1;
    var invertLeft = sideB === 'right' ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ', ' + sideB;
  }

  // Attributes
  var attributes = {
    'x-placement': data.placement
  };

  // Update `data` attributes, styles and arrowStyles
  data.attributes = _extends$1({}, attributes, data.attributes);
  data.styles = _extends$1({}, styles, data.styles);
  data.arrowStyles = _extends$1({}, data.offsets.arrow, data.arrowStyles);

  return data;
}

/**
 * Helper used to know if the given modifier depends from another one.<br />
 * It checks if the needed modifier is listed and enabled.
 * @method
 * @memberof Popper.Utils
 * @param {Array} modifiers - list of modifiers
 * @param {String} requestingName - name of requesting modifier
 * @param {String} requestedName - name of requested modifier
 * @returns {Boolean}
 */
function isModifierRequired(modifiers, requestingName, requestedName) {
  var requesting = find(modifiers, function (_ref) {
    var name = _ref.name;
    return name === requestingName;
  });

  var isRequired = !!requesting && modifiers.some(function (modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });

  if (!isRequired) {
    var _requesting = '`' + requestingName + '`';
    var requested = '`' + requestedName + '`';
    console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
  }
  return isRequired;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function arrow(data, options) {
  // arrow depends on keepTogether in order to work
  if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
    return data;
  }

  var arrowElement = options.element;

  // if arrowElement is a string, suppose it's a CSS selector
  if (typeof arrowElement === 'string') {
    arrowElement = data.instance.popper.querySelector(arrowElement);

    // if arrowElement is not found, don't run the modifier
    if (!arrowElement) {
      return data;
    }
  } else {
    // if the arrowElement isn't a query selector we must check that the
    // provided DOM node is child of its popper node
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn('WARNING: `arrow.element` must be child of its popper element!');
      return data;
    }
  }

  var placement = data.placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isVertical = ['left', 'right'].indexOf(placement) !== -1;

  var len = isVertical ? 'height' : 'width';
  var sideCapitalized = isVertical ? 'Top' : 'Left';
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? 'left' : 'top';
  var opSide = isVertical ? 'bottom' : 'right';
  var arrowElementSize = getOuterSizes(arrowElement)[len];

  //
  // extends keepTogether behavior making sure the popper and its
  // reference have enough pixels in conjuction
  //

  // top/left side
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  // bottom/right side
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }

  // compute center of the popper
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

  // Compute the sideValue using the updated popper offsets
  // take popper margin in account because we don't have this info available
  var popperMarginSide = getStyleComputedProperty(data.instance.popper, 'margin' + sideCapitalized).replace('px', '');
  var sideValue = center - getClientRect(data.offsets.popper)[side] - popperMarginSide;

  // prevent arrowElement from being placed not contiguously to its popper
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

  data.arrowElement = arrowElement;
  data.offsets.arrow = {};
  data.offsets.arrow[side] = Math.round(sideValue);
  data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node

  return data;
}

/**
 * Get the opposite placement variation of the given one
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement variation
 * @returns {String} flipped placement variation
 */
function getOppositeVariation(variation) {
  if (variation === 'end') {
    return 'start';
  } else if (variation === 'start') {
    return 'end';
  }
  return variation;
}

/**
 * List of accepted placements to use as values of the `placement` option.<br />
 * Valid placements are:
 * - `auto`
 * - `top`
 * - `right`
 * - `bottom`
 * - `left`
 *
 * Each placement can have a variation from this list:
 * - `-start`
 * - `-end`
 *
 * Variations are interpreted easily if you think of them as the left to right
 * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
 * is right.<br />
 * Vertically (`left` and `right`), `start` is top and `end` is bottom.
 *
 * Some valid examples are:
 * - `top-end` (on top of reference, right aligned)
 * - `right-start` (on right of reference, top aligned)
 * - `bottom` (on bottom, centered)
 * - `auto-right` (on the side with more space available, alignment depends by placement)
 *
 * @static
 * @type {Array}
 * @enum {String}
 * @readonly
 * @method placements
 * @memberof Popper
 */
var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

// Get rid of `auto` `auto-start` and `auto-end`
var validPlacements = placements.slice(3);

/**
 * Given an initial placement, returns all the subsequent placements
 * clockwise (or counter-clockwise).
 *
 * @method
 * @memberof Popper.Utils
 * @argument {String} placement - A valid placement (it accepts variations)
 * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
 * @returns {Array} placements including their variations
 */
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}

var BEHAVIORS = {
  FLIP: 'flip',
  CLOCKWISE: 'clockwise',
  COUNTERCLOCKWISE: 'counterclockwise'
};

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function flip(data, options) {
  // if `inner` modifier is enabled, we can't use the `flip` modifier
  if (isModifierEnabled(data.instance.modifiers, 'inner')) {
    return data;
  }

  if (data.flipped && data.placement === data.originalPlacement) {
    // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
    return data;
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);

  var placement = data.placement.split('-')[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split('-')[1] || '';

  var flipOrder = [];

  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }

  flipOrder.forEach(function (step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }

    placement = data.placement.split('-')[0];
    placementOpposite = getOppositePlacement(placement);

    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;

    // using floor because the reference offsets may contain decimals we are not going to consider here
    var floor = Math.floor;
    var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

    var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

    // flip the variation if required
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      // this boolean to detect any flip loop
      data.flipped = true;

      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }

      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }

      data.placement = placement + (variation ? '-' + variation : '');

      // this object contains `position`, we want to preserve it along with
      // any additional property we may add in the future
      data.offsets.popper = _extends$1({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

      data = runModifiers(data.instance.modifiers, data, 'flip');
    }
  });
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function keepTogether(data) {
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var placement = data.placement.split('-')[0];
  var floor = Math.floor;
  var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
  var side = isVertical ? 'right' : 'bottom';
  var opSide = isVertical ? 'left' : 'top';
  var measurement = isVertical ? 'width' : 'height';

  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }

  return data;
}

/**
 * Converts a string containing value + unit into a px value number
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} str - Value + unit string
 * @argument {String} measurement - `height` or `width`
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @returns {Number|String}
 * Value in pixels, or original string if no values were extracted
 */
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  // separate value from unit
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];

  // If it's not a number it's an operator, I guess
  if (!value) {
    return str;
  }

  if (unit.indexOf('%') === 0) {
    var element = void 0;
    switch (unit) {
      case '%p':
        element = popperOffsets;
        break;
      case '%':
      case '%r':
      default:
        element = referenceOffsets;
    }

    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === 'vh' || unit === 'vw') {
    // if is a vh or vw, we calculate the size based on the viewport
    var size = void 0;
    if (unit === 'vh') {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    // if is an explicit pixel unit, we get rid of the unit and keep the value
    // if is an implicit unit, it's px, and we return just the value
    return value;
  }
}

/**
 * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
 * @function
 * @memberof {modifiers~offset}
 * @private
 * @argument {String} offset
 * @argument {Object} popperOffsets
 * @argument {Object} referenceOffsets
 * @argument {String} basePlacement
 * @returns {Array} a two cells array with x and y offsets in numbers
 */
function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];

  // Use height if placement is left or right and index is 0 otherwise use width
  // in this way the first offset will use an axis and the second one
  // will use the other one
  var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

  // Split the offset string to obtain a list of values and operands
  // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
  var fragments = offset.split(/(\+|\-)/).map(function (frag) {
    return frag.trim();
  });

  // Detect if the offset string contains a pair of values or a single one
  // they could be separated by comma or space
  var divider = fragments.indexOf(find(fragments, function (frag) {
    return frag.search(/,|\s/) !== -1;
  }));

  if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
    console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
  }

  // If divider is found, we divide the list of values and operands to divide
  // them by ofset X and Y.
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

  // Convert the values with units to absolute pixels to allow our computations
  ops = ops.map(function (op, index) {
    // Most of the units rely on the orientation of the popper
    var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
    var mergeWithPrevious = false;
    return op
    // This aggregates any `+` or `-` sign that aren't considered operators
    // e.g.: 10 + +5 => [10, +, +5]
    .reduce(function (a, b) {
      if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, [])
    // Here we convert the string values into number values (in px)
    .map(function (str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });

  // Loop trough the offsets arrays and execute the operations
  ops.forEach(function (op, index) {
    op.forEach(function (frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
      }
    });
  });
  return offsets;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @argument {Number|String} options.offset=0
 * The offset value as described in the modifier description
 * @returns {Object} The data object, properly modified
 */
function offset(data, _ref) {
  var offset = _ref.offset;
  var placement = data.placement,
      _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var basePlacement = placement.split('-')[0];

  var offsets = void 0;
  if (isNumeric(+offset)) {
    offsets = [+offset, 0];
  } else {
    offsets = parseOffset(offset, popper, reference, basePlacement);
  }

  if (basePlacement === 'left') {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === 'right') {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === 'top') {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === 'bottom') {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }

  data.popper = popper;
  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

  // If offsetParent is the reference element, we really want to
  // go one step up and use the next offsetParent as reference to
  // avoid to make this modifier completely useless and look like broken
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }

  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
  options.boundaries = boundaries;

  var order = options.priority;
  var popper = data.offsets.popper;

  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === 'right' ? 'left' : 'top';
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };

  order.forEach(function (placement) {
    var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
    popper = _extends$1({}, popper, check[side](placement));
  });

  data.offsets.popper = popper;

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var shiftvariation = placement.split('-')[1];

  // if shift shiftvariation is specified, run the modifier
  if (shiftvariation) {
    var _data$offsets = data.offsets,
        reference = _data$offsets.reference,
        popper = _data$offsets.popper;

    var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
    var side = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };

    data.offsets.popper = _extends$1({}, popper, shiftOffsets[shiftvariation]);
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
    return data;
  }

  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function (modifier) {
    return modifier.name === 'preventOverflow';
  }).boundaries;

  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === true) {
      return data;
    }

    data.hide = true;
    data.attributes['x-out-of-boundaries'] = '';
  } else {
    // Avoid unnecessary DOM access if visibility hasn't changed
    if (data.hide === false) {
      return data;
    }

    data.hide = false;
    data.attributes['x-out-of-boundaries'] = false;
  }

  return data;
}

/**
 * @function
 * @memberof Modifiers
 * @argument {Object} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split('-')[0];
  var _data$offsets = data.offsets,
      popper = _data$offsets.popper,
      reference = _data$offsets.reference;

  var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

  var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

  popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);

  return data;
}

/**
 * Modifier function, each modifier can have a function of this type assigned
 * to its `fn` property.<br />
 * These functions will be called on each update, this means that you must
 * make sure they are performant enough to avoid performance bottlenecks.
 *
 * @function ModifierFn
 * @argument {dataObject} data - The data object generated by `update` method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {dataObject} The data object, properly modified
 */

/**
 * Modifiers are plugins used to alter the behavior of your poppers.<br />
 * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
 * needed by the library.
 *
 * Usually you don't want to override the `order`, `fn` and `onLoad` props.
 * All the other properties are configurations that could be tweaked.
 * @namespace modifiers
 */
var modifiers = {
  /**
   * Modifier used to shift the popper on the start or end of its reference
   * element.<br />
   * It will read the variation of the `placement` property.<br />
   * It can be one either `-end` or `-start`.
   * @memberof modifiers
   * @inner
   */
  shift: {
    /** @prop {number} order=100 - Index used to define the order of execution */
    order: 100,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: shift
  },

  /**
   * The `offset` modifier can shift your popper on both its axis.
   *
   * It accepts the following units:
   * - `px` or unitless, interpreted as pixels
   * - `%` or `%r`, percentage relative to the length of the reference element
   * - `%p`, percentage relative to the length of the popper element
   * - `vw`, CSS viewport width unit
   * - `vh`, CSS viewport height unit
   *
   * For length is intended the main axis relative to the placement of the popper.<br />
   * This means that if the placement is `top` or `bottom`, the length will be the
   * `width`. In case of `left` or `right`, it will be the height.
   *
   * You can provide a single value (as `Number` or `String`), or a pair of values
   * as `String` divided by a comma or one (or more) white spaces.<br />
   * The latter is a deprecated method because it leads to confusion and will be
   * removed in v2.<br />
   * Additionally, it accepts additions and subtractions between different units.
   * Note that multiplications and divisions aren't supported.
   *
   * Valid examples are:
   * ```
   * 10
   * '10%'
   * '10, 10'
   * '10%, 10'
   * '10 + 10%'
   * '10 - 5vh + 3%'
   * '-10px + 5vh, 5px - 6%'
   * ```
   * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
   * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
   * > More on this [reading this issue](https://github.com/FezVrasta/popper.js/issues/373)
   *
   * @memberof modifiers
   * @inner
   */
  offset: {
    /** @prop {number} order=200 - Index used to define the order of execution */
    order: 200,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: offset,
    /** @prop {Number|String} offset=0
     * The offset value as described in the modifier description
     */
    offset: 0
  },

  /**
   * Modifier used to prevent the popper from being positioned outside the boundary.
   *
   * An scenario exists where the reference itself is not within the boundaries.<br />
   * We can say it has "escaped the boundaries" — or just "escaped".<br />
   * In this case we need to decide whether the popper should either:
   *
   * - detach from the reference and remain "trapped" in the boundaries, or
   * - if it should ignore the boundary and "escape with its reference"
   *
   * When `escapeWithReference` is set to`true` and reference is completely
   * outside its boundaries, the popper will overflow (or completely leave)
   * the boundaries in order to remain attached to the edge of the reference.
   *
   * @memberof modifiers
   * @inner
   */
  preventOverflow: {
    /** @prop {number} order=300 - Index used to define the order of execution */
    order: 300,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: preventOverflow,
    /**
     * @prop {Array} [priority=['left','right','top','bottom']]
     * Popper will try to prevent overflow following these priorities by default,
     * then, it could overflow on the left and on top of the `boundariesElement`
     */
    priority: ['left', 'right', 'top', 'bottom'],
    /**
     * @prop {number} padding=5
     * Amount of pixel used to define a minimum distance between the boundaries
     * and the popper this makes sure the popper has always a little padding
     * between the edges of its container
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='scrollParent'
     * Boundaries used by the modifier, can be `scrollParent`, `window`,
     * `viewport` or any DOM element.
     */
    boundariesElement: 'scrollParent'
  },

  /**
   * Modifier used to make sure the reference and its popper stay near eachothers
   * without leaving any gap between the two. Expecially useful when the arrow is
   * enabled and you want to assure it to point to its reference element.
   * It cares only about the first axis, you can still have poppers with margin
   * between the popper and its reference element.
   * @memberof modifiers
   * @inner
   */
  keepTogether: {
    /** @prop {number} order=400 - Index used to define the order of execution */
    order: 400,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: keepTogether
  },

  /**
   * This modifier is used to move the `arrowElement` of the popper to make
   * sure it is positioned between the reference element and its popper element.
   * It will read the outer size of the `arrowElement` node to detect how many
   * pixels of conjuction are needed.
   *
   * It has no effect if no `arrowElement` is provided.
   * @memberof modifiers
   * @inner
   */
  arrow: {
    /** @prop {number} order=500 - Index used to define the order of execution */
    order: 500,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: arrow,
    /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
    element: '[x-arrow]'
  },

  /**
   * Modifier used to flip the popper's placement when it starts to overlap its
   * reference element.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   *
   * **NOTE:** this modifier will interrupt the current update cycle and will
   * restart it if it detects the need to flip the placement.
   * @memberof modifiers
   * @inner
   */
  flip: {
    /** @prop {number} order=600 - Index used to define the order of execution */
    order: 600,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: flip,
    /**
     * @prop {String|Array} behavior='flip'
     * The behavior used to change the popper's placement. It can be one of
     * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
     * placements (with optional variations).
     */
    behavior: 'flip',
    /**
     * @prop {number} padding=5
     * The popper will flip if it hits the edges of the `boundariesElement`
     */
    padding: 5,
    /**
     * @prop {String|HTMLElement} boundariesElement='viewport'
     * The element which will define the boundaries of the popper position,
     * the popper will never be placed outside of the defined boundaries
     * (except if keepTogether is enabled)
     */
    boundariesElement: 'viewport'
  },

  /**
   * Modifier used to make the popper flow toward the inner of the reference element.
   * By default, when this modifier is disabled, the popper will be placed outside
   * the reference element.
   * @memberof modifiers
   * @inner
   */
  inner: {
    /** @prop {number} order=700 - Index used to define the order of execution */
    order: 700,
    /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
    enabled: false,
    /** @prop {ModifierFn} */
    fn: inner
  },

  /**
   * Modifier used to hide the popper when its reference element is outside of the
   * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
   * be used to hide with a CSS selector the popper when its reference is
   * out of boundaries.
   *
   * Requires the `preventOverflow` modifier before it in order to work.
   * @memberof modifiers
   * @inner
   */
  hide: {
    /** @prop {number} order=800 - Index used to define the order of execution */
    order: 800,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: hide
  },

  /**
   * Computes the style that will be applied to the popper element to gets
   * properly positioned.
   *
   * Note that this modifier will not touch the DOM, it just prepares the styles
   * so that `applyStyle` modifier can apply it. This separation is useful
   * in case you need to replace `applyStyle` with a custom implementation.
   *
   * This modifier has `850` as `order` value to maintain backward compatibility
   * with previous versions of Popper.js. Expect the modifiers ordering method
   * to change in future major versions of the library.
   *
   * @memberof modifiers
   * @inner
   */
  computeStyle: {
    /** @prop {number} order=850 - Index used to define the order of execution */
    order: 850,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: computeStyle,
    /**
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: true,
    /**
     * @prop {string} [x='bottom']
     * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
     * Change this if your popper should grow in a direction different from `bottom`
     */
    x: 'bottom',
    /**
     * @prop {string} [x='left']
     * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
     * Change this if your popper should grow in a direction different from `right`
     */
    y: 'right'
  },

  /**
   * Applies the computed styles to the popper element.
   *
   * All the DOM manipulations are limited to this modifier. This is useful in case
   * you want to integrate Popper.js inside a framework or view library and you
   * want to delegate all the DOM manipulations to it.
   *
   * Note that if you disable this modifier, you must make sure the popper element
   * has its position set to `absolute` before Popper.js can do its work!
   *
   * Just disable this modifier and define you own to achieve the desired effect.
   *
   * @memberof modifiers
   * @inner
   */
  applyStyle: {
    /** @prop {number} order=900 - Index used to define the order of execution */
    order: 900,
    /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
    enabled: true,
    /** @prop {ModifierFn} */
    fn: applyStyle,
    /** @prop {Function} */
    onLoad: applyStyleOnLoad,
    /**
     * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
     * @prop {Boolean} gpuAcceleration=true
     * If true, it uses the CSS 3d transformation to position the popper.
     * Otherwise, it will use the `top` and `left` properties.
     */
    gpuAcceleration: undefined
  }
};

/**
 * The `dataObject` is an object containing all the informations used by Popper.js
 * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
 * @name dataObject
 * @property {Object} data.instance The Popper.js instance
 * @property {String} data.placement Placement applied to popper
 * @property {String} data.originalPlacement Placement originally defined on init
 * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
 * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
 * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
 * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow, it expects the JavaScript nomenclature (eg. `marginBottom`)
 * @property {Object} data.boundaries Offsets of the popper boundaries
 * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
 * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
 * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
 */

/**
 * Default options provided to Popper.js constructor.<br />
 * These can be overriden using the `options` argument of Popper.js.<br />
 * To override an option, simply pass as 3rd argument an object with the same
 * structure of this object, example:
 * ```
 * new Popper(ref, pop, {
 *   modifiers: {
 *     preventOverflow: { enabled: false }
 *   }
 * })
 * ```
 * @type {Object}
 * @static
 * @memberof Popper
 */
var Defaults = {
  /**
   * Popper's placement
   * @prop {Popper.placements} placement='bottom'
   */
  placement: 'bottom',

  /**
   * Whether events (resize, scroll) are initially enabled
   * @prop {Boolean} eventsEnabled=true
   */
  eventsEnabled: true,

  /**
   * Set to true if you want to automatically remove the popper when
   * you call the `destroy` method.
   * @prop {Boolean} removeOnDestroy=false
   */
  removeOnDestroy: false,

  /**
   * Callback called when the popper is created.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onCreate}
   */
  onCreate: function onCreate() {},

  /**
   * Callback called when the popper is updated, this callback is not called
   * on the initialization/creation of the popper, but only on subsequent
   * updates.<br />
   * By default, is set to no-op.<br />
   * Access Popper.js instance with `data.instance`.
   * @prop {onUpdate}
   */
  onUpdate: function onUpdate() {},

  /**
   * List of modifiers used to modify the offsets before they are applied to the popper.
   * They provide most of the functionalities of Popper.js
   * @prop {modifiers}
   */
  modifiers: modifiers
};

/**
 * @callback onCreate
 * @param {dataObject} data
 */

/**
 * @callback onUpdate
 * @param {dataObject} data
 */

// Utils
// Methods
var Popper = function () {
  /**
   * Create a new Popper.js instance
   * @class Popper
   * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper.
   * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
   * @return {Object} instance - The generated Popper.js instance
   */
  function Popper(reference, popper) {
    var _this = this;

    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    classCallCheck$1(this, Popper);

    this.scheduleUpdate = function () {
      return requestAnimationFrame(_this.update);
    };

    // make update() debounced, so that it only runs at most once-per-tick
    this.update = debounce(this.update.bind(this));

    // with {} we create a new object with the options inside it
    this.options = _extends$1({}, Popper.Defaults, options);

    // init state
    this.state = {
      isDestroyed: false,
      isCreated: false,
      scrollParents: []
    };

    // get reference and popper elements (allow jQuery wrappers)
    this.reference = reference.jquery ? reference[0] : reference;
    this.popper = popper.jquery ? popper[0] : popper;

    // Deep merge modifiers options
    this.options.modifiers = {};
    Object.keys(_extends$1({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
      _this.options.modifiers[name] = _extends$1({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
    });

    // Refactoring modifiers' list (Object => Array)
    this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
      return _extends$1({
        name: name
      }, _this.options.modifiers[name]);
    })
    // sort the modifiers by order
    .sort(function (a, b) {
      return a.order - b.order;
    });

    // modifiers have the ability to execute arbitrary code when Popper.js get inited
    // such code is executed in the same order of its modifier
    // they could add new properties to their options configuration
    // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
    this.modifiers.forEach(function (modifierOptions) {
      if (modifierOptions.enabled && isFunction$1(modifierOptions.onLoad)) {
        modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
      }
    });

    // fire the first update to position the popper in the right place
    this.update();

    var eventsEnabled = this.options.eventsEnabled;
    if (eventsEnabled) {
      // setup event listeners, they will take care of update the position in specific situations
      this.enableEventListeners();
    }

    this.state.eventsEnabled = eventsEnabled;
  }

  // We can't use class properties because they don't get listed in the
  // class prototype and break stuff like Sinon stubs


  createClass$1(Popper, [{
    key: 'update',
    value: function update$$1() {
      return update.call(this);
    }
  }, {
    key: 'destroy',
    value: function destroy$$1() {
      return destroy.call(this);
    }
  }, {
    key: 'enableEventListeners',
    value: function enableEventListeners$$1() {
      return enableEventListeners.call(this);
    }
  }, {
    key: 'disableEventListeners',
    value: function disableEventListeners$$1() {
      return disableEventListeners.call(this);
    }

    /**
     * Schedule an update, it will run on the next UI update available
     * @method scheduleUpdate
     * @memberof Popper
     */


    /**
     * Collection of utilities useful when writing custom modifiers.
     * Starting from version 1.7, this method is available only if you
     * include `popper-utils.js` before `popper.js`.
     *
     * **DEPRECATION**: This way to access PopperUtils is deprecated
     * and will be removed in v2! Use the PopperUtils module directly instead.
     * Due to the high instability of the methods contained in Utils, we can't
     * guarantee them to follow semver. Use them at your own risk!
     * @static
     * @private
     * @type {Object}
     * @deprecated since version 1.8
     * @member Utils
     * @memberof Popper
     */

  }]);
  return Popper;
}();

/**
 * The `referenceObject` is an object that provides an interface compatible with Popper.js
 * and lets you use it as replacement of a real DOM node.<br />
 * You can use this method to position a popper relatively to a set of coordinates
 * in case you don't have a DOM node to use as reference.
 *
 * ```
 * new Popper(referenceObject, popperNode);
 * ```
 *
 * NB: This feature isn't supported in Internet Explorer 10
 * @name referenceObject
 * @property {Function} data.getBoundingClientRect
 * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
 * @property {number} data.clientWidth
 * An ES6 getter that will return the width of the virtual reference element.
 * @property {number} data.clientHeight
 * An ES6 getter that will return the height of the virtual reference element.
 */


Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
Popper.placements = placements;
Popper.Defaults = Defaults;

/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.1.5
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
/**
 * Check if the given variable is a function
 * @method
 * @memberof Popper.Utils
 * @argument {Any} functionToCheck - variable to check
 * @returns {Boolean} answer to: is a function?
 */
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var DEFAULT_OPTIONS = {
  container: false,
  delay: 0,
  html: false,
  placement: 'top',
  title: '',
  template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
  trigger: 'hover focus',
  offset: 0
};

var Tooltip = function () {
  /**
   * Create a new Tooltip.js instance
   * @class Tooltip
   * @param {HTMLElement} reference - The DOM node used as reference of the tooltip (it can be a jQuery element).
   * @param {Object} options
   * @param {String} options.placement=bottom
   *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -end),
   *      left(-start, -end)`
   * @param {HTMLElement|String|false} options.container=false - Append the tooltip to a specific element.
   * @param {Number|Object} options.delay=0
   *      Delay showing and hiding the tooltip (ms) - does not apply to manual trigger type.
   *      If a number is supplied, delay is applied to both hide/show.
   *      Object structure is: `{ show: 500, hide: 100 }`
   * @param {Boolean} options.html=false - Insert HTML into the tooltip. If false, the content will inserted with `innerText`.
   * @param {String|PlacementFunction} options.placement='top' - One of the allowed placements, or a function returning one of them.
   * @param {String} [options.template='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>']
   *      Base HTML to used when creating the tooltip.
   *      The tooltip's `title` will be injected into the `.tooltip-inner` or `.tooltip__inner`.
   *      `.tooltip-arrow` or `.tooltip__arrow` will become the tooltip's arrow.
   *      The outermost wrapper element should have the `.tooltip` class.
   * @param {String|HTMLElement|TitleFunction} options.title='' - Default title value if `title` attribute isn't present.
   * @param {String} [options.trigger='hover focus']
   *      How tooltip is triggered - click, hover, focus, manual.
   *      You may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger.
   * @param {HTMLElement} options.boundariesElement
   *      The element used as boundaries for the tooltip. For more information refer to Popper.js'
   *      [boundariesElement docs](https://popper.js.org/popper-documentation.html)
   * @param {Number|String} options.offset=0 - Offset of the tooltip relative to its reference. For more information refer to Popper.js'
   *      [offset docs](https://popper.js.org/popper-documentation.html)
   * @param {Object} options.popperOptions={} - Popper options, will be passed directly to popper instance. For more information refer to Popper.js'
   *      [options docs](https://popper.js.org/popper-documentation.html)
   * @return {Object} instance - The generated tooltip instance
   */
  function Tooltip(reference, options) {
    classCallCheck(this, Tooltip);

    _initialiseProps.call(this);

    // apply user options over default ones
    options = _extends({}, DEFAULT_OPTIONS, options);

    reference.jquery && (reference = reference[0]);

    // cache reference and options
    this.reference = reference;
    this.options = options;

    // get events list
    var events = typeof options.trigger === 'string' ? options.trigger.split(' ').filter(function (trigger) {
      return ['click', 'hover', 'focus'].indexOf(trigger) !== -1;
    }) : [];

    // set initial state
    this._isOpen = false;

    // set event listeners
    this._setEventListeners(reference, events, options);
  }

  //
  // Public methods
  //

  /**
   * Reveals an element's tooltip. This is considered a "manual" triggering of the tooltip.
   * Tooltips with zero-length titles are never displayed.
   * @method Tooltip#show
   * @memberof Tooltip
   */


  /**
   * Hides an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   * @method Tooltip#hide
   * @memberof Tooltip
   */


  /**
   * Hides and destroys an element’s tooltip.
   * @method Tooltip#dispose
   * @memberof Tooltip
   */


  /**
   * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
   * @method Tooltip#toggle
   * @memberof Tooltip
   */


  //
  // Defaults
  //


  //
  // Private methods
  //

  createClass(Tooltip, [{
    key: '_create',


    /**
     * Creates a new tooltip node
     * @memberof Tooltip
     * @private
     * @param {HTMLElement} reference
     * @param {String} template
     * @param {String|HTMLElement|TitleFunction} title
     * @param {Boolean} allowHtml
     * @return {HTMLelement} tooltipNode
     */
    value: function _create(reference, template, title, allowHtml) {
      // create tooltip element
      var tooltipGenerator = window.document.createElement('div');
      tooltipGenerator.innerHTML = template.trim();
      var tooltipNode = tooltipGenerator.childNodes[0];

      // add unique ID to our tooltip (needed for accessibility reasons)
      tooltipNode.id = 'tooltip_' + Math.random().toString(36).substr(2, 10);

      // set initial `aria-hidden` state to `false` (it's visible!)
      tooltipNode.setAttribute('aria-hidden', 'false');

      // add title to tooltip
      var titleNode = tooltipGenerator.querySelector(this.innerSelector);
      if (title.nodeType === 1) {
        // if title is a node, append it only if allowHtml is true
        allowHtml && titleNode.appendChild(title);
      } else if (isFunction(title)) {
        // if title is a function, call it and set innerText or innerHtml depending by `allowHtml` value
        var titleText = title.call(reference);
        allowHtml ? titleNode.innerHTML = titleText : titleNode.innerText = titleText;
      } else {
        // if it's just a simple text, set innerText or innerHtml depending by `allowHtml` value
        allowHtml ? titleNode.innerHTML = title : titleNode.innerText = title;
      }

      // return the generated tooltip node
      return tooltipNode;
    }
  }, {
    key: '_show',
    value: function _show(reference, options) {
      // don't show if it's already visible
      if (this._isOpen) {
        return this;
      }
      this._isOpen = true;

      // if the tooltipNode already exists, just show it
      if (this._tooltipNode) {
        this._tooltipNode.style.display = '';
        this._tooltipNode.setAttribute('aria-hidden', 'false');
        this.popperInstance.update();
        return this;
      }

      // get title
      var title = reference.getAttribute('title') || options.title;

      // don't show tooltip if no title is defined
      if (!title) {
        return this;
      }

      // create tooltip node
      var tooltipNode = this._create(reference, options.template, title, options.html);

      // Add `aria-describedby` to our reference element for accessibility reasons
      reference.setAttribute('aria-describedby', tooltipNode.id);

      // append tooltip to container
      var container = this._findContainer(options.container, reference);

      this._append(tooltipNode, container);

      var popperOptions = _extends({}, options.popperOptions, {
        placement: options.placement
      });

      popperOptions.modifiers = _extends({}, popperOptions.modifiers, {
        arrow: {
          element: this.arrowSelector
        }
      });

      if (options.boundariesElement) {
        popperOptions.modifiers.preventOverflow = {
          boundariesElement: options.boundariesElement
        };
      }

      this.popperInstance = new Popper(reference, tooltipNode, popperOptions);

      this._tooltipNode = tooltipNode;

      return this;
    }
  }, {
    key: '_hide',
    value: function _hide() /*reference, options*/{
      // don't hide if it's already hidden
      if (!this._isOpen) {
        return this;
      }

      this._isOpen = false;

      // hide tooltipNode
      this._tooltipNode.style.display = 'none';
      this._tooltipNode.setAttribute('aria-hidden', 'true');

      return this;
    }
  }, {
    key: '_dispose',
    value: function _dispose() {
      var _this = this;

      if (this._tooltipNode) {
        this._hide();

        // destroy instance
        this.popperInstance.destroy();

        // remove event listeners
        this._events.forEach(function (_ref) {
          var func = _ref.func,
              event = _ref.event;

          _this.reference.removeEventListener(event, func);
        });
        this._events = [];

        // destroy tooltipNode
        this._tooltipNode.parentNode.removeChild(this._tooltipNode);
        this._tooltipNode = null;
      }
      return this;
    }
  }, {
    key: '_findContainer',
    value: function _findContainer(container, reference) {
      // if container is a query, get the relative element
      if (typeof container === 'string') {
        container = window.document.querySelector(container);
      } else if (container === false) {
        // if container is `false`, set it to reference parent
        container = reference.parentNode;
      }
      return container;
    }

    /**
     * Append tooltip to container
     * @memberof Tooltip
     * @private
     * @param {HTMLElement} tooltip
     * @param {HTMLElement|String|false} container
     */

  }, {
    key: '_append',
    value: function _append(tooltipNode, container) {
      container.appendChild(tooltipNode);
    }
  }, {
    key: '_setEventListeners',
    value: function _setEventListeners(reference, events, options) {
      var _this2 = this;

      var directEvents = [];
      var oppositeEvents = [];

      events.forEach(function (event) {
        switch (event) {
          case 'hover':
            directEvents.push('mouseenter');
            oppositeEvents.push('mouseleave');
            break;
          case 'focus':
            directEvents.push('focus');
            oppositeEvents.push('blur');
            break;
          case 'click':
            directEvents.push('click');
            oppositeEvents.push('click');
            break;
        }
      });

      // schedule show tooltip
      directEvents.forEach(function (event) {
        var func = function func(evt) {
          if (_this2._isOpen === true) {
            return;
          }
          evt.usedByTooltip = true;
          _this2._scheduleShow(reference, options.delay, options, evt);
        };
        _this2._events.push({ event: event, func: func });
        reference.addEventListener(event, func);
      });

      // schedule hide tooltip
      oppositeEvents.forEach(function (event) {
        var func = function func(evt) {
          if (evt.usedByTooltip === true) {
            return;
          }
          _this2._scheduleHide(reference, options.delay, options, evt);
        };
        _this2._events.push({ event: event, func: func });
        reference.addEventListener(event, func);
      });
    }
  }, {
    key: '_scheduleShow',
    value: function _scheduleShow(reference, delay, options /*, evt */) {
      var _this3 = this;

      // defaults to 0
      var computedDelay = delay && delay.show || delay || 0;
      window.setTimeout(function () {
        return _this3._show(reference, options);
      }, computedDelay);
    }
  }, {
    key: '_scheduleHide',
    value: function _scheduleHide(reference, delay, options, evt) {
      var _this4 = this;

      // defaults to 0
      var computedDelay = delay && delay.hide || delay || 0;
      window.setTimeout(function () {
        if (_this4._isOpen === false) {
          return;
        }
        if (!document.body.contains(_this4._tooltipNode)) {
          return;
        }

        // if we are hiding because of a mouseleave, we must check that the new
        // reference isn't the tooltip, because in this case we don't want to hide it
        if (evt.type === 'mouseleave') {
          var isSet = _this4._setTooltipNodeEvent(evt, reference, delay, options);

          // if we set the new event, don't hide the tooltip yet
          // the new event will take care to hide it if necessary
          if (isSet) {
            return;
          }
        }

        _this4._hide(reference, options);
      }, computedDelay);
    }
  }]);
  return Tooltip;
}();

/**
 * Placement function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback PlacementFunction
 * @param {HTMLElement} tooltip - tooltip DOM node.
 * @param {HTMLElement} reference - reference DOM node.
 * @return {String} placement - One of the allowed placement options.
 */

/**
 * Title function, its context is the Tooltip instance.
 * @memberof Tooltip
 * @callback TitleFunction
 * @return {String} placement - The desired title.
 */


var _initialiseProps = function _initialiseProps() {
  var _this5 = this;

  this.show = function () {
    return _this5._show(_this5.reference, _this5.options);
  };

  this.hide = function () {
    return _this5._hide();
  };

  this.dispose = function () {
    return _this5._dispose();
  };

  this.toggle = function () {
    if (_this5._isOpen) {
      return _this5.hide();
    } else {
      return _this5.show();
    }
  };

  this.arrowSelector = '.tooltip-arrow, .tooltip__arrow';
  this.innerSelector = '.tooltip-inner, .tooltip__inner';
  this._events = [];

  this._setTooltipNodeEvent = function (evt, reference, delay, options) {
    var relatedreference = evt.relatedreference || evt.toElement;

    var callback = function callback(evt2) {
      var relatedreference2 = evt2.relatedreference || evt2.toElement;

      // Remove event listener after call
      _this5._tooltipNode.removeEventListener(evt.type, callback);

      // If the new reference is not the reference element
      if (!reference.contains(relatedreference2)) {
        // Schedule to hide tooltip
        _this5._scheduleHide(reference, options.delay, options, evt2);
      }
    };

    if (_this5._tooltipNode.contains(relatedreference)) {
      // listen to mouseleave on the tooltip element to be able to hide the tooltip
      _this5._tooltipNode.addEventListener(evt.type, callback);
      return true;
    }

    return false;
  };
};

function convertToArray(value) {
  if (typeof value === 'string') {
    value = value.split(' ');
  }
  return value;
}

/**
 * Add classes to an element.
 * This method checks to ensure that the classes don't already exist before adding them.
 * It uses el.className rather than classList in order to be IE friendly.
 * @param {object} el - The element to add the classes to.
 * @param {classes} string - List of space separated classes to be added to the element.
 */
function addClasses(el, classes) {
  var newClasses = convertToArray(classes);
  var classList = convertToArray(el.className);
  newClasses.forEach(function (newClass) {
    if (classList.indexOf(newClass) === -1) {
      classList.push(newClass);
    }
  });
  el.className = classList.join(' ');
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck$2 = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass$2 = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends$2 = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var state = {
	enabled: true
};

var positions = ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'];

var defaultOptions = {
	// Default tooltip placement relative to target element
	defaultPlacement: 'top',
	// Default CSS classes applied to the tooltip element
	defaultClass: 'vue-tooltip-theme',
	// Default HTML template of the tooltip element
	// It must include `tooltip` & `tooltip-inner` CSS classes
	defaultTemplate: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
	// Delay (ms)
	defaultDelay: 0,
	// Default events that trigger the tooltip
	defaultTrigger: 'hover focus',
	// Default position offset (px)
	defaultOffset: 0,
	// Default container where the tooltip will be appended
	defaultContainer: 'body',
	defaultBoundariesElement: undefined,
	defaultPopperOptions: {},
	autoHide: true,
	// Auto destroy tooltip DOM nodes (ms)
	disposeTimeout: 5000
};

function getOptions(options) {
	var result = {
		placement: options.placement || directive.options.defaultPlacement,
		delay: options.delay || directive.options.defaultDelay,
		template: options.template || directive.options.defaultTemplate,
		trigger: options.trigger || directive.options.defaultTrigger,
		offset: options.offset || directive.options.defaultOffset,
		container: options.container || directive.options.defaultContainer,
		boundariesElement: options.boundariesElement || directive.options.defaultBoundariesElement,
		popperOptions: _extends$2({}, options.popperOptions || directive.options.defaultPopperOptions)
	};

	if (options.offset) {
		var typeofOffset = _typeof(options.offset);
		var offset = options.offset;

		// One value -> switch
		if (typeofOffset === 'number' || typeofOffset === 'string' && offset.indexOf(',') === -1) {
			offset = '0, ' + offset;
		}

		if (!result.popperOptions.modifiers) {
			result.popperOptions.modifiers = {};
		}
		result.popperOptions.modifiers.offset = {
			offset: offset
		};
	}

	return result;
}

function getPlacement(value, modifiers) {
	var placement = value.placement;
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = positions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var pos = _step.value;

			if (modifiers[pos]) {
				placement = pos;
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

	return placement;
}

var SuperTooltip = function (_Tooltip) {
	inherits(SuperTooltip, _Tooltip);

	function SuperTooltip() {
		classCallCheck$2(this, SuperTooltip);
		return possibleConstructorReturn(this, (SuperTooltip.__proto__ || Object.getPrototypeOf(SuperTooltip)).apply(this, arguments));
	}

	createClass$2(SuperTooltip, [{
		key: 'setClasses',
		value: function setClasses(classes) {
			this._classes = classes;
		}
	}, {
		key: 'setContent',
		value: function setContent(content) {
			this.options.title = content;
			if (this._tooltipNode) {
				var el = this._tooltipNode.querySelector(this.innerSelector);

				if (el) {
					if (!content) {
						el.innerHTML = '';
					} else {
						el.innerHTML = content;
					}

					this.popperInstance.update();
				}
			}
		}
	}, {
		key: 'setOptions',
		value: function setOptions(options) {
			var classesUpdated = false;
			var classes = options && options.classes || directive.options.defaultClass;
			if (this._classes !== classes) {
				this.setClasses(classes);
				classesUpdated = true;
			}

			options = getOptions(options);

			var needPopperUpdate = false;
			var needRestart = false;

			if (this.options.offset !== options.offset || this.options.placement !== options.placement) {
				needPopperUpdate = true;
			}

			if (this.options.template !== options.template || this.options.trigger !== options.trigger || this.options.container !== options.container || classesUpdated) {
				needRestart = true;
			}

			for (var key in options) {
				this.options[key] = options[key];
			}

			if (this._tooltipNode) {
				if (needRestart) {
					var isOpen = this._isOpen;

					this.dispose();

					var events = typeof this.options.trigger === 'string' ? options.trigger.split(' ').filter(function (trigger) {
						return ['click', 'hover', 'focus'].indexOf(trigger) !== -1;
					}) : [];
					this._setEventListeners(this.reference, events, this.options);

					if (isOpen) {
						this.show();
					}
				} else if (needPopperUpdate) {
					this.popperInstance.update();
				}
			}
		}
	}, {
		key: '_create',
		value: function _create() {
			var _babelHelpers$get;

			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			var result = (_babelHelpers$get = get(SuperTooltip.prototype.__proto__ || Object.getPrototypeOf(SuperTooltip.prototype), '_create', this)).call.apply(_babelHelpers$get, [this].concat(args));

			if (defaultOptions.autoHide && this.options.trigger.indexOf('hover') !== -1) {
				result.addEventListener('mouseenter', this.hide);
				result.addEventListener('click', this.hide);
			}

			return result;
		}
	}, {
		key: '_dispose',
		value: function _dispose() {
			var _this2 = this;

			if (this._tooltipNode) {
				this._tooltipNode.removeEventListener('mouseenter', this.hide);
				this._tooltipNode.removeEventListener('click', this.hide);
			}

			this._events.forEach(function (_ref) {
				var func = _ref.func,
				    event = _ref.event;

				_this2.reference.removeEventListener(event, func);
			});
			this._events = [];
			return get(SuperTooltip.prototype.__proto__ || Object.getPrototypeOf(SuperTooltip.prototype), '_dispose', this).call(this);
		}
	}, {
		key: '_show',
		value: function _show(reference, options) {
			var _babelHelpers$get2,
			    _this3 = this;

			if (options && typeof options.container === 'string') {
				var container = document.querySelector(options.container);
				if (!container) return;
			}

			options = Object.assign({}, options);
			delete options.offset;

			var updateClasses = true;
			if (this._tooltipNode) {
				addClasses(this._tooltipNode, this._classes);
				updateClasses = false;
			}

			for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
				args[_key2 - 2] = arguments[_key2];
			}

			var result = (_babelHelpers$get2 = get(SuperTooltip.prototype.__proto__ || Object.getPrototypeOf(SuperTooltip.prototype), '_show', this)).call.apply(_babelHelpers$get2, [this, reference, options].concat(args));

			if (updateClasses && this._tooltipNode) {
				addClasses(this._tooltipNode, this._classes);
			}

			// Fix position
			setTimeout(function () {
				if (_this3.popperInstance) {
					_this3.popperInstance.update();
				}
			}, 0);

			clearTimeout(this._disposeTimer);

			return result;
		}
	}, {
		key: '_hide',
		value: function _hide() {
			var _babelHelpers$get3,
			    _this4 = this;

			for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
				args[_key3] = arguments[_key3];
			}

			var result = (_babelHelpers$get3 = get(SuperTooltip.prototype.__proto__ || Object.getPrototypeOf(SuperTooltip.prototype), '_hide', this)).call.apply(_babelHelpers$get3, [this].concat(args));

			clearTimeout(this._disposeTimer);
			this._disposeTimer = setTimeout(function () {
				if (_this4._tooltipNode) {
					_this4._tooltipNode.removeEventListener('mouseenter', _this4.hide);
					_this4._tooltipNode.removeEventListener('click', _this4.hide);
					_this4._tooltipNode.parentNode.removeChild(_this4._tooltipNode);
					_this4._tooltipNode = null;
				}
			}, directive.options.disposeTimeout || defaultOptions.disposeTimeout);

			return result;
		}
	}]);
	return SuperTooltip;
}(Tooltip);

function getContent(value) {
	var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	if (type === 'string') {
		return value;
	} else if (value && type === 'object') {
		return value.content;
	} else {
		return false;
	}
}

function createTooltip(el, value, modifiers) {
	var content = getContent(value);
	var classes = value.classes || directive.options.defaultClass;
	var opts = _extends$2({
		title: content,
		html: true
	}, getOptions(_extends$2({}, value, {
		placement: getPlacement(value, modifiers)
	})));
	var tooltip = el._tooltip = new SuperTooltip(el, opts);
	tooltip.setClasses(classes);
	tooltip._vueEl = el;
}

function destroyTooltip(el) {
	if (el._tooltip) {
		el._tooltip.dispose();
		delete el._tooltip;
	}
}

var directive = {
	options: defaultOptions,
	bind: function bind(el, _ref2) {
		var value = _ref2.value,
		    modifiers = _ref2.modifiers;

		var content = getContent(value);
		destroyTooltip(el);
		if (content && state.enabled) {
			createTooltip(el, value, modifiers);
		}
	},
	update: function update(el, _ref3) {
		var value = _ref3.value,
		    oldValue = _ref3.oldValue,
		    modifiers = _ref3.modifiers;

		var content = getContent(value);
		if (!content || !state.enabled) {
			destroyTooltip(el);
		} else if (el._tooltip) {
			var tooltip = el._tooltip;
			// Content
			tooltip.setContent(content);
			// Options
			tooltip.setOptions(_extends$2({}, value, {
				placement: getPlacement(value, modifiers)
			}));
		} else {
			createTooltip(el, value, modifiers);
		}
	},
	unbind: function unbind(el) {
		destroyTooltip(el);
	}
};

function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  options = Object.assign({}, defaultOptions, options || {});
  directive.options = options;
  Vue.directive('tooltip', directive);
}

var VTooltip = directive;

var plugin = {
  install: install,

  get enabled() {
    return state.enabled;
  },

  set enabled(value) {
    state.enabled = value;
  }
};

// Auto-install
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}


/* unused harmony default export */ var _unused_webpack_default_export = (plugin);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(40)))

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = flattenErrors;
/* harmony export (immutable) */ __webpack_exports__["a"] = checklist;
/* harmony export (immutable) */ __webpack_exports__["d"] = section;
/* harmony export (immutable) */ __webpack_exports__["c"] = item;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__questionnaire_validate_js__ = __webpack_require__(6);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



function flattenErrors(errors) {
	var flatErrors = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = errors.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var error = _step.value;

			if (typeof error === 'string') {
				flatErrors.push(error);
			} else if (error instanceof Map) {
				flatErrors.push.apply(flatErrors, _toConsumableArray(flattenErrors(error)));
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

	return flatErrors;
}

function checklist(checklist) {
	var valid = true;
	var errors = new Map();

	if ('pages' in checklist && checklist.pages.length > 0) {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = checklist.pages.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var _ref = _step2.value;

				var _ref2 = _slicedToArray(_ref, 2);

				var index = _ref2[0];
				var page = _ref2[1];

				var pageValidation = section(page);
				if (!pageValidation.valid) {
					valid = false;
					errors.set(index, pageValidation.errors);
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

function section(thisSection) {
	var valid = true;
	var errors = new Map();

	if ('items' in thisSection && thisSection.items.length > 0) {
		var _iteratorNormalCompletion3 = true;
		var _didIteratorError3 = false;
		var _iteratorError3 = undefined;

		try {
			for (var _iterator3 = thisSection.items.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
				var _ref3 = _step3.value;

				var _ref4 = _slicedToArray(_ref3, 2);

				var index = _ref4[0];
				var sectionItem = _ref4[1];

				var itemValidation = void 0;
				switch (sectionItem.type) {
					case 'section':
						itemValidation = section(sectionItem);
						if (!itemValidation.valid) {
							valid = false;
							errors.set(index, itemValidation.errors);
						}
						break;
					case 'item':
						itemValidation = item(sectionItem);
						if (!itemValidation.valid) {
							valid = false;
							errors.set(index, itemValidation.errors);
						}
						break;
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

	return {
		valid: valid,
		errors: errors
	};
}

function item(item) {
	var valid = true;
	var errors = new Map();

	if (item.checked && 'questions' in item && item.questions.length > 0) {
		var _iteratorNormalCompletion4 = true;
		var _didIteratorError4 = false;
		var _iteratorError4 = undefined;

		try {
			for (var _iterator4 = item.questions.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
				var _ref5 = _step4.value;

				var _ref6 = _slicedToArray(_ref5, 2);

				var index = _ref6[0];
				var itemQuestion = _ref6[1];

				var questionValidation = __WEBPACK_IMPORTED_MODULE_0__questionnaire_validate_js__["k" /* question */](itemQuestion);
				if (!questionValidation.valid) {
					valid = false;
					errors.set(index, questionValidation.errors);
				}
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

	return {
		valid: valid,
		errors: errors
	};
}

/***/ }),
/* 170 */,
/* 171 */,
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/commonmark/lib/index.js
var lib = __webpack_require__(281);
var lib_default = /*#__PURE__*/__webpack_require__.n(lib);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Instruction.vue
//
//
//
//



var reader = new lib["Parser"]();
var writer = new lib["HtmlRenderer"]();

/* harmony default export */ var Instruction = ({
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-16c471bd","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Instruction.vue
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
/* harmony default export */ var Questionnaire_Instruction = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-16c471bd", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Instruction.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(279)
  __webpack_require__(280)
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
  Instruction,
  Questionnaire_Instruction,
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

/* harmony default export */ var vue_components_Questionnaire_Instruction = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

var encode = __webpack_require__(283),
    decode = __webpack_require__(284);

exports.decode = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTML)(data);
};

exports.decodeStrict = function(data, level){
	return (!level || level <= 0 ? decode.XML : decode.HTMLStrict)(data);
};

exports.encode = function(data, level){
	return (!level || level <= 0 ? encode.XML : encode.HTML)(data);
};

exports.encodeXML = encode.XML;

exports.encodeHTML4 =
exports.encodeHTML5 =
exports.encodeHTML  = encode.HTML;

exports.decodeXML =
exports.decodeXMLStrict = decode.XML;

exports.decodeHTML4 =
exports.decodeHTML5 =
exports.decodeHTML = decode.HTML;

exports.decodeHTML4Strict =
exports.decodeHTML5Strict =
exports.decodeHTMLStrict = decode.HTMLStrict;

exports.escape = encode.escape;


/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = {"amp":"&","apos":"'","gt":">","lt":"<","quot":"\""}

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Renderer() {}

/**
 *  Walks the AST and calls member methods for each Node type.
 *
 *  @param ast {Node} The root of the abstract syntax tree.
 */
function render(ast) {
  var walker = ast.walker()
    , event
    , type;

  this.buffer = '';
  this.lastOut = '\n';

  while((event = walker.next())) {
    type = event.node.type;
    if (this[type]) {
      this[type](event.node, event.entering);
    }
  }
  return this.buffer;
}

/**
 *  Concatenate a literal string to the buffer.
 *
 *  @param str {String} The string to concatenate.
 */
function lit(str) {
  this.buffer += str;
  this.lastOut = str;
}

/**
 *  Output a newline to the buffer.
 */
function cr() {
  if (this.lastOut !== '\n') {
    this.lit('\n');
  }
}

/**
 *  Concatenate a string to the buffer possibly escaping the content.
 *
 *  Concrete renderer implementations should override this method.
 *
 *  @param str {String} The string to concatenate.
 */
function out(str) {
  this.lit(str);
}

/**
 *  Escape a string for the target renderer.
 *
 *  Abstract function that should be implemented by concrete 
 *  renderer implementations.
 *
 *  @param str {String} The string to escape.
 */
function esc(str) {
  return str;
}

Renderer.prototype.render = render;
Renderer.prototype.out = out;
Renderer.prototype.lit = lit;
Renderer.prototype.cr  = cr;
Renderer.prototype.esc  = esc;

module.exports = Renderer;


/***/ }),
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getHeaderHeight;
function getHeaderHeight() {
	var navbar = document.querySelector('#main-navbar');

	if (!navbar) return null;

	return navbar.clientHeight;
}

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./resources/assets/js/vue-components/ShowHideButton.vue + 2 modules
var ShowHideButton = __webpack_require__(8);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/ValidatedFormGroup.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ValidatedFormGroup = ({
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
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-500d5102","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/ValidatedFormGroup.vue
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
/* harmony default export */ var vue_components_ValidatedFormGroup = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-500d5102", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/ValidatedFormGroup.vue
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
  ValidatedFormGroup,
  vue_components_ValidatedFormGroup,
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

/* harmony default export */ var js_vue_components_ValidatedFormGroup = (Component.exports);

// EXTERNAL MODULE: ./node_modules/snarkdown/dist/snarkdown.es.js
var snarkdown_es = __webpack_require__(23);

// EXTERNAL MODULE: ./resources/assets/js/modules/questionnaire/validate.js
var validate = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Text.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var Text = ({
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
		},
		helpClass: {
			type: String,
			required: false
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
			if (this.description) return Object(snarkdown_es["a" /* default */])(this.description);
		},
		validation: function validation() {
			return Object(validate["r" /* textQuestion */])(this);
		}
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', { value: event.target.value });
		}
	},

	components: {
		ShowHideButton: ShowHideButton["a" /* default */],
		ValidatedFormGroup: js_vue_components_ValidatedFormGroup
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3340e545","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Text.vue
var Text_render = function() {
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
        "invalid-class": _vm.helpClass,
        prop: "value"
      }
    },
    [
      _c(
        "label",
        {
          staticClass: "containing-label control-label",
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
                  _vm.$set(_vm.show, "description", $$v)
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
var Text_staticRenderFns = []
Text_render._withStripped = true
var Text_esExports = { render: Text_render, staticRenderFns: Text_staticRenderFns }
/* harmony default export */ var Question_Text = (Text_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3340e545", Text_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Text.vue
var Text_disposed = false
var Text_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Text___vue_template_functional__ = false
/* styles */
var Text___vue_styles__ = null
/* scopeId */
var Text___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Text___vue_module_identifier__ = null
var Text_Component = Text_normalizeComponent(
  Text,
  Question_Text,
  Text___vue_template_functional__,
  Text___vue_styles__,
  Text___vue_scopeId__,
  Text___vue_module_identifier__
)
Text_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Text.vue"
if (Text_Component.esModule && Object.keys(Text_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3340e545", Text_Component.options)
  } else {
    hotAPI.reload("data-v-3340e545", Text_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Text_disposed = true
  })
})()}

/* harmony default export */ var Questionnaire_Question_Text = (Text_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Number.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var Question_Number = ({
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
		},
		helpClass: {
			type: String,
			required: false
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
			if (this.description) return Object(snarkdown_es["a" /* default */])(this.description);
		},
		validation: function validation() {
			return Object(validate["h" /* numberQuestion */])(this);
		}
	},

	methods: {
		onInput: function onInput(event) {
			// FIXME: Firefox sends a 0 for non-numbers for some reason
			this.$emit('input', { value: Number(event.target.value) });
		}
	},

	components: {
		ShowHideButton: ShowHideButton["a" /* default */],
		ValidatedFormGroup: js_vue_components_ValidatedFormGroup
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1fd00d61","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Number.vue
var Number_render = function() {
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
        "invalid-class": _vm.helpClass,
        prop: "value"
      }
    },
    [
      _c(
        "label",
        {
          staticClass: "containing-label control-label",
          attrs: { title: _vm.description }
        },
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
                  _vm.$set(_vm.show, "description", $$v)
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
var Number_staticRenderFns = []
Number_render._withStripped = true
var Number_esExports = { render: Number_render, staticRenderFns: Number_staticRenderFns }
/* harmony default export */ var Questionnaire_Question_Number = (Number_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1fd00d61", Number_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Number.vue
var Number_disposed = false
var Number_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Number___vue_template_functional__ = false
/* styles */
var Number___vue_styles__ = null
/* scopeId */
var Number___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Number___vue_module_identifier__ = null
var Number_Component = Number_normalizeComponent(
  Question_Number,
  Questionnaire_Question_Number,
  Number___vue_template_functional__,
  Number___vue_styles__,
  Number___vue_scopeId__,
  Number___vue_module_identifier__
)
Number_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Number.vue"
if (Number_Component.esModule && Object.keys(Number_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1fd00d61", Number_Component.options)
  } else {
    hotAPI.reload("data-v-1fd00d61", Number_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Number_disposed = true
  })
})()}

/* harmony default export */ var vue_components_Questionnaire_Question_Number = (Number_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Select.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var Select = ({
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
		},
		helpClass: {
			type: String,
			required: false
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
			if (this.description) return Object(snarkdown_es["a" /* default */])(this.description);
		},
		validation: function validation() {
			return Object(validate["o" /* selectQuestion */])(this);
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
		ShowHideButton: ShowHideButton["a" /* default */],
		ValidatedFormGroup: js_vue_components_ValidatedFormGroup
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-570754d8","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Select.vue
var Select_render = function() {
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
        "invalid-class": _vm.helpClass,
        prop: "options"
      }
    },
    [
      _c(
        "label",
        {
          staticClass: "containing-label control-label",
          attrs: { title: _vm.description }
        },
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
                  _vm.$set(_vm.show, "description", $$v)
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
var Select_staticRenderFns = []
Select_render._withStripped = true
var Select_esExports = { render: Select_render, staticRenderFns: Select_staticRenderFns }
/* harmony default export */ var Question_Select = (Select_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-570754d8", Select_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Select.vue
var Select_disposed = false
var Select_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Select___vue_template_functional__ = false
/* styles */
var Select___vue_styles__ = null
/* scopeId */
var Select___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Select___vue_module_identifier__ = null
var Select_Component = Select_normalizeComponent(
  Select,
  Question_Select,
  Select___vue_template_functional__,
  Select___vue_styles__,
  Select___vue_scopeId__,
  Select___vue_module_identifier__
)
Select_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Select.vue"
if (Select_Component.esModule && Object.keys(Select_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-570754d8", Select_Component.options)
  } else {
    hotAPI.reload("data-v-570754d8", Select_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Select_disposed = true
  })
})()}

/* harmony default export */ var Questionnaire_Question_Select = (Select_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var Checkbox = ({
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
		},
		helpClass: {
			type: String,
			required: false
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
			if (this.description) return Object(snarkdown_es["a" /* default */])(this.description);
		},
		validation: function validation() {
			return Object(validate["b" /* checkboxQuestion */])(this);
		}
	},

	methods: {
		snarkdown: snarkdown_es["a" /* default */],
		handleCheck: function handleCheck(index) {
			if (this.readonly) return;

			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], {
				checked: !options[index].checked
			});

			this.$emit('input', { options: options });
		},
		handleEditableOptionInput: function handleEditableOptionInput(index, value) {
			if (this.readonly) return;

			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], { text: value, value: value });

			this.$emit('input', { options: options });
		}
	},

	components: {
		ShowHideButton: ShowHideButton["a" /* default */],
		ValidatedFormGroup: js_vue_components_ValidatedFormGroup
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-098680db","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue
var Checkbox_render = function() {
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
        "invalid-class": _vm.helpClass,
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
              {
                staticClass: "control-label",
                attrs: { title: option.description }
              },
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
                      staticClass: "form-control editable-option-text",
                      attrs: {
                        type: "text",
                        readonly: _vm.readonly,
                        placeholder: "Other"
                      },
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
                  _vm.$set(_vm.show, "description", $$v)
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
var Checkbox_staticRenderFns = []
Checkbox_render._withStripped = true
var Checkbox_esExports = { render: Checkbox_render, staticRenderFns: Checkbox_staticRenderFns }
/* harmony default export */ var Question_Checkbox = (Checkbox_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-098680db", Checkbox_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue
var Checkbox_disposed = false
function injectStyle (ssrContext) {
  if (Checkbox_disposed) return
  __webpack_require__(272)
}
var Checkbox_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Checkbox___vue_template_functional__ = false
/* styles */
var Checkbox___vue_styles__ = injectStyle
/* scopeId */
var Checkbox___vue_scopeId__ = "data-v-098680db"
/* moduleIdentifier (server only) */
var Checkbox___vue_module_identifier__ = null
var Checkbox_Component = Checkbox_normalizeComponent(
  Checkbox,
  Question_Checkbox,
  Checkbox___vue_template_functional__,
  Checkbox___vue_styles__,
  Checkbox___vue_scopeId__,
  Checkbox___vue_module_identifier__
)
Checkbox_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue"
if (Checkbox_Component.esModule && Object.keys(Checkbox_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-098680db", Checkbox_Component.options)
  } else {
    hotAPI.reload("data-v-098680db", Checkbox_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Checkbox_disposed = true
  })
})()}

/* harmony default export */ var Questionnaire_Question_Checkbox = (Checkbox_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/modules/questionnaire/reset.js
var questionnaire_reset = __webpack_require__(183);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Radio.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ var Radio = ({
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
		},
		helpClass: {
			type: String,
			required: false
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
			if (this.description) return Object(snarkdown_es["a" /* default */])(this.description);
		},
		validation: function validation() {
			return Object(validate["m" /* radioQuestion */])(this);
		}
	},

	methods: {
		snarkdown: snarkdown_es["a" /* default */],
		handleCheck: function handleCheck(index) {
			if (this.readonly) return;

			var options = this.options.map(function (option, i) {
				var newOption = Object.assign({}, option);

				newOption.checked = i === index;

				return newOption;
			});

			this.$emit('input', { options: options });
		},
		resetValue: function resetValue() {
			if (this.readonly) return;

			this.$emit('input', Object(questionnaire_reset["a" /* resetQuestion */])({
				type: 'radio',
				options: this.options
			}));
		},
		handleEditableOptionInput: function handleEditableOptionInput(index, value) {
			if (this.readonly) return;

			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], { text: value, value: value });

			this.$emit('input', { options: options });
		}
	},

	components: {
		ShowHideButton: ShowHideButton["a" /* default */],
		ValidatedFormGroup: js_vue_components_ValidatedFormGroup
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3b7f8513","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Radio.vue
var Radio_render = function() {
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
        "invalid-class": _vm.helpClass,
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
              {
                staticClass: "control-label",
                attrs: { title: option.description }
              },
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
                      attrs: {
                        type: "text",
                        readonly: _vm.readonly,
                        placeholder: "Other"
                      },
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
                  _vm.$set(_vm.show, "description", $$v)
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
var Radio_staticRenderFns = []
Radio_render._withStripped = true
var Radio_esExports = { render: Radio_render, staticRenderFns: Radio_staticRenderFns }
/* harmony default export */ var Question_Radio = (Radio_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3b7f8513", Radio_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Radio.vue
var Radio_disposed = false
function Radio_injectStyle (ssrContext) {
  if (Radio_disposed) return
  __webpack_require__(273)
}
var Radio_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Radio___vue_template_functional__ = false
/* styles */
var Radio___vue_styles__ = Radio_injectStyle
/* scopeId */
var Radio___vue_scopeId__ = "data-v-3b7f8513"
/* moduleIdentifier (server only) */
var Radio___vue_module_identifier__ = null
var Radio_Component = Radio_normalizeComponent(
  Radio,
  Question_Radio,
  Radio___vue_template_functional__,
  Radio___vue_styles__,
  Radio___vue_scopeId__,
  Radio___vue_module_identifier__
)
Radio_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Radio.vue"
if (Radio_Component.esModule && Object.keys(Radio_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b7f8513", Radio_Component.options)
  } else {
    hotAPI.reload("data-v-3b7f8513", Radio_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Radio_disposed = true
  })
})()}

/* harmony default export */ var Questionnaire_Question_Radio = (Radio_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/ConfirmationButton.vue + 2 modules
var ConfirmationButton = __webpack_require__(20);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/Item.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var Item = ({
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
		},
		helpClass: {
			type: String,
			required: false
		}
	},

	components: {
		ConfirmationButton: ConfirmationButton["a" /* default */],
		ValidatedFormGroup: js_vue_components_ValidatedFormGroup
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1548f2c8","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/Item.vue
var Item_render = function() {
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
var Item_staticRenderFns = []
Item_render._withStripped = true
var Item_esExports = { render: Item_render, staticRenderFns: Item_staticRenderFns }
/* harmony default export */ var List_Item = (Item_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1548f2c8", Item_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/Item.vue
var Item_disposed = false
function Item_injectStyle (ssrContext) {
  if (Item_disposed) return
  __webpack_require__(275)
  __webpack_require__(276)
}
var Item_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Item___vue_template_functional__ = false
/* styles */
var Item___vue_styles__ = Item_injectStyle
/* scopeId */
var Item___vue_scopeId__ = "data-v-1548f2c8"
/* moduleIdentifier (server only) */
var Item___vue_module_identifier__ = null
var Item_Component = Item_normalizeComponent(
  Item,
  List_Item,
  Item___vue_template_functional__,
  Item___vue_styles__,
  Item___vue_scopeId__,
  Item___vue_module_identifier__
)
Item_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/Item.vue"
if (Item_Component.esModule && Object.keys(Item_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1548f2c8", Item_Component.options)
  } else {
    hotAPI.reload("data-v-1548f2c8", Item_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Item_disposed = true
  })
})()}

/* harmony default export */ var Question_List_Item = (Item_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/TextItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var TextItem = ({
	extends: Question_List_Item,
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
			return Object(validate["q" /* textListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-737a1269","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/TextItem.vue
var TextItem_render = function() {
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
        {
          attrs: {
            prop: "text",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var TextItem_staticRenderFns = []
TextItem_render._withStripped = true
var TextItem_esExports = { render: TextItem_render, staticRenderFns: TextItem_staticRenderFns }
/* harmony default export */ var List_TextItem = (TextItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-737a1269", TextItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/TextItem.vue
var TextItem_disposed = false
var TextItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var TextItem___vue_template_functional__ = false
/* styles */
var TextItem___vue_styles__ = null
/* scopeId */
var TextItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var TextItem___vue_module_identifier__ = null
var TextItem_Component = TextItem_normalizeComponent(
  TextItem,
  List_TextItem,
  TextItem___vue_template_functional__,
  TextItem___vue_styles__,
  TextItem___vue_scopeId__,
  TextItem___vue_module_identifier__
)
TextItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/TextItem.vue"
if (TextItem_Component.esModule && Object.keys(TextItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-737a1269", TextItem_Component.options)
  } else {
    hotAPI.reload("data-v-737a1269", TextItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    TextItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_TextItem = (TextItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/PublicationItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var PublicationItem = ({
	extends: Question_List_Item,
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
			return Object(validate["j" /* publicationListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-9ce3a934","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/PublicationItem.vue
var PublicationItem_render = function() {
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
        {
          attrs: {
            prop: "title",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "author",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "link",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "role",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var PublicationItem_staticRenderFns = []
PublicationItem_render._withStripped = true
var PublicationItem_esExports = { render: PublicationItem_render, staticRenderFns: PublicationItem_staticRenderFns }
/* harmony default export */ var List_PublicationItem = (PublicationItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9ce3a934", PublicationItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/PublicationItem.vue
var PublicationItem_disposed = false
var PublicationItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var PublicationItem___vue_template_functional__ = false
/* styles */
var PublicationItem___vue_styles__ = null
/* scopeId */
var PublicationItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var PublicationItem___vue_module_identifier__ = null
var PublicationItem_Component = PublicationItem_normalizeComponent(
  PublicationItem,
  List_PublicationItem,
  PublicationItem___vue_template_functional__,
  PublicationItem___vue_styles__,
  PublicationItem___vue_scopeId__,
  PublicationItem___vue_module_identifier__
)
PublicationItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/PublicationItem.vue"
if (PublicationItem_Component.esModule && Object.keys(PublicationItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9ce3a934", PublicationItem_Component.options)
  } else {
    hotAPI.reload("data-v-9ce3a934", PublicationItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    PublicationItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_PublicationItem = (PublicationItem_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/modules/utils.js
var utils = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/CommitteeItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var CommitteeItem = ({
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
			return Object(validate["c" /* committeeListItem */])(this);
		}
	},

	methods: {
		ucfirst: utils["I" /* ucfirst */]
	},

	components: {
		ConfirmationButton: ConfirmationButton["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6233e112","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/CommitteeItem.vue
var CommitteeItem_render = function() {
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
        {
          attrs: {
            prop: "name",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "role",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var CommitteeItem_staticRenderFns = []
CommitteeItem_render._withStripped = true
var CommitteeItem_esExports = { render: CommitteeItem_render, staticRenderFns: CommitteeItem_staticRenderFns }
/* harmony default export */ var List_CommitteeItem = (CommitteeItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6233e112", CommitteeItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/CommitteeItem.vue
var CommitteeItem_disposed = false
var CommitteeItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var CommitteeItem___vue_template_functional__ = false
/* styles */
var CommitteeItem___vue_styles__ = null
/* scopeId */
var CommitteeItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var CommitteeItem___vue_module_identifier__ = null
var CommitteeItem_Component = CommitteeItem_normalizeComponent(
  CommitteeItem,
  List_CommitteeItem,
  CommitteeItem___vue_template_functional__,
  CommitteeItem___vue_styles__,
  CommitteeItem___vue_scopeId__,
  CommitteeItem___vue_module_identifier__
)
CommitteeItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/CommitteeItem.vue"
if (CommitteeItem_Component.esModule && Object.keys(CommitteeItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6233e112", CommitteeItem_Component.options)
  } else {
    hotAPI.reload("data-v-6233e112", CommitteeItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    CommitteeItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_CommitteeItem = (CommitteeItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/StudyItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var StudyItem = ({
	extends: Question_List_Item,
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
			return Object(validate["p" /* studyListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-32ce6d7a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/StudyItem.vue
var StudyItem_render = function() {
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
        {
          attrs: {
            prop: "title",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "role",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "yearInitiated",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "approvalNumber",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "progress",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var StudyItem_staticRenderFns = []
StudyItem_render._withStripped = true
var StudyItem_esExports = { render: StudyItem_render, staticRenderFns: StudyItem_staticRenderFns }
/* harmony default export */ var List_StudyItem = (StudyItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-32ce6d7a", StudyItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/StudyItem.vue
var StudyItem_disposed = false
var StudyItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var StudyItem___vue_template_functional__ = false
/* styles */
var StudyItem___vue_styles__ = null
/* scopeId */
var StudyItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var StudyItem___vue_module_identifier__ = null
var StudyItem_Component = StudyItem_normalizeComponent(
  StudyItem,
  List_StudyItem,
  StudyItem___vue_template_functional__,
  StudyItem___vue_styles__,
  StudyItem___vue_scopeId__,
  StudyItem___vue_module_identifier__
)
StudyItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/StudyItem.vue"
if (StudyItem_Component.esModule && Object.keys(StudyItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-32ce6d7a", StudyItem_Component.options)
  } else {
    hotAPI.reload("data-v-32ce6d7a", StudyItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    StudyItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_StudyItem = (StudyItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/GrantItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var GrantItem = ({
	extends: Question_List_Item,
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
			return Object(validate["e" /* grantListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a6890cd4","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/GrantItem.vue
var GrantItem_render = function() {
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
            {
              attrs: {
                prop: "agency",
                errors: _vm.validation.errors,
                "show-errors": _vm.showErrors,
                "invalid-class": _vm.helpClass
              }
            },
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
        {
          attrs: {
            prop: "project",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "amount",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var GrantItem_staticRenderFns = []
GrantItem_render._withStripped = true
var GrantItem_esExports = { render: GrantItem_render, staticRenderFns: GrantItem_staticRenderFns }
/* harmony default export */ var List_GrantItem = (GrantItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a6890cd4", GrantItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/GrantItem.vue
var GrantItem_disposed = false
var GrantItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var GrantItem___vue_template_functional__ = false
/* styles */
var GrantItem___vue_styles__ = null
/* scopeId */
var GrantItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var GrantItem___vue_module_identifier__ = null
var GrantItem_Component = GrantItem_normalizeComponent(
  GrantItem,
  List_GrantItem,
  GrantItem___vue_template_functional__,
  GrantItem___vue_styles__,
  GrantItem___vue_scopeId__,
  GrantItem___vue_module_identifier__
)
GrantItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/GrantItem.vue"
if (GrantItem_Component.esModule && Object.keys(GrantItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a6890cd4", GrantItem_Component.options)
  } else {
    hotAPI.reload("data-v-a6890cd4", GrantItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    GrantItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_GrantItem = (GrantItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/CertificationItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var CertificationItem = ({
	extends: Question_List_Item,
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
			return Object(validate["a" /* certificationListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3c141f98","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/CertificationItem.vue
var CertificationItem_render = function() {
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
        {
          attrs: {
            prop: "board",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "specialty",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var CertificationItem_staticRenderFns = []
CertificationItem_render._withStripped = true
var CertificationItem_esExports = { render: CertificationItem_render, staticRenderFns: CertificationItem_staticRenderFns }
/* harmony default export */ var List_CertificationItem = (CertificationItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3c141f98", CertificationItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/CertificationItem.vue
var CertificationItem_disposed = false
var CertificationItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var CertificationItem___vue_template_functional__ = false
/* styles */
var CertificationItem___vue_styles__ = null
/* scopeId */
var CertificationItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var CertificationItem___vue_module_identifier__ = null
var CertificationItem_Component = CertificationItem_normalizeComponent(
  CertificationItem,
  List_CertificationItem,
  CertificationItem___vue_template_functional__,
  CertificationItem___vue_styles__,
  CertificationItem___vue_scopeId__,
  CertificationItem___vue_module_identifier__
)
CertificationItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/CertificationItem.vue"
if (CertificationItem_Component.esModule && Object.keys(CertificationItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3c141f98", CertificationItem_Component.options)
  } else {
    hotAPI.reload("data-v-3c141f98", CertificationItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    CertificationItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_CertificationItem = (CertificationItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/EditorialBoardItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/* harmony default export */ var EditorialBoardItem = ({
	extends: Question_List_Item,
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
			return Object(validate["d" /* editorialBoardListItem */])(this);
		}
	},

	watch: {
		otherRole: function otherRole(_otherRole) {
			this.$emit('input', { role: _otherRole });
		}
	},

	methods: {
		kebabCaseToWords: utils["v" /* kebabCaseToWords */],
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
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2186235b","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/EditorialBoardItem.vue
var EditorialBoardItem_render = function() {
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
        {
          attrs: {
            prop: "journal",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "role",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var EditorialBoardItem_staticRenderFns = []
EditorialBoardItem_render._withStripped = true
var EditorialBoardItem_esExports = { render: EditorialBoardItem_render, staticRenderFns: EditorialBoardItem_staticRenderFns }
/* harmony default export */ var List_EditorialBoardItem = (EditorialBoardItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2186235b", EditorialBoardItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/EditorialBoardItem.vue
var EditorialBoardItem_disposed = false
function EditorialBoardItem_injectStyle (ssrContext) {
  if (EditorialBoardItem_disposed) return
  __webpack_require__(277)
}
var EditorialBoardItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var EditorialBoardItem___vue_template_functional__ = false
/* styles */
var EditorialBoardItem___vue_styles__ = EditorialBoardItem_injectStyle
/* scopeId */
var EditorialBoardItem___vue_scopeId__ = "data-v-2186235b"
/* moduleIdentifier (server only) */
var EditorialBoardItem___vue_module_identifier__ = null
var EditorialBoardItem_Component = EditorialBoardItem_normalizeComponent(
  EditorialBoardItem,
  List_EditorialBoardItem,
  EditorialBoardItem___vue_template_functional__,
  EditorialBoardItem___vue_styles__,
  EditorialBoardItem___vue_scopeId__,
  EditorialBoardItem___vue_module_identifier__
)
EditorialBoardItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/EditorialBoardItem.vue"
if (EditorialBoardItem_Component.esModule && Object.keys(EditorialBoardItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2186235b", EditorialBoardItem_Component.options)
  } else {
    hotAPI.reload("data-v-2186235b", EditorialBoardItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    EditorialBoardItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_EditorialBoardItem = (EditorialBoardItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/ReviewItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var ReviewItem = ({
	extends: Question_List_Item,
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
			return Object(validate["n" /* reviewListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2c08b154","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/ReviewItem.vue
var ReviewItem_render = function() {
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
        {
          attrs: {
            prop: "work",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "reviews",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var ReviewItem_staticRenderFns = []
ReviewItem_render._withStripped = true
var ReviewItem_esExports = { render: ReviewItem_render, staticRenderFns: ReviewItem_staticRenderFns }
/* harmony default export */ var List_ReviewItem = (ReviewItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2c08b154", ReviewItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/ReviewItem.vue
var ReviewItem_disposed = false
var ReviewItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ReviewItem___vue_template_functional__ = false
/* styles */
var ReviewItem___vue_styles__ = null
/* scopeId */
var ReviewItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ReviewItem___vue_module_identifier__ = null
var ReviewItem_Component = ReviewItem_normalizeComponent(
  ReviewItem,
  List_ReviewItem,
  ReviewItem___vue_template_functional__,
  ReviewItem___vue_styles__,
  ReviewItem___vue_scopeId__,
  ReviewItem___vue_module_identifier__
)
ReviewItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/ReviewItem.vue"
if (ReviewItem_Component.esModule && Object.keys(ReviewItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c08b154", ReviewItem_Component.options)
  } else {
    hotAPI.reload("data-v-2c08b154", ReviewItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ReviewItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_ReviewItem = (ReviewItem_Component.exports);

// EXTERNAL MODULE: ./node_modules/@jacobmischka/vue-flatpickr/dist/index.js
var dist = __webpack_require__(36);

// EXTERNAL MODULE: ./node_modules/flatpickr/dist/flatpickr.css
var flatpickr = __webpack_require__(119);
var flatpickr_default = /*#__PURE__*/__webpack_require__.n(flatpickr);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/LectureItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var LectureItem = ({
	extends: Question_List_Item,
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
			return Object(validate["f" /* lectureListItem */])(this);
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
		ListItem: Question_List_Item,
		VueFlatpickr: dist["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3784f438","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/LectureItem.vue
var LectureItem_render = function() {
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
        {
          attrs: {
            prop: "title",
            errors: _vm.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "date",
            errors: _vm.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
                  change: function($event) {
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
                  change: function($event) {
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
            {
              attrs: {
                prop: "audience",
                errors: _vm.errors,
                "show-errors": _vm.showErrors,
                "invalid-class": _vm.helpClass
              }
            },
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
var LectureItem_staticRenderFns = []
LectureItem_render._withStripped = true
var LectureItem_esExports = { render: LectureItem_render, staticRenderFns: LectureItem_staticRenderFns }
/* harmony default export */ var List_LectureItem = (LectureItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3784f438", LectureItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/LectureItem.vue
var LectureItem_disposed = false
function LectureItem_injectStyle (ssrContext) {
  if (LectureItem_disposed) return
  __webpack_require__(278)
}
var LectureItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var LectureItem___vue_template_functional__ = false
/* styles */
var LectureItem___vue_styles__ = LectureItem_injectStyle
/* scopeId */
var LectureItem___vue_scopeId__ = "data-v-3784f438"
/* moduleIdentifier (server only) */
var LectureItem___vue_module_identifier__ = null
var LectureItem_Component = LectureItem_normalizeComponent(
  LectureItem,
  List_LectureItem,
  LectureItem___vue_template_functional__,
  LectureItem___vue_styles__,
  LectureItem___vue_scopeId__,
  LectureItem___vue_module_identifier__
)
LectureItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/LectureItem.vue"
if (LectureItem_Component.esModule && Object.keys(LectureItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3784f438", LectureItem_Component.options)
  } else {
    hotAPI.reload("data-v-3784f438", LectureItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    LectureItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_LectureItem = (LectureItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/MentorshipItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var MentorshipItem = ({
	extends: Question_List_Item,
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
			return Object(validate["g" /* mentorshipListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1494d9f9","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/MentorshipItem.vue
var MentorshipItem_render = function() {
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
        {
          attrs: {
            prop: "mentee",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
            {
              attrs: {
                prop: "subject",
                errors: _vm.validation.errors,
                "show-errors": _vm.showErrors,
                "invalid-class": _vm.helpClass
              }
            },
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
var MentorshipItem_staticRenderFns = []
MentorshipItem_render._withStripped = true
var MentorshipItem_esExports = { render: MentorshipItem_render, staticRenderFns: MentorshipItem_staticRenderFns }
/* harmony default export */ var List_MentorshipItem = (MentorshipItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1494d9f9", MentorshipItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/MentorshipItem.vue
var MentorshipItem_disposed = false
var MentorshipItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var MentorshipItem___vue_template_functional__ = false
/* styles */
var MentorshipItem___vue_styles__ = null
/* scopeId */
var MentorshipItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var MentorshipItem___vue_module_identifier__ = null
var MentorshipItem_Component = MentorshipItem_normalizeComponent(
  MentorshipItem,
  List_MentorshipItem,
  MentorshipItem___vue_template_functional__,
  MentorshipItem___vue_styles__,
  MentorshipItem___vue_scopeId__,
  MentorshipItem___vue_module_identifier__
)
MentorshipItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/MentorshipItem.vue"
if (MentorshipItem_Component.esModule && Object.keys(MentorshipItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1494d9f9", MentorshipItem_Component.options)
  } else {
    hotAPI.reload("data-v-1494d9f9", MentorshipItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    MentorshipItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_MentorshipItem = (MentorshipItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/ProjectItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var ProjectItem = ({
	extends: Question_List_Item,
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
			return Object(validate["i" /* projectListItem */])(this);
		}
	},

	components: {
		ListItem: Question_List_Item
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-09d366d3","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/ProjectItem.vue
var ProjectItem_render = function() {
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
        {
          attrs: {
            prop: "description",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
        {
          attrs: {
            prop: "hours",
            errors: _vm.validation.errors,
            "show-errors": _vm.showErrors,
            "invalid-class": _vm.helpClass
          }
        },
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
var ProjectItem_staticRenderFns = []
ProjectItem_render._withStripped = true
var ProjectItem_esExports = { render: ProjectItem_render, staticRenderFns: ProjectItem_staticRenderFns }
/* harmony default export */ var List_ProjectItem = (ProjectItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-09d366d3", ProjectItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/ProjectItem.vue
var ProjectItem_disposed = false
var ProjectItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ProjectItem___vue_template_functional__ = false
/* styles */
var ProjectItem___vue_styles__ = null
/* scopeId */
var ProjectItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ProjectItem___vue_module_identifier__ = null
var ProjectItem_Component = ProjectItem_normalizeComponent(
  ProjectItem,
  List_ProjectItem,
  ProjectItem___vue_template_functional__,
  ProjectItem___vue_styles__,
  ProjectItem___vue_scopeId__,
  ProjectItem___vue_module_identifier__
)
ProjectItem_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/ProjectItem.vue"
if (ProjectItem_Component.esModule && Object.keys(ProjectItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09d366d3", ProjectItem_Component.options)
  } else {
    hotAPI.reload("data-v-09d366d3", ProjectItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ProjectItem_disposed = true
  })
})()}

/* harmony default export */ var Question_List_ProjectItem = (ProjectItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/Items.vue













/* harmony default export */ var Items = ({
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
		},
		helpClass: {
			type: String,
			required: false
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
					showErrors: _this.showErrors,
					helpClass: _this.helpClass
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
		TextItem: Question_List_TextItem,
		PublicationItem: Question_List_PublicationItem,
		CommitteeItem: Question_List_CommitteeItem,
		StudyItem: Question_List_StudyItem,
		GrantItem: Question_List_GrantItem,
		CertificationItem: Question_List_CertificationItem,
		EditorialBoardItem: Question_List_EditorialBoardItem,
		ReviewItem: Question_List_ReviewItem,
		LectureItem: Question_List_LectureItem,
		MentorshipItem: Question_List_MentorshipItem,
		ProjectItem: Question_List_ProjectItem
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/Items.vue
var Items_disposed = false
function Items_injectStyle (ssrContext) {
  if (Items_disposed) return
  __webpack_require__(274)
}
var Items_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var Items___vue_template_functional__ = false
/* styles */
var Items___vue_styles__ = Items_injectStyle
/* scopeId */
var Items___vue_scopeId__ = "data-v-8c7e23f2"
/* moduleIdentifier (server only) */
var Items___vue_module_identifier__ = null
var Items_Component = Items_normalizeComponent(
  Items,
  __vue_template__,
  Items___vue_template_functional__,
  Items___vue_styles__,
  Items___vue_scopeId__,
  Items___vue_module_identifier__
)
Items_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/Items.vue"
if (Items_Component.esModule && Object.keys(Items_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8c7e23f2", Items_Component.options)
  } else {
    hotAPI.reload("data-v-8c7e23f2", Items_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Items_disposed = true
  })
})()}

/* harmony default export */ var List_Items = (Items_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/BootstrapAlert.vue + 2 modules
var BootstrapAlert = __webpack_require__(25);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/List.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var List = ({
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
		},
		helpClass: {
			type: String,
			required: false
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
			if (this.description) return Object(snarkdown_es["a" /* default */])(this.description);
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

		snarkdown: snarkdown_es["a" /* default */]
	},

	components: {
		ListItems: List_Items,
		BootstrapAlert: BootstrapAlert["a" /* default */],
		ShowHideButton: ShowHideButton["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-013e02b2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/List/List.vue
var List_render = function() {
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
              "show-errors": _vm.showErrors,
              "help-class": _vm.helpClass
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
                  _vm.$set(_vm.show, "description", $$v)
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
var List_staticRenderFns = []
List_render._withStripped = true
var List_esExports = { render: List_render, staticRenderFns: List_staticRenderFns }
/* harmony default export */ var List_List = (List_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-013e02b2", List_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/List/List.vue
var List_disposed = false
var List_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var List___vue_template_functional__ = false
/* styles */
var List___vue_styles__ = null
/* scopeId */
var List___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var List___vue_module_identifier__ = null
var List_Component = List_normalizeComponent(
  List,
  List_List,
  List___vue_template_functional__,
  List___vue_styles__,
  List___vue_scopeId__,
  List___vue_module_identifier__
)
List_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/List/List.vue"
if (List_Component.esModule && Object.keys(List_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-013e02b2", List_Component.options)
  } else {
    hotAPI.reload("data-v-013e02b2", List_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    List_disposed = true
  })
})()}

/* harmony default export */ var Question_List_List = (List_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Question/Question.vue








/* harmony default export */ var Question = ({
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
		helpClass: {
			type: String,
			required: false
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
				showErrors: this.showErrors,
				helpClass: this.helpClass
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
		TextQuestion: Questionnaire_Question_Text,
		NumberQuestion: vue_components_Questionnaire_Question_Number,
		SelectQuestion: Questionnaire_Question_Select,
		CheckboxQuestion: Questionnaire_Question_Checkbox,
		RadioQuestion: Questionnaire_Question_Radio,
		ListQuestion: Question_List_List
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Question.vue
var Question_disposed = false
var Question_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var Question___vue_template__ = null
/* template functional */
  var Question___vue_template_functional__ = false
/* styles */
var Question___vue_styles__ = null
/* scopeId */
var Question___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Question___vue_module_identifier__ = null
var Question_Component = Question_normalizeComponent(
  Question,
  Question___vue_template__,
  Question___vue_template_functional__,
  Question___vue_styles__,
  Question___vue_scopeId__,
  Question___vue_module_identifier__
)
Question_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Question/Question.vue"
if (Question_Component.esModule && Object.keys(Question_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-61cad77e", Question_Component.options)
  } else {
    hotAPI.reload("data-v-61cad77e", Question_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Question_disposed = true
  })
})()}

/* harmony default export */ var Question_Question = __webpack_exports__["a"] = (Question_Component.exports);


/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = resetQuestion;
/* harmony export (immutable) */ __webpack_exports__["b"] = resetUnmetQuestions;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(120);


function resetQuestion(question) {
	switch (question.type) {
		case 'text':
			return resetTextQuestion(question);
		case 'number':
			return resetNumberQuestion(question);
		case 'select':
			return resetSelectQuestion(question);
		case 'checkbox':
			return resetCheckboxQuestion(question);
		case 'radio':
			return resetRadioQuestion(question);
		case 'list':
			return resetListQuestion(question);
	}
}

function resetTextQuestion(question) {
	var newQuestion = Object.assign({}, question);
	delete newQuestion.value;
	return newQuestion;
}

function resetNumberQuestion(question) {
	var newQuestion = Object.assign({}, question);
	delete newQuestion.value;
	return newQuestion;
}

function resetSelectQuestion(question) {
	var newQuestion = Object.assign({}, question);
	newQuestion.options = newQuestion.options.map(function (option) {
		var newOption = Object.assign({}, option);
		delete newOption.selected;
		return newOption;
	});
	return newQuestion;
}

function resetCheckboxQuestion(question) {
	return resetRadioCheckboxQuestion(question);
}

function resetRadioQuestion(question) {
	return resetRadioCheckboxQuestion(question);
}

function resetRadioCheckboxQuestion(question) {
	var newQuestion = Object.assign({}, question);
	newQuestion.options = newQuestion.options.map(function (option) {
		var newOption = Object.assign({}, option);
		delete newOption.checked;

		if (newOption.editable) {
			newOption.text = '';
			newOption.value = '';
		}

		return newOption;
	});
	return newQuestion;
}

function resetListQuestion(question) {
	var newQuestion = Object.assign({}, question);
	newQuestion.items = [];
	return newQuestion;
}

function resetUnmetQuestions(questionnaire) {
	var checker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["a" /* getConditionChecker */])(Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["c" /* getQuestions */])(questionnaire));

	var resetter = function resetter(question, section) {
		return section.condition && !checker(section.condition) || question.condition && !checker(question.condition) ? resetQuestion(question) : question;
	};

	return Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["i" /* walkQuestionnaireQuestions */])(questionnaire, resetter);
}

/***/ }),
/* 184 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./resources/assets/js/vue-components/Questionnaire/Instruction.vue + 2 modules
var Instruction = __webpack_require__(172);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Question.vue + 60 modules
var Question = __webpack_require__(182);

// EXTERNAL MODULE: ./resources/assets/js/modules/questionnaire/index.js
var questionnaire = __webpack_require__(120);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Section.vue






/* harmony default export */ var Section = ({
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
		helpClass: {
			type: String,
			required: false
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

		var validItems = this.items.filter(questionnaire["h" /* isValidItem */]);

		var items = validItems.map(function (item, index) {
			var componentName = item.type === 'instruction' ? 'questionnaire-instruction' : 'questionnaire-question';
			var props = componentName === 'questionnaire-question' ? { question: item } : Object.assign({}, item);

			return h(componentName, {
				props: Object.assign({
					readonly: _this.readonly,
					showErrors: _this.showErrors,
					helpClass: _this.helpClass,
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
		QuestionnaireInstruction: Instruction["a" /* default */],
		QuestionnaireQuestion: Question["a" /* default */]
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Section.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(294)
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
  Section,
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

/* harmony default export */ var Questionnaire_Section = __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 271 */,
/* 272 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 273 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 274 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 275 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 276 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 277 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 278 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 279 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 280 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// commonmark.js - CommomMark in JavaScript
// Copyright (C) 2014 John MacFarlane
// License: BSD3.

// Basic usage:
//
// var commonmark = require('commonmark');
// var parser = new commonmark.Parser();
// var renderer = new commonmark.HtmlRenderer();
// console.log(renderer.render(parser.parse('Hello *world*')));

module.exports.Node = __webpack_require__(141);
module.exports.Parser = __webpack_require__(282);
module.exports.HtmlRenderer = __webpack_require__(292);
module.exports.XmlRenderer = __webpack_require__(293);


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(141);
var unescapeString = __webpack_require__(121).unescapeString;
var OPENTAG = __webpack_require__(121).OPENTAG;
var CLOSETAG = __webpack_require__(121).CLOSETAG;

var CODE_INDENT = 4;

var C_TAB = 9;
var C_NEWLINE = 10;
var C_GREATERTHAN = 62;
var C_LESSTHAN = 60;
var C_SPACE = 32;
var C_OPEN_BRACKET = 91;

var InlineParser = __webpack_require__(288);

var reHtmlBlockOpen = [
   /./, // dummy for 0
   /^<(?:script|pre|style)(?:\s|>|$)/i,
   /^<!--/,
   /^<[?]/,
   /^<![A-Z]/,
   /^<!\[CDATA\[/,
   /^<[/]?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[123456]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|title|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|[/]?[>]|$)/i,
    new RegExp('^(?:' + OPENTAG + '|' + CLOSETAG + ')\\s*$', 'i')
];

var reHtmlBlockClose = [
   /./, // dummy for 0
   /<\/(?:script|pre|style)>/i,
   /-->/,
   /\?>/,
   />/,
   /\]\]>/
];

var reThematicBreak = /^(?:(?:\*[ \t]*){3,}|(?:_[ \t]*){3,}|(?:-[ \t]*){3,})[ \t]*$/;

var reMaybeSpecial = /^[#`~*+_=<>0-9-]/;

var reNonSpace = /[^ \t\f\v\r\n]/;

var reBulletListMarker = /^[*+-]/;

var reOrderedListMarker = /^(\d{1,9})([.)])/;

var reATXHeadingMarker = /^#{1,6}(?:[ \t]+|$)/;

var reCodeFence = /^`{3,}(?!.*`)|^~{3,}(?!.*~)/;

var reClosingCodeFence = /^(?:`{3,}|~{3,})(?= *$)/;

var reSetextHeadingLine = /^(?:=+|-+)[ \t]*$/;

var reLineEnding = /\r\n|\n|\r/;

// Returns true if string contains only space characters.
var isBlank = function(s) {
    return !(reNonSpace.test(s));
};

var isSpaceOrTab = function(c) {
    return c === C_SPACE || c === C_TAB;
};

var peek = function(ln, pos) {
    if (pos < ln.length) {
        return ln.charCodeAt(pos);
    } else {
        return -1;
    }
};

// DOC PARSER

// These are methods of a Parser object, defined below.

// Returns true if block ends with a blank line, descending if needed
// into lists and sublists.
var endsWithBlankLine = function(block) {
    while (block) {
        if (block._lastLineBlank) {
            return true;
        }
        var t = block.type;
        if (t === 'list' || t === 'item') {
            block = block._lastChild;
        } else {
            break;
        }
    }
    return false;
};

// Add a line to the block at the tip.  We assume the tip
// can accept lines -- that check should be done before calling this.
var addLine = function() {
    if (this.partiallyConsumedTab) {
      this.offset += 1; // skip over tab
      // add space characters:
      var charsToTab = 4 - (this.column % 4);
      this.tip._string_content += (' '.repeat(charsToTab));
    }
    this.tip._string_content += this.currentLine.slice(this.offset) + '\n';
};

// Add block of type tag as a child of the tip.  If the tip can't
// accept children, close and finalize it and try its parent,
// and so on til we find a block that can accept children.
var addChild = function(tag, offset) {
    while (!this.blocks[this.tip.type].canContain(tag)) {
        this.finalize(this.tip, this.lineNumber - 1);
    }

    var column_number = offset + 1; // offset 0 = column 1
    var newBlock = new Node(tag, [[this.lineNumber, column_number], [0, 0]]);
    newBlock._string_content = '';
    this.tip.appendChild(newBlock);
    this.tip = newBlock;
    return newBlock;
};

// Parse a list marker and return data on the marker (type,
// start, delimiter, bullet character, padding) or null.
var parseListMarker = function(parser, container) {
    var rest = parser.currentLine.slice(parser.nextNonspace);
    var match;
    var nextc;
    var spacesStartCol;
    var spacesStartOffset;
    var data = { type: null,
                 tight: true,  // lists are tight by default
                 bulletChar: null,
                 start: null,
                 delimiter: null,
                 padding: null,
                 markerOffset: parser.indent };
    if ((match = rest.match(reBulletListMarker))) {
        data.type = 'bullet';
        data.bulletChar = match[0][0];

    } else if ((match = rest.match(reOrderedListMarker)) &&
                (container.type !== 'paragraph' ||
                 match[1] === '1')) {
        data.type = 'ordered';
        data.start = parseInt(match[1]);
        data.delimiter = match[2];
    } else {
        return null;
    }
    // make sure we have spaces after
    nextc = peek(parser.currentLine, parser.nextNonspace + match[0].length);
    if (!(nextc === -1 || nextc === C_TAB || nextc === C_SPACE)) {
        return null;
    }

    // if it interrupts paragraph, make sure first line isn't blank
    if (container.type === 'paragraph' && !parser.currentLine.slice(parser.nextNonspace + match[0].length).match(reNonSpace)) {
        return null;
    }

    // we've got a match! advance offset and calculate padding
    parser.advanceNextNonspace(); // to start of marker
    parser.advanceOffset(match[0].length, true); // to end of marker
    spacesStartCol = parser.column;
    spacesStartOffset = parser.offset;
    do {
        parser.advanceOffset(1, true);
        nextc = peek(parser.currentLine, parser.offset);
    } while (parser.column - spacesStartCol < 5 &&
           isSpaceOrTab(nextc));
    var blank_item = peek(parser.currentLine, parser.offset) === -1;
    var spaces_after_marker = parser.column - spacesStartCol;
    if (spaces_after_marker >= 5 ||
        spaces_after_marker < 1 ||
        blank_item) {
        data.padding = match[0].length + 1;
        parser.column = spacesStartCol;
        parser.offset = spacesStartOffset;
        if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
            parser.advanceOffset(1, true);
        }
    } else {
        data.padding = match[0].length + spaces_after_marker;
    }
    return data;
};

// Returns true if the two list items are of the same type,
// with the same delimiter and bullet character.  This is used
// in agglomerating list items into lists.
var listsMatch = function(list_data, item_data) {
    return (list_data.type === item_data.type &&
            list_data.delimiter === item_data.delimiter &&
            list_data.bulletChar === item_data.bulletChar);
};

// Finalize and close any unmatched blocks.
var closeUnmatchedBlocks = function() {
    if (!this.allClosed) {
        // finalize any blocks not matched
        while (this.oldtip !== this.lastMatchedContainer) {
            var parent = this.oldtip._parent;
            this.finalize(this.oldtip, this.lineNumber - 1);
            this.oldtip = parent;
        }
        this.allClosed = true;
    }
};

// 'finalize' is run when the block is closed.
// 'continue' is run to check whether the block is continuing
// at a certain line and offset (e.g. whether a block quote
// contains a `>`.  It returns 0 for matched, 1 for not matched,
// and 2 for "we've dealt with this line completely, go to next."
var blocks = {
    document: {
        continue: function() { return 0; },
        finalize: function() { return; },
        canContain: function(t) { return (t !== 'item'); },
        acceptsLines: false
    },
    list: {
        continue: function() { return 0; },
        finalize: function(parser, block) {
            var item = block._firstChild;
            while (item) {
                // check for non-final list item ending with blank line:
                if (endsWithBlankLine(item) && item._next) {
                    block._listData.tight = false;
                    break;
                }
                // recurse into children of list item, to see if there are
                // spaces between any of them:
                var subitem = item._firstChild;
                while (subitem) {
                    if (endsWithBlankLine(subitem) &&
                        (item._next || subitem._next)) {
                        block._listData.tight = false;
                        break;
                    }
                    subitem = subitem._next;
                }
                item = item._next;
            }
        },
        canContain: function(t) { return (t === 'item'); },
        acceptsLines: false
    },
    block_quote: {
        continue: function(parser) {
            var ln = parser.currentLine;
            if (!parser.indented &&
                peek(ln, parser.nextNonspace) === C_GREATERTHAN) {
                parser.advanceNextNonspace();
                parser.advanceOffset(1, false);
                if (isSpaceOrTab(peek(ln, parser.offset))) {
                    parser.advanceOffset(1, true);
                }
            } else {
                return 1;
            }
            return 0;
        },
        finalize: function() { return; },
        canContain: function(t) { return (t !== 'item'); },
        acceptsLines: false
    },
    item: {
        continue: function(parser, container) {
            if (parser.blank) {
                if (container._firstChild == null) {
                    // Blank line after empty list item
                    return 1;
                } else {
                    parser.advanceNextNonspace();
                }
            } else if (parser.indent >=
                       container._listData.markerOffset +
                       container._listData.padding) {
                parser.advanceOffset(container._listData.markerOffset +
                    container._listData.padding, true);
            } else {
                return 1;
            }
            return 0;
        },
        finalize: function() { return; },
        canContain: function(t) { return (t !== 'item'); },
        acceptsLines: false
    },
    heading: {
        continue: function() {
            // a heading can never container > 1 line, so fail to match:
            return 1;
        },
        finalize: function() { return; },
        canContain: function() { return false; },
        acceptsLines: false
    },
    thematic_break: {
        continue: function() {
            // a thematic break can never container > 1 line, so fail to match:
            return 1;
        },
        finalize: function() { return; },
        canContain: function() { return false; },
        acceptsLines: false
    },
    code_block: {
        continue: function(parser, container) {
            var ln = parser.currentLine;
            var indent = parser.indent;
            if (container._isFenced) { // fenced
                var match = (indent <= 3 &&
                    ln.charAt(parser.nextNonspace) === container._fenceChar &&
                    ln.slice(parser.nextNonspace).match(reClosingCodeFence));
                if (match && match[0].length >= container._fenceLength) {
                    // closing fence - we're at end of line, so we can return
                    parser.finalize(container, parser.lineNumber);
                    return 2;
                } else {
                    // skip optional spaces of fence offset
                    var i = container._fenceOffset;
                    while (i > 0 && isSpaceOrTab(peek(ln, parser.offset))) {
                        parser.advanceOffset(1, true);
                        i--;
                    }
                }
            } else { // indented
                if (indent >= CODE_INDENT) {
                    parser.advanceOffset(CODE_INDENT, true);
                } else if (parser.blank) {
                    parser.advanceNextNonspace();
                } else {
                    return 1;
                }
            }
            return 0;
        },
        finalize: function(parser, block) {
            if (block._isFenced) { // fenced
                // first line becomes info string
                var content = block._string_content;
                var newlinePos = content.indexOf('\n');
                var firstLine = content.slice(0, newlinePos);
                var rest = content.slice(newlinePos + 1);
                block.info = unescapeString(firstLine.trim());
                block._literal = rest;
            } else { // indented
                block._literal = block._string_content.replace(/(\n *)+$/, '\n');
            }
            block._string_content = null; // allow GC
        },
        canContain: function() { return false; },
        acceptsLines: true
    },
    html_block: {
        continue: function(parser, container) {
            return ((parser.blank &&
                     (container._htmlBlockType === 6 ||
                      container._htmlBlockType === 7)) ? 1 : 0);
        },
        finalize: function(parser, block) {
            block._literal = block._string_content.replace(/(\n *)+$/, '');
            block._string_content = null; // allow GC
        },
        canContain: function() { return false; },
        acceptsLines: true
    },
    paragraph: {
        continue: function(parser) {
            return (parser.blank ? 1 : 0);
        },
        finalize: function(parser, block) {
            var pos;
            var hasReferenceDefs = false;

            // try parsing the beginning as link reference definitions:
            while (peek(block._string_content, 0) === C_OPEN_BRACKET &&
                   (pos =
                    parser.inlineParser.parseReference(block._string_content,
                                                       parser.refmap))) {
                block._string_content = block._string_content.slice(pos);
                hasReferenceDefs = true;
            }
            if (hasReferenceDefs && isBlank(block._string_content)) {
                block.unlink();
            }
        },
        canContain: function() { return false; },
        acceptsLines: true
    }
};

// block start functions.  Return values:
// 0 = no match
// 1 = matched container, keep going
// 2 = matched leaf, no more block starts
var blockStarts = [
    // block quote
    function(parser) {
        if (!parser.indented &&
            peek(parser.currentLine, parser.nextNonspace) === C_GREATERTHAN) {
            parser.advanceNextNonspace();
            parser.advanceOffset(1, false);
            // optional following space
            if (isSpaceOrTab(peek(parser.currentLine, parser.offset))) {
                parser.advanceOffset(1, true);
            }
            parser.closeUnmatchedBlocks();
            parser.addChild('block_quote', parser.nextNonspace);
            return 1;
        } else {
            return 0;
        }
    },

    // ATX heading
    function(parser) {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reATXHeadingMarker))) {
            parser.advanceNextNonspace();
            parser.advanceOffset(match[0].length, false);
            parser.closeUnmatchedBlocks();
            var container = parser.addChild('heading', parser.nextNonspace);
            container.level = match[0].trim().length; // number of #s
            // remove trailing ###s:
            container._string_content =
                parser.currentLine.slice(parser.offset).replace(/^[ \t]*#+[ \t]*$/, '').replace(/[ \t]+#+[ \t]*$/, '');
            parser.advanceOffset(parser.currentLine.length - parser.offset);
            return 2;
        } else {
            return 0;
        }
    },

    // Fenced code block
    function(parser) {
        var match;
        if (!parser.indented &&
            (match = parser.currentLine.slice(parser.nextNonspace).match(reCodeFence))) {
            var fenceLength = match[0].length;
            parser.closeUnmatchedBlocks();
            var container = parser.addChild('code_block', parser.nextNonspace);
            container._isFenced = true;
            container._fenceLength = fenceLength;
            container._fenceChar = match[0][0];
            container._fenceOffset = parser.indent;
            parser.advanceNextNonspace();
            parser.advanceOffset(fenceLength, false);
            return 2;
        } else {
            return 0;
        }
    },

    // HTML block
    function(parser, container) {
        if (!parser.indented &&
            peek(parser.currentLine, parser.nextNonspace) === C_LESSTHAN) {
            var s = parser.currentLine.slice(parser.nextNonspace);
            var blockType;

            for (blockType = 1; blockType <= 7; blockType++) {
                if (reHtmlBlockOpen[blockType].test(s) &&
                    (blockType < 7 ||
                     container.type !== 'paragraph')) {
                    parser.closeUnmatchedBlocks();
                    // We don't adjust parser.offset;
                    // spaces are part of the HTML block:
                    var b = parser.addChild('html_block',
                                            parser.offset);
                    b._htmlBlockType = blockType;
                    return 2;
                }
            }
        }

        return 0;

    },

    // Setext heading
    function(parser, container) {
        var match;
        if (!parser.indented &&
            container.type === 'paragraph' &&
                   ((match = parser.currentLine.slice(parser.nextNonspace).match(reSetextHeadingLine)))) {
            parser.closeUnmatchedBlocks();
            var heading = new Node('heading', container.sourcepos);
            heading.level = match[0][0] === '=' ? 1 : 2;
            heading._string_content = container._string_content;
            container.insertAfter(heading);
            container.unlink();
            parser.tip = heading;
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return 2;
        } else {
            return 0;
        }
    },

    // thematic break
    function(parser) {
        if (!parser.indented &&
            reThematicBreak.test(parser.currentLine.slice(parser.nextNonspace))) {
            parser.closeUnmatchedBlocks();
            parser.addChild('thematic_break', parser.nextNonspace);
            parser.advanceOffset(parser.currentLine.length - parser.offset, false);
            return 2;
        } else {
            return 0;
        }
    },

    // list item
    function(parser, container) {
        var data;

        if ((!parser.indented || container.type === 'list')
                && (data = parseListMarker(parser, container))) {
            parser.closeUnmatchedBlocks();

            // add the list if needed
            if (parser.tip.type !== 'list' ||
                !(listsMatch(container._listData, data))) {
                container = parser.addChild('list', parser.nextNonspace);
                container._listData = data;
            }

            // add the list item
            container = parser.addChild('item', parser.nextNonspace);
            container._listData = data;
            return 1;
        } else {
            return 0;
        }
    },

    // indented code block
    function(parser) {
        if (parser.indented &&
            parser.tip.type !== 'paragraph' &&
            !parser.blank) {
            // indented code
            parser.advanceOffset(CODE_INDENT, true);
            parser.closeUnmatchedBlocks();
            parser.addChild('code_block', parser.offset);
            return 2;
        } else {
            return 0;
        }
     }

];

var advanceOffset = function(count, columns) {
    var currentLine = this.currentLine;
    var charsToTab, charsToAdvance;
    var c;
    while (count > 0 && (c = currentLine[this.offset])) {
        if (c === '\t') {
            charsToTab = 4 - (this.column % 4);
            if (columns) {
                this.partiallyConsumedTab = charsToTab > count;
                charsToAdvance = charsToTab > count ? count : charsToTab;
                this.column += charsToAdvance;
                this.offset += this.partiallyConsumedTab ? 0 : 1;
                count -= charsToAdvance;
            } else {
                this.partiallyConsumedTab = false;
                this.column += charsToTab;
                this.offset += 1;
                count -= 1;
            }
        } else {
            this.partiallyConsumedTab = false;
            this.offset += 1;
            this.column += 1; // assume ascii; block starts are ascii
            count -= 1;
        }
    }
};

var advanceNextNonspace = function() {
    this.offset = this.nextNonspace;
    this.column = this.nextNonspaceColumn;
    this.partiallyConsumedTab = false;
};

var findNextNonspace = function() {
    var currentLine = this.currentLine;
    var i = this.offset;
    var cols = this.column;
    var c;

    while ((c = currentLine.charAt(i)) !== '') {
        if (c === ' ') {
            i++;
            cols++;
        } else if (c === '\t') {
            i++;
            cols += (4 - (cols % 4));
        } else {
            break;
        }
    }
    this.blank = (c === '\n' || c === '\r' || c === '');
    this.nextNonspace = i;
    this.nextNonspaceColumn = cols;
    this.indent = this.nextNonspaceColumn - this.column;
    this.indented = this.indent >= CODE_INDENT;
};

// Analyze a line of text and update the document appropriately.
// We parse markdown text by calling this on each line of input,
// then finalizing the document.
var incorporateLine = function(ln) {
    var all_matched = true;
    var t;

    var container = this.doc;
    this.oldtip = this.tip;
    this.offset = 0;
    this.column = 0;
    this.blank = false;
    this.partiallyConsumedTab = false;
    this.lineNumber += 1;

    // replace NUL characters for security
    if (ln.indexOf('\u0000') !== -1) {
        ln = ln.replace(/\0/g, '\uFFFD');
    }

    this.currentLine = ln;

    // For each containing block, try to parse the associated line start.
    // Bail out on failure: container will point to the last matching block.
    // Set all_matched to false if not all containers match.
    var lastChild;
    while ((lastChild = container._lastChild) && lastChild._open) {
        container = lastChild;

        this.findNextNonspace();

        switch (this.blocks[container.type].continue(this, container)) {
        case 0: // we've matched, keep going
            break;
        case 1: // we've failed to match a block
            all_matched = false;
            break;
        case 2: // we've hit end of line for fenced code close and can return
            this.lastLineLength = ln.length;
            return;
        default:
            throw 'continue returned illegal value, must be 0, 1, or 2';
        }
        if (!all_matched) {
            container = container._parent; // back up to last matching block
            break;
        }
    }

    this.allClosed = (container === this.oldtip);
    this.lastMatchedContainer = container;

    var matchedLeaf = container.type !== 'paragraph' &&
            blocks[container.type].acceptsLines;
    var starts = this.blockStarts;
    var startsLen = starts.length;
    // Unless last matched container is a code block, try new container starts,
    // adding children to the last matched container:
    while (!matchedLeaf) {

        this.findNextNonspace();

        // this is a little performance optimization:
        if (!this.indented &&
            !reMaybeSpecial.test(ln.slice(this.nextNonspace))) {
            this.advanceNextNonspace();
            break;
        }

        var i = 0;
        while (i < startsLen) {
            var res = starts[i](this, container);
            if (res === 1) {
                container = this.tip;
                break;
            } else if (res === 2) {
                container = this.tip;
                matchedLeaf = true;
                break;
            } else {
                i++;
            }
        }

        if (i === startsLen) { // nothing matched
            this.advanceNextNonspace();
            break;
        }
    }

    // What remains at the offset is a text line.  Add the text to the
    // appropriate container.

   // First check for a lazy paragraph continuation:
    if (!this.allClosed && !this.blank &&
        this.tip.type === 'paragraph') {
        // lazy paragraph continuation
        this.addLine();

    } else { // not a lazy continuation

        // finalize any blocks not matched
        this.closeUnmatchedBlocks();
        if (this.blank && container.lastChild) {
            container.lastChild._lastLineBlank = true;
        }

        t = container.type;

        // Block quote lines are never blank as they start with >
        // and we don't count blanks in fenced code for purposes of tight/loose
        // lists or breaking out of lists.  We also don't set _lastLineBlank
        // on an empty list item, or if we just closed a fenced block.
        var lastLineBlank = this.blank &&
            !(t === 'block_quote' ||
              (t === 'code_block' && container._isFenced) ||
              (t === 'item' &&
               !container._firstChild &&
               container.sourcepos[0][0] === this.lineNumber));

        // propagate lastLineBlank up through parents:
        var cont = container;
        while (cont) {
            cont._lastLineBlank = lastLineBlank;
            cont = cont._parent;
        }

        if (this.blocks[t].acceptsLines) {
            this.addLine();
            // if HtmlBlock, check for end condition
            if (t === 'html_block' &&
                container._htmlBlockType >= 1 &&
                container._htmlBlockType <= 5 &&
                reHtmlBlockClose[container._htmlBlockType].test(this.currentLine.slice(this.offset))) {
                this.finalize(container, this.lineNumber);
            }

        } else if (this.offset < ln.length && !this.blank) {
            // create paragraph container for line
            container = this.addChild('paragraph', this.offset);
            this.advanceNextNonspace();
            this.addLine();
        }
    }
    this.lastLineLength = ln.length;
};

// Finalize a block.  Close it and do any necessary postprocessing,
// e.g. creating string_content from strings, setting the 'tight'
// or 'loose' status of a list, and parsing the beginnings
// of paragraphs for reference definitions.  Reset the tip to the
// parent of the closed block.
var finalize = function(block, lineNumber) {
    var above = block._parent;
    block._open = false;
    block.sourcepos[1] = [lineNumber, this.lastLineLength];

    this.blocks[block.type].finalize(this, block);

    this.tip = above;
};

// Walk through a block & children recursively, parsing string content
// into inline content where appropriate.
var processInlines = function(block) {
    var node, event, t;
    var walker = block.walker();
    this.inlineParser.refmap = this.refmap;
    this.inlineParser.options = this.options;
    while ((event = walker.next())) {
        node = event.node;
        t = node.type;
        if (!event.entering && (t === 'paragraph' || t === 'heading')) {
            this.inlineParser.parse(node);
        }
    }
};

var Document = function() {
    var doc = new Node('document', [[1, 1], [0, 0]]);
    return doc;
};

// The main parsing function.  Returns a parsed document AST.
var parse = function(input) {
    this.doc = new Document();
    this.tip = this.doc;
    this.refmap = {};
    this.lineNumber = 0;
    this.lastLineLength = 0;
    this.offset = 0;
    this.column = 0;
    this.lastMatchedContainer = this.doc;
    this.currentLine = "";
    if (this.options.time) { console.time("preparing input"); }
    var lines = input.split(reLineEnding);
    var len = lines.length;
    if (input.charCodeAt(input.length - 1) === C_NEWLINE) {
        // ignore last blank line created by final newline
        len -= 1;
    }
    if (this.options.time) { console.timeEnd("preparing input"); }
    if (this.options.time) { console.time("block parsing"); }
    for (var i = 0; i < len; i++) {
        this.incorporateLine(lines[i]);
    }
    while (this.tip) {
        this.finalize(this.tip, len);
    }
    if (this.options.time) { console.timeEnd("block parsing"); }
    if (this.options.time) { console.time("inline parsing"); }
    this.processInlines(this.doc);
    if (this.options.time) { console.timeEnd("inline parsing"); }
    return this.doc;
};


// The Parser object.
function Parser(options){
    return {
        doc: new Document(),
        blocks: blocks,
        blockStarts: blockStarts,
        tip: this.doc,
        oldtip: this.doc,
        currentLine: "",
        lineNumber: 0,
        offset: 0,
        column: 0,
        nextNonspace: 0,
        nextNonspaceColumn: 0,
        indent: 0,
        indented: false,
        blank: false,
        partiallyConsumedTab: false,
        allClosed: true,
        lastMatchedContainer: this.doc,
        refmap: {},
        lastLineLength: 0,
        inlineParser: new InlineParser(options),
        findNextNonspace: findNextNonspace,
        advanceOffset: advanceOffset,
        advanceNextNonspace: advanceNextNonspace,
        addLine: addLine,
        addChild: addChild,
        incorporateLine: incorporateLine,
        finalize: finalize,
        processInlines: processInlines,
        closeUnmatchedBlocks: closeUnmatchedBlocks,
        parse: parse,
        options: options || {}
    };
}

module.exports = Parser;


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

var inverseXML = getInverseObj(__webpack_require__(174)),
    xmlReplacer = getInverseReplacer(inverseXML);

exports.XML = getInverse(inverseXML, xmlReplacer);

var inverseHTML = getInverseObj(__webpack_require__(127)),
    htmlReplacer = getInverseReplacer(inverseHTML);

exports.HTML = getInverse(inverseHTML, htmlReplacer);

function getInverseObj(obj){
	return Object.keys(obj).sort().reduce(function(inverse, name){
		inverse[obj[name]] = "&" + name + ";";
		return inverse;
	}, {});
}

function getInverseReplacer(inverse){
	var single = [],
	    multiple = [];

	Object.keys(inverse).forEach(function(k){
		if(k.length === 1){
			single.push("\\" + k);
		} else {
			multiple.push(k);
		}
	});

	//TODO add ranges
	multiple.unshift("[" + single.join("") + "]");

	return new RegExp(multiple.join("|"), "g");
}

var re_nonASCII = /[^\0-\x7F]/g,
    re_astralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;

function singleCharReplacer(c){
	return "&#x" + c.charCodeAt(0).toString(16).toUpperCase() + ";";
}

function astralReplacer(c){
	// http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var high = c.charCodeAt(0);
	var low  = c.charCodeAt(1);
	var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
	return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}

function getInverse(inverse, re){
	function func(name){
		return inverse[name];
	}

	return function(data){
		return data
				.replace(re, func)
				.replace(re_astralSymbols, astralReplacer)
				.replace(re_nonASCII, singleCharReplacer);
	};
}

var re_xmlChars = getInverseReplacer(inverseXML);

function escapeXML(data){
	return data
			.replace(re_xmlChars, singleCharReplacer)
			.replace(re_astralSymbols, astralReplacer)
			.replace(re_nonASCII, singleCharReplacer);
}

exports.escape = escapeXML;


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

var entityMap = __webpack_require__(127),
    legacyMap = __webpack_require__(285),
    xmlMap    = __webpack_require__(174),
    decodeCodePoint = __webpack_require__(286);

var decodeXMLStrict  = getStrictDecoder(xmlMap),
    decodeHTMLStrict = getStrictDecoder(entityMap);

function getStrictDecoder(map){
	var keys = Object.keys(map).join("|"),
	    replace = getReplacer(map);

	keys += "|#[xX][\\da-fA-F]+|#\\d+";

	var re = new RegExp("&(?:" + keys + ");", "g");

	return function(str){
		return String(str).replace(re, replace);
	};
}

var decodeHTML = (function(){
	var legacy = Object.keys(legacyMap)
		.sort(sorter);

	var keys = Object.keys(entityMap)
		.sort(sorter);

	for(var i = 0, j = 0; i < keys.length; i++){
		if(legacy[j] === keys[i]){
			keys[i] += ";?";
			j++;
		} else {
			keys[i] += ";";
		}
	}

	var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g"),
	    replace = getReplacer(entityMap);

	function replacer(str){
		if(str.substr(-1) !== ";") str += ";";
		return replace(str);
	}

	//TODO consider creating a merged map
	return function(str){
		return String(str).replace(re, replacer);
	};
}());

function sorter(a, b){
	return a < b ? 1 : -1;
}

function getReplacer(map){
	return function replace(str){
		if(str.charAt(1) === "#"){
			if(str.charAt(2) === "X" || str.charAt(2) === "x"){
				return decodeCodePoint(parseInt(str.substr(3), 16));
			}
			return decodeCodePoint(parseInt(str.substr(2), 10));
		}
		return map[str.slice(1, -1)];
	};
}

module.exports = {
	XML: decodeXMLStrict,
	HTML: decodeHTML,
	HTMLStrict: decodeHTMLStrict
};

/***/ }),
/* 285 */
/***/ (function(module, exports) {

module.exports = {"Aacute":"Á","aacute":"á","Acirc":"Â","acirc":"â","acute":"´","AElig":"Æ","aelig":"æ","Agrave":"À","agrave":"à","amp":"&","AMP":"&","Aring":"Å","aring":"å","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","brvbar":"¦","Ccedil":"Ç","ccedil":"ç","cedil":"¸","cent":"¢","copy":"©","COPY":"©","curren":"¤","deg":"°","divide":"÷","Eacute":"É","eacute":"é","Ecirc":"Ê","ecirc":"ê","Egrave":"È","egrave":"è","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","frac12":"½","frac14":"¼","frac34":"¾","gt":">","GT":">","Iacute":"Í","iacute":"í","Icirc":"Î","icirc":"î","iexcl":"¡","Igrave":"Ì","igrave":"ì","iquest":"¿","Iuml":"Ï","iuml":"ï","laquo":"«","lt":"<","LT":"<","macr":"¯","micro":"µ","middot":"·","nbsp":" ","not":"¬","Ntilde":"Ñ","ntilde":"ñ","Oacute":"Ó","oacute":"ó","Ocirc":"Ô","ocirc":"ô","Ograve":"Ò","ograve":"ò","ordf":"ª","ordm":"º","Oslash":"Ø","oslash":"ø","Otilde":"Õ","otilde":"õ","Ouml":"Ö","ouml":"ö","para":"¶","plusmn":"±","pound":"£","quot":"\"","QUOT":"\"","raquo":"»","reg":"®","REG":"®","sect":"§","shy":"­","sup1":"¹","sup2":"²","sup3":"³","szlig":"ß","THORN":"Þ","thorn":"þ","times":"×","Uacute":"Ú","uacute":"ú","Ucirc":"Û","ucirc":"û","Ugrave":"Ù","ugrave":"ù","uml":"¨","Uuml":"Ü","uuml":"ü","Yacute":"Ý","yacute":"ý","yen":"¥","yuml":"ÿ"}

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

var decodeMap = __webpack_require__(287);

module.exports = decodeCodePoint;

// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint){

	if((codePoint >= 0xD800 && codePoint <= 0xDFFF) || codePoint > 0x10FFFF){
		return "\uFFFD";
	}

	if(codePoint in decodeMap){
		codePoint = decodeMap[codePoint];
	}

	var output = "";

	if(codePoint > 0xFFFF){
		codePoint -= 0x10000;
		output += String.fromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
		codePoint = 0xDC00 | codePoint & 0x3FF;
	}

	output += String.fromCharCode(codePoint);
	return output;
}


/***/ }),
/* 287 */
/***/ (function(module, exports) {

module.exports = {"0":65533,"128":8364,"130":8218,"131":402,"132":8222,"133":8230,"134":8224,"135":8225,"136":710,"137":8240,"138":352,"139":8249,"140":338,"142":381,"145":8216,"146":8217,"147":8220,"148":8221,"149":8226,"150":8211,"151":8212,"152":732,"153":8482,"154":353,"155":8250,"156":339,"158":382,"159":376}

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(141);
var common = __webpack_require__(121);
var normalizeReference = __webpack_require__(289);

var normalizeURI = common.normalizeURI;
var unescapeString = common.unescapeString;
var fromCodePoint = __webpack_require__(290);
var decodeHTML = __webpack_require__(173).decodeHTML;
__webpack_require__(291); // Polyfill for String.prototype.repeat

// Constants for character codes:

var C_NEWLINE = 10;
var C_ASTERISK = 42;
var C_UNDERSCORE = 95;
var C_BACKTICK = 96;
var C_OPEN_BRACKET = 91;
var C_CLOSE_BRACKET = 93;
var C_LESSTHAN = 60;
var C_BANG = 33;
var C_BACKSLASH = 92;
var C_AMPERSAND = 38;
var C_OPEN_PAREN = 40;
var C_CLOSE_PAREN = 41;
var C_COLON = 58;
var C_SINGLEQUOTE = 39;
var C_DOUBLEQUOTE = 34;

// Some regexps used in inline parser:

var ESCAPABLE = common.ESCAPABLE;
var ESCAPED_CHAR = '\\\\' + ESCAPABLE;

var ENTITY = common.ENTITY;
var reHtmlTag = common.reHtmlTag;

var rePunctuation = new RegExp(/[!"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/);

var reLinkTitle = new RegExp(
    '^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' +
        '|' +
        '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' +
        '|' +
        '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');

var reLinkDestinationBraces = new RegExp(
    '^(?:[<](?:[^ <>\\t\\n\\\\\\x00]' + '|' + ESCAPED_CHAR + '|' + '\\\\)*[>])');

var reEscapable = new RegExp('^' + ESCAPABLE);

var reEntityHere = new RegExp('^' + ENTITY, 'i');

var reTicks = /`+/;

var reTicksHere = /^`+/;

var reEllipses = /\.\.\./g;

var reDash = /--+/g;

var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;

var reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;

var reSpnl = /^ *(?:\n *)?/;

var reWhitespaceChar = /^[ \t\n\x0b\x0c\x0d]/;

var reWhitespace = /[ \t\n\x0b\x0c\x0d]+/g;

var reUnicodeWhitespaceChar = /^\s/;

var reFinalSpace = / *$/;

var reInitialSpace = /^ */;

var reSpaceAtEndOfLine = /^ *(?:\n|$)/;

var reLinkLabel = new RegExp('^\\[(?:[^\\\\\\[\\]]|' + ESCAPED_CHAR +
  '|\\\\){0,1000}\\]');

// Matches a string of non-special characters.
var reMain = /^[^\n`\[\]\\!<&*_'"]+/m;

var text = function(s) {
    var node = new Node('text');
    node._literal = s;
    return node;
};

// INLINE PARSER

// These are methods of an InlineParser object, defined below.
// An InlineParser keeps track of a subject (a string to be
// parsed) and a position in that subject.

// If re matches at current position in the subject, advance
// position in subject and return the match; otherwise return null.
var match = function(re) {
    var m = re.exec(this.subject.slice(this.pos));
    if (m === null) {
        return null;
    } else {
        this.pos += m.index + m[0].length;
        return m[0];
    }
};

// Returns the code for the character at the current subject position, or -1
// there are no more characters.
var peek = function() {
    if (this.pos < this.subject.length) {
        return this.subject.charCodeAt(this.pos);
    } else {
        return -1;
    }
};

// Parse zero or more space characters, including at most one newline
var spnl = function() {
    this.match(reSpnl);
    return true;
};

// All of the parsers below try to match something at the current position
// in the subject.  If they succeed in matching anything, they
// return the inline matched, advancing the subject.

// Attempt to parse backticks, adding either a backtick code span or a
// literal sequence of backticks.
var parseBackticks = function(block) {
    var ticks = this.match(reTicksHere);
    if (ticks === null) {
        return false;
    }
    var afterOpenTicks = this.pos;
    var matched;
    var node;
    while ((matched = this.match(reTicks)) !== null) {
        if (matched === ticks) {
            node = new Node('code');
            node._literal = this.subject.slice(afterOpenTicks,
                                        this.pos - ticks.length)
                          .trim().replace(reWhitespace, ' ');
            block.appendChild(node);
            return true;
        }
    }
    // If we got here, we didn't match a closing backtick sequence.
    this.pos = afterOpenTicks;
    block.appendChild(text(ticks));
    return true;
};

// Parse a backslash-escaped special character, adding either the escaped
// character, a hard line break (if the backslash is followed by a newline),
// or a literal backslash to the block's children.  Assumes current character
// is a backslash.
var parseBackslash = function(block) {
    var subj = this.subject;
    var node;
    this.pos += 1;
    if (this.peek() === C_NEWLINE) {
        this.pos += 1;
        node = new Node('linebreak');
        block.appendChild(node);
    } else if (reEscapable.test(subj.charAt(this.pos))) {
        block.appendChild(text(subj.charAt(this.pos)));
        this.pos += 1;
    } else {
        block.appendChild(text('\\'));
    }
    return true;
};

// Attempt to parse an autolink (URL or email in pointy brackets).
var parseAutolink = function(block) {
    var m;
    var dest;
    var node;
    if ((m = this.match(reEmailAutolink))) {
        dest = m.slice(1, m.length - 1);
        node = new Node('link');
        node._destination = normalizeURI('mailto:' + dest);
        node._title = '';
        node.appendChild(text(dest));
        block.appendChild(node);
        return true;
    } else if ((m = this.match(reAutolink))) {
        dest = m.slice(1, m.length - 1);
        node = new Node('link');
        node._destination = normalizeURI(dest);
        node._title = '';
        node.appendChild(text(dest));
        block.appendChild(node);
        return true;
    } else {
        return false;
    }
};

// Attempt to parse a raw HTML tag.
var parseHtmlTag = function(block) {
    var m = this.match(reHtmlTag);
    if (m === null) {
        return false;
    } else {
        var node = new Node('html_inline');
        node._literal = m;
        block.appendChild(node);
        return true;
    }
};

// Scan a sequence of characters with code cc, and return information about
// the number of delimiters and whether they are positioned such that
// they can open and/or close emphasis or strong emphasis.  A utility
// function for strong/emph parsing.
var scanDelims = function(cc) {
    var numdelims = 0;
    var char_before, char_after, cc_after;
    var startpos = this.pos;
    var left_flanking, right_flanking, can_open, can_close;
    var after_is_whitespace, after_is_punctuation, before_is_whitespace, before_is_punctuation;

    if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
        numdelims++;
        this.pos++;
    } else {
        while (this.peek() === cc) {
            numdelims++;
            this.pos++;
        }
    }

    if (numdelims === 0) {
        return null;
    }

    char_before = startpos === 0 ? '\n' : this.subject.charAt(startpos - 1);

    cc_after = this.peek();
    if (cc_after === -1) {
        char_after = '\n';
    } else {
        char_after = fromCodePoint(cc_after);
    }

    after_is_whitespace = reUnicodeWhitespaceChar.test(char_after);
    after_is_punctuation = rePunctuation.test(char_after);
    before_is_whitespace = reUnicodeWhitespaceChar.test(char_before);
    before_is_punctuation = rePunctuation.test(char_before);

    left_flanking = !after_is_whitespace &&
            (!after_is_punctuation || before_is_whitespace || before_is_punctuation);
    right_flanking = !before_is_whitespace &&
            (!before_is_punctuation || after_is_whitespace || after_is_punctuation);
    if (cc === C_UNDERSCORE) {
        can_open = left_flanking &&
            (!right_flanking || before_is_punctuation);
        can_close = right_flanking &&
            (!left_flanking || after_is_punctuation);
    } else if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
        can_open = left_flanking && !right_flanking;
        can_close = right_flanking;
    } else {
        can_open = left_flanking;
        can_close = right_flanking;
    }
    this.pos = startpos;
    return { numdelims: numdelims,
             can_open: can_open,
             can_close: can_close };
};

// Handle a delimiter marker for emphasis or a quote.
var handleDelim = function(cc, block) {
    var res = this.scanDelims(cc);
    if (!res) {
        return false;
    }
    var numdelims = res.numdelims;
    var startpos = this.pos;
    var contents;

    this.pos += numdelims;
    if (cc === C_SINGLEQUOTE) {
        contents = "\u2019";
    } else if (cc === C_DOUBLEQUOTE) {
        contents = "\u201C";
    } else {
        contents = this.subject.slice(startpos, this.pos);
    }
    var node = text(contents);
    block.appendChild(node);

    // Add entry to stack for this opener
    this.delimiters = { cc: cc,
                        numdelims: numdelims,
                        origdelims: numdelims,
                        node: node,
                        previous: this.delimiters,
                        next: null,
                        can_open: res.can_open,
                        can_close: res.can_close };
    if (this.delimiters.previous !== null) {
        this.delimiters.previous.next = this.delimiters;
    }

    return true;

};

var removeDelimiter = function(delim) {
    if (delim.previous !== null) {
        delim.previous.next = delim.next;
    }
    if (delim.next === null) {
        // top of stack
        this.delimiters = delim.previous;
    } else {
        delim.next.previous = delim.previous;
    }
};

var removeDelimitersBetween = function(bottom, top) {
    if (bottom.next !== top) {
        bottom.next = top;
        top.previous = bottom;
    }
};

var processEmphasis = function(stack_bottom) {
    var opener, closer, old_closer;
    var opener_inl, closer_inl;
    var tempstack;
    var use_delims;
    var tmp, next;
    var opener_found;
    var openers_bottom = [];
    var odd_match = false;

    openers_bottom[C_UNDERSCORE] = stack_bottom;
    openers_bottom[C_ASTERISK] = stack_bottom;
    openers_bottom[C_SINGLEQUOTE] = stack_bottom;
    openers_bottom[C_DOUBLEQUOTE] = stack_bottom;

    // find first closer above stack_bottom:
    closer = this.delimiters;
    while (closer !== null && closer.previous !== stack_bottom) {
        closer = closer.previous;
    }
    // move forward, looking for closers, and handling each
    while (closer !== null) {
        var closercc = closer.cc;
        if (!closer.can_close) {
            closer = closer.next;
        } else {
            // found emphasis closer. now look back for first matching opener:
            opener = closer.previous;
            opener_found = false;
            while (opener !== null && opener !== stack_bottom &&
                   opener !== openers_bottom[closercc]) {
                odd_match = (closer.can_open || opener.can_close) &&
                    (opener.origdelims + closer.origdelims) % 3 === 0;
                if (opener.cc === closer.cc && opener.can_open && !odd_match) {
                    opener_found = true;
                    break;
                }
                opener = opener.previous;
            }
            old_closer = closer;

            if (closercc === C_ASTERISK || closercc === C_UNDERSCORE) {
                if (!opener_found) {
                    closer = closer.next;
                } else {
                    // calculate actual number of delimiters used from closer
                    use_delims =
                      (closer.numdelims >= 2 && opener.numdelims >= 2) ? 2 : 1;

                    opener_inl = opener.node;
                    closer_inl = closer.node;

                    // remove used delimiters from stack elts and inlines
                    opener.numdelims -= use_delims;
                    closer.numdelims -= use_delims;
                    opener_inl._literal =
                        opener_inl._literal.slice(0,
                                                  opener_inl._literal.length - use_delims);
                    closer_inl._literal =
                        closer_inl._literal.slice(0,
                                                  closer_inl._literal.length - use_delims);

                    // build contents for new emph element
                    var emph = new Node(use_delims === 1 ? 'emph' : 'strong');

                    tmp = opener_inl._next;
                    while (tmp && tmp !== closer_inl) {
                        next = tmp._next;
                        tmp.unlink();
                        emph.appendChild(tmp);
                        tmp = next;
                    }

                    opener_inl.insertAfter(emph);

                    // remove elts between opener and closer in delimiters stack
                    removeDelimitersBetween(opener, closer);

                    // if opener has 0 delims, remove it and the inline
                    if (opener.numdelims === 0) {
                        opener_inl.unlink();
                        this.removeDelimiter(opener);
                    }

                    if (closer.numdelims === 0) {
                        closer_inl.unlink();
                        tempstack = closer.next;
                        this.removeDelimiter(closer);
                        closer = tempstack;
                    }

                }

            } else if (closercc === C_SINGLEQUOTE) {
                closer.node._literal = "\u2019";
                if (opener_found) {
                    opener.node._literal = "\u2018";
                }
                closer = closer.next;

            } else if (closercc === C_DOUBLEQUOTE) {
                closer.node._literal = "\u201D";
                if (opener_found) {
                    opener.node.literal = "\u201C";
                }
                closer = closer.next;

            }
            if (!opener_found && !odd_match) {
                // Set lower bound for future searches for openers:
                // We don't do this with odd_match because a **
                // that doesn't match an earlier * might turn into
                // an opener, and the * might be matched by something
                // else.
                openers_bottom[closercc] = old_closer.previous;
                if (!old_closer.can_open) {
                    // We can remove a closer that can't be an opener,
                    // once we've seen there's no matching opener:
                    this.removeDelimiter(old_closer);
                }
            }
        }

    }

    // remove all delimiters
    while (this.delimiters !== null && this.delimiters !== stack_bottom) {
        this.removeDelimiter(this.delimiters);
    }
};

// Attempt to parse link title (sans quotes), returning the string
// or null if no match.
var parseLinkTitle = function() {
    var title = this.match(reLinkTitle);
    if (title === null) {
        return null;
    } else {
        // chop off quotes from title and unescape:
        return unescapeString(title.substr(1, title.length - 2));
    }
};

// Attempt to parse link destination, returning the string or
// null if no match.
var parseLinkDestination = function() {
    var res = this.match(reLinkDestinationBraces);
    if (res === null) {
        // TODO handrolled parser; res should be null or the string
        var savepos = this.pos;
        var openparens = 0;
        var c;
        while ((c = this.peek()) !== -1) {
            if (c === C_BACKSLASH) {
                this.pos += 1;
                if (this.peek() !== -1) {
                    this.pos += 1;
                }
            } else if (c === C_OPEN_PAREN) {
                this.pos += 1;
                openparens += 1;
            } else if (c === C_CLOSE_PAREN) {
                if (openparens < 1) {
                    break;
                } else {
                    this.pos += 1;
                    openparens -= 1;
                }
            } else if (reWhitespaceChar.exec(fromCodePoint(c)) !== null) {
                break;
            } else {
                this.pos += 1;
            }
        }
        res = this.subject.substr(savepos, this.pos - savepos);
        return normalizeURI(unescapeString(res));
    } else {  // chop off surrounding <..>:
        return normalizeURI(unescapeString(res.substr(1, res.length - 2)));
    }
};

// Attempt to parse a link label, returning number of characters parsed.
var parseLinkLabel = function() {
    var m = this.match(reLinkLabel);
    // Note:  our regex will allow something of form [..\];
    // we disallow it here rather than using lookahead in the regex:
    if (m === null || m.length > 1001 || /[^\\]\\\]$/.exec(m)) {
        return 0;
    } else {
        return m.length;
    }
};

// Add open bracket to delimiter stack and add a text node to block's children.
var parseOpenBracket = function(block) {
    var startpos = this.pos;
    this.pos += 1;

    var node = text('[');
    block.appendChild(node);

    // Add entry to stack for this opener
    this.addBracket(node, startpos, false);
    return true;
};

// IF next character is [, and ! delimiter to delimiter stack and
// add a text node to block's children.  Otherwise just add a text node.
var parseBang = function(block) {
    var startpos = this.pos;
    this.pos += 1;
    if (this.peek() === C_OPEN_BRACKET) {
        this.pos += 1;

        var node = text('![');
        block.appendChild(node);

        // Add entry to stack for this opener
        this.addBracket(node, startpos + 1, true);
    } else {
        block.appendChild(text('!'));
    }
    return true;
};

// Try to match close bracket against an opening in the delimiter
// stack.  Add either a link or image, or a plain [ character,
// to block's children.  If there is a matching delimiter,
// remove it from the delimiter stack.
var parseCloseBracket = function(block) {
    var startpos;
    var is_image;
    var dest;
    var title;
    var matched = false;
    var reflabel;
    var opener;

    this.pos += 1;
    startpos = this.pos;

    // get last [ or ![
    opener = this.brackets;

    if (opener === null) {
        // no matched opener, just return a literal
        block.appendChild(text(']'));
        return true;
    }

    if (!opener.active) {
        // no matched opener, just return a literal
        block.appendChild(text(']'));
        // take opener off brackets stack
        this.removeBracket();
        return true;
    }

    // If we got here, open is a potential opener
    is_image = opener.image;

    // Check to see if we have a link/image

    var savepos = this.pos;

    // Inline link?
    if (this.peek() === C_OPEN_PAREN) {
        this.pos++;
        if (this.spnl() &&
            ((dest = this.parseLinkDestination()) !== null) &&
            this.spnl() &&
            // make sure there's a space before the title:
            (reWhitespaceChar.test(this.subject.charAt(this.pos - 1)) &&
             (title = this.parseLinkTitle()) || true) &&
            this.spnl() &&
            this.peek() === C_CLOSE_PAREN) {
            this.pos += 1;
            matched = true;
        } else {
            this.pos = savepos;
        }
    }

    if (!matched) {

        // Next, see if there's a link label
        var beforelabel = this.pos;
        var n = this.parseLinkLabel();
        if (n > 2) {
            reflabel = this.subject.slice(beforelabel, beforelabel + n);
        } else if (!opener.bracketAfter) {
            // Empty or missing second label means to use the first label as the reference.
            // The reference must not contain a bracket. If we know there's a bracket, we don't even bother checking it.
            reflabel = this.subject.slice(opener.index, startpos);
        }
        if (n === 0) {
            // If shortcut reference link, rewind before spaces we skipped.
            this.pos = savepos;
        }

        if (reflabel) {
            // lookup rawlabel in refmap
            var link = this.refmap[normalizeReference(reflabel)];
            if (link) {
                dest = link.destination;
                title = link.title;
                matched = true;
            }
        }
    }

    if (matched) {
        var node = new Node(is_image ? 'image' : 'link');
        node._destination = dest;
        node._title = title || '';

        var tmp, next;
        tmp = opener.node._next;
        while (tmp) {
            next = tmp._next;
            tmp.unlink();
            node.appendChild(tmp);
            tmp = next;
        }
        block.appendChild(node);
        this.processEmphasis(opener.previousDelimiter);
        this.removeBracket();
        opener.node.unlink();

        // We remove this bracket and processEmphasis will remove later delimiters.
        // Now, for a link, we also deactivate earlier link openers.
        // (no links in links)
        if (!is_image) {
          opener = this.brackets;
          while (opener !== null) {
            if (!opener.image) {
                opener.active = false; // deactivate this opener
            }
            opener = opener.previous;
          }
        }

        return true;

    } else { // no match

        this.removeBracket();  // remove this opener from stack
        this.pos = startpos;
        block.appendChild(text(']'));
        return true;
    }

};

var addBracket = function(node, index, image) {
    if (this.brackets !== null) {
        this.brackets.bracketAfter = true;
    }
    this.brackets = { node: node,
                      previous: this.brackets,
                      previousDelimiter: this.delimiters,
                      index: index,
                      image: image,
                      active: true };
};

var removeBracket = function() {
    this.brackets = this.brackets.previous;
};

// Attempt to parse an entity.
var parseEntity = function(block) {
    var m;
    if ((m = this.match(reEntityHere))) {
        block.appendChild(text(decodeHTML(m)));
        return true;
    } else {
        return false;
    }
};

// Parse a run of ordinary characters, or a single character with
// a special meaning in markdown, as a plain string.
var parseString = function(block) {
    var m;
    if ((m = this.match(reMain))) {
        if (this.options.smart) {
            block.appendChild(text(
                m.replace(reEllipses, "\u2026")
                    .replace(reDash, function(chars) {
                        var enCount = 0;
                        var emCount = 0;
                        if (chars.length % 3 === 0) { // If divisible by 3, use all em dashes
                            emCount = chars.length / 3;
                        } else if (chars.length % 2 === 0) { // If divisible by 2, use all en dashes
                            enCount = chars.length / 2;
                        } else if (chars.length % 3 === 2) { // If 2 extra dashes, use en dash for last 2; em dashes for rest
                            enCount = 1;
                            emCount = (chars.length - 2) / 3;
                        } else { // Use en dashes for last 4 hyphens; em dashes for rest
                            enCount = 2;
                            emCount = (chars.length - 4) / 3;
                        }
                        return "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
                    })));
        } else {
            block.appendChild(text(m));
        }
        return true;
    } else {
        return false;
    }
};

// Parse a newline.  If it was preceded by two spaces, return a hard
// line break; otherwise a soft line break.
var parseNewline = function(block) {
    this.pos += 1; // assume we're at a \n
    // check previous node for trailing spaces
    var lastc = block._lastChild;
    if (lastc && lastc.type === 'text' && lastc._literal[lastc._literal.length - 1] === ' ') {
        var hardbreak = lastc._literal[lastc._literal.length - 2] === ' ';
        lastc._literal = lastc._literal.replace(reFinalSpace, '');
        block.appendChild(new Node(hardbreak ? 'linebreak' : 'softbreak'));
    } else {
        block.appendChild(new Node('softbreak'));
    }
    this.match(reInitialSpace); // gobble leading spaces in next line
    return true;
};

// Attempt to parse a link reference, modifying refmap.
var parseReference = function(s, refmap) {
    this.subject = s;
    this.pos = 0;
    var rawlabel;
    var dest;
    var title;
    var matchChars;
    var startpos = this.pos;

    // label:
    matchChars = this.parseLinkLabel();
    if (matchChars === 0) {
        return 0;
    } else {
        rawlabel = this.subject.substr(0, matchChars);
    }

    // colon:
    if (this.peek() === C_COLON) {
        this.pos++;
    } else {
        this.pos = startpos;
        return 0;
    }

    //  link url
    this.spnl();

    dest = this.parseLinkDestination();
    if (dest === null || dest.length === 0) {
        this.pos = startpos;
        return 0;
    }

    var beforetitle = this.pos;
    this.spnl();
    title = this.parseLinkTitle();
    if (title === null) {
        title = '';
        // rewind before spaces
        this.pos = beforetitle;
    }

    // make sure we're at line end:
    var atLineEnd = true;
    if (this.match(reSpaceAtEndOfLine) === null) {
        if (title === '') {
            atLineEnd = false;
        } else {
            // the potential title we found is not at the line end,
            // but it could still be a legal link reference if we
            // discard the title
            title = '';
            // rewind before spaces
            this.pos = beforetitle;
            // and instead check if the link URL is at the line end
            atLineEnd = this.match(reSpaceAtEndOfLine) !== null;
        }
    }

    if (!atLineEnd) {
        this.pos = startpos;
        return 0;
    }

    var normlabel = normalizeReference(rawlabel);
    if (normlabel === '') {
        // label must contain non-whitespace characters
        this.pos = startpos;
        return 0;
    }

    if (!refmap[normlabel]) {
        refmap[normlabel] = { destination: dest, title: title };
    }
    return this.pos - startpos;
};

// Parse the next inline element in subject, advancing subject position.
// On success, add the result to block's children and return true.
// On failure, return false.
var parseInline = function(block) {
    var res = false;
    var c = this.peek();
    if (c === -1) {
        return false;
    }
    switch(c) {
    case C_NEWLINE:
        res = this.parseNewline(block);
        break;
    case C_BACKSLASH:
        res = this.parseBackslash(block);
        break;
    case C_BACKTICK:
        res = this.parseBackticks(block);
        break;
    case C_ASTERISK:
    case C_UNDERSCORE:
        res = this.handleDelim(c, block);
        break;
    case C_SINGLEQUOTE:
    case C_DOUBLEQUOTE:
        res = this.options.smart && this.handleDelim(c, block);
        break;
    case C_OPEN_BRACKET:
        res = this.parseOpenBracket(block);
        break;
    case C_BANG:
        res = this.parseBang(block);
        break;
    case C_CLOSE_BRACKET:
        res = this.parseCloseBracket(block);
        break;
    case C_LESSTHAN:
        res = this.parseAutolink(block) || this.parseHtmlTag(block);
        break;
    case C_AMPERSAND:
        res = this.parseEntity(block);
        break;
    default:
        res = this.parseString(block);
        break;
    }
    if (!res) {
        this.pos += 1;
        block.appendChild(text(fromCodePoint(c)));
    }

    return true;
};

// Parse string content in block into inline children,
// using refmap to resolve references.
var parseInlines = function(block) {
    this.subject = block._string_content.trim();
    this.pos = 0;
    this.delimiters = null;
    this.brackets = null;
    while (this.parseInline(block)) {
    }
    block._string_content = null; // allow raw string to be garbage collected
    this.processEmphasis(null);
};

// The InlineParser object.
function InlineParser(options){
    return {
        subject: '',
        delimiters: null,  // used by handleDelim method
        brackets: null,
        pos: 0,
        refmap: {},
        match: match,
        peek: peek,
        spnl: spnl,
        parseBackticks: parseBackticks,
        parseBackslash: parseBackslash,
        parseAutolink: parseAutolink,
        parseHtmlTag: parseHtmlTag,
        scanDelims: scanDelims,
        handleDelim: handleDelim,
        parseLinkTitle: parseLinkTitle,
        parseLinkDestination: parseLinkDestination,
        parseLinkLabel: parseLinkLabel,
        parseOpenBracket: parseOpenBracket,
        parseBang: parseBang,
        parseCloseBracket: parseCloseBracket,
        addBracket: addBracket,
        removeBracket: removeBracket,
        parseEntity: parseEntity,
        parseString: parseString,
        parseNewline: parseNewline,
        parseReference: parseReference,
        parseInline: parseInline,
        processEmphasis: processEmphasis,
        removeDelimiter: removeDelimiter,
        options: options || {},
        parse: parseInlines
    };
}

module.exports = InlineParser;


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* The bulk of this code derives from https://github.com/dmoscrop/fold-case
But in addition to case-folding, we also normalize whitespace.

fold-case is Copyright Mathias Bynens <https://mathiasbynens.be/>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*eslint-disable  key-spacing, comma-spacing */

var regex = /[ \t\r\n]+|[A-Z\xB5\xC0-\xD6\xD8-\xDF\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u0149\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u017F\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C5\u01C7\u01C8\u01CA\u01CB\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F0-\u01F2\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0345\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03AB\u03B0\u03C2\u03CF-\u03D1\u03D5\u03D6\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F0\u03F1\u03F4\u03F5\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u0587\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E96-\u1E9B\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F50\u1F52\u1F54\u1F56\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1F80-\u1FAF\u1FB2-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD2\u1FD3\u1FD6-\u1FDB\u1FE2-\u1FE4\u1FE6-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A\u212B\u2132\u2160-\u216F\u2183\u24B6-\u24CF\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AD\uA7B0\uA7B1\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27]|\uD806[\uDCA0-\uDCBF]/g;

var map = {'A':'a','B':'b','C':'c','D':'d','E':'e','F':'f','G':'g','H':'h','I':'i','J':'j','K':'k','L':'l','M':'m','N':'n','O':'o','P':'p','Q':'q','R':'r','S':'s','T':'t','U':'u','V':'v','W':'w','X':'x','Y':'y','Z':'z','\xB5':'\u03BC','\xC0':'\xE0','\xC1':'\xE1','\xC2':'\xE2','\xC3':'\xE3','\xC4':'\xE4','\xC5':'\xE5','\xC6':'\xE6','\xC7':'\xE7','\xC8':'\xE8','\xC9':'\xE9','\xCA':'\xEA','\xCB':'\xEB','\xCC':'\xEC','\xCD':'\xED','\xCE':'\xEE','\xCF':'\xEF','\xD0':'\xF0','\xD1':'\xF1','\xD2':'\xF2','\xD3':'\xF3','\xD4':'\xF4','\xD5':'\xF5','\xD6':'\xF6','\xD8':'\xF8','\xD9':'\xF9','\xDA':'\xFA','\xDB':'\xFB','\xDC':'\xFC','\xDD':'\xFD','\xDE':'\xFE','\u0100':'\u0101','\u0102':'\u0103','\u0104':'\u0105','\u0106':'\u0107','\u0108':'\u0109','\u010A':'\u010B','\u010C':'\u010D','\u010E':'\u010F','\u0110':'\u0111','\u0112':'\u0113','\u0114':'\u0115','\u0116':'\u0117','\u0118':'\u0119','\u011A':'\u011B','\u011C':'\u011D','\u011E':'\u011F','\u0120':'\u0121','\u0122':'\u0123','\u0124':'\u0125','\u0126':'\u0127','\u0128':'\u0129','\u012A':'\u012B','\u012C':'\u012D','\u012E':'\u012F','\u0132':'\u0133','\u0134':'\u0135','\u0136':'\u0137','\u0139':'\u013A','\u013B':'\u013C','\u013D':'\u013E','\u013F':'\u0140','\u0141':'\u0142','\u0143':'\u0144','\u0145':'\u0146','\u0147':'\u0148','\u014A':'\u014B','\u014C':'\u014D','\u014E':'\u014F','\u0150':'\u0151','\u0152':'\u0153','\u0154':'\u0155','\u0156':'\u0157','\u0158':'\u0159','\u015A':'\u015B','\u015C':'\u015D','\u015E':'\u015F','\u0160':'\u0161','\u0162':'\u0163','\u0164':'\u0165','\u0166':'\u0167','\u0168':'\u0169','\u016A':'\u016B','\u016C':'\u016D','\u016E':'\u016F','\u0170':'\u0171','\u0172':'\u0173','\u0174':'\u0175','\u0176':'\u0177','\u0178':'\xFF','\u0179':'\u017A','\u017B':'\u017C','\u017D':'\u017E','\u017F':'s','\u0181':'\u0253','\u0182':'\u0183','\u0184':'\u0185','\u0186':'\u0254','\u0187':'\u0188','\u0189':'\u0256','\u018A':'\u0257','\u018B':'\u018C','\u018E':'\u01DD','\u018F':'\u0259','\u0190':'\u025B','\u0191':'\u0192','\u0193':'\u0260','\u0194':'\u0263','\u0196':'\u0269','\u0197':'\u0268','\u0198':'\u0199','\u019C':'\u026F','\u019D':'\u0272','\u019F':'\u0275','\u01A0':'\u01A1','\u01A2':'\u01A3','\u01A4':'\u01A5','\u01A6':'\u0280','\u01A7':'\u01A8','\u01A9':'\u0283','\u01AC':'\u01AD','\u01AE':'\u0288','\u01AF':'\u01B0','\u01B1':'\u028A','\u01B2':'\u028B','\u01B3':'\u01B4','\u01B5':'\u01B6','\u01B7':'\u0292','\u01B8':'\u01B9','\u01BC':'\u01BD','\u01C4':'\u01C6','\u01C5':'\u01C6','\u01C7':'\u01C9','\u01C8':'\u01C9','\u01CA':'\u01CC','\u01CB':'\u01CC','\u01CD':'\u01CE','\u01CF':'\u01D0','\u01D1':'\u01D2','\u01D3':'\u01D4','\u01D5':'\u01D6','\u01D7':'\u01D8','\u01D9':'\u01DA','\u01DB':'\u01DC','\u01DE':'\u01DF','\u01E0':'\u01E1','\u01E2':'\u01E3','\u01E4':'\u01E5','\u01E6':'\u01E7','\u01E8':'\u01E9','\u01EA':'\u01EB','\u01EC':'\u01ED','\u01EE':'\u01EF','\u01F1':'\u01F3','\u01F2':'\u01F3','\u01F4':'\u01F5','\u01F6':'\u0195','\u01F7':'\u01BF','\u01F8':'\u01F9','\u01FA':'\u01FB','\u01FC':'\u01FD','\u01FE':'\u01FF','\u0200':'\u0201','\u0202':'\u0203','\u0204':'\u0205','\u0206':'\u0207','\u0208':'\u0209','\u020A':'\u020B','\u020C':'\u020D','\u020E':'\u020F','\u0210':'\u0211','\u0212':'\u0213','\u0214':'\u0215','\u0216':'\u0217','\u0218':'\u0219','\u021A':'\u021B','\u021C':'\u021D','\u021E':'\u021F','\u0220':'\u019E','\u0222':'\u0223','\u0224':'\u0225','\u0226':'\u0227','\u0228':'\u0229','\u022A':'\u022B','\u022C':'\u022D','\u022E':'\u022F','\u0230':'\u0231','\u0232':'\u0233','\u023A':'\u2C65','\u023B':'\u023C','\u023D':'\u019A','\u023E':'\u2C66','\u0241':'\u0242','\u0243':'\u0180','\u0244':'\u0289','\u0245':'\u028C','\u0246':'\u0247','\u0248':'\u0249','\u024A':'\u024B','\u024C':'\u024D','\u024E':'\u024F','\u0345':'\u03B9','\u0370':'\u0371','\u0372':'\u0373','\u0376':'\u0377','\u037F':'\u03F3','\u0386':'\u03AC','\u0388':'\u03AD','\u0389':'\u03AE','\u038A':'\u03AF','\u038C':'\u03CC','\u038E':'\u03CD','\u038F':'\u03CE','\u0391':'\u03B1','\u0392':'\u03B2','\u0393':'\u03B3','\u0394':'\u03B4','\u0395':'\u03B5','\u0396':'\u03B6','\u0397':'\u03B7','\u0398':'\u03B8','\u0399':'\u03B9','\u039A':'\u03BA','\u039B':'\u03BB','\u039C':'\u03BC','\u039D':'\u03BD','\u039E':'\u03BE','\u039F':'\u03BF','\u03A0':'\u03C0','\u03A1':'\u03C1','\u03A3':'\u03C3','\u03A4':'\u03C4','\u03A5':'\u03C5','\u03A6':'\u03C6','\u03A7':'\u03C7','\u03A8':'\u03C8','\u03A9':'\u03C9','\u03AA':'\u03CA','\u03AB':'\u03CB','\u03C2':'\u03C3','\u03CF':'\u03D7','\u03D0':'\u03B2','\u03D1':'\u03B8','\u03D5':'\u03C6','\u03D6':'\u03C0','\u03D8':'\u03D9','\u03DA':'\u03DB','\u03DC':'\u03DD','\u03DE':'\u03DF','\u03E0':'\u03E1','\u03E2':'\u03E3','\u03E4':'\u03E5','\u03E6':'\u03E7','\u03E8':'\u03E9','\u03EA':'\u03EB','\u03EC':'\u03ED','\u03EE':'\u03EF','\u03F0':'\u03BA','\u03F1':'\u03C1','\u03F4':'\u03B8','\u03F5':'\u03B5','\u03F7':'\u03F8','\u03F9':'\u03F2','\u03FA':'\u03FB','\u03FD':'\u037B','\u03FE':'\u037C','\u03FF':'\u037D','\u0400':'\u0450','\u0401':'\u0451','\u0402':'\u0452','\u0403':'\u0453','\u0404':'\u0454','\u0405':'\u0455','\u0406':'\u0456','\u0407':'\u0457','\u0408':'\u0458','\u0409':'\u0459','\u040A':'\u045A','\u040B':'\u045B','\u040C':'\u045C','\u040D':'\u045D','\u040E':'\u045E','\u040F':'\u045F','\u0410':'\u0430','\u0411':'\u0431','\u0412':'\u0432','\u0413':'\u0433','\u0414':'\u0434','\u0415':'\u0435','\u0416':'\u0436','\u0417':'\u0437','\u0418':'\u0438','\u0419':'\u0439','\u041A':'\u043A','\u041B':'\u043B','\u041C':'\u043C','\u041D':'\u043D','\u041E':'\u043E','\u041F':'\u043F','\u0420':'\u0440','\u0421':'\u0441','\u0422':'\u0442','\u0423':'\u0443','\u0424':'\u0444','\u0425':'\u0445','\u0426':'\u0446','\u0427':'\u0447','\u0428':'\u0448','\u0429':'\u0449','\u042A':'\u044A','\u042B':'\u044B','\u042C':'\u044C','\u042D':'\u044D','\u042E':'\u044E','\u042F':'\u044F','\u0460':'\u0461','\u0462':'\u0463','\u0464':'\u0465','\u0466':'\u0467','\u0468':'\u0469','\u046A':'\u046B','\u046C':'\u046D','\u046E':'\u046F','\u0470':'\u0471','\u0472':'\u0473','\u0474':'\u0475','\u0476':'\u0477','\u0478':'\u0479','\u047A':'\u047B','\u047C':'\u047D','\u047E':'\u047F','\u0480':'\u0481','\u048A':'\u048B','\u048C':'\u048D','\u048E':'\u048F','\u0490':'\u0491','\u0492':'\u0493','\u0494':'\u0495','\u0496':'\u0497','\u0498':'\u0499','\u049A':'\u049B','\u049C':'\u049D','\u049E':'\u049F','\u04A0':'\u04A1','\u04A2':'\u04A3','\u04A4':'\u04A5','\u04A6':'\u04A7','\u04A8':'\u04A9','\u04AA':'\u04AB','\u04AC':'\u04AD','\u04AE':'\u04AF','\u04B0':'\u04B1','\u04B2':'\u04B3','\u04B4':'\u04B5','\u04B6':'\u04B7','\u04B8':'\u04B9','\u04BA':'\u04BB','\u04BC':'\u04BD','\u04BE':'\u04BF','\u04C0':'\u04CF','\u04C1':'\u04C2','\u04C3':'\u04C4','\u04C5':'\u04C6','\u04C7':'\u04C8','\u04C9':'\u04CA','\u04CB':'\u04CC','\u04CD':'\u04CE','\u04D0':'\u04D1','\u04D2':'\u04D3','\u04D4':'\u04D5','\u04D6':'\u04D7','\u04D8':'\u04D9','\u04DA':'\u04DB','\u04DC':'\u04DD','\u04DE':'\u04DF','\u04E0':'\u04E1','\u04E2':'\u04E3','\u04E4':'\u04E5','\u04E6':'\u04E7','\u04E8':'\u04E9','\u04EA':'\u04EB','\u04EC':'\u04ED','\u04EE':'\u04EF','\u04F0':'\u04F1','\u04F2':'\u04F3','\u04F4':'\u04F5','\u04F6':'\u04F7','\u04F8':'\u04F9','\u04FA':'\u04FB','\u04FC':'\u04FD','\u04FE':'\u04FF','\u0500':'\u0501','\u0502':'\u0503','\u0504':'\u0505','\u0506':'\u0507','\u0508':'\u0509','\u050A':'\u050B','\u050C':'\u050D','\u050E':'\u050F','\u0510':'\u0511','\u0512':'\u0513','\u0514':'\u0515','\u0516':'\u0517','\u0518':'\u0519','\u051A':'\u051B','\u051C':'\u051D','\u051E':'\u051F','\u0520':'\u0521','\u0522':'\u0523','\u0524':'\u0525','\u0526':'\u0527','\u0528':'\u0529','\u052A':'\u052B','\u052C':'\u052D','\u052E':'\u052F','\u0531':'\u0561','\u0532':'\u0562','\u0533':'\u0563','\u0534':'\u0564','\u0535':'\u0565','\u0536':'\u0566','\u0537':'\u0567','\u0538':'\u0568','\u0539':'\u0569','\u053A':'\u056A','\u053B':'\u056B','\u053C':'\u056C','\u053D':'\u056D','\u053E':'\u056E','\u053F':'\u056F','\u0540':'\u0570','\u0541':'\u0571','\u0542':'\u0572','\u0543':'\u0573','\u0544':'\u0574','\u0545':'\u0575','\u0546':'\u0576','\u0547':'\u0577','\u0548':'\u0578','\u0549':'\u0579','\u054A':'\u057A','\u054B':'\u057B','\u054C':'\u057C','\u054D':'\u057D','\u054E':'\u057E','\u054F':'\u057F','\u0550':'\u0580','\u0551':'\u0581','\u0552':'\u0582','\u0553':'\u0583','\u0554':'\u0584','\u0555':'\u0585','\u0556':'\u0586','\u10A0':'\u2D00','\u10A1':'\u2D01','\u10A2':'\u2D02','\u10A3':'\u2D03','\u10A4':'\u2D04','\u10A5':'\u2D05','\u10A6':'\u2D06','\u10A7':'\u2D07','\u10A8':'\u2D08','\u10A9':'\u2D09','\u10AA':'\u2D0A','\u10AB':'\u2D0B','\u10AC':'\u2D0C','\u10AD':'\u2D0D','\u10AE':'\u2D0E','\u10AF':'\u2D0F','\u10B0':'\u2D10','\u10B1':'\u2D11','\u10B2':'\u2D12','\u10B3':'\u2D13','\u10B4':'\u2D14','\u10B5':'\u2D15','\u10B6':'\u2D16','\u10B7':'\u2D17','\u10B8':'\u2D18','\u10B9':'\u2D19','\u10BA':'\u2D1A','\u10BB':'\u2D1B','\u10BC':'\u2D1C','\u10BD':'\u2D1D','\u10BE':'\u2D1E','\u10BF':'\u2D1F','\u10C0':'\u2D20','\u10C1':'\u2D21','\u10C2':'\u2D22','\u10C3':'\u2D23','\u10C4':'\u2D24','\u10C5':'\u2D25','\u10C7':'\u2D27','\u10CD':'\u2D2D','\u1E00':'\u1E01','\u1E02':'\u1E03','\u1E04':'\u1E05','\u1E06':'\u1E07','\u1E08':'\u1E09','\u1E0A':'\u1E0B','\u1E0C':'\u1E0D','\u1E0E':'\u1E0F','\u1E10':'\u1E11','\u1E12':'\u1E13','\u1E14':'\u1E15','\u1E16':'\u1E17','\u1E18':'\u1E19','\u1E1A':'\u1E1B','\u1E1C':'\u1E1D','\u1E1E':'\u1E1F','\u1E20':'\u1E21','\u1E22':'\u1E23','\u1E24':'\u1E25','\u1E26':'\u1E27','\u1E28':'\u1E29','\u1E2A':'\u1E2B','\u1E2C':'\u1E2D','\u1E2E':'\u1E2F','\u1E30':'\u1E31','\u1E32':'\u1E33','\u1E34':'\u1E35','\u1E36':'\u1E37','\u1E38':'\u1E39','\u1E3A':'\u1E3B','\u1E3C':'\u1E3D','\u1E3E':'\u1E3F','\u1E40':'\u1E41','\u1E42':'\u1E43','\u1E44':'\u1E45','\u1E46':'\u1E47','\u1E48':'\u1E49','\u1E4A':'\u1E4B','\u1E4C':'\u1E4D','\u1E4E':'\u1E4F','\u1E50':'\u1E51','\u1E52':'\u1E53','\u1E54':'\u1E55','\u1E56':'\u1E57','\u1E58':'\u1E59','\u1E5A':'\u1E5B','\u1E5C':'\u1E5D','\u1E5E':'\u1E5F','\u1E60':'\u1E61','\u1E62':'\u1E63','\u1E64':'\u1E65','\u1E66':'\u1E67','\u1E68':'\u1E69','\u1E6A':'\u1E6B','\u1E6C':'\u1E6D','\u1E6E':'\u1E6F','\u1E70':'\u1E71','\u1E72':'\u1E73','\u1E74':'\u1E75','\u1E76':'\u1E77','\u1E78':'\u1E79','\u1E7A':'\u1E7B','\u1E7C':'\u1E7D','\u1E7E':'\u1E7F','\u1E80':'\u1E81','\u1E82':'\u1E83','\u1E84':'\u1E85','\u1E86':'\u1E87','\u1E88':'\u1E89','\u1E8A':'\u1E8B','\u1E8C':'\u1E8D','\u1E8E':'\u1E8F','\u1E90':'\u1E91','\u1E92':'\u1E93','\u1E94':'\u1E95','\u1E9B':'\u1E61','\u1EA0':'\u1EA1','\u1EA2':'\u1EA3','\u1EA4':'\u1EA5','\u1EA6':'\u1EA7','\u1EA8':'\u1EA9','\u1EAA':'\u1EAB','\u1EAC':'\u1EAD','\u1EAE':'\u1EAF','\u1EB0':'\u1EB1','\u1EB2':'\u1EB3','\u1EB4':'\u1EB5','\u1EB6':'\u1EB7','\u1EB8':'\u1EB9','\u1EBA':'\u1EBB','\u1EBC':'\u1EBD','\u1EBE':'\u1EBF','\u1EC0':'\u1EC1','\u1EC2':'\u1EC3','\u1EC4':'\u1EC5','\u1EC6':'\u1EC7','\u1EC8':'\u1EC9','\u1ECA':'\u1ECB','\u1ECC':'\u1ECD','\u1ECE':'\u1ECF','\u1ED0':'\u1ED1','\u1ED2':'\u1ED3','\u1ED4':'\u1ED5','\u1ED6':'\u1ED7','\u1ED8':'\u1ED9','\u1EDA':'\u1EDB','\u1EDC':'\u1EDD','\u1EDE':'\u1EDF','\u1EE0':'\u1EE1','\u1EE2':'\u1EE3','\u1EE4':'\u1EE5','\u1EE6':'\u1EE7','\u1EE8':'\u1EE9','\u1EEA':'\u1EEB','\u1EEC':'\u1EED','\u1EEE':'\u1EEF','\u1EF0':'\u1EF1','\u1EF2':'\u1EF3','\u1EF4':'\u1EF5','\u1EF6':'\u1EF7','\u1EF8':'\u1EF9','\u1EFA':'\u1EFB','\u1EFC':'\u1EFD','\u1EFE':'\u1EFF','\u1F08':'\u1F00','\u1F09':'\u1F01','\u1F0A':'\u1F02','\u1F0B':'\u1F03','\u1F0C':'\u1F04','\u1F0D':'\u1F05','\u1F0E':'\u1F06','\u1F0F':'\u1F07','\u1F18':'\u1F10','\u1F19':'\u1F11','\u1F1A':'\u1F12','\u1F1B':'\u1F13','\u1F1C':'\u1F14','\u1F1D':'\u1F15','\u1F28':'\u1F20','\u1F29':'\u1F21','\u1F2A':'\u1F22','\u1F2B':'\u1F23','\u1F2C':'\u1F24','\u1F2D':'\u1F25','\u1F2E':'\u1F26','\u1F2F':'\u1F27','\u1F38':'\u1F30','\u1F39':'\u1F31','\u1F3A':'\u1F32','\u1F3B':'\u1F33','\u1F3C':'\u1F34','\u1F3D':'\u1F35','\u1F3E':'\u1F36','\u1F3F':'\u1F37','\u1F48':'\u1F40','\u1F49':'\u1F41','\u1F4A':'\u1F42','\u1F4B':'\u1F43','\u1F4C':'\u1F44','\u1F4D':'\u1F45','\u1F59':'\u1F51','\u1F5B':'\u1F53','\u1F5D':'\u1F55','\u1F5F':'\u1F57','\u1F68':'\u1F60','\u1F69':'\u1F61','\u1F6A':'\u1F62','\u1F6B':'\u1F63','\u1F6C':'\u1F64','\u1F6D':'\u1F65','\u1F6E':'\u1F66','\u1F6F':'\u1F67','\u1FB8':'\u1FB0','\u1FB9':'\u1FB1','\u1FBA':'\u1F70','\u1FBB':'\u1F71','\u1FBE':'\u03B9','\u1FC8':'\u1F72','\u1FC9':'\u1F73','\u1FCA':'\u1F74','\u1FCB':'\u1F75','\u1FD8':'\u1FD0','\u1FD9':'\u1FD1','\u1FDA':'\u1F76','\u1FDB':'\u1F77','\u1FE8':'\u1FE0','\u1FE9':'\u1FE1','\u1FEA':'\u1F7A','\u1FEB':'\u1F7B','\u1FEC':'\u1FE5','\u1FF8':'\u1F78','\u1FF9':'\u1F79','\u1FFA':'\u1F7C','\u1FFB':'\u1F7D','\u2126':'\u03C9','\u212A':'k','\u212B':'\xE5','\u2132':'\u214E','\u2160':'\u2170','\u2161':'\u2171','\u2162':'\u2172','\u2163':'\u2173','\u2164':'\u2174','\u2165':'\u2175','\u2166':'\u2176','\u2167':'\u2177','\u2168':'\u2178','\u2169':'\u2179','\u216A':'\u217A','\u216B':'\u217B','\u216C':'\u217C','\u216D':'\u217D','\u216E':'\u217E','\u216F':'\u217F','\u2183':'\u2184','\u24B6':'\u24D0','\u24B7':'\u24D1','\u24B8':'\u24D2','\u24B9':'\u24D3','\u24BA':'\u24D4','\u24BB':'\u24D5','\u24BC':'\u24D6','\u24BD':'\u24D7','\u24BE':'\u24D8','\u24BF':'\u24D9','\u24C0':'\u24DA','\u24C1':'\u24DB','\u24C2':'\u24DC','\u24C3':'\u24DD','\u24C4':'\u24DE','\u24C5':'\u24DF','\u24C6':'\u24E0','\u24C7':'\u24E1','\u24C8':'\u24E2','\u24C9':'\u24E3','\u24CA':'\u24E4','\u24CB':'\u24E5','\u24CC':'\u24E6','\u24CD':'\u24E7','\u24CE':'\u24E8','\u24CF':'\u24E9','\u2C00':'\u2C30','\u2C01':'\u2C31','\u2C02':'\u2C32','\u2C03':'\u2C33','\u2C04':'\u2C34','\u2C05':'\u2C35','\u2C06':'\u2C36','\u2C07':'\u2C37','\u2C08':'\u2C38','\u2C09':'\u2C39','\u2C0A':'\u2C3A','\u2C0B':'\u2C3B','\u2C0C':'\u2C3C','\u2C0D':'\u2C3D','\u2C0E':'\u2C3E','\u2C0F':'\u2C3F','\u2C10':'\u2C40','\u2C11':'\u2C41','\u2C12':'\u2C42','\u2C13':'\u2C43','\u2C14':'\u2C44','\u2C15':'\u2C45','\u2C16':'\u2C46','\u2C17':'\u2C47','\u2C18':'\u2C48','\u2C19':'\u2C49','\u2C1A':'\u2C4A','\u2C1B':'\u2C4B','\u2C1C':'\u2C4C','\u2C1D':'\u2C4D','\u2C1E':'\u2C4E','\u2C1F':'\u2C4F','\u2C20':'\u2C50','\u2C21':'\u2C51','\u2C22':'\u2C52','\u2C23':'\u2C53','\u2C24':'\u2C54','\u2C25':'\u2C55','\u2C26':'\u2C56','\u2C27':'\u2C57','\u2C28':'\u2C58','\u2C29':'\u2C59','\u2C2A':'\u2C5A','\u2C2B':'\u2C5B','\u2C2C':'\u2C5C','\u2C2D':'\u2C5D','\u2C2E':'\u2C5E','\u2C60':'\u2C61','\u2C62':'\u026B','\u2C63':'\u1D7D','\u2C64':'\u027D','\u2C67':'\u2C68','\u2C69':'\u2C6A','\u2C6B':'\u2C6C','\u2C6D':'\u0251','\u2C6E':'\u0271','\u2C6F':'\u0250','\u2C70':'\u0252','\u2C72':'\u2C73','\u2C75':'\u2C76','\u2C7E':'\u023F','\u2C7F':'\u0240','\u2C80':'\u2C81','\u2C82':'\u2C83','\u2C84':'\u2C85','\u2C86':'\u2C87','\u2C88':'\u2C89','\u2C8A':'\u2C8B','\u2C8C':'\u2C8D','\u2C8E':'\u2C8F','\u2C90':'\u2C91','\u2C92':'\u2C93','\u2C94':'\u2C95','\u2C96':'\u2C97','\u2C98':'\u2C99','\u2C9A':'\u2C9B','\u2C9C':'\u2C9D','\u2C9E':'\u2C9F','\u2CA0':'\u2CA1','\u2CA2':'\u2CA3','\u2CA4':'\u2CA5','\u2CA6':'\u2CA7','\u2CA8':'\u2CA9','\u2CAA':'\u2CAB','\u2CAC':'\u2CAD','\u2CAE':'\u2CAF','\u2CB0':'\u2CB1','\u2CB2':'\u2CB3','\u2CB4':'\u2CB5','\u2CB6':'\u2CB7','\u2CB8':'\u2CB9','\u2CBA':'\u2CBB','\u2CBC':'\u2CBD','\u2CBE':'\u2CBF','\u2CC0':'\u2CC1','\u2CC2':'\u2CC3','\u2CC4':'\u2CC5','\u2CC6':'\u2CC7','\u2CC8':'\u2CC9','\u2CCA':'\u2CCB','\u2CCC':'\u2CCD','\u2CCE':'\u2CCF','\u2CD0':'\u2CD1','\u2CD2':'\u2CD3','\u2CD4':'\u2CD5','\u2CD6':'\u2CD7','\u2CD8':'\u2CD9','\u2CDA':'\u2CDB','\u2CDC':'\u2CDD','\u2CDE':'\u2CDF','\u2CE0':'\u2CE1','\u2CE2':'\u2CE3','\u2CEB':'\u2CEC','\u2CED':'\u2CEE','\u2CF2':'\u2CF3','\uA640':'\uA641','\uA642':'\uA643','\uA644':'\uA645','\uA646':'\uA647','\uA648':'\uA649','\uA64A':'\uA64B','\uA64C':'\uA64D','\uA64E':'\uA64F','\uA650':'\uA651','\uA652':'\uA653','\uA654':'\uA655','\uA656':'\uA657','\uA658':'\uA659','\uA65A':'\uA65B','\uA65C':'\uA65D','\uA65E':'\uA65F','\uA660':'\uA661','\uA662':'\uA663','\uA664':'\uA665','\uA666':'\uA667','\uA668':'\uA669','\uA66A':'\uA66B','\uA66C':'\uA66D','\uA680':'\uA681','\uA682':'\uA683','\uA684':'\uA685','\uA686':'\uA687','\uA688':'\uA689','\uA68A':'\uA68B','\uA68C':'\uA68D','\uA68E':'\uA68F','\uA690':'\uA691','\uA692':'\uA693','\uA694':'\uA695','\uA696':'\uA697','\uA698':'\uA699','\uA69A':'\uA69B','\uA722':'\uA723','\uA724':'\uA725','\uA726':'\uA727','\uA728':'\uA729','\uA72A':'\uA72B','\uA72C':'\uA72D','\uA72E':'\uA72F','\uA732':'\uA733','\uA734':'\uA735','\uA736':'\uA737','\uA738':'\uA739','\uA73A':'\uA73B','\uA73C':'\uA73D','\uA73E':'\uA73F','\uA740':'\uA741','\uA742':'\uA743','\uA744':'\uA745','\uA746':'\uA747','\uA748':'\uA749','\uA74A':'\uA74B','\uA74C':'\uA74D','\uA74E':'\uA74F','\uA750':'\uA751','\uA752':'\uA753','\uA754':'\uA755','\uA756':'\uA757','\uA758':'\uA759','\uA75A':'\uA75B','\uA75C':'\uA75D','\uA75E':'\uA75F','\uA760':'\uA761','\uA762':'\uA763','\uA764':'\uA765','\uA766':'\uA767','\uA768':'\uA769','\uA76A':'\uA76B','\uA76C':'\uA76D','\uA76E':'\uA76F','\uA779':'\uA77A','\uA77B':'\uA77C','\uA77D':'\u1D79','\uA77E':'\uA77F','\uA780':'\uA781','\uA782':'\uA783','\uA784':'\uA785','\uA786':'\uA787','\uA78B':'\uA78C','\uA78D':'\u0265','\uA790':'\uA791','\uA792':'\uA793','\uA796':'\uA797','\uA798':'\uA799','\uA79A':'\uA79B','\uA79C':'\uA79D','\uA79E':'\uA79F','\uA7A0':'\uA7A1','\uA7A2':'\uA7A3','\uA7A4':'\uA7A5','\uA7A6':'\uA7A7','\uA7A8':'\uA7A9','\uA7AA':'\u0266','\uA7AB':'\u025C','\uA7AC':'\u0261','\uA7AD':'\u026C','\uA7B0':'\u029E','\uA7B1':'\u0287','\uFF21':'\uFF41','\uFF22':'\uFF42','\uFF23':'\uFF43','\uFF24':'\uFF44','\uFF25':'\uFF45','\uFF26':'\uFF46','\uFF27':'\uFF47','\uFF28':'\uFF48','\uFF29':'\uFF49','\uFF2A':'\uFF4A','\uFF2B':'\uFF4B','\uFF2C':'\uFF4C','\uFF2D':'\uFF4D','\uFF2E':'\uFF4E','\uFF2F':'\uFF4F','\uFF30':'\uFF50','\uFF31':'\uFF51','\uFF32':'\uFF52','\uFF33':'\uFF53','\uFF34':'\uFF54','\uFF35':'\uFF55','\uFF36':'\uFF56','\uFF37':'\uFF57','\uFF38':'\uFF58','\uFF39':'\uFF59','\uFF3A':'\uFF5A','\uD801\uDC00':'\uD801\uDC28','\uD801\uDC01':'\uD801\uDC29','\uD801\uDC02':'\uD801\uDC2A','\uD801\uDC03':'\uD801\uDC2B','\uD801\uDC04':'\uD801\uDC2C','\uD801\uDC05':'\uD801\uDC2D','\uD801\uDC06':'\uD801\uDC2E','\uD801\uDC07':'\uD801\uDC2F','\uD801\uDC08':'\uD801\uDC30','\uD801\uDC09':'\uD801\uDC31','\uD801\uDC0A':'\uD801\uDC32','\uD801\uDC0B':'\uD801\uDC33','\uD801\uDC0C':'\uD801\uDC34','\uD801\uDC0D':'\uD801\uDC35','\uD801\uDC0E':'\uD801\uDC36','\uD801\uDC0F':'\uD801\uDC37','\uD801\uDC10':'\uD801\uDC38','\uD801\uDC11':'\uD801\uDC39','\uD801\uDC12':'\uD801\uDC3A','\uD801\uDC13':'\uD801\uDC3B','\uD801\uDC14':'\uD801\uDC3C','\uD801\uDC15':'\uD801\uDC3D','\uD801\uDC16':'\uD801\uDC3E','\uD801\uDC17':'\uD801\uDC3F','\uD801\uDC18':'\uD801\uDC40','\uD801\uDC19':'\uD801\uDC41','\uD801\uDC1A':'\uD801\uDC42','\uD801\uDC1B':'\uD801\uDC43','\uD801\uDC1C':'\uD801\uDC44','\uD801\uDC1D':'\uD801\uDC45','\uD801\uDC1E':'\uD801\uDC46','\uD801\uDC1F':'\uD801\uDC47','\uD801\uDC20':'\uD801\uDC48','\uD801\uDC21':'\uD801\uDC49','\uD801\uDC22':'\uD801\uDC4A','\uD801\uDC23':'\uD801\uDC4B','\uD801\uDC24':'\uD801\uDC4C','\uD801\uDC25':'\uD801\uDC4D','\uD801\uDC26':'\uD801\uDC4E','\uD801\uDC27':'\uD801\uDC4F','\uD806\uDCA0':'\uD806\uDCC0','\uD806\uDCA1':'\uD806\uDCC1','\uD806\uDCA2':'\uD806\uDCC2','\uD806\uDCA3':'\uD806\uDCC3','\uD806\uDCA4':'\uD806\uDCC4','\uD806\uDCA5':'\uD806\uDCC5','\uD806\uDCA6':'\uD806\uDCC6','\uD806\uDCA7':'\uD806\uDCC7','\uD806\uDCA8':'\uD806\uDCC8','\uD806\uDCA9':'\uD806\uDCC9','\uD806\uDCAA':'\uD806\uDCCA','\uD806\uDCAB':'\uD806\uDCCB','\uD806\uDCAC':'\uD806\uDCCC','\uD806\uDCAD':'\uD806\uDCCD','\uD806\uDCAE':'\uD806\uDCCE','\uD806\uDCAF':'\uD806\uDCCF','\uD806\uDCB0':'\uD806\uDCD0','\uD806\uDCB1':'\uD806\uDCD1','\uD806\uDCB2':'\uD806\uDCD2','\uD806\uDCB3':'\uD806\uDCD3','\uD806\uDCB4':'\uD806\uDCD4','\uD806\uDCB5':'\uD806\uDCD5','\uD806\uDCB6':'\uD806\uDCD6','\uD806\uDCB7':'\uD806\uDCD7','\uD806\uDCB8':'\uD806\uDCD8','\uD806\uDCB9':'\uD806\uDCD9','\uD806\uDCBA':'\uD806\uDCDA','\uD806\uDCBB':'\uD806\uDCDB','\uD806\uDCBC':'\uD806\uDCDC','\uD806\uDCBD':'\uD806\uDCDD','\uD806\uDCBE':'\uD806\uDCDE','\uD806\uDCBF':'\uD806\uDCDF','\xDF':'ss','\u0130':'i\u0307','\u0149':'\u02BCn','\u01F0':'j\u030C','\u0390':'\u03B9\u0308\u0301','\u03B0':'\u03C5\u0308\u0301','\u0587':'\u0565\u0582','\u1E96':'h\u0331','\u1E97':'t\u0308','\u1E98':'w\u030A','\u1E99':'y\u030A','\u1E9A':'a\u02BE','\u1E9E':'ss','\u1F50':'\u03C5\u0313','\u1F52':'\u03C5\u0313\u0300','\u1F54':'\u03C5\u0313\u0301','\u1F56':'\u03C5\u0313\u0342','\u1F80':'\u1F00\u03B9','\u1F81':'\u1F01\u03B9','\u1F82':'\u1F02\u03B9','\u1F83':'\u1F03\u03B9','\u1F84':'\u1F04\u03B9','\u1F85':'\u1F05\u03B9','\u1F86':'\u1F06\u03B9','\u1F87':'\u1F07\u03B9','\u1F88':'\u1F00\u03B9','\u1F89':'\u1F01\u03B9','\u1F8A':'\u1F02\u03B9','\u1F8B':'\u1F03\u03B9','\u1F8C':'\u1F04\u03B9','\u1F8D':'\u1F05\u03B9','\u1F8E':'\u1F06\u03B9','\u1F8F':'\u1F07\u03B9','\u1F90':'\u1F20\u03B9','\u1F91':'\u1F21\u03B9','\u1F92':'\u1F22\u03B9','\u1F93':'\u1F23\u03B9','\u1F94':'\u1F24\u03B9','\u1F95':'\u1F25\u03B9','\u1F96':'\u1F26\u03B9','\u1F97':'\u1F27\u03B9','\u1F98':'\u1F20\u03B9','\u1F99':'\u1F21\u03B9','\u1F9A':'\u1F22\u03B9','\u1F9B':'\u1F23\u03B9','\u1F9C':'\u1F24\u03B9','\u1F9D':'\u1F25\u03B9','\u1F9E':'\u1F26\u03B9','\u1F9F':'\u1F27\u03B9','\u1FA0':'\u1F60\u03B9','\u1FA1':'\u1F61\u03B9','\u1FA2':'\u1F62\u03B9','\u1FA3':'\u1F63\u03B9','\u1FA4':'\u1F64\u03B9','\u1FA5':'\u1F65\u03B9','\u1FA6':'\u1F66\u03B9','\u1FA7':'\u1F67\u03B9','\u1FA8':'\u1F60\u03B9','\u1FA9':'\u1F61\u03B9','\u1FAA':'\u1F62\u03B9','\u1FAB':'\u1F63\u03B9','\u1FAC':'\u1F64\u03B9','\u1FAD':'\u1F65\u03B9','\u1FAE':'\u1F66\u03B9','\u1FAF':'\u1F67\u03B9','\u1FB2':'\u1F70\u03B9','\u1FB3':'\u03B1\u03B9','\u1FB4':'\u03AC\u03B9','\u1FB6':'\u03B1\u0342','\u1FB7':'\u03B1\u0342\u03B9','\u1FBC':'\u03B1\u03B9','\u1FC2':'\u1F74\u03B9','\u1FC3':'\u03B7\u03B9','\u1FC4':'\u03AE\u03B9','\u1FC6':'\u03B7\u0342','\u1FC7':'\u03B7\u0342\u03B9','\u1FCC':'\u03B7\u03B9','\u1FD2':'\u03B9\u0308\u0300','\u1FD3':'\u03B9\u0308\u0301','\u1FD6':'\u03B9\u0342','\u1FD7':'\u03B9\u0308\u0342','\u1FE2':'\u03C5\u0308\u0300','\u1FE3':'\u03C5\u0308\u0301','\u1FE4':'\u03C1\u0313','\u1FE6':'\u03C5\u0342','\u1FE7':'\u03C5\u0308\u0342','\u1FF2':'\u1F7C\u03B9','\u1FF3':'\u03C9\u03B9','\u1FF4':'\u03CE\u03B9','\u1FF6':'\u03C9\u0342','\u1FF7':'\u03C9\u0342\u03B9','\u1FFC':'\u03C9\u03B9','\uFB00':'ff','\uFB01':'fi','\uFB02':'fl','\uFB03':'ffi','\uFB04':'ffl','\uFB05':'st','\uFB06':'st','\uFB13':'\u0574\u0576','\uFB14':'\u0574\u0565','\uFB15':'\u0574\u056B','\uFB16':'\u057E\u0576','\uFB17':'\u0574\u056D'};

// Normalize reference label: collapse internal whitespace
// to single space, remove leading/trailing whitespace, case fold.
module.exports = function(string) {
    return string.slice(1, string.length - 1).trim().replace(regex, function($0) {
        // Note: there is no need to check `hasOwnProperty($0)` here.
        // If character not found in lookup table, it must be whitespace.
        return map[$0] || ' ';
    });
};


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// derived from https://github.com/mathiasbynens/String.fromCodePoint
/*! http://mths.be/fromcodepoint v0.2.1 by @mathias */
if (String.fromCodePoint) {
    module.exports = function (_) {
        try {
            return String.fromCodePoint(_);
        } catch (e) {
            if (e instanceof RangeError) {
                return String.fromCharCode(0xFFFD);
            }
            throw e;
        }
    };

} else {

  var stringFromCharCode = String.fromCharCode;
  var floor = Math.floor;
  var fromCodePoint = function() {
      var MAX_SIZE = 0x4000;
      var codeUnits = [];
      var highSurrogate;
      var lowSurrogate;
      var index = -1;
      var length = arguments.length;
      if (!length) {
          return '';
      }
      var result = '';
      while (++index < length) {
          var codePoint = Number(arguments[index]);
          if (
              !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
                  codePoint < 0 || // not a valid Unicode code point
                  codePoint > 0x10FFFF || // not a valid Unicode code point
                  floor(codePoint) !== codePoint // not an integer
          ) {
              return String.fromCharCode(0xFFFD);
          }
          if (codePoint <= 0xFFFF) { // BMP code point
              codeUnits.push(codePoint);
          } else { // Astral code point; split in surrogate halves
              // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
              codePoint -= 0x10000;
              highSurrogate = (codePoint >> 10) + 0xD800;
              lowSurrogate = (codePoint % 0x400) + 0xDC00;
              codeUnits.push(highSurrogate, lowSurrogate);
          }
          if (index + 1 === length || codeUnits.length > MAX_SIZE) {
              result += stringFromCharCode.apply(null, codeUnits);
              codeUnits.length = 0;
          }
      }
      return result;
  };
  module.exports = fromCodePoint;
}


/***/ }),
/* 291 */
/***/ (function(module, exports) {

/*! http://mths.be/repeat v0.2.0 by @mathias */
if (!String.prototype.repeat) {
	(function() {
		'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
		var defineProperty = (function() {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch(error) {}
			return result;
		}());
		var repeat = function(count) {
			if (this == null) {
				throw TypeError();
			}
			var string = String(this);
			// `ToInteger`
			var n = count ? Number(count) : 0;
			if (n != n) { // better `isNaN`
				n = 0;
			}
			// Account for out-of-bounds indices
			if (n < 0 || n == Infinity) {
				throw RangeError();
			}
			var result = '';
			while (n) {
				if (n % 2 == 1) {
					result += string;
				}
				if (n > 1) {
					string += string;
				}
				n >>= 1;
			}
			return result;
		};
		if (defineProperty) {
			defineProperty(String.prototype, 'repeat', {
				'value': repeat,
				'configurable': true,
				'writable': true
			});
		} else {
			String.prototype.repeat = repeat;
		}
	}());
}


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Renderer = __webpack_require__(175);

var reUnsafeProtocol = /^javascript:|vbscript:|file:|data:/i;
var reSafeDataProtocol = /^data:image\/(?:png|gif|jpeg|webp)/i;

var potentiallyUnsafe = function(url) {
  return reUnsafeProtocol.test(url) &&
      !reSafeDataProtocol.test(url);
};

// Helper function to produce an HTML tag.
function tag(name, attrs, selfclosing) {
  if (this.disableTags > 0) {
    return;
  }
  this.buffer += ('<' + name);
  if (attrs && attrs.length > 0) {
    var i = 0;
    var attrib;
    while ((attrib = attrs[i]) !== undefined) {
      this.buffer += (' ' + attrib[0] + '="' + attrib[1] + '"');
      i++;
    }
  }
  if (selfclosing) {
    this.buffer += ' /';
  }
  this.buffer += '>';
  this.lastOut = '>';
}

function HtmlRenderer(options) {
  options = options || {};
  // by default, soft breaks are rendered as newlines in HTML
  options.softbreak = options.softbreak || '\n';
  // set to "<br />" to make them hard breaks
  // set to " " if you want to ignore line wrapping in source

  this.disableTags = 0;
  this.lastOut = "\n";
  this.options = options;
}

/* Node methods */

function text(node) {
  this.out(node.literal);
}

function softbreak() {
  this.lit(this.options.softbreak);
}

function linebreak() {
  this.tag('br', [], true);
  this.cr();
}

function link(node, entering) {
  var attrs = this.attrs(node);
  if (entering) {
    if (!(this.options.safe && potentiallyUnsafe(node.destination))) {
      attrs.push(['href', this.esc(node.destination, true)]);
    }
    if (node.title) {
      attrs.push(['title', this.esc(node.title, true)]);
    }
    this.tag('a', attrs);
  } else {
    this.tag('/a');
  }
}

function image(node, entering) {
  if (entering) {
    if (this.disableTags === 0) {
      if (this.options.safe && potentiallyUnsafe(node.destination)) {
        this.lit('<img src="" alt="');
      } else {
        this.lit('<img src="' + this.esc(node.destination, true) +
            '" alt="');
      }
    }
    this.disableTags += 1;
  } else {
    this.disableTags -= 1;
    if (this.disableTags === 0) {
      if (node.title) {
        this.lit('" title="' + this.esc(node.title, true));
      }
      this.lit('" />');
    }
  }
}

function emph(node, entering) {
  this.tag(entering ? 'em' : '/em');
}

function strong(node, entering) {
  this.tag(entering ? 'strong' : '/strong');
}

function paragraph(node, entering) {
  var grandparent = node.parent.parent
    , attrs = this.attrs(node);
  if (grandparent !== null &&
    grandparent.type === 'list') {
    if (grandparent.listTight) {
      return;
    }
  }
  if (entering) {
    this.cr();
    this.tag('p', attrs);
  } else {
    this.tag('/p');
    this.cr();
  }
}

function heading(node, entering) {
  var tagname = 'h' + node.level
    , attrs = this.attrs(node);
  if (entering) {
    this.cr();
    this.tag(tagname, attrs);
  } else {
    this.tag('/' + tagname);
    this.cr();
  }
}

function code(node) {
  this.tag('code');
  this.out(node.literal);
  this.tag('/code');
}

function code_block(node) {
  var info_words = node.info ? node.info.split(/\s+/) : []
    , attrs = this.attrs(node);
  if (info_words.length > 0 && info_words[0].length > 0) {
    attrs.push(['class', 'language-' + this.esc(info_words[0], true)]);
  }
  this.cr();
  this.tag('pre');
  this.tag('code', attrs);
  this.out(node.literal);
  this.tag('/code');
  this.tag('/pre');
  this.cr();
}

function thematic_break(node) {
  var attrs = this.attrs(node);
  this.cr();
  this.tag('hr', attrs, true);
  this.cr();
}

function block_quote(node, entering) {
  var attrs = this.attrs(node);
  if (entering) {
    this.cr();
    this.tag('blockquote', attrs);
    this.cr();
  } else {
    this.cr();
    this.tag('/blockquote');
    this.cr();
  }
}

function list(node, entering) {
  var tagname = node.listType === 'bullet' ? 'ul' : 'ol'
    , attrs = this.attrs(node);

  if (entering) {
    var start = node.listStart;
    if (start !== null && start !== 1) {
      attrs.push(['start', start.toString()]);
    }
    this.cr();
    this.tag(tagname, attrs);
    this.cr();
  } else {
    this.cr();
    this.tag('/' + tagname);
    this.cr();
  }
}

function item(node, entering) {
  var attrs = this.attrs(node);
  if (entering) {
    this.tag('li', attrs);
  } else {
    this.tag('/li');
    this.cr();
  }
}

function html_inline(node) {
  if (this.options.safe) {
    this.lit('<!-- raw HTML omitted -->');
  } else {
    this.lit(node.literal);
  }
}

function html_block(node) {
  this.cr();
  if (this.options.safe) {
    this.lit('<!-- raw HTML omitted -->');
  } else {
    this.lit(node.literal);
  }
  this.cr();
}

function custom_inline(node, entering) {
  if (entering && node.onEnter) {
    this.lit(node.onEnter);
  } else if (!entering && node.onExit) {
    this.lit(node.onExit);
  }
}

function custom_block(node, entering) {
  this.cr();
  if (entering && node.onEnter) {
    this.lit(node.onEnter);
  } else if (!entering && node.onExit) {
    this.lit(node.onExit);
  }
  this.cr();
}

/* Helper methods */

function out(s) {
  this.lit(this.esc(s, false));
}

function attrs (node) {
  var att = [];
  if (this.options.sourcepos) {
    var pos = node.sourcepos;
    if (pos) {
      att.push(['data-sourcepos', String(pos[0][0]) + ':' +
        String(pos[0][1]) + '-' + String(pos[1][0]) + ':' +
        String(pos[1][1])]);
    }
  }
  return att;
}

// quick browser-compatible inheritance
HtmlRenderer.prototype = Object.create(Renderer.prototype);

HtmlRenderer.prototype.text = text;
HtmlRenderer.prototype.html_inline = html_inline;
HtmlRenderer.prototype.html_block = html_block;
HtmlRenderer.prototype.softbreak = softbreak;
HtmlRenderer.prototype.linebreak = linebreak;
HtmlRenderer.prototype.link = link;
HtmlRenderer.prototype.image = image;
HtmlRenderer.prototype.emph = emph;
HtmlRenderer.prototype.strong = strong;
HtmlRenderer.prototype.paragraph = paragraph;
HtmlRenderer.prototype.heading = heading;
HtmlRenderer.prototype.code = code;
HtmlRenderer.prototype.code_block = code_block;
HtmlRenderer.prototype.thematic_break = thematic_break;
HtmlRenderer.prototype.block_quote = block_quote;
HtmlRenderer.prototype.list = list;
HtmlRenderer.prototype.item = item;
HtmlRenderer.prototype.custom_inline = custom_inline;
HtmlRenderer.prototype.custom_block = custom_block;

HtmlRenderer.prototype.esc = __webpack_require__(121).escapeXml;

HtmlRenderer.prototype.out = out;
HtmlRenderer.prototype.tag = tag;
HtmlRenderer.prototype.attrs = attrs;

module.exports = HtmlRenderer;


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Renderer = __webpack_require__(175);

var reXMLTag = /\<[^>]*\>/;

function toTagName(s) {
  return s.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
}

function XmlRenderer(options) {
  options = options || {};

  this.disableTags = 0;
  this.lastOut = "\n";

  this.indentLevel = 0;
  this.indent = '  ';

  this.options = options;
}

function render(ast) {

  this.buffer = '';

  var attrs;
  var tagname;
  var walker = ast.walker();
  var event, node, entering;
  var container;
  var selfClosing;
  var nodetype;

  var options = this.options;

  if (options.time) { console.time("rendering"); }

  this.buffer += '<?xml version="1.0" encoding="UTF-8"?>\n';
  this.buffer += '<!DOCTYPE document SYSTEM "CommonMark.dtd">\n';

  while ((event = walker.next())) {
    entering = event.entering;
    node = event.node;
    nodetype = node.type;

    container = node.isContainer;

    selfClosing = nodetype === 'thematic_break'
      || nodetype === 'linebreak'
      || nodetype === 'softbreak';

    tagname = toTagName(nodetype);

    if (entering) {

        attrs = [];

        switch (nodetype) {
          case 'document':
            attrs.push(['xmlns', 'http://commonmark.org/xml/1.0']);
            break;
          case 'list':
            if (node.listType !== null) {
              attrs.push(['type', node.listType.toLowerCase()]);
            }
            if (node.listStart !== null) {
              attrs.push(['start', String(node.listStart)]);
            }
            if (node.listTight !== null) {
              attrs.push(['tight', (node.listTight ? 'true' : 'false')]);
            }
            var delim = node.listDelimiter;
            if (delim !== null) {
              var delimword = '';
              if (delim === '.') {
                delimword = 'period';
              } else {
                delimword = 'paren';
              }
              attrs.push(['delimiter', delimword]);
            }
            break;
          case 'code_block':
            if (node.info) {
              attrs.push(['info', node.info]);
            }
            break;
          case 'heading':
            attrs.push(['level', String(node.level)]);
            break;
          case 'link':
          case 'image':
            attrs.push(['destination', node.destination]);
            attrs.push(['title', node.title]);
            break;
          case 'custom_inline':
          case 'custom_block':
            attrs.push(['on_enter', node.onEnter]);
            attrs.push(['on_exit', node.onExit]);
            break;
          default:
            break;
        }
        if (options.sourcepos) {
          var pos = node.sourcepos;
          if (pos) {
            attrs.push(['sourcepos', String(pos[0][0]) + ':' +
              String(pos[0][1]) + '-' + String(pos[1][0]) + ':' +
              String(pos[1][1])]);
          }
        }

        this.cr();
        this.out(this.tag(tagname, attrs, selfClosing));
        if (container) {
          this.indentLevel += 1;
        } else if (!container && !selfClosing) {
          var lit = node.literal;
          if (lit) {
            this.out(this.esc(lit));
          }
          this.out(this.tag('/' + tagname));
        }
    } else {
      this.indentLevel -= 1;
      this.cr();
      this.out(this.tag('/' + tagname));
    }
  }
  if (options.time) { console.timeEnd("rendering"); }
  this.buffer += '\n';
  return this.buffer;
}

function out(s) {
  if(this.disableTags > 0) {
    this.buffer += s.replace(reXMLTag, '');
  }else{
    this.buffer += s;
  }
  this.lastOut = s;
}

function cr() {
  if(this.lastOut !== '\n') {
    this.buffer += '\n';
    this.lastOut = '\n';
    for(var i = this.indentLevel; i > 0; i--) {
      this.buffer += this.indent;
    }
  }
}

// Helper function to produce an XML tag.
function tag(name, attrs, selfclosing) {
  var result = '<' + name;
  if(attrs && attrs.length > 0) {
    var i = 0;
    var attrib;
    while ((attrib = attrs[i]) !== undefined) {
      result += ' ' + attrib[0] + '="' + this.esc(attrib[1]) + '"';
      i++;
    }
  }
  if(selfclosing) {
    result += ' /';
  }
  result += '>';
  return result;
}

// quick browser-compatible inheritance
XmlRenderer.prototype = Object.create(Renderer.prototype);

XmlRenderer.prototype.render = render;
XmlRenderer.prototype.out = out;
XmlRenderer.prototype.cr = cr;
XmlRenderer.prototype.tag = tag;
XmlRenderer.prototype.esc = __webpack_require__(121).escapeXml;

module.exports = XmlRenderer;


/***/ }),
/* 294 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */,
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */,
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */,
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */,
/* 428 */,
/* 429 */,
/* 430 */,
/* 431 */,
/* 432 */,
/* 433 */,
/* 434 */,
/* 435 */,
/* 436 */,
/* 437 */,
/* 438 */,
/* 439 */,
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.common.js
var vue_common = __webpack_require__(17);
var vue_common_default = /*#__PURE__*/__webpack_require__.n(vue_common);

// EXTERNAL MODULE: ./node_modules/vue-router/dist/vue-router.esm.js
var vue_router_esm = __webpack_require__(142);

// EXTERNAL MODULE: ./resources/assets/js/vue-mixins/HasAlerts.js
var HasAlerts = __webpack_require__(46);

// EXTERNAL MODULE: external "moment"
var external__moment_ = __webpack_require__(16);
var external__moment__default = /*#__PURE__*/__webpack_require__.n(external__moment_);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/Questionnaire/Question/Question.vue + 60 modules
var Question = __webpack_require__(182);

// EXTERNAL MODULE: ./node_modules/snarkdown/dist/snarkdown.es.js
var snarkdown_es = __webpack_require__(23);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Item.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var Item = ({
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'item';
			}
		},
		text: {
			type: String,
			required: true
		},
		checked: {
			type: Boolean,
			default: false
		},
		questions: {
			type: Array,
			required: false
		},
		readonly: {
			type: Boolean,
			default: false
		},
		subjectReadonly: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: false
		},
		showErrors: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		hasQuestions: function hasQuestions() {
			return this.questions && this.questions.length > 0;
		},
		markedUpText: function markedUpText() {
			return Object(snarkdown_es["a" /* default */])(this.text);
		},
		readonlyToUser: function readonlyToUser() {
			return this.readonly || this.subjectReadonly && (!this.user || this.user.type !== 'admin');
		}
	},

	methods: {
		handleCheck: function handleCheck() {
			if (this.readonlyToUser) return;

			var checked = !this.checked;
			var item = { checked: checked };

			if (!checked && this.questions) {
				var questions = this.questions.map(this.clearQuestion);
				item.questions = questions;
			}

			this.$emit('input', item);
		},
		handleQuestionInput: function handleQuestionInput(index, question) {
			if (this.readonlyToUser) return;

			var questions = this.questions.slice();
			questions[index] = Object.assign({}, questions[index], question);

			this.$emit('input', { questions: questions });
		},
		clearQuestion: function clearQuestion(question) {
			if (this.readonlyToUser) return;

			question = Object.assign({}, question);
			switch (question.type) {
				case 'text':
				case 'number':
					delete question.value;
					break;
				case 'checkbox':
				case 'radio':
					question.options = question.options.map(function (option) {
						return Object.assign({}, option, { checked: false });
					});
					break;
				case 'list':
					delete question.items;
					break;
			}

			return question;
		}
	},

	components: {
		QuestionnaireQuestion: Question["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-024c0c7e","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Item.vue
var Item_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "checklist-item",
      class: {
        checked: _vm.checked,
        readonly: _vm.readonly,
        editable: !_vm.readonlyToUser
      }
    },
    [
      _c("label", { staticClass: "containing-label" }, [
        _c("input", {
          attrs: { type: "checkbox", disabled: _vm.readonlyToUser },
          domProps: { checked: _vm.checked },
          on: { change: _vm.handleCheck }
        }),
        _vm._v(" "),
        _c("span", {
          staticClass: "item-text",
          domProps: { innerHTML: _vm._s(_vm.markedUpText) }
        })
      ]),
      _vm._v(" "),
      _vm.checked && _vm.hasQuestions
        ? _c(
            "div",
            { staticClass: "item-questions" },
            _vm._l(_vm.questions, function(question, index) {
              return _c("questionnaire-question", {
                key: index,
                attrs: {
                  question: question,
                  readonly: _vm.readonlyToUser,
                  showErrors: _vm.showErrors
                },
                on: {
                  input: function($event) {
                    _vm.handleQuestionInput(index, arguments[0])
                  }
                }
              })
            })
          )
        : _vm._e()
    ]
  )
}
var staticRenderFns = []
Item_render._withStripped = true
var esExports = { render: Item_render, staticRenderFns: staticRenderFns }
/* harmony default export */ var Checklist_Item = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-024c0c7e", esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/Item.vue
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(473)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-024c0c7e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  Item,
  Checklist_Item,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-024c0c7e", Component.options)
  } else {
    hotAPI.reload("data-v-024c0c7e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_Item = (Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/Questionnaire/Instruction.vue + 2 modules
var Instruction = __webpack_require__(172);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/Questionnaire/Section.vue + 1 modules
var Section = __webpack_require__(184);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue





/* harmony default export */ var Checklist_Section = ({
	extends: Section["a" /* default */],
	name: 'checklist-section',

	props: {
		user: {
			type: Object,
			required: false
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

		var items = this.items.map(function (item, index) {
			var componentName = void 0;
			switch (item.type) {
				case 'section':
					componentName = 'checklist-section';
					break;
				case 'instruction':
					componentName = 'questionnaire-instruction';
					break;
				case 'item':
					componentName = 'checklist-item';
					break;
			}

			return h(componentName, {
				props: Object.assign({
					readonly: _this.readonly,
					showErrors: _this.showErrors,
					user: _this.user
				}, item),
				on: {
					input: function input(item) {
						var items = _this.items.slice();
						items[index] = Object.assign({}, items[index], item);

						_this.$emit('input', { items: items });
					}
				}
			});
		});

		if (this.title) items.unshift(h('h1', this.title));

		return h('section', {
			class: {
				page: this.page
			}
		}, items);
	},


	components: {
		ChecklistItem: MeritCompensation_Checklist_Item,
		QuestionnaireInstruction: Instruction["a" /* default */]
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue
var Section_disposed = false
function Section_injectStyle (ssrContext) {
  if (Section_disposed) return
  __webpack_require__(472)
}
var Section_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var __vue_template__ = null
/* template functional */
  var Section___vue_template_functional__ = false
/* styles */
var Section___vue_styles__ = Section_injectStyle
/* scopeId */
var Section___vue_scopeId__ = "data-v-a8188cb2"
/* moduleIdentifier (server only) */
var Section___vue_module_identifier__ = null
var Section_Component = Section_normalizeComponent(
  Checklist_Section,
  __vue_template__,
  Section___vue_template_functional__,
  Section___vue_styles__,
  Section___vue_scopeId__,
  Section___vue_module_identifier__
)
Section_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue"
if (Section_Component.esModule && Object.keys(Section_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8188cb2", Section_Component.options)
  } else {
    hotAPI.reload("data-v-a8188cb2", Section_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Section_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_Section = (Section_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/BootstrapAlert.vue + 2 modules
var BootstrapAlert = __webpack_require__(25);

// EXTERNAL MODULE: ./resources/assets/js/modules/merits/validate.js
var validate = __webpack_require__(169);

// EXTERNAL MODULE: ./resources/assets/js/modules/dom-utils.js
var dom_utils = __webpack_require__(181);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/SectionErrors.vue
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var SectionErrors = ({
	props: {
		page: {
			type: Object,
			required: true
		}
	},

	computed: {
		validation: function validation() {
			return Object(validate["d" /* section */])(this.page);
		},
		errors: function errors() {
			if (!this.validation) return [];

			return Object(validate["b" /* flattenErrors */])(this.validation.errors);
		}
	},

	methods: {
		scrollToError: function scrollToError() {
			$('.invalid-container').first().parents('.checklist-item').velocity('scroll', {
				offset: -1 * Object(dom_utils["a" /* getHeaderHeight */])()
			});
		}
	},

	components: {
		BootstrapAlert: BootstrapAlert["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5ee8df1c","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/SectionErrors.vue
var SectionErrors_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.validation && !_vm.validation.valid
    ? _c("bootstrap-alert", [
        _c("p", [
          _vm._v(
            "\n\t\t" +
              _vm._s(_vm.errors.length) +
              " error" +
              _vm._s(_vm.errors.length !== 1 ? "s" : "") +
              "\n\t\ton current page\n\t"
          )
        ]),
        _vm._v(" "),
        _c(
          "button",
          {
            staticClass: "btn btn-danger",
            attrs: { type: "button" },
            on: { click: _vm.scrollToError }
          },
          [_vm._v("\n\t\tScroll to error\n\t")]
        )
      ])
    : _vm._e()
}
var SectionErrors_staticRenderFns = []
SectionErrors_render._withStripped = true
var SectionErrors_esExports = { render: SectionErrors_render, staticRenderFns: SectionErrors_staticRenderFns }
/* harmony default export */ var Checklist_SectionErrors = (SectionErrors_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ee8df1c", SectionErrors_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/SectionErrors.vue
var SectionErrors_disposed = false
function SectionErrors_injectStyle (ssrContext) {
  if (SectionErrors_disposed) return
  __webpack_require__(474)
}
var SectionErrors_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var SectionErrors___vue_template_functional__ = false
/* styles */
var SectionErrors___vue_styles__ = SectionErrors_injectStyle
/* scopeId */
var SectionErrors___vue_scopeId__ = "data-v-5ee8df1c"
/* moduleIdentifier (server only) */
var SectionErrors___vue_module_identifier__ = null
var SectionErrors_Component = SectionErrors_normalizeComponent(
  SectionErrors,
  Checklist_SectionErrors,
  SectionErrors___vue_template_functional__,
  SectionErrors___vue_styles__,
  SectionErrors___vue_scopeId__,
  SectionErrors___vue_module_identifier__
)
SectionErrors_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/SectionErrors.vue"
if (SectionErrors_Component.esModule && Object.keys(SectionErrors_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ee8df1c", SectionErrors_Component.options)
  } else {
    hotAPI.reload("data-v-5ee8df1c", SectionErrors_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    SectionErrors_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_SectionErrors = (SectionErrors_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/ChecklistErrors.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var ChecklistErrors = ({
	props: {
		pages: {
			type: Array,
			required: true
		}
	},

	computed: {
		pageValidations: function pageValidations() {
			if (!this.pages) return [];

			return this.pages.map(validate["d" /* section */]);
		},
		pagesValid: function pagesValid() {
			return this.pageValidations.every(function (validation) {
				return validation.valid;
			});
		},
		pageErrors: function pageErrors() {
			return this.pageValidations.map(function (validation) {
				return Object(validate["b" /* flattenErrors */])(validation.errors);
			});
		}
	},

	components: {
		BootstrapAlert: BootstrapAlert["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-52eb0373","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/ChecklistErrors.vue
var ChecklistErrors_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      !_vm.pagesValid
        ? _c("bootstrap-alert", [
            _c("strong", [_vm._v("Checklist errors")]),
            _vm._v(" "),
            _c(
              "ul",
              _vm._l(_vm.pageErrors, function(errors, pageNum) {
                return errors.length > 0
                  ? _c("li", [
                      _vm._v(
                        "\n\t\t\t\t" +
                          _vm._s(errors.length) +
                          " error" +
                          _vm._s(errors.length === 1 ? "" : "s") +
                          "\n\t\t\t\ton page " +
                          _vm._s(pageNum + 1) +
                          ".\n\t\t\t\t"
                      ),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-default",
                          attrs: { type: "button" },
                          on: {
                            click: function($event) {
                              _vm.$emit("navigate", pageNum)
                            }
                          }
                        },
                        [_vm._v("\n\t\t\t\t\tGo to page\n\t\t\t\t")]
                      )
                    ])
                  : _vm._e()
              })
            )
          ])
        : _c("bootstrap-alert", { attrs: { type: "success" } }, [
            _vm._v("\n\t\tNo errors in checklist!\n\t")
          ])
    ],
    1
  )
}
var ChecklistErrors_staticRenderFns = []
ChecklistErrors_render._withStripped = true
var ChecklistErrors_esExports = { render: ChecklistErrors_render, staticRenderFns: ChecklistErrors_staticRenderFns }
/* harmony default export */ var Checklist_ChecklistErrors = (ChecklistErrors_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-52eb0373", ChecklistErrors_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/ChecklistErrors.vue
var ChecklistErrors_disposed = false
var ChecklistErrors_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ChecklistErrors___vue_template_functional__ = false
/* styles */
var ChecklistErrors___vue_styles__ = null
/* scopeId */
var ChecklistErrors___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ChecklistErrors___vue_module_identifier__ = null
var ChecklistErrors_Component = ChecklistErrors_normalizeComponent(
  ChecklistErrors,
  Checklist_ChecklistErrors,
  ChecklistErrors___vue_template_functional__,
  ChecklistErrors___vue_styles__,
  ChecklistErrors___vue_scopeId__,
  ChecklistErrors___vue_module_identifier__
)
ChecklistErrors_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/ChecklistErrors.vue"
if (ChecklistErrors_Component.esModule && Object.keys(ChecklistErrors_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52eb0373", ChecklistErrors_Component.options)
  } else {
    hotAPI.reload("data-v-52eb0373", ChecklistErrors_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ChecklistErrors_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_ChecklistErrors = (ChecklistErrors_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/ConfirmationButton.vue + 2 modules
var ConfirmationButton = __webpack_require__(20);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/ProgressBullets.vue
//
//
//
//
//
//
//
//

/* harmony default export */ var ProgressBullets = ({
	props: {
		type: {
			type: String,
			default: 'bar'
		},
		min: {
			type: Number,
			default: 0
		},
		max: {
			type: Number,
			required: true
		},
		value: {
			type: Number,
			required: true
		},
		stepName: {
			type: String,
			default: 'Page'
		}
	},

	computed: {
		label: function label() {
			return this.stepName + ' ' + this.value + ' of ' + this.max;
		}
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7b09133f","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/ProgressBullets.vue
var ProgressBullets_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "progress-bullets",
      attrs: {
        role: "progressbar",
        "aria-valuemin": _vm.min,
        "aria-valuemax": _vm.max,
        "aria-valuenow": _vm.value,
        title: _vm.label
      }
    },
    _vm._l(_vm.max, function(i) {
      return _c("div", {
        staticClass: "bullet",
        class: { filled: i <= _vm.value }
      })
    })
  )
}
var ProgressBullets_staticRenderFns = []
ProgressBullets_render._withStripped = true
var ProgressBullets_esExports = { render: ProgressBullets_render, staticRenderFns: ProgressBullets_staticRenderFns }
/* harmony default export */ var vue_components_ProgressBullets = (ProgressBullets_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7b09133f", ProgressBullets_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/ProgressBullets.vue
var ProgressBullets_disposed = false
function ProgressBullets_injectStyle (ssrContext) {
  if (ProgressBullets_disposed) return
  __webpack_require__(477)
}
var ProgressBullets_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ProgressBullets___vue_template_functional__ = false
/* styles */
var ProgressBullets___vue_styles__ = ProgressBullets_injectStyle
/* scopeId */
var ProgressBullets___vue_scopeId__ = "data-v-7b09133f"
/* moduleIdentifier (server only) */
var ProgressBullets___vue_module_identifier__ = null
var ProgressBullets_Component = ProgressBullets_normalizeComponent(
  ProgressBullets,
  vue_components_ProgressBullets,
  ProgressBullets___vue_template_functional__,
  ProgressBullets___vue_styles__,
  ProgressBullets___vue_scopeId__,
  ProgressBullets___vue_module_identifier__
)
ProgressBullets_Component.options.__file = "resources/assets/js/vue-components/ProgressBullets.vue"
if (ProgressBullets_Component.esModule && Object.keys(ProgressBullets_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b09133f", ProgressBullets_Component.options)
  } else {
    hotAPI.reload("data-v-7b09133f", ProgressBullets_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ProgressBullets_disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_ProgressBullets = (ProgressBullets_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/BootstrapPopover.vue
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var BootstrapPopover = ({
	props: {
		content: {
			type: [String, Function],
			require: true
		},
		animation: {
			type: Boolean,
			default: true
		},
		container: {
			type: [String, Boolean],
			default: false
		},
		delay: {
			type: [Number, Object],
			default: 0
		},
		html: {
			type: Boolean,
			default: false
		},
		placement: {
			type: [String, Function],
			default: 'auto top'
		},
		template: {
			type: String,
			required: false
		},
		trigger: {
			type: String,
			default: 'focus'
		}
	},

	mounted: function mounted() {
		$(this.$refs.container).popover({
			animation: this.animation,
			container: this.container,
			delay: this.delay,
			html: this.html,
			placement: this.placement,
			template: this.template,
			trigger: this.trigger,
			content: this.content
		});
	},


	methods: {
		handleClick: function handleClick(event) {
			event.preventDefault();
			this.$emit('click');
		}
	},

	destroy: function destroy() {
		$(this.$refs.container).popover('destroy');
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4f512428","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/BootstrapPopover.vue
var BootstrapPopover_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "a",
    {
      ref: "container",
      staticClass: "btn btn-default",
      attrs: { href: "#", tabindex: "0" },
      on: { click: _vm.handleClick }
    },
    [_vm._t("default")],
    2
  )
}
var BootstrapPopover_staticRenderFns = []
BootstrapPopover_render._withStripped = true
var BootstrapPopover_esExports = { render: BootstrapPopover_render, staticRenderFns: BootstrapPopover_staticRenderFns }
/* harmony default export */ var vue_components_BootstrapPopover = (BootstrapPopover_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4f512428", BootstrapPopover_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/BootstrapPopover.vue
var BootstrapPopover_disposed = false
var BootstrapPopover_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var BootstrapPopover___vue_template_functional__ = false
/* styles */
var BootstrapPopover___vue_styles__ = null
/* scopeId */
var BootstrapPopover___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var BootstrapPopover___vue_module_identifier__ = null
var BootstrapPopover_Component = BootstrapPopover_normalizeComponent(
  BootstrapPopover,
  vue_components_BootstrapPopover,
  BootstrapPopover___vue_template_functional__,
  BootstrapPopover___vue_styles__,
  BootstrapPopover___vue_scopeId__,
  BootstrapPopover___vue_module_identifier__
)
BootstrapPopover_Component.options.__file = "resources/assets/js/vue-components/BootstrapPopover.vue"
if (BootstrapPopover_Component.esModule && Object.keys(BootstrapPopover_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f512428", BootstrapPopover_Component.options)
  } else {
    hotAPI.reload("data-v-4f512428", BootstrapPopover_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    BootstrapPopover_disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_BootstrapPopover = (BootstrapPopover_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PagerControls.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var PagerControls = ({
	props: {
		currentPage: {
			type: Number,
			required: true
		},
		totalPages: {
			type: Number,
			required: true
		},
		submitText: {
			type: String,
			default: 'Submit'
		},
		forwardText: {
			type: String,
			default: 'Next page'
		},
		backText: {
			type: String,
			default: 'Back'
		},
		canGoBackPage: {
			type: Boolean,
			required: true
		},
		canAdvancePage: {
			type: Boolean,
			required: true
		},
		canSubmit: {
			type: Boolean,
			required: true
		},
		readonly: {
			type: Boolean,
			required: true
		}
	},

	computed: {
		submitHelp: function submitHelp() {
			if (!this.canSubmit) {
				return 'There are errors preventing you from submitting the form, ' + 'please show checklist validation to see them.';
			}
		}
	},

	components: {
		ConfirmationButton: ConfirmationButton["a" /* default */],
		ProgressBullets: js_vue_components_ProgressBullets,
		BootstrapPopover: js_vue_components_BootstrapPopover
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8aa3b4f0","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PagerControls.vue
var PagerControls_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "pager-controls" },
    [
      _c("div", { staticClass: "button-container" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-default button-container-primary",
            attrs: { type: "button", disabled: !_vm.canGoBackPage },
            on: {
              click: function($event) {
                _vm.$emit("back")
              }
            }
          },
          [_vm._v("\n\t\t\t" + _vm._s(_vm.backText) + "\n\t\t")]
        )
      ]),
      _vm._v(" "),
      _c("progress-bullets", {
        attrs: { max: _vm.totalPages, value: _vm.currentPage + 1 }
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "button-container text-right" },
        [
          _vm.currentPage < _vm.totalPages - 1
            ? _c(
                "button",
                {
                  staticClass: "btn btn-default button-container-primary",
                  attrs: { type: "button", disabled: !_vm.canAdvancePage },
                  on: {
                    click: function($event) {
                      _vm.$emit("forward")
                    }
                  }
                },
                [_vm._v("\n\t\t\t" + _vm._s(_vm.forwardText) + "\n\t\t")]
              )
            : !_vm.readonly
              ? [
                  !_vm.canSubmit
                    ? _c(
                        "bootstrap-popover",
                        {
                          attrs: {
                            placement: "auto bottom",
                            content: _vm.submitHelp
                          }
                        },
                        [
                          _c("span", {
                            staticClass: "glyphicon glyphicon-question-sign"
                          })
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "confirmation-button",
                    {
                      staticClass: "btn btn-primary button-container-primary",
                      attrs: {
                        "pressed-class": "btn-success",
                        disabled: !_vm.canSubmit,
                        title: _vm.submitHelp
                      },
                      on: {
                        click: function($event) {
                          _vm.$emit("submit")
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n\t\t\t\t" + _vm._s(_vm.submitText) + "\n\t\t\t\t"
                      ),
                      _c(
                        "template",
                        { attrs: { slot: "pressed" }, slot: "pressed" },
                        [_vm._v("\n\t\t\t\t\tConfirm\n\t\t\t\t")]
                      )
                    ],
                    2
                  )
                ]
              : _vm._e()
        ],
        2
      )
    ],
    1
  )
}
var PagerControls_staticRenderFns = []
PagerControls_render._withStripped = true
var PagerControls_esExports = { render: PagerControls_render, staticRenderFns: PagerControls_staticRenderFns }
/* harmony default export */ var Questionnaire_PagerControls = (PagerControls_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8aa3b4f0", PagerControls_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/PagerControls.vue
var PagerControls_disposed = false
function PagerControls_injectStyle (ssrContext) {
  if (PagerControls_disposed) return
  __webpack_require__(476)
}
var PagerControls_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var PagerControls___vue_template_functional__ = false
/* styles */
var PagerControls___vue_styles__ = PagerControls_injectStyle
/* scopeId */
var PagerControls___vue_scopeId__ = "data-v-8aa3b4f0"
/* moduleIdentifier (server only) */
var PagerControls___vue_module_identifier__ = null
var PagerControls_Component = PagerControls_normalizeComponent(
  PagerControls,
  Questionnaire_PagerControls,
  PagerControls___vue_template_functional__,
  PagerControls___vue_styles__,
  PagerControls___vue_scopeId__,
  PagerControls___vue_module_identifier__
)
PagerControls_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PagerControls.vue"
if (PagerControls_Component.esModule && Object.keys(PagerControls_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8aa3b4f0", PagerControls_Component.options)
  } else {
    hotAPI.reload("data-v-8aa3b4f0", PagerControls_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    PagerControls_disposed = true
  })
})()}

/* harmony default export */ var vue_components_Questionnaire_PagerControls = (PagerControls_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Pager.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








vue_common_default.a.use(vue_router_esm["a" /* default */]);

/* harmony default export */ var Pager = ({
	props: {
		pages: {
			type: Array,
			required: true
		},
		pageValidator: {
			type: Function,
			default: function _default() {
				return true;
			}
		},
		checklistValidator: {
			type: Function,
			default: function _default() {
				return true;
			}
		},
		submitText: {
			type: String,
			default: 'Submit'
		},
		forwardText: {
			type: String,
			default: 'Next page'
		},
		backText: {
			type: String,
			default: 'Back'
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},
	data: function data() {
		return {
			// currentPage: 0,
			lastChange: ''
		};
	},


	computed: {
		page: function page() {
			return this.pages[this.currentPage];
		},
		canGoBackPage: function canGoBackPage() {
			return this.currentPage > 0;
		},
		canAdvancePage: function canAdvancePage() {
			return this.pageValidator(this.pages[this.currentPage]);
		},
		canSubmit: function canSubmit() {
			return this.checklistValidator({ pages: this.pages });
		},
		currentPage: function currentPage() {
			if (this.$route && this.$route.query && 'page' in this.$route.query) {
				var page = Number(this.$route.query.page) - 1;

				if (Number.isNaN(page) || page < 0) {
					this.goToPage(0);
				} else if (page > this.pages.length - 1) {
					this.goToPage(this.pages.length - 1);
				} else {
					return page;
				}
			}

			return 0;
		}
	},

	watch: {
		currentPage: function currentPage(_currentPage, prevPage) {
			if (_currentPage > prevPage) this.lastChange = 'forward';else if (_currentPage < prevPage) this.lastChange = 'back';else this.lastChange = '';
		}
	},

	methods: {
		scrollToTop: function scrollToTop() {
			$(this.$refs.pager).velocity('scroll', {
				offset: -1 * Object(dom_utils["a" /* getHeaderHeight */])()
			});
		},
		scrollToBottom: function scrollToBottom() {
			$(this.$refs.pager).velocity('scroll', {
				offset: this.$refs.pager.clientHeight - window.innerHeight
			});
		},
		goBack: function goBack() {
			if (this.canGoBackPage) this.goToPage(this.currentPage - 1);
		},
		advance: function advance() {
			if (this.canAdvancePage) this.goToPage(this.currentPage + 1);
		},
		goToPage: function goToPage(page) {
			page = page + 1;
			var location = Object.assign({}, this.$route, { query: { page: page } });
			this.$router.push(location);
		},
		submit: function submit() {
			if (this.canSubmit) this.$emit('submit');
		}
	},

	components: {
		PagerControls: vue_components_Questionnaire_PagerControls
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a814e09c","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/Pager.vue
var Pager_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { ref: "pager", staticClass: "questionnaire-pager" },
    [
      _vm._t("header", null, { goToPage: _vm.goToPage, pages: _vm.pages }),
      _vm._v(" "),
      _c("pager-controls", {
        attrs: {
          "current-page": _vm.currentPage,
          "total-pages": _vm.pages.length,
          "submit-text": _vm.submitText,
          "forward-text": _vm.forwardText,
          "back-text": _vm.backText,
          "can-advance-page": _vm.canAdvancePage,
          "can-go-back-page": _vm.canGoBackPage,
          "can-submit": _vm.canSubmit,
          readonly: _vm.readonly
        },
        on: { back: _vm.goBack, forward: _vm.advance, submit: _vm.submit }
      }),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "scroll-button btn",
          attrs: { type: "button" },
          on: { click: _vm.scrollToBottom }
        },
        [
          _c("span", { staticClass: "glyphicon glyphicon-arrow-down" }),
          _vm._v("\n\t\tScroll to bottom\n\t")
        ]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "pager-content" },
        [
          _vm._t("default", null, {
            page: _vm.page,
            pageNum: _vm.currentPage,
            lastChange: _vm.lastChange
          })
        ],
        2
      ),
      _vm._v(" "),
      _c(
        "button",
        {
          staticClass: "scroll-button btn",
          attrs: { type: "button" },
          on: { click: _vm.scrollToTop }
        },
        [
          _c("span", { staticClass: "glyphicon glyphicon-arrow-up" }),
          _vm._v("\n\t\tScroll to top\n\t")
        ]
      ),
      _vm._v(" "),
      _c("pager-controls", {
        attrs: {
          "current-page": _vm.currentPage,
          "total-pages": _vm.pages.length,
          "submit-text": _vm.submitText,
          "forward-text": _vm.forwardText,
          "back-text": _vm.backText,
          "can-advance-page": _vm.canAdvancePage,
          "can-go-back-page": _vm.canGoBackPage,
          "can-submit": _vm.canSubmit,
          readonly: _vm.readonly,
          bottom: ""
        },
        on: { back: _vm.goBack, forward: _vm.advance, submit: _vm.submit }
      }),
      _vm._v(" "),
      _vm._t("footer", null, { goToPage: _vm.goToPage, pages: _vm.pages })
    ],
    2
  )
}
var Pager_staticRenderFns = []
Pager_render._withStripped = true
var Pager_esExports = { render: Pager_render, staticRenderFns: Pager_staticRenderFns }
/* harmony default export */ var Questionnaire_Pager = (Pager_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a814e09c", Pager_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/Pager.vue
var Pager_disposed = false
function Pager_injectStyle (ssrContext) {
  if (Pager_disposed) return
  __webpack_require__(475)
}
var Pager_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Pager___vue_template_functional__ = false
/* styles */
var Pager___vue_styles__ = Pager_injectStyle
/* scopeId */
var Pager___vue_scopeId__ = "data-v-a814e09c"
/* moduleIdentifier (server only) */
var Pager___vue_module_identifier__ = null
var Pager_Component = Pager_normalizeComponent(
  Pager,
  Questionnaire_Pager,
  Pager___vue_template_functional__,
  Pager___vue_styles__,
  Pager___vue_scopeId__,
  Pager___vue_module_identifier__
)
Pager_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Pager.vue"
if (Pager_Component.esModule && Object.keys(Pager_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a814e09c", Pager_Component.options)
  } else {
    hotAPI.reload("data-v-a814e09c", Pager_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Pager_disposed = true
  })
})()}

/* harmony default export */ var vue_components_Questionnaire_Pager = (Pager_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/ShowHideButton.vue + 2 modules
var ShowHideButton = __webpack_require__(8);

// EXTERNAL MODULE: ./resources/assets/js/modules/merit-utils.js
var merit_utils = __webpack_require__(47);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//










/* harmony default export */ var Checklist = ({
	props: {
		title: {
			type: String,
			required: true
		},
		pages: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: false
		}
	},
	data: function data() {
		return {
			show: {
				errors: false
			}
		};
	},


	methods: {
		checklistIsValid: merit_utils["a" /* checklistIsValid */],
		handleInput: function handleInput(pageNum, page) {
			var pages = this.pages.slice();
			pages[pageNum] = Object.assign({}, pages[pageNum], page);

			this.$emit('input', { pages: pages });
		},
		handleSave: function handleSave() {
			this.$emit('save');
		},
		handleSubmit: function handleSubmit() {
			this.$emit('submit');
		},
		handleClose: function handleClose() {
			this.$emit('close');
		}
	},

	components: {
		ChecklistSection: MeritCompensation_Checklist_Section,
		SectionErrors: MeritCompensation_Checklist_SectionErrors,
		ChecklistErrors: MeritCompensation_Checklist_ChecklistErrors,
		ConfirmationButton: ConfirmationButton["a" /* default */],
		QuestionnairePager: vue_components_Questionnaire_Pager,
		ShowHideButton: ShowHideButton["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-08bc7d30","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue
var Checklist_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "checklist" },
    [
      _c("h1", [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c("questionnaire-pager", {
        attrs: {
          pages: _vm.pages,
          readonly: _vm.readonly,
          "checklist-validator": _vm.checklistIsValid
        },
        on: { submit: _vm.handleSubmit },
        scopedSlots: _vm._u([
          {
            key: "header",
            fn: function(pager) {
              return [
                _c(
                  "div",
                  { staticClass: "text-right" },
                  [
                    _c(
                      "show-hide-button",
                      {
                        staticClass: "btn btn-info btn-sm",
                        model: {
                          value: _vm.show.errors,
                          callback: function($$v) {
                            _vm.$set(_vm.show, "errors", $$v)
                          },
                          expression: "show.errors"
                        }
                      },
                      [
                        _vm._v("\n\t\t\t\t\tchecklist validation\n\t\t\t\t\t"),
                        _c("span", {
                          staticClass: "glyphicon glyphicon-ok",
                          attrs: { slot: "glyph" },
                          slot: "glyph"
                        })
                      ]
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.show.errors
                  ? _c("checklist-errors", {
                      attrs: { pages: pager.pages },
                      on: { navigate: pager.goToPage }
                    })
                  : _vm._e()
              ]
            }
          },
          {
            key: "default",
            fn: function(pager) {
              return [
                _vm.show.errors
                  ? _c("section-errors", { attrs: { page: pager.page } })
                  : _vm._e(),
                _vm._v(" "),
                _c(
                  "transition",
                  { attrs: { name: "checklist-pager-" + pager.lastChange } },
                  [
                    _c(
                      "checklist-section",
                      _vm._b(
                        {
                          key: "page-" + pager.pageNum,
                          attrs: {
                            page: true,
                            readonly: _vm.readonly,
                            user: _vm.user,
                            "show-errors": _vm.show.errors
                          },
                          on: {
                            input: function($event) {
                              _vm.handleInput(pager.pageNum, arguments[0])
                            }
                          }
                        },
                        "checklist-section",
                        pager.page,
                        false
                      )
                    )
                  ],
                  1
                ),
                _vm._v(" "),
                _vm.show.errors
                  ? _c("section-errors", { attrs: { page: pager.page } })
                  : _vm._e()
              ]
            }
          }
        ])
      }),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "text-center" },
        [
          _vm.readonly
            ? _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { type: "button" },
                  on: { click: _vm.handleClose }
                },
                [_vm._v("\n\t\t\tClose\n\t\t")]
              )
            : _c(
                "confirmation-button",
                {
                  staticClass: "btn btn-default",
                  attrs: { "pressed-class": "btn btn-warning" },
                  on: { click: _vm.handleClose }
                },
                [
                  _vm._v("\n\t\t\tClose\n\t\t\t"),
                  _c(
                    "template",
                    { attrs: { slot: "pressed" }, slot: "pressed" },
                    [_vm._v("\n\t\t\t\tYes, close without saving\n\t\t\t")]
                  )
                ],
                2
              ),
          _vm._v(" "),
          !_vm.readonly
            ? _c(
                "button",
                {
                  staticClass: "btn btn-info",
                  attrs: { type: "button" },
                  on: { click: _vm.handleSave }
                },
                [_vm._v("\n\t\t\tSave and close\n\t\t")]
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var Checklist_staticRenderFns = []
Checklist_render._withStripped = true
var Checklist_esExports = { render: Checklist_render, staticRenderFns: Checklist_staticRenderFns }
/* harmony default export */ var Checklist_Checklist = (Checklist_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-08bc7d30", Checklist_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue
var Checklist_disposed = false
function Checklist_injectStyle (ssrContext) {
  if (Checklist_disposed) return
  __webpack_require__(471)
}
var Checklist_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Checklist___vue_template_functional__ = false
/* styles */
var Checklist___vue_styles__ = Checklist_injectStyle
/* scopeId */
var Checklist___vue_scopeId__ = "data-v-08bc7d30"
/* moduleIdentifier (server only) */
var Checklist___vue_module_identifier__ = null
var Checklist_Component = Checklist_normalizeComponent(
  Checklist,
  Checklist_Checklist,
  Checklist___vue_template_functional__,
  Checklist___vue_styles__,
  Checklist___vue_scopeId__,
  Checklist___vue_module_identifier__
)
Checklist_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue"
if (Checklist_Component.esModule && Object.keys(Checklist_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-08bc7d30", Checklist_Component.options)
  } else {
    hotAPI.reload("data-v-08bc7d30", Checklist_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Checklist_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_Checklist = (Checklist_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/AcademicYearSelector.vue + 2 modules
var AcademicYearSelector = __webpack_require__(130);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/LoadingButton.vue + 2 modules
var LoadingButton = __webpack_require__(144);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/RichDateRange.vue + 2 modules
var RichDateRange = __webpack_require__(131);

// EXTERNAL MODULE: ./resources/assets/js/modules/date-utils.js
var date_utils = __webpack_require__(7);

// EXTERNAL MODULE: ./resources/assets/js/modules/utils.js
var utils = __webpack_require__(1);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Report.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//













/* harmony default export */ var Report = ({
	props: {
		id: {
			type: Number,
			required: false
		},
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		},
		status: {
			type: String,
			default: 'pending'
		},
		notes: {
			type: String,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		user_id: {
			type: [String, Number],
			required: true
		},
		form_id: {
			type: [String, Number],
			required: true
		},
		currentUser: {
			type: Object,
			required: true
		}
	},
	data: function data() {
		return {
			dates: {
				startDate: this.period_start,
				endDate: this.period_end
			},
			checklist: this.report,
			inputNotes: this.notes || '',
			savingNotes: '',

			saving: false,
			savingSuccessful: false,

			show: {
				notes: false
			}
		};
	},


	computed: {
		userIsAdmin: function userIsAdmin() {
			return Object(utils["t" /* isAdmin */])(this.currentUser);
		},
		readonly: function readonly() {
			return !['pending', 'open for editing'].includes(this.status);
		},
		checkedItems: function checkedItems() {
			return Object(merit_utils["c" /* getCheckedItemCount */])(this.report);
		},
		lastMonth: function lastMonth() {
			return Object(date_utils["isoDateString"])(external__moment__default()().subtract(1, 'month'));
		}
	},

	watch: {
		period_start: function period_start(_period_start) {
			this.dates = Object.assign({}, this.dates, { startDate: _period_start });
		},
		period_end: function period_end(_period_end) {
			this.dates = Object.assign({}, this.dates, { endDate: _period_end });
		},
		report: function report(_report) {
			this.checklist = _report;
		},
		notes: function notes(_notes) {
			this.inputNotes = _notes;
		}
	},

	methods: {
		handleChecklistInput: function handleChecklistInput(checklist) {
			if (this.readonly) return;

			this.checklist = Object.assign({}, this.checklist, checklist);
			if (this.currentUser.id === this.user_id) {
				this.handleSubmit(false);
			}
		},
		handleSaveNotes: function handleSaveNotes() {
			if (!this.userIsAdmin) return;

			this.$emit('save', {
				id: this.id,
				notes: this.inputNotes
			}, false);
		},
		handleSave: function handleSave() {
			var _this = this;

			this.handleSubmit(false).then(function () {
				_this.$emit('reload');
				_this.handleClose(); // FIXME: Probably shouldn't close here
			});
		},
		handleComplete: function handleComplete() {
			var _this2 = this;

			this.handleSubmit(true).then(function () {
				_this2.$emit('reload');
				_this2.handleClose();
			});
		},
		handleSubmit: function handleSubmit(isComplete) {
			var _this3 = this;

			if (this.readonly || !this.currentUser || !this.user_id) return;

			var form_id = Number(this.form_id);
			var user_id = Number(this.user_id);

			if (Number.isNaN(form_id) || Number.isNaN(user_id)) return;

			var changes = {
				_method: 'PATCH',
				period_start: this.dates.startDate,
				period_end: this.dates.endDate,
				report: this.checklist,
				user_id: user_id,
				form_id: form_id
			};

			if (isComplete) changes.status = 'complete';

			var meritReport = Object.assign({
				id: this.id,
				period_start: this.period_start,
				period_end: this.period_end,
				status: this.status,
				notes: this.notes
			}, changes);

			this.saving = true;

			return fetch('/merits/' + meritReport.id, {
				method: 'POST', // PATCH
				headers: Object(utils["o" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(meritReport)
			}).then(utils["x" /* okOrThrow */]).then(function () {
				_this3.savingSuccessful = true;
				_this3.saving = false;
			}).catch(function (err) {
				_this3.savingSuccessful = false;
				_this3.saving = false;
				console.error(err);
				_this3.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem saving the report'
				});
			});
		},
		handleClose: function handleClose() {
			this.$emit('close');
		}
	},

	components: {
		MeritCompensationChecklist: MeritCompensation_Checklist_Checklist,

		AcademicYearSelector: AcademicYearSelector["a" /* default */],
		LoadingButton: LoadingButton["a" /* default */],
		RichDateRange: RichDateRange["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6ff62c0e","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Report.vue
var Report_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "close-container" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-default",
            attrs: { type: "button" },
            on: { click: _vm.handleClose }
          },
          [_c("span", { staticClass: "glyphicon glyphicon-chevron-left" })]
        )
      ]),
      _vm._v(" "),
      _vm.readonly
        ? _c("div", { staticClass: "form-summary panel panel-default" }, [
            _c("div", { staticClass: "panel-body" }, [
              _c("div", { staticClass: "row" }, [
                _c(
                  "div",
                  { staticClass: "col-sm-6" },
                  [
                    _c("small", [_vm._v("Report period")]),
                    _vm._v(" "),
                    _c("rich-date-range", { attrs: { dates: _vm.dates } })
                  ],
                  1
                ),
                _vm._v(" "),
                _c("div", { staticClass: "col-sm-6" }, [
                  _c("small", [_vm._v("Checked items")]),
                  _vm._v(
                    "\n\t\t\t\t\t" + _vm._s(_vm.checkedItems) + "\n\t\t\t\t"
                  )
                ])
              ])
            ])
          ])
        : _c("div", [
            _c("div", { staticClass: "form-group" }, [
              _c(
                "label",
                { staticClass: "containing-label" },
                [
                  _vm._v("\n\t\t\t\tReport period\n\t\t\t\t"),
                  _c("academic-year-selector", {
                    attrs: { "min-date": _vm.lastMonth },
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
        "merit-compensation-checklist",
        _vm._b(
          {
            attrs: {
              title: _vm.title,
              readonly: _vm.readonly,
              user: _vm.currentUser
            },
            on: {
              input: _vm.handleChecklistInput,
              save: _vm.handleSave,
              close: _vm.handleClose,
              submit: _vm.handleComplete
            }
          },
          "merit-compensation-checklist",
          _vm.checklist,
          false
        )
      ),
      _vm._v(" "),
      !_vm.show.notes && (_vm.notes || _vm.userIsAdmin)
        ? _c("div", { staticClass: "panel panel-default notes-container" }, [
            _c("div", { staticClass: "panel-heading" }, [
              _vm._v("\n\t\t\tNotes\n\t\t")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "panel-body" }, [
              _c("textarea", {
                staticClass: "form-control",
                attrs: { readonly: "" },
                domProps: { value: _vm.notes }
              })
            ]),
            _vm._v(" "),
            _vm.userIsAdmin
              ? _c("div", { staticClass: "panel-footer text-center" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-info",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          _vm.show.notes = true
                        }
                      }
                    },
                    [_vm._v("\n\t\t\t\tEdit notes\n\t\t\t")]
                  )
                ])
              : _vm._e()
          ])
        : _vm._e(),
      _vm._v(" "),
      _vm.show.notes
        ? _c("div", { staticClass: "panel panel-default notes-container" }, [
            _c("div", { staticClass: "panel-heading" }, [
              _vm._v("\n\t\t\tNotes\n\t\t")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "panel-body" }, [
              _c("textarea", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.inputNotes,
                    expression: "inputNotes"
                  }
                ],
                staticClass: "form-control",
                domProps: { value: _vm.inputNotes },
                on: {
                  input: function($event) {
                    if ($event.target.composing) {
                      return
                    }
                    _vm.inputNotes = $event.target.value
                  }
                }
              })
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "panel-footer text-center" },
              [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-default",
                    attrs: { type: "button" },
                    on: {
                      click: function($event) {
                        _vm.show.notes = false
                      }
                    }
                  },
                  [_vm._v("\n\t\t\t\tCancel\n\t\t\t")]
                ),
                _vm._v(" "),
                _c(
                  "loading-button",
                  {
                    attrs: {
                      "loading-class": "btn-primary",
                      tooltip: "Saved!",
                      loading: _vm.saving,
                      successful: _vm.savingSuccessful
                    }
                  },
                  [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { type: "button" },
                        on: { click: _vm.handleSaveNotes }
                      },
                      [_vm._v("\n\t\t\t\t\tSave notes\n\t\t\t\t")]
                    )
                  ]
                )
              ],
              1
            )
          ])
        : _vm._e()
    ],
    1
  )
}
var Report_staticRenderFns = []
Report_render._withStripped = true
var Report_esExports = { render: Report_render, staticRenderFns: Report_staticRenderFns }
/* harmony default export */ var MeritCompensation_Report = (Report_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6ff62c0e", Report_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Report.vue
var Report_disposed = false
function Report_injectStyle (ssrContext) {
  if (Report_disposed) return
  __webpack_require__(470)
}
var Report_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Report___vue_template_functional__ = false
/* styles */
var Report___vue_styles__ = Report_injectStyle
/* scopeId */
var Report___vue_scopeId__ = "data-v-6ff62c0e"
/* moduleIdentifier (server only) */
var Report___vue_module_identifier__ = null
var Report_Component = Report_normalizeComponent(
  Report,
  MeritCompensation_Report,
  Report___vue_template_functional__,
  Report___vue_styles__,
  Report___vue_scopeId__,
  Report___vue_module_identifier__
)
Report_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Report.vue"
if (Report_Component.esModule && Object.keys(Report_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ff62c0e", Report_Component.options)
  } else {
    hotAPI.reload("data-v-6ff62c0e", Report_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Report_disposed = true
  })
})()}

/* harmony default export */ var vue_components_MeritCompensation_Report = (Report_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/ReportById.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var ReportById = ({
	props: {
		id: {
			type: [Number, String],
			required: true
		},
		meritReports: {
			type: Array,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		currentUser: {
			type: Object,
			required: false
		}
	},

	data: function data() {
		return {
			fetchedReports: null
		};
	},


	computed: {
		reports: function reports() {
			return this.meritReports || this.fetchedReports;
		},
		meritReport: function meritReport() {
			var id = Number(this.id);
			if (Number.isNaN(id) || !this.reports) return;

			return this.reports.find(function (report) {
				return report.id === id;
			});
		}
	},

	mounted: function mounted() {
		if (!this.meritReports || !Array.isArray(this.meritReports) || this.meritReports.length === 0) {
			this.fetchReports();
		}
	},


	methods: {
		fetchReports: function fetchReports() {
			var _this = this;

			Object(merit_utils["b" /* fetchAllMeritReports */])().then(function (merits) {
				_this.fetchedReports = merits;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching past merit reports'
				});
			});
		}
	},

	components: {
		MeritReport: vue_components_MeritCompensation_Report
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-785ad86b","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/ReportById.vue
var ReportById_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "report-by-id" }, [
    _vm.meritReport
      ? _c(
          "div",
          { staticClass: "container body-block" },
          [
            _c(
              "merit-report",
              _vm._b(
                {
                  attrs: {
                    title: _vm.title,
                    "current-user": _vm.currentUser,
                    form_id: _vm.meritReport.form.id
                  },
                  on: {
                    close: function($event) {
                      _vm.$emit("close")
                    },
                    reload: function($event) {
                      _vm.$emit("reload")
                    },
                    alert: function($event) {
                      _vm.$emit("alert", arguments[0])
                    }
                  }
                },
                "merit-report",
                _vm.meritReport,
                false
              )
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var ReportById_staticRenderFns = []
ReportById_render._withStripped = true
var ReportById_esExports = { render: ReportById_render, staticRenderFns: ReportById_staticRenderFns }
/* harmony default export */ var MeritCompensation_ReportById = (ReportById_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-785ad86b", ReportById_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/ReportById.vue
var ReportById_disposed = false
var ReportById_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ReportById___vue_template_functional__ = false
/* styles */
var ReportById___vue_styles__ = null
/* scopeId */
var ReportById___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ReportById___vue_module_identifier__ = null
var ReportById_Component = ReportById_normalizeComponent(
  ReportById,
  MeritCompensation_ReportById,
  ReportById___vue_template_functional__,
  ReportById___vue_styles__,
  ReportById___vue_scopeId__,
  ReportById___vue_module_identifier__
)
ReportById_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/ReportById.vue"
if (ReportById_Component.esModule && Object.keys(ReportById_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-785ad86b", ReportById_Component.options)
  } else {
    hotAPI.reload("data-v-785ad86b", ReportById_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ReportById_disposed = true
  })
})()}

/* harmony default export */ var vue_components_MeritCompensation_ReportById = (ReportById_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Section.vue







/* harmony default export */ var Summary_Section = ({
	extends: Section["a" /* default */],
	name: 'checklist-section',

	props: {
		user: {
			type: Object,
			required: false
		}
	},

	render: function render(h) {
		var _this = this;

		var items = this.items.filter(function (item) {
			return Object(merit_utils["g" /* itemIsChecked */])(item);
		}).map(function (item, index) {
			var componentName = void 0;
			switch (item.type) {
				case 'section':
					componentName = 'checklist-section';
					break;
				case 'instruction':
					componentName = 'questionnaire-instruction';
					break;
				case 'item':
					componentName = 'checklist-item';
					break;
			}

			return h(componentName, {
				props: Object.assign({
					readonly: _this.readonly,
					user: _this.user
				}, item),
				on: {
					input: function input(item) {
						var items = _this.items.slice();
						items[index] = Object.assign({}, items[index], item);

						_this.$emit('input', { items: items });
					}
				}
			});
		});

		if (this.title) items.unshift(h('h1', this.title));

		return h('section', {
			class: {
				page: this.page
			}
		}, items);
	},


	components: {
		ChecklistItem: MeritCompensation_Checklist_Item,
		QuestionnaireInstruction: Instruction["a" /* default */]
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Section.vue
var Summary_Section_disposed = false
function Summary_Section_injectStyle (ssrContext) {
  if (Summary_Section_disposed) return
  __webpack_require__(479)
}
var Summary_Section_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var Section___vue_template__ = null
/* template functional */
  var Summary_Section___vue_template_functional__ = false
/* styles */
var Summary_Section___vue_styles__ = Summary_Section_injectStyle
/* scopeId */
var Summary_Section___vue_scopeId__ = "data-v-5844d29e"
/* moduleIdentifier (server only) */
var Summary_Section___vue_module_identifier__ = null
var Summary_Section_Component = Summary_Section_normalizeComponent(
  Summary_Section,
  Section___vue_template__,
  Summary_Section___vue_template_functional__,
  Summary_Section___vue_styles__,
  Summary_Section___vue_scopeId__,
  Summary_Section___vue_module_identifier__
)
Summary_Section_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Section.vue"
if (Summary_Section_Component.esModule && Object.keys(Summary_Section_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5844d29e", Summary_Section_Component.options)
  } else {
    hotAPI.reload("data-v-5844d29e", Summary_Section_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Summary_Section_disposed = true
  })
})()}

/* harmony default export */ var Checklist_Summary_Section = (Summary_Section_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Checklist.vue
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var Summary_Checklist = ({
	props: {
		title: {
			type: String,
			required: true
		},
		pages: {
			type: Array,
			required: true
		}
	},

	computed: {
		filteredSections: function filteredSections() {
			return this.pages.filter(function (page) {
				return Object(merit_utils["g" /* itemIsChecked */])(page);
			});
		}
	},

	components: {
		SummarySection: Checklist_Summary_Section
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4fdf0ec2","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Checklist.vue
var Summary_Checklist_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "checklist" }, [
    _c("h1", [_vm._v(_vm._s(_vm.title))]),
    _vm._v(" "),
    _c(
      "div",
      _vm._l(_vm.filteredSections, function(section, index) {
        return _c(
          "summary-section",
          _vm._b(
            { key: index, attrs: { page: true, readonly: "" } },
            "summary-section",
            section,
            false
          )
        )
      })
    )
  ])
}
var Summary_Checklist_staticRenderFns = []
Summary_Checklist_render._withStripped = true
var Summary_Checklist_esExports = { render: Summary_Checklist_render, staticRenderFns: Summary_Checklist_staticRenderFns }
/* harmony default export */ var Checklist_Summary_Checklist = (Summary_Checklist_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4fdf0ec2", Summary_Checklist_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Checklist.vue
var Summary_Checklist_disposed = false
var Summary_Checklist_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Summary_Checklist___vue_template_functional__ = false
/* styles */
var Summary_Checklist___vue_styles__ = null
/* scopeId */
var Summary_Checklist___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Summary_Checklist___vue_module_identifier__ = null
var Summary_Checklist_Component = Summary_Checklist_normalizeComponent(
  Summary_Checklist,
  Checklist_Summary_Checklist,
  Summary_Checklist___vue_template_functional__,
  Summary_Checklist___vue_styles__,
  Summary_Checklist___vue_scopeId__,
  Summary_Checklist___vue_module_identifier__
)
Summary_Checklist_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Checklist.vue"
if (Summary_Checklist_Component.esModule && Object.keys(Summary_Checklist_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fdf0ec2", Summary_Checklist_Component.options)
  } else {
    hotAPI.reload("data-v-4fdf0ec2", Summary_Checklist_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Summary_Checklist_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_Summary_Checklist = (Summary_Checklist_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/modules/questionnaire/index.js
var questionnaire = __webpack_require__(120);

// CONCATENATED MODULE: ./resources/assets/js/modules/questionnaire/scoring.js
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



// Used per-item for list questions and for text questions and checklist items


function isValidScoringDefinition(scoring) {
	return scoring && 'category' in scoring && typeof scoring.category === 'string';
}

function isValidValueScoringDefinition(scoring) {
	return isValidScoringDefinition(scoring) && 'value' in scoring && typeof scoring.value === 'number';
}

function mergeScores() {
	var mergedScore = new Map();

	for (var _len = arguments.length, scores = Array(_len), _key = 0; _key < _len; _key++) {
		scores[_key] = arguments[_key];
	}

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = scores[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var score = _step.value;
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = score.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _ref = _step2.value;

					var _ref2 = _slicedToArray(_ref, 2);

					var _category = _ref2[0];
					var scoreValue = _ref2[1];

					var newValue = mergedScore.has(_category) ? mergedScore.get(_category) : 0;

					mergedScore.set(_category, newValue + scoreValue);
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

	return mergedScore;
}

function computeScore(scoring, value) {
	if (scoring.weight) {
		value = value * scoring.weight;
	}

	if (scoring.min && value < scoring.min) {
		value = scoring.min;
	}

	if (scoring.max && value > scoring.max) {
		value = scoring.max;
	}

	return value;
}

function scoreQuestion(question) {
	switch (question.type) {
		case 'text':
		case 'textarea':
			return textQuestion(question);
		case 'number':
			return numberQuestion(question);
		case 'select':
			return selectQuestion(question);
		case 'checkbox':
			return checkboxQuestion(question);
		case 'radio':
			return radioQuestion(question);
		case 'list':
			return listQuestion(question);
	}

	throw new Error('Unrecognized question type ' + question.type);
}

function textQuestion(question) {
	var score = new Map();

	if (question.scoring) {
		score.set(question.scoring.category, computeScore(question.scoring, question.scoring.value));
	}

	return score;
}

function numberQuestion(question) {
	var score = new Map();

	if (question.scoring && question.value) {
		score.set(question.scoring.category, computeScore(question.scoring, question.value));
	}

	return score;
}

function selectQuestion(question) {
	var score = new Map();

	if (question.scoring) {
		var scoring = question.scoring;
		var _value = Object(questionnaire["e" /* getSelectValue */])(question);
		if (typeof _value === 'number') score.set(scoring.category, computeScore(scoring, _value));
	}

	return score;
}

function checkboxQuestion(question) {
	return radioCheckboxQuestion(question);
}

function radioQuestion(question) {
	return radioCheckboxQuestion(question);
}

function radioCheckboxQuestion(question) {
	var score = new Map();

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = question.options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var option = _step3.value;

			// if instead of continue in order to appease flow
			if (option.checked && typeof option.value === 'number') {
				var optionValue = option.value;

				var scoring = option.scoring;
				if (!scoring) scoring = question.scoring;

				if (scoring) {
					var scoreValue = score.has(scoring.category) ? score.get(scoring.category) : 0;

					score.set(scoring.category, computeScore(scoring, scoreValue + optionValue));
				}
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

	return score;
}

function listQuestion(question) {
	var score = new Map();

	if (question.scoring) {
		var scoring = question.scoring;
		for (var i = 0; i < question.items.length; i++) {
			var scoreValue = score.has(scoring.category) ? score.get(scoring.category) : 0;

			score.set(scoring.category, computeScore(scoring, scoreValue + scoring.value));
		}
	}

	return score;
}
// CONCATENATED MODULE: ./resources/assets/js/modules/merits/scoring.js
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



function scoreChecklist(checklist) {
	return mergeScores.apply(undefined, _toConsumableArray(checklist.pages.map(scoreSection)));
}

function scoreSection(section) {
	var scores = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = section.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var item = _step.value;

			switch (item.type) {
				case 'section':
					scores.push(scoreSection(item));
					break;
				case 'item':
					scores.push(scoreItem(item));
					break;
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

	return mergeScores.apply(undefined, scores);
}

function scoreItem(item) {
	var score = new Map();

	if (item.scoring && item.checked) {
		var scoring = item.scoring;
		score.set(scoring.category, computeScore(scoring, scoring.value));
	}

	if (item.questions) {
		var questionScores = item.questions.map(scoreQuestion);
		score = mergeScores.apply(undefined, [score].concat(_toConsumableArray(questionScores)));
	}

	return score;
}
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Score.vue
//
//
//
//
//
//
//
//



/* harmony default export */ var Score = ({
	props: {
		checklist: {
			type: Object,
			required: true
		},
		title: {
			type: String,
			required: false
		}
	},

	computed: {
		score: function score() {
			return scoreChecklist(this.checklist);
		}
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-44eb0558","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/Score.vue
var Score_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    _vm._l(_vm.score.entries(), function(ref) {
      var category = ref[0]
      var scoreValue = ref[1]
      return _c("div", [
        _vm._v("\n\t\t" + _vm._s(category) + ": " + _vm._s(scoreValue) + "\n\t")
      ])
    })
  )
}
var Score_staticRenderFns = []
Score_render._withStripped = true
var Score_esExports = { render: Score_render, staticRenderFns: Score_staticRenderFns }
/* harmony default export */ var Checklist_Score = (Score_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-44eb0558", Score_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/Score.vue
var Score_disposed = false
var Score_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Score___vue_template_functional__ = false
/* styles */
var Score___vue_styles__ = null
/* scopeId */
var Score___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Score___vue_module_identifier__ = null
var Score_Component = Score_normalizeComponent(
  Score,
  Checklist_Score,
  Score___vue_template_functional__,
  Score___vue_styles__,
  Score___vue_scopeId__,
  Score___vue_module_identifier__
)
Score_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Score.vue"
if (Score_Component.esModule && Object.keys(Score_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44eb0558", Score_Component.options)
  } else {
    hotAPI.reload("data-v-44eb0558", Score_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Score_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_Score = (Score_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Summary.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//













/* harmony default export */ var Summary = ({
	props: {
		id: {
			type: Number,
			required: false
		},
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		},
		status: {
			type: String,
			default: 'pending'
		},
		notes: {
			type: String,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		subjectName: {
			type: String,
			required: true
		}
	},
	data: function data() {
		return {
			dates: {
				startDate: this.period_start,
				endDate: this.period_end
			},
			checklist: this.report,

			show: {
				notes: false
			}
		};
	},


	computed: {
		checkedItems: function checkedItems() {
			return Object(merit_utils["c" /* getCheckedItemCount */])(this.report);
		},
		lastMonth: function lastMonth() {
			return Object(date_utils["isoDateString"])(external__moment__default()().subtract(1, 'month'));
		}
	},

	watch: {
		period_start: function period_start(_period_start) {
			this.dates = Object.assign({}, this.dates, { startDate: _period_start });
		},
		period_end: function period_end(_period_end) {
			this.dates = Object.assign({}, this.dates, { endDate: _period_end });
		},
		report: function report(_report) {
			this.checklist = _report;
		},
		notes: function notes(_notes) {
			this.inputNotes = _notes;
		}
	},

	methods: {
		handleClose: function handleClose() {
			this.$emit('close');
		}
	},

	components: {
		MeritCompensationSummaryChecklist: MeritCompensation_Checklist_Summary_Checklist,
		MeritCompensationScore: MeritCompensation_Checklist_Score,

		AcademicYearSelector: AcademicYearSelector["a" /* default */],
		LoadingButton: LoadingButton["a" /* default */],
		RichDateRange: RichDateRange["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-02d100b1","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Summary.vue
var Summary_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "panel panel-default" }, [
    _c("div", { staticClass: "form-summary panel-heading" }, [
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-sm-4" }, [
          _c("small", [_vm._v("Name")]),
          _vm._v("\n\t\t\t\t" + _vm._s(_vm.subjectName) + "\n\t\t\t")
        ]),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "col-sm-4" },
          [
            _c("small", [_vm._v("Report period")]),
            _vm._v(" "),
            _c("rich-date-range", { attrs: { dates: _vm.dates } })
          ],
          1
        ),
        _vm._v(" "),
        _c("div", { staticClass: "col-sm-4" }, [
          _c("small", [_vm._v("Checked items")]),
          _vm._v("\n\t\t\t\t" + _vm._s(_vm.checkedItems) + "\n\t\t\t")
        ])
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "panel-body" },
      [
        _c("merit-compensation-score", {
          attrs: { checklist: _vm.checklist, title: _vm.title }
        }),
        _vm._v(" "),
        _c(
          "merit-compensation-summary-checklist",
          _vm._b(
            { attrs: { title: _vm.title } },
            "merit-compensation-summary-checklist",
            _vm.checklist,
            false
          )
        )
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "panel panel-default notes-container" }, [
      _c("div", { staticClass: "panel-heading" }, [
        _vm._v("\n\t\t\tNotes\n\t\t")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "panel-body" }, [
        _c("textarea", {
          staticClass: "form-control",
          attrs: { readonly: "" },
          domProps: { value: _vm.notes }
        })
      ])
    ]),
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
var Summary_staticRenderFns = []
Summary_render._withStripped = true
var Summary_esExports = { render: Summary_render, staticRenderFns: Summary_staticRenderFns }
/* harmony default export */ var MeritCompensation_Summary = (Summary_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-02d100b1", Summary_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Summary.vue
var Summary_disposed = false
function Summary_injectStyle (ssrContext) {
  if (Summary_disposed) return
  __webpack_require__(478)
}
var Summary_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Summary___vue_template_functional__ = false
/* styles */
var Summary___vue_styles__ = Summary_injectStyle
/* scopeId */
var Summary___vue_scopeId__ = "data-v-02d100b1"
/* moduleIdentifier (server only) */
var Summary___vue_module_identifier__ = null
var Summary_Component = Summary_normalizeComponent(
  Summary,
  MeritCompensation_Summary,
  Summary___vue_template_functional__,
  Summary___vue_styles__,
  Summary___vue_scopeId__,
  Summary___vue_module_identifier__
)
Summary_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Summary.vue"
if (Summary_Component.esModule && Object.keys(Summary_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02d100b1", Summary_Component.options)
  } else {
    hotAPI.reload("data-v-02d100b1", Summary_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Summary_disposed = true
  })
})()}

/* harmony default export */ var vue_components_MeritCompensation_Summary = (Summary_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/SummaryById.vue
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var SummaryById = ({
	props: {
		id: {
			type: [Number, String],
			required: true
		},
		meritReports: {
			type: Array,
			required: false
		},
		title: {
			type: String,
			required: true
		},
		currentUser: {
			type: Object,
			required: false
		}
	},

	data: function data() {
		return {
			fetchedReports: null
		};
	},


	computed: {
		reports: function reports() {
			return this.meritReports || this.fetchedReports;
		},
		meritReport: function meritReport() {
			var id = Number(this.id);
			if (Number.isNaN(id) || !this.reports) return;

			return this.reports.find(function (report) {
				return report.id === id;
			});
		}
	},

	mounted: function mounted() {
		if (!this.meritReports || !Array.isArray(this.meritReports) || this.meritReports.length === 0) {
			this.fetchReports();
		}
	},


	methods: {
		fetchReports: function fetchReports() {
			var _this = this;

			Object(merit_utils["b" /* fetchAllMeritReports */])().then(function (merits) {
				_this.fetchedReports = merits;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching past merit reports'
				});
			});
		}
	},

	components: {
		MeritReportSummary: vue_components_MeritCompensation_Summary
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-a56659ba","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/SummaryById.vue
var SummaryById_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "summary-by-id" }, [
    _vm.meritReport
      ? _c(
          "div",
          { staticClass: "container body-block" },
          [
            _c(
              "merit-report-summary",
              _vm._b(
                {
                  attrs: {
                    title: _vm.title,
                    "subject-name": _vm.meritReport.user.full_name
                  },
                  on: {
                    close: function($event) {
                      _vm.$emit("close")
                    },
                    alert: function($event) {
                      _vm.$emit("alert", arguments[0])
                    }
                  }
                },
                "merit-report-summary",
                _vm.meritReport,
                false
              )
            )
          ],
          1
        )
      : _vm._e()
  ])
}
var SummaryById_staticRenderFns = []
SummaryById_render._withStripped = true
var SummaryById_esExports = { render: SummaryById_render, staticRenderFns: SummaryById_staticRenderFns }
/* harmony default export */ var MeritCompensation_SummaryById = (SummaryById_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a56659ba", SummaryById_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/SummaryById.vue
var SummaryById_disposed = false
var SummaryById_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var SummaryById___vue_template_functional__ = false
/* styles */
var SummaryById___vue_styles__ = null
/* scopeId */
var SummaryById___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var SummaryById___vue_module_identifier__ = null
var SummaryById_Component = SummaryById_normalizeComponent(
  SummaryById,
  MeritCompensation_SummaryById,
  SummaryById___vue_template_functional__,
  SummaryById___vue_styles__,
  SummaryById___vue_scopeId__,
  SummaryById___vue_module_identifier__
)
SummaryById_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/SummaryById.vue"
if (SummaryById_Component.esModule && Object.keys(SummaryById_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a56659ba", SummaryById_Component.options)
  } else {
    hotAPI.reload("data-v-a56659ba", SummaryById_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    SummaryById_disposed = true
  })
})()}

/* harmony default export */ var vue_components_MeritCompensation_SummaryById = (SummaryById_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/AlertList.vue + 2 modules
var AlertList = __webpack_require__(5);

// EXTERNAL MODULE: ./resources/assets/js/vue-components/ComponentList.vue + 8 modules
var ComponentList = __webpack_require__(43);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/ConfirmationYesNo.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ConfirmationYesNo = ({
	props: {
		defaultClass: {
			type: String,
			required: false
		},
		yesClass: {
			type: String,
			required: false
		},
		noClass: {
			type: String,
			required: false
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


	methods: {
		handleConfirm: function handleConfirm() {
			this.$emit('click');
			this.pressed = false;
		}
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c1d823e4","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/ConfirmationYesNo.vue
var ConfirmationYesNo_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "span",
    [
      !_vm.pressed
        ? _c(
            "button",
            {
              class: _vm.defaultClass,
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.pressed = true
                }
              }
            },
            [_vm._t("default")],
            2
          )
        : [
            _c(
              "button",
              {
                class: _vm.yesClass,
                attrs: { type: "button" },
                on: { click: _vm.handleConfirm }
              },
              [
                _vm._t("yes", [
                  _c("span", { staticClass: "glyphicon glyphicon-thumbs-up" })
                ])
              ],
              2
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                class: _vm.noClass,
                attrs: { type: "button" },
                on: {
                  click: function($event) {
                    _vm.pressed = false
                  }
                }
              },
              [
                _vm._t("no", [
                  _c("span", { staticClass: "glyphicon glyphicon-thumbs-down" })
                ])
              ],
              2
            )
          ]
    ],
    2
  )
}
var ConfirmationYesNo_staticRenderFns = []
ConfirmationYesNo_render._withStripped = true
var ConfirmationYesNo_esExports = { render: ConfirmationYesNo_render, staticRenderFns: ConfirmationYesNo_staticRenderFns }
/* harmony default export */ var vue_components_ConfirmationYesNo = (ConfirmationYesNo_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c1d823e4", ConfirmationYesNo_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/ConfirmationYesNo.vue
var ConfirmationYesNo_disposed = false
var ConfirmationYesNo_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ConfirmationYesNo___vue_template_functional__ = false
/* styles */
var ConfirmationYesNo___vue_styles__ = null
/* scopeId */
var ConfirmationYesNo___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var ConfirmationYesNo___vue_module_identifier__ = null
var ConfirmationYesNo_Component = ConfirmationYesNo_normalizeComponent(
  ConfirmationYesNo,
  vue_components_ConfirmationYesNo,
  ConfirmationYesNo___vue_template_functional__,
  ConfirmationYesNo___vue_styles__,
  ConfirmationYesNo___vue_scopeId__,
  ConfirmationYesNo___vue_module_identifier__
)
ConfirmationYesNo_Component.options.__file = "resources/assets/js/vue-components/ConfirmationYesNo.vue"
if (ConfirmationYesNo_Component.esModule && Object.keys(ConfirmationYesNo_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1d823e4", ConfirmationYesNo_Component.options)
  } else {
    hotAPI.reload("data-v-c1d823e4", ConfirmationYesNo_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ConfirmationYesNo_disposed = true
  })
})()}

/* harmony default export */ var js_vue_components_ConfirmationYesNo = (ConfirmationYesNo_Component.exports);

// EXTERNAL MODULE: ./resources/assets/js/modules/datatable-utils.js
var datatable_utils = __webpack_require__(26);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/ReportListItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









/* harmony default export */ var ReportListItem = ({
	props: {
		id: {
			type: Number,
			required: true
		},
		period_start: {
			type: String,
			required: true
		},
		period_end: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		},
		status: {
			type: String,
			required: true
		},
		form: {
			type: Object,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},

	computed: {
		userIsAdmin: function userIsAdmin() {
			return this.user && this.user.type === 'admin';
		},
		dates: function dates() {
			return {
				startDate: this.period_start,
				endDate: this.period_end
			};
		},
		viewEditText: function viewEditText() {
			return ['pending', 'open for editing'].includes(this.status) ? 'Continue' : 'View';
		},
		viewEditGlyph: function viewEditGlyph() {
			return ['pending', 'open for editing'].includes(this.status) ? 'glyphicon-pencil' : 'glyphicon-list-alt';
		},
		statusLabel: function statusLabel() {
			return Object(datatable_utils["f" /* getEvaluationStatusLabel */])(this.status);
		},
		checkedItems: function checkedItems() {
			return Object(merit_utils["c" /* getCheckedItemCount */])(this.report);
		}
	},

	methods: {
		ucfirst: utils["I" /* ucfirst */],
		openForEditing: function openForEditing() {
			if (this.user.type !== 'admin' || this.status !== 'complete') return;

			this.updateReport({
				status: 'open for editing'
			});
		},
		closeEditing: function closeEditing() {
			if (this.user.type !== 'admin' || this.status !== 'open for editing') return;

			this.updateReport({
				status: 'complete'
			});
		},
		disableReport: function disableReport() {
			if (this.user.type !== 'admin') return;

			this.updateReport({
				status: 'disabled'
			});
		},
		enableReport: function enableReport() {
			if (this.user.type !== 'admin') return;

			this.updateReport({
				status: 'open for editing'
			});
		},
		updateReport: function updateReport(changes) {
			var _this = this;

			fetch('/merits/' + this.id, {
				method: 'POST', // PATCH
				headers: Object(utils["o" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign(changes, {
					_method: 'PATCH'
				}))
			}).then(utils["x" /* okOrThrow */]).then(function () {
				_this.$emit('change');
			}).catch(function (err) {
				console.error(err);
				_this.$emit('alert', {
					type: 'error',
					html: '<strong>Error:</strong> There was a problem updating the merit report'
				});
			});
		}
	},

	components: {
		ConfirmationButton: ConfirmationButton["a" /* default */],
		ConfirmationYesNo: js_vue_components_ConfirmationYesNo,
		RichDateRange: RichDateRange["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-6c389d6a","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/ReportListItem.vue
var ReportListItem_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "merit-report-list-item" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-1" }, [
        _c("small", [_vm._v("#")]),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.id))])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-2" }, [
        _c("small", [_vm._v("Form")]),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.form.name))])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-3" },
        [
          _c("small", [_vm._v("Period")]),
          _vm._v(" "),
          _c("rich-date-range", { attrs: { dates: _vm.dates } })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-2 checked-items-cell" }, [
        _c("small", [_vm._v("Checked items")]),
        _vm._v("\n\t\t\t" + _vm._s(_vm.checkedItems) + "\n\t\t")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-2" }, [
        _c("span", { staticClass: "label", class: _vm.statusLabel }, [
          _vm._v("\n\t\t\t\t" + _vm._s(_vm.ucfirst(_vm.status)) + "\n\t\t\t")
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-2 controls-cell" },
        [
          _c(
            "button",
            {
              staticClass: "btn btn-info btn-xs",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.$emit("click", _vm.id)
                }
              }
            },
            [
              _c("span", {
                staticClass: "glyphicon",
                class: _vm.viewEditGlyph
              }),
              _vm._v("\n\t\t\t\t" + _vm._s(_vm.viewEditText) + "\n\t\t\t")
            ]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "btn btn-info btn-xs",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.$emit("summary", _vm.id)
                }
              }
            },
            [
              _c("span", { staticClass: "glyphicon glyphicon-list-alt" }),
              _vm._v("\n\t\t\t\tView summary\n\t\t\t")
            ]
          ),
          _vm._v(" "),
          _vm.userIsAdmin
            ? [
                _vm.status === "complete"
                  ? _c(
                      "confirmation-button",
                      {
                        staticClass: "btn btn-xs btn-primary",
                        on: { click: _vm.openForEditing }
                      },
                      [
                        _c("span", { staticClass: "glyphicon glyphicon-edit" }),
                        _vm._v("\n\t\t\t\t\tOpen for editing\n\t\t\t\t")
                      ]
                    )
                  : _vm.status === "open for editing"
                    ? _c(
                        "confirmation-button",
                        {
                          staticClass: "btn btn-xs btn-primary",
                          on: { click: _vm.closeEditing }
                        },
                        [
                          _c("span", {
                            staticClass: "glyphicon glyphicon-check"
                          }),
                          _vm._v("\n\t\t\t\t\tClose editing\n\t\t\t\t")
                        ]
                      )
                    : _vm._e(),
                _vm._v(" "),
                _vm.status === "disabled"
                  ? _c(
                      "confirmation-button",
                      {
                        staticClass: "btn btn-xs btn-success",
                        on: { click: _vm.enableReport }
                      },
                      [
                        _c("span", {
                          staticClass: "glyphicon glyphicon-check"
                        }),
                        _vm._v("\n\t\t\t\t\tEnable report\n\t\t\t\t")
                      ]
                    )
                  : _c(
                      "confirmation-yes-no",
                      {
                        attrs: {
                          "default-class": "btn btn-xs btn-danger",
                          "yes-class": "btn btn-xs btn-danger",
                          "no-class": "btn btn-xs btn-default"
                        },
                        on: { click: _vm.disableReport }
                      },
                      [
                        _c("span", {
                          staticClass: "glyphicon glyphicon-remove"
                        }),
                        _vm._v("\n\t\t\t\t\tDisable report\n\n\t\t\t\t\t"),
                        _c(
                          "template",
                          { attrs: { slot: "yes" }, slot: "yes" },
                          [
                            _vm._v(
                              "\n\t\t\t\t\t\tYes, disable report\n\t\t\t\t\t"
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c("template", { attrs: { slot: "no" }, slot: "no" }, [
                          _vm._v("\n\t\t\t\t\t\tCancel\n\t\t\t\t\t")
                        ])
                      ],
                      2
                    )
              ]
            : _vm._e()
        ],
        2
      )
    ])
  ])
}
var ReportListItem_staticRenderFns = []
ReportListItem_render._withStripped = true
var ReportListItem_esExports = { render: ReportListItem_render, staticRenderFns: ReportListItem_staticRenderFns }
/* harmony default export */ var MeritCompensation_ReportListItem = (ReportListItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6c389d6a", ReportListItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/ReportListItem.vue
var ReportListItem_disposed = false
function ReportListItem_injectStyle (ssrContext) {
  if (ReportListItem_disposed) return
  __webpack_require__(480)
}
var ReportListItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ReportListItem___vue_template_functional__ = false
/* styles */
var ReportListItem___vue_styles__ = ReportListItem_injectStyle
/* scopeId */
var ReportListItem___vue_scopeId__ = "data-v-6c389d6a"
/* moduleIdentifier (server only) */
var ReportListItem___vue_module_identifier__ = null
var ReportListItem_Component = ReportListItem_normalizeComponent(
  ReportListItem,
  MeritCompensation_ReportListItem,
  ReportListItem___vue_template_functional__,
  ReportListItem___vue_styles__,
  ReportListItem___vue_scopeId__,
  ReportListItem___vue_module_identifier__
)
ReportListItem_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/ReportListItem.vue"
if (ReportListItem_Component.esModule && Object.keys(ReportListItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c389d6a", ReportListItem_Component.options)
  } else {
    hotAPI.reload("data-v-6c389d6a", ReportListItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ReportListItem_disposed = true
  })
})()}

/* harmony default export */ var vue_components_MeritCompensation_ReportListItem = (ReportListItem_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/UserWithReportListItem.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//






/* harmony default export */ var UserWithReportListItem = ({
	mixins: [HasAlerts["a" /* default */]],
	props: {
		full_name: {
			type: String,
			required: true
		},
		merit_reports: {
			type: Array,
			required: true
		},
		user: {
			type: Object,
			required: false
		}
	},
	data: function data() {
		return {
			viewedReport: null,
			viewedReportSummary: null,
			saving: false,
			savingSuccessful: false
		};
	},


	computed: {
		meritReportFields: function meritReportFields() {
			return ['id', 'form_name'];
		},
		meritReportFieldAccessors: function meritReportFieldAccessors() {
			return {
				'form_name': function form_name(meritReport) {
					return meritReport.form.name;
				}
			};
		}
	},

	watch: {
		merit_reports: function merit_reports(meritReports) {
			var _this = this;

			if (this.viewedReport) this.viewedReport = meritReports.find(function (meritReport) {
				return meritReport.id === _this.viewedReport.id;
			});

			if (this.viewedReportSummary) this.viewedReportSummary = meritReports.find(function (meritReport) {
				return meritReport.id === _this.viewedReportSummary.id;
			});
		}
	},

	methods: {
		handleReportClick: function handleReportClick(reportId) {
			this.$emit('view-report', reportId);
		},
		handleViewSummary: function handleViewSummary(reportId) {
			this.$emit('view-summary', reportId);
		}
	},

	components: {
		ComponentList: ComponentList["a" /* default */],
		MeritReportListItem: vue_components_MeritCompensation_ReportListItem
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-142bf50a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/UserWithReportListItem.vue
var UserWithReportListItem_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "user-with-report-list-item" }, [
    _c("div", { staticClass: "panel panel-default" }, [
      _c(
        "div",
        { staticClass: "panel-body" },
        [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-sm-2" }, [
              _c("h3", [_vm._v(_vm._s(_vm.full_name))])
            ]),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-sm-10" },
              [
                _c("component-list", {
                  attrs: {
                    fields: _vm.meritReportFields,
                    items: _vm.merit_reports,
                    "field-accessors": _vm.meritReportFieldAccessors,
                    paginate: false,
                    "default-sort-order": "desc"
                  },
                  scopedSlots: _vm._u([
                    {
                      key: "default",
                      fn: function(item) {
                        return [
                          _c(
                            "merit-report-list-item",
                            _vm._b(
                              {
                                attrs: { user: _vm.user },
                                on: {
                                  click: _vm.handleReportClick,
                                  summary: _vm.handleViewSummary,
                                  change: function($event) {
                                    _vm.$emit("change")
                                  }
                                }
                              },
                              "merit-report-list-item",
                              item,
                              false
                            )
                          )
                        ]
                      }
                    }
                  ])
                })
              ],
              1
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
    ])
  ])
}
var UserWithReportListItem_staticRenderFns = []
UserWithReportListItem_render._withStripped = true
var UserWithReportListItem_esExports = { render: UserWithReportListItem_render, staticRenderFns: UserWithReportListItem_staticRenderFns }
/* harmony default export */ var MeritCompensation_UserWithReportListItem = (UserWithReportListItem_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-142bf50a", UserWithReportListItem_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/UserWithReportListItem.vue
var UserWithReportListItem_disposed = false
var UserWithReportListItem_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var UserWithReportListItem___vue_template_functional__ = false
/* styles */
var UserWithReportListItem___vue_styles__ = null
/* scopeId */
var UserWithReportListItem___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var UserWithReportListItem___vue_module_identifier__ = null
var UserWithReportListItem_Component = UserWithReportListItem_normalizeComponent(
  UserWithReportListItem,
  MeritCompensation_UserWithReportListItem,
  UserWithReportListItem___vue_template_functional__,
  UserWithReportListItem___vue_styles__,
  UserWithReportListItem___vue_scopeId__,
  UserWithReportListItem___vue_module_identifier__
)
UserWithReportListItem_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/UserWithReportListItem.vue"
if (UserWithReportListItem_Component.esModule && Object.keys(UserWithReportListItem_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-142bf50a", UserWithReportListItem_Component.options)
  } else {
    hotAPI.reload("data-v-142bf50a", UserWithReportListItem_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    UserWithReportListItem_disposed = true
  })
})()}

/* harmony default export */ var vue_components_MeritCompensation_UserWithReportListItem = (UserWithReportListItem_Component.exports);

// CONCATENATED MODULE: ./resources/assets/js/vue-constructors/merit-reports/admin-supervisor.js






/* harmony default export */ var admin_supervisor = ({
	props: {
		user: {
			type: Object,
			required: true
		},
		meritReportTypes: {
			type: Object,
			required: true
		},
		meritReportTypeForms: {
			type: Object,
			required: true
		}
	},
	data: function data() {
		return {
			usersWithReports: null
		};
	},


	computed: {
		currentUserIsAdminOrSupervisor: function currentUserIsAdminOrSupervisor() {
			return Object(utils["t" /* isAdmin */])(this.user) || Object(utils["L" /* usesFeature */])(this.user, 'FACULTY_MERIT');
		}
	},

	methods: {
		fetchUsersWithReports: function fetchUsersWithReports() {
			var _this = this;

			if (!this.currentUserIsAdminOrSupervisor) return;

			fetch('/merits/by-user', {
				method: 'GET',
				headers: Object(utils["o" /* getFetchHeaders */])(),
				credentials: 'same-origin'
			}).then(utils["u" /* jsonOrThrow */]).then(function (usersWithReports) {
				_this.usersWithReports = usersWithReports;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching users with reports'
				});
			});
		}
	},

	components: {
		AlertList: AlertList["a" /* default */],
		ComponentList: ComponentList["a" /* default */],
		UserWithMeritReportListItem: vue_components_MeritCompensation_UserWithReportListItem
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-constructors/merit-reports/faculty.js








/* harmony default export */ var faculty = ({
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data: function data() {
		return {
			meritForms: null
		};
	},


	computed: {
		currentYearlyMeritDateRange: function currentYearlyMeritDateRange() {
			return Object(merit_utils["d" /* getCurrentYearlyMeritDateRange */])();
		},
		meritReportFields: function meritReportFields() {
			return ['id', 'form_name'];
		},
		meritReportFieldAccessors: function meritReportFieldAccessors() {
			return {
				'form_name': function form_name(meritReport) {
					return meritReport.form.name;
				}
			};
		},
		userMeritReports: function userMeritReports() {
			var _this = this;

			if (!this.meritReports) return [];

			return this.meritReports.filter(function (report) {
				return Number(report.user_id) === _this.user.id;
			});
		},
		needsToStartReport: function needsToStartReport() {
			var _this2 = this;

			if (!this.userMeritReports || this.userMeritReports.length === 0) return true;

			return !this.userMeritReports.some(function (report) {
				var periodDates = {
					startDate: report.period_start,
					endDate: report.period_end
				};

				return Object(date_utils["datesEqual"])(periodDates, _this2.currentYearlyMeritDateRange) && report.status === 'complete';
			});
		},
		inProgressReport: function inProgressReport() {
			if (!this.userMeritReports || this.userMeritReports.length === 0) return false;

			return this.userMeritReports.find(function (report) {
				return ['pending', 'open for editing'].includes(report.status);
			});
		}
	},

	methods: {
		finishMeritReport: function finishMeritReport() {
			if (!this.inProgressReport) return;

			this.viewReport(this.inProgressReport.id);
		},
		viewMostRecentSubmission: function viewMostRecentSubmission() {
			if (!this.userMeritReports || !Array.isArray(this.userMeritReports) || this.userMeritReports.length === 0) return;

			this.viewReport(this.userMeritReports[0].id);
		}
	},

	components: {
		ComponentList: ComponentList["a" /* default */],
		MeritCompensationReport: vue_components_MeritCompensation_Report,
		MeritReportListItem: vue_components_MeritCompensation_ReportListItem,
		RichDateRange: RichDateRange["a" /* default */]
	}
});
// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PrintView/Question/ValueQuestion.vue
//
//
//
//
//
//
//

/* harmony default export */ var ValueQuestion = ({
	props: {
		text: {
			type: String,
			required: true
		},
		value: {
			type: String,
			default: ''
		}
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-30d3f1ac","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PrintView/Question/ValueQuestion.vue
var ValueQuestion_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("tr", [
    _c("th", [_vm._v(_vm._s(_vm.text))]),
    _vm._v(" "),
    _c("td", [_vm._v(_vm._s(_vm.value))])
  ])
}
var ValueQuestion_staticRenderFns = []
ValueQuestion_render._withStripped = true
var ValueQuestion_esExports = { render: ValueQuestion_render, staticRenderFns: ValueQuestion_staticRenderFns }
/* harmony default export */ var Question_ValueQuestion = (ValueQuestion_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30d3f1ac", ValueQuestion_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/PrintView/Question/ValueQuestion.vue
var ValueQuestion_disposed = false
function ValueQuestion_injectStyle (ssrContext) {
  if (ValueQuestion_disposed) return
  __webpack_require__(484)
}
var ValueQuestion_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var ValueQuestion___vue_template_functional__ = false
/* styles */
var ValueQuestion___vue_styles__ = ValueQuestion_injectStyle
/* scopeId */
var ValueQuestion___vue_scopeId__ = "data-v-30d3f1ac"
/* moduleIdentifier (server only) */
var ValueQuestion___vue_module_identifier__ = null
var ValueQuestion_Component = ValueQuestion_normalizeComponent(
  ValueQuestion,
  Question_ValueQuestion,
  ValueQuestion___vue_template_functional__,
  ValueQuestion___vue_styles__,
  ValueQuestion___vue_scopeId__,
  ValueQuestion___vue_module_identifier__
)
ValueQuestion_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/ValueQuestion.vue"
if (ValueQuestion_Component.esModule && Object.keys(ValueQuestion_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30d3f1ac", ValueQuestion_Component.options)
  } else {
    hotAPI.reload("data-v-30d3f1ac", ValueQuestion_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    ValueQuestion_disposed = true
  })
})()}

/* harmony default export */ var PrintView_Question_ValueQuestion = (ValueQuestion_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PrintView/Question/RadioCheckboxQuestion.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var RadioCheckboxQuestion = ({
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return ['radio', 'checkbox'].includes(type);
			}
		},
		text: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			required: true
		}
	},

	computed: {
		checkedOptions: function checkedOptions() {
			return this.options.filter(function (option) {
				return option.checked;
			});
		},
		selectedOptionText: function selectedOptionText() {
			return this.checkedOptions.length > 0 ? this.checkedOptions[0].text : '';
		}
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2424a099","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PrintView/Question/RadioCheckboxQuestion.vue
var RadioCheckboxQuestion_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("tr", [
    _c("th", [_vm._v(_vm._s(_vm.text))]),
    _vm._v(" "),
    _c(
      "td",
      [
        _vm.type === "checkbox"
          ? _c(
              "ul",
              _vm._l(_vm.checkedOptions, function(option) {
                return _c("li", [
                  _vm._v("\n\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t")
                ])
              })
            )
          : [_vm._v("\n\t\t\t" + _vm._s(_vm.selectedOptionText) + "\n\t\t")]
      ],
      2
    )
  ])
}
var RadioCheckboxQuestion_staticRenderFns = []
RadioCheckboxQuestion_render._withStripped = true
var RadioCheckboxQuestion_esExports = { render: RadioCheckboxQuestion_render, staticRenderFns: RadioCheckboxQuestion_staticRenderFns }
/* harmony default export */ var Question_RadioCheckboxQuestion = (RadioCheckboxQuestion_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2424a099", RadioCheckboxQuestion_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/PrintView/Question/RadioCheckboxQuestion.vue
var RadioCheckboxQuestion_disposed = false
function RadioCheckboxQuestion_injectStyle (ssrContext) {
  if (RadioCheckboxQuestion_disposed) return
  __webpack_require__(485)
}
var RadioCheckboxQuestion_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var RadioCheckboxQuestion___vue_template_functional__ = false
/* styles */
var RadioCheckboxQuestion___vue_styles__ = RadioCheckboxQuestion_injectStyle
/* scopeId */
var RadioCheckboxQuestion___vue_scopeId__ = "data-v-2424a099"
/* moduleIdentifier (server only) */
var RadioCheckboxQuestion___vue_module_identifier__ = null
var RadioCheckboxQuestion_Component = RadioCheckboxQuestion_normalizeComponent(
  RadioCheckboxQuestion,
  Question_RadioCheckboxQuestion,
  RadioCheckboxQuestion___vue_template_functional__,
  RadioCheckboxQuestion___vue_styles__,
  RadioCheckboxQuestion___vue_scopeId__,
  RadioCheckboxQuestion___vue_module_identifier__
)
RadioCheckboxQuestion_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/RadioCheckboxQuestion.vue"
if (RadioCheckboxQuestion_Component.esModule && Object.keys(RadioCheckboxQuestion_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2424a099", RadioCheckboxQuestion_Component.options)
  } else {
    hotAPI.reload("data-v-2424a099", RadioCheckboxQuestion_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    RadioCheckboxQuestion_disposed = true
  })
})()}

/* harmony default export */ var PrintView_Question_RadioCheckboxQuestion = (RadioCheckboxQuestion_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PrintView/Question/List/List.vue



/* harmony default export */ var List = ({
	props: {
		text: {
			type: String,
			required: false
		},
		ordered: {
			type: Boolean,
			default: false
		},
		items: {
			type: Array,
			required: true
		}
	},

	render: function render() {
		var h = arguments[0];

		var ListElement = this.ordered ? 'ol' : 'ul';

		var items = this.items.map(function (item) {
			return h(
				'li',
				{ 'class': 'print-view-list-item' },
				[Object.keys(item).filter(function (prop) {
					return !['type', 'labels'].includes(prop);
				}).map(function (prop) {
					return h(
						'p',
						null,
						[h(
							'b',
							null,
							[Object(utils["I" /* ucfirst */])(Object(utils["c" /* camelCaseToWords */])(prop)), ': ']
						), item[prop]]
					);
				})]
			);
		});

		return h(
			'tr',
			{ 'class': 'print-view-question-list' },
			[h(
				'td',
				null,
				[h(
					'p',
					null,
					[this.text]
				), h(
					ListElement,
					null,
					[items]
				)]
			)]
		);
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/PrintView/Question/List/List.vue
var List_disposed = false
function List_injectStyle (ssrContext) {
  if (List_disposed) return
  __webpack_require__(486)
}
var List_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var List___vue_template__ = null
/* template functional */
  var List___vue_template_functional__ = false
/* styles */
var List___vue_styles__ = List_injectStyle
/* scopeId */
var List___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var List___vue_module_identifier__ = null
var List_Component = List_normalizeComponent(
  List,
  List___vue_template__,
  List___vue_template_functional__,
  List___vue_styles__,
  List___vue_scopeId__,
  List___vue_module_identifier__
)
List_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/List/List.vue"
if (List_Component.esModule && Object.keys(List_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a54ef978", List_Component.options)
  } else {
    hotAPI.reload("data-v-a54ef978", List_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    List_disposed = true
  })
})()}

/* harmony default export */ var List_List = (List_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PrintView/Question/Question.vue





/* harmony default export */ var Question_Question = ({
	model: {
		prop: 'question'
	},
	props: {
		question: {
			type: Object,
			required: true
		}
	},

	render: function render(h) {
		var type = 'value';
		if (this.question.type === 'list') type = 'list';else if (['radio', 'checkbox'].includes(this.question.type)) type = 'radio-checkbox';

		return h(type + '-question', {
			props: this.question
		});
	},


	components: {
		ValueQuestion: PrintView_Question_ValueQuestion,
		RadioCheckboxQuestion: PrintView_Question_RadioCheckboxQuestion,
		ListQuestion: List_List
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/PrintView/Question/Question.vue
var Question_disposed = false
var Question_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var Question___vue_template__ = null
/* template functional */
  var Question___vue_template_functional__ = false
/* styles */
var Question___vue_styles__ = null
/* scopeId */
var Question___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var Question___vue_module_identifier__ = null
var Question_Component = Question_normalizeComponent(
  Question_Question,
  Question___vue_template__,
  Question___vue_template_functional__,
  Question___vue_styles__,
  Question___vue_scopeId__,
  Question___vue_module_identifier__
)
Question_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/Question.vue"
if (Question_Component.esModule && Object.keys(Question_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-de9c697e", Question_Component.options)
  } else {
    hotAPI.reload("data-v-de9c697e", Question_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Question_disposed = true
  })
})()}

/* harmony default export */ var PrintView_Question_Question = (Question_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Item.vue
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var PrintView_Item = ({
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'item';
			}
		},
		text: {
			type: String,
			required: true
		},
		questions: {
			type: Array,
			required: false
		}
	},

	computed: {
		markedUpText: function markedUpText() {
			return Object(snarkdown_es["a" /* default */])(this.text);
		}
	},

	components: {
		PrintViewQuestion: PrintView_Question_Question
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0969ae44","hasScoped":true,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Item.vue
var PrintView_Item_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("table", { staticClass: "print-view-checklist-item" }, [
    _c("thead", [
      _c("tr", [
        _c("th", { domProps: { innerHTML: _vm._s(_vm.markedUpText) } })
      ])
    ]),
    _vm._v(" "),
    _c(
      "tbody",
      _vm._l(_vm.questions, function(question, index) {
        return _c("print-view-question", {
          key: index,
          attrs: { question: question }
        })
      })
    )
  ])
}
var Item_staticRenderFns = []
PrintView_Item_render._withStripped = true
var Item_esExports = { render: PrintView_Item_render, staticRenderFns: Item_staticRenderFns }
/* harmony default export */ var Checklist_PrintView_Item = (Item_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0969ae44", Item_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Item.vue
var Item_disposed = false
function Item_injectStyle (ssrContext) {
  if (Item_disposed) return
  __webpack_require__(483)
}
var Item_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var Item___vue_template_functional__ = false
/* styles */
var Item___vue_styles__ = Item_injectStyle
/* scopeId */
var Item___vue_scopeId__ = "data-v-0969ae44"
/* moduleIdentifier (server only) */
var Item___vue_module_identifier__ = null
var Item_Component = Item_normalizeComponent(
  PrintView_Item,
  Checklist_PrintView_Item,
  Item___vue_template_functional__,
  Item___vue_styles__,
  Item___vue_scopeId__,
  Item___vue_module_identifier__
)
Item_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Item.vue"
if (Item_Component.esModule && Object.keys(Item_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0969ae44", Item_Component.options)
  } else {
    hotAPI.reload("data-v-0969ae44", Item_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Item_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_PrintView_Item = (Item_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/Questionnaire/PrintView/Section.vue

/* harmony default export */ var PrintView_Section = ({
	name: 'questionnaire-print-view-section',
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
		}
	},

	render: function render(h) {
		var items = this.items.map(function (item) {
			var componentName = 'print-view-question-' + item.type;

			return h(componentName, {
				props: Object.assign({}, item)
			});
		});

		if (this.title) items.unshift(h('h1', this.title));

		return h('section', {
			class: {
				page: this.page
			}
		}, items);
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/Questionnaire/PrintView/Section.vue
var PrintView_Section_disposed = false
var PrintView_Section_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var PrintView_Section___vue_template__ = null
/* template functional */
  var PrintView_Section___vue_template_functional__ = false
/* styles */
var PrintView_Section___vue_styles__ = null
/* scopeId */
var PrintView_Section___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var PrintView_Section___vue_module_identifier__ = null
var PrintView_Section_Component = PrintView_Section_normalizeComponent(
  PrintView_Section,
  PrintView_Section___vue_template__,
  PrintView_Section___vue_template_functional__,
  PrintView_Section___vue_styles__,
  PrintView_Section___vue_scopeId__,
  PrintView_Section___vue_module_identifier__
)
PrintView_Section_Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Section.vue"
if (PrintView_Section_Component.esModule && Object.keys(PrintView_Section_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38f39f97", PrintView_Section_Component.options)
  } else {
    hotAPI.reload("data-v-38f39f97", PrintView_Section_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    PrintView_Section_disposed = true
  })
})()}

/* harmony default export */ var Questionnaire_PrintView_Section = (PrintView_Section_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Section.vue






/* harmony default export */ var Checklist_PrintView_Section = ({
	extends: Questionnaire_PrintView_Section,
	name: 'print-view-checklist-section',

	render: function render() {
		var h = arguments[0];

		var items = this.items.filter(function (item) {
			return Object(merit_utils["g" /* itemIsChecked */])(item);
		}).map(function (item) {
			var component = void 0;

			var vnodeData = { props: item };

			switch (item.type) {
				case 'section':
					component = h(
						'print-view-checklist-section',
						vnodeData,
						[]
					);
					break;
				case 'item':
					component = h(
						MeritCompensation_Checklist_PrintView_Item,
						vnodeData,
						[]
					);
					break;
			}

			return h(
				'tr',
				{ 'class': 'print-view-checklist-' + item.type + '-row' },
				[h(
					'td',
					null,
					[component]
				)]
			);
		});

		return h(
			'table',
			{ 'class': 'print-view-checklist-section' },
			[this.title && h(
				'thead',
				null,
				[h(
					'tr',
					null,
					[h(
						'th',
						null,
						[this.title]
					)]
				)]
			), h(
				'tbody',
				null,
				[items]
			)]
		);
	}
});
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Section.vue
var Checklist_PrintView_Section_disposed = false
function PrintView_Section_injectStyle (ssrContext) {
  if (Checklist_PrintView_Section_disposed) return
  __webpack_require__(481)
  __webpack_require__(482)
}
var Checklist_PrintView_Section_normalizeComponent = __webpack_require__(0)
/* script */

/* template */
var Checklist_PrintView_Section___vue_template__ = null
/* template functional */
  var Checklist_PrintView_Section___vue_template_functional__ = false
/* styles */
var Checklist_PrintView_Section___vue_styles__ = PrintView_Section_injectStyle
/* scopeId */
var Checklist_PrintView_Section___vue_scopeId__ = "data-v-b9654d2c"
/* moduleIdentifier (server only) */
var Checklist_PrintView_Section___vue_module_identifier__ = null
var Checklist_PrintView_Section_Component = Checklist_PrintView_Section_normalizeComponent(
  Checklist_PrintView_Section,
  Checklist_PrintView_Section___vue_template__,
  Checklist_PrintView_Section___vue_template_functional__,
  Checklist_PrintView_Section___vue_styles__,
  Checklist_PrintView_Section___vue_scopeId__,
  Checklist_PrintView_Section___vue_module_identifier__
)
Checklist_PrintView_Section_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Section.vue"
if (Checklist_PrintView_Section_Component.esModule && Object.keys(Checklist_PrintView_Section_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b9654d2c", Checklist_PrintView_Section_Component.options)
  } else {
    hotAPI.reload("data-v-b9654d2c", Checklist_PrintView_Section_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    Checklist_PrintView_Section_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_PrintView_Section = (Checklist_PrintView_Section_Component.exports);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Checklist.vue
//
//
//
//
//
//
//





/* harmony default export */ var PrintView_Checklist = ({
	props: {
		report: {
			type: Object,
			required: true
		}
	},

	computed: {
		filteredPages: function filteredPages() {
			return this.report.pages.filter(merit_utils["g" /* itemIsChecked */]);
		}
	},

	components: {
		ChecklistSection: MeritCompensation_Checklist_PrintView_Section
	}
});
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-f9db072a","hasScoped":false,"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0&bustCache!./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Checklist.vue
var PrintView_Checklist_render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    _vm._l(_vm.filteredPages, function(page, index) {
      return _c(
        "checklist-section",
        _vm._b({ key: index }, "checklist-section", page, false)
      )
    })
  )
}
var PrintView_Checklist_staticRenderFns = []
PrintView_Checklist_render._withStripped = true
var PrintView_Checklist_esExports = { render: PrintView_Checklist_render, staticRenderFns: PrintView_Checklist_staticRenderFns }
/* harmony default export */ var Checklist_PrintView_Checklist = (PrintView_Checklist_esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f9db072a", PrintView_Checklist_esExports)
  }
}
// CONCATENATED MODULE: ./resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Checklist.vue
var PrintView_Checklist_disposed = false
var PrintView_Checklist_normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var PrintView_Checklist___vue_template_functional__ = false
/* styles */
var PrintView_Checklist___vue_styles__ = null
/* scopeId */
var PrintView_Checklist___vue_scopeId__ = null
/* moduleIdentifier (server only) */
var PrintView_Checklist___vue_module_identifier__ = null
var PrintView_Checklist_Component = PrintView_Checklist_normalizeComponent(
  PrintView_Checklist,
  Checklist_PrintView_Checklist,
  PrintView_Checklist___vue_template_functional__,
  PrintView_Checklist___vue_styles__,
  PrintView_Checklist___vue_scopeId__,
  PrintView_Checklist___vue_module_identifier__
)
PrintView_Checklist_Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Checklist.vue"
if (PrintView_Checklist_Component.esModule && Object.keys(PrintView_Checklist_Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f9db072a", PrintView_Checklist_Component.options)
  } else {
    hotAPI.reload("data-v-f9db072a", PrintView_Checklist_Component.options)
' + '  }
  module.hot.dispose(function (data) {
    PrintView_Checklist_disposed = true
  })
})()}

/* harmony default export */ var MeritCompensation_Checklist_PrintView_Checklist = (PrintView_Checklist_Component.exports);

// CONCATENATED MODULE: ./resources/assets/js/vue-constructors/merit-reports/print-view.js








function createMeritReportPrintView(el, propsData) {
	return new vue_common_default.a({
		el: el,
		props: {
			meritReport: {
				type: Object,
				required: true
			},
			user: {
				type: Object,
				required: false
			}
		},
		propsData: propsData,

		computed: {
			dates: function dates() {
				return {
					startDate: this.meritReport.period_start,
					endDate: this.meritReport.period_end
				};
			},
			checkedItems: function checkedItems() {
				return Object(merit_utils["c" /* getCheckedItemCount */])(this.meritReport.report);
			}
		},

		components: {
			PrintViewChecklist: MeritCompensation_Checklist_PrintView_Checklist,
			RichDateRange: RichDateRange["a" /* default */]
		}
	});
}
// CONCATENATED MODULE: ./resources/assets/js/vue-constructors/merit-reports/index.js
/* harmony export (immutable) */ __webpack_exports__["createMeritReportsHub"] = createMeritReportsHub;
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "createMeritReportPrintView", function() { return createMeritReportPrintView; });
















vue_common_default.a.use(vue_router_esm["a" /* default */]);

var router = new vue_router_esm["a" /* default */]({
	routes: [{
		path: '/checklist/:id',
		component: vue_components_MeritCompensation_ReportById,
		props: true
	}, {
		path: '/summary/:id',
		component: vue_components_MeritCompensation_SummaryById,
		props: true
	}]
});

router.afterEach(function () {
	window.scroll({
		top: 0,
		left: 0
	});
});

function createMeritReportsHub(el, propsData) {
	return new vue_common_default.a({
		el: el,
		mixins: [HasAlerts["a" /* default */], faculty, admin_supervisor],
		props: {
			user: {
				type: Object,
				required: true
			},
			meritReportTypes: {
				type: Object,
				required: true
			},
			meritReportTypeForms: {
				type: Object,
				required: true
			}
		},
		data: function data() {
			return {
				meritForms: null,
				meritReports: null
			};
		},

		propsData: propsData,

		mounted: function mounted() {
			this.fetchReports();
			this.fetchMeritForms();
		},


		router: router,

		methods: {
			fetchReports: function fetchReports() {
				this.fetchAllMeritReports();
				this.fetchUsersWithReports();
			},
			fetchAllMeritReports: function fetchAllMeritReports() {
				var _this = this;

				return Object(merit_utils["b" /* fetchAllMeritReports */])().then(function (merits) {
					_this.meritReports = merits;
				}).catch(function (err) {
					console.error(err);
					_this.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching past merit reports'
					});
				});
			},
			fetchMeritForms: function fetchMeritForms() {
				var _this2 = this;

				return fetch('/merit-forms', {
					method: 'GET',
					headers: Object(utils["o" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(utils["u" /* jsonOrThrow */]).then(function (meritForms) {
					_this2.meritForms = meritForms;
				}).catch(function (err) {
					console.error(err);
					_this2.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem fetching merit forms'
					});
				});
			},
			addMeritReport: function addMeritReport() {
				var _this3 = this;

				var form = Object(merit_utils["f" /* getYearlyFacultyMeritForm */])(this.meritForms, this.meritReportTypes, this.meritReportTypeForms);
				var dates = Object(merit_utils["d" /* getCurrentYearlyMeritDateRange */])();

				fetch('/merits', {
					method: 'POST',
					headers: Object(utils["o" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						user_id: this.user.id,
						form_id: form.id,
						period_start: dates.startDate,
						period_end: dates.endDate,
						report: JSON.parse(form.form),
						status: 'pending'
					})
				}).then(utils["u" /* jsonOrThrow */]).then(function (merit) {
					_this3.fetchAllMeritReports();
					_this3.viewReport(merit.id);
				}).catch(function (err) {
					console.error(err);
					_this3.alerts.push({
						type: 'error',
						html: '<strong>Error:</strong> There was a problem creating a new merit report'
					});
				});
			},
			viewReport: function viewReport(id) {
				this.$router.push({ path: '/checklist/' + id });
			},
			viewReportSummary: function viewReportSummary(id) {
				this.$router.push({ path: '/summary/' + id });
			},
			handleReload: function handleReload() {
				return this.fetchReports();
			},
			handleClose: function handleClose() {
				this.handleReload();
				this.$router.push({ path: '/' });
			}
		}
	});
}

/***/ }),
/* 470 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 471 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 472 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 473 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 474 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 475 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 476 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 477 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 478 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 479 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 480 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 481 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 482 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 483 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 484 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 485 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 486 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[469]);
});
//# sourceMappingURL=vue-merit-reports.js.map