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
return webpackJsonp([7],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(20)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(22),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-8d03363a",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/BootstrapAlert.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] BootstrapAlert.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 12:
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),

/***/ 135:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(327)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(180),
  /* template */
  __webpack_require__(466),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-2c14a78c",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilder.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilder.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2c14a78c", Component.options)
  } else {
    hotAPI.reload("data-v-2c14a78c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('select', {
    attrs: {
      "name": _vm.name,
      "id": _vm.id,
      "required": _vm.required,
      "multiple": _vm.multiple,
      "disabled": _vm.readonly
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
     require("vue-hot-reload-api").rerender("data-v-2434126b", module.exports)
  }
}

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__);
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
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue___default.a
	}
});

/***/ }),

/***/ 17:
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

/* harmony default export */ __webpack_exports__["default"] = ({
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

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormBuilderInstruction_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['oldFormContents'],
	created: function created() {
		var _this = this;

		__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["v" /* fetchMilestoneGroups */])().then(function (milestoneGroups) {
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
			periodType: 'month',
			nextQuestionIdNum: 1,
			groupedMilestones: [],
			competencies: [],
			items: [],
			customOptions: [],

			alerts: []
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
			var _this2 = this;

			event.preventDefault();
			var requestBody = JSON.stringify({
				title: this.title,
				formType: this.formType,
				evaluation_period_type: this.periodType,
				items: this.items.map(function (item) {
					item.questionId = 'q' + item.questionIdNum;
					return item;
				})
			});

			if (this.isFormValid()) {
				fetch('/forms', {
					method: 'POST',
					headers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["a" /* getFetchHeaders */])(),
					credentials: 'same-origin',
					body: requestBody
				}).then(function (response) {
					if (response.ok) return response.text();else throw new Error(response);
				}).then(function (response) {
					if (response === 'success') window.location = '/manage/forms';else throw new Error(response);
				}).catch(function (err) {
					_this2.alerts.push({
						type: 'error',
						text: 'Error saving form'
					});
					console.error(err);
				});
			}
		},
		isFormValid: function isFormValid() {
			if (!this.title) {
				this.alerts.push({
					type: 'error',
					text: 'Please enter a title for the form'
				});
				return false;
			}

			if (!this.items || this.items.length < 1) {
				this.alerts.push({
					type: 'error',
					text: 'Please enter at least one question'
				});
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
							this.alerts.push({
								type: 'error',
								text: 'Please enter question text for question ' + item.questionIdNum
							});
							return false;
						}
						if (['radio', 'radiononnumeric', 'checkbox'].includes(item.questionType)) {
							if (!item.options || item.options.length < 1) {
								this.alerts.push({
									type: 'error',
									text: 'Please add at least one option for each multiple-choice question'
								});
								return false;
							}

							var _iteratorNormalCompletion2 = true;
							var _didIteratorError2 = false;
							var _iteratorError2 = undefined;

							try {
								for (var _iterator2 = item.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
									var option = _step2.value;

									if (!('value' in option)) {
										this.alerts.push({
											type: 'error',
											text: 'An option cannot be submitted without a value. Please either assign a value or remove the option text and description for each option in question ' + item.questionIdNum
										});
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
							this.alerts.push({
								type: 'error',
								text: 'Please complete or remove all empty instruction blocks'
							});
							return false;
						}
					} else {
						this.alerts.push({
							type: 'error',
							text: 'Unrecognized item type in form'
						});
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
		FormBuilderQuestion: __WEBPACK_IMPORTED_MODULE_1__FormBuilderQuestion_vue___default.a,
		AlertList: __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default.a
	}
});

/***/ }),

/***/ 181:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['text'],
	data: function data() {
		return {};
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', event.target.value);
		}
	}
});

/***/ }),

/***/ 182:
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

/* harmony default export */ __webpack_exports__["default"] = ({
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
});

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__AlertList_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(1);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
	props: ['formType', 'groupedMilestones', 'allCompetencies', 'questionIdNum', 'text', 'questionType', 'milestones', 'competencies', 'options', 'required', 'customOptions'],
	data: function data() {
		return {
			workingOption: {
				text: '',
				value: '',
				description: ''
			},

			alerts: []
		};
	},

	computed: {
		questionId: function questionId() {
			return 'q' + this.questionIdNum;
		},
		shouldShowMilestonesAndCompetencies: function shouldShowMilestonesAndCompetencies() {
			return ['radio', 'number'].includes(this.questionType) && ['resident', 'self-resident', 'fellow', 'self-fellow'].includes(this.formType);
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
		},
		competencyOptions: function competencyOptions() {
			return this.allCompetencies.map(function (competency) {
				return {
					id: competency.id,
					text: competency.title
				};
			}).sort(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["w" /* sortSelect2Objects */]);
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
					options = __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__["i" /* STANDARD_OPTIONS */].RESIDENT.slice();
					break;
				case 'fellow':
				case 'self-fellow':
					options = __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__["i" /* STANDARD_OPTIONS */].FELLOW.slice();
					break;
				case 'faculty':
					if (this.questionType === 'radiononnumeric') options = __WEBPACK_IMPORTED_MODULE_3__modules_constants_js__["i" /* STANDARD_OPTIONS */].FACULTY.slice();
					break;
			}

			if (!options) {
				this.alerts.push({
					type: 'error',
					text: 'No standard options found for form type and question type'
				});
				return;
			}

			this.$emit('change', { options: options });
		},
		setMilestoneOptions: function setMilestoneOptions() {
			var _this = this;

			if (this.milestones.length !== 1) {
				this.alerts.push({
					type: 'error',
					text: 'You can only use milestone options with a single selected milestone'
				});
				return;
			}
			fetch('/milestones/' + this.milestones[0], { credentials: 'same-origin' }).then(function (response) {
				if (response.ok) return response.json();else throw new Error(response);
			}).then(function (milestone) {
				if (!milestone || !milestone.levels || milestone.levels.length < 1) {
					_this.alerts.push({
						type: 'error',
						text: 'No milestone levels found'
					});
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
				this.alerts.push({
					type: 'error',
					text: 'No custom options set'
				});
				return;
			}

			this.$emit('change', { options: this.customOptions.slice() });
		}
	},
	components: {
		FormBuilderOption: __WEBPACK_IMPORTED_MODULE_0__FormBuilderOption_vue___default.a,
		SelectTwo: __WEBPACK_IMPORTED_MODULE_1__SelectTwo_vue___default.a,
		AlertList: __WEBPACK_IMPORTED_MODULE_2__AlertList_vue___default.a
	}
});

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', _vm._l((_vm.value), function(alert, index) {
    return _c('bootstrap-alert', _vm._b({
      attrs: {
        "dismissable": true
      },
      on: {
        "close": function($event) {
          _vm.removeAlert(index)
        }
      }
    }, 'bootstrap-alert', alert))
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4ff56c56", module.exports)
  }
}

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "alert",
    class: _vm.alertTypeClass
  }, [(_vm.dismissable) ? _c('button', {
    staticClass: "close",
    attrs: {
      "type": "button",
      "aria-label": "Close"
    },
    on: {
      "click": function($event) {
        _vm.$emit('close')
      }
    }
  }, [_c('span', {
    attrs: {
      "aria-hidden": "true"
    }
  }, [_vm._v("×")])]) : _vm._e(), _vm._v("\n\t" + _vm._s(_vm.text) + "\n\t"), (_vm.html) ? _c('div', {
    domProps: {
      "innerHTML": _vm._s(_vm.html)
    }
  }) : _vm._e(), _vm._v(" "), _vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8d03363a", module.exports)
  }
}

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_FormBuilder_FormBuilder_vue__ = __webpack_require__(135);
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

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(21),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/AlertList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AlertList.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 327:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 342:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 346:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 425:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(181),
  /* template */
  __webpack_require__(490),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderInstruction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilderInstruction.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b07925b8", Component.options)
  } else {
    hotAPI.reload("data-v-b07925b8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 426:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(342)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(182),
  /* template */
  __webpack_require__(488),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-855ce662",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderOption.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilderOption.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-855ce662", Component.options)
  } else {
    hotAPI.reload("data-v-855ce662", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 427:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(346)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(183),
  /* template */
  __webpack_require__(495),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-e2c7d180",
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/FormBuilder/FormBuilderQuestion.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FormBuilderQuestion.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e2c7d180", Component.options)
  } else {
    hotAPI.reload("data-v-e2c7d180", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 466:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-header"
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "row"
  }, [_c('div', {
    staticClass: "col-md-6"
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
      "value": (_vm.title)
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
    staticClass: "col-md-3"
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
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.formType = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
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
  }, [_vm._v("Staff")])])])]), _vm._v(" "), _c('div', {
    staticClass: "col-md-3"
  }, [_c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    attrs: {
      "for": "form-period-type"
    }
  }, [_vm._v("Evaluation period type")]), _vm._v(" "), _c('select', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.periodType),
      expression: "periodType"
    }],
    staticClass: "form-control input-lg",
    attrs: {
      "id": "form-period-type"
    },
    on: {
      "change": function($event) {
        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
          return o.selected
        }).map(function(o) {
          var val = "_value" in o ? o._value : o.value;
          return val
        });
        _vm.periodType = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
      }
    }
  }, [_c('option', {
    attrs: {
      "value": "month"
    }
  }, [_vm._v("Month")]), _vm._v(" "), _c('option', {
    attrs: {
      "value": "quarter"
    }
  }, [_vm._v("Quarter")])])])])])]), _vm._v(" "), _c('div', {
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
  }, [_c('alert-list', {
    model: {
      value: (_vm.alerts),
      callback: function($$v) {
        _vm.alerts = $$v
      },
      expression: "alerts"
    }
  }), _vm._v(" "), _c('button', {
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
  }, [_vm._v("Submit Form")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2c14a78c", module.exports)
  }
}

/***/ }),

/***/ 488:
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
     require("vue-hot-reload-api").rerender("data-v-855ce662", module.exports)
  }
}

/***/ }),

/***/ 490:
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
     require("vue-hot-reload-api").rerender("data-v-b07925b8", module.exports)
  }
}

/***/ }),

/***/ 495:
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
  }, [_vm._v("\n\t\t\t\t\tQuestion Competency\n\t\t\t\t\t"), _c('select-two', {
    staticClass: "form-control form-question-competency",
    attrs: {
      "value": _vm.competencies,
      "placeholder": "Competency",
      "options": _vm.competencyOptions,
      "multiple": true
    },
    on: {
      "input": function($event) {
        _vm.$emit('change', {
          competencies: arguments[0]
        })
      }
    }
  })], 1)])])]), _vm._v(" "), _c('div', {
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
  })]) : _vm._e()], 2)]), _vm._v(" "), _c('alert-list', {
    model: {
      value: (_vm.alerts),
      callback: function($$v) {
        _vm.alerts = $$v
      },
      expression: "alerts"
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e2c7d180", module.exports)
  }
}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(14),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/SelectTwo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SelectTwo.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

},[226]);
});
//# sourceMappingURL=vue-form-builder.js.map