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
							text: 'INSTRUCTION BLOCK TEXT'
						}, {
							type: 'item',
							text: 'Item 1',
							questions: [{
								type: 'text',
								text: 'Text question',
								value: ''
							}]
						}, {
							type: 'section',
							title: 'Section 1',
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
		}
	},

	methods: {
		handleInput: function handleInput(pageNum, page) {
			var pages = this.pages.slice();
			pages[pageNum] = Object.assign({}, pages[pageNum], page);

			this.$emit('input', { pages: pages });
		},
		handleSubmit: function handleSubmit() {
			// TODO
			console.log('SUBMIT!');
			console.log(JSON.stringify({
				title: this.title,
				version: this.version,
				pages: this.pages
			}, null, 4));
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
				props: Object.assign({}, item),
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

		return h('section', items);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
			if (this.canAdvancePage) {
				if (this.currentPage < this.pages.length - 1) this.currentPage++;else this.$emit('submit');
			}
		}
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
				props: Object.assign({}, item),
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
		}
	},

	render: function render(h) {
		var _this = this;

		var type = void 0;
		if (this.question.type === 'textarea') type = 'text';else type = this.question.type;

		var questionComponent = type + '-question';

		return h(questionComponent, {
			props: Object.assign({}, this.question),
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
		}
	},

	render: function render(h) {
		var _this = this;

		var items = this.items.map(function (item, index) {
			var componentName = 'question-' + item.type;

			return h(componentName, {
				props: Object.assign({}, item),
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

		return h('section', items);
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
exports.push([module.i, "\n.page-controls[data-v-a814e09c] {\n\tdisplay: flex;\n\tflex-direction: row;\n\tflex-wrap: wrap;\n\tjustify-content: space-between;\n}\n@media (min-width: 768px) {\n.page-controls progress[data-v-a814e09c] {\n\t\torder: 1;\n\t\twidth: 100%;\n\t\tflex-shrink: 0;\n\t\tflex-grow: 1;\n}\n.page-controls button[data-v-a814e09c] {\n\t\torder: 2;\n}\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/Questionnaire/Pager.vue?2eeab962"],"names":[],"mappings":";AAkFA;CACA,cAAA;CACA,oBAAA;CACA,gBAAA;CACA,+BAAA;CACA;AAEA;AACA;EACA,SAAA;EACA,YAAA;EACA,eAAA;EACA,aAAA;CACA;AAEA;EACA,SAAA;CACA;CACA","file":"Pager.vue","sourcesContent":["<template>\n\t<div class=\"pager\">\n\t\t<div class=\"pager-content\">\n\t\t\t<slot :page=\"page\" :page-num=\"currentPage\"></slot>\n\t\t</div>\n\t\t<div class=\"pager-controls\">\n\t\t\t<button type=\"button\" class=\"btn btn-default\"\n\t\t\t\t\t:disabled=\"currentPage === 0\"\n\t\t\t\t\t@click=\"goBack\">\n\t\t\t\t{{ backText }}\n\t\t\t</button>\n\t\t\t<progress :value=\"currentPage\" :max=\"pages.length\">\n\t\t\t\t{{ `${currentPage} / ${pages.length}` }}\n\t\t\t</progress>\n\t\t\t<button type=\"button\" class=\"btn btn-default\"\n\t\t\t\t\t:disabled=\"!canAdvancePage\"\n\t\t\t\t\t@click=\"advance\">\n\t\t\t\t{{ currentPage === pages.length - 1 ? submitText : nextText }}\n\t\t\t</button>\n\t\t</div>\n\t</div>\n</template>\n\n<script>\nexport default {\n\tprops: {\n\t\tpages: {\n\t\t\ttype: Array,\n\t\t\trequired: true\n\t\t},\n\t\tpageValidator: {\n\t\t\ttype: Function,\n\t\t\tdefault() {\n\t\t\t\treturn true;\n\t\t\t}\n\t\t},\n\t\tsubmitText: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Submit'\n\t\t},\n\t\tnextText: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Next page'\n\t\t},\n\t\tbackText: {\n\t\t\ttype: String,\n\t\t\tdefault: 'Back'\n\t\t}\n\t},\n\tdata() {\n\t\treturn {\n\t\t\tcurrentPage: 0\n\t\t};\n\t},\n\t\n\tcomputed: {\n\t\tpage() {\n\t\t\treturn this.pages[this.currentPage];\n\t\t},\n\t\tcanAdvancePage() {\n\t\t\treturn this.pageValidator(this.currentPage);\n\t\t}\n\t},\n\t\n\tmethods: {\n\t\tgoBack() {\n\t\t\tif (this.currentPage > 0)\n\t\t\t\tthis.currentPage--;\n\t\t},\n\t\tadvance() {\n\t\t\tif (this.canAdvancePage) {\n\t\t\t\tif (this.currentPage < this.pages.length - 1)\n\t\t\t\t\tthis.currentPage++;\n\t\t\t\telse\n\t\t\t\t\tthis.$emit('submit');\n\t\t\t}\n\t\t}\n\t}\n};\n</script>\n\n<style scoped>\n\t.page-controls {\n\t\tdisplay: flex;\n\t\tflex-direction: row;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: space-between;\n\t}\n\t\n\t@media (min-width: 768px) {\n\t\t.page-controls progress {\n\t\t\torder: 1;\n\t\t\twidth: 100%;\n\t\t\tflex-shrink: 0;\n\t\t\tflex-grow: 1;\n\t\t}\n\t\t\n\t\t.page-controls button {\n\t\t\torder: 2;\n\t\t}\n\t}\n</style>\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\nsection h1[data-v-a8188cb2] {\n\tfont-size: 1.5em;\n}\n", "", {"version":3,"sources":["/home/mischka/projects/residentprogram/resources/assets/js/vue-components/MeritCompensation/Checklist/Section.vue?414c626e"],"names":[],"mappings":";AAqDA;CACA,iBAAA;CACA","file":"Section.vue","sourcesContent":["<script>\nimport ChecklistItem from './Item.vue';\nimport QuestionnaireInstruction from 'vue-components/Questionnaire/Instruction.vue';\nimport QuestionnaireSection from 'vue-components/Questionnaire/Section.vue';\n\nexport default {\n\textends: QuestionnaireSection,\n\tname: 'checklist-section',\n\t\n\trender(h) {\n\t\tlet items = this.items.map((item, index) => {\n\t\t\tlet componentName;\n\t\t\tswitch (item.type) {\n\t\t\t\tcase 'section':\n\t\t\t\t\tcomponentName = 'checklist-section';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'instruction':\n\t\t\t\t\tcomponentName = 'questionnaire-instruction';\n\t\t\t\t\tbreak;\n\t\t\t\tcase 'item':\n\t\t\t\t\tcomponentName = 'checklist-item';\n\t\t\t\t\tbreak;\n\t\t\t}\n\t\t\t\n\t\t\treturn h(componentName, {\n\t\t\t\tprops: {\n\t\t\t\t\t...item\n\t\t\t\t},\n\t\t\t\ton: {\n\t\t\t\t\tinput: item => {\n\t\t\t\t\t\tlet items = this.items.slice();\n\t\t\t\t\t\titems[index] = Object.assign({}, items[index], item);\n\t\t\t\t\t\t\n\t\t\t\t\t\tthis.$emit('input', {items});\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t});\n\t\t\n\t\tif (this.title)\n\t\t\titems.unshift(h('h1', this.title));\n\t\t\n\t\treturn h('section', items);\n\t},\n\t\n\tcomponents: {\n\t\tChecklistItem,\n\t\tQuestionnaireInstruction\n\t}\n};\n</script>\n\n<style scoped>\n\tsection h1 {\n\t\tfont-size: 1.5em;\n\t}\n</style>\n"],"sourceRoot":""}]);

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

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(135),
  /* template */
  __webpack_require__(387),
  /* scopeId */
  null,
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

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(136),
  /* template */
  __webpack_require__(383),
  /* scopeId */
  null,
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

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(143),
  /* template */
  __webpack_require__(388),
  /* scopeId */
  null,
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

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(148),
  /* template */
  __webpack_require__(402),
  /* scopeId */
  null,
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
  }, [_c('div', {
    staticClass: "checkbox"
  }, [_c('input', {
    attrs: {
      "type": "checkbox"
    },
    domProps: {
      "checked": _vm.checked
    },
    on: {
      "change": _vm.handleCheck
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "item-text"
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), (_vm.checked) ? _c('div', {
    staticClass: "item-questions"
  }, _vm._l((_vm.questions), function(question, index) {
    return _c('questionnaire-question', {
      attrs: {
        "question": question
      },
      on: {
        "input": function($event) {
          _vm.handleQuestionInput(index, arguments[0])
        }
      }
    })
  })) : _vm._e()])])
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
      "pages": _vm.pages
    },
    on: {
      "submit": _vm.handleSubmit
    },
    scopedSlots: _vm._u([
      ["default", function(pager) {
        return [_c('checklist-section', _vm._b({
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
    staticClass: "form-group"
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [_c('legend', [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), _vm._l((_vm.options), function(option, index) {
    return _c('label', {
      attrs: {
        "title": option.description
      }
    }, [_vm._v("\n\t\t\t" + _vm._s(option.text) + "\n\t\t\t"), _c('input', {
      attrs: {
        "type": "checkbox"
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
    }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.snarkdown(option.description)) + "\n\t\t\t")]) : _vm._e()])
  })], 2), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
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
    staticClass: "form-control",
    attrs: {
      "type": "number",
      "min": _vm.min,
      "max": _vm.max
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
    staticClass: "form-control",
    domProps: {
      "value": _vm.value
    },
    on: {
      "input": _vm.onInput
    }
  }) : _c('input', {
    staticClass: "form-control",
    attrs: {
      "type": "text"
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
    staticClass: "form-group"
  }, [_c('fieldset', {
    attrs: {
      "title": _vm.description
    }
  }, [_c('legend', [_vm._v("\n\t\t\t" + _vm._s(_vm.text) + "\n\t\t")]), _vm._v(" "), _vm._l((_vm.options), function(option, index) {
    return _c('label', {
      attrs: {
        "title": option.description
      }
    }, [_vm._v("\n\t\t\t" + _vm._s(option.text) + "\n\t\t\t"), _c('input', {
      attrs: {
        "type": "radio"
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
    }, [_vm._v("\n\t\t\t\t" + _vm._s(_vm.snarkdown(option.description)) + "\n\t\t\t")]) : _vm._e()])
  })], 2), _vm._v(" "), (_vm.description) ? _c('show-hide-button', {
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
    staticClass: "pager"
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
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.backText) + "\n\t\t")]), _vm._v(" "), _c('progress', {
    attrs: {
      "value": _vm.currentPage,
      "max": _vm.pages.length
    }
  }, [_vm._v("\n\t\t\t" + _vm._s((_vm.currentPage + " / " + (_vm.pages.length))) + "\n\t\t")]), _vm._v(" "), _c('button', {
    staticClass: "btn btn-default",
    attrs: {
      "type": "button",
      "disabled": !_vm.canAdvancePage
    },
    on: {
      "click": _vm.advance
    }
  }, [_vm._v("\n\t\t\t" + _vm._s(_vm.currentPage === _vm.pages.length - 1 ? _vm.submitText : _vm.nextText) + "\n\t\t")])])])
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

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(141),
  /* template */
  __webpack_require__(390),
  /* scopeId */
  null,
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