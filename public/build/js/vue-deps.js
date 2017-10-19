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

/***/ 0:
/***/ (function(module, exports) {

throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/vue-loader/lib/component-normalizer.js'");

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

"use strict";
throw new Error("Module build failed: Error: ENOENT: no such file or directory, open '/home/mischka/projects/residentprogram/node_modules/vue/dist/vue.common.js'");

/***/ }),

/***/ 517:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);


__WEBPACK_IMPORTED_MODULE_0_vue__["default"].directive('visible', function (el, _ref) {
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

/***/ })

},[517]);
});
//# sourceMappingURL=vue-deps.js.map