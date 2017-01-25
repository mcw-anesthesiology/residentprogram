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
return webpackJsonp([3],{

/***/ 11:
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

		// let domVal = $(this.$el).val();
		// if((Array.isArray(this.stringValue) && this.stringValue.length !== domVal.length)
		// 		|| ((this.stringValue || domVal) && this.stringValue !== domVal)){
		// 	this.$nextTick(() => {
		// 		this.$emit('input', domVal);
		// 	});
		// }
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

/***/ 15:
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

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.form-builder-question-option[data-v-09008ada] {\n\tmargin-top: 10px;\n}\n.working-option[data-v-09008ada] {\n\topacity: 0.5;\n}\n.working-option[data-v-09008ada]:hover,\n.working-option.is-focused[data-v-09008ada],\n.working-option[data-v-09008ada]:active {\n\topacity: 1;\n}\ntextarea.form-option-description[data-v-09008ada] {\n\tresize: vertical;\n\theight: 100px;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/FormBuilder/FormBuilderOption.vue?42fcc6c0"],"names":[],"mappings":";AAoEA;CACA,iBAAA;CACA;AAEA;CACA,aAAA;CACA;AAEA;;;CAGA,WAAA;CACA;AAEA;CACA,iBAAA;CACA,cAAA;CACA","file":"FormBuilderOption.vue","sourcesContent":["<template>\n\t<div class=\"form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center\" v-bind:class=\"{ 'working-option': isWorkingOption, 'is-focused': isFocused }\">\n\t\t<input v-bind:type=\"displayType\" disabled/>\n\t\t<input type=\"text\" v-bind:value=\"text\"\n\t\t\tclass=\"form-input form-option form-option-text form-control\"\n\t\t\tplaceholder=\"Option Text\"\n\t\t\tv-on:input=\"$emit('input', {text: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {text: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('text')\"\n\t\t\tv-on:blur=\"handleInputBlur('text')\"\n\t\t\t/>\n\t\t<input v-bind:type=\"type === 'radio' ? 'number' : 'text'\"\n\t\t\tv-bind:value=\"value\"\n\t\t\tclass=\"form-input form-option form-option-value form-control\"\n\t\t\tplaceholder=\"Option Value\"\n\t\t\tv-on:input=\"$emit('input', {value: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {value: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('value')\"\n\t\t\tv-on:blur=\"handleInputBlur('value')\"\n\t\t\t/>\n\t\t<textarea v-bind:value=\"description\"\n\t\t\tclass=\"form-input form-option form-option-description form-control\"\n\t\t\tplaceholder=\"Hover Description\"\n\t\t\tv-on:input=\"$emit('input', {description: $event.target.value})\"\n\t\t\tv-on:change=\"$emit('change', {description: $event.target.value})\"\n\t\t\tv-on:focus=\"handleInputFocus('description')\"\n\t\t\tv-on:blur=\"handleInputBlur('description')\"\n\t\t\t>\n\t\t</textarea>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tprops: [\n\t\t'type',\n\t\t'text',\n\t\t'value',\n\t\t'description',\n\t\t'isWorkingOption'\n\t],\n\tcomputed: {\n\t\tdisplayType(){\n\t\t\tif(this.type === 'checkbox')\n\t\t\t\treturn 'checkbox';\n\t\t\telse\n\t\t\t\treturn 'radio';\n\t\t}\n\t},\n\tdata(){\n\t\treturn {\n\t\t\tisFocused: false\n\t\t};\n\t},\n\tmethods: {\n\t\thandleInputFocus(field){\n\t\t\tthis.isFocused = true;\n\t\t\tthis.$emit('focus', field);\n\t\t},\n\t\thandleInputBlur(field){\n\t\t\tthis.isFocused = false;\n\t\t\tthis.$emit('blur', field);\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.form-builder-question-option {\n\t\tmargin-top: 10px;\n\t}\n\n\t.working-option {\n\t\topacity: 0.5;\n\t}\n\n\t.working-option:hover,\n\t.working-option.is-focused,\n\t.working-option:active {\n\t\topacity: 1;\n\t}\n\n\ttextarea.form-option-description {\n\t\tresize: vertical;\n\t\theight: 100px;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"FormBuilder.vue","sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 2:
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

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
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
	var sourceMap = obj.sourceMap;

	if (media) {
		styleElement.setAttribute("media", media);
	}

	if (sourceMap) {
		// https://developer.chrome.com/devtools/docs/javascript-debugging
		// this makes source maps inside style tags work properly in Chrome
		css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}


/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.question-id[data-v-aaf882ea] {\n\tfont-size: larger;\n\ttext-transform: uppercase;\n\tfont-weight: bold;\n}\n", "", {"version":3,"sources":["/./resources/assets/js/vue-components/FormBuilder/FormBuilderQuestion.vue?3d123c74"],"names":[],"mappings":";AAyQA;CACA,kBAAA;CACA,0BAAA;CACA,kBAAA;CACA","file":"FormBuilderQuestion.vue","sourcesContent":["<template>\n\t<div v-bind:id=\"questionId\" class=\"form-question panel panel-default form-block\">\n\t\t<div class=\"panel-heading form-horizontal\">\n\t\t\t<div class=\"panel-title form-group\">\n\t\t\t\t<div class=\"col-sm-12\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tQuestion Text\n\t\t\t\t\t\t<div class=\"input-group\">\n\t\t\t\t\t\t\t<span class=\"question-id input-group-addon\">{{questionId}}</span>\n\t\t\t\t\t\t\t<input type=\"text\" v-bind:value=\"text\" v-on:input=\"$emit('change', {text: $event.target.value})\" class=\"form-input form-question-text form-control\" placeholder=\"Question Text\" required />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"hr-question\"></div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tQuestion Type\n\t\t\t\t\t\t<select v-bind:value=\"questionType\" v-on:change=\"changeQuestionType\" class=\"form-control form-question-type\" name=\"questionType\">\n\t\t\t\t\t\t\t<option value=\"radio\">Radio</option>\n\t\t\t\t\t\t\t<option value=\"text\">Text</option>\n\t\t\t\t\t\t\t<option value=\"radiononnumeric\">Radio (non-numeric)</option>\n\t\t\t\t\t\t\t<option value=\"number\">Number</option>\n\t\t\t\t\t\t\t<option value=\"checkbox\">Checkbox</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-6\">\n\t\t\t\t\t<label>Question Options</label>\n\t\t\t\t\t<div class=\"btn-group btn-group-justified\">\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button v-on:click=\"setStandardOptions\" class=\"form-question-standard-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button v-bind:disabled=\"!milestones || milestones.length !== 1\" v-on:click=\"setMilestoneOptions\"\n\t\t\t\t\t\t\t\t\tclass=\"form-question-milestone-level-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"btn-group\">\n\t\t\t\t\t\t\t<button v-bind:disabled=\"!customOptions || customOptions.length < 1\" v-on:click=\"setCustomOptions\"\n\t\t\t\t\t\t\t\t\tclass=\"form-question-custom-options btn btn-info\" type=\"button\">\n\t\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-1 labelless-button\">\n\t\t\t\t\t<button v-on:click=\"$emit('remove')\" class=\"form-block-delete btn btn-danger del-btn\" type=\"button\">\n\t\t\t\t\t\tDelete\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-1\">\n\t\t\t\t\t<label class=\"containing-label\">\n\t\t\t\t\t\tRequired\n\t\t\t\t\t\t<input type=\"checkbox\" v-bind:checked=\"required\"\n\t\t\t\t\t\t\tclass=\"form-control form-question-required\" value=\"required\"\n\t\t\t\t\t\t\tv-on:change=\"$emit('change', {required: $event.target.checked})\"\n\t\t\t\t\t\t\t/>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"hr-question\"></div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"col-md-8\">\n\t\t\t\t\t<label v-show=\"shouldShowMilestonesAndCompetencies\" class=\"containing-label\">\n\t\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t\t<select-two v-bind:value=\"milestones\" v-bind:options=\"groupedMilestones\" v-bind:multiple=\"true\" v-on:input=\"$emit('change', {milestones: arguments[0]})\" class=\"form-control form-question-milestone\"></select-two>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"col-md-4\">\n\t\t\t\t\t<label v-show=\"shouldShowMilestonesAndCompetencies\" class=\"containing-label\">\n\t\t\t\t\t\tQuestion Competency\n\t\t\t\t\t\t<select v-on:change=\"$emit('change', {competencies: $event.target.value})\" class=\"form-control form-question-competency\" placeholder=\"Competency\">\n\t\t\t\t\t\t\t<option value=\"\" disabled>Select a competency</option>\n\t\t\t\t\t\t\t<option v-for=\"competency of allCompetencies\" v-bind:value=\"competency.id\" v-bind:selected=\"competencies == competency.id\">{{ competency.title }}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</label>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"panel-body\">\n\t\t\t<div class=\"row form-options\" style=\"margin-bottom:5px;\">\n\t\t\t\t<template v-if=\"['radio', 'radiononnumeric', 'checkbox'].includes(questionType)\">\n\t\t\t\t\t<form-builder-option v-for=\"(option, index) of optionsWithWorking\"\n\t\t\t\t\t\tv-bind=\"option\" v-bind:type=\"questionType\"\n\t\t\t\t\t\tv-bind:is-working-option=\"option === workingOption\"\n\t\t\t\t\t\tv-on:input=\"handleWorkingOptionInput(index, arguments[0])\"\n\t\t\t\t\t\tv-on:change=\"handleOptionChange(index, arguments[0])\"\n\t\t\t\t\t\t>\n\t\t\t\t\t</form-builder-option>\n\t\t\t\t</template>\n\n\t\t\t\t<div v-if=\"questionType === 'text'\" class=\"col-sm-12\">\n\t\t\t\t\t<textarea class=\"form-control\" placeholder=\"Text\" disabled />\n\t\t\t\t</div>\n\n\t\t\t\t<div v-if=\"questionType === 'number'\" class=\"col-md-8\">\n\t\t\t\t\t<input type=\"number\" class=\"form-control\" placeholder=\"Number\" disabled />\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport FormBuilderOption from './FormBuilderOption.vue';\nimport SelectTwo from '../SelectTwo.vue';\n\nimport { STANDARD_OPTIONS } from '../../modules/constants.js';\nimport { appendAlert } from '../../modules/utils.js';\n\nexport default {\n\tprops: [\n\t\t'formType',\n\t\t'groupedMilestones',\n\t\t'allCompetencies',\n\t\t'questionIdNum',\n\t\t'text',\n\t\t'questionType',\n\t\t'milestones',\n\t\t'competencies',\n\t\t'options',\n\t\t'required',\n\t\t'customOptions'\n\t],\n\tdata(){\n\t\treturn {\n\t\t\tworkingOption: {\n\t\t\t\ttext: '',\n\t\t\t\tvalue: '',\n\t\t\t\tdescription: ''\n\t\t\t}\n\t\t};\n\t},\n\tcomputed: {\n\t\tquestionId(){\n\t\t\treturn `q${this.questionIdNum}`;\n\t\t},\n\t\tshouldShowMilestonesAndCompetencies(){\n\t\t\treturn ['radio', 'number'].includes(this.questionType) && [\n\t\t\t\t'resident',\n\t\t\t\t'self-resident',\n\t\t\t\t'fellow',\n\t\t\t\t'self-fellow'\n\t\t\t].includes(this.formType);\n\t\t},\n\t\toptionsWithWorking(){\n\t\t\tif(this.options){\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions.push(this.workingOption);\n\t\t\t\treturn options;\n\t\t\t}\n\t\t},\n\t\tworkingOptionIndex(){\n\t\t\tif(this.options)\n\t\t\t\treturn this.options.length;\n\t\t}\n\t},\n\tmethods: {\n\t\tchangeQuestionType(event){\n\t\t\tconst questionType = event.target.value;\n\t\t\tlet options = [];\n\n\t\t\tthis.$emit('change', {questionType: questionType, options: options});\n\t\t},\n\t\thandleWorkingOptionInput(index, option){\n\t\t\tif(index === this.workingOptionIndex)\n\t\t\t\tthis.workingOption = Object.assign({}, this.workingOption, option);\n\t\t},\n\t\thandleOptionChange(index, option){\n\t\t\tif(index === this.workingOptionIndex){\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions.push(Object.assign({}, this.workingOption, option));\n\t\t\t\tthis.workingOption = {\n\t\t\t\t\ttext: '',\n\t\t\t\t\tvalue: '',\n\t\t\t\t\tdescription: ''\n\t\t\t\t};\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}\n\t\t\telse {\n\t\t\t\tlet options = this.options.slice();\n\t\t\t\toptions[index] = Object.assign(options[index], option);\n\t\t\t\tif(!options[index].text && !options[index].value && !options[index].description)\n\t\t\t\t\toptions.splice(index, 1);\n\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}\n\t\t},\n\n\t\tsetStandardOptions(){\n\t\t\tlet options;\n\t\t\tswitch(this.formType){\n\t\t\t\tcase 'resident':\n\t\t\t\tcase 'self-resident':\n\t\t\t\t\toptions = STANDARD_OPTIONS.RESIDENT;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'fellow':\n\t\t\t\tcase 'self-fellow':\n\t\t\t\t\toptions = STANDARD_OPTIONS.FELLOW;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'faculty':\n\t\t\t\t\tif(this.questionType === 'radiononnumeric')\n\t\t\t\t\t\toptions = STANDARD_OPTIONS.FACULTY;\n\t\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\tif(!options){\n\t\t\t\tappendAlert('No standard options found for form type and question type');\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.$emit('change', {options: options});\n\t\t},\n\t\tsetMilestoneOptions(){\n\t\t\tif(this.milestones.length !== 1){\n\t\t\t\tappendAlert('You can only use milestone options with a single selected milestone');\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tfetch(`/milestones/${this.milestones[0]}`, { credentials: 'same-origin' }).then(response => {\n\t\t\t\tif(response.ok)\n\t\t\t\t\treturn response.json();\n\t\t\t\telse\n\t\t\t\t\tthrow new Error(response);\n\t\t\t}).then(milestone => {\n\t\t\t\tif(!milestone || !milestone.levels || milestone.levels.length < 1){\n\t\t\t\t\tappendAlert('No milestone levels found');\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\tlet options = [{\n\t\t\t\t\tvalue: 0,\n\t\t\t\t\ttext: `Not yet ${milestone.levels[0].name}`\n\t\t\t\t}];\n\t\t\t\tfor(let level of milestone.levels){\n\t\t\t\t\tlet value = 2 * parseInt(level.level_number, 10);\n\t\t\t\t\toptions.push({value: value - 1, text: '', description: ''});\n\t\t\t\t\toptions.push({value: value, text: level.name, description: level.description});\n\t\t\t\t}\n\n\t\t\t\tthis.$emit('change', {options: options});\n\t\t\t}).catch(err => {\n\t\t\t\tconsole.error(err);\n\t\t\t});\n\t\t},\n\t\tsetCustomOptions(){\n\t\t\tif(this.customOptions.length < 1){\n\t\t\t\tappendAlert('No custom options set');\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tthis.$emit('change', {options: this.customOptions});\n\t\t}\n\t},\n\tcomponents: {\n\t\tFormBuilderOption,\n\t\tSelectTwo\n\t}\n};\n</script>\n\n<style scoped>\n\t.question-id {\n\t\tfont-size: larger;\n\t\ttext-transform: uppercase;\n\t\tfont-weight: bold;\n\t}\n</style>\n"],"sourceRoot":"webpack://"}]);

// exports


/***/ }),

/***/ 296:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(90)

/* template */
var __vue_template__ = __webpack_require__(315)
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
__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderInstruction.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0aef040e", __vue_options__)
  } else {
    hotAPI.reload("data-v-0aef040e", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] FormBuilderInstruction.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(346)

/* script */
__vue_exports__ = __webpack_require__(91)

/* template */
var __vue_template__ = __webpack_require__(314)
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
__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderOption.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-09008ada"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-09008ada", __vue_options__)
  } else {
    hotAPI.reload("data-v-09008ada", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] FormBuilderOption.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(366)

/* script */
__vue_exports__ = __webpack_require__(92)

/* template */
var __vue_template__ = __webpack_require__(343)
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
__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderQuestion.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-aaf882ea"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aaf882ea", __vue_options__)
  } else {
    hotAPI.reload("data-v-aaf882ea", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] FormBuilderQuestion.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-builder-question-option col-lg-2 col-md-3 col-sm-6 text-center",
    class: {
      'working-option': _vm.isWorkingOption, 'is-focused': _vm.isFocused
    }
  }, [_c('input', {
    attrs: {
      "type": _vm.displayType,
      "disabled": ""
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "form-input form-option form-option-text form-control",
    attrs: {
      "type": "text",
      "placeholder": "Option Text"
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          text: $event.target.value
        })
      },
      "change": function($event) {
        _vm.$emit('change', {
          text: $event.target.value
        })
      },
      "focus": function($event) {
        _vm.handleInputFocus('text')
      },
      "blur": function($event) {
        _vm.handleInputBlur('text')
      }
    }
  }), _vm._v(" "), _c('input', {
    staticClass: "form-input form-option form-option-value form-control",
    attrs: {
      "type": _vm.type === 'radio' ? 'number' : 'text',
      "placeholder": "Option Value"
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          value: $event.target.value
        })
      },
      "change": function($event) {
        _vm.$emit('change', {
          value: $event.target.value
        })
      },
      "focus": function($event) {
        _vm.handleInputFocus('value')
      },
      "blur": function($event) {
        _vm.handleInputBlur('value')
      }
    }
  }), _vm._v(" "), _c('textarea', {
    staticClass: "form-input form-option form-option-description form-control",
    attrs: {
      "placeholder": "Hover Description"
    },
    domProps: {
      "value": _vm.description
    },
    on: {
      "input": function($event) {
        _vm.$emit('input', {
          description: $event.target.value
        })
      },
      "change": function($event) {
        _vm.$emit('change', {
          description: $event.target.value
        })
      },
      "focus": function($event) {
        _vm.handleInputFocus('description')
      },
      "blur": function($event) {
        _vm.handleInputBlur('description')
      }
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-09008ada", module.exports)
  }
}

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "container-fluid form-instruction-block form-block"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-10"
  }, [_c('label', [_vm._v("Instruction block")]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('textarea', {
    staticClass: "form-control form-instruction-text",
    attrs: {
      "required": ""
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          text: $event.target.value
        })
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1 col-md-offset-1"
  }, [_c('button', {
    staticClass: "form-block-delete btn btn-danger del-btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_vm._v("Delete")])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('small', [_vm._v("Supports "), _c('a', {
    attrs: {
      "href": "http://daringfireball.net/projects/markdown/basics",
      "target": "_blank"
    }
  }, [_vm._v("markdown")]), _vm._v(" (except inline HTML)")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0aef040e", module.exports)
  }
}

/***/ }),

/***/ 324:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-header"
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "form-title"
    }
  }, [_vm._v("Form title")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model.trim",
      value: (_vm.title),
      expression: "title",
      modifiers: {
        "trim": true
      }
    }],
    staticClass: "form-control input-lg",
    attrs: {
      "type": "text",
      "id": "form-title",
      "name": "formTitle",
      "placeholder": "Form Title",
      "required": ""
    },
    domProps: {
      "value": _vm._s(_vm.title)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.title = $event.target.value.trim()
      },
      "blur": function($event) {
        _vm.$forceUpdate()
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "form-type"
    }
  }, [_vm._v("Form type")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.formType),
      expression: "formType"
    }],
    staticClass: "form-control input-lg",
    attrs: {
      "id": "form-type",
      "name": "form_type"
    },
    on: {
      "change": function($event) {
        _vm.formType = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        })[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "resident"
    }
  }, [_vm._v("Resident/Intern")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "self-resident"
    }
  }, [_vm._v("Resident/Intern (self)")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "fellow"
    }
  }, [_vm._v("Fellow")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "self-fellow"
    }
  }, [_vm._v("Fellow (self)")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "faculty"
    }
  }, [_vm._v("Faculty")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "staff"
    }
  }, [_vm._v("Staff")])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "form-body"
  }, [_c('div', {
    staticClass: "form-items"
  }, [_vm._l((_vm.items), function(item, index) {
    return [(item.type === 'instruction') ? _c('form-builder-instruction', _vm._b({
      on: {
        "change": function($event) {
          _vm.changeItem(index, $event)
        },
        "input": function($event) {
          _vm.changeItem(index, $event)
        },
        "remove": function($event) {
          _vm.removeItem(index)
        }
      }
    }, 'form-builder-instruction', item)) : _vm._e(), _vm._v(" "), (item.type === 'question') ? _c('form-builder-question', _vm._b({
      attrs: {
        "formType": _vm.formType,
        "groupedMilestones": _vm.groupedMilestones,
        "allCompetencies": _vm.competencies,
        "customOptions": _vm.customOptions
      },
      on: {
        "change": function($event) {
          _vm.changeItem(index, $event)
        },
        "remove": function($event) {
          _vm.removeItem(index)
        }
      }
    }, 'form-builder-question', item)) : _vm._e()]
  })], 2)]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "form-footer"
    }
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "id": "add-instruction-block"
    },
    on: {
      "click": _vm.addInstruction
    }
  }, [_vm._v("Add instruction block")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-info",
    attrs: {
      "type": "button",
      "id": "addQuestion"
    },
    on: {
      "click": _vm.addQuestion
    }
  }, [_vm._v("Add Question")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-success",
    attrs: {
      "type": "submit"
    },
    on: {
      "click": _vm.submitForm
    }
  }, [_vm._v("Submit Form")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-27da62f6", module.exports)
  }
}

/***/ }),

/***/ 343:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-question panel panel-default form-block",
    attrs: {
      "id": _vm.questionId
    }
  }, [_c('div', {
    staticClass: "panel-heading form-horizontal"
  }, [_c('div', {
    staticClass: "panel-title form-group"
  }, [_c('div', {
    staticClass: "col-sm-12"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tQuestion Text\n\t\t\t\t\t"), _c('div', {
    staticClass: "input-group"
  }, [_c('span', {
    staticClass: "question-id input-group-addon"
  }, [_vm._v(_vm._s(_vm.questionId))]), _vm._v(" "), _c('input', {
    staticClass: "form-input form-question-text form-control",
    attrs: {
      "type": "text",
      "placeholder": "Question Text",
      "required": ""
    },
    domProps: {
      "value": _vm.text
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          text: $event.target.value
        })
      }
    }
  })])])])]), _vm._v(" "), _c('div', {
    staticClass: "hr-question"
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-4"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tQuestion Type\n\t\t\t\t\t"), _c('select', {
    staticClass: "form-control form-question-type",
    attrs: {
      "name": "questionType"
    },
    domProps: {
      "value": _vm.questionType
    },
    on: {
      "change": _vm.changeQuestionType
    }
  }, [_c('option', {
    attrs: {
      "value": "radio"
    }
  }, [_vm._v("Radio")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "text"
    }
  }, [_vm._v("Text")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "radiononnumeric"
    }
  }, [_vm._v("Radio (non-numeric)")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "number"
    }
  }, [_vm._v("Number")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "checkbox"
    }
  }, [_vm._v("Checkbox")])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-6"
  }, [_c('label', [_vm._v("Question Options")]), _vm._v(" "), _c('div', {
    staticClass: "btn-group btn-group-justified"
  }, [_c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "form-question-standard-options btn btn-info",
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.setStandardOptions
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tStandard\n\t\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "form-question-milestone-level-options btn btn-info",
    attrs: {
      "disabled": !_vm.milestones || _vm.milestones.length !== 1,
      "type": "button"
    },
    on: {
      "click": _vm.setMilestoneOptions
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tMilestone\n\t\t\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "btn-group"
  }, [_c('button', {
    staticClass: "form-question-custom-options btn btn-info",
    attrs: {
      "disabled": !_vm.customOptions || _vm.customOptions.length < 1,
      "type": "button"
    },
    on: {
      "click": _vm.setCustomOptions
    }
  }, [_vm._v("\n\t\t\t\t\t\t\tCustom\n\t\t\t\t\t\t")])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1 labelless-button"
  }, [_c('button', {
    staticClass: "form-block-delete btn btn-danger del-btn",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$emit('remove')
      }
    }
  }, [_vm._v("\n\t\t\t\t\tDelete\n\t\t\t\t")])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-1"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tRequired\n\t\t\t\t\t"), _c('input', {
    staticClass: "form-control form-question-required",
    attrs: {
      "type": "checkbox",
      "value": "required"
    },
    domProps: {
      "checked": _vm.required
    },
    on: {
      "change": function($event) {
        _vm.$emit('change', {
          required: $event.target.checked
        })
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "hr-question"
  }), _vm._v(" "), _c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-8"
  }, [_c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shouldShowMilestonesAndCompetencies),
      expression: "shouldShowMilestonesAndCompetencies"
    }],
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tQuestion Milestones\n\t\t\t\t\t"), _c('select-two', {
    staticClass: "form-control form-question-milestone",
    attrs: {
      "value": _vm.milestones,
      "options": _vm.groupedMilestones,
      "multiple": true
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          milestones: arguments[0]
        })
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "col-md-4"
  }, [_c('label', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.shouldShowMilestonesAndCompetencies),
      expression: "shouldShowMilestonesAndCompetencies"
    }],
    staticClass: "containing-label"
  }, [_vm._v("\n\t\t\t\t\tQuestion Competency\n\t\t\t\t\t"), _c('select', {
    staticClass: "form-control form-question-competency",
    attrs: {
      "placeholder": "Competency"
    },
    on: {
      "change": function($event) {
        _vm.$emit('change', {
          competencies: $event.target.value
        })
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "",
      "disabled": ""
    }
  }, [_vm._v("Select a competency")]), _vm._v(" "), _vm._l((_vm.allCompetencies), function(competency) {
    return _c('option', {
      domProps: {
        "value": competency.id,
        "selected": _vm.competencies == competency.id
      }
    }, [_vm._v(_vm._s(competency.title))])
  })], 2)])])])]), _vm._v(" "), _c('div', {
    staticClass: "panel-body"
  }, [_c('div', {
    staticClass: "row form-options",
    staticStyle: {
      "margin-bottom": "5px"
    }
  }, [(['radio', 'radiononnumeric', 'checkbox'].includes(_vm.questionType)) ? _vm._l((_vm.optionsWithWorking), function(option, index) {
    return _c('form-builder-option', _vm._b({
      attrs: {
        "type": _vm.questionType,
        "is-working-option": option === _vm.workingOption
      },
      on: {
        "input": function($event) {
          _vm.handleWorkingOptionInput(index, arguments[0])
        },
        "change": function($event) {
          _vm.handleOptionChange(index, arguments[0])
        }
      }
    }, 'form-builder-option', option))
  }) : _vm._e(), _vm._v(" "), (_vm.questionType === 'text') ? _c('div', {
    staticClass: "col-sm-12"
  }, [_c('textarea', {
    staticClass: "form-control",
    attrs: {
      "placeholder": "Text",
      "disabled": ""
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.questionType === 'number') ? _c('div', {
    staticClass: "col-md-8"
  }, [_c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "placeholder": "Number",
      "disabled": ""
    }
  })]) : _vm._e()], 2)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-aaf882ea", module.exports)
  }
}

/***/ }),

/***/ 346:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(187);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-09008ada&scoped=true!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderOption.vue", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-09008ada&scoped=true!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderOption.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(194);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27da62f6&scoped=true!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilder.vue", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27da62f6&scoped=true!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilder.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(207);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(2)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-aaf882ea&scoped=true!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderQuestion.vue", function() {
			var newContent = require("!!./../../../../../node_modules/css-loader/index.js?sourceMap!./../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-aaf882ea&scoped=true!./../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./FormBuilderQuestion.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_FormBuilder_FormBuilder_vue__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_FormBuilder_FormBuilder_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_FormBuilder_FormBuilder_vue__);
/* harmony export (immutable) */ __webpack_exports__["createFormBuilder"] = createFormBuilder;



function createFormBuilder(el) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		data: function data() {
			return {
				oldFormContents: {}
			};
		},
		render: function render(h) {
			return h(__WEBPACK_IMPORTED_MODULE_1__vue_components_FormBuilder_FormBuilder_vue___default.a, {
				props: {
					oldFormContents: this.oldFormContents
				}
			});
		}
	});
}

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* script */
__vue_exports__ = __webpack_require__(11)

/* template */
var __vue_template__ = __webpack_require__(15)
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
__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/SelectTwo.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e84f7814", __vue_options__)
  } else {
    hotAPI.reload("data-v-e84f7814", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] SelectTwo.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = {}

/* styles */
__webpack_require__(353)

/* script */
__vue_exports__ = __webpack_require__(89)

/* template */
var __vue_template__ = __webpack_require__(324)
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
__vue_options__.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilder.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-27da62f6"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-27da62f6", __vue_options__)
  } else {
    hotAPI.reload("data-v-27da62f6", __vue_options__)
  }
})()}
if (__vue_options__.functional) {console.error("[vue-loader] FormBuilder.vue: functional components are not supported and should be defined in plain js files using render functions.")}

module.exports = __vue_exports__


/***/ }),

/***/ 89:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_utils_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['oldFormContents'],
	created: function created() {
		var _this = this;

		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["l" /* fetchMilestoneGroups */])().then(function (milestoneGroups) {
			_this.groupedMilestones = milestoneGroups;
		}).catch(function (err) {
			console.error(err);
		});

		fetch('/competencies', { credentials: 'same-origin' }).then(function (response) {
			if (response.ok) return response.json();else {
				var err = new Error(response.statusText);
				err.response = response;
				throw err;
			}
		}).then(function (competencies) {
			_this.competencies = competencies;
		}).catch(function (err) {
			console.error(err);
		});
	},
	data: function data() {
		return {
			title: '',
			formType: 'resident',
			nextQuestionIdNum: 1,
			groupedMilestones: [],
			competencies: [],
			items: [],
			customOptions: []
		};
	},

	methods: {
		addInstruction: function addInstruction() {
			this.items.push({
				type: 'instruction',
				text: ''
			});
		},
		addQuestion: function addQuestion() {
			this.items.push({
				type: 'question',
				text: '',
				questionIdNum: this.nextQuestionIdNum++,
				questionType: 'radio',
				milestones: [],
				competencies: '',
				options: [],
				required: false,
				weight: 100
			});
		},
		changeItem: function changeItem(index, item) {
			this.items.splice(index, 1, Object.assign(this.items[index], item));
		},
		removeItem: function removeItem(index) {
			var item = this.items[index];
			if (item.type === 'question' && item.questionIdNum === this.nextQuestionIdNum - 1) this.nextQuestionIdNum--;
			this.items.splice(index, 1);
		},
		submitForm: function submitForm(event) {
			event.preventDefault();
			var requestBody = JSON.stringify({
				title: this.title,
				formType: this.formType,
				items: this.items.map(function (item) {
					item.questionId = 'q' + item.questionIdNum;
					return item;
				})
			});

			if (this.isFormValid()) {
				fetch('/forms', {
					method: 'POST',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["f" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: requestBody
				}).then(function (response) {
					if (response.ok) return response.text();else throw new Error(response);
				}).then(function (response) {
					if (response === 'success') window.location = '/manage/forms';else throw new Error(response);
				}).catch(function (err) {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('Error saving form');
					console.error(err);
				});
			}
		},
		isFormValid: function isFormValid() {
			if (!this.title) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('Please enter a title for the form');
				return false;
			}

			if (!this.items || this.items.length < 1) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('Please enter at least one question');
				return false;
			}

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var item = _step.value;

					if (item.type === 'question') {
						if (!item.text) {
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('Please enter question text for question ' + item.questionIdNum);
							return false;
						}
						if (['radio', 'radiononnumeric', 'checkbox'].indexOf(item.questionType) !== -1) {
							if (!item.options || item.options.length < 1) {
								__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('Please add at least one option for each multiple-choice question');
								return false;
							}

							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = item.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var option = _step2.value;

									if (!option.value) {
										__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question ' + item.questionIdNum);
										return false;
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
					} else if (item.type === 'instruction') {
						if (!item.text) {
							__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('Please complete or remove all empty instruction blocks');
							return false;
						}
					} else {
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__modules_utils_js__["m" /* appendAlert */])('Unrecognized item type in form');
						return false;
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

			return true;
		}
	},
	watch: {
		oldFormContents: function oldFormContents(formContents) {
			this.title = formContents.title;
			this.formType = formContents.formType;
			this.items = formContents.items.slice();
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.items[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var item = _step3.value;

					if (item.questionIdNum && item.questionIdNum >= this.nextQuestionIdNum) this.nextQuestionIdNum = item.questionIdNum + 1;
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
	},
	components: {
		FormBuilderInstruction: __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue___default.a,
		FormBuilderQuestion: __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue___default.a
	}
};

/***/ }),

/***/ 90:
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

/* harmony default export */ __webpack_exports__["default"] = {
	props: ['text'],
	data: function data() {
		return {};
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', event.target.value);
		}
	}
};

/***/ }),

/***/ 91:
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
	props: ['type', 'text', 'value', 'description', 'isWorkingOption'],
	computed: {
		displayType: function displayType() {
			if (this.type === 'checkbox') return 'checkbox';else return 'radio';
		}
	},
	data: function data() {
		return {
			isFocused: false
		};
	},

	methods: {
		handleInputFocus: function handleInputFocus(field) {
			this.isFocused = true;
			this.$emit('focus', field);
		},
		handleInputBlur: function handleInputBlur(field) {
			this.isFocused = false;
			this.$emit('blur', field);
		}
	}
};

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(3);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['formType', 'groupedMilestones', 'allCompetencies', 'questionIdNum', 'text', 'questionType', 'milestones', 'competencies', 'options', 'required', 'customOptions'],
	data: function data() {
		return {
			workingOption: {
				text: '',
				value: '',
				description: ''
			}
		};
	},

	computed: {
		questionId: function questionId() {
			return 'q' + this.questionIdNum;
		},
		shouldShowMilestonesAndCompetencies: function shouldShowMilestonesAndCompetencies() {
			return ['radio', 'number'].indexOf(this.questionType) !== -1 && ['resident', 'self-resident', 'fellow', 'self-fellow'].indexOf(this.formType) !== -1;
		},
		optionsWithWorking: function optionsWithWorking() {
			if (this.options) {
				var options = this.options.slice();
				options.push(this.workingOption);
				return options;
			}
		},
		workingOptionIndex: function workingOptionIndex() {
			if (this.options) return this.options.length;
		}
	},
	methods: {
		changeQuestionType: function changeQuestionType(event) {
			var questionType = event.target.value;
			var options = [];

			this.$emit('change', { questionType: questionType, options: options });
		},
		handleWorkingOptionInput: function handleWorkingOptionInput(index, option) {
			if (index === this.workingOptionIndex) this.workingOption = Object.assign({}, this.workingOption, option);
		},
		handleOptionChange: function handleOptionChange(index, option) {
			if (index === this.workingOptionIndex) {
				var options = this.options.slice();
				options.push(Object.assign({}, this.workingOption, option));
				this.workingOption = {
					text: '',
					value: '',
					description: ''
				};
				this.$emit('change', { options: options });
			} else {
				var _options = this.options.slice();
				_options[index] = Object.assign(_options[index], option);
				if (!_options[index].text && !_options[index].value && !_options[index].description) _options.splice(index, 1);

				this.$emit('change', { options: _options });
			}
		},
		setStandardOptions: function setStandardOptions() {
			var options = void 0;
			switch (this.formType) {
				case 'resident':
				case 'self-resident':
					options = __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__["i" /* STANDARD_OPTIONS */].RESIDENT;
					break;
				case 'fellow':
				case 'self-fellow':
					options = __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__["i" /* STANDARD_OPTIONS */].FELLOW;
					break;
				case 'faculty':
					if (this.questionType === 'radiononnumeric') options = __WEBPACK_IMPORTED_MODULE_2__modules_constants_js__["i" /* STANDARD_OPTIONS */].FACULTY;
					break;
			}

			if (!options) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["m" /* appendAlert */])('No standard options found for form type and question type');
				return;
			}

			this.$emit('change', { options: options });
		},
		setMilestoneOptions: function setMilestoneOptions() {
			var _this = this;

			if (this.milestones.length !== 1) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["m" /* appendAlert */])('You can only use milestone options with a single selected milestone');
				return;
			}
			fetch('/milestones/' + this.milestones[0], { credentials: 'same-origin' }).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response);
			}).then(function (milestone) {
				if (!milestone || !milestone.levels || milestone.levels.length < 1) {
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["m" /* appendAlert */])('No milestone levels found');
					return;
				}
				var options = [{
					value: 0,
					text: 'Not yet ' + milestone.levels[0].name
				}];
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = milestone.levels[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var level = _step.value;

						var value = 2 * parseInt(level.level_number, 10);
						options.push({ value: value - 1, text: '', description: '' });
						options.push({ value: value, text: level.name, description: level.description });
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

				_this.$emit('change', { options: options });
			}).catch(function (err) {
				console.error(err);
			});
		},
		setCustomOptions: function setCustomOptions() {
			if (this.customOptions.length < 1) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["m" /* appendAlert */])('No custom options set');
				return;
			}

			this.$emit('change', { options: this.customOptions });
		}
	},
	components: {
		FormBuilderOption: __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue___default.a,
		SelectTwo: __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue___default.a
	}
};

/***/ })

},[369]);
});
//# sourceMappingURL=vue-form-builder.js.map