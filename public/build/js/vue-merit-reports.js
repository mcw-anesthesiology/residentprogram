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
return webpackJsonp([4,11],{

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Checklist_Checklist_vue__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Checklist_Checklist_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Checklist_Checklist_vue__);
/* harmony export (immutable) */ __webpack_exports__["a"] = createAdminSupervisorMeritReports;

// import VueRouter from 'vue-router';

// Vue.use(VueRouter);



function createAdminSupervisorMeritReports(el) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,

		props: {},
		data: function data() {
			return {
				checklist: {
					title: 'Title',
					version: 0,
					pages: [{
						type: 'section',
						title: 'Page 1',
						items: [{
							type: 'instruction',
							text: 'Instruction block text'
						}, {
							type: 'item',
							text: 'Item 1',
							questions: [{
								type: 'text',
								text: 'Text question'
							}]
						}, {
							type: 'item',
							text: 'Item 2',
							questions: [{
								type: 'text',
								text: 'Text question'
							}]
						}, {
							type: 'item',
							text: 'Item 3',
							questions: [{
								type: 'text',
								text: 'Text question'
							}]
						}, {
							type: 'section',
							title: 'Nested Section 1',
							items: [{
								type: 'item',
								text: 'Item 2',
								questions: [{
									type: 'checkbox',
									text: 'Checkbox question',
									options: [{
										text: 'A',
										value: 'a'
									}, {
										text: 'B',
										value: 2
									}]
								}]
							}]
						}]
					}, {
						type: 'section',
						title: 'Page 2',
						items: [{
							type: 'item',
							text: 'Page 2 Item 1',
							questions: [{
								type: 'number',
								text: 'Number question',
								value: 0
							}]
						}]
					}]
				}
			};
		},


		methods: {
			handleInput: function handleInput(checklist) {
				this.checklist = Object.assign({}, this.checklist, checklist);
			},
			handleSubmit: function handleSubmit() {
				console.log(JSON.stringify(this.checklist, null, 4));
			}
		},

		components: {
			MeritCompensationChecklist: __WEBPACK_IMPORTED_MODULE_1__vue_components_MeritCompensation_Checklist_Checklist_vue___default.a
		}
	});
}

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Section_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Section_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Pager_vue__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Pager_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Questionnaire_Pager_vue__);
//
//
//
//
//
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
		title: {
			type: String,
			required: true
		},
		version: {
			type: Number,
			required: true
		},
		pages: {
			type: Array,
			required: true
		},
		readonly: {
			type: Boolean,
			default: false
		}
	},

	methods: {
		handleInput: function handleInput(pageNum, page) {
			var pages = this.pages.slice();
			pages[pageNum] = Object.assign({}, pages[pageNum], page);

			this.$emit('input', { pages: pages });
		},
		handleSubmit: function handleSubmit() {
			this.$emit('submit');
		}
	},

	components: {
		ChecklistSection: __WEBPACK_IMPORTED_MODULE_0__Section_vue___default.a,
		QuestionnairePager: __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Pager_vue___default.a
	}
};

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue__);
//
//
//
//
//
//
//
//
//
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
		}
	},

	methods: {
		handleCheck: function handleCheck() {
			var checked = !this.checked;
			var item = { checked: checked };

			if (!checked) {
				var questions = this.questions.map(this.clearQuestion);
				item.questions = questions;
			}

			this.$emit('input', item);
		},
		handleQuestionInput: function handleQuestionInput(index, question) {
			var questions = this.questions.slice();
			questions[index] = Object.assign({}, questions[index], question);

			this.$emit('input', { questions: questions });
		},
		clearQuestion: function clearQuestion(question) {
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
		QuestionnaireQuestion: __WEBPACK_IMPORTED_MODULE_0__Questionnaire_Question_Question_vue___default.a
	}
};

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue__);





/* harmony default export */ __webpack_exports__["default"] = {
	extends: __WEBPACK_IMPORTED_MODULE_2__Questionnaire_Section_vue___default.a,
	name: 'checklist-section',

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
					readonly: _this.readonly
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
		ChecklistItem: __WEBPACK_IMPORTED_MODULE_0__Item_vue___default.a,
		QuestionnaireInstruction: __WEBPACK_IMPORTED_MODULE_1__Questionnaire_Instruction_vue___default.a
	}
};

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_snarkdown__ = __webpack_require__(43);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = {
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
			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_snarkdown__["a" /* default */])(this.text);
		}
	}
};

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressBullets_vue__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProgressBullets_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ProgressBullets_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		submitText: {
			type: String,
			default: 'Submit'
		},
		nextText: {
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
			currentPage: 0
		};
	},


	computed: {
		page: function page() {
			return this.pages[this.currentPage];
		},
		canAdvancePage: function canAdvancePage() {
			return this.pageValidator(this.currentPage);
		}
	},

	methods: {
		goBack: function goBack() {
			if (this.currentPage > 0) this.currentPage--;
		},
		advance: function advance() {
			if (this.canAdvancePage) this.currentPage++;
		},
		submit: function submit() {
			if (this.canAdvancePage) this.$emit('submit');
		}
	},

	components: {
		ProgressBullets: __WEBPACK_IMPORTED_MODULE_0__ProgressBullets_vue___default.a
	}
};

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(43);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			type: String
		},
		description: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: true
		},
		readonly: {
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
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		onCheck: function onCheck(index) {
			var options = Array.slice(this.options);
			options[index] = Object.assign({}, options[index], {
				checked: !options[index].checked
			});

			this.$emit('input', { options: options });
		},

		snarkdown: __WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */]
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
};

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

/* harmony default export */ __webpack_exports__["default"] = {
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
		}
	},

	render: function render(h) {
		var _this = this;

		var listEl = this.ordered ? 'ol' : 'ul';
		return h(listEl, this.items.map(function (item, index) {
			var itemComponent = void 0;
			switch (item.type) {
				case 'text':
					itemComponent = 'text-item';
					break;
				case 'publication':
					itemComponent = 'publication-item';
					break;
			}

			return h(itemComponent, {
				props: Object.assign({
					readonly: _this.readonly
				}, item),
				on: {
					change: function change(item) {
						var items = Array.slice(_this.items);
						items[index] = Object.assign({}, items[index], item);

						_this.$emit('change', items);
					}
				}
			});
		}));
	}
};

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Items_vue__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Items_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Items_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_snarkdown__ = __webpack_require__(43);
//
//
//
//
//
//
//
//
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
	model: {
		prop: 'items',
		event: 'change'
	},
	props: {
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'checkbox';
			}
		},
		text: {
			type: String
		},
		description: {
			type: String,
			required: false
		},
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
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		onChange: function onChange(items) {
			this.$emit('change', { items: items });
		},

		snarkdown: __WEBPACK_IMPORTED_MODULE_2_snarkdown__["a" /* default */]
	},

	components: {
		ListItems: __WEBPACK_IMPORTED_MODULE_0__Items_vue___default.a,
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_1__ShowHideButton_vue___default.a
	}
};

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(43);
//
//
//
//
//
//
//
//
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
		type: {
			type: String,
			validator: function validator(type) {
				return type === 'number';
			}
		},
		text: {
			type: String
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
		readonly: {
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
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', { value: Number(event.target.value) });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
};

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_vue__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Text_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Text_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Number_vue__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Number_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__Number_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Checkbox_vue__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Checkbox_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__Checkbox_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Radio_vue__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Radio_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__Radio_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__List_List_vue__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__List_List_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__List_List_vue__);







/* harmony default export */ __webpack_exports__["default"] = {
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
		}
	},

	render: function render(h) {
		var _this = this;

		var type = void 0;
		if (this.question.type === 'textarea') type = 'text';else type = this.question.type;

		var questionComponent = type + '-question';

		return h(questionComponent, {
			props: Object.assign({
				readonly: this.readonly
			}, this.question),
			on: {
				input: function input(question) {
					_this.$emit('input', question);
				}
			}
		});
	},


	components: {
		TextQuestion: __WEBPACK_IMPORTED_MODULE_0__Text_vue___default.a,
		NumberQuestion: __WEBPACK_IMPORTED_MODULE_1__Number_vue___default.a,
		CheckboxQuestion: __WEBPACK_IMPORTED_MODULE_2__Checkbox_vue___default.a,
		RadioQuestion: __WEBPACK_IMPORTED_MODULE_3__Radio_vue___default.a,
		ListQuestion: __WEBPACK_IMPORTED_MODULE_4__List_List_vue___default.a
	}
};

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(43);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			type: String
		},
		description: {
			type: String,
			required: false
		},
		options: {
			type: Array,
			required: true
		},
		readonly: {
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
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		onCheck: function onCheck(index) {
			var options = this.options.map(function (option, i) {
				var newOption = Object.assign({}, option);

				newOption.checked = i === index;

				return newOption;
			});

			this.$emit('input', { options: options });
		},

		snarkdown: __WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */]
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
};

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_snarkdown__ = __webpack_require__(43);
//
//
//
//
//
//
//
//
//
//
//
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
		type: {
			type: String,
			validator: function validator(type) {
				return ['text', 'textarea'].includes(type);
			}
		},
		text: {
			type: String
		},
		description: {
			type: String,
			required: false
		},
		placeholder: {
			type: String,
			required: false
		},
		properties: {
			type: Array,
			required: false
		},
		value: {
			type: String,
			default: ''
		},
		readonly: {
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
			if (this.description) return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_snarkdown__["a" /* default */])(this.description);
		}
	},

	methods: {
		onInput: function onInput(event) {
			this.$emit('input', { value: event.target.value });
		}
	},

	components: {
		ShowHideButton: __WEBPACK_IMPORTED_MODULE_0__ShowHideButton_vue___default.a
	}
};

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Instruction_vue__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Instruction_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Instruction_vue__);



/* harmony default export */ __webpack_exports__["default"] = {
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
		readonly: {
			type: Boolean,
			default: false
		}
	},

	render: function render(h) {
		var _this = this;

		var items = this.items.map(function (item, index) {
			var componentName = 'question-' + item.type;

			return h(componentName, {
				props: Object.assign({
					readonly: _this.readonly
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
		QuestionnaireInstruction: __WEBPACK_IMPORTED_MODULE_0__Instruction_vue___default.a
	}
};

/***/ }),

/***/ 24:
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

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.pager-controls[data-v-a814e09c] {\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\tjustify-content: space-between;\n\talign-items: center;\n}\n.pager-controls button[data-v-a814e09c],\n.pager-controls div[data-v-a814e09c] {\n\twidth: 100px;\n\tmargin: 0.5em;\n}\n.pager-controls .progress-bullets[data-v-a814e09c] {\n\tmargin: 0.5em 2em;\n\tflex-grow: 1;\n}\n@media (max-width: 768px) {\n.pager-controls .progress-bullets[data-v-a814e09c] {\n\t\twidth: 100%;\n\t\torder: 1;\n}\n.pager-controls button[data-v-a814e09c],\n\t.pager-controls div[data-v-a814e09c] {\n\t\torder: 2;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Pager.vue?3e8b81b4"],"names":[],"mappings":";AAoGA;CACA,cAAA;CACA,oBAAA;CACA,gBAAA;CACA,+BAAA;CACA,oBAAA;CACA;AAEA;;CAEA,aAAA;CACA,cAAA;CACA;AAEA;CACA,kBAAA;CACA,aAAA;CACA;AAEA;AACA;EACA,YAAA;EACA,SAAA;CACA;AAEA;;EAEA,SAAA;CACA;CACA","file":"Pager.vue","sourcesContent":["<template>\n\t<div class=\"questionnaire-pager\">\n\t\t<div class=\"pager-content\">\n\t\t\t<slot :page=\"page\" :page-num=\"currentPage\"></slot>\n\t\t</div>\n\t\t<div class=\"pager-controls\">\n\t\t\t<button type=\"button\" class=\"btn btn-default\"\n\t\t\t\t\t:disabled=\"currentPage === 0\"\n\t\t\t\t\t@click=\"goBack\">\n\t\t\t\t{{ backText }}\n\t\t\t</button>\n\t\t\t\n\t\t\t<progress-bullets :max=\"pages.length\" :value=\"currentPage + 1\" />\n\t\t\t\n\t\t\t<button v-if=\"currentPage < pages.length - 1\" type=\"button\"\n\t\t\t\t\tclass=\"btn btn-default\" :disabled=\"!canAdvancePage\"\n\t\t\t\t\t@click=\"advance\">\n\t\t\t\t{{ nextText }}\n\t\t\t</button>\n\t\t\t<button v-else-if=\"!readonly\" type=\"button\"\n\t\t\t\t\tclass=\"btn btn-primary\" :disabled=\"!canAdvancePage\"\n\t\t\t\t\t@click=\"submit\">\n\t\t\t\t{{ submitText }}\n\t\t\t</button>\n\t\t\t<div v-else>\n\t\t\t\t<!-- To preserve spacing -->\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport ProgressBullets from 'vue-components/ProgressBullets.vue';\n\nexport default {\n\tprops: {\n\t\tpages: {\n\t\t\ttype: Array,\n\t\t\trequired: true\n\t\t},\n\t\tpageValidator: {\n\t\t\ttype: Function,\n\t\t\tdefault() {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t},\n\t\tsubmitText: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Submit'\n\t\t},\n\t\tnextText: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Next page'\n\t\t},\n\t\tbackText: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Back'\n\t\t},\n\t\treadonly: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tcurrentPage: 0\n\t\t};\n\t},\n\t\n\tcomputed: {\n\t\tpage() {\n\t\t\treturn this.pages[this.currentPage];\n\t\t},\n\t\tcanAdvancePage() {\n\t\t\treturn this.pageValidator(this.currentPage);\n\t\t}\n\t},\n\t\n\tmethods: {\n\t\tgoBack() {\n\t\t\tif (this.currentPage > 0)\n\t\t\t\tthis.currentPage--;\n\t\t},\n\t\tadvance() {\n\t\t\tif (this.canAdvancePage)\n\t\t\t\tthis.currentPage++;\n\t\t},\n\t\tsubmit() {\n\t\t\tif (this.canAdvancePage)\n\t\t\t\tthis.$emit('submit');\n\t\t}\n\t},\n\t\n\tcomponents: {\n\t\tProgressBullets\n\t}\n};\n</script>\n\n<style scoped>\n\t.pager-controls {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t}\n\t\n\t.pager-controls button,\n\t.pager-controls div {\n\t\twidth: 100px;\n\t\tmargin: 0.5em;\n\t}\n\t\n\t.pager-controls .progress-bullets {\n\t\tmargin: 0.5em 2em;\n\t\tflex-grow: 1;\n\t}\n\t\n\t@media (max-width: 768px) {\n\t\t.pager-controls .progress-bullets {\n\t\t\twidth: 100%;\n\t\t\torder: 1;\n\t\t}\n\t\t\n\t\t.pager-controls button,\n\t\t.pager-controls div {\n\t\t\torder: 2;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\nsection[data-v-a8188cb2] {\n\tfont-size: 0.95em;\n\tpadding: 1em;\n\tmargin: 0.5em;\n\tborder-left: 2px solid rgba(0, 0, 0, 0.15);\n}\nsection.page[data-v-a8188cb2] {\n\tborder: none;\n}\nsection h1[data-v-a8188cb2] {\n\tfont-size: 1.75em;\n\tmargin: 0 0 1em;\n}\n@media (min-width: 768px) {\nsection[data-v-a8188cb2] {\n\t\tpadding: 1.5em;\n\t\tmargin: 1em;\n}\n}\n@media (min-width: 1200px) {\nsection[data-v-a8188cb2] {\n\t\tpadding: 2em;\n\t\tmargin: 2em;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue?355d6f90"],"names":[],"mappings":";AA0DA;CACA,kBAAA;CACA,aAAA;CACA,cAAA;CACA,2CAAA;CACA;AAEA;CACA,aAAA;CACA;AAEA;CACA,kBAAA;CACA,gBAAA;CACA;AAEA;AACA;EACA,eAAA;EACA,YAAA;CACA;CACA;AAEA;AACA;EACA,aAAA;EACA,YAAA;CACA;CACA","file":"Section.vue","sourcesContent":["<script>\nimport ChecklistItem from './Item.vue';\nimport QuestionnaireInstruction from 'vue-components/Questionnaire/Instruction.vue';\nimport QuestionnaireSection from 'vue-components/Questionnaire/Section.vue';\n\nexport default {\n\textends: QuestionnaireSection,\n\tname: 'checklist-section',\n\t\n\trender(h) {\n\t\tlet items = this.items.map((item, index) => {\n\t\t\tlet componentName;\n\t\t\tswitch (item.type) {\n\t\t\t\tcase 'section':\n\t\t\t\t\tcomponentName = 'checklist-section';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'instruction':\n\t\t\t\t\tcomponentName = 'questionnaire-instruction';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'item':\n\t\t\t\t\tcomponentName = 'checklist-item';\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\t\n\t\t\treturn h(componentName, {\n\t\t\t\tprops: {\n\t\t\t\t\treadonly: this.readonly,\n\t\t\t\t\t...item\n\t\t\t\t},\n\t\t\t\ton: {\n\t\t\t\t\tinput: item => {\n\t\t\t\t\t\tlet items = this.items.slice();\n\t\t\t\t\t\titems[index] = Object.assign({}, items[index], item);\n\t\t\t\t\t\t\n\t\t\t\t\t\tthis.$emit('input', {items});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\t\t\n\t\tif (this.title)\n\t\t\titems.unshift(h('h1', this.title));\n\t\t\n\t\treturn h('section', {\n\t\t\tclass: {\n\t\t\t\tpage: this.page\n\t\t\t}\n\t\t}, items);\n\t},\n\t\n\tcomponents: {\n\t\tChecklistItem,\n\t\tQuestionnaireInstruction\n\t}\n};\n</script>\n\n<style scoped>\n\tsection {\n\t\tfont-size: 0.95em;\n\t\tpadding: 1em;\n\t\tmargin: 0.5em;\n\t\tborder-left: 2px solid rgba(0, 0, 0, 0.15);\n\t}\n\t\n\tsection.page {\n\t\tborder: none;\n\t}\n\t\n\tsection h1 {\n\t\tfont-size: 1.75em;\n\t\tmargin: 0 0 1em;\n\t}\n\t\n\t@media (min-width: 768px) {\n\t\tsection {\n\t\t\tpadding: 1.5em;\n\t\t\tmargin: 1em;\n\t\t}\n\t}\n\t\n\t@media (min-width: 1200px) {\n\t\tsection {\n\t\t\tpadding: 2em;\n\t\t\tmargin: 2em;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n@media print {\nbutton[data-v-38459c74] {\n\t\tdisplay: none;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ShowHideButton.vue?47c685e9"],"names":[],"mappings":";AAuCA;AACA;EACA,cAAA;CACA;CACA","file":"ShowHideButton.vue","sourcesContent":["<template>\n\t<button type=\"button\" class=\"btn\"\n\t\t\t@click=\"$emit('input', !value)\">\n\t\t\t\n\t\t<slot name=\"left-glyph\"></slot>\n\t\t\t\n\t\t<slot v-if=\"value\" name=\"true\">\n\t\t\tHide\n\t\t</slot>\n\t\t<slot v-else name=\"false\">\n\t\t\tShow\n\t\t</slot>\n\n\t\t<slot>\n\t\t\t{{ text }}\n\t\t</slot>\n\t\t\n\t\t<slot name=\"glyph\">\n\t\t\t<span class=\"glyphicon glyphicon-triangle-bottom\"></span>\n\t\t</slot>\n\t</button>\n</template>\n\n<script>\nexport default {\n\tprops: {\n\t\tvalue: {\n\t\t\ttype: Boolean,\n\t\t\trequired: true\n\t\t},\n\t\ttext: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t@media print {\n\t\tbutton {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 34:
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

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(476)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(387),
  /* scopeId */
  "data-v-08bc7d30",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checklist.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(474)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(136),
  /* template */
  __webpack_require__(383),
  /* scopeId */
  "data-v-024c0c7e",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Item.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(445)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(137),
  /* template */
  null,
  /* scopeId */
  "data-v-a8188cb2",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 366:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(444)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(142),
  /* template */
  __webpack_require__(416),
  /* scopeId */
  "data-v-a814e09c",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Pager.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Pager.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 367:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(482)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(143),
  /* template */
  __webpack_require__(388),
  /* scopeId */
  "data-v-098680db",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Checkbox.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 368:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(144),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/Items.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(145),
  /* template */
  __webpack_require__(382),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/List/List.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] List.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(146),
  /* template */
  __webpack_require__(392),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Number.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Number.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 371:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(147),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Question.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 372:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(480)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(148),
  /* template */
  __webpack_require__(402),
  /* scopeId */
  "data-v-3b7f8513",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Radio.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Radio.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(149),
  /* template */
  __webpack_require__(397),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Text.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Text.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 374:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(150),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Section.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 382:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [_c('legend', [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), _c('list-items', {
    attrs: {
      "ordered": _vm.ordered,
      "items": _vm.items
    },
    on: {
      "change": _vm.onChange
    }
  })], 1), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-013e02b2", module.exports)
  }
}

/***/ }),

/***/ 383:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checklist-item"
  }, [_c('label', {
    staticClass: "containing-label"
  }, [_c('input', {
    attrs: {
      "type": "checkbox",
      "disabled": _vm.readonly
    },
    domProps: {
      "checked": _vm.checked
    },
    on: {
      "change": _vm.handleCheck
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "item-text"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")])]), _vm._v(" "), (_vm.checked) ? _c('div', {
    staticClass: "item-questions"
  }, _vm._l((_vm.questions), function(question, index) {
    return _c('questionnaire-question', {
      attrs: {
        "question": question,
        "readonly": _vm.readonly
      },
      on: {
        "input": function($event) {
          _vm.handleQuestionInput(index, arguments[0])
        }
      }
    })
  })) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-024c0c7e", module.exports)
  }
}

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checklist"
  }, [_c('h1', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('questionnaire-pager', {
    attrs: {
      "pages": _vm.pages,
      "readonly": _vm.readonly
    },
    on: {
      "submit": _vm.handleSubmit
    },
    scopedSlots: _vm._u([
      ["default", function(pager) {
        return [_c('checklist-section', _vm._b({
          attrs: {
            "page": true,
            "readonly": _vm.readonly
          },
          on: {
            "input": function($event) {
              _vm.handleInput(pager.pageNum, arguments[0])
            }
          }
        }, 'checklist-section', pager.page))]
      }]
    ])
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-08bc7d30", module.exports)
  }
}

/***/ }),

/***/ 388:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "checkbox-question form-group"
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [_c('legend', [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "options"
  }, _vm._l((_vm.options), function(option, index) {
    return _c('label', {
      attrs: {
        "title": option.description
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t\t"), _c('input', {
      attrs: {
        "type": "checkbox",
        "disabled": _vm.readonly
      },
      domProps: {
        "value": option.value,
        "checked": option.checked
      },
      on: {
        "change": function($event) {
          _vm.onCheck(index)
        }
      }
    }), _vm._v(" "), (option.description) ? _c('div', {
      staticClass: "question-description"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.snarkdown(option.description)) + "\n\t\t\t\t")]) : _vm._e()])
  }))]), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-098680db", module.exports)
  }
}

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
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

/***/ }),

/***/ 390:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "instruction-block"
  }, [_vm._v("\n\t" + _vm._s(_vm.markedUpText) + "\n")])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-16c471bd", module.exports)
  }
}

/***/ }),

/***/ 392:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label",
    attrs: {
      "title": _vm.description
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t\t"), _c('input', {
    staticClass: "form-control appear-not-readonly",
    attrs: {
      "type": "number",
      "min": _vm.min,
      "max": _vm.max,
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onInput
    }
  })]), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-1fd00d61", module.exports)
  }
}

/***/ }),

/***/ 397:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "form-group"
  }, [_c('label', {
    staticClass: "containing-label",
    attrs: {
      "title": _vm.description
    }
  }, [_vm._v("\n\t\t" + _vm._s(_vm.text) + "\n\t\t"), (_vm.type === 'texarea') ? _c('textarea', {
    staticClass: "form-control appear-not-readonly",
    attrs: {
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onInput
    }
  }) : _c('input', {
    staticClass: "form-control appear-not-readonly",
    attrs: {
      "type": "text",
      "readonly": _vm.readonly
    },
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onInput
    }
  })]), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3340e545", module.exports)
  }
}

/***/ }),

/***/ 402:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "radio-question form-group"
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [_c('legend', [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), _c('div', {
    staticClass: "options"
  }, _vm._l((_vm.options), function(option, index) {
    return _c('label', {
      attrs: {
        "title": option.description
      }
    }, [_vm._v("\n\t\t\t\t" + _vm._s(option.text) + "\n\t\t\t\t"), _c('input', {
      attrs: {
        "type": "radio",
        "disabled": _vm.readonly
      },
      domProps: {
        "value": option.value,
        "checked": option.checked
      },
      on: {
        "change": function($event) {
          _vm.onCheck(index)
        }
      }
    }), _vm._v(" "), (option.description) ? _c('div', {
      staticClass: "question-description"
    }, [_vm._v("\n\t\t\t\t\t" + _vm._s(_vm.snarkdown(option.description)) + "\n\t\t\t\t")]) : _vm._e()])
  }))]), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
    model: {
      value: (_vm.show.description),
      callback: function($$v) {
        _vm.show.description = $$v
      },
      expression: "show.description"
    }
  }, [_vm._v("\n\t\tdescription\n\t")]) : _vm._e(), _vm._v(" "), (_vm.description) ? _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show.description),
      expression: "show.description"
    }]
  }, [_vm._v("\n\t\t" + _vm._s(_vm.markedUpDescription) + "\n\t")]) : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3b7f8513", module.exports)
  }
}

/***/ }),

/***/ 416:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "questionnaire-pager"
  }, [_c('div', {
    staticClass: "pager-content"
  }, [_vm._t("default", null, {
    page: _vm.page,
    pageNum: _vm.currentPage
  })], 2), _vm._v(" "), _c('div', {
    staticClass: "pager-controls"
  }, [_c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": _vm.currentPage === 0
    },
    on: {
      "click": _vm.goBack
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.backText) + "\n\t\t")]), _vm._v(" "), _c('progress-bullets', {
    attrs: {
      "max": _vm.pages.length,
      "value": _vm.currentPage + 1
    }
  }), _vm._v(" "), (_vm.currentPage < _vm.pages.length - 1) ? _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": !_vm.canAdvancePage
    },
    on: {
      "click": _vm.advance
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.nextText) + "\n\t\t")]) : (!_vm.readonly) ? _c('button', {
    staticClass: "btn btn-primary",
    attrs: {
      "type": "button",
      "disabled": !_vm.canAdvancePage
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.submitText) + "\n\t\t")]) : _c('div')], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-a814e09c", module.exports)
  }
}

/***/ }),

/***/ 43:
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

/* harmony default export */ __webpack_exports__["a"] = parse;
//# sourceMappingURL=snarkdown.es.js.map


/***/ }),

/***/ 444:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(260);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8ed4c90e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a814e09c&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Pager.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a814e09c&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Pager.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 445:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(261);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3805909a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a8188cb2&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Section.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-a8188cb2&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Section.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__admin_supervisor_js__ = __webpack_require__(108);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createAdminSupervisorMeritReports", function() { return __WEBPACK_IMPORTED_MODULE_0__admin_supervisor_js__["a"]; });

// export { default as createFacultyMeritReports } from './faculty.js';

/***/ }),

/***/ 468:
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

/* harmony default export */ __webpack_exports__["default"] = {
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
};

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.progress-bullets[data-v-7b09133f] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tjustify-content: center;\n\talign-items: center;\n}\n.bullet[data-v-7b09133f] {\n\tmargin: 1em;\n\twidth: 0.5em;\n\theight: 0.5em;\n\tborder-radius: 0.5em;\n\tbackground-color: rgba(0, 0, 0, 0.35);\n}\n.bullet.filled[data-v-7b09133f] {\n\tbackground-color: rgba(0, 0, 0, 0.75);\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ProgressBullets.vue?68cf27ae"],"names":[],"mappings":";AA4CA;CACA,cAAA;CACA,gBAAA;CACA,wBAAA;CACA,oBAAA;CACA;AAEA;CACA,YAAA;CACA,aAAA;CACA,cAAA;CACA,qBAAA;CACA,sCAAA;CACA;AAEA;CACA,sCAAA;CACA","file":"ProgressBullets.vue","sourcesContent":["<template>\n\t<div class=\"progress-bullets\"\n\t\t\trole=\"progressbar\" :aria-valuemin=\"min\" :aria-valuemax=\"max\"\n\t\t\t:aria-valuenow=\"value\" :title=\"label\">\n\t\t<div v-for=\"i in max\" class=\"bullet\" :class=\"{filled: i <= value}\">\n\t\t\t\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tprops: {\n\t\ttype: {\n\t\t\ttype: String,\n\t\t\tdefault: 'bar'\n\t\t},\n\t\tmin: {\n\t\t\ttype: Number,\n\t\t\tdefault: 0\n\t\t},\n\t\tmax: {\n\t\t\ttype: Number,\n\t\t\trequired: true\n\t\t},\n\t\tvalue: {\n\t\t\ttype: Number,\n\t\t\trequired: true\n\t\t},\n\t\tstepName: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Page'\n\t\t}\n\t},\n\t\n\tcomputed: {\n\t\tlabel() {\n\t\t\treturn `${this.stepName} ${this.value} of ${this.max}`;\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.progress-bullets {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t}\n\t\n\t.bullet {\n\t\tmargin: 1em;\n\t\twidth: 0.5em;\n\t\theight: 0.5em;\n\t\tborder-radius: 0.5em;\n\t\tbackground-color: rgba(0, 0, 0, 0.35);\n\t}\n\t\n\t.bullet.filled {\n\t\tbackground-color: rgba(0, 0, 0, 0.75);\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 470:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(472)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(468),
  /* template */
  __webpack_require__(471),
  /* scopeId */
  "data-v-7b09133f",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/ProgressBullets.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ProgressBullets.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "progress-bullets",
    attrs: {
      "role": "progressbar",
      "aria-valuemin": _vm.min,
      "aria-valuemax": _vm.max,
      "aria-valuenow": _vm.value,
      "title": _vm.label
    }
  }, _vm._l((_vm.max), function(i) {
    return _c('div', {
      staticClass: "bullet",
      class: {
        filled: i <= _vm.value
      }
    })
  }))
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7b09133f", module.exports)
  }
}

/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(469);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1feb5b8b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7b09133f&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProgressBullets.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js?sourceMap!../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7b09133f&scoped=true!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./ProgressBullets.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 473:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\nlabel[data-v-024c0c7e] {\n\tdisplay: flex;\n\tfont-size: 1.75em;\n}\ninput[type=\"checkbox\"][data-v-024c0c7e] {\n\twidth: 1em;\n\theight: 1em;\n\tpadding: 0.5em;\n\tmargin-right: 1em;\n}\n.item-questions[data-v-024c0c7e] {\n\tmargin-left: 3em;\n\tpadding: 1em;\n}\n@media (min-width: 768px) {\ninput[type=\"checkbox\"][data-v-024c0c7e] {\n\t\tmargin-right: 1.5em;\n}\n.item-questions[data-v-024c0c7e] {\n\t\tmargin-left: 4em;\n}\n}\n@media (min-width: 768px) {\ninput[type=\"checkbox\"][data-v-024c0c7e] {\n\t\tmargin-right: 2em;\n}\n.item-questions[data-v-024c0c7e] {\n\t\tmargin-left: 5em;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Item.vue?e40d8240"],"names":[],"mappings":";AA8FA;CACA,cAAA;CACA,kBAAA;CACA;AAEA;CACA,WAAA;CACA,YAAA;CACA,eAAA;CACA,kBAAA;CACA;AAEA;CACA,iBAAA;CACA,aAAA;CACA;AAEA;AACA;EACA,oBAAA;CACA;AAEA;EACA,iBAAA;CACA;CACA;AAEA;AACA;EACA,kBAAA;CACA;AAEA;EACA,iBAAA;CACA;CACA","file":"Item.vue","sourcesContent":["<template>\n\t<div class=\"checklist-item\">\n\t\t<label class=\"containing-label\">\n\t\t\t<input type=\"checkbox\" :checked=\"checked\" :disabled=\"readonly\"\n\t\t\t\t@change=\"handleCheck\" />\n\t\t\t\t\t\t\t\n\t\t\t<span class=\"item-text\">\n\t\t\t\t{{ text }}\n\t\t\t</span>\n\t\t</label>\n\t\t<div v-if=\"checked\" class=\"item-questions\">\n\t\t\t<questionnaire-question v-for=\"(question, index) of questions\"\n\t\t\t\t:question=\"question\" :readonly=\"readonly\"\n\t\t\t\t@input=\"handleQuestionInput(index, arguments[0])\" />\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport QuestionnaireQuestion from 'vue-components/Questionnaire/Question/Question.vue';\n\nexport default {\n\tprops: {\n\t\ttype: {\n\t\t\ttype: String,\n\t\t\tvalidator(type) {\n\t\t\t\treturn type === 'item';\n\t\t\t}\n\t\t},\n\t\ttext: {\n\t\t\ttype: String,\n\t\t\trequired: true\n\t\t},\n\t\tchecked: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t},\n\t\tquestions: {\n\t\t\ttype: Array,\n\t\t\trequired: false\n\t\t},\n\t\treadonly: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\t\n\tmethods: {\n\t\thandleCheck() {\n\t\t\tlet checked = !this.checked;\n\t\t\tlet item = {checked};\n\t\t\t\n\t\t\tif (!checked) {\n\t\t\t\tlet questions = this.questions.map(this.clearQuestion);\n\t\t\t\titem.questions = questions;\n\t\t\t}\n\t\t\t\n\t\t\tthis.$emit('input', item);\n\t\t},\n\t\thandleQuestionInput(index, question) {\n\t\t\tlet questions = this.questions.slice();\n\t\t\tquestions[index] = Object.assign({}, questions[index], question);\n\t\t\t\n\t\t\tthis.$emit('input', {questions});\n\t\t},\n\t\tclearQuestion(question) {\n\t\t\tquestion = Object.assign({}, question);\n\t\t\tswitch (question.type) {\n\t\t\t\tcase 'text':\n\t\t\t\tcase 'number':\n\t\t\t\t\tdelete question.value;\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'checkbox':\n\t\t\t\tcase 'radio':\n\t\t\t\t\tquestion.options = question.options.map(option =>\n\t\t\t\t\t\tObject.assign({}, option, {checked: false})\n\t\t\t\t\t);\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'list':\n\t\t\t\t\tdelete question.items;\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\t\n\t\t\treturn question;\n\t\t}\n\t},\n\t\n\tcomponents: {\n\t\tQuestionnaireQuestion\n\t}\n};\n</script>\n\n<style scoped>\n\tlabel {\n\t\tdisplay: flex;\n\t\tfont-size: 1.75em;\n\t}\n\t\n\tinput[type=\"checkbox\"] {\n\t\twidth: 1em;\n\t\theight: 1em;\n\t\tpadding: 0.5em;\n\t\tmargin-right: 1em;\n\t}\n\t\n\t.item-questions {\n\t\tmargin-left: 3em;\n\t\tpadding: 1em;\n\t}\n\t\n\t@media (min-width: 768px) {\n\t\tinput[type=\"checkbox\"] {\n\t\t\tmargin-right: 1.5em;\n\t\t}\n\t\t\n\t\t.item-questions {\n\t\t\tmargin-left: 4em;\n\t\t}\n\t}\n\t\n\t@media (min-width: 768px) {\n\t\tinput[type=\"checkbox\"] {\n\t\t\tmargin-right: 2em;\n\t\t}\n\t\t\n\t\t.item-questions {\n\t\t\tmargin-left: 5em;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 474:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(473);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("0f65513b", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-024c0c7e&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Item.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-024c0c7e&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 475:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.checklist[data-v-08bc7d30] {\n\tfont-size: 1.25em;\n}\n@media (min-width: 768px) {\n.checklist[data-v-08bc7d30] {\n\t\tpadding: 0 1em;\n}\n}\n@media (min-width: 1200px) {\n.checklist[data-v-08bc7d30] {\n\t\tpadding: 0 2em;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Checklist.vue?093cf9cb"],"names":[],"mappings":";AA0DA;CACA,kBAAA;CACA;AAEA;AACA;EACA,eAAA;CACA;CACA;AAEA;AACA;EACA,eAAA;CACA;CACA","file":"Checklist.vue","sourcesContent":["<template>\n\t<div class=\"checklist\">\n\t\t<h1>{{ title }}</h1>\n\t\t<questionnaire-pager :pages=\"pages\" :readonly=\"readonly\"\n\t\t\t\t@submit=\"handleSubmit\">\n\t\t\t<template scope=\"pager\">\n\t\t\t\t<checklist-section v-bind=\"pager.page\" :page=\"true\"\n\t\t\t\t\t:readonly=\"readonly\"\n\t\t\t\t\t@input=\"handleInput(pager.pageNum, arguments[0])\" />\n\t\t\t</template>\n\t\t</questionnaire-pager>\n\t</div>\n</template>\n\n<script>\nimport ChecklistSection from './Section.vue';\nimport QuestionnairePager from 'vue-components/Questionnaire/Pager.vue';\n\nexport default {\n\tprops: {\n\t\ttitle: {\n\t\t\ttype: String,\n\t\t\trequired: true\n\t\t},\n\t\tversion: {\n\t\t\ttype: Number,\n\t\t\trequired: true\n\t\t},\n\t\tpages: {\n\t\t\ttype: Array,\n\t\t\trequired: true\n\t\t},\n\t\treadonly: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\t\n\tmethods: {\n\t\thandleInput(pageNum, page) {\n\t\t\tlet pages = this.pages.slice();\n\t\t\tpages[pageNum] = Object.assign({}, pages[pageNum], page);\n\t\t\t\n\t\t\tthis.$emit('input', {pages});\n\t\t},\n\t\thandleSubmit() {\n\t\t\tthis.$emit('submit');\n\t\t}\n\t},\n\t\n\tcomponents: {\n\t\tChecklistSection,\n\t\tQuestionnairePager\n\t}\n};\n</script>\n\n<style scoped>\n\t.checklist {\n\t\tfont-size: 1.25em;\n\t}\n\t\n\t@media (min-width: 768px) {\n\t\t.checklist {\n\t\t\tpadding: 0 1em;\n\t\t}\n\t}\n\t\n\t@media (min-width: 1200px) {\n\t\t.checklist {\n\t\t\tpadding: 0 2em;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 476:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(475);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5137d4df", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-08bc7d30&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checklist.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-08bc7d30&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checklist.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 477:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.instruction-block[data-v-16c471bd] {\n\tmargin: 1em;\n\tpadding: 1em;\n\tfont-size: 1.25em;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Instruction.vue?6cc16874"],"names":[],"mappings":";AAgCA;CACA,YAAA;CACA,aAAA;CACA,kBAAA;CACA","file":"Instruction.vue","sourcesContent":["<template>\n\t<div class=\"instruction-block\">\n\t\t{{ markedUpText }}\n\t</div>\n</template>\n\n<script>\nimport snarkdown from 'snarkdown';\n\nexport default {\n\tprops: {\n\t\ttype: {\n\t\t\ttype: String,\n\t\t\tvalidator(type) {\n\t\t\t\treturn type === 'instruction';\n\t\t\t}\n\t\t},\n\t\ttext: {\n\t\t\ttype: String,\n\t\t\trequired: true\n\t\t}\n\t},\n\t\n\tcomputed: {\n\t\tmarkedUpText() {\n\t\t\treturn snarkdown(this.text);\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.instruction-block {\n\t\tmargin: 1em;\n\t\tpadding: 1em;\n\t\tfont-size: 1.25em;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 478:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(477);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("95026a9e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-16c471bd&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Instruction.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-16c471bd&scoped=true!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Instruction.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 479:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.radio-question[data-v-3b7f8513] {\n\tfont-size: 1.25em;\n}\nlegend[data-v-3b7f8513] {\n\tmargin: 0;\n}\n.options[data-v-3b7f8513] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n.options label[data-v-3b7f8513] {\n\tpadding: 1em;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Radio.vue?6dd3bb5a"],"names":[],"mappings":";AAgGA;CACA,kBAAA;CACA;AAEA;CACA,UAAA;CACA;AAEA;CACA,cAAA;CACA,gBAAA;CACA;AAEA;CACA,aAAA;CACA","file":"Radio.vue","sourcesContent":["<template>\n\t<div class=\"radio-question form-group\">\n\t\t<fieldset :title=\"description\">\n\t\t\t<legend>\n\t\t\t\t{{ text }}\n\t\t\t</legend>\n\t\t\t<div class=\"options\">\n\t\t\t\t<label v-for=\"(option, index) of options\" :title=\"option.description\">\n\t\t\t\t\t{{ option.text }}\n\t\t\t\t\t<input type=\"radio\" :value=\"option.value\"\n\t\t\t\t\t\t:checked=\"option.checked\" :disabled=\"readonly\"\n\t\t\t\t\t\t@change=\"onCheck(index)\" />\n\t\t\t\t\t<div v-if=\"option.description\" class=\"question-description\">\n\t\t\t\t\t\t{{ snarkdown(option.description) }}\n\t\t\t\t\t</div>\n\t\t\t\t</label>\n\t\t\t</div>\n\t\t</fieldset>\n\t\t<show-hide-button v-if=\"description\" v-model=\"show.description\">\n\t\t\tdescription\n\t\t</show-hide-button>\n\t\t<div v-if=\"description\" v-show=\"show.description\">\n\t\t\t{{ markedUpDescription }}\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport ShowHideButton from 'vue-components/ShowHideButton.vue';\n\nimport snarkdown from 'snarkdown';\n\nexport default {\n\tmodel: {\n\t\tprop: 'options'\n\t},\n\tprops: {\n\t\ttype: {\n\t\t\ttype: String,\n\t\t\tvalidator(type) {\n\t\t\t\treturn type === 'radio';\n\t\t\t}\n\t\t},\n\t\ttext: {\n\t\t\ttype: String\n\t\t},\n\t\tdescription: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\toptions: {\n\t\t\ttype: Array,\n\t\t\trequired: true\n\t\t},\n\t\treadonly: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tshow: {\n\t\t\t\tdescription: false\n\t\t\t}\n\t\t};\n\t},\n\t\n\tcomputed: {\n\t\tmarkedUpDescription() {\n\t\t\tif (this.description)\n\t\t\t\treturn snarkdown(this.description);\n\t\t}\n\t},\n\t\n\tmethods: {\n\t\tonCheck(index) {\n\t\t\tlet options = this.options.map((option, i) => {\n\t\t\t\tlet newOption = Object.assign({}, option);\n\t\t\t\t\n\t\t\t\tnewOption.checked = (i === index);\n\t\t\t\t\n\t\t\t\treturn newOption;\n\t\t\t});\n\t\t\t\n\t\t\tthis.$emit('input', {options});\n\t\t},\n\t\tsnarkdown\n\t},\n\t\n\tcomponents: {\n\t\tShowHideButton\n\t}\n};\n</script>\n\n<style scoped>\n\t.radio-question {\n\t\tfont-size: 1.25em;\n\t}\n\t\n\tlegend {\n\t\tmargin: 0;\n\t}\n\t\n\t.options {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t}\n\t\n\t.options label {\n\t\tpadding: 1em;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 480:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(479);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("452fcf20", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3b7f8513&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Radio.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-3b7f8513&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Radio.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 481:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.checkbox-question[data-v-098680db] {\n\tfont-size: 1.25em;\n}\nlegend[data-v-098680db] {\n\tmargin: 0;\n}\n.options[data-v-098680db] {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n}\n.options label[data-v-098680db] {\n\tpadding: 1em;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Question/Checkbox.vue?712897fa"],"names":[],"mappings":";AA6FA;CACA,kBAAA;CACA;AAEA;CACA,UAAA;CACA;AAEA;CACA,cAAA;CACA,gBAAA;CACA;AAEA;CACA,aAAA;CACA","file":"Checkbox.vue","sourcesContent":["<template>\n\t<div class=\"checkbox-question form-group\">\n\t\t<fieldset :title=\"description\">\n\t\t\t<legend>\n\t\t\t\t{{ text }}\n\t\t\t</legend>\n\t\t\t<div class=\"options\">\n\t\t\t\t<label v-for=\"(option, index) of options\" :title=\"option.description\">\n\t\t\t\t\t{{ option.text }}\n\t\t\t\t\t<input type=\"checkbox\" :value=\"option.value\"\n\t\t\t\t\t\t:checked=\"option.checked\" :disabled=\"readonly\"\n\t\t\t\t\t\t@change=\"onCheck(index)\" />\n\t\t\t\t\t<div v-if=\"option.description\" class=\"question-description\">\n\t\t\t\t\t\t{{ snarkdown(option.description) }}\n\t\t\t\t\t</div>\n\t\t\t\t</label>\t\t\t\t\n\t\t\t</div>\n\t\t</fieldset>\n\t\t<show-hide-button v-if=\"description\" v-model=\"show.description\">\n\t\t\tdescription\n\t\t</show-hide-button>\n\t\t<div v-if=\"description\" v-show=\"show.description\">\n\t\t\t{{ markedUpDescription }}\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nimport ShowHideButton from 'vue-components/ShowHideButton.vue';\n\nimport snarkdown from 'snarkdown';\n\nexport default {\n\tmodel: {\n\t\tprop: 'options'\n\t},\n\tprops: {\n\t\ttype: {\n\t\t\ttype: String,\n\t\t\tvalidator(type) {\n\t\t\t\treturn type === 'checkbox';\n\t\t\t}\n\t\t},\n\t\ttext: {\n\t\t\ttype: String\n\t\t},\n\t\tdescription: {\n\t\t\ttype: String,\n\t\t\trequired: false\n\t\t},\n\t\toptions: {\n\t\t\ttype: Array,\n\t\t\trequired: true\n\t\t},\n\t\treadonly: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tshow: {\n\t\t\t\tdescription: false\n\t\t\t}\n\t\t};\n\t},\n\t\n\tcomputed: {\n\t\tmarkedUpDescription() {\n\t\t\tif (this.description)\n\t\t\t\treturn snarkdown(this.description);\n\t\t}\n\t},\n\t\n\tmethods: {\n\t\tonCheck(index) {\n\t\t\tlet options = Array.slice(this.options);\n\t\t\toptions[index] = Object.assign({}, options[index], {\n\t\t\t\tchecked: !options[index].checked\n\t\t\t});\n\t\t\t\n\t\t\tthis.$emit('input', {options});\n\t\t},\n\t\tsnarkdown\n\t},\n\t\n\tcomponents: {\n\t\tShowHideButton\n\t}\n};\n</script>\n\n<style scoped>\n\t.checkbox-question {\n\t\tfont-size: 1.25em;\n\t}\n\t\n\tlegend {\n\t\tmargin: 0;\n\t}\n\n\t.options {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t}\n\t\n\t.options label {\n\t\tpadding: 1em;\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(481);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7931c154", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-098680db&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checkbox.vue", function() {
     var newContent = require("!!../../../../../../node_modules/css-loader/index.js?sourceMap!../../../../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-098680db&scoped=true!../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Checkbox.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(39)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(34),
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

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(478)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(141),
  /* template */
  __webpack_require__(390),
  /* scopeId */
  "data-v-16c471bd",
  /* cssModules */
  null
)
Component.options.__file = "/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Instruction.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Instruction.vue: functional components are not supported with templates, they should use render functions.")}

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
  }
})()}

module.exports = Component.exports


/***/ })

},[456]);
});
//# sourceMappingURL=vue-merit-reports.js.map