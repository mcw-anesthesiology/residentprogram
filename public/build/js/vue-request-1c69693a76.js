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
return webpackJsonp([6,9],{

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* name */
  "SelectTwo",
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(30),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/SelectTwo.vue"
if (Component.options.functional) {console.error("[vue-loader] SelectTwo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e84f7814", Component.options)
  } else {
    hotAPI.reload("data-v-e84f7814", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 14:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(14)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../css-loader/index.js!./flatpickr.min.css", function() {
			var newContent = require("!!./../../css-loader/index.js!./flatpickr.min.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 20:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_downloadjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_downloadjs__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			$(this.$refs.table).DataTable({
				retrieve: true
			}).ajax.reload(null, false);
		},
		exportCsv: function exportCsv() {
			var header = [];
			header.fill([], this.thead.length);
			this.thead.map(function (row, rowIndex) {
				if (!header[rowIndex]) header[rowIndex] = [];

				row.map(function (cell, cellIndex) {
					while (header[rowIndex][cellIndex]) {
						cellIndex++;
					}if (cell.rowspan) {
						for (var i = 0; i < cell.rowspan; i++) {
							if (!header[rowIndex + i]) header[rowIndex + i] = [];

							header[rowIndex + i][cellIndex] = cell.text;
							if (cell.colspan) {
								for (var j = 0; j < cell.colspan; j++) {
									header[rowIndex][cellIndex + j] = cell.text;
								}
							}
						}
					} else if (cell.colspan) {
						for (var _j = 0; _j < cell.colspan; _j++) {
							header[rowIndex][cellIndex + _j] = cell.text;
						}
					} else {
						header[rowIndex][cellIndex] = cell.text;
					}
				});
			});

			var rows = this.data.map(function (row) {
				return row.map(function (cell) {
					return typeof cell === 'string' ? '"' + cell + '"' : cell;
				}).join(',');
			}).sort();
			var table = header.concat(rows);
			__WEBPACK_IMPORTED_MODULE_0_downloadjs___default()(table.join('\n'), this.exportFilename + '.csv', 'text/csv');
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
};

/***/ }),

/***/ 21:
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

/* harmony default export */ __webpack_exports__["default"] = {
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
			if (!this.value) return '';

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
			_this.$emit('input', $(_this.$el).val());
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
};

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".flatpickr-input{cursor:pointer;z-index:1}.flatpickr-mobileInput{width:0;height:0}.flatpickr-calendar,.flatpickr-mobileInput{opacity:0;visibility:hidden;position:absolute;box-sizing:border-box;padding:0}.flatpickr-calendar{background:transparent;overflow:hidden;max-height:0;text-align:center;-webkit-animation:none;animation:none;direction:ltr;border:0;font-size:14px;line-height:24px;border-radius:5px;width:293.75px;background:#fff;box-shadow:1px 0 0 #e6e6e6,-1px 0 0 #e6e6e6,0 1px 0 #e6e6e6,0 -1px 0 #e6e6e6,0 3px 13px rgba(0,0,0,.08);z-index:5}.flatpickr-calendar.inline,.flatpickr-calendar.open{opacity:1;visibility:visible;overflow:visible;max-height:640px}.flatpickr-calendar.open{display:inline-block;z-index:6;-webkit-animation:a .5s cubic-bezier(0,1,.5,1);animation:a .5s cubic-bezier(0,1,.5,1)}.flatpickr-calendar.inline{display:block;position:relative}.flatpickr-calendar.static{position:relative;top:2px}.flatpickr-calendar.static.open{display:block}.flatpickr-calendar.hasWeeks{width:auto}.flatpickr-calendar.dateIsPicked.hasTime .flatpickr-time{height:40px}.flatpickr-calendar.noCalendar.hasTime .flatpickr-time{height:auto}.flatpickr-calendar:after,.flatpickr-calendar:before{position:absolute;display:block;pointer-events:none;border:solid transparent;content:\"\";height:0;width:0;left:22px}.flatpickr-calendar.rightMost:after,.flatpickr-calendar.rightMost:before{left:auto;right:22px}.flatpickr-calendar:before{border-width:5px;margin:0 -5px}.flatpickr-calendar:after{border-width:4px;margin:0 -4px}.flatpickr-calendar.arrowTop:after,.flatpickr-calendar.arrowTop:before{bottom:100%}.flatpickr-calendar.arrowTop:before{border-bottom-color:#e6e6e6}.flatpickr-calendar.arrowTop:after{border-bottom-color:#fff}.flatpickr-calendar.arrowBottom:after,.flatpickr-calendar.arrowBottom:before{top:100%}.flatpickr-calendar.arrowBottom:before{border-top-color:#e6e6e6}.flatpickr-calendar.arrowBottom:after{border-top-color:#fff}.flatpickr-month{background:transparent;color:rgba(0,0,0,.9);fill:rgba(0,0,0,.9);height:28px;line-height:24px;text-align:center;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}.flatpickr-next-month,.flatpickr-prev-month{text-decoration:none;cursor:pointer;position:absolute;top:10px;height:16px;line-height:16px}.flatpickr-next-month i,.flatpickr-prev-month i{position:relative}.flatpickr-next-month.flatpickr-prev-month,.flatpickr-prev-month.flatpickr-prev-month{left:calc(3.57% - 1.5px)}.flatpickr-next-month.flatpickr-next-month,.flatpickr-prev-month.flatpickr-next-month{right:calc(3.57% - 1.5px)}.flatpickr-next-month:hover,.flatpickr-prev-month:hover{color:#959ea9}.flatpickr-next-month:hover svg,.flatpickr-prev-month:hover svg{fill:#f64747}.flatpickr-next-month svg,.flatpickr-prev-month svg{width:14px}.flatpickr-next-month svg path,.flatpickr-prev-month svg path{-webkit-transition:fill .1s;transition:fill .1s;fill:inherit}.numInputWrapper{position:relative;height:auto}.numInputWrapper input,.numInputWrapper span{display:inline-block}.numInputWrapper input{width:100%}.numInputWrapper span{position:absolute;right:0;width:14px;padding:0 4px 0 2px;height:50%;line-height:50%;opacity:0;z-index:4;cursor:pointer;border:1px solid rgba(57,57,57,.05);box-sizing:border-box}.numInputWrapper span:hover{background:rgba(0,0,0,.1)}.numInputWrapper span:active{background:rgba(0,0,0,.2)}.numInputWrapper span:after{display:block;content:\"\";position:absolute;top:33%}.numInputWrapper span.arrowUp{top:0;border-bottom:0}.numInputWrapper span.arrowUp:after{border-left:4px solid transparent;border-right:4px solid transparent;border-bottom:4px solid rgba(57,57,57,.6)}.numInputWrapper span.arrowDown{top:50%}.numInputWrapper span.arrowDown:after{border-left:4px solid transparent;border-right:4px solid transparent;border-top:4px solid rgba(57,57,57,.6)}.numInputWrapper span svg{width:inherit;height:auto}.numInputWrapper span svg path{fill:rgba(0,0,0,.5)}.numInputWrapper:hover{background:rgba(0,0,0,.05)}.numInputWrapper:hover span{opacity:1}.flatpickr-current-month{font-size:135%;line-height:inherit;font-weight:300;color:inherit;position:absolute;width:75%;left:12.5%;top:5px;display:inline-block;text-align:center}.flatpickr-current-month span.cur-month{font-family:inherit;font-weight:700;color:inherit;display:inline-block;padding-left:7px}.flatpickr-current-month .numInputWrapper{width:6ch;width:7ch\\0;display:inline-block}.flatpickr-current-month .numInputWrapper span.arrowUp:after{border-bottom-color:rgba(0,0,0,.9)}.flatpickr-current-month .numInputWrapper span.arrowDown:after{border-top-color:rgba(0,0,0,.9)}.flatpickr-current-month input.cur-year{background:transparent;box-sizing:border-box;color:inherit;cursor:default;padding:0 0 0 .5ch;margin:0;display:inline;font-size:inherit;font-family:inherit;font-weight:300;line-height:inherit;height:auto;border:0;border-radius:0;vertical-align:initial}.flatpickr-current-month input.cur-year:focus{outline:0}.flatpickr-current-month input.cur-year[disabled],.flatpickr-current-month input.cur-year[disabled]:hover{font-size:100%;color:rgba(0,0,0,.5);background:transparent;pointer-events:none}.flatpickr-weekdays{background:transparent;text-align:center;overflow:hidden}.flatpickr-days{padding:0 2.375px;outline:0;text-align:left;width:293.75px;box-sizing:border-box;display:inline-block;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;border-right:1px solid transparent}.flatpickr-day{background:none;border:1px solid transparent;border-radius:150px;box-sizing:border-box;color:#393939;cursor:pointer;font-weight:400;width:14.2857143%;-ms-flex-preferred-size:14.2857143%;flex-basis:14.2857143%;max-width:38px;height:38px;line-height:38px;margin:0 1.5px;display:inline-block;display:inline-block\\9;position:relative;-ms-flex-pack:center;-webkit-box-pack:center;justify-content:center;text-align:center}.flatpickr-day.inRange,.flatpickr-day.nextMonthDay.inRange,.flatpickr-day.nextMonthDay.today.inRange,.flatpickr-day.nextMonthDay:focus,.flatpickr-day.nextMonthDay:hover,.flatpickr-day.prevMonthDay.inRange,.flatpickr-day.prevMonthDay.today.inRange,.flatpickr-day.prevMonthDay:focus,.flatpickr-day.prevMonthDay:hover,.flatpickr-day.today.inRange,.flatpickr-day:focus,.flatpickr-day:hover{cursor:pointer;outline:0;background:#e6e6e6;border-color:#e6e6e6}.flatpickr-day.today{border-color:#959ea9}.flatpickr-day.today:focus,.flatpickr-day.today:hover{border-color:#959ea9;background:#959ea9;color:#fff}.flatpickr-day.endRange,.flatpickr-day.endRange.nextMonthDay,.flatpickr-day.endRange.prevMonthDay,.flatpickr-day.endRange:focus,.flatpickr-day.endRange:hover,.flatpickr-day.selected,.flatpickr-day.selected.nextMonthDay,.flatpickr-day.selected.prevMonthDay,.flatpickr-day.selected:focus,.flatpickr-day.selected:hover,.flatpickr-day.startRange,.flatpickr-day.startRange.nextMonthDay,.flatpickr-day.startRange.prevMonthDay,.flatpickr-day.startRange:focus,.flatpickr-day.startRange:hover{background:#569ff7;color:#fff;border-color:#569ff7}.flatpickr-day.endRange.startRange,.flatpickr-day.selected.startRange,.flatpickr-day.startRange.startRange{border-radius:50px 0 0 50px}.flatpickr-day.endRange.endRange,.flatpickr-day.selected.endRange,.flatpickr-day.startRange.endRange{border-radius:0 50px 50px 0}.flatpickr-day.inRange{border-radius:0;box-shadow:-3.75px 0 0 #e6e6e6,3.75px 0 0 #e6e6e6}.flatpickr-day.disabled,.flatpickr-day.disabled:hover{pointer-events:none}.flatpickr-day.disabled,.flatpickr-day.disabled:hover,.flatpickr-day.nextMonthDay,.flatpickr-day.notAllowed,.flatpickr-day.notAllowed.nextMonthDay,.flatpickr-day.notAllowed.prevMonthDay,.flatpickr-day.prevMonthDay{color:rgba(57,57,57,.3);background:transparent;border-color:transparent;cursor:default}span.flatpickr-weekday{cursor:default;font-size:90%;color:rgba(0,0,0,.54);height:27.166666666666668px;line-height:24px;background:transparent;text-align:center;display:block;float:left;width:14.28%;font-weight:700;margin:0;padding-top:3.166666666666667px}.rangeMode .flatpickr-day{margin-top:1px}.flatpickr-weekwrapper{display:inline-block;float:left;z-index:2}.flatpickr-weekwrapper .flatpickr-weeks{padding:0 12px;box-shadow:1px 0 0 #e6e6e6}.flatpickr-weekwrapper .flatpickr-weekday{float:none;width:100%}.flatpickr-weekwrapper span.flatpickr-day{display:block;width:100%;max-width:none;margin:0;border:0}.flatpickr-innerContainer{display:block;display:-webkit-box;display:-ms-flexbox;display:flex;box-sizing:border-box;overflow:hidden}.flatpickr-rContainer{display:inline-block;padding:0;box-sizing:border-box;z-index:2}.flatpickr-time{text-align:center;outline:0;display:block;height:0;line-height:40px;max-height:40px;box-sizing:border-box;overflow:hidden;-webkit-transition:height .33s cubic-bezier(0,1,.5,1);transition:height .33s cubic-bezier(0,1,.5,1);display:-webkit-box;display:-ms-flexbox;display:flex;border-top:1px solid #e6e6e6}.flatpickr-time:after{content:\"\";display:table;clear:both}.flatpickr-time .numInputWrapper{-webkit-box-flex:1;-ms-flex:1;flex:1;width:40%;height:40px;float:left;z-index:3}.flatpickr-time .numInputWrapper span.arrowUp:after{border-bottom-color:#393939}.flatpickr-time .numInputWrapper span.arrowDown:after{border-top-color:#393939}.flatpickr-time.hasSeconds .numInputWrapper{width:26%}.flatpickr-time.time24hr .numInputWrapper{width:49%}.flatpickr-time input{background:transparent;box-shadow:none;border:0;border-radius:0;text-align:center;margin:0;padding:0;height:inherit;line-height:inherit;cursor:pointer;color:#393939;font-size:14px;position:relative;box-sizing:border-box}.flatpickr-time input.flatpickr-hour{font-weight:700}.flatpickr-time input.flatpickr-minute,.flatpickr-time input.flatpickr-second{font-weight:400}.flatpickr-time input:focus{outline:0;border:0}.flatpickr-time .flatpickr-am-pm,.flatpickr-time .flatpickr-time-separator{height:inherit;display:inline-block;float:left;line-height:inherit;color:#393939;font-weight:700;width:2%;z-index:3;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flatpickr-time .flatpickr-am-pm{outline:0;width:18%;cursor:pointer;text-align:center;font-weight:400}.flatpickr-time .flatpickr-am-pm:focus,.flatpickr-time .flatpickr-am-pm:hover{background:#f0f0f0}.hasTime .flatpickr-days,.hasWeeks .flatpickr-days{border-bottom:0;border-bottom-right-radius:0;border-bottom-left-radius:0}.hasWeeks .flatpickr-days{border-left:0}@media (-ms-high-contrast:none){.flatpickr-month{padding:0}.flatpickr-month svg{top:0!important}}@-webkit-keyframes a{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:none;transform:none}}@keyframes a{0%{opacity:0;-webkit-transform:translate3d(0,-20px,0);transform:translate3d(0,-20px,0)}to{opacity:1;-webkit-transform:none;transform:none}}", ""]);

// exports


/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.refresh-button-container[data-v-961f66ec] {\n\ttext-align: right;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/DataTable.vue?0546b5fd"],"names":[],"mappings":";AA8KA;CACA,kBAAA;CACA","file":"DataTable.vue","sourcesContent":["<template>\n\t<div class=\"table-responsive\">\n\t\t<div class=\"refresh-button-container\" v-if=\"config && 'ajax' in config\">\n\t\t\t<button type=\"button\" class=\"btn btn-default\" title=\"Reload table\"\n\t\t\t\t\t@click=\"reloadTable\">\n\t\t\t\t<span class=\"glyphicon glyphicon-refresh\"></span>\n\t\t\t</button>\n\t\t</div>\n\t\t\n\t\t<table :id=\"id\" class=\"table\" :class=\"tableClass\" width=\"100%\" ref=\"table\">\n\t\t\t<slot>\n\t\t\t\t<thead>\n\t\t\t\t\t<tr v-for=\"(row, rowIndex) of thead\" :key=\"`row-${rowIndex}`\">\n\t\t\t\t\t\t<th v-for=\"(th, thIndex) of row\" :key=\"thIndex\"\n\t\t\t\t\t\t\t\t:rowspan=\"th.rowspan\"\n\t\t\t\t\t\t\t\t:colspan=\"th.colspan\">\n\t\t\t\t\t\t\t{{ th.text || th }}\n\t\t\t\t\t\t</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t</slot>\n\t\t</table>\n\t\t<div v-if=\"exportable && data\" class=\"text-center\">\n\t\t\t<button type=\"button\" class=\"btn btn-default\"\n\t\t\t\t\t@click=\"exportCsv\">\n\t\t\t\tExport CSV\n\t\t\t</button>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport download from 'downloadjs';\n\nexport default {\n\tprops: {\n\t\tid: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\tstriped: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: true\n\t\t},\n\t\tbordered: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\t\n\t\tthead: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\tconfig: {\n\t\t\ttype: Object,\n\t\t\trequired: false\n\t\t},\n\t\tdata: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\t\n\t\texportable: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\texportFilename: {\n\t\t\ttype: String,\n\t\t\tdefault(){\n\t\t\t\treturn `Table Export ${new Date().toLocaleString()}`;\n\t\t\t}\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tupdateData: false\n\t\t};\n\t},\n\tmounted(){\n\t\t$(this.$refs.table).DataTable(Object.assign({}, this.config, {data: this.data}));\n\t},\n\tcomputed: {\n\t\ttableClass(){\n\t\t\treturn {\n\t\t\t\t'table-striped': this.striped,\n\t\t\t\t'table-bordered': this.bordered\n\t\t\t};\n\t\t}\n\t},\n\twatch: {\n\t\tconfig(){\n\t\t\tlet config = Object.assign({destroy: true}, this.config, {data: this.data});\n\t\t\t$(this.$refs.table).DataTable(config);\n\t\t},\n\t\tdata(data){\n\t\t\tthis.updateData = true;\n\t\t\tthis.$nextTick(() => {\n\t\t\t\t// only set data if table not already recreated with new data\n\t\t\t\tif(this.updateData){\n\t\t\t\t\t$(this.$refs.table).DataTable({\n\t\t\t\t\t\tretrieve: true\n\t\t\t\t\t}).clear().rows.add(data).draw();\n\t\t\t\t\tthis.updateData = false;\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t},\n\tmethods: {\n\t\treloadTable(){\n\t\t\t$(this.$refs.table).DataTable({\n\t\t\t\tretrieve: true\n\t\t\t}).ajax.reload(null, false);\n\t\t},\n\t\texportCsv(){\n\t\t\tlet header = [];\n\t\t\theader.fill([], this.thead.length);\n\t\t\tthis.thead.map((row, rowIndex) => {\n\t\t\t\tif(!header[rowIndex])\n\t\t\t\t\theader[rowIndex] = [];\n\n\t\t\t\trow.map((cell, cellIndex) => {\n\t\t\t\t\twhile(header[rowIndex][cellIndex])\n\t\t\t\t\t\tcellIndex++;\n\n\t\t\t\t\tif(cell.rowspan){\n\t\t\t\t\t\tfor(let i = 0; i < cell.rowspan; i++){\n\t\t\t\t\t\t\tif(!header[rowIndex + i])\n\t\t\t\t\t\t\t\theader[rowIndex + i] = [];\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\theader[rowIndex + i][cellIndex] = cell.text;\n\t\t\t\t\t\t\tif(cell.colspan){\n\t\t\t\t\t\t\t\tfor(let j = 0; j < cell.colspan; j++){\n\t\t\t\t\t\t\t\t\theader[rowIndex][cellIndex + j] = cell.text;\n\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse if(cell.colspan){\n\t\t\t\t\t\tfor(let j = 0; j < cell.colspan; j++){\n\t\t\t\t\t\t\theader[rowIndex][cellIndex + j] = cell.text;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\telse {\n\t\t\t\t\t\theader[rowIndex][cellIndex] = cell.text;\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t});\n\t\t\t\n\t\t\tlet rows = this.data.map(row =>\n\t\t\t\trow.map(cell =>\n\t\t\t\t\ttypeof cell === 'string' ? `\"${cell}\"` : cell\n\t\t\t\t).join(',')).sort();\n\t\t\tlet table = header.concat(rows);\n\t\t\tdownload(table.join('\\n'), `${this.exportFilename}.csv`, 'text/csv');\n\t\t}\n\t},\n\tbeforeUpdate(){\n\t\t$(this.$refs.table).DataTable({\n\t\t\tretrieve: true\n\t\t}).clear().destroy();\n\t\tthis.updateData = false;\n\t},\n\tupdated(){\n\t\t$(this.$refs.table).DataTable(Object.assign({}, this.config, {data: this.data}));\n\t},\n\tbeforeDestroy(){\n\t\t$(this.$refs.table).DataTable({\n\t\t\tretrieve: true\n\t\t}).clear().destroy();\n\t}\n};\n</script>\n\n<style scoped>\n\t.refresh-button-container {\n\t\ttext-align: right;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 25:
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

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "table-responsive"
  }, [(_vm.config && 'ajax' in _vm.config) ? _c('div', {
    staticClass: "refresh-button-container"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "title": "Reload table"
    },
    on: {
      "click": _vm.reloadTable
    }
  }, [_c('span', {
    staticClass: "glyphicon glyphicon-refresh"
  })])]) : _vm._e(), _vm._v(" "), _c('table', {
    ref: "table",
    staticClass: "table",
    class: _vm.tableClass,
    attrs: {
      "id": _vm.id,
      "width": "100%"
    }
  }, [_vm._t("default", [_c('thead', _vm._l((_vm.thead), function(row, rowIndex) {
    return _c('tr', {
      key: ("row-" + rowIndex)
    }, _vm._l((row), function(th, thIndex) {
      return _c('th', {
        key: thIndex,
        attrs: {
          "rowspan": th.rowspan,
          "colspan": th.colspan
        }
      }, [_vm._v("\n\t\t\t\t\t\t" + _vm._s(th.text || th) + "\n\t\t\t\t\t")])
    }))
  }))])], 2), _vm._v(" "), (_vm.exportable && _vm.data) ? _c('div', {
    staticClass: "text-center"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.exportCsv
    }
  }, [_vm._v("\n\t\t\tExport CSV\n\t\t")])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-961f66ec", module.exports)
  }
}

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    attrs: {
      "name": _vm.name,
      "id": _vm.id,
      "required": _vm.required,
      "multiple": _vm.multiple
    }
  }, [_vm._t("default"), _vm._v(" "), _vm._l((_vm.stringOptions), function(option) {
    return [(option.children && option.children.length > 0) ? _c('optgroup', {
      attrs: {
        "label": option.text
      }
    }, _vm._l((option.children), function(child) {
      return _c('option', {
        domProps: {
          "value": child.id
        }
      }, [_vm._v("\n\t\t\t\t" + _vm._s(child.text) + "\n\t\t\t")])
    })) : (option.id) ? _c('option', {
      domProps: {
        "value": option.id
      }
    }, [_vm._v("\n\t\t\t" + _vm._s(option.text) + "\n\t\t")]) : _vm._e()]
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e84f7814", module.exports)
  }
}

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(24);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-961f66ec&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./DataTable.vue", function() {
			var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-961f66ec&scoped=true!./../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./DataTable.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_DataTable_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_DataTable_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_DataTable_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_indefinite__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_indefinite___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_indefinite__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_flatpickr_theme_flatpickr_min_css__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vue_flatpickr_theme_flatpickr_min_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_vue_flatpickr_theme_flatpickr_min_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_utils_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["createRequest"] = createRequest;














function createRequest(el, propsData) {

	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
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

				sendHash: requestType === 'staff',
				forceNotification: false,
				hashExpiresIn: '30',

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
			required: function required() {
				var required = {
					subjectId: true,
					evaluatorId: true,
					formId: true,
					evaluationDate: true
				};

				if (['resident', 'self'].indexOf(this.requestType) !== -1 && this.user.type === 'resident') required.subjectId = false;

				if (this.requestType === 'resident' && this.user.type === 'faculty' || this.requestType === 'staff' && this.user.type === 'staff' || this.requestType === 'faculty' && this.user.type === 'resident' || this.requestType === 'self') required.evaluatorId = false;

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
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["d" /* groupUsers */])(this.evaluators[0]);
			},
			subjectOptions: function subjectOptions() {
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["d" /* groupUsers */])(this.subjects[0]);
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
				return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__modules_utils_js__["e" /* groupForms */])(this.subjectForms);
			},
			evaluationDate: function evaluationDate() {
				if (this.evaluationDateJson) return Array.isArray(this.evaluationDateJson) ? this.evaluationDateJson.map(JSON.parse) : JSON.parse(this.evaluationDateJson);
			},
			evaluationDates: function evaluationDates() {
				var _this2 = this;

				var form = this.forms.find(function (form) {
					return form.id === Number(_this2.formId);
				});

				if (!form) return;

				var dates = [];
				if (form.evaluation_period_type === 'quarter') {
					dates = [__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["lastQuarter"])(), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["currentQuarter"])()];
				} else {
					var startDate = __WEBPACK_IMPORTED_MODULE_3_moment___default()().startOf('month');
					var endDate = __WEBPACK_IMPORTED_MODULE_3_moment___default()(endDate).endOf('month');
					for (var i = 0; i < 3; i++) {
						dates.push({
							startDate: startDate,
							endDate: endDate
						});
						startDate = __WEBPACK_IMPORTED_MODULE_3_moment___default()(startDate).subtract(1, 'month');
						endDate = __WEBPACK_IMPORTED_MODULE_3_moment___default()(startDate).endOf('month');
					}
					dates.reverse();
				}

				return dates;
			},
			evaluationDateOptions: function evaluationDateOptions() {
				if (this.evaluationDates) return this.evaluationDates.map(function (date) {
					return {
						id: JSON.stringify(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["isoDateStringObject"])(date)),
						text: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__modules_date_utils_js__["renderDateRange"])(date.startDate, date.endDate)
					};
				});
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["a" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["b" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["c" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["d" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["e" /* createDateTimeCell */] }, { data: null, render: function render(evaluation) {
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
					columns: [{ data: 'url', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["a" /* renderEvaluatorEvalUrl */] }, { data: 'subject.full_name' }, { data: 'form.title' }, {
						data: null,
						render: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["b" /* renderDateRangeCell */])('evaluation_date_start', 'evaluation_date_end'),
						createdCell: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["c" /* createDateRangeCell */])('evaluation_date_start', 'evaluation_date_end')
					}, { data: 'request_date', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["d" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["e" /* createDateTimeCell */] }, { data: 'complete_date', render: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["d" /* renderDateTimeCell */], createdCell: __WEBPACK_IMPORTED_MODULE_8__modules_datatable_utils_js__["e" /* createDateTimeCell */] }],
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
						return _this5.evaluationDateJson.indexOf(id) !== -1;
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
				this.error[field] = this.required[field] && (!this[field] || this[field].length === 0) ? 'Please select ' + __WEBPACK_IMPORTED_MODULE_4_indefinite___default()(noun) : null;

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
			DataTable: __WEBPACK_IMPORTED_MODULE_1__vue_components_DataTable_vue___default.a,
			SelectTwo: __WEBPACK_IMPORTED_MODULE_2__vue_components_SelectTwo_vue___default.a
		}
	});
}

function getRequestType() {
	var paths = window.location.pathname.split('/');
	paths = paths.filter(function (path) {
		return path.length > 0;
	});
	var type = paths[paths.length - 1];

	if (['faculty', 'staff', 'self'].indexOf(type) !== -1) return type;

	return 'resident';
}

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(31)

var Component = __webpack_require__(0)(
  /* name */
  "DataTable",
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(29),
  /* scopeId */
  "data-v-961f66ec",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/DataTable.vue"
if (Component.options.functional) {console.error("[vue-loader] DataTable.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-961f66ec", Component.options)
  } else {
    hotAPI.reload("data-v-961f66ec", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function() {
  var isNode = (typeof module !== 'undefined' && this.module !== module);

  var indefinite = function (noun, capitalize) {
    var phrase = (/[aeiou]/.test(noun.charAt(0).toLowerCase()) ? 'an ' : 'a ') + noun;
    if (capitalize) {
      return phrase.charAt(0).toUpperCase() + phrase.slice(1);
    } else {
      return phrase;
    }
  };

  /* istanbul ignore else */
  if (isNode) {
    module.exports = indefinite;
  } else {
    window.indefinite = indefinite;
  }
})();

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(53)(module)))

/***/ })

},[384]);
});
//# sourceMappingURL=vue-request.js.map