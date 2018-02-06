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

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_errors_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__news_js__ = __webpack_require__(557);
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

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createNews;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__vue_components_News_List_vue__ = __webpack_require__(913);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_errors_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_utils_js__ = __webpack_require__(1);







function createNews(el) {
	return new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
		el: el,
		data: function data() {
			return {
				open: false,
				left: false,
				newsItems: null
			};
		},
		mounted: function mounted() {
			this.fetchUnseenNewsItems();
		},
		updated: function updated() {},
		beforeDestroy: function beforeDestroy() {
			this.open = false;
		},

		watch: {
			open: function open(_open, oldOpen) {
				var _this = this;

				if (_open && !oldOpen) {
					window.addEventListener('click', this.toggleDropdown);
				} else if (!_open && oldOpen) {
					window.removeEventListener('click', this.toggleDropdown);
				}

				if (_open) {
					this.$nextTick(function () {
						var rect = _this.$refs.menu.getBoundingClientRect();
						if (rect && rect.x < 0) _this.left = true;
					});
				}
			}
		},
		methods: {
			fetchUnseenNewsItems: function fetchUnseenNewsItems() {
				var _this2 = this;

				fetch('/news-items/unseen', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["g" /* fetchConfig */])())).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["w" /* jsonOrThrow */]).then(function (newsItems) {
					_this2.newsItems = newsItems;
				}).catch(function (err) {
					// FIXME: Show this somewhere
					Object(__WEBPACK_IMPORTED_MODULE_2__modules_errors_js__["c" /* logError */])(err);
				});
			},
			ignoreDropdownClick: function ignoreDropdownClick(event) {
				event.preventDefault();
			},
			toggleDropdown: function toggleDropdown(event) {
				if (event.defaultPrevented) return;

				this.open = !this.open;
				this.left = false;
			},
			handleRemove: function handleRemove(itemId) {
				this.newsItems = this.newsItems.filter(function (item) {
					return item.id !== itemId;
				});
			}
		},
		components: {
			NewsList: __WEBPACK_IMPORTED_MODULE_1__vue_components_News_List_vue__["a" /* default */]
		}
	});
}

/***/ }),

/***/ 561:
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

/***/ }),

/***/ 913:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__ = __webpack_require__(915);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06b9a28c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_List_vue__ = __webpack_require__(916);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(914)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_06b9a28c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_List_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/vue-components/News/List.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-06b9a28c", Component.options)
  } else {
    hotAPI.reload("data-v-06b9a28c", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 914:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 915:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_errors_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_niceties_js__ = __webpack_require__(561);
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
		items: {
			type: Array,
			default: function _default() {
				return [];
			}
		}
	},

	methods: {
		getAcknowledgeText: __WEBPACK_IMPORTED_MODULE_2__modules_niceties_js__["a" /* getAcknowledgeText */],

		handleDismiss: function handleDismiss(id) {
			var _this = this;

			fetch('/news-items/' + id + '/dismiss', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["g" /* fetchConfig */])(), {
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH'
				})
			})).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["z" /* okOrThrow */]).then(function () {
				_this.$emit('remove', id);
			}).catch(function (err) {
				// TODO: Display this somewhere
				// handleError(err, this, )
				Object(__WEBPACK_IMPORTED_MODULE_1__modules_errors_js__["c" /* logError */])(err);
			});
		},
		handleRemindLater: function handleRemindLater(id) {
			var _this2 = this;

			fetch('/news-items/' + id + '/temporarily-dismiss', Object.assign({}, Object(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["g" /* fetchConfig */])(), {
				method: 'POST', // PATCH
				body: JSON.stringify({
					_method: 'PATCH'
				})
			})).then(__WEBPACK_IMPORTED_MODULE_3__modules_utils_js__["z" /* okOrThrow */]).then(function () {
				_this2.$emit('remove', id);
			}).catch(function (err) {
				// TODO: Display this somewhere
				// handleError(err, this, )
				Object(__WEBPACK_IMPORTED_MODULE_1__modules_errors_js__["c" /* logError */])(err);
			});
		}
	},
	components: {
		BootstrapAlert: __WEBPACK_IMPORTED_MODULE_0__BootstrapAlert_vue__["a" /* default */]
	}
});

/***/ }),

/***/ 916:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "news-list panel-body" }, [
    _vm.items && _vm.items.length > 0
      ? _c(
          "div",
          _vm._l(_vm.items, function(item) {
            return _c(
              "bootstrap-alert",
              {
                key: item.id,
                attrs: { type: "info", html: item.body, dismissable: "" },
                on: {
                  close: function($event) {
                    _vm.handleDismiss(item.id)
                  }
                }
              },
              [
                _c("template", { slot: "header" }, [
                  _c("span", { staticClass: "alert-heading h3" }, [
                    _vm._v(
                      "\n\t\t\t\t\t" +
                        _vm._s(item.heading || "New!") +
                        "\n\t\t\t\t"
                    )
                  ])
                ]),
                _vm._v(" "),
                _c("template", { slot: "footer" }, [
                  _c("div", { staticClass: "alert-buttons" }, [
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-info",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.handleRemindLater(item.id)
                          }
                        }
                      },
                      [_vm._v("\n\t\t\t\t\t\tRemind me later\n\t\t\t\t\t")]
                    ),
                    _vm._v(" "),
                    _c(
                      "button",
                      {
                        staticClass: "btn btn-primary",
                        attrs: { type: "button" },
                        on: {
                          click: function($event) {
                            _vm.handleDismiss(item.id)
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n\t\t\t\t\t\t" +
                            _vm._s(_vm.getAcknowledgeText()) +
                            "\n\t\t\t\t\t"
                        )
                      ]
                    )
                  ])
                ])
              ],
              2
            )
          })
        )
      : _c("div", { staticClass: "no-news-container text-center" }, [
          _c("p", [_vm._v("\n\t\t\tNothing here!\n\t\t")]),
          _vm._v(" "),
          _vm._m(0)
        ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("p", { staticClass: "no-news-glyph-container" }, [
      _c("span", { staticClass: "glyphicon glyphicon-thumbs-up" })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-06b9a28c", esExports)
  }
}

/***/ })

},[554]);
});
//# sourceMappingURL=vue-global.js.map