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

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_errors_js__ = __webpack_require__(889);




__WEBPACK_IMPORTED_MODULE_0_vue___default.a.config.errorHandler = function (err, vm, info) {
	__WEBPACK_IMPORTED_MODULE_1__modules_errors_js__["b" /* rollbar */].error('Error from Vue: ' + err + ', info: ' + info + ', vm: ' + JSON.stringify(vm));
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

/***/ })

},[551]);
});
//# sourceMappingURL=vue-deps.js.map