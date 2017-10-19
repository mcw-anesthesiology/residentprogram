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
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
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
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/snarkdown/dist/snarkdown.es.js'");

/***/ }),
/* 24 */,
/* 25 */
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
/* 26 */,
/* 27 */
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
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
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
/* 39 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/@jacobmischka/vue-flatpickr/dist/index.js'");

/***/ }),
/* 40 */,
/* 41 */,
/* 42 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/downloadjs/download.js'");

/***/ }),
/* 43 */
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
/* 44 */,
/* 45 */
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
/* 46 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 47 */
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
/* 48 */
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
/* 49 */
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
/* 50 */
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
/* 51 */
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__date_utils_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__questionnaire_validate_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__merits_validate_js__ = __webpack_require__(208);






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
		headers: Object(__WEBPACK_IMPORTED_MODULE_2__utils_js__["n" /* getFetchHeaders */])(),
		credentials: 'same-origin'
	}).then(__WEBPACK_IMPORTED_MODULE_2__utils_js__["t" /* jsonOrThrow */]);
}

/***/ }),
/* 52 */,
/* 53 */
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
/* 54 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/lodash/isEqual.js'");

/***/ }),
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */
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
/* 123 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 124 */
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
/* 125 */
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
/* 126 */,
/* 127 */
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
/* 128 */,
/* 129 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/flatpickr/dist/flatpickr.css'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 130 */,
/* 131 */
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
/* 132 */
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
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SvgIcon_vue__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5137c9f8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SvgIcon_vue__ = __webpack_require__(192);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(190)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SvgIcon_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5137c9f8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SvgIcon_vue__["a" /* default */],
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

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 139 */,
/* 140 */
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
/* 141 */,
/* 142 */
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
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichDateRange_vue__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a8a5f24_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichDateRange_vue__ = __webpack_require__(310);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(308)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichDateRange_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7a8a5f24_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichDateRange_vue__["a" /* default */],
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

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 149 */
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
/* 150 */
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
/* 151 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 152 */
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
/* 153 */
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
/* 154 */
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
/* 155 */
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
/* 156 */
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
/* 157 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/lunr/lunr.js'");

/***/ }),
/* 158 */
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
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */
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
/* 165 */
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
/* 166 */,
/* 167 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/vue-router/dist/vue-router.esm.js'");

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_LoadingButton_vue__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1ae71dc9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_LoadingButton_vue__ = __webpack_require__(207);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_LoadingButton_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1ae71dc9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_LoadingButton_vue__["a" /* default */],
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

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
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

/***/ }),
/* 192 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5137c9f8", esExports)
  }
}

/***/ }),
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
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_v_tooltip__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_v_tooltip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_v_tooltip__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SvgIcon_vue__ = __webpack_require__(138);
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
	directives: {
		tooltip: __WEBPACK_IMPORTED_MODULE_0_v_tooltip__["VTooltip"]
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
		SvgIcon: __WEBPACK_IMPORTED_MODULE_1__SvgIcon_vue__["a" /* default */]
	}
});

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/v-tooltip/dist/v-tooltip.esm.js'");

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1ae71dc9", esExports)
  }
}

/***/ }),
/* 208 */
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
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */
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
/* 224 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getHeaderHeight;
function getHeaderHeight() {
	var navbar = document.querySelector('#main-navbar');

	if (!navbar) return null;

	return navbar.clientHeight;
}

/***/ }),
/* 225 */
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
/* 226 */
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
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
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
/* 308 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 309 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
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
			return Object(__WEBPACK_IMPORTED_MODULE_0__modules_date_utils_js__["renderDateRange"])(this.startDate, this.endDate, this.hovered);
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

/***/ }),
/* 310 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7a8a5f24", esExports)
  }
}

/***/ }),
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */
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
/* 318 */
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
/* 319 */
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
/* 320 */
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
/* 321 */
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
/* 322 */
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
/* 323 */
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
/* 324 */
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
/* 325 */
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
/* 326 */
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
/* 327 */
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
/* 328 */
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
/* 329 */
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
/* 330 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 331 */
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
/* 332 */
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
/* 333 */
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
/* 334 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 335 */
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
/* 336 */
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
/* 337 */
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
/* 338 */
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
/* 339 */
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
/* 340 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 341 */
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
/* 342 */
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
/* 343 */
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
/* 344 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 345 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 346 */
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
/* 347 */
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
/* 348 */
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
/* 349 */
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
/* 350 */
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
/* 351 */
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
/* 352 */
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
/* 353 */
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
/* 354 */
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
/* 355 */
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
/* 356 */
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
/* 357 */
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
/* 358 */
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
/* 359 */
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
/* 360 */
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
/* 361 */
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
/* 362 */
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
/* 363 */
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
/* 364 */
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
/* 365 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 366 */
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
/* 367 */
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
/* 368 */
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
/* 369 */
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
/* 370 */
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
/* 371 */
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
/* 372 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 373 */
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
/* 374 */
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
/* 375 */
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
/* 376 */
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
/* 377 */
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
/* 378 */
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
/* 379 */
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
/* 380 */
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
/* 381 */
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
/* 382 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 383 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 384 */
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
/* 385 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/commonmark/lib/index.js'");

/***/ }),
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
/* 398 */
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
/* 399 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 400 */
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
/* 433 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Report_vue__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ff62c0e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Report_vue__ = __webpack_require__(764);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(730)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ff62c0e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Report_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ff62c0e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Report_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Report.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ff62c0e", Component.options)
  } else {
    hotAPI.reload("data-v-6ff62c0e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 434 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Item_vue__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_024c0c7e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Item_vue__ = __webpack_require__(740);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(738)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Item_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_024c0c7e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Item_vue__["a" /* default */],
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

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 435 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReportListItem_vue__ = __webpack_require__(788);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6c389d6a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReportListItem_vue__ = __webpack_require__(792);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(787)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6c389d6a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReportListItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6c389d6a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReportListItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/ReportListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6c389d6a", Component.options)
  } else {
    hotAPI.reload("data-v-6c389d6a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
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
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */,
/* 646 */,
/* 647 */,
/* 648 */,
/* 649 */,
/* 650 */,
/* 651 */,
/* 652 */,
/* 653 */,
/* 654 */,
/* 655 */,
/* 656 */,
/* 657 */,
/* 658 */,
/* 659 */,
/* 660 */,
/* 661 */,
/* 662 */,
/* 663 */,
/* 664 */,
/* 665 */,
/* 666 */,
/* 667 */,
/* 668 */,
/* 669 */,
/* 670 */,
/* 671 */,
/* 672 */,
/* 673 */,
/* 674 */,
/* 675 */,
/* 676 */,
/* 677 */,
/* 678 */,
/* 679 */,
/* 680 */,
/* 681 */,
/* 682 */,
/* 683 */,
/* 684 */,
/* 685 */,
/* 686 */,
/* 687 */,
/* 688 */,
/* 689 */,
/* 690 */,
/* 691 */,
/* 692 */,
/* 693 */,
/* 694 */,
/* 695 */,
/* 696 */,
/* 697 */,
/* 698 */,
/* 699 */,
/* 700 */,
/* 701 */,
/* 702 */,
/* 703 */,
/* 704 */,
/* 705 */,
/* 706 */,
/* 707 */,
/* 708 */,
/* 709 */,
/* 710 */,
/* 711 */,
/* 712 */,
/* 713 */,
/* 714 */,
/* 715 */,
/* 716 */,
/* 717 */,
/* 718 */,
/* 719 */,
/* 720 */,
/* 721 */,
/* 722 */,
/* 723 */,
/* 724 */,
/* 725 */,
/* 726 */,
/* 727 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createMeritReportsHub"] = createMeritReportsHub;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_mixins_HasAlerts_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_ReportById_vue__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_MeritCompensation_SummaryById_vue__ = __webpack_require__(766);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_supervisor_js__ = __webpack_require__(784);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__faculty_js__ = __webpack_require__(794);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__print_view_js__ = __webpack_require__(795);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMeritReportPrintView", function() { return __WEBPACK_IMPORTED_MODULE_7__print_view_js__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_merit_utils_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_utils_js__ = __webpack_require__(1);
















__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]);

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]({
	routes: [{
		path: '/checklist/:id',
		component: __WEBPACK_IMPORTED_MODULE_3__vue_components_MeritCompensation_ReportById_vue__["a" /* default */],
		props: true
	}, {
		path: '/summary/:id',
		component: __WEBPACK_IMPORTED_MODULE_4__vue_components_MeritCompensation_SummaryById_vue__["a" /* default */],
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
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		el: el,
		mixins: [__WEBPACK_IMPORTED_MODULE_2__vue_mixins_HasAlerts_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__faculty_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__admin_supervisor_js__["a" /* default */]],
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

				return Object(__WEBPACK_IMPORTED_MODULE_8__modules_merit_utils_js__["b" /* fetchAllMeritReports */])().then(function (merits) {
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
					headers: Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin'
				}).then(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["t" /* jsonOrThrow */]).then(function (meritForms) {
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

				var form = Object(__WEBPACK_IMPORTED_MODULE_8__modules_merit_utils_js__["f" /* getYearlyFacultyMeritForm */])(this.meritForms, this.meritReportTypes, this.meritReportTypeForms);
				var dates = Object(__WEBPACK_IMPORTED_MODULE_8__modules_merit_utils_js__["d" /* getCurrentYearlyMeritDateRange */])();

				fetch('/merits', {
					method: 'POST',
					headers: Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["n" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: JSON.stringify({
						user_id: this.user.id,
						form_id: form.id,
						period_start: dates.startDate,
						period_end: dates.endDate,
						report: JSON.parse(form.form),
						status: 'pending'
					})
				}).then(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["t" /* jsonOrThrow */]).then(function (merit) {
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
/* 728 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReportById_vue__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_785ad86b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReportById_vue__ = __webpack_require__(765);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReportById_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_785ad86b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReportById_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/ReportById.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-785ad86b", Component.options)
  } else {
    hotAPI.reload("data-v-785ad86b", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 729 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Report_vue__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__ = __webpack_require__(51);
//
//
//
//
//
//
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

			Object(__WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__["b" /* fetchAllMeritReports */])().then(function (merits) {
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
		MeritReport: __WEBPACK_IMPORTED_MODULE_0__Report_vue__["a" /* default */]
	}
});

/***/ }),
/* 730 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 731 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Checklist_Checklist_vue__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LoadingButton_vue__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RichDateRange_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_date_utils_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_merit_utils_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_utils_js__["s" /* isAdmin */])(this.currentUser);
		},
		readonly: function readonly() {
			return !['pending', 'open for editing'].includes(this.status);
		},
		checkedItems: function checkedItems() {
			return Object(__WEBPACK_IMPORTED_MODULE_6__modules_merit_utils_js__["c" /* getCheckedItemCount */])(this.report);
		},
		lastMonth: function lastMonth() {
			return Object(__WEBPACK_IMPORTED_MODULE_5__modules_date_utils_js__["isoDateString"])(__WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'month'));
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
				headers: Object(__WEBPACK_IMPORTED_MODULE_7__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(meritReport)
			}).then(__WEBPACK_IMPORTED_MODULE_7__modules_utils_js__["w" /* okOrThrow */]).then(function () {
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
		MeritCompensationChecklist: __WEBPACK_IMPORTED_MODULE_1__Checklist_Checklist_vue__["a" /* default */],

		AcademicYearSelector: __WEBPACK_IMPORTED_MODULE_2__AcademicYearSelector_vue__["a" /* default */],
		LoadingButton: __WEBPACK_IMPORTED_MODULE_3__LoadingButton_vue__["a" /* default */],
		RichDateRange: __WEBPACK_IMPORTED_MODULE_4__RichDateRange_vue__["a" /* default */]
	}
});

/***/ }),
/* 732 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checklist_vue__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_08bc7d30_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checklist_vue__ = __webpack_require__(763);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(733)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-08bc7d30"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checklist_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_08bc7d30_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checklist_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-08bc7d30", Component.options)
  } else {
    hotAPI.reload("data-v-08bc7d30", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 733 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 734 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SectionErrors_vue__ = __webpack_require__(741);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChecklistErrors_vue__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Questionnaire_Pager_vue__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_merit_utils_js__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		checklistIsValid: __WEBPACK_IMPORTED_MODULE_6__modules_merit_utils_js__["a" /* checklistIsValid */],
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
		ChecklistSection: __WEBPACK_IMPORTED_MODULE_0__Section_vue__["a" /* default */],
		SectionErrors: __WEBPACK_IMPORTED_MODULE_1__SectionErrors_vue__["a" /* default */],
		ChecklistErrors: __WEBPACK_IMPORTED_MODULE_2__ChecklistErrors_vue__["a" /* default */],
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_3__ConfirmationButton_vue__["a" /* default */],
		QuestionnairePager: __WEBPACK_IMPORTED_MODULE_4__Questionnaire_Pager_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_5__ShowHideButton_vue__["a" /* default */]
	}
});

/***/ }),
/* 735 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Section_vue__ = __webpack_require__(737);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(736)
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
var __vue_scopeId__ = "data-v-a8188cb2"
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
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a8188cb2", Component.options)
  } else {
    hotAPI.reload("data-v-a8188cb2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 736 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 737 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__ = __webpack_require__(226);





/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__["a" /* default */],
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
		ChecklistItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
		QuestionnaireInstruction: __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__["a" /* default */]
	}
});

/***/ }),
/* 738 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 739 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue__ = __webpack_require__(225);
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





/* harmony default export */ __webpack_exports__["a"] = ({
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
			return Object(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["default"])(this.text);
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
		QuestionnaireQuestion: __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue__["a" /* default */]
	}
});

/***/ }),
/* 740 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-024c0c7e", esExports)
  }
}

/***/ }),
/* 741 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SectionErrors_vue__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ee8df1c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SectionErrors_vue__ = __webpack_require__(744);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(742)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5ee8df1c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SectionErrors_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5ee8df1c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SectionErrors_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/SectionErrors.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ee8df1c", Component.options)
  } else {
    hotAPI.reload("data-v-5ee8df1c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 742 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 743 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_merits_validate_js__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_dom_utils_js__ = __webpack_require__(224);
//
//
//
//
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
		page: {
			type: Object,
			required: true
		}
	},

	computed: {
		validation: function validation() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_merits_validate_js__["d" /* section */])(this.page);
		},
		errors: function errors() {
			if (!this.validation) return [];

			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_merits_validate_js__["b" /* flattenErrors */])(this.validation.errors);
		}
	},

	methods: {
		scrollToError: function scrollToError() {
			$('.invalid-container').first().parents('.checklist-item').velocity('scroll', {
				offset: -1 * Object(__WEBPACK_IMPORTED_MODULE_2__modules_dom_utils_js__["a" /* getHeaderHeight */])()
			});
		}
	},

	components: {
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__["a" /* default */]
	}
});

/***/ }),
/* 744 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ee8df1c", esExports)
  }
}

/***/ }),
/* 745 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ChecklistErrors_vue__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_52eb0373_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ChecklistErrors_vue__ = __webpack_require__(747);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ChecklistErrors_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_52eb0373_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ChecklistErrors_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/ChecklistErrors.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52eb0373", Component.options)
  } else {
    hotAPI.reload("data-v-52eb0373", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 746 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_merits_validate_js__ = __webpack_require__(208);
//
//
//
//
//
//
//
//
//
//
//
//
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
		pages: {
			type: Array,
			required: true
		}
	},

	computed: {
		pageValidations: function pageValidations() {
			if (!this.pages) return [];

			return this.pages.map(__WEBPACK_IMPORTED_MODULE_1__modules_merits_validate_js__["d" /* section */]);
		},
		pagesValid: function pagesValid() {
			return this.pageValidations.every(function (validation) {
				return validation.valid;
			});
		},
		pageErrors: function pageErrors() {
			return this.pageValidations.map(function (validation) {
				return Object(__WEBPACK_IMPORTED_MODULE_1__modules_merits_validate_js__["b" /* flattenErrors */])(validation.errors);
			});
		}
	},

	components: {
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__["a" /* default */]
	}
});

/***/ }),
/* 747 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-52eb0373", esExports)
  }
}

/***/ }),
/* 748 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Pager_vue__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a814e09c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Pager_vue__ = __webpack_require__(762);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(749)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a814e09c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Pager_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a814e09c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Pager_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/Pager.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a814e09c", Component.options)
  } else {
    hotAPI.reload("data-v-a814e09c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 749 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 750 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__PagerControls_vue__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_dom_utils_js__ = __webpack_require__(224);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]);

/* harmony default export */ __webpack_exports__["a"] = ({
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
				offset: -1 * Object(__WEBPACK_IMPORTED_MODULE_3__modules_dom_utils_js__["a" /* getHeaderHeight */])()
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
		PagerControls: __WEBPACK_IMPORTED_MODULE_2__PagerControls_vue__["a" /* default */]
	}
});

/***/ }),
/* 751 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PagerControls_vue__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8aa3b4f0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PagerControls_vue__ = __webpack_require__(761);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(752)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8aa3b4f0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PagerControls_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8aa3b4f0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PagerControls_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PagerControls.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8aa3b4f0", Component.options)
  } else {
    hotAPI.reload("data-v-8aa3b4f0", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 752 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 753 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ProgressBullets_vue__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BootstrapPopover_vue__ = __webpack_require__(758);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__["a" /* default */],
		ProgressBullets: __WEBPACK_IMPORTED_MODULE_1__ProgressBullets_vue__["a" /* default */],
		BootstrapPopover: __WEBPACK_IMPORTED_MODULE_2__BootstrapPopover_vue__["a" /* default */]
	}
});

/***/ }),
/* 754 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ProgressBullets_vue__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b09133f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ProgressBullets_vue__ = __webpack_require__(757);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(755)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7b09133f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ProgressBullets_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7b09133f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ProgressBullets_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ProgressBullets.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b09133f", Component.options)
  } else {
    hotAPI.reload("data-v-7b09133f", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 755 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 756 */
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

/* harmony default export */ __webpack_exports__["a"] = ({
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

/***/ }),
/* 757 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7b09133f", esExports)
  }
}

/***/ }),
/* 758 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapPopover_vue__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f512428_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapPopover_vue__ = __webpack_require__(760);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapPopover_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4f512428_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapPopover_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/BootstrapPopover.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f512428", Component.options)
  } else {
    hotAPI.reload("data-v-4f512428", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 759 */
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

/***/ }),
/* 760 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4f512428", esExports)
  }
}

/***/ }),
/* 761 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8aa3b4f0", esExports)
  }
}

/***/ }),
/* 762 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a814e09c", esExports)
  }
}

/***/ }),
/* 763 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
                            _vm.show.errors = $$v
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-08bc7d30", esExports)
  }
}

/***/ }),
/* 764 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6ff62c0e", esExports)
  }
}

/***/ }),
/* 765 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-785ad86b", esExports)
  }
}

/***/ }),
/* 766 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SummaryById_vue__ = __webpack_require__(767);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a56659ba_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SummaryById_vue__ = __webpack_require__(783);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_SummaryById_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a56659ba_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_SummaryById_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/SummaryById.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a56659ba", Component.options)
  } else {
    hotAPI.reload("data-v-a56659ba", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 767 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Summary_vue__ = __webpack_require__(768);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__ = __webpack_require__(51);
//
//
//
//
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

			Object(__WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__["b" /* fetchAllMeritReports */])().then(function (merits) {
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
		MeritReportSummary: __WEBPACK_IMPORTED_MODULE_0__Summary_vue__["a" /* default */]
	}
});

/***/ }),
/* 768 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Summary_vue__ = __webpack_require__(770);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02d100b1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Summary_vue__ = __webpack_require__(782);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(769)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-02d100b1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Summary_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_02d100b1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Summary_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Summary.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-02d100b1", Component.options)
  } else {
    hotAPI.reload("data-v-02d100b1", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 769 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 770 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Checklist_Summary_Checklist_vue__ = __webpack_require__(771);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Checklist_Score_vue__ = __webpack_require__(777);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AcademicYearSelector_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LoadingButton_vue__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__RichDateRange_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_date_utils_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_merit_utils_js__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_merit_utils_js__["c" /* getCheckedItemCount */])(this.report);
		},
		lastMonth: function lastMonth() {
			return Object(__WEBPACK_IMPORTED_MODULE_6__modules_date_utils_js__["isoDateString"])(__WEBPACK_IMPORTED_MODULE_0_moment___default()().subtract(1, 'month'));
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
		MeritCompensationSummaryChecklist: __WEBPACK_IMPORTED_MODULE_1__Checklist_Summary_Checklist_vue__["a" /* default */],
		MeritCompensationScore: __WEBPACK_IMPORTED_MODULE_2__Checklist_Score_vue__["a" /* default */],

		AcademicYearSelector: __WEBPACK_IMPORTED_MODULE_3__AcademicYearSelector_vue__["a" /* default */],
		LoadingButton: __WEBPACK_IMPORTED_MODULE_4__LoadingButton_vue__["a" /* default */],
		RichDateRange: __WEBPACK_IMPORTED_MODULE_5__RichDateRange_vue__["a" /* default */]
	}
});

/***/ }),
/* 771 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checklist_vue__ = __webpack_require__(772);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4fdf0ec2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checklist_vue__ = __webpack_require__(776);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checklist_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4fdf0ec2_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checklist_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Checklist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fdf0ec2", Component.options)
  } else {
    hotAPI.reload("data-v-4fdf0ec2", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 772 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue__ = __webpack_require__(773);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__ = __webpack_require__(51);
//
//
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
		pages: {
			type: Array,
			required: true
		}
	},

	computed: {
		filteredSections: function filteredSections() {
			return this.pages.filter(function (page) {
				return Object(__WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__["g" /* itemIsChecked */])(page);
			});
		}
	},

	components: {
		SummarySection: __WEBPACK_IMPORTED_MODULE_0__Section_vue__["a" /* default */]
	}
});

/***/ }),
/* 773 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Section_vue__ = __webpack_require__(775);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(774)
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
var __vue_scopeId__ = "data-v-5844d29e"
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
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Summary/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5844d29e", Component.options)
  } else {
    hotAPI.reload("data-v-5844d29e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 774 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 775 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__ = __webpack_require__(51);







/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__["a" /* default */],
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
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__["g" /* itemIsChecked */])(item);
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
		ChecklistItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
		QuestionnaireInstruction: __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__["a" /* default */]
	}
});

/***/ }),
/* 776 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4fdf0ec2", esExports)
  }
}

/***/ }),
/* 777 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Score_vue__ = __webpack_require__(778);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44eb0558_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Score_vue__ = __webpack_require__(781);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Score_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_44eb0558_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Score_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/Score.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-44eb0558", Component.options)
  } else {
    hotAPI.reload("data-v-44eb0558", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 778 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_merits_scoring_js__ = __webpack_require__(779);
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
			return Object(__WEBPACK_IMPORTED_MODULE_0__modules_merits_scoring_js__["a" /* scoreChecklist */])(this.checklist);
		}
	}
});

/***/ }),
/* 779 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = scoreChecklist;
/* unused harmony export scoreSection */
/* unused harmony export scoreItem */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__questionnaire_scoring_js__ = __webpack_require__(780);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



function scoreChecklist(checklist) {
	return __WEBPACK_IMPORTED_MODULE_0__questionnaire_scoring_js__["b" /* mergeScores */].apply(undefined, _toConsumableArray(checklist.pages.map(scoreSection)));
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

	return __WEBPACK_IMPORTED_MODULE_0__questionnaire_scoring_js__["b" /* mergeScores */].apply(undefined, scores);
}

function scoreItem(item) {
	var score = new Map();

	if (item.scoring && item.checked) {
		var scoring = item.scoring;
		score.set(scoring.category, Object(__WEBPACK_IMPORTED_MODULE_0__questionnaire_scoring_js__["a" /* computeScore */])(scoring, scoring.value));
	}

	if (item.questions) {
		var questionScores = item.questions.map(__WEBPACK_IMPORTED_MODULE_0__questionnaire_scoring_js__["c" /* scoreQuestion */]);
		score = __WEBPACK_IMPORTED_MODULE_0__questionnaire_scoring_js__["b" /* mergeScores */].apply(undefined, [score].concat(_toConsumableArray(questionScores)));
	}

	return score;
}

/***/ }),
/* 780 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isValidScoringDefinition */
/* unused harmony export isValidValueScoringDefinition */
/* harmony export (immutable) */ __webpack_exports__["b"] = mergeScores;
/* harmony export (immutable) */ __webpack_exports__["a"] = computeScore;
/* harmony export (immutable) */ __webpack_exports__["c"] = scoreQuestion;
/* unused harmony export textQuestion */
/* unused harmony export numberQuestion */
/* unused harmony export selectQuestion */
/* unused harmony export checkboxQuestion */
/* unused harmony export radioQuestion */
/* unused harmony export radioCheckboxQuestion */
/* unused harmony export listQuestion */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_js__ = __webpack_require__(140);
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
		var _value = Object(__WEBPACK_IMPORTED_MODULE_0__index_js__["c" /* getSelectValue */])(question);
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

/***/ }),
/* 781 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-44eb0558", esExports)
  }
}

/***/ }),
/* 782 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-02d100b1", esExports)
  }
}

/***/ }),
/* 783 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a56659ba", esExports)
  }
}

/***/ }),
/* 784 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_MeritCompensation_UserWithReportListItem_vue__ = __webpack_require__(785);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);






/* harmony default export */ __webpack_exports__["a"] = ({
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
			return Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["s" /* isAdmin */])(this.user) || Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["K" /* usesFeature */])(this.user, 'FACULTY_MERIT');
		}
	},

	methods: {
		fetchUsersWithReports: function fetchUsersWithReports() {
			var _this = this;

			if (!this.currentUserIsAdminOrSupervisor) return;

			fetch('/merits/by-user', {
				method: 'GET',
				headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin'
			}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["t" /* jsonOrThrow */]).then(function (usersWithReports) {
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
		AlertList: __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__["a" /* default */],
		ComponentList: __WEBPACK_IMPORTED_MODULE_1__vue_components_ComponentList_vue__["a" /* default */],
		UserWithMeritReportListItem: __WEBPACK_IMPORTED_MODULE_2__vue_components_MeritCompensation_UserWithReportListItem_vue__["a" /* default */]
	}
});

/***/ }),
/* 785 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserWithReportListItem_vue__ = __webpack_require__(786);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_142bf50a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserWithReportListItem_vue__ = __webpack_require__(793);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserWithReportListItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_142bf50a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserWithReportListItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/UserWithReportListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-142bf50a", Component.options)
  } else {
    hotAPI.reload("data-v-142bf50a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 786 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_mixins_HasAlerts_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ReportListItem_vue__ = __webpack_require__(435);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	mixins: [__WEBPACK_IMPORTED_MODULE_0__vue_mixins_HasAlerts_js__["a" /* default */]],
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
		ComponentList: __WEBPACK_IMPORTED_MODULE_1__ComponentList_vue__["a" /* default */],
		MeritReportListItem: __WEBPACK_IMPORTED_MODULE_2__ReportListItem_vue__["a" /* default */]
	}
});

/***/ }),
/* 787 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 788 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ConfirmationYesNo_vue__ = __webpack_require__(789);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_datatable_utils_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			return Object(__WEBPACK_IMPORTED_MODULE_4__modules_datatable_utils_js__["f" /* getEvaluationStatusLabel */])(this.status);
		},
		checkedItems: function checkedItems() {
			return Object(__WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__["c" /* getCheckedItemCount */])(this.report);
		}
	},

	methods: {
		ucfirst: __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["H" /* ucfirst */],
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
				headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign(changes, {
					_method: 'PATCH'
				}))
			}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["w" /* okOrThrow */]).then(function () {
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
		ConfirmationButton: __WEBPACK_IMPORTED_MODULE_0__ConfirmationButton_vue__["a" /* default */],
		ConfirmationYesNo: __WEBPACK_IMPORTED_MODULE_1__ConfirmationYesNo_vue__["a" /* default */],
		RichDateRange: __WEBPACK_IMPORTED_MODULE_2__RichDateRange_vue__["a" /* default */]
	}
});

/***/ }),
/* 789 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ConfirmationYesNo_vue__ = __webpack_require__(790);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c1d823e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ConfirmationYesNo_vue__ = __webpack_require__(791);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ConfirmationYesNo_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c1d823e4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ConfirmationYesNo_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ConfirmationYesNo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c1d823e4", Component.options)
  } else {
    hotAPI.reload("data-v-c1d823e4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 790 */
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

/* harmony default export */ __webpack_exports__["a"] = ({
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

/***/ }),
/* 791 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c1d823e4", esExports)
  }
}

/***/ }),
/* 792 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6c389d6a", esExports)
  }
}

/***/ }),
/* 793 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-142bf50a", esExports)
  }
}

/***/ }),
/* 794 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Report_vue__ = __webpack_require__(433);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_MeritCompensation_ReportListItem_vue__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_RichDateRange_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__ = __webpack_require__(51);








/* harmony default export */ __webpack_exports__["a"] = ({
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
			return Object(__WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__["d" /* getCurrentYearlyMeritDateRange */])();
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

				return Object(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["datesEqual"])(periodDates, _this2.currentYearlyMeritDateRange) && report.status === 'complete';
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
		ComponentList: __WEBPACK_IMPORTED_MODULE_0__vue_components_ComponentList_vue__["a" /* default */],
		MeritCompensationReport: __WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Report_vue__["a" /* default */],
		MeritReportListItem: __WEBPACK_IMPORTED_MODULE_2__vue_components_MeritCompensation_ReportListItem_vue__["a" /* default */],
		RichDateRange: __WEBPACK_IMPORTED_MODULE_3__vue_components_RichDateRange_vue__["a" /* default */]
	}
});

/***/ }),
/* 795 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createMeritReportPrintView;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Checklist_PrintView_Checklist_vue__ = __webpack_require__(796);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_RichDateRange_vue__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__ = __webpack_require__(51);








function createMeritReportPrintView(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
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
				return Object(__WEBPACK_IMPORTED_MODULE_3__modules_merit_utils_js__["c" /* getCheckedItemCount */])(this.meritReport.report);
			}
		},

		components: {
			PrintViewChecklist: __WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Checklist_PrintView_Checklist_vue__["a" /* default */],
			RichDateRange: __WEBPACK_IMPORTED_MODULE_2__vue_components_RichDateRange_vue__["a" /* default */]
		}
	});
}

/***/ }),
/* 796 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checklist_vue__ = __webpack_require__(797);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f9db072a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checklist_vue__ = __webpack_require__(821);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Checklist_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_f9db072a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Checklist_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Checklist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f9db072a", Component.options)
  } else {
    hotAPI.reload("data-v-f9db072a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 797 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue__ = __webpack_require__(798);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__ = __webpack_require__(51);
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		report: {
			type: Object,
			required: true
		}
	},

	computed: {
		filteredPages: function filteredPages() {
			return this.report.pages.filter(__WEBPACK_IMPORTED_MODULE_1__modules_merit_utils_js__["g" /* itemIsChecked */]);
		}
	},

	components: {
		ChecklistSection: __WEBPACK_IMPORTED_MODULE_0__Section_vue__["a" /* default */]
	}
});

/***/ }),
/* 798 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Section_vue__ = __webpack_require__(801);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(799)
  __webpack_require__(800)
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
var __vue_scopeId__ = "data-v-b9654d2c"
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
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b9654d2c", Component.options)
  } else {
    hotAPI.reload("data-v-b9654d2c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 799 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 800 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 801 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(802);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_PrintView_Section_vue__ = __webpack_require__(819);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_merit_utils_js__ = __webpack_require__(51);






/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_1__Questionnaire_PrintView_Section_vue__["a" /* default */],
	name: 'print-view-checklist-section',

	render: function render() {
		var h = arguments[0];

		var items = this.items.filter(function (item) {
			return Object(__WEBPACK_IMPORTED_MODULE_2__modules_merit_utils_js__["g" /* itemIsChecked */])(item);
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
						__WEBPACK_IMPORTED_MODULE_0__Item_vue__["a" /* default */],
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

/***/ }),
/* 802 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Item_vue__ = __webpack_require__(804);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0969ae44_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Item_vue__ = __webpack_require__(818);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(803)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0969ae44"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Item_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0969ae44_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/Checklist/PrintView/Item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0969ae44", Component.options)
  } else {
    hotAPI.reload("data-v-0969ae44", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 803 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 804 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Questionnaire_PrintView_Question_Question_vue__ = __webpack_require__(805);
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





/* harmony default export */ __webpack_exports__["a"] = ({
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
			return Object(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["default"])(this.text);
		}
	},

	components: {
		PrintViewQuestion: __WEBPACK_IMPORTED_MODULE_0__Questionnaire_PrintView_Question_Question_vue__["a" /* default */]
	}
});

/***/ }),
/* 805 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Question_vue__ = __webpack_require__(806);
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
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/Question.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-de9c697e", Component.options)
  } else {
    hotAPI.reload("data-v-de9c697e", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 806 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueQuestion_vue__ = __webpack_require__(807);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RadioCheckboxQuestion_vue__ = __webpack_require__(811);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__List_List_vue__ = __webpack_require__(815);





/* harmony default export */ __webpack_exports__["a"] = ({
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
		ValueQuestion: __WEBPACK_IMPORTED_MODULE_0__ValueQuestion_vue__["a" /* default */],
		RadioCheckboxQuestion: __WEBPACK_IMPORTED_MODULE_1__RadioCheckboxQuestion_vue__["a" /* default */],
		ListQuestion: __WEBPACK_IMPORTED_MODULE_2__List_List_vue__["a" /* default */]
	}
});

/***/ }),
/* 807 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ValueQuestion_vue__ = __webpack_require__(809);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30d3f1ac_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ValueQuestion_vue__ = __webpack_require__(810);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(808)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-30d3f1ac"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ValueQuestion_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30d3f1ac_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ValueQuestion_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/ValueQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30d3f1ac", Component.options)
  } else {
    hotAPI.reload("data-v-30d3f1ac", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 808 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 809 */
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

/***/ }),
/* 810 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("tr", [
    _c("th", [_vm._v(_vm._s(_vm.text))]),
    _vm._v(" "),
    _c("td", [_vm._v(_vm._s(_vm.value))])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30d3f1ac", esExports)
  }
}

/***/ }),
/* 811 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RadioCheckboxQuestion_vue__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2424a099_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RadioCheckboxQuestion_vue__ = __webpack_require__(814);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(812)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2424a099"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RadioCheckboxQuestion_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2424a099_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RadioCheckboxQuestion_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/RadioCheckboxQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2424a099", Component.options)
  } else {
    hotAPI.reload("data-v-2424a099", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 812 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 813 */
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

/* harmony default export */ __webpack_exports__["a"] = ({
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

/***/ }),
/* 814 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2424a099", esExports)
  }
}

/***/ }),
/* 815 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__ = __webpack_require__(817);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(816)
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
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Question/List/List.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a54ef978", Component.options)
  } else {
    hotAPI.reload("data-v-a54ef978", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 816 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 817 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_utils_js__ = __webpack_require__(1);



/* harmony default export */ __webpack_exports__["a"] = ({
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
							[Object(__WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["H" /* ucfirst */])(Object(__WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["b" /* camelCaseToWords */])(prop)), ': ']
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

/***/ }),
/* 818 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-0969ae44", esExports)
  }
}

/***/ }),
/* 819 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Section_vue__ = __webpack_require__(820);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Section_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Questionnaire/PrintView/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38f39f97", Component.options)
  } else {
    hotAPI.reload("data-v-38f39f97", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 820 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
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

/***/ }),
/* 821 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
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
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f9db072a", esExports)
  }
}

/***/ })
],[727]);
});
//# sourceMappingURL=vue-merit-reports.js.map