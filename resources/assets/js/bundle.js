(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["moment"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("moment")) : factory(root["moment"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_32__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _caseLogDetailsSchema = __webpack_require__(1);
	
	Object.keys(_caseLogDetailsSchema).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _caseLogDetailsSchema[key];
	    }
	  });
	});
	
	var _datatableUtils = __webpack_require__(57);
	
	Object.keys(_datatableUtils).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _datatableUtils[key];
	    }
	  });
	});
	
	var _utils = __webpack_require__(58);
	
	Object.keys(_utils).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _utils[key];
	    }
	  });
	});
	
	__webpack_require__(59);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.caseLogDetailsSchemaIsValid = caseLogDetailsSchemaIsValid;
	exports.renderCaseLogDetailsSchema = renderCaseLogDetailsSchema;
	exports.generateCaseLogDetailsReport = generateCaseLogDetailsReport;
	exports.generateCaseLogDetailsReportCharts = generateCaseLogDetailsReportCharts;
	
	var _chart = __webpack_require__(2);
	
	var _chart2 = _interopRequireDefault(_chart);
	
	var _jsonschema = __webpack_require__(46);
	
	var _caseLogDetails = __webpack_require__(56);
	
	var _caseLogDetails2 = _interopRequireDefault(_caseLogDetails);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var v = new _jsonschema.Validator();
	function caseLogDetailsSchemaIsValid(detailsSchema) {
		return v.validate(detailsSchema, _caseLogDetails2.default).valid;
	}
	
	function renderCaseLogDetailsSchema(schema, responses) {
		var container = arguments.length <= 2 || arguments[2] === undefined ? document.createElement('section') : arguments[2];
	
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
						if (responses && responses[name] && responses[name].indexOf(checkbox.value) !== -1) checkbox.checked = true;
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
		var report = {};
		caseLogs.forEach(function (caseLog) {
			if (!report.hasOwnProperty(caseLog.details_schema.details_type)) report[caseLog.details_schema.details_type] = {
				numCases: 0,
				responseCounts: {}
			};
			var detailsReport = report[caseLog.details_schema.details_type];
			detailsReport.numCases++;
	
			var _loop = function _loop(name) {
				if (!detailsReport.responseCounts[name]) detailsReport.responseCounts[name] = {};
				caseLog.details[name].forEach(function (response) {
					if (!detailsReport.responseCounts[name][response]) detailsReport.responseCounts[name][response] = 0;
					detailsReport.responseCounts[name][response]++;
				});
			};
	
			for (var name in caseLog.details) {
				_loop(name);
			}
		});
		return report;
	}
	
	var chartColors = ['#FF6384', '#4BC0C0', '#FFCE56', '#E7E9ED', '#36A2EB'];
	
	function generateCaseLogDetailsReportCharts(caseLogs, name, container) {
		var charts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
		if (!caseLogs || caseLogs.length === 0) return;
	
		var report = generateCaseLogDetailsReport(caseLogs);
	
		var reportGroupNames = Object.keys(report);
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;
	
		try {
			for (var _iterator = container.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var section = _step.value;
	
				if (!section.hasAttribute('data-report-group-name') || !(reportGroupNames.indexOf(section.getAttribute('data-report-group-name')) !== -1)) container.removeChild(section);
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
			if (!(reportGroupNames.indexOf(chartName) !== -1)) {
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
				var responses = Object.keys(report[reportGroupName].responseCounts[name]).sort();
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;
	
				try {
					for (var _iterator3 = responses[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var response = _step3.value;
	
						var count = report[reportGroupName].responseCounts[name][response];
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
	
				if (charts[reportGroupName]) {
					charts[reportGroupName].data.datasets = data.datasets;
					charts[reportGroupName].data.labels = data.labels;
					charts[reportGroupName].update();
				} else {
					charts[reportGroupName] = new _chart2.default(canvas, {
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @namespace Chart
	 */
	var Chart = __webpack_require__(3)();
	
	__webpack_require__(4)(Chart);
	__webpack_require__(10)(Chart);
	__webpack_require__(11)(Chart);
	__webpack_require__(12)(Chart);
	__webpack_require__(13)(Chart);
	__webpack_require__(14)(Chart);
	__webpack_require__(15)(Chart);
	__webpack_require__(16)(Chart);
	__webpack_require__(17)(Chart);
	__webpack_require__(18)(Chart);
	__webpack_require__(19)(Chart);
	__webpack_require__(20)(Chart);
	__webpack_require__(21)(Chart);
	
	__webpack_require__(22)(Chart);
	__webpack_require__(23)(Chart);
	__webpack_require__(24)(Chart);
	__webpack_require__(25)(Chart);
	
	__webpack_require__(26)(Chart);
	__webpack_require__(27)(Chart);
	__webpack_require__(28)(Chart);
	__webpack_require__(29)(Chart);
	__webpack_require__(30)(Chart);
	__webpack_require__(31)(Chart);
	
	// Controllers must be loaded after elements
	// See Chart.core.datasetController.dataElementType
	__webpack_require__(33)(Chart);
	__webpack_require__(34)(Chart);
	__webpack_require__(35)(Chart);
	__webpack_require__(36)(Chart);
	__webpack_require__(37)(Chart);
	__webpack_require__(38)(Chart);
	
	__webpack_require__(39)(Chart);
	__webpack_require__(40)(Chart);
	__webpack_require__(41)(Chart);
	__webpack_require__(42)(Chart);
	__webpack_require__(43)(Chart);
	__webpack_require__(44)(Chart);
	__webpack_require__(45)(Chart);
	
	window.Chart = module.exports = Chart;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function() {
	
		//Occupy the global variable of Chart, and create a simple base class
		var Chart = function(context, config) {
			var me = this;
			var helpers = Chart.helpers;
			me.config = config || { 
				data: {
					datasets: []
				}
			};
	
			// Support a jQuery'd canvas element
			if (context.length && context[0].getContext) {
				context = context[0];
			}
	
			// Support a canvas domnode
			if (context.getContext) {
				context = context.getContext("2d");
			}
	
			me.ctx = context;
			me.canvas = context.canvas;
	
			context.canvas.style.display = context.canvas.style.display || 'block';
	
			// Figure out what the size of the chart will be.
			// If the canvas has a specified width and height, we use those else
			// we look to see if the canvas node has a CSS width and height.
			// If there is still no height, fill the parent container
			me.width = context.canvas.width || parseInt(helpers.getStyle(context.canvas, 'width'), 10) || helpers.getMaximumWidth(context.canvas);
			me.height = context.canvas.height || parseInt(helpers.getStyle(context.canvas, 'height'), 10) || helpers.getMaximumHeight(context.canvas);
	
			me.aspectRatio = me.width / me.height;
	
			if (isNaN(me.aspectRatio) || isFinite(me.aspectRatio) === false) {
				// If the canvas has no size, try and figure out what the aspect ratio will be.
				// Some charts prefer square canvases (pie, radar, etc). If that is specified, use that
				// else use the canvas default ratio of 2
				me.aspectRatio = config.aspectRatio !== undefined ? config.aspectRatio : 2;
			}
	
			// Store the original style of the element so we can set it back
			me.originalCanvasStyleWidth = context.canvas.style.width;
			me.originalCanvasStyleHeight = context.canvas.style.height;
	
			// High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
			helpers.retinaScale(me);
			me.controller = new Chart.Controller(me);
	
			// Always bind this so that if the responsive state changes we still work
			helpers.addResizeListener(context.canvas.parentNode, function() {
				if (me.controller && me.controller.config.options.responsive) {
					me.controller.resize();
				}
			});
	
			return me.controller ? me.controller : me;
	
		};
	
		//Globally expose the defaults to allow for user updating/changing
		Chart.defaults = {
			global: {
				responsive: true,
				responsiveAnimationDuration: 0,
				maintainAspectRatio: true,
				events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
				hover: {
					onHover: null,
					mode: 'single',
					animationDuration: 400
				},
				onClick: null,
				defaultColor: 'rgba(0,0,0,0.1)',
				defaultFontColor: '#666',
				defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
				defaultFontSize: 12,
				defaultFontStyle: 'normal',
				showLines: true,
	
				// Element defaults defined in element extensions
				elements: {},
	
				// Legend callback string
				legendCallback: function(chart) {
					var text = [];
					text.push('<ul class="' + chart.id + '-legend">');
					for (var i = 0; i < chart.data.datasets.length; i++) {
						text.push('<li><span style="background-color:' + chart.data.datasets[i].backgroundColor + '"></span>');
						if (chart.data.datasets[i].label) {
							text.push(chart.data.datasets[i].label);
						}
						text.push('</li>');
					}
					text.push('</ul>');
	
					return text.join("");
				}
			}
		};
	
		Chart.Chart = Chart;
	
		return Chart;
	
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*global window: false */
	/*global document: false */
	"use strict";
	
	var color = __webpack_require__(5);
	
	module.exports = function(Chart) {
		//Global Chart helpers object for utility methods and classes
		var helpers = Chart.helpers = {};
	
		//-- Basic js utility methods
		helpers.each = function(loopable, callback, self, reverse) {
			// Check to see if null or undefined firstly.
			var i, len;
			if (helpers.isArray(loopable)) {
				len = loopable.length;
				if (reverse) {
					for (i = len - 1; i >= 0; i--) {
						callback.call(self, loopable[i], i);
					}
				} else {
					for (i = 0; i < len; i++) {
						callback.call(self, loopable[i], i);
					}
				}
			} else if (typeof loopable === 'object') {
				var keys = Object.keys(loopable);
				len = keys.length;
				for (i = 0; i < len; i++) {
					callback.call(self, loopable[keys[i]], keys[i]);
				}
			}
		};
		helpers.clone = function(obj) {
			var objClone = {};
			helpers.each(obj, function(value, key) {
				if (helpers.isArray(value)) {
					objClone[key] = value.slice(0);
				} else if (typeof value === 'object' && value !== null) {
					objClone[key] = helpers.clone(value);
				} else {
					objClone[key] = value;
				}
			});
			return objClone;
		};
		helpers.extend = function(base) {
			var setFn = function(value, key) { base[key] = value; };
			for (var i = 1, ilen = arguments.length; i < ilen; i++) {
				helpers.each(arguments[i], setFn);
			}
			return base;
		};
		// Need a special merge function to chart configs since they are now grouped
		helpers.configMerge = function(_base) {
			var base = helpers.clone(_base);
			helpers.each(Array.prototype.slice.call(arguments, 1), function(extension) {
				helpers.each(extension, function(value, key) {
					if (key === 'scales') {
						// Scale config merging is complex. Add out own function here for that
						base[key] = helpers.scaleMerge(base.hasOwnProperty(key) ? base[key] : {}, value);
	
					} else if (key === 'scale') {
						// Used in polar area & radar charts since there is only one scale
						base[key] = helpers.configMerge(base.hasOwnProperty(key) ? base[key] : {}, Chart.scaleService.getScaleDefaults(value.type), value);
					} else if (base.hasOwnProperty(key) && helpers.isArray(base[key]) && helpers.isArray(value)) {
						// In this case we have an array of objects replacing another array. Rather than doing a strict replace,
						// merge. This allows easy scale option merging
						var baseArray = base[key];
	
						helpers.each(value, function(valueObj, index) {
	
							if (index < baseArray.length) {
								if (typeof baseArray[index] === 'object' && baseArray[index] !== null && typeof valueObj === 'object' && valueObj !== null) {
									// Two objects are coming together. Do a merge of them.
									baseArray[index] = helpers.configMerge(baseArray[index], valueObj);
								} else {
									// Just overwrite in this case since there is nothing to merge
									baseArray[index] = valueObj;
								}
							} else {
								baseArray.push(valueObj); // nothing to merge
							}
						});
	
					} else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
						// If we are overwriting an object with an object, do a merge of the properties.
						base[key] = helpers.configMerge(base[key], value);
	
					} else {
						// can just overwrite the value in this case
						base[key] = value;
					}
				});
			});
	
			return base;
		};
		helpers.scaleMerge = function(_base, extension) {
			var base = helpers.clone(_base);
	
			helpers.each(extension, function(value, key) {
				if (key === 'xAxes' || key === 'yAxes') {
					// These properties are arrays of items
					if (base.hasOwnProperty(key)) {
						helpers.each(value, function(valueObj, index) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							var axisDefaults = Chart.scaleService.getScaleDefaults(axisType);
							if (index >= base[key].length || !base[key][index].type) {
								base[key].push(helpers.configMerge(axisDefaults, valueObj));
							} else if (valueObj.type && valueObj.type !== base[key][index].type) {
								// Type changed. Bring in the new defaults before we bring in valueObj so that valueObj can override the correct scale defaults
								base[key][index] = helpers.configMerge(base[key][index], axisDefaults, valueObj);
							} else {
								// Type is the same
								base[key][index] = helpers.configMerge(base[key][index], valueObj);
							}
						});
					} else {
						base[key] = [];
						helpers.each(value, function(valueObj) {
							var axisType = helpers.getValueOrDefault(valueObj.type, key === 'xAxes' ? 'category' : 'linear');
							base[key].push(helpers.configMerge(Chart.scaleService.getScaleDefaults(axisType), valueObj));
						});
					}
				} else if (base.hasOwnProperty(key) && typeof base[key] === "object" && base[key] !== null && typeof value === "object") {
					// If we are overwriting an object with an object, do a merge of the properties.
					base[key] = helpers.configMerge(base[key], value);
	
				} else {
					// can just overwrite the value in this case
					base[key] = value;
				}
			});
	
			return base;
		};
		helpers.getValueAtIndexOrDefault = function(value, index, defaultValue) {
			if (value === undefined || value === null) {
				return defaultValue;
			}
	
			if (helpers.isArray(value)) {
				return index < value.length ? value[index] : defaultValue;
			}
	
			return value;
		};
		helpers.getValueOrDefault = function(value, defaultValue) {
			return value === undefined ? defaultValue : value;
		};
		helpers.indexOf = Array.prototype.indexOf?
			function(array, item) { return array.indexOf(item); } :
			function(array, item) {
				for (var i = 0, ilen = array.length; i < ilen; ++i) {
					if (array[i] === item) {
						return i;
					}
				}
				return -1;
			};
		helpers.where = function(collection, filterCallback) {
			if (helpers.isArray(collection) && Array.prototype.filter) {
				return collection.filter(filterCallback);
			} else {
				var filtered = [];
	
				helpers.each(collection, function(item) {
					if (filterCallback(item)) {
						filtered.push(item);
					}
				});
	
				return filtered;
			}
		};
		helpers.findIndex = Array.prototype.findIndex?
			function(array, callback, scope) { return array.findIndex(callback, scope); } :
			function(array, callback, scope) {
				scope = scope === undefined? array : scope;
				for (var i = 0, ilen = array.length; i < ilen; ++i) {
					if (callback.call(scope, array[i], i, array)) {
						return i;
					}
				}
				return -1;
			};
		helpers.findNextWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to start of the array
			if (startIndex === undefined || startIndex === null) {
				startIndex = -1;
			}
			for (var i = startIndex + 1; i < arrayToSearch.length; i++) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};
		helpers.findPreviousWhere = function(arrayToSearch, filterCallback, startIndex) {
			// Default to end of the array
			if (startIndex === undefined || startIndex === null) {
				startIndex = arrayToSearch.length;
			}
			for (var i = startIndex - 1; i >= 0; i--) {
				var currentItem = arrayToSearch[i];
				if (filterCallback(currentItem)) {
					return currentItem;
				}
			}
		};
		helpers.inherits = function(extensions) {
			//Basic javascript inheritance based on the model created in Backbone.js
			var parent = this;
			var ChartElement = (extensions && extensions.hasOwnProperty("constructor")) ? extensions.constructor : function() {
				return parent.apply(this, arguments);
			};
	
			var Surrogate = function() {
				this.constructor = ChartElement;
			};
			Surrogate.prototype = parent.prototype;
			ChartElement.prototype = new Surrogate();
	
			ChartElement.extend = helpers.inherits;
	
			if (extensions) {
				helpers.extend(ChartElement.prototype, extensions);
			}
	
			ChartElement.__super__ = parent.prototype;
	
			return ChartElement;
		};
		helpers.noop = function() {};
		helpers.uid = (function() {
			var id = 0;
			return function() {
				return id++;
			};
		})();
		//-- Math methods
		helpers.isNumber = function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		};
		helpers.almostEquals = function(x, y, epsilon) {
			return Math.abs(x - y) < epsilon;
		};
		helpers.max = function(array) {
			return array.reduce(function(max, value) {
				if (!isNaN(value)) {
					return Math.max(max, value);
				} else {
					return max;
				}
			}, Number.NEGATIVE_INFINITY);
		};
		helpers.min = function(array) {
			return array.reduce(function(min, value) {
				if (!isNaN(value)) {
					return Math.min(min, value);
				} else {
					return min;
				}
			}, Number.POSITIVE_INFINITY);
		};
		helpers.sign = Math.sign?
			function(x) { return Math.sign(x); } :
			function(x) {
				x = +x; // convert to a number
				if (x === 0 || isNaN(x)) {
					return x;
				}
				return x > 0 ? 1 : -1;
			};
		helpers.log10 = Math.log10?
			function(x) { return Math.log10(x); } :
			function(x) {
				return Math.log(x) / Math.LN10;
			};
		helpers.toRadians = function(degrees) {
			return degrees * (Math.PI / 180);
		};
		helpers.toDegrees = function(radians) {
			return radians * (180 / Math.PI);
		};
		// Gets the angle from vertical upright to the point about a centre.
		helpers.getAngleFromPoint = function(centrePoint, anglePoint) {
			var distanceFromXCenter = anglePoint.x - centrePoint.x,
				distanceFromYCenter = anglePoint.y - centrePoint.y,
				radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
	
			var angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
	
			if (angle < (-0.5 * Math.PI)) {
				angle += 2.0 * Math.PI; // make sure the returned angle is in the range of (-PI/2, 3PI/2]
			}
	
			return {
				angle: angle,
				distance: radialDistanceFromCenter
			};
		};
		helpers.aliasPixel = function(pixelWidth) {
			return (pixelWidth % 2 === 0) ? 0 : 0.5;
		};
		helpers.splineCurve = function(firstPoint, middlePoint, afterPoint, t) {
			//Props to Rob Spencer at scaled innovation for his post on splining between points
			//http://scaledinnovation.com/analytics/splines/aboutSplines.html
	
			// This function must also respect "skipped" points
	
			var previous = firstPoint.skip ? middlePoint : firstPoint,
				current = middlePoint,
				next = afterPoint.skip ? middlePoint : afterPoint;
	
			var d01 = Math.sqrt(Math.pow(current.x - previous.x, 2) + Math.pow(current.y - previous.y, 2));
			var d12 = Math.sqrt(Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2));
	
			var s01 = d01 / (d01 + d12);
			var s12 = d12 / (d01 + d12);
	
			// If all points are the same, s01 & s02 will be inf
			s01 = isNaN(s01) ? 0 : s01;
			s12 = isNaN(s12) ? 0 : s12;
	
			var fa = t * s01; // scaling factor for triangle Ta
			var fb = t * s12;
	
			return {
				previous: {
					x: current.x - fa * (next.x - previous.x),
					y: current.y - fa * (next.y - previous.y)
				},
				next: {
					x: current.x + fb * (next.x - previous.x),
					y: current.y + fb * (next.y - previous.y)
				}
			};
		};
		helpers.nextItem = function(collection, index, loop) {
			if (loop) {
				return index >= collection.length - 1 ? collection[0] : collection[index + 1];
			}
	
			return index >= collection.length - 1 ? collection[collection.length - 1] : collection[index + 1];
		};
		helpers.previousItem = function(collection, index, loop) {
			if (loop) {
				return index <= 0 ? collection[collection.length - 1] : collection[index - 1];
			}
			return index <= 0 ? collection[0] : collection[index - 1];
		};
		// Implementation of the nice number algorithm used in determining where axis labels will go
		helpers.niceNum = function(range, round) {
			var exponent = Math.floor(helpers.log10(range));
			var fraction = range / Math.pow(10, exponent);
			var niceFraction;
	
			if (round) {
				if (fraction < 1.5) {
					niceFraction = 1;
				} else if (fraction < 3) {
					niceFraction = 2;
				} else if (fraction < 7) {
					niceFraction = 5;
				} else {
					niceFraction = 10;
				}
			} else {
				if (fraction <= 1.0) {
					niceFraction = 1;
				} else if (fraction <= 2) {
					niceFraction = 2;
				} else if (fraction <= 5) {
					niceFraction = 5;
				} else {
					niceFraction = 10;
				}
			}
	
			return niceFraction * Math.pow(10, exponent);
		};
		//Easing functions adapted from Robert Penner's easing equations
		//http://www.robertpenner.com/easing/
		var easingEffects = helpers.easingEffects = {
			linear: function(t) {
				return t;
			},
			easeInQuad: function(t) {
				return t * t;
			},
			easeOutQuad: function(t) {
				return -1 * t * (t - 2);
			},
			easeInOutQuad: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t;
				}
				return -1 / 2 * ((--t) * (t - 2) - 1);
			},
			easeInCubic: function(t) {
				return t * t * t;
			},
			easeOutCubic: function(t) {
				return 1 * ((t = t / 1 - 1) * t * t + 1);
			},
			easeInOutCubic: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t;
				}
				return 1 / 2 * ((t -= 2) * t * t + 2);
			},
			easeInQuart: function(t) {
				return t * t * t * t;
			},
			easeOutQuart: function(t) {
				return -1 * ((t = t / 1 - 1) * t * t * t - 1);
			},
			easeInOutQuart: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t * t;
				}
				return -1 / 2 * ((t -= 2) * t * t * t - 2);
			},
			easeInQuint: function(t) {
				return 1 * (t /= 1) * t * t * t * t;
			},
			easeOutQuint: function(t) {
				return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
			},
			easeInOutQuint: function(t) {
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * t * t * t * t * t;
				}
				return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
			},
			easeInSine: function(t) {
				return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
			},
			easeOutSine: function(t) {
				return 1 * Math.sin(t / 1 * (Math.PI / 2));
			},
			easeInOutSine: function(t) {
				return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
			},
			easeInExpo: function(t) {
				return (t === 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
			},
			easeOutExpo: function(t) {
				return (t === 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
			},
			easeInOutExpo: function(t) {
				if (t === 0) {
					return 0;
				}
				if (t === 1) {
					return 1;
				}
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * Math.pow(2, 10 * (t - 1));
				}
				return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
			},
			easeInCirc: function(t) {
				if (t >= 1) {
					return t;
				}
				return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
			},
			easeOutCirc: function(t) {
				return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
			},
			easeInOutCirc: function(t) {
				if ((t /= 1 / 2) < 1) {
					return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
				}
				return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
			},
			easeInElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1) === 1) {
					return 1;
				}
				if (!p) {
					p = 1 * 0.3;
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
			},
			easeOutElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1) === 1) {
					return 1;
				}
				if (!p) {
					p = 1 * 0.3;
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
			},
			easeInOutElastic: function(t) {
				var s = 1.70158;
				var p = 0;
				var a = 1;
				if (t === 0) {
					return 0;
				}
				if ((t /= 1 / 2) === 2) {
					return 1;
				}
				if (!p) {
					p = 1 * (0.3 * 1.5);
				}
				if (a < Math.abs(1)) {
					a = 1;
					s = p / 4;
				} else {
					s = p / (2 * Math.PI) * Math.asin(1 / a);
				}
				if (t < 1) {
					return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
				}
				return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * 0.5 + 1;
			},
			easeInBack: function(t) {
				var s = 1.70158;
				return 1 * (t /= 1) * t * ((s + 1) * t - s);
			},
			easeOutBack: function(t) {
				var s = 1.70158;
				return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
			},
			easeInOutBack: function(t) {
				var s = 1.70158;
				if ((t /= 1 / 2) < 1) {
					return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
				}
				return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
			},
			easeInBounce: function(t) {
				return 1 - easingEffects.easeOutBounce(1 - t);
			},
			easeOutBounce: function(t) {
				if ((t /= 1) < (1 / 2.75)) {
					return 1 * (7.5625 * t * t);
				} else if (t < (2 / 2.75)) {
					return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75);
				} else if (t < (2.5 / 2.75)) {
					return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375);
				} else {
					return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375);
				}
			},
			easeInOutBounce: function(t) {
				if (t < 1 / 2) {
					return easingEffects.easeInBounce(t * 2) * 0.5;
				}
				return easingEffects.easeOutBounce(t * 2 - 1) * 0.5 + 1 * 0.5;
			}
		};
		//Request animation polyfill - http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
		helpers.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function(callback) {
					return window.setTimeout(callback, 1000 / 60);
				};
		})();
		helpers.cancelAnimFrame = (function() {
			return window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.oCancelAnimationFrame ||
				window.msCancelAnimationFrame ||
				function(callback) {
					return window.clearTimeout(callback, 1000 / 60);
				};
		})();
		//-- DOM methods
		helpers.getRelativePosition = function(evt, chart) {
			var mouseX, mouseY;
			var e = evt.originalEvent || evt,
				canvas = evt.currentTarget || evt.srcElement,
				boundingRect = canvas.getBoundingClientRect();
	
			var touches = e.touches;
			if (touches && touches.length > 0) {
				mouseX = touches[0].clientX;
				mouseY = touches[0].clientY;
	
			} else {
				mouseX = e.clientX;
				mouseY = e.clientY;
			}
	
			// Scale mouse coordinates into canvas coordinates
			// by following the pattern laid out by 'jerryj' in the comments of
			// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
			var paddingLeft = parseFloat(helpers.getStyle(canvas, 'padding-left'));
			var paddingTop = parseFloat(helpers.getStyle(canvas, 'padding-top'));
			var paddingRight = parseFloat(helpers.getStyle(canvas, 'padding-right'));
			var paddingBottom = parseFloat(helpers.getStyle(canvas, 'padding-bottom'));
			var width = boundingRect.right - boundingRect.left - paddingLeft - paddingRight;
			var height = boundingRect.bottom - boundingRect.top - paddingTop - paddingBottom;
	
			// We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
			// the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
			mouseX = Math.round((mouseX - boundingRect.left - paddingLeft) / (width) * canvas.width / chart.currentDevicePixelRatio);
			mouseY = Math.round((mouseY - boundingRect.top - paddingTop) / (height) * canvas.height / chart.currentDevicePixelRatio);
	
			return {
				x: mouseX,
				y: mouseY
			};
	
		};
		helpers.addEvent = function(node, eventType, method) {
			if (node.addEventListener) {
				node.addEventListener(eventType, method);
			} else if (node.attachEvent) {
				node.attachEvent("on" + eventType, method);
			} else {
				node["on" + eventType] = method;
			}
		};
		helpers.removeEvent = function(node, eventType, handler) {
			if (node.removeEventListener) {
				node.removeEventListener(eventType, handler, false);
			} else if (node.detachEvent) {
				node.detachEvent("on" + eventType, handler);
			} else {
				node["on" + eventType] = helpers.noop;
			}
		};
		helpers.bindEvents = function(chartInstance, arrayOfEvents, handler) {
			// Create the events object if it's not already present
			var events = chartInstance.events = chartInstance.events || {};
	
			helpers.each(arrayOfEvents, function(eventName) {
				events[eventName] = function() {
					handler.apply(chartInstance, arguments);
				};
				helpers.addEvent(chartInstance.chart.canvas, eventName, events[eventName]);
			});
		};
		helpers.unbindEvents = function(chartInstance, arrayOfEvents) {
			var canvas = chartInstance.chart.canvas;
			helpers.each(arrayOfEvents, function(handler, eventName) {
				helpers.removeEvent(canvas, eventName, handler);
			});
		};
	
		// Private helper function to convert max-width/max-height values that may be percentages into a number
		function parseMaxStyle(styleValue, node, parentProperty) {
			var valueInPixels;
			if (typeof(styleValue) === 'string') {
				valueInPixels = parseInt(styleValue, 10);
	
				if (styleValue.indexOf('%') != -1) {
					// percentage * size in dimension
					valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
				}
			} else {
				valueInPixels = styleValue;
			}
	
			return valueInPixels;
		}
	
		/**
		 * Returns if the given value contains an effective constraint.
		 * @private
		 */
		function isConstrainedValue(value) {
			return value !== undefined &&  value !== null && value !== 'none';
		}
	
		// Private helper to get a constraint dimension
		// @param domNode : the node to check the constraint on
		// @param maxStyle : the style that defines the maximum for the direction we are using (maxWidth / maxHeight)
		// @param percentageProperty : property of parent to use when calculating width as a percentage
		// @see http://www.nathanaeljones.com/blog/2013/reading-max-width-cross-browser
		function getConstraintDimension(domNode, maxStyle, percentageProperty) {
			var view = document.defaultView;
			var parentNode = domNode.parentNode;
			var constrainedNode = view.getComputedStyle(domNode)[maxStyle];
			var constrainedContainer = view.getComputedStyle(parentNode)[maxStyle];
			var hasCNode = isConstrainedValue(constrainedNode);
			var hasCContainer = isConstrainedValue(constrainedContainer);
			var infinity = Number.POSITIVE_INFINITY;
	
			if (hasCNode || hasCContainer) {
				return Math.min(
					hasCNode? parseMaxStyle(constrainedNode, domNode, percentageProperty) : infinity,
					hasCContainer? parseMaxStyle(constrainedContainer, parentNode, percentageProperty) : infinity);
			}
	
			return 'none';
		}
		// returns Number or undefined if no constraint
		helpers.getConstraintWidth = function(domNode) {
			return getConstraintDimension(domNode, 'max-width', 'clientWidth');
		};
		// returns Number or undefined if no constraint
		helpers.getConstraintHeight = function(domNode) {
			return getConstraintDimension(domNode, 'max-height', 'clientHeight');
		};
		helpers.getMaximumWidth = function(domNode) {
			var container = domNode.parentNode;
			var padding = parseInt(helpers.getStyle(container, 'padding-left')) + parseInt(helpers.getStyle(container, 'padding-right'));
			var w = container.clientWidth - padding;
			var cw = helpers.getConstraintWidth(domNode);
			return isNaN(cw)? w : Math.min(w, cw);
		};
		helpers.getMaximumHeight = function(domNode) {
			var container = domNode.parentNode;
			var padding = parseInt(helpers.getStyle(container, 'padding-top')) + parseInt(helpers.getStyle(container, 'padding-bottom'));
			var h = container.clientHeight - padding;
			var ch = helpers.getConstraintHeight(domNode);
			return isNaN(ch)? h : Math.min(h, ch);
		};
		helpers.getStyle = function(el, property) {
			return el.currentStyle ?
				el.currentStyle[property] :
				document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
		};
		helpers.retinaScale = function(chart) {
			var ctx = chart.ctx;
			var canvas = chart.canvas;
			var width = canvas.width;
			var height = canvas.height;
			var pixelRatio = chart.currentDevicePixelRatio = window.devicePixelRatio || 1;
	
			if (pixelRatio !== 1) {
				canvas.height = height * pixelRatio;
				canvas.width = width * pixelRatio;
				ctx.scale(pixelRatio, pixelRatio);
	
				// Store the device pixel ratio so that we can go backwards in `destroy`.
				// The devicePixelRatio changes with zoom, so there are no guarantees that it is the same
				// when destroy is called
				chart.originalDevicePixelRatio = chart.originalDevicePixelRatio || pixelRatio;
			}
	
			canvas.style.width = width + 'px';
			canvas.style.height = height + 'px';
		};
		//-- Canvas methods
		helpers.clear = function(chart) {
			chart.ctx.clearRect(0, 0, chart.width, chart.height);
		};
		helpers.fontString = function(pixelSize, fontStyle, fontFamily) {
			return fontStyle + " " + pixelSize + "px " + fontFamily;
		};
		helpers.longestText = function(ctx, font, arrayOfThings, cache) {
			cache = cache || {};
			var data = cache.data = cache.data || {};
			var gc = cache.garbageCollect = cache.garbageCollect || [];
	
			if (cache.font !== font) {
				data = cache.data = {};
				gc = cache.garbageCollect = [];
				cache.font = font;
			}
	
			ctx.font = font;
			var longest = 0;
			helpers.each(arrayOfThings, function(thing) {
				// Undefined strings and arrays should not be measured
				if (thing !== undefined && thing !== null && helpers.isArray(thing) !== true) {
					longest = helpers.measureText(ctx, data, gc, longest, thing);
				} else if (helpers.isArray(thing)) {
					// if it is an array lets measure each element
					// to do maybe simplify this function a bit so we can do this more recursively?
					helpers.each(thing, function(nestedThing) {
						// Undefined strings and arrays should not be measured
						if (nestedThing !== undefined && nestedThing !== null && !helpers.isArray(nestedThing)) {
							longest = helpers.measureText(ctx, data, gc, longest, nestedThing);
						}
					});
				}
			});
	
			var gcLen = gc.length / 2;
			if (gcLen > arrayOfThings.length) {
				for (var i = 0; i < gcLen; i++) {
					delete data[gc[i]];
				}
				gc.splice(0, gcLen);
			}
			return longest;
		};
		helpers.measureText = function (ctx, data, gc, longest, string) {
			var textWidth = data[string];
			if (!textWidth) {
				textWidth = data[string] = ctx.measureText(string).width;
				gc.push(string);
			}
			if (textWidth > longest) {
				longest = textWidth;
			}
			return longest;
		};
		helpers.numberOfLabelLines = function(arrayOfThings) {
			var numberOfLines = 1;
			helpers.each(arrayOfThings, function(thing) {
				if (helpers.isArray(thing)) {
					if (thing.length > numberOfLines) {
						numberOfLines = thing.length;
					}
				}
			});
			return numberOfLines;
		};
		helpers.drawRoundedRectangle = function(ctx, x, y, width, height, radius) {
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.lineTo(x + width - radius, y);
			ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
			ctx.lineTo(x + width, y + height - radius);
			ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
			ctx.lineTo(x + radius, y + height);
			ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
			ctx.lineTo(x, y + radius);
			ctx.quadraticCurveTo(x, y, x + radius, y);
			ctx.closePath();
		};
		helpers.color = function(c) {
			if (!color) {
				console.log('Color.js not found!');
				return c;
			}
	
			/* global CanvasGradient */
			if (c instanceof CanvasGradient) {
				return color(Chart.defaults.global.defaultColor);
			}
	
			return color(c);
		};
		helpers.addResizeListener = function(node, callback) {
			// Hide an iframe before the node
			var hiddenIframe = document.createElement('iframe');
			var hiddenIframeClass = 'chartjs-hidden-iframe';
	
			if (hiddenIframe.classlist) {
				// can use classlist
				hiddenIframe.classlist.add(hiddenIframeClass);
			} else {
				hiddenIframe.setAttribute('class', hiddenIframeClass);
			}
	
			// Set the style
			var style = hiddenIframe.style;
			style.width = '100%';
			style.display = 'block';
			style.border = 0;
			style.height = 0;
			style.margin = 0;
			style.position = 'absolute';
			style.left = 0;
			style.right = 0;
			style.top = 0;
			style.bottom = 0;
	
			// Insert the iframe so that contentWindow is available
			node.insertBefore(hiddenIframe, node.firstChild);
	
			(hiddenIframe.contentWindow || hiddenIframe).onresize = function() {
				if (callback) {
					callback();
				}
			};
		};
		helpers.removeResizeListener = function(node) {
			var hiddenIframe = node.querySelector('.chartjs-hidden-iframe');
	
			// Remove the resize detect iframe
			if (hiddenIframe) {
				hiddenIframe.parentNode.removeChild(hiddenIframe);
			}
		};
		helpers.isArray = Array.isArray?
			function(obj) { return Array.isArray(obj); } :
			function(obj) {
				return Object.prototype.toString.call(obj) === '[object Array]';
			};
		//! @see http://stackoverflow.com/a/14853974
		helpers.arrayEquals = function(a0, a1) {
			var i, ilen, v0, v1;
	
			if (!a0 || !a1 || a0.length != a1.length) {
				return false;
			}
	
			for (i = 0, ilen=a0.length; i < ilen; ++i) {
				v0 = a0[i];
				v1 = a1[i];
	
				if (v0 instanceof Array && v1 instanceof Array) {
					if (!helpers.arrayEquals(v0, v1)) {
						return false;
					}
				} else if (v0 != v1) {
					// NOTE: two different object instances will never be equal: {x:20} != {x:20}
					return false;
				}
			}
	
			return true;
		};
		helpers.callCallback = function(fn, args, _tArg) {
			if (fn && typeof fn.call === 'function') {
				fn.apply(_tArg, args);
			}
		};
		helpers.getHoverColor = function(color) {
			/* global CanvasPattern */
			return (color instanceof CanvasPattern) ?
				color :
				helpers.color(color).saturate(0.5).darken(0.1).rgbString();
		};
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* MIT license */
	var convert = __webpack_require__(6);
	var string = __webpack_require__(8);
	
	var Color = function (obj) {
		if (obj instanceof Color) {
			return obj;
		}
		if (!(this instanceof Color)) {
			return new Color(obj);
		}
	
		this.values = {
			rgb: [0, 0, 0],
			hsl: [0, 0, 0],
			hsv: [0, 0, 0],
			hwb: [0, 0, 0],
			cmyk: [0, 0, 0, 0],
			alpha: 1
		};
	
		// parse Color() argument
		var vals;
		if (typeof obj === 'string') {
			vals = string.getRgba(obj);
			if (vals) {
				this.setValues('rgb', vals);
			} else if (vals = string.getHsla(obj)) {
				this.setValues('hsl', vals);
			} else if (vals = string.getHwb(obj)) {
				this.setValues('hwb', vals);
			} else {
				throw new Error('Unable to parse color from string "' + obj + '"');
			}
		} else if (typeof obj === 'object') {
			vals = obj;
			if (vals.r !== undefined || vals.red !== undefined) {
				this.setValues('rgb', vals);
			} else if (vals.l !== undefined || vals.lightness !== undefined) {
				this.setValues('hsl', vals);
			} else if (vals.v !== undefined || vals.value !== undefined) {
				this.setValues('hsv', vals);
			} else if (vals.w !== undefined || vals.whiteness !== undefined) {
				this.setValues('hwb', vals);
			} else if (vals.c !== undefined || vals.cyan !== undefined) {
				this.setValues('cmyk', vals);
			} else {
				throw new Error('Unable to parse color from object ' + JSON.stringify(obj));
			}
		}
	};
	
	Color.prototype = {
		rgb: function () {
			return this.setSpace('rgb', arguments);
		},
		hsl: function () {
			return this.setSpace('hsl', arguments);
		},
		hsv: function () {
			return this.setSpace('hsv', arguments);
		},
		hwb: function () {
			return this.setSpace('hwb', arguments);
		},
		cmyk: function () {
			return this.setSpace('cmyk', arguments);
		},
	
		rgbArray: function () {
			return this.values.rgb;
		},
		hslArray: function () {
			return this.values.hsl;
		},
		hsvArray: function () {
			return this.values.hsv;
		},
		hwbArray: function () {
			var values = this.values;
			if (values.alpha !== 1) {
				return values.hwb.concat([values.alpha]);
			}
			return values.hwb;
		},
		cmykArray: function () {
			return this.values.cmyk;
		},
		rgbaArray: function () {
			var values = this.values;
			return values.rgb.concat([values.alpha]);
		},
		hslaArray: function () {
			var values = this.values;
			return values.hsl.concat([values.alpha]);
		},
		alpha: function (val) {
			if (val === undefined) {
				return this.values.alpha;
			}
			this.setValues('alpha', val);
			return this;
		},
	
		red: function (val) {
			return this.setChannel('rgb', 0, val);
		},
		green: function (val) {
			return this.setChannel('rgb', 1, val);
		},
		blue: function (val) {
			return this.setChannel('rgb', 2, val);
		},
		hue: function (val) {
			if (val) {
				val %= 360;
				val = val < 0 ? 360 + val : val;
			}
			return this.setChannel('hsl', 0, val);
		},
		saturation: function (val) {
			return this.setChannel('hsl', 1, val);
		},
		lightness: function (val) {
			return this.setChannel('hsl', 2, val);
		},
		saturationv: function (val) {
			return this.setChannel('hsv', 1, val);
		},
		whiteness: function (val) {
			return this.setChannel('hwb', 1, val);
		},
		blackness: function (val) {
			return this.setChannel('hwb', 2, val);
		},
		value: function (val) {
			return this.setChannel('hsv', 2, val);
		},
		cyan: function (val) {
			return this.setChannel('cmyk', 0, val);
		},
		magenta: function (val) {
			return this.setChannel('cmyk', 1, val);
		},
		yellow: function (val) {
			return this.setChannel('cmyk', 2, val);
		},
		black: function (val) {
			return this.setChannel('cmyk', 3, val);
		},
	
		hexString: function () {
			return string.hexString(this.values.rgb);
		},
		rgbString: function () {
			return string.rgbString(this.values.rgb, this.values.alpha);
		},
		rgbaString: function () {
			return string.rgbaString(this.values.rgb, this.values.alpha);
		},
		percentString: function () {
			return string.percentString(this.values.rgb, this.values.alpha);
		},
		hslString: function () {
			return string.hslString(this.values.hsl, this.values.alpha);
		},
		hslaString: function () {
			return string.hslaString(this.values.hsl, this.values.alpha);
		},
		hwbString: function () {
			return string.hwbString(this.values.hwb, this.values.alpha);
		},
		keyword: function () {
			return string.keyword(this.values.rgb, this.values.alpha);
		},
	
		rgbNumber: function () {
			var rgb = this.values.rgb;
			return (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];
		},
	
		luminosity: function () {
			// http://www.w3.org/TR/WCAG20/#relativeluminancedef
			var rgb = this.values.rgb;
			var lum = [];
			for (var i = 0; i < rgb.length; i++) {
				var chan = rgb[i] / 255;
				lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
			}
			return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
		},
	
		contrast: function (color2) {
			// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
			var lum1 = this.luminosity();
			var lum2 = color2.luminosity();
			if (lum1 > lum2) {
				return (lum1 + 0.05) / (lum2 + 0.05);
			}
			return (lum2 + 0.05) / (lum1 + 0.05);
		},
	
		level: function (color2) {
			var contrastRatio = this.contrast(color2);
			if (contrastRatio >= 7.1) {
				return 'AAA';
			}
	
			return (contrastRatio >= 4.5) ? 'AA' : '';
		},
	
		dark: function () {
			// YIQ equation from http://24ways.org/2010/calculating-color-contrast
			var rgb = this.values.rgb;
			var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
			return yiq < 128;
		},
	
		light: function () {
			return !this.dark();
		},
	
		negate: function () {
			var rgb = [];
			for (var i = 0; i < 3; i++) {
				rgb[i] = 255 - this.values.rgb[i];
			}
			this.setValues('rgb', rgb);
			return this;
		},
	
		lighten: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] += hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		darken: function (ratio) {
			var hsl = this.values.hsl;
			hsl[2] -= hsl[2] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		saturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] += hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		desaturate: function (ratio) {
			var hsl = this.values.hsl;
			hsl[1] -= hsl[1] * ratio;
			this.setValues('hsl', hsl);
			return this;
		},
	
		whiten: function (ratio) {
			var hwb = this.values.hwb;
			hwb[1] += hwb[1] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},
	
		blacken: function (ratio) {
			var hwb = this.values.hwb;
			hwb[2] += hwb[2] * ratio;
			this.setValues('hwb', hwb);
			return this;
		},
	
		greyscale: function () {
			var rgb = this.values.rgb;
			// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
			var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
			this.setValues('rgb', [val, val, val]);
			return this;
		},
	
		clearer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha - (alpha * ratio));
			return this;
		},
	
		opaquer: function (ratio) {
			var alpha = this.values.alpha;
			this.setValues('alpha', alpha + (alpha * ratio));
			return this;
		},
	
		rotate: function (degrees) {
			var hsl = this.values.hsl;
			var hue = (hsl[0] + degrees) % 360;
			hsl[0] = hue < 0 ? 360 + hue : hue;
			this.setValues('hsl', hsl);
			return this;
		},
	
		/**
		 * Ported from sass implementation in C
		 * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		 */
		mix: function (mixinColor, weight) {
			var color1 = this;
			var color2 = mixinColor;
			var p = weight === undefined ? 0.5 : weight;
	
			var w = 2 * p - 1;
			var a = color1.alpha() - color2.alpha();
	
			var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
			var w2 = 1 - w1;
	
			return this
				.rgb(
					w1 * color1.red() + w2 * color2.red(),
					w1 * color1.green() + w2 * color2.green(),
					w1 * color1.blue() + w2 * color2.blue()
				)
				.alpha(color1.alpha() * p + color2.alpha() * (1 - p));
		},
	
		toJSON: function () {
			return this.rgb();
		},
	
		clone: function () {
			// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,
			// making the final build way to big to embed in Chart.js. So let's do it manually,
			// assuming that values to clone are 1 dimension arrays containing only numbers,
			// except 'alpha' which is a number.
			var result = new Color();
			var source = this.values;
			var target = result.values;
			var value, type;
	
			for (var prop in source) {
				if (source.hasOwnProperty(prop)) {
					value = source[prop];
					type = ({}).toString.call(value);
					if (type === '[object Array]') {
						target[prop] = value.slice(0);
					} else if (type === '[object Number]') {
						target[prop] = value;
					} else {
						console.error('unexpected color value:', value);
					}
				}
			}
	
			return result;
		}
	};
	
	Color.prototype.spaces = {
		rgb: ['red', 'green', 'blue'],
		hsl: ['hue', 'saturation', 'lightness'],
		hsv: ['hue', 'saturation', 'value'],
		hwb: ['hue', 'whiteness', 'blackness'],
		cmyk: ['cyan', 'magenta', 'yellow', 'black']
	};
	
	Color.prototype.maxes = {
		rgb: [255, 255, 255],
		hsl: [360, 100, 100],
		hsv: [360, 100, 100],
		hwb: [360, 100, 100],
		cmyk: [100, 100, 100, 100]
	};
	
	Color.prototype.getValues = function (space) {
		var values = this.values;
		var vals = {};
	
		for (var i = 0; i < space.length; i++) {
			vals[space.charAt(i)] = values[space][i];
		}
	
		if (values.alpha !== 1) {
			vals.a = values.alpha;
		}
	
		// {r: 255, g: 255, b: 255, a: 0.4}
		return vals;
	};
	
	Color.prototype.setValues = function (space, vals) {
		var values = this.values;
		var spaces = this.spaces;
		var maxes = this.maxes;
		var alpha = 1;
		var i;
	
		if (space === 'alpha') {
			alpha = vals;
		} else if (vals.length) {
			// [10, 10, 10]
			values[space] = vals.slice(0, space.length);
			alpha = vals[space.length];
		} else if (vals[space.charAt(0)] !== undefined) {
			// {r: 10, g: 10, b: 10}
			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[space.charAt(i)];
			}
	
			alpha = vals.a;
		} else if (vals[spaces[space][0]] !== undefined) {
			// {red: 10, green: 10, blue: 10}
			var chans = spaces[space];
	
			for (i = 0; i < space.length; i++) {
				values[space][i] = vals[chans[i]];
			}
	
			alpha = vals.alpha;
		}
	
		values.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));
	
		if (space === 'alpha') {
			return false;
		}
	
		var capped;
	
		// cap values of the space prior converting all values
		for (i = 0; i < space.length; i++) {
			capped = Math.max(0, Math.min(maxes[space][i], values[space][i]));
			values[space][i] = Math.round(capped);
		}
	
		// convert to all the other color spaces
		for (var sname in spaces) {
			if (sname !== space) {
				values[sname] = convert[space][sname](values[space]);
			}
		}
	
		return true;
	};
	
	Color.prototype.setSpace = function (space, args) {
		var vals = args[0];
	
		if (vals === undefined) {
			// color.rgb()
			return this.getValues(space);
		}
	
		// color.rgb(10, 10, 10)
		if (typeof vals === 'number') {
			vals = Array.prototype.slice.call(args);
		}
	
		this.setValues(space, vals);
		return this;
	};
	
	Color.prototype.setChannel = function (space, index, val) {
		var svalues = this.values[space];
		if (val === undefined) {
			// color.red()
			return svalues[index];
		} else if (val === svalues[index]) {
			// color.red(color.red())
			return this;
		}
	
		// color.red(100)
		svalues[index] = val;
		this.setValues(space, svalues);
	
		return this;
	};
	
	if (typeof window !== 'undefined') {
		window.Color = Color;
	}
	
	module.exports = Color;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var conversions = __webpack_require__(7);
	
	var convert = function() {
	   return new Converter();
	}
	
	for (var func in conversions) {
	  // export Raw versions
	  convert[func + "Raw"] =  (function(func) {
	    // accept array or plain args
	    return function(arg) {
	      if (typeof arg == "number")
	        arg = Array.prototype.slice.call(arguments);
	      return conversions[func](arg);
	    }
	  })(func);
	
	  var pair = /(\w+)2(\w+)/.exec(func),
	      from = pair[1],
	      to = pair[2];
	
	  // export rgb2hsl and ["rgb"]["hsl"]
	  convert[from] = convert[from] || {};
	
	  convert[from][to] = convert[func] = (function(func) { 
	    return function(arg) {
	      if (typeof arg == "number")
	        arg = Array.prototype.slice.call(arguments);
	      
	      var val = conversions[func](arg);
	      if (typeof val == "string" || val === undefined)
	        return val; // keyword
	
	      for (var i = 0; i < val.length; i++)
	        val[i] = Math.round(val[i]);
	      return val;
	    }
	  })(func);
	}
	
	
	/* Converter does lazy conversion and caching */
	var Converter = function() {
	   this.convs = {};
	};
	
	/* Either get the values for a space or
	  set the values for a space, depending on args */
	Converter.prototype.routeSpace = function(space, args) {
	   var values = args[0];
	   if (values === undefined) {
	      // color.rgb()
	      return this.getValues(space);
	   }
	   // color.rgb(10, 10, 10)
	   if (typeof values == "number") {
	      values = Array.prototype.slice.call(args);        
	   }
	
	   return this.setValues(space, values);
	};
	  
	/* Set the values for a space, invalidating cache */
	Converter.prototype.setValues = function(space, values) {
	   this.space = space;
	   this.convs = {};
	   this.convs[space] = values;
	   return this;
	};
	
	/* Get the values for a space. If there's already
	  a conversion for the space, fetch it, otherwise
	  compute it */
	Converter.prototype.getValues = function(space) {
	   var vals = this.convs[space];
	   if (!vals) {
	      var fspace = this.space,
	          from = this.convs[fspace];
	      vals = convert[fspace][space](from);
	
	      this.convs[space] = vals;
	   }
	  return vals;
	};
	
	["rgb", "hsl", "hsv", "cmyk", "keyword"].forEach(function(space) {
	   Converter.prototype[space] = function(vals) {
	      return this.routeSpace(space, arguments);
	   }
	});
	
	module.exports = convert;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* MIT license */
	
	module.exports = {
	  rgb2hsl: rgb2hsl,
	  rgb2hsv: rgb2hsv,
	  rgb2hwb: rgb2hwb,
	  rgb2cmyk: rgb2cmyk,
	  rgb2keyword: rgb2keyword,
	  rgb2xyz: rgb2xyz,
	  rgb2lab: rgb2lab,
	  rgb2lch: rgb2lch,
	
	  hsl2rgb: hsl2rgb,
	  hsl2hsv: hsl2hsv,
	  hsl2hwb: hsl2hwb,
	  hsl2cmyk: hsl2cmyk,
	  hsl2keyword: hsl2keyword,
	
	  hsv2rgb: hsv2rgb,
	  hsv2hsl: hsv2hsl,
	  hsv2hwb: hsv2hwb,
	  hsv2cmyk: hsv2cmyk,
	  hsv2keyword: hsv2keyword,
	
	  hwb2rgb: hwb2rgb,
	  hwb2hsl: hwb2hsl,
	  hwb2hsv: hwb2hsv,
	  hwb2cmyk: hwb2cmyk,
	  hwb2keyword: hwb2keyword,
	
	  cmyk2rgb: cmyk2rgb,
	  cmyk2hsl: cmyk2hsl,
	  cmyk2hsv: cmyk2hsv,
	  cmyk2hwb: cmyk2hwb,
	  cmyk2keyword: cmyk2keyword,
	
	  keyword2rgb: keyword2rgb,
	  keyword2hsl: keyword2hsl,
	  keyword2hsv: keyword2hsv,
	  keyword2hwb: keyword2hwb,
	  keyword2cmyk: keyword2cmyk,
	  keyword2lab: keyword2lab,
	  keyword2xyz: keyword2xyz,
	
	  xyz2rgb: xyz2rgb,
	  xyz2lab: xyz2lab,
	  xyz2lch: xyz2lch,
	
	  lab2xyz: lab2xyz,
	  lab2rgb: lab2rgb,
	  lab2lch: lab2lch,
	
	  lch2lab: lch2lab,
	  lch2xyz: lch2xyz,
	  lch2rgb: lch2rgb
	}
	
	
	function rgb2hsl(rgb) {
	  var r = rgb[0]/255,
	      g = rgb[1]/255,
	      b = rgb[2]/255,
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      delta = max - min,
	      h, s, l;
	
	  if (max == min)
	    h = 0;
	  else if (r == max)
	    h = (g - b) / delta;
	  else if (g == max)
	    h = 2 + (b - r) / delta;
	  else if (b == max)
	    h = 4 + (r - g)/ delta;
	
	  h = Math.min(h * 60, 360);
	
	  if (h < 0)
	    h += 360;
	
	  l = (min + max) / 2;
	
	  if (max == min)
	    s = 0;
	  else if (l <= 0.5)
	    s = delta / (max + min);
	  else
	    s = delta / (2 - max - min);
	
	  return [h, s * 100, l * 100];
	}
	
	function rgb2hsv(rgb) {
	  var r = rgb[0],
	      g = rgb[1],
	      b = rgb[2],
	      min = Math.min(r, g, b),
	      max = Math.max(r, g, b),
	      delta = max - min,
	      h, s, v;
	
	  if (max == 0)
	    s = 0;
	  else
	    s = (delta/max * 1000)/10;
	
	  if (max == min)
	    h = 0;
	  else if (r == max)
	    h = (g - b) / delta;
	  else if (g == max)
	    h = 2 + (b - r) / delta;
	  else if (b == max)
	    h = 4 + (r - g) / delta;
	
	  h = Math.min(h * 60, 360);
	
	  if (h < 0)
	    h += 360;
	
	  v = ((max / 255) * 1000) / 10;
	
	  return [h, s, v];
	}
	
	function rgb2hwb(rgb) {
	  var r = rgb[0],
	      g = rgb[1],
	      b = rgb[2],
	      h = rgb2hsl(rgb)[0],
	      w = 1/255 * Math.min(r, Math.min(g, b)),
	      b = 1 - 1/255 * Math.max(r, Math.max(g, b));
	
	  return [h, w * 100, b * 100];
	}
	
	function rgb2cmyk(rgb) {
	  var r = rgb[0] / 255,
	      g = rgb[1] / 255,
	      b = rgb[2] / 255,
	      c, m, y, k;
	
	  k = Math.min(1 - r, 1 - g, 1 - b);
	  c = (1 - r - k) / (1 - k) || 0;
	  m = (1 - g - k) / (1 - k) || 0;
	  y = (1 - b - k) / (1 - k) || 0;
	  return [c * 100, m * 100, y * 100, k * 100];
	}
	
	function rgb2keyword(rgb) {
	  return reverseKeywords[JSON.stringify(rgb)];
	}
	
	function rgb2xyz(rgb) {
	  var r = rgb[0] / 255,
	      g = rgb[1] / 255,
	      b = rgb[2] / 255;
	
	  // assume sRGB
	  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);
	
	  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
	
	  return [x * 100, y *100, z * 100];
	}
	
	function rgb2lab(rgb) {
	  var xyz = rgb2xyz(rgb),
	        x = xyz[0],
	        y = xyz[1],
	        z = xyz[2],
	        l, a, b;
	
	  x /= 95.047;
	  y /= 100;
	  z /= 108.883;
	
	  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
	  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
	  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);
	
	  l = (116 * y) - 16;
	  a = 500 * (x - y);
	  b = 200 * (y - z);
	
	  return [l, a, b];
	}
	
	function rgb2lch(args) {
	  return lab2lch(rgb2lab(args));
	}
	
	function hsl2rgb(hsl) {
	  var h = hsl[0] / 360,
	      s = hsl[1] / 100,
	      l = hsl[2] / 100,
	      t1, t2, t3, rgb, val;
	
	  if (s == 0) {
	    val = l * 255;
	    return [val, val, val];
	  }
	
	  if (l < 0.5)
	    t2 = l * (1 + s);
	  else
	    t2 = l + s - l * s;
	  t1 = 2 * l - t2;
	
	  rgb = [0, 0, 0];
	  for (var i = 0; i < 3; i++) {
	    t3 = h + 1 / 3 * - (i - 1);
	    t3 < 0 && t3++;
	    t3 > 1 && t3--;
	
	    if (6 * t3 < 1)
	      val = t1 + (t2 - t1) * 6 * t3;
	    else if (2 * t3 < 1)
	      val = t2;
	    else if (3 * t3 < 2)
	      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
	    else
	      val = t1;
	
	    rgb[i] = val * 255;
	  }
	
	  return rgb;
	}
	
	function hsl2hsv(hsl) {
	  var h = hsl[0],
	      s = hsl[1] / 100,
	      l = hsl[2] / 100,
	      sv, v;
	
	  if(l === 0) {
	      // no need to do calc on black
	      // also avoids divide by 0 error
	      return [0, 0, 0];
	  }
	
	  l *= 2;
	  s *= (l <= 1) ? l : 2 - l;
	  v = (l + s) / 2;
	  sv = (2 * s) / (l + s);
	  return [h, sv * 100, v * 100];
	}
	
	function hsl2hwb(args) {
	  return rgb2hwb(hsl2rgb(args));
	}
	
	function hsl2cmyk(args) {
	  return rgb2cmyk(hsl2rgb(args));
	}
	
	function hsl2keyword(args) {
	  return rgb2keyword(hsl2rgb(args));
	}
	
	
	function hsv2rgb(hsv) {
	  var h = hsv[0] / 60,
	      s = hsv[1] / 100,
	      v = hsv[2] / 100,
	      hi = Math.floor(h) % 6;
	
	  var f = h - Math.floor(h),
	      p = 255 * v * (1 - s),
	      q = 255 * v * (1 - (s * f)),
	      t = 255 * v * (1 - (s * (1 - f))),
	      v = 255 * v;
	
	  switch(hi) {
	    case 0:
	      return [v, t, p];
	    case 1:
	      return [q, v, p];
	    case 2:
	      return [p, v, t];
	    case 3:
	      return [p, q, v];
	    case 4:
	      return [t, p, v];
	    case 5:
	      return [v, p, q];
	  }
	}
	
	function hsv2hsl(hsv) {
	  var h = hsv[0],
	      s = hsv[1] / 100,
	      v = hsv[2] / 100,
	      sl, l;
	
	  l = (2 - s) * v;
	  sl = s * v;
	  sl /= (l <= 1) ? l : 2 - l;
	  sl = sl || 0;
	  l /= 2;
	  return [h, sl * 100, l * 100];
	}
	
	function hsv2hwb(args) {
	  return rgb2hwb(hsv2rgb(args))
	}
	
	function hsv2cmyk(args) {
	  return rgb2cmyk(hsv2rgb(args));
	}
	
	function hsv2keyword(args) {
	  return rgb2keyword(hsv2rgb(args));
	}
	
	// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
	function hwb2rgb(hwb) {
	  var h = hwb[0] / 360,
	      wh = hwb[1] / 100,
	      bl = hwb[2] / 100,
	      ratio = wh + bl,
	      i, v, f, n;
	
	  // wh + bl cant be > 1
	  if (ratio > 1) {
	    wh /= ratio;
	    bl /= ratio;
	  }
	
	  i = Math.floor(6 * h);
	  v = 1 - bl;
	  f = 6 * h - i;
	  if ((i & 0x01) != 0) {
	    f = 1 - f;
	  }
	  n = wh + f * (v - wh);  // linear interpolation
	
	  switch (i) {
	    default:
	    case 6:
	    case 0: r = v; g = n; b = wh; break;
	    case 1: r = n; g = v; b = wh; break;
	    case 2: r = wh; g = v; b = n; break;
	    case 3: r = wh; g = n; b = v; break;
	    case 4: r = n; g = wh; b = v; break;
	    case 5: r = v; g = wh; b = n; break;
	  }
	
	  return [r * 255, g * 255, b * 255];
	}
	
	function hwb2hsl(args) {
	  return rgb2hsl(hwb2rgb(args));
	}
	
	function hwb2hsv(args) {
	  return rgb2hsv(hwb2rgb(args));
	}
	
	function hwb2cmyk(args) {
	  return rgb2cmyk(hwb2rgb(args));
	}
	
	function hwb2keyword(args) {
	  return rgb2keyword(hwb2rgb(args));
	}
	
	function cmyk2rgb(cmyk) {
	  var c = cmyk[0] / 100,
	      m = cmyk[1] / 100,
	      y = cmyk[2] / 100,
	      k = cmyk[3] / 100,
	      r, g, b;
	
	  r = 1 - Math.min(1, c * (1 - k) + k);
	  g = 1 - Math.min(1, m * (1 - k) + k);
	  b = 1 - Math.min(1, y * (1 - k) + k);
	  return [r * 255, g * 255, b * 255];
	}
	
	function cmyk2hsl(args) {
	  return rgb2hsl(cmyk2rgb(args));
	}
	
	function cmyk2hsv(args) {
	  return rgb2hsv(cmyk2rgb(args));
	}
	
	function cmyk2hwb(args) {
	  return rgb2hwb(cmyk2rgb(args));
	}
	
	function cmyk2keyword(args) {
	  return rgb2keyword(cmyk2rgb(args));
	}
	
	
	function xyz2rgb(xyz) {
	  var x = xyz[0] / 100,
	      y = xyz[1] / 100,
	      z = xyz[2] / 100,
	      r, g, b;
	
	  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
	
	  // assume sRGB
	  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
	    : r = (r * 12.92);
	
	  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
	    : g = (g * 12.92);
	
	  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
	    : b = (b * 12.92);
	
	  r = Math.min(Math.max(0, r), 1);
	  g = Math.min(Math.max(0, g), 1);
	  b = Math.min(Math.max(0, b), 1);
	
	  return [r * 255, g * 255, b * 255];
	}
	
	function xyz2lab(xyz) {
	  var x = xyz[0],
	      y = xyz[1],
	      z = xyz[2],
	      l, a, b;
	
	  x /= 95.047;
	  y /= 100;
	  z /= 108.883;
	
	  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);
	  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);
	  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);
	
	  l = (116 * y) - 16;
	  a = 500 * (x - y);
	  b = 200 * (y - z);
	
	  return [l, a, b];
	}
	
	function xyz2lch(args) {
	  return lab2lch(xyz2lab(args));
	}
	
	function lab2xyz(lab) {
	  var l = lab[0],
	      a = lab[1],
	      b = lab[2],
	      x, y, z, y2;
	
	  if (l <= 8) {
	    y = (l * 100) / 903.3;
	    y2 = (7.787 * (y / 100)) + (16 / 116);
	  } else {
	    y = 100 * Math.pow((l + 16) / 116, 3);
	    y2 = Math.pow(y / 100, 1/3);
	  }
	
	  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);
	
	  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);
	
	  return [x, y, z];
	}
	
	function lab2lch(lab) {
	  var l = lab[0],
	      a = lab[1],
	      b = lab[2],
	      hr, h, c;
	
	  hr = Math.atan2(b, a);
	  h = hr * 360 / 2 / Math.PI;
	  if (h < 0) {
	    h += 360;
	  }
	  c = Math.sqrt(a * a + b * b);
	  return [l, c, h];
	}
	
	function lab2rgb(args) {
	  return xyz2rgb(lab2xyz(args));
	}
	
	function lch2lab(lch) {
	  var l = lch[0],
	      c = lch[1],
	      h = lch[2],
	      a, b, hr;
	
	  hr = h / 360 * 2 * Math.PI;
	  a = c * Math.cos(hr);
	  b = c * Math.sin(hr);
	  return [l, a, b];
	}
	
	function lch2xyz(args) {
	  return lab2xyz(lch2lab(args));
	}
	
	function lch2rgb(args) {
	  return lab2rgb(lch2lab(args));
	}
	
	function keyword2rgb(keyword) {
	  return cssKeywords[keyword];
	}
	
	function keyword2hsl(args) {
	  return rgb2hsl(keyword2rgb(args));
	}
	
	function keyword2hsv(args) {
	  return rgb2hsv(keyword2rgb(args));
	}
	
	function keyword2hwb(args) {
	  return rgb2hwb(keyword2rgb(args));
	}
	
	function keyword2cmyk(args) {
	  return rgb2cmyk(keyword2rgb(args));
	}
	
	function keyword2lab(args) {
	  return rgb2lab(keyword2rgb(args));
	}
	
	function keyword2xyz(args) {
	  return rgb2xyz(keyword2rgb(args));
	}
	
	var cssKeywords = {
	  aliceblue:  [240,248,255],
	  antiquewhite: [250,235,215],
	  aqua: [0,255,255],
	  aquamarine: [127,255,212],
	  azure:  [240,255,255],
	  beige:  [245,245,220],
	  bisque: [255,228,196],
	  black:  [0,0,0],
	  blanchedalmond: [255,235,205],
	  blue: [0,0,255],
	  blueviolet: [138,43,226],
	  brown:  [165,42,42],
	  burlywood:  [222,184,135],
	  cadetblue:  [95,158,160],
	  chartreuse: [127,255,0],
	  chocolate:  [210,105,30],
	  coral:  [255,127,80],
	  cornflowerblue: [100,149,237],
	  cornsilk: [255,248,220],
	  crimson:  [220,20,60],
	  cyan: [0,255,255],
	  darkblue: [0,0,139],
	  darkcyan: [0,139,139],
	  darkgoldenrod:  [184,134,11],
	  darkgray: [169,169,169],
	  darkgreen:  [0,100,0],
	  darkgrey: [169,169,169],
	  darkkhaki:  [189,183,107],
	  darkmagenta:  [139,0,139],
	  darkolivegreen: [85,107,47],
	  darkorange: [255,140,0],
	  darkorchid: [153,50,204],
	  darkred:  [139,0,0],
	  darksalmon: [233,150,122],
	  darkseagreen: [143,188,143],
	  darkslateblue:  [72,61,139],
	  darkslategray:  [47,79,79],
	  darkslategrey:  [47,79,79],
	  darkturquoise:  [0,206,209],
	  darkviolet: [148,0,211],
	  deeppink: [255,20,147],
	  deepskyblue:  [0,191,255],
	  dimgray:  [105,105,105],
	  dimgrey:  [105,105,105],
	  dodgerblue: [30,144,255],
	  firebrick:  [178,34,34],
	  floralwhite:  [255,250,240],
	  forestgreen:  [34,139,34],
	  fuchsia:  [255,0,255],
	  gainsboro:  [220,220,220],
	  ghostwhite: [248,248,255],
	  gold: [255,215,0],
	  goldenrod:  [218,165,32],
	  gray: [128,128,128],
	  green:  [0,128,0],
	  greenyellow:  [173,255,47],
	  grey: [128,128,128],
	  honeydew: [240,255,240],
	  hotpink:  [255,105,180],
	  indianred:  [205,92,92],
	  indigo: [75,0,130],
	  ivory:  [255,255,240],
	  khaki:  [240,230,140],
	  lavender: [230,230,250],
	  lavenderblush:  [255,240,245],
	  lawngreen:  [124,252,0],
	  lemonchiffon: [255,250,205],
	  lightblue:  [173,216,230],
	  lightcoral: [240,128,128],
	  lightcyan:  [224,255,255],
	  lightgoldenrodyellow: [250,250,210],
	  lightgray:  [211,211,211],
	  lightgreen: [144,238,144],
	  lightgrey:  [211,211,211],
	  lightpink:  [255,182,193],
	  lightsalmon:  [255,160,122],
	  lightseagreen:  [32,178,170],
	  lightskyblue: [135,206,250],
	  lightslategray: [119,136,153],
	  lightslategrey: [119,136,153],
	  lightsteelblue: [176,196,222],
	  lightyellow:  [255,255,224],
	  lime: [0,255,0],
	  limegreen:  [50,205,50],
	  linen:  [250,240,230],
	  magenta:  [255,0,255],
	  maroon: [128,0,0],
	  mediumaquamarine: [102,205,170],
	  mediumblue: [0,0,205],
	  mediumorchid: [186,85,211],
	  mediumpurple: [147,112,219],
	  mediumseagreen: [60,179,113],
	  mediumslateblue:  [123,104,238],
	  mediumspringgreen:  [0,250,154],
	  mediumturquoise:  [72,209,204],
	  mediumvioletred:  [199,21,133],
	  midnightblue: [25,25,112],
	  mintcream:  [245,255,250],
	  mistyrose:  [255,228,225],
	  moccasin: [255,228,181],
	  navajowhite:  [255,222,173],
	  navy: [0,0,128],
	  oldlace:  [253,245,230],
	  olive:  [128,128,0],
	  olivedrab:  [107,142,35],
	  orange: [255,165,0],
	  orangered:  [255,69,0],
	  orchid: [218,112,214],
	  palegoldenrod:  [238,232,170],
	  palegreen:  [152,251,152],
	  paleturquoise:  [175,238,238],
	  palevioletred:  [219,112,147],
	  papayawhip: [255,239,213],
	  peachpuff:  [255,218,185],
	  peru: [205,133,63],
	  pink: [255,192,203],
	  plum: [221,160,221],
	  powderblue: [176,224,230],
	  purple: [128,0,128],
	  rebeccapurple: [102, 51, 153],
	  red:  [255,0,0],
	  rosybrown:  [188,143,143],
	  royalblue:  [65,105,225],
	  saddlebrown:  [139,69,19],
	  salmon: [250,128,114],
	  sandybrown: [244,164,96],
	  seagreen: [46,139,87],
	  seashell: [255,245,238],
	  sienna: [160,82,45],
	  silver: [192,192,192],
	  skyblue:  [135,206,235],
	  slateblue:  [106,90,205],
	  slategray:  [112,128,144],
	  slategrey:  [112,128,144],
	  snow: [255,250,250],
	  springgreen:  [0,255,127],
	  steelblue:  [70,130,180],
	  tan:  [210,180,140],
	  teal: [0,128,128],
	  thistle:  [216,191,216],
	  tomato: [255,99,71],
	  turquoise:  [64,224,208],
	  violet: [238,130,238],
	  wheat:  [245,222,179],
	  white:  [255,255,255],
	  whitesmoke: [245,245,245],
	  yellow: [255,255,0],
	  yellowgreen:  [154,205,50]
	};
	
	var reverseKeywords = {};
	for (var key in cssKeywords) {
	  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;
	}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* MIT license */
	var colorNames = __webpack_require__(9);
	
	module.exports = {
	   getRgba: getRgba,
	   getHsla: getHsla,
	   getRgb: getRgb,
	   getHsl: getHsl,
	   getHwb: getHwb,
	   getAlpha: getAlpha,
	
	   hexString: hexString,
	   rgbString: rgbString,
	   rgbaString: rgbaString,
	   percentString: percentString,
	   percentaString: percentaString,
	   hslString: hslString,
	   hslaString: hslaString,
	   hwbString: hwbString,
	   keyword: keyword
	}
	
	function getRgba(string) {
	   if (!string) {
	      return;
	   }
	   var abbr =  /^#([a-fA-F0-9]{3})$/,
	       hex =  /^#([a-fA-F0-9]{6})$/,
	       rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	       per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/,
	       keyword = /(\w+)/;
	
	   var rgb = [0, 0, 0],
	       a = 1,
	       match = string.match(abbr);
	   if (match) {
	      match = match[1];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i] + match[i], 16);
	      }
	   }
	   else if (match = string.match(hex)) {
	      match = match[1];
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match.slice(i * 2, i * 2 + 2), 16);
	      }
	   }
	   else if (match = string.match(rgba)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = parseInt(match[i + 1]);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(per)) {
	      for (var i = 0; i < rgb.length; i++) {
	         rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
	      }
	      a = parseFloat(match[4]);
	   }
	   else if (match = string.match(keyword)) {
	      if (match[1] == "transparent") {
	         return [0, 0, 0, 0];
	      }
	      rgb = colorNames[match[1]];
	      if (!rgb) {
	         return;
	      }
	   }
	
	   for (var i = 0; i < rgb.length; i++) {
	      rgb[i] = scale(rgb[i], 0, 255);
	   }
	   if (!a && a != 0) {
	      a = 1;
	   }
	   else {
	      a = scale(a, 0, 1);
	   }
	   rgb[3] = a;
	   return rgb;
	}
	
	function getHsla(string) {
	   if (!string) {
	      return;
	   }
	   var hsl = /^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hsl);
	   if (match) {
	      var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          s = scale(parseFloat(match[2]), 0, 100),
	          l = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, s, l, a];
	   }
	}
	
	function getHwb(string) {
	   if (!string) {
	      return;
	   }
	   var hwb = /^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/;
	   var match = string.match(hwb);
	   if (match) {
	    var alpha = parseFloat(match[4]);
	      var h = scale(parseInt(match[1]), 0, 360),
	          w = scale(parseFloat(match[2]), 0, 100),
	          b = scale(parseFloat(match[3]), 0, 100),
	          a = scale(isNaN(alpha) ? 1 : alpha, 0, 1);
	      return [h, w, b, a];
	   }
	}
	
	function getRgb(string) {
	   var rgba = getRgba(string);
	   return rgba && rgba.slice(0, 3);
	}
	
	function getHsl(string) {
	  var hsla = getHsla(string);
	  return hsla && hsla.slice(0, 3);
	}
	
	function getAlpha(string) {
	   var vals = getRgba(string);
	   if (vals) {
	      return vals[3];
	   }
	   else if (vals = getHsla(string)) {
	      return vals[3];
	   }
	   else if (vals = getHwb(string)) {
	      return vals[3];
	   }
	}
	
	// generators
	function hexString(rgb) {
	   return "#" + hexDouble(rgb[0]) + hexDouble(rgb[1])
	              + hexDouble(rgb[2]);
	}
	
	function rgbString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return rgbaString(rgba, alpha);
	   }
	   return "rgb(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2] + ")";
	}
	
	function rgbaString(rgba, alpha) {
	   if (alpha === undefined) {
	      alpha = (rgba[3] !== undefined ? rgba[3] : 1);
	   }
	   return "rgba(" + rgba[0] + ", " + rgba[1] + ", " + rgba[2]
	           + ", " + alpha + ")";
	}
	
	function percentString(rgba, alpha) {
	   if (alpha < 1 || (rgba[3] && rgba[3] < 1)) {
	      return percentaString(rgba, alpha);
	   }
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);
	
	   return "rgb(" + r + "%, " + g + "%, " + b + "%)";
	}
	
	function percentaString(rgba, alpha) {
	   var r = Math.round(rgba[0]/255 * 100),
	       g = Math.round(rgba[1]/255 * 100),
	       b = Math.round(rgba[2]/255 * 100);
	   return "rgba(" + r + "%, " + g + "%, " + b + "%, " + (alpha || rgba[3] || 1) + ")";
	}
	
	function hslString(hsla, alpha) {
	   if (alpha < 1 || (hsla[3] && hsla[3] < 1)) {
	      return hslaString(hsla, alpha);
	   }
	   return "hsl(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%)";
	}
	
	function hslaString(hsla, alpha) {
	   if (alpha === undefined) {
	      alpha = (hsla[3] !== undefined ? hsla[3] : 1);
	   }
	   return "hsla(" + hsla[0] + ", " + hsla[1] + "%, " + hsla[2] + "%, "
	           + alpha + ")";
	}
	
	// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
	// (hwb have alpha optional & 1 is default value)
	function hwbString(hwb, alpha) {
	   if (alpha === undefined) {
	      alpha = (hwb[3] !== undefined ? hwb[3] : 1);
	   }
	   return "hwb(" + hwb[0] + ", " + hwb[1] + "%, " + hwb[2] + "%"
	           + (alpha !== undefined && alpha !== 1 ? ", " + alpha : "") + ")";
	}
	
	function keyword(rgb) {
	  return reverseNames[rgb.slice(0, 3)];
	}
	
	// helpers
	function scale(num, min, max) {
	   return Math.min(Math.max(min, num), max);
	}
	
	function hexDouble(num) {
	  var str = num.toString(16).toUpperCase();
	  return (str.length < 2) ? "0" + str : str;
	}
	
	
	//create a list of reverse color names
	var reverseNames = {};
	for (var name in colorNames) {
	   reverseNames[colorNames[name]] = name;
	}


/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = {
		"aliceblue": [240, 248, 255],
		"antiquewhite": [250, 235, 215],
		"aqua": [0, 255, 255],
		"aquamarine": [127, 255, 212],
		"azure": [240, 255, 255],
		"beige": [245, 245, 220],
		"bisque": [255, 228, 196],
		"black": [0, 0, 0],
		"blanchedalmond": [255, 235, 205],
		"blue": [0, 0, 255],
		"blueviolet": [138, 43, 226],
		"brown": [165, 42, 42],
		"burlywood": [222, 184, 135],
		"cadetblue": [95, 158, 160],
		"chartreuse": [127, 255, 0],
		"chocolate": [210, 105, 30],
		"coral": [255, 127, 80],
		"cornflowerblue": [100, 149, 237],
		"cornsilk": [255, 248, 220],
		"crimson": [220, 20, 60],
		"cyan": [0, 255, 255],
		"darkblue": [0, 0, 139],
		"darkcyan": [0, 139, 139],
		"darkgoldenrod": [184, 134, 11],
		"darkgray": [169, 169, 169],
		"darkgreen": [0, 100, 0],
		"darkgrey": [169, 169, 169],
		"darkkhaki": [189, 183, 107],
		"darkmagenta": [139, 0, 139],
		"darkolivegreen": [85, 107, 47],
		"darkorange": [255, 140, 0],
		"darkorchid": [153, 50, 204],
		"darkred": [139, 0, 0],
		"darksalmon": [233, 150, 122],
		"darkseagreen": [143, 188, 143],
		"darkslateblue": [72, 61, 139],
		"darkslategray": [47, 79, 79],
		"darkslategrey": [47, 79, 79],
		"darkturquoise": [0, 206, 209],
		"darkviolet": [148, 0, 211],
		"deeppink": [255, 20, 147],
		"deepskyblue": [0, 191, 255],
		"dimgray": [105, 105, 105],
		"dimgrey": [105, 105, 105],
		"dodgerblue": [30, 144, 255],
		"firebrick": [178, 34, 34],
		"floralwhite": [255, 250, 240],
		"forestgreen": [34, 139, 34],
		"fuchsia": [255, 0, 255],
		"gainsboro": [220, 220, 220],
		"ghostwhite": [248, 248, 255],
		"gold": [255, 215, 0],
		"goldenrod": [218, 165, 32],
		"gray": [128, 128, 128],
		"green": [0, 128, 0],
		"greenyellow": [173, 255, 47],
		"grey": [128, 128, 128],
		"honeydew": [240, 255, 240],
		"hotpink": [255, 105, 180],
		"indianred": [205, 92, 92],
		"indigo": [75, 0, 130],
		"ivory": [255, 255, 240],
		"khaki": [240, 230, 140],
		"lavender": [230, 230, 250],
		"lavenderblush": [255, 240, 245],
		"lawngreen": [124, 252, 0],
		"lemonchiffon": [255, 250, 205],
		"lightblue": [173, 216, 230],
		"lightcoral": [240, 128, 128],
		"lightcyan": [224, 255, 255],
		"lightgoldenrodyellow": [250, 250, 210],
		"lightgray": [211, 211, 211],
		"lightgreen": [144, 238, 144],
		"lightgrey": [211, 211, 211],
		"lightpink": [255, 182, 193],
		"lightsalmon": [255, 160, 122],
		"lightseagreen": [32, 178, 170],
		"lightskyblue": [135, 206, 250],
		"lightslategray": [119, 136, 153],
		"lightslategrey": [119, 136, 153],
		"lightsteelblue": [176, 196, 222],
		"lightyellow": [255, 255, 224],
		"lime": [0, 255, 0],
		"limegreen": [50, 205, 50],
		"linen": [250, 240, 230],
		"magenta": [255, 0, 255],
		"maroon": [128, 0, 0],
		"mediumaquamarine": [102, 205, 170],
		"mediumblue": [0, 0, 205],
		"mediumorchid": [186, 85, 211],
		"mediumpurple": [147, 112, 219],
		"mediumseagreen": [60, 179, 113],
		"mediumslateblue": [123, 104, 238],
		"mediumspringgreen": [0, 250, 154],
		"mediumturquoise": [72, 209, 204],
		"mediumvioletred": [199, 21, 133],
		"midnightblue": [25, 25, 112],
		"mintcream": [245, 255, 250],
		"mistyrose": [255, 228, 225],
		"moccasin": [255, 228, 181],
		"navajowhite": [255, 222, 173],
		"navy": [0, 0, 128],
		"oldlace": [253, 245, 230],
		"olive": [128, 128, 0],
		"olivedrab": [107, 142, 35],
		"orange": [255, 165, 0],
		"orangered": [255, 69, 0],
		"orchid": [218, 112, 214],
		"palegoldenrod": [238, 232, 170],
		"palegreen": [152, 251, 152],
		"paleturquoise": [175, 238, 238],
		"palevioletred": [219, 112, 147],
		"papayawhip": [255, 239, 213],
		"peachpuff": [255, 218, 185],
		"peru": [205, 133, 63],
		"pink": [255, 192, 203],
		"plum": [221, 160, 221],
		"powderblue": [176, 224, 230],
		"purple": [128, 0, 128],
		"rebeccapurple": [102, 51, 153],
		"red": [255, 0, 0],
		"rosybrown": [188, 143, 143],
		"royalblue": [65, 105, 225],
		"saddlebrown": [139, 69, 19],
		"salmon": [250, 128, 114],
		"sandybrown": [244, 164, 96],
		"seagreen": [46, 139, 87],
		"seashell": [255, 245, 238],
		"sienna": [160, 82, 45],
		"silver": [192, 192, 192],
		"skyblue": [135, 206, 235],
		"slateblue": [106, 90, 205],
		"slategray": [112, 128, 144],
		"slategrey": [112, 128, 144],
		"snow": [255, 250, 250],
		"springgreen": [0, 255, 127],
		"steelblue": [70, 130, 180],
		"tan": [210, 180, 140],
		"teal": [0, 128, 128],
		"thistle": [216, 191, 216],
		"tomato": [255, 99, 71],
		"turquoise": [64, 224, 208],
		"violet": [238, 130, 238],
		"wheat": [245, 222, 179],
		"white": [255, 255, 255],
		"whitesmoke": [245, 245, 245],
		"yellow": [255, 255, 0],
		"yellowgreen": [154, 205, 50]
	};

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
		// Global Chart canvas helpers object for drawing items to canvas
		var helpers = Chart.canvasHelpers = {};
	
		helpers.drawPoint = function(ctx, pointStyle, radius, x, y) {
			var type, edgeLength, xOffset, yOffset, height, size;
	
			if (typeof pointStyle === 'object') {
				type = pointStyle.toString();
				if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
					ctx.drawImage(pointStyle, x - pointStyle.width / 2, y - pointStyle.height / 2);
					return;
				}
			}
	
			if (isNaN(radius) || radius <= 0) {
				return;
			}
	
			switch (pointStyle) {
			// Default includes circle
			default:
				ctx.beginPath();
				ctx.arc(x, y, radius, 0, Math.PI * 2);
				ctx.closePath();
				ctx.fill();
				break;
			case 'triangle':
				ctx.beginPath();
				edgeLength = 3 * radius / Math.sqrt(3);
				height = edgeLength * Math.sqrt(3) / 2;
				ctx.moveTo(x - edgeLength / 2, y + height / 3);
				ctx.lineTo(x + edgeLength / 2, y + height / 3);
				ctx.lineTo(x, y - 2 * height / 3);
				ctx.closePath();
				ctx.fill();
				break;
			case 'rect':
				size = 1 / Math.SQRT2 * radius;
				ctx.beginPath();
				ctx.fillRect(x - size, y - size, 2 * size,  2 * size);
				ctx.strokeRect(x - size, y - size, 2 * size, 2 * size);
				break;
			case 'rectRot':
				size = 1 / Math.SQRT2 * radius;
				ctx.beginPath();
				ctx.moveTo(x - size, y);
				ctx.lineTo(x, y + size);
				ctx.lineTo(x + size, y);
				ctx.lineTo(x, y - size);
				ctx.closePath();
				ctx.fill();
				break;
			case 'cross':
				ctx.beginPath();
				ctx.moveTo(x, y + radius);
				ctx.lineTo(x, y - radius);
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			case 'crossRot':
				ctx.beginPath();
				xOffset = Math.cos(Math.PI / 4) * radius;
				yOffset = Math.sin(Math.PI / 4) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x - xOffset, y + yOffset);
				ctx.lineTo(x + xOffset, y - yOffset);
				ctx.closePath();
				break;
			case 'star':
				ctx.beginPath();
				ctx.moveTo(x, y + radius);
				ctx.lineTo(x, y - radius);
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				xOffset = Math.cos(Math.PI / 4) * radius;
				yOffset = Math.sin(Math.PI / 4) * radius;
				ctx.moveTo(x - xOffset, y - yOffset);
				ctx.lineTo(x + xOffset, y + yOffset);
				ctx.moveTo(x - xOffset, y + yOffset);
				ctx.lineTo(x + xOffset, y - yOffset);
				ctx.closePath();
				break;
			case 'line':
				ctx.beginPath();
				ctx.moveTo(x - radius, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			case 'dash':
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(x + radius, y);
				ctx.closePath();
				break;
			}
	
			ctx.stroke();
		};
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
	  var helpers = Chart.helpers;
	
	  Chart.elements = {};
	
	  Chart.Element = function(configuration) {
	    helpers.extend(this, configuration);
	    this.initialize.apply(this, arguments);
	  };
	
	  helpers.extend(Chart.Element.prototype, {
	
	    initialize: function() {
	      this.hidden = false;
	    },
	
	    pivot: function() {
	      var me = this;
	      if (!me._view) {
	        me._view = helpers.clone(me._model);
	      }
	      me._start = helpers.clone(me._view);
	      return me;
	    },
	
	    transition: function(ease) {
	      var me = this;
	      
	      if (!me._view) {
	        me._view = helpers.clone(me._model);
	      }
	
	      // No animation -> No Transition
	      if (ease === 1) {
	        me._view = me._model;
	        me._start = null;
	        return me;
	      }
	
	      if (!me._start) {
	        me.pivot();
	      }
	
	      helpers.each(me._model, function(value, key) {
	
	        if (key[0] === '_') {
	          // Only non-underscored properties
	        }
	
	        // Init if doesn't exist
	        else if (!me._view.hasOwnProperty(key)) {
	          if (typeof value === 'number' && !isNaN(me._view[key])) {
	            me._view[key] = value * ease;
	          } else {
	            me._view[key] = value;
	          }
	        }
	
	        // No unnecessary computations
	        else if (value === me._view[key]) {
	          // It's the same! Woohoo!
	        }
	
	        // Color transitions if possible
	        else if (typeof value === 'string') {
	          try {
	            var color = helpers.color(me._model[key]).mix(helpers.color(me._start[key]), ease);
	            me._view[key] = color.rgbString();
	          } catch (err) {
	            me._view[key] = value;
	          }
	        }
	        // Number transitions
	        else if (typeof value === 'number') {
	          var startVal = me._start[key] !== undefined && isNaN(me._start[key]) === false ? me._start[key] : 0;
	          me._view[key] = ((me._model[key] - startVal) * ease) + startVal;
	        }
	        // Everything else
	        else {
	          me._view[key] = value;
	        }
	      }, me);
	
	      return me;
	    },
	
	    tooltipPosition: function() {
	      return {
	        x: this._model.x,
	        y: this._model.y
	      };
	    },
	
	    hasValue: function() {
	      return helpers.isNumber(this._model.x) && helpers.isNumber(this._model.y);
	    }
	  });
	
	  Chart.Element.extend = helpers.inherits;
	
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*global window: false */
	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.global.animation = {
			duration: 1000,
			easing: "easeOutQuart",
			onProgress: helpers.noop,
			onComplete: helpers.noop
		};
	
		Chart.Animation = Chart.Element.extend({
			currentStep: null, // the current animation step
			numSteps: 60, // default number of steps
			easing: "", // the easing to use for this animation
			render: null, // render function used by the animation service
	
			onAnimationProgress: null, // user specified callback to fire on each step of the animation
			onAnimationComplete: null // user specified callback to fire when the animation finishes
		});
	
		Chart.animationService = {
			frameDuration: 17,
			animations: [],
			dropFrames: 0,
			request: null,
			addAnimation: function(chartInstance, animationObject, duration, lazy) {
				var me = this;
	
				if (!lazy) {
					chartInstance.animating = true;
				}
	
				for (var index = 0; index < me.animations.length; ++index) {
					if (me.animations[index].chartInstance === chartInstance) {
						// replacing an in progress animation
						me.animations[index].animationObject = animationObject;
						return;
					}
				}
	
				me.animations.push({
					chartInstance: chartInstance,
					animationObject: animationObject
				});
	
				// If there are no animations queued, manually kickstart a digest, for lack of a better word
				if (me.animations.length === 1) {
					me.requestAnimationFrame();
				}
			},
			// Cancel the animation for a given chart instance
			cancelAnimation: function(chartInstance) {
				var index = helpers.findIndex(this.animations, function(animationWrapper) {
					return animationWrapper.chartInstance === chartInstance;
				});
	
				if (index !== -1) {
					this.animations.splice(index, 1);
					chartInstance.animating = false;
				}
			},
			requestAnimationFrame: function() {
				var me = this;
				if (me.request === null) {
					// Skip animation frame requests until the active one is executed.
					// This can happen when processing mouse events, e.g. 'mousemove'
					// and 'mouseout' events will trigger multiple renders.
					me.request = helpers.requestAnimFrame.call(window, function() {
						me.request = null;
						me.startDigest();
					});
				}
			},
			startDigest: function() {
				var me = this;
	
				var startTime = Date.now();
				var framesToDrop = 0;
	
				if (me.dropFrames > 1) {
					framesToDrop = Math.floor(me.dropFrames);
					me.dropFrames = me.dropFrames % 1;
				}
	
				var i = 0;
				while (i < me.animations.length) {
					if (me.animations[i].animationObject.currentStep === null) {
						me.animations[i].animationObject.currentStep = 0;
					}
	
					me.animations[i].animationObject.currentStep += 1 + framesToDrop;
	
					if (me.animations[i].animationObject.currentStep > me.animations[i].animationObject.numSteps) {
						me.animations[i].animationObject.currentStep = me.animations[i].animationObject.numSteps;
					}
	
					me.animations[i].animationObject.render(me.animations[i].chartInstance, me.animations[i].animationObject);
					if (me.animations[i].animationObject.onAnimationProgress && me.animations[i].animationObject.onAnimationProgress.call) {
						me.animations[i].animationObject.onAnimationProgress.call(me.animations[i].chartInstance, me.animations[i]);
					}
	
					if (me.animations[i].animationObject.currentStep === me.animations[i].animationObject.numSteps) {
						if (me.animations[i].animationObject.onAnimationComplete && me.animations[i].animationObject.onAnimationComplete.call) {
							me.animations[i].animationObject.onAnimationComplete.call(me.animations[i].chartInstance, me.animations[i]);
						}
	
						// executed the last frame. Remove the animation.
						me.animations[i].chartInstance.animating = false;
	
						me.animations.splice(i, 1);
					} else {
						++i;
					}
				}
	
				var endTime = Date.now();
				var dropFrames = (endTime - startTime) / me.frameDuration;
	
				me.dropFrames += dropFrames;
	
				// Do we have more stuff to animate?
				if (me.animations.length > 0) {
					me.requestAnimationFrame();
				}
			}
		};
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		//Create a dictionary of chart types, to allow for extension of existing types
		Chart.types = {};
	
		//Store a reference to each instance - allowing us to globally resize chart instances on window resize.
		//Destroy method on the chart will remove the instance of the chart from this reference.
		Chart.instances = {};
	
		// Controllers available for dataset visualization eg. bar, line, slice, etc.
		Chart.controllers = {};
	
		/**
		 * @class Chart.Controller
		 * The main controller of a chart.
		 */
		Chart.Controller = function(instance) {
	
			this.chart = instance;
			this.config = instance.config;
			this.options = this.config.options = helpers.configMerge(Chart.defaults.global, Chart.defaults[this.config.type], this.config.options || {});
			this.id = helpers.uid();
	
			Object.defineProperty(this, 'data', {
				get: function() {
					return this.config.data;
				}
			});
	
			//Add the chart instance to the global namespace
			Chart.instances[this.id] = this;
	
			if (this.options.responsive) {
				// Silent resize before chart draws
				this.resize(true);
			}
	
			this.initialize();
	
			return this;
		};
	
		helpers.extend(Chart.Controller.prototype, /** @lends Chart.Controller */ {
	
			initialize: function() {
				var me = this;
				// Before init plugin notification
				Chart.plugins.notify('beforeInit', [me]);
	
				me.bindEvents();
	
				// Make sure controllers are built first so that each dataset is bound to an axis before the scales
				// are built
				me.ensureScalesHaveIDs();
				me.buildOrUpdateControllers();
				me.buildScales();
				me.updateLayout();
				me.resetElements();
				me.initToolTip();
				me.update();
	
				// After init plugin notification
				Chart.plugins.notify('afterInit', [me]);
	
				return me;
			},
	
			clear: function() {
				helpers.clear(this.chart);
				return this;
			},
	
			stop: function() {
				// Stops any current animation loop occuring
				Chart.animationService.cancelAnimation(this);
				return this;
			},
	
			resize: function resize(silent) {
				var me = this;
				var chart = me.chart;
				var canvas = chart.canvas;
				var newWidth = helpers.getMaximumWidth(canvas);
				var aspectRatio = chart.aspectRatio;
				var newHeight = (me.options.maintainAspectRatio && isNaN(aspectRatio) === false && isFinite(aspectRatio) && aspectRatio !== 0) ? newWidth / aspectRatio : helpers.getMaximumHeight(canvas);
	
				var sizeChanged = chart.width !== newWidth || chart.height !== newHeight;
	
				if (!sizeChanged) {
					return me;
				}
	
				canvas.width = chart.width = newWidth;
				canvas.height = chart.height = newHeight;
	
				helpers.retinaScale(chart);
	
				// Notify any plugins about the resize
				var newSize = { width: newWidth, height: newHeight };
				Chart.plugins.notify('resize', [me, newSize]);
	
				// Notify of resize
				if (me.options.onResize) {
					me.options.onResize(me, newSize);
				}
	
				if (!silent) {
					me.stop();
					me.update(me.options.responsiveAnimationDuration);
				}
	
				return me;
			},
	
			ensureScalesHaveIDs: function() {
				var options = this.options;
				var scalesOptions = options.scales || {};
				var scaleOptions = options.scale;
	
				helpers.each(scalesOptions.xAxes, function(xAxisOptions, index) {
					xAxisOptions.id = xAxisOptions.id || ('x-axis-' + index);
				});
	
				helpers.each(scalesOptions.yAxes, function(yAxisOptions, index) {
					yAxisOptions.id = yAxisOptions.id || ('y-axis-' + index);
				});
	
				if (scaleOptions) {
					scaleOptions.id = scaleOptions.id || 'scale';
				}
			},
	
			/**
			 * Builds a map of scale ID to scale object for future lookup.
			 */
			buildScales: function() {
				var me = this;
				var options = me.options;
				var scales = me.scales = {};
				var items = [];
	
				if (options.scales) {
					items = items.concat(
						(options.scales.xAxes || []).map(function(xAxisOptions) {
							return { options: xAxisOptions, dtype: 'category' }; }),
						(options.scales.yAxes || []).map(function(yAxisOptions) {
							return { options: yAxisOptions, dtype: 'linear' }; }));
				}
	
				if (options.scale) {
					items.push({ options: options.scale, dtype: 'radialLinear', isDefault: true });
				}
	
				helpers.each(items, function(item) {
					var scaleOptions = item.options;
					var scaleType = helpers.getValueOrDefault(scaleOptions.type, item.dtype);
					var scaleClass = Chart.scaleService.getScaleConstructor(scaleType);
					if (!scaleClass) {
						return;
					}
	
					var scale = new scaleClass({
						id: scaleOptions.id,
						options: scaleOptions,
						ctx: me.chart.ctx,
						chart: me
					});
	
					scales[scale.id] = scale;
	
					// TODO(SB): I think we should be able to remove this custom case (options.scale)
					// and consider it as a regular scale part of the "scales"" map only! This would
					// make the logic easier and remove some useless? custom code.
					if (item.isDefault) {
						me.scale = scale;
					}
				});
	
				Chart.scaleService.addScalesToLayout(this);
			},
	
			updateLayout: function() {
				Chart.layoutService.update(this, this.chart.width, this.chart.height);
			},
	
			buildOrUpdateControllers: function() {
				var me = this;
				var types = [];
				var newControllers = [];
	
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					var meta = me.getDatasetMeta(datasetIndex);
					if (!meta.type) {
						meta.type = dataset.type || me.config.type;
					}
	
					types.push(meta.type);
	
					if (meta.controller) {
						meta.controller.updateIndex(datasetIndex);
					} else {
						meta.controller = new Chart.controllers[meta.type](me, datasetIndex);
						newControllers.push(meta.controller);
					}
				}, me);
	
				if (types.length > 1) {
					for (var i = 1; i < types.length; i++) {
						if (types[i] !== types[i - 1]) {
							me.isCombo = true;
							break;
						}
					}
				}
	
				return newControllers;
			},
	
			resetElements: function() {
				var me = this;
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					me.getDatasetMeta(datasetIndex).controller.reset();
				}, me);
			},
	
			update: function update(animationDuration, lazy) {
				var me = this;
				Chart.plugins.notify('beforeUpdate', [me]);
	
				// In case the entire data object changed
				me.tooltip._data = me.data;
	
				// Make sure dataset controllers are updated and new controllers are reset
				var newControllers = me.buildOrUpdateControllers();
	
				// Make sure all dataset controllers have correct meta data counts
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					me.getDatasetMeta(datasetIndex).controller.buildOrUpdateElements();
				}, me);
	
				Chart.layoutService.update(me, me.chart.width, me.chart.height);
	
				// Apply changes to the dataets that require the scales to have been calculated i.e BorderColor chages
				Chart.plugins.notify('afterScaleUpdate', [me]);
	
				// Can only reset the new controllers after the scales have been updated
				helpers.each(newControllers, function(controller) {
					controller.reset();
				});
	
				me.updateDatasets();
	
				// Do this before render so that any plugins that need final scale updates can use it
				Chart.plugins.notify('afterUpdate', [me]);
	
				me.render(animationDuration, lazy);
			},
	
			/**
			 * @method beforeDatasetsUpdate
			 * @description Called before all datasets are updated. If a plugin returns false,
			 * the datasets update will be cancelled until another chart update is triggered.
			 * @param {Object} instance the chart instance being updated.
			 * @returns {Boolean} false to cancel the datasets update.
			 * @memberof Chart.PluginBase
			 * @since version 2.1.5
			 * @instance
			 */
	
			/**
			 * @method afterDatasetsUpdate
			 * @description Called after all datasets have been updated. Note that this
			 * extension will not be called if the datasets update has been cancelled.
			 * @param {Object} instance the chart instance being updated.
			 * @memberof Chart.PluginBase
			 * @since version 2.1.5
			 * @instance
			 */
	
			/**
			 * Updates all datasets unless a plugin returns false to the beforeDatasetsUpdate
			 * extension, in which case no datasets will be updated and the afterDatasetsUpdate
			 * notification will be skipped.
			 * @protected
			 * @instance
			 */
			updateDatasets: function() {
				var me = this;
				var i, ilen;
	
				if (Chart.plugins.notify('beforeDatasetsUpdate', [ me ])) {
					for (i = 0, ilen = me.data.datasets.length; i < ilen; ++i) {
						me.getDatasetMeta(i).controller.update();
					}
	
					Chart.plugins.notify('afterDatasetsUpdate', [ me ]);
				}
			},
	
			render: function render(duration, lazy) {
				var me = this;
				Chart.plugins.notify('beforeRender', [me]);
	
				var animationOptions = me.options.animation;
				if (animationOptions && ((typeof duration !== 'undefined' && duration !== 0) || (typeof duration === 'undefined' && animationOptions.duration !== 0))) {
					var animation = new Chart.Animation();
					animation.numSteps = (duration || animationOptions.duration) / 16.66; //60 fps
					animation.easing = animationOptions.easing;
	
					// render function
					animation.render = function(chartInstance, animationObject) {
						var easingFunction = helpers.easingEffects[animationObject.easing];
						var stepDecimal = animationObject.currentStep / animationObject.numSteps;
						var easeDecimal = easingFunction(stepDecimal);
	
						chartInstance.draw(easeDecimal, stepDecimal, animationObject.currentStep);
					};
	
					// user events
					animation.onAnimationProgress = animationOptions.onProgress;
					animation.onAnimationComplete = animationOptions.onComplete;
	
					Chart.animationService.addAnimation(me, animation, duration, lazy);
				} else {
					me.draw();
					if (animationOptions && animationOptions.onComplete && animationOptions.onComplete.call) {
						animationOptions.onComplete.call(me);
					}
				}
				return me;
			},
	
			draw: function(ease) {
				var me = this;
				var easingDecimal = ease || 1;
				me.clear();
	
				Chart.plugins.notify('beforeDraw', [me, easingDecimal]);
	
				// Draw all the scales
				helpers.each(me.boxes, function(box) {
					box.draw(me.chartArea);
				}, me);
				if (me.scale) {
					me.scale.draw();
				}
	
				Chart.plugins.notify('beforeDatasetsDraw', [me, easingDecimal]);
	
				// Draw each dataset via its respective controller (reversed to support proper line stacking)
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						me.getDatasetMeta(datasetIndex).controller.draw(ease);
					}
				}, me, true);
	
				Chart.plugins.notify('afterDatasetsDraw', [me, easingDecimal]);
	
				// Finally draw the tooltip
				me.tooltip.transition(easingDecimal).draw();
	
				Chart.plugins.notify('afterDraw', [me, easingDecimal]);
			},
	
			// Get the single element that was clicked on
			// @return : An object containing the dataset index and element index of the matching element. Also contains the rectangle that was draw
			getElementAtEvent: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];
	
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex);
						helpers.each(meta.data, function(element) {
							if (element.inRange(eventPosition.x, eventPosition.y)) {
								elementsArray.push(element);
								return elementsArray;
							}
						});
					}
				});
	
				return elementsArray;
			},
	
			getElementsAtEvent: function(e) {
				var me = this;
				var eventPosition = helpers.getRelativePosition(e, me.chart);
				var elementsArray = [];
	
				var found = (function() {
					if (me.data.datasets) {
						for (var i = 0; i < me.data.datasets.length; i++) {
							var meta = me.getDatasetMeta(i);
							if (me.isDatasetVisible(i)) {
								for (var j = 0; j < meta.data.length; j++) {
									if (meta.data[j].inRange(eventPosition.x, eventPosition.y)) {
										return meta.data[j];
									}
								}
							}
						}
					}
				}).call(me);
	
				if (!found) {
					return elementsArray;
				}
	
				helpers.each(me.data.datasets, function(dataset, datasetIndex) {
					if (me.isDatasetVisible(datasetIndex)) {
						var meta = me.getDatasetMeta(datasetIndex),
							element = meta.data[found._index];
						if(element && !element._view.skip){
							elementsArray.push(element);
						}
					}
				}, me);
	
				return elementsArray;
			},
	
	        getElementsAtXAxis: function(e){
	            var me = this;
	            var eventPosition = helpers.getRelativePosition(e, me.chart);
	            var elementsArray = [];
	
	            var found = (function() {
	                if (me.data.datasets) {
	                    for (var i = 0; i < me.data.datasets.length; i++) {
	                        var meta = me.getDatasetMeta(i);
	                        if (me.isDatasetVisible(i)) {
	                            for (var j = 0; j < meta.data.length; j++) {
	                                if (meta.data[j].inLabelRange(eventPosition.x, eventPosition.y)) {
	                                    return meta.data[j];
	                                }
	                            }
	                        }
	                    }
	                }
	            }).call(me);
	
	            if (!found) {
	                return elementsArray;
	            }
	
	            helpers.each(me.data.datasets, function(dataset, datasetIndex) {
	                if (me.isDatasetVisible(datasetIndex)) {
	                    var meta = me.getDatasetMeta(datasetIndex);
	                    if(!meta.data[found._index]._view.skip){
	                    	elementsArray.push(meta.data[found._index]);
	                    }
	                }
	            }, me);
	
	            return elementsArray;
	        },		
	
			getElementsAtEventForMode: function(e, mode) {
				var me = this;
				switch (mode) {
				case 'single':
					return me.getElementAtEvent(e);
				case 'label':
					return me.getElementsAtEvent(e);
				case 'dataset':
					return me.getDatasetAtEvent(e);
	            case 'x-axis':
	                return me.getElementsAtXAxis(e);
				default:
					return e;
				}
			},
	
			getDatasetAtEvent: function(e) {
				var elementsArray = this.getElementAtEvent(e);
	
				if (elementsArray.length > 0) {
					elementsArray = this.getDatasetMeta(elementsArray[0]._datasetIndex).data;
				}
	
				return elementsArray;
			},
	
			getDatasetMeta: function(datasetIndex) {
				var me = this;
				var dataset = me.data.datasets[datasetIndex];
				if (!dataset._meta) {
					dataset._meta = {};
				}
	
				var meta = dataset._meta[me.id];
				if (!meta) {
					meta = dataset._meta[me.id] = {
					type: null,
					data: [],
					dataset: null,
					controller: null,
					hidden: null,			// See isDatasetVisible() comment
					xAxisID: null,
					yAxisID: null
				};
				}
	
				return meta;
			},
	
			getVisibleDatasetCount: function() {
				var count = 0;
				for (var i = 0, ilen = this.data.datasets.length; i<ilen; ++i) {
					 if (this.isDatasetVisible(i)) {
						count++;
					}
				}
				return count;
			},
	
			isDatasetVisible: function(datasetIndex) {
				var meta = this.getDatasetMeta(datasetIndex);
	
				// meta.hidden is a per chart dataset hidden flag override with 3 states: if true or false,
				// the dataset.hidden value is ignored, else if null, the dataset hidden state is returned.
				return typeof meta.hidden === 'boolean'? !meta.hidden : !this.data.datasets[datasetIndex].hidden;
			},
	
			generateLegend: function() {
				return this.options.legendCallback(this);
			},
	
			destroy: function() {
				var me = this;
				me.stop();
				me.clear();
				helpers.unbindEvents(me, me.events);
				helpers.removeResizeListener(me.chart.canvas.parentNode);
	
				// Reset canvas height/width attributes
				var canvas = me.chart.canvas;
				canvas.width = me.chart.width;
				canvas.height = me.chart.height;
	
				// if we scaled the canvas in response to a devicePixelRatio !== 1, we need to undo that transform here
				if (me.chart.originalDevicePixelRatio !== undefined) {
					me.chart.ctx.scale(1 / me.chart.originalDevicePixelRatio, 1 / me.chart.originalDevicePixelRatio);
				}
	
				// Reset to the old style since it may have been changed by the device pixel ratio changes
				canvas.style.width = me.chart.originalCanvasStyleWidth;
				canvas.style.height = me.chart.originalCanvasStyleHeight;
	
				Chart.plugins.notify('destroy', [me]);
	
				delete Chart.instances[me.id];
			},
	
			toBase64Image: function() {
				return this.chart.canvas.toDataURL.apply(this.chart.canvas, arguments);
			},
	
			initToolTip: function() {
				var me = this;
				me.tooltip = new Chart.Tooltip({
					_chart: me.chart,
					_chartInstance: me,
					_data: me.data,
					_options: me.options.tooltips
				}, me);
			},
	
			bindEvents: function() {
				var me = this;
				helpers.bindEvents(me, me.options.events, function(evt) {
					me.eventHandler(evt);
				});
			},
	
			updateHoverStyle: function(elements, mode, enabled) {
				var method = enabled? 'setHoverStyle' : 'removeHoverStyle';
				var element, i, ilen;
	
				switch (mode) {
				case 'single':
					elements = [ elements[0] ];
					break;
				case 'label':
				case 'dataset':
	            case 'x-axis':
					// elements = elements;
					break;
				default:
					// unsupported mode
					return;
				}
	
				for (i=0, ilen=elements.length; i<ilen; ++i) {
					element = elements[i];
					if (element) {
						this.getDatasetMeta(element._datasetIndex).controller[method](element);
					}
				}
			},
	
			eventHandler: function eventHandler(e) {
				var me = this;
				var tooltip = me.tooltip;
				var options = me.options || {};
				var hoverOptions = options.hover;
				var tooltipsOptions = options.tooltips;
	
				me.lastActive = me.lastActive || [];
				me.lastTooltipActive = me.lastTooltipActive || [];
	
				// Find Active Elements for hover and tooltips
				if (e.type === 'mouseout') {
					me.active = [];
					me.tooltipActive = [];
				} else {
					me.active = me.getElementsAtEventForMode(e, hoverOptions.mode);
					me.tooltipActive =  me.getElementsAtEventForMode(e, tooltipsOptions.mode);
				}
	
				// On Hover hook
				if (hoverOptions.onHover) {
					hoverOptions.onHover.call(me, me.active);
				}
	
				if (e.type === 'mouseup' || e.type === 'click') {
					if (options.onClick) {
						options.onClick.call(me, e, me.active);
					}
					if (me.legend && me.legend.handleEvent) {
						me.legend.handleEvent(e);
					}
				}
	
				// Remove styling for last active (even if it may still be active)
				if (me.lastActive.length) {
					me.updateHoverStyle(me.lastActive, hoverOptions.mode, false);
				}
	
				// Built in hover styling
				if (me.active.length && hoverOptions.mode) {
					me.updateHoverStyle(me.active, hoverOptions.mode, true);
				}
	
				// Built in Tooltips
				if (tooltipsOptions.enabled || tooltipsOptions.custom) {
					tooltip.initialize();
					tooltip._active = me.tooltipActive;
					tooltip.update(true);
				}
	
				// Hover animations
				tooltip.pivot();
	
				if (!me.animating) {
					// If entering, leaving, or changing elements, animate the change via pivot
					if (!helpers.arrayEquals(me.active, me.lastActive) ||
						!helpers.arrayEquals(me.tooltipActive, me.lastTooltipActive)) {
	
						me.stop();
	
						if (tooltipsOptions.enabled || tooltipsOptions.custom) {
							tooltip.update(true);
						}
	
						// We only need to render at this point. Updating will cause scales to be
						// recomputed generating flicker & using more memory than necessary.
						me.render(hoverOptions.animationDuration, true);
					}
				}
	
				// Remember Last Actives
				me.lastActive = me.active;
				me.lastTooltipActive = me.tooltipActive;
				return me;
			}
		});
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var noop = helpers.noop;
	
		// Base class for all dataset controllers (line, bar, etc)
		Chart.DatasetController = function(chart, datasetIndex) {
			this.initialize.call(this, chart, datasetIndex);
		};
	
		helpers.extend(Chart.DatasetController.prototype, {
	
			/**
			 * Element type used to generate a meta dataset (e.g. Chart.element.Line).
			 * @type {Chart.core.element}
			 */
			datasetElementType: null,
	
			/**
			 * Element type used to generate a meta data (e.g. Chart.element.Point).
			 * @type {Chart.core.element}
			 */
			dataElementType: null,
	
			initialize: function(chart, datasetIndex) {
				var me = this;
				me.chart = chart;
				me.index = datasetIndex;
				me.linkScales();
				me.addElements();
			},
	
			updateIndex: function(datasetIndex) {
				this.index = datasetIndex;
			},
	
			linkScales: function() {
				var me = this;
				var meta = me.getMeta();
				var dataset = me.getDataset();
	
				if (meta.xAxisID === null) {
					meta.xAxisID = dataset.xAxisID || me.chart.options.scales.xAxes[0].id;
				}
				if (meta.yAxisID === null) {
					meta.yAxisID = dataset.yAxisID || me.chart.options.scales.yAxes[0].id;
				}
			},
	
			getDataset: function() {
				return this.chart.data.datasets[this.index];
			},
	
			getMeta: function() {
				return this.chart.getDatasetMeta(this.index);
			},
	
			getScaleForId: function(scaleID) {
				return this.chart.scales[scaleID];
			},
	
			reset: function() {
				this.update(true);
			},
	
			createMetaDataset: function() {
				var me = this;
				var type = me.datasetElementType;
				return type && new type({
					_chart: me.chart.chart,
					_datasetIndex: me.index
				});
			},
	
			createMetaData: function(index) {
				var me = this;
				var type = me.dataElementType;
				return type && new type({
					_chart: me.chart.chart,
					_datasetIndex: me.index,
					_index: index
				});
			},
	
			addElements: function() {
				var me = this;
				var meta = me.getMeta();
				var data = me.getDataset().data || [];
				var metaData = meta.data;
				var i, ilen;
	
				for (i=0, ilen=data.length; i<ilen; ++i) {
					metaData[i] = metaData[i] || me.createMetaData(meta, i);
				}
	
				meta.dataset = meta.dataset || me.createMetaDataset();
			},
	
			addElementAndReset: function(index) {
				var me = this;
				var element = me.createMetaData(index);
				me.getMeta().data.splice(index, 0, element);
				me.updateElement(element, index, true);
			},
	
			buildOrUpdateElements: function() {
				// Handle the number of data points changing
				var meta = this.getMeta(),
					md = meta.data,
					numData = this.getDataset().data.length,
					numMetaData = md.length;
	
				// Make sure that we handle number of datapoints changing
				if (numData < numMetaData) {
					// Remove excess bars for data points that have been removed
					md.splice(numData, numMetaData - numData);
				} else if (numData > numMetaData) {
					// Add new elements
					for (var index = numMetaData; index < numData; ++index) {
						this.addElementAndReset(index);
					}
				}
			},
	
			update: noop,
	
			draw: function(ease) {
				var easingDecimal = ease || 1;
				helpers.each(this.getMeta().data, function(element) {
					element.transition(easingDecimal).draw();
				});
			},
	
			removeHoverStyle: function(element, elementOpts) {
				var dataset = this.chart.data.datasets[element._datasetIndex],
					index = element._index,
					custom = element.custom || {},
					valueOrDefault = helpers.getValueAtIndexOrDefault,
					model = element._model;
	
				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : valueOrDefault(dataset.backgroundColor, index, elementOpts.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : valueOrDefault(dataset.borderColor, index, elementOpts.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : valueOrDefault(dataset.borderWidth, index, elementOpts.borderWidth);
			},
	
			setHoverStyle: function(element) {
				var dataset = this.chart.data.datasets[element._datasetIndex],
					index = element._index,
					custom = element.custom || {},
					valueOrDefault = helpers.getValueAtIndexOrDefault,
					getHoverColor = helpers.getHoverColor,
					model = element._model;
	
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : valueOrDefault(dataset.hoverBackgroundColor, index, getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : valueOrDefault(dataset.hoverBorderColor, index, getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : valueOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
			}
			
	    });
		
	
		Chart.DatasetController.extend = helpers.inherits;
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		// The layout service is very self explanatory.  It's responsible for the layout within a chart.
		// Scales, Legends and Plugins all rely on the layout service and can easily register to be placed anywhere they need
		// It is this service's responsibility of carrying out that layout.
		Chart.layoutService = {
			defaults: {},
	
			// Register a box to a chartInstance. A box is simply a reference to an object that requires layout. eg. Scales, Legend, Plugins.
			addBox: function(chartInstance, box) {
				if (!chartInstance.boxes) {
					chartInstance.boxes = [];
				}
				chartInstance.boxes.push(box);
			},
	
			removeBox: function(chartInstance, box) {
				if (!chartInstance.boxes) {
					return;
				}
				chartInstance.boxes.splice(chartInstance.boxes.indexOf(box), 1);
			},
	
			// The most important function
			update: function(chartInstance, width, height) {
	
				if (!chartInstance) {
					return;
				}
	
				var xPadding = 0;
				var yPadding = 0;
	
				var leftBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === "left";
				});
				var rightBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === "right";
				});
				var topBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === "top";
				});
				var bottomBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === "bottom";
				});
	
				// Boxes that overlay the chartarea such as the radialLinear scale
				var chartAreaBoxes = helpers.where(chartInstance.boxes, function(box) {
					return box.options.position === "chartArea";
				});
	
				// Ensure that full width boxes are at the very top / bottom
				topBoxes.sort(function(a, b) {
					return (b.options.fullWidth ? 1 : 0) - (a.options.fullWidth ? 1 : 0);
				});
				bottomBoxes.sort(function(a, b) {
					return (a.options.fullWidth ? 1 : 0) - (b.options.fullWidth ? 1 : 0);
				});
	
				// Essentially we now have any number of boxes on each of the 4 sides.
				// Our canvas looks like the following.
				// The areas L1 and L2 are the left axes. R1 is the right axis, T1 is the top axis and
				// B1 is the bottom axis
				// There are also 4 quadrant-like locations (left to right instead of clockwise) reserved for chart overlays
				// These locations are single-box locations only, when trying to register a chartArea location that is already taken,
				// an error will be thrown.
				//
				// |----------------------------------------------------|
				// |                  T1 (Full Width)                   |
				// |----------------------------------------------------|
				// |    |    |                 T2                  |    |
				// |    |----|-------------------------------------|----|
				// |    |    | C1 |                           | C2 |    |
				// |    |    |----|                           |----|    |
				// |    |    |                                     |    |
				// | L1 | L2 |           ChartArea (C0)            | R1 |
				// |    |    |                                     |    |
				// |    |    |----|                           |----|    |
				// |    |    | C3 |                           | C4 |    |
				// |    |----|-------------------------------------|----|
				// |    |    |                 B1                  |    |
				// |----------------------------------------------------|
				// |                  B2 (Full Width)                   |
				// |----------------------------------------------------|
				//
				// What we do to find the best sizing, we do the following
				// 1. Determine the minimum size of the chart area.
				// 2. Split the remaining width equally between each vertical axis
				// 3. Split the remaining height equally between each horizontal axis
				// 4. Give each layout the maximum size it can be. The layout will return it's minimum size
				// 5. Adjust the sizes of each axis based on it's minimum reported size.
				// 6. Refit each axis
				// 7. Position each axis in the final location
				// 8. Tell the chart the final location of the chart area
				// 9. Tell any axes that overlay the chart area the positions of the chart area
	
				// Step 1
				var chartWidth = width - (2 * xPadding);
				var chartHeight = height - (2 * yPadding);
				var chartAreaWidth = chartWidth / 2; // min 50%
				var chartAreaHeight = chartHeight / 2; // min 50%
	
				// Step 2
				var verticalBoxWidth = (width - chartAreaWidth) / (leftBoxes.length + rightBoxes.length);
	
				// Step 3
				var horizontalBoxHeight = (height - chartAreaHeight) / (topBoxes.length + bottomBoxes.length);
	
				// Step 4
				var maxChartAreaWidth = chartWidth;
				var maxChartAreaHeight = chartHeight;
				var minBoxSizes = [];
	
				helpers.each(leftBoxes.concat(rightBoxes, topBoxes, bottomBoxes), getMinimumBoxSize);
	
				function getMinimumBoxSize(box) {
					var minSize;
					var isHorizontal = box.isHorizontal();
	
					if (isHorizontal) {
						minSize = box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, horizontalBoxHeight);
						maxChartAreaHeight -= minSize.height;
					} else {
						minSize = box.update(verticalBoxWidth, chartAreaHeight);
						maxChartAreaWidth -= minSize.width;
					}
	
					minBoxSizes.push({
						horizontal: isHorizontal,
						minSize: minSize,
						box: box
					});
				}
	
				// At this point, maxChartAreaHeight and maxChartAreaWidth are the size the chart area could
				// be if the axes are drawn at their minimum sizes.
	
				// Steps 5 & 6
				var totalLeftBoxesWidth = xPadding;
				var totalRightBoxesWidth = xPadding;
				var totalTopBoxesHeight = yPadding;
				var totalBottomBoxesHeight = yPadding;
	
				// Update, and calculate the left and right margins for the horizontal boxes
				helpers.each(leftBoxes.concat(rightBoxes), fitBox);
	
				helpers.each(leftBoxes, function(box) {
					totalLeftBoxesWidth += box.width;
				});
	
				helpers.each(rightBoxes, function(box) {
					totalRightBoxesWidth += box.width;
				});
	
				// Set the Left and Right margins for the horizontal boxes
				helpers.each(topBoxes.concat(bottomBoxes), fitBox);
	
				// Function to fit a box
				function fitBox(box) {
					var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
						return minBoxSize.box === box;
					});
	
					if (minBoxSize) {
						if (box.isHorizontal()) {
							var scaleMargin = {
								left: totalLeftBoxesWidth,
								right: totalRightBoxesWidth,
								top: 0,
								bottom: 0
							};
	
							// Don't use min size here because of label rotation. When the labels are rotated, their rotation highly depends
							// on the margin. Sometimes they need to increase in size slightly
							box.update(box.options.fullWidth ? chartWidth : maxChartAreaWidth, chartHeight / 2, scaleMargin);
						} else {
							box.update(minBoxSize.minSize.width, maxChartAreaHeight);
						}
					}
				}
	
				// Figure out how much margin is on the top and bottom of the vertical boxes
				helpers.each(topBoxes, function(box) {
					totalTopBoxesHeight += box.height;
				});
	
				helpers.each(bottomBoxes, function(box) {
					totalBottomBoxesHeight += box.height;
				});
	
				// Let the left layout know the final margin
				helpers.each(leftBoxes.concat(rightBoxes), finalFitVerticalBox);
	
				function finalFitVerticalBox(box) {
					var minBoxSize = helpers.findNextWhere(minBoxSizes, function(minBoxSize) {
						return minBoxSize.box === box;
					});
	
					var scaleMargin = {
						left: 0,
						right: 0,
						top: totalTopBoxesHeight,
						bottom: totalBottomBoxesHeight
					};
	
					if (minBoxSize) {
						box.update(minBoxSize.minSize.width, maxChartAreaHeight, scaleMargin);
					}
				}
	
				// Recalculate because the size of each layout might have changed slightly due to the margins (label rotation for instance)
				totalLeftBoxesWidth = xPadding;
				totalRightBoxesWidth = xPadding;
				totalTopBoxesHeight = yPadding;
				totalBottomBoxesHeight = yPadding;
	
				helpers.each(leftBoxes, function(box) {
					totalLeftBoxesWidth += box.width;
				});
	
				helpers.each(rightBoxes, function(box) {
					totalRightBoxesWidth += box.width;
				});
	
				helpers.each(topBoxes, function(box) {
					totalTopBoxesHeight += box.height;
				});
				helpers.each(bottomBoxes, function(box) {
					totalBottomBoxesHeight += box.height;
				});
	
				// Figure out if our chart area changed. This would occur if the dataset layout label rotation
				// changed due to the application of the margins in step 6. Since we can only get bigger, this is safe to do
				// without calling `fit` again
				var newMaxChartAreaHeight = height - totalTopBoxesHeight - totalBottomBoxesHeight;
				var newMaxChartAreaWidth = width - totalLeftBoxesWidth - totalRightBoxesWidth;
	
				if (newMaxChartAreaWidth !== maxChartAreaWidth || newMaxChartAreaHeight !== maxChartAreaHeight) {
					helpers.each(leftBoxes, function(box) {
						box.height = newMaxChartAreaHeight;
					});
	
					helpers.each(rightBoxes, function(box) {
						box.height = newMaxChartAreaHeight;
					});
	
					helpers.each(topBoxes, function(box) {
						if (!box.options.fullWidth) {
							box.width = newMaxChartAreaWidth;
						}
					});
	
					helpers.each(bottomBoxes, function(box) {
						if (!box.options.fullWidth) {
							box.width = newMaxChartAreaWidth;
						}
					});
	
					maxChartAreaHeight = newMaxChartAreaHeight;
					maxChartAreaWidth = newMaxChartAreaWidth;
				}
	
				// Step 7 - Position the boxes
				var left = xPadding;
				var top = yPadding;
	
				helpers.each(leftBoxes.concat(topBoxes), placeBox);
	
				// Account for chart width and height
				left += maxChartAreaWidth;
				top += maxChartAreaHeight;
	
				helpers.each(rightBoxes, placeBox);
				helpers.each(bottomBoxes, placeBox);
	
				function placeBox(box) {
					if (box.isHorizontal()) {
						box.left = box.options.fullWidth ? xPadding : totalLeftBoxesWidth;
						box.right = box.options.fullWidth ? width - xPadding : totalLeftBoxesWidth + maxChartAreaWidth;
						box.top = top;
						box.bottom = top + box.height;
	
						// Move to next point
						top = box.bottom;
	
					} else {
	
						box.left = left;
						box.right = left + box.width;
						box.top = totalTopBoxesHeight;
						box.bottom = totalTopBoxesHeight + maxChartAreaHeight;
	
						// Move to next point
						left = box.right;
					}
				}
	
				// Step 8
				chartInstance.chartArea = {
					left: totalLeftBoxesWidth,
					top: totalTopBoxesHeight,
					right: totalLeftBoxesWidth + maxChartAreaWidth,
					bottom: totalTopBoxesHeight + maxChartAreaHeight
				};
	
				// Step 9
				helpers.each(chartAreaBoxes, function(box) {
					box.left = chartInstance.chartArea.left;
					box.top = chartInstance.chartArea.top;
					box.right = chartInstance.chartArea.right;
					box.bottom = chartInstance.chartArea.bottom;
	
					box.update(maxChartAreaWidth, maxChartAreaHeight);
				});
			}
		};
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.scaleService = {
			// Scale registration object. Extensions can register new scale types (such as log or DB scales) and then
			// use the new chart options to grab the correct scale
			constructors: {},
			// Use a registration function so that we can move to an ES6 map when we no longer need to support
			// old browsers
	
			// Scale config defaults
			defaults: {},
			registerScaleType: function(type, scaleConstructor, defaults) {
				this.constructors[type] = scaleConstructor;
				this.defaults[type] = helpers.clone(defaults);
			},
			getScaleConstructor: function(type) {
				return this.constructors.hasOwnProperty(type) ? this.constructors[type] : undefined;
			},
			getScaleDefaults: function(type) {
				// Return the scale defaults merged with the global settings so that we always use the latest ones
				return this.defaults.hasOwnProperty(type) ? helpers.scaleMerge(Chart.defaults.scale, this.defaults[type]) : {};
			},
			updateScaleDefaults: function(type, additions) {
				var defaults = this.defaults;
				if (defaults.hasOwnProperty(type)) {
					defaults[type] = helpers.extend(defaults[type], additions);
				}
			},
			addScalesToLayout: function(chartInstance) {
				// Adds each scale to the chart.boxes array to be sized accordingly
				helpers.each(chartInstance.scales, function(scale) {
					Chart.layoutService.addBox(chartInstance, scale);
				});
			}
		};
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var noop = Chart.helpers.noop;
	
		/**
		 * The plugin service singleton
		 * @namespace Chart.plugins
		 * @since 2.1.0
		 */
		Chart.plugins = {
			_plugins: [],
	
			/**
			 * Registers the given plugin(s) if not already registered.
			 * @param {Array|Object} plugins plugin instance(s).
			 */
			register: function(plugins) {
				var p = this._plugins;
				([]).concat(plugins).forEach(function(plugin) {
					if (p.indexOf(plugin) === -1) {
						p.push(plugin);
					}
				});
			},
	
			/**
			 * Unregisters the given plugin(s) only if registered.
			 * @param {Array|Object} plugins plugin instance(s).
			 */
			unregister: function(plugins) {
				var p = this._plugins;
				([]).concat(plugins).forEach(function(plugin) {
					var idx = p.indexOf(plugin);
					if (idx !== -1) {
						p.splice(idx, 1);
					}
				});
			},
	
			/**
			 * Remove all registered p^lugins.
			 * @since 2.1.5
			 */
			clear: function() {
				this._plugins = [];
			},
	
			/**
			 * Returns the number of registered plugins?
			 * @returns {Number}
			 * @since 2.1.5
			 */
			count: function() {
				return this._plugins.length;
			},
	
			/**
			 * Returns all registered plugin intances.
			 * @returns {Array} array of plugin objects.
			 * @since 2.1.5
			 */
			getAll: function() {
				return this._plugins;
			},
	
			/**
			 * Calls registered plugins on the specified extension, with the given args. This
			 * method immediately returns as soon as a plugin explicitly returns false. The
			 * returned value can be used, for instance, to interrupt the current action.
			 * @param {String} extension the name of the plugin method to call (e.g. 'beforeUpdate').
			 * @param {Array} [args] extra arguments to apply to the extension call.
			 * @returns {Boolean} false if any of the plugins return false, else returns true.
			 */
			notify: function(extension, args) {
				var plugins = this._plugins;
				var ilen = plugins.length;
				var i, plugin;
	
				for (i=0; i<ilen; ++i) {
					plugin = plugins[i];
					if (typeof plugin[extension] === 'function') {
						if (plugin[extension].apply(plugin, args || []) === false) {
							return false;
						}
					}
				}
	
				return true;
			}
		};
	
		/**
		 * Plugin extension methods.
		 * @interface Chart.PluginBase
		 * @since 2.1.0
		 */
		Chart.PluginBase = Chart.Element.extend({
			// Called at start of chart init
			beforeInit: noop,
	
			// Called at end of chart init
			afterInit: noop,
	
			// Called at start of update
			beforeUpdate: noop,
	
			// Called at end of update
			afterUpdate: noop,
	
			// Called at start of draw
			beforeDraw: noop,
	
			// Called at end of draw
			afterDraw: noop,
	
			// Called during destroy
			destroy: noop
		});
	
		/**
		 * Provided for backward compatibility, use Chart.plugins instead
		 * @namespace Chart.pluginService
		 * @deprecated since version 2.1.5
		 * @todo remove me at version 3
		 */
		Chart.pluginService = Chart.plugins;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.scale = {
			display: true,
			position: "left",
	
			// grid line settings
			gridLines: {
				display: true,
				color: "rgba(0, 0, 0, 0.1)",
				lineWidth: 1,
				drawBorder: true,
				drawOnChartArea: true,
				drawTicks: true,
				tickMarkLength: 10,
				zeroLineWidth: 1,
				zeroLineColor: "rgba(0,0,0,0.25)",
				offsetGridLines: false
			},
	
			// scale label
			scaleLabel: {
				// actual label
				labelString: '',
	
				// display property
				display: false
			},
	
			// label settings
			ticks: {
				beginAtZero: false,
				minRotation: 0,
				maxRotation: 50,
				mirror: false,
				padding: 10,
				reverse: false,
				display: true,
				autoSkip: true,
				autoSkipPadding: 0,
				labelOffset: 0,
				// We pass through arrays to be rendered as multiline labels, we convert Others to strings here.
				callback: function(value) {
					return helpers.isArray(value) ? value : '' + value;
				}
			}
		};
	
		Chart.Scale = Chart.Element.extend({
	
			// These methods are ordered by lifecyle. Utilities then follow.
			// Any function defined here is inherited by all scale types.
			// Any function can be extended by the scale type
	
			beforeUpdate: function() {
				helpers.callCallback(this.options.beforeUpdate, [this]);
			},
			update: function(maxWidth, maxHeight, margins) {
				var me = this;
	
				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();
	
				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = helpers.extend({
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}, margins);
	
				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
	
				// Data min/max
				me.beforeDataLimits();
				me.determineDataLimits();
				me.afterDataLimits();
	
				// Ticks
				me.beforeBuildTicks();
				me.buildTicks();
				me.afterBuildTicks();
	
				me.beforeTickToLabelConversion();
				me.convertTicksToLabels();
				me.afterTickToLabelConversion();
	
				// Tick Rotation
				me.beforeCalculateTickRotation();
				me.calculateTickRotation();
				me.afterCalculateTickRotation();
				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();
	
				return me.minSize;
	
			},
			afterUpdate: function() {
				helpers.callCallback(this.options.afterUpdate, [this]);
			},
	
			//
	
			beforeSetDimensions: function() {
				helpers.callCallback(this.options.beforeSetDimensions, [this]);
			},
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;
	
					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}
	
				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;
			},
			afterSetDimensions: function() {
				helpers.callCallback(this.options.afterSetDimensions, [this]);
			},
	
			// Data limits
			beforeDataLimits: function() {
				helpers.callCallback(this.options.beforeDataLimits, [this]);
			},
			determineDataLimits: helpers.noop,
			afterDataLimits: function() {
				helpers.callCallback(this.options.afterDataLimits, [this]);
			},
	
			//
			beforeBuildTicks: function() {
				helpers.callCallback(this.options.beforeBuildTicks, [this]);
			},
			buildTicks: helpers.noop,
			afterBuildTicks: function() {
				helpers.callCallback(this.options.afterBuildTicks, [this]);
			},
	
			beforeTickToLabelConversion: function() {
				helpers.callCallback(this.options.beforeTickToLabelConversion, [this]);
			},
			convertTicksToLabels: function() {
				var me = this;
				// Convert ticks to strings
				me.ticks = me.ticks.map(function(numericalTick, index, ticks) {
						if (me.options.ticks.userCallback) {
							return me.options.ticks.userCallback(numericalTick, index, ticks);
						}
						return me.options.ticks.callback(numericalTick, index, ticks);
					},
					me);
			},
			afterTickToLabelConversion: function() {
				helpers.callCallback(this.options.afterTickToLabelConversion, [this]);
			},
	
			//
	
			beforeCalculateTickRotation: function() {
				helpers.callCallback(this.options.beforeCalculateTickRotation, [this]);
			},
			calculateTickRotation: function() {
				var me = this;
				var context = me.ctx;
				var globalDefaults = Chart.defaults.global;
				var optionTicks = me.options.ticks;
	
				//Get the width of each grid by calculating the difference
				//between x offsets between 0 and 1.
				var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				context.font = tickLabelFont;
	
				var firstWidth = context.measureText(me.ticks[0]).width;
				var lastWidth = context.measureText(me.ticks[me.ticks.length - 1]).width;
				var firstRotated;
	
				me.labelRotation = optionTicks.minRotation || 0;
				me.paddingRight = 0;
				me.paddingLeft = 0;
	
				if (me.options.display) {
					if (me.isHorizontal()) {
						me.paddingRight = lastWidth / 2 + 3;
						me.paddingLeft = firstWidth / 2 + 3;
	
						if (!me.longestTextCache) {
							me.longestTextCache = {};
						}
						var originalLabelWidth = helpers.longestText(context, tickLabelFont, me.ticks, me.longestTextCache);
						var labelWidth = originalLabelWidth;
						var cosRotation;
						var sinRotation;
	
						// Allow 3 pixels x2 padding either side for label readability
						// only the index matters for a dataset scale, but we want a consistent interface between scales
						var tickWidth = me.getPixelForTick(1) - me.getPixelForTick(0) - 6;
	
						//Max label rotation can be set or default to 90 - also act as a loop counter
						while (labelWidth > tickWidth && me.labelRotation < optionTicks.maxRotation) {
							cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
							sinRotation = Math.sin(helpers.toRadians(me.labelRotation));
	
							firstRotated = cosRotation * firstWidth;
	
							// We're right aligning the text now.
							if (firstRotated + tickFontSize / 2 > me.yLabelWidth) {
								me.paddingLeft = firstRotated + tickFontSize / 2;
							}
	
							me.paddingRight = tickFontSize / 2;
	
							if (sinRotation * originalLabelWidth > me.maxHeight) {
								// go back one step
								me.labelRotation--;
								break;
							}
	
							me.labelRotation++;
							labelWidth = cosRotation * originalLabelWidth;
						}
					}
				}
	
				if (me.margins) {
					me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
					me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
				}
			},
			afterCalculateTickRotation: function() {
				helpers.callCallback(this.options.afterCalculateTickRotation, [this]);
			},
	
			//
	
			beforeFit: function() {
				helpers.callCallback(this.options.beforeFit, [this]);
			},
			fit: function() {
				var me = this;
				// Reset
				var minSize = me.minSize = {
					width: 0,
					height: 0
				};
	
				var opts = me.options;
				var globalDefaults = Chart.defaults.global;
				var tickOpts = opts.ticks;
				var scaleLabelOpts = opts.scaleLabel;
				var display = opts.display;
				var isHorizontal = me.isHorizontal();
	
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
	
				var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabelOpts.fontSize, globalDefaults.defaultFontSize);
	
				var tickMarkLength = opts.gridLines.tickMarkLength;
	
				// Width
				if (isHorizontal) {
					// subtract the margins to line up with the chartArea if we are a full width scale
					minSize.width = me.isFullWidth() ? me.maxWidth - me.margins.left - me.margins.right : me.maxWidth;
				} else {
					minSize.width = display ? tickMarkLength : 0;
				}
	
				// height
				if (isHorizontal) {
					minSize.height = display ? tickMarkLength : 0;
				} else {
					minSize.height = me.maxHeight; // fill all the height
				}
	
				// Are we showing a title for the scale?
				if (scaleLabelOpts.display && display) {
					if (isHorizontal) {
						minSize.height += (scaleLabelFontSize * 1.5);
					} else {
						minSize.width += (scaleLabelFontSize * 1.5);
					}
				}
	
				if (tickOpts.display && display) {
					// Don't bother fitting the ticks if we are not showing them
					if (!me.longestTextCache) {
						me.longestTextCache = {};
					}
	
					var largestTextWidth = helpers.longestText(me.ctx, tickLabelFont, me.ticks, me.longestTextCache);
					var tallestLabelHeightInLines = helpers.numberOfLabelLines(me.ticks);
					var lineSpace = tickFontSize * 0.5;
	
					if (isHorizontal) {
						// A horizontal axis is more constrained by the height.
						me.longestLabelWidth = largestTextWidth;
	
						// TODO - improve this calculation
						var labelHeight = (Math.sin(helpers.toRadians(me.labelRotation)) * me.longestLabelWidth) + (tickFontSize * tallestLabelHeightInLines) + (lineSpace * tallestLabelHeightInLines);
	
						minSize.height = Math.min(me.maxHeight, minSize.height + labelHeight);
						me.ctx.font = tickLabelFont;
	
						var firstLabelWidth = me.ctx.measureText(me.ticks[0]).width;
						var lastLabelWidth = me.ctx.measureText(me.ticks[me.ticks.length - 1]).width;
	
						// Ensure that our ticks are always inside the canvas. When rotated, ticks are right aligned which means that the right padding is dominated
						// by the font height
						var cosRotation = Math.cos(helpers.toRadians(me.labelRotation));
						var sinRotation = Math.sin(helpers.toRadians(me.labelRotation));
						me.paddingLeft = me.labelRotation !== 0 ? (cosRotation * firstLabelWidth) + 3 : firstLabelWidth / 2 + 3; // add 3 px to move away from canvas edges
						me.paddingRight = me.labelRotation !== 0 ? (sinRotation * (tickFontSize / 2)) + 3 : lastLabelWidth / 2 + 3; // when rotated
					} else {
						// A vertical axis is more constrained by the width. Labels are the dominant factor here, so get that length first
						var maxLabelWidth = me.maxWidth - minSize.width;
	
						// Account for padding
						var mirror = tickOpts.mirror;
						if (!mirror) {
							largestTextWidth += me.options.ticks.padding;
						} else {
							// If mirrored text is on the inside so don't expand
							largestTextWidth = 0;
						}
	
						if (largestTextWidth < maxLabelWidth) {
							// We don't need all the room
							minSize.width += largestTextWidth;
						} else {
							// Expand to max size
							minSize.width = me.maxWidth;
						}
	
						me.paddingTop = tickFontSize / 2;
						me.paddingBottom = tickFontSize / 2;
					}
				}
	
				if (me.margins) {
					me.paddingLeft = Math.max(me.paddingLeft - me.margins.left, 0);
					me.paddingTop = Math.max(me.paddingTop - me.margins.top, 0);
					me.paddingRight = Math.max(me.paddingRight - me.margins.right, 0);
					me.paddingBottom = Math.max(me.paddingBottom - me.margins.bottom, 0);
				}
	
				me.width = minSize.width;
				me.height = minSize.height;
	
			},
			afterFit: function() {
				helpers.callCallback(this.options.afterFit, [this]);
			},
	
			// Shared Methods
			isHorizontal: function() {
				return this.options.position === "top" || this.options.position === "bottom";
			},
			isFullWidth: function() {
				return (this.options.fullWidth);
			},
	
			// Get the correct value. NaN bad inputs, If the value type is object get the x or y based on whether we are horizontal or not
			getRightValue: function(rawValue) {
				// Null and undefined values first
				if (rawValue === null || typeof(rawValue) === 'undefined') {
					return NaN;
				}
				// isNaN(object) returns true, so make sure NaN is checking for a number
				if (typeof(rawValue) === 'number' && isNaN(rawValue)) {
					return NaN;
				}
				// If it is in fact an object, dive in one more level
				if (typeof(rawValue) === "object") {
					if ((rawValue instanceof Date) || (rawValue.isValid)) {
						return rawValue;
					} else {
						return this.getRightValue(this.isHorizontal() ? rawValue.x : rawValue.y);
					}
				}
	
				// Value is good, return it
				return rawValue;
			},
	
			// Used to get the value to display in the tooltip for the data at the given index
			// function getLabelForIndex(index, datasetIndex)
			getLabelForIndex: helpers.noop,
	
			// Used to get data value locations.  Value can either be an index or a numerical value
			getPixelForValue: helpers.noop,
	
			// Used to get the data value from a given pixel. This is the inverse of getPixelForValue
			getValueForPixel: helpers.noop,
	
			// Used for tick location, should
			getPixelForTick: function(index, includeOffset) {
				var me = this;
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var tickWidth = innerWidth / Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
					var pixel = (tickWidth * index) + me.paddingLeft;
	
					if (includeOffset) {
						pixel += tickWidth / 2;
					}
	
					var finalVal = me.left + Math.round(pixel);
					finalVal += me.isFullWidth() ? me.margins.left : 0;
					return finalVal;
				} else {
					var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
					return me.top + (index * (innerHeight / (me.ticks.length - 1)));
				}
			},
	
			// Utility for getting the pixel location of a percentage of scale
			getPixelForDecimal: function(decimal /*, includeOffset*/ ) {
				var me = this;
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var valueOffset = (innerWidth * decimal) + me.paddingLeft;
	
					var finalVal = me.left + Math.round(valueOffset);
					finalVal += me.isFullWidth() ? me.margins.left : 0;
					return finalVal;
				} else {
					return me.top + (decimal * me.height);
				}
			},
	
			getBasePixel: function() {
				var me = this;
				var min = me.min;
				var max = me.max;
	
				return me.getPixelForValue(
					me.beginAtZero? 0:
					min < 0 && max < 0? max :
					min > 0 && max > 0? min :
					0);
			},
	
			// Actualy draw the scale on the canvas
			// @param {rectangle} chartArea : the area of the chart to draw full grid lines on
			draw: function(chartArea) {
				var me = this;
				var options = me.options;
				if (!options.display) {
					return;
				}
	
				var context = me.ctx;
				var globalDefaults = Chart.defaults.global;
				var optionTicks = options.ticks;
				var gridLines = options.gridLines;
				var scaleLabel = options.scaleLabel;
	
				var isRotated = me.labelRotation !== 0;
				var skipRatio;
				var useAutoskipper = optionTicks.autoSkip;
				var isHorizontal = me.isHorizontal();
	
				// figure out the maximum number of gridlines to show
				var maxTicks;
				if (optionTicks.maxTicksLimit) {
					maxTicks = optionTicks.maxTicksLimit;
				}
	
				var tickFontColor = helpers.getValueOrDefault(optionTicks.fontColor, globalDefaults.defaultFontColor);
				var tickFontSize = helpers.getValueOrDefault(optionTicks.fontSize, globalDefaults.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(optionTicks.fontStyle, globalDefaults.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(optionTicks.fontFamily, globalDefaults.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				var tl = gridLines.tickMarkLength;
	
				var scaleLabelFontColor = helpers.getValueOrDefault(scaleLabel.fontColor, globalDefaults.defaultFontColor);
				var scaleLabelFontSize = helpers.getValueOrDefault(scaleLabel.fontSize, globalDefaults.defaultFontSize);
				var scaleLabelFontStyle = helpers.getValueOrDefault(scaleLabel.fontStyle, globalDefaults.defaultFontStyle);
				var scaleLabelFontFamily = helpers.getValueOrDefault(scaleLabel.fontFamily, globalDefaults.defaultFontFamily);
				var scaleLabelFont = helpers.fontString(scaleLabelFontSize, scaleLabelFontStyle, scaleLabelFontFamily);
	
				var labelRotationRadians = helpers.toRadians(me.labelRotation);
				var cosRotation = Math.cos(labelRotationRadians);
				var longestRotatedLabel = me.longestLabelWidth * cosRotation;
	
				// Make sure we draw text in the correct color and font
				context.fillStyle = tickFontColor;
	
				var itemsToDraw = [];
	
				if (isHorizontal) {
					skipRatio = false;
	
					// Only calculate the skip ratio with the half width of longestRotateLabel if we got an actual rotation
					// See #2584
					if (isRotated) {
						longestRotatedLabel /= 2;
					}
	
					if ((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length > (me.width - (me.paddingLeft + me.paddingRight))) {
						skipRatio = 1 + Math.floor(((longestRotatedLabel + optionTicks.autoSkipPadding) * me.ticks.length) / (me.width - (me.paddingLeft + me.paddingRight)));
					}
	
					// if they defined a max number of optionTicks,
					// increase skipRatio until that number is met
					if (maxTicks && me.ticks.length > maxTicks) {
						while (!skipRatio || me.ticks.length / (skipRatio || 1) > maxTicks) {
							if (!skipRatio) {
								skipRatio = 1;
							}
							skipRatio += 1;
						}
					}
	
					if (!useAutoskipper) {
						skipRatio = false;
					}
				}
	
	
				var xTickStart = options.position === "right" ? me.left : me.right - tl;
				var xTickEnd = options.position === "right" ? me.left + tl : me.right;
				var yTickStart = options.position === "bottom" ? me.top : me.bottom - tl;
				var yTickEnd = options.position === "bottom" ? me.top + tl : me.bottom;
	
				helpers.each(me.ticks, function(label, index) {
					// If the callback returned a null or undefined value, do not draw this line
					if (label === undefined || label === null) {
						return;
					}
	
					var isLastTick = me.ticks.length === index + 1;
	
					// Since we always show the last tick,we need may need to hide the last shown one before
					var shouldSkip = (skipRatio > 1 && index % skipRatio > 0) || (index % skipRatio === 0 && index + skipRatio >= me.ticks.length);
					if (shouldSkip && !isLastTick || (label === undefined || label === null)) {
						return;
					}
	
					var lineWidth, lineColor;
					if (index === (typeof me.zeroLineIndex !== 'undefined' ? me.zeroLineIndex : 0)) {
						// Draw the first index specially
						lineWidth = gridLines.zeroLineWidth;
						lineColor = gridLines.zeroLineColor;
					} else  {
						lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, index);
						lineColor = helpers.getValueAtIndexOrDefault(gridLines.color, index);
					}
	
					// Common properties
					var tx1, ty1, tx2, ty2, x1, y1, x2, y2, labelX, labelY;
					var textAlign, textBaseline = 'middle';
	
					if (isHorizontal) {
						if (!isRotated) {
							textBaseline = options.position === 'top' ? 'bottom' : 'top';
						}
	
						textAlign = isRotated ? 'right' : 'center';
	
						var xLineValue = me.getPixelForTick(index) + helpers.aliasPixel(lineWidth); // xvalues for grid lines
						labelX = me.getPixelForTick(index, gridLines.offsetGridLines) + optionTicks.labelOffset; // x values for optionTicks (need to consider offsetLabel option)
						labelY = (isRotated) ? me.top + 12 : options.position === 'top' ? me.bottom - tl : me.top + tl;
	
						tx1 = tx2 = x1 = x2 = xLineValue;
						ty1 = yTickStart;
						ty2 = yTickEnd;
						y1 = chartArea.top;
						y2 = chartArea.bottom;
					} else {
						if (options.position === 'left') {
							if (optionTicks.mirror) {
								labelX = me.right + optionTicks.padding;
								textAlign = 'left';
							} else {
								labelX = me.right - optionTicks.padding;
								textAlign = 'right';
							}
						} else {
							// right side
							if (optionTicks.mirror) {
								labelX = me.left - optionTicks.padding;
								textAlign = 'right';
							} else {
								labelX = me.left + optionTicks.padding;
								textAlign = 'left';
							}
						}
	
						var yLineValue = me.getPixelForTick(index); // xvalues for grid lines
						yLineValue += helpers.aliasPixel(lineWidth);
						labelY = me.getPixelForTick(index, gridLines.offsetGridLines);
	
						tx1 = xTickStart;
						tx2 = xTickEnd;
						x1 = chartArea.left;
						x2 = chartArea.right;
						ty1 = ty2 = y1 = y2 = yLineValue;
					}
	
					itemsToDraw.push({
						tx1: tx1,
						ty1: ty1,
						tx2: tx2,
						ty2: ty2,
						x1: x1,
						y1: y1,
						x2: x2,
						y2: y2,
						labelX: labelX,
						labelY: labelY,
						glWidth: lineWidth,
						glColor: lineColor,
						rotation: -1 * labelRotationRadians,
						label: label,
						textBaseline: textBaseline,
						textAlign: textAlign
					});
				});
	
				// Draw all of the tick labels, tick marks, and grid lines at the correct places
				helpers.each(itemsToDraw, function(itemToDraw) {
					if (gridLines.display) {
						context.lineWidth = itemToDraw.glWidth;
						context.strokeStyle = itemToDraw.glColor;
	
						context.beginPath();
	
						if (gridLines.drawTicks) {
							context.moveTo(itemToDraw.tx1, itemToDraw.ty1);
							context.lineTo(itemToDraw.tx2, itemToDraw.ty2);
						}
	
						if (gridLines.drawOnChartArea) {
							context.moveTo(itemToDraw.x1, itemToDraw.y1);
							context.lineTo(itemToDraw.x2, itemToDraw.y2);
						}
	
						context.stroke();
					}
	
					if (optionTicks.display) {
						context.save();
						context.translate(itemToDraw.labelX, itemToDraw.labelY);
						context.rotate(itemToDraw.rotation);
						context.font = tickLabelFont;
						context.textBaseline = itemToDraw.textBaseline;
						context.textAlign = itemToDraw.textAlign;
	
						var label = itemToDraw.label;
						if (helpers.isArray(label)) {
							for (var i = 0, y = 0; i < label.length; ++i) {
								// We just make sure the multiline element is a string here..
								context.fillText('' + label[i], 0, y);
								// apply same lineSpacing as calculated @ L#320
								y += (tickFontSize * 1.5);
							}
						} else {
							context.fillText(label, 0, 0);
						}
						context.restore();
					}
				});
	
				if (scaleLabel.display) {
					// Draw the scale label
					var scaleLabelX;
					var scaleLabelY;
					var rotation = 0;
	
					if (isHorizontal) {
						scaleLabelX = me.left + ((me.right - me.left) / 2); // midpoint of the width
						scaleLabelY = options.position === 'bottom' ? me.bottom - (scaleLabelFontSize / 2) : me.top + (scaleLabelFontSize / 2);
					} else {
						var isLeft = options.position === 'left';
						scaleLabelX = isLeft ? me.left + (scaleLabelFontSize / 2) : me.right - (scaleLabelFontSize / 2);
						scaleLabelY = me.top + ((me.bottom - me.top) / 2);
						rotation = isLeft ? -0.5 * Math.PI : 0.5 * Math.PI;
					}
	
					context.save();
					context.translate(scaleLabelX, scaleLabelY);
					context.rotate(rotation);
					context.textAlign = 'center';
					context.textBaseline = 'middle';
					context.fillStyle = scaleLabelFontColor; // render in correct colour
					context.font = scaleLabelFont;
					context.fillText(scaleLabel.labelString, 0, 0);
					context.restore();
				}
	
				if (gridLines.drawBorder) {
					// Draw the line at the edge of the axis
					context.lineWidth = helpers.getValueAtIndexOrDefault(gridLines.lineWidth, 0);
					context.strokeStyle = helpers.getValueAtIndexOrDefault(gridLines.color, 0);
					var x1 = me.left,
						x2 = me.right,
						y1 = me.top,
						y2 = me.bottom;
	
					var aliasPixel = helpers.aliasPixel(context.lineWidth);
					if (isHorizontal) {
						y1 = y2 = options.position === 'top' ? me.bottom : me.top;
						y1 += aliasPixel;
						y2 += aliasPixel;
					} else {
						x1 = x2 = options.position === 'left' ? me.right : me.left;
						x1 += aliasPixel;
						x2 += aliasPixel;
					}
	
					context.beginPath();
					context.moveTo(x1, y1);
					context.lineTo(x2, y2);
					context.stroke();
				}
			}
		});
	};


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.global.title = {
			display: false,
			position: 'top',
			fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
	
			fontStyle: 'bold',
			padding: 10,
	
			// actual title
			text: ''
		};
	
		var noop = helpers.noop;
		Chart.Title = Chart.Element.extend({
	
			initialize: function(config) {
				var me = this;
				helpers.extend(me, config);
				me.options = helpers.configMerge(Chart.defaults.global.title, config.options);
	
				// Contains hit boxes for each dataset (in dataset order)
				me.legendHitBoxes = [];
			},
	
			// These methods are ordered by lifecyle. Utilities then follow.
	
			beforeUpdate: function () {
				var chartOpts = this.chart.options;
				if (chartOpts && chartOpts.title) {
					this.options = helpers.configMerge(Chart.defaults.global.title, chartOpts.title);
				}
			},
			update: function(maxWidth, maxHeight, margins) {
				var me = this;
	
				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();
	
				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = margins;
	
				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
				// Labels
				me.beforeBuildLabels();
				me.buildLabels();
				me.afterBuildLabels();
	
				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();
	
				return me.minSize;
	
			},
			afterUpdate: noop,
	
			//
	
			beforeSetDimensions: noop,
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;
	
					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}
	
				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;
	
				// Reset minSize
				me.minSize = {
					width: 0,
					height: 0
				};
			},
			afterSetDimensions: noop,
	
			//
	
			beforeBuildLabels: noop,
			buildLabels: noop,
			afterBuildLabels: noop,
	
			//
	
			beforeFit: noop,
			fit: function() {
				var me = this,
					valueOrDefault = helpers.getValueOrDefault,
					opts = me.options,
					globalDefaults = Chart.defaults.global,
					display = opts.display,
					fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
					minSize = me.minSize;
	
				if (me.isHorizontal()) {
					minSize.width = me.maxWidth; // fill all the width
					minSize.height = display ? fontSize + (opts.padding * 2) : 0;
				} else {
					minSize.width = display ? fontSize + (opts.padding * 2) : 0;
					minSize.height = me.maxHeight; // fill all the height
				}
	
				me.width = minSize.width;
				me.height = minSize.height;
	
			},
			afterFit: noop,
	
			// Shared Methods
			isHorizontal: function() {
				var pos = this.options.position;
				return pos === "top" || pos === "bottom";
			},
	
			// Actualy draw the title block on the canvas
			draw: function() {
				var me = this,
					ctx = me.ctx,
					valueOrDefault = helpers.getValueOrDefault,
					opts = me.options,
					globalDefaults = Chart.defaults.global;
	
				if (opts.display) {
					var fontSize = valueOrDefault(opts.fontSize, globalDefaults.defaultFontSize),
						fontStyle = valueOrDefault(opts.fontStyle, globalDefaults.defaultFontStyle),
						fontFamily = valueOrDefault(opts.fontFamily, globalDefaults.defaultFontFamily),
						titleFont = helpers.fontString(fontSize, fontStyle, fontFamily),
						rotation = 0,
						titleX,
						titleY,
						top = me.top,
						left = me.left,
						bottom = me.bottom,
						right = me.right;
	
					ctx.fillStyle = valueOrDefault(opts.fontColor, globalDefaults.defaultFontColor); // render in correct colour
					ctx.font = titleFont;
	
					// Horizontal
					if (me.isHorizontal()) {
						titleX = left + ((right - left) / 2); // midpoint of the width
						titleY = top + ((bottom - top) / 2); // midpoint of the height
					} else {
						titleX = opts.position === 'left' ? left + (fontSize / 2) : right - (fontSize / 2);
						titleY = top + ((bottom - top) / 2);
						rotation = Math.PI * (opts.position === 'left' ? -0.5 : 0.5);
					}
	
					ctx.save();
					ctx.translate(titleX, titleY);
					ctx.rotate(rotation);
					ctx.textAlign = 'center';
					ctx.textBaseline = 'middle';
					ctx.fillText(opts.text, 0, 0);
					ctx.restore();
				}
			}
		});
	
		// Register the title plugin
		Chart.plugins.register({
			beforeInit: function(chartInstance) {
				var opts = chartInstance.options;
				var titleOpts = opts.title;
	
				if (titleOpts) {
					chartInstance.titleBlock = new Chart.Title({
						ctx: chartInstance.chart.ctx,
						options: titleOpts,
						chart: chartInstance
					});
	
					Chart.layoutService.addBox(chartInstance, chartInstance.titleBlock);
				}
			}
		});
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var noop = helpers.noop;
	
		Chart.defaults.global.legend = {
	
			display: true,
			position: 'top',
			fullWidth: true, // marks that this box should take the full width of the canvas (pushing down other boxes)
			reverse: false,
	
			// a callback that will handle
			onClick: function(e, legendItem) {
				var index = legendItem.datasetIndex;
				var ci = this.chart;
				var meta = ci.getDatasetMeta(index);
	
				// See controller.isDatasetVisible comment
				meta.hidden = meta.hidden === null? !ci.data.datasets[index].hidden : null;
	
				// We hid a dataset ... rerender the chart
				ci.update();
			},
	
			labels: {
				boxWidth: 40,
				padding: 10,
				// Generates labels shown in the legend
				// Valid properties to return:
				// text : text to display
				// fillStyle : fill of coloured box
				// strokeStyle: stroke of coloured box
				// hidden : if this legend item refers to a hidden item
				// lineCap : cap style for line
				// lineDash
				// lineDashOffset :
				// lineJoin :
				// lineWidth :
				generateLabels: function(chart) {
					var data = chart.data;
					return helpers.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
						return {
							text: dataset.label,
							fillStyle: (!helpers.isArray(dataset.backgroundColor) ? dataset.backgroundColor : dataset.backgroundColor[0]),
							hidden: !chart.isDatasetVisible(i),
							lineCap: dataset.borderCapStyle,
							lineDash: dataset.borderDash,
							lineDashOffset: dataset.borderDashOffset,
							lineJoin: dataset.borderJoinStyle,
							lineWidth: dataset.borderWidth,
							strokeStyle: dataset.borderColor,
							pointStyle: dataset.pointStyle,
	
							// Below is extra data used for toggling the datasets
							datasetIndex: i
						};
					}, this) : [];
				}
			}
		};
	
		Chart.Legend = Chart.Element.extend({
	
			initialize: function(config) {
				helpers.extend(this, config);
	
				// Contains hit boxes for each dataset (in dataset order)
				this.legendHitBoxes = [];
	
				// Are we in doughnut mode which has a different data type
				this.doughnutMode = false;
			},
	
			// These methods are ordered by lifecyle. Utilities then follow.
			// Any function defined here is inherited by all legend types.
			// Any function can be extended by the legend type
	
			beforeUpdate: noop,
			update: function(maxWidth, maxHeight, margins) {
				var me = this;
	
				// Update Lifecycle - Probably don't want to ever extend or overwrite this function ;)
				me.beforeUpdate();
	
				// Absorb the master measurements
				me.maxWidth = maxWidth;
				me.maxHeight = maxHeight;
				me.margins = margins;
	
				// Dimensions
				me.beforeSetDimensions();
				me.setDimensions();
				me.afterSetDimensions();
				// Labels
				me.beforeBuildLabels();
				me.buildLabels();
				me.afterBuildLabels();
	
				// Fit
				me.beforeFit();
				me.fit();
				me.afterFit();
				//
				me.afterUpdate();
	
				return me.minSize;
			},
			afterUpdate: noop,
	
			//
	
			beforeSetDimensions: noop,
			setDimensions: function() {
				var me = this;
				// Set the unconstrained dimension before label rotation
				if (me.isHorizontal()) {
					// Reset position before calculating rotation
					me.width = me.maxWidth;
					me.left = 0;
					me.right = me.width;
				} else {
					me.height = me.maxHeight;
	
					// Reset position before calculating rotation
					me.top = 0;
					me.bottom = me.height;
				}
	
				// Reset padding
				me.paddingLeft = 0;
				me.paddingTop = 0;
				me.paddingRight = 0;
				me.paddingBottom = 0;
	
				// Reset minSize
				me.minSize = {
					width: 0,
					height: 0
				};
			},
			afterSetDimensions: noop,
	
			//
	
			beforeBuildLabels: noop,
			buildLabels: function() {
				var me = this;
				me.legendItems = me.options.labels.generateLabels.call(me, me.chart);
				if(me.options.reverse){
					me.legendItems.reverse();
				}
			},
			afterBuildLabels: noop,
	
			//
	
			beforeFit: noop,
			fit: function() {
				var me = this;
				var opts = me.options;
				var labelOpts = opts.labels;
				var display = opts.display;
	
				var ctx = me.ctx;
	
				var globalDefault = Chart.defaults.global,
					itemOrDefault = helpers.getValueOrDefault,
					fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
					fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
					fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
					labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
	
				// Reset hit boxes
				var hitboxes = me.legendHitBoxes = [];
	
				var minSize = me.minSize;
				var isHorizontal = me.isHorizontal();
	
				if (isHorizontal) {
					minSize.width = me.maxWidth; // fill all the width
					minSize.height = display ? 10 : 0;
				} else {
					minSize.width = display ? 10 : 0;
					minSize.height = me.maxHeight; // fill all the height
				}
	
				// Increase sizes here
				if (display) {
					ctx.font = labelFont;
	
					if (isHorizontal) {
						// Labels
	
						// Width of each line of legend boxes. Labels wrap onto multiple lines when there are too many to fit on one
						var lineWidths = me.lineWidths = [0];
						var totalHeight = me.legendItems.length ? fontSize + (labelOpts.padding) : 0;
	
						ctx.textAlign = "left";
						ctx.textBaseline = 'top';
	
						helpers.each(me.legendItems, function(legendItem, i) {
							var boxWidth = labelOpts.usePointStyle ?
								fontSize * Math.sqrt(2) :
								labelOpts.boxWidth;
	
							var width = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
							if (lineWidths[lineWidths.length - 1] + width + labelOpts.padding >= me.width) {
								totalHeight += fontSize + (labelOpts.padding);
								lineWidths[lineWidths.length] = me.left;
							}
	
							// Store the hitbox width and height here. Final position will be updated in `draw`
							hitboxes[i] = {
								left: 0,
								top: 0,
								width: width,
								height: fontSize
							};
	
							lineWidths[lineWidths.length - 1] += width + labelOpts.padding;
						});
	
						minSize.height += totalHeight;
	
					} else {
						var vPadding = labelOpts.padding;
						var columnWidths = me.columnWidths = [];
						var totalWidth = labelOpts.padding;
						var currentColWidth = 0;
						var currentColHeight = 0;
						var itemHeight = fontSize + vPadding;
	
						helpers.each(me.legendItems, function(legendItem, i) {
							// If usePointStyle is set, multiple boxWidth by 2 since it represents
							// the radius and not truly the width
							var boxWidth = labelOpts.usePointStyle ? 2 * labelOpts.boxWidth : labelOpts.boxWidth;
	
							var itemWidth = boxWidth + (fontSize / 2) + ctx.measureText(legendItem.text).width;
	
							// If too tall, go to new column
							if (currentColHeight + itemHeight > minSize.height) {
								totalWidth += currentColWidth + labelOpts.padding;
								columnWidths.push(currentColWidth); // previous column width
	
								currentColWidth = 0;
								currentColHeight = 0;
							}
	
							// Get max width
							currentColWidth = Math.max(currentColWidth, itemWidth);
							currentColHeight += itemHeight;
	
							// Store the hitbox width and height here. Final position will be updated in `draw`
							hitboxes[i] = {
								left: 0,
								top: 0,
								width: itemWidth,
								height: fontSize
							};
						});
	
						totalWidth += currentColWidth;
						columnWidths.push(currentColWidth);
						minSize.width += totalWidth;
					}
				}
	
				me.width = minSize.width;
				me.height = minSize.height;
			},
			afterFit: noop,
	
			// Shared Methods
			isHorizontal: function() {
				return this.options.position === "top" || this.options.position === "bottom";
			},
	
			// Actualy draw the legend on the canvas
			draw: function() {
				var me = this;
				var opts = me.options;
				var labelOpts = opts.labels;
				var globalDefault = Chart.defaults.global,
					lineDefault = globalDefault.elements.line,
					legendWidth = me.width,
					lineWidths = me.lineWidths;
	
				if (opts.display) {
					var ctx = me.ctx,
						cursor,
						itemOrDefault = helpers.getValueOrDefault,
						fontColor = itemOrDefault(labelOpts.fontColor, globalDefault.defaultFontColor),
						fontSize = itemOrDefault(labelOpts.fontSize, globalDefault.defaultFontSize),
						fontStyle = itemOrDefault(labelOpts.fontStyle, globalDefault.defaultFontStyle),
						fontFamily = itemOrDefault(labelOpts.fontFamily, globalDefault.defaultFontFamily),
						labelFont = helpers.fontString(fontSize, fontStyle, fontFamily);
	
					// Canvas setup
					ctx.textAlign = "left";
					ctx.textBaseline = 'top';
					ctx.lineWidth = 0.5;
					ctx.strokeStyle = fontColor; // for strikethrough effect
					ctx.fillStyle = fontColor; // render in correct colour
					ctx.font = labelFont;
	
					var boxWidth = labelOpts.boxWidth,
						hitboxes = me.legendHitBoxes;
	
					// current position
					var drawLegendBox = function(x, y, legendItem) {
						if (isNaN(boxWidth) || boxWidth <= 0) {
							return;
						}
	
						// Set the ctx for the box
						ctx.save();
	
						ctx.fillStyle = itemOrDefault(legendItem.fillStyle, globalDefault.defaultColor);
						ctx.lineCap = itemOrDefault(legendItem.lineCap, lineDefault.borderCapStyle);
						ctx.lineDashOffset = itemOrDefault(legendItem.lineDashOffset, lineDefault.borderDashOffset);
						ctx.lineJoin = itemOrDefault(legendItem.lineJoin, lineDefault.borderJoinStyle);
						ctx.lineWidth = itemOrDefault(legendItem.lineWidth, lineDefault.borderWidth);
						ctx.strokeStyle = itemOrDefault(legendItem.strokeStyle, globalDefault.defaultColor);
	
						if (ctx.setLineDash) {
							// IE 9 and 10 do not support line dash
							ctx.setLineDash(itemOrDefault(legendItem.lineDash, lineDefault.borderDash));
						}
	
						if (opts.labels && opts.labels.usePointStyle) {
							// Recalulate x and y for drawPoint() because its expecting
							// x and y to be center of figure (instead of top left)
							var radius = fontSize * Math.SQRT2 / 2;
							var offSet = radius / Math.SQRT2;
							var centerX = x + offSet;
							var centerY = y + offSet;
	
							// Draw pointStyle as legend symbol
							Chart.canvasHelpers.drawPoint(ctx, legendItem.pointStyle, radius, centerX, centerY);
						}
						else {
							// Draw box as legend symbol
							ctx.strokeRect(x, y, boxWidth, fontSize);
							ctx.fillRect(x, y, boxWidth, fontSize);
						}
	
						ctx.restore();
					};
					var fillText = function(x, y, legendItem, textWidth) {
						ctx.fillText(legendItem.text, boxWidth + (fontSize / 2) + x, y);
	
						if (legendItem.hidden) {
							// Strikethrough the text if hidden
							ctx.beginPath();
							ctx.lineWidth = 2;
							ctx.moveTo(boxWidth + (fontSize / 2) + x, y + (fontSize / 2));
							ctx.lineTo(boxWidth + (fontSize / 2) + x + textWidth, y + (fontSize / 2));
							ctx.stroke();
						}
					};
	
					// Horizontal
					var isHorizontal = me.isHorizontal();
					if (isHorizontal) {
						cursor = {
							x: me.left + ((legendWidth - lineWidths[0]) / 2),
							y: me.top + labelOpts.padding,
							line: 0
						};
					} else {
						cursor = {
							x: me.left + labelOpts.padding,
							y: me.top + labelOpts.padding,
							line: 0
						};
					}
	
					var itemHeight = fontSize + labelOpts.padding;
					helpers.each(me.legendItems, function(legendItem, i) {
						var textWidth = ctx.measureText(legendItem.text).width,
							width = labelOpts.usePointStyle ?
								fontSize + (fontSize / 2) + textWidth :
								boxWidth + (fontSize / 2) + textWidth,
							x = cursor.x,
							y = cursor.y;
	
						if (isHorizontal) {
							if (x + width >= legendWidth) {
								y = cursor.y += itemHeight;
								cursor.line++;
								x = cursor.x = me.left + ((legendWidth - lineWidths[cursor.line]) / 2);
							}
						} else {
							if (y + itemHeight > me.bottom) {
								x = cursor.x = x + me.columnWidths[cursor.line] + labelOpts.padding;
								y = cursor.y = me.top;
								cursor.line++;
							}
						}
	
						drawLegendBox(x, y, legendItem);
	
						hitboxes[i].left = x;
						hitboxes[i].top = y;
	
						// Fill the actual label
						fillText(x, y, legendItem, textWidth);
	
						if (isHorizontal) {
							cursor.x += width + (labelOpts.padding);
						} else {
							cursor.y += itemHeight;
						}
	
					});
				}
			},
	
			// Handle an event
			handleEvent: function(e) {
				var me = this;
				var position = helpers.getRelativePosition(e, me.chart.chart),
					x = position.x,
					y = position.y,
					opts = me.options;
	
				if (x >= me.left && x <= me.right && y >= me.top && y <= me.bottom) {
					// See if we are touching one of the dataset boxes
					var lh = me.legendHitBoxes;
					for (var i = 0; i < lh.length; ++i) {
						var hitBox = lh[i];
	
						if (x >= hitBox.left && x <= hitBox.left + hitBox.width && y >= hitBox.top && y <= hitBox.top + hitBox.height) {
							// Touching an element
							if (opts.onClick) {
								opts.onClick.call(me, e, me.legendItems[i]);
							}
							break;
						}
					}
				}
			}
		});
	
		// Register the legend plugin
		Chart.plugins.register({
			beforeInit: function(chartInstance) {
				var opts = chartInstance.options;
				var legendOpts = opts.legend;
	
				if (legendOpts) {
					chartInstance.legend = new Chart.Legend({
						ctx: chartInstance.chart.ctx,
						options: legendOpts,
						chart: chartInstance
					});
	
					Chart.layoutService.addBox(chartInstance, chartInstance.legend);
				}
			}
		});
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.global.tooltips = {
			enabled: true,
			custom: null,
			mode: 'single',
			backgroundColor: "rgba(0,0,0,0.8)",
			titleFontStyle: "bold",
			titleSpacing: 2,
			titleMarginBottom: 6,
			titleFontColor: "#fff",
			titleAlign: "left",
			bodySpacing: 2,
			bodyFontColor: "#fff",
			bodyAlign: "left",
			footerFontStyle: "bold",
			footerSpacing: 2,
			footerMarginTop: 6,
			footerFontColor: "#fff",
			footerAlign: "left",
			yPadding: 6,
			xPadding: 6,
			yAlign : 'center',
			xAlign : 'center',
			caretSize: 5,
			cornerRadius: 6,
			multiKeyBackground: '#fff',
			callbacks: {
				// Args are: (tooltipItems, data)
				beforeTitle: helpers.noop,
				title: function(tooltipItems, data) {
					// Pick first xLabel for now
					var title = '';
					var labels = data.labels;
					var labelCount = labels ? labels.length : 0;
	
					if (tooltipItems.length > 0) {
						var item = tooltipItems[0];
	
						if (item.xLabel) {
							title = item.xLabel;
						} else if (labelCount > 0 && item.index < labelCount) {
							title = labels[item.index];
						}
					}
	
					return title;
				},
				afterTitle: helpers.noop,
	
				// Args are: (tooltipItems, data)
				beforeBody: helpers.noop,
	
				// Args are: (tooltipItem, data)
				beforeLabel: helpers.noop,
				label: function(tooltipItem, data) {
					var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
					return datasetLabel + ': ' + tooltipItem.yLabel;
				},
				labelColor: function(tooltipItem, chartInstance) {
					var meta = chartInstance.getDatasetMeta(tooltipItem.datasetIndex);
					var activeElement = meta.data[tooltipItem.index];
					var view = activeElement._view;
					return {
						borderColor: view.borderColor,
						backgroundColor: view.backgroundColor
					};
				},
				afterLabel: helpers.noop,
	
				// Args are: (tooltipItems, data)
				afterBody: helpers.noop,
	
				// Args are: (tooltipItems, data)
				beforeFooter: helpers.noop,
				footer: helpers.noop,
				afterFooter: helpers.noop
			}
		};
	
		// Helper to push or concat based on if the 2nd parameter is an array or not
		function pushOrConcat(base, toPush) {
			if (toPush) {
				if (helpers.isArray(toPush)) {
					//base = base.concat(toPush);
					Array.prototype.push.apply(base, toPush);
				} else {
					base.push(toPush);
				}
			}
	
			return base;
		}
	
		function getAveragePosition(elements) {
			if (!elements.length) {
				return false;
			}
	
			var i, len;
			var xPositions = [];
			var yPositions = [];
	
			for (i = 0, len = elements.length; i < len; ++i) {
				var el = elements[i];
				if (el && el.hasValue()){
					var pos = el.tooltipPosition();
					xPositions.push(pos.x);
					yPositions.push(pos.y);
				}
			}
	
			var x = 0,
				y = 0;
			for (i = 0; i < xPositions.length; ++i) {
				if (xPositions[ i ]) {
					x += xPositions[i];
					y += yPositions[i];
				}
			}
	
			return {
				x: Math.round(x / xPositions.length),
				y: Math.round(y / xPositions.length)
			};
		}
	
		// Private helper to create a tooltip iteam model
		// @param element : the chart element (point, arc, bar) to create the tooltip item for
		// @return : new tooltip item
		function createTooltipItem(element) {
			var xScale = element._xScale;
			var yScale = element._yScale || element._scale; // handle radar || polarArea charts
			var index = element._index,
				datasetIndex = element._datasetIndex;
	
			return {
				xLabel: xScale ? xScale.getLabelForIndex(index, datasetIndex) : '',
				yLabel: yScale ? yScale.getLabelForIndex(index, datasetIndex) : '',
				index: index,
				datasetIndex: datasetIndex
			};
		}
	
		Chart.Tooltip = Chart.Element.extend({
			initialize: function() {
				var me = this;
				var globalDefaults = Chart.defaults.global;
				var tooltipOpts = me._options;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				helpers.extend(me, {
					_model: {
						// Positioning
						xPadding: tooltipOpts.xPadding,
						yPadding: tooltipOpts.yPadding,
						xAlign : tooltipOpts.xAlign,
						yAlign : tooltipOpts.yAlign,
	
						// Body
						bodyFontColor: tooltipOpts.bodyFontColor,
						_bodyFontFamily: getValueOrDefault(tooltipOpts.bodyFontFamily, globalDefaults.defaultFontFamily),
						_bodyFontStyle: getValueOrDefault(tooltipOpts.bodyFontStyle, globalDefaults.defaultFontStyle),
						_bodyAlign: tooltipOpts.bodyAlign,
						bodyFontSize: getValueOrDefault(tooltipOpts.bodyFontSize, globalDefaults.defaultFontSize),
						bodySpacing: tooltipOpts.bodySpacing,
	
						// Title
						titleFontColor: tooltipOpts.titleFontColor,
						_titleFontFamily: getValueOrDefault(tooltipOpts.titleFontFamily, globalDefaults.defaultFontFamily),
						_titleFontStyle: getValueOrDefault(tooltipOpts.titleFontStyle, globalDefaults.defaultFontStyle),
						titleFontSize: getValueOrDefault(tooltipOpts.titleFontSize, globalDefaults.defaultFontSize),
						_titleAlign: tooltipOpts.titleAlign,
						titleSpacing: tooltipOpts.titleSpacing,
						titleMarginBottom: tooltipOpts.titleMarginBottom,
	
						// Footer
						footerFontColor: tooltipOpts.footerFontColor,
						_footerFontFamily: getValueOrDefault(tooltipOpts.footerFontFamily, globalDefaults.defaultFontFamily),
						_footerFontStyle: getValueOrDefault(tooltipOpts.footerFontStyle, globalDefaults.defaultFontStyle),
						footerFontSize: getValueOrDefault(tooltipOpts.footerFontSize, globalDefaults.defaultFontSize),
						_footerAlign: tooltipOpts.footerAlign,
						footerSpacing: tooltipOpts.footerSpacing,
						footerMarginTop: tooltipOpts.footerMarginTop,
	
						// Appearance
						caretSize: tooltipOpts.caretSize,
						cornerRadius: tooltipOpts.cornerRadius,
						backgroundColor: tooltipOpts.backgroundColor,
						opacity: 0,
						legendColorBackground: tooltipOpts.multiKeyBackground
					}
				});
			},
	
			// Get the title
			// Args are: (tooltipItem, data)
			getTitle: function() {
				var me = this;
				var opts = me._options;
				var callbacks = opts.callbacks;
	
				var beforeTitle = callbacks.beforeTitle.apply(me, arguments),
					title = callbacks.title.apply(me, arguments),
					afterTitle = callbacks.afterTitle.apply(me, arguments);
	
				var lines = [];
				lines = pushOrConcat(lines, beforeTitle);
				lines = pushOrConcat(lines, title);
				lines = pushOrConcat(lines, afterTitle);
	
				return lines;
			},
	
			// Args are: (tooltipItem, data)
			getBeforeBody: function() {
				var lines = this._options.callbacks.beforeBody.apply(this, arguments);
				return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
			},
	
			// Args are: (tooltipItem, data)
			getBody: function(tooltipItems, data) {
				var me = this;
				var callbacks = me._options.callbacks;
				var bodyItems = [];
	
				helpers.each(tooltipItems, function(tooltipItem) {
					var bodyItem = {
						before: [],
						lines: [],
						after: []
					};
					pushOrConcat(bodyItem.before, callbacks.beforeLabel.call(me, tooltipItem, data));
					pushOrConcat(bodyItem.lines, callbacks.label.call(me, tooltipItem, data));
					pushOrConcat(bodyItem.after, callbacks.afterLabel.call(me, tooltipItem, data));
	
					bodyItems.push(bodyItem);
				});
	
				return bodyItems;
			},
	
			// Args are: (tooltipItem, data)
			getAfterBody: function() {
				var lines = this._options.callbacks.afterBody.apply(this, arguments);
				return helpers.isArray(lines) ? lines : lines !== undefined ? [lines] : [];
			},
	
			// Get the footer and beforeFooter and afterFooter lines
			// Args are: (tooltipItem, data)
			getFooter: function() {
				var me = this;
				var callbacks = me._options.callbacks;
	
				var beforeFooter = callbacks.beforeFooter.apply(me, arguments);
				var footer = callbacks.footer.apply(me, arguments);
				var afterFooter = callbacks.afterFooter.apply(me, arguments);
	
				var lines = [];
				lines = pushOrConcat(lines, beforeFooter);
				lines = pushOrConcat(lines, footer);
				lines = pushOrConcat(lines, afterFooter);
	
				return lines;
			},
	
			update: function(changed) {
				var me = this;
				var opts = me._options;
				var model = me._model;
				var active = me._active;
	
				var data = me._data;
				var chartInstance = me._chartInstance;
	
				var i, len;
	
				if (active.length) {
					model.opacity = 1;
	
					var labelColors = [],
						tooltipPosition = getAveragePosition(active);
	
					var tooltipItems = [];
					for (i = 0, len = active.length; i < len; ++i) {
						tooltipItems.push(createTooltipItem(active[i]));
					}
	
					// If the user provided a sorting function, use it to modify the tooltip items
					if (opts.itemSort) {
						tooltipItems = tooltipItems.sort(opts.itemSort);
					}
	
					// If there is more than one item, show color items
					if (active.length > 1) {
						helpers.each(tooltipItems, function(tooltipItem) {
							labelColors.push(opts.callbacks.labelColor.call(me, tooltipItem, chartInstance));
						});
					}
	
					// Build the Text Lines
					helpers.extend(model, {
						title: me.getTitle(tooltipItems, data),
						beforeBody: me.getBeforeBody(tooltipItems, data),
						body: me.getBody(tooltipItems, data),
						afterBody: me.getAfterBody(tooltipItems, data),
						footer: me.getFooter(tooltipItems, data),
						x: Math.round(tooltipPosition.x),
						y: Math.round(tooltipPosition.y),
						caretPadding: helpers.getValueOrDefault(tooltipPosition.padding, 2),
						labelColors: labelColors
					});
	
					// We need to determine alignment of
					var tooltipSize = me.getTooltipSize(model);
					me.determineAlignment(tooltipSize); // Smart Tooltip placement to stay on the canvas
	
					helpers.extend(model, me.getBackgroundPoint(model, tooltipSize));
				} else {
					me._model.opacity = 0;
				}
	
				if (changed && opts.custom) {
					opts.custom.call(me, model);
				}
	
				return me;
			},
			getTooltipSize: function(vm) {
				var ctx = this._chart.ctx;
	
				var size = {
					height: vm.yPadding * 2, // Tooltip Padding
					width: 0
				};
	
				// Count of all lines in the body
				var body = vm.body;
				var combinedBodyLength = body.reduce(function(count, bodyItem) {
					return count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length;
				}, 0);
				combinedBodyLength += vm.beforeBody.length + vm.afterBody.length;
	
				var titleLineCount = vm.title.length;
				var footerLineCount = vm.footer.length;
				var titleFontSize = vm.titleFontSize,
					bodyFontSize = vm.bodyFontSize,
					footerFontSize = vm.footerFontSize;
	
				size.height += titleLineCount * titleFontSize; // Title Lines
				size.height += (titleLineCount - 1) * vm.titleSpacing; // Title Line Spacing
				size.height += titleLineCount ? vm.titleMarginBottom : 0; // Title's bottom Margin
				size.height += combinedBodyLength * bodyFontSize; // Body Lines
				size.height += combinedBodyLength ? (combinedBodyLength - 1) * vm.bodySpacing : 0; // Body Line Spacing
				size.height += footerLineCount ? vm.footerMarginTop : 0; // Footer Margin
				size.height += footerLineCount * (footerFontSize); // Footer Lines
				size.height += footerLineCount ? (footerLineCount - 1) * vm.footerSpacing : 0; // Footer Line Spacing
	
				// Title width
				var widthPadding = 0;
				var maxLineWidth = function(line) {
					size.width = Math.max(size.width, ctx.measureText(line).width + widthPadding);
				};
	
				ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
				helpers.each(vm.title, maxLineWidth);
	
				// Body width
				ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
				helpers.each(vm.beforeBody.concat(vm.afterBody), maxLineWidth);
	
				// Body lines may include some extra width due to the color box
				widthPadding = body.length > 1 ? (bodyFontSize + 2) : 0;
				helpers.each(body, function(bodyItem) {
					helpers.each(bodyItem.before, maxLineWidth);
					helpers.each(bodyItem.lines, maxLineWidth);
					helpers.each(bodyItem.after, maxLineWidth);
				});
	
				// Reset back to 0
				widthPadding = 0;
	
				// Footer width
				ctx.font = helpers.fontString(footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
				helpers.each(vm.footer, maxLineWidth);
	
				// Add padding
				size.width += 2 * vm.xPadding;
	
				return size;
			},
			determineAlignment: function(size) {
				var me = this;
				var model = me._model;
				var chart = me._chart;
				var chartArea = me._chartInstance.chartArea;
	
				if (model.y < size.height) {
					model.yAlign = 'top';
				} else if (model.y > (chart.height - size.height)) {
					model.yAlign = 'bottom';
				}
	
				var lf, rf; // functions to determine left, right alignment
				var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
				var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
				var midX = (chartArea.left + chartArea.right) / 2;
				var midY = (chartArea.top + chartArea.bottom) / 2;
	
				if (model.yAlign === 'center') {
					lf = function(x) {
						return x <= midX;
					};
					rf = function(x) {
						return x > midX;
					};
				} else {
					lf = function(x) {
						return x <= (size.width / 2);
					};
					rf = function(x) {
						return x >= (chart.width - (size.width / 2));
					};
				}
	
				olf = function(x) {
					return x + size.width > chart.width;
				};
				orf = function(x) {
					return x - size.width < 0;
				};
				yf = function(y) {
					return y <= midY ? 'top' : 'bottom';
				};
	
				if (lf(model.x)) {
					model.xAlign = 'left';
	
					// Is tooltip too wide and goes over the right side of the chart.?
					if (olf(model.x)) {
						model.xAlign = 'center';
						model.yAlign = yf(model.y);
					}
				} else if (rf(model.x)) {
					model.xAlign = 'right';
	
					// Is tooltip too wide and goes outside left edge of canvas?
					if (orf(model.x)) {
						model.xAlign = 'center';
						model.yAlign = yf(model.y);
					}
				}
			},
			getBackgroundPoint: function(vm, size) {
				// Background Position
				var pt = {
					x: vm.x,
					y: vm.y
				};
	
				var caretSize = vm.caretSize,
					caretPadding = vm.caretPadding,
					cornerRadius = vm.cornerRadius,
					xAlign = vm.xAlign,
					yAlign = vm.yAlign,
					paddingAndSize = caretSize + caretPadding,
					radiusAndPadding = cornerRadius + caretPadding;
	
				if (xAlign === 'right') {
					pt.x -= size.width;
				} else if (xAlign === 'center') {
					pt.x -= (size.width / 2);
				}
	
				if (yAlign === 'top') {
					pt.y += paddingAndSize;
				} else if (yAlign === 'bottom') {
					pt.y -= size.height + paddingAndSize;
				} else {
					pt.y -= (size.height / 2);
				}
	
				if (yAlign === 'center') {
					if (xAlign === 'left') {
						pt.x += paddingAndSize;
					} else if (xAlign === 'right') {
						pt.x -= paddingAndSize;
					}
				} else {
					if (xAlign === 'left') {
						pt.x -= radiusAndPadding;
					} else if (xAlign === 'right') {
						pt.x += radiusAndPadding;
					}
				}
	
				return pt;
			},
			drawCaret: function(tooltipPoint, size, opacity) {
				var vm = this._view;
				var ctx = this._chart.ctx;
				var x1, x2, x3;
				var y1, y2, y3;
				var caretSize = vm.caretSize;
				var cornerRadius = vm.cornerRadius;
				var xAlign = vm.xAlign,
					yAlign = vm.yAlign;
				var ptX = tooltipPoint.x,
					ptY = tooltipPoint.y;
				var width = size.width,
					height = size.height;
	
				if (yAlign === 'center') {
					// Left or right side
					if (xAlign === 'left') {
						x1 = ptX;
						x2 = x1 - caretSize;
						x3 = x1;
					} else {
						x1 = ptX + width;
						x2 = x1 + caretSize;
						x3 = x1;
					}
	
					y2 = ptY + (height / 2);
					y1 = y2 - caretSize;
					y3 = y2 + caretSize;
				} else {
					if (xAlign === 'left') {
						x1 = ptX + cornerRadius;
						x2 = x1 + caretSize;
						x3 = x2 + caretSize;
					} else if (xAlign === 'right') {
						x1 = ptX + width - cornerRadius;
						x2 = x1 - caretSize;
						x3 = x2 - caretSize;
					} else {
						x2 = ptX + (width / 2);
						x1 = x2 - caretSize;
						x3 = x2 + caretSize;
					}
	
					if (yAlign === 'top') {
						y1 = ptY;
						y2 = y1 - caretSize;
						y3 = y1;
					} else {
						y1 = ptY + height;
						y2 = y1 + caretSize;
						y3 = y1;
					}
				}
	
				var bgColor = helpers.color(vm.backgroundColor);
				ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
				ctx.beginPath();
				ctx.moveTo(x1, y1);
				ctx.lineTo(x2, y2);
				ctx.lineTo(x3, y3);
				ctx.closePath();
				ctx.fill();
			},
			drawTitle: function(pt, vm, ctx, opacity) {
				var title = vm.title;
	
				if (title.length) {
					ctx.textAlign = vm._titleAlign;
					ctx.textBaseline = "top";
	
					var titleFontSize = vm.titleFontSize,
						titleSpacing = vm.titleSpacing;
	
					var titleFontColor = helpers.color(vm.titleFontColor);
					ctx.fillStyle = titleFontColor.alpha(opacity * titleFontColor.alpha()).rgbString();
					ctx.font = helpers.fontString(titleFontSize, vm._titleFontStyle, vm._titleFontFamily);
	
					var i, len;
					for (i = 0, len = title.length; i < len; ++i) {
						ctx.fillText(title[i], pt.x, pt.y);
						pt.y += titleFontSize + titleSpacing; // Line Height and spacing
	
						if (i + 1 === title.length) {
							pt.y += vm.titleMarginBottom - titleSpacing; // If Last, add margin, remove spacing
						}
					}
				}
			},
			drawBody: function(pt, vm, ctx, opacity) {
				var bodyFontSize = vm.bodyFontSize;
				var bodySpacing = vm.bodySpacing;
				var body = vm.body;
	
				ctx.textAlign = vm._bodyAlign;
				ctx.textBaseline = "top";
	
				var bodyFontColor = helpers.color(vm.bodyFontColor);
				var textColor = bodyFontColor.alpha(opacity * bodyFontColor.alpha()).rgbString();
				ctx.fillStyle = textColor;
				ctx.font = helpers.fontString(bodyFontSize, vm._bodyFontStyle, vm._bodyFontFamily);
	
				// Before Body
				var xLinePadding = 0;
				var fillLineOfText = function(line) {
					ctx.fillText(line, pt.x + xLinePadding, pt.y);
					pt.y += bodyFontSize + bodySpacing;
				};
	
				// Before body lines
				helpers.each(vm.beforeBody, fillLineOfText);
	
				var drawColorBoxes = body.length > 1;
				xLinePadding = drawColorBoxes ? (bodyFontSize + 2) : 0;
	
				// Draw body lines now
				helpers.each(body, function(bodyItem, i) {
					helpers.each(bodyItem.before, fillLineOfText);
	
					helpers.each(bodyItem.lines, function(line) {
						// Draw Legend-like boxes if needed
						if (drawColorBoxes) {
							// Fill a white rect so that colours merge nicely if the opacity is < 1
							ctx.fillStyle = helpers.color(vm.legendColorBackground).alpha(opacity).rgbaString();
							ctx.fillRect(pt.x, pt.y, bodyFontSize, bodyFontSize);
	
							// Border
							ctx.strokeStyle = helpers.color(vm.labelColors[i].borderColor).alpha(opacity).rgbaString();
							ctx.strokeRect(pt.x, pt.y, bodyFontSize, bodyFontSize);
	
							// Inner square
							ctx.fillStyle = helpers.color(vm.labelColors[i].backgroundColor).alpha(opacity).rgbaString();
							ctx.fillRect(pt.x + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
	
							ctx.fillStyle = textColor;
						}
	
						fillLineOfText(line);
					});
	
					helpers.each(bodyItem.after, fillLineOfText);
				});
	
				// Reset back to 0 for after body
				xLinePadding = 0;
	
				// After body lines
				helpers.each(vm.afterBody, fillLineOfText);
				pt.y -= bodySpacing; // Remove last body spacing
			},
			drawFooter: function(pt, vm, ctx, opacity) {
				var footer = vm.footer;
	
				if (footer.length) {
					pt.y += vm.footerMarginTop;
	
					ctx.textAlign = vm._footerAlign;
					ctx.textBaseline = "top";
	
					var footerFontColor = helpers.color(vm.footerFontColor);
					ctx.fillStyle = footerFontColor.alpha(opacity * footerFontColor.alpha()).rgbString();
					ctx.font = helpers.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);
	
					helpers.each(footer, function(line) {
						ctx.fillText(line, pt.x, pt.y);
						pt.y += vm.footerFontSize + vm.footerSpacing;
					});
				}
			},
			draw: function() {
				var ctx = this._chart.ctx;
				var vm = this._view;
	
				if (vm.opacity === 0) {
					return;
				}
	
				var tooltipSize = this.getTooltipSize(vm);
				var pt = {
					x: vm.x,
					y: vm.y
				};
	
				// IE11/Edge does not like very small opacities, so snap to 0
				var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;
	
				if (this._options.enabled) {
					// Draw Background
					var bgColor = helpers.color(vm.backgroundColor);
					ctx.fillStyle = bgColor.alpha(opacity * bgColor.alpha()).rgbString();
					helpers.drawRoundedRectangle(ctx, pt.x, pt.y, tooltipSize.width, tooltipSize.height, vm.cornerRadius);
					ctx.fill();
	
					// Draw Caret
					this.drawCaret(pt, tooltipSize, opacity);
	
					// Draw Title, Body, and Footer
					pt.x += vm.xPadding;
					pt.y += vm.yPadding;
	
					// Titles
					this.drawTitle(pt, vm, ctx, opacity);
	
					// Body
					this.drawBody(pt, vm, ctx, opacity);
	
					// Footer
					this.drawFooter(pt, vm, ctx, opacity);
				}
			}
		});
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
	  var helpers = Chart.helpers,
	    globalOpts = Chart.defaults.global;
	
	  globalOpts.elements.arc = {
	    backgroundColor: globalOpts.defaultColor,
	    borderColor: "#fff",
	    borderWidth: 2
	  };
	
	  Chart.elements.Arc = Chart.Element.extend({
	    inLabelRange: function(mouseX) {
	      var vm = this._view;
	
	      if (vm) {
	        return (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hoverRadius, 2));
	      } else {
	        return false;
	      }
	    },
	    inRange: function(chartX, chartY) {
	      var vm = this._view;
	
	      if (vm) {
	        var pointRelativePosition = helpers.getAngleFromPoint(vm, {
	            x: chartX,
	            y: chartY
	          }),
	          angle = pointRelativePosition.angle,
	          distance = pointRelativePosition.distance;
	
	        //Sanitise angle range
	        var startAngle = vm.startAngle;
	        var endAngle = vm.endAngle;
	        while (endAngle < startAngle) {
	          endAngle += 2.0 * Math.PI;
	        }
	        while (angle > endAngle) {
	          angle -= 2.0 * Math.PI;
	        }
	        while (angle < startAngle) {
	          angle += 2.0 * Math.PI;
	        }
	
	        //Check if within the range of the open/close angle
	        var betweenAngles = (angle >= startAngle && angle <= endAngle),
	          withinRadius = (distance >= vm.innerRadius && distance <= vm.outerRadius);
	
	        return (betweenAngles && withinRadius);
	      } else {
	        return false;
	      }
	    },
	    tooltipPosition: function() {
	      var vm = this._view;
	
	      var centreAngle = vm.startAngle + ((vm.endAngle - vm.startAngle) / 2),
	        rangeFromCentre = (vm.outerRadius - vm.innerRadius) / 2 + vm.innerRadius;
	      return {
	        x: vm.x + (Math.cos(centreAngle) * rangeFromCentre),
	        y: vm.y + (Math.sin(centreAngle) * rangeFromCentre)
	      };
	    },
	    draw: function() {
	
	      var ctx = this._chart.ctx,
	        vm = this._view,
	        sA = vm.startAngle,
	        eA = vm.endAngle;
	
	      ctx.beginPath();
	
	      ctx.arc(vm.x, vm.y, vm.outerRadius, sA, eA);
	      ctx.arc(vm.x, vm.y, vm.innerRadius, eA, sA, true);
	
	      ctx.closePath();
	      ctx.strokeStyle = vm.borderColor;
	      ctx.lineWidth = vm.borderWidth;
	
	      ctx.fillStyle = vm.backgroundColor;
	
	      ctx.fill();
	      ctx.lineJoin = 'bevel';
	
	      if (vm.borderWidth) {
	        ctx.stroke();
	      }
	    }
	  });
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var globalDefaults = Chart.defaults.global;
	
		Chart.defaults.global.elements.line = {
			tension: 0.4,
			backgroundColor: globalDefaults.defaultColor,
			borderWidth: 3,
			borderColor: globalDefaults.defaultColor,
			borderCapStyle: 'butt',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'miter',
			capBezierPoints: true,
			fill: true // do we fill in the area between the line and its base axis
		};
	
		Chart.elements.Line = Chart.Element.extend({
			lineToNextPoint: function(previousPoint, point, nextPoint, skipHandler, previousSkipHandler) {
				var me = this;
				var ctx = me._chart.ctx;
				var spanGaps = me._view ? me._view.spanGaps : false;
	
				if (point._view.skip && !spanGaps) {
					skipHandler.call(me, previousPoint, point, nextPoint);
				} else if (previousPoint._view.skip && !spanGaps) {
					previousSkipHandler.call(me, previousPoint, point, nextPoint);
				} else if (point._view.steppedLine === true) {
					ctx.lineTo(point._view.x, previousPoint._view.y);
					ctx.lineTo(point._view.x, point._view.y);				
				} else if (point._view.tension === 0) {
					ctx.lineTo(point._view.x, point._view.y);
				} else {
					// Line between points
					ctx.bezierCurveTo(
						previousPoint._view.controlPointNextX,
						previousPoint._view.controlPointNextY,
						point._view.controlPointPreviousX,
						point._view.controlPointPreviousY,
						point._view.x,
						point._view.y
					);
				}
			},
	
			draw: function() {
				var me = this;
	
				var vm = me._view;
				var ctx = me._chart.ctx;
				var first = me._children[0];
				var last = me._children[me._children.length - 1];
	
				function loopBackToStart(drawLineToCenter) {
					if (!first._view.skip && !last._view.skip) {
						// Draw a bezier line from last to first
						ctx.bezierCurveTo(
							last._view.controlPointNextX,
							last._view.controlPointNextY,
							first._view.controlPointPreviousX,
							first._view.controlPointPreviousY,
							first._view.x,
							first._view.y
						);
					} else if (drawLineToCenter) {
						// Go to center
						ctx.lineTo(me._view.scaleZero.x, me._view.scaleZero.y);
					}
				}
	
				ctx.save();
	
				// If we had points and want to fill this line, do so.
				if (me._children.length > 0 && vm.fill) {
					// Draw the background first (so the border is always on top)
					ctx.beginPath();
	
					helpers.each(me._children, function(point, index) {
						var previous = helpers.previousItem(me._children, index);
						var next = helpers.nextItem(me._children, index);
	
						// First point moves to it's starting position no matter what
						if (index === 0) {
							if (me._loop) {
								ctx.moveTo(vm.scaleZero.x, vm.scaleZero.y);
							} else {
								ctx.moveTo(point._view.x, vm.scaleZero);
							}
	
							if (point._view.skip) {
								if (!me._loop) {
									ctx.moveTo(next._view.x, me._view.scaleZero);
								}
							} else {
								ctx.lineTo(point._view.x, point._view.y);
							}
						} else {
							me.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
								if (me._loop) {
									// Go to center
									ctx.lineTo(me._view.scaleZero.x, me._view.scaleZero.y);
								} else {
									ctx.lineTo(previousPoint._view.x, me._view.scaleZero);
									ctx.moveTo(nextPoint._view.x, me._view.scaleZero);
								}
							}, function(previousPoint, point) {
								// If we skipped the last point, draw a line to ourselves so that the fill is nice
								ctx.lineTo(point._view.x, point._view.y);
							});
						}
					}, me);
	
					// For radial scales, loop back around to the first point
					if (me._loop) {
						loopBackToStart(true);
					} else {
						//Round off the line by going to the base of the chart, back to the start, then fill.
						ctx.lineTo(me._children[me._children.length - 1]._view.x, vm.scaleZero);
						ctx.lineTo(me._children[0]._view.x, vm.scaleZero);
					}
	
					ctx.fillStyle = vm.backgroundColor || globalDefaults.defaultColor;
					ctx.closePath();
					ctx.fill();
				}
	
				var globalOptionLineElements = globalDefaults.elements.line;
				// Now draw the line between all the points with any borders
				ctx.lineCap = vm.borderCapStyle || globalOptionLineElements.borderCapStyle;
	
				// IE 9 and 10 do not support line dash
				if (ctx.setLineDash) {
					ctx.setLineDash(vm.borderDash || globalOptionLineElements.borderDash);
				}
	
				ctx.lineDashOffset = vm.borderDashOffset || globalOptionLineElements.borderDashOffset;
				ctx.lineJoin = vm.borderJoinStyle || globalOptionLineElements.borderJoinStyle;
				ctx.lineWidth = vm.borderWidth || globalOptionLineElements.borderWidth;
				ctx.strokeStyle = vm.borderColor || globalDefaults.defaultColor;
				ctx.beginPath();
	
				helpers.each(me._children, function(point, index) {
					var previous = helpers.previousItem(me._children, index);
					var next = helpers.nextItem(me._children, index);
	
					if (index === 0) {
						ctx.moveTo(point._view.x, point._view.y);
					} else {
						me.lineToNextPoint(previous, point, next, function(previousPoint, point, nextPoint) {
							ctx.moveTo(nextPoint._view.x, nextPoint._view.y);
						}, function(previousPoint, point) {
							// If we skipped the last point, move up to our point preventing a line from being drawn
							ctx.moveTo(point._view.x, point._view.y);
						});
					}
				}, me);
	
				if (me._loop && me._children.length > 0) {
					loopBackToStart();
				}
	
				ctx.stroke();
				ctx.restore();
			}
		});
	};

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers,
			globalOpts = Chart.defaults.global,
			defaultColor = globalOpts.defaultColor;
	
		globalOpts.elements.point = {
			radius: 3,
			pointStyle: 'circle',
			backgroundColor: defaultColor,
			borderWidth: 1,
			borderColor: defaultColor,
			// Hover
			hitRadius: 1,
			hoverRadius: 4,
			hoverBorderWidth: 1
		};
	
		Chart.elements.Point = Chart.Element.extend({
			inRange: function(mouseX, mouseY) {
				var vm = this._view;
				return vm ? ((Math.pow(mouseX - vm.x, 2) + Math.pow(mouseY - vm.y, 2)) < Math.pow(vm.hitRadius + vm.radius, 2)) : false;
			},
			inLabelRange: function(mouseX) {
				var vm = this._view;
				return vm ? (Math.pow(mouseX - vm.x, 2) < Math.pow(vm.radius + vm.hitRadius, 2)) : false;
			},
			tooltipPosition: function() {
				var vm = this._view;
				return {
					x: vm.x,
					y: vm.y,
					padding: vm.radius + vm.borderWidth
				};
			},
			draw: function() {
				var vm = this._view;
				var ctx = this._chart.ctx;
				var pointStyle = vm.pointStyle;
				var radius = vm.radius;
				var x = vm.x;
				var y = vm.y;
	
				if (vm.skip) {
					return;
				}
	
				ctx.strokeStyle = vm.borderColor || defaultColor;
				ctx.lineWidth = helpers.getValueOrDefault(vm.borderWidth, globalOpts.elements.point.borderWidth);
				ctx.fillStyle = vm.backgroundColor || defaultColor;
	
				Chart.canvasHelpers.drawPoint(ctx, pointStyle, radius, x, y);
			}
		});
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var globalOpts = Chart.defaults.global;
	
		globalOpts.elements.rectangle = {
			backgroundColor: globalOpts.defaultColor,
			borderWidth: 0,
			borderColor: globalOpts.defaultColor,
			borderSkipped: 'bottom'
		};
	
		Chart.elements.Rectangle = Chart.Element.extend({
			draw: function() {
				var ctx = this._chart.ctx;
				var vm = this._view;
	
				var halfWidth = vm.width / 2,
					leftX = vm.x - halfWidth,
					rightX = vm.x + halfWidth,
					top = vm.base - (vm.base - vm.y),
					halfStroke = vm.borderWidth / 2;
	
				// Canvas doesn't allow us to stroke inside the width so we can
				// adjust the sizes to fit if we're setting a stroke on the line
				if (vm.borderWidth) {
					leftX += halfStroke;
					rightX -= halfStroke;
					top += halfStroke;
				}
	
				ctx.beginPath();
				ctx.fillStyle = vm.backgroundColor;
				ctx.strokeStyle = vm.borderColor;
				ctx.lineWidth = vm.borderWidth;
	
				// Corner points, from bottom-left to bottom-right clockwise
				// | 1 2 |
				// | 0 3 |
				var corners = [
					[leftX, vm.base],
					[leftX, top],
					[rightX, top],
					[rightX, vm.base]
				];
	
				// Find first (starting) corner with fallback to 'bottom'
				var borders = ['bottom', 'left', 'top', 'right'];
				var startCorner = borders.indexOf(vm.borderSkipped, 0);
				if (startCorner === -1)
					startCorner = 0;
	
				function cornerAt(index) {
					return corners[(startCorner + index) % 4];
				}
	
				// Draw rectangle from 'startCorner'
				ctx.moveTo.apply(ctx, cornerAt(0));
				for (var i = 1; i < 4; i++)
					ctx.lineTo.apply(ctx, cornerAt(i));
	
				ctx.fill();
				if (vm.borderWidth) {
					ctx.stroke();
				}
			},
			height: function() {
				var vm = this._view;
				return vm.base - vm.y;
			},
			inRange: function(mouseX, mouseY) {
				var vm = this._view;
				return vm ?
						(vm.y < vm.base ?
							(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.y && mouseY <= vm.base) :
							(mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) && (mouseY >= vm.base && mouseY <= vm.y)) :
						false;
			},
			inLabelRange: function(mouseX) {
				var vm = this._view;
				return vm ? (mouseX >= vm.x - vm.width / 2 && mouseX <= vm.x + vm.width / 2) : false;
			},
			tooltipPosition: function() {
				var vm = this._view;
				return {
					x: vm.x,
					y: vm.y
				};
			}
		});
	
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers,
			noop = helpers.noop;
	
		Chart.LinearScaleBase = Chart.Scale.extend({
			handleTickRangeOptions: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
	
				// If we are forcing it to begin at 0, but 0 will already be rendered on the chart,
				// do nothing since that would make the chart weird. If the user really wants a weird chart
				// axis, they can manually override it
				if (tickOpts.beginAtZero) {
					var minSign = helpers.sign(me.min);
					var maxSign = helpers.sign(me.max);
	
					if (minSign < 0 && maxSign < 0) {
						// move the top up to 0
						me.max = 0;
					} else if (minSign > 0 && maxSign > 0) {
						// move the botttom down to 0
						me.min = 0;
					}
				}
	
				if (tickOpts.min !== undefined) {
					me.min = tickOpts.min;
				} else if (tickOpts.suggestedMin !== undefined) {
					me.min = Math.min(me.min, tickOpts.suggestedMin);
				}
	
				if (tickOpts.max !== undefined) {
					me.max = tickOpts.max;
				} else if (tickOpts.suggestedMax !== undefined) {
					me.max = Math.max(me.max, tickOpts.suggestedMax);
				}
	
				if (me.min === me.max) {
					me.max++;
	
					if (!tickOpts.beginAtZero) {
						me.min--;
					}
				}
			},
			getTickLimit: noop,
			handleDirectionalChanges: noop,
	
			buildTicks: function() {
				var me = this;
				var opts = me.options;
				var ticks = me.ticks = [];
				var tickOpts = opts.ticks;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				// Figure out what the max number of ticks we can support it is based on the size of
				// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
				// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
				// the graph
	
				var maxTicks = me.getTickLimit();
	
				// Make sure we always have at least 2 ticks
				maxTicks = Math.max(2, maxTicks);
	
				// To get a "nice" value for the tick spacing, we will use the appropriately named
				// "nice number" algorithm. See http://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks
				// for details.
	
				var spacing;
				var fixedStepSizeSet = (tickOpts.fixedStepSize && tickOpts.fixedStepSize > 0) || (tickOpts.stepSize && tickOpts.stepSize > 0);
				if (fixedStepSizeSet) {
					spacing = getValueOrDefault(tickOpts.fixedStepSize, tickOpts.stepSize);
				} else {
					var niceRange = helpers.niceNum(me.max - me.min, false);
					spacing = helpers.niceNum(niceRange / (maxTicks - 1), true);
				}
				var niceMin = Math.floor(me.min / spacing) * spacing;
				var niceMax = Math.ceil(me.max / spacing) * spacing;
				var numSpaces = (niceMax - niceMin) / spacing;
	
				// If very close to our rounded value, use it.
				if (helpers.almostEquals(numSpaces, Math.round(numSpaces), spacing / 1000)) {
					numSpaces = Math.round(numSpaces);
				} else {
					numSpaces = Math.ceil(numSpaces);
				}
	
				// Put the values into the ticks array
				ticks.push(tickOpts.min !== undefined ? tickOpts.min : niceMin);
				for (var j = 1; j < numSpaces; ++j) {
					ticks.push(niceMin + (j * spacing));
				}
				ticks.push(tickOpts.max !== undefined ? tickOpts.max : niceMax);
	
				me.handleDirectionalChanges();
	
				// At this point, we need to update our max and min given the tick values since we have expanded the
				// range of the scale
				me.max = helpers.max(ticks);
				me.min = helpers.min(ticks);
	
				if (tickOpts.reverse) {
					ticks.reverse();
	
					me.start = me.max;
					me.end = me.min;
				} else {
					me.start = me.min;
					me.end = me.max;
				}
			},
			convertTicksToLabels: function() {
				var me = this;
				me.ticksAsNumbers = me.ticks.slice();
				me.zeroLineIndex = me.ticks.indexOf(0);
	
				Chart.Scale.prototype.convertTicksToLabels.call(me);
			},
		});
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		// Default config for a category scale
		var defaultConfig = {
			position: "bottom"
		};
	
		var DatasetScale = Chart.Scale.extend({
			/**
			* Internal function to get the correct labels. If data.xLabels or data.yLabels are defined, use tose
			* else fall back to data.labels
			* @private
			*/
			getLabels: function() {
				var data = this.chart.data;
				return (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels;
			},
			// Implement this so that
			determineDataLimits: function() {
				var me = this;
				var labels = me.getLabels(); 
				me.minIndex = 0;
				me.maxIndex = labels.length - 1;
				var findIndex;
	
				if (me.options.ticks.min !== undefined) {
					// user specified min value
					findIndex = helpers.indexOf(labels, me.options.ticks.min);
					me.minIndex = findIndex !== -1 ? findIndex : me.minIndex;
				}
	
				if (me.options.ticks.max !== undefined) {
					// user specified max value
					findIndex = helpers.indexOf(labels, me.options.ticks.max);
					me.maxIndex = findIndex !== -1 ? findIndex : me.maxIndex;
				}
	
				me.min = labels[me.minIndex];
				me.max = labels[me.maxIndex];
			},
	
			buildTicks: function() {
				var me = this;
				var labels = me.getLabels();
				// If we are viewing some subset of labels, slice the original array
				me.ticks = (me.minIndex === 0 && me.maxIndex === labels.length - 1) ? labels : labels.slice(me.minIndex, me.maxIndex + 1);
			},
	
			getLabelForIndex: function(index) {
				return this.ticks[index];
			},
	
			// Used to get data value locations.  Value can either be an index or a numerical value
			getPixelForValue: function(value, index, datasetIndex, includeOffset) {
				var me = this;
				// 1 is added because we need the length but we have the indexes
				var offsetAmt = Math.max((me.maxIndex + 1 - me.minIndex - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
	
				if (value !== undefined) {
					var labels = me.getLabels();
					var idx = labels.indexOf(value);
					index = idx !== -1 ? idx : index;
				}
	
				if (me.isHorizontal()) {
					var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
					var valueWidth = innerWidth / offsetAmt;
					var widthOffset = (valueWidth * (index - me.minIndex)) + me.paddingLeft;
	
					if (me.options.gridLines.offsetGridLines && includeOffset) {
						widthOffset += (valueWidth / 2);
					}
	
					return me.left + Math.round(widthOffset);
				} else {
					var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
					var valueHeight = innerHeight / offsetAmt;
					var heightOffset = (valueHeight * (index - me.minIndex)) + me.paddingTop;
	
					if (me.options.gridLines.offsetGridLines && includeOffset) {
						heightOffset += (valueHeight / 2);
					}
	
					return me.top + Math.round(heightOffset);
				}
			},
			getPixelForTick: function(index, includeOffset) {
				return this.getPixelForValue(this.ticks[index], index + this.minIndex, null, includeOffset);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var value;
				var offsetAmt = Math.max((me.ticks.length - ((me.options.gridLines.offsetGridLines) ? 0 : 1)), 1);
				var horz = me.isHorizontal();
				var innerDimension = horz ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
				var valueDimension = innerDimension / offsetAmt;
	
				pixel -= horz ? me.left : me.top;
	
				if (me.options.gridLines.offsetGridLines) {
					pixel -= (valueDimension / 2);
				}
				pixel -= horz ? me.paddingLeft : me.paddingTop;
	
				if (pixel <= 0) {
					value = 0;
				} else {
					value = Math.round(pixel / valueDimension);
				}
	
				return value;
			},
			getBasePixel: function() {
				return this.bottom;
			}
		});
	
		Chart.scaleService.registerScaleType("category", DatasetScale, defaultConfig);
	
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		var defaultConfig = {
			position: "left",
			ticks: {
				callback: function(tickValue, index, ticks) {
					// If we have lots of ticks, don't use the ones
					var delta = ticks.length > 3 ? ticks[2] - ticks[1] : ticks[1] - ticks[0];
	
					// If we have a number like 2.5 as the delta, figure out how many decimal places we need
					if (Math.abs(delta) > 1) {
						if (tickValue !== Math.floor(tickValue)) {
							// not an integer
							delta = tickValue - Math.floor(tickValue);
						}
					}
	
					var logDelta = helpers.log10(Math.abs(delta));
					var tickString = '';
	
					if (tickValue !== 0) {
						var numDecimal = -1 * Math.floor(logDelta);
						numDecimal = Math.max(Math.min(numDecimal, 20), 0); // toFixed has a max of 20 decimal places
						tickString = tickValue.toFixed(numDecimal);
					} else {
						tickString = '0'; // never show decimal places for 0
					}
	
					return tickString;
				}
			}
		};
	
		var LinearScale = Chart.LinearScaleBase.extend({
			determineDataLimits: function() {
				var me = this;
				var opts = me.options;
				var chart = me.chart;
				var data = chart.data;
				var datasets = data.datasets;
				var isHorizontal = me.isHorizontal();
	
				function IDMatches(meta) {
					return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
				}
	
				// First Calculate the range
				me.min = null;
				me.max = null;
	
				if (opts.stacked) {
					var valuesPerType = {};
					var hasPositiveValues = false;
					var hasNegativeValues = false;
	
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (valuesPerType[meta.type] === undefined) {
							valuesPerType[meta.type] = {
								positiveValues: [],
								negativeValues: []
							};
						}
	
						// Store these per type
						var positiveValues = valuesPerType[meta.type].positiveValues;
						var negativeValues = valuesPerType[meta.type].negativeValues;
	
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								positiveValues[index] = positiveValues[index] || 0;
								negativeValues[index] = negativeValues[index] || 0;
	
								if (opts.relativePoints) {
									positiveValues[index] = 100;
								} else {
									if (value < 0) {
										hasNegativeValues = true;
										negativeValues[index] += value;
									} else {
										hasPositiveValues = true;
										positiveValues[index] += value;
									}
								}
							});
						}
					});
	
					helpers.each(valuesPerType, function(valuesForType) {
						var values = valuesForType.positiveValues.concat(valuesForType.negativeValues);
						var minVal = helpers.min(values);
						var maxVal = helpers.max(values);
						me.min = me.min === null ? minVal : Math.min(me.min, minVal);
						me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
					});
	
				} else {
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								if (me.min === null) {
									me.min = value;
								} else if (value < me.min) {
									me.min = value;
								}
	
								if (me.max === null) {
									me.max = value;
								} else if (value > me.max) {
									me.max = value;
								}
							});
						}
					});
				}
	
				// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
				this.handleTickRangeOptions();
			},
			getTickLimit: function() {
				var maxTicks;
				var me = this;
				var tickOpts = me.options.ticks;
	
				if (me.isHorizontal()) {
					maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.width / 50));
				} else {
					// The factor of 2 used to scale the font size has been experimentally determined.
					var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, Chart.defaults.global.defaultFontSize);
					maxTicks = Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(me.height / (2 * tickFontSize)));
				}
	
				return maxTicks;
			},
			// Called after the ticks are built. We need
			handleDirectionalChanges: function() {
				if (!this.isHorizontal()) {
					// We are in a vertical orientation. The top value is the highest. So reverse the array
					this.ticks.reverse();
				}
			},
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			// Utils
			getPixelForValue: function(value) {
				// This must be called after fit has been run so that
				// this.left, this.top, this.right, and this.bottom have been defined
				var me = this;
				var paddingLeft = me.paddingLeft;
				var paddingBottom = me.paddingBottom;
				var start = me.start;
	
				var rightValue = +me.getRightValue(value);
				var pixel;
				var innerDimension;
				var range = me.end - start;
	
				if (me.isHorizontal()) {
					innerDimension = me.width - (paddingLeft + me.paddingRight);
					pixel = me.left + (innerDimension / range * (rightValue - start));
					return Math.round(pixel + paddingLeft);
				} else {
					innerDimension = me.height - (me.paddingTop + paddingBottom);
					pixel = (me.bottom - paddingBottom) - (innerDimension / range * (rightValue - start));
					return Math.round(pixel);
				}
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var isHorizontal = me.isHorizontal();
				var paddingLeft = me.paddingLeft;
				var paddingBottom = me.paddingBottom;
				var innerDimension = isHorizontal ? me.width - (paddingLeft + me.paddingRight) : me.height - (me.paddingTop + paddingBottom);
				var offset = (isHorizontal ? pixel - me.left - paddingLeft : me.bottom - paddingBottom - pixel) / innerDimension;
				return me.start + ((me.end - me.start) * offset);
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.ticksAsNumbers[index]);
			}
		});
		Chart.scaleService.registerScaleType("linear", LinearScale, defaultConfig);
	
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		var defaultConfig = {
			position: "left",
	
			// label settings
			ticks: {
				callback: function(value, index, arr) {
					var remain = value / (Math.pow(10, Math.floor(helpers.log10(value))));
	
					if (remain === 1 || remain === 2 || remain === 5 || index === 0 || index === arr.length - 1) {
						return value.toExponential();
					} else {
						return '';
					}
				}
			}
		};
	
		var LogarithmicScale = Chart.Scale.extend({
			determineDataLimits: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				var chart = me.chart;
				var data = chart.data;
				var datasets = data.datasets;
				var getValueOrDefault = helpers.getValueOrDefault;
				var isHorizontal = me.isHorizontal();
				function IDMatches(meta) {
					return isHorizontal ? meta.xAxisID === me.id : meta.yAxisID === me.id;
				}
	
				// Calculate Range
				me.min = null;
				me.max = null;
	
				if (opts.stacked) {
					var valuesPerType = {};
	
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							if (valuesPerType[meta.type] === undefined) {
								valuesPerType[meta.type] = [];
							}
	
							helpers.each(dataset.data, function(rawValue, index) {
								var values = valuesPerType[meta.type];
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								values[index] = values[index] || 0;
	
								if (opts.relativePoints) {
									values[index] = 100;
								} else {
									// Don't need to split positive and negative since the log scale can't handle a 0 crossing
									values[index] += value;
								}
							});
						}
					});
	
					helpers.each(valuesPerType, function(valuesForType) {
						var minVal = helpers.min(valuesForType);
						var maxVal = helpers.max(valuesForType);
						me.min = me.min === null ? minVal : Math.min(me.min, minVal);
						me.max = me.max === null ? maxVal : Math.max(me.max, maxVal);
					});
	
				} else {
					helpers.each(datasets, function(dataset, datasetIndex) {
						var meta = chart.getDatasetMeta(datasetIndex);
						if (chart.isDatasetVisible(datasetIndex) && IDMatches(meta)) {
							helpers.each(dataset.data, function(rawValue, index) {
								var value = +me.getRightValue(rawValue);
								if (isNaN(value) || meta.data[index].hidden) {
									return;
								}
	
								if (me.min === null) {
									me.min = value;
								} else if (value < me.min) {
									me.min = value;
								}
	
								if (me.max === null) {
									me.max = value;
								} else if (value > me.max) {
									me.max = value;
								}
							});
						}
					});
				}
	
				me.min = getValueOrDefault(tickOpts.min, me.min);
				me.max = getValueOrDefault(tickOpts.max, me.max);
	
				if (me.min === me.max) {
					if (me.min !== 0 && me.min !== null) {
						me.min = Math.pow(10, Math.floor(helpers.log10(me.min)) - 1);
						me.max = Math.pow(10, Math.floor(helpers.log10(me.max)) + 1);
					} else {
						me.min = 1;
						me.max = 10;
					}
				}
			},
			buildTicks: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				// Reset the ticks array. Later on, we will draw a grid line at these positions
				// The array simply contains the numerical value of the spots where ticks will be
				var ticks = me.ticks = [];
	
				// Figure out what the max number of ticks we can support it is based on the size of
				// the axis area. For now, we say that the minimum tick spacing in pixels must be 50
				// We also limit the maximum number of ticks to 11 which gives a nice 10 squares on
				// the graph
	
				var tickVal = getValueOrDefault(tickOpts.min, Math.pow(10, Math.floor(helpers.log10(me.min))));
	
				while (tickVal < me.max) {
					ticks.push(tickVal);
	
					var exp = Math.floor(helpers.log10(tickVal));
					var significand = Math.floor(tickVal / Math.pow(10, exp)) + 1;
	
					if (significand === 10) {
						significand = 1;
						++exp;
					}
	
					tickVal = significand * Math.pow(10, exp);
				}
	
				var lastTick = getValueOrDefault(tickOpts.max, tickVal);
				ticks.push(lastTick);
	
				if (!me.isHorizontal()) {
					// We are in a vertical orientation. The top value is the highest. So reverse the array
					ticks.reverse();
				}
	
				// At this point, we need to update our max and min given the tick values since we have expanded the
				// range of the scale
				me.max = helpers.max(ticks);
				me.min = helpers.min(ticks);
	
				if (tickOpts.reverse) {
					ticks.reverse();
	
					me.start = me.max;
					me.end = me.min;
				} else {
					me.start = me.min;
					me.end = me.max;
				}
			},
			convertTicksToLabels: function() {
				this.tickValues = this.ticks.slice();
	
				Chart.Scale.prototype.convertTicksToLabels.call(this);
			},
			// Get the correct tooltip label
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.tickValues[index]);
			},
			getPixelForValue: function(value) {
				var me = this;
				var innerDimension;
				var pixel;
	
				var start = me.start;
				var newVal = +me.getRightValue(value);
				var range = helpers.log10(me.end) - helpers.log10(start);
				var paddingTop = me.paddingTop;
				var paddingBottom = me.paddingBottom;
				var paddingLeft = me.paddingLeft;
	
				if (me.isHorizontal()) {
	
					if (newVal === 0) {
						pixel = me.left + paddingLeft;
					} else {
						innerDimension = me.width - (paddingLeft + me.paddingRight);
						pixel = me.left + (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
						pixel += paddingLeft;
					}
				} else {
					// Bottom - top since pixels increase downard on a screen
					if (newVal === 0) {
						pixel = me.top + paddingTop;
					} else {
						innerDimension = me.height - (paddingTop + paddingBottom);
						pixel = (me.bottom - paddingBottom) - (innerDimension / range * (helpers.log10(newVal) - helpers.log10(start)));
					}
				}
	
				return pixel;
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var range = helpers.log10(me.end) - helpers.log10(me.start);
				var value, innerDimension;
	
				if (me.isHorizontal()) {
					innerDimension = me.width - (me.paddingLeft + me.paddingRight);
					value = me.start * Math.pow(10, (pixel - me.left - me.paddingLeft) * range / innerDimension);
				} else {
					innerDimension = me.height - (me.paddingTop + me.paddingBottom);
					value = Math.pow(10, (me.bottom - me.paddingBottom - pixel) * range / innerDimension) / me.start;
				}
	
				return value;
			}
		});
		Chart.scaleService.registerScaleType("logarithmic", LogarithmicScale, defaultConfig);
	
	};

/***/ },
/* 30 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var globalDefaults = Chart.defaults.global;
	
		var defaultConfig = {
			display: true,
	
			//Boolean - Whether to animate scaling the chart from the centre
			animate: true,
			lineArc: false,
			position: "chartArea",
	
			angleLines: {
				display: true,
				color: "rgba(0, 0, 0, 0.1)",
				lineWidth: 1
			},
	
			// label settings
			ticks: {
				//Boolean - Show a backdrop to the scale label
				showLabelBackdrop: true,
	
				//String - The colour of the label backdrop
				backdropColor: "rgba(255,255,255,0.75)",
	
				//Number - The backdrop padding above & below the label in pixels
				backdropPaddingY: 2,
	
				//Number - The backdrop padding to the side of the label in pixels
				backdropPaddingX: 2
			},
	
			pointLabels: {
				//Number - Point label font size in pixels
				fontSize: 10,
	
				//Function - Used to convert point labels
				callback: function(label) {
					return label;
				}
			}
		};
	
		var LinearRadialScale = Chart.LinearScaleBase.extend({
			getValueCount: function() {
				return this.chart.data.labels.length;
			},
			setDimensions: function() {
				var me = this;
				var opts = me.options;
				var tickOpts = opts.ticks;
				// Set the unconstrained dimension before label rotation
				me.width = me.maxWidth;
				me.height = me.maxHeight;
				me.xCenter = Math.round(me.width / 2);
				me.yCenter = Math.round(me.height / 2);
	
				var minSize = helpers.min([me.height, me.width]);
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				me.drawingArea = opts.display ? (minSize / 2) - (tickFontSize / 2 + tickOpts.backdropPaddingY) : (minSize / 2);
			},
			determineDataLimits: function() {
				var me = this;
				var chart = me.chart;
				me.min = null;
				me.max = null;
	
	
				helpers.each(chart.data.datasets, function(dataset, datasetIndex) {
					if (chart.isDatasetVisible(datasetIndex)) {
						var meta = chart.getDatasetMeta(datasetIndex);
	
						helpers.each(dataset.data, function(rawValue, index) {
							var value = +me.getRightValue(rawValue);
							if (isNaN(value) || meta.data[index].hidden) {
								return;
							}
	
							if (me.min === null) {
								me.min = value;
							} else if (value < me.min) {
								me.min = value;
							}
	
							if (me.max === null) {
								me.max = value;
							} else if (value > me.max) {
								me.max = value;
							}
						});
					}
				});
	
				// Common base implementation to handle ticks.min, ticks.max, ticks.beginAtZero
				me.handleTickRangeOptions();
			},
			getTickLimit: function() {
				var tickOpts = this.options.ticks;
				var tickFontSize = helpers.getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
				return Math.min(tickOpts.maxTicksLimit ? tickOpts.maxTicksLimit : 11, Math.ceil(this.drawingArea / (1.5 * tickFontSize)));
			},
			convertTicksToLabels: function() {
				var me = this;
				Chart.LinearScaleBase.prototype.convertTicksToLabels.call(me);
	
				// Point labels
				me.pointLabels = me.chart.data.labels.map(me.options.pointLabels.callback, me);
			},
			getLabelForIndex: function(index, datasetIndex) {
				return +this.getRightValue(this.chart.data.datasets[datasetIndex].data[index]);
			},
			fit: function() {
				/*
				 * Right, this is really confusing and there is a lot of maths going on here
				 * The gist of the problem is here: https://gist.github.com/nnnick/696cc9c55f4b0beb8fe9
				 *
				 * Reaction: https://dl.dropboxusercontent.com/u/34601363/toomuchscience.gif
				 *
				 * Solution:
				 *
				 * We assume the radius of the polygon is half the size of the canvas at first
				 * at each index we check if the text overlaps.
				 *
				 * Where it does, we store that angle and that index.
				 *
				 * After finding the largest index and angle we calculate how much we need to remove
				 * from the shape radius to move the point inwards by that x.
				 *
				 * We average the left and right distances to get the maximum shape radius that can fit in the box
				 * along with labels.
				 *
				 * Once we have that, we can find the centre point for the chart, by taking the x text protrusion
				 * on each side, removing that from the size, halving it and adding the left x protrusion width.
				 *
				 * This will mean we have a shape fitted to the canvas, as large as it can be with the labels
				 * and position it in the most space efficient manner
				 *
				 * https://dl.dropboxusercontent.com/u/34601363/yeahscience.gif
				 */
	
				var pointLabels = this.options.pointLabels;
				var pointLabelFontSize = helpers.getValueOrDefault(pointLabels.fontSize, globalDefaults.defaultFontSize);
				var pointLabeFontStyle = helpers.getValueOrDefault(pointLabels.fontStyle, globalDefaults.defaultFontStyle);
				var pointLabeFontFamily = helpers.getValueOrDefault(pointLabels.fontFamily, globalDefaults.defaultFontFamily);
				var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
	
				// Get maximum radius of the polygon. Either half the height (minus the text width) or half the width.
				// Use this to calculate the offset + change. - Make sure L/R protrusion is at least 0 to stop issues with centre points
				var largestPossibleRadius = helpers.min([(this.height / 2 - pointLabelFontSize - 5), this.width / 2]),
					pointPosition,
					i,
					textWidth,
					halfTextWidth,
					furthestRight = this.width,
					furthestRightIndex,
					furthestRightAngle,
					furthestLeft = 0,
					furthestLeftIndex,
					furthestLeftAngle,
					xProtrusionLeft,
					xProtrusionRight,
					radiusReductionRight,
					radiusReductionLeft;
				this.ctx.font = pointLabeFont;
	
				for (i = 0; i < this.getValueCount(); i++) {
					// 5px to space the text slightly out - similar to what we do in the draw function.
					pointPosition = this.getPointPosition(i, largestPossibleRadius);
					textWidth = this.ctx.measureText(this.pointLabels[i] ? this.pointLabels[i] : '').width + 5;
	
					// Add quarter circle to make degree 0 mean top of circle
					var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
					var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;
	
					if (angle === 0 || angle === 180) {
						// At angle 0 and 180, we're at exactly the top/bottom
						// of the radar chart, so text will be aligned centrally, so we'll half it and compare
						// w/left and right text sizes
						halfTextWidth = textWidth / 2;
						if (pointPosition.x + halfTextWidth > furthestRight) {
							furthestRight = pointPosition.x + halfTextWidth;
							furthestRightIndex = i;
						}
						if (pointPosition.x - halfTextWidth < furthestLeft) {
							furthestLeft = pointPosition.x - halfTextWidth;
							furthestLeftIndex = i;
						}
					} else if (angle < 180) {
						// Less than half the values means we'll left align the text
						if (pointPosition.x + textWidth > furthestRight) {
							furthestRight = pointPosition.x + textWidth;
							furthestRightIndex = i;
						}
					} else {
						// More than half the values means we'll right align the text
						if (pointPosition.x - textWidth < furthestLeft) {
							furthestLeft = pointPosition.x - textWidth;
							furthestLeftIndex = i;
						}
					}
				}
	
				xProtrusionLeft = furthestLeft;
				xProtrusionRight = Math.ceil(furthestRight - this.width);
	
				furthestRightAngle = this.getIndexAngle(furthestRightIndex);
				furthestLeftAngle = this.getIndexAngle(furthestLeftIndex);
	
				radiusReductionRight = xProtrusionRight / Math.sin(furthestRightAngle + Math.PI / 2);
				radiusReductionLeft = xProtrusionLeft / Math.sin(furthestLeftAngle + Math.PI / 2);
	
				// Ensure we actually need to reduce the size of the chart
				radiusReductionRight = (helpers.isNumber(radiusReductionRight)) ? radiusReductionRight : 0;
				radiusReductionLeft = (helpers.isNumber(radiusReductionLeft)) ? radiusReductionLeft : 0;
	
				this.drawingArea = Math.round(largestPossibleRadius - (radiusReductionLeft + radiusReductionRight) / 2);
				this.setCenterPoint(radiusReductionLeft, radiusReductionRight);
			},
			setCenterPoint: function(leftMovement, rightMovement) {
				var me = this;
				var maxRight = me.width - rightMovement - me.drawingArea,
					maxLeft = leftMovement + me.drawingArea;
	
				me.xCenter = Math.round(((maxLeft + maxRight) / 2) + me.left);
				// Always vertically in the centre as the text height doesn't change
				me.yCenter = Math.round((me.height / 2) + me.top);
			},
	
			getIndexAngle: function(index) {
				var angleMultiplier = (Math.PI * 2) / this.getValueCount();
				var startAngle = this.chart.options && this.chart.options.startAngle ?
					this.chart.options.startAngle :
					0;
	
				var startAngleRadians = startAngle * Math.PI * 2 / 360;
	
				// Start from the top instead of right, so remove a quarter of the circle
				return index * angleMultiplier - (Math.PI / 2) + startAngleRadians;
			},
			getDistanceFromCenterForValue: function(value) {
				var me = this;
	
				if (value === null) {
					return 0; // null always in center
				}
	
				// Take into account half font size + the yPadding of the top value
				var scalingFactor = me.drawingArea / (me.max - me.min);
				if (me.options.reverse) {
					return (me.max - value) * scalingFactor;
				} else {
					return (value - me.min) * scalingFactor;
				}
			},
			getPointPosition: function(index, distanceFromCenter) {
				var me = this;
				var thisAngle = me.getIndexAngle(index);
				return {
					x: Math.round(Math.cos(thisAngle) * distanceFromCenter) + me.xCenter,
					y: Math.round(Math.sin(thisAngle) * distanceFromCenter) + me.yCenter
				};
			},
			getPointPositionForValue: function(index, value) {
				return this.getPointPosition(index, this.getDistanceFromCenterForValue(value));
			},
	
			getBasePosition: function() {
				var me = this;
				var min = me.min;
				var max = me.max;
	
				return me.getPointPositionForValue(0,
					me.beginAtZero? 0:
					min < 0 && max < 0? max :
					min > 0 && max > 0? min :
					0);
			},
	
			draw: function() {
				var me = this;
				var opts = me.options;
				var gridLineOpts = opts.gridLines;
				var tickOpts = opts.ticks;
				var angleLineOpts = opts.angleLines;
				var pointLabelOpts = opts.pointLabels;
				var getValueOrDefault = helpers.getValueOrDefault;
	
				if (opts.display) {
					var ctx = me.ctx;
	
					// Tick Font
					var tickFontSize = getValueOrDefault(tickOpts.fontSize, globalDefaults.defaultFontSize);
					var tickFontStyle = getValueOrDefault(tickOpts.fontStyle, globalDefaults.defaultFontStyle);
					var tickFontFamily = getValueOrDefault(tickOpts.fontFamily, globalDefaults.defaultFontFamily);
					var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
	
					helpers.each(me.ticks, function(label, index) {
						// Don't draw a centre value (if it is minimum)
						if (index > 0 || opts.reverse) {
							var yCenterOffset = me.getDistanceFromCenterForValue(me.ticksAsNumbers[index]);
							var yHeight = me.yCenter - yCenterOffset;
	
							// Draw circular lines around the scale
							if (gridLineOpts.display && index !== 0) {
								ctx.strokeStyle = helpers.getValueAtIndexOrDefault(gridLineOpts.color, index - 1);
								ctx.lineWidth = helpers.getValueAtIndexOrDefault(gridLineOpts.lineWidth, index - 1);
	
								if (opts.lineArc) {
									// Draw circular arcs between the points
									ctx.beginPath();
									ctx.arc(me.xCenter, me.yCenter, yCenterOffset, 0, Math.PI * 2);
									ctx.closePath();
									ctx.stroke();
								} else {
									// Draw straight lines connecting each index
									ctx.beginPath();
									for (var i = 0; i < me.getValueCount(); i++) {
										var pointPosition = me.getPointPosition(i, yCenterOffset);
										if (i === 0) {
											ctx.moveTo(pointPosition.x, pointPosition.y);
										} else {
											ctx.lineTo(pointPosition.x, pointPosition.y);
										}
									}
									ctx.closePath();
									ctx.stroke();
								}
							}
	
							if (tickOpts.display) {
								var tickFontColor = getValueOrDefault(tickOpts.fontColor, globalDefaults.defaultFontColor);
								ctx.font = tickLabelFont;
	
								if (tickOpts.showLabelBackdrop) {
									var labelWidth = ctx.measureText(label).width;
									ctx.fillStyle = tickOpts.backdropColor;
									ctx.fillRect(
										me.xCenter - labelWidth / 2 - tickOpts.backdropPaddingX,
										yHeight - tickFontSize / 2 - tickOpts.backdropPaddingY,
										labelWidth + tickOpts.backdropPaddingX * 2,
										tickFontSize + tickOpts.backdropPaddingY * 2
									);
								}
	
								ctx.textAlign = 'center';
								ctx.textBaseline = "middle";
								ctx.fillStyle = tickFontColor;
								ctx.fillText(label, me.xCenter, yHeight);
							}
						}
					});
	
					if (!opts.lineArc) {
						ctx.lineWidth = angleLineOpts.lineWidth;
						ctx.strokeStyle = angleLineOpts.color;
	
						var outerDistance = me.getDistanceFromCenterForValue(opts.reverse ? me.min : me.max);
	
						// Point Label Font
						var pointLabelFontSize = getValueOrDefault(pointLabelOpts.fontSize, globalDefaults.defaultFontSize);
						var pointLabeFontStyle = getValueOrDefault(pointLabelOpts.fontStyle, globalDefaults.defaultFontStyle);
						var pointLabeFontFamily = getValueOrDefault(pointLabelOpts.fontFamily, globalDefaults.defaultFontFamily);
						var pointLabeFont = helpers.fontString(pointLabelFontSize, pointLabeFontStyle, pointLabeFontFamily);
	
						for (var i = me.getValueCount() - 1; i >= 0; i--) {
							if (angleLineOpts.display) {
								var outerPosition = me.getPointPosition(i, outerDistance);
								ctx.beginPath();
								ctx.moveTo(me.xCenter, me.yCenter);
								ctx.lineTo(outerPosition.x, outerPosition.y);
								ctx.stroke();
								ctx.closePath();
							}
							// Extra 3px out for some label spacing
							var pointLabelPosition = me.getPointPosition(i, outerDistance + 5);
	
							// Keep this in loop since we may support array properties here
							var pointLabelFontColor = getValueOrDefault(pointLabelOpts.fontColor, globalDefaults.defaultFontColor);
							ctx.font = pointLabeFont;
							ctx.fillStyle = pointLabelFontColor;
	
							var pointLabels = me.pointLabels;
	
							// Add quarter circle to make degree 0 mean top of circle
							var angleRadians = this.getIndexAngle(i) + (Math.PI / 2);
							var angle = (angleRadians * 360 / (2 * Math.PI)) % 360;
	
							if (angle === 0 || angle === 180) {
								ctx.textAlign = 'center';
							} else if (angle < 180) {
								ctx.textAlign = 'left';
							} else {
								ctx.textAlign = 'right';
							}
	
							// Set the correct text baseline based on outer positioning
							if (angle === 90 || angle === 270) {
								ctx.textBaseline = 'middle';
							} else if (angle > 270 || angle < 90) {
								ctx.textBaseline = 'bottom';
							} else {
								ctx.textBaseline = 'top';
							}
	
							ctx.fillText(pointLabels[i] ? pointLabels[i] : '', pointLabelPosition.x, pointLabelPosition.y);
						}
					}
				}
			}
		});
		Chart.scaleService.registerScaleType("radialLinear", LinearRadialScale, defaultConfig);
	
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/*global window: false */
	"use strict";
	
	var moment = __webpack_require__(32);
	moment = typeof(moment) === 'function' ? moment : window.moment;
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
		var time = {
			units: [{
				name: 'millisecond',
				steps: [1, 2, 5, 10, 20, 50, 100, 250, 500]
			}, {
				name: 'second',
				steps: [1, 2, 5, 10, 30]
			}, {
				name: 'minute',
				steps: [1, 2, 5, 10, 30]
			}, {
				name: 'hour',
				steps: [1, 2, 3, 6, 12]
			}, {
				name: 'day',
				steps: [1, 2, 5]
			}, {
				name: 'week',
				maxStep: 4
			}, {
				name: 'month',
				maxStep: 3
			}, {
				name: 'quarter',
				maxStep: 4
			}, {
				name: 'year',
				maxStep: false
			}]
		};
	
		var defaultConfig = {
			position: "bottom",
	
			time: {
				parser: false, // false == a pattern string from http://momentjs.com/docs/#/parsing/string-format/ or a custom callback that converts its argument to a moment
				format: false, // DEPRECATED false == date objects, moment object, callback or a pattern string from http://momentjs.com/docs/#/parsing/string-format/
				unit: false, // false == automatic or override with week, month, year, etc.
				round: false, // none, or override with week, month, year, etc.
				displayFormat: false, // DEPRECATED
				isoWeekday: false, // override week start day - see http://momentjs.com/docs/#/get-set/iso-weekday/
	
				// defaults to unit's corresponding unitFormat below or override using pattern string from http://momentjs.com/docs/#/displaying/format/
				displayFormats: {
					'millisecond': 'h:mm:ss.SSS a', // 11:20:01.123 AM,
					'second': 'h:mm:ss a', // 11:20:01 AM
					'minute': 'h:mm:ss a', // 11:20:01 AM
					'hour': 'MMM D, hA', // Sept 4, 5PM
					'day': 'll', // Sep 4 2015
					'week': 'll', // Week 46, or maybe "[W]WW - YYYY" ?
					'month': 'MMM YYYY', // Sept 2015
					'quarter': '[Q]Q - YYYY', // Q3
					'year': 'YYYY' // 2015
				}
			},
			ticks: {
				autoSkip: false
			}
		};
	
		var TimeScale = Chart.Scale.extend({
			initialize: function() {
				if (!moment) {
					throw new Error('Chart.js - Moment.js could not be found! You must include it before Chart.js to use the time scale. Download at https://momentjs.com');
				}
	
				Chart.Scale.prototype.initialize.call(this);
			},
			getLabelMoment: function(datasetIndex, index) {
				return this.labelMoments[datasetIndex][index];
			},
			getMomentStartOf: function(tick) {
				var me = this;
				if (me.options.time.unit === 'week' && me.options.time.isoWeekday !== false) {
					return tick.clone().startOf('isoWeek').isoWeekday(me.options.time.isoWeekday);
				} else {
					return tick.clone().startOf(me.tickUnit);
				}
			},
			determineDataLimits: function() {
				var me = this;
				me.labelMoments = [];
	
				// Only parse these once. If the dataset does not have data as x,y pairs, we will use
				// these
				var scaleLabelMoments = [];
				if (me.chart.data.labels && me.chart.data.labels.length > 0) {
					helpers.each(me.chart.data.labels, function(label) {
						var labelMoment = me.parseTime(label);
	
						if (labelMoment.isValid()) {
							if (me.options.time.round) {
								labelMoment.startOf(me.options.time.round);
							}
							scaleLabelMoments.push(labelMoment);
						}
					}, me);
	
					me.firstTick = moment.min.call(me, scaleLabelMoments);
					me.lastTick = moment.max.call(me, scaleLabelMoments);
				} else {
					me.firstTick = null;
					me.lastTick = null;
				}
	
				helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
					var momentsForDataset = [];
					var datasetVisible = me.chart.isDatasetVisible(datasetIndex);
	
					if (typeof dataset.data[0] === 'object' && dataset.data[0] !== null) {
						helpers.each(dataset.data, function(value) {
							var labelMoment = me.parseTime(me.getRightValue(value));
	
							if (labelMoment.isValid()) {
								if (me.options.time.round) {
									labelMoment.startOf(me.options.time.round);
								}
								momentsForDataset.push(labelMoment);
	
								if (datasetVisible) {
									// May have gone outside the scale ranges, make sure we keep the first and last ticks updated
									me.firstTick = me.firstTick !== null ? moment.min(me.firstTick, labelMoment) : labelMoment;
									me.lastTick = me.lastTick !== null ? moment.max(me.lastTick, labelMoment) : labelMoment;
								}
							}
						}, me);
					} else {
						// We have no labels. Use the ones from the scale
						momentsForDataset = scaleLabelMoments;
					}
	
					me.labelMoments.push(momentsForDataset);
				}, me);
	
				// Set these after we've done all the data
				if (me.options.time.min) {
					me.firstTick = me.parseTime(me.options.time.min);
				}
	
				if (me.options.time.max) {
					me.lastTick = me.parseTime(me.options.time.max);
				}
	
				// We will modify these, so clone for later
				me.firstTick = (me.firstTick || moment()).clone();
				me.lastTick = (me.lastTick || moment()).clone();
			},
			buildTicks: function() {
				var me = this;
	
				me.ctx.save();
				var tickFontSize = helpers.getValueOrDefault(me.options.ticks.fontSize, Chart.defaults.global.defaultFontSize);
				var tickFontStyle = helpers.getValueOrDefault(me.options.ticks.fontStyle, Chart.defaults.global.defaultFontStyle);
				var tickFontFamily = helpers.getValueOrDefault(me.options.ticks.fontFamily, Chart.defaults.global.defaultFontFamily);
				var tickLabelFont = helpers.fontString(tickFontSize, tickFontStyle, tickFontFamily);
				me.ctx.font = tickLabelFont;
	
				me.ticks = [];
				me.unitScale = 1; // How much we scale the unit by, ie 2 means 2x unit per step
				me.scaleSizeInUnits = 0; // How large the scale is in the base unit (seconds, minutes, etc)
	
				// Set unit override if applicable
				if (me.options.time.unit) {
					me.tickUnit = me.options.time.unit || 'day';
					me.displayFormat = me.options.time.displayFormats[me.tickUnit];
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, 1);
				} else {
					// Determine the smallest needed unit of the time
					var innerWidth = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
	
					// Crude approximation of what the label length might be
					var tempFirstLabel = me.tickFormatFunction(me.firstTick, 0, []);
					var tickLabelWidth = me.ctx.measureText(tempFirstLabel).width;
					var cosRotation = Math.cos(helpers.toRadians(me.options.ticks.maxRotation));
					var sinRotation = Math.sin(helpers.toRadians(me.options.ticks.maxRotation));
					tickLabelWidth = (tickLabelWidth * cosRotation) + (tickFontSize * sinRotation);
					var labelCapacity = innerWidth / (tickLabelWidth);
	
					// Start as small as possible
					me.tickUnit = 'millisecond';
					me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					me.displayFormat = me.options.time.displayFormats[me.tickUnit];
	
					var unitDefinitionIndex = 0;
					var unitDefinition = time.units[unitDefinitionIndex];
	
					// While we aren't ideal and we don't have units left
					while (unitDefinitionIndex < time.units.length) {
						// Can we scale this unit. If `false` we can scale infinitely
						me.unitScale = 1;
	
						if (helpers.isArray(unitDefinition.steps) && Math.ceil(me.scaleSizeInUnits / labelCapacity) < helpers.max(unitDefinition.steps)) {
							// Use one of the prefedined steps
							for (var idx = 0; idx < unitDefinition.steps.length; ++idx) {
								if (unitDefinition.steps[idx] >= Math.ceil(me.scaleSizeInUnits / labelCapacity)) {
									me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, unitDefinition.steps[idx]);
									break;
								}
							}
	
							break;
						} else if ((unitDefinition.maxStep === false) || (Math.ceil(me.scaleSizeInUnits / labelCapacity) < unitDefinition.maxStep)) {
							// We have a max step. Scale this unit
							me.unitScale = helpers.getValueOrDefault(me.options.time.unitStepSize, Math.ceil(me.scaleSizeInUnits / labelCapacity));
							break;
						} else {
							// Move to the next unit up
							++unitDefinitionIndex;
							unitDefinition = time.units[unitDefinitionIndex];
	
							me.tickUnit = unitDefinition.name;
							var leadingUnitBuffer = me.firstTick.diff(me.getMomentStartOf(me.firstTick), me.tickUnit, true);
							var trailingUnitBuffer = me.getMomentStartOf(me.lastTick.clone().add(1, me.tickUnit)).diff(me.lastTick, me.tickUnit, true);
							me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true) + leadingUnitBuffer + trailingUnitBuffer;
							me.displayFormat = me.options.time.displayFormats[unitDefinition.name];
						}
					}
				}
	
				var roundedStart;
	
				// Only round the first tick if we have no hard minimum
				if (!me.options.time.min) {
					me.firstTick = me.getMomentStartOf(me.firstTick);
					roundedStart = me.firstTick;
				} else {
					roundedStart = me.getMomentStartOf(me.firstTick);
				}
	
				// Only round the last tick if we have no hard maximum
				if (!me.options.time.max) {
					var roundedEnd = me.getMomentStartOf(me.lastTick);
					if (roundedEnd.diff(me.lastTick, me.tickUnit, true) !== 0) {
						// Do not use end of because we need me to be in the next time unit
						me.lastTick = me.getMomentStartOf(me.lastTick.add(1, me.tickUnit));
					}
				}
	
				me.smallestLabelSeparation = me.width;
	
				helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
					for (var i = 1; i < me.labelMoments[datasetIndex].length; i++) {
						me.smallestLabelSeparation = Math.min(me.smallestLabelSeparation, me.labelMoments[datasetIndex][i].diff(me.labelMoments[datasetIndex][i - 1], me.tickUnit, true));
					}
				}, me);
	
				// Tick displayFormat override
				if (me.options.time.displayFormat) {
					me.displayFormat = me.options.time.displayFormat;
				}
	
				// first tick. will have been rounded correctly if options.time.min is not specified
				me.ticks.push(me.firstTick.clone());
	
				// For every unit in between the first and last moment, create a moment and add it to the ticks tick
				for (var i = 1; i <= me.scaleSizeInUnits; ++i) {
					var newTick = roundedStart.clone().add(i, me.tickUnit);
	
					// Are we greater than the max time
					if (me.options.time.max && newTick.diff(me.lastTick, me.tickUnit, true) >= 0) {
						break;
					}
	
					if (i % me.unitScale === 0) {
						me.ticks.push(newTick);
					}
				}
	
				// Always show the right tick
				var diff = me.ticks[me.ticks.length - 1].diff(me.lastTick, me.tickUnit);
				if (diff !== 0 || me.scaleSizeInUnits === 0) {
					// this is a weird case. If the <max> option is the same as the end option, we can't just diff the times because the tick was created from the roundedStart
					// but the last tick was not rounded.
					if (me.options.time.max) {
						me.ticks.push(me.lastTick.clone());
						me.scaleSizeInUnits = me.lastTick.diff(me.ticks[0], me.tickUnit, true);
					} else {
						me.ticks.push(me.lastTick.clone());
						me.scaleSizeInUnits = me.lastTick.diff(me.firstTick, me.tickUnit, true);
					}
				}
	
				me.ctx.restore();
			},
			// Get tooltip label
			getLabelForIndex: function(index, datasetIndex) {
				var me = this;
				var label = me.chart.data.labels && index < me.chart.data.labels.length ? me.chart.data.labels[index] : '';
	
				if (typeof me.chart.data.datasets[datasetIndex].data[0] === 'object') {
					label = me.getRightValue(me.chart.data.datasets[datasetIndex].data[index]);
				}
	
				// Format nicely
				if (me.options.time.tooltipFormat) {
					label = me.parseTime(label).format(me.options.time.tooltipFormat);
				}
	
				return label;
			},
			// Function to format an individual tick mark
			tickFormatFunction: function(tick, index, ticks) {
				var formattedTick = tick.format(this.displayFormat);
				var tickOpts = this.options.ticks;
				var callback = helpers.getValueOrDefault(tickOpts.callback, tickOpts.userCallback);
	
				if (callback) {
					return callback(formattedTick, index, ticks);
				} else {
					return formattedTick;
				}
			},
			convertTicksToLabels: function() {
				var me = this;
				me.tickMoments = me.ticks;
				me.ticks = me.ticks.map(me.tickFormatFunction, me);
			},
			getPixelForValue: function(value, index, datasetIndex) {
				var me = this;
				if (!value || !value.isValid) {
					// not already a moment object
					value = moment(me.getRightValue(value));
				}
				var labelMoment = value && value.isValid && value.isValid() ? value : me.getLabelMoment(datasetIndex, index);
	
				if (labelMoment) {
					var offset = labelMoment.diff(me.firstTick, me.tickUnit, true);
	
					var decimal = offset !== 0 ? offset / me.scaleSizeInUnits : offset;
	
					if (me.isHorizontal()) {
						var innerWidth = me.width - (me.paddingLeft + me.paddingRight);
						var valueOffset = (innerWidth * decimal) + me.paddingLeft;
	
						return me.left + Math.round(valueOffset);
					} else {
						var innerHeight = me.height - (me.paddingTop + me.paddingBottom);
						var heightOffset = (innerHeight * decimal) + me.paddingTop;
	
						return me.top + Math.round(heightOffset);
					}
				}
			},
			getPixelForTick: function(index) {
				return this.getPixelForValue(this.tickMoments[index], null, null);
			},
			getValueForPixel: function(pixel) {
				var me = this;
				var innerDimension = me.isHorizontal() ? me.width - (me.paddingLeft + me.paddingRight) : me.height - (me.paddingTop + me.paddingBottom);
				var offset = (pixel - (me.isHorizontal() ? me.left + me.paddingLeft : me.top + me.paddingTop)) / innerDimension;
				offset *= me.scaleSizeInUnits;
				return me.firstTick.clone().add(moment.duration(offset, me.tickUnit).asSeconds(), 'seconds');
			},
			parseTime: function(label) {
				var me = this;
				if (typeof me.options.time.parser === 'string') {
					return moment(label, me.options.time.parser);
				}
				if (typeof me.options.time.parser === 'function') {
					return me.options.time.parser(label);
				}
				// Date objects
				if (typeof label.getMonth === 'function' || typeof label === 'number') {
					return moment(label);
				}
				// Moment support
				if (label.isValid && label.isValid()) {
					return label;
				}
				// Custom parsing (return an instance of moment)
				if (typeof me.options.time.format !== 'string' && me.options.time.format.call) {
					console.warn("options.time.format is deprecated and replaced by options.time.parser. See http://nnnick.github.io/Chart.js/docs-v2/#scales-time-scale");
					return me.options.time.format(label);
				}
				// Moment format parsing
				return moment(label, me.options.time.format);
			}
		});
		Chart.scaleService.registerScaleType("time", TimeScale, defaultConfig);
	
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_32__;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.bar = {
			hover: {
				mode: "label"
			},
	
			scales: {
				xAxes: [{
					type: "category",
	
					// Specific to Bar Controller
					categoryPercentage: 0.8,
					barPercentage: 0.9,
	
					// grid line settings
					gridLines: {
						offsetGridLines: true
					}
				}],
				yAxes: [{
					type: "linear"
				}]
			}
		};
	
		Chart.controllers.bar = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Rectangle,
	
			initialize: function(chart, datasetIndex) {
				Chart.DatasetController.prototype.initialize.call(this, chart, datasetIndex);
	
				// Use this to indicate that this is a bar dataset.
				this.getMeta().bar = true;
			},
	
			// Get the number of datasets that display bars. We use this to correctly calculate the bar width
			getBarCount: function() {
				var me = this;
				var barCount = 0;
				helpers.each(me.chart.data.datasets, function(dataset, datasetIndex) {
					var meta = me.chart.getDatasetMeta(datasetIndex);
					if (meta.bar && me.chart.isDatasetVisible(datasetIndex)) {
						++barCount;
					}
				}, me);
				return barCount;
			},
	
			update: function(reset) {
				var me = this;
				helpers.each(me.getMeta().data, function(rectangle, index) {
					me.updateElement(rectangle, index, reset);
				}, me);
			},
	
			updateElement: function(rectangle, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
				var scaleBase = yScale.getBasePixel();
				var rectangleElementOptions = me.chart.options.elements.rectangle;
				var custom = rectangle.custom || {};
				var dataset = me.getDataset();
	
				helpers.extend(rectangle, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: me.index,
					_index: index,
	
					// Desired view properties
					_model: {
						x: me.calculateBarX(index, me.index),
						y: reset ? scaleBase : me.calculateBarY(index, me.index),
	
						// Tooltip
						label: me.chart.data.labels[index],
						datasetLabel: dataset.label,
	
						// Appearance
						base: reset ? scaleBase : me.calculateBarBase(me.index, index),
						width: me.calculateBarWidth(index),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
						borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
					}
				});
				rectangle.pivot();
			},
	
			calculateBarBase: function(datasetIndex, index) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var base = 0;
	
				if (yScale.options.stacked) {
					var chart = me.chart;
					var datasets = chart.data.datasets;
					var value = Number(datasets[datasetIndex].data[index]);
	
					for (var i = 0; i < datasetIndex; i++) {
						var currentDs = datasets[i];
						var currentDsMeta = chart.getDatasetMeta(i);
						if (currentDsMeta.bar && currentDsMeta.yAxisID === yScale.id && chart.isDatasetVisible(i)) {
							var currentVal = Number(currentDs.data[index]);
							base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
						}
					}
	
					return yScale.getPixelForValue(base);
				}
	
				return yScale.getBasePixel();
			},
	
			getRuler: function(index) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var datasetCount = me.getBarCount();
	
				var tickWidth;
	
				if (xScale.options.type === 'category') {
					tickWidth = xScale.getPixelForTick(index + 1) - xScale.getPixelForTick(index);
				} else {
					// Average width
					tickWidth = xScale.width / xScale.ticks.length;
				}
				var categoryWidth = tickWidth * xScale.options.categoryPercentage;
				var categorySpacing = (tickWidth - (tickWidth * xScale.options.categoryPercentage)) / 2;
				var fullBarWidth = categoryWidth / datasetCount;
	
				if (xScale.ticks.length !== me.chart.data.labels.length) {
				    var perc = xScale.ticks.length / me.chart.data.labels.length;
				    fullBarWidth = fullBarWidth * perc;
				}
	
				var barWidth = fullBarWidth * xScale.options.barPercentage;
				var barSpacing = fullBarWidth - (fullBarWidth * xScale.options.barPercentage);
	
				return {
					datasetCount: datasetCount,
					tickWidth: tickWidth,
					categoryWidth: categoryWidth,
					categorySpacing: categorySpacing,
					fullBarWidth: fullBarWidth,
					barWidth: barWidth,
					barSpacing: barSpacing
				};
			},
	
			calculateBarWidth: function(index) {
				var xScale = this.getScaleForId(this.getMeta().xAxisID);
				if (xScale.options.barThickness) {
					return xScale.options.barThickness;
				}
				var ruler = this.getRuler(index);
				return xScale.options.stacked ? ruler.categoryWidth : ruler.barWidth;
			},
	
			// Get bar index from the given dataset index accounting for the fact that not all bars are visible
			getBarIndex: function(datasetIndex) {
				var barIndex = 0;
				var meta, j;
	
				for (j = 0; j < datasetIndex; ++j) {
					meta = this.chart.getDatasetMeta(j);
					if (meta.bar && this.chart.isDatasetVisible(j)) {
						++barIndex;
					}
				}
	
				return barIndex;
			},
	
			calculateBarX: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var barIndex = me.getBarIndex(datasetIndex);
	
				var ruler = me.getRuler(index);
				var leftTick = xScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
				leftTick -= me.chart.isCombo ? (ruler.tickWidth / 2) : 0;
	
				if (xScale.options.stacked) {
					return leftTick + (ruler.categoryWidth / 2) + ruler.categorySpacing;
				}
	
				return leftTick +
					(ruler.barWidth / 2) +
					ruler.categorySpacing +
					(ruler.barWidth * barIndex) +
					(ruler.barSpacing / 2) +
					(ruler.barSpacing * barIndex);
			},
	
			calculateBarY: function(index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var value = Number(me.getDataset().data[index]);
	
				if (yScale.options.stacked) {
	
					var sumPos = 0,
						sumNeg = 0;
	
					for (var i = 0; i < datasetIndex; i++) {
						var ds = me.chart.data.datasets[i];
						var dsMeta = me.chart.getDatasetMeta(i);
						if (dsMeta.bar && dsMeta.yAxisID === yScale.id && me.chart.isDatasetVisible(i)) {
							var stackedVal = Number(ds.data[index]);
							if (stackedVal < 0) {
								sumNeg += stackedVal || 0;
							} else {
								sumPos += stackedVal || 0;
							}
						}
					}
	
					if (value < 0) {
						return yScale.getPixelForValue(sumNeg + value);
					} else {
						return yScale.getPixelForValue(sumPos + value);
					}
				}
	
				return yScale.getPixelForValue(value);
			},
	
			draw: function(ease) {
				var me = this;
				var easingDecimal = ease || 1;
				helpers.each(me.getMeta().data, function(rectangle, index) {
					var d = me.getDataset().data[index];
					if (d !== null && d !== undefined && !isNaN(d)) {
						rectangle.transition(easingDecimal).draw();
					}
				}, me);
			},
	
			setHoverStyle: function(rectangle) {
				var dataset = this.chart.data.datasets[rectangle._datasetIndex];
				var index = rectangle._index;
	
				var custom = rectangle.custom || {};
				var model = rectangle._model;
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.hoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.hoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.hoverBorderWidth, index, model.borderWidth);
			},
	
			removeHoverStyle: function(rectangle) {
				var dataset = this.chart.data.datasets[rectangle._datasetIndex];
				var index = rectangle._index;
				var custom = rectangle.custom || {};
				var model = rectangle._model;
				var rectangleElementOptions = this.chart.options.elements.rectangle;
	
				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth);
			}
	
		});
	
	
		// including horizontalBar in the bar file, instead of a file of its own
		// it extends bar (like pie extends doughnut)
		Chart.defaults.horizontalBar = {
			hover: {
				mode: "label"
			},
	
			scales: {
				xAxes: [{
					type: "linear",
					position: "bottom"
				}],
				yAxes: [{
					position: "left",
					type: "category",
	
					// Specific to Horizontal Bar Controller
					categoryPercentage: 0.8,
					barPercentage: 0.9,
	
					// grid line settings
					gridLines: {
						offsetGridLines: true
					}
				}]
			},
			elements: {
				rectangle: {
					borderSkipped: 'left'
				}
			},
			tooltips: {
				callbacks: {
					title: function(tooltipItems, data) {
						// Pick first xLabel for now
						var title = '';
	
						if (tooltipItems.length > 0) {
							if (tooltipItems[0].yLabel) {
								title = tooltipItems[0].yLabel;
							} else if (data.labels.length > 0 && tooltipItems[0].index < data.labels.length) {
								title = data.labels[tooltipItems[0].index];
							}
						}
	
						return title;
					},
					label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
					return datasetLabel + ': ' + tooltipItem.xLabel;
					}
				}
			}
		};
	
		Chart.controllers.horizontalBar = Chart.controllers.bar.extend({
			updateElement: function(rectangle, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
				var scaleBase = xScale.getBasePixel();
				var custom = rectangle.custom || {};
				var dataset = me.getDataset();
				var rectangleElementOptions = me.chart.options.elements.rectangle;
	
				helpers.extend(rectangle, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: me.index,
					_index: index,
	
					// Desired view properties
					_model: {
						x: reset ? scaleBase : me.calculateBarX(index, me.index),
						y: me.calculateBarY(index, me.index),
	
						// Tooltip
						label: me.chart.data.labels[index],
						datasetLabel: dataset.label,
	
						// Appearance
						base: reset ? scaleBase : me.calculateBarBase(me.index, index),
						height: me.calculateBarHeight(index),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index, rectangleElementOptions.backgroundColor),
						borderSkipped: custom.borderSkipped ? custom.borderSkipped : rectangleElementOptions.borderSkipped,
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.borderColor, index, rectangleElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.borderWidth, index, rectangleElementOptions.borderWidth)
					},
	
					draw: function () {
						var ctx = this._chart.ctx;
						var vm = this._view;
	
						var halfHeight = vm.height / 2,
							topY = vm.y - halfHeight,
							bottomY = vm.y + halfHeight,
							right = vm.base - (vm.base - vm.x),
							halfStroke = vm.borderWidth / 2;
	
						// Canvas doesn't allow us to stroke inside the width so we can
						// adjust the sizes to fit if we're setting a stroke on the line
						if (vm.borderWidth) {
							topY += halfStroke;
							bottomY -= halfStroke;
							right += halfStroke;
						}
	
						ctx.beginPath();
	
						ctx.fillStyle = vm.backgroundColor;
						ctx.strokeStyle = vm.borderColor;
						ctx.lineWidth = vm.borderWidth;
	
						// Corner points, from bottom-left to bottom-right clockwise
						// | 1 2 |
						// | 0 3 |
						var corners = [
							[vm.base, bottomY],
							[vm.base, topY],
							[right, topY],
							[right, bottomY]
						];
	
						// Find first (starting) corner with fallback to 'bottom'
						var borders = ['bottom', 'left', 'top', 'right'];
						var startCorner = borders.indexOf(vm.borderSkipped, 0);
						if (startCorner === -1)
							startCorner = 0;
	
						function cornerAt(index) {
							return corners[(startCorner + index) % 4];
						}
	
						// Draw rectangle from 'startCorner'
						ctx.moveTo.apply(ctx, cornerAt(0));
						for (var i = 1; i < 4; i++)
							ctx.lineTo.apply(ctx, cornerAt(i));
	
						ctx.fill();
						if (vm.borderWidth) {
							ctx.stroke();
						}
					},
	
					inRange: function (mouseX, mouseY) {
						var vm = this._view;
						var inRange = false;
	
						if (vm) {
							if (vm.x < vm.base) {
								inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.x && mouseX <= vm.base);
							} else {
								inRange = (mouseY >= vm.y - vm.height / 2 && mouseY <= vm.y + vm.height / 2) && (mouseX >= vm.base && mouseX <= vm.x);
							}
						}
	
						return inRange;
					}
				});
	
				rectangle.pivot();
			},
	
			calculateBarBase: function (datasetIndex, index) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var base = 0;
	
				if (xScale.options.stacked) {
					var chart = me.chart;
					var datasets = chart.data.datasets;
					var value = Number(datasets[datasetIndex].data[index]);
	
					for (var i = 0; i < datasetIndex; i++) {
						var currentDs = datasets[i];
						var currentDsMeta = chart.getDatasetMeta(i);
						if (currentDsMeta.bar && currentDsMeta.xAxisID === xScale.id && chart.isDatasetVisible(i)) {
							var currentVal = Number(currentDs.data[index]);
							base += value < 0 ? Math.min(currentVal, 0) : Math.max(currentVal, 0);
						}
					}
	
					return xScale.getPixelForValue(base);
				}
	
				return xScale.getBasePixel();
			},
	
			getRuler: function (index) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var datasetCount = me.getBarCount();
	
				var tickHeight;
				if (yScale.options.type === 'category') {
					tickHeight = yScale.getPixelForTick(index + 1) - yScale.getPixelForTick(index);
				} else {
					// Average width
					tickHeight = yScale.width / yScale.ticks.length;
				}
				var categoryHeight = tickHeight * yScale.options.categoryPercentage;
				var categorySpacing = (tickHeight - (tickHeight * yScale.options.categoryPercentage)) / 2;
				var fullBarHeight = categoryHeight / datasetCount;
	
				if (yScale.ticks.length !== me.chart.data.labels.length) {
					var perc = yScale.ticks.length / me.chart.data.labels.length;
					fullBarHeight = fullBarHeight * perc;
				}
	
				var barHeight = fullBarHeight * yScale.options.barPercentage;
				var barSpacing = fullBarHeight - (fullBarHeight * yScale.options.barPercentage);
	
				return {
					datasetCount: datasetCount,
					tickHeight: tickHeight,
					categoryHeight: categoryHeight,
					categorySpacing: categorySpacing,
					fullBarHeight: fullBarHeight,
					barHeight: barHeight,
					barSpacing: barSpacing,
				};
			},
	
			calculateBarHeight: function (index) {
				var me = this;
				var yScale = me.getScaleForId(me.getMeta().yAxisID);
				if (yScale.options.barThickness) {
					return yScale.options.barThickness;
				}
				var ruler = me.getRuler(index);
				return yScale.options.stacked ? ruler.categoryHeight : ruler.barHeight;
			},
	
			calculateBarX: function (index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var value = Number(me.getDataset().data[index]);
	
				if (xScale.options.stacked) {
	
					var sumPos = 0,
						sumNeg = 0;
	
					for (var i = 0; i < datasetIndex; i++) {
						var ds = me.chart.data.datasets[i];
						var dsMeta = me.chart.getDatasetMeta(i);
						if (dsMeta.bar && dsMeta.xAxisID === xScale.id && me.chart.isDatasetVisible(i)) {
							var stackedVal = Number(ds.data[index]);
							if (stackedVal < 0) {
								sumNeg += stackedVal || 0;
							} else {
								sumPos += stackedVal || 0;
							}
						}
					}
	
					if (value < 0) {
						return xScale.getPixelForValue(sumNeg + value);
					} else {
						return xScale.getPixelForValue(sumPos + value);
					}
				}
	
				return xScale.getPixelForValue(value);
			},
	
			calculateBarY: function (index, datasetIndex) {
				var me = this;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var barIndex = me.getBarIndex(datasetIndex);
	
				var ruler = me.getRuler(index);
				var topTick = yScale.getPixelForValue(null, index, datasetIndex, me.chart.isCombo);
				topTick -= me.chart.isCombo ? (ruler.tickHeight / 2) : 0;
	
				if (yScale.options.stacked) {
					return topTick + (ruler.categoryHeight / 2) + ruler.categorySpacing;
				}
	
				return topTick +
					(ruler.barHeight / 2) +
					ruler.categorySpacing +
					(ruler.barHeight * barIndex) +
					(ruler.barSpacing / 2) +
					(ruler.barSpacing * barIndex);
			}
		});
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.bubble = {
			hover: {
				mode: "single"
			},
	
			scales: {
				xAxes: [{
					type: "linear", // bubble should probably use a linear scale by default
					position: "bottom",
					id: "x-axis-0" // need an ID so datasets can reference the scale
				}],
				yAxes: [{
					type: "linear",
					position: "left",
					id: "y-axis-0"
				}]
			},
	
			tooltips: {
				callbacks: {
					title: function() {
						// Title doesn't make sense for scatter since we format the data as a point
						return '';
					},
					label: function(tooltipItem, data) {
						var datasetLabel = data.datasets[tooltipItem.datasetIndex].label || '';
						var dataPoint = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
						return datasetLabel + ': (' + dataPoint.x + ', ' + dataPoint.y + ', ' + dataPoint.r + ')';
					}
				}
			}
		};
	
		Chart.controllers.bubble = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Point,
	
			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var points = meta.data;
	
				// Update Points
				helpers.each(points, function(point, index) {
					me.updateElement(point, index, reset);
				});
			},
	
			updateElement: function(point, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var xScale = me.getScaleForId(meta.xAxisID);
				var yScale = me.getScaleForId(meta.yAxisID);
	
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var data = dataset.data[index];
				var pointElementOptions = me.chart.options.elements.point;
				var dsIndex = me.index;
	
				helpers.extend(point, {
					// Utility
					_xScale: xScale,
					_yScale: yScale,
					_datasetIndex: dsIndex,
					_index: index,
	
					// Desired view properties
					_model: {
						x: reset ? xScale.getPixelForDecimal(0.5) : xScale.getPixelForValue(typeof data === 'object' ? data : NaN, index, dsIndex, me.chart.isCombo),
						y: reset ? yScale.getBasePixel() : yScale.getPixelForValue(data, index, dsIndex),
						// Appearance
						radius: reset ? 0 : custom.radius ? custom.radius : me.getRadius(data),
	
						// Tooltip
						hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
					}
				});
	
				// Trick to reset the styles of the point
				Chart.DatasetController.prototype.removeHoverStyle.call(me, point, pointElementOptions);
	
				var model = point._model;
				model.skip = custom.skip ? custom.skip : (isNaN(model.x) || isNaN(model.y));
	
				point.pivot();
			},
	
			getRadius: function(value) {
				return value.r || this.chart.options.elements.point.radius;
			},
	
			setHoverStyle: function(point) {
				var me = this;
				Chart.DatasetController.prototype.setHoverStyle.call(me, point);
	
				// Radius
				var dataset = me.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;
				model.radius = custom.hoverRadius ? custom.hoverRadius : (helpers.getValueAtIndexOrDefault(dataset.hoverRadius, index, me.chart.options.elements.point.hoverRadius)) + me.getRadius(dataset.data[index]);
			},
	
			removeHoverStyle: function(point) {
				var me = this;
				Chart.DatasetController.prototype.removeHoverStyle.call(me, point, me.chart.options.elements.point);
	
				var dataVal = me.chart.data.datasets[point._datasetIndex].data[point._index];
				var custom = point.custom || {};
				var model = point._model;
	
				model.radius = custom.radius ? custom.radius : me.getRadius(dataVal);
			}
		});
	};


/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers,
			defaults = Chart.defaults;
	
		defaults.doughnut = {
			animation: {
				//Boolean - Whether we animate the rotation of the Doughnut
				animateRotate: true,
				//Boolean - Whether we animate scaling the Doughnut from the centre
				animateScale: false
			},
			aspectRatio: 1,
			hover: {
				mode: 'single'
			},
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
	
				var data = chart.data;
				var datasets = data.datasets;
				var labels = data.labels;
	
				if (datasets.length) {
					for (var i = 0; i < datasets[0].data.length; ++i) {
						text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '"></span>');
						if (labels[i]) {
							text.push(labels[i]);
						}
						text.push('</li>');
					}
				}
	
				text.push('</ul>');
				return text.join("");
			},
			legend: {
				labels: {
					generateLabels: function(chart) {
						var data = chart.data;
						if (data.labels.length && data.datasets.length) {
							return data.labels.map(function(label, i) {
								var meta = chart.getDatasetMeta(0);
								var ds = data.datasets[0];
								var arc = meta.data[i];
								var custom = arc.custom || {};
								var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
								var arcOpts = chart.options.elements.arc;
								var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
								var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
								var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
	
								return {
									text: label,
									fillStyle: fill,
									strokeStyle: stroke,
									lineWidth: bw,
									hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
	
									// Extra data used for toggling the correct item
									index: i
								};
							});
						} else {
							return [];
						}
					}
				},
	
				onClick: function(e, legendItem) {
					var index = legendItem.index;
					var chart = this.chart;
					var i, ilen, meta;
	
					for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
						meta = chart.getDatasetMeta(i);
						meta.data[index].hidden = !meta.data[index].hidden;
					}
	
					chart.update();
				}
			},
	
			//The percentage of the chart that we cut out of the middle.
			cutoutPercentage: 50,
	
			//The rotation of the chart, where the first data arc begins.
			rotation: Math.PI * -0.5,
	
			//The total circumference of the chart.
			circumference: Math.PI * 2.0,
	
			// Need to override these to give a nice default
			tooltips: {
				callbacks: {
					title: function() {
						return '';
					},
					label: function(tooltipItem, data) {
						return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
					}
				}
			}
		};
	
		defaults.pie = helpers.clone(defaults.doughnut);
		helpers.extend(defaults.pie, {
			cutoutPercentage: 0
		});
	
	
		Chart.controllers.doughnut = Chart.controllers.pie = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Arc,
	
			linkScales: helpers.noop,
	
			// Get index of the dataset in relation to the visible datasets. This allows determining the inner and outer radius correctly
			getRingIndex: function(datasetIndex) {
				var ringIndex = 0;
	
				for (var j = 0; j < datasetIndex; ++j) {
					if (this.chart.isDatasetVisible(j)) {
						++ringIndex;
					}
				}
	
				return ringIndex;
			},
	
			update: function(reset) {
				var me = this;
				var chart = me.chart,
					chartArea = chart.chartArea,
					opts = chart.options,
					arcOpts = opts.elements.arc,
					availableWidth = chartArea.right - chartArea.left - arcOpts.borderWidth,
					availableHeight = chartArea.bottom - chartArea.top - arcOpts.borderWidth,
					minSize = Math.min(availableWidth, availableHeight),
					offset = {
						x: 0,
						y: 0
					},
					meta = me.getMeta(),
					cutoutPercentage = opts.cutoutPercentage,
					circumference = opts.circumference;
	
				// If the chart's circumference isn't a full circle, calculate minSize as a ratio of the width/height of the arc
				if (circumference < Math.PI * 2.0) {
					var startAngle = opts.rotation % (Math.PI * 2.0);
					startAngle += Math.PI * 2.0 * (startAngle >= Math.PI ? -1 : startAngle < -Math.PI ? 1 : 0);
					var endAngle = startAngle + circumference;
					var start = {x: Math.cos(startAngle), y: Math.sin(startAngle)};
					var end = {x: Math.cos(endAngle), y: Math.sin(endAngle)};
					var contains0 = (startAngle <= 0 && 0 <= endAngle) || (startAngle <= Math.PI * 2.0 && Math.PI * 2.0 <= endAngle);
					var contains90 = (startAngle <= Math.PI * 0.5 && Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 2.5 && Math.PI * 2.5 <= endAngle);
					var contains180 = (startAngle <= -Math.PI && -Math.PI <= endAngle) || (startAngle <= Math.PI && Math.PI <= endAngle);
					var contains270 = (startAngle <= -Math.PI * 0.5 && -Math.PI * 0.5 <= endAngle) || (startAngle <= Math.PI * 1.5 && Math.PI * 1.5 <= endAngle);
					var cutout = cutoutPercentage / 100.0;
					var min = {x: contains180 ? -1 : Math.min(start.x * (start.x < 0 ? 1 : cutout), end.x * (end.x < 0 ? 1 : cutout)), y: contains270 ? -1 : Math.min(start.y * (start.y < 0 ? 1 : cutout), end.y * (end.y < 0 ? 1 : cutout))};
					var max = {x: contains0 ? 1 : Math.max(start.x * (start.x > 0 ? 1 : cutout), end.x * (end.x > 0 ? 1 : cutout)), y: contains90 ? 1 : Math.max(start.y * (start.y > 0 ? 1 : cutout), end.y * (end.y > 0 ? 1 : cutout))};
					var size = {width: (max.x - min.x) * 0.5, height: (max.y - min.y) * 0.5};
					minSize = Math.min(availableWidth / size.width, availableHeight / size.height);
					offset = {x: (max.x + min.x) * -0.5, y: (max.y + min.y) * -0.5};
				}
	            chart.borderWidth = me.getMaxBorderWidth(meta.data);
	
				chart.outerRadius = Math.max((minSize - chart.borderWidth) / 2, 0);
				chart.innerRadius = Math.max(cutoutPercentage ? (chart.outerRadius / 100) * (cutoutPercentage) : 1, 0);
				chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
				chart.offsetX = offset.x * chart.outerRadius;
				chart.offsetY = offset.y * chart.outerRadius;
	
				meta.total = me.calculateTotal();
	
				me.outerRadius = chart.outerRadius - (chart.radiusLength * me.getRingIndex(me.index));
				me.innerRadius = me.outerRadius - chart.radiusLength;
	
				helpers.each(meta.data, function(arc, index) {
					me.updateElement(arc, index, reset);
				});
			},
	
			updateElement: function(arc, index, reset) {
				var me = this;
				var chart = me.chart,
					chartArea = chart.chartArea,
					opts = chart.options,
					animationOpts = opts.animation,
					centerX = (chartArea.left + chartArea.right) / 2,
					centerY = (chartArea.top + chartArea.bottom) / 2,
					startAngle = opts.rotation, // non reset case handled later
					endAngle = opts.rotation, // non reset case handled later
					dataset = me.getDataset(),
					circumference = reset && animationOpts.animateRotate ? 0 : arc.hidden ? 0 : me.calculateCircumference(dataset.data[index]) * (opts.circumference / (2.0 * Math.PI)),
					innerRadius = reset && animationOpts.animateScale ? 0 : me.innerRadius,
					outerRadius = reset && animationOpts.animateScale ? 0 : me.outerRadius,
					valueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
	
				helpers.extend(arc, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
	
					// Desired view properties
					_model: {
						x: centerX + chart.offsetX,
						y: centerY + chart.offsetY,
						startAngle: startAngle,
						endAngle: endAngle,
						circumference: circumference,
						outerRadius: outerRadius,
						innerRadius: innerRadius,
						label: valueAtIndexOrDefault(dataset.label, index, chart.data.labels[index])
					}
				});
	
				var model = arc._model;
				// Resets the visual styles
				this.removeHoverStyle(arc);
	
				// Set correct angles if not resetting
				if (!reset || !animationOpts.animateRotate) {
					if (index === 0) {
						model.startAngle = opts.rotation;
					} else {
						model.startAngle = me.getMeta().data[index - 1]._model.endAngle;
					}
	
					model.endAngle = model.startAngle + model.circumference;
				}
	
				arc.pivot();
			},
	
			removeHoverStyle: function(arc) {
				Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
			},
	
			calculateTotal: function() {
				var dataset = this.getDataset();
				var meta = this.getMeta();
				var total = 0;
				var value;
	
				helpers.each(meta.data, function(element, index) {
					value = dataset.data[index];
					if (!isNaN(value) && !element.hidden) {
						total += Math.abs(value);
					}
				});
	
				return total;
			},
	
			calculateCircumference: function(value) {
				var total = this.getMeta().total;
				if (total > 0 && !isNaN(value)) {
					return (Math.PI * 2.0) * (value / total);
				} else {
					return 0;
				}
			},
			
			//gets the max border or hover width to properly scale pie charts
	        getMaxBorderWidth: function (elements) {
	            var max = 0,
					index = this.index,
					length = elements.length,
					borderWidth,
					hoverWidth;
	
	            for (var i = 0; i < length; i++) {
	               	borderWidth = elements[i]._model ? elements[i]._model.borderWidth : 0;
	                hoverWidth = elements[i]._chart ? elements[i]._chart.config.data.datasets[index].hoverBorderWidth : 0;
					
	                max = borderWidth > max ? borderWidth : max;
	                max = hoverWidth > max ? hoverWidth : max;
	            }
	            return max;
	        }
		});
	};


/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.line = {
			showLines: true,
			spanGaps: false,
	
			hover: {
				mode: "label"
			},
	
			scales: {
				xAxes: [{
					type: "category",
					id: 'x-axis-0'
				}],
				yAxes: [{
					type: "linear",
					id: 'y-axis-0'
				}]
			}
		};
	
		function lineEnabled(dataset, options) {
			return helpers.getValueOrDefault(dataset.showLine, options.showLines);
		}
	
		Chart.controllers.line = Chart.DatasetController.extend({
	
			datasetElementType: Chart.elements.Line,
	
			dataElementType: Chart.elements.Point,
	
			addElementAndReset: function(index) {
				var me = this;
				var options = me.chart.options;
				var meta = me.getMeta();
	
				Chart.DatasetController.prototype.addElementAndReset.call(me, index);
	
				// Make sure bezier control points are updated
				if (lineEnabled(me.getDataset(), options) && meta.dataset._model.tension !== 0) {
					me.updateBezierControlPoints();
				}
			},
	
			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var line = meta.dataset;
				var points = meta.data || [];
				var options = me.chart.options;
				var lineElementOptions = options.elements.line;
				var scale = me.getScaleForId(meta.yAxisID);
				var i, ilen, custom;
				var dataset = me.getDataset();
				var showLine = lineEnabled(dataset, options);
	
				// Update Line
				if (showLine) {
					custom = line.custom || {};
	
					// Compatibility: If the properties are defined with only the old name, use those values
					if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
						dataset.lineTension = dataset.tension;
					}
	
					// Utility
					line._scale = scale;
					line._datasetIndex = me.index;
					// Data
					line._children = points;
					// Model
					line._model = {
						// Appearance
						// The default behavior of lines is to break at null values, according
						// to https://github.com/chartjs/Chart.js/issues/2435#issuecomment-216718158
						// This option gives linse the ability to span gaps
						spanGaps: dataset.spanGaps ? dataset.spanGaps : options.spanGaps,
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
						borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
						borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
						borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
						borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
						borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
						fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
						steppedLine: custom.steppedLine ? custom.steppedLine : helpers.getValueOrDefault(dataset.steppedLine, lineElementOptions.stepped),
						// Scale
						scaleTop: scale.top,
						scaleBottom: scale.bottom,
						scaleZero: scale.getBasePixel()
					};
	
					line.pivot();
				}
	
				// Update Points
				for (i=0, ilen=points.length; i<ilen; ++i) {
					me.updateElement(points[i], i, reset);
				}
	
				if (showLine && line._model.tension !== 0) {
					me.updateBezierControlPoints();
				}
	
				// Now pivot the point for animation
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].pivot();
				}
			},
	
			getPointBackgroundColor: function(point, index) {
				var backgroundColor = this.chart.options.elements.point.backgroundColor;
				var dataset = this.getDataset();
				var custom = point.custom || {};
	
				if (custom.backgroundColor) {
					backgroundColor = custom.backgroundColor;
				} else if (dataset.pointBackgroundColor) {
					backgroundColor = helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, backgroundColor);
				} else if (dataset.backgroundColor) {
					backgroundColor = dataset.backgroundColor;
				}
	
				return backgroundColor;
			},
	
			getPointBorderColor: function(point, index) {
				var borderColor = this.chart.options.elements.point.borderColor;
				var dataset = this.getDataset();
				var custom = point.custom || {};
	
				if (custom.borderColor) {
					borderColor = custom.borderColor;
				} else if (dataset.pointBorderColor) {
					borderColor = helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, borderColor);
				} else if (dataset.borderColor) {
					borderColor = dataset.borderColor;
				}
	
				return borderColor;
			},
	
			getPointBorderWidth: function(point, index) {
				var borderWidth = this.chart.options.elements.point.borderWidth;
				var dataset = this.getDataset();
				var custom = point.custom || {};
	
				if (custom.borderWidth) {
					borderWidth = custom.borderWidth;
				} else if (dataset.pointBorderWidth) {
					borderWidth = helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, borderWidth);
				} else if (dataset.borderWidth) {
					borderWidth = dataset.borderWidth;
				}
	
				return borderWidth;
			},
	
			updateElement: function(point, index, reset) {
				var me = this;
				var meta = me.getMeta();
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var datasetIndex = me.index;
				var value = dataset.data[index];
				var yScale = me.getScaleForId(meta.yAxisID);
				var xScale = me.getScaleForId(meta.xAxisID);
				var pointOptions = me.chart.options.elements.point;
				var x, y;
	
				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
					dataset.pointRadius = dataset.radius;
				}
				if ((dataset.hitRadius !== undefined) && (dataset.pointHitRadius === undefined)) {
					dataset.pointHitRadius = dataset.hitRadius;
				}
	
				x = xScale.getPixelForValue(typeof value === 'object' ? value : NaN, index, datasetIndex, me.chart.isCombo);
				y = reset ? yScale.getBasePixel() : me.calculatePointY(value, index, datasetIndex);
	
				// Utility
				point._xScale = xScale;
				point._yScale = yScale;
				point._datasetIndex = datasetIndex;
				point._index = index;
	
				// Desired view properties
				point._model = {
					x: x,
					y: y,
					skip: custom.skip || isNaN(x) || isNaN(y),
					// Appearance
					radius: custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointOptions.radius),
					pointStyle: custom.pointStyle || helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointOptions.pointStyle),
					backgroundColor: me.getPointBackgroundColor(point, index),
					borderColor: me.getPointBorderColor(point, index),
					borderWidth: me.getPointBorderWidth(point, index),
					tension: meta.dataset._model ? meta.dataset._model.tension : 0,
					steppedLine: meta.dataset._model ? meta.dataset._model.steppedLine : false,
					// Tooltip
					hitRadius: custom.hitRadius || helpers.getValueAtIndexOrDefault(dataset.pointHitRadius, index, pointOptions.hitRadius)
				};
			},
	
			calculatePointY: function(value, index, datasetIndex) {
				var me = this;
				var chart = me.chart;
				var meta = me.getMeta();
				var yScale = me.getScaleForId(meta.yAxisID);
				var sumPos = 0;
				var sumNeg = 0;
				var i, ds, dsMeta;
	
				if (yScale.options.stacked) {
					for (i = 0; i < datasetIndex; i++) {
						ds = chart.data.datasets[i];
						dsMeta = chart.getDatasetMeta(i);
						if (dsMeta.type === 'line' && chart.isDatasetVisible(i)) {
							var stackedRightValue = Number(yScale.getRightValue(ds.data[index]));
							if (stackedRightValue < 0) {
								sumNeg += stackedRightValue || 0;
							} else {
								sumPos += stackedRightValue || 0;
							}
						}
					}
	
					var rightValue = Number(yScale.getRightValue(value));
					if (rightValue < 0) {
						return yScale.getPixelForValue(sumNeg + rightValue);
					} else {
						return yScale.getPixelForValue(sumPos + rightValue);
					}
				}
	
				return yScale.getPixelForValue(value);
			},
	
			updateBezierControlPoints: function() {
				var me = this;
				var meta = me.getMeta();
				var area = me.chart.chartArea;
				var points = meta.data || [];
				var i, ilen, point, model, controlPoints;
	
				var needToCap = me.chart.options.elements.line.capBezierPoints;
				function capIfNecessary(pt, min, max) {
					return needToCap ? Math.max(Math.min(pt, max), min) : pt;
				}
	
				for (i=0, ilen=points.length; i<ilen; ++i) {
					point = points[i];
					model = point._model;
					controlPoints = helpers.splineCurve(
						helpers.previousItem(points, i)._model,
						model,
						helpers.nextItem(points, i)._model,
						meta.dataset._model.tension
					);
	
					model.controlPointPreviousX = capIfNecessary(controlPoints.previous.x, area.left, area.right);
					model.controlPointPreviousY = capIfNecessary(controlPoints.previous.y, area.top, area.bottom);
					model.controlPointNextX = capIfNecessary(controlPoints.next.x, area.left, area.right);
					model.controlPointNextY = capIfNecessary(controlPoints.next.y, area.top, area.bottom);
				}
			},
	
			draw: function(ease) {
				var me = this;
				var meta = me.getMeta();
				var points = meta.data || [];
				var easingDecimal = ease || 1;
				var i, ilen;
	
				// Transition Point Locations
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].transition(easingDecimal);
				}
	
				// Transition and Draw the line
				if (lineEnabled(me.getDataset(), me.chart.options)) {
					meta.dataset.transition(easingDecimal).draw();
				}
	
				// Draw the points
				for (i=0, ilen=points.length; i<ilen; ++i) {
					points[i].draw();
				}
			},
	
			setHoverStyle: function(point) {
				// Point
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;
	
				model.radius = custom.hoverRadius || helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
				model.backgroundColor = custom.hoverBackgroundColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth || helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
			},
	
			removeHoverStyle: function(point) {
				var me = this;
				var dataset = me.chart.data.datasets[point._datasetIndex];
				var index = point._index;
				var custom = point.custom || {};
				var model = point._model;
	
				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.radius !== undefined) && (dataset.pointRadius === undefined)) {
					dataset.pointRadius = dataset.radius;
				}
	
				model.radius = custom.radius || helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, me.chart.options.elements.point.radius);
				model.backgroundColor = me.getPointBackgroundColor(point, index);
				model.borderColor = me.getPointBorderColor(point, index);
				model.borderWidth = me.getPointBorderWidth(point, index);
			}
		});
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.polarArea = {
	
			scale: {
				type: "radialLinear",
				lineArc: true, // so that lines are circular
				ticks: {
					beginAtZero: true
				}
			},
	
			//Boolean - Whether to animate the rotation of the chart
			animation: {
				animateRotate: true,
				animateScale: true
			},
	
			startAngle: -0.5 * Math.PI,
			aspectRatio: 1,
			legendCallback: function(chart) {
				var text = [];
				text.push('<ul class="' + chart.id + '-legend">');
	
				var data = chart.data;
				var datasets = data.datasets;
				var labels = data.labels;
	
				if (datasets.length) {
					for (var i = 0; i < datasets[0].data.length; ++i) {
						text.push('<li><span style="background-color:' + datasets[0].backgroundColor[i] + '">');
						if (labels[i]) {
							text.push(labels[i]);
						}
						text.push('</span></li>');
					}
				}
	
				text.push('</ul>');
				return text.join("");
			},
			legend: {
				labels: {
					generateLabels: function(chart) {
						var data = chart.data;
						if (data.labels.length && data.datasets.length) {
							return data.labels.map(function(label, i) {
								var meta = chart.getDatasetMeta(0);
								var ds = data.datasets[0];
								var arc = meta.data[i];
								var custom = arc.custom || {};
								var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
								var arcOpts = chart.options.elements.arc;
								var fill = custom.backgroundColor ? custom.backgroundColor : getValueAtIndexOrDefault(ds.backgroundColor, i, arcOpts.backgroundColor);
								var stroke = custom.borderColor ? custom.borderColor : getValueAtIndexOrDefault(ds.borderColor, i, arcOpts.borderColor);
								var bw = custom.borderWidth ? custom.borderWidth : getValueAtIndexOrDefault(ds.borderWidth, i, arcOpts.borderWidth);
	
								return {
									text: label,
									fillStyle: fill,
									strokeStyle: stroke,
									lineWidth: bw,
									hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
	
									// Extra data used for toggling the correct item
									index: i
								};
							});
						} else {
							return [];
						}
					}
				},
	
				onClick: function(e, legendItem) {
					var index = legendItem.index;
					var chart = this.chart;
					var i, ilen, meta;
	
					for (i = 0, ilen = (chart.data.datasets || []).length; i < ilen; ++i) {
						meta = chart.getDatasetMeta(i);
						meta.data[index].hidden = !meta.data[index].hidden;
					}
	
					chart.update();
				}
			},
	
			// Need to override these to give a nice default
			tooltips: {
				callbacks: {
					title: function() {
						return '';
					},
					label: function(tooltipItem, data) {
						return data.labels[tooltipItem.index] + ': ' + tooltipItem.yLabel;
					}
				}
			}
		};
	
		Chart.controllers.polarArea = Chart.DatasetController.extend({
	
			dataElementType: Chart.elements.Arc,
	
			linkScales: helpers.noop,
	
			update: function(reset) {
				var me = this;
				var chart = me.chart;
				var chartArea = chart.chartArea;
				var meta = me.getMeta();
				var opts = chart.options;
				var arcOpts = opts.elements.arc;
				var minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
				chart.outerRadius = Math.max((minSize - arcOpts.borderWidth / 2) / 2, 0);
				chart.innerRadius = Math.max(opts.cutoutPercentage ? (chart.outerRadius / 100) * (opts.cutoutPercentage) : 1, 0);
				chart.radiusLength = (chart.outerRadius - chart.innerRadius) / chart.getVisibleDatasetCount();
	
				me.outerRadius = chart.outerRadius - (chart.radiusLength * me.index);
				me.innerRadius = me.outerRadius - chart.radiusLength;
	
				meta.count = me.countVisibleElements();
	
				helpers.each(meta.data, function(arc, index) {
					me.updateElement(arc, index, reset);
				});
			},
	
			updateElement: function(arc, index, reset) {
				var me = this;
				var chart = me.chart;
				var dataset = me.getDataset();
				var opts = chart.options;
				var animationOpts = opts.animation;
				var scale = chart.scale;
				var getValueAtIndexOrDefault = helpers.getValueAtIndexOrDefault;
				var labels = chart.data.labels;
	
				var circumference = me.calculateCircumference(dataset.data[index]);
				var centerX = scale.xCenter;
				var centerY = scale.yCenter;
	
				// If there is NaN data before us, we need to calculate the starting angle correctly.
				// We could be way more efficient here, but its unlikely that the polar area chart will have a lot of data
				var visibleCount = 0;
				var meta = me.getMeta();
				for (var i = 0; i < index; ++i) {
					if (!isNaN(dataset.data[i]) && !meta.data[i].hidden) {
						++visibleCount;
					}
				}
	
				//var negHalfPI = -0.5 * Math.PI;
				var datasetStartAngle = opts.startAngle;
				var distance = arc.hidden ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
				var startAngle = datasetStartAngle + (circumference * visibleCount);
				var endAngle = startAngle + (arc.hidden ? 0 : circumference);
	
				var resetRadius = animationOpts.animateScale ? 0 : scale.getDistanceFromCenterForValue(dataset.data[index]);
	
				helpers.extend(arc, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
					_scale: scale,
	
					// Desired view properties
					_model: {
						x: centerX,
						y: centerY,
						innerRadius: 0,
						outerRadius: reset ? resetRadius : distance,
						startAngle: reset && animationOpts.animateRotate ? datasetStartAngle : startAngle,
						endAngle: reset && animationOpts.animateRotate ? datasetStartAngle : endAngle,
						label: getValueAtIndexOrDefault(labels, index, labels[index])
					}
				});
	
				// Apply border and fill style
				me.removeHoverStyle(arc);
	
				arc.pivot();
			},
	
			removeHoverStyle: function(arc) {
				Chart.DatasetController.prototype.removeHoverStyle.call(this, arc, this.chart.options.elements.arc);
			},
	
			countVisibleElements: function() {
				var dataset = this.getDataset();
				var meta = this.getMeta();
				var count = 0;
	
				helpers.each(meta.data, function(element, index) {
					if (!isNaN(dataset.data[index]) && !element.hidden) {
						count++;
					}
				});
	
				return count;
			},
	
			calculateCircumference: function(value) {
				var count = this.getMeta().count;
				if (count > 0 && !isNaN(value)) {
					return (2 * Math.PI) / count;
				} else {
					return 0;
				}
			}
		});
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var helpers = Chart.helpers;
	
		Chart.defaults.radar = {
			scale: {
				type: "radialLinear"
			},
			elements: {
				line: {
					tension: 0 // no bezier in radar
				}
			}
		};
	
		Chart.controllers.radar = Chart.DatasetController.extend({
	
			datasetElementType: Chart.elements.Line,
	
			dataElementType: Chart.elements.Point,
	
			linkScales: helpers.noop,
	
			addElementAndReset: function(index) {
				Chart.DatasetController.prototype.addElementAndReset.call(this, index);
	
				// Make sure bezier control points are updated
				this.updateBezierControlPoints();
			},
	
			update: function(reset) {
				var me = this;
				var meta = me.getMeta();
				var line = meta.dataset;
				var points = meta.data;
				var custom = line.custom || {};
				var dataset = me.getDataset();
				var lineElementOptions = me.chart.options.elements.line;
				var scale = me.chart.scale;
	
				// Compatibility: If the properties are defined with only the old name, use those values
				if ((dataset.tension !== undefined) && (dataset.lineTension === undefined)) {
					dataset.lineTension = dataset.tension;
				}
	
				helpers.extend(meta.dataset, {
					// Utility
					_datasetIndex: me.index,
					// Data
					_children: points,
					_loop: true,
					// Model
					_model: {
						// Appearance
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.lineTension, lineElementOptions.tension),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : (dataset.backgroundColor || lineElementOptions.backgroundColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : (dataset.borderWidth || lineElementOptions.borderWidth),
						borderColor: custom.borderColor ? custom.borderColor : (dataset.borderColor || lineElementOptions.borderColor),
						fill: custom.fill ? custom.fill : (dataset.fill !== undefined ? dataset.fill : lineElementOptions.fill),
						borderCapStyle: custom.borderCapStyle ? custom.borderCapStyle : (dataset.borderCapStyle || lineElementOptions.borderCapStyle),
						borderDash: custom.borderDash ? custom.borderDash : (dataset.borderDash || lineElementOptions.borderDash),
						borderDashOffset: custom.borderDashOffset ? custom.borderDashOffset : (dataset.borderDashOffset || lineElementOptions.borderDashOffset),
						borderJoinStyle: custom.borderJoinStyle ? custom.borderJoinStyle : (dataset.borderJoinStyle || lineElementOptions.borderJoinStyle),
	
						// Scale
						scaleTop: scale.top,
						scaleBottom: scale.bottom,
						scaleZero: scale.getBasePosition()
					}
				});
	
				meta.dataset.pivot();
	
				// Update Points
				helpers.each(points, function(point, index) {
					me.updateElement(point, index, reset);
				}, me);
	
	
				// Update bezier control points
				me.updateBezierControlPoints();
			},
			updateElement: function(point, index, reset) {
				var me = this;
				var custom = point.custom || {};
				var dataset = me.getDataset();
				var scale = me.chart.scale;
				var pointElementOptions = me.chart.options.elements.point;
				var pointPosition = scale.getPointPositionForValue(index, dataset.data[index]);
	
				helpers.extend(point, {
					// Utility
					_datasetIndex: me.index,
					_index: index,
					_scale: scale,
	
					// Desired view properties
					_model: {
						x: reset ? scale.xCenter : pointPosition.x, // value not used in dataset scale, but we want a consistent API between scales
						y: reset ? scale.yCenter : pointPosition.y,
	
						// Appearance
						tension: custom.tension ? custom.tension : helpers.getValueOrDefault(dataset.tension, me.chart.options.elements.line.tension),
						radius: custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.pointRadius, index, pointElementOptions.radius),
						backgroundColor: custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor),
						borderColor: custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor),
						borderWidth: custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth),
						pointStyle: custom.pointStyle ? custom.pointStyle : helpers.getValueAtIndexOrDefault(dataset.pointStyle, index, pointElementOptions.pointStyle),
	
						// Tooltip
						hitRadius: custom.hitRadius ? custom.hitRadius : helpers.getValueAtIndexOrDefault(dataset.hitRadius, index, pointElementOptions.hitRadius)
					}
				});
	
				point._model.skip = custom.skip ? custom.skip : (isNaN(point._model.x) || isNaN(point._model.y));
			},
			updateBezierControlPoints: function() {
				var chartArea = this.chart.chartArea;
				var meta = this.getMeta();
	
				helpers.each(meta.data, function(point, index) {
					var model = point._model;
					var controlPoints = helpers.splineCurve(
						helpers.previousItem(meta.data, index, true)._model,
						model,
						helpers.nextItem(meta.data, index, true)._model,
						model.tension
					);
	
					// Prevent the bezier going outside of the bounds of the graph
					model.controlPointPreviousX = Math.max(Math.min(controlPoints.previous.x, chartArea.right), chartArea.left);
					model.controlPointPreviousY = Math.max(Math.min(controlPoints.previous.y, chartArea.bottom), chartArea.top);
	
					model.controlPointNextX = Math.max(Math.min(controlPoints.next.x, chartArea.right), chartArea.left);
					model.controlPointNextY = Math.max(Math.min(controlPoints.next.y, chartArea.bottom), chartArea.top);
	
					// Now pivot the point for animation
					point.pivot();
				});
			},
	
			draw: function(ease) {
				var meta = this.getMeta();
				var easingDecimal = ease || 1;
	
				// Transition Point Locations
				helpers.each(meta.data, function(point) {
					point.transition(easingDecimal);
				});
	
				// Transition and Draw the line
				meta.dataset.transition(easingDecimal).draw();
	
				// Draw the points
				helpers.each(meta.data, function(point) {
					point.draw();
				});
			},
	
			setHoverStyle: function(point) {
				// Point
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var custom = point.custom || {};
				var index = point._index;
				var model = point._model;
	
				model.radius = custom.hoverRadius ? custom.hoverRadius : helpers.getValueAtIndexOrDefault(dataset.pointHoverRadius, index, this.chart.options.elements.point.hoverRadius);
				model.backgroundColor = custom.hoverBackgroundColor ? custom.hoverBackgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBackgroundColor, index, helpers.getHoverColor(model.backgroundColor));
				model.borderColor = custom.hoverBorderColor ? custom.hoverBorderColor : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderColor, index, helpers.getHoverColor(model.borderColor));
				model.borderWidth = custom.hoverBorderWidth ? custom.hoverBorderWidth : helpers.getValueAtIndexOrDefault(dataset.pointHoverBorderWidth, index, model.borderWidth);
			},
	
			removeHoverStyle: function(point) {
				var dataset = this.chart.data.datasets[point._datasetIndex];
				var custom = point.custom || {};
				var index = point._index;
				var model = point._model;
				var pointElementOptions = this.chart.options.elements.point;
	
				model.radius = custom.radius ? custom.radius : helpers.getValueAtIndexOrDefault(dataset.radius, index, pointElementOptions.radius);
				model.backgroundColor = custom.backgroundColor ? custom.backgroundColor : helpers.getValueAtIndexOrDefault(dataset.pointBackgroundColor, index, pointElementOptions.backgroundColor);
				model.borderColor = custom.borderColor ? custom.borderColor : helpers.getValueAtIndexOrDefault(dataset.pointBorderColor, index, pointElementOptions.borderColor);
				model.borderWidth = custom.borderWidth ? custom.borderWidth : helpers.getValueAtIndexOrDefault(dataset.pointBorderWidth, index, pointElementOptions.borderWidth);
			}
		});
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		Chart.Bar = function(context, config) {
			config.type = 'bar';
	
			return new Chart(context, config);
		};
	
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		Chart.Bubble = function(context, config) {
			config.type = 'bubble';
			return new Chart(context, config);
		};
	
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		Chart.Doughnut = function(context, config) {
			config.type = 'doughnut';
	
			return new Chart(context, config);
		};
	
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		Chart.Line = function(context, config) {
			config.type = 'line';
	
			return new Chart(context, config);
		};
	
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		Chart.PolarArea = function(context, config) {
			config.type = 'polarArea';
	
			return new Chart(context, config);
		};
	
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
		
		Chart.Radar = function(context, config) {
			config.options = Chart.helpers.configMerge({ aspectRatio: 1 }, config.options);
			config.type = 'radar';
	
			return new Chart(context, config);
		};
	
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function(Chart) {
	
		var defaultConfig = {
			hover: {
				mode: 'single'
			},
	
			scales: {
				xAxes: [{
					type: "linear", // scatter should not use a category axis
					position: "bottom",
					id: "x-axis-1" // need an ID so datasets can reference the scale
				}],
				yAxes: [{
					type: "linear",
					position: "left",
					id: "y-axis-1"
				}]
			},
	
			tooltips: {
				callbacks: {
					title: function() {
						// Title doesn't make sense for scatter since we format the data as a point
						return '';
					},
					label: function(tooltipItem) {
						return '(' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
					}
				}
			}
		};
	
		// Register the default config for this type
		Chart.defaults.scatter = defaultConfig;
	
		// Scatter charts use line controllers
		Chart.controllers.scatter = Chart.controllers.line;
	
		Chart.Scatter = function(context, config) {
			config.type = 'scatter';
			return new Chart(context, config);
		};
	
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Validator = module.exports.Validator = __webpack_require__(47);
	
	module.exports.ValidatorResult = __webpack_require__(55).ValidatorResult;
	module.exports.ValidationError = __webpack_require__(55).ValidationError;
	module.exports.SchemaError = __webpack_require__(55).SchemaError;
	
	module.exports.validate = function (instance, schema, options) {
	  var v = new Validator();
	  return v.validate(instance, schema, options);
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var urilib = __webpack_require__(48);
	
	var attribute = __webpack_require__(54);
	var helpers = __webpack_require__(55);
	var ValidatorResult = helpers.ValidatorResult;
	var SchemaError = helpers.SchemaError;
	var SchemaContext = helpers.SchemaContext;
	
	/**
	 * Creates a new Validator object
	 * @name Validator
	 * @constructor
	 */
	var Validator = function Validator () {
	  // Allow a validator instance to override global custom formats or to have their
	  // own custom formats.
	  this.customFormats = Object.create(Validator.prototype.customFormats);
	  this.schemas = {};
	  this.unresolvedRefs = [];
	
	  // Use Object.create to make this extensible without Validator instances stepping on each other's toes.
	  this.types = Object.create(types);
	  this.attributes = Object.create(attribute.validators);
	};
	
	// Allow formats to be registered globally.
	Validator.prototype.customFormats = {};
	
	// Hint at the presence of a property
	Validator.prototype.schemas = null;
	Validator.prototype.types = null;
	Validator.prototype.attributes = null;
	Validator.prototype.unresolvedRefs = null;
	
	/**
	 * Adds a schema with a certain urn to the Validator instance.
	 * @param schema
	 * @param urn
	 * @return {Object}
	 */
	Validator.prototype.addSchema = function addSchema (schema, uri) {
	  if (!schema) {
	    return null;
	  }
	  var ourUri = uri || schema.id;
	  this.addSubSchema(ourUri, schema);
	  if (ourUri) {
	    this.schemas[ourUri] = schema;
	  }
	  return this.schemas[ourUri];
	};
	
	Validator.prototype.addSubSchema = function addSubSchema(baseuri, schema) {
	  if(!schema || typeof schema!='object') return;
	  // Mark all referenced schemas so we can tell later which schemas are referred to, but never defined
	  if(schema.$ref){
	    var resolvedUri = urilib.resolve(baseuri, schema.$ref);
	    // Only mark unknown schemas as unresolved
	    if (this.schemas[resolvedUri] === undefined) {
	      this.schemas[resolvedUri] = null;
	      this.unresolvedRefs.push(resolvedUri);
	    }
	    return;
	  }
	  var ourUri = schema.id && urilib.resolve(baseuri, schema.id);
	  var ourBase = ourUri || baseuri;
	  if (ourUri) {
	    if(this.schemas[ourUri]){
	      if(!helpers.deepCompareStrict(this.schemas[ourUri], schema)){
	        throw new Error('Schema <'+schema+'> already exists with different definition');
	      }
	      return this.schemas[ourUri];
	    }
	    this.schemas[ourUri] = schema;
	    var documentUri = ourUri.replace(/^([^#]*)#$/, '$1');
	    this.schemas[documentUri] = schema;
	  }
	  this.addSubSchemaArray(ourBase, ((schema.items instanceof Array)?schema.items:[schema.items]));
	  this.addSubSchemaArray(ourBase, ((schema.extends instanceof Array)?schema.extends:[schema.extends]));
	  this.addSubSchema(ourBase, schema.additionalItems);
	  this.addSubSchemaObject(ourBase, schema.properties);
	  this.addSubSchema(ourBase, schema.additionalProperties);
	  this.addSubSchemaObject(ourBase, schema.definitions);
	  this.addSubSchemaObject(ourBase, schema.patternProperties);
	  this.addSubSchemaObject(ourBase, schema.dependencies);
	  this.addSubSchemaArray(ourBase, schema.disallow);
	  this.addSubSchemaArray(ourBase, schema.allOf);
	  this.addSubSchemaArray(ourBase, schema.anyOf);
	  this.addSubSchemaArray(ourBase, schema.oneOf);
	  this.addSubSchema(ourBase, schema.not);
	  return this.schemas[ourUri];
	};
	
	Validator.prototype.addSubSchemaArray = function addSubSchemaArray(baseuri, schemas) {
	  if(!(schemas instanceof Array)) return;
	  for(var i=0; i<schemas.length; i++){
	    this.addSubSchema(baseuri, schemas[i]);
	  }
	};
	
	Validator.prototype.addSubSchemaObject = function addSubSchemaArray(baseuri, schemas) {
	  if(!schemas || typeof schemas!='object') return;
	  for(var p in schemas){
	    this.addSubSchema(baseuri, schemas[p]);
	  }
	};
	
	
	
	/**
	 * Sets all the schemas of the Validator instance.
	 * @param schemas
	 */
	Validator.prototype.setSchemas = function setSchemas (schemas) {
	  this.schemas = schemas;
	};
	
	/**
	 * Returns the schema of a certain urn
	 * @param urn
	 */
	Validator.prototype.getSchema = function getSchema (urn) {
	  return this.schemas[urn];
	};
	
	/**
	 * Validates instance against the provided schema
	 * @param instance
	 * @param schema
	 * @param [options]
	 * @param [ctx]
	 * @return {Array}
	 */
	Validator.prototype.validate = function validate (instance, schema, options, ctx) {
	  if (!options) {
	    options = {};
	  }
	  var propertyName = options.propertyName || 'instance';
	  // This will work so long as the function at uri.resolve() will resolve a relative URI to a relative URI
	  var base = urilib.resolve(options.base||'/', schema.id||'');
	  if(!ctx){
	    ctx = new SchemaContext(schema, options, propertyName, base, Object.create(this.schemas));
	    if (!ctx.schemas[base]) {
	      ctx.schemas[base] = schema;
	    }
	  }
	  if (schema) {
	    var result = this.validateSchema(instance, schema, options, ctx);
	    if (!result) {
	      throw new Error('Result undefined');
	    }
	    return result;
	  }
	  throw new SchemaError('no schema specified', schema);
	};
	
	/**
	 * Validates an instance against the schema (the actual work horse)
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @private
	 * @return {ValidatorResult}
	 */
	Validator.prototype.validateSchema = function validateSchema (instance, schema, options, ctx) {
	  var self = this;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!schema) {
	    throw new Error("schema is undefined");
	  }
	
	  /**
	  * @param Object schema
	  * @return mixed schema uri or false
	  */
	  function shouldResolve(schema) {
	    var ref = (typeof schema === 'string') ? schema : schema.$ref;
	    if (typeof ref=='string') return ref;
	    return false;
	  }
	  /**
	  * @param Object schema
	  * @param SchemaContext ctx
	  * @returns Object schema or resolved schema
	  */
	  function resolve(schema, ctx) {
	    var ref;
	    if(ref = shouldResolve(schema)) {
	      return self.resolve(schema, ref, ctx).subschema;
	    }
	    return schema;
	  }
	
	  if (schema['extends']) {
	    if (schema['extends'] instanceof Array) {
	      schema['extends'].forEach(function (s) {
	        schema = helpers.deepMerge(schema, resolve(s, ctx));
	      });
	    } else {
	      schema = helpers.deepMerge(schema, resolve(schema['extends'], ctx));
	    }
	  }
	
	  var switchSchema;
	  if (switchSchema = shouldResolve(schema)) {
	    var resolved = this.resolve(schema, switchSchema, ctx);
	    var subctx = new SchemaContext(resolved.subschema, options, ctx.propertyPath, resolved.switchSchema, ctx.schemas);
	    return this.validateSchema(instance, resolved.subschema, options, subctx);
	  }
	
	  var skipAttributes = options && options.skipAttributes || [];
	  // Validate each schema attribute against the instance
	  for (var key in schema) {
	    if (!attribute.ignoreProperties[key] && skipAttributes.indexOf(key) < 0) {
	      var validatorErr = null;
	      var validator = self.attributes[key];
	      if (validator) {
	        validatorErr = validator.call(self, instance, schema, options, ctx);
	      } else if (options.allowUnknownAttributes === false) {
	        // This represents an error with the schema itself, not an invalid instance
	        throw new SchemaError("Unsupported attribute: " + key, schema);
	      }
	      if (validatorErr) {
	        result.importErrors(validatorErr);
	      }
	    }
	  }
	
	  if (typeof options.rewrite == 'function') {
	    var value = options.rewrite.call(this, instance, schema, options, ctx);
	    result.instance = value;
	  }
	  return result;
	};
	
	/**
	* @private
	* @param Object schema
	* @param Object switchSchema
	* @param SchemaContext ctx
	* @return Object resolved schemas {subschema:String, switchSchema: String}
	* @thorws SchemaError
	*/
	Validator.prototype.resolve = function resolve (schema, switchSchema, ctx) {
	  switchSchema = ctx.resolve(switchSchema);
	  // First see if the schema exists under the provided URI
	  if (ctx.schemas[switchSchema]) {
	    return {subschema: ctx.schemas[switchSchema], switchSchema: switchSchema};
	  }
	  // Else try walking the property pointer
	  var parsed = urilib.parse(switchSchema);
	  var fragment = parsed && parsed.hash;
	  var document = fragment && fragment.length && switchSchema.substr(0, switchSchema.length - fragment.length);
	  if (!document || !ctx.schemas[document]) {
	    throw new SchemaError("no such schema <" + switchSchema + ">", schema);
	  }
	  var subschema = helpers.objectGetPath(ctx.schemas[document], fragment.substr(1));
	  if(subschema===undefined){
	    throw new SchemaError("no such schema " + fragment + " located in <" + document + ">", schema);
	  }
	  return {subschema: subschema, switchSchema: switchSchema};
	};
	
	/**
	 * Tests whether the instance if of a certain type.
	 * @private
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @param type
	 * @return {boolean}
	 */
	Validator.prototype.testType = function validateType (instance, schema, options, ctx, type) {
	  if (typeof this.types[type] == 'function') {
	    return this.types[type].call(this, instance);
	  }
	  if (type && typeof type == 'object') {
	    var res = this.validateSchema(instance, type, options, ctx);
	    return res === undefined || !(res && res.errors.length);
	  }
	  // Undefined or properties not on the list are acceptable, same as not being defined
	  return true;
	};
	
	var types = Validator.prototype.types = {};
	types.string = function testString (instance) {
	  return typeof instance == 'string';
	};
	types.number = function testNumber (instance) {
	  // isFinite returns false for NaN, Infinity, and -Infinity
	  return typeof instance == 'number' && isFinite(instance);
	};
	types.integer = function testInteger (instance) {
	  return (typeof instance == 'number') && instance % 1 === 0;
	};
	types.boolean = function testBoolean (instance) {
	  return typeof instance == 'boolean';
	};
	types.array = function testArray (instance) {
	  return instance instanceof Array;
	};
	types['null'] = function testNull (instance) {
	  return instance === null;
	};
	types.date = function testDate (instance) {
	  return instance instanceof Date;
	};
	types.any = function testAny (instance) {
	  return true;
	};
	types.object = function testObject (instance) {
	  // TODO: fix this - see #15
	  return instance && (typeof instance) === 'object' && !(instance instanceof Array) && !(instance instanceof Date);
	};
	
	module.exports = Validator;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	var punycode = __webpack_require__(49);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(51);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a puny coded representation of "domain".
	      // It only converts the part of the domain name that
	      // has non ASCII characters. I.e. it dosent matter if
	      // you call it with a domain that already is in ASCII.
	      var domainArray = this.hostname.split('.');
	      var newOut = [];
	      for (var i = 0; i < domainArray.length; ++i) {
	        var s = domainArray[i];
	        newOut.push(s.match(/[^A-Za-z0-9_-]/) ?
	            'xn--' + punycode.encode(s) : s);
	      }
	      this.hostname = newOut.join('.');
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  Object.keys(this).forEach(function(k) {
	    result[k] = this[k];
	  }, this);
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    Object.keys(relative).forEach(function(k) {
	      if (k !== 'protocol')
	        result[k] = relative[k];
	    });
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      Object.keys(relative).forEach(function(k) {
	        result[k] = relative[k];
	      });
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especialy happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!isNull(result.pathname) || !isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host) && (last === '.' || last === '..') ||
	      last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last == '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especialy happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!isNull(result.pathname) || !isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};
	
	function isString(arg) {
	  return typeof arg === "string";
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isNull(arg) {
	  return arg === null;
	}
	function isNullOrUndefined(arg) {
	  return  arg == null;
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(50)(module), (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(52);
	exports.encode = exports.stringify = __webpack_require__(53);


/***/ },
/* 52 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var helpers = __webpack_require__(55);
	
	/** @type ValidatorResult */
	var ValidatorResult = helpers.ValidatorResult;
	/** @type SchemaError */
	var SchemaError = helpers.SchemaError;
	
	var attribute = {};
	
	attribute.ignoreProperties = {
	  // informative properties
	  'id': true,
	  'default': true,
	  'description': true,
	  'title': true,
	  // arguments to other properties
	  'exclusiveMinimum': true,
	  'exclusiveMaximum': true,
	  'additionalItems': true,
	  // special-handled properties
	  '$schema': true,
	  '$ref': true,
	  'extends': true
	};
	
	/**
	 * @name validators
	 */
	var validators = attribute.validators = {};
	
	/**
	 * Validates whether the instance if of a certain type
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {ValidatorResult|null}
	 */
	validators.type = function validateType (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var types = (schema.type instanceof Array) ? schema.type : [schema.type];
	  if (!types.some(this.testType.bind(this, instance, schema, options, ctx))) {
	    var list = types.map(function (v) {
	      return v.id && ('<' + v.id + '>') || (v+'');
	    });
	    result.addError({
	      name: 'type',
	      argument: list,
	      message: "is not of a type(s) " + list,
	    });
	  }
	  return result;
	};
	
	function testSchema(instance, options, ctx, schema){
	  return this.validateSchema(instance, schema, options, ctx).valid;
	}
	
	/**
	 * Validates whether the instance matches some of the given schemas
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {ValidatorResult|null}
	 */
	validators.anyOf = function validateAnyOf (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(schema.anyOf instanceof Array)){
	    throw new SchemaError("anyOf must be an array");
	  }
	  if (!schema.anyOf.some(testSchema.bind(this, instance, options, ctx))) {
	    var list = schema.anyOf.map(function (v, i) {
	      return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
	    });
	    result.addError({
	      name: 'anyOf',
	      argument: list,
	      message: "is not any of " + list.join(','),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance matches every given schema
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null}
	 */
	validators.allOf = function validateAllOf (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  if (!(schema.allOf instanceof Array)){
	    throw new SchemaError("allOf must be an array");
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var self = this;
	  schema.allOf.forEach(function(v, i){
	    var valid = self.validateSchema(instance, v, options, ctx);
	    if(!valid.valid){
	      var msg = (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
	      result.addError({
	        name: 'allOf',
	        argument: { id: msg, length: valid.errors.length, valid: valid },
	        message: 'does not match allOf schema ' + msg + ' with ' + valid.errors.length + ' error[s]:',
	      });
	      result.importErrors(valid);
	    }
	  });
	  return result;
	};
	
	/**
	 * Validates whether the instance matches exactly one of the given schemas
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null}
	 */
	validators.oneOf = function validateOneOf (instance, schema, options, ctx) {
	  // Ignore undefined instances
	  if (instance === undefined) {
	    return null;
	  }
	  if (!(schema.oneOf instanceof Array)){
	    throw new SchemaError("oneOf must be an array");
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var count = schema.oneOf.filter(testSchema.bind(this, instance, options, ctx)).length;
	  var list = schema.oneOf.map(function (v, i) {
	    return (v.id && ('<' + v.id + '>')) || (v.title && JSON.stringify(v.title)) || (v['$ref'] && ('<' + v['$ref'] + '>')) || '[subschema '+i+']';
	  });
	  if (count!==1) {
	    result.addError({
	      name: 'oneOf',
	      argument: list,
	      message: "is not exactly one from " + list.join(','),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates properties
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.properties = function validateProperties (instance, schema, options, ctx) {
	  if(instance === undefined || !(instance instanceof Object)) return;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var properties = schema.properties || {};
	  for (var property in properties) {
	    var prop = (instance || undefined) && instance[property];
	    var res = this.validateSchema(prop, properties[property], options, ctx.makeChild(properties[property], property));
	    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
	    result.importErrors(res);
	  }
	  return result;
	};
	
	/**
	 * Test a specific property within in instance against the additionalProperties schema attribute
	 * This ignores properties with definitions in the properties schema attribute, but no other attributes.
	 * If too many more types of property-existance tests pop up they may need their own class of tests (like `type` has)
	 * @private
	 * @return {boolean}
	 */
	function testAdditionalProperty (instance, schema, options, ctx, property, result) {
	  if (schema.properties && schema.properties[property] !== undefined) {
	    return;
	  }
	  if (schema.additionalProperties === false) {
	    result.addError({
	      name: 'additionalProperties',
	      argument: property,
	      message: "additionalProperty " + JSON.stringify(property) + " exists in instance when not allowed",
	    });
	  } else {
	    var additionalProperties = schema.additionalProperties || {};
	    var res = this.validateSchema(instance[property], additionalProperties, options, ctx.makeChild(additionalProperties, property));
	    if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
	    result.importErrors(res);
	  }
	}
	
	/**
	 * Validates patternProperties
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.patternProperties = function validatePatternProperties (instance, schema, options, ctx) {
	  if(instance === undefined) return;
	  if(!this.types.object(instance)) return;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var patternProperties = schema.patternProperties || {};
	
	  for (var property in instance) {
	    var test = true;
	    for (var pattern in patternProperties) {
	      var expr = new RegExp(pattern);
	      if (!expr.test(property)) {
	        continue;
	      }
	      test = false;
	      var res = this.validateSchema(instance[property], patternProperties[pattern], options, ctx.makeChild(patternProperties[pattern], property));
	      if(res.instance !== result.instance[property]) result.instance[property] = res.instance;
	      result.importErrors(res);
	    }
	    if (test) {
	      testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
	    }
	  }
	
	  return result;
	};
	
	/**
	 * Validates additionalProperties
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.additionalProperties = function validateAdditionalProperties (instance, schema, options, ctx) {
	  if(instance === undefined) return;
	  if(!this.types.object(instance)) return;
	  // if patternProperties is defined then we'll test when that one is called instead
	  if (schema.patternProperties) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  for (var property in instance) {
	    testAdditionalProperty.call(this, instance, schema, options, ctx, property, result);
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minProperties = function validateMinProperties (instance, schema, options, ctx) {
	  if (!instance || typeof instance !== 'object') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var keys = Object.keys(instance);
	  if (!(keys.length >= schema.minProperties)) {
	    result.addError({
	      name: 'minProperties',
	      argument: schema.minProperties,
	      message: "does not meet minimum property length of " + schema.minProperties,
	    })
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maxProperties = function validateMaxProperties (instance, schema, options, ctx) {
	  if (!instance || typeof instance !== 'object') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var keys = Object.keys(instance);
	  if (!(keys.length <= schema.maxProperties)) {
	    result.addError({
	      name: 'maxProperties',
	      argument: schema.maxProperties,
	      message: "does not meet maximum property length of " + schema.maxProperties,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates items when instance is an array
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.items = function validateItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var self = this;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance === undefined || !schema.items) {
	    return result;
	  }
	  instance.every(function (value, i) {
	    var items = (schema.items instanceof Array) ? (schema.items[i] || schema.additionalItems) : schema.items;
	    if (items === undefined) {
	      return true;
	    }
	    if (items === false) {
	      result.addError({
	        name: 'items',
	        message: "additionalItems not permitted",
	      });
	      return false;
	    }
	    var res = self.validateSchema(value, items, options, ctx.makeChild(items, i));
	    if(res.instance !== result.instance[i]) result.instance[i] = res.instance;
	    result.importErrors(res);
	    return true;
	  });
	  return result;
	};
	
	/**
	 * Validates minimum and exclusiveMinimum when the type of the instance value is a number.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minimum = function validateMinimum (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var valid = true;
	  if (schema.exclusiveMinimum && schema.exclusiveMinimum === true) {
	    valid = instance > schema.minimum;
	  } else {
	    valid = instance >= schema.minimum;
	  }
	  if (!valid) {
	    result.addError({
	      name: 'minimum',
	      argument: schema.minimum,
	      message: "must have a minimum value of " + schema.minimum,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates maximum and exclusiveMaximum when the type of the instance value is a number.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maximum = function validateMaximum (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var valid;
	  if (schema.exclusiveMaximum && schema.exclusiveMaximum === true) {
	    valid = instance < schema.maximum;
	  } else {
	    valid = instance <= schema.maximum;
	  }
	  if (!valid) {
	    result.addError({
	      name: 'maximum',
	      argument: schema.maximum,
	      message: "must have a maximum value of " + schema.maximum,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates divisibleBy when the type of the instance value is a number.
	 * Of course, this is susceptible to floating point error since it compares the floating points
	 * and not the JSON byte sequences to arbitrary precision.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.divisibleBy = function validateDivisibleBy (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	
	  if (schema.divisibleBy == 0) {
	    throw new SchemaError("divisibleBy cannot be zero");
	  }
	
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance / schema.divisibleBy % 1) {
	    result.addError({
	      name: 'divisibleBy',
	      argument: schema.divisibleBy,
	      message: "is not divisible by (multiple of) " + JSON.stringify(schema.divisibleBy),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates divisibleBy when the type of the instance value is a number.
	 * Of course, this is susceptible to floating point error since it compares the floating points
	 * and not the JSON byte sequences to arbitrary precision.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.multipleOf = function validateMultipleOf (instance, schema, options, ctx) {
	  if (typeof instance !== 'number') {
	    return null;
	  }
	
	  if (schema.multipleOf == 0) {
	    throw new SchemaError("multipleOf cannot be zero");
	  }
	
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance / schema.multipleOf % 1) {
	    result.addError({
	      name: 'multipleOf',
	      argument:  schema.multipleOf,
	      message: "is not a multiple of (divisible by) " + JSON.stringify(schema.multipleOf),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is present.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.required = function validateRequired (instance, schema, options, ctx) {
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (instance === undefined && schema.required === true) {
	    result.addError({
	      name: 'required',
	      message: "is required"
	    });
	  } else if (instance && typeof instance==='object' && Array.isArray(schema.required)) {
	    schema.required.forEach(function(n){
	      if(instance[n]===undefined){
	        result.addError({
	          name: 'required',
	          argument: n,
	          message: "requires property " + JSON.stringify(n),
	        });
	      }
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value matches the regular expression, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.pattern = function validatePattern (instance, schema, options, ctx) {
	  if (typeof instance !== 'string') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!instance.match(schema.pattern)) {
	    result.addError({
	      name: 'pattern',
	      argument: schema.pattern,
	      message: "does not match pattern " + JSON.stringify(schema.pattern),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is of a certain defined format or a custom
	 * format.
	 * The following formats are supported for string types:
	 *   - date-time
	 *   - date
	 *   - time
	 *   - ip-address
	 *   - ipv6
	 *   - uri
	 *   - color
	 *   - host-name
	 *   - alpha
	 *   - alpha-numeric
	 *   - utc-millisec
	 * @param instance
	 * @param schema
	 * @param [options]
	 * @param [ctx]
	 * @return {String|null}
	 */
	validators.format = function validateFormat (instance, schema, options, ctx) {
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!result.disableFormat && !helpers.isFormat(instance, schema.format, this)) {
	    result.addError({
	      name: 'format',
	      argument: schema.format,
	      message: "does not conform to the " + JSON.stringify(schema.format) + " format",
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at least of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minLength = function validateMinLength (instance, schema, options, ctx) {
	  if (!(typeof instance === 'string')) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length >= schema.minLength)) {
	    result.addError({
	      name: 'minLength',
	      argument: schema.minLength,
	      message: "does not meet minimum length of " + schema.minLength,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is at most of a certain length, when the instance value is a string.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maxLength = function validateMaxLength (instance, schema, options, ctx) {
	  if (!(typeof instance === 'string')) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length <= schema.maxLength)) {
	    result.addError({
	      name: 'maxLength',
	      argument: schema.maxLength,
	      message: "does not meet maximum length of " + schema.maxLength,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether instance contains at least a minimum number of items, when the instance is an Array.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.minItems = function validateMinItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length >= schema.minItems)) {
	    result.addError({
	      name: 'minItems',
	      argument: schema.minItems,
	      message: "does not meet minimum length of " + schema.minItems,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether instance contains no more than a maximum number of items, when the instance is an Array.
	 * @param instance
	 * @param schema
	 * @return {String|null}
	 */
	validators.maxItems = function validateMaxItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance.length <= schema.maxItems)) {
	    result.addError({
	      name: 'maxItems',
	      argument: schema.maxItems,
	      message: "does not meet maximum length of " + schema.maxItems,
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates that every item in an instance array is unique, when instance is an array
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {String|null|ValidatorResult}
	 */
	validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!(instance instanceof Array)) {
	    return result;
	  }
	  function testArrays (v, i, a) {
	    for (var j = i + 1; j < a.length; j++) if (helpers.deepCompareStrict(v, a[j])) {
	      return false;
	    }
	    return true;
	  }
	  if (!instance.every(testArrays)) {
	    result.addError({
	      name: 'uniqueItems',
	      message: "contains duplicate item",
	    });
	  }
	  return result;
	};
	
	/**
	 * Deep compares arrays for duplicates
	 * @param v
	 * @param i
	 * @param a
	 * @private
	 * @return {boolean}
	 */
	function testArrays (v, i, a) {
	  var j, len = a.length;
	  for (j = i + 1, len; j < len; j++) {
	    if (helpers.deepCompareStrict(v, a[j])) {
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Validates whether there are no duplicates, when the instance is an Array.
	 * @param instance
	 * @return {String|null}
	 */
	validators.uniqueItems = function validateUniqueItems (instance, schema, options, ctx) {
	  if (!(instance instanceof Array)) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!instance.every(testArrays)) {
	    result.addError({
	      name: 'uniqueItems',
	      message: "contains duplicate item",
	    });
	  }
	  return result;
	};
	
	/**
	 * Validate for the presence of dependency properties, if the instance is an object.
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {null|ValidatorResult}
	 */
	validators.dependencies = function validateDependencies (instance, schema, options, ctx) {
	  if (!instance || typeof instance != 'object') {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  for (var property in schema.dependencies) {
	    if (instance[property] === undefined) {
	      continue;
	    }
	    var dep = schema.dependencies[property];
	    var childContext = ctx.makeChild(dep, property);
	    if (typeof dep == 'string') {
	      dep = [dep];
	    }
	    if (dep instanceof Array) {
	      dep.forEach(function (prop) {
	        if (instance[prop] === undefined) {
	          result.addError({
	            // FIXME there's two different "dependencies" errors here with slightly different outputs
	            // Can we make these the same? Or should we create different error types?
	            name: 'dependencies',
	            argument: childContext.propertyPath,
	            message: "property " + prop + " not found, required by " + childContext.propertyPath,
	          });
	        }
	      });
	    } else {
	      var res = this.validateSchema(instance, dep, options, childContext);
	      if(result.instance !== res.instance) result.instance = res.instance;
	      if (res && res.errors.length) {
	        result.addError({
	          name: 'dependencies',
	          argument: childContext.propertyPath,
	          message: "does not meet dependency required by " + childContext.propertyPath,
	        });
	        result.importErrors(res);
	      }
	    }
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance value is one of the enumerated values.
	 *
	 * @param instance
	 * @param schema
	 * @return {ValidatorResult|null}
	 */
	validators['enum'] = function validateEnum (instance, schema, options, ctx) {
	  if (!(schema['enum'] instanceof Array)) {
	    throw new SchemaError("enum expects an array", schema);
	  }
	  if (instance === undefined) {
	    return null;
	  }
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  if (!schema['enum'].some(helpers.deepCompareStrict.bind(null, instance))) {
	    result.addError({
	      name: 'enum',
	      argument: schema['enum'],
	      message: "is not one of enum values: " + schema['enum'].join(','),
	    });
	  }
	  return result;
	};
	
	/**
	 * Validates whether the instance if of a prohibited type.
	 * @param instance
	 * @param schema
	 * @param options
	 * @param ctx
	 * @return {null|ValidatorResult}
	 */
	validators.not = validators.disallow = function validateNot (instance, schema, options, ctx) {
	  var self = this;
	  if(instance===undefined) return null;
	  var result = new ValidatorResult(instance, schema, options, ctx);
	  var notTypes = schema.not || schema.disallow;
	  if(!notTypes) return null;
	  if(!(notTypes instanceof Array)) notTypes=[notTypes];
	  notTypes.forEach(function (type) {
	    if (self.testType(instance, schema, options, ctx, type)) {
	      var schemaId = type && type.id && ('<' + type.id + '>') || type;
	      result.addError({
	        name: 'not',
	        argument: schemaId,
	        message: "is of prohibited type " + schemaId,
	      });
	    }
	  });
	  return result;
	};
	
	module.exports = attribute;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var uri = __webpack_require__(48);
	
	var ValidationError = exports.ValidationError = function ValidationError (message, instance, schema, propertyPath, name, argument) {
	  if (propertyPath) {
	    this.property = propertyPath;
	  }
	  if (message) {
	    this.message = message;
	  }
	  if (schema) {
	    if (schema.id) {
	      this.schema = schema.id;
	    } else {
	      this.schema = schema;
	    }
	  }
	  if (instance) {
	    this.instance = instance;
	  }
	  this.name = name;
	  this.argument = argument;
	  this.stack = this.toString();
	};
	
	ValidationError.prototype.toString = function toString() {
	  return this.property + ' ' + this.message;
	};
	
	var ValidatorResult = exports.ValidatorResult = function ValidatorResult(instance, schema, options, ctx) {
	  this.instance = instance;
	  this.schema = schema;
	  this.propertyPath = ctx.propertyPath;
	  this.errors = [];
	  this.throwError = options && options.throwError;
	  this.disableFormat = options && options.disableFormat === true;
	};
	
	ValidatorResult.prototype.addError = function addError(detail) {
	  var err;
	  if (typeof detail == 'string') {
	    err = new ValidationError(detail, this.instance, this.schema, this.propertyPath);
	  } else {
	    if (!detail) throw new Error('Missing error detail');
	    if (!detail.message) throw new Error('Missing error message');
	    if (!detail.name) throw new Error('Missing validator type');
	    err = new ValidationError(detail.message, this.instance, this.schema, this.propertyPath, detail.name, detail.argument);
	  }
	
	  if (this.throwError) {
	    throw err;
	  }
	  this.errors.push(err);
	  return err;
	};
	
	ValidatorResult.prototype.importErrors = function importErrors(res) {
	  if (typeof res == 'string' || (res && res.validatorType)) {
	    this.addError(res);
	  } else if (res && res.errors) {
	    var errs = this.errors;
	    res.errors.forEach(function (v) {
	      errs.push(v);
	    });
	  }
	};
	
	ValidatorResult.prototype.toString = function toString(res) {
	  return this.errors.map(function(v,i){ return i+': '+v.toString()+'\n'; }).join('');
	};
	
	Object.defineProperty(ValidatorResult.prototype, "valid", { get: function() {
	  return !this.errors.length;
	} });
	
	/**
	 * Describes a problem with a Schema which prevents validation of an instance
	 * @name SchemaError
	 * @constructor
	 */
	var SchemaError = exports.SchemaError = function SchemaError (msg, schema) {
	  this.message = msg;
	  this.schema = schema;
	  Error.call(this, msg);
	  Error.captureStackTrace(this, SchemaError);
	};
	SchemaError.prototype = Object.create(Error.prototype,
	  { constructor: {value: SchemaError, enumerable: false}
	  , name: {value: 'SchemaError', enumerable: false}
	  });
	
	var SchemaContext = exports.SchemaContext = function SchemaContext (schema, options, propertyPath, base, schemas) {
	  this.schema = schema;
	  this.options = options;
	  this.propertyPath = propertyPath;
	  this.base = base;
	  this.schemas = schemas;
	};
	
	SchemaContext.prototype.resolve = function resolve (target) {
	  return uri.resolve(this.base, target);
	};
	
	SchemaContext.prototype.makeChild = function makeChild(schema, propertyName){
	  var propertyPath = (propertyName===undefined) ? this.propertyPath : this.propertyPath+makeSuffix(propertyName);
	  var base = uri.resolve(this.base, schema.id||'');
	  var ctx = new SchemaContext(schema, this.options, propertyPath, base, Object.create(this.schemas));
	  if(schema.id && !ctx.schemas[base]){
	    ctx.schemas[base] = schema;
	  }
	  return ctx;
	}
	
	var FORMAT_REGEXPS = exports.FORMAT_REGEXPS = {
	  'date-time': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])[tT ](2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])(\.\d+)?([zZ]|[+-]([0-5][0-9]):(60|[0-5][0-9]))$/,
	  'date': /^\d{4}-(?:0[0-9]{1}|1[0-2]{1})-(3[01]|0[1-9]|[12][0-9])$/,
	  'time': /^(2[0-4]|[01][0-9]):([0-5][0-9]):(60|[0-5][0-9])$/,
	
	  'email': /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/,
	  'ip-address': /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
	  'ipv6': /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,
	  'uri': /^[a-zA-Z][a-zA-Z0-9+-.]*:[^\s]*$/,
	
	  'color': /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/,
	
	  // hostname regex from: http://stackoverflow.com/a/1420225/5628
	  'hostname': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
	  'host-name': /^(?=.{1,255}$)[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|-){0,61}[0-9A-Za-z])?)*\.?$/,
	
	  'alpha': /^[a-zA-Z]+$/,
	  'alphanumeric': /^[a-zA-Z0-9]+$/,
	  'utc-millisec': function (input) {
	    return (typeof input === 'string') && parseFloat(input) === parseInt(input, 10) && !isNaN(input);
	  },
	  'regex': function (input) {
	    var result = true;
	    try {
	      new RegExp(input);
	    } catch (e) {
	      result = false;
	    }
	    return result;
	  },
	  'style': /\s*(.+?):\s*([^;]+);?/g,
	  'phone': /^\+(?:[0-9] ?){6,14}[0-9]$/
	};
	
	FORMAT_REGEXPS.regexp = FORMAT_REGEXPS.regex;
	FORMAT_REGEXPS.pattern = FORMAT_REGEXPS.regex;
	FORMAT_REGEXPS.ipv4 = FORMAT_REGEXPS['ip-address'];
	
	exports.isFormat = function isFormat (input, format, validator) {
	  if (typeof input === 'string' && FORMAT_REGEXPS[format] !== undefined) {
	    if (FORMAT_REGEXPS[format] instanceof RegExp) {
	      return FORMAT_REGEXPS[format].test(input);
	    }
	    if (typeof FORMAT_REGEXPS[format] === 'function') {
	      return FORMAT_REGEXPS[format](input);
	    }
	  } else if (validator && validator.customFormats &&
	      typeof validator.customFormats[format] === 'function') {
	    return validator.customFormats[format](input);
	  }
	  return true;
	};
	
	var makeSuffix = exports.makeSuffix = function makeSuffix (key) {
	  key = key.toString();
	  // This function could be capable of outputting valid a ECMAScript string, but the
	  // resulting code for testing which form to use would be tens of thousands of characters long
	  // That means this will use the name form for some illegal forms
	  if (!key.match(/[.\s\[\]]/) && !key.match(/^[\d]/)) {
	    return '.' + key;
	  }
	  if (key.match(/^\d+$/)) {
	    return '[' + key + ']';
	  }
	  return '[' + JSON.stringify(key) + ']';
	};
	
	exports.deepCompareStrict = function deepCompareStrict (a, b) {
	  if (typeof a !== typeof b) {
	    return false;
	  }
	  if (a instanceof Array) {
	    if (!(b instanceof Array)) {
	      return false;
	    }
	    if (a.length !== b.length) {
	      return false;
	    }
	    return a.every(function (v, i) {
	      return deepCompareStrict(a[i], b[i]);
	    });
	  }
	  if (typeof a === 'object') {
	    if (!a || !b) {
	      return a === b;
	    }
	    var aKeys = Object.keys(a);
	    var bKeys = Object.keys(b);
	    if (aKeys.length !== bKeys.length) {
	      return false;
	    }
	    return aKeys.every(function (v) {
	      return deepCompareStrict(a[v], b[v]);
	    });
	  }
	  return a === b;
	};
	
	module.exports.deepMerge = function deepMerge (target, src) {
	  var array = Array.isArray(src);
	  var dst = array && [] || {};
	
	  if (array) {
	    target = target || [];
	    dst = dst.concat(target);
	    src.forEach(function (e, i) {
	      if (typeof e === 'object') {
	        dst[i] = deepMerge(target[i], e)
	      } else {
	        if (target.indexOf(e) === -1) {
	          dst.push(e)
	        }
	      }
	    });
	  } else {
	    if (target && typeof target === 'object') {
	      Object.keys(target).forEach(function (key) {
	        dst[key] = target[key];
	      });
	    }
	    Object.keys(src).forEach(function (key) {
	      if (typeof src[key] !== 'object' || !src[key]) {
	        dst[key] = src[key];
	      }
	      else {
	        if (!target[key]) {
	          dst[key] = src[key];
	        } else {
	          dst[key] = deepMerge(target[key], src[key])
	        }
	      }
	    });
	  }
	
	  return dst;
	};
	
	/**
	 * Validates instance against the provided schema
	 * Implements URI+JSON Pointer encoding, e.g. "%7e"="~0"=>"~", "~1"="%2f"=>"/"
	 * @param o
	 * @param s The path to walk o along
	 * @return any
	 */
	exports.objectGetPath = function objectGetPath(o, s) {
	  var parts = s.split('/').slice(1);
	  var k;
	  while (typeof (k=parts.shift()) == 'string') {
	    var n = decodeURIComponent(k.replace(/~0/,'~').replace(/~1/g,'/'));
	    if (!(n in o)) return;
	    o = o[n];
	  }
	  return o;
	};
	
	/**
	 * Accept an Array of property names and return a JSON Pointer URI fragment
	 * @param Array a
	 * @return {String}
	 */
	exports.encodePath = function encodePointer(a){
		// ~ must be encoded explicitly because hacks
		// the slash is encoded by encodeURIComponent
		return a.map(function(v){ return '/'+encodeURIComponent(v).replace(/~/g,'%7E'); }).join('');
	};


/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = {
		"$schema": "http://json-schema.org/draft-04/schema#",
		"title": "Case Log Details Schema",
		"type": "array",
		"items": {
			"title": "Section",
			"description": "Section of form, displayed as a panel",
			"type": "object",
			"properties": {
				"title": {
					"type": "string"
				},
				"subsections": {
					"type": "array",
					"items": {
						"$ref": "#/definitions/subsection"
					}
				}
			},
			"required": "subsections"
		},
		"definitions": {
			"subsection": {
				"title": "Subsection",
				"type": "object",
				"properties": {
					"title": {
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"report": {
						"$ref": "#/definitions/stringBool"
					},
					"inputs": {
						"type": "array",
						"items": {
							"$ref": "#/definitions/input"
						}
					}
				},
				"required": [
					"name",
					"inputs"
				]
			},
			"input": {
				"title": "Input",
				"type": "object",
				"oneOf": [
					{
						"$ref": "#/definitions/checkbox"
					},
					{
						"$ref": "#/definitions/text"
					}
				]
			},
			"checkbox": {
				"properties": {
					"type": {
						"enum": [
							"checkbox"
						]
					},
					"label": {
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"properties": {
						"$ref": "#/definitions/properties"
					}
				},
				"required": [
					"type",
					"label"
				]
			},
			"text": {
				"properties": {
					"type": {
						"enum": [
							"text"
						]
					},
					"label": {
						"type": "string"
					},
					"name": {
						"type": "string"
					},
					"placeholder": {
						"type": "string"
					},
					"properties": {
						"$ref": "#/definitions/properties"
					},
					"report": {
						"type": "boolean",
						"default": false
					}
				},
				"required": [
					"type",
					"label"
				]
			},
			"properties": {
				"type": "array",
				"items": {
					"$ref": "#/definitions/property"
				}
			},
			"property": {
				"enum": [
					"required",
					"readonly",
					"selected"
				]
			},
			"stringBool": {
				"enum": [
					"true",
					"false"
				],
				"default": "false"
			}
		}
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.unlimitTableEvals = unlimitTableEvals;
	exports.unlimitRestTableEvals = unlimitRestTableEvals;
	exports.createDateCell = createDateCell;
	exports.createDateTimeCell = createDateTimeCell;
	exports.renderDateCell = renderDateCell;
	exports.renderDateTimeCell = renderDateTimeCell;
	exports.renderAccountStatus = renderAccountStatus;
	exports.renderEvaluationStatus = renderEvaluationStatus;
	exports.renderTrainingLevel = renderTrainingLevel;
	exports.renderSecondaryTrainingLevel = renderSecondaryTrainingLevel;
	exports.createEditAndDeleteButtons = createEditAndDeleteButtons;
	exports.getDataAttributes = getDataAttributes;
	
	var _moment = __webpack_require__(32);
	
	var _moment2 = _interopRequireDefault(_moment);
	
	var _utils = __webpack_require__(58);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function unlimitTableEvals() {
		var dt = this.DataTable({
			retrieve: true
		});
		var url = dt.ajax.url();
		dt.ajax.url(url.substring(0, url.lastIndexOf("/"))).load().draw();
	}
	
	function unlimitRestTableEvals() {
		var dt = this.DataTable({
			retrieve: true
		});
		var url = dt.ajax.url();
		dt.ajax.url(url.substring(0, url.lastIndexOf("?"))).load().draw();
	}
	
	function createDateCell(td, date) {
		if (date && $(td).text() !== (0, _moment2.default)(date).format("ll")) $(td).attr("data-date-value", (0, _moment2.default)(date).valueOf()).addClass("table-date-cell");
	}
	
	function createDateTimeCell(td, date) {
		if (date && $(td).text() !== (0, _moment2.default)(date).format("ll LT")) $(td).attr("data-date-value", (0, _moment2.default)(date).valueOf()).addClass("table-date-time-cell");
	}
	
	function renderDateCell(date, type) {
		if (type === "sort" || type === "type") return date ? (0, _moment2.default)(date).valueOf() : "";
	
		return date ? (0, _moment2.default)(date).format("MMMM Y") : "";
	}
	
	function renderDateTimeCell(date, type) {
		if (type === "sort" || type === "type") return date ? (0, _moment2.default)(date).valueOf() : "";
	
		return date ? (0, _moment2.default)(date).calendar() : "";
	}
	
	function renderAccountStatus(status) {
		var labelContext = void 0;
		switch (status) {
			case "active":
				labelContext = "label-success";
				break;
			case "inactive":
				labelContext = "label-danger";
				break;
			case "pending":
				labelContext = "label-warning";
				break;
			default:
				labelContext = "label-default";
				break;
		}
		return '<span class="label ' + labelContext + '">' + (0, _utils.ucfirst)(status) + '</span>';
	}
	
	function renderEvaluationStatus(status) {
		var labelContext = void 0;
		switch (status) {
			case "complete":
				labelContext = "label-success";
				break;
			case "disabled":
			case "canceled by admin":
			case "canceled by faculty":
			case "canceled by resident":
			case "canceled by fellow":
			case "canceled by staff":
				labelContext = "label-danger";
				break;
			case "pending":
				labelContext = "label-warning";
				break;
			default:
				labelContext = "label-default";
				break;
		}
		return '<span class="label ' + labelContext + '">' + (0, _utils.ucfirst)(status) + '</span>';
	}
	
	function renderTrainingLevel(trainingLevel) {
		if (trainingLevel) {
			if (trainingLevel.indexOf("ca-") > -1) return trainingLevel.toUpperCase();else return (0, _utils.ucfirst)(trainingLevel);
		}
	
		return "";
	}
	
	function renderSecondaryTrainingLevel(secondaryTrainingLevel) {
		if (secondaryTrainingLevel) {
			var allCaps = ["raaps"];
			if (allCaps.indexOf(secondaryTrainingLevel) > -1) return secondaryTrainingLevel.toUpperCase();else return (0, _utils.ucfirst)(secondaryTrainingLevel);
		}
	
		return "";
	}
	
	function createEditAndDeleteButtons(thing, name) {
		var dataAttributes = getDataAttributes(thing);
	
		var editButton = '<button type="button" class="btn btn-xs btn-info edit-' + name + '-button" ' + dataAttributes + '><span class="glyphicon glyphicon-edit"></span> Edit</button>';
	
		var deleteButton = '<button type="button" class="btn btn-xs btn-danger delete-' + name + '-button" ' + dataAttributes + '><span class="glyphicon glyphicon-remove"></span> Delete</button>';
	
		return [editButton, deleteButton];
	}
	
	function getDataAttributes(thing) {
		var excludes = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
		var dataAttributes = "";
		Object.getOwnPropertyNames(thing).forEach(function (propName) {
			if (!(excludes.indexOf(propName) !== -1) && thing[propName] != null) dataAttributes += 'data-' + propName + '="' + thing[propName] + '" ';
		});
		return dataAttributes;
	}

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.appendAlert = appendAlert;
	exports.ucfirst = ucfirst;
	function appendAlert(alertText) {
		var parent = arguments.length <= 1 || arguments[1] === undefined ? '#alert-container' : arguments[1];
		var alertType = arguments.length <= 2 || arguments[2] === undefined ? 'danger' : arguments[2];
		var dismissable = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	
		var alert = document.createElement("div");
		alert.className = "alert alert-" + alertType;
		alert.role = "alert";
	
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

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";
	
	__webpack_require__(60);
	
	__webpack_require__(351);
	
	__webpack_require__(353);
	
	/* eslint max-len: 0 */
	
	if (global._babelPolyfill) {
	  throw new Error("only one instance of babel-polyfill is allowed");
	}
	global._babelPolyfill = true;
	
	// Should be removed in the next major release:
	
	var DEFINE_PROPERTY = "defineProperty";
	function define(O, key, value) {
	  O[key] || Object[DEFINE_PROPERTY](O, key, {
	    writable: true,
	    configurable: true,
	    value: value
	  });
	}
	
	define(String.prototype, "padLeft", "".padStart);
	define(String.prototype, "padRight", "".padEnd);
	
	"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
	  [][key] && define(Array, key, Function.call.bind([][key]));
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(112);
	__webpack_require__(113);
	__webpack_require__(115);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(128);
	__webpack_require__(130);
	__webpack_require__(132);
	__webpack_require__(134);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(143);
	__webpack_require__(145);
	__webpack_require__(147);
	__webpack_require__(150);
	__webpack_require__(151);
	__webpack_require__(152);
	__webpack_require__(153);
	__webpack_require__(155);
	__webpack_require__(156);
	__webpack_require__(157);
	__webpack_require__(158);
	__webpack_require__(159);
	__webpack_require__(160);
	__webpack_require__(161);
	__webpack_require__(163);
	__webpack_require__(164);
	__webpack_require__(165);
	__webpack_require__(167);
	__webpack_require__(168);
	__webpack_require__(169);
	__webpack_require__(171);
	__webpack_require__(172);
	__webpack_require__(173);
	__webpack_require__(174);
	__webpack_require__(175);
	__webpack_require__(176);
	__webpack_require__(177);
	__webpack_require__(178);
	__webpack_require__(179);
	__webpack_require__(180);
	__webpack_require__(181);
	__webpack_require__(182);
	__webpack_require__(183);
	__webpack_require__(184);
	__webpack_require__(189);
	__webpack_require__(190);
	__webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(196);
	__webpack_require__(197);
	__webpack_require__(199);
	__webpack_require__(200);
	__webpack_require__(201);
	__webpack_require__(202);
	__webpack_require__(203);
	__webpack_require__(204);
	__webpack_require__(205);
	__webpack_require__(206);
	__webpack_require__(207);
	__webpack_require__(208);
	__webpack_require__(209);
	__webpack_require__(210);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(213);
	__webpack_require__(214);
	__webpack_require__(215);
	__webpack_require__(217);
	__webpack_require__(218);
	__webpack_require__(224);
	__webpack_require__(225);
	__webpack_require__(227);
	__webpack_require__(228);
	__webpack_require__(229);
	__webpack_require__(233);
	__webpack_require__(234);
	__webpack_require__(235);
	__webpack_require__(236);
	__webpack_require__(237);
	__webpack_require__(239);
	__webpack_require__(240);
	__webpack_require__(241);
	__webpack_require__(242);
	__webpack_require__(245);
	__webpack_require__(247);
	__webpack_require__(248);
	__webpack_require__(249);
	__webpack_require__(251);
	__webpack_require__(253);
	__webpack_require__(255);
	__webpack_require__(256);
	__webpack_require__(257);
	__webpack_require__(259);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(262);
	__webpack_require__(269);
	__webpack_require__(272);
	__webpack_require__(273);
	__webpack_require__(275);
	__webpack_require__(276);
	__webpack_require__(279);
	__webpack_require__(280);
	__webpack_require__(282);
	__webpack_require__(283);
	__webpack_require__(284);
	__webpack_require__(285);
	__webpack_require__(286);
	__webpack_require__(287);
	__webpack_require__(288);
	__webpack_require__(289);
	__webpack_require__(290);
	__webpack_require__(291);
	__webpack_require__(292);
	__webpack_require__(293);
	__webpack_require__(294);
	__webpack_require__(295);
	__webpack_require__(296);
	__webpack_require__(297);
	__webpack_require__(298);
	__webpack_require__(299);
	__webpack_require__(300);
	__webpack_require__(302);
	__webpack_require__(303);
	__webpack_require__(304);
	__webpack_require__(305);
	__webpack_require__(306);
	__webpack_require__(307);
	__webpack_require__(309);
	__webpack_require__(310);
	__webpack_require__(311);
	__webpack_require__(312);
	__webpack_require__(313);
	__webpack_require__(314);
	__webpack_require__(315);
	__webpack_require__(316);
	__webpack_require__(318);
	__webpack_require__(319);
	__webpack_require__(321);
	__webpack_require__(322);
	__webpack_require__(323);
	__webpack_require__(324);
	__webpack_require__(327);
	__webpack_require__(328);
	__webpack_require__(329);
	__webpack_require__(330);
	__webpack_require__(331);
	__webpack_require__(332);
	__webpack_require__(333);
	__webpack_require__(334);
	__webpack_require__(336);
	__webpack_require__(337);
	__webpack_require__(338);
	__webpack_require__(339);
	__webpack_require__(340);
	__webpack_require__(341);
	__webpack_require__(342);
	__webpack_require__(343);
	__webpack_require__(344);
	__webpack_require__(345);
	__webpack_require__(346);
	__webpack_require__(349);
	__webpack_require__(350);
	module.exports = __webpack_require__(67);

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(62)
	  , has            = __webpack_require__(63)
	  , DESCRIPTORS    = __webpack_require__(64)
	  , $export        = __webpack_require__(66)
	  , redefine       = __webpack_require__(76)
	  , META           = __webpack_require__(80).KEY
	  , $fails         = __webpack_require__(65)
	  , shared         = __webpack_require__(81)
	  , setToStringTag = __webpack_require__(82)
	  , uid            = __webpack_require__(77)
	  , wks            = __webpack_require__(83)
	  , wksExt         = __webpack_require__(84)
	  , wksDefine      = __webpack_require__(85)
	  , keyOf          = __webpack_require__(87)
	  , enumKeys       = __webpack_require__(100)
	  , isArray        = __webpack_require__(103)
	  , anObject       = __webpack_require__(70)
	  , toIObject      = __webpack_require__(90)
	  , toPrimitive    = __webpack_require__(74)
	  , createDesc     = __webpack_require__(75)
	  , _create        = __webpack_require__(104)
	  , gOPNExt        = __webpack_require__(107)
	  , $GOPD          = __webpack_require__(109)
	  , $DP            = __webpack_require__(69)
	  , $keys          = __webpack_require__(88)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(108).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(102).f  = $propertyIsEnumerable;
	  __webpack_require__(101).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(86)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(68)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 62 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 63 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(65)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(62)
	  , core      = __webpack_require__(67)
	  , hide      = __webpack_require__(68)
	  , redefine  = __webpack_require__(76)
	  , ctx       = __webpack_require__(78)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 67 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(69)
	  , createDesc = __webpack_require__(75);
	module.exports = __webpack_require__(64) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(70)
	  , IE8_DOM_DEFINE = __webpack_require__(72)
	  , toPrimitive    = __webpack_require__(74)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(64) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(71);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(64) && !__webpack_require__(65)(function(){
	  return Object.defineProperty(__webpack_require__(73)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(71)
	  , document = __webpack_require__(62).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(71);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(62)
	  , hide      = __webpack_require__(68)
	  , has       = __webpack_require__(63)
	  , SRC       = __webpack_require__(77)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(67).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 77 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(79);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(77)('meta')
	  , isObject = __webpack_require__(71)
	  , has      = __webpack_require__(63)
	  , setDesc  = __webpack_require__(69).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(65)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(62)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(69).f
	  , has = __webpack_require__(63)
	  , TAG = __webpack_require__(83)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(81)('wks')
	  , uid        = __webpack_require__(77)
	  , Symbol     = __webpack_require__(62).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(83);

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(62)
	  , core           = __webpack_require__(67)
	  , LIBRARY        = __webpack_require__(86)
	  , wksExt         = __webpack_require__(84)
	  , defineProperty = __webpack_require__(69).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = false;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(88)
	  , toIObject = __webpack_require__(90);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(89)
	  , enumBugKeys = __webpack_require__(99);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(63)
	  , toIObject    = __webpack_require__(90)
	  , arrayIndexOf = __webpack_require__(94)(false)
	  , IE_PROTO     = __webpack_require__(98)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(91)
	  , defined = __webpack_require__(93);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(92);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 92 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 93 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(90)
	  , toLength  = __webpack_require__(95)
	  , toIndex   = __webpack_require__(97);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(96)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 96 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(96)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(81)('keys')
	  , uid    = __webpack_require__(77);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(88)
	  , gOPS    = __webpack_require__(101)
	  , pIE     = __webpack_require__(102);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 102 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(92);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(70)
	  , dPs         = __webpack_require__(105)
	  , enumBugKeys = __webpack_require__(99)
	  , IE_PROTO    = __webpack_require__(98)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(73)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(106).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(69)
	  , anObject = __webpack_require__(70)
	  , getKeys  = __webpack_require__(88);
	
	module.exports = __webpack_require__(64) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(62).document && document.documentElement;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(90)
	  , gOPN      = __webpack_require__(108).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(89)
	  , hiddenKeys = __webpack_require__(99).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(102)
	  , createDesc     = __webpack_require__(75)
	  , toIObject      = __webpack_require__(90)
	  , toPrimitive    = __webpack_require__(74)
	  , has            = __webpack_require__(63)
	  , IE8_DOM_DEFINE = __webpack_require__(72)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(64) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(104)});

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(64), 'Object', {defineProperty: __webpack_require__(69).f});

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66);
	// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
	$export($export.S + $export.F * !__webpack_require__(64), 'Object', {defineProperties: __webpack_require__(105)});

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(90)
	  , $getOwnPropertyDescriptor = __webpack_require__(109).f;
	
	__webpack_require__(114)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(66)
	  , core    = __webpack_require__(67)
	  , fails   = __webpack_require__(65);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(116)
	  , $getPrototypeOf = __webpack_require__(117);
	
	__webpack_require__(114)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(93);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(63)
	  , toObject    = __webpack_require__(116)
	  , IE_PROTO    = __webpack_require__(98)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(116)
	  , $keys    = __webpack_require__(88);
	
	__webpack_require__(114)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 Object.getOwnPropertyNames(O)
	__webpack_require__(114)('getOwnPropertyNames', function(){
	  return __webpack_require__(107).f;
	});

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.5 Object.freeze(O)
	var isObject = __webpack_require__(71)
	  , meta     = __webpack_require__(80).onFreeze;
	
	__webpack_require__(114)('freeze', function($freeze){
	  return function freeze(it){
	    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
	  };
	});

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.17 Object.seal(O)
	var isObject = __webpack_require__(71)
	  , meta     = __webpack_require__(80).onFreeze;
	
	__webpack_require__(114)('seal', function($seal){
	  return function seal(it){
	    return $seal && isObject(it) ? $seal(meta(it)) : it;
	  };
	});

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.15 Object.preventExtensions(O)
	var isObject = __webpack_require__(71)
	  , meta     = __webpack_require__(80).onFreeze;
	
	__webpack_require__(114)('preventExtensions', function($preventExtensions){
	  return function preventExtensions(it){
	    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
	  };
	});

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.12 Object.isFrozen(O)
	var isObject = __webpack_require__(71);
	
	__webpack_require__(114)('isFrozen', function($isFrozen){
	  return function isFrozen(it){
	    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
	  };
	});

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.13 Object.isSealed(O)
	var isObject = __webpack_require__(71);
	
	__webpack_require__(114)('isSealed', function($isSealed){
	  return function isSealed(it){
	    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
	  };
	});

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.11 Object.isExtensible(O)
	var isObject = __webpack_require__(71);
	
	__webpack_require__(114)('isExtensible', function($isExtensible){
	  return function isExtensible(it){
	    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
	  };
	});

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(66);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(127)});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(88)
	  , gOPS     = __webpack_require__(101)
	  , pIE      = __webpack_require__(102)
	  , toObject = __webpack_require__(116)
	  , IObject  = __webpack_require__(91)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(65)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.10 Object.is(value1, value2)
	var $export = __webpack_require__(66);
	$export($export.S, 'Object', {is: __webpack_require__(129)});

/***/ },
/* 129 */
/***/ function(module, exports) {

	// 7.2.9 SameValue(x, y)
	module.exports = Object.is || function is(x, y){
	  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
	};

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(66);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(131).set});

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(71)
	  , anObject = __webpack_require__(70);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(78)(Function.call, __webpack_require__(109).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.3.6 Object.prototype.toString()
	var classof = __webpack_require__(133)
	  , test    = {};
	test[__webpack_require__(83)('toStringTag')] = 'z';
	if(test + '' != '[object z]'){
	  __webpack_require__(76)(Object.prototype, 'toString', function toString(){
	    return '[object ' + classof(this) + ']';
	  }, true);
	}

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(92)
	  , TAG = __webpack_require__(83)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
	var $export = __webpack_require__(66);
	
	$export($export.P, 'Function', {bind: __webpack_require__(135)});

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(79)
	  , isObject   = __webpack_require__(71)
	  , invoke     = __webpack_require__(136)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 136 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(69).f
	  , createDesc = __webpack_require__(75)
	  , has        = __webpack_require__(63)
	  , FProto     = Function.prototype
	  , nameRE     = /^\s*function ([^ (]*)/
	  , NAME       = 'name';
	
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	
	// 19.2.4.2 name
	NAME in FProto || __webpack_require__(64) && dP(FProto, NAME, {
	  configurable: true,
	  get: function(){
	    try {
	      var that = this
	        , name = ('' + that).match(nameRE)[1];
	      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
	      return name;
	    } catch(e){
	      return '';
	    }
	  }
	});

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var isObject       = __webpack_require__(71)
	  , getPrototypeOf = __webpack_require__(117)
	  , HAS_INSTANCE   = __webpack_require__(83)('hasInstance')
	  , FunctionProto  = Function.prototype;
	// 19.2.3.6 Function.prototype[@@hasInstance](V)
	if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(69).f(FunctionProto, HAS_INSTANCE, {value: function(O){
	  if(typeof this != 'function' || !isObject(O))return false;
	  if(!isObject(this.prototype))return O instanceof this;
	  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
	  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
	  return false;
	}});

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(66)
	  , $parseInt = __webpack_require__(140);
	// 18.2.5 parseInt(string, radix)
	$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

	var $parseInt = __webpack_require__(62).parseInt
	  , $trim     = __webpack_require__(141).trim
	  , ws        = __webpack_require__(142)
	  , hex       = /^[\-+]?0[xX]/;
	
	module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
	  var string = $trim(String(str), 3);
	  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
	} : $parseInt;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66)
	  , defined = __webpack_require__(93)
	  , fails   = __webpack_require__(65)
	  , spaces  = __webpack_require__(142)
	  , space   = '[' + spaces + ']'
	  , non     = '\u200b\u0085'
	  , ltrim   = RegExp('^' + space + space + '*')
	  , rtrim   = RegExp(space + space + '*$');
	
	var exporter = function(KEY, exec, ALIAS){
	  var exp   = {};
	  var FORCE = fails(function(){
	    return !!spaces[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
	  if(ALIAS)exp[ALIAS] = fn;
	  $export($export.P + $export.F * FORCE, 'String', exp);
	};
	
	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function(string, TYPE){
	  string = String(defined(string));
	  if(TYPE & 1)string = string.replace(ltrim, '');
	  if(TYPE & 2)string = string.replace(rtrim, '');
	  return string;
	};
	
	module.exports = exporter;

/***/ },
/* 142 */
/***/ function(module, exports) {

	module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(66)
	  , $parseFloat = __webpack_require__(144);
	// 18.2.4 parseFloat(string)
	$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var $parseFloat = __webpack_require__(62).parseFloat
	  , $trim       = __webpack_require__(141).trim;
	
	module.exports = 1 / $parseFloat(__webpack_require__(142) + '-0') !== -Infinity ? function parseFloat(str){
	  var string = $trim(String(str), 3)
	    , result = $parseFloat(string);
	  return result === 0 && string.charAt(0) == '-' ? -0 : result;
	} : $parseFloat;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(62)
	  , has               = __webpack_require__(63)
	  , cof               = __webpack_require__(92)
	  , inheritIfRequired = __webpack_require__(146)
	  , toPrimitive       = __webpack_require__(74)
	  , fails             = __webpack_require__(65)
	  , gOPN              = __webpack_require__(108).f
	  , gOPD              = __webpack_require__(109).f
	  , dP                = __webpack_require__(69).f
	  , $trim             = __webpack_require__(141).trim
	  , NUMBER            = 'Number'
	  , $Number           = global[NUMBER]
	  , Base              = $Number
	  , proto             = $Number.prototype
	  // Opera ~12 has broken Object#toString
	  , BROKEN_COF        = cof(__webpack_require__(104)(proto)) == NUMBER
	  , TRIM              = 'trim' in String.prototype;
	
	// 7.1.3 ToNumber(argument)
	var toNumber = function(argument){
	  var it = toPrimitive(argument, false);
	  if(typeof it == 'string' && it.length > 2){
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0)
	      , third, radix, maxCode;
	    if(first === 43 || first === 45){
	      third = it.charCodeAt(2);
	      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if(first === 48){
	      switch(it.charCodeAt(1)){
	        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default : return +it;
	      }
	      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if(code < 48 || code > maxCode)return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};
	
	if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
	  $Number = function Number(value){
	    var it = arguments.length < 1 ? 0 : value
	      , that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
	        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for(var keys = __webpack_require__(64) ? gOPN(Base) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key; keys.length > j; j++){
	    if(has(Base, key = keys[j]) && !has($Number, key)){
	      dP($Number, key, gOPD(Base, key));
	    }
	  }
	  $Number.prototype = proto;
	  proto.constructor = $Number;
	  __webpack_require__(76)(global, NUMBER, $Number);
	}

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

	var isObject       = __webpack_require__(71)
	  , setPrototypeOf = __webpack_require__(131).set;
	module.exports = function(that, target, C){
	  var P, S = target.constructor;
	  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
	    setPrototypeOf(that, P);
	  } return that;
	};

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(66)
	  , toInteger    = __webpack_require__(96)
	  , aNumberValue = __webpack_require__(148)
	  , repeat       = __webpack_require__(149)
	  , $toFixed     = 1..toFixed
	  , floor        = Math.floor
	  , data         = [0, 0, 0, 0, 0, 0]
	  , ERROR        = 'Number.toFixed: incorrect invocation!'
	  , ZERO         = '0';
	
	var multiply = function(n, c){
	  var i  = -1
	    , c2 = c;
	  while(++i < 6){
	    c2 += n * data[i];
	    data[i] = c2 % 1e7;
	    c2 = floor(c2 / 1e7);
	  }
	};
	var divide = function(n){
	  var i = 6
	    , c = 0;
	  while(--i >= 0){
	    c += data[i];
	    data[i] = floor(c / n);
	    c = (c % n) * 1e7;
	  }
	};
	var numToString = function(){
	  var i = 6
	    , s = '';
	  while(--i >= 0){
	    if(s !== '' || i === 0 || data[i] !== 0){
	      var t = String(data[i]);
	      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
	    }
	  } return s;
	};
	var pow = function(x, n, acc){
	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
	};
	var log = function(x){
	  var n  = 0
	    , x2 = x;
	  while(x2 >= 4096){
	    n += 12;
	    x2 /= 4096;
	  }
	  while(x2 >= 2){
	    n  += 1;
	    x2 /= 2;
	  } return n;
	};
	
	$export($export.P + $export.F * (!!$toFixed && (
	  0.00008.toFixed(3) !== '0.000' ||
	  0.9.toFixed(0) !== '1' ||
	  1.255.toFixed(2) !== '1.25' ||
	  1000000000000000128..toFixed(0) !== '1000000000000000128'
	) || !__webpack_require__(65)(function(){
	  // V8 ~ Android 4.3-
	  $toFixed.call({});
	})), 'Number', {
	  toFixed: function toFixed(fractionDigits){
	    var x = aNumberValue(this, ERROR)
	      , f = toInteger(fractionDigits)
	      , s = ''
	      , m = ZERO
	      , e, z, j, k;
	    if(f < 0 || f > 20)throw RangeError(ERROR);
	    if(x != x)return 'NaN';
	    if(x <= -1e21 || x >= 1e21)return String(x);
	    if(x < 0){
	      s = '-';
	      x = -x;
	    }
	    if(x > 1e-21){
	      e = log(x * pow(2, 69, 1)) - 69;
	      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
	      z *= 0x10000000000000;
	      e = 52 - e;
	      if(e > 0){
	        multiply(0, z);
	        j = f;
	        while(j >= 7){
	          multiply(1e7, 0);
	          j -= 7;
	        }
	        multiply(pow(10, j, 1), 0);
	        j = e - 1;
	        while(j >= 23){
	          divide(1 << 23);
	          j -= 23;
	        }
	        divide(1 << j);
	        multiply(1, 1);
	        divide(2);
	        m = numToString();
	      } else {
	        multiply(0, z);
	        multiply(1 << -e, 0);
	        m = numToString() + repeat.call(ZERO, f);
	      }
	    }
	    if(f > 0){
	      k = m.length;
	      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
	    } else {
	      m = s + m;
	    } return m;
	  }
	});

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	var cof = __webpack_require__(92);
	module.exports = function(it, msg){
	  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
	  return +it;
	};

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var toInteger = __webpack_require__(96)
	  , defined   = __webpack_require__(93);
	
	module.exports = function repeat(count){
	  var str = String(defined(this))
	    , res = ''
	    , n   = toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(66)
	  , $fails       = __webpack_require__(65)
	  , aNumberValue = __webpack_require__(148)
	  , $toPrecision = 1..toPrecision;
	
	$export($export.P + $export.F * ($fails(function(){
	  // IE7-
	  return $toPrecision.call(1, undefined) !== '1';
	}) || !$fails(function(){
	  // V8 ~ Android 4.3-
	  $toPrecision.call({});
	})), 'Number', {
	  toPrecision: function toPrecision(precision){
	    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
	    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
	  }
	});

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.1 Number.EPSILON
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.2 Number.isFinite(number)
	var $export   = __webpack_require__(66)
	  , _isFinite = __webpack_require__(62).isFinite;
	
	$export($export.S, 'Number', {
	  isFinite: function isFinite(it){
	    return typeof it == 'number' && _isFinite(it);
	  }
	});

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Number', {isInteger: __webpack_require__(154)});

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.3 Number.isInteger(number)
	var isObject = __webpack_require__(71)
	  , floor    = Math.floor;
	module.exports = function isInteger(it){
	  return !isObject(it) && isFinite(it) && floor(it) === it;
	};

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.4 Number.isNaN(number)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Number', {
	  isNaN: function isNaN(number){
	    return number != number;
	  }
	});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.5 Number.isSafeInteger(number)
	var $export   = __webpack_require__(66)
	  , isInteger = __webpack_require__(154)
	  , abs       = Math.abs;
	
	$export($export.S, 'Number', {
	  isSafeInteger: function isSafeInteger(number){
	    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
	  }
	});

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.6 Number.MAX_SAFE_INTEGER
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	// 20.1.2.10 Number.MIN_SAFE_INTEGER
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	var $export     = __webpack_require__(66)
	  , $parseFloat = __webpack_require__(144);
	// 20.1.2.12 Number.parseFloat(string)
	$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(66)
	  , $parseInt = __webpack_require__(140);
	// 20.1.2.13 Number.parseInt(string, radix)
	$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.3 Math.acosh(x)
	var $export = __webpack_require__(66)
	  , log1p   = __webpack_require__(162)
	  , sqrt    = Math.sqrt
	  , $acosh  = Math.acosh;
	
	$export($export.S + $export.F * !($acosh
	  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
	  && Math.floor($acosh(Number.MAX_VALUE)) == 710
	  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
	  && $acosh(Infinity) == Infinity
	), 'Math', {
	  acosh: function acosh(x){
	    return (x = +x) < 1 ? NaN : x > 94906265.62425156
	      ? Math.log(x) + Math.LN2
	      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
	  }
	});

/***/ },
/* 162 */
/***/ function(module, exports) {

	// 20.2.2.20 Math.log1p(x)
	module.exports = Math.log1p || function log1p(x){
	  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
	};

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.5 Math.asinh(x)
	var $export = __webpack_require__(66)
	  , $asinh  = Math.asinh;
	
	function asinh(x){
	  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
	}
	
	// Tor Browser bug: Math.asinh(0) -> -0 
	$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.7 Math.atanh(x)
	var $export = __webpack_require__(66)
	  , $atanh  = Math.atanh;
	
	// Tor Browser bug: Math.atanh(-0) -> 0 
	$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
	  atanh: function atanh(x){
	    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
	  }
	});

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.9 Math.cbrt(x)
	var $export = __webpack_require__(66)
	  , sign    = __webpack_require__(166);
	
	$export($export.S, 'Math', {
	  cbrt: function cbrt(x){
	    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
	  }
	});

/***/ },
/* 166 */
/***/ function(module, exports) {

	// 20.2.2.28 Math.sign(x)
	module.exports = Math.sign || function sign(x){
	  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
	};

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.11 Math.clz32(x)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  clz32: function clz32(x){
	    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
	  }
	});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.12 Math.cosh(x)
	var $export = __webpack_require__(66)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  cosh: function cosh(x){
	    return (exp(x = +x) + exp(-x)) / 2;
	  }
	});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.14 Math.expm1(x)
	var $export = __webpack_require__(66)
	  , $expm1  = __webpack_require__(170);
	
	$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ },
/* 170 */
/***/ function(module, exports) {

	// 20.2.2.14 Math.expm1(x)
	var $expm1 = Math.expm1;
	module.exports = (!$expm1
	  // Old FF bug
	  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
	  // Tor Browser bug
	  || $expm1(-2e-17) != -2e-17
	) ? function expm1(x){
	  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
	} : $expm1;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.16 Math.fround(x)
	var $export   = __webpack_require__(66)
	  , sign      = __webpack_require__(166)
	  , pow       = Math.pow
	  , EPSILON   = pow(2, -52)
	  , EPSILON32 = pow(2, -23)
	  , MAX32     = pow(2, 127) * (2 - EPSILON32)
	  , MIN32     = pow(2, -126);
	
	var roundTiesToEven = function(n){
	  return n + 1 / EPSILON - 1 / EPSILON;
	};
	
	
	$export($export.S, 'Math', {
	  fround: function fround(x){
	    var $abs  = Math.abs(x)
	      , $sign = sign(x)
	      , a, result;
	    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
	    a = (1 + EPSILON32 / EPSILON) * $abs;
	    result = a - (a - $abs);
	    if(result > MAX32 || result != result)return $sign * Infinity;
	    return $sign * result;
	  }
	});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
	var $export = __webpack_require__(66)
	  , abs     = Math.abs;
	
	$export($export.S, 'Math', {
	  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
	    var sum  = 0
	      , i    = 0
	      , aLen = arguments.length
	      , larg = 0
	      , arg, div;
	    while(i < aLen){
	      arg = abs(arguments[i++]);
	      if(larg < arg){
	        div  = larg / arg;
	        sum  = sum * div * div + 1;
	        larg = arg;
	      } else if(arg > 0){
	        div  = arg / larg;
	        sum += div * div;
	      } else sum += arg;
	    }
	    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
	  }
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.18 Math.imul(x, y)
	var $export = __webpack_require__(66)
	  , $imul   = Math.imul;
	
	// some WebKit versions fails with big numbers, some has wrong arity
	$export($export.S + $export.F * __webpack_require__(65)(function(){
	  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
	}), 'Math', {
	  imul: function imul(x, y){
	    var UINT16 = 0xffff
	      , xn = +x
	      , yn = +y
	      , xl = UINT16 & xn
	      , yl = UINT16 & yn;
	    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
	  }
	});

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.21 Math.log10(x)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  log10: function log10(x){
	    return Math.log(x) / Math.LN10;
	  }
	});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.20 Math.log1p(x)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {log1p: __webpack_require__(162)});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.22 Math.log2(x)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  log2: function log2(x){
	    return Math.log(x) / Math.LN2;
	  }
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.28 Math.sign(x)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {sign: __webpack_require__(166)});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.30 Math.sinh(x)
	var $export = __webpack_require__(66)
	  , expm1   = __webpack_require__(170)
	  , exp     = Math.exp;
	
	// V8 near Chromium 38 has a problem with very small numbers
	$export($export.S + $export.F * __webpack_require__(65)(function(){
	  return !Math.sinh(-2e-17) != -2e-17;
	}), 'Math', {
	  sinh: function sinh(x){
	    return Math.abs(x = +x) < 1
	      ? (expm1(x) - expm1(-x)) / 2
	      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
	  }
	});

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.33 Math.tanh(x)
	var $export = __webpack_require__(66)
	  , expm1   = __webpack_require__(170)
	  , exp     = Math.exp;
	
	$export($export.S, 'Math', {
	  tanh: function tanh(x){
	    var a = expm1(x = +x)
	      , b = expm1(-x);
	    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
	  }
	});

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 20.2.2.34 Math.trunc(x)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  trunc: function trunc(it){
	    return (it > 0 ? Math.floor : Math.ceil)(it);
	  }
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var $export        = __webpack_require__(66)
	  , toIndex        = __webpack_require__(97)
	  , fromCharCode   = String.fromCharCode
	  , $fromCodePoint = String.fromCodePoint;
	
	// length should be 1, old FF problem
	$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
	    var res  = []
	      , aLen = arguments.length
	      , i    = 0
	      , code;
	    while(aLen > i){
	      code = +arguments[i++];
	      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var $export   = __webpack_require__(66)
	  , toIObject = __webpack_require__(90)
	  , toLength  = __webpack_require__(95);
	
	$export($export.S, 'String', {
	  // 21.1.2.4 String.raw(callSite, ...substitutions)
	  raw: function raw(callSite){
	    var tpl  = toIObject(callSite.raw)
	      , len  = toLength(tpl.length)
	      , aLen = arguments.length
	      , res  = []
	      , i    = 0;
	    while(len > i){
	      res.push(String(tpl[i++]));
	      if(i < aLen)res.push(String(arguments[i]));
	    } return res.join('');
	  }
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.1.3.25 String.prototype.trim()
	__webpack_require__(141)('trim', function($trim){
	  return function trim(){
	    return $trim(this, 3);
	  };
	});

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(185)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(186)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(96)
	  , defined   = __webpack_require__(93);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(86)
	  , $export        = __webpack_require__(66)
	  , redefine       = __webpack_require__(76)
	  , hide           = __webpack_require__(68)
	  , has            = __webpack_require__(63)
	  , Iterators      = __webpack_require__(187)
	  , $iterCreate    = __webpack_require__(188)
	  , setToStringTag = __webpack_require__(82)
	  , getPrototypeOf = __webpack_require__(117)
	  , ITERATOR       = __webpack_require__(83)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 187 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(104)
	  , descriptor     = __webpack_require__(75)
	  , setToStringTag = __webpack_require__(82)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(68)(IteratorPrototype, __webpack_require__(83)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(66)
	  , $at     = __webpack_require__(185)(false);
	$export($export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
	'use strict';
	var $export   = __webpack_require__(66)
	  , toLength  = __webpack_require__(95)
	  , context   = __webpack_require__(191)
	  , ENDS_WITH = 'endsWith'
	  , $endsWith = ''[ENDS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(193)(ENDS_WITH), 'String', {
	  endsWith: function endsWith(searchString /*, endPosition = @length */){
	    var that = context(this, searchString, ENDS_WITH)
	      , endPosition = arguments.length > 1 ? arguments[1] : undefined
	      , len    = toLength(that.length)
	      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
	      , search = String(searchString);
	    return $endsWith
	      ? $endsWith.call(that, search, end)
	      : that.slice(end - search.length, end) === search;
	  }
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// helper for String#{startsWith, endsWith, includes}
	var isRegExp = __webpack_require__(192)
	  , defined  = __webpack_require__(93);
	
	module.exports = function(that, searchString, NAME){
	  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(defined(that));
	};

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.8 IsRegExp(argument)
	var isObject = __webpack_require__(71)
	  , cof      = __webpack_require__(92)
	  , MATCH    = __webpack_require__(83)('match');
	module.exports = function(it){
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var MATCH = __webpack_require__(83)('match');
	module.exports = function(KEY){
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch(e){
	    try {
	      re[MATCH] = false;
	      return !'/./'[KEY](re);
	    } catch(f){ /* empty */ }
	  } return true;
	};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.7 String.prototype.includes(searchString, position = 0)
	'use strict';
	var $export  = __webpack_require__(66)
	  , context  = __webpack_require__(191)
	  , INCLUDES = 'includes';
	
	$export($export.P + $export.F * __webpack_require__(193)(INCLUDES), 'String', {
	  includes: function includes(searchString /*, position = 0 */){
	    return !!~context(this, searchString, INCLUDES)
	      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66);
	
	$export($export.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(149)
	});

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
	'use strict';
	var $export     = __webpack_require__(66)
	  , toLength    = __webpack_require__(95)
	  , context     = __webpack_require__(191)
	  , STARTS_WITH = 'startsWith'
	  , $startsWith = ''[STARTS_WITH];
	
	$export($export.P + $export.F * __webpack_require__(193)(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /*, position = 0 */){
	    var that   = context(this, searchString, STARTS_WITH)
	      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
	      , search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.2 String.prototype.anchor(name)
	__webpack_require__(198)('anchor', function(createHTML){
	  return function anchor(name){
	    return createHTML(this, 'a', 'name', name);
	  }
	});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66)
	  , fails   = __webpack_require__(65)
	  , defined = __webpack_require__(93)
	  , quot    = /"/g;
	// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
	var createHTML = function(string, tag, attribute, value) {
	  var S  = String(defined(string))
	    , p1 = '<' + tag;
	  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
	  return p1 + '>' + S + '</' + tag + '>';
	};
	module.exports = function(NAME, exec){
	  var O = {};
	  O[NAME] = exec(createHTML);
	  $export($export.P + $export.F * fails(function(){
	    var test = ''[NAME]('"');
	    return test !== test.toLowerCase() || test.split('"').length > 3;
	  }), 'String', O);
	};

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.3 String.prototype.big()
	__webpack_require__(198)('big', function(createHTML){
	  return function big(){
	    return createHTML(this, 'big', '', '');
	  }
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.4 String.prototype.blink()
	__webpack_require__(198)('blink', function(createHTML){
	  return function blink(){
	    return createHTML(this, 'blink', '', '');
	  }
	});

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.5 String.prototype.bold()
	__webpack_require__(198)('bold', function(createHTML){
	  return function bold(){
	    return createHTML(this, 'b', '', '');
	  }
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.6 String.prototype.fixed()
	__webpack_require__(198)('fixed', function(createHTML){
	  return function fixed(){
	    return createHTML(this, 'tt', '', '');
	  }
	});

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.7 String.prototype.fontcolor(color)
	__webpack_require__(198)('fontcolor', function(createHTML){
	  return function fontcolor(color){
	    return createHTML(this, 'font', 'color', color);
	  }
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.8 String.prototype.fontsize(size)
	__webpack_require__(198)('fontsize', function(createHTML){
	  return function fontsize(size){
	    return createHTML(this, 'font', 'size', size);
	  }
	});

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.9 String.prototype.italics()
	__webpack_require__(198)('italics', function(createHTML){
	  return function italics(){
	    return createHTML(this, 'i', '', '');
	  }
	});

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.10 String.prototype.link(url)
	__webpack_require__(198)('link', function(createHTML){
	  return function link(url){
	    return createHTML(this, 'a', 'href', url);
	  }
	});

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.11 String.prototype.small()
	__webpack_require__(198)('small', function(createHTML){
	  return function small(){
	    return createHTML(this, 'small', '', '');
	  }
	});

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.12 String.prototype.strike()
	__webpack_require__(198)('strike', function(createHTML){
	  return function strike(){
	    return createHTML(this, 'strike', '', '');
	  }
	});

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.13 String.prototype.sub()
	__webpack_require__(198)('sub', function(createHTML){
	  return function sub(){
	    return createHTML(this, 'sub', '', '');
	  }
	});

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// B.2.3.14 String.prototype.sup()
	__webpack_require__(198)('sup', function(createHTML){
	  return function sup(){
	    return createHTML(this, 'sup', '', '');
	  }
	});

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

	// 20.3.3.1 / 15.9.4.4 Date.now()
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export     = __webpack_require__(66)
	  , toObject    = __webpack_require__(116)
	  , toPrimitive = __webpack_require__(74);
	
	$export($export.P + $export.F * __webpack_require__(65)(function(){
	  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
	}), 'Date', {
	  toJSON: function toJSON(key){
	    var O  = toObject(this)
	      , pv = toPrimitive(O);
	    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
	  }
	});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
	var $export = __webpack_require__(66)
	  , fails   = __webpack_require__(65)
	  , getTime = Date.prototype.getTime;
	
	var lz = function(num){
	  return num > 9 ? num : '0' + num;
	};
	
	// PhantomJS / old WebKit has a broken implementations
	$export($export.P + $export.F * (fails(function(){
	  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
	}) || !fails(function(){
	  new Date(NaN).toISOString();
	})), 'Date', {
	  toISOString: function toISOString(){
	    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
	    var d = this
	      , y = d.getUTCFullYear()
	      , m = d.getUTCMilliseconds()
	      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
	    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
	      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
	      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
	      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
	  }
	});

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	var DateProto    = Date.prototype
	  , INVALID_DATE = 'Invalid Date'
	  , TO_STRING    = 'toString'
	  , $toString    = DateProto[TO_STRING]
	  , getTime      = DateProto.getTime;
	if(new Date(NaN) + '' != INVALID_DATE){
	  __webpack_require__(76)(DateProto, TO_STRING, function toString(){
	    var value = getTime.call(this);
	    return value === value ? $toString.call(this) : INVALID_DATE;
	  });
	}

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	var TO_PRIMITIVE = __webpack_require__(83)('toPrimitive')
	  , proto        = Date.prototype;
	
	if(!(TO_PRIMITIVE in proto))__webpack_require__(68)(proto, TO_PRIMITIVE, __webpack_require__(216));

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var anObject    = __webpack_require__(70)
	  , toPrimitive = __webpack_require__(74)
	  , NUMBER      = 'number';
	
	module.exports = function(hint){
	  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
	  return toPrimitive(anObject(this), hint != NUMBER);
	};

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Array', {isArray: __webpack_require__(103)});

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ctx            = __webpack_require__(78)
	  , $export        = __webpack_require__(66)
	  , toObject       = __webpack_require__(116)
	  , call           = __webpack_require__(219)
	  , isArrayIter    = __webpack_require__(220)
	  , toLength       = __webpack_require__(95)
	  , createProperty = __webpack_require__(221)
	  , getIterFn      = __webpack_require__(222);
	
	$export($export.S + $export.F * !__webpack_require__(223)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(70);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(187)
	  , ITERATOR   = __webpack_require__(83)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(69)
	  , createDesc      = __webpack_require__(75);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(133)
	  , ITERATOR  = __webpack_require__(83)('iterator')
	  , Iterators = __webpack_require__(187);
	module.exports = __webpack_require__(67).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(83)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export        = __webpack_require__(66)
	  , createProperty = __webpack_require__(221);
	
	// WebKit Array.of isn't generic
	$export($export.S + $export.F * __webpack_require__(65)(function(){
	  function F(){}
	  return !(Array.of.call(F) instanceof F);
	}), 'Array', {
	  // 22.1.2.3 Array.of( ...items)
	  of: function of(/* ...args */){
	    var index  = 0
	      , aLen   = arguments.length
	      , result = new (typeof this == 'function' ? this : Array)(aLen);
	    while(aLen > index)createProperty(result, index, arguments[index++]);
	    result.length = aLen;
	    return result;
	  }
	});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.13 Array.prototype.join(separator)
	var $export   = __webpack_require__(66)
	  , toIObject = __webpack_require__(90)
	  , arrayJoin = [].join;
	
	// fallback for not array-like strings
	$export($export.P + $export.F * (__webpack_require__(91) != Object || !__webpack_require__(226)(arrayJoin)), 'Array', {
	  join: function join(separator){
	    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
	  }
	});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var fails = __webpack_require__(65);
	
	module.exports = function(method, arg){
	  return !!method && fails(function(){
	    arg ? method.call(null, function(){}, 1) : method.call(null);
	  });
	};

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export    = __webpack_require__(66)
	  , html       = __webpack_require__(106)
	  , cof        = __webpack_require__(92)
	  , toIndex    = __webpack_require__(97)
	  , toLength   = __webpack_require__(95)
	  , arraySlice = [].slice;
	
	// fallback for not array-like ES3 strings and DOM objects
	$export($export.P + $export.F * __webpack_require__(65)(function(){
	  if(html)arraySlice.call(html);
	}), 'Array', {
	  slice: function slice(begin, end){
	    var len   = toLength(this.length)
	      , klass = cof(this);
	    end = end === undefined ? len : end;
	    if(klass == 'Array')return arraySlice.call(this, begin, end);
	    var start  = toIndex(begin, len)
	      , upTo   = toIndex(end, len)
	      , size   = toLength(upTo - start)
	      , cloned = Array(size)
	      , i      = 0;
	    for(; i < size; i++)cloned[i] = klass == 'String'
	      ? this.charAt(start + i)
	      : this[start + i];
	    return cloned;
	  }
	});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export   = __webpack_require__(66)
	  , aFunction = __webpack_require__(79)
	  , toObject  = __webpack_require__(116)
	  , fails     = __webpack_require__(65)
	  , $sort     = [].sort
	  , test      = [1, 2, 3];
	
	$export($export.P + $export.F * (fails(function(){
	  // IE8-
	  test.sort(undefined);
	}) || !fails(function(){
	  // V8 bug
	  test.sort(null);
	  // Old WebKit
	}) || !__webpack_require__(226)($sort)), 'Array', {
	  // 22.1.3.25 Array.prototype.sort(comparefn)
	  sort: function sort(comparefn){
	    return comparefn === undefined
	      ? $sort.call(toObject(this))
	      : $sort.call(toObject(this), aFunction(comparefn));
	  }
	});

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export  = __webpack_require__(66)
	  , $forEach = __webpack_require__(230)(0)
	  , STRICT   = __webpack_require__(226)([].forEach, true);
	
	$export($export.P + $export.F * !STRICT, 'Array', {
	  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
	  forEach: function forEach(callbackfn /* , thisArg */){
	    return $forEach(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(78)
	  , IObject  = __webpack_require__(91)
	  , toObject = __webpack_require__(116)
	  , toLength = __webpack_require__(95)
	  , asc      = __webpack_require__(231);
	module.exports = function(TYPE, $create){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
	    , create        = $create || asc;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var speciesConstructor = __webpack_require__(232);
	
	module.exports = function(original, length){
	  return new (speciesConstructor(original))(length);
	};

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(71)
	  , isArray  = __webpack_require__(103)
	  , SPECIES  = __webpack_require__(83)('species');
	
	module.exports = function(original){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return C === undefined ? Array : C;
	};

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(66)
	  , $map    = __webpack_require__(230)(1);
	
	$export($export.P + $export.F * !__webpack_require__(226)([].map, true), 'Array', {
	  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
	  map: function map(callbackfn /* , thisArg */){
	    return $map(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(66)
	  , $filter = __webpack_require__(230)(2);
	
	$export($export.P + $export.F * !__webpack_require__(226)([].filter, true), 'Array', {
	  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
	  filter: function filter(callbackfn /* , thisArg */){
	    return $filter(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(66)
	  , $some   = __webpack_require__(230)(3);
	
	$export($export.P + $export.F * !__webpack_require__(226)([].some, true), 'Array', {
	  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
	  some: function some(callbackfn /* , thisArg */){
	    return $some(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(66)
	  , $every  = __webpack_require__(230)(4);
	
	$export($export.P + $export.F * !__webpack_require__(226)([].every, true), 'Array', {
	  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
	  every: function every(callbackfn /* , thisArg */){
	    return $every(this, callbackfn, arguments[1]);
	  }
	});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(66)
	  , $reduce = __webpack_require__(238);
	
	$export($export.P + $export.F * !__webpack_require__(226)([].reduce, true), 'Array', {
	  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
	  reduce: function reduce(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
	  }
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	var aFunction = __webpack_require__(79)
	  , toObject  = __webpack_require__(116)
	  , IObject   = __webpack_require__(91)
	  , toLength  = __webpack_require__(95);
	
	module.exports = function(that, callbackfn, aLen, memo, isRight){
	  aFunction(callbackfn);
	  var O      = toObject(that)
	    , self   = IObject(O)
	    , length = toLength(O.length)
	    , index  = isRight ? length - 1 : 0
	    , i      = isRight ? -1 : 1;
	  if(aLen < 2)for(;;){
	    if(index in self){
	      memo = self[index];
	      index += i;
	      break;
	    }
	    index += i;
	    if(isRight ? index < 0 : length <= index){
	      throw TypeError('Reduce of empty array with no initial value');
	    }
	  }
	  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
	    memo = callbackfn(memo, self[index], index, O);
	  }
	  return memo;
	};

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export = __webpack_require__(66)
	  , $reduce = __webpack_require__(238);
	
	$export($export.P + $export.F * !__webpack_require__(226)([].reduceRight, true), 'Array', {
	  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
	  reduceRight: function reduceRight(callbackfn /* , initialValue */){
	    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
	  }
	});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(66)
	  , $indexOf      = __webpack_require__(94)(false)
	  , $native       = [].indexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(226)($native)), 'Array', {
	  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
	  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
	    return NEGATIVE_ZERO
	      // convert -0 to +0
	      ? $native.apply(this, arguments) || 0
	      : $indexOf(this, searchElement, arguments[1]);
	  }
	});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export       = __webpack_require__(66)
	  , toIObject     = __webpack_require__(90)
	  , toInteger     = __webpack_require__(96)
	  , toLength      = __webpack_require__(95)
	  , $native       = [].lastIndexOf
	  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;
	
	$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(226)($native)), 'Array', {
	  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
	  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
	    // convert -0 to +0
	    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
	    var O      = toIObject(this)
	      , length = toLength(O.length)
	      , index  = length - 1;
	    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
	    if(index < 0)index = length + index;
	    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
	    return -1;
	  }
	});

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	var $export = __webpack_require__(66);
	
	$export($export.P, 'Array', {copyWithin: __webpack_require__(243)});
	
	__webpack_require__(244)('copyWithin');

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
	'use strict';
	var toObject = __webpack_require__(116)
	  , toIndex  = __webpack_require__(97)
	  , toLength = __webpack_require__(95);
	
	module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
	  var O     = toObject(this)
	    , len   = toLength(O.length)
	    , to    = toIndex(target, len)
	    , from  = toIndex(start, len)
	    , end   = arguments.length > 2 ? arguments[2] : undefined
	    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
	    , inc   = 1;
	  if(from < to && to < from + count){
	    inc  = -1;
	    from += count - 1;
	    to   += count - 1;
	  }
	  while(count-- > 0){
	    if(from in O)O[to] = O[from];
	    else delete O[to];
	    to   += inc;
	    from += inc;
	  } return O;
	};

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = __webpack_require__(83)('unscopables')
	  , ArrayProto  = Array.prototype;
	if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(68)(ArrayProto, UNSCOPABLES, {});
	module.exports = function(key){
	  ArrayProto[UNSCOPABLES][key] = true;
	};

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	var $export = __webpack_require__(66);
	
	$export($export.P, 'Array', {fill: __webpack_require__(246)});
	
	__webpack_require__(244)('fill');

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
	'use strict';
	var toObject = __webpack_require__(116)
	  , toIndex  = __webpack_require__(97)
	  , toLength = __webpack_require__(95);
	module.exports = function fill(value /*, start = 0, end = @length */){
	  var O      = toObject(this)
	    , length = toLength(O.length)
	    , aLen   = arguments.length
	    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
	    , end    = aLen > 2 ? arguments[2] : undefined
	    , endPos = end === undefined ? length : toIndex(end, length);
	  while(endPos > index)O[index++] = value;
	  return O;
	};

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
	var $export = __webpack_require__(66)
	  , $find   = __webpack_require__(230)(5)
	  , KEY     = 'find'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  find: function find(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(244)(KEY);

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
	var $export = __webpack_require__(66)
	  , $find   = __webpack_require__(230)(6)
	  , KEY     = 'findIndex'
	  , forced  = true;
	// Shouldn't skip holes
	if(KEY in [])Array(1)[KEY](function(){ forced = false; });
	$export($export.P + $export.F * forced, 'Array', {
	  findIndex: function findIndex(callbackfn/*, that = undefined */){
	    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	__webpack_require__(244)(KEY);

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(250)('Array');

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global      = __webpack_require__(62)
	  , dP          = __webpack_require__(69)
	  , DESCRIPTORS = __webpack_require__(64)
	  , SPECIES     = __webpack_require__(83)('species');
	
	module.exports = function(KEY){
	  var C = global[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(244)
	  , step             = __webpack_require__(252)
	  , Iterators        = __webpack_require__(187)
	  , toIObject        = __webpack_require__(90);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(186)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 252 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	var global            = __webpack_require__(62)
	  , inheritIfRequired = __webpack_require__(146)
	  , dP                = __webpack_require__(69).f
	  , gOPN              = __webpack_require__(108).f
	  , isRegExp          = __webpack_require__(192)
	  , $flags            = __webpack_require__(254)
	  , $RegExp           = global.RegExp
	  , Base              = $RegExp
	  , proto             = $RegExp.prototype
	  , re1               = /a/g
	  , re2               = /a/g
	  // "new" creates a new object, old webkit buggy here
	  , CORRECT_NEW       = new $RegExp(re1) !== re1;
	
	if(__webpack_require__(64) && (!CORRECT_NEW || __webpack_require__(65)(function(){
	  re2[__webpack_require__(83)('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))){
	  $RegExp = function RegExp(p, f){
	    var tiRE = this instanceof $RegExp
	      , piRE = isRegExp(p)
	      , fiU  = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
	      , tiRE ? this : proto, $RegExp);
	  };
	  var proxy = function(key){
	    key in $RegExp || dP($RegExp, key, {
	      configurable: true,
	      get: function(){ return Base[key]; },
	      set: function(it){ Base[key] = it; }
	    });
	  };
	  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
	  proto.constructor = $RegExp;
	  $RegExp.prototype = proto;
	  __webpack_require__(76)(global, 'RegExp', $RegExp);
	}
	
	__webpack_require__(250)('RegExp');

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 21.2.5.3 get RegExp.prototype.flags
	var anObject = __webpack_require__(70);
	module.exports = function(){
	  var that   = anObject(this)
	    , result = '';
	  if(that.global)     result += 'g';
	  if(that.ignoreCase) result += 'i';
	  if(that.multiline)  result += 'm';
	  if(that.unicode)    result += 'u';
	  if(that.sticky)     result += 'y';
	  return result;
	};

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__(256);
	var anObject    = __webpack_require__(70)
	  , $flags      = __webpack_require__(254)
	  , DESCRIPTORS = __webpack_require__(64)
	  , TO_STRING   = 'toString'
	  , $toString   = /./[TO_STRING];
	
	var define = function(fn){
	  __webpack_require__(76)(RegExp.prototype, TO_STRING, fn, true);
	};
	
	// 21.2.5.14 RegExp.prototype.toString()
	if(__webpack_require__(65)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
	  define(function toString(){
	    var R = anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if($toString.name != TO_STRING){
	  define(function toString(){
	    return $toString.call(this);
	  });
	}

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	// 21.2.5.3 get RegExp.prototype.flags()
	if(__webpack_require__(64) && /./g.flags != 'g')__webpack_require__(69).f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: __webpack_require__(254)
	});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	// @@match logic
	__webpack_require__(258)('match', 1, function(defined, MATCH, $match){
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide     = __webpack_require__(68)
	  , redefine = __webpack_require__(76)
	  , fails    = __webpack_require__(65)
	  , defined  = __webpack_require__(93)
	  , wks      = __webpack_require__(83);
	
	module.exports = function(KEY, length, exec){
	  var SYMBOL   = wks(KEY)
	    , fns      = exec(defined, SYMBOL, ''[KEY])
	    , strfn    = fns[0]
	    , rxfn     = fns[1];
	  if(fails(function(){
	    var O = {};
	    O[SYMBOL] = function(){ return 7; };
	    return ''[KEY](O) != 7;
	  })){
	    redefine(String.prototype, KEY, strfn);
	    hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function(string, arg){ return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function(string){ return rxfn.call(string, this); }
	    );
	  }
	};

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	// @@replace logic
	__webpack_require__(258)('replace', 2, function(defined, REPLACE, $replace){
	  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
	  return [function replace(searchValue, replaceValue){
	    'use strict';
	    var O  = defined(this)
	      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	    return fn !== undefined
	      ? fn.call(searchValue, O, replaceValue)
	      : $replace.call(String(O), searchValue, replaceValue);
	  }, $replace];
	});

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// @@search logic
	__webpack_require__(258)('search', 1, function(defined, SEARCH, $search){
	  // 21.1.3.15 String.prototype.search(regexp)
	  return [function search(regexp){
	    'use strict';
	    var O  = defined(this)
	      , fn = regexp == undefined ? undefined : regexp[SEARCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
	  }, $search];
	});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	// @@split logic
	__webpack_require__(258)('split', 2, function(defined, SPLIT, $split){
	  'use strict';
	  var isRegExp   = __webpack_require__(192)
	    , _split     = $split
	    , $push      = [].push
	    , $SPLIT     = 'split'
	    , LENGTH     = 'length'
	    , LAST_INDEX = 'lastIndex';
	  if(
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ){
	    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
	    // based on es5-shim implementation, need to rework it
	    $split = function(separator, limit){
	      var string = String(this);
	      if(separator === undefined && limit === 0)return [];
	      // If `separator` is not a regex, use native split
	      if(!isRegExp(separator))return _split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var separator2, match, lastIndex, lastLength, i;
	      // Doesn't need flags gy, but they don't hurt
	      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
	      while(match = separatorCopy.exec(string)){
	        // `separatorCopy.lastIndex` is not reliable cross-browser
	        lastIndex = match.index + match[0][LENGTH];
	        if(lastIndex > lastLastIndex){
	          output.push(string.slice(lastLastIndex, match.index));
	          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
	          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
	            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
	          });
	          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if(output[LENGTH] >= splitLimit)break;
	        }
	        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
	      }
	      if(lastLastIndex === string[LENGTH]){
	        if(lastLength || !separatorCopy.test(''))output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
	    $split = function(separator, limit){
	      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
	    };
	  }
	  // 21.1.3.17 String.prototype.split(separator, limit)
	  return [function split(separator, limit){
	    var O  = defined(this)
	      , fn = separator == undefined ? undefined : separator[SPLIT];
	    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
	  }, $split];
	});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY            = __webpack_require__(86)
	  , global             = __webpack_require__(62)
	  , ctx                = __webpack_require__(78)
	  , classof            = __webpack_require__(133)
	  , $export            = __webpack_require__(66)
	  , isObject           = __webpack_require__(71)
	  , aFunction          = __webpack_require__(79)
	  , anInstance         = __webpack_require__(263)
	  , forOf              = __webpack_require__(264)
	  , speciesConstructor = __webpack_require__(265)
	  , task               = __webpack_require__(266).set
	  , microtask          = __webpack_require__(267)()
	  , PROMISE            = 'Promise'
	  , TypeError          = global.TypeError
	  , process            = global.process
	  , $Promise           = global[PROMISE]
	  , process            = global.process
	  , isNode             = classof(process) == 'process'
	  , empty              = function(){ /* empty */ }
	  , Internal, GenericPromiseCapability, Wrapper;
	
	var USE_NATIVE = !!function(){
	  try {
	    // correct subclassing with @@species support
	    var promise     = $Promise.resolve(1)
	      , FakePromise = (promise.constructor = {})[__webpack_require__(83)('species')] = function(exec){ exec(empty, empty); };
	    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
	  } catch(e){ /* empty */ }
	}();
	
	// helpers
	var sameConstructor = function(a, b){
	  // with library wrapper special case
	  return a === b || a === $Promise && b === Wrapper;
	};
	var isThenable = function(it){
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};
	var newPromiseCapability = function(C){
	  return sameConstructor($Promise, C)
	    ? new PromiseCapability(C)
	    : new GenericPromiseCapability(C);
	};
	var PromiseCapability = GenericPromiseCapability = function(C){
	  var resolve, reject;
	  this.promise = new C(function($$resolve, $$reject){
	    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject  = $$reject;
	  });
	  this.resolve = aFunction(resolve);
	  this.reject  = aFunction(reject);
	};
	var perform = function(exec){
	  try {
	    exec();
	  } catch(e){
	    return {error: e};
	  }
	};
	var notify = function(promise, isReject){
	  if(promise._n)return;
	  promise._n = true;
	  var chain = promise._c;
	  microtask(function(){
	    var value = promise._v
	      , ok    = promise._s == 1
	      , i     = 0;
	    var run = function(reaction){
	      var handler = ok ? reaction.ok : reaction.fail
	        , resolve = reaction.resolve
	        , reject  = reaction.reject
	        , domain  = reaction.domain
	        , result, then;
	      try {
	        if(handler){
	          if(!ok){
	            if(promise._h == 2)onHandleUnhandled(promise);
	            promise._h = 1;
	          }
	          if(handler === true)result = value;
	          else {
	            if(domain)domain.enter();
	            result = handler(value);
	            if(domain)domain.exit();
	          }
	          if(result === reaction.promise){
	            reject(TypeError('Promise-chain cycle'));
	          } else if(then = isThenable(result)){
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch(e){
	        reject(e);
	      }
	    };
	    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
	    promise._c = [];
	    promise._n = false;
	    if(isReject && !promise._h)onUnhandled(promise);
	  });
	};
	var onUnhandled = function(promise){
	  task.call(global, function(){
	    var value = promise._v
	      , abrupt, handler, console;
	    if(isUnhandled(promise)){
	      abrupt = perform(function(){
	        if(isNode){
	          process.emit('unhandledRejection', value, promise);
	        } else if(handler = global.onunhandledrejection){
	          handler({promise: promise, reason: value});
	        } else if((console = global.console) && console.error){
	          console.error('Unhandled promise rejection', value);
	        }
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
	    } promise._a = undefined;
	    if(abrupt)throw abrupt.error;
	  });
	};
	var isUnhandled = function(promise){
	  if(promise._h == 1)return false;
	  var chain = promise._a || promise._c
	    , i     = 0
	    , reaction;
	  while(chain.length > i){
	    reaction = chain[i++];
	    if(reaction.fail || !isUnhandled(reaction.promise))return false;
	  } return true;
	};
	var onHandleUnhandled = function(promise){
	  task.call(global, function(){
	    var handler;
	    if(isNode){
	      process.emit('rejectionHandled', promise);
	    } else if(handler = global.onrejectionhandled){
	      handler({promise: promise, reason: promise._v});
	    }
	  });
	};
	var $reject = function(value){
	  var promise = this;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  promise._v = value;
	  promise._s = 2;
	  if(!promise._a)promise._a = promise._c.slice();
	  notify(promise, true);
	};
	var $resolve = function(value){
	  var promise = this
	    , then;
	  if(promise._d)return;
	  promise._d = true;
	  promise = promise._w || promise; // unwrap
	  try {
	    if(promise === value)throw TypeError("Promise can't be resolved itself");
	    if(then = isThenable(value)){
	      microtask(function(){
	        var wrapper = {_w: promise, _d: false}; // wrap
	        try {
	          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
	        } catch(e){
	          $reject.call(wrapper, e);
	        }
	      });
	    } else {
	      promise._v = value;
	      promise._s = 1;
	      notify(promise, false);
	    }
	  } catch(e){
	    $reject.call({_w: promise, _d: false}, e); // wrap
	  }
	};
	
	// constructor polyfill
	if(!USE_NATIVE){
	  // 25.4.3.1 Promise(executor)
	  $Promise = function Promise(executor){
	    anInstance(this, $Promise, PROMISE, '_h');
	    aFunction(executor);
	    Internal.call(this);
	    try {
	      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
	    } catch(err){
	      $reject.call(this, err);
	    }
	  };
	  Internal = function Promise(executor){
	    this._c = [];             // <- awaiting reactions
	    this._a = undefined;      // <- checked in isUnhandled reactions
	    this._s = 0;              // <- state
	    this._d = false;          // <- done
	    this._v = undefined;      // <- value
	    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
	    this._n = false;          // <- notify
	  };
	  Internal.prototype = __webpack_require__(268)($Promise.prototype, {
	    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
	    then: function then(onFulfilled, onRejected){
	      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
	      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail   = typeof onRejected == 'function' && onRejected;
	      reaction.domain = isNode ? process.domain : undefined;
	      this._c.push(reaction);
	      if(this._a)this._a.push(reaction);
	      if(this._s)notify(this, false);
	      return reaction.promise;
	    },
	    // 25.4.5.1 Promise.prototype.catch(onRejected)
	    'catch': function(onRejected){
	      return this.then(undefined, onRejected);
	    }
	  });
	  PromiseCapability = function(){
	    var promise  = new Internal;
	    this.promise = promise;
	    this.resolve = ctx($resolve, promise, 1);
	    this.reject  = ctx($reject, promise, 1);
	  };
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
	__webpack_require__(82)($Promise, PROMISE);
	__webpack_require__(250)(PROMISE);
	Wrapper = __webpack_require__(67)[PROMISE];
	
	// statics
	$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
	  // 25.4.4.5 Promise.reject(r)
	  reject: function reject(r){
	    var capability = newPromiseCapability(this)
	      , $$reject   = capability.reject;
	    $$reject(r);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
	  // 25.4.4.6 Promise.resolve(x)
	  resolve: function resolve(x){
	    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
	    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
	    var capability = newPromiseCapability(this)
	      , $$resolve  = capability.resolve;
	    $$resolve(x);
	    return capability.promise;
	  }
	});
	$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(223)(function(iter){
	  $Promise.all(iter)['catch'](empty);
	})), PROMISE, {
	  // 25.4.4.1 Promise.all(iterable)
	  all: function all(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , resolve    = capability.resolve
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      var values    = []
	        , index     = 0
	        , remaining = 1;
	      forOf(iterable, false, function(promise){
	        var $index        = index++
	          , alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        C.resolve(promise).then(function(value){
	          if(alreadyCalled)return;
	          alreadyCalled  = true;
	          values[$index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  },
	  // 25.4.4.4 Promise.race(iterable)
	  race: function race(iterable){
	    var C          = this
	      , capability = newPromiseCapability(C)
	      , reject     = capability.reject;
	    var abrupt = perform(function(){
	      forOf(iterable, false, function(promise){
	        C.resolve(promise).then(capability.resolve, reject);
	      });
	    });
	    if(abrupt)reject(abrupt.error);
	    return capability.promise;
	  }
	});

/***/ },
/* 263 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name, forbiddenField){
	  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
	    throw TypeError(name + ': incorrect invocation!');
	  } return it;
	};

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(78)
	  , call        = __webpack_require__(219)
	  , isArrayIter = __webpack_require__(220)
	  , anObject    = __webpack_require__(70)
	  , toLength    = __webpack_require__(95)
	  , getIterFn   = __webpack_require__(222)
	  , BREAK       = {}
	  , RETURN      = {};
	var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
	  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator, result;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	    if(result === BREAK || result === RETURN)return result;
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    result = call(iterator, f, step.value, entries);
	    if(result === BREAK || result === RETURN)return result;
	  }
	};
	exports.BREAK  = BREAK;
	exports.RETURN = RETURN;

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)
	var anObject  = __webpack_require__(70)
	  , aFunction = __webpack_require__(79)
	  , SPECIES   = __webpack_require__(83)('species');
	module.exports = function(O, D){
	  var C = anObject(O).constructor, S;
	  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
	};

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	var ctx                = __webpack_require__(78)
	  , invoke             = __webpack_require__(136)
	  , html               = __webpack_require__(106)
	  , cel                = __webpack_require__(73)
	  , global             = __webpack_require__(62)
	  , process            = global.process
	  , setTask            = global.setImmediate
	  , clearTask          = global.clearImmediate
	  , MessageChannel     = global.MessageChannel
	  , counter            = 0
	  , queue              = {}
	  , ONREADYSTATECHANGE = 'onreadystatechange'
	  , defer, channel, port;
	var run = function(){
	  var id = +this;
	  if(queue.hasOwnProperty(id)){
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};
	var listener = function(event){
	  run.call(event.data);
	};
	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if(!setTask || !clearTask){
	  setTask = function setImmediate(fn){
	    var args = [], i = 1;
	    while(arguments.length > i)args.push(arguments[i++]);
	    queue[++counter] = function(){
	      invoke(typeof fn == 'function' ? fn : Function(fn), args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clearTask = function clearImmediate(id){
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if(__webpack_require__(92)(process) == 'process'){
	    defer = function(id){
	      process.nextTick(ctx(run, id, 1));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  } else if(MessageChannel){
	    channel = new MessageChannel;
	    port    = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = ctx(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
	    defer = function(id){
	      global.postMessage(id + '', '*');
	    };
	    global.addEventListener('message', listener, false);
	  // IE8-
	  } else if(ONREADYSTATECHANGE in cel('script')){
	    defer = function(id){
	      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
	        html.removeChild(this);
	        run.call(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function(id){
	      setTimeout(ctx(run, id, 1), 0);
	    };
	  }
	}
	module.exports = {
	  set:   setTask,
	  clear: clearTask
	};

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(62)
	  , macrotask = __webpack_require__(266).set
	  , Observer  = global.MutationObserver || global.WebKitMutationObserver
	  , process   = global.process
	  , Promise   = global.Promise
	  , isNode    = __webpack_require__(92)(process) == 'process';
	
	module.exports = function(){
	  var head, last, notify;
	
	  var flush = function(){
	    var parent, fn;
	    if(isNode && (parent = process.domain))parent.exit();
	    while(head){
	      fn   = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch(e){
	        if(head)notify();
	        else last = undefined;
	        throw e;
	      }
	    } last = undefined;
	    if(parent)parent.enter();
	  };
	
	  // Node.js
	  if(isNode){
	    notify = function(){
	      process.nextTick(flush);
	    };
	  // browsers with MutationObserver
	  } else if(Observer){
	    var toggle = true
	      , node   = document.createTextNode('');
	    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
	    notify = function(){
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if(Promise && Promise.resolve){
	    var promise = Promise.resolve();
	    notify = function(){
	      promise.then(flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function(){
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global, flush);
	    };
	  }
	
	  return function(fn){
	    var task = {fn: fn, next: undefined};
	    if(last)last.next = task;
	    if(!head){
	      head = task;
	      notify();
	    } last = task;
	  };
	};

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(76);
	module.exports = function(target, src, safe){
	  for(var key in src)redefine(target, key, src[key], safe);
	  return target;
	};

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(270);
	
	// 23.1 Map Objects
	module.exports = __webpack_require__(271)('Map', function(get){
	  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.1.3.6 Map.prototype.get(key)
	  get: function get(key){
	    var entry = strong.getEntry(this, key);
	    return entry && entry.v;
	  },
	  // 23.1.3.9 Map.prototype.set(key, value)
	  set: function set(key, value){
	    return strong.def(this, key === 0 ? 0 : key, value);
	  }
	}, strong, true);

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var dP          = __webpack_require__(69).f
	  , create      = __webpack_require__(104)
	  , redefineAll = __webpack_require__(268)
	  , ctx         = __webpack_require__(78)
	  , anInstance  = __webpack_require__(263)
	  , defined     = __webpack_require__(93)
	  , forOf       = __webpack_require__(264)
	  , $iterDefine = __webpack_require__(186)
	  , step        = __webpack_require__(252)
	  , setSpecies  = __webpack_require__(250)
	  , DESCRIPTORS = __webpack_require__(64)
	  , fastKey     = __webpack_require__(80).fastKey
	  , SIZE        = DESCRIPTORS ? '_s' : 'size';
	
	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = create(null); // index
	      that._f = undefined;    // first entry
	      that._l = undefined;    // last entry
	      that[SIZE] = 0;         // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        anInstance(this, C, 'forEach');
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)dP(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);
	
	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global            = __webpack_require__(62)
	  , $export           = __webpack_require__(66)
	  , redefine          = __webpack_require__(76)
	  , redefineAll       = __webpack_require__(268)
	  , meta              = __webpack_require__(80)
	  , forOf             = __webpack_require__(264)
	  , anInstance        = __webpack_require__(263)
	  , isObject          = __webpack_require__(71)
	  , fails             = __webpack_require__(65)
	  , $iterDetect       = __webpack_require__(223)
	  , setToStringTag    = __webpack_require__(82)
	  , inheritIfRequired = __webpack_require__(146);
	
	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  var fixMethod = function(KEY){
	    var fn = proto[KEY];
	    redefine(proto, KEY,
	      KEY == 'delete' ? function(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'has' ? function has(a){
	        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'get' ? function get(a){
	        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
	      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
	        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
	    );
	  };
	  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	    meta.NEED = true;
	  } else {
	    var instance             = new C
	      // early implementations not supports chaining
	      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
	      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
	      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
	      // most early implementations doesn't supports iterables, most modern - not close it correctly
	      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
	      // for early implementations -0 and +0 not the same
	      , BUGGY_ZERO = !IS_WEAK && fails(function(){
	        // V8 ~ Chromium 42- fails only with 5+ elements
	        var $instance = new C()
	          , index     = 5;
	        while(index--)$instance[ADDER](index, index);
	        return !$instance.has(-0);
	      });
	    if(!ACCEPT_ITERABLES){ 
	      C = wrapper(function(target, iterable){
	        anInstance(target, C, NAME);
	        var that = inheritIfRequired(new Base, target, C);
	        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	        return that;
	      });
	      C.prototype = proto;
	      proto.constructor = C;
	    }
	    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }
	    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
	    // weak collections should not contains .clear method
	    if(IS_WEAK && proto.clear)delete proto.clear;
	  }
	
	  setToStringTag(C, NAME);
	
	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F * (C != Base), O);
	
	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);
	
	  return C;
	};

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(270);
	
	// 23.2 Set Objects
	module.exports = __webpack_require__(271)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var each         = __webpack_require__(230)(0)
	  , redefine     = __webpack_require__(76)
	  , meta         = __webpack_require__(80)
	  , assign       = __webpack_require__(127)
	  , weak         = __webpack_require__(274)
	  , isObject     = __webpack_require__(71)
	  , getWeak      = meta.getWeak
	  , isExtensible = Object.isExtensible
	  , uncaughtFrozenStore = weak.ufstore
	  , tmp          = {}
	  , InternalMap;
	
	var wrapper = function(get){
	  return function WeakMap(){
	    return get(this, arguments.length > 0 ? arguments[0] : undefined);
	  };
	};
	
	var methods = {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      var data = getWeak(key);
	      if(data === true)return uncaughtFrozenStore(this).get(key);
	      return data ? data[this._i] : undefined;
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	};
	
	// 23.3 WeakMap Objects
	var $WeakMap = module.exports = __webpack_require__(271)('WeakMap', wrapper, methods, weak, true, true);
	
	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  InternalMap = weak.getConstructor(wrapper);
	  assign(InternalMap.prototype, methods);
	  meta.NEED = true;
	  each(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on internal weakmap shim
	      if(isObject(a) && !isExtensible(a)){
	        if(!this._f)this._f = new InternalMap;
	        var result = this._f[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var redefineAll       = __webpack_require__(268)
	  , getWeak           = __webpack_require__(80).getWeak
	  , anObject          = __webpack_require__(70)
	  , isObject          = __webpack_require__(71)
	  , anInstance        = __webpack_require__(263)
	  , forOf             = __webpack_require__(264)
	  , createArrayMethod = __webpack_require__(230)
	  , $has              = __webpack_require__(63)
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;
	
	// fallback for uncaught frozen keys
	var uncaughtFrozenStore = function(that){
	  return that._l || (that._l = new UncaughtFrozenStore);
	};
	var UncaughtFrozenStore = function(){
	  this.a = [];
	};
	var findUncaughtFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	UncaughtFrozenStore.prototype = {
	  get: function(key){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findUncaughtFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findUncaughtFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};
	
	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      anInstance(that, C, NAME, '_i');
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for uncaught frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
	        return data && $has(data, this._i) && delete data[this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        var data = getWeak(key);
	        if(data === true)return uncaughtFrozenStore(this).has(key);
	        return data && $has(data, this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var data = getWeak(anObject(key), true);
	    if(data === true)uncaughtFrozenStore(that).set(key, value);
	    else data[that._i] = value;
	    return that;
	  },
	  ufstore: uncaughtFrozenStore
	};

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var weak = __webpack_require__(274);
	
	// 23.4 WeakSet Objects
	__webpack_require__(271)('WeakSet', function(get){
	  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.4.3.1 WeakSet.prototype.add(value)
	  add: function add(value){
	    return weak.def(this, value, true);
	  }
	}, weak, false, true);

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export      = __webpack_require__(66)
	  , $typed       = __webpack_require__(277)
	  , buffer       = __webpack_require__(278)
	  , anObject     = __webpack_require__(70)
	  , toIndex      = __webpack_require__(97)
	  , toLength     = __webpack_require__(95)
	  , isObject     = __webpack_require__(71)
	  , ArrayBuffer  = __webpack_require__(62).ArrayBuffer
	  , speciesConstructor = __webpack_require__(265)
	  , $ArrayBuffer = buffer.ArrayBuffer
	  , $DataView    = buffer.DataView
	  , $isView      = $typed.ABV && ArrayBuffer.isView
	  , $slice       = $ArrayBuffer.prototype.slice
	  , VIEW         = $typed.VIEW
	  , ARRAY_BUFFER = 'ArrayBuffer';
	
	$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});
	
	$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
	  // 24.1.3.1 ArrayBuffer.isView(arg)
	  isView: function isView(it){
	    return $isView && $isView(it) || isObject(it) && VIEW in it;
	  }
	});
	
	$export($export.P + $export.U + $export.F * __webpack_require__(65)(function(){
	  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
	}), ARRAY_BUFFER, {
	  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
	  slice: function slice(start, end){
	    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
	    var len    = anObject(this).byteLength
	      , first  = toIndex(start, len)
	      , final  = toIndex(end === undefined ? len : end, len)
	      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
	      , viewS  = new $DataView(this)
	      , viewT  = new $DataView(result)
	      , index  = 0;
	    while(first < final){
	      viewT.setUint8(index++, viewS.getUint8(first++));
	    } return result;
	  }
	});
	
	__webpack_require__(250)(ARRAY_BUFFER);

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(62)
	  , hide   = __webpack_require__(68)
	  , uid    = __webpack_require__(77)
	  , TYPED  = uid('typed_array')
	  , VIEW   = uid('view')
	  , ABV    = !!(global.ArrayBuffer && global.DataView)
	  , CONSTR = ABV
	  , i = 0, l = 9, Typed;
	
	var TypedArrayConstructors = (
	  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
	).split(',');
	
	while(i < l){
	  if(Typed = global[TypedArrayConstructors[i++]]){
	    hide(Typed.prototype, TYPED, true);
	    hide(Typed.prototype, VIEW, true);
	  } else CONSTR = false;
	}
	
	module.exports = {
	  ABV:    ABV,
	  CONSTR: CONSTR,
	  TYPED:  TYPED,
	  VIEW:   VIEW
	};

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global         = __webpack_require__(62)
	  , DESCRIPTORS    = __webpack_require__(64)
	  , LIBRARY        = __webpack_require__(86)
	  , $typed         = __webpack_require__(277)
	  , hide           = __webpack_require__(68)
	  , redefineAll    = __webpack_require__(268)
	  , fails          = __webpack_require__(65)
	  , anInstance     = __webpack_require__(263)
	  , toInteger      = __webpack_require__(96)
	  , toLength       = __webpack_require__(95)
	  , gOPN           = __webpack_require__(108).f
	  , dP             = __webpack_require__(69).f
	  , arrayFill      = __webpack_require__(246)
	  , setToStringTag = __webpack_require__(82)
	  , ARRAY_BUFFER   = 'ArrayBuffer'
	  , DATA_VIEW      = 'DataView'
	  , PROTOTYPE      = 'prototype'
	  , WRONG_LENGTH   = 'Wrong length!'
	  , WRONG_INDEX    = 'Wrong index!'
	  , $ArrayBuffer   = global[ARRAY_BUFFER]
	  , $DataView      = global[DATA_VIEW]
	  , Math           = global.Math
	  , RangeError     = global.RangeError
	  , Infinity       = global.Infinity
	  , BaseBuffer     = $ArrayBuffer
	  , abs            = Math.abs
	  , pow            = Math.pow
	  , floor          = Math.floor
	  , log            = Math.log
	  , LN2            = Math.LN2
	  , BUFFER         = 'buffer'
	  , BYTE_LENGTH    = 'byteLength'
	  , BYTE_OFFSET    = 'byteOffset'
	  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
	  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
	  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;
	
	// IEEE754 conversions based on https://github.com/feross/ieee754
	var packIEEE754 = function(value, mLen, nBytes){
	  var buffer = Array(nBytes)
	    , eLen   = nBytes * 8 - mLen - 1
	    , eMax   = (1 << eLen) - 1
	    , eBias  = eMax >> 1
	    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
	    , i      = 0
	    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
	    , e, m, c;
	  value = abs(value)
	  if(value != value || value === Infinity){
	    m = value != value ? 1 : 0;
	    e = eMax;
	  } else {
	    e = floor(log(value) / LN2);
	    if(value * (c = pow(2, -e)) < 1){
	      e--;
	      c *= 2;
	    }
	    if(e + eBias >= 1){
	      value += rt / c;
	    } else {
	      value += rt * pow(2, 1 - eBias);
	    }
	    if(value * c >= 2){
	      e++;
	      c /= 2;
	    }
	    if(e + eBias >= eMax){
	      m = 0;
	      e = eMax;
	    } else if(e + eBias >= 1){
	      m = (value * c - 1) * pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * pow(2, eBias - 1) * pow(2, mLen);
	      e = 0;
	    }
	  }
	  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
	  e = e << mLen | m;
	  eLen += mLen;
	  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
	  buffer[--i] |= s * 128;
	  return buffer;
	};
	var unpackIEEE754 = function(buffer, mLen, nBytes){
	  var eLen  = nBytes * 8 - mLen - 1
	    , eMax  = (1 << eLen) - 1
	    , eBias = eMax >> 1
	    , nBits = eLen - 7
	    , i     = nBytes - 1
	    , s     = buffer[i--]
	    , e     = s & 127
	    , m;
	  s >>= 7;
	  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
	  m = e & (1 << -nBits) - 1;
	  e >>= -nBits;
	  nBits += mLen;
	  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
	  if(e === 0){
	    e = 1 - eBias;
	  } else if(e === eMax){
	    return m ? NaN : s ? -Infinity : Infinity;
	  } else {
	    m = m + pow(2, mLen);
	    e = e - eBias;
	  } return (s ? -1 : 1) * m * pow(2, e - mLen);
	};
	
	var unpackI32 = function(bytes){
	  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
	};
	var packI8 = function(it){
	  return [it & 0xff];
	};
	var packI16 = function(it){
	  return [it & 0xff, it >> 8 & 0xff];
	};
	var packI32 = function(it){
	  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
	};
	var packF64 = function(it){
	  return packIEEE754(it, 52, 8);
	};
	var packF32 = function(it){
	  return packIEEE754(it, 23, 4);
	};
	
	var addGetter = function(C, key, internal){
	  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
	};
	
	var get = function(view, bytes, index, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = store.slice(start, start + bytes);
	  return isLittleEndian ? pack : pack.reverse();
	};
	var set = function(view, bytes, index, conversion, value, isLittleEndian){
	  var numIndex = +index
	    , intIndex = toInteger(numIndex);
	  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
	  var store = view[$BUFFER]._b
	    , start = intIndex + view[$OFFSET]
	    , pack  = conversion(+value);
	  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
	};
	
	var validateArrayBufferArguments = function(that, length){
	  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
	  var numberLength = +length
	    , byteLength   = toLength(numberLength);
	  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
	  return byteLength;
	};
	
	if(!$typed.ABV){
	  $ArrayBuffer = function ArrayBuffer(length){
	    var byteLength = validateArrayBufferArguments(this, length);
	    this._b       = arrayFill.call(Array(byteLength), 0);
	    this[$LENGTH] = byteLength;
	  };
	
	  $DataView = function DataView(buffer, byteOffset, byteLength){
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = buffer[$LENGTH]
	      , offset       = toInteger(byteOffset);
	    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
	    this[$BUFFER] = buffer;
	    this[$OFFSET] = offset;
	    this[$LENGTH] = byteLength;
	  };
	
	  if(DESCRIPTORS){
	    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
	    addGetter($DataView, BUFFER, '_b');
	    addGetter($DataView, BYTE_LENGTH, '_l');
	    addGetter($DataView, BYTE_OFFSET, '_o');
	  }
	
	  redefineAll($DataView[PROTOTYPE], {
	    getInt8: function getInt8(byteOffset){
	      return get(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset){
	      return get(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /*, littleEndian */){
	      var bytes = get(this, 2, byteOffset, arguments[1]);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1]));
	    },
	    getUint32: function getUint32(byteOffset /*, littleEndian */){
	      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
	    },
	    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
	      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
	    },
	    setInt8: function setInt8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      set(this, 1, byteOffset, packI8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
	      set(this, 2, byteOffset, packI16, value, arguments[2]);
	    },
	    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packI32, value, arguments[2]);
	    },
	    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
	      set(this, 4, byteOffset, packF32, value, arguments[2]);
	    },
	    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
	      set(this, 8, byteOffset, packF64, value, arguments[2]);
	    }
	  });
	} else {
	  if(!fails(function(){
	    new $ArrayBuffer;     // eslint-disable-line no-new
	  }) || !fails(function(){
	    new $ArrayBuffer(.5); // eslint-disable-line no-new
	  })){
	    $ArrayBuffer = function ArrayBuffer(length){
	      return new BaseBuffer(validateArrayBufferArguments(this, length));
	    };
	    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
	    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
	      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
	    };
	    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var view = new $DataView(new $ArrayBuffer(2))
	    , $setInt8 = $DataView[PROTOTYPE].setInt8;
	  view.setInt8(0, 2147483648);
	  view.setInt8(1, 2147483649);
	  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
	    setInt8: function setInt8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value){
	      $setInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, true);
	}
	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);
	hide($DataView[PROTOTYPE], $typed.VIEW, true);
	exports[ARRAY_BUFFER] = $ArrayBuffer;
	exports[DATA_VIEW] = $DataView;

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66);
	$export($export.G + $export.W + $export.F * !__webpack_require__(277).ABV, {
	  DataView: __webpack_require__(278).DataView
	});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Int8', 1, function(init){
	  return function Int8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	if(__webpack_require__(64)){
	  var LIBRARY             = __webpack_require__(86)
	    , global              = __webpack_require__(62)
	    , fails               = __webpack_require__(65)
	    , $export             = __webpack_require__(66)
	    , $typed              = __webpack_require__(277)
	    , $buffer             = __webpack_require__(278)
	    , ctx                 = __webpack_require__(78)
	    , anInstance          = __webpack_require__(263)
	    , propertyDesc        = __webpack_require__(75)
	    , hide                = __webpack_require__(68)
	    , redefineAll         = __webpack_require__(268)
	    , toInteger           = __webpack_require__(96)
	    , toLength            = __webpack_require__(95)
	    , toIndex             = __webpack_require__(97)
	    , toPrimitive         = __webpack_require__(74)
	    , has                 = __webpack_require__(63)
	    , same                = __webpack_require__(129)
	    , classof             = __webpack_require__(133)
	    , isObject            = __webpack_require__(71)
	    , toObject            = __webpack_require__(116)
	    , isArrayIter         = __webpack_require__(220)
	    , create              = __webpack_require__(104)
	    , getPrototypeOf      = __webpack_require__(117)
	    , gOPN                = __webpack_require__(108).f
	    , getIterFn           = __webpack_require__(222)
	    , uid                 = __webpack_require__(77)
	    , wks                 = __webpack_require__(83)
	    , createArrayMethod   = __webpack_require__(230)
	    , createArrayIncludes = __webpack_require__(94)
	    , speciesConstructor  = __webpack_require__(265)
	    , ArrayIterators      = __webpack_require__(251)
	    , Iterators           = __webpack_require__(187)
	    , $iterDetect         = __webpack_require__(223)
	    , setSpecies          = __webpack_require__(250)
	    , arrayFill           = __webpack_require__(246)
	    , arrayCopyWithin     = __webpack_require__(243)
	    , $DP                 = __webpack_require__(69)
	    , $GOPD               = __webpack_require__(109)
	    , dP                  = $DP.f
	    , gOPD                = $GOPD.f
	    , RangeError          = global.RangeError
	    , TypeError           = global.TypeError
	    , Uint8Array          = global.Uint8Array
	    , ARRAY_BUFFER        = 'ArrayBuffer'
	    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
	    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
	    , PROTOTYPE           = 'prototype'
	    , ArrayProto          = Array[PROTOTYPE]
	    , $ArrayBuffer        = $buffer.ArrayBuffer
	    , $DataView           = $buffer.DataView
	    , arrayForEach        = createArrayMethod(0)
	    , arrayFilter         = createArrayMethod(2)
	    , arraySome           = createArrayMethod(3)
	    , arrayEvery          = createArrayMethod(4)
	    , arrayFind           = createArrayMethod(5)
	    , arrayFindIndex      = createArrayMethod(6)
	    , arrayIncludes       = createArrayIncludes(true)
	    , arrayIndexOf        = createArrayIncludes(false)
	    , arrayValues         = ArrayIterators.values
	    , arrayKeys           = ArrayIterators.keys
	    , arrayEntries        = ArrayIterators.entries
	    , arrayLastIndexOf    = ArrayProto.lastIndexOf
	    , arrayReduce         = ArrayProto.reduce
	    , arrayReduceRight    = ArrayProto.reduceRight
	    , arrayJoin           = ArrayProto.join
	    , arraySort           = ArrayProto.sort
	    , arraySlice          = ArrayProto.slice
	    , arrayToString       = ArrayProto.toString
	    , arrayToLocaleString = ArrayProto.toLocaleString
	    , ITERATOR            = wks('iterator')
	    , TAG                 = wks('toStringTag')
	    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
	    , DEF_CONSTRUCTOR     = uid('def_constructor')
	    , ALL_CONSTRUCTORS    = $typed.CONSTR
	    , TYPED_ARRAY         = $typed.TYPED
	    , VIEW                = $typed.VIEW
	    , WRONG_LENGTH        = 'Wrong length!';
	
	  var $map = createArrayMethod(1, function(O, length){
	    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
	  });
	
	  var LITTLE_ENDIAN = fails(function(){
	    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
	  });
	
	  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
	    new Uint8Array(1).set({});
	  });
	
	  var strictToLength = function(it, SAME){
	    if(it === undefined)throw TypeError(WRONG_LENGTH);
	    var number = +it
	      , length = toLength(it);
	    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
	    return length;
	  };
	
	  var toOffset = function(it, BYTES){
	    var offset = toInteger(it);
	    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
	    return offset;
	  };
	
	  var validate = function(it){
	    if(isObject(it) && TYPED_ARRAY in it)return it;
	    throw TypeError(it + ' is not a typed array!');
	  };
	
	  var allocate = function(C, length){
	    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
	      throw TypeError('It is not a typed array constructor!');
	    } return new C(length);
	  };
	
	  var speciesFromList = function(O, list){
	    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
	  };
	
	  var fromList = function(C, list){
	    var index  = 0
	      , length = list.length
	      , result = allocate(C, length);
	    while(length > index)result[index] = list[index++];
	    return result;
	  };
	
	  var addGetter = function(it, key, internal){
	    dP(it, key, {get: function(){ return this._d[internal]; }});
	  };
	
	  var $from = function from(source /*, mapfn, thisArg */){
	    var O       = toObject(source)
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , iterFn  = getIterFn(O)
	      , i, length, values, result, step, iterator;
	    if(iterFn != undefined && !isArrayIter(iterFn)){
	      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
	        values.push(step.value);
	      } O = values;
	    }
	    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
	    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
	      result[i] = mapping ? mapfn(O[i], i) : O[i];
	    }
	    return result;
	  };
	
	  var $of = function of(/*...items*/){
	    var index  = 0
	      , length = arguments.length
	      , result = allocate(this, length);
	    while(length > index)result[index] = arguments[index++];
	    return result;
	  };
	
	  // iOS Safari 6.x fails here
	  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });
	
	  var $toLocaleString = function toLocaleString(){
	    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
	  };
	
	  var proto = {
	    copyWithin: function copyWithin(target, start /*, end */){
	      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    every: function every(callbackfn /*, thisArg */){
	      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
	      return arrayFill.apply(validate(this), arguments);
	    },
	    filter: function filter(callbackfn /*, thisArg */){
	      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
	        arguments.length > 1 ? arguments[1] : undefined));
	    },
	    find: function find(predicate /*, thisArg */){
	      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    findIndex: function findIndex(predicate /*, thisArg */){
	      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    forEach: function forEach(callbackfn /*, thisArg */){
	      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    indexOf: function indexOf(searchElement /*, fromIndex */){
	      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    includes: function includes(searchElement /*, fromIndex */){
	      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    join: function join(separator){ // eslint-disable-line no-unused-vars
	      return arrayJoin.apply(validate(this), arguments);
	    },
	    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
	      return arrayLastIndexOf.apply(validate(this), arguments);
	    },
	    map: function map(mapfn /*, thisArg */){
	      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduce.apply(validate(this), arguments);
	    },
	    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
	      return arrayReduceRight.apply(validate(this), arguments);
	    },
	    reverse: function reverse(){
	      var that   = this
	        , length = validate(that).length
	        , middle = Math.floor(length / 2)
	        , index  = 0
	        , value;
	      while(index < middle){
	        value         = that[index];
	        that[index++] = that[--length];
	        that[length]  = value;
	      } return that;
	    },
	    some: function some(callbackfn /*, thisArg */){
	      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	    },
	    sort: function sort(comparefn){
	      return arraySort.call(validate(this), comparefn);
	    },
	    subarray: function subarray(begin, end){
	      var O      = validate(this)
	        , length = O.length
	        , $begin = toIndex(begin, length);
	      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
	        O.buffer,
	        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
	        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
	      );
	    }
	  };
	
	  var $slice = function slice(start, end){
	    return speciesFromList(this, arraySlice.call(validate(this), start, end));
	  };
	
	  var $set = function set(arrayLike /*, offset */){
	    validate(this);
	    var offset = toOffset(arguments[1], 1)
	      , length = this.length
	      , src    = toObject(arrayLike)
	      , len    = toLength(src.length)
	      , index  = 0;
	    if(len + offset > length)throw RangeError(WRONG_LENGTH);
	    while(index < len)this[offset + index] = src[index++];
	  };
	
	  var $iterators = {
	    entries: function entries(){
	      return arrayEntries.call(validate(this));
	    },
	    keys: function keys(){
	      return arrayKeys.call(validate(this));
	    },
	    values: function values(){
	      return arrayValues.call(validate(this));
	    }
	  };
	
	  var isTAIndex = function(target, key){
	    return isObject(target)
	      && target[TYPED_ARRAY]
	      && typeof key != 'symbol'
	      && key in target
	      && String(+key) == String(key);
	  };
	  var $getDesc = function getOwnPropertyDescriptor(target, key){
	    return isTAIndex(target, key = toPrimitive(key, true))
	      ? propertyDesc(2, target[key])
	      : gOPD(target, key);
	  };
	  var $setDesc = function defineProperty(target, key, desc){
	    if(isTAIndex(target, key = toPrimitive(key, true))
	      && isObject(desc)
	      && has(desc, 'value')
	      && !has(desc, 'get')
	      && !has(desc, 'set')
	      // TODO: add validation descriptor w/o calling accessors
	      && !desc.configurable
	      && (!has(desc, 'writable') || desc.writable)
	      && (!has(desc, 'enumerable') || desc.enumerable)
	    ){
	      target[key] = desc.value;
	      return target;
	    } else return dP(target, key, desc);
	  };
	
	  if(!ALL_CONSTRUCTORS){
	    $GOPD.f = $getDesc;
	    $DP.f   = $setDesc;
	  }
	
	  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
	    getOwnPropertyDescriptor: $getDesc,
	    defineProperty:           $setDesc
	  });
	
	  if(fails(function(){ arrayToString.call({}); })){
	    arrayToString = arrayToLocaleString = function toString(){
	      return arrayJoin.call(this);
	    }
	  }
	
	  var $TypedArrayPrototype$ = redefineAll({}, proto);
	  redefineAll($TypedArrayPrototype$, $iterators);
	  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
	  redefineAll($TypedArrayPrototype$, {
	    slice:          $slice,
	    set:            $set,
	    constructor:    function(){ /* noop */ },
	    toString:       arrayToString,
	    toLocaleString: $toLocaleString
	  });
	  addGetter($TypedArrayPrototype$, 'buffer', 'b');
	  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
	  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
	  addGetter($TypedArrayPrototype$, 'length', 'e');
	  dP($TypedArrayPrototype$, TAG, {
	    get: function(){ return this[TYPED_ARRAY]; }
	  });
	
	  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
	    CLAMPED = !!CLAMPED;
	    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
	      , ISNT_UINT8 = NAME != 'Uint8Array'
	      , GETTER     = 'get' + KEY
	      , SETTER     = 'set' + KEY
	      , TypedArray = global[NAME]
	      , Base       = TypedArray || {}
	      , TAC        = TypedArray && getPrototypeOf(TypedArray)
	      , FORCED     = !TypedArray || !$typed.ABV
	      , O          = {}
	      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
	    var getter = function(that, index){
	      var data = that._d;
	      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
	    };
	    var setter = function(that, index, value){
	      var data = that._d;
	      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
	      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
	    };
	    var addElement = function(that, index){
	      dP(that, index, {
	        get: function(){
	          return getter(this, index);
	        },
	        set: function(value){
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };
	    if(FORCED){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME, '_d');
	        var index  = 0
	          , offset = 0
	          , buffer, byteLength, length, klass;
	        if(!isObject(data)){
	          length     = strictToLength(data, true)
	          byteLength = length * BYTES;
	          buffer     = new $ArrayBuffer(byteLength);
	        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          buffer = data;
	          offset = toOffset($offset, BYTES);
	          var $len = data.byteLength;
	          if($length === undefined){
	            if($len % BYTES)throw RangeError(WRONG_LENGTH);
	            byteLength = $len - offset;
	            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if(TYPED_ARRAY in data){
	          return fromList(TypedArray, data);
	        } else {
	          return $from.call(TypedArray, data);
	        }
	        hide(that, '_d', {
	          b: buffer,
	          o: offset,
	          l: byteLength,
	          e: length,
	          v: new $DataView(buffer)
	        });
	        while(index < length)addElement(that, index++);
	      });
	      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
	      hide(TypedArrayPrototype, 'constructor', TypedArray);
	    } else if(!$iterDetect(function(iter){
	      // V8 works with iterators, but fails in many other cases
	      // https://code.google.com/p/v8/issues/detail?id=4552
	      new TypedArray(null); // eslint-disable-line no-new
	      new TypedArray(iter); // eslint-disable-line no-new
	    }, true)){
	      TypedArray = wrapper(function(that, data, $offset, $length){
	        anInstance(that, TypedArray, NAME);
	        var klass;
	        // `ws` module bug, temporarily remove validation length for Uint8Array
	        // https://github.com/websockets/ws/pull/645
	        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
	        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
	          return $length !== undefined
	            ? new Base(data, toOffset($offset, BYTES), $length)
	            : $offset !== undefined
	              ? new Base(data, toOffset($offset, BYTES))
	              : new Base(data);
	        }
	        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
	        return $from.call(TypedArray, data);
	      });
	      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
	        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
	      });
	      TypedArray[PROTOTYPE] = TypedArrayPrototype;
	      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
	    }
	    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
	      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
	      , $iterator         = $iterators.values;
	    hide(TypedArray, TYPED_CONSTRUCTOR, true);
	    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
	    hide(TypedArrayPrototype, VIEW, true);
	    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);
	
	    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
	      dP(TypedArrayPrototype, TAG, {
	        get: function(){ return NAME; }
	      });
	    }
	
	    O[NAME] = TypedArray;
	
	    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);
	
	    $export($export.S, NAME, {
	      BYTES_PER_ELEMENT: BYTES,
	      from: $from,
	      of: $of
	    });
	
	    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);
	
	    $export($export.P, NAME, proto);
	
	    setSpecies(NAME);
	
	    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});
	
	    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);
	
	    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});
	
	    $export($export.P + $export.F * fails(function(){
	      new TypedArray(1).slice();
	    }), NAME, {slice: $slice});
	
	    $export($export.P + $export.F * (fails(function(){
	      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
	    }) || !fails(function(){
	      TypedArrayPrototype.toLocaleString.call([1, 2]);
	    })), NAME, {toLocaleString: $toLocaleString});
	
	    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
	    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
	  };
	} else module.exports = function(){ /* empty */ };

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Uint8', 1, function(init){
	  return function Uint8Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Uint8', 1, function(init){
	  return function Uint8ClampedArray(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	}, true);

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Int16', 2, function(init){
	  return function Int16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Uint16', 2, function(init){
	  return function Uint16Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Int32', 4, function(init){
	  return function Int32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Uint32', 4, function(init){
	  return function Uint32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Float32', 4, function(init){
	  return function Float32Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(281)('Float64', 8, function(init){
	  return function Float64Array(data, byteOffset, length){
	    return init(this, data, byteOffset, length);
	  };
	});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(66)
	  , aFunction = __webpack_require__(79)
	  , anObject  = __webpack_require__(70)
	  , rApply    = (__webpack_require__(62).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(65)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export    = __webpack_require__(66)
	  , create     = __webpack_require__(104)
	  , aFunction  = __webpack_require__(79)
	  , anObject   = __webpack_require__(70)
	  , isObject   = __webpack_require__(71)
	  , fails      = __webpack_require__(65)
	  , bind       = __webpack_require__(135)
	  , rConstruct = (__webpack_require__(62).Reflect || {}).construct;
	
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function(){
	  function F(){}
	  return !(rConstruct(function(){}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function(){
	  rConstruct(function(){});
	});
	
	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(69)
	  , $export     = __webpack_require__(66)
	  , anObject    = __webpack_require__(70)
	  , toPrimitive = __webpack_require__(74);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(65)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(66)
	  , gOPD     = __webpack_require__(109).f
	  , anObject = __webpack_require__(70);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(66)
	  , anObject = __webpack_require__(70);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(188)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(109)
	  , getPrototypeOf = __webpack_require__(117)
	  , has            = __webpack_require__(63)
	  , $export        = __webpack_require__(66)
	  , isObject       = __webpack_require__(71)
	  , anObject       = __webpack_require__(70);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(109)
	  , $export  = __webpack_require__(66)
	  , anObject = __webpack_require__(70);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(66)
	  , getProto = __webpack_require__(117)
	  , anObject = __webpack_require__(70);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(66)
	  , anObject      = __webpack_require__(70)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(301)});

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(108)
	  , gOPS     = __webpack_require__(101)
	  , anObject = __webpack_require__(70)
	  , Reflect  = __webpack_require__(62).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(66)
	  , anObject           = __webpack_require__(70)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(69)
	  , gOPD           = __webpack_require__(109)
	  , getPrototypeOf = __webpack_require__(117)
	  , has            = __webpack_require__(63)
	  , $export        = __webpack_require__(66)
	  , createDesc     = __webpack_require__(75)
	  , anObject       = __webpack_require__(70)
	  , isObject       = __webpack_require__(71);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(66)
	  , setProto = __webpack_require__(131);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/Array.prototype.includes
	var $export   = __webpack_require__(66)
	  , $includes = __webpack_require__(94)(true);
	
	$export($export.P, 'Array', {
	  includes: function includes(el /*, fromIndex = 0 */){
	    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});
	
	__webpack_require__(244)('includes');

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/mathiasbynens/String.prototype.at
	var $export = __webpack_require__(66)
	  , $at     = __webpack_require__(185)(true);
	
	$export($export.P, 'String', {
	  at: function at(pos){
	    return $at(this, pos);
	  }
	});

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(66)
	  , $pad    = __webpack_require__(308);
	
	$export($export.P, 'String', {
	  padStart: function padStart(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
	  }
	});

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-string-pad-start-end
	var toLength = __webpack_require__(95)
	  , repeat   = __webpack_require__(149)
	  , defined  = __webpack_require__(93);
	
	module.exports = function(that, maxLength, fillString, left){
	  var S            = String(defined(that))
	    , stringLength = S.length
	    , fillStr      = fillString === undefined ? ' ' : String(fillString)
	    , intMaxLength = toLength(maxLength);
	  if(intMaxLength <= stringLength || fillStr == '')return S;
	  var fillLen = intMaxLength - stringLength
	    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
	  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
	  return left ? stringFiller + S : S + stringFiller;
	};


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/tc39/proposal-string-pad-start-end
	var $export = __webpack_require__(66)
	  , $pad    = __webpack_require__(308);
	
	$export($export.P, 'String', {
	  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
	    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
	  }
	});

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(141)('trimLeft', function($trim){
	  return function trimLeft(){
	    return $trim(this, 1);
	  };
	}, 'trimStart');

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
	__webpack_require__(141)('trimRight', function($trim){
	  return function trimRight(){
	    return $trim(this, 2);
	  };
	}, 'trimEnd');

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://tc39.github.io/String.prototype.matchAll/
	var $export     = __webpack_require__(66)
	  , defined     = __webpack_require__(93)
	  , toLength    = __webpack_require__(95)
	  , isRegExp    = __webpack_require__(192)
	  , getFlags    = __webpack_require__(254)
	  , RegExpProto = RegExp.prototype;
	
	var $RegExpStringIterator = function(regexp, string){
	  this._r = regexp;
	  this._s = string;
	};
	
	__webpack_require__(188)($RegExpStringIterator, 'RegExp String', function next(){
	  var match = this._r.exec(this._s);
	  return {value: match, done: match === null};
	});
	
	$export($export.P, 'String', {
	  matchAll: function matchAll(regexp){
	    defined(this);
	    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
	    var S     = String(this)
	      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
	      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
	    rx.lastIndex = toLength(regexp.lastIndex);
	    return new $RegExpStringIterator(rx, S);
	  }
	});

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85)('asyncIterator');

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85)('observable');

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-getownpropertydescriptors
	var $export        = __webpack_require__(66)
	  , ownKeys        = __webpack_require__(301)
	  , toIObject      = __webpack_require__(90)
	  , gOPD           = __webpack_require__(109)
	  , createProperty = __webpack_require__(221);
	
	$export($export.S, 'Object', {
	  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
	    var O       = toIObject(object)
	      , getDesc = gOPD.f
	      , keys    = ownKeys(O)
	      , result  = {}
	      , i       = 0
	      , key;
	    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
	    return result;
	  }
	});

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export = __webpack_require__(66)
	  , $values = __webpack_require__(317)(false);
	
	$export($export.S, 'Object', {
	  values: function values(it){
	    return $values(it);
	  }
	});

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(88)
	  , toIObject = __webpack_require__(90)
	  , isEnum    = __webpack_require__(102).f;
	module.exports = function(isEntries){
	  return function(it){
	    var O      = toIObject(it)
	      , keys   = getKeys(O)
	      , length = keys.length
	      , i      = 0
	      , result = []
	      , key;
	    while(length > i)if(isEnum.call(O, key = keys[i++])){
	      result.push(isEntries ? [key, O[key]] : O[key]);
	    } return result;
	  };
	};

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/tc39/proposal-object-values-entries
	var $export  = __webpack_require__(66)
	  , $entries = __webpack_require__(317)(true);
	
	$export($export.S, 'Object', {
	  entries: function entries(it){
	    return $entries(it);
	  }
	});

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(66)
	  , toObject        = __webpack_require__(116)
	  , aFunction       = __webpack_require__(79)
	  , $defineProperty = __webpack_require__(69);
	
	// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
	__webpack_require__(64) && $export($export.P + __webpack_require__(320), 'Object', {
	  __defineGetter__: function __defineGetter__(P, getter){
	    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	// Forced replacement prototype accessors methods
	module.exports = __webpack_require__(86)|| !__webpack_require__(65)(function(){
	  var K = Math.random();
	  // In FF throws only define methods
	  __defineSetter__.call(null, K, function(){ /* empty */});
	  delete __webpack_require__(62)[K];
	});

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export         = __webpack_require__(66)
	  , toObject        = __webpack_require__(116)
	  , aFunction       = __webpack_require__(79)
	  , $defineProperty = __webpack_require__(69);
	
	// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
	__webpack_require__(64) && $export($export.P + __webpack_require__(320), 'Object', {
	  __defineSetter__: function __defineSetter__(P, setter){
	    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
	  }
	});

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(66)
	  , toObject                 = __webpack_require__(116)
	  , toPrimitive              = __webpack_require__(74)
	  , getPrototypeOf           = __webpack_require__(117)
	  , getOwnPropertyDescriptor = __webpack_require__(109).f;
	
	// B.2.2.4 Object.prototype.__lookupGetter__(P)
	__webpack_require__(64) && $export($export.P + __webpack_require__(320), 'Object', {
	  __lookupGetter__: function __lookupGetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.get;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $export                  = __webpack_require__(66)
	  , toObject                 = __webpack_require__(116)
	  , toPrimitive              = __webpack_require__(74)
	  , getPrototypeOf           = __webpack_require__(117)
	  , getOwnPropertyDescriptor = __webpack_require__(109).f;
	
	// B.2.2.5 Object.prototype.__lookupSetter__(P)
	__webpack_require__(64) && $export($export.P + __webpack_require__(320), 'Object', {
	  __lookupSetter__: function __lookupSetter__(P){
	    var O = toObject(this)
	      , K = toPrimitive(P, true)
	      , D;
	    do {
	      if(D = getOwnPropertyDescriptor(O, K))return D.set;
	    } while(O = getPrototypeOf(O));
	  }
	});

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(66);
	
	$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(325)('Map')});

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var classof = __webpack_require__(133)
	  , from    = __webpack_require__(326);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    return from(this);
	  };
	};

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var forOf = __webpack_require__(264);
	
	module.exports = function(iter, ITERATOR){
	  var result = [];
	  forOf(iter, false, result.push, result, ITERATOR);
	  return result;
	};


/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(66);
	
	$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(325)('Set')});

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-global
	var $export = __webpack_require__(66);
	
	$export($export.S, 'System', {global: __webpack_require__(62)});

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/ljharb/proposal-is-error
	var $export = __webpack_require__(66)
	  , cof     = __webpack_require__(92);
	
	$export($export.S, 'Error', {
	  isError: function isError(it){
	    return cof(it) === 'Error';
	  }
	});

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  iaddh: function iaddh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
	  }
	});

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  isubh: function isubh(x0, x1, y0, y1){
	    var $x0 = x0 >>> 0
	      , $x1 = x1 >>> 0
	      , $y0 = y0 >>> 0;
	    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
	  }
	});

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  imulh: function imulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >> 16
	      , v1 = $v >> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
	  }
	});

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
	var $export = __webpack_require__(66);
	
	$export($export.S, 'Math', {
	  umulh: function umulh(u, v){
	    var UINT16 = 0xffff
	      , $u = +u
	      , $v = +v
	      , u0 = $u & UINT16
	      , v0 = $v & UINT16
	      , u1 = $u >>> 16
	      , v1 = $v >>> 16
	      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
	    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
	  }
	});

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(335)
	  , anObject                  = __webpack_require__(70)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
	  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
	}});

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var Map     = __webpack_require__(269)
	  , $export = __webpack_require__(66)
	  , shared  = __webpack_require__(81)('metadata')
	  , store   = shared.store || (shared.store = new (__webpack_require__(273)));
	
	var getOrCreateMetadataMap = function(target, targetKey, create){
	  var targetMetadata = store.get(target);
	  if(!targetMetadata){
	    if(!create)return undefined;
	    store.set(target, targetMetadata = new Map);
	  }
	  var keyMetadata = targetMetadata.get(targetKey);
	  if(!keyMetadata){
	    if(!create)return undefined;
	    targetMetadata.set(targetKey, keyMetadata = new Map);
	  } return keyMetadata;
	};
	var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
	};
	var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
	  var metadataMap = getOrCreateMetadataMap(O, P, false);
	  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	};
	var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
	  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
	};
	var ordinaryOwnMetadataKeys = function(target, targetKey){
	  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
	    , keys        = [];
	  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
	  return keys;
	};
	var toMetaKey = function(it){
	  return it === undefined || typeof it == 'symbol' ? it : String(it);
	};
	var exp = function(O){
	  $export($export.S, 'Reflect', O);
	};
	
	module.exports = {
	  store: store,
	  map: getOrCreateMetadataMap,
	  has: ordinaryHasOwnMetadata,
	  get: ordinaryGetOwnMetadata,
	  set: ordinaryDefineOwnMetadata,
	  keys: ordinaryOwnMetadataKeys,
	  key: toMetaKey,
	  exp: exp
	};

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(335)
	  , anObject               = __webpack_require__(70)
	  , toMetaKey              = metadata.key
	  , getOrCreateMetadataMap = metadata.map
	  , store                  = metadata.store;
	
	metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
	  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
	    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
	  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
	  if(metadataMap.size)return true;
	  var targetMetadata = store.get(target);
	  targetMetadata['delete'](targetKey);
	  return !!targetMetadata.size || store['delete'](target);
	}});

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(335)
	  , anObject               = __webpack_require__(70)
	  , getPrototypeOf         = __webpack_require__(117)
	  , ordinaryHasOwnMetadata = metadata.has
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	var ordinaryGetMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
	};
	
	metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	var Set                     = __webpack_require__(272)
	  , from                    = __webpack_require__(326)
	  , metadata                = __webpack_require__(335)
	  , anObject                = __webpack_require__(70)
	  , getPrototypeOf          = __webpack_require__(117)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	var ordinaryMetadataKeys = function(O, P){
	  var oKeys  = ordinaryOwnMetadataKeys(O, P)
	    , parent = getPrototypeOf(O);
	  if(parent === null)return oKeys;
	  var pKeys  = ordinaryMetadataKeys(parent, P);
	  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
	};
	
	metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
	  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(335)
	  , anObject               = __webpack_require__(70)
	  , ordinaryGetOwnMetadata = metadata.get
	  , toMetaKey              = metadata.key;
	
	metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                = __webpack_require__(335)
	  , anObject                = __webpack_require__(70)
	  , ordinaryOwnMetadataKeys = metadata.keys
	  , toMetaKey               = metadata.key;
	
	metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
	  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
	}});

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(335)
	  , anObject               = __webpack_require__(70)
	  , getPrototypeOf         = __webpack_require__(117)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	var ordinaryHasMetadata = function(MetadataKey, O, P){
	  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
	  if(hasOwn)return true;
	  var parent = getPrototypeOf(O);
	  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
	};
	
	metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

	var metadata               = __webpack_require__(335)
	  , anObject               = __webpack_require__(70)
	  , ordinaryHasOwnMetadata = metadata.has
	  , toMetaKey              = metadata.key;
	
	metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
	  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
	    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
	}});

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	var metadata                  = __webpack_require__(335)
	  , anObject                  = __webpack_require__(70)
	  , aFunction                 = __webpack_require__(79)
	  , toMetaKey                 = metadata.key
	  , ordinaryDefineOwnMetadata = metadata.set;
	
	metadata.exp({metadata: function metadata(metadataKey, metadataValue){
	  return function decorator(target, targetKey){
	    ordinaryDefineOwnMetadata(
	      metadataKey, metadataValue,
	      (targetKey !== undefined ? anObject : aFunction)(target),
	      toMetaKey(targetKey)
	    );
	  };
	}});

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
	var $export   = __webpack_require__(66)
	  , microtask = __webpack_require__(267)()
	  , process   = __webpack_require__(62).process
	  , isNode    = __webpack_require__(92)(process) == 'process';
	
	$export($export.G, {
	  asap: function asap(fn){
	    var domain = isNode && process.domain;
	    microtask(domain ? domain.bind(fn) : fn);
	  }
	});

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// https://github.com/zenparsing/es-observable
	var $export     = __webpack_require__(66)
	  , global      = __webpack_require__(62)
	  , core        = __webpack_require__(67)
	  , microtask   = __webpack_require__(267)()
	  , OBSERVABLE  = __webpack_require__(83)('observable')
	  , aFunction   = __webpack_require__(79)
	  , anObject    = __webpack_require__(70)
	  , anInstance  = __webpack_require__(263)
	  , redefineAll = __webpack_require__(268)
	  , hide        = __webpack_require__(68)
	  , forOf       = __webpack_require__(264)
	  , RETURN      = forOf.RETURN;
	
	var getMethod = function(fn){
	  return fn == null ? undefined : aFunction(fn);
	};
	
	var cleanupSubscription = function(subscription){
	  var cleanup = subscription._c;
	  if(cleanup){
	    subscription._c = undefined;
	    cleanup();
	  }
	};
	
	var subscriptionClosed = function(subscription){
	  return subscription._o === undefined;
	};
	
	var closeSubscription = function(subscription){
	  if(!subscriptionClosed(subscription)){
	    subscription._o = undefined;
	    cleanupSubscription(subscription);
	  }
	};
	
	var Subscription = function(observer, subscriber){
	  anObject(observer);
	  this._c = undefined;
	  this._o = observer;
	  observer = new SubscriptionObserver(this);
	  try {
	    var cleanup      = subscriber(observer)
	      , subscription = cleanup;
	    if(cleanup != null){
	      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
	      else aFunction(cleanup);
	      this._c = cleanup;
	    }
	  } catch(e){
	    observer.error(e);
	    return;
	  } if(subscriptionClosed(this))cleanupSubscription(this);
	};
	
	Subscription.prototype = redefineAll({}, {
	  unsubscribe: function unsubscribe(){ closeSubscription(this); }
	});
	
	var SubscriptionObserver = function(subscription){
	  this._s = subscription;
	};
	
	SubscriptionObserver.prototype = redefineAll({}, {
	  next: function next(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      try {
	        var m = getMethod(observer.next);
	        if(m)return m.call(observer, value);
	      } catch(e){
	        try {
	          closeSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      }
	    }
	  },
	  error: function error(value){
	    var subscription = this._s;
	    if(subscriptionClosed(subscription))throw value;
	    var observer = subscription._o;
	    subscription._o = undefined;
	    try {
	      var m = getMethod(observer.error);
	      if(!m)throw value;
	      value = m.call(observer, value);
	    } catch(e){
	      try {
	        cleanupSubscription(subscription);
	      } finally {
	        throw e;
	      }
	    } cleanupSubscription(subscription);
	    return value;
	  },
	  complete: function complete(value){
	    var subscription = this._s;
	    if(!subscriptionClosed(subscription)){
	      var observer = subscription._o;
	      subscription._o = undefined;
	      try {
	        var m = getMethod(observer.complete);
	        value = m ? m.call(observer, value) : undefined;
	      } catch(e){
	        try {
	          cleanupSubscription(subscription);
	        } finally {
	          throw e;
	        }
	      } cleanupSubscription(subscription);
	      return value;
	    }
	  }
	});
	
	var $Observable = function Observable(subscriber){
	  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
	};
	
	redefineAll($Observable.prototype, {
	  subscribe: function subscribe(observer){
	    return new Subscription(observer, this._f);
	  },
	  forEach: function forEach(fn){
	    var that = this;
	    return new (core.Promise || global.Promise)(function(resolve, reject){
	      aFunction(fn);
	      var subscription = that.subscribe({
	        next : function(value){
	          try {
	            return fn(value);
	          } catch(e){
	            reject(e);
	            subscription.unsubscribe();
	          }
	        },
	        error: reject,
	        complete: resolve
	      });
	    });
	  }
	});
	
	redefineAll($Observable, {
	  from: function from(x){
	    var C = typeof this === 'function' ? this : $Observable;
	    var method = getMethod(anObject(x)[OBSERVABLE]);
	    if(method){
	      var observable = anObject(method.call(x));
	      return observable.constructor === C ? observable : new C(function(observer){
	        return observable.subscribe(observer);
	      });
	    }
	    return new C(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          try {
	            if(forOf(x, false, function(it){
	              observer.next(it);
	              if(done)return RETURN;
	            }) === RETURN)return;
	          } catch(e){
	            if(done)throw e;
	            observer.error(e);
	            return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  },
	  of: function of(){
	    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
	    return new (typeof this === 'function' ? this : $Observable)(function(observer){
	      var done = false;
	      microtask(function(){
	        if(!done){
	          for(var i = 0; i < items.length; ++i){
	            observer.next(items[i]);
	            if(done)return;
	          } observer.complete();
	        }
	      });
	      return function(){ done = true; };
	    });
	  }
	});
	
	hide($Observable.prototype, OBSERVABLE, function(){ return this; });
	
	$export($export.G, {Observable: $Observable});
	
	__webpack_require__(250)('Observable');

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

	// ie9- setTimeout & setInterval additional parameters fix
	var global     = __webpack_require__(62)
	  , $export    = __webpack_require__(66)
	  , invoke     = __webpack_require__(136)
	  , partial    = __webpack_require__(347)
	  , navigator  = global.navigator
	  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
	var wrap = function(set){
	  return MSIE ? function(fn, time /*, ...args */){
	    return set(invoke(
	      partial,
	      [].slice.call(arguments, 2),
	      typeof fn == 'function' ? fn : Function(fn)
	    ), time);
	  } : set;
	};
	$export($export.G + $export.B + $export.F * MSIE, {
	  setTimeout:  wrap(global.setTimeout),
	  setInterval: wrap(global.setInterval)
	});

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var path      = __webpack_require__(348)
	  , invoke    = __webpack_require__(136)
	  , aFunction = __webpack_require__(79);
	module.exports = function(/* ...pargs */){
	  var fn     = aFunction(this)
	    , length = arguments.length
	    , pargs  = Array(length)
	    , i      = 0
	    , _      = path._
	    , holder = false;
	  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
	  return function(/* ...args */){
	    var that = this
	      , aLen = arguments.length
	      , j = 0, k = 0, args;
	    if(!holder && !aLen)return invoke(fn, pargs, that);
	    args = pargs.slice();
	    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
	    while(aLen > k)args.push(arguments[k++]);
	    return invoke(fn, args, that);
	  };
	};

/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(62);

/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(66)
	  , $task   = __webpack_require__(266);
	$export($export.G + $export.B, {
	  setImmediate:   $task.set,
	  clearImmediate: $task.clear
	});

/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	var $iterators    = __webpack_require__(251)
	  , redefine      = __webpack_require__(76)
	  , global        = __webpack_require__(62)
	  , hide          = __webpack_require__(68)
	  , Iterators     = __webpack_require__(187)
	  , wks           = __webpack_require__(83)
	  , ITERATOR      = wks('iterator')
	  , TO_STRING_TAG = wks('toStringTag')
	  , ArrayValues   = Iterators.Array;
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype
	    , key;
	  if(proto){
	    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
	    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	    Iterators[NAME] = ArrayValues;
	    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
	  }
	}

/***/ },
/* 351 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {/**
	 * Copyright (c) 2014, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
	 * additional grant of patent rights can be found in the PATENTS file in
	 * the same directory.
	 */
	
	!(function(global) {
	  "use strict";
	
	  var hasOwn = Object.prototype.hasOwnProperty;
	  var undefined; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	
	  var inModule = typeof module === "object";
	  var runtime = global.regeneratorRuntime;
	  if (runtime) {
	    if (inModule) {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    }
	    // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.
	    return;
	  }
	
	  // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.
	  runtime = global.regeneratorRuntime = inModule ? module.exports : {};
	
	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided, then outerFn.prototype instanceof Generator.
	    var generator = Object.create((outerFn || Generator).prototype);
	    var context = new Context(tryLocsList || []);
	
	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	
	    return generator;
	  }
	  runtime.wrap = wrap;
	
	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }
	
	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";
	
	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};
	
	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}
	
	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";
	
	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }
	
	  runtime.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };
	
	  runtime.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };
	
	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `value instanceof AwaitArgument` to determine if the yielded value is
	  // meant to be awaited. Some may consider the name of this method too
	  // cutesy, but they are curmudgeons.
	  runtime.awrap = function(arg) {
	    return new AwaitArgument(arg);
	  };
	
	  function AwaitArgument(arg) {
	    this.arg = arg;
	  }
	
	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value instanceof AwaitArgument) {
	          return Promise.resolve(value.arg).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }
	
	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration. If the Promise is rejected, however, the
	          // result for this iteration will be rejected with the same
	          // reason. Note that rejections of yielded Promises are not
	          // thrown back into the generator function, as is the case
	          // when an awaited Promise is rejected. This difference in
	          // behavior between yield and await is important, because it
	          // allows the consumer to decide what to do with the yielded
	          // rejection (swallow it and continue, manually .throw it back
	          // into the generator, abandon iteration, whatever). With
	          // await, by contrast, there is no opportunity to examine the
	          // rejection reason outside the generator function, so the
	          // only option is to throw it from the await expression, and
	          // let the generator function handle the exception.
	          result.value = unwrapped;
	          resolve(result);
	        }, reject);
	      }
	    }
	
	    if (typeof process === "object" && process.domain) {
	      invoke = process.domain.bind(invoke);
	    }
	
	    var previousPromise;
	
	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }
	
	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }
	
	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }
	
	  defineIteratorMethods(AsyncIterator.prototype);
	
	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );
	
	    return runtime.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };
	
	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }
	
	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }
	
	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }
	
	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          if (method === "return" ||
	              (method === "throw" && delegate.iterator[method] === undefined)) {
	            // A return or throw (when the delegate iterator has no throw
	            // method) always terminates the yield* loop.
	            context.delegate = null;
	
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            var returnMethod = delegate.iterator["return"];
	            if (returnMethod) {
	              var record = tryCatch(returnMethod, delegate.iterator, arg);
	              if (record.type === "throw") {
	                // If the return method threw an exception, let that
	                // exception prevail over the original return or throw.
	                method = "throw";
	                arg = record.arg;
	                continue;
	              }
	            }
	
	            if (method === "return") {
	              // Continue with the outer return, now that the delegate
	              // iterator has been terminated.
	              continue;
	            }
	          }
	
	          var record = tryCatch(
	            delegate.iterator[method],
	            delegate.iterator,
	            arg
	          );
	
	          if (record.type === "throw") {
	            context.delegate = null;
	
	            // Like returning generator.throw(uncaught), but without the
	            // overhead of an extra function call.
	            method = "throw";
	            arg = record.arg;
	            continue;
	          }
	
	          // Delegate generator ran and handled its own exceptions so
	          // regardless of what the method was, we continue as if it is
	          // "next" with an undefined arg.
	          method = "next";
	          arg = undefined;
	
	          var info = record.arg;
	          if (info.done) {
	            context[delegate.resultName] = info.value;
	            context.next = delegate.nextLoc;
	          } else {
	            state = GenStateSuspendedYield;
	            return info;
	          }
	
	          context.delegate = null;
	        }
	
	        if (method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = arg;
	
	        } else if (method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw arg;
	          }
	
	          if (context.dispatchException(arg)) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            method = "next";
	            arg = undefined;
	          }
	
	        } else if (method === "return") {
	          context.abrupt("return", arg);
	        }
	
	        state = GenStateExecuting;
	
	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;
	
	          var info = {
	            value: record.arg,
	            done: context.done
	          };
	
	          if (record.arg === ContinueSentinel) {
	            if (context.delegate && method === "next") {
	              // Deliberately forget the last sent value so that we don't
	              // accidentally pass it on to the delegate.
	              arg = undefined;
	            }
	          } else {
	            return info;
	          }
	
	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(arg) call above.
	          method = "throw";
	          arg = record.arg;
	        }
	      }
	    };
	  }
	
	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);
	
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };
	
	  Gp[toStringTagSymbol] = "Generator";
	
	  Gp.toString = function() {
	    return "[object Generator]";
	  };
	
	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };
	
	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }
	
	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }
	
	    this.tryEntries.push(entry);
	  }
	
	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }
	
	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }
	
	  runtime.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();
	
	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }
	
	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };
	
	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }
	
	      if (typeof iterable.next === "function") {
	        return iterable;
	      }
	
	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }
	
	          next.value = undefined;
	          next.done = true;
	
	          return next;
	        };
	
	        return next.next = next;
	      }
	    }
	
	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  runtime.values = values;
	
	  function doneResult() {
	    return { value: undefined, done: true };
	  }
	
	  Context.prototype = {
	    constructor: Context,
	
	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	
	      this.tryEntries.forEach(resetTryEntry);
	
	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	
	    stop: function() {
	      this.done = true;
	
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }
	
	      return this.rval;
	    },
	
	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }
	
	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;
	        return !!caught;
	      }
	
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;
	
	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }
	
	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");
	
	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	
	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }
	
	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }
	
	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;
	
	      if (finallyEntry) {
	        this.next = finallyEntry.finallyLoc;
	      } else {
	        this.complete(record);
	      }
	
	      return ContinueSentinel;
	    },
	
	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }
	
	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = record.arg;
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }
	    },
	
	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	
	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }
	
	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },
	
	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };
	
	      return ContinueSentinel;
	    }
	  };
	})(
	  // Among the various tricks for obtaining a reference to the global
	  // object, this seems to be the most reliable technique that does not
	  // use indirect eval (which violates Content Security Policy).
	  typeof global === "object" ? global :
	  typeof window === "object" ? window :
	  typeof self === "object" ? self : this
	);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(352)))

/***/ },
/* 352 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(354);
	module.exports = __webpack_require__(67).RegExp.escape;

/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/benjamingr/RexExp.escape
	var $export = __webpack_require__(66)
	  , $re     = __webpack_require__(355)(/[\\^$*+?.()|[\]{}]/g, '\\$&');
	
	$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ },
/* 355 */
/***/ function(module, exports) {

	module.exports = function(regExp, replace){
	  var replacer = replace === Object(replace) ? function(part){
	    return replace[part];
	  } : replace;
	  return function(it){
	    return String(it).replace(regExp, replacer);
	  };
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bundle.js.map