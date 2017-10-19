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
return webpackJsonp([2],[
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
/* 19 */,
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
/* 27 */,
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
/* 41 */
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
/* 127 */,
/* 128 */,
/* 129 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/flatpickr/dist/flatpickr.css'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */
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
/* 134 */,
/* 135 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 136 */
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
/* 137 */
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
/* 143 */,
/* 144 */,
/* 145 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 146 */
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
/* 147 */
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
/* 189 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/color/index.js'");

/***/ }),
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
/* 194 */
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
/* 195 */
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
/* 196 */
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
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ChartjsChart_vue__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38d7668c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ChartjsChart_vue__ = __webpack_require__(550);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ChartjsChart_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38d7668c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ChartjsChart_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ChartjsChart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38d7668c", Component.options)
  } else {
    hotAPI.reload("data-v-38d7668c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 220 */,
/* 221 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export sum */
/* unused harmony export mean */
/* harmony export (immutable) */ __webpack_exports__["a"] = average;
/* unused harmony export variance */
/* harmony export (immutable) */ __webpack_exports__["c"] = standardDeviation;
/* harmony export (immutable) */ __webpack_exports__["b"] = numberOfStandardDeviations;
function sum(values) {
	return values.reduce(function (acc, value) {
		return acc + value;
	}, 0);
}

function mean(values) {
	var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	if (!values) return 0;
	if (values.length === 0) return 0;

	var denominator = population ? values.length : values.length - 1;
	return sum(values) / denominator;
}

function average(values) {
	var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	return mean(values, population);
}

function variance(values) {
	var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var mean = average(values);
	var deviations = values.map(function (value) {
		return Math.pow(value - mean, 2);
	});
	return average(deviations, population);
}

function standardDeviation(values) {
	var population = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	return Math.sqrt(variance(values, population));
}

function numberOfStandardDeviations(value, values) {
	var population = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	var mean = average(values, population);
	var stdDev = standardDeviation(values, population);
	return (value - mean) / stdDev;
}

/***/ }),
/* 222 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EmailEditor_vue__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b23c1a4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EmailEditor_vue__ = __webpack_require__(298);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(232)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5b23c1a4"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EmailEditor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b23c1a4_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EmailEditor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/EmailEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5b23c1a4", Component.options)
  } else {
    hotAPI.reload("data-v-5b23c1a4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 223 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAllPublicationTypes;
/* harmony export (immutable) */ __webpack_exports__["b"] = getFacultyPublicationsByType;
/* harmony export (immutable) */ __webpack_exports__["c"] = getScholarlyActivity;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__v1_js__ = __webpack_require__(622);


function getAllPublicationTypes(meritReport) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return Object(__WEBPACK_IMPORTED_MODULE_0__v1_js__["a" /* getAllPublicationTypes */])(meritReport);
	}
}

function getFacultyPublicationsByType(meritReport) {
	var checkedOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return Object(__WEBPACK_IMPORTED_MODULE_0__v1_js__["b" /* getFacultyPublicationsByType */])(meritReport, checkedOnly);
	}
}

function getScholarlyActivity(meritReport, fullName) {
	switch (meritReport.report.version) {
		case '2016-2017':
		default:
			return Object(__WEBPACK_IMPORTED_MODULE_0__v1_js__["c" /* getScholarlyActivity */])(meritReport, fullName);
	}
}

/***/ }),
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 233 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_markdown_it__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_markdown_it___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_markdown_it__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MediumEditor_vue__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LoadingButton_vue__ = __webpack_require__(168);
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










var md = new __WEBPACK_IMPORTED_MODULE_0_markdown_it__["default"]();

// FIXME: Possible recipients with a defaultTo doesn't work

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		from: {
			type: String,
			default: 'admin'
		},
		target: {
			type: String,
			default: '/emails'
		},

		title: {
			type: String,
			default: 'Email editor'
		},

		defaultTo: {
			default: function _default() {
				return [];
			}
		},
		defaultSubject: {
			type: String,
			required: false
		},
		defaultBodyMarkdown: {
			type: String,
			required: false
		},

		possibleRecipients: {
			type: Array,
			required: false
		},
		groupRecipients: {
			type: Boolean,
			default: true
		},
		emailReplacements: {
			type: Array,
			required: false
		},
		editToOnSend: {
			type: Function,
			required: false
		},
		additionalFields: {
			type: Object,
			required: false
		}
	},
	data: function data() {
		return {
			to: this.defaultTo,
			subject: this.defaultSubject,
			body: {
				markdown: this.defaultBodyMarkdown,
				html: Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["r" /* htmlLabelReplacements */])(md.render(this.defaultBodyMarkdown), this.emailReplacements)
			},
			editorType: 'medium',

			sendingEmails: false,

			show: {
				recipients: false,
				possibleRecipients: false
			},

			alerts: []
		};
	},

	computed: {
		editorTypes: function editorTypes() {
			return ['medium', 'markdown'];
		},
		groupedPossibleRecipients: function groupedPossibleRecipients() {
			return Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["q" /* groupUsers */])(this.possibleRecipients);
		},
		toDisplayValue: function toDisplayValue() {
			if (this.possibleRecipients || Array.isArray(this.to)) return (this.to ? this.to.length : '0') + ' recipients';
			if (typeof this.to === 'string') return this.to;
			if (this.to && this.to.full_name && this.to.email) return this.to.full_name + ' <' + this.to.email + '>';
		},
		alertTypeClass: function alertTypeClass() {
			return {
				'alert-success': this.alert.type === 'success',
				'alert-info': this.alert.type === 'info',
				'alert-danger': this.alert.type === 'error'
			};
		},
		defaultBody: function defaultBody() {
			return {
				markdown: this.defaultBodyMarkdown,
				html: Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["r" /* htmlLabelReplacements */])(md.render(this.defaultBodyMarkdown), this.emailReplacements)
			};
		}
	},
	watch: {
		defaultTo: function defaultTo(_defaultTo) {
			this.to = _defaultTo;
		},
		defaultSubject: function defaultSubject(_defaultSubject) {
			this.subject = _defaultSubject;
		},
		defaultBody: function defaultBody(_defaultBody) {
			this.body = _defaultBody;
		}
	},
	methods: {
		recipientsInclude: function recipientsInclude(recipient) {
			if (Array.isArray(this.to)) {
				return this.to.includes(recipient);
			} else {
				return this.to === recipient;
			}
		},
		toggleRecipients: function toggleRecipients() {
			if (Array.isArray(this.to) && this.to.length === 0) this.to = this.possibleRecipients.slice();else this.to = [];
		},
		send: function send() {
			var _this = this;

			this.sendingEmails = true;

			var body = {
				subject: this.subject,
				body: this.body.html,
				to: this.editToOnSend ? this.editToOnSend(this.to) : this.to
			};

			if (this.additionalFields) body = Object.assign(body, this.additionalFields);

			var error = false;
			if (!body.to || Array.isArray(body.to) && body.to.length === 0) {
				this.alerts.push({
					type: 'error',
					html: 'Please select a recipient.'
				});
				error = true;
			}
			if (!body.subject) {
				this.alerts.push({
					type: 'error',
					html: 'Please enter a subject.'
				});
				error = true;
			}
			if (!body.body) {
				this.alerts.push({
					type: 'error',
					html: 'Please enter a message body.'
				});
				error = true;
			}
			if (error) return;

			fetch(this.target, {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(body)
			}).then(function (response) {
				if (response.ok) return response.json();else throw new Error('There was a problem sending the emails');
			}).then(function (response) {
				if (response.success) {
					_this.alerts.push({
						type: 'success',
						text: response.success.length + ' emails successfully sent.'
					});
					if (Array.isArray(_this.to)) _this.to = _this.to.filter(function (id) {
						return !response.success.includes(id);
					});
				}

				if (response.error && response.error.length > 0 && _this.possibleRecipients) {
					var userNames = response.error.map(function (errorRecipient) {
						var id = Number.isNaN(errorRecipient) ? errorRecipient.id : errorRecipient;
						return _this.possibleRecipients.find(function (user) {
							return user.id === Number(id);
						}).full_name;
					});
					_this.alerts.push({
						type: 'error',
						html: 'Error sending emails to the following users: <ul>\n\t\t\t\t\t\t\t' + userNames.map(function (name) {
							return '<li>' + name + '</li>';
						}).join('') + '\n\t\t\t\t\t\t</ul>'
					});
				}

				_this.sendingEmails = false;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					text: err.message,
					type: 'error'
				});
				_this.sendingEmails = false;
			});
		},

		ucfirst: __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["H" /* ucfirst */]
	},
	components: {
		AlertList: __WEBPACK_IMPORTED_MODULE_1__AlertList_vue__["a" /* default */],
		MediumEditor: __WEBPACK_IMPORTED_MODULE_2__MediumEditor_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__["a" /* default */],
		LoadingButton: __WEBPACK_IMPORTED_MODULE_4__LoadingButton_vue__["a" /* default */]
	}
});

/***/ }),
/* 234 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/markdown-it/index.js'");

/***/ }),
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
/* 285 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_MediumEditor_vue__ = __webpack_require__(287);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e89af052_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_MediumEditor_vue__ = __webpack_require__(297);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(286)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e89af052"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_MediumEditor_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e89af052_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_MediumEditor_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MediumEditor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e89af052", Component.options)
  } else {
    hotAPI.reload("data-v-e89af052", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 286 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 287 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_medium_editor__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_medium_editor___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_medium_editor__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_medium_editor_dist_css_medium_editor_css__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_medium_editor_dist_css_medium_editor_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_medium_editor_dist_css_medium_editor_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_medium_editor_dist_css_themes_bootstrap_css__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_medium_editor_dist_css_themes_bootstrap_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_medium_editor_dist_css_themes_bootstrap_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_debounce__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash_debounce__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ReplacementList_vue__ = __webpack_require__(293);
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











/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		value: {
			type: String,
			required: true
		},
		id: {
			type: String,
			required: false
		},
		replacements: {
			type: Array,
			required: false
		}
	},
	data: function data() {
		return {
			editor: null
		};
	},
	mounted: function mounted() {
		var _this = this;

		this.editor = new __WEBPACK_IMPORTED_MODULE_0_medium_editor__["default"](this.$refs.editor, {
			autoLink: true,
			toolbar: {
				buttons: ['bold', 'italic', 'underline', 'anchor', 'orderedlist', 'unorderedlist', 'removeFormat']
			},
			paste: {
				cleanPastedHTML: false
			}
		});
		this.editor.subscribe('editableInput', Object(__WEBPACK_IMPORTED_MODULE_3_lodash_debounce__["default"])(function () {
			var html = _this.editor.getContent();

			_this.$emit('input', Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["r" /* htmlLabelReplacements */])(html, _this.replacements));
		}, 500));

		this.$refs.container.querySelector('.medium-editor-element').classList.add('form-control');
	},


	watch: {
		value: function value(_value) {
			if (_value !== this.editor.getContent()) {
				this.editor.saveSelection();
				this.editor.setContent(_value);
				this.editor.restoreSelection();
			}
		}
	},

	destroyed: function destroyed() {
		this.editor.unsubscribe();
		this.editor.destroy();
	},


	components: {
		ReplacementList: __WEBPACK_IMPORTED_MODULE_4__ReplacementList_vue__["a" /* default */]
	}
});

/***/ }),
/* 288 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/medium-editor/dist/js/medium-editor.js'");

/***/ }),
/* 289 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/medium-editor/dist/css/medium-editor.css'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 290 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/medium-editor/dist/css/themes/bootstrap.css'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 291 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/lodash/debounce.js'");

/***/ }),
/* 292 */,
/* 293 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReplacementList_vue__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0409124b_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReplacementList_vue__ = __webpack_require__(296);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(294)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0409124b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ReplacementList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0409124b_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ReplacementList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/ReplacementList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0409124b", Component.options)
  } else {
    hotAPI.reload("data-v-0409124b", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 294 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 295 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(7);
//
//
//
//
//
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
		replacements: {
			type: Array,
			required: true
		}
	},
	data: function data() {
		return {
			show: {
				replacements: false
			}
		};
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__["a" /* default */]
	}
});

/***/ }),
/* 296 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "aside",
    [
      _c(
        "show-hide-button",
        {
          staticClass: "btn btn-default btn-xs",
          model: {
            value: _vm.show.replacements,
            callback: function($$v) {
              _vm.show.replacements = $$v
            },
            expression: "show.replacements"
          }
        },
        [_vm._v("\n\t\tReplacements:\n\t")]
      ),
      _vm._v(" "),
      _c(
        "ul",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.show.replacements,
              expression: "show.replacements"
            }
          ]
        },
        _vm._l(_vm.replacements, function(replacement) {
          return _c("li", [
            _vm._v("\n\t\t\t[[" + _vm._s(replacement) + "]]\n\t\t")
          ])
        })
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
    require("vue-hot-reload-api")      .rerender("data-v-0409124b", esExports)
  }
}

/***/ }),
/* 297 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { ref: "container" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("small", { staticClass: "col-md-8" }, [
        _vm._v(
          "\n\t\t\tSelect some text to show controls.\n\t\t\tCursor position gets a little wonky when a replacement is made,\n\t\t\tsorry about that.\n\t\t"
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-md-4" },
        [
          _vm.replacements
            ? _c("replacement-list", {
                attrs: { replacements: _vm.replacements }
              })
            : _vm._e()
        ],
        1
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", {
      ref: "editor",
      attrs: { id: _vm.id },
      domProps: { innerHTML: _vm._s(_vm.value) }
    })
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-e89af052", esExports)
  }
}

/***/ }),
/* 298 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "panel panel-default" }, [
    _c("div", { staticClass: "panel-heading" }, [
      _c("h3", { staticClass: "heading-title" }, [
        _vm._v("\n\t\t\t" + _vm._s(_vm.title) + "\n\t\t")
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "panel-body" }, [
      _c(
        "section",
        [
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "email-to" } }, [_vm._v("To")]),
            _vm._v(" "),
            _c("div", { staticClass: "input-group" }, [
              _c("input", {
                staticClass: "form-control appear-not-readonly",
                attrs: { type: "text", id: "email-to", readonly: "" },
                domProps: { value: _vm.toDisplayValue }
              }),
              _vm._v(" "),
              Array.isArray(_vm.to) && !_vm.possibleRecipients
                ? _c("span", { staticClass: "input-group-btn" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-default",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.show.recipients = !_vm.show.recipients
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t\t\tShow recipients\n\t\t\t\t\t\t\t"
                        ),
                        _c("span", {
                          staticClass: "glyphicon glyphicon-triangle-bottom"
                        })
                      ]
                    )
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.possibleRecipients
                ? _c(
                    "span",
                    { staticClass: "input-group-btn" },
                    [
                      _c(
                        "show-hide-button",
                        {
                          staticClass: "btn btn-default",
                          model: {
                            value: _vm.show.possibleRecipients,
                            callback: function($$v) {
                              _vm.show.possibleRecipients = $$v
                            },
                            expression: "show.possibleRecipients"
                          }
                        },
                        [_vm._v("\n\t\t\t\t\t\t\trecipients\n\t\t\t\t\t\t")]
                      )
                    ],
                    1
                  )
                : _vm._e()
            ]),
            _vm._v(" "),
            Array.isArray(_vm.to) && !_vm.possibleRecipients
              ? _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.show.recipients,
                        expression: "show.recipients"
                      }
                    ]
                  },
                  [
                    _c(
                      "ul",
                      { staticClass: "list-group" },
                      _vm._l(_vm.to, function(recipient) {
                        return _c("li", { staticClass: "list-group-item" }, [
                          _vm._v(
                            "\n\t\t\t\t\t\t\t" +
                              _vm._s(recipient.full_name || recipient) +
                              "\n\t\t\t\t\t\t"
                          )
                        ])
                      })
                    )
                  ]
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.possibleRecipients
              ? _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.show.possibleRecipients,
                        expression: "show.possibleRecipients"
                      }
                    ]
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "well row" },
                      [
                        _vm.groupRecipients
                          ? [
                              _vm._l(_vm.groupedPossibleRecipients, function(
                                possibleRecipientGroup
                              ) {
                                return [
                                  possibleRecipientGroup.children &&
                                  possibleRecipientGroup.children.length > 0
                                    ? [
                                        _c("b", [
                                          _vm._v(
                                            _vm._s(possibleRecipientGroup.text)
                                          )
                                        ]),
                                        _vm._v(" "),
                                        _c(
                                          "ul",
                                          _vm._l(
                                            possibleRecipientGroup.children,
                                            function(possibleRecipient) {
                                              return _c("li", [
                                                _c(
                                                  "label",
                                                  {
                                                    class: {
                                                      "normal-text-label": !_vm.recipientsInclude(
                                                        possibleRecipient
                                                      )
                                                    }
                                                  },
                                                  [
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value: _vm.to,
                                                          expression: "to"
                                                        }
                                                      ],
                                                      attrs: {
                                                        type: "checkbox"
                                                      },
                                                      domProps: {
                                                        value: possibleRecipient,
                                                        checked: Array.isArray(
                                                          _vm.to
                                                        )
                                                          ? _vm._i(
                                                              _vm.to,
                                                              possibleRecipient
                                                            ) > -1
                                                          : _vm.to
                                                      },
                                                      on: {
                                                        __c: function($event) {
                                                          var $$a = _vm.to,
                                                            $$el =
                                                              $event.target,
                                                            $$c = $$el.checked
                                                              ? true
                                                              : false
                                                          if (
                                                            Array.isArray($$a)
                                                          ) {
                                                            var $$v = possibleRecipient,
                                                              $$i = _vm._i(
                                                                $$a,
                                                                $$v
                                                              )
                                                            if ($$el.checked) {
                                                              $$i < 0 &&
                                                                (_vm.to = $$a.concat(
                                                                  [$$v]
                                                                ))
                                                            } else {
                                                              $$i > -1 &&
                                                                (_vm.to = $$a
                                                                  .slice(0, $$i)
                                                                  .concat(
                                                                    $$a.slice(
                                                                      $$i + 1
                                                                    )
                                                                  ))
                                                            }
                                                          } else {
                                                            _vm.to = $$c
                                                          }
                                                        }
                                                      }
                                                    }),
                                                    _vm._v(
                                                      "\n\t\t\t\t\t\t\t\t\t\t\t\t" +
                                                        _vm._s(
                                                          possibleRecipient.text ||
                                                            possibleRecipient
                                                        ) +
                                                        "\n\t\t\t\t\t\t\t\t\t\t\t"
                                                    )
                                                  ]
                                                )
                                              ])
                                            }
                                          )
                                        )
                                      ]
                                    : _vm._e()
                                ]
                              })
                            ]
                          : [
                              _c(
                                "ul",
                                _vm._l(_vm.possibleRecipients, function(
                                  possibleRecipient
                                ) {
                                  return _c("li", [
                                    _c(
                                      "label",
                                      {
                                        class: {
                                          "normal-text-label": !_vm.recipientsInclude(
                                            possibleRecipient
                                          )
                                        }
                                      },
                                      [
                                        _c("input", {
                                          directives: [
                                            {
                                              name: "model",
                                              rawName: "v-model",
                                              value: _vm.to,
                                              expression: "to"
                                            }
                                          ],
                                          attrs: { type: "checkbox" },
                                          domProps: {
                                            value: possibleRecipient,
                                            checked: Array.isArray(_vm.to)
                                              ? _vm._i(
                                                  _vm.to,
                                                  possibleRecipient
                                                ) > -1
                                              : _vm.to
                                          },
                                          on: {
                                            __c: function($event) {
                                              var $$a = _vm.to,
                                                $$el = $event.target,
                                                $$c = $$el.checked
                                                  ? true
                                                  : false
                                              if (Array.isArray($$a)) {
                                                var $$v = possibleRecipient,
                                                  $$i = _vm._i($$a, $$v)
                                                if ($$el.checked) {
                                                  $$i < 0 &&
                                                    (_vm.to = $$a.concat([$$v]))
                                                } else {
                                                  $$i > -1 &&
                                                    (_vm.to = $$a
                                                      .slice(0, $$i)
                                                      .concat(
                                                        $$a.slice($$i + 1)
                                                      ))
                                                }
                                              } else {
                                                _vm.to = $$c
                                              }
                                            }
                                          }
                                        }),
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\t\t" +
                                            _vm._s(
                                              possibleRecipient.full_name ||
                                                _vm.possible.recipient
                                            ) +
                                            "\n\t\t\t\t\t\t\t\t\t"
                                        )
                                      ]
                                    )
                                  ])
                                })
                              )
                            ],
                        _vm._v(" "),
                        _c(
                          "button",
                          {
                            staticClass: "btn btn-xs btn-default",
                            attrs: { type: "button" },
                            on: { click: _vm.toggleRecipients }
                          },
                          [_vm._v("\n\t\t\t\t\t\t\tToggle all\n\t\t\t\t\t\t")]
                        )
                      ],
                      2
                    )
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group" }, [
            _c("label", { attrs: { for: "email-subject" } }, [
              _vm._v("Subject")
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.subject,
                  expression: "subject"
                }
              ],
              staticClass: "form-control",
              attrs: { type: "text", id: "email-subject" },
              domProps: { value: _vm.subject },
              on: {
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.subject = $event.target.value
                }
              }
            })
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-group" },
            [
              _c("label", { attrs: { for: "email-body" } }, [_vm._v("Body")]),
              _vm._v(" "),
              _c("medium-editor", {
                attrs: {
                  id: "email-body",
                  replacements: _vm.emailReplacements
                },
                model: {
                  value: _vm.body.html,
                  callback: function($$v) {
                    _vm.body.html = $$v
                  },
                  expression: "body.html"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _vm.alerts && _vm.alerts.length > 0
            ? _c("alert-list", {
                model: {
                  value: _vm.alerts,
                  callback: function($$v) {
                    _vm.alerts = $$v
                  },
                  expression: "alerts"
                }
              })
            : _vm._e()
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "panel-footer text-right" },
      [
        _c(
          "loading-button",
          {
            attrs: {
              "loading-class": "btn btn-primary",
              loading: _vm.sendingEmails
            }
          },
          [
            _c(
              "button",
              {
                staticClass: "btn btn-primary",
                attrs: { type: "button" },
                on: { click: _vm.send }
              },
              [
                _c("span", { staticClass: "glyphicon glyphicon-send" }),
                _vm._v("\n\t\t\t\tSend emails\n\t\t\t")
              ]
            )
          ]
        ),
        _vm._v(" "),
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
    require("vue-hot-reload-api")      .rerender("data-v-5b23c1a4", esExports)
  }
}

/***/ }),
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
/* 415 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapButtonInput_vue__ = __webpack_require__(536);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b687e402_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapButtonInput_vue__ = __webpack_require__(537);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_BootstrapButtonInput_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b687e402_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_BootstrapButtonInput_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/BootstrapButtonInput.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b687e402", Component.options)
  } else {
    hotAPI.reload("data-v-b687e402", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 416 */,
/* 417 */,
/* 418 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StatsReport_vue__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7cfd5fbe_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StatsReport_vue__ = __webpack_require__(559);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(556)
  __webpack_require__(557)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7cfd5fbe"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_StatsReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7cfd5fbe_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_StatsReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/StatsReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7cfd5fbe", Component.options)
  } else {
    hotAPI.reload("data-v-7cfd5fbe", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 419 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_TrainingLevelSelect_vue__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_574554f1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_TrainingLevelSelect_vue__ = __webpack_require__(561);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_TrainingLevelSelect_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_574554f1_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_TrainingLevelSelect_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/TrainingLevelSelect.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-574554f1", Component.options)
  } else {
    hotAPI.reload("data-v-574554f1", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 420 */
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/lodash/round.js'");

/***/ }),
/* 421 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = generateScoresReportCsv;
/* harmony export (immutable) */ __webpack_exports__["a"] = canScoreQuestion;
/* harmony export (immutable) */ __webpack_exports__["f"] = valuesForAllOptions;
/* harmony export (immutable) */ __webpack_exports__["d"] = getResponseValues;
/* harmony export (immutable) */ __webpack_exports__["c"] = getResponseValue;
/* harmony export (immutable) */ __webpack_exports__["e"] = shouldDisregardOption;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__math_utils_js__ = __webpack_require__(221);


function generateScoresReportCsv(report, subjects, hideQuestions, scoreQuestions, customOptionValues, disregardOption) {
	var csv = [];
	var header = ['#', 'Question text'];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = subjects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var subject = _step.value;

			header.push(subject.full_name + ' - # responses');
			header.push(subject.full_name + ' - average');
			header.push(subject.full_name + ' - standard dev');
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

	header.push('Total average');

	csv.push(header);

	for (var i = 0; i < report.formContents.items.length; i++) {
		if (hideQuestions[i]) continue;

		var item = report.formContents.items[i];
		var questionCustomOptionValues = customOptionValues[i];
		var questionDisregardOption = disregardOption[i];

		var row = [];
		row.push(item.id);
		row.push(item.text);

		if (scoreQuestions[i] && canScoreQuestion(item.questionType) && valuesForAllOptions(item, questionCustomOptionValues, questionDisregardOption)) {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = subjects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var _subject = _step2.value;

					var _subjectResponses = getResponseValues(report.subjectResponses['' + _subject.id]['' + item.id], questionCustomOptionValues, questionDisregardOption);

					var subjectAverage = Object(__WEBPACK_IMPORTED_MODULE_0__math_utils_js__["a" /* average */])(_subjectResponses);
					var subjectStdDev = Object(__WEBPACK_IMPORTED_MODULE_0__math_utils_js__["c" /* standardDeviation */])(_subjectResponses);
					row.push(_subjectResponses.length);
					row.push(!Number.isNaN(subjectAverage) ? subjectAverage : '');
					row.push(!Number.isNaN(subjectStdDev) ? subjectStdDev : '');
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

			row.push(Object(__WEBPACK_IMPORTED_MODULE_0__math_utils_js__["a" /* average */])(getResponseValues(report.averageResponses[item.id], questionCustomOptionValues, questionDisregardOption)));
		} else {
			row.push('', '', '');
		}

		csv.push(row);
	}

	return csv;
}

function canScoreQuestion(questionType) {
	return ['radio', 'number', 'radiononnumeric'].includes(questionType);
}

function valuesForAllOptions(question, customOptionValues, disregardOption) {
	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = question.options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var option = _step3.value;

			if (getResponseValue(option.value, customOptionValues) == null && !shouldDisregardOption(option.value, disregardOption)) return false;
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

	return true;
}

function getResponseValues(responses, customOptionValues, disregardOption) {
	if (!responses) return [];

	var scores = [];

	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = Object.keys(responses)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var response = _step4.value;

			if (!disregardOption[response]) {
				var _value = getResponseValue(response, customOptionValues);
				var optionArr = Array(Number(responses[response])).fill(_value);
				scores = scores.concat(optionArr);
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

	return scores;
}

function getResponseValue(optionValue, customOptionValues) {
	return customOptionValues && optionValue in customOptionValues && !Number.isNaN(Number(customOptionValues['' + optionValue])) ? Number(customOptionValues['' + optionValue]) : !Number.isNaN(Number(optionValue)) ? Number(optionValue) : null;
}

function shouldDisregardOption(optionValue, disregardOption) {
	return disregardOption['' + optionValue];
}

/***/ }),
/* 422 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationListItem_vue__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fe5e41f8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationListItem_vue__ = __webpack_require__(605);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(599)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fe5e41f8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationListItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fe5e41f8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationListItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/Needs/EvaluationListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fe5e41f8", Component.options)
  } else {
    hotAPI.reload("data-v-fe5e41f8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 423 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UsersWithMeritReport_vue__ = __webpack_require__(618);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(617)
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
var __vue_scopeId__ = "data-v-a7635df8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UsersWithMeritReport_vue__["a" /* default */],
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FacultyMerit/UsersWithMeritReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a7635df8", Component.options)
  } else {
    hotAPI.reload("data-v-a7635df8", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
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
/* 519 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createReports"] = createReports;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_vue_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_Reports_Reports_vue__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__vue_components_Reports_TraineeReport_vue__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__vue_components_Reports_FacultyReport_vue__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__vue_components_Reports_FormReport_vue__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__vue_components_Reports_Needs_Report_vue__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__vue_components_Reports_PendingEvalsReport_vue__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__vue_components_Reports_FacultyMeritReport_vue__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__vue_components_Reports_FacultyMerit_Publications_vue__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__vue_components_Reports_FacultyMerit_ScholarlyActivity_vue__ = __webpack_require__(625);














__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]);

function createReports(el) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
		el: el,
		router: new __WEBPACK_IMPORTED_MODULE_1_vue_router__["default"]({
			routes: [{
				path: '/trainee',
				component: __WEBPACK_IMPORTED_MODULE_3__vue_components_Reports_TraineeReport_vue__["a" /* default */]
			}, {
				path: '/faculty',
				component: __WEBPACK_IMPORTED_MODULE_4__vue_components_Reports_FacultyReport_vue__["a" /* default */]
			}, {
				path: '/form',
				component: __WEBPACK_IMPORTED_MODULE_5__vue_components_Reports_FormReport_vue__["a" /* default */]
			}, {
				path: '/needs-evaluations',
				component: __WEBPACK_IMPORTED_MODULE_6__vue_components_Reports_Needs_Report_vue__["a" /* default */]
			}, {
				path: '/pending-requests',
				component: __WEBPACK_IMPORTED_MODULE_7__vue_components_Reports_PendingEvalsReport_vue__["a" /* default */]
			}, {
				path: '/faculty-merit',
				component: __WEBPACK_IMPORTED_MODULE_8__vue_components_Reports_FacultyMeritReport_vue__["a" /* default */],
				props: {
					reportTypes: ['publications', 'scholarly-activity']
				},
				children: [{
					path: 'publications',
					component: __WEBPACK_IMPORTED_MODULE_9__vue_components_Reports_FacultyMerit_Publications_vue__["a" /* default */]
				}, {
					path: 'scholarly-activity',
					component: __WEBPACK_IMPORTED_MODULE_10__vue_components_Reports_FacultyMerit_ScholarlyActivity_vue__["a" /* default */]
				}]
			}]
		}),
		render: function render(h) {
			return h(__WEBPACK_IMPORTED_MODULE_2__vue_components_Reports_Reports_vue__["a" /* default */]);
		}
	});
}

/***/ }),
/* 520 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Reports_vue__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_29d12b6c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Reports_vue__ = __webpack_require__(523);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(521)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-29d12b6c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Reports_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_29d12b6c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Reports_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/Reports.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-29d12b6c", Component.options)
  } else {
    hotAPI.reload("data-v-29d12b6c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 521 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 522 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
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
	data: function data() {
		return {
			reportType: 'trainee',
			users: []
		};
	},

	computed: {
		reportTypes: function reportTypes() {
			return ['trainee', 'faculty', 'form', 'needs-evaluations', 'pending-requests', 'faculty-merit'];
		},
		groupedUsers: function groupedUsers() {
			return Object(__WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["q" /* groupUsers */])(this.users);
		}
	},

	created: function created() {
		var _this = this;

		Object(__WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["l" /* fetchUsers */])().then(function (users) {
			_this.users = users;
		}).catch(function (err) {
			console.error(err);
		});
	},


	methods: {
		kebabCaseToWords: __WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["u" /* kebabCaseToWords */]
	}
});

/***/ }),
/* 523 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "container body-block reports-selector" }, [
        _c("fieldset", [
          _c("legend", [_vm._v("Report type")]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "form-inline" },
            _vm._l(_vm.reportTypes, function(type) {
              return _c(
                "router-link",
                {
                  key: type,
                  staticClass: "report-type-option btn btn-default",
                  attrs: { to: "/" + type, "active-class": "disabled" }
                },
                [
                  _vm._v(
                    "\n\t\t\t\t\t" +
                      _vm._s(_vm.kebabCaseToWords(type)) +
                      "\n\t\t\t\t"
                  )
                ]
              )
            })
          )
        ])
      ]),
      _vm._v(" "),
      _c("router-view", {
        attrs: { users: _vm.users, groupedUsers: _vm.groupedUsers }
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
    require("vue-hot-reload-api")      .rerender("data-v-29d12b6c", esExports)
  }
}

/***/ }),
/* 524 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_TraineeReport_vue__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26074fc7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_TraineeReport_vue__ = __webpack_require__(562);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(525)
  __webpack_require__(526)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-26074fc7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_TraineeReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_26074fc7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_TraineeReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/TraineeReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-26074fc7", Component.options)
  } else {
    hotAPI.reload("data-v-26074fc7", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 525 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 526 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 527 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AggregateReport_vue__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__IndividualReport_vue__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StartEndDate_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StatsReport_vue__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TrainingLevelSelect_vue__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__BootstrapAlert_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SelectTwo_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__SvgIcon_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		users: {
			type: Array,
			required: true
		},
		groupedUsers: {
			type: Array,
			required: true
		}
	},
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_10__modules_date_utils_js__["isoDateStringObject"])(Object(__WEBPACK_IMPORTED_MODULE_10__modules_date_utils_js__["currentQuarter"])()),
			trainingLevel: 'all',
			currentTrainingLevel: 'all',
			traineeId: null,
			filterMilestones: false,
			milestonesFilter: [],
			multipleTrainees: false,

			show: {
				inactiveUsers: false
			},

			report: null,
			subjectStats: null,
			evaluatorStats: null,

			milestones: [],
			competencies: [],

			alerts: []
		};
	},
	mounted: function mounted() {
		var _this = this;

		Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["j" /* fetchMilestones */])().then(function (milestones) {
			_this.milestones = milestones;
		}).catch(function (err) {
			console.error(err);
			_this.alerts.push({
				type: 'error',
				html: '<strong>Error:</strong> There was a problem fetching milestones'
			});
		});

		Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["e" /* fetchCompetencies */])().then(function (competencies) {
			_this.competencies = competencies;
		}).catch(function (err) {
			console.error(err);
			_this.alerts.push({
				type: 'error',
				html: '<strong>Error:</strong> There was a problem fetching competencies'
			});
		});

		$(this.$refs.currentTrainingLevelHintGlyph).popover({
			title: 'Current training level',
			content: '\n\t\t\t\t<p>\n\t\t\t\t\tSelecting a <b>current training level</b> will include only\n\t\t\t\t\tactive trainees for that level, whether they have completed\n\t\t\t\t\tevaluations or not.\n\t\t\t\t</p>\n\t\t\t\t<p>\n\t\t\t\t\tAny trainees with completed evaluations associated with the\n\t\t\t\t\t<b>evaluation training level</b> who are not currently\n\t\t\t\t\tin the selected <b>current training level</b> will be\n\t\t\t\t\texcluded.\n\t\t\t\t</p>\n\t\t\t\t<dd>\n\t\t\t\t\t<dt>Example:</dt>\n\t\t\t\t\t<dd>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tJane is currently a fellow, but she completed her\n\t\t\t\t\t\t\tresidency a month late, at the end of July.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p>\n\t\t\t\t\t\t\tWhen running reports for July for the incoming CA-3s,\n\t\t\t\t\t\t\tJane\'s July CA-3 evaluations will be excluded\n\t\t\t\t\t\t\tfrom the report by selecting a\n\t\t\t\t\t\t\t<b>current training level</b> of <i>CA-3</i>.\n\t\t\t\t\t\t</p>\n\t\t\t\t\t</dd>\n\t\t\t\t</dd>',
			html: true,
			placement: 'auto top'
		});
	},


	computed: {
		milestoneGroups: function milestoneGroups() {
			return Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["p" /* groupMilestones */])(this.milestones);
		},
		filteredUsers: function filteredUsers() {
			var _this2 = this;

			var groupedUsers = this.currentTrainingLevel === 'all' ? this.groupedUsers.filter(function (userGroup) {
				return userGroup.text.toLowerCase() !== 'faculty';
			}) : this.groupedUsers.filter(function (userGroup) {
				return userGroup.text.toLowerCase() === _this2.currentTrainingLevel.toLowerCase();
			});

			return this.show.inactiveUsers ? groupedUsers : groupedUsers.filter(function (userGroup) {
				return userGroup.text !== 'Inactive';
			});
		},
		subjects: function subjects() {
			if (this.traineeId) {
				var traineeId = Array.isArray(this.traineeId) ? this.traineeId : [this.traineeId];
				return this.users.filter(function (user) {
					return traineeId.includes(user.id.toString());
				});
			}
		}
	},
	methods: {
		isEntireMilestoneGroupSelected: function isEntireMilestoneGroupSelected(index) {
			var _this3 = this;

			var groupIds = this.milestoneGroups[index].children.map(function (child) {
				return child.id;
			});
			return groupIds.every(function (id) {
				return _this3.milestonesFilter.includes(id);
			});
		},
		toggleEntireMilestoneGroup: function toggleEntireMilestoneGroup(index) {
			var groupIds = this.milestoneGroups[index].children.map(function (child) {
				return child.id;
			});
			var newMilestones = this.milestonesFilter.filter(function (milestone) {
				return !groupIds.includes(milestone);
			});
			if (!this.isEntireMilestoneGroupSelected(index)) {
				newMilestones = newMilestones.concat(groupIds);
			}
			this.milestonesFilter = newMilestones;
		},
		runReport: function runReport() {
			var _this4 = this;

			fetch('/report/aggregate', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel,
					currentTrainingLevel: this.currentTrainingLevel,
					milestones: this.milestonesFilter
				})
			}).then(function (response) {
				if (response.ok) return response.json();
				var err = new Error(response.statusText);
				err.response = response;
				throw err;
			}).then(function (report) {
				_this4.report = Object.assign({}, _this4.report, report);
			}).catch(function (err) {
				console.error(err);
			});

			fetch('/report/stats/trainee/trainee', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign({}, this.dates, {
					trainingLevel: this.currentTrainingLevel
				}))
			}).then(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["t" /* jsonOrThrow */]).then(function (stats) {
				_this4.subjectStats = stats;
			}).catch(function (err) {
				console.error(err);
			});

			fetch('/report/stats/faculty/trainee', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(Object.assign({}, this.dates, {
					trainingLevel: this.currentTrainingLevel
				}))
			}).then(__WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["t" /* jsonOrThrow */]).then(function (stats) {
				_this4.evaluatorStats = stats;
			}).catch(function (err) {
				console.error(err);
			});
		},
		printAll: function printAll() {
			this.$refs.individualReports.map(function (individual) {
				individual.exportPdf();
			});
		}
	},
	components: {
		StartEndDate: __WEBPACK_IMPORTED_MODULE_2__StartEndDate_vue__["a" /* default */],
		AggregateReport: __WEBPACK_IMPORTED_MODULE_0__AggregateReport_vue__["a" /* default */],
		IndividualReport: __WEBPACK_IMPORTED_MODULE_1__IndividualReport_vue__["a" /* default */],
		StatsReport: __WEBPACK_IMPORTED_MODULE_3__StatsReport_vue__["a" /* default */],
		TrainingLevelSelect: __WEBPACK_IMPORTED_MODULE_4__TrainingLevelSelect_vue__["a" /* default */],
		AlertList: __WEBPACK_IMPORTED_MODULE_5__AlertList_vue__["a" /* default */],
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_6__BootstrapAlert_vue__["a" /* default */],
		SelectTwo: __WEBPACK_IMPORTED_MODULE_7__SelectTwo_vue__["a" /* default */],
		SvgIcon: __WEBPACK_IMPORTED_MODULE_8__SvgIcon_vue__["a" /* default */]
	}
});

/***/ }),
/* 528 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AggregateReport_vue__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_170d0144_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AggregateReport_vue__ = __webpack_require__(551);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(529)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-170d0144"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AggregateReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_170d0144_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AggregateReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/AggregateReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-170d0144", Component.options)
  } else {
    hotAPI.reload("data-v-170d0144", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 529 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 530 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__BootstrapButtonInput_vue__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChartjsChart_vue__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_datatable_utils_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_report_utils_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		report: {
			type: Object,
			required: true
		},
		milestones: {
			type: Array,
			required: true
		},
		competencies: {
			type: Array,
			required: true
		}
	},
	data: function data() {
		return {
			show: {
				milestones: false,
				competencies: true,
				averages: true,
				averageLevels: false,
				evaluationCounts: true,
				standardDeviations: false,
				totals: true,
				charts: true
			},
			transformations: {
				levelRatings: false
			},
			chartType: 'radar',
			chartOrientation: 'vertical'
		};
	},

	computed: {
		orderedMilestones: function orderedMilestones() {
			var _this = this;

			if (!this.report.milestones) return [];

			return this.milestones.filter(function (milestone) {
				return milestone.id in _this.report.milestones;
			});
		},
		orderedCompetencies: function orderedCompetencies() {
			var _this2 = this;

			if (!this.report.competencies) return [];

			return this.competencies.filter(function (competency) {
				return competency.id in _this2.report.competencies;
			});
		},
		colsPerItem: function colsPerItem() {
			return [this.show.averages, this.show.averageLevels, this.show.evaluationCounts, this.show.standardDeviations].filter(function (col) {
				return col;
			}).length;
		},
		nameRowspan: function nameRowspan() {
			var rowspan = 1;
			if (this.show.milestones && this.show.competencies) rowspan++;
			if (this.showSomething && this.colsPerItem > 1) rowspan++;

			return rowspan;
		},
		showSomething: function showSomething() {
			return this.show.milestones || this.show.competencies || this.show.totals;
		},
		milestoneColspan: function milestoneColspan() {
			return this.colsPerItem * Object.keys(this.report.milestones).length;
		},
		competencyColspan: function competencyColspan() {
			return this.colsPerItem * Object.keys(this.report.competencies).length;
		},
		tableThead: function tableThead() {
			var _this3 = this;

			var thead = [];
			var row = void 0;
			if (this.show.milestones && this.show.competencies) {
				row = [];
				row.push({ rowspan: this.nameRowspan, text: 'Name' });
				row.push({
					colspan: this.milestoneColspan,
					text: 'Milestones'
				});
				row.push({
					colspan: this.competencyColspan,
					text: 'Competencies'
				});
				if (this.show.totals) row.push({ colspan: 3, text: 'All' });

				thead.push(row);
			}

			if (this.showSomething && this.colsPerItem > 1) {
				row = [];
				if (this.nameRowspan === 2) row.push({ rowspan: this.nameRowspan, text: 'Name' });

				if (this.show.milestones) {
					this.orderedMilestones.map(function (milestone) {
						row.push({
							colspan: _this3.colsPerItem,
							text: milestone.title
						});
					});
				}
				if (this.show.competencies) {
					this.orderedCompetencies.map(function (competency) {
						row.push({
							colspan: _this3.colsPerItem,
							text: competency.title
						});
					});
				}
				if (this.show.totals) row.push({ colspan: 3, text: 'Total' });

				if (row.length > 0) thead.push(row);
			}

			row = [];
			if (this.nameRowspan === 1) row.push({ rowspan: this.nameRowspan, text: 'Name' });
			if (this.show.milestones) {
				this.orderedMilestones.map(function (milestone) {
					if (_this3.colsPerItem > 1) {
						if (_this3.show.averages) row.push({ text: 'Average' });
						if (_this3.show.averageLevels) row.push({ text: 'Average Level' });
						if (_this3.show.standardDeviations) row.push({ text: 'Std. Dev.' });
						if (_this3.show.evaluationCounts) row.push({ text: '#' });
					} else {
						row.push({
							colspan: _this3.colsPerItem,
							text: milestone.title
						});
					}
				});
			}
			if (this.show.competencies) {
				this.orderedCompetencies.map(function (competency) {
					if (_this3.colsPerItem > 1) {
						if (_this3.show.averages) row.push({ text: 'Average' });
						if (_this3.show.averageLevels) row.push({ text: 'Average Level' });
						if (_this3.show.standardDeviations) row.push({ text: 'Std. Dev.' });
						if (_this3.show.evaluationCounts) row.push({ text: '#' });
					} else {
						row.push({
							colspan: _this3.colsPerItem,
							text: competency.title
						});
					}
				});
			}
			if (this.show.totals) {
				row.push({ text: '# Evaluators' });
				row.push({ text: '# Evaluations' });
				row.push({ text: '# Trainee Requests' });
			}

			if (row.length > 0) thead.push(row);

			return thead;
		},
		tableConfig: function tableConfig() {
			return {
				order: [[0, 'asc']],
				stateSave: true,
				dom: 'lfprtip',
				scrollX: true,
				scrollY: '500px',
				scrollCollapse: true,
				paging: false,
				fixedColumns: true
			};
		},
		tableData: function tableData() {
			var _this4 = this;

			var data = [];

			var _loop = function _loop(subjectId) {
				var row = [];
				row.push('<a href="/profile/' + subjectId + '" target="_blank">' + _this4.report.subjects[subjectId] + '</a>');
				if (_this4.show.milestones) {
					_this4.orderedMilestones.map(function (milestone) {
						if (_this4.show.averages) row.push(_this4.report.subjectMilestone && _this4.report.subjectMilestone[subjectId] && _this4.report.subjectMilestone[subjectId][milestone.id] ? parseFloat(_this4.report.subjectMilestone[subjectId][milestone.id]).toFixed(2) : '');

						if (_this4.show.averageLevels) row.push(Object(__WEBPACK_IMPORTED_MODULE_7__modules_report_utils_js__["i" /* getAverageLevel */])(_this4.report.subjectMilestone && _this4.report.subjectMilestone[subjectId] && _this4.report.subjectMilestone[subjectId][milestone.id] ? parseFloat(_this4.report.subjectMilestone[subjectId][milestone.id]).toFixed(2) : 0));

						if (_this4.show.standardDeviations) row.push(_this4.report.subjectMilestoneDeviations && _this4.report.subjectMilestoneDeviations[subjectId] && _this4.report.subjectMilestoneDeviations[subjectId][milestone.id] ? parseFloat(_this4.report.subjectMilestoneDeviations[subjectId][milestone.id]).toFixed(2) : '');

						if (_this4.show.evaluationCounts) row.push(_this4.report.subjectMilestoneEvals && _this4.report.subjectMilestoneEvals[subjectId] && _this4.report.subjectMilestoneEvals[subjectId][milestone.id] ? parseFloat(_this4.report.subjectMilestoneEvals[subjectId][milestone.id]).toFixed() : 0);

						if (_this4.colsPerItem === 0) row.push('');
					});
				}

				if (_this4.show.competencies) {
					_this4.orderedCompetencies.map(function (competency) {
						if (_this4.show.averages) row.push(_this4.report.subjectCompetency && _this4.report.subjectCompetency[subjectId] && _this4.report.subjectCompetency[subjectId][competency.id] ? parseFloat(_this4.report.subjectCompetency[subjectId][competency.id]).toFixed(2) : '');

						if (_this4.show.averageLevels) row.push(Object(__WEBPACK_IMPORTED_MODULE_7__modules_report_utils_js__["i" /* getAverageLevel */])(_this4.report.subjectCompetency && _this4.report.subjectCompetency[subjectId] && _this4.report.subjectCompetency[subjectId][competency.id] ? parseFloat(_this4.report.subjectCompetency[subjectId][competency.id]).toFixed(2) : 0));

						if (_this4.show.standardDeviations) row.push(_this4.report.subjectCompetencyDeviations && _this4.report.subjectCompetencyDeviations[subjectId] && _this4.report.subjectCompetencyDeviations[subjectId][competency.id] ? parseFloat(_this4.report.subjectCompetencyDeviations[subjectId][competency.id]).toFixed(2) : '');

						if (_this4.show.evaluationCounts) row.push(_this4.report.subjectCompetencyEvals && _this4.report.subjectCompetencyEvals[subjectId] && _this4.report.subjectCompetencyEvals[subjectId][competency.id] ? parseFloat(_this4.report.subjectCompetencyEvals[subjectId][competency.id]).toFixed() : 0);

						if (_this4.colsPerItem === 0) row.push('');
					});
				}

				if (_this4.show.totals) {
					row.push(_this4.report.subjectEvaluators[subjectId] ? Object.keys(_this4.report.subjectEvaluators[subjectId]).length : 0);
					row.push(_this4.report.subjectEvals[subjectId] ? Object.keys(_this4.report.subjectEvals[subjectId]).length : 0);
					row.push(_this4.report.subjectRequests[subjectId] ? Object.keys(_this4.report.subjectRequests[subjectId]).length : 0);
				}

				data.push(row);
			};

			for (var subjectId in this.report.subjects) {
				_loop(subjectId);
			}

			return data;
		},
		tableExportFilename: function tableExportFilename() {
			var level = this.report.trainingLevel === 'all' ? '' : Object(__WEBPACK_IMPORTED_MODULE_6__modules_datatable_utils_js__["s" /* renderTrainingLevel */])(this.report.trainingLevel);
			var start = Object(__WEBPACK_IMPORTED_MODULE_8__modules_date_utils_js__["isoDateString"])(new Date(this.report.startDate.date));
			var end = Object(__WEBPACK_IMPORTED_MODULE_8__modules_date_utils_js__["isoDateString"])(new Date(this.report.endDate.date));
			var now = new Date().toLocaleString();
			return 'Aggregate Report ' + level + ', ' + start + ' - ' + end + ', exported ' + now;
		},
		chartTypes: function chartTypes() {
			return ['radar', 'line', 'bar'];
		},
		chartWidth: function chartWidth() {
			return {
				'col-md-6': this.chartOrientation === 'horizontal',
				'col-md-12': this.chartOrientation === 'vertical'
			};
		},
		chartOptions: function chartOptions() {
			return {
				legend: {
					labels: {
						fontSize: 18,
						fontColor: '#333'
					}
				},
				tooltips: {
					callbacks: {
						label: function label(tooltip, data) {
							var value = parseFloat(tooltip.yLabel).toFixed(2);
							var name = data.datasets[tooltip.datasetIndex].label;
							return name + ': ' + value;
						}
					}
				}
			};
		},
		competencyChartData: function competencyChartData() {
			var color = Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(__WEBPACK_IMPORTED_MODULE_4__modules_constants_js__["b" /* CHART_COLORS */].AVERAGE);
			var backgroundColor = color.alpha(0.2);
			return {
				labels: Object.values(this.report.competencies),
				datasets: [{
					label: 'Average Competencies',
					backgroundColor: backgroundColor.rgb().string(),
					borderColor: color.rgb().string(),
					pointBackgroundColor: color.rgb().string(),
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: color.rgb().string(),
					data: Object.values(this.report.averageCompetency)
				}]
			};
		},
		milestoneChartData: function milestoneChartData() {
			var color = Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(__WEBPACK_IMPORTED_MODULE_4__modules_constants_js__["b" /* CHART_COLORS */].AVERAGE);
			var backgroundColor = color.alpha(0.2);
			return {
				labels: Object.values(this.report.milestones),
				datasets: [{
					label: 'Average Milestones',
					backgroundColor: backgroundColor.rgb().string(),
					borderColor: color.rgb().string(),
					pointBackgroundColor: color.rgb().string(),
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: color.rgb().string(),
					data: Object.values(this.report.averageMilestone)
				}]
			};
		}
	},
	methods: {
		camelCaseToWords: __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["b" /* camelCaseToWords */],
		ucfirst: __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["H" /* ucfirst */]
	},
	components: {
		BootstrapButtonInput: __WEBPACK_IMPORTED_MODULE_1__BootstrapButtonInput_vue__["a" /* default */],
		ChartjsChart: __WEBPACK_IMPORTED_MODULE_2__ChartjsChart_vue__["a" /* default */],
		DataTable: __WEBPACK_IMPORTED_MODULE_3__DataTable_vue__["a" /* default */]
	}
});

/***/ }),
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */
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

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		type: {
			type: String,
			default: 'radio',
			validator: function validator(value) {
				return ['radio', 'checkbox'].includes(value);
			}
		},
		option: {
			type: String,
			required: true
		},
		value: {
			required: true
		}
	}
});

/***/ }),
/* 537 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "label",
    {
      staticClass: "btn btn-info",
      class: { active: _vm.value === _vm.option },
      on: {
        click: function($event) {
          _vm.$emit("input", _vm.option)
        }
      }
    },
    [
      _c("input", {
        attrs: { type: _vm.type },
        domProps: { value: _vm.option }
      }),
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
    require("vue-hot-reload-api")      .rerender("data-v-b687e402", esExports)
  }
}

/***/ }),
/* 538 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chart_js__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_resize_detector__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_resize_detector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_resize_detector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__ = __webpack_require__(52);
//
//
//
//






var erd = Object(__WEBPACK_IMPORTED_MODULE_1_element_resize_detector__["default"])({
	strategy: 'scroll'
});

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		id: {
			type: String,
			required: false
		},
		width: {
			required: false
		},
		height: {
			required: false
		},
		type: {
			type: String,
			required: true,
			validator: function validator(value) {
				return __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__["c" /* CHART_TYPES */].includes(value);
			}
		},
		data: {
			type: Object,
			required: true
		},
		options: {
			type: Object,
			required: false,
			default: function _default() {
				return {
					legend: {
						labels: {
							fontSize: 18,
							fontColor: '#333'
						}
					},
					tooltips: {
						callbacks: {
							label: function label(tooltip, data) {
								var value = parseFloat(tooltip.yLabel).toFixed(2);
								var name = data.datasets[tooltip.datasetIndex].label;
								return name + ': ' + value;
							}
						}
					}
				};
			}
		}
	},
	data: function data() {
		return {
			chart: null
		};
	},
	mounted: function mounted() {
		var _this = this;

		this.createChart();
		var parent = this.$refs.canvas.parentElement;
		erd.listenTo(parent, function () {
			if (_this.chart) _this.chart.resize();
		});
	},

	watch: {
		data: function data(_data) {
			this.chart.data.labels = _data.labels;
			this.chart.data.datasets = _data.datasets;
			this.chart.update();
		},
		options: function options() {
			this.chart.destroy();
			this.createChart();
		},
		type: function type() {
			this.chart.destroy();
			this.createChart();
		}
	},
	updated: function updated() {
		this.chart.update();
	},
	destroyed: function destroyed() {
		this.chart.destroy();
	},

	methods: {
		createChart: function createChart() {
			var ctx = this.$refs.canvas.getContext('2d');
			this.chart = new __WEBPACK_IMPORTED_MODULE_0_chart_js__["default"](ctx, {
				type: this.type,
				data: this.data,
				options: this.options
			});
		}
	}
});

/***/ }),
/* 539 */
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/element-resize-detector/src/element-resize-detector.js'");

/***/ }),
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
/* 550 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("canvas", {
    ref: "canvas",
    attrs: { id: _vm.id, width: _vm.width, height: _vm.height }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-38d7668c", esExports)
  }
}

/***/ }),
/* 551 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container body-block" },
    [
      _c("h3", [_vm._v("Aggregate")]),
      _vm._v(" "),
      _c("fieldset", { staticClass: "show-container" }, [
        _c("legend", [_vm._v("Show")]),
        _vm._v(" "),
        _c(
          "div",
          _vm._l(_vm.show, function(part, name) {
            return _c("label", [
              _c("input", {
                directives: [
                  {
                    name: "model",
                    rawName: "v-model",
                    value: _vm.show[name],
                    expression: "show[name]"
                  }
                ],
                attrs: { type: "checkbox" },
                domProps: {
                  checked: Array.isArray(_vm.show[name])
                    ? _vm._i(_vm.show[name], null) > -1
                    : _vm.show[name]
                },
                on: {
                  __c: function($event) {
                    var $$a = _vm.show[name],
                      $$el = $event.target,
                      $$c = $$el.checked ? true : false
                    if (Array.isArray($$a)) {
                      var $$v = null,
                        $$i = _vm._i($$a, $$v)
                      if ($$el.checked) {
                        $$i < 0 && (_vm.show[name] = $$a.concat([$$v]))
                      } else {
                        $$i > -1 &&
                          (_vm.show[name] = $$a
                            .slice(0, $$i)
                            .concat($$a.slice($$i + 1)))
                      }
                    } else {
                      _vm.$set(_vm.show, name, $$c)
                    }
                  }
                }
              }),
              _vm._v(
                "\n\t\t\t\t" + _vm._s(_vm.camelCaseToWords(name)) + "\n\t\t\t"
              )
            ])
          })
        )
      ]),
      _vm._v(" "),
      _c("data-table", {
        attrs: {
          id: "aggregate-table",
          bordered: true,
          thead: _vm.tableThead,
          data: _vm.tableData,
          config: _vm.tableConfig,
          exportable: true,
          exportFilename: _vm.tableExportFilename
        }
      }),
      _vm._v(" "),
      _vm.show.charts
        ? _c("div", { staticClass: "graphs-container" }, [
            _c("div", { staticClass: "row" }, [
              _vm.show.competencies
                ? _c(
                    "div",
                    { class: _vm.chartWidth },
                    [
                      _c("chartjs-chart", {
                        attrs: {
                          id: "aggregate-competency-chart",
                          type: _vm.chartType,
                          options: _vm.chartOptions,
                          data: _vm.competencyChartData
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.show.milestones
                ? _c(
                    "div",
                    { class: _vm.chartWidth },
                    [
                      _c("chartjs-chart", {
                        attrs: {
                          id: "aggregate-milestone-chart",
                          type: _vm.chartType,
                          options: _vm.chartOptions,
                          data: _vm.milestoneChartData
                        }
                      })
                    ],
                    1
                  )
                : _vm._e()
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "row chart-options" }, [
              _c("div", { staticClass: "col-sm-offset-5 col-sm-2" }, [
                _c("div", { staticClass: "panel panel-default" }, [
                  _vm._m(0),
                  _vm._v(" "),
                  _c("div", { staticClass: "panel-body" }, [
                    _vm.show.milestones && _vm.show.competencies
                      ? _c("fieldset", [
                          _c("legend", [_vm._v("Orientation")]),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "btn-group btn-group-justified",
                              attrs: { "data-toggle": "buttons" }
                            },
                            [
                              _c(
                                "bootstrap-button-input",
                                {
                                  attrs: {
                                    type: "radio",
                                    option: "horizontal"
                                  },
                                  model: {
                                    value: _vm.chartOrientation,
                                    callback: function($$v) {
                                      _vm.chartOrientation = $$v
                                    },
                                    expression: "chartOrientation"
                                  }
                                },
                                [
                                  _c("span", {
                                    staticClass:
                                      "glyphicon glyphicon-option-horizontal"
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "bootstrap-button-input",
                                {
                                  attrs: { type: "radio", option: "vertical" },
                                  model: {
                                    value: _vm.chartOrientation,
                                    callback: function($$v) {
                                      _vm.chartOrientation = $$v
                                    },
                                    expression: "chartOrientation"
                                  }
                                },
                                [
                                  _c("span", {
                                    staticClass:
                                      "glyphicon glyphicon-option-vertical"
                                  })
                                ]
                              )
                            ],
                            1
                          )
                        ])
                      : _vm._e(),
                    _vm._v(" "),
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { staticClass: "containing-label" }, [
                        _vm._v("\n\t\t\t\t\t\t\t\tType\n\t\t\t\t\t\t\t\t"),
                        _c(
                          "select",
                          {
                            directives: [
                              {
                                name: "model",
                                rawName: "v-model",
                                value: _vm.chartType,
                                expression: "chartType"
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
                                _vm.chartType = $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              }
                            }
                          },
                          _vm._l(_vm.chartTypes, function(type) {
                            return _c("option", { domProps: { value: type } }, [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\t\t" +
                                  _vm._s(_vm.ucfirst(type)) +
                                  "\n\t\t\t\t\t\t\t\t\t"
                              )
                            ])
                          })
                        )
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        : _vm._e()
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "panel-heading" }, [
      _c("span", { staticClass: "panel-title" }, [_vm._v("Chart options")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-170d0144", esExports)
  }
}

/***/ }),
/* 552 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_IndividualReport_vue__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_405f959c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_IndividualReport_vue__ = __webpack_require__(555);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(553)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-405f959c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_IndividualReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_405f959c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_IndividualReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/IndividualReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-405f959c", Component.options)
  } else {
    hotAPI.reload("data-v-405f959c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 553 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 554 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_downloadjs__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_downloadjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_downloadjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BootstrapAlert_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BootstrapButtonInput_vue__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ChartjsChart_vue__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__SvgIcon_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_datatable_utils_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__ = __webpack_require__(38);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		subject: {
			type: Object,
			required: true
		},
		report: {
			type: Object,
			required: true
		}
	},
	data: function data() {
		return {
			show: {
				milestones: true,
				competencies: true,
				standardDeviations: false,
				charts: true
			},
			chartType: 'radar',
			chartOrientation: 'vertical',

			alerts: []
		};
	},

	computed: {
		subjectId: function subjectId() {
			return this.subject.id;
		},
		trainingLevelDisplay: function trainingLevelDisplay() {
			if (this.report.trainingLevel === 'all') return;

			return Object(__WEBPACK_IMPORTED_MODULE_10__modules_datatable_utils_js__["s" /* renderTrainingLevel */])(this.report.trainingLevel);
		},
		valueMap: function valueMap() {
			if (this.report.trainingLevel === 'fellow') return __WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["e" /* FELLOWSHIP_VALUE_MAPS */].get(this.subject.secondary_training_level) || __WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["e" /* FELLOWSHIP_VALUE_MAPS */].get(null);

			return __WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["h" /* RESIDENT_VALUE_MAP */];
		},
		milestoneCompetencyWidth: function milestoneCompetencyWidth() {
			return {
				'col-md-6': this.show.milestones && this.show.competencies,
				'col-md-12': !this.show.milestones || !this.show.competencies
			};
		},
		evaluationsThead: function evaluationsThead() {
			return [['#', 'Evaluation date', 'Evaluator', 'Evaluation form']];
		},
		evaluationsConfig: function evaluationsConfig() {
			return {
				columns: [{ render: __WEBPACK_IMPORTED_MODULE_10__modules_datatable_utils_js__["n" /* renderIdToEvalUrl */] }, null, null, null]
			};
		},
		evaluationsData: function evaluationsData() {
			try {
				return this.report.subjectEvaluations[this.subjectId].map(function (request) {
					return [String(request.evaluation_id), Object(__WEBPACK_IMPORTED_MODULE_10__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')(request), request.evaluator_last + ', ' + request.evaluator_first, request.form_title];
				});
			} catch (err) {
				return [];
			}
		},
		competenciesThead: function competenciesThead() {
			var tr = ['Competency', 'Average'];
			if (this.show.standardDeviations) tr.push('Standard Deviation');
			tr.push('Number of Evaluations');

			return [tr];
		},
		competenciesData: function competenciesData() {
			var data = [];
			for (var competencyId in this.report.subjectCompetency[this.subjectId]) {
				var tr = [String(this.report.competencies[competencyId])];
				if (this.report.subjectCompetency[this.subjectId][competencyId]) {
					tr.push(String(Math.round10(this.report.subjectCompetency[this.subjectId][competencyId], -2)));
					if (this.show.standardDeviations) tr.push(String(Math.round10(this.report.subjectCompetencyDeviations[this.subjectId][competencyId], -2)));
				} else {
					tr.push('');
					if (this.show.standardDeviations) tr.push('');
				}
				tr.push(String(this.report.subjectCompetencyEvals[this.subjectId][competencyId] || 0));
				data.push(tr);
			}

			return data;
		},
		milestonesThead: function milestonesThead() {
			var tr = ['Milestone', 'Average'];

			if (this.show.standardDeviations) tr.push('Standard Deviation');
			tr.push('Number of Evaluations');

			return [tr];
		},
		milestonesData: function milestonesData() {
			var data = [];
			for (var milestoneId in this.report.subjectMilestone[this.subjectId]) {
				var tr = [String(this.report.milestones[milestoneId])];
				if (this.report.subjectMilestone[this.subjectId][milestoneId]) {
					tr.push(String(Math.round10(this.report.subjectMilestone[this.subjectId][milestoneId], -2)));
					if (this.show.standardDeviations) tr.push(String(Math.round10(this.report.subjectMilestoneDeviations[this.subjectId][milestoneId], -2)));
				} else {
					tr.push('');
					if (this.show.standardDeviations) tr.push('');
				}

				tr.push(String(this.report.subjectMilestoneEvals[this.subjectId][milestoneId] || 0));

				data.push(tr);
			}

			return data;
		},
		commentsConfig: function commentsConfig() {
			return {
				columns: [{ render: __WEBPACK_IMPORTED_MODULE_10__modules_datatable_utils_js__["n" /* renderIdToEvalUrl */] }, null, null, null, null]
			};
		},
		commentsThead: function commentsThead() {
			return [['#', 'Evaluation Date', 'Evaluator', 'Evaluation Form', 'Comment']];
		},
		commentsData: function commentsData() {
			try {
				return this.report.subjectTextResponses[this.subjectId].map(function (response) {
					return [String(response.evaluation_id), Object(__WEBPACK_IMPORTED_MODULE_10__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')(response), response.last_name + ', ' + response.first_name, response.form_title, response.response];
				});
			} catch (err) {
				return [];
			}
		},
		chartTypes: function chartTypes() {
			return ['radar', 'line', 'bar'];
		},
		chartWidth: function chartWidth() {
			return {
				'col-md-6': this.chartOrientation === 'horizontal',
				'col-md-12': this.chartOrientation === 'vertical'
			};
		},
		chartOptions: function chartOptions() {
			return {
				animation: false,
				legend: {
					labels: {
						fontSize: 18,
						fontColor: '#333'
					}
				},
				tooltips: {
					callbacks: {
						label: function label(tooltip, data) {
							var value = parseFloat(tooltip.yLabel).toFixed(2);
							var name = data.datasets[tooltip.datasetIndex].label;
							return name + ': ' + value;
						}
					}
				},
				scale: {
					ticks: {
						beginAtZero: true,
						userCallback: Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["d" /* createRadarScaleCallback */])(this.valueMap)
					}
				}
			};
		},
		competencyChartData: function competencyChartData() {
			var averageColor = Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(__WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["b" /* CHART_COLORS */].AVERAGE);
			var averageBackgroundColor = averageColor.alpha(0.2);

			var subjectColor = Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(__WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["b" /* CHART_COLORS */].SUBJECT);
			var subjectBackgroundColor = subjectColor.alpha(0.2);
			try {
				return {
					labels: Object.values(this.report.competencies),
					datasets: [{
						label: 'Average Competency',
						backgroundColor: averageBackgroundColor.rgb().string(),
						borderColor: averageColor.rgb().string(),
						pointBackgroundColor: averageColor.rgb().string(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: averageColor.rgb().string(),
						data: Object.values(this.report.averageCompetency)
					}, {
						label: 'Subject Competency',
						backgroundColor: subjectBackgroundColor.rgb().string(),
						borderColor: subjectColor.rgb().string(),
						pointBackgroundColor: subjectColor.rgb().string(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: subjectColor.rgb().string(),
						data: Object.values(this.report.subjectCompetency[this.subjectId])
					}]
				};
			} catch (err) {
				return null;
			}
		},
		milestoneChartData: function milestoneChartData() {
			var averageColor = Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(__WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["b" /* CHART_COLORS */].AVERAGE);
			var averageBackgroundColor = averageColor.alpha(0.2);

			var subjectColor = Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(__WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["b" /* CHART_COLORS */].SUBJECT);
			var subjectBackgroundColor = subjectColor.alpha(0.2);
			try {
				return {
					labels: Object.values(this.report.milestones),
					datasets: [{
						label: 'Average Milestone',
						backgroundColor: averageBackgroundColor.rgb().string(),
						borderColor: averageColor.rgb().string(),
						pointBackgroundColor: averageColor.rgb().string(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: averageColor.rgb().string(),
						data: Object.values(this.report.averageMilestone)
					}, {
						label: 'Subject Milestone',
						backgroundColor: subjectBackgroundColor.rgb().string(),
						borderColor: subjectColor.rgb().string(),
						pointBackgroundColor: subjectColor.rgb().string(),
						pointBorderColor: '#fff',
						pointHoverBackgroundColor: '#fff',
						pointHoverBorderColor: subjectColor.rgb().string(),
						data: Object.values(this.report.subjectMilestone[this.subjectId])
					}]
				};
			} catch (err) {
				return null;
			}
		}
	},
	methods: {
		camelCaseToWords: __WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["b" /* camelCaseToWords */],
		ucfirst: __WEBPACK_IMPORTED_MODULE_9__modules_utils_js__["H" /* ucfirst */],
		renderDateCell: __WEBPACK_IMPORTED_MODULE_10__modules_datatable_utils_js__["i" /* renderDateCell */],
		saveCharts: function saveCharts() {
			if (this.$refs.competencyChart && this.$refs.competencyChart.chart) Object(__WEBPACK_IMPORTED_MODULE_1_downloadjs__["default"])(this.$refs.competencyChart.chart.toBase64Image(), 'Competencies chart - ' + this.report.subjects[this.subjectId] + ' - ' + new Date().toLocaleString() + '.png');
			if (this.$refs.milestoneChart && this.$refs.milestoneChart.chart) Object(__WEBPACK_IMPORTED_MODULE_1_downloadjs__["default"])(this.$refs.milestoneChart.chart.toBase64Image(), 'Milestones chart - ' + this.report.subjects[this.subjectId] + ' - ' + new Date().toLocaleString() + '.png');
		},
		exportPdf: function exportPdf() {
			var _this = this;

			if (!this.report.subjectEvaluations[this.subjectId]) return;

			Promise.all([__webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 401)), __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, 402))]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2),
				    pdfmake = _ref2[0],
				    vfs = _ref2[1];

				pdfmake.vfs = vfs;

				var filename = _this.report.subjects[_this.subjectId] + ' - ' + new Date().toLocaleString(); // FIXME

				var content = [{ text: 'Report parameters', style: 'heading' }, Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["c" /* borderedStripedTable */])({
					table: Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["h" /* fullWidthTable */])({
						headerRows: 1,
						body: [['Name', 'Training level', 'Start date', 'End date'].map(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["l" /* tableHeader */]), [_this.report.subjects[_this.subjectId], _this.report.trainingLevel, _this.report.startDate.date ? _this.report.startDate.date.split(' ')[0] : _this.report.startDate, _this.report.endDate.date ? _this.report.endDate.date.split(' ')[0] : _this.report.endDate]]
					})
				}), { text: 'Evaluations included in report', style: 'heading' }, Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["c" /* borderedStripedTable */])({
					table: {
						headerRows: 1,
						widths: ['auto', 'auto', 'auto', '*'],
						body: JSON.parse(JSON.stringify([_this.evaluationsThead[0].map(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.evaluationsData))))
					}
				})];

				if (_this.show.competencies || _this.show.milestones) content.push({ text: 'Score mapping', style: 'heading' }, Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["e" /* createResponseLegend */])(_this.valueMap));

				if (_this.show.competencies) content.push({ text: 'Competencies', style: 'heading' }, Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["c" /* borderedStripedTable */])({
					table: {
						headerRows: 1,
						widths: ['*', 'auto', 'auto'],
						body: JSON.parse(JSON.stringify([_this.competenciesThead[0].map(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.competenciesData))))
					}
				}));

				if (_this.show.milestones) content.push({ text: 'Milestones', style: 'heading' }, Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["c" /* borderedStripedTable */])({
					table: {
						headerRows: 1,
						widths: ['*', 'auto', 'auto'],
						body: JSON.parse(JSON.stringify([_this.milestonesThead[0].map(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.milestonesData))))
					}
				}));

				var charts = [];
				if (_this.show.charts) {
					if (_this.chartOrientation === 'horizontal') {
						var cols = [];
						if (_this.show.competencies && _this.$refs.competencyChart && _this.$refs.competencyChart.chart) cols.push({
							image: _this.$refs.competencyChart.chart.toBase64Image(),
							width: 200
						});else cols.push({ text: '', width: '*' });

						if (_this.show.milestones && _this.$refs.milestoneChart && _this.$refs.milestoneChart.chart) cols.push({
							image: _this.$refs.milestoneChart.chart.toBase64Image(),
							width: 200
						});else cols.push({ text: '', width: '*' });

						charts = [{
							pageBreak: 'before',
							columns: cols,
							columnGap: 10
						}];
					} else {
						charts = [];
						if (_this.show.competencies && _this.$refs.competencyChart && _this.$refs.competencyChart.chart) charts.push({
							pageBreak: 'before',
							image: _this.$refs.competencyChart.chart.toBase64Image(),
							width: 500
						});

						if (_this.show.milestones && _this.$refs.milestoneChart && _this.$refs.milestoneChart.chart) charts.push({
							image: _this.$refs.milestoneChart.chart.toBase64Image(),
							width: 500,
							pageBreak: 'after'
						});
					}
					content.push.apply(content, _toConsumableArray(charts));
				}

				content.push({ text: 'Comments', style: 'heading' }, Object(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["c" /* borderedStripedTable */])({
					table: {
						headerRows: 1,
						widths: ['auto', 'auto', 'auto', 'auto', '*'],
						body: JSON.parse(JSON.stringify([_this.commentsThead[0].map(__WEBPACK_IMPORTED_MODULE_11__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.commentsData))))
					}
				}));

				var docDefinition = {
					pageSize: 'LETTER',
					content: content,
					styles: {
						heading: {
							bold: true,
							fontSize: 20,
							margin: [0, 20, 0, 10]
						},
						tableHeader: {
							bold: true,
							fontSize: 14
						}
					}
				};

				pdfmake.createPdf(docDefinition).download(filename);
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error: </strong> There was a problem exporting the report for ' + _this.report.subjects[_this.subjectId]
				});
			});
		}
	},

	components: {
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_2__BootstrapAlert_vue__["a" /* default */],
		AlertList: __WEBPACK_IMPORTED_MODULE_3__AlertList_vue__["a" /* default */],
		BootstrapButtonInput: __WEBPACK_IMPORTED_MODULE_4__BootstrapButtonInput_vue__["a" /* default */],
		ChartjsChart: __WEBPACK_IMPORTED_MODULE_5__ChartjsChart_vue__["a" /* default */],
		DataTable: __WEBPACK_IMPORTED_MODULE_6__DataTable_vue__["a" /* default */],
		SvgIcon: __WEBPACK_IMPORTED_MODULE_7__SvgIcon_vue__["a" /* default */]
	}
});

/***/ }),
/* 555 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "individual-report container body-block" },
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
      _vm.report.subjectEvaluations[_vm.subjectId] &&
      _vm.report.subjectEvaluations[_vm.subjectId].length > 0
        ? [
            _c("h2", [
              _vm._v("\n\t\t\tIndividual Report\n\t\t\t"),
              _c("small", [
                _vm._v(
                  "\n\t\t\t\t" +
                    _vm._s(_vm.report.subjects[_vm.subjectId]) +
                    "\n\t\t\t"
                )
              ])
            ]),
            _vm._v(" "),
            _c(
              "section",
              [
                _c("h3", [_vm._v("Evaluations included in report")]),
                _vm._v(" "),
                _c("data-table", {
                  attrs: {
                    bordered: true,
                    thead: _vm.evaluationsThead,
                    config: _vm.evaluationsConfig,
                    data: _vm.evaluationsData
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "text-center" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "button" },
                      on: { click: _vm.exportPdf }
                    },
                    [
                      _vm._v("\n\t\t\t\t\t\tExport PDF\n\t\t\t\t\t\t"),
                      _c("svg-icon", { attrs: { src: "/img/icons/pdf.svg" } })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default",
                      attrs: { type: "button" },
                      on: { click: _vm.saveCharts }
                    },
                    [_vm._v("\n\t\t\t\t\t\tSave chart images\n\t\t\t\t\t")]
                  )
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c("section", [
              _c(
                "fieldset",
                { staticClass: "show-container" },
                [
                  _c("legend", [_vm._v("Show")]),
                  _vm._v(" "),
                  _vm._l(_vm.show, function(part, name) {
                    return _c("label", [
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.show[name],
                            expression: "show[name]"
                          }
                        ],
                        attrs: { type: "checkbox" },
                        domProps: {
                          checked: Array.isArray(_vm.show[name])
                            ? _vm._i(_vm.show[name], null) > -1
                            : _vm.show[name]
                        },
                        on: {
                          __c: function($event) {
                            var $$a = _vm.show[name],
                              $$el = $event.target,
                              $$c = $$el.checked ? true : false
                            if (Array.isArray($$a)) {
                              var $$v = null,
                                $$i = _vm._i($$a, $$v)
                              if ($$el.checked) {
                                $$i < 0 && (_vm.show[name] = $$a.concat([$$v]))
                              } else {
                                $$i > -1 &&
                                  (_vm.show[name] = $$a
                                    .slice(0, $$i)
                                    .concat($$a.slice($$i + 1)))
                              }
                            } else {
                              _vm.$set(_vm.show, name, $$c)
                            }
                          }
                        }
                      }),
                      _vm._v(
                        "\n\t\t\t\t\t" +
                          _vm._s(_vm.camelCaseToWords(name)) +
                          "\n\t\t\t\t"
                      )
                    ])
                  })
                ],
                2
              ),
              _vm._v(" "),
              _c("div", { staticClass: "row" }, [
                _vm.show.competencies
                  ? _c(
                      "div",
                      { class: _vm.milestoneCompetencyWidth },
                      [
                        _c("h4", [_vm._v("Competencies")]),
                        _vm._v(" "),
                        _c("data-table", {
                          attrs: {
                            bordered: true,
                            thead: _vm.competenciesThead,
                            data: _vm.competenciesData
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e(),
                _vm._v(" "),
                _vm.show.milestones
                  ? _c(
                      "div",
                      { class: _vm.milestoneCompetencyWidth },
                      [
                        _c("h4", [_vm._v("Milestones")]),
                        _vm._v(" "),
                        _c("data-table", {
                          attrs: {
                            bordered: true,
                            thead: _vm.milestonesThead,
                            data: _vm.milestonesData
                          }
                        })
                      ],
                      1
                    )
                  : _vm._e()
              ])
            ]),
            _vm._v(" "),
            _vm.show.charts
              ? _c("section", [
                  _c("div", { staticClass: "row charts" }, [
                    _vm.show.competencies
                      ? _c(
                          "div",
                          { class: _vm.chartWidth },
                          [
                            _vm.competencyChartData
                              ? _c("chartjs-chart", {
                                  ref: "competencyChart",
                                  attrs: {
                                    type: _vm.chartType,
                                    options: _vm.chartOptions,
                                    data: _vm.competencyChartData,
                                    shouldEmit: true
                                  }
                                })
                              : _vm._e()
                          ],
                          1
                        )
                      : _vm._e(),
                    _vm._v(" "),
                    _vm.show.milestones
                      ? _c(
                          "div",
                          { class: _vm.chartWidth },
                          [
                            _vm.milestoneChartData
                              ? _c("chartjs-chart", {
                                  ref: "milestoneChart",
                                  attrs: {
                                    type: _vm.chartType,
                                    options: _vm.chartOptions,
                                    data: _vm.milestoneChartData,
                                    shouldEmit: true
                                  }
                                })
                              : _vm._e()
                          ],
                          1
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "row chart-options" }, [
                    _c("div", { staticClass: "col-sm-offset-5 col-sm-2" }, [
                      _c("div", { staticClass: "panel panel-default" }, [
                        _vm._m(0),
                        _vm._v(" "),
                        _c("div", { staticClass: "panel-body" }, [
                          _vm.show.milestones && _vm.show.competencies
                            ? _c("fieldset", [
                                _c("legend", [_vm._v("Orientation")]),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "btn-group btn-group-justified",
                                    attrs: { "data-toggle": "buttons" }
                                  },
                                  [
                                    _c(
                                      "bootstrap-button-input",
                                      {
                                        attrs: {
                                          type: "radio",
                                          option: "horizontal"
                                        },
                                        model: {
                                          value: _vm.chartOrientation,
                                          callback: function($$v) {
                                            _vm.chartOrientation = $$v
                                          },
                                          expression: "chartOrientation"
                                        }
                                      },
                                      [
                                        _c("span", {
                                          staticClass:
                                            "glyphicon glyphicon-option-horizontal"
                                        })
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "bootstrap-button-input",
                                      {
                                        attrs: {
                                          type: "radio",
                                          option: "vertical"
                                        },
                                        model: {
                                          value: _vm.chartOrientation,
                                          callback: function($$v) {
                                            _vm.chartOrientation = $$v
                                          },
                                          expression: "chartOrientation"
                                        }
                                      },
                                      [
                                        _c("span", {
                                          staticClass:
                                            "glyphicon glyphicon-option-vertical"
                                        })
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ])
                            : _vm._e(),
                          _vm._v(" "),
                          _c("div", { staticClass: "form-group" }, [
                            _c("label", { staticClass: "containing-label" }, [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\tType\n\t\t\t\t\t\t\t\t\t"
                              ),
                              _c(
                                "select",
                                {
                                  directives: [
                                    {
                                      name: "model",
                                      rawName: "v-model",
                                      value: _vm.chartType,
                                      expression: "chartType"
                                    }
                                  ],
                                  staticClass: "form-control",
                                  on: {
                                    change: function($event) {
                                      var $$selectedVal = Array.prototype.filter
                                        .call($event.target.options, function(
                                          o
                                        ) {
                                          return o.selected
                                        })
                                        .map(function(o) {
                                          var val =
                                            "_value" in o ? o._value : o.value
                                          return val
                                        })
                                      _vm.chartType = $event.target.multiple
                                        ? $$selectedVal
                                        : $$selectedVal[0]
                                    }
                                  }
                                },
                                _vm._l(_vm.chartTypes, function(type) {
                                  return _c(
                                    "option",
                                    { domProps: { value: type } },
                                    [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t\t\t\t\t\t" +
                                          _vm._s(_vm.ucfirst(type)) +
                                          "\n\t\t\t\t\t\t\t\t\t\t"
                                      )
                                    ]
                                  )
                                })
                              )
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _c(
              "section",
              [
                _c("h3", [_vm._v("Comments")]),
                _vm._v(" "),
                _c("data-table", {
                  attrs: {
                    bordered: true,
                    thead: _vm.commentsThead,
                    config: _vm.commentsConfig,
                    data: _vm.commentsData
                  }
                }),
                _vm._v(" "),
                _c("div", { staticClass: "text-center" }, [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "button" },
                      on: { click: _vm.exportPdf }
                    },
                    [
                      _vm._v("\n\t\t\t\t\tExport PDF\n\t\t\t\t\t"),
                      _c("svg-icon", { attrs: { src: "/img/icons/pdf.svg" } })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-default",
                      attrs: { type: "button" },
                      on: { click: _vm.saveCharts }
                    },
                    [_vm._v("\n\t\t\t\t\tSave chart images\n\t\t\t\t")]
                  )
                ])
              ],
              1
            )
          ]
        : _c("bootstrap-alert", { attrs: { type: "warning" } }, [
            _vm._v("\n\t\tNo "),
            _c("strong", [_vm._v(_vm._s(_vm.trainingLevelDisplay))]),
            _vm._v(" evaluations found for\n\t\t"),
            _c("strong", [_vm._v(_vm._s(_vm.subject.full_name))]),
            _vm._v("\n\t\tbetween "),
            _c("strong", [
              _vm._v(_vm._s(_vm.renderDateCell(_vm.report.startDate.date)))
            ]),
            _vm._v("\n\t\tand "),
            _c("strong", [
              _vm._v(_vm._s(_vm.renderDateCell(_vm.report.endDate.date)))
            ]),
            _vm._v(".\n\t")
          ])
    ],
    2
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "panel-heading" }, [
      _c("span", { staticClass: "panel-title" }, [_vm._v("Chart options")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-405f959c", esExports)
  }
}

/***/ }),
/* 556 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 557 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 558 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChartjsChart_vue__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__SvgIcon_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_report_utils_js__ = __webpack_require__(38);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			default: 'Statistics'
		},
		report: {
			type: Object,
			required: true
		}
	},
	data: function data() {
		return {
			show: {
				ratios: false,
				graphs: false,
				noRequests: false,
				noneCompleted: false,
				averageCompletionTimes: false,
				lastCompleted: false
			},
			tableHeight: '500px',
			chartHeight: '625px',

			alerts: []
		};
	},

	computed: {
		availableFields: function availableFields() {
			var fields = ['ratios', 'graphs', 'noRequests', 'noneCompleted', 'lastCompleted'];

			if (this.report.statsType === 'evaluator') fields.push('averageCompletionTimes');

			return fields;
		},
		listTableConfig: function listTableConfig() {
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollX: true,
				scrollY: this.tableHeight,
				scrollCollapse: true,
				paging: false
			};
		},
		listChartContainerContainerStyle: function listChartContainerContainerStyle() {
			return {
				height: this.chartHeight
			};
		},
		listChartContainerStyle: function listChartContainerStyle() {
			return {
				width: '100%',
				height: 20 * this.report.userStats.length + 'px'
			};
		},
		listChartConfig: function listChartConfig() {
			return {
				maintainAspectRatio: false,
				legend: {
					labels: {
						fontSize: 18,
						fontColor: '#333'
					}
				},
				tooltips: {
					callbacks: {
						label: function label(tooltip) {
							var value = parseFloat(tooltip.xLabel).toFixed();
							return value + '%';
						}
					}
				}
			};
		},
		ratiosThead: function ratiosThead() {
			return [['User', 'Requested', 'Total Requests', 'Total Completed', 'Total Ratio']];
		},
		ratiosData: function ratiosData() {
			if (!this.report.userStats || this.report.userStats.length === 0) return [];

			return this.report.userStats.map(function (stat) {
				return [stat.name, stat.requested, stat.totalRequests, stat.completed, stat.ratio ? stat.ratio + '%' : ''];
			});
		},
		ratiosGraphData: function ratiosGraphData() {
			var color = Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(__WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["b" /* CHART_COLORS */].OTHER[0]);
			var backgroundColor = color.alpha(0.2);
			return {
				labels: this.report.userStats.map(function (userStat) {
					return userStat.name;
				}),
				datasets: [{
					label: 'Completed / Requested %',
					backgroundColor: backgroundColor.rgb().string(),
					borderColor: color.rgb().string(),
					borderWidth: 1,
					pointBackgroundColor: color.rgb().string(),
					pointBorderColor: '#fff',
					pointHoverBackgroundColor: '#fff',
					pointHoverBorderColor: color.rgb().string(),
					data: this.report.userStats.map(function (userStat) {
						return userStat.ratio;
					})
				}]
			};
		},
		noRequestsThead: function noRequestsThead() {
			return [['No requests']];
		},
		noRequestsData: function noRequestsData() {
			if (!this.report.noneRequested || this.report.noneRequested.length === 0) return [];

			return this.report.noneRequested.map(function (name) {
				return [name];
			});
		},
		noneCompletedThead: function noneCompletedThead() {
			return [['No completed evals']];
		},
		noneCompletedData: function noneCompletedData() {
			if (!this.report.noneCompleted || this.report.noneCompleted.length === 0) return [];

			return this.report.noneCompleted.map(function (name) {
				return [name];
			});
		},
		averageCompletionTimesThead: function averageCompletionTimesThead() {
			return [['User', 'Average Time']];
		},
		averageCompletionTimesConfig: function averageCompletionTimesConfig() {
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollY: this.tableHeight,
				scrollCollapse: true,
				paging: false,
				columns: [{ data: 'name' }, {
					data: 'time',
					render: function render(time, type, obj) {
						if (['sort', 'type'].includes(type)) return obj.timespan;

						var _time$split = time.split(', '),
						    _time$split2 = _slicedToArray(_time$split, 3),
						    days = _time$split2[0],
						    hours = _time$split2[1],
						    minutes = _time$split2[2];

						return ['<b>' + days + ',</b>', '<span>' + hours + ',</span>', '<i>' + minutes + '</i>'].join(' ');
					},
					createdCell: function createdCell(td) {
						td.classList.add('time-period-cell');
					}
				}],
				fixedHeader: true
			};
		},
		averageCompletionTimesData: function averageCompletionTimesData() {
			return this.report.averageCompletionTimes || [];
		},
		lastCompletedThead: function lastCompletedThead() {
			return [['User', 'Completed', 'Evaluation']];
		},
		lastCompletedConfig: function lastCompletedConfig() {
			return {
				order: [[0, 'asc']],
				stateSave: true,
				scrollY: this.tableHeight,
				scrollCollapse: true,
				paging: false,
				columns: [null, {
					render: __WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__["i" /* renderDateCell */],
					createdCell: __WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__["a" /* createDateCell */]
				}, {
					render: __WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__["n" /* renderIdToEvalUrl */]
				}],
				fixedHeader: true
			};
		},
		lastCompletedData: function lastCompletedData() {
			if (!this.report.lastCompleted || this.report.lastCompleted.length === 0) return [];

			return this.report.lastCompleted.map(function (obj) {
				return [obj.name, obj.evaluation.complete_date, obj.evaluation.id];
			});
		}
	},
	watch: {
		show: function show() {
			this.$nextTick(function () {
				$(window).resize();
			});
		}
	},
	methods: {
		camelCaseToWords: __WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["b" /* camelCaseToWords */],
		exportPdf: function exportPdf() {
			var _this = this;

			Promise.all([__webpack_require__.e/* import() */(0/* duplicate */).then(__webpack_require__.bind(null, 401)), __webpack_require__.e/* import() */(1/* duplicate */).then(__webpack_require__.bind(null, 402))]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2),
				    pdfmake = _ref2[0],
				    vfs = _ref2[1];

				pdfmake.vfs = vfs;

				var filename = _this.title + ' - ' + new Date().toLocaleString();

				var reportParamHeader = ['Start date', 'End date'];
				var reportParamBody = [_this.report.startDate.date ? _this.report.startDate.date.split(' ')[0] : _this.report.startDate, _this.report.endDate.date ? _this.report.endDate.date.split(' ')[0] : _this.report.endDate];

				if (_this.report.trainingLevel) {
					reportParamHeader.push('Training level');
					reportParamBody.push(Object(__WEBPACK_IMPORTED_MODULE_7__modules_datatable_utils_js__["s" /* renderTrainingLevel */])(_this.report.trainingLevel));
				}

				var content = [{ text: _this.title, style: 'title' }, {
					table: {
						headerRows: 1,
						body: [reportParamHeader.map(__WEBPACK_IMPORTED_MODULE_8__modules_report_utils_js__["l" /* tableHeader */]), reportParamBody]
					},
					style: 'table'
				}];

				if (_this.ratiosData.length > 0) content.push({
					text: 'Ratios',
					style: 'heading'
				}, {
					table: {
						headerRows: 1,
						body: JSON.parse(JSON.stringify([_this.ratiosThead[0].map(__WEBPACK_IMPORTED_MODULE_8__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.ratiosData.sort(Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["E" /* sortPropIgnoreCase */])(0))))))
					},
					style: 'table'
				});

				if (_this.noRequestsData.length > 0) content.push({
					text: 'No requests',
					style: 'heading',
					pageBreak: 'before'
				}, {
					table: {
						headerRows: 1,
						body: JSON.parse(JSON.stringify([_this.noRequestsThead[0].map(__WEBPACK_IMPORTED_MODULE_8__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.noRequestsData.sort(Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["E" /* sortPropIgnoreCase */])(0))))))
					},
					style: 'table'
				});

				if (_this.noneCompletedData.length > 0) content.push({
					text: 'None completed',
					style: 'heading',
					pageBreak: 'before'
				}, {
					table: {
						headerRows: 1,
						body: JSON.parse(JSON.stringify([_this.noneCompletedThead[0].map(__WEBPACK_IMPORTED_MODULE_8__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.noneCompletedData.sort(Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["E" /* sortPropIgnoreCase */])(0))))))
					},
					style: 'table'
				});

				if (_this.lastCompletedData.length > 0) content.push({
					text: 'Last completed evaluation',
					style: 'heading',
					pageBreak: 'before'
				}, {
					table: {
						headerRows: 1,
						body: JSON.parse(JSON.stringify([_this.lastCompletedThead[0].map(__WEBPACK_IMPORTED_MODULE_8__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.lastCompletedData.sort(Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["E" /* sortPropIgnoreCase */])(0))))))
					},
					style: 'table'
				});

				if (_this.report.statsType === 'evaluator' && _this.averageCompletionTimesData.length > 0) content.push({
					text: 'Average completion time',
					style: 'heading',
					pageBreak: 'before'
				}, {
					table: {
						headerRows: 1,
						body: JSON.parse(JSON.stringify([_this.averageCompletionTimesThead[0].map(__WEBPACK_IMPORTED_MODULE_8__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this.averageCompletionTimesData.map(function (obj) {
							return [obj.name, obj.time];
						}).sort(Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["E" /* sortPropIgnoreCase */])(0))))))
					},
					style: 'table'
				});

				// TODO: Chart, improved styling

				var docDefinition = {
					pageSize: 'LETTER',
					content: content,
					styles: {
						title: {
							bold: true,
							fontSize: 24,
							margin: [0, 20, 0, 10]
						},
						heading: {
							bold: true,
							fontSize: 20,
							margin: [0, 10, 0, 5]
						},
						tableHeader: {
							bold: true,
							fontSize: 14
						},
						table: {
							margin: [0, 20]
						}
					}
				};

				pdfmake.createPdf(docDefinition).download(filename);
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem exporting the ' + _this.title + ' PDF'
				});
			});
		}
	},
	components: {
		AlertList: __WEBPACK_IMPORTED_MODULE_1__AlertList_vue__["a" /* default */],
		ChartjsChart: __WEBPACK_IMPORTED_MODULE_2__ChartjsChart_vue__["a" /* default */],
		DataTable: __WEBPACK_IMPORTED_MODULE_3__DataTable_vue__["a" /* default */],
		SvgIcon: __WEBPACK_IMPORTED_MODULE_4__SvgIcon_vue__["a" /* default */]
	}
});

/***/ }),
/* 559 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container body-block" },
    [
      _c("h3", [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c("div", { staticClass: "controls" }, [
        _c("fieldset", { staticClass: "show-container" }, [
          _c("legend", [_vm._v("Show")]),
          _vm._v(" "),
          _c(
            "div",
            _vm._l(_vm.availableFields, function(field) {
              return _c("label", [
                _c("input", {
                  attrs: { type: "checkbox" },
                  domProps: { value: _vm.show[field] },
                  on: {
                    change: function($event) {
                      _vm.show = Object.assign(
                        {},
                        _vm.show,
                        ((_obj = {}), (_obj[field] = !_vm.show[field]), _obj)
                      )
                      var _obj
                    }
                  }
                }),
                _vm._v(
                  "\n\t\t\t\t\t" +
                    _vm._s(_vm.camelCaseToWords(field)) +
                    "\n\t\t\t\t"
                )
              ])
            })
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-md-6" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\tTable height\n\t\t\t\t\t"),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.tableHeight,
                      expression: "tableHeight"
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
                      _vm.tableHeight = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { domProps: { value: false } }, [
                    _vm._v("Full size")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "500px" } }, [_vm._v("Fixed")])
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-md-6" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\tChart height\n\t\t\t\t\t"),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.chartHeight,
                      expression: "chartHeight"
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
                      _vm.chartHeight = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { domProps: { value: false } }, [
                    _vm._v("Full size")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "625px" } }, [_vm._v("Fixed")])
                ]
              )
            ])
          ])
        ])
      ]),
      _vm._v(" "),
      _vm._t("default"),
      _vm._v(" "),
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
        "button",
        {
          staticClass: "export-button btn btn-primary center-block",
          attrs: { type: "button" },
          on: { click: _vm.exportPdf }
        },
        [
          _vm._v("\n\t\tExport PDF\n\t\t"),
          _c("svg-icon", { attrs: { src: "/img/icons/pdf.svg" } })
        ],
        1
      ),
      _vm._v(" "),
      _c("div", { staticClass: "stats-report-container" }, [
        _vm.show.ratios
          ? _c(
              "div",
              [
                _c("h3", [_vm._v("Ratios")]),
                _vm._v(" "),
                _c("data-table", {
                  attrs: {
                    bordered: "",
                    exportable: "",
                    thead: _vm.ratiosThead,
                    config: _vm.listTableConfig,
                    data: _vm.ratiosData
                  }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.show.ratios && _vm.show.graphs
          ? _c("div", [
              _c("h3", [_vm._v("Ratios")]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "list-chart-container-container",
                  style: _vm.listChartContainerContainerStyle
                },
                [
                  _c(
                    "div",
                    {
                      staticClass: "list-chart-container",
                      style: _vm.listChartContainerStyle
                    },
                    [
                      _c("chartjs-chart", {
                        attrs: {
                          type: "horizontalBar",
                          data: _vm.ratiosGraphData,
                          options: _vm.listChartConfig
                        }
                      })
                    ],
                    1
                  )
                ]
              )
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.show.noRequests
          ? _c(
              "div",
              [
                _c("h3", [_vm._v("No requests")]),
                _vm._v(" "),
                _c("data-table", {
                  attrs: {
                    bordered: "",
                    exportable: "",
                    thead: _vm.noRequestsThead,
                    config: _vm.listTableConfig,
                    data: _vm.noRequestsData
                  }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.show.noneCompleted
          ? _c(
              "div",
              [
                _c("h3", [_vm._v("None completed")]),
                _vm._v(" "),
                _c("data-table", {
                  attrs: {
                    bordered: "",
                    exportable: "",
                    thead: _vm.noneCompletedThead,
                    config: _vm.listTableConfig,
                    data: _vm.noneCompletedData
                  }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.show.averageCompletionTimes
          ? _c(
              "div",
              [
                _c("h3", [_vm._v("Average completion times")]),
                _vm._v(" "),
                _c("data-table", {
                  attrs: {
                    bordered: "",
                    exportable: "",
                    thead: _vm.averageCompletionTimesThead,
                    config: _vm.averageCompletionTimesConfig,
                    data: _vm.averageCompletionTimesData
                  }
                })
              ],
              1
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.show.lastCompleted
          ? _c(
              "div",
              [
                _c("h3", [_vm._v("Last completed evaluations")]),
                _vm._v(" "),
                _c("data-table", {
                  attrs: {
                    bordered: "",
                    exportable: "",
                    thead: _vm.lastCompletedThead,
                    config: _vm.lastCompletedConfig,
                    data: _vm.lastCompletedData
                  }
                })
              ],
              1
            )
          : _vm._e()
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
    require("vue-hot-reload-api")      .rerender("data-v-7cfd5fbe", esExports)
  }
}

/***/ }),
/* 560 */
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
		value: {
			type: String,
			required: true
		}
	}
});

/***/ }),
/* 561 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "select",
    {
      staticClass: "form-control",
      domProps: { value: _vm.value },
      on: {
        input: function($event) {
          _vm.$emit("input", $event.target.value)
        }
      }
    },
    [
      _c("option", { attrs: { value: "all" } }, [_vm._v("All")]),
      _vm._v(" "),
      _c("option", { attrs: { value: "intern" } }, [_vm._v("Intern")]),
      _vm._v(" "),
      _c("option", { attrs: { value: "ca-1" } }, [_vm._v("CA-1")]),
      _vm._v(" "),
      _c("option", { attrs: { value: "ca-2" } }, [_vm._v("CA-2")]),
      _vm._v(" "),
      _c("option", { attrs: { value: "ca-3" } }, [_vm._v("CA-3")]),
      _vm._v(" "),
      _c("option", { attrs: { value: "fellow" } }, [_vm._v("Fellow")])
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
    require("vue-hot-reload-api")      .rerender("data-v-574554f1", esExports)
  }
}

/***/ }),
/* 562 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "container body-block" },
      [
        _c("h1", [_vm._v("Trainee report")]),
        _vm._v(" "),
        _c("start-end-date", {
          model: {
            value: _vm.dates,
            callback: function($$v) {
              _vm.dates = $$v
            },
            expression: "dates"
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "form-group col-sm-6" }, [
            _c(
              "label",
              { staticClass: "containing-label" },
              [
                _vm._v("\n\t\t\t\t\tEvaluation training level\n\t\t\t\t\t"),
                _c("training-level-select", {
                  model: {
                    value: _vm.trainingLevel,
                    callback: function($$v) {
                      _vm.trainingLevel = $$v
                    },
                    expression: "trainingLevel"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group col-sm-6" }, [
            _c(
              "label",
              { staticClass: "containing-label" },
              [
                _vm._v(
                  "\n\t\t\t\t\tTrainee current training level\n\t\t\t\t\t"
                ),
                _c("span", {
                  ref: "currentTrainingLevelHintGlyph",
                  staticClass: "glyphicon glyphicon-question-sign"
                }),
                _vm._v(" "),
                _c("training-level-select", {
                  model: {
                    value: _vm.currentTrainingLevel,
                    callback: function($$v) {
                      _vm.currentTrainingLevel = $$v
                    },
                    expression: "currentTrainingLevel"
                  }
                })
              ],
              1
            )
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "form-group" }, [
          _c("label", [
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.filterMilestones,
                  expression: "filterMilestones"
                }
              ],
              attrs: { type: "checkbox" },
              domProps: {
                checked: Array.isArray(_vm.filterMilestones)
                  ? _vm._i(_vm.filterMilestones, null) > -1
                  : _vm.filterMilestones
              },
              on: {
                __c: function($event) {
                  var $$a = _vm.filterMilestones,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false
                  if (Array.isArray($$a)) {
                    var $$v = null,
                      $$i = _vm._i($$a, $$v)
                    if ($$el.checked) {
                      $$i < 0 && (_vm.filterMilestones = $$a.concat([$$v]))
                    } else {
                      $$i > -1 &&
                        (_vm.filterMilestones = $$a
                          .slice(0, $$i)
                          .concat($$a.slice($$i + 1)))
                    }
                  } else {
                    _vm.filterMilestones = $$c
                  }
                }
              }
            }),
            _vm._v("\n\t\t\t\tFilter milestones\n\t\t\t")
          ])
        ]),
        _vm._v(" "),
        _vm.filterMilestones
          ? _c("fieldset", [
              _c("legend", [_vm._v("Milestones")]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "filter-milestones-container" },
                _vm._l(_vm.milestoneGroups, function(milestoneGroup, index) {
                  return _c("div", { staticClass: "milestone-group" }, [
                    _c("div", { staticClass: "panel panel-default" }, [
                      _c("div", { staticClass: "panel-heading" }, [
                        _c("label", { staticClass: "panel-title" }, [
                          _c("input", {
                            attrs: { type: "checkbox" },
                            domProps: {
                              checked: _vm.isEntireMilestoneGroupSelected(index)
                            },
                            on: {
                              click: function($event) {
                                _vm.toggleEntireMilestoneGroup(index)
                              }
                            }
                          }),
                          _vm._v(
                            "\n\t\t\t\t\t\t\t\t" +
                              _vm._s(milestoneGroup.text) +
                              "\n\t\t\t\t\t\t\t"
                          )
                        ])
                      ]),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "panel-body" },
                        _vm._l(milestoneGroup.children, function(child) {
                          return _c("div", { staticClass: "form-group" }, [
                            _c("label", [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.milestonesFilter,
                                    expression: "milestonesFilter"
                                  }
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  value: child.id,
                                  checked: Array.isArray(_vm.milestonesFilter)
                                    ? _vm._i(_vm.milestonesFilter, child.id) >
                                      -1
                                    : _vm.milestonesFilter
                                },
                                on: {
                                  __c: function($event) {
                                    var $$a = _vm.milestonesFilter,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = child.id,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          (_vm.milestonesFilter = $$a.concat([
                                            $$v
                                          ]))
                                      } else {
                                        $$i > -1 &&
                                          (_vm.milestonesFilter = $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1)))
                                      }
                                    } else {
                                      _vm.milestonesFilter = $$c
                                    }
                                  }
                                }
                              }),
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\t" +
                                  _vm._s(child.text) +
                                  "\n\t\t\t\t\t\t\t\t"
                              )
                            ])
                          ])
                        })
                      )
                    ])
                  ])
                })
              )
            ])
          : _vm._e(),
        _vm._v(" "),
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
        _c("div", { staticClass: "btn-lg-submit-container" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-lg btn-primary",
              attrs: { type: "button" },
              on: { click: _vm.runReport }
            },
            [_vm._v("\n\t\t\t\tRun report\n\t\t\t")]
          )
        ])
      ],
      1
    ),
    _vm._v(" "),
    _vm.report
      ? _c(
          "div",
          [
            _c("div", { staticClass: "container body-block" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("div", { staticClass: "row" }, [
                  _c(
                    "div",
                    { staticClass: "col-md-4" },
                    [
                      _c("bootstrap-alert", { attrs: { type: "info" } }, [
                        _c("span", {
                          staticClass: "glyphicon glyphicon-info-sign"
                        }),
                        _vm._v(
                          "\n\t\t\t\t\t\t\tSelect a subject to show\n\t\t\t\t\t\t\tindividual reports.\n\t\t\t\t\t\t"
                        )
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-sm-10 col-md-7" }, [
                    _c("label", { staticClass: "containing-label" }, [
                      _vm._v("\n\t\t\t\t\t\t\tSubject\n\t\t\t\t\t\t\t"),
                      _c(
                        "div",
                        { staticClass: "input-group" },
                        [
                          _vm.filteredUsers
                            ? _c(
                                "select-two",
                                {
                                  staticClass: "form-control",
                                  attrs: {
                                    options: _vm.filteredUsers,
                                    multiple: _vm.multipleTrainees
                                  },
                                  model: {
                                    value: _vm.traineeId,
                                    callback: function($$v) {
                                      _vm.traineeId = $$v
                                    },
                                    expression: "traineeId"
                                  }
                                },
                                [
                                  !_vm.multipleTrainees
                                    ? _c("option", { attrs: { value: "" } }, [
                                        _vm._v("All")
                                      ])
                                    : _vm._e()
                                ]
                              )
                            : _vm._e(),
                          _vm._v(" "),
                          _c("span", { staticClass: "input-group-addon" }, [
                            _c("label", [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.show.inactiveUsers,
                                    expression: "show.inactiveUsers"
                                  }
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  checked: Array.isArray(_vm.show.inactiveUsers)
                                    ? _vm._i(_vm.show.inactiveUsers, null) > -1
                                    : _vm.show.inactiveUsers
                                },
                                on: {
                                  __c: function($event) {
                                    var $$a = _vm.show.inactiveUsers,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = null,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          (_vm.show.inactiveUsers = $$a.concat([
                                            $$v
                                          ]))
                                      } else {
                                        $$i > -1 &&
                                          (_vm.show.inactiveUsers = $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1)))
                                      }
                                    } else {
                                      _vm.show.inactiveUsers = $$c
                                    }
                                  }
                                }
                              }),
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\t\tShow inactive\n\t\t\t\t\t\t\t\t\t"
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "input-group-addon" }, [
                            _c("label", [
                              _c("input", {
                                directives: [
                                  {
                                    name: "model",
                                    rawName: "v-model",
                                    value: _vm.multipleTrainees,
                                    expression: "multipleTrainees"
                                  }
                                ],
                                attrs: { type: "checkbox" },
                                domProps: {
                                  checked: Array.isArray(_vm.multipleTrainees)
                                    ? _vm._i(_vm.multipleTrainees, null) > -1
                                    : _vm.multipleTrainees
                                },
                                on: {
                                  __c: function($event) {
                                    var $$a = _vm.multipleTrainees,
                                      $$el = $event.target,
                                      $$c = $$el.checked ? true : false
                                    if (Array.isArray($$a)) {
                                      var $$v = null,
                                        $$i = _vm._i($$a, $$v)
                                      if ($$el.checked) {
                                        $$i < 0 &&
                                          (_vm.multipleTrainees = $$a.concat([
                                            $$v
                                          ]))
                                      } else {
                                        $$i > -1 &&
                                          (_vm.multipleTrainees = $$a
                                            .slice(0, $$i)
                                            .concat($$a.slice($$i + 1)))
                                      }
                                    } else {
                                      _vm.multipleTrainees = $$c
                                    }
                                  }
                                }
                              }),
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t\t\tSelect multiple\n\t\t\t\t\t\t\t\t\t"
                              )
                            ])
                          ])
                        ],
                        1
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-sm-2 col-md-1" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-default labelless-button",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.traineeId = null
                          }
                        }
                      },
                      [_vm._v("\n\t\t\t\t\t\t\tClear\n\t\t\t\t\t\t")]
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "btn-lg-submit-container" }, [
                  _vm.report && _vm.subjects && _vm.subjects.length > 0
                    ? _c(
                        "button",
                        {
                          staticClass: "btn btn-lg btn-primary",
                          attrs: { type: "button" },
                          on: { click: _vm.printAll }
                        },
                        [
                          _vm._v("\n\t\t\t\t\t\tExport all\n\t\t\t\t\t\t"),
                          _c("svg-icon", {
                            attrs: { src: "/img/icons/pdf.svg" }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ])
              ])
            ]),
            _vm._v(" "),
            _vm.subjects && _vm.subjects.length > 0
              ? _vm._l(_vm.subjects, function(subject) {
                  return _c("individual-report", {
                    key: subject.id,
                    ref: "individualReports",
                    refInFor: true,
                    attrs: { report: _vm.report, subject: subject }
                  })
                })
              : [
                  _vm.subjectStats
                    ? _c(
                        "stats-report",
                        {
                          attrs: {
                            report: _vm.subjectStats,
                            title: "Trainee evaluation statistics by trainee"
                          }
                        },
                        [
                          _c("p", { staticClass: "text-center" }, [
                            _vm._v(
                              "\n\t\t\t\t\tTrainee list can be filtered by\n\t\t\t\t\t"
                            ),
                            _c("b", [_vm._v("Trainee current training level")]),
                            _vm._v("\n\t\t\t\t\tabove\n\t\t\t\t")
                          ])
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _vm.evaluatorStats
                    ? _c(
                        "stats-report",
                        {
                          attrs: {
                            report: _vm.evaluatorStats,
                            title: "Faculty evaluation statistics by trainee"
                          }
                        },
                        [
                          _c("p", { staticClass: "text-center" }, [
                            _vm._v(
                              "\n\t\t\t\t\tTrainee list can be filtered by\n\t\t\t\t\t"
                            ),
                            _c("b", [_vm._v("Trainee current training level")]),
                            _vm._v("\n\t\t\t\t\tabove\n\t\t\t\t")
                          ])
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c("aggregate-report", {
                    attrs: {
                      report: _vm.report,
                      milestones: _vm.milestones,
                      competencies: _vm.competencies
                    }
                  })
                ]
          ],
          2
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
    require("vue-hot-reload-api")      .rerender("data-v-26074fc7", esExports)
  }
}

/***/ }),
/* 563 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FacultyReport_vue__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_446a5283_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FacultyReport_vue__ = __webpack_require__(565);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FacultyReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_446a5283_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FacultyReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FacultyReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-446a5283", Component.options)
  } else {
    hotAPI.reload("data-v-446a5283", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 564 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__StatsReport_vue__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);
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
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["a"] = ({
	props: {},
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateStringObject"])(Object(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["currentQuarter"])()),
			evaluatorStats: null,
			subjectStats: null,

			alerts: []
		};
	},


	methods: {
		runReport: function runReport() {
			var _this = this;

			fetch('/report/stats/trainee/faculty', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(this.dates)
			}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["t" /* jsonOrThrow */]).then(function (stats) {
				_this.evaluatorStats = stats;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error: </strong> There was a problem fetching the evaluator statistics'
				});
			});

			fetch('/report/stats/faculty/faculty', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify(this.dates)
			}).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["t" /* jsonOrThrow */]).then(function (stats) {
				_this.subjectStats = stats;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error: </strong> There was a problem fetching the subject statistics'
				});
			});
		}
	},

	components: {
		StatsReport: __WEBPACK_IMPORTED_MODULE_0__StatsReport_vue__["a" /* default */],
		StartEndDate: __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__["a" /* default */],
		AlertList: __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__["a" /* default */]
	}
});

/***/ }),
/* 565 */
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
        "div",
        { staticClass: "container body-block" },
        [
          _c("h1", [_vm._v("Faculty report")]),
          _vm._v(" "),
          _c("start-end-date", {
            model: {
              value: _vm.dates,
              callback: function($$v) {
                _vm.dates = $$v
              },
              expression: "dates"
            }
          }),
          _vm._v(" "),
          _c("div", { staticClass: "btn-lg-submit-container" }, [
            _c(
              "button",
              {
                staticClass: "btn btn-lg btn-primary",
                attrs: { type: "button" },
                on: { click: _vm.runReport }
              },
              [_vm._v("\n\t\t\t\tRun report\n\t\t\t")]
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
      ),
      _vm._v(" "),
      _vm.evaluatorStats
        ? _c("stats-report", {
            attrs: {
              report: _vm.evaluatorStats,
              title: "Trainee evaluation statistics by faculty"
            }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm.subjectStats
        ? _c("stats-report", {
            attrs: {
              report: _vm.subjectStats,
              title: "Faculty evaluation statistics by faculty"
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
    require("vue-hot-reload-api")      .rerender("data-v-446a5283", esExports)
  }
}

/***/ }),
/* 566 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReport_vue__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70d4db5d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReport_vue__ = __webpack_require__(593);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(567)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-70d4db5d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70d4db5d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FormReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-70d4db5d", Component.options)
  } else {
    hotAPI.reload("data-v-70d4db5d", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 567 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 568 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_round__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_round___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash_round__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StartEndDate_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SelectTwo_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FormReportQuestion_vue__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__BootstrapAlert_vue__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__SvgIcon_vue__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__modules_math_utils_js__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__modules_date_utils_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__ = __webpack_require__(26);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		users: {
			type: Array
		},
		groupedUsers: {
			type: Array
		}
	},
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_13__modules_date_utils_js__["isoDateStringObject"])(Object(__WEBPACK_IMPORTED_MODULE_13__modules_date_utils_js__["currentQuarter"])()),
			formId: null,
			subjectId: null,
			report: null,

			groupedForms: [],
			subjectEvals: [],

			hideQuestions: [],
			scoreQuestions: [],
			customOptionValues: [],
			disregardOption: [],

			show: {
				allEvals: false,
				subjectEvals: false
			},

			pdfOptions: {
				questionPageBreak: null,
				evaluationListStyle: 'details'
			},

			alerts: []
		};
	},


	computed: {
		subject: function subject() {
			var _this = this;

			if (this.subjectId) return this.users.find(function (user) {
				return user.id === Number(_this.subjectId);
			});
		},
		reportContents: function reportContents() {
			var _this2 = this;

			var reportContents = this.report.formContents;

			reportContents.items.map(function (item) {
				item.weight = Number(item.weight);
				if (_this2.subjectId && _this2.report.subjectEvals[_this2.subjectId]) {
					item.subjectResponses = _this2.report.subjectResponses[_this2.subjectId] ? _this2.report.subjectResponses[_this2.subjectId][item.id] : null;
					item.subjectResponseValues = _this2.report.subjectResponseValues[_this2.subjectId] ? _this2.report.subjectResponseValues[_this2.subjectId][item.id] : null;
				} else {
					item.subjectResponses = null;
					item.subjectResponseValues = null;
				}

				item.averageResponses = _this2.report.averageResponses[item.id];

				if (item.type === 'question' && ['checkbox', 'radio', 'radiononnumeric'].includes(item.questionType)) {
					item.options.map(function (option) {
						if (_this2.subjectId && _this2.report.subjectEvals[_this2.subjectId]) {
							option.responses = _this2.report.subjectResponses[_this2.subjectId] ? _this2.report.subjectResponses[_this2.subjectId][item.id][option.value] : 0;
							option.percentage = _this2.report.subjectPercentages[_this2.subjectId] ? _this2.report.subjectPercentages[_this2.subjectId][item.id][option.value] : 0;
						} else {
							option.responses = null;
							option.percentage = null;
						}
						option.averagePercentage = _this2.report.averagePercentages[item.id] ? _this2.report.averagePercentages[item.id][option.value] : 0;
					});
				}
			});

			return reportContents;
		},
		reportQuestions: function reportQuestions() {
			if (!this.reportContents || !this.reportContents.items) return [];

			var questions = this.reportContents.items.filter(function (item) {
				return item.type === 'question';
			});
			this.hideQuestions = Array(questions.length).fill(false);

			return questions;
		},
		evalsThead: function evalsThead() {
			return [['#', 'Subject', 'Evaluator', 'Requested By', 'Form', 'Evaluation Date', 'Request Date', 'Complete Date', 'Status']];
		},
		allEvalsConfig: function allEvalsConfig() {
			return {
				ajax: {
					url: '/evaluations',
					data: {
						id: this.report.evals.slice(),
						with: {
							subject: ['full_name'],
							evaluator: ['full_name'],
							requestor: ['full_name'],
							form: ['title']
						}
					},
					dataSrc: ''
				},
				columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, { data: 'requestor.full_name' }, { data: 'form.title' }, {
					data: null,
					render: Object(__WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
					createdCell: Object(__WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
				}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["i" /* renderDateCell */], createdCell: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["a" /* createDateCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: 'status', render: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
				order: [[0, 'desc']]
			};
		},
		subjectEvalsConfig: function subjectEvalsConfig() {
			return {
				columns: [{ data: 'url' }, { data: 'subject.full_name' }, { data: 'evaluator.full_name' }, { data: 'requestor.full_name' }, { data: 'form.title' }, {
					data: null,
					render: Object(__WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["j" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
					createdCell: Object(__WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["b" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
				}, { data: "request_date", render: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["i" /* renderDateCell */], createdCell: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["a" /* createDateCell */] }, { data: "complete_date", render: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["k" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["c" /* createDateTimeCell */] }, { data: "status", render: __WEBPACK_IMPORTED_MODULE_15__modules_datatable_utils_js__["l" /* renderEvaluationStatus */] }],
				order: [[0, 'desc']]
			};
		}
	},
	watch: {
		subjectId: function subjectId() {
			this.fetchSubjectEvals();
		},
		report: function report(_report) {
			this.fetchSubjectEvals();
			this.hideQuestions = Array(_report.formContents.items.length).fill(false);
			this.scoreQuestions = Array(_report.formContents.items.length).fill(true);
			this.customOptionValues = Array(_report.formContents.items.length).fill(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["a" /* CUSTOM_OPTION_VALUES */].get('faculty'));
			this.disregardOption = Array(_report.formContents.items.length).fill(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["b" /* DISREGARD_OPTION */].get('faculty'));
		}
	},

	created: function created() {
		var _this3 = this;

		Object(__WEBPACK_IMPORTED_MODULE_12__modules_utils_js__["g" /* fetchFormGroups */])().then(function (groupedForms) {
			_this3.groupedForms = groupedForms;
		}).catch(function (err) {
			_this3.alerts.push({
				type: 'error',
				html: '<strong>Error: </strong> There was a problem fetching the list of forms'
			});
			console.error(err);
		});
	},


	methods: {
		runCsvReport: function runCsvReport() {
			var csv = Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["b" /* generateScoresReportCsv */])(this.report, [this.subject], this.hideQuestions, this.scoreQuestions, this.customOptionValues, this.disregardOption);

			Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["g" /* downloadCsv */])(csv, this.report.formContents.title + ' - ' + this.subject.full_name, this.dates);
		},
		runAllCsvReports: function runAllCsvReports() {
			var _this4 = this;

			var subjects = Object.keys(this.report.subjectResponses).map(function (subjectId) {
				var subject = _this4.users.find(function (user) {
					return user.id === Number(subjectId);
				});
				var full_name = subject ? subject.full_name : 'User # ' + subjectId;
				return {
					id: subjectId,
					full_name: full_name
				};
			});

			var csv = Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["b" /* generateScoresReportCsv */])(this.report, subjects, this.hideQuestions, this.scoreQuestions, this.customOptionValues, this.disregardOption);

			Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["g" /* downloadCsv */])(csv, this.report.formContents.title + ' - Aggregate', this.dates);
		},
		runReport: function runReport() {
			var _this5 = this;

			fetch('/report/form', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_12__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					'form_id': this.formId
				})
			}).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response.statusText);
			}).then(function (report) {
				_this5.report = Object.assign({}, _this5.report, report);
			}).catch(function (err) {
				_this5.alerts.push({
					type: 'error',
					html: '<strong>Error: </strong> There was a problem running the report'
				});
				console.error(err);
			});
		},
		fetchSubjectEvals: function fetchSubjectEvals() {
			var _this6 = this;

			if (!this.subjectId || !this.report || !this.report.subjectEvals || !this.report.subjectEvals[this.subjectId]) {
				this.subjectEvals = [];
				return;
			}

			var query = $.param({
				id: this.report.subjectEvals[this.subjectId].slice(),
				with: {
					subject: ['full_name'],
					evaluator: ['full_name'],
					requestor: ['full_name'],
					form: ['title']
				}
			});

			fetch('/evaluations?' + query, {
				method: 'GET',
				headers: Object(__WEBPACK_IMPORTED_MODULE_12__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin'
			}).then(__WEBPACK_IMPORTED_MODULE_12__modules_utils_js__["t" /* jsonOrThrow */]).then(function (subjectEvals) {
				_this6.subjectEvals = subjectEvals;
			}).catch(function (err) {
				console.error(err);
			});
		},
		hideQuestion: function hideQuestion(questionIndex, hide) {
			var hideQuestions = this.hideQuestions.slice();
			hideQuestions.splice(questionIndex, 1, hide);

			this.hideQuestions = hideQuestions;
		},
		scoreQuestion: function scoreQuestion(questionIndex, score) {
			var scoreQuestions = this.scoreQuestions.slice();
			scoreQuestions.splice(questionIndex, 1, score);

			this.scoreQuestions = scoreQuestions;
		},
		handleCustomOption: function handleCustomOption(questionIndex, questionCustomOptionValues) {
			var customOptionValues = this.customOptionValues.slice();
			customOptionValues.splice(questionIndex, 1, questionCustomOptionValues);

			this.customOptionValues = customOptionValues;
		},
		handleDisregardOption: function handleDisregardOption(questionIndex, questionDisregardOption) {
			var disregardOption = this.disregardOption.slice();
			disregardOption.splice(questionIndex, 1, questionDisregardOption);

			this.disregardOption = disregardOption;
		},
		exportPdf: function exportPdf() {
			var _this7 = this;

			if (!this.reportContents || this.reportContents.items.length < 1) return;

			var hasSubject = this.report.subjectEvals[this.subjectId] && this.report.subjectEvals[this.subjectId].length > 0;

			Promise.all([__webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 401)), __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 402))]).then(function (_ref) {
				var _ref2 = _slicedToArray(_ref, 2),
				    pdfmake = _ref2[0],
				    vfs = _ref2[1];

				pdfmake.vfs = vfs;

				var filename = hasSubject ? _this7.subject.full_name + ' - ' + _this7.reportContents.title + ' - ' + _this7.dates.startDate + ' -- ' + _this7.dates.endDate + '.pdf' : _this7.reportContents.title + ' - ' + _this7.dates.startDate + ' -- ' + _this7.dates.endDate + '.pdf';

				var evalCounts = {
					subjectRequested: 0,
					otherRequested: 0,
					total: 0
				};
				if (_this7.pdfOptions.evaluationListStyle === 'summary') {
					var _iteratorNormalCompletion = true;
					var _didIteratorError = false;
					var _iteratorError = undefined;

					try {
						for (var _iterator = _this7.subjectEvals[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
							var evaluation = _step.value;

							if (evaluation.requested_by_id === evaluation.subject_id) evalCounts.subjectRequested++;else evalCounts.otherRequested++;

							evalCounts.total++;
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

				var content = [{
					text: hasSubject ? _this7.reportContents.title + ' - Summary of evaluations for ' + _this7.subject.full_name : _this7.reportContents.title + ' - Summary of evaluations',
					style: 'h1'
				}, {
					table: Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["h" /* fullWidthTable */])({
						headerRows: 1,
						body: [(hasSubject ? ['Subject'] : []).concat(['Form', 'Start date', 'End date']).map(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["l" /* tableHeader */]), (hasSubject ? [_this7.subject.full_name] : []).concat([_this7.reportContents.title, _this7.dates.startDate, _this7.dates.endDate]).map(Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["j" /* pdfmakeStyle */])('tableBody'))]
					})
				}, { text: 'Evaluations included in report', style: 'h2' }, _this7.pdfOptions.evaluationListStyle === 'summary' ? {
					ul: [evalCounts.subjectRequested + ' requested by ' + (hasSubject ? _this7.subject.full_name : 'subject'), evalCounts.otherRequested + ' requested by others', evalCounts.total + ' total']
				} : Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["c" /* borderedStripedTable */])({
					table: {
						headerRows: 1,
						widths: ['auto', 'auto', 'auto', '*', 'auto', 'auto'],
						body: [['#', 'Evaluator', 'Requested by', 'Form', 'Evaluation date', 'Completed'].map(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["l" /* tableHeader */])].concat(_toConsumableArray(_this7.subjectEvals.map(function (subjectEval) {
							return [subjectEval.id, subjectEval.evaluator.full_name, subjectEval.requestor.full_name, subjectEval.form.title, Object(__WEBPACK_IMPORTED_MODULE_13__modules_date_utils_js__["renderDateRange"])(subjectEval.evaluation_date_start, subjectEval.evaluation_date_end), __WEBPACK_IMPORTED_MODULE_0_moment___default()(subjectEval.complete_date).calendar()];
						}).map(function (row) {
							return row.map(Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["j" /* pdfmakeStyle */])('tableBody'));
						})))
					}
				}), { text: _this7.reportContents.title, style: 'h2' }, {
					margin: 0,
					type: 'none',
					ol: _this7.reportQuestions.map(function (question, index) {
						return Object.assign({}, question, { originalIndex: index });
					}).filter(function (question, index) {
						return !_this7.hideQuestions[index];
					}).map(function (item) {
						var questionHeading = _this7.hideQuestions.some(function (hide) {
							return hide;
						}) ? {
							margin: [0, 20, 0, 5],
							text: item.text,
							style: 'questionText'
						} : {
							margin: [0, 20, 0, 5],
							columns: [{
								width: 'auto',
								margin: [0, 0, 5, 0],
								text: item.id.toUpperCase() + ': ',
								bold: true,
								style: 'questionText'
							}, {
								width: '*',
								text: item.text,
								style: 'questionText'
							}]
						};

						var questionBody = '';
						switch (item.questionType) {
							case 'checkbox':
							case 'radio':
							case 'radiononnumeric':
								questionBody = Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["c" /* borderedStripedTable */])({
									table: {
										headerRows: 2,
										widths: ['auto', 'auto', '*'].concat(hasSubject ? ['*', '*'] : []),
										body: [[{
											text: 'Option text',
											rowSpan: 2,
											style: 'tableHeader'
										}, {
											text: 'Value',
											rowSpan: 2,
											style: 'tableHeader'
										}, {
											text: 'Responses',
											colSpan: hasSubject ? 3 : null,
											style: 'tableHeader'
										}].concat(hasSubject ? [{}, {}] : []), ['', ''].concat(hasSubject ? ['Subject #', 'Subject %'] : []).concat(['Overall %']).map(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["l" /* tableHeader */])].concat(item.options.map(function (option) {
											return [option.text, Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["c" /* getResponseValue */])(option.value, _this7.customOptionValues[item.originalIndex])].concat(hasSubject ? [option.responses || '', option.percentage ? option.percentage + '%' : ''] : []).concat([option.averagePercentage ? option.averagePercentage + '%' : '']);
										}).map(function (row) {
											return row.map(Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["j" /* pdfmakeStyle */])('tableBody'));
										}))
									}
								});
								break;
							case 'text':
								if (hasSubject && item.subjectResponseValues) questionBody = Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["c" /* borderedStripedTable */])({
									table: {
										headerRows: 1,
										widths: ['auto', 'auto', 'auto', '*'],
										body: [['#', 'Evaluator', 'Date', 'Response'].map(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["l" /* tableHeader */])].concat(Object.keys(item.subjectResponseValues).map(function (evaluationId) {
											return [evaluationId, _this7.report.evaluators[evaluationId].full_name, Object(__WEBPACK_IMPORTED_MODULE_13__modules_date_utils_js__["renderDateRange"])(_this7.report.evaluations[evaluationId].evaluation_date_start, _this7.report.evaluations[evaluationId].evaluation_date_end), item.subjectResponseValues[evaluationId]];
										}).map(function (row) {
											return row.map(Object(__WEBPACK_IMPORTED_MODULE_14__modules_report_utils_js__["j" /* pdfmakeStyle */])('tableBody'));
										}))
									}
								});
								break;
						}

						return {
							pageBreak: _this7.pdfOptions.questionPageBreak,
							stack: [questionHeading, questionBody].concat(_this7.scoreQuestions[item.originalIndex] && Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["a" /* canScoreQuestion */])(item.questionType) && Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["f" /* valuesForAllOptions */])(item, _this7.customOptionValues[item.originalIndex], _this7.disregardOption[item.originalIndex]) ? [{
								columns: [{
									table: {
										body: [['Total average'], [Object(__WEBPACK_IMPORTED_MODULE_1_lodash_round__["default"])(Object(__WEBPACK_IMPORTED_MODULE_11__modules_math_utils_js__["a" /* average */])(Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["d" /* getResponseValues */])(_this7.report.averageResponses[item.id], _this7.customOptionValues[item.originalIndex], _this7.disregardOption[item.originalIndex])), 2)]]
									}
								}].concat(hasSubject ? [{
									table: {
										body: [['Subject average'], [Object(__WEBPACK_IMPORTED_MODULE_1_lodash_round__["default"])(Object(__WEBPACK_IMPORTED_MODULE_11__modules_math_utils_js__["a" /* average */])(Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["d" /* getResponseValues */])(_this7.report.subjectResponses[_this7.subjectId][item.id], _this7.customOptionValues[item.originalIndex], _this7.disregardOption[item.originalIndex])), 2)]]
									}
								}, {
									table: {
										body: [['Subject standard deviation'], [Object(__WEBPACK_IMPORTED_MODULE_1_lodash_round__["default"])(Object(__WEBPACK_IMPORTED_MODULE_11__modules_math_utils_js__["c" /* standardDeviation */])(Object(__WEBPACK_IMPORTED_MODULE_10__modules_reports_form_report_js__["d" /* getResponseValues */])(_this7.report.subjectResponses[_this7.subjectId][item.id], _this7.customOptionValues[item.originalIndex], _this7.disregardOption[item.originalIndex])), 2)]]
									}
								}] : [])
							}] : [])
						};
					})
				}];

				var docDefinition = {
					pageSize: 'LETTER',
					content: content,
					styles: {
						h1: {
							bold: true,
							fontSize: 20,
							margin: [0, 20]
						},
						h2: {
							bold: true,
							fontSize: 16,
							margin: [0, 10]
						},
						questionText: {
							fontSize: 11
						},
						tableHeader: {
							bold: true,
							fontSize: 10
						},
						tableBody: {
							fontSize: 8
						}
					}
				};

				pdfmake.createPdf(docDefinition).download(filename);
			}).catch(function (err) {
				console.error(err);
				_this7.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem exporting the report for ' + _this7.reportContents.title
				});
			});
		}
	},

	components: {
		StartEndDate: __WEBPACK_IMPORTED_MODULE_2__StartEndDate_vue__["a" /* default */],
		SelectTwo: __WEBPACK_IMPORTED_MODULE_3__SelectTwo_vue__["a" /* default */],
		FormReportQuestion: __WEBPACK_IMPORTED_MODULE_4__FormReportQuestion_vue__["a" /* default */],
		DataTable: __WEBPACK_IMPORTED_MODULE_5__DataTable_vue__["a" /* default */],
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_6__BootstrapAlert_vue__["a" /* default */],
		AlertList: __WEBPACK_IMPORTED_MODULE_7__AlertList_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_8__ShowHideButton_vue__["a" /* default */],
		SvgIcon: __WEBPACK_IMPORTED_MODULE_9__SvgIcon_vue__["a" /* default */]
	}
});

/***/ }),
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReportQuestion_vue__ = __webpack_require__(577);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c791193a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReportQuestion_vue__ = __webpack_require__(592);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(576)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-c791193a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReportQuestion_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c791193a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReportQuestion_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FormReportQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c791193a", Component.options)
  } else {
    hotAPI.reload("data-v-c791193a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 576 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 577 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormReader_FormReaderQuestionOption_vue__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormReportQuestionOptionStats_vue__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ChartjsChart_vue__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RichNumberStdDev_vue__ = __webpack_require__(582);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_round__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash_round___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash_round__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_snarkdown__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_snarkdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_snarkdown__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_reports_form_report_js__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__modules_math_utils_js__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__modules_utils_js__ = __webpack_require__(1);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		options: {
			type: Array,
			required: false
		},
		required: {
			type: Boolean,
			default: false
		},
		hide: {
			type: Boolean,
			default: false
		},
		scoreQuestion: {
			type: Boolean,
			default: true
		},
		customOptionValues: {
			type: Object,
			default: {}
		},
		disregardOption: {
			type: Object,
			default: {}
		},

		subjectResponses: Object,
		averageResponses: Object,
		subjectResponseValues: Object
	},
	data: function data() {
		return {
			showDescriptions: false,
			showChart: false,
			chartType: 'pie',

			showScoreOptions: false
		};
	},

	computed: {
		canScoreQuestion: function canScoreQuestion() {
			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_reports_form_report_js__["a" /* canScoreQuestion */])(this.questionType);
		},
		valuesForAllOptions: function valuesForAllOptions() {
			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_reports_form_report_js__["f" /* valuesForAllOptions */])(this, this.customOptionValues, this.disregardOption);
		},
		totalScores: function totalScores() {
			if (!this.valuesForAllOptions || !this.averageResponses) return;

			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_reports_form_report_js__["d" /* getResponseValues */])(this.averageResponses, this.customOptionValues, this.disregardOption);
		},
		totalAverageScore: function totalAverageScore() {
			if (!this.valuesForAllOptions || !this.totalScores) return;

			return Object(__WEBPACK_IMPORTED_MODULE_9__modules_math_utils_js__["a" /* average */])(this.totalScores);
		},
		subjectScores: function subjectScores() {
			if (!this.valuesForAllOptions || !this.subjectResponses) return;

			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_reports_form_report_js__["d" /* getResponseValues */])(this.subjectResponses, this.customOptionValues, this.disregardOption);
		},
		subjectAverageScore: function subjectAverageScore() {
			if (!this.valuesForAllOptions || !this.subjectScores) return;

			return Object(__WEBPACK_IMPORTED_MODULE_9__modules_math_utils_js__["a" /* average */])(this.subjectScores);
		},
		subjectStandardDev: function subjectStandardDev() {
			if (!this.valuesForAllOptions || !this.subjectScores) return;

			return Object(__WEBPACK_IMPORTED_MODULE_9__modules_math_utils_js__["c" /* standardDeviation */])(this.subjectScores);
		},
		hasDescriptions: function hasDescriptions() {
			if (!this.options) return false;

			return this.options.some(function (option) {
				return option.description;
			});
		},
		chartTypes: function chartTypes() {
			return ['pie', 'bar', 'polarArea'];
		},
		chartData: function chartData() {
			if (this.subjectResponses) return {
				labels: this.options.map(function (option) {
					return option.text || option.value;
				}),
				datasets: [{
					label: 'Subject responses',
					data: Object.values(this.subjectResponses),
					backgroundColor: __WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["b" /* CHART_COLORS */].OTHER
				}]
			};
		},
		averageChartData: function averageChartData() {
			if (this.averageResponses) return {
				labels: this.options.map(function (option) {
					return option.text || option.value;
				}),
				datasets: [{
					label: 'Average responses',
					data: Object.values(this.averageResponses),
					backgroundColor: __WEBPACK_IMPORTED_MODULE_8__modules_constants_js__["b" /* CHART_COLORS */].OTHER
				}]
			};
		},
		chartOptions: function chartOptions() {
			return {
				legend: {
					labels: {
						fontSize: 18,
						fontColor: '#333'
					}
				}
			};
		}
	},
	methods: {
		camelCaseToWords: __WEBPACK_IMPORTED_MODULE_10__modules_utils_js__["b" /* camelCaseToWords */],
		snarkdown: __WEBPACK_IMPORTED_MODULE_6_snarkdown__["default"],
		ucfirst: __WEBPACK_IMPORTED_MODULE_10__modules_utils_js__["H" /* ucfirst */],
		round: __WEBPACK_IMPORTED_MODULE_5_lodash_round__["default"],
		shouldDisregardValue: function shouldDisregardValue(value) {
			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_reports_form_report_js__["e" /* shouldDisregardOption */])(value, this.disregardOption);
		},
		shouldDisregardOption: function shouldDisregardOption(option) {
			return this.shouldDisregardValue(option.value);
		},
		getValueValue: function getValueValue(value) {
			if (!this.canScoreQuestion) return;

			return Object(__WEBPACK_IMPORTED_MODULE_7__modules_reports_form_report_js__["c" /* getResponseValue */])(value, this.customOptionValues);
		},
		getOptionValue: function getOptionValue(option) {
			return this.getValueValue(option.value);
		},
		handleCustomOptionValueChange: function handleCustomOptionValueChange(option, event) {
			this.$emit('custom-option', Object.assign({}, this.customOptionValues, _defineProperty({}, option.value, Number(event.target.value))));
		},
		handleDisregardOptionChange: function handleDisregardOptionChange(option, event) {
			this.$emit('disregard-option', Object.assign({}, this.disregardOption, _defineProperty({}, option.value, event.target.checked)));
		}
	},
	components: {
		FormReaderQuestionOption: __WEBPACK_IMPORTED_MODULE_0__FormReader_FormReaderQuestionOption_vue__["a" /* default */],
		FormReportQuestionOptionStats: __WEBPACK_IMPORTED_MODULE_1__FormReportQuestionOptionStats_vue__["a" /* default */],
		ChartjsChart: __WEBPACK_IMPORTED_MODULE_2__ChartjsChart_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_3__ShowHideButton_vue__["a" /* default */],
		RichNumberStdDev: __WEBPACK_IMPORTED_MODULE_4__RichNumberStdDev_vue__["a" /* default */]
	}
});

/***/ }),
/* 578 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReportQuestionOptionStats_vue__ = __webpack_require__(580);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f4974f7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReportQuestionOptionStats_vue__ = __webpack_require__(581);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(579)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2f4974f7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FormReportQuestionOptionStats_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2f4974f7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FormReportQuestionOptionStats_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FormReportQuestionOptionStats.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2f4974f7", Component.options)
  } else {
    hotAPI.reload("data-v-2f4974f7", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 579 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 580 */
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

/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		responses: Number,
		percentage: Number,
		averagePercentage: Number
	}
});

/***/ }),
/* 581 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "question-option-stats" }, [
    _vm.responses || _vm.percentage || _vm.averagePercentage
      ? _c("table", { staticClass: "table table-bordered" }, [
          _c("tbody", [
            _vm.responses != null
              ? _c("tr", [
                  _c("th", [_vm._v("Subject responses")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.responses))])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.percentage != null
              ? _c("tr", [
                  _c("th", [_vm._v("Subject percentage")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.percentage) + "%")])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.averagePercentage != null
              ? _c("tr", [
                  _c("th", [_vm._v("Overall percentage")]),
                  _vm._v(" "),
                  _c("td", [_vm._v(_vm._s(_vm.averagePercentage) + "%")])
                ])
              : _vm._e()
          ])
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
    require("vue-hot-reload-api")      .rerender("data-v-2f4974f7", esExports)
  }
}

/***/ }),
/* 582 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichNumberStdDev_vue__ = __webpack_require__(583);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_05f8d42c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichNumberStdDev_vue__ = __webpack_require__(591);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichNumberStdDev_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_05f8d42c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichNumberStdDev_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/RichNumberStdDev.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05f8d42c", Component.options)
  } else {
    hotAPI.reload("data-v-05f8d42c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 583 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RichSignedNumber_vue__ = __webpack_require__(584);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_math_utils_js__ = __webpack_require__(221);
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		value: {
			type: Number,
			required: true
		},
		values: {
			type: Array,
			required: true
		},
		precision: {
			type: Number,
			default: 3
		}
	},

	computed: {
		stdDevs: function stdDevs() {
			return Object(__WEBPACK_IMPORTED_MODULE_1__modules_math_utils_js__["b" /* numberOfStandardDeviations */])(this.value, this.values);
		}
	},

	components: {
		RichSignedNumber: __WEBPACK_IMPORTED_MODULE_0__RichSignedNumber_vue__["a" /* default */]
	}
});

/***/ }),
/* 584 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichSignedNumber_vue__ = __webpack_require__(585);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c30945d4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichSignedNumber_vue__ = __webpack_require__(590);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichSignedNumber_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c30945d4_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichSignedNumber_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/RichSignedNumber.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-c30945d4", Component.options)
  } else {
    hotAPI.reload("data-v-c30945d4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 585 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__RichNumber_vue__ = __webpack_require__(586);
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		value: {
			type: Number,
			required: true
		},
		precision: {
			type: Number,
			default: 3
		}
	},

	computed: {
		sign: function sign() {
			if (this.value > 0) return '+';else if (this.value < 0) return '-';
			return '';
		},
		absoluteValue: function absoluteValue() {
			return Math.abs(this.value);
		},
		precisionAbsoluteValue: function precisionAbsoluteValue() {
			return this.absoluteValue.toPrecision(this.precision);
		},
		displayString: function displayString() {
			return '' + this.sign + this.precisionAbsoluteValue;
		}
	},

	components: {
		RichNumber: __WEBPACK_IMPORTED_MODULE_0__RichNumber_vue__["a" /* default */]
	}
});

/***/ }),
/* 586 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichNumber_vue__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_025cd8cc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichNumber_vue__ = __webpack_require__(589);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_RichNumber_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_025cd8cc_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_RichNumber_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/RichNumber.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-025cd8cc", Component.options)
  } else {
    hotAPI.reload("data-v-025cd8cc", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 587 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_color__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_transform_color__ = __webpack_require__(588);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__jacobmischka_transform_color___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__jacobmischka_transform_color__);
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["a"] = ({
	props: {
		value: {
			type: Number,
			required: true
		},
		displayValue: {
			type: String,
			required: false
		},
		min: {
			type: Number,
			default: -1
		},
		max: {
			type: Number,
			default: 1
		},
		minColor: {
			type: [String, Object],
			default: 'red'
		},
		midColor: {
			type: [String, Object],
			default: 'black'
		},
		maxColor: {
			type: [String, Object],
			default: 'green'
		}
	},

	computed: {
		valueToDisplay: function valueToDisplay() {
			return this.displayValue ? this.displayValue : this.value;
		},
		mid: function mid() {
			return (this.max + this.min) / 2;
		},
		endColor: function endColor() {
			return this.value >= this.mid ? this.maxColor : this.minColor;
		},
		maxTransformedValue: function maxTransformedValue() {
			if (this.mid === 0) return this.max;

			return (this.max - this.mid) / this.mid;
		},
		transformedValue: function transformedValue() {
			return this.value / this.maxTransformedValue;
		},
		color: function color() {
			if (this.value <= this.min) return Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(this.minColor);
			if (this.value === this.mid) return Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(this.midColor);
			if (this.value >= this.max) return Object(__WEBPACK_IMPORTED_MODULE_0_color__["default"])(this.maxColor);

			return Object(__WEBPACK_IMPORTED_MODULE_1__jacobmischka_transform_color__["default"])(this.midColor, this.endColor, this.transformedValue);
		},
		styleValue: function styleValue() {
			return {
				color: this.color.rgb().string()
			};
		}
	}
});

/***/ }),
/* 588 */
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/@jacobmischka/transform-color/dist/index.js'");

/***/ }),
/* 589 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", { style: _vm.styleValue }, [
    _vm._v("\n\t" + _vm._s(_vm.valueToDisplay) + "\n")
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-025cd8cc", esExports)
  }
}

/***/ }),
/* 590 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("rich-number", {
    attrs: {
      value: _vm.value,
      min: -0.5,
      max: 0.5,
      "display-value": _vm.displayString
    }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c30945d4", esExports)
  }
}

/***/ }),
/* 591 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("rich-signed-number", {
    attrs: { value: _vm.stdDevs, precision: _vm.precision }
  })
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-05f8d42c", esExports)
  }
}

/***/ }),
/* 592 */
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
        "question panel " + (_vm.required ? "panel-primary" : "panel-default"),
      style: { opacity: _vm.hide ? 0.7 : 1 }
    },
    [
      _vm.text
        ? _c("div", { staticClass: "question-header panel-heading" }, [
            _c("h3", { staticClass: "question-title panel-title" }, [
              _c("b", [_vm._v(_vm._s(_vm.ucfirst(_vm.id)) + ": ")]),
              _vm._v(" "),
              _c("span", {
                domProps: { innerHTML: _vm._s(_vm.snarkdown(_vm.text)) }
              })
            ])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("div", { staticClass: "panel-body" }, [
        _c(
          "div",
          { staticClass: "question-body" },
          [
            _vm._l(_vm.options, function(option, index) {
              return ["radio", "radiononnumeric", "checkbox"].includes(
                _vm.questionType
              )
                ? _c(
                    "form-reader-question-option",
                    _vm._b(
                      {
                        key: index,
                        attrs: {
                          questionType: _vm.questionType,
                          questionId: _vm.id,
                          required: _vm.required,
                          showDescription: _vm.showDescriptions,
                          readonly: ""
                        }
                      },
                      "form-reader-question-option",
                      option,
                      false
                    ),
                    [
                      _vm.canScoreQuestion &&
                      _vm.scoreQuestion &&
                      _vm.valuesForAllOptions &&
                      !_vm.shouldDisregardOption(option) &&
                      (_vm.getOptionValue(option) ||
                        _vm.getOptionValue(option) === 0)
                        ? _c("div", { staticClass: "text-center" }, [
                            _c(
                              "span",
                              { staticClass: "option-value-display" },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\tValue: " +
                                    _vm._s(_vm.getOptionValue(option)) +
                                    "\n\t\t\t\t\t"
                                )
                              ]
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      _c(
                        "form-report-question-option-stats",
                        _vm._b(
                          {},
                          "form-report-question-option-stats",
                          option,
                          false
                        )
                      )
                    ],
                    1
                  )
                : _vm._e()
            }),
            _vm._v(" "),
            _vm.subjectResponseValues &&
            ["text", "number"].includes(_vm.questionType)
              ? _c("div", { staticClass: "question-option" }, [
                  _c("table", { staticClass: "table table-bordered" }, [
                    _c(
                      "tbody",
                      [
                        _vm._m(0),
                        _vm._v(" "),
                        _vm._l(_vm.subjectResponseValues, function(
                          response,
                          evalId
                        ) {
                          return _c("tr", [
                            _c("td", [
                              _c(
                                "a",
                                { attrs: { href: "/evaluations/" + evalId } },
                                [
                                  _vm._v(
                                    "\n\t\t\t\t\t\t\t\t\t" +
                                      _vm._s(evalId) +
                                      "\n\t\t\t\t\t\t\t\t"
                                  )
                                ]
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t\t" +
                                  _vm._s(response) +
                                  "\n\t\t\t\t\t\t\t"
                              )
                            ])
                          ])
                        })
                      ],
                      2
                    )
                  ])
                ])
              : _vm._e()
          ],
          2
        ),
        _vm._v(" "),
        _vm.options && _vm.showChart
          ? _c("div", { staticClass: "row" }, [
              _vm.subjectResponses
                ? _c(
                    "div",
                    { staticClass: "col-md-6" },
                    [
                      _c("h3", [_vm._v("Subject responses")]),
                      _vm._v(" "),
                      _c("chartjs-chart", {
                        attrs: {
                          id: _vm.id + "-chart",
                          type: _vm.chartType,
                          data: _vm.chartData,
                          options: _vm.chartOptions
                        }
                      })
                    ],
                    1
                  )
                : _vm._e(),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-md-6" },
                [
                  _c("h3", [_vm._v("Total responses")]),
                  _vm._v(" "),
                  _c("chartjs-chart", {
                    attrs: {
                      id: _vm.id + "-chart-avg",
                      type: _vm.chartType,
                      data: _vm.averageChartData,
                      options: _vm.chartOptions
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", { staticClass: "containing-label" }, [
                  _vm._v("\n\t\t\t\t\tChart type\n\t\t\t\t\t"),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.chartType,
                          expression: "chartType"
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
                          _vm.chartType = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    _vm._l(_vm.chartTypes, function(type) {
                      return _c("option", { domProps: { value: type } }, [
                        _vm._v(
                          "\n\t\t\t\t\t\t\t" +
                            _vm._s(_vm.camelCaseToWords(type)) +
                            "\n\t\t\t\t\t\t"
                        )
                      ])
                    })
                  )
                ])
              ])
            ])
          : _vm._e(),
        _vm._v(" "),
        _vm.canScoreQuestion &&
        _vm.scoreQuestion &&
        _vm.valuesForAllOptions &&
        (_vm.totalAverageScore || _vm.subjectAverageScore)
          ? _c("div", { staticClass: "scores-container" }, [
              _vm.totalAverageScore
                ? _c("div", { staticClass: "score-container" }, [
                    _c("small", [_vm._v("Total average")]),
                    _vm._v(" "),
                    _c("span", { staticClass: "score" }, [
                      _vm._v(
                        "\n\t\t\t\t\t" +
                          _vm._s(_vm.round(_vm.totalAverageScore, 2)) +
                          "\n\t\t\t\t"
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.subjectAverageScore
                ? _c("div", { staticClass: "score-container" }, [
                    _c("small", [_vm._v("Subject average")]),
                    _vm._v(" "),
                    _c("span", { staticClass: "score" }, [
                      _vm._v(
                        "\n\t\t\t\t\t" +
                          _vm._s(_vm.round(_vm.subjectAverageScore, 2)) +
                          "\n\t\t\t\t"
                      )
                    ])
                  ])
                : _vm._e(),
              _vm._v(" "),
              _vm.subjectStandardDev
                ? _c("div", { staticClass: "score-container" }, [
                    _c("small", [_vm._v("Subject standard deviation")]),
                    _vm._v(" "),
                    _c("span", { staticClass: "score" }, [
                      _vm._v(
                        "\n\t\t\t\t\t" +
                          _vm._s(_vm.round(_vm.subjectStandardDev, 2)) +
                          "\n\t\t\t\t"
                      )
                    ])
                  ])
                : _vm._e()
            ])
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "question-footer panel-footer" }, [
        _c(
          "div",
          { staticClass: "question-description-toggle" },
          [
            _c(
              "show-hide-button",
              {
                staticClass: "btn btn-info",
                attrs: { value: _vm.hide },
                on: {
                  input: function($event) {
                    _vm.$emit("hide", arguments[0])
                  }
                }
              },
              [
                _c("template", { attrs: { slot: "glyph" }, slot: "glyph" }),
                _vm._v(" "),
                _c("template", { attrs: { slot: "true" }, slot: "true" }, [
                  _vm._v("\n\t\t\t\t\tShow\n\t\t\t\t")
                ]),
                _vm._v(" "),
                _c("template", { attrs: { slot: "false" }, slot: "false" }, [
                  _vm._v("\n\t\t\t\t\tHide\n\t\t\t\t")
                ]),
                _vm._v("\n\n\t\t\t\tquestion in PDF\n\t\t\t")
              ],
              2
            ),
            _vm._v(" "),
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
                  [
                    _c("template", { attrs: { slot: "true" }, slot: "true" }, [
                      _c("span", {
                        staticClass: "glyphicon glyphicon-zoom-out"
                      }),
                      _vm._v("\n\t\t\t\t\tHide\n\t\t\t\t")
                    ]),
                    _vm._v(" "),
                    _c(
                      "template",
                      { attrs: { slot: "false" }, slot: "false" },
                      [
                        _c("span", {
                          staticClass: "glyphicon glyphicon-zoom-in"
                        }),
                        _vm._v("\n\t\t\t\t\tShow\n\t\t\t\t")
                      ]
                    ),
                    _vm._v("\n\n\t\t\t\tdescriptions\n\n\t\t\t\t"),
                    _c("template", { attrs: { slot: "glyph" }, slot: "glyph" })
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.options
              ? _c(
                  "show-hide-button",
                  {
                    staticClass: "btn btn-info",
                    model: {
                      value: _vm.showChart,
                      callback: function($$v) {
                        _vm.showChart = $$v
                      },
                      expression: "showChart"
                    }
                  },
                  [
                    _c("span", {
                      staticClass: "glyphicon glyphicon-stats",
                      attrs: { slot: "left-glyph" },
                      slot: "left-glyph"
                    }),
                    _vm._v("\n\n\t\t\t\tchart\n\n\t\t\t\t"),
                    _c("template", { attrs: { slot: "glyph" }, slot: "glyph" })
                  ],
                  2
                )
              : _vm._e(),
            _vm._v(" "),
            _vm.canScoreQuestion
              ? _c(
                  "show-hide-button",
                  {
                    staticClass: "btn btn-info",
                    model: {
                      value: _vm.showScoreOptions,
                      callback: function($$v) {
                        _vm.showScoreOptions = $$v
                      },
                      expression: "showScoreOptions"
                    }
                  },
                  [_vm._v("\n\t\t\t\tscore options\n\t\t\t")]
                )
              : _vm._e()
          ],
          1
        ),
        _vm._v(" "),
        _vm.canScoreQuestion && _vm.showScoreOptions
          ? _c("div", { staticClass: "row score-options-row" }, [
              _c("div", { staticClass: "panel panel-default" }, [
                _c("div", { staticClass: "panel-heading" }, [
                  _c("div", { staticClass: "row" }, [
                    _c("label", [
                      _c("input", {
                        attrs: { type: "checkbox" },
                        domProps: { checked: _vm.scoreQuestion },
                        on: {
                          change: function($event) {
                            _vm.$emit("score-question", $event.target.checked)
                          }
                        }
                      }),
                      _vm._v("\n\t\t\t\t\t\t\tCompute scores\n\t\t\t\t\t\t")
                    ])
                  ])
                ]),
                _vm._v(" "),
                _vm.scoreQuestion
                  ? _c("div", { staticClass: "panel-body" }, [
                      _vm.questionType === "radiononnumeric"
                        ? _c(
                            "div",
                            { staticClass: "row" },
                            [
                              _vm._v(
                                "\n\t\t\t\t\t\tQuestion values\n\t\t\t\t\t\t"
                              ),
                              _vm._l(_vm.options, function(option) {
                                return _c(
                                  "div",
                                  { staticClass: "form-horizontal" },
                                  [
                                    _c("span", { staticClass: "option-text" }, [
                                      _vm._v(
                                        "\n\t\t\t\t\t\t\t\t" +
                                          _vm._s(option.text) +
                                          "\n\t\t\t\t\t\t\t"
                                      )
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "col-sm-4" }, [
                                      _c("label", [
                                        _c("input", {
                                          attrs: { type: "checkbox" },
                                          domProps: {
                                            checked:
                                              _vm.disregardOption[option.value]
                                          },
                                          on: {
                                            change: function($event) {
                                              _vm.handleDisregardOptionChange(
                                                option,
                                                $event
                                              )
                                            }
                                          }
                                        }),
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\tDisregard responses\n\t\t\t\t\t\t\t\t"
                                        )
                                      ])
                                    ]),
                                    _vm._v(" "),
                                    _c("div", { staticClass: "col-sm-8" }, [
                                      _c(
                                        "label",
                                        { staticClass: "containing-label" },
                                        [
                                          _vm._v(
                                            "\n\t\t\t\t\t\t\t\t\tValue\n\t\t\t\t\t\t\t\t\t"
                                          ),
                                          _c("input", {
                                            staticClass: "form-control",
                                            attrs: {
                                              type: "number",
                                              disabled:
                                                _vm.disregardOption[
                                                  option.value
                                                ]
                                            },
                                            domProps: {
                                              value:
                                                _vm.customOptionValues[
                                                  option.value
                                                ]
                                            },
                                            on: {
                                              input: function($event) {
                                                _vm.handleCustomOptionValueChange(
                                                  option,
                                                  $event
                                                )
                                              }
                                            }
                                          })
                                        ]
                                      )
                                    ])
                                  ]
                                )
                              })
                            ],
                            2
                          )
                        : _vm._e()
                    ])
                  : _vm._e()
              ])
            ])
          : _vm._e()
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("th", [_vm._v("Evaluation")]),
      _vm._v(" "),
      _c("th", [_vm._v("Response")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-c791193a", esExports)
  }
}

/***/ }),
/* 593 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "container body-block" },
      [
        _c("h1", [_vm._v("Form report")]),
        _vm._v(" "),
        _c("start-end-date", {
          model: {
            value: _vm.dates,
            callback: function($$v) {
              _vm.dates = $$v
            },
            expression: "dates"
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "form-group" }, [
          _c(
            "label",
            { staticClass: "containing-label" },
            [
              _vm._v("\n\t\t\t\tForm\n\t\t\t\t"),
              _c("select-two", {
                staticClass: "form-control",
                attrs: { options: _vm.groupedForms },
                model: {
                  value: _vm.formId,
                  callback: function($$v) {
                    _vm.formId = $$v
                  },
                  expression: "formId"
                }
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
        }),
        _vm._v(" "),
        _c("div", { staticClass: "btn-lg-submit-container" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-lg btn-primary",
              attrs: { type: "button" },
              on: { click: _vm.runReport }
            },
            [_vm._v("\n\t\t\t\tRun report\n\t\t\t")]
          )
        ])
      ],
      1
    ),
    _vm._v(" "),
    _vm.report
      ? _c(
          "div",
          { staticClass: "container body-block" },
          [
            _c(
              "div",
              { staticClass: "report-evaluations" },
              [
                _vm.report.evals.length > 0
                  ? _c(
                      "bootstrap-alert",
                      { attrs: { type: "info" } },
                      [
                        _c("div", { staticClass: "row" }, [
                          _c("div", { staticClass: "col-md-8" }, [
                            _c("h2", [
                              _vm._v(
                                "\n\t\t\t\t\t\t\t" +
                                  _vm._s(_vm.report.evals.length) +
                                  " total form evaluations\n\t\t\t\t\t\t"
                              )
                            ])
                          ]),
                          _vm._v(" "),
                          _c(
                            "div",
                            { staticClass: "col-md-4 text-right" },
                            [
                              _c(
                                "show-hide-button",
                                {
                                  staticClass: "btn btn-info",
                                  model: {
                                    value: _vm.show.allEvals,
                                    callback: function($$v) {
                                      _vm.show.allEvals = $$v
                                    },
                                    expression: "show.allEvals"
                                  }
                                },
                                [_vm._v("\n\t\t\t\t\t\t\tall\n\t\t\t\t\t\t")]
                              )
                            ],
                            1
                          )
                        ]),
                        _vm._v(" "),
                        _vm.show.allEvals
                          ? _c("data-table", {
                              attrs: {
                                thead: _vm.evalsThead,
                                config: _vm.allEvalsConfig
                              }
                            })
                          : _vm._e()
                      ],
                      1
                    )
                  : _c("bootstrap-alert", {
                      attrs: {
                        type: "warning",
                        text:
                          "No evaluations found for " +
                          _vm.report.formContents.title +
                          " in report parameters."
                      }
                    }),
                _vm._v(" "),
                _c("section", [
                  _c("div", { staticClass: "form-horizontal" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("div", { staticClass: "col-sm-10" }, [
                        _c(
                          "label",
                          { staticClass: "containing-label" },
                          [
                            _vm._v("\n\t\t\t\t\t\t\t\tUser\n\t\t\t\t\t\t\t\t"),
                            _c(
                              "select-two",
                              {
                                staticClass: "form-control",
                                attrs: { options: _vm.groupedUsers },
                                model: {
                                  value: _vm.subjectId,
                                  callback: function($$v) {
                                    _vm.subjectId = $$v
                                  },
                                  expression: "subjectId"
                                }
                              },
                              [
                                _c("option", { attrs: { value: "" } }, [
                                  _vm._v("All")
                                ])
                              ]
                            )
                          ],
                          1
                        )
                      ]),
                      _vm._v(" "),
                      _c("div", { staticClass: "col-sm-2" }, [
                        _vm.subjectId
                          ? _c(
                              "button",
                              {
                                staticClass: "btn btn-default labelless-button",
                                attrs: { type: "button" },
                                on: {
                                  click: function($event) {
                                    _vm.subjectId = null
                                  }
                                }
                              },
                              [
                                _vm._v(
                                  "\n\t\t\t\t\t\t\t\tClear user\n\t\t\t\t\t\t\t"
                                )
                              ]
                            )
                          : _vm._e()
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _vm.subjectId
                    ? _c(
                        "section",
                        [
                          _vm.report.subjectEvals[_vm.subjectId] &&
                          _vm.report.subjectEvals[_vm.subjectId].length > 0
                            ? _c(
                                "bootstrap-alert",
                                { attrs: { type: "info" } },
                                [
                                  _c("div", { staticClass: "row" }, [
                                    _c("div", { staticClass: "col-md-8" }, [
                                      _c("h2", [
                                        _vm._v(
                                          "\n\t\t\t\t\t\t\t\t\t" +
                                            _vm._s(
                                              _vm.report.subjectEvals[
                                                _vm.subjectId
                                              ].length
                                            ) +
                                            "\n\t\t\t\t\t\t\t\t\t" +
                                            _vm._s(_vm.subject.full_name) +
                                            " evaluations\n\t\t\t\t\t\t\t\t"
                                        )
                                      ])
                                    ]),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      { staticClass: "col-md-4 text-right" },
                                      [
                                        _c(
                                          "show-hide-button",
                                          {
                                            staticClass: "btn btn-info",
                                            model: {
                                              value: _vm.show.subjectEvals,
                                              callback: function($$v) {
                                                _vm.show.subjectEvals = $$v
                                              },
                                              expression: "show.subjectEvals"
                                            }
                                          },
                                          [
                                            _vm._v(
                                              "\n\t\t\t\t\t\t\t\t\tall\n\t\t\t\t\t\t\t\t"
                                            )
                                          ]
                                        )
                                      ],
                                      1
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _vm.subjectEvals && _vm.show.subjectEvals
                                    ? _c("data-table", {
                                        attrs: {
                                          thead: _vm.evalsThead,
                                          data: _vm.subjectEvals,
                                          config: _vm.subjectEvalsConfig
                                        }
                                      })
                                    : _vm._e()
                                ],
                                1
                              )
                            : _c("bootstrap-alert", {
                                attrs: {
                                  type: "warning",
                                  text:
                                    "No evaluations found for " +
                                    _vm.subject.full_name +
                                    " in report parameters."
                                }
                              })
                        ],
                        1
                      )
                    : _vm._e()
                ])
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "text-center" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-default",
                  attrs: { type: "button" },
                  on: { click: _vm.runAllCsvReports }
                },
                [_vm._v("\n\t\t\t\tExport all to CSV\n\t\t\t")]
              )
            ]),
            _vm._v(" "),
            this.reportContents &&
            this.subjectId &&
            this.reportContents.items.length > 0
              ? _c("div", { staticClass: "panel panel-default" }, [
                  _c("div", { staticClass: "panel-body" }, [
                    _c("fieldset", [
                      _c("legend", [
                        _vm._v(
                          "\n\t\t\t\t\t\tEvaluation list style\n\t\t\t\t\t"
                        )
                      ]),
                      _vm._v(" "),
                      _c("label", [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.pdfOptions.evaluationListStyle,
                              expression: "pdfOptions.evaluationListStyle"
                            }
                          ],
                          attrs: { type: "radio", value: "details" },
                          domProps: {
                            checked: _vm._q(
                              _vm.pdfOptions.evaluationListStyle,
                              "details"
                            )
                          },
                          on: {
                            __c: function($event) {
                              _vm.pdfOptions.evaluationListStyle = "details"
                            }
                          }
                        }),
                        _vm._v("\n\t\t\t\t\t\tDetailed\n\t\t\t\t\t")
                      ]),
                      _vm._v(" "),
                      _c("label", [
                        _c("input", {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.pdfOptions.evaluationListStyle,
                              expression: "pdfOptions.evaluationListStyle"
                            }
                          ],
                          attrs: { type: "radio", value: "summary" },
                          domProps: {
                            checked: _vm._q(
                              _vm.pdfOptions.evaluationListStyle,
                              "summary"
                            )
                          },
                          on: {
                            __c: function($event) {
                              _vm.pdfOptions.evaluationListStyle = "summary"
                            }
                          }
                        }),
                        _vm._v("\n\t\t\t\t\t\tSummary\n\t\t\t\t\t")
                      ])
                    ]),
                    _vm._v(" "),
                    _c("div", { staticClass: "text-center" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-default",
                          attrs: { type: "button" },
                          on: { click: _vm.exportPdf }
                        },
                        [
                          _vm._v("\n\t\t\t\t\t\tExport PDF\n\t\t\t\t\t\t"),
                          _c("svg-icon", {
                            attrs: { src: "/img/icons/pdf.svg" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-default",
                          attrs: { type: "button" },
                          on: { click: _vm.runCsvReport }
                        },
                        [_vm._v("\n\t\t\t\t\t\tExport CSV\n\t\t\t\t\t")]
                      )
                    ])
                  ])
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm.reportContents.title
              ? _c("h2", { staticClass: "form-title" }, [
                  _vm._v(
                    "\n\t\t\t" + _vm._s(_vm.reportContents.title) + "\n\t\t"
                  )
                ])
              : _vm._e(),
            _vm._v(" "),
            _vm._l(_vm.reportQuestions, function(question, index) {
              return _c(
                "form-report-question",
                _vm._b(
                  {
                    key: index,
                    attrs: {
                      hide: _vm.hideQuestions[index],
                      "score-question": _vm.scoreQuestions[index],
                      "custom-option-values": _vm.customOptionValues[index],
                      "disregard-option": _vm.disregardOption[index]
                    },
                    on: {
                      hide: function($event) {
                        _vm.hideQuestion(index, arguments[0])
                      },
                      "score-question": function($event) {
                        _vm.scoreQuestion(index, arguments[0])
                      },
                      "custom-option": function($event) {
                        _vm.handleCustomOption(index, arguments[0])
                      },
                      "disregard-option": function($event) {
                        _vm.handleDisregardOption(index, arguments[0])
                      }
                    }
                  },
                  "form-report-question",
                  question,
                  false
                )
              )
            }),
            _vm._v(" "),
            _c("hr")
          ],
          2
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
    require("vue-hot-reload-api")      .rerender("data-v-70d4db5d", esExports)
  }
}

/***/ }),
/* 594 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Report_vue__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0416af0b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Report_vue__ = __webpack_require__(607);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Report_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0416af0b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Report_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/Needs/Report.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0416af0b", Component.options)
  } else {
    hotAPI.reload("data-v-0416af0b", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 595 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Evaluations_vue__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__TrainingLevelSelect_vue__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SelectTwo_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__EmailEditor_vue__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_6__modules_date_utils_js__["isoDateStringObject"])(Object(__WEBPACK_IMPORTED_MODULE_6__modules_date_utils_js__["currentQuarter"])()),
			trainingLevel: 'all',
			evalThreshold: 3,

			report: {
				evaluations: null,
				competencies: null,
				milestones: null
			}
		};
	},

	computed: {
		trainingLevels: function trainingLevels() {
			return [{
				id: 'all',
				text: 'All'
			}, {
				id: 'intern',
				text: 'Intern'
			}, {
				id: 'ca-1',
				text: 'CA-1'
			}, {
				id: 'ca-2',
				text: 'CA-2'
			}, {
				id: 'ca-3',
				text: 'CA-3'
			}, {
				id: 'fellow',
				text: 'Fellow'
			}];
		}
	},

	methods: {
		runEvalsReport: function runEvalsReport() {
			var _this = this;

			fetch('/report/needs/evaluations', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel,
					evalThreshold: this.evalThreshold
				})
			}).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response.statusText);
			}).then(function (evaluations) {
				_this.report = Object.assign({}, _this.report, { evaluations: evaluations });
			});
		},
		runCompetenciesReport: function runCompetenciesReport() {
			var _this2 = this;

			fetch('/report/needs/competencies', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel
				})
			}).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response.statusText);
			}).then(function (competencies) {
				_this2.report = Object.assign({}, _this2.report, { competencies: competencies });
			});
		},
		runMilestonesReport: function runMilestonesReport() {
			var _this3 = this;

			fetch('/report/needs/milestones', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate,
					trainingLevel: this.trainingLevel
				})
			}).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response.statusText);
			}).then(function (milestones) {
				_this3.report = Object.assign({}, _this3.report, { milestones: milestones });
			});
		},

		groupUsers: __WEBPACK_IMPORTED_MODULE_5__modules_utils_js__["q" /* groupUsers */]
	},

	components: {
		NeedsEvaluations: __WEBPACK_IMPORTED_MODULE_0__Evaluations_vue__["a" /* default */],
		StartEndDate: __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__["a" /* default */],
		TrainingLevelSelect: __WEBPACK_IMPORTED_MODULE_2__TrainingLevelSelect_vue__["a" /* default */],
		SelectTwo: __WEBPACK_IMPORTED_MODULE_3__SelectTwo_vue__["a" /* default */],
		EmailEditor: __WEBPACK_IMPORTED_MODULE_4__EmailEditor_vue__["a" /* default */]
	}
});

/***/ }),
/* 596 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Evaluations_vue__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_358a2420_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Evaluations_vue__ = __webpack_require__(606);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(597)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-358a2420"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Evaluations_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_358a2420_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Evaluations_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/Needs/Evaluations.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-358a2420", Component.options)
  } else {
    hotAPI.reload("data-v-358a2420", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 597 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 598 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EvaluationListItem_vue__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__EmailEditor_vue__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__ = __webpack_require__(52);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		dates: {
			type: Object,
			required: true
		},
		evalThreshold: {
			required: true
		},
		trainees: {
			type: Array,
			required: true
		}
	},
	data: function data() {
		return {
			selectedUsers: [],
			markdownTemplate: 'Default',
			show: {
				emailEditor: false
			}
		};
	},

	computed: {
		traineeFields: function traineeFields() {
			return ['full_name', 'training_level'];
		},
		markdownTemplates: function markdownTemplates() {
			var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.dates.startDate).format('LL');
			var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.dates.endDate).format('LL');
			return new Map([['Default', 'Hello Dr. [[Name]],\n\nYou have [[# Completed]] evaluations completed for between ' + startDate + ' and ' + endDate + '.\n\n**You are required to have ' + this.evalThreshold + ' evaluations completed for this period.**\nPlease request at least [[# Needed]] more evaluations as soon as possible.\n\nIf you have any issues or questions about the system, please contact [' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + '](mailto:' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + ').\n\nThank you!'], ['CCC', 'Hello Dr. [[Name]],\n\nThe Clinical Competency Committee will be meeting soon to evaluate your performance from ' + startDate + ' to ' + endDate + '.\n\nYou currently have [[# Completed]] evaluations completed for this period;\nhowever, **you are required to have ' + this.evalThreshold + ' evaluations completed for this period.**\nPlease request at least [[# Needed]] more evaluations as soon as possible.\n\nIf you have any issues or questions about the system, please contact [' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + '](mailto:' + __WEBPACK_IMPORTED_MODULE_5__modules_constants_js__["a" /* ADMIN_EMAIL */] + ').\n\nThank you!']]);
		},
		emailReplacements: function emailReplacements() {
			return ['Name', '# Completed', '# Needed'];
		},
		additionalEmailFields: function additionalEmailFields() {
			return {
				evalsRequired: this.evalThreshold
			};
		}
	},
	methods: {
		groupUsers: __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["q" /* groupUsers */],
		getPossibleRecipient: function getPossibleRecipient(id) {
			return this.trainees.find(function (user) {
				return user.id === Number(id);
			});
		},
		getRecipientCompleted: function getRecipientCompleted(id) {
			var recipient = this.getPossibleRecipient(id);
			return recipient && recipient.subject_evaluations ? recipient.subject_evaluations.length : 0;
		},
		addNumCompleted: function addNumCompleted(to) {
			var _this = this;

			if (Array.isArray(to)) return to.map(function (id) {
				return {
					id: id,
					numCompleted: _this.getRecipientCompleted(id)
				};
			});else if (to.id) return {
				id: to.id,
				numCompleted: to.subject_evaluations.length
			};else if (!Number.isNaN(to)) return {
				id: to,
				numCompleted: this.getRecipientCompleted(to)
			};
		}
	},
	components: {
		EvaluationListItem: __WEBPACK_IMPORTED_MODULE_1__EvaluationListItem_vue__["a" /* default */],
		ComponentList: __WEBPACK_IMPORTED_MODULE_2__ComponentList_vue__["a" /* default */],
		EmailEditor: __WEBPACK_IMPORTED_MODULE_3__EmailEditor_vue__["a" /* default */]
	}
});

/***/ }),
/* 599 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 600 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__EvaluationDetailsListItem_vue__ = __webpack_require__(601);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_datatable_utils_js__ = __webpack_require__(26);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		user: {
			type: Object,
			required: true
		},
		evals: {
			type: String,
			default: 'subject_evaluations'
		},
		placeholderUserImagePath: {
			type: String,
			default: __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__["g" /* PLACEHOLDER_USER_IMAGE_PATH */]
		}
	},
	data: function data() {
		return {
			show: {
				evaluations: false,
				canceled: false
			}
		};
	},

	computed: {
		completeEvals: function completeEvals() {
			return this.user[this.evals].filter(function (evaluation) {
				return evaluation.status === 'complete';
			});
		},
		pendingEvals: function pendingEvals() {
			return this.user[this.evals].filter(function (evaluation) {
				return evaluation.status === 'pending';
			});
		},
		detailsEvals: function detailsEvals() {
			return this.show.canceled ? this.user[this.evals] : this.user[this.evals].filter(function (evaluation) {
				return ['complete', 'pending'].includes(evaluation.status);
			});
		}
	},
	methods: {
		renderTrainingLevel: __WEBPACK_IMPORTED_MODULE_4__modules_datatable_utils_js__["s" /* renderTrainingLevel */],
		ucfirst: __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["H" /* ucfirst */]
	},
	components: {
		EvaluationDetailsListItem: __WEBPACK_IMPORTED_MODULE_0__EvaluationDetailsListItem_vue__["a" /* default */],
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue__["a" /* default */]
	}
});

/***/ }),
/* 601 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationDetailsListItem_vue__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_358055d0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationDetailsListItem_vue__ = __webpack_require__(604);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(602)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-358055d0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_EvaluationDetailsListItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_358055d0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_EvaluationDetailsListItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/Needs/EvaluationDetailsListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-358055d0", Component.options)
  } else {
    hotAPI.reload("data-v-358055d0", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 602 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 603 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_datatable_utils_js__ = __webpack_require__(26);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		evaluation: {
			type: Object,
			required: true
		}
	},
	data: function data() {
		return {
			hovering: {
				evaluationDate: false,
				requestDate: false,
				completeDate: false
			}
		};
	},

	computed: {
		evaluationDate: function evaluationDate() {
			if (!this.evaluation.evaluation_date_start || !this.evaluation.evaluation_date_end) return '';

			return Object(__WEBPACK_IMPORTED_MODULE_2__modules_date_utils_js__["renderDateRange"])(this.evaluation.evaluation_date_start, this.evaluation.evaluation_date_end, !this.hovering.evaluationDate);
		},
		requestDate: function requestDate() {
			if (!this.evaluation.request_date) return '';

			return this.hovering.requestDate ? __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.evaluation.request_date).format('ll LT') : __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.evaluation.request_date).calendar();
		},
		completeDate: function completeDate() {
			if (!this.evaluation.complete_date) return '';

			return this.hovering.completeDate ? __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.evaluation.complete_date).format('ll LT') : __WEBPACK_IMPORTED_MODULE_0_moment___default()(this.evaluation.complete_date).calendar();
		}
	},
	methods: {
		renderEvaluationStatus: __WEBPACK_IMPORTED_MODULE_1__modules_datatable_utils_js__["l" /* renderEvaluationStatus */]
	}
});

/***/ }),
/* 604 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("li", { staticClass: "list-group-item" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-1" }, [
        _c("small", [_vm._v("#")]),
        _vm._v(" "),
        _c(
          "a",
          {
            attrs: {
              href: "/evaluation/" + _vm.evaluation.id,
              target: "_blank"
            }
          },
          [_vm._v("\n\t\t\t\t" + _vm._s(_vm.evaluation.id) + "\n\t\t\t")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-3" }, [
        _c("small", [_vm._v("Evaluator")]),
        _vm._v(" "),
        _c(
          "a",
          {
            attrs: {
              href: "/profile/" + _vm.evaluation.evaluator.id,
              target: "_blank"
            }
          },
          [
            _vm._v(
              "\n\t\t\t\t" +
                _vm._s(_vm.evaluation.evaluator.full_name) +
                "\n\t\t\t"
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-3" }, [
        _c("small", [_vm._v("Requested by")]),
        _vm._v(" "),
        _c(
          "a",
          {
            attrs: {
              href: "/profile/" + _vm.evaluation.requestor.id,
              target: "_blank"
            }
          },
          [
            _vm._v(
              "\n\t\t\t\t" +
                _vm._s(_vm.evaluation.requestor.full_name) +
                "\n\t\t\t"
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-3" }, [
        _c("small", [_vm._v("Form")]),
        _vm._v(" "),
        _c(
          "a",
          {
            attrs: {
              href: "/manage/forms/" + _vm.evaluation.form.id,
              target: "_blank"
            }
          },
          [
            _vm._v(
              "\n\t\t\t\t" + _vm._s(_vm.evaluation.form.title) + "\n\t\t\t"
            )
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", {
        staticClass: "col-md-2 text-right",
        domProps: {
          innerHTML: _vm._s(_vm.renderEvaluationStatus(_vm.evaluation.status))
        }
      })
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-offset-2 col-md-2" }, [
        _c("small", [_vm._v("Evaluation date")]),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "evaluation-date-field",
            on: {
              mouseenter: function($event) {
                _vm.hovering.evaluationDate = true
              },
              mouseleave: function($event) {
                _vm.hovering.evaluationDate = false
              }
            }
          },
          [_vm._v("\n\t\t\t\t" + _vm._s(_vm.evaluationDate) + "\n\t\t\t")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-offset-1 col-md-2" }, [
        _c("small", [_vm._v("Requested")]),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "evaluation-date-field",
            on: {
              mouseenter: function($event) {
                _vm.hovering.requestDate = true
              },
              mouseleave: function($event) {
                _vm.hovering.requestDate = false
              }
            }
          },
          [_vm._v("\n\t\t\t\t" + _vm._s(_vm.requestDate) + "\n\t\t\t")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-offset-1 col-md-2" }, [
        _c("small", [_vm._v("Completed")]),
        _vm._v(" "),
        _c(
          "span",
          {
            staticClass: "evaluation-date-field",
            on: {
              mouseenter: function($event) {
                _vm.hovering.completeDate = true
              },
              mouseleave: function($event) {
                _vm.hovering.completeDate = false
              }
            }
          },
          [_vm._v("\n\t\t\t\t" + _vm._s(_vm.completeDate) + "\n\t\t\t")]
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
    require("vue-hot-reload-api")      .rerender("data-v-358055d0", esExports)
  }
}

/***/ }),
/* 605 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("li", { staticClass: "evaluation-list-item" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-sm-4" }, [
        _c("img", {
          attrs: {
            height: "50",
            width: "50",
            alt: "",
            src: _vm.user.photo_path || _vm.placeholderUserImagePath
          }
        }),
        _vm._v(" "),
        _c(
          "a",
          {
            staticClass: "name",
            attrs: { href: "/profile/" + _vm.user.id, target: "_blank" }
          },
          [_vm._v("\n\t\t\t\t" + _vm._s(_vm.user.full_name) + "\n\t\t\t")]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-sm-2" }, [
        _vm._v(
          "\n\t\t\t" +
            _vm._s(
              _vm.user.type === "resident"
                ? _vm.renderTrainingLevel(_vm.user.training_level)
                : _vm.ucfirst(_vm.user.type)
            ) +
            "\n\t\t"
        )
      ]),
      _vm._v(" "),
      _vm.user.type === "resident"
        ? _c("section", { staticClass: "col-sm-2" }, [
            _c("div", [
              _c("b", [
                _vm._v(
                  "\n\t\t\t\t\t" +
                    _vm._s(_vm.completeEvals.length) +
                    "\n\t\t\t\t\tcomplete evaluations\n\t\t\t\t"
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", [
              _vm._v(
                "\n\t\t\t\t" +
                  _vm._s(_vm.pendingEvals.length) +
                  "\n\t\t\t\tpending evaluations\n\t\t\t"
              )
            ])
          ])
        : _c("section", { staticClass: "col-sm-2" }, [
            _c("div", [
              _c("b", [
                _vm._v(
                  "\n\t\t\t\t\t" +
                    _vm._s(_vm.pendingEvals.length) +
                    "\n\t\t\t\t\tpending evaluations\n\t\t\t\t"
                )
              ])
            ]),
            _vm._v(" "),
            _c("div", [
              _vm._v(
                "\n\t\t\t\t" +
                  _vm._s(_vm.completeEvals.length) +
                  "\n\t\t\t\tcomplete evaluations\n\t\t\t"
              )
            ])
          ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "col-sm-4 text-right" },
        [
          _vm.user[_vm.evals].length > 0
            ? _c(
                "show-hide-button",
                {
                  staticClass: "btn btn-xs btn-info",
                  model: {
                    value: _vm.show.evaluations,
                    callback: function($$v) {
                      _vm.show.evaluations = $$v
                    },
                    expression: "show.evaluations"
                  }
                },
                [_vm._v("\n\t\t\t\tevaluations\n\t\t\t")]
              )
            : _vm._e()
        ],
        1
      )
    ]),
    _vm._v(" "),
    _c(
      "section",
      {
        directives: [
          {
            name: "show",
            rawName: "v-show",
            value: _vm.show.evaluations,
            expression: "show.evaluations"
          }
        ],
        staticClass: "details"
      },
      [
        _c("h4", [_vm._v("Evaluations")]),
        _vm._v(" "),
        _c("label", [
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.show.canceled,
                expression: "show.canceled"
              }
            ],
            attrs: { type: "checkbox" },
            domProps: {
              checked: Array.isArray(_vm.show.canceled)
                ? _vm._i(_vm.show.canceled, null) > -1
                : _vm.show.canceled
            },
            on: {
              __c: function($event) {
                var $$a = _vm.show.canceled,
                  $$el = $event.target,
                  $$c = $$el.checked ? true : false
                if (Array.isArray($$a)) {
                  var $$v = null,
                    $$i = _vm._i($$a, $$v)
                  if ($$el.checked) {
                    $$i < 0 && (_vm.show.canceled = $$a.concat([$$v]))
                  } else {
                    $$i > -1 &&
                      (_vm.show.canceled = $$a
                        .slice(0, $$i)
                        .concat($$a.slice($$i + 1)))
                  }
                } else {
                  _vm.show.canceled = $$c
                }
              }
            }
          }),
          _vm._v("\n\t\t\tShow disabled and canceled\n\t\t")
        ]),
        _vm._v(" "),
        _c(
          "ul",
          { staticClass: "list-group" },
          _vm._l(_vm.detailsEvals, function(detailsEval) {
            return _c("evaluation-details-list-item", {
              key: detailsEval.id,
              attrs: { evaluation: detailsEval }
            })
          })
        )
      ]
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
    require("vue-hot-reload-api")      .rerender("data-v-fe5e41f8", esExports)
  }
}

/***/ }),
/* 606 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", [
    _c("h2", [_vm._v("Needs evaluations")]),
    _vm._v(" "),
    _vm.show.emailEditor
      ? _c(
          "div",
          { staticClass: "panel panel-default email-editor-container" },
          [
            _c(
              "div",
              { staticClass: "panel-body" },
              [
                _c("email-editor", {
                  attrs: {
                    from: "reminders",
                    target: "/emails/reminders",
                    title: "Send reminders",
                    "default-subject": "Please request evaluations!",
                    "default-to": _vm.selectedUsers,
                    "possible-recipients": _vm.trainees,
                    "default-body-markdown": _vm.markdownTemplates.get(
                      _vm.markdownTemplate
                    ),
                    "email-replacements": _vm.emailReplacements,
                    "additional-fields": _vm.additionalEmailFields,
                    "edit-to-on-send": _vm.addNumCompleted
                  },
                  on: {
                    close: function($event) {
                      _vm.show.emailEditor = false
                    }
                  }
                }),
                _vm._v(" "),
                _c("label", { staticClass: "containing-label" }, [
                  _vm._v("\n\t\t\t\tEmail template\n\t\t\t\t"),
                  _c(
                    "select",
                    {
                      directives: [
                        {
                          name: "model",
                          rawName: "v-model",
                          value: _vm.markdownTemplate,
                          expression: "markdownTemplate"
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
                          _vm.markdownTemplate = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        }
                      }
                    },
                    _vm._l(Array.from(_vm.markdownTemplates.keys()), function(
                      template
                    ) {
                      return _c("option", { domProps: { value: template } }, [
                        _vm._v(
                          "\n\t\t\t\t\t\t" + _vm._s(template) + "\n\t\t\t\t\t"
                        )
                      ])
                    })
                  )
                ])
              ],
              1
            )
          ]
        )
      : _c("div", { staticClass: "show-email-button-container" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-primary",
              attrs: { type: "button" },
              on: {
                click: function($event) {
                  _vm.show.emailEditor = true
                }
              }
            },
            [
              _c("span", { staticClass: "glyphicon glyphicon-pencil" }),
              _vm._v("\n\t\t\tCompose reminders\n\t\t")
            ]
          )
        ]),
    _vm._v(" "),
    _c(
      "section",
      [
        _c("component-list", {
          attrs: { items: _vm.trainees, fields: _vm.traineeFields },
          scopedSlots: _vm._u([
            {
              key: "default",
              fn: function(item) {
                return [_c("evaluation-list-item", { attrs: { user: item } })]
              }
            }
          ])
        })
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
    require("vue-hot-reload-api")      .rerender("data-v-358a2420", esExports)
  }
}

/***/ }),
/* 607 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "container body-block" },
      [
        _c("h1", [_vm._v("Needs evaluations")]),
        _vm._v(" "),
        _c("start-end-date", {
          model: {
            value: _vm.dates,
            callback: function($$v) {
              _vm.dates = $$v
            },
            expression: "dates"
          }
        }),
        _vm._v(" "),
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "form-group col-md-6" }, [
            _c(
              "label",
              { staticClass: "containing-label" },
              [
                _vm._v("\n\t\t\t\t\tTraining Level\n\t\t\t\t\t"),
                _c("training-level-select", {
                  model: {
                    value: _vm.trainingLevel,
                    callback: function($$v) {
                      _vm.trainingLevel = $$v
                    },
                    expression: "trainingLevel"
                  }
                })
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "form-group col-md-6" }, [
            _c("label", { staticClass: "containing-label" }, [
              _vm._v("\n\t\t\t\t\tEvaluation requirement\n\t\t\t\t\t"),
              _c(
                "select",
                {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.evalThreshold,
                      expression: "evalThreshold"
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
                      _vm.evalThreshold = $event.target.multiple
                        ? $$selectedVal
                        : $$selectedVal[0]
                    }
                  }
                },
                [
                  _c("option", { attrs: { value: "all" } }, [
                    _vm._v("Show all")
                  ]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "1" } }, [_vm._v("1")]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "3" } }, [_vm._v("3")]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "5" } }, [_vm._v("5")]),
                  _vm._v(" "),
                  _c("option", { attrs: { value: "10" } }, [_vm._v("10")])
                ]
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "btn-lg-submit-container" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-lg btn-primary labelless-button",
              attrs: { type: "button" },
              on: { click: _vm.runEvalsReport }
            },
            [_vm._v("\n\t\t\t\tRun report\n\t\t\t")]
          )
        ])
      ],
      1
    ),
    _vm._v(" "),
    _vm.report.evaluations
      ? _c(
          "div",
          { staticClass: "container body-block" },
          [
            _c("needs-evaluations", {
              attrs: {
                trainees: _vm.report.evaluations,
                dates: _vm.dates,
                evalThreshold: _vm.evalThreshold
              }
            })
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
    require("vue-hot-reload-api")      .rerender("data-v-0416af0b", esExports)
  }
}

/***/ }),
/* 608 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PendingEvalsReport_vue__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38b94699_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PendingEvalsReport_vue__ = __webpack_require__(610);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_PendingEvalsReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_38b94699_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_PendingEvalsReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/PendingEvalsReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38b94699", Component.options)
  } else {
    hotAPI.reload("data-v-38b94699", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 609 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Needs_EvaluationListItem_vue__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_date_utils_js__ = __webpack_require__(10);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_5__modules_date_utils_js__["isoDateStringObject"])(Object(__WEBPACK_IMPORTED_MODULE_5__modules_date_utils_js__["currentQuarter"])()),
			report: null,

			alerts: []
		};
	},

	computed: {
		userFields: function userFields() {
			return ['full_name'];
		}
	},
	methods: {
		runReport: function runReport() {
			var _this = this;

			fetch('/report/pending-requests', {
				method: 'POST',
				headers: Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin',
				body: JSON.stringify({
					startDate: this.dates.startDate,
					endDate: this.dates.endDate
				})
			}).then(function (response) {
				if (response.ok) return response.json();

				throw new Error();
			}).then(function (report) {
				_this.report = report;
			}).catch(function (err) {
				_this.alerts.push({
					type: 'error',
					html: '<b>Error</b>: There was a problem running the report.'
				});
				console.error(err);
			});
		}
	},
	components: {
		EvaluationListItem: __WEBPACK_IMPORTED_MODULE_0__Needs_EvaluationListItem_vue__["a" /* default */],
		StartEndDate: __WEBPACK_IMPORTED_MODULE_1__StartEndDate_vue__["a" /* default */],
		AlertList: __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__["a" /* default */],
		ComponentList: __WEBPACK_IMPORTED_MODULE_3__ComponentList_vue__["a" /* default */]
	}
});

/***/ }),
/* 610 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "container body-block" },
      [
        _c("h1", [_vm._v("Pending evaluation requests")]),
        _vm._v(" "),
        _c("start-end-date", {
          model: {
            value: _vm.dates,
            callback: function($$v) {
              _vm.dates = $$v
            },
            expression: "dates"
          }
        }),
        _vm._v(" "),
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
        _c("div", { staticClass: "btn-lg-submit-container" }, [
          _c(
            "button",
            {
              staticClass: "btn btn-lg btn-primary labelless-button",
              attrs: { type: "button" },
              on: { click: _vm.runReport }
            },
            [_vm._v("\n\t\t\t\tRun report\n\t\t\t")]
          )
        ])
      ],
      1
    ),
    _vm._v(" "),
    _vm.report
      ? _c("div", { staticClass: "container body-block" }, [
          _c(
            "section",
            [
              _c("component-list", {
                attrs: { items: _vm.report, fields: _vm.userFields },
                scopedSlots: _vm._u([
                  {
                    key: "default",
                    fn: function(item) {
                      return [
                        _c("evaluation-list-item", {
                          attrs: { user: item, evals: "evaluator_evaluations" }
                        })
                      ]
                    }
                  }
                ])
              })
            ],
            1
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
    require("vue-hot-reload-api")      .rerender("data-v-38b94699", esExports)
  }
}

/***/ }),
/* 611 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FacultyMeritReport_vue__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a9e1fc4c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FacultyMeritReport_vue__ = __webpack_require__(614);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(612)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a9e1fc4c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FacultyMeritReport_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a9e1fc4c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FacultyMeritReport_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FacultyMeritReport.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a9e1fc4c", Component.options)
  } else {
    hotAPI.reload("data-v-a9e1fc4c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 612 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 613 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
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
		reportTypes: {
			type: Array,
			required: true
		}
	},

	methods: {
		kebabCaseToWords: __WEBPACK_IMPORTED_MODULE_0__modules_utils_js__["u" /* kebabCaseToWords */]
	}
});

/***/ }),
/* 614 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "container body-block reports-selector" }, [
        _c(
          "fieldset",
          [
            _c("legend", [_vm._v("\n\t\t\t\tMerit report type\n\t\t\t")]),
            _vm._v(" "),
            _vm._l(_vm.reportTypes, function(type) {
              return _c(
                "router-link",
                {
                  key: type,
                  staticClass: "report-type-option btn btn-default",
                  attrs: {
                    to: "/faculty-merit/" + type,
                    "active-class": "disabled"
                  }
                },
                [
                  _vm._v(
                    "\n\t\t\t\t" +
                      _vm._s(_vm.kebabCaseToWords(type)) +
                      "\n\t\t\t"
                  )
                ]
              )
            })
          ],
          2
        )
      ]),
      _vm._v(" "),
      _c("router-view")
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
    require("vue-hot-reload-api")      .rerender("data-v-a9e1fc4c", esExports)
  }
}

/***/ }),
/* 615 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Publications_vue__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_48a62180_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Publications_vue__ = __webpack_require__(624);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Publications_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_48a62180_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Publications_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FacultyMerit/Publications.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48a62180", Component.options)
  } else {
    hotAPI.reload("data-v-48a62180", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 616 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UsersWithMeritReport_vue__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MeritCompensation_UserWithMeritPublicationsListItem_vue__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_merits_faculty_merit_index_js__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_report_utils_js__ = __webpack_require__(38);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	extends: __WEBPACK_IMPORTED_MODULE_1__UsersWithMeritReport_vue__["a" /* default */],

	methods: {
		getCsv: function getCsv() {
			if (!this.usersWithMerits) return;

			var csv = [['Name', 'Total'].concat(_toConsumableArray(Object(__WEBPACK_IMPORTED_MODULE_3__modules_merits_faculty_merit_index_js__["a" /* getAllPublicationTypes */])(this.usersWithMerits[0].merit_reports[0])))];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.usersWithMerit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var userWithMerit = _step.value;

					var row = [];
					var pubsByType = Array.from(Object(__WEBPACK_IMPORTED_MODULE_3__modules_merits_faculty_merit_index_js__["b" /* getFacultyPublicationsByType */])(userWithMerit.report, false).values()).map(function (pubs) {
						return pubs.length;
					});
					var totalPubs = Array.from(Object(__WEBPACK_IMPORTED_MODULE_3__modules_merits_faculty_merit_index_js__["b" /* getFacultyPublicationsByType */])(userWithMerit.report).values()).reduce(function (acc, pubs) {
						return acc + pubs.length;
					}, 0);

					row.push.apply(row, [userWithMerit.full_name, totalPubs].concat(_toConsumableArray(pubsByType)));

					csv.push(row);
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

			Object(__WEBPACK_IMPORTED_MODULE_4__modules_report_utils_js__["g" /* downloadCsv */])(csv, 'Publications', this.dates);
		}
	},

	components: {
		ComponentList: __WEBPACK_IMPORTED_MODULE_0__ComponentList_vue__["a" /* default */],
		UserWithMeritPublicationsListItem: __WEBPACK_IMPORTED_MODULE_2__MeritCompensation_UserWithMeritPublicationsListItem_vue__["a" /* default */]
	}
});

/***/ }),
/* 617 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 618 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AcademicYearSelector_vue__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ComponentList_vue__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_mixins_HasAlerts_js__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_utils_js__ = __webpack_require__(1);











/* harmony default export */ __webpack_exports__["a"] = ({
	mixins: [__WEBPACK_IMPORTED_MODULE_2__vue_mixins_HasAlerts_js__["a" /* default */]],
	data: function data() {
		return {
			dates: Object(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateStringObject"])(Object(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["lastYear"])()),
			usersWithMerits: null
		};
	},
	mounted: function mounted() {
		this.fetchUsersWithMerits();
	},


	computed: {
		meritsReleaseDate: function meritsReleaseDate() {
			return __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__["d" /* FEATURE_RELEASE_DATES */].FACULTY_MERIT;
		},
		usersWithMerit: function usersWithMerit() {
			return Object(__WEBPACK_IMPORTED_MODULE_5__modules_merit_utils_js__["e" /* getUsersWithCompleteMerit */])(this.usersWithMerits);
		}
	},

	watch: {
		dates: function dates() {
			this.fetchUsersWithMerits();
		}
	},

	methods: {
		fetchUsersWithMerits: function fetchUsersWithMerits() {
			var _this = this;

			var q = $.param(this.dates);

			fetch('/merits/by-user?' + q, {
				headers: Object(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["n" /* getFetchHeaders */])(),
				credentials: 'same-origin'
			}).then(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["t" /* jsonOrThrow */]).then(function (usersWithMerits) {
				_this.usersWithMerits = usersWithMerits;
			}).catch(function (err) {
				console.error(err);
				_this.alerts.push({
					type: 'error',
					html: '<strong>Error:</strong> There was a problem fetching merits'
				});
			});
		}
	},

	components: {
		AcademicYearSelector: __WEBPACK_IMPORTED_MODULE_0__AcademicYearSelector_vue__["a" /* default */],
		ComponentList: __WEBPACK_IMPORTED_MODULE_1__ComponentList_vue__["a" /* default */]
	}
});

/***/ }),
/* 619 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserWithMeritPublicationsListItem_vue__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_440a77f7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserWithMeritPublicationsListItem_vue__ = __webpack_require__(623);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(620)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-440a77f7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserWithMeritPublicationsListItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_440a77f7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserWithMeritPublicationsListItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/UserWithMeritPublicationsListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-440a77f7", Component.options)
  } else {
    hotAPI.reload("data-v-440a77f7", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 620 */
/***/ (function(module, exports) {

throw new Error("Module build failed: ModuleBuildError: Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/css-loader/lib/css-base.js'\n    at runLoaders (/home/mischka/projects/residentprogram/node_modules/webpack/lib/NormalModule.js:195:19)\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:364:11\n    at /home/mischka/projects/residentprogram/node_modules/loader-runner/lib/LoaderRunner.js:200:19\n    at /home/mischka/projects/residentprogram/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:70:14\n    at _combinedTickCallback (internal/process/next_tick.js:131:7)\n    at process._tickCallback (internal/process/next_tick.js:180:9)");

/***/ }),
/* 621 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_merits_faculty_merit_index_js__ = __webpack_require__(223);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		full_name: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		}
	},
	data: function data() {
		return {};
	},


	computed: {
		facultyPublicationsByType: function facultyPublicationsByType() {
			return Array.from(Object(__WEBPACK_IMPORTED_MODULE_0__modules_merits_faculty_merit_index_js__["b" /* getFacultyPublicationsByType */])(this.report).entries());
		},
		totalFacultyPublications: function totalFacultyPublications() {
			// eslint-disable-next-line no-unused-vars
			return this.facultyPublicationsByType.reduce(function (acc, _ref) {
				var _ref2 = _slicedToArray(_ref, 2),
				    _ = _ref2[0],
				    publications = _ref2[1];

				return acc + publications.length;
			}, 0);
		}
	},

	methods: {
		getCsvRow: function getCsvRow() {
			return [this.full_name].concat(
			// eslint-disable-next-line no-unused-vars
			this.facultyPublicationsByType.map(function (_ref3) {
				var _ref4 = _slicedToArray(_ref3, 2),
				    _ = _ref4[0],
				    publications = _ref4[1];

				return publications.length;
			})).concat([this.totalFacultyPublications]);
		}
	}
});

/***/ }),
/* 622 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getAllPublicationTypes;
/* harmony export (immutable) */ __webpack_exports__["b"] = getFacultyPublicationsByType;
/* unused harmony export getAllPublications */
/* unused harmony export getPublicationSection */
/* harmony export (immutable) */ __webpack_exports__["c"] = getScholarlyActivity;
/* unused harmony export getPubMedIds */
/* unused harmony export getPubMedIdFromLink */
/* unused harmony export getConferencePresentations */
/* unused harmony export getOtherPresentations */
/* unused harmony export getChaptersTextbooks */
/* unused harmony export getGrants */
/* unused harmony export getLeadershipPeerReviewRoles */
/* unused harmony export getTeachingFormalCourses */
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function getAllPublicationTypes(meritReport) {
	var publicationSection = getPublicationSection(meritReport);

	var types = [];

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = publicationSection.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var publicationItem = _step.value;

			types.push(publicationItem.text);
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

	return types;
}

function getFacultyPublicationsByType(meritReport) {
	var checkedOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var publicationSection = getPublicationSection(meritReport);

	var publications = new Map();

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = publicationSection.items[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var publicationItem = _step2.value;

			try {
				if (checkedOnly && !publicationItem.checked) continue;

				var items = 'items' in publicationItem.questions[0] ? publicationItem.questions[0].items : [];

				publications.set(publicationItem.text, JSON.parse(JSON.stringify(items)));
			} catch (e) {
				console.error('Error getting publications, ignoring: ', publicationItem, e);
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

	return publications;
}

function getAllPublications(meritReport) {
	var publicationSection = getPublicationSection(meritReport);

	var publications = [];

	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = publicationSection.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var pubType = _step3.value;

			if (pubType.checked) {
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = pubType.questions[0].items[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var pubItem = _step4.value;

						publications.push(pubItem);
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

	return publications;
}

function getPublicationSection(meritReport) {
	return meritReport.report.pages[2].items[0];
}

function getScholarlyActivity(meritReport, fullName) {
	/*
  * HEADER:
 	 *	Faculty Member, PMID 1, PMID 2, PMID 3, PMID 4,
 	 *	Conference Presentations (#), Other Presentations (#),
 	 *	Chapters / Textbooks (#), Grant Leadership (#),
 	 *	Leadership or Peer-Review Role (Y/N), Teaching Formal Courses (Y/N)
  */

	return [fullName].concat(_toConsumableArray(getPubMedIds(meritReport)), [getConferencePresentations(meritReport), getOtherPresentations(meritReport), getChaptersTextbooks(meritReport), getGrants(meritReport), getLeadershipPeerReviewRoles(meritReport), getTeachingFormalCourses(meritReport)]);
}

function getPubMedIds(meritReport) {
	// FIXME: Translate links to PMIDs
	/*
  * Pub Med Ids (assigned by PubMed) for articles published in the previous
  * academic year. List up to 4. Pub Med ID (PMID) is an unique number
  * assigned to each PubMed record. This is generally an 8 character numeric
  * number. The PubMed Central reference number (PMCID) is different from the
  * PubMed reference number (PMID). PubMed Central is an index of full-text
  * papers, while PubMed is an index of abstracts.
  */

	var pubMedIds = Array(4).fill('');

	try {
		var publicationsWithLinks = getAllPublications(meritReport).filter(function (pub) {
			return getPubMedIdFromLink(pub.link);
		});
		// Up to 4 PMIDs (PubMed IDs)
		for (var i = 0; i < pubMedIds.length; i++) {
			if (publicationsWithLinks.length > i && publicationsWithLinks[i]) {
				pubMedIds[i] = getPubMedIdFromLink(publicationsWithLinks[i].link);
			}
		}
	} catch (e) {
		console.error('Error getting PubMed IDs: ', e);
	}

	return pubMedIds;
}

function getPubMedIdFromLink(link) {
	// FIXME: This isn't very good.
	if (!link) return;

	link = link.toLowerCase();

	var prefixes = ['www.ncbi.nlm.nih.gov/pubmed/', 'pmid:', 'pmid', 'pubmed:', 'pubmed'];
	var _iteratorNormalCompletion5 = true;
	var _didIteratorError5 = false;
	var _iteratorError5 = undefined;

	try {
		for (var _iterator5 = prefixes[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
			var prefix = _step5.value;

			if (link.includes(prefix)) {
				var pubMedId = parseInt(link.substring(link.indexOf(prefix) + prefix.length), 10);

				if (!Number.isNaN(pubMedId)) return pubMedId;
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

function getConferencePresentations(meritReport) {
	/*
  * Number of abstracts, posters, and presentations given at international,
  * national, or regional meetings in the previous academic year
  */

	var conferencePresentations = 0;

	try {
		var educationOutsideMCWSection = meritReport.report.pages[1].items[2];
		var conferenceIndexes = [0, // ASA refresher course
		2, // ASA panel presentation
		3, // ASA problem-based learning discussion
		4, // Other national society invited lecture
		5 // WSA lecture
		];

		var _iteratorNormalCompletion6 = true;
		var _didIteratorError6 = false;
		var _iteratorError6 = undefined;

		try {
			for (var _iterator6 = conferenceIndexes[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
				var conferenceIndex = _step6.value;

				var conferenceSection = educationOutsideMCWSection.items[conferenceIndex];
				if (conferenceSection.checked) {
					conferencePresentations += conferenceSection.questions[0].items.length;
				}
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
	} catch (e) {
		console.error('Error getting conference presentations: ', e);
	}

	return conferencePresentations;
}

function getOtherPresentations(meritReport) {
	/*
  * Number of other presentations given (grand rounds, invited professorships),
  * materials developed (such as computer-based modules), or work presented
  * in non-peer review publications in the previous academic year.
  * Articles without PMIDs should be counted in this section.
  * This will include publication which are peer reviewed but not recognized
  * by the National Library of Medicine.
  */

	var otherPresentations = 0;

	try {
		// Presentations without PubMed IDs
		var publicationsWithoutLinks = getAllPublications(meritReport).filter(function (pub) {
			return !getPubMedIdFromLink(pub.link);
		});
		otherPresentations += publicationsWithoutLinks.length;

		// Education - Medical College / Hospital
		var educationInsideMCWSection = meritReport.report.pages[1].items[1];
		var _iteratorNormalCompletion7 = true;
		var _didIteratorError7 = false;
		var _iteratorError7 = undefined;

		try {
			for (var _iterator7 = educationInsideMCWSection.items[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
				var presentationType = _step7.value;

				if (presentationType.checked) otherPresentations += presentationType.questions[0].items.length;
			}

			// Education - Outside MCW
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

		var educationOutsideMCWSection = meritReport.report.pages[1].items[2];
		var nonConferenceIndexes = [1, // Visiting professor
		6 // Local community group
		];

		var _iteratorNormalCompletion8 = true;
		var _didIteratorError8 = false;
		var _iteratorError8 = undefined;

		try {
			for (var _iterator8 = nonConferenceIndexes[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
				var conferenceIndex = _step8.value;

				var conferenceSection = educationOutsideMCWSection.items[conferenceIndex];
				if (conferenceSection.checked) {
					otherPresentations += conferenceSection.questions[0].items.length;
				}
			}
		} catch (err) {
			_didIteratorError8 = true;
			_iteratorError8 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion8 && _iterator8.return) {
					_iterator8.return();
				}
			} finally {
				if (_didIteratorError8) {
					throw _iteratorError8;
				}
			}
		}
	} catch (e) {
		console.error('Error getting other presentations: ', e);
	}

	return otherPresentations;
}

function getChaptersTextbooks(meritReport) {
	/*
  * Number of chapters or textbooks published in the previous academic year
  */

	var chaptersTextbooks = 0;

	try {
		var publicationSection = getPublicationSection(meritReport);
		// Book / Text, First Ed.
		if (publicationSection.items[0].checked) chaptersTextbooks += publicationSection.items[0].questions[0].items.length;

		// Book / Text, Revised Ed.
		if (publicationSection.items[2].checked) chaptersTextbooks += publicationSection.items[2].questions[0].items.length;

		// Book Chapter Author
		if (publicationSection.items[4].checked) chaptersTextbooks += publicationSection.items[4].questions[0].items.length;
	} catch (e) {
		console.error('Error getting chapters/textbooks: ', e);
	}

	return chaptersTextbooks;
}

function getGrants(meritReport) {
	/*
  * Number of grants for which faculty member had a leadership role
  * (PI, Co-PI, or site director) in the previous academic year
  */

	var grants = 0;

	try {
		var grantSection = meritReport.report.pages[2].items[1].items[1];
		var _iteratorNormalCompletion9 = true;
		var _didIteratorError9 = false;
		var _iteratorError9 = undefined;

		try {
			for (var _iterator9 = grantSection.items[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
				var grantType = _step9.value;

				if (grantType.checked) grants += grantType.questions[0].items.length;
			}
		} catch (err) {
			_didIteratorError9 = true;
			_iteratorError9 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion9 && _iterator9.return) {
					_iterator9.return();
				}
			} finally {
				if (_didIteratorError9) {
					throw _iteratorError9;
				}
			}
		}
	} catch (e) {
		console.error('Error getting grants: ', e);
	}

	return grants;
}

function getLeadershipPeerReviewRoles(meritReport) {
	/*
  * Had an active leadership role (such as serving on committees or
  * governing boards) in national medical organizations or served as
  * reviewer or editorial board member for a peer-reviewed journal in the
  * previous academic year
  */

	var leadershipPeerReviewRoles = 0;

	try {
		var specialtyOrgSection = meritReport.report.pages[3].items[0];

		// ASA
		var asa = specialtyOrgSection.items[0];
		if (asa.checked && asa.questions[0].options.some(function (option) {
			return option.checked && ['board-of-directors', 'committee-chair', 'committee-member'].includes(option.value);
		})) leadershipPeerReviewRoles++;

		// WSA
		var wsa = specialtyOrgSection.items[1];
		if (wsa.checked && wsa.questions[0].options.some(function (option) {
			return option.checked && ['board-of-directors', 'officer', 'committee-chair', 'committee-member'].includes(option.value);
		})) leadershipPeerReviewRoles++;

		// ABA
		// I'm not sure if this counts

		// SEA
		var sea = specialtyOrgSection.items[3];
		// Only options are committee chair and member
		if (sea.checked) leadershipPeerReviewRoles++;

		// SCA
		var sca = specialtyOrgSection.items[4];
		// Only options are committee chair and member
		if (sca.checked) leadershipPeerReviewRoles++;

		// SOAP
		var soap = specialtyOrgSection.items[5];
		// Only options are committee chair and member
		if (soap.checked) leadershipPeerReviewRoles++;

		// Other
		var other = specialtyOrgSection.items[6];
		if (other.checked) {
			leadershipPeerReviewRoles += other.questions[0].items.length;
		}

		// Ad-hoc Article Reviewer
		var articleReviewer = meritReport.report.pages[3].items[1].items[1];
		if (articleReviewer.checked) leadershipPeerReviewRoles += articleReviewer.questions[0].items.length;

		// Journal Editorial Board
		var editorialBoard = meritReport.report.pages[3].items[1].items[9];
		if (editorialBoard.checked) leadershipPeerReviewRoles += editorialBoard.questions[0].items.length;
	} catch (e) {
		console.error('Error getting leadership/peer-review roles: ', e);
	}

	return leadershipPeerReviewRoles > 0 ? 'Y' : 'N';
}

function getTeachingFormalCourses() {
	/*
  *  In the previous academic year, held responsibility for seminars,
  *  conference series, or course coordination (such as arrangement of
  *  presentations and speakers, organization of materials, assessment of
  *  participants' performance) for any didactic training within the
  *  sponsoring institution or program. This includes training modules for
  *  medical students, residents, fellows and other health professionals.
  *  This does not include single presentations such as individual lectures
  *  or conferences.
  */

	var teachingFormalCourses = 'N';

	try {
		// TODO
	} catch (e) {
		console.error('Error getting teaching formal courses: ', e);
	}

	return teachingFormalCourses;
}

/***/ }),
/* 623 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "user-with-publications-list-item" }, [
    _c("div", { staticClass: "panel panel-default" }, [
      _c("div", { staticClass: "panel-body" }, [
        _c("div", { staticClass: "row" }, [
          _c("div", { staticClass: "col-sm-4" }, [
            _c("h2", [_vm._v(_vm._s(_vm.full_name))]),
            _vm._v(" "),
            _c("div", { staticClass: "report-summary" }, [
              _c("div", { staticClass: "total" }, [
                _c("small", [_vm._v("Publications")]),
                _vm._v(
                  "\n\t\t\t\t\t\t\t" +
                    _vm._s(_vm.totalFacultyPublications) +
                    "\n\t\t\t\t\t\t"
                )
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "col-sm-8" }, [
            _c(
              "ul",
              { staticClass: "publication-list" },
              _vm._l(_vm.facultyPublicationsByType, function(ref) {
                var pubType = ref[0]
                var publications = ref[1]
                return _c("li", { staticClass: "publication-list-item" }, [
                  _c("h3", { staticClass: "publication-title row" }, [
                    _c("span", { staticClass: "publication-type col-sm-10" }, [
                      _vm._v(
                        "\n\t\t\t\t\t\t\t\t\t" +
                          _vm._s(pubType) +
                          "\n\t\t\t\t\t\t\t\t"
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "span",
                      { staticClass: "publication-count col-sm-2 text-right" },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t\t\t\t\t" +
                            _vm._s(publications.length) +
                            "\n\t\t\t\t\t\t\t\t"
                        )
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "ol",
                    _vm._l(publications, function(publication) {
                      return _c("li", [
                        _vm._v(
                          "\n\t\t\t\t\t\t\t\t\t" +
                            _vm._s(publication.title) +
                            "\n\t\t\t\t\t\t\t\t"
                        )
                      ])
                    })
                  )
                ])
              })
            ),
            _vm._v(" "),
            _c("div", { staticClass: "total-row row" }, [
              _c(
                "div",
                {
                  staticClass: "total-cell col-sm-offset-10 col-sm-2 text-right"
                },
                [
                  _vm._v(
                    "\n\t\t\t\t\t\t\t" +
                      _vm._s(_vm.totalFacultyPublications) +
                      "\n\t\t\t\t\t\t"
                  )
                ]
              )
            ])
          ])
        ])
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
    require("vue-hot-reload-api")      .rerender("data-v-440a77f7", esExports)
  }
}

/***/ }),
/* 624 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container body-block" }, [
    _c("div", { staticClass: "controls-row row" }, [
      _c("div", { staticClass: "col-sm-4 col-sm-offset-3" }, [
        _c(
          "label",
          { staticClass: "containing-label" },
          [
            _vm._v("\n\t\t\t\tAcademic year\n\t\t\t\t"),
            _c("academic-year-selector", {
              attrs: { "min-date": _vm.meritsReleaseDate },
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
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          directives: [
            {
              name: "show",
              rawName: "v-show",
              value: _vm.usersWithMerits,
              expression: "usersWithMerits"
            }
          ],
          staticClass: "col-sm-3"
        },
        [
          _c(
            "button",
            {
              staticClass: "labelless-button btn btn-default",
              attrs: { type: "button" },
              on: { click: _vm.getCsv }
            },
            [_vm._v("\n\t\t\t\tExport CSV\n\t\t\t")]
          )
        ]
      )
    ]),
    _vm._v(" "),
    _vm.usersWithMerit
      ? _c(
          "div",
          [
            _c("component-list", {
              attrs: {
                fields: ["full_name"],
                items: _vm.usersWithMerit,
                paginate: false,
                reloadable: ""
              },
              on: { reload: _vm.fetchUsersWithMerits },
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(meritUser) {
                    return [
                      _c(
                        "user-with-merit-publications-list-item",
                        _vm._b(
                          {},
                          "user-with-merit-publications-list-item",
                          meritUser,
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
    require("vue-hot-reload-api")      .rerender("data-v-48a62180", esExports)
  }
}

/***/ }),
/* 625 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ScholarlyActivity_vue__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_531beeb9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ScholarlyActivity_vue__ = __webpack_require__(630);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_ScholarlyActivity_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_531beeb9_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_ScholarlyActivity_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/Reports/FacultyMerit/ScholarlyActivity.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-531beeb9", Component.options)
  } else {
    hotAPI.reload("data-v-531beeb9", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 626 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__UsersWithMeritReport_vue__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MeritCompensation_UserWithScholarlyActivityListItem_vue__ = __webpack_require__(627);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_merits_faculty_merit_index_js__ = __webpack_require__(223);
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
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["a"] = ({
	extends: __WEBPACK_IMPORTED_MODULE_1__UsersWithMeritReport_vue__["a" /* default */],

	computed: {
		thead: function thead() {
			return [['Faculty Member', 'PMID 1', 'PMID 2', 'PMID 3', 'PMID 4', 'Conference Presentations (#)', 'Other Presentations (#)', 'Chapters / Texbooks (#)', 'Grant Leadership (#)', 'Leadership or Peer-Review Role (Y/N)', 'Teaching Formal Courses (Y/N)']];
		},
		userScholarlyActivities: function userScholarlyActivities() {
			if (!this.usersWithMerit) return;

			var userScholarlyActivities = [];

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.usersWithMerit[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var user = _step.value;

					userScholarlyActivities.push(Object(__WEBPACK_IMPORTED_MODULE_3__modules_merits_faculty_merit_index_js__["c" /* getScholarlyActivity */])(user.report, user.full_name));
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

			return userScholarlyActivities;
		},
		exportFilename: function exportFilename() {
			return 'Scholarly activity ' + Object(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateString"])(this.dates.startDate) + '--' + Object(__WEBPACK_IMPORTED_MODULE_4__modules_date_utils_js__["isoDateString"])(this.dates.endDate);
		}
	},

	components: {
		DataTable: __WEBPACK_IMPORTED_MODULE_0__DataTable_vue__["a" /* default */],
		UserWithScholarlyActivityListItem: __WEBPACK_IMPORTED_MODULE_2__MeritCompensation_UserWithScholarlyActivityListItem_vue__["a" /* default */]
	}
});

/***/ }),
/* 627 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserWithScholarlyActivityListItem_vue__ = __webpack_require__(628);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a06fda6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserWithScholarlyActivityListItem_vue__ = __webpack_require__(629);
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_UserWithScholarlyActivityListItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1a06fda6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_UserWithScholarlyActivityListItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/MeritCompensation/UserWithScholarlyActivityListItem.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1a06fda6", Component.options)
  } else {
    hotAPI.reload("data-v-1a06fda6", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 628 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_merits_faculty_merit_index_js__ = __webpack_require__(223);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		full_name: {
			type: String,
			required: true
		},
		report: {
			type: Object,
			required: true
		}
	},
	computed: {
		scholarlyActivity: function scholarlyActivity() {
			return Object(__WEBPACK_IMPORTED_MODULE_0__modules_merits_faculty_merit_index_js__["c" /* getScholarlyActivity */])(this.report, this.full_name);
		}
	}
});

/***/ }),
/* 629 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-sm-2" }, [
      _vm._v("\n\t\t" + _vm._s(_vm.scholarlyActivity[0]) + "\n\t")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-4" }, [
      _c("small", [_vm._v("PubMed IDs (up to 4)")]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.scholarlyActivity[1]))]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.scholarlyActivity[2]))]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.scholarlyActivity[3]))]),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.scholarlyActivity[4]))])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-2" }, [
      _c("small", [_vm._v("Conference presentations (#)")]),
      _vm._v("\n\t\t" + _vm._s(_vm.scholarlyActivity[5]) + "\n\t")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-2" }, [
      _c("small", [_vm._v("Other presentations (#)")]),
      _vm._v("\n\t\t" + _vm._s(_vm.scholarlyActivity[6]) + "\n\t")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-2" }, [
      _c("small", [_vm._v("Chapters / textbooks (#)")]),
      _vm._v("\n\t\t" + _vm._s(_vm.scholarlyActivity[7]) + "\n\t")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-2" }, [
      _c("small", [_vm._v("Grant leadership (#)")]),
      _vm._v("\n\t\t" + _vm._s(_vm.scholarlyActivity[8]) + "\n\t")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-2" }, [
      _c("small", [_vm._v("Leadership or peer-review role (Y/N)")]),
      _vm._v("\n\t\t" + _vm._s(_vm.scholarlyActivity[9]) + "\n\t")
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "col-sm-2" }, [
      _c("small", [_vm._v("Teaching formal courses (Y/N)")]),
      _vm._v("\n\t\t" + _vm._s(_vm.scholarlyActivity[10]) + "\n\t")
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
    require("vue-hot-reload-api")      .rerender("data-v-1a06fda6", esExports)
  }
}

/***/ }),
/* 630 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container body-block" }, [
    _c("div", { staticClass: "controls-row row" }, [
      _c("div", { staticClass: "col-sm-6 col-sm-offset-3" }, [
        _c(
          "label",
          { staticClass: "containing-label" },
          [
            _vm._v("\n\t\t\t\tAcademic year\n\t\t\t\t"),
            _c("academic-year-selector", {
              attrs: { "min-date": _vm.meritsReleaseDate },
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
    _vm.usersWithMerit
      ? _c(
          "div",
          [
            _c("data-table", {
              attrs: {
                thead: _vm.thead,
                data: _vm.userScholarlyActivities,
                "export-filename": _vm.exportFilename,
                reloadable: "",
                exportable: ""
              },
              on: { reload: _vm.fetchUsersWithMerits }
            })
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
    require("vue-hot-reload-api")      .rerender("data-v-531beeb9", esExports)
  }
}

/***/ })
],[519]);
});
//# sourceMappingURL=vue-reports.js.map