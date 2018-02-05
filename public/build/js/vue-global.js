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
return webpackJsonp([15],{

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_errors_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_js__ = __webpack_require__(555);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createNews", function() { return __WEBPACK_IMPORTED_MODULE_2__news_js__["a"]; });






__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err, vm, info) {
	__WEBPACK_IMPORTED_MODULE_1__modules_errors_js__["d" /* rollbar */].error('Error from Vue: ' + err + ', info: ' + info + ', vm: ' + JSON.stringify(vm));
};

__WEBPACK_IMPORTED_MODULE_0_vue___default.a.directive('visible', function (el, _ref) {
	var value = _ref.value,
	    oldValue = _ref.oldValue,
	    modifiers = _ref.modifiers;

	if (modifiers.once && el.style.visibility === 'visible') return;

	if (value !== oldValue) {
		el.style.transition = oldValue ? 'opacity 0.1s ease-out, visibility 0s 0.1s' : 'opacity 0.1s ease-out';

		el.style.visibility = value ? 'visible' : 'hidden';
		el.style.opacity = value ? 1 : 0;
	}
});

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createNews;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_BootstrapAlert_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_errors_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_niceties_js__ = __webpack_require__(904);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(1);








function createNews(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,
		data: function data() {
			return {
				alertItems: []
			};
		},

		template: '\n\t\t\t<div v-if="alertItems && alertItems.length > 0"\n\t\t\t\t\tclass="news-list container">\n\t\t\t\t<div class="panel-body">\n\t\t\t\t\t<bootstrap-alert v-for="alert of alertItems"\n\t\t\t\t\t\t\t:key="alert.id"\n\t\t\t\t\t\t\tv-bind="alert"\n\t\t\t\t\t\t\tdismissable\n\t\t\t\t\t\t\t@close="handleDismiss(alert.id)">\n\t\t\t\t\t\t<div class="text-right">\n\t\t\t\t\t\t\t<button type="button" class="btn btn-default">\n\t\t\t\t\t\t\t\t{{ getAcknowledgeText() }}\n\t\t\t\t\t\t\t</button>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</bootstrap-alert>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t',
		mounted: function mounted() {
			this.fetchUnseenNewsItems();
		},

		methods: {
			getAcknowledgeText: __WEBPACK_IMPORTED_MODULE_3__modules_niceties_js__["a" /* getAcknowledgeText */],
			fetchUnseenNewsItems: function fetchUnseenNewsItems() {
				var _this = this;

				fetch('/news-items/unseen', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["g" /* fetchConfig */])())).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["w" /* jsonOrThrow */]).then(function (newsItems) {
					_this.alertItems = newsItems;
				}).catch(function (err) {
					// FIXME: Show this somewhere
					Object(__WEBPACK_IMPORTED_MODULE_2__modules_errors_js__["c" /* logError */])(err);
				});
			},
			handleDismiss: function handleDismiss(alertId) {
				var _this2 = this;

				fetch('/news-items/' + alertId + '/dismiss', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["g" /* fetchConfig */])(), {
					method: 'POST', // PATCH
					body: JSON.stringify({
						_method: 'PATCH'
					})
				})).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["z" /* okOrThrow */]).then(function () {
					_this2.alertItems = _this2.alertItems.filter(function (item) {
						return item.id !== alertId;
					});
				}).catch(function (err) {
					// TODO: Display this somewhere
					// handleError(err, this, )
					Object(__WEBPACK_IMPORTED_MODULE_2__modules_errors_js__["c" /* logError */])(err);
				});
			},
			handleRemindLater: function handleRemindLater(alertId) {
				// TODO
				// fetch(`/news-items/${alertId}/temporarily-dismiss`, {
				// 	...fetchConfig(),
				// 	method: 'POST', // PATCH
				// 	body: JSON.stringify({
				// 		_method: 'PATCH'
				// 	})
				// })
			}
		},
		components: {
			BootstrapAlert: __WEBPACK_IMPORTED_MODULE_1__vue_components_BootstrapAlert_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ACKNOWLEDGE_TEXT_OPTIONS */
/* harmony export (immutable) */ __webpack_exports__["a"] = getAcknowledgeText;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_js__ = __webpack_require__(1);


var ACKNOWLEDGE_TEXT_OPTIONS = ['OK', 'Cool', 'Nice', 'Good to know', 'Thanks', 'Neat'];

function getAcknowledgeText() {
	var exclaim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

	var phrase = Object(__WEBPACK_IMPORTED_MODULE_0__utils_js__["q" /* getRandom */])(ACKNOWLEDGE_TEXT_OPTIONS);

	if (exclaim) phrase += '!';

	return phrase;
}

/***/ })

},[552]);
});
//# sourceMappingURL=vue-global.js.map