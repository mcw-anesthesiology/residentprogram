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
return webpackJsonp([13],{

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return USER_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SETTINGS_HELP; });
/* harmony export (immutable) */ __webpack_exports__["c"] = getUserSetting;


var USER_SETTINGS = {
	defaultEvaluationRange: ['currentQuarter', 'currentSemester', 'currentYear', 'allTime']
};

var SETTINGS_HELP = {
	defaultEvaluationRange: 'Warning: selecting "All time" by default may result in longer loading times'
};

function getUserSetting(user, settingName) {
	if (user && user.user_settings) {
		var setting = user.user_settings.find(function (s) {
			return s.name === settingName;
		});
		if (setting) return setting.value;
	}
}

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_AlertList_vue__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c0296f4c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AlertList_vue__ = __webpack_require__(44);
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
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_c0296f4c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_AlertList_vue__["a" /* default */],
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
    hotAPI.createRecord("data-v-c0296f4c", Component.options)
  } else {
    hotAPI.reload("data-v-c0296f4c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(23);
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

/***/ 44:
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
    require("vue-hot-reload-api")      .rerender("data-v-c0296f4c", esExports)
  }
}

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vue_components_AlertList_vue__ = __webpack_require__(19);


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

/***/ 899:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createUserSettingsPage"] = createUserSettingsPage;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_errors_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_user_utils_js__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__ = __webpack_require__(1);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();








function createUserSettingsPage(el, propsData) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		mixins: [__WEBPACK_IMPORTED_MODULE_1__vue_mixins_HasAlerts_js__["a" /* default */]],
		el: el,
		props: {
			user: {
				type: Object,
				required: true
			}
		},
		propsData: propsData,
		data: function data() {
			var data = Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["n" /* filterKeys */])(this.user, ['user_settings', 'notifications', 'reminder_frequency']);

			data.remind_only_if_pending = this.user.remind_only_if_pending === 'yes';

			return data;
		},

		computed: {
			USER_SETTINGS: function USER_SETTINGS() {
				return __WEBPACK_IMPORTED_MODULE_3__modules_user_utils_js__["b" /* USER_SETTINGS */];
			},
			SETTINGS_HELP: function SETTINGS_HELP() {
				return __WEBPACK_IMPORTED_MODULE_3__modules_user_utils_js__["a" /* SETTINGS_HELP */];
			}
		},
		methods: {
			handleNotificationsUpdate: function handleNotificationsUpdate(event) {
				var _this = this;

				event.preventDefault();

				fetch('/user/notifications', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["g" /* fetchConfig */])(), {
					method: 'POST', // PATCH
					body: JSON.stringify({
						_method: 'PATCH',
						notifications: this.notifications
					})
				})).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["z" /* okOrThrow */]).then(function () {
					_this.alerts.push({
						type: 'success',
						text: 'Notification preferences saved successfully!'
					});
				}).catch(function (err) {
					Object(__WEBPACK_IMPORTED_MODULE_2__modules_errors_js__["b" /* handleError */])(err, _this, 'There was a problem saving your notification preferences');
				});
			},
			handleRemindersUpdate: function handleRemindersUpdate(event) {
				var _this2 = this;

				event.preventDefault();

				fetch('/user/reminders', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["g" /* fetchConfig */])(), {
					method: 'POST', // PATCH
					body: JSON.stringify({
						_method: 'PATCH',
						reminder_frequency: this.reminder_frequency,
						remind_only_if_pending: this.remind_only_if_pending ? 'yes' : 'no'
					})
				})).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["z" /* okOrThrow */]).then(function () {
					_this2.alerts.push({
						type: 'success',
						text: 'Reminder preferences saved successfully!'
					});
				}).catch(function (err) {
					Object(__WEBPACK_IMPORTED_MODULE_2__modules_errors_js__["b" /* handleError */])(err, _this2, 'There was a problem saving your notification preferences');
				});
			},
			getUserSetting: function getUserSetting(setting) {
				return Object(__WEBPACK_IMPORTED_MODULE_3__modules_user_utils_js__["c" /* getUserSetting */])(this, setting);
			},

			displaySetting: __WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["c" /* camelCaseToWords */],
			handleSettingsSubmit: function handleSettingsSubmit(event) {
				var _this3 = this;

				event.preventDefault();

				var data = new FormData(event.target);

				fetch('/users/settings', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["g" /* fetchConfig */])({ contentType: null }), {
					method: 'POST',
					body: data
				})).then(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["w" /* jsonOrThrow */]).then(function (saved) {
					var entries = Array.from(Object.entries(saved));
					var successful = entries.filter(function (_ref) {
						var _ref2 = _slicedToArray(_ref, 2),
						    _ = _ref2[0],
						    s = _ref2[1];

						return s;
					}).map(function (_ref3) {
						var _ref4 = _slicedToArray(_ref3, 2),
						    name = _ref4[0],
						    _ = _ref4[1];

						return name;
					});
					var unsuccessful = entries.filter(function (_ref5) {
						var _ref6 = _slicedToArray(_ref5, 2),
						    _ = _ref6[0],
						    s = _ref6[1];

						return !s;
					}).map(function (_ref7) {
						var _ref8 = _slicedToArray(_ref7, 2),
						    name = _ref8[0],
						    _ = _ref8[1];

						return name;
					});

					if (successful.length > 0) {
						var s = successful.length;
						_this3.alerts.push({
							type: 'success',
							text: s + ' ' + Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["A" /* pluralize */])('setting', s) + ' saved successfully'
						});

						var user_settings = _this3.user_settings;

						var _loop = function _loop(name) {
							var setting = {
								name: name,
								value: data.get(name)
							};
							var i = user_settings.findIndex(function (s) {
								return s.name === name;
							});
							if (i === -1) {
								user_settings.push(setting);
							} else {
								user_settings.splice(i, 1, setting);
							}
						};

						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = successful[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var name = _step.value;

								_loop(name);
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

						_this3.user_settings = user_settings;
					}

					if (unsuccessful.length > 0) {
						var u = unsuccessful.length;
						_this3.alerts.push({
							type: 'error',
							html: '\n\t\t\t\t\t\t\t\t<p>' + u + ' ' + Object(__WEBPACK_IMPORTED_MODULE_4__modules_utils_js__["A" /* pluralize */])('setting', u) + ' not saved</p>\n\t\t\t\t\t\t\t\t<ul>\n\t\t\t\t\t\t\t\t\t' + unsuccessful.map(function (name) {
								return '<li>' + _this3.displaySetting(name) + '</li>';
							}) + '\n\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t'
						});
					}
				}).catch(function (err) {
					Object(__WEBPACK_IMPORTED_MODULE_2__modules_errors_js__["b" /* handleError */])(err, _this3, 'There was a problem saving your settings');
				});
			}
		}
	});
}

/***/ })

},[899]);
});
//# sourceMappingURL=vue-user.js.map