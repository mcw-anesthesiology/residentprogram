(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["moment"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("moment")) : factory(root["moment"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_22__) {
return webpackJsonp([9],{

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = appendAlert;
/* harmony export (immutable) */ __webpack_exports__["H"] = ucfirst;
/* harmony export (immutable) */ __webpack_exports__["I"] = ucfirstWords;
/* harmony export (immutable) */ __webpack_exports__["b"] = camelCaseToWords;
/* harmony export (immutable) */ __webpack_exports__["y"] = snakeCaseToWords;
/* harmony export (immutable) */ __webpack_exports__["u"] = kebabCaseToWords;
/* harmony export (immutable) */ __webpack_exports__["v"] = nl2br;
/* harmony export (immutable) */ __webpack_exports__["d"] = escapeCsv;
/* harmony export (immutable) */ __webpack_exports__["n"] = getFetchHeaders;
/* harmony export (immutable) */ __webpack_exports__["f"] = fetchConfig;
/* harmony export (immutable) */ __webpack_exports__["m"] = getCsrfToken;
/* harmony export (immutable) */ __webpack_exports__["w"] = okOrThrow;
/* harmony export (immutable) */ __webpack_exports__["t"] = jsonOrThrow;
/* harmony export (immutable) */ __webpack_exports__["e"] = fetchCompetencies;
/* harmony export (immutable) */ __webpack_exports__["i"] = fetchMilestoneGroups;
/* harmony export (immutable) */ __webpack_exports__["j"] = fetchMilestones;
/* harmony export (immutable) */ __webpack_exports__["p"] = groupMilestones;
/* harmony export (immutable) */ __webpack_exports__["k"] = fetchUserGroups;
/* harmony export (immutable) */ __webpack_exports__["l"] = fetchUsers;
/* harmony export (immutable) */ __webpack_exports__["q"] = groupUsers;
/* harmony export (immutable) */ __webpack_exports__["h"] = fetchForms;
/* harmony export (immutable) */ __webpack_exports__["g"] = fetchFormGroups;
/* harmony export (immutable) */ __webpack_exports__["o"] = groupForms;
/* harmony export (immutable) */ __webpack_exports__["G"] = sortSelect2Objects;
/* harmony export (immutable) */ __webpack_exports__["A"] = sortEmptyLast;
/* harmony export (immutable) */ __webpack_exports__["C"] = sortNumbers;
/* harmony export (immutable) */ __webpack_exports__["F"] = sortPropNumbers;
/* harmony export (immutable) */ __webpack_exports__["z"] = sortDates;
/* harmony export (immutable) */ __webpack_exports__["D"] = sortPropDates;
/* harmony export (immutable) */ __webpack_exports__["B"] = sortIgnoreCase;
/* harmony export (immutable) */ __webpack_exports__["E"] = sortPropIgnoreCase;
/* harmony export (immutable) */ __webpack_exports__["r"] = htmlLabelReplacements;
/* harmony export (immutable) */ __webpack_exports__["c"] = errorToAlert;
/* harmony export (immutable) */ __webpack_exports__["x"] = simpleErrorAlert;
/* harmony export (immutable) */ __webpack_exports__["J"] = userIsType;
/* harmony export (immutable) */ __webpack_exports__["s"] = isAdmin;
/* harmony export (immutable) */ __webpack_exports__["K"] = usesFeature;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_striptags__ = __webpack_require__(516);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_striptags___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_striptags__);



// All the $FlowFixMes in this file are due to
// https://github.com/facebook/flow/issues/2221

// FIXME


// FIXME


function appendAlert(alertText) {
	var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#alert-container';
	var alertType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'danger';
	var dismissable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

	var alert = document.createElement("div");
	alert.className = "alert alert-" + alertType;
	alert.setAttribute('role', 'alert');

	if (dismissable) {
		alert.className += " alert-dismissable";
		var close = document.createElement("button");
		close.type = "button";
		close.className = "close";
		close.setAttribute("data-dismiss", "alert");
		close.setAttribute("aria-label", "Close");

		var innerClose = document.createElement("span");
		innerClose.setAttribute("aria-hidden", "true");
		innerClose.innerHTML = "&times;";
		close.appendChild(innerClose);

		alert.appendChild(close);
	}

	alert.insertAdjacentHTML("beforeend", alertText);

	$(parent).append(alert);
}

function ucfirst(str) {
	return str.charAt(0).toUpperCase() + str.substring(1);
}

function ucfirstWords(str) {
	return str.split(' ').map(ucfirst).join(' ');
}

function camelCaseToWords(str) {
	var result = '';
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = str[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var char = _step.value;

			if (result === '') {
				result += char.toUpperCase();
			} else if (char === char.toUpperCase()) {
				result += ' ' + char.toLowerCase();
			} else {
				result += char;
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

	return result;
}

function snakeCaseToWords(str) {
	return str.charAt(0).toUpperCase() + str.substring(1).replace('_', ' ');
}

function kebabCaseToWords(str) {
	return str.charAt(0).toUpperCase() + str.substring(1).replace('-', ' ');
}

function nl2br(text) {
	return text.replace(/(?:\r\n|\r|\n)/g, '<br />');
}

function escapeCsv(text) {
	return '"' + Object(__WEBPACK_IMPORTED_MODULE_1_striptags__["default"])(text) + '"';
}

function getFetchHeaders() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var contentType = 'contentType' in options ? options.contentType : 'application/json';

	var headers = new Headers();
	headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

	if (contentType) headers.append('Content-Type', contentType);

	headers.append('X-Requested-With', 'XMLHttpRequest');

	var csrfToken = getCsrfToken();
	if (csrfToken) headers.append('X-CSRF-TOKEN', csrfToken);

	return headers;
}

function fetchConfig() {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	return {
		headers: getFetchHeaders(options),
		credentials: 'same-origin'
	};
}

function getCsrfToken() {
	var tokenMeta = document.querySelector('meta[name="csrf-token"]');

	if (!tokenMeta) return;

	return tokenMeta.getAttribute('content');
}

function okOrThrow(response) {
	if (response.ok) return response;

	throw new Error(response.statusText);
}

function jsonOrThrow(response) {
	if (response.ok) return response.json();

	throw new Error(response.statusText);
}

function fetchCompetencies() {
	return fetch('/competencies', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(jsonOrThrow).then(function (competencies) {
		return competencies.sort(sortPropNumbers('order'));
	});
}

function fetchMilestoneGroups() {
	return fetchMilestones().then(groupMilestones);
}

function fetchMilestones() {
	return fetch('/milestones', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(jsonOrThrow).then(function (milestones) {
		return milestones.sort(sortPropNumbers('order'));
	});
}

function groupMilestones(milestones) {
	var milestoneGroups = {};

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = milestones[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var milestone = _step2.value;

			var groupTitle = ucfirst(milestone.type);

			if (milestone.training_level) groupTitle += ' \u2014 ' + milestone.training_level;

			if (!milestoneGroups[groupTitle]) milestoneGroups[groupTitle] = {
				text: groupTitle,
				children: []
			};

			milestoneGroups[groupTitle].children.push({
				id: milestone.id.toString(),
				text: milestone.title
			});
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

	for (var groupTitle in milestoneGroups) {
		var milestoneGroup = milestoneGroups[groupTitle];
		milestoneGroup.children.sort(function (a, b) {
			if (a.text < b.text) return 1;else if (a.text > b.text) return -1;else return 0;
		});
	}

	// $FlowFixMe
	return Object.values(milestoneGroups);
}

function fetchUserGroups() {
	return fetchUsers().then(groupUsers);
}

function fetchUsers() {
	return fetch('/users', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(function (response) {
		return response.json();
	});
}

function groupUsers(users) {
	var groups = {
		intern: {
			text: 'Intern',
			children: []
		},
		'ca-1': {
			text: 'CA-1',
			children: []
		},
		'ca-2': {
			text: 'CA-2',
			children: []
		},
		'ca-3': {
			text: 'CA-3',
			children: []
		},
		fellow: {
			text: 'Fellow',
			children: []
		},
		faculty: {
			text: 'Faculty',
			children: []
		},
		staff: {
			text: 'Staff',
			children: []
		},
		app: {
			text: 'APP',
			children: []
		},
		inactive: {
			text: 'Inactive',
			children: []
		}
	};

	users.map(function (user) {
		var select2Obj = {
			id: user.id,
			text: user.full_name
		};

		if (user.status === 'active') {
			if (user.type) {
				if (user.type === 'resident' && user.training_level && groups[user.training_level]) {

					groups[user.training_level].children.push(select2Obj);
				} else if (groups[user.type]) {
					groups[user.type].children.push(select2Obj);
				}
			}
		} else {
			groups.inactive.children.push(select2Obj);
		}
	});

	// $FlowFixMe
	var groupedUsers = Object.values(groups);
	var _iteratorNormalCompletion3 = true;
	var _didIteratorError3 = false;
	var _iteratorError3 = undefined;

	try {
		for (var _iterator3 = groupedUsers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
			var group = _step3.value;

			group.children.sort(sortSelect2Objects);
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

	return groupedUsers;
}

function fetchForms() {
	return fetch('/forms', {
		method: 'GET',
		headers: getFetchHeaders(),
		credentials: 'same-origin'
	}).then(function (response) {
		return response.json();
	});
}

function fetchFormGroups() {
	return fetchForms().then(groupForms);
}

function groupForms(forms) {
	var groups = {};

	forms.map(function (form) {
		if (form.type) {
			if (!groups[form.type]) {
				groups[form.type] = {
					text: ucfirst(form.type),
					children: []
				};
			}

			groups[form.type].children.push({
				id: form.id,
				text: form.title
			});
		}
	});

	// $FlowFixMe
	var groupedForms = Object.values(groups);
	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = groupedForms[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var group = _step4.value;

			group.children.sort(sortSelect2Objects);
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

	return groupedForms;
}

function sortSelect2Objects(a, b) {
	if (a.text < b.text) return -1;
	if (a.text > b.text) return 1;

	return 0;
}

function sortEmptyLast(a, b) {
	var aEmpty = a == null || typeof a === 'string' && a.trim() === '';
	var bEmpty = b == null || typeof b === 'string' && b.trim() === '';

	if (aEmpty && bEmpty) return 0;
	if (aEmpty) return 1;
	if (bEmpty) return -1;

	return 0;
}

function sortNumbers(a, b) {
	var emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null) return emptyVal;

	return Number(a) - Number(b);
}

function sortPropNumbers(prop) {
	return function (a, b) {
		return sortNumbers(a[prop], b[prop]);
	};
}

function sortDates(a, b) {
	var emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null) return emptyVal;

	return __WEBPACK_IMPORTED_MODULE_0_moment___default()(a) - __WEBPACK_IMPORTED_MODULE_0_moment___default()(b);
}

function sortPropDates(prop) {
	return function (a, b) {
		return sortDates(a[prop], b[prop]);
	};
}

function sortIgnoreCase(a, b) {
	var emptyVal = sortEmptyLast(a, b);
	if (emptyVal != null) return emptyVal;

	a = a.toLowerCase();
	b = b.toLowerCase();

	if (a < b) return -1;
	if (a > b) return 1;

	return 0;
}

function sortPropIgnoreCase(prop) {
	return function (a, b) {
		return sortIgnoreCase(a[prop], b[prop]);
	};
}

function htmlLabelReplacements(html, replacements) {
	html = html.replace(/<span class="label label-info">/g, '[[').replace(/<\/span>/g, ']]');

	replacements.map(function (replacement) {
		var pattern = new RegExp('\\[\\[' + replacement + '\\]\\]', 'g');
		var label = '<span class="label label-info">' + replacement + '</span>';
		html = html.replace(pattern, label);
	});

	return html;
}

function errorToAlert(err) {
	return {
		type: 'error',
		html: '<strong>Error:</strong> ' + err.message
	};
}

function simpleErrorAlert(message) {
	return {
		type: 'error',
		html: '<strong>Error:</strong> ' + message
	};
}

function userIsType(user, type) {
	return user != null && 'type' in user && user.type === type;
}

function isAdmin(user) {
	return userIsType(user, 'admin');
}

function usesFeature(user, feature) {
	if ('user_features' in user && Array.isArray(user.user_features)) {
		var _iteratorNormalCompletion5 = true;
		var _didIteratorError5 = false;
		var _iteratorError5 = undefined;

		try {
			for (var _iterator5 = user.user_features[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
				var userFeature = _step5.value;

				if (userFeature.feature === feature) return true;
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

	return false;
}

/***/ }),

/***/ 10:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["isoDateString"] = isoDateString;
/* harmony export (immutable) */ __webpack_exports__["isoDateStringObject"] = isoDateStringObject;
/* harmony export (immutable) */ __webpack_exports__["datesEqual"] = datesEqual;
/* harmony export (immutable) */ __webpack_exports__["renderDate"] = renderDate;
/* harmony export (immutable) */ __webpack_exports__["renderDateTime"] = renderDateTime;
/* harmony export (immutable) */ __webpack_exports__["renderDateRange"] = renderDateRange;
/* harmony export (immutable) */ __webpack_exports__["renderDateRangeExplicit"] = renderDateRangeExplicit;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_RANGES", function() { return DATE_RANGES; });
/* harmony export (immutable) */ __webpack_exports__["currentQuarter"] = currentQuarter;
/* harmony export (immutable) */ __webpack_exports__["lastQuarter"] = lastQuarter;
/* harmony export (immutable) */ __webpack_exports__["currentSemester"] = currentSemester;
/* harmony export (immutable) */ __webpack_exports__["lastSemester"] = lastSemester;
/* harmony export (immutable) */ __webpack_exports__["currentYear"] = currentYear;
/* harmony export (immutable) */ __webpack_exports__["lastYear"] = lastYear;
/* harmony export (immutable) */ __webpack_exports__["allTime"] = allTime;
/* harmony export (immutable) */ __webpack_exports__["academicYearForDate"] = academicYearForDate;
/* harmony export (immutable) */ __webpack_exports__["quarterForDate"] = quarterForDate;
/* harmony export (immutable) */ __webpack_exports__["monthForDate"] = monthForDate;
/* harmony export (immutable) */ __webpack_exports__["quartersInAcademicYear"] = quartersInAcademicYear;
/* harmony export (immutable) */ __webpack_exports__["monthsInAcademicYear"] = monthsInAcademicYear;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();



function isoDateString(date) {
	return __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).format('Y-MM-DD');
}

function isoDateStringObject(dates) {
	var newDates = {};

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = Object.entries(dates)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var _ref = _step.value;

			var _ref2 = _slicedToArray(_ref, 2);

			var key = _ref2[0];
			var date = _ref2[1];

			var dateString = isoDateString(date);
			newDates[key] = dateString;
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

	return newDates;
}

function datesEqual(d1, d2) {
	var dates1 = isoDateStringObject(d1);
	var dates2 = isoDateStringObject(d2);

	return dates1.startDate === dates2.startDate && dates1.endDate === dates2.endDate;
}

function renderDate(date) {
	return date ? __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).format('MMMM Y') : '';
}

function renderDateTime(date) {
	return date ? __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).calendar() : '';
}

function renderDateRange(startDate, endDate) {
	var explicit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	if (startDate === null && endDate === null) return 'All time';

	var range = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).twix(endDate, { allDay: true });
	return range.start().startOf('month') && range.end().endOf('month') && !explicit ? range.format({
		dayFormat: '_',
		monthFormat: 'MMMM'
	}).replace(/\s+_/g, '') : range.format({
		monthFormat: 'MMMM'
	});
}

function renderDateRangeExplicit(startDate, endDate) {
	return renderDateRange(startDate, endDate, true);
}

var DATE_RANGES = {
	CUSTOM: 'custom',
	CURRENT_QUARTER: 'currentQuarter',
	LAST_QUARTER: 'lastQuarter',
	CURRENT_SEMESTER: 'currentSemester',
	LAST_SEMESTER: 'lastSemester',
	CURRENT_YEAR: 'currentYear',
	LAST_YEAR: 'lastYear',
	ALL_TIME: 'allTime'
};

function currentQuarter() {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month');
	while (startDate.month() % 3 !== 0) {
		startDate.subtract(1, 'month');
	}var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(2, 'months').endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function lastQuarter() {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month');
	while (startDate.month() % 3 !== 0) {
		startDate.subtract(1, 'month');
	}startDate.subtract(3, 'months');
	var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(2, 'months').endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function currentSemester() {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month');
	while (startDate.month() % 6 !== 0) {
		startDate.subtract(1, 'month');
	}var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(5, 'months').endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function lastSemester() {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month');
	while (startDate.month() % 6 !== 0) {
		startDate.subtract(1, 'month');
	}startDate.subtract(6, 'months');
	var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(5, 'months').endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function currentYear() {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month');
	while (startDate.month() !== 6) {
		startDate.subtract(1, 'month');
	}var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(11, 'months').endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function lastYear() {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()().startOf('month');
	while (startDate.month() !== 6) {
		startDate.subtract(1, 'month');
	}startDate.subtract(1, 'year');
	var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(11, 'months').endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function allTime() {
	return {
		startDate: null,
		endDate: null
	};
}

function academicYearForDate(date) {
	date = __WEBPACK_IMPORTED_MODULE_0_moment___default()(date);

	var startYear = date.month() >= 6 ? // July
	date.year() : date.year() - 1;

	var startDate = {
		year: startYear,
		month: 6,
		day: 1
	};
	var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(1, 'year').subtract(1, 'day');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function quarterForDate(date) {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).startOf('month');
	while (startDate.month() % 3 !== 0) {
		startDate.subtract(1, 'month');
	}var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).add(2, 'months').endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function monthForDate(date) {
	var startDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).startOf('month');
	var endDate = __WEBPACK_IMPORTED_MODULE_0_moment___default()(startDate).endOf('month');

	return {
		startDate: startDate,
		endDate: endDate
	};
}

function quartersInAcademicYear() {
	var academicYear = academicYearForDate(new Date());
	var date = __WEBPACK_IMPORTED_MODULE_0_moment___default()(academicYear.startDate);

	var quarters = [];
	while (date <= academicYear.endDate) {
		quarters.push(quarterForDate(date));
		date.add(3, 'months');
	}

	return quarters;
}

function monthsInAcademicYear() {
	var academicYear = academicYearForDate(new Date());
	var date = __WEBPACK_IMPORTED_MODULE_0_moment___default()(academicYear.startDate);

	var months = [];
	while (date <= academicYear.endDate) {
		months.push(monthForDate(date));
		date.add(1, 'month');
	}

	return months;
}

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = caseLogDetailsSchemaIsValid;
/* harmony export (immutable) */ __webpack_exports__["e"] = renderCaseLogDetailsSchema;
/* harmony export (immutable) */ __webpack_exports__["b"] = generateCaseLogDetailsReport;
/* harmony export (immutable) */ __webpack_exports__["c"] = generateCaseLogDetailsReportCharts;
/* harmony export (immutable) */ __webpack_exports__["d"] = generateCaseLogLocationReportTable;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chart_js__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chart_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonschema__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jsonschema___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jsonschema__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schemas_case_log_details_json__ = __webpack_require__(514);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__schemas_case_log_details_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__schemas_case_log_details_json__);




var v = new __WEBPACK_IMPORTED_MODULE_1_jsonschema__["Validator"]();

function caseLogDetailsSchemaIsValid(detailsSchema) {
	return v.validate(detailsSchema, __WEBPACK_IMPORTED_MODULE_2__schemas_case_log_details_json___default.a).valid;
}

function renderCaseLogDetailsSchema(schema, responses) {
	var container = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.createElement('section');

	schema.forEach(function (section) {
		var panel = document.createElement('section');
		var panelBody = document.createElement('div');

		panel.className = 'panel panel-default';

		if (section.title) {
			var panelHeading = document.createElement('div');
			var panelTitle = document.createElement('h4');

			panelHeading.className = 'panel-heading';
			panelTitle.className = 'panel-title';
			panelTitle.appendChild(document.createTextNode(section.title));
			panelHeading.appendChild(panelTitle);
			panel.appendChild(panelHeading);
		}

		panelBody.className = 'panel-body';
		panel.appendChild(panelBody);

		section.subsections.forEach(function (subsection) {
			var subsectionContainer = document.createElement('section');
			var row = document.createElement('div');
			row.className = 'row';
			if (subsection.title) {
				var subsectionHeading = document.createElement('h5');
				subsectionHeading.className = 'sub-header';
				subsectionHeading.appendChild(document.createTextNode(subsection.title));
				subsectionContainer.appendChild(subsectionHeading);
			}

			subsection.inputs.forEach(function (input) {
				renderInput(input, subsection.name, row);
			});

			subsectionContainer.appendChild(row);
			panelBody.appendChild(subsectionContainer);
		});

		container.appendChild(panel);
	});

	return container;

	function renderInput(input, name, container) {
		switch (input.type) {
			case 'checkbox':
				{
					var checkboxContainer = document.createElement('div');
					var label = document.createElement('label');
					var checkbox = document.createElement('input');

					checkboxContainer.className = 'col-md-4 checkbox';
					checkbox.type = 'checkbox';
					checkbox.name = 'details[' + name + '][]';
					checkbox.value = input.value || input.label;
					if (responses && responses[name] && responses[name].includes(checkbox.value)) checkbox.checked = true;
					if (responses) checkbox.readonly = true;
					label.appendChild(checkbox);
					label.appendChild(document.createTextNode(input.label));
					checkboxContainer.appendChild(label);

					container.appendChild(checkboxContainer);
					break;
				}
		}
	}
}

function generateCaseLogDetailsReport(caseLogs) {
	if (!caseLogs || caseLogs.length === 0) return;

	var report = {};
	caseLogs.forEach(function (caseLog) {
		if (!report.hasOwnProperty(caseLog.details_schema.details_type)) report[caseLog.details_schema.details_type] = {
			numCases: 0,
			types: {}
		};
		var detailsReport = report[caseLog.details_schema.details_type];
		detailsReport.numCases++;

		var _loop = function _loop(typeName) {
			if (!detailsReport.types.hasOwnProperty(typeName)) detailsReport.types[typeName] = {
				count: 0,
				responses: {},
				locations: {}
			};

			detailsReport.types[typeName].count++;
			caseLog.details[typeName].forEach(function (response) {
				if (!detailsReport.types[typeName].responses.hasOwnProperty(response)) detailsReport.types[typeName].responses[response] = {
					count: 0,
					locations: {}
				};
				detailsReport.types[typeName].responses[response].count++;

				if (!detailsReport.types[typeName].responses[response].locations.hasOwnProperty(caseLog.location.name)) detailsReport.types[typeName].responses[response].locations[caseLog.location.name] = {
					count: 0,
					caseLogs: []
				};
				detailsReport.types[typeName].responses[response].locations[caseLog.location.name].count++;
				detailsReport.types[typeName].responses[response].locations[caseLog.location.name].caseLogs.push(caseLog);

				if (!detailsReport.types[typeName].locations.hasOwnProperty(caseLog.location.name)) detailsReport.types[typeName].locations[caseLog.location.name] = {
					count: 0,
					caseLogs: []
				};
				detailsReport.types[typeName].locations[caseLog.location.name].count++;
				detailsReport.types[typeName].locations[caseLog.location.name].caseLogs.push(caseLog);
			});
		};

		for (var typeName in caseLog.details) {
			_loop(typeName);
		}
	});
	return report;
}

var chartColors = ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB', '#7eda35', '#462aa3', '#dd2727', '#f09113', '#1a7829'];

function generateCaseLogDetailsReportCharts(report, name, container) {
	var charts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

	if (!report || report.length === 0) return;

	var reportGroupNames = Object.keys(report);
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = container.querySelectorAll('row')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var section = _step.value;

			if (!section.hasAttribute('data-report-group-name') || !reportGroupNames.includes(section.getAttribute('data-report-group-name'))) container.removeChild(section);
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

	for (var chartName in charts) {
		if (!reportGroupNames.includes(chartName)) {
			charts[chartName].destroy();
			delete charts[chartName];
		}
	}

	var _iteratorNormalCompletion2 = true;
	var _didIteratorError2 = false;
	var _iteratorError2 = undefined;

	try {
		for (var _iterator2 = reportGroupNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
			var reportGroupName = _step2.value;


			var data = {
				datasets: [{
					label: name,
					data: [],
					backgroundColor: []
				}],
				labels: []
			};

			var canvas = void 0,
			    numCasesTd = void 0,
			    tbody = void 0;
			var reportGroupSection = container.querySelector('section[data-report-group-name="' + reportGroupName + '"]');
			if (reportGroupSection) {
				numCasesTd = reportGroupSection.querySelector('table.num-cases-table td');
				tbody = reportGroupSection.querySelector('table.stats-table tbody');
			} else {
				reportGroupSection = document.createElement('section');
				var reportGroupTitle = document.createElement('h2');
				var canvasContainer = document.createElement('div');
				canvas = document.createElement('canvas');
				reportGroupSection.className = 'row';
				reportGroupSection.setAttribute('data-report-group-name', reportGroupName);
				reportGroupSection.appendChild(reportGroupTitle);
				reportGroupTitle.appendChild(document.createTextNode(reportGroupName.toUpperCase()));
				canvasContainer.className = 'col-md-8 case-log-report-chart-container';
				container.appendChild(reportGroupSection);
				reportGroupSection.appendChild(canvasContainer);
				canvasContainer.appendChild(canvas);

				var statsContainer = document.createElement('div');
				var numTable = document.createElement('table');
				var statsTable = document.createElement('table');
				var thead = document.createElement('thead');
				tbody = document.createElement('tbody');
				var tr = document.createElement('tr');
				var th = document.createElement('th');
				numCasesTd = document.createElement('td');
				statsContainer.className = 'col-md-4 case-log-report-stats-container';
				reportGroupSection.appendChild(statsContainer);
				numTable.className = 'table num-cases-table';
				statsContainer.appendChild(numTable);
				numTable.appendChild(tr);
				tr.appendChild(th);
				th.appendChild(document.createTextNode('Number of cases'));
				tr.appendChild(numCasesTd);

				tr = document.createElement('tr');
				th = document.createElement('th');
				statsTable.className = 'table table-striped table-bordered stats-table';
				statsContainer.appendChild(statsTable);
				statsTable.appendChild(thead);
				thead.appendChild(tr);
				tr.appendChild(th);
				statsTable.appendChild(tbody);
				th.appendChild(document.createTextNode('Response'));
				tr.appendChild(th);
				th = document.createElement('th');
				th.appendChild(document.createTextNode('Times selected'));
				tr.appendChild(th);
				th = document.createElement('th');
				th.appendChild(document.createTextNode('Percentage'));
				tr.appendChild(th);
			}

			while (tbody.firstChild) {
				tbody.removeChild(tbody.firstChild);
			}var numCases = report[reportGroupName].numCases;
			while (numCasesTd.firstChild) {
				numCasesTd.removeChild(numCasesTd.firstChild);
			}numCasesTd.appendChild(document.createTextNode(numCases));
			if (report[reportGroupName].types[name]) {
				var responses = Object.keys(report[reportGroupName].types[name].responses).sort();
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = responses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var response = _step3.value;

						var count = report[reportGroupName].types[name].responses[response].count;
						var percentage = Math.round(count / numCases * 100);
						data.datasets[0].data.push(count);
						data.datasets[0].backgroundColor.push(chartColors[data.datasets[0].data.length - 1]);
						data.labels.push(response);

						var _tr = document.createElement('tr');
						var _th = document.createElement('th');
						var selectedTd = document.createElement('td');
						var percentageTd = document.createElement('td');

						_th.appendChild(document.createTextNode(response));
						selectedTd.appendChild(document.createTextNode(count));
						percentageTd.appendChild(document.createTextNode(percentage + '%'));

						_tr.appendChild(_th);
						_tr.appendChild(selectedTd);
						_tr.appendChild(percentageTd);
						tbody.appendChild(_tr);
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

			if (charts[reportGroupName]) {
				charts[reportGroupName].data.datasets = data.datasets;
				charts[reportGroupName].data.labels = data.labels;
				charts[reportGroupName].update();
			} else {
				charts[reportGroupName] = new __WEBPACK_IMPORTED_MODULE_0_chart_js__["default"](canvas, {
					data: data,
					type: 'polarArea',
					options: {
						scale: {
							ticks: {
								stepSize: 1
							}
						}
					}
				});
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

	return charts;
}

function generateCaseLogLocationReportTable(report, name, container) {
	if (!report || report.length === 0) return;

	var reportGroupNames = Object.keys(report);
	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = reportGroupNames[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var reportGroupName = _step4.value;

			var reportGroupSection = container.querySelector('section[data-report-group-name="' + reportGroupName + '"]');
			var tbody = reportGroupSection.querySelector('table.location-table tbody');
			if (!tbody) {
				var statsContainer = reportGroupSection.querySelector('.case-log-report-stats-container');
				var locationTable = document.createElement('table');
				var thead = document.createElement('thead');
				tbody = document.createElement('tbody');
				var tr = document.createElement('tr');
				var th = document.createElement('th');
				locationTable.className = 'table table-striped table-bordered location-table';
				statsContainer.appendChild(locationTable);
				locationTable.appendChild(thead);
				locationTable.appendChild(tbody);
				thead.appendChild(tr);
				tr.appendChild(th);
				th.appendChild(document.createTextNode('Location'));
				th = document.createElement('th');
				tr.appendChild(th);
				th.appendChild(document.createTextNode('Times selected'));
				th = document.createElement('th');
				tr.appendChild(th);
				th.appendChild(document.createTextNode('Percentage'));
			}

			while (tbody.firstChild) {
				tbody.removeChild(tbody.firstChild);
			}var numCases = report[reportGroupName].numCases;
			if (report[reportGroupName].types[name]) {
				var locations = Object.keys(report[reportGroupName].types[name].locations).sort();
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = locations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var location = _step5.value;

						var count = report[reportGroupName].types[name].locations[location].count;
						var percentage = Math.round(count / numCases * 100);

						var _tr2 = document.createElement('tr');
						var _th2 = document.createElement('th');
						var selectedTd = document.createElement('td');
						var percentageTd = document.createElement('td');

						_th2.appendChild(document.createTextNode(location));
						selectedTd.appendChild(document.createTextNode(count));
						percentageTd.appendChild(document.createTextNode(percentage + '%'));

						_tr2.appendChild(_th2);
						_tr2.appendChild(selectedTd);
						_tr2.appendChild(percentageTd);
						tbody.appendChild(_tr2);
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

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["u"] = unlimitTableEvals;
/* harmony export (immutable) */ __webpack_exports__["t"] = unlimitRestTableEvals;
/* harmony export (immutable) */ __webpack_exports__["a"] = createDateCell;
/* harmony export (immutable) */ __webpack_exports__["c"] = createDateTimeCell;
/* harmony export (immutable) */ __webpack_exports__["b"] = createDateRangeCell;
/* harmony export (immutable) */ __webpack_exports__["i"] = renderDateCell;
/* harmony export (immutable) */ __webpack_exports__["k"] = renderDateTimeCell;
/* harmony export (immutable) */ __webpack_exports__["j"] = renderDateRangeCell;
/* harmony export (immutable) */ __webpack_exports__["h"] = renderAccountStatus;
/* harmony export (immutable) */ __webpack_exports__["g"] = getEvaluationStatusLabelType;
/* harmony export (immutable) */ __webpack_exports__["f"] = getEvaluationStatusLabel;
/* harmony export (immutable) */ __webpack_exports__["l"] = renderEvaluationStatus;
/* harmony export (immutable) */ __webpack_exports__["s"] = renderTrainingLevel;
/* harmony export (immutable) */ __webpack_exports__["p"] = renderSecondaryTrainingLevel;
/* harmony export (immutable) */ __webpack_exports__["n"] = renderIdToEvalUrl;
/* harmony export (immutable) */ __webpack_exports__["r"] = renderSubjectEvalUrl;
/* harmony export (immutable) */ __webpack_exports__["m"] = renderEvaluatorEvalUrl;
/* harmony export (immutable) */ __webpack_exports__["o"] = renderNewTag;
/* harmony export (immutable) */ __webpack_exports__["q"] = renderSubjectCell;
/* harmony export (immutable) */ __webpack_exports__["d"] = createEditAndDeleteButtons;
/* harmony export (immutable) */ __webpack_exports__["e"] = getDataAttributes;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_twix__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_twix___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_twix__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants_js__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__date_utils_js__ = __webpack_require__(10);







function unlimitTableEvals() {
	var dt = this.DataTable({
		retrieve: true
	});
	var url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf('/'))).load().draw();
}

function unlimitRestTableEvals() {
	var dt = this.DataTable({
		retrieve: true
	});
	var url = dt.ajax.url();
	dt.ajax.url(url.substring(0, url.lastIndexOf('?'))).load().draw();
}

function createDateCell(td, date) {
	if (date && $(td).text() !== __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).format('ll')) $(td).attr('data-date-value', __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).valueOf()).addClass('table-date-cell');
}

function createDateTimeCell(td, date) {
	if (date && $(td).text() !== __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).format('ll LT')) $(td).attr('data-date-value', __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).valueOf()).addClass('table-date-time-cell');
}

function createDateRangeCell(start, end) {

	return function (td, obj) {
		if (start in obj && end in obj) {
			$(td).attr('data-date-range-value', Object(__WEBPACK_IMPORTED_MODULE_4__date_utils_js__["renderDateRange"])(obj[start], obj[end], true)).addClass('table-date-range-cell');
		}
	};
}

function renderDateCell(date, type) {
	if (type === 'sort' || type === 'type') return date ? __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).valueOf() : '';

	return Object(__WEBPACK_IMPORTED_MODULE_4__date_utils_js__["renderDate"])(date);
}

function renderDateTimeCell(date, type) {
	if (type === 'sort' || type === 'type') return date ? __WEBPACK_IMPORTED_MODULE_0_moment___default()(date).valueOf() : '';

	return Object(__WEBPACK_IMPORTED_MODULE_4__date_utils_js__["renderDateTime"])(date);
}

function renderDateRangeCell(start, end) {

	return function (obj, type) {
		if (type === 'sort' || type === 'type') return start in obj ? __WEBPACK_IMPORTED_MODULE_0_moment___default()(obj[start]).valueOf() : '';

		return start in obj && end in obj ? Object(__WEBPACK_IMPORTED_MODULE_4__date_utils_js__["renderDateRange"])(obj[start], obj[end]) : '';
	};
}

function renderAccountStatus(status) {
	var labelContext = void 0;
	switch (status) {
		case 'active':
			labelContext = 'label-success';
			break;
		case 'inactive':
			labelContext = 'label-danger';
			break;
		case 'pending':
			labelContext = 'label-warning';
			break;
		default:
			labelContext = 'label-default';
			break;
	}

	return '<span class="label ' + labelContext + '">' + Object(__WEBPACK_IMPORTED_MODULE_3__utils_js__["H" /* ucfirst */])(status) + '</span>';
}

function getEvaluationStatusLabelType(status) {
	switch (status) {
		case 'complete':
			return 'success';
		case 'disabled':
		case 'canceled by admin':
		case 'canceled by faculty':
		case 'canceled by resident':
		case 'canceled by fellow':
		case 'canceled by staff':
			return 'danger';
		case 'pending':
			return 'warning';
		case 'open for editing':
			return 'info';
		default:
			return 'default';
	}
}

function getEvaluationStatusLabel(status) {
	return 'label-' + getEvaluationStatusLabelType(status);
}

function renderEvaluationStatus(status) {
	return '<span class="label ' + getEvaluationStatusLabel(status) + '">\n\t\t\t' + Object(__WEBPACK_IMPORTED_MODULE_3__utils_js__["H" /* ucfirst */])(status) + '\n\t\t</span>';
}

function renderTrainingLevel(trainingLevel) {
	if (trainingLevel) {
		if (trainingLevel.indexOf("ca-") > -1) return trainingLevel.toUpperCase();else return Object(__WEBPACK_IMPORTED_MODULE_3__utils_js__["H" /* ucfirst */])(trainingLevel);
	}

	return '';
}

function renderSecondaryTrainingLevel(secondaryTrainingLevel) {
	if (secondaryTrainingLevel) {
		var allCaps = ['raaps'];
		if (allCaps.indexOf(secondaryTrainingLevel) > -1) return secondaryTrainingLevel.toUpperCase();else return Object(__WEBPACK_IMPORTED_MODULE_3__utils_js__["H" /* ucfirst */])(secondaryTrainingLevel);
	}

	return '';
}

function renderIdToEvalUrl(id) {
	return '<a href="/evaluation/' + id + '">' + id + '</a>';
}

function renderSubjectEvalUrl(url, type, evaluation) {
	if (['sort', 'type'].includes(type)) {
		if (evaluation.seen_by_subject_at) {
			return evaluation.id;
		} else {
			if (typeof evaluation.id === 'number') return evaluation.id * __WEBPACK_IMPORTED_MODULE_2__constants_js__["j" /* UNSEEN_EVALUATION_PRIORITY */];else return '~' + evaluation.id;
		}
	}

	if (evaluation.seen_by_subject_at) return url;else return __WEBPACK_IMPORTED_MODULE_2__constants_js__["f" /* NEW_ITEM_TAG */] + ' ' + url;
}

function renderEvaluatorEvalUrl(url, type, evaluation) {
	if (['sort', 'type'].includes(type)) {
		if (evaluation.seen_by_evaluator_at) {
			return evaluation.id;
		} else {
			if (typeof evaluation.id === 'number') return evaluation.id * __WEBPACK_IMPORTED_MODULE_2__constants_js__["j" /* UNSEEN_EVALUATION_PRIORITY */];else return '~' + evaluation.id;
		}
	}

	if (evaluation.seen_by_evaluator_at) return url;else return __WEBPACK_IMPORTED_MODULE_2__constants_js__["f" /* NEW_ITEM_TAG */] + ' ' + url;
}

function renderNewTag(type, evaluation) {
	if (evaluation.seen_by_evaluator_at) return '';else return __WEBPACK_IMPORTED_MODULE_2__constants_js__["f" /* NEW_ITEM_TAG */];
}

function renderSubjectCell(name, type, evaluation) {
	if (type === 'display') return '<a href="/profile/' + evaluation.subject_id + '">' + name + '</a>';

	return name;
}

function createEditAndDeleteButtons(thing, name) {
	var dataAttributes = getDataAttributes(thing);

	var editButton = '<button type="button" class="btn btn-xs btn-info edit-' + name + '-button" ' + dataAttributes + '><span class="glyphicon glyphicon-edit"></span> Edit</button>';

	var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-' + name + '-button" ' + dataAttributes + '><span class="glyphicon glyphicon-remove"></span> Delete</button>';

	return [editButton, deleteButton];
}

function getDataAttributes(thing) {
	var excludes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	var dataAttributes = '';
	Object.getOwnPropertyNames(thing).forEach(function (propName) {
		if (!excludes.includes(propName) && thing[propName] != null) dataAttributes += 'data-' + propName + '="' + thing[propName] + '" ';
	});

	return dataAttributes;
}

/***/ }),

/***/ 40:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/webpack/buildin/module.js'");

/***/ }),

/***/ 410:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/chart.js/src/chart.js'");

/***/ }),

/***/ 436:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_js__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__case_log_details_schema_js__ = __webpack_require__(171);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "caseLogDetailsSchemaIsValid", function() { return __WEBPACK_IMPORTED_MODULE_1__case_log_details_schema_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderCaseLogDetailsSchema", function() { return __WEBPACK_IMPORTED_MODULE_1__case_log_details_schema_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "generateCaseLogDetailsReport", function() { return __WEBPACK_IMPORTED_MODULE_1__case_log_details_schema_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "generateCaseLogDetailsReportCharts", function() { return __WEBPACK_IMPORTED_MODULE_1__case_log_details_schema_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "generateCaseLogLocationReportTable", function() { return __WEBPACK_IMPORTED_MODULE_1__case_log_details_schema_js__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__ = __webpack_require__(26);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "unlimitTableEvals", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "unlimitRestTableEvals", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createDateCell", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createDateTimeCell", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createDateRangeCell", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderDateCell", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderDateTimeCell", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderDateRangeCell", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderAccountStatus", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getEvaluationStatusLabelType", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getEvaluationStatusLabel", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderEvaluationStatus", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderTrainingLevel", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderSecondaryTrainingLevel", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderIdToEvalUrl", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderSubjectEvalUrl", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderEvaluatorEvalUrl", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderNewTag", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "renderSubjectCell", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "createEditAndDeleteButtons", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getDataAttributes", function() { return __WEBPACK_IMPORTED_MODULE_2__datatable_utils_js__["e"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_js__ = __webpack_require__(1);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "appendAlert", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ucfirst", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["H"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ucfirstWords", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["I"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "camelCaseToWords", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "snakeCaseToWords", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "kebabCaseToWords", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "nl2br", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "escapeCsv", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getFetchHeaders", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchConfig", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "getCsrfToken", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "okOrThrow", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "jsonOrThrow", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchCompetencies", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchMilestoneGroups", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchMilestones", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "groupMilestones", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchUserGroups", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchUsers", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "groupUsers", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchForms", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "fetchFormGroups", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "groupForms", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortSelect2Objects", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["G"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortEmptyLast", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortNumbers", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortPropNumbers", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["F"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortDates", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortPropDates", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortIgnoreCase", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "sortPropIgnoreCase", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["E"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "htmlLabelReplacements", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "errorToAlert", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "simpleErrorAlert", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "userIsType", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["J"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "isAdmin", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "usesFeature", function() { return __WEBPACK_IMPORTED_MODULE_3__utils_js__["K"]; });





/***/ }),

/***/ 437:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_whatwg_fetch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_whatwg_fetch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_dataset__ = __webpack_require__(439);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_element_dataset___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_element_dataset__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_raf_polyfill_js__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_raf_polyfill_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_raf_polyfill_js__);




/***/ }),

/***/ 438:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/whatwg-fetch/fetch.js'");

/***/ }),

/***/ 439:
/***/ (function(module, exports, __webpack_require__) {

var req = __webpack_require__(440);
module.exports = (req['default'] || req).apply(req, [])

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/element-dataset/lib/browser/index.es.js'");

/***/ }),

/***/ 459:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/raf/polyfill.js'");

/***/ }),

/***/ 507:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/jsonschema/lib/index.js'");

/***/ }),

/***/ 514:
/***/ (function(module, exports) {

module.exports = {"$id":"https://www.residentprogram.com/schemas/case-log-details.json#","title":"Case Log Details Schema","$ref":"https://www.residentprogram.com/schemas/questionnaire.json"}

/***/ }),

/***/ 515:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.10.0
(function() {
  var hasModule, isArray, makeTwix,
    slice = [].slice;

  hasModule = (typeof module !== "undefined" && module !== null) && (module.exports != null) && "function" === 'function';

  isArray = function(input) {
    return Object.prototype.toString.call(input) === '[object Array]';
  };

  makeTwix = function(moment) {
    var Twix;
    if (moment == null) {
      throw new Error("Can't find moment");
    }
    Twix = (function() {
      function Twix(start, end, parseFormat, options) {
        var ref;
        if (options == null) {
          options = {};
        }
        if (typeof parseFormat !== 'string') {
          options = parseFormat != null ? parseFormat : {};
          parseFormat = null;
        }
        if (typeof options === 'boolean') {
          options = {
            allDay: options
          };
        }
        this._oStart = moment(start, parseFormat, options.parseStrict);
        this._oEnd = moment(end, parseFormat, options.parseStrict);
        this.allDay = (ref = options.allDay) != null ? ref : false;
        this._mutated();
      }

      Twix._extend = function() {
        var attr, first, j, len, other, others;
        first = arguments[0], others = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        for (j = 0, len = others.length; j < len; j++) {
          other = others[j];
          for (attr in other) {
            if (typeof other[attr] !== 'undefined') {
              first[attr] = other[attr];
            }
          }
        }
        return first;
      };

      Twix.prototype.start = function() {
        return this._start.clone();
      };

      Twix.prototype.end = function() {
        return this._end.clone();
      };

      Twix.prototype.isSame = function(period) {
        return this._start.isSame(this._end, period);
      };

      Twix.prototype.length = function(period, floatingPoint) {
        if (floatingPoint == null) {
          floatingPoint = false;
        }
        return this._displayEnd.diff(this._start, period, floatingPoint);
      };

      Twix.prototype.count = function(period) {
        var end, start;
        start = this.start().startOf(period);
        end = this.end().startOf(period);
        return end.diff(start, period) + 1;
      };

      Twix.prototype.countInner = function(period) {
        var end, ref, start;
        ref = this._inner(period), start = ref[0], end = ref[1];
        if (start >= end) {
          return 0;
        }
        return end.diff(start, period);
      };

      Twix.prototype.iterate = function(intervalAmount, period, minHours) {
        var end, hasNext, ref, start;
        ref = this._prepIterateInputs(intervalAmount, period, minHours), intervalAmount = ref[0], period = ref[1], minHours = ref[2];
        start = this.start().startOf(period);
        end = this.end().startOf(period);
        if (this.allDay) {
          end = end.add(1, 'd');
        }
        hasNext = (function(_this) {
          return function() {
            return (!_this.allDay && start <= end && (!minHours || !start.isSame(end) || _this._end.hours() > minHours)) || (_this.allDay && start < end);
          };
        })(this);
        return this._iterateHelper(period, start, hasNext, intervalAmount);
      };

      Twix.prototype.iterateInner = function(intervalAmount, period) {
        var end, hasNext, ref, ref1, start;
        ref = this._prepIterateInputs(intervalAmount, period), intervalAmount = ref[0], period = ref[1];
        ref1 = this._inner(period, intervalAmount), start = ref1[0], end = ref1[1];
        hasNext = function() {
          return start < end;
        };
        return this._iterateHelper(period, start, hasNext, intervalAmount);
      };

      Twix.prototype.humanizeLength = function() {
        if (this.allDay) {
          if (this.isSame('d')) {
            return 'all day';
          } else {
            return this._start.from(this.end().add(1, 'd'), true);
          }
        } else {
          return this._start.from(this._end, true);
        }
      };

      Twix.prototype.asDuration = function(units) {
        var diff;
        diff = this._end.diff(this._start);
        return moment.duration(diff);
      };

      Twix.prototype.isPast = function() {
        return this._lastMilli < moment();
      };

      Twix.prototype.isFuture = function() {
        return this._start > moment();
      };

      Twix.prototype.isCurrent = function() {
        return !this.isPast() && !this.isFuture();
      };

      Twix.prototype.contains = function(mom) {
        if (!moment.isMoment(mom)) {
          mom = moment(mom);
        }
        return this._start <= mom && this._lastMilli >= mom;
      };

      Twix.prototype.isEmpty = function() {
        return this._start.isSame(this._displayEnd);
      };

      Twix.prototype.overlaps = function(other) {
        return this._displayEnd.isAfter(other._start) && this._start.isBefore(other._displayEnd);
      };

      Twix.prototype.engulfs = function(other) {
        return this._start <= other._start && this._displayEnd >= other._displayEnd;
      };

      Twix.prototype.union = function(other) {
        var allDay, newEnd, newStart;
        allDay = this.allDay && other.allDay;
        newStart = this._start < other._start ? this._start : other._start;
        newEnd = this._lastMilli > other._lastMilli ? (allDay ? this._end : this._displayEnd) : (allDay ? other._end : other._displayEnd);
        return new Twix(newStart, newEnd, allDay);
      };

      Twix.prototype.intersection = function(other) {
        var allDay, newEnd, newStart;
        allDay = this.allDay && other.allDay;
        newStart = this._start > other._start ? this._start : other._start;
        newEnd = this._lastMilli < other._lastMilli ? (allDay ? this._end : this._displayEnd) : (allDay ? other._end : other._displayEnd);
        return new Twix(newStart, newEnd, allDay);
      };

      Twix.prototype.xor = function() {
        var allDay, arr, endTime, i, item, j, k, last, len, len1, o, open, other, others, ref, results, start, t;
        others = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        open = 0;
        start = null;
        results = [];
        allDay = ((function() {
          var j, len, results1;
          results1 = [];
          for (j = 0, len = others.length; j < len; j++) {
            o = others[j];
            if (o.allDay) {
              results1.push(o);
            }
          }
          return results1;
        })()).length === others.length;
        arr = [];
        ref = [this].concat(others);
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          item = ref[i];
          arr.push({
            time: item._start,
            i: i,
            type: 0
          });
          arr.push({
            time: item._displayEnd,
            i: i,
            type: 1
          });
        }
        arr = arr.sort(function(a, b) {
          return a.time - b.time;
        });
        for (k = 0, len1 = arr.length; k < len1; k++) {
          other = arr[k];
          if (other.type === 1) {
            open -= 1;
          }
          if (open === other.type) {
            start = other.time;
          }
          if (open === (other.type + 1) % 2) {
            if (start) {
              last = results[results.length - 1];
              if (last && last._end.isSame(start)) {
                last._oEnd = other.time;
                last._mutated();
              } else {
                endTime = allDay ? other.time.clone().subtract(1, 'd') : other.time;
                t = new Twix(start, endTime, allDay);
                if (!t.isEmpty()) {
                  results.push(t);
                }
              }
            }
            start = null;
          }
          if (other.type === 0) {
            open += 1;
          }
        }
        return results;
      };

      Twix.prototype.difference = function() {
        var j, len, others, ref, results1, t;
        others = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        ref = this.xor.apply(this, others).map((function(_this) {
          return function(i) {
            return _this.intersection(i);
          };
        })(this));
        results1 = [];
        for (j = 0, len = ref.length; j < len; j++) {
          t = ref[j];
          if (!t.isEmpty() && t.isValid()) {
            results1.push(t);
          }
        }
        return results1;
      };

      Twix.prototype.split = function() {
        var args, dur, end, final, i, mom, start, time, times, vals;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        end = start = this.start();
        if (moment.isDuration(args[0])) {
          dur = args[0];
        } else if ((!moment.isMoment(args[0]) && !isArray(args[0]) && typeof args[0] === 'object') || (typeof args[0] === 'number' && typeof args[1] === 'string')) {
          dur = moment.duration(args[0], args[1]);
        } else if (isArray(args[0])) {
          times = args[0];
        } else {
          times = args;
        }
        if (times) {
          times = (function() {
            var j, len, results1;
            results1 = [];
            for (j = 0, len = times.length; j < len; j++) {
              time = times[j];
              results1.push(moment(time));
            }
            return results1;
          })();
          times = ((function() {
            var j, len, results1;
            results1 = [];
            for (j = 0, len = times.length; j < len; j++) {
              mom = times[j];
              if (mom.isValid() && mom >= start) {
                results1.push(mom);
              }
            }
            return results1;
          })()).sort(function(a, b) {
            return a.valueOf() - b.valueOf();
          });
        }
        if ((dur && dur.asMilliseconds() === 0) || (times && times.length === 0)) {
          return [this];
        }
        vals = [];
        i = 0;
        final = this._displayEnd;
        while (start < final && ((times == null) || times[i])) {
          end = dur ? start.clone().add(dur) : times[i].clone();
          end = moment.min(final, end);
          if (!start.isSame(end)) {
            vals.push(moment.twix(start, end));
          }
          start = end;
          i += 1;
        }
        if (!end.isSame(this._displayEnd) && times) {
          vals.push(moment.twix(end, this._displayEnd));
        }
        return vals;
      };

      Twix.prototype.divide = function(parts) {
        return this.split(this.length() / parts, 'ms').slice(0, +(parts - 1) + 1 || 9e9);
      };

      Twix.prototype.isValid = function() {
        return this._start.isValid() && this._end.isValid() && this._start <= this._displayEnd;
      };

      Twix.prototype.equals = function(other) {
        return (other instanceof Twix) && this.allDay === other.allDay && this._start.valueOf() === other._start.valueOf() && this._end.valueOf() === other._end.valueOf();
      };

      Twix.prototype.toString = function() {
        return "{start: " + (this._start.format()) + ", end: " + (this._end.format()) + ", allDay: " + (this.allDay ? 'true' : 'false') + "}";
      };

      Twix.prototype.toArray = function(intervalAmount, period, minHours) {
        var itr, range;
        itr = this.iterate(intervalAmount, period, minHours);
        range = [];
        while (itr.hasNext()) {
          range.push(itr.next());
        }
        return range;
      };

      Twix.prototype.simpleFormat = function(momentOpts, inopts) {
        var options, s;
        options = {
          allDay: '(all day)',
          template: Twix.formatTemplate
        };
        Twix._extend(options, inopts || {});
        s = options.template(this._start.format(momentOpts), this._end.format(momentOpts));
        if (this.allDay && options.allDay) {
          s += " " + options.allDay;
        }
        return s;
      };

      Twix.prototype.format = function(inopts) {
        var americanish, atomicMonthDate, common_bucket, end_bucket, fold, format, fs, global_first, goesIntoTheMorning, j, len, localFormat, momentHourFormat, needDate, needsMeridiem, options, process, start_bucket, together;
        if (this.isEmpty()) {
          return '';
        }
        momentHourFormat = this._start.localeData()._longDateFormat['LT'][0];
        options = {
          groupMeridiems: true,
          spaceBeforeMeridiem: true,
          showDayOfWeek: false,
          hideTime: false,
          hideYear: false,
          implicitMinutes: true,
          implicitDate: false,
          implicitYear: true,
          yearFormat: 'YYYY',
          monthFormat: 'MMM',
          weekdayFormat: 'ddd',
          dayFormat: 'D',
          meridiemFormat: 'A',
          hourFormat: momentHourFormat,
          minuteFormat: 'mm',
          allDay: 'all day',
          explicitAllDay: false,
          lastNightEndsAt: 0,
          template: Twix.formatTemplate
        };
        Twix._extend(options, inopts || {});
        fs = [];
        needsMeridiem = options.hourFormat && options.hourFormat[0] === 'h';
        localFormat = this._start.localeData()._longDateFormat['L'];
        americanish = localFormat.indexOf('M') < localFormat.indexOf('D');
        goesIntoTheMorning = options.lastNightEndsAt > 0 && !this.allDay && this.end().startOf('d').valueOf() === this.start().add(1, 'd').startOf('d').valueOf() && this._start.hours() > 12 && this._end.hours() < options.lastNightEndsAt;
        needDate = !options.hideDate && (!options.implicitDate || this.start().startOf('d').valueOf() !== moment().startOf('d').valueOf() || !(this.isSame('d') || goesIntoTheMorning));
        atomicMonthDate = !(this.allDay || options.hideTime);
        if (this.allDay && this.isSame('d') && (options.implicitDate || options.explicitAllDay)) {
          fs.push({
            name: 'all day simple',
            fn: function() {
              return options.allDay;
            },
            pre: ' ',
            slot: 0
          });
        }
        if (needDate && !options.hideYear && (!options.implicitYear || this._start.year() !== moment().year() || !this.isSame('y'))) {
          fs.push({
            name: 'year',
            fn: function(date) {
              return date.format(options.yearFormat);
            },
            pre: americanish ? ', ' : ' ',
            slot: 4
          });
        }
        if (atomicMonthDate && needDate) {
          fs.push({
            name: 'month-date',
            fn: function(date) {
              var format;
              format = americanish ? options.monthFormat + " " + options.dayFormat : options.dayFormat + " " + options.monthFormat;
              return date.format(format);
            },
            ignoreEnd: function() {
              return goesIntoTheMorning;
            },
            pre: ' ',
            slot: 2
          });
        }
        if (!atomicMonthDate && needDate) {
          fs.push({
            name: 'month',
            fn: function(date) {
              return date.format(options.monthFormat);
            },
            pre: ' ',
            slot: americanish ? 2 : 3
          });
        }
        if (!atomicMonthDate && needDate) {
          fs.push({
            name: 'date',
            fn: function(date) {
              return date.format(options.dayFormat);
            },
            pre: ' ',
            slot: americanish ? 3 : 2
          });
        }
        if (needDate && options.showDayOfWeek) {
          fs.push({
            name: 'day of week',
            fn: function(date) {
              return date.format(options.weekdayFormat);
            },
            pre: ' ',
            slot: 1
          });
        }
        if (options.groupMeridiems && needsMeridiem && !this.allDay && !options.hideTime) {
          fs.push({
            name: 'meridiem',
            fn: function(t) {
              return t.format(options.meridiemFormat);
            },
            slot: 6,
            pre: options.spaceBeforeMeridiem ? ' ' : ''
          });
        }
        if (!this.allDay && !options.hideTime) {
          fs.push({
            name: 'time',
            fn: function(date) {
              var str;
              str = date.minutes() === 0 && options.implicitMinutes && needsMeridiem ? date.format(options.hourFormat) : date.format(options.hourFormat + ":" + options.minuteFormat);
              if (!options.groupMeridiems && needsMeridiem) {
                if (options.spaceBeforeMeridiem) {
                  str += ' ';
                }
                str += date.format(options.meridiemFormat);
              }
              return str;
            },
            slot: 5,
            pre: ', '
          });
        }
        start_bucket = [];
        end_bucket = [];
        common_bucket = [];
        together = true;
        process = (function(_this) {
          return function(format) {
            var end_str, start_group, start_str;
            start_str = format.fn(_this._start);
            end_str = format.ignoreEnd && format.ignoreEnd() ? start_str : format.fn(_this._end);
            start_group = {
              format: format,
              value: function() {
                return start_str;
              }
            };
            if (end_str === start_str && together) {
              return common_bucket.push(start_group);
            } else {
              if (together) {
                together = false;
                common_bucket.push({
                  format: {
                    slot: format.slot,
                    pre: ''
                  },
                  value: function() {
                    return options.template(fold(start_bucket), fold(end_bucket, true).trim());
                  }
                });
              }
              start_bucket.push(start_group);
              return end_bucket.push({
                format: format,
                value: function() {
                  return end_str;
                }
              });
            }
          };
        })(this);
        for (j = 0, len = fs.length; j < len; j++) {
          format = fs[j];
          process(format);
        }
        global_first = true;
        fold = function(array, skip_pre) {
          var k, len1, local_first, ref, section, str;
          local_first = true;
          str = '';
          ref = array.sort(function(a, b) {
            return a.format.slot - b.format.slot;
          });
          for (k = 0, len1 = ref.length; k < len1; k++) {
            section = ref[k];
            if (!global_first) {
              if (local_first && skip_pre) {
                str += ' ';
              } else {
                str += section.format.pre;
              }
            }
            str += section.value();
            global_first = false;
            local_first = false;
          }
          return str;
        };
        return fold(common_bucket);
      };

      Twix.prototype._iterateHelper = function(period, iter, hasNext, intervalAmount) {
        return {
          next: function() {
            var val;
            if (!hasNext()) {
              return null;
            } else {
              val = iter.clone();
              iter.add(intervalAmount, period);
              return val;
            }
          },
          hasNext: hasNext
        };
      };

      Twix.prototype._prepIterateInputs = function() {
        var inputs, intervalAmount, minHours, period, ref, ref1;
        inputs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        if (typeof inputs[0] === 'number') {
          return inputs;
        }
        if (typeof inputs[0] === 'string') {
          period = inputs.shift();
          intervalAmount = (ref = inputs.pop()) != null ? ref : 1;
          if (inputs.length) {
            minHours = (ref1 = inputs[0]) != null ? ref1 : false;
          }
        }
        if (moment.isDuration(inputs[0])) {
          period = 'ms';
          intervalAmount = inputs[0].as(period);
        }
        return [intervalAmount, period, minHours];
      };

      Twix.prototype._inner = function(period, intervalAmount) {
        var durationCount, durationPeriod, end, modulus, start;
        if (period == null) {
          period = 'ms';
        }
        if (intervalAmount == null) {
          intervalAmount = 1;
        }
        start = this.start();
        end = this._displayEnd.clone();
        if (start > start.clone().startOf(period)) {
          start.startOf(period).add(intervalAmount, period);
        }
        if (end < end.clone().endOf(period)) {
          end.startOf(period);
        }
        durationPeriod = start.twix(end).asDuration(period);
        durationCount = durationPeriod.get(period);
        modulus = durationCount % intervalAmount;
        end.subtract(modulus, period);
        return [start, end];
      };

      Twix.prototype._mutated = function() {
        this._start = this.allDay ? this._oStart.clone().startOf('d') : this._oStart;
        this._lastMilli = this.allDay ? this._oEnd.clone().endOf('d') : this._oEnd;
        this._end = this.allDay ? this._oEnd.clone().startOf('d') : this._oEnd;
        return this._displayEnd = this.allDay ? this._end.clone().add(1, 'd') : this._end;
      };

      return Twix;

    })();
    Twix._extend(moment.locale(), {
      _twix: Twix.defaults
    });
    Twix.formatTemplate = function(leftSide, rightSide) {
      return leftSide + " - " + rightSide;
    };
    moment.twix = function() {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Twix, arguments, function(){});
    };
    moment.fn.twix = function() {
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Twix, [this].concat(slice.call(arguments)), function(){});
    };
    moment.fn.forDuration = function(duration, allDay) {
      return new Twix(this, this.clone().add(duration), allDay);
    };
    if (moment.duration.fn) {
      moment.duration.fn.afterMoment = function(startingTime, allDay) {
        return new Twix(startingTime, moment(startingTime).clone().add(this), allDay);
      };
      moment.duration.fn.beforeMoment = function(startingTime, allDay) {
        return new Twix(moment(startingTime).clone().subtract(this), startingTime, allDay);
      };
    }
    moment.twixClass = Twix;
    return Twix;
  };

  if (hasModule) {
    return module.exports = makeTwix(__webpack_require__(22));
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(22)], __WEBPACK_AMD_DEFINE_RESULT__ = function(moment) {
      return makeTwix(moment);
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }

  if (this.moment) {
    this.Twix = makeTwix(this.moment);
  } else if (typeof moment !== "undefined" && moment !== null) {
    this.Twix = makeTwix(moment);
  }

}).call(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(40)(module)))

/***/ }),

/***/ 516:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/striptags/striptags.js'");

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ADMIN_EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return NEW_ITEM_TAG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return UNSEEN_EVALUATION_PRIORITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return PLACEHOLDER_USER_IMAGE_PATH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return STANDARD_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return RESIDENT_VALUE_MAP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return FELLOWSHIP_VALUE_MAPS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CHART_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CHART_COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return FEATURE_RELEASE_DATES; });
var ADMIN_EMAIL = 'jmischka@mcw.edu';

var NEW_ITEM_TAG = '<span class="label label-primary">NEW</span>';

var UNSEEN_EVALUATION_PRIORITY = 1000000;

var PLACEHOLDER_USER_IMAGE_PATH = '/img/avatar.png';

// FIXME: A lot of these should be configurable and saved instead of hardcoded
var STANDARD_OPTIONS = {
	RESIDENT: [{ value: 0, text: 'Not at CBY' }, { value: 1, text: '' }, { value: 2, text: 'CBY' }, { value: 3, text: '' }, { value: 4, text: 'CA-1' }, { value: 5, text: '' }, { value: 6, text: 'CA-2' }, { value: 7, text: '' }, { value: 8, text: 'CA-3' }, { value: 9, text: '' }, { value: 10, text: 'Attending' }],
	FELLOW: [{ value: 0, text: 'Not at fellowship level' }, { value: 1, text: '' }, { value: 2, text: 'Fellow - 1' }, { value: 3, text: '' }, { value: 4, text: 'Fellow - 2' }, { value: 5, text: '' }, { value: 6, text: 'Fellow - 3' }, { value: 7, text: '' }, { value: 8, text: 'Fellow - 4' }, { value: 9, text: '' }, { value: 10, text: 'Fellow - 5' }],
	FACULTY: [{ value: 'strongly-disagree', text: 'Strongly Disagree' }, { value: 'disagree', text: 'Disagree' }, { value: 'undecided', text: 'Undecided' }, { value: 'agree', text: 'Agree' }, { value: 'strongly-agree', text: 'Strongly Agree' }, { value: 'n-a', text: 'N/A' }]
};

var RESIDENT_VALUE_MAP = new Map([[2, 'CBY'], [4, 'CA-1'], [6, 'CA-2'], [8, 'CA-3'], [10, 'Attending']]);

var FELLOWSHIP_VALUE_MAPS = new Map([[null, new Map([[0, 'Not yet at Resident Level'], [1, 'Resident Level'], [2, '1st Quarter Fellow'], [3, 'Mid-year Fellow'], [4, 'Advanced Fellow'], [5, 'Attending']])], ['Critical Care', new Map([[0, 'Unacceptable'], [3, 'Needs Improvement'], [5, 'Meets Expectations'], [7, 'Exceeds Expectations'], [10, 'Outstanding']])], ['Pediatric', new Map([[0, 'Bellow fellow level'], [3, 'Developing, Not consistent'], [5, 'Acceptable, Not yet secure'], [7, 'Secure, Consistent'], [10, 'Outstanding, Autonomous']])], ['Pain', new Map([[0, 'Not yet at Resident Level'], [1, 'Resident Level'], [2, '1st Quarter Fellow'], [3, 'Mid-year Fellow'], [4, 'Advanced Fellow'], [5, 'Attending']])], ['Cardio', new Map([[0, 'Unacceptable'], [3, 'Needs Improvement'], [5, 'Meets Expectations'], [7, 'Exceeds Expectations'], [10, 'Outstanding']])], ['OB', new Map([[0, 'Not at Fellowship Level'], [2, 'Fellow - 1'], [4, 'Fellow - 2'], [6, 'Fellow - 3'], [8, 'Fellow - 4'], [10, 'Fellow - 5']])]]);

var CHART_TYPES = ['line', 'bar', 'horizontalBar', 'radar', 'polarArea', 'pie', 'doughnut', 'bubble'];

var CHART_COLORS = {
	AVERAGE: '#ffce56',
	SUBJECT: '#ff6384',
	OTHER: ['#7fdbff', '#2ecc40', '#ffdc00', '#f012be', '#0074d9', '#01ff70', '#ff851b', '#001f3f', '#3d9970', '#ff4136', '#85144b', '#39cccc', '#b10dc9']
};

var FEATURE_RELEASE_DATES = {
	FACULTY_MERIT: '2016-07-01'
};

/***/ })

},[436]);
});
//# sourceMappingURL=bundle.js.map