/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/sw-custom.js":
/*!*****************************!*\
  !*** ./public/sw-custom.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval(__webpack_require__.ts("// import { precacheAndRoute } from \"workbox-precaching\";\n// Necesario para que next-pwa inyecte los assets\n// precacheAndRoute([] || []);\n// self.addEventListener(\"push\", (event) => {\n//     const data = event.data?.json() || {};\n//     const options = {\n//         body: data.body || \"Sin cuerpo\",\n//         icon: data.icon || \"/icons/icon-192x192.png\",\n//     };\n//     event.waitUntil(self.registration.showNotification(data.title || \"Notificación\", options));\n// });\nself.addEventListener(\"push\", (event)=>{\n    var _event_data;\n    const data = ((_event_data = event.data) === null || _event_data === void 0 ? void 0 : _event_data.json()) || {};\n    const title = data.title || \"Nueva notificación\";\n    const options = {\n        body: data.body,\n        icon: \"/icons/icon-192x192.png\",\n        badge: \"/icons/icon-192x192.png\",\n        data: {\n            url: data.url || \"/\"\n        }\n    };\n    event.waitUntil(self.registration.showNotification(title, options));\n});\nself.addEventListener(\"notificationclick\", (event)=>{\n    event.notification.close();\n    event.waitUntil(clients.openWindow(event.notification.data.url));\n});\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                /* unsupported import.meta.webpackHot */ undefined.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wdWJsaWMvc3ctY3VzdG9tLmpzIiwibWFwcGluZ3MiOiJBQUFBLHlEQUF5RDtBQUV6RCxpREFBaUQ7QUFDakQsOENBQThDO0FBRTlDLDZDQUE2QztBQUM3Qyw2Q0FBNkM7QUFFN0Msd0JBQXdCO0FBQ3hCLDJDQUEyQztBQUMzQyx3REFBd0Q7QUFDeEQsU0FBUztBQUVULGtHQUFrRztBQUNsRyxNQUFNO0FBRU5BLEtBQUtDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQ0M7UUFDZEE7SUFBYixNQUFNQyxPQUFPRCxFQUFBQSxjQUFBQSxNQUFNQyxJQUFJLGNBQVZELGtDQUFBQSxZQUFZRSxJQUFJLE9BQU0sQ0FBQztJQUNwQyxNQUFNQyxRQUFRRixLQUFLRSxLQUFLLElBQUk7SUFDNUIsTUFBTUMsVUFBVTtRQUNaQyxNQUFNSixLQUFLSSxJQUFJO1FBQ2ZDLE1BQU07UUFDTkMsT0FBTztRQUNQTixNQUFNO1lBQUVPLEtBQUtQLEtBQUtPLEdBQUcsSUFBSTtRQUFJO0lBQ2pDO0lBRUFSLE1BQU1TLFNBQVMsQ0FBQ1gsS0FBS1ksWUFBWSxDQUFDQyxnQkFBZ0IsQ0FBQ1IsT0FBT0M7QUFDOUQ7QUFFQU4sS0FBS0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUNDO0lBQ3hDQSxNQUFNWSxZQUFZLENBQUNDLEtBQUs7SUFDeEJiLE1BQU1TLFNBQVMsQ0FBQ0ssUUFBUUMsVUFBVSxDQUFDZixNQUFNWSxZQUFZLENBQUNYLElBQUksQ0FBQ08sR0FBRztBQUNsRSIsInNvdXJjZXMiOlsiL2hvbWUvYWxhbXJvZHJvZHJpZ3Vlei93b3Jrc3BhY2UvcHJveWVjdG9zL2J5c2hvcC9ieS1zaG9wLWZyb250ZW5kL3B1YmxpYy9zdy1jdXN0b20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gaW1wb3J0IHsgcHJlY2FjaGVBbmRSb3V0ZSB9IGZyb20gXCJ3b3JrYm94LXByZWNhY2hpbmdcIjtcblxuLy8gTmVjZXNhcmlvIHBhcmEgcXVlIG5leHQtcHdhIGlueWVjdGUgbG9zIGFzc2V0c1xuLy8gcHJlY2FjaGVBbmRSb3V0ZShzZWxmLl9fV0JfTUFOSUZFU1QgfHwgW10pO1xuXG4vLyBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJwdXNoXCIsIChldmVudCkgPT4ge1xuLy8gICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhPy5qc29uKCkgfHwge307XG5cbi8vICAgICBjb25zdCBvcHRpb25zID0ge1xuLy8gICAgICAgICBib2R5OiBkYXRhLmJvZHkgfHwgXCJTaW4gY3VlcnBvXCIsXG4vLyAgICAgICAgIGljb246IGRhdGEuaWNvbiB8fCBcIi9pY29ucy9pY29uLTE5MngxOTIucG5nXCIsXG4vLyAgICAgfTtcblxuLy8gICAgIGV2ZW50LndhaXRVbnRpbChzZWxmLnJlZ2lzdHJhdGlvbi5zaG93Tm90aWZpY2F0aW9uKGRhdGEudGl0bGUgfHwgXCJOb3RpZmljYWNpw7NuXCIsIG9wdGlvbnMpKTtcbi8vIH0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJwdXNoXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhPy5qc29uKCkgfHwge307XG4gICAgY29uc3QgdGl0bGUgPSBkYXRhLnRpdGxlIHx8IFwiTnVldmEgbm90aWZpY2FjacOzblwiO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgIGJvZHk6IGRhdGEuYm9keSxcbiAgICAgICAgaWNvbjogXCIvaWNvbnMvaWNvbi0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICBiYWRnZTogXCIvaWNvbnMvaWNvbi0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICBkYXRhOiB7IHVybDogZGF0YS51cmwgfHwgXCIvXCIgfSxcbiAgICB9O1xuXG4gICAgZXZlbnQud2FpdFVudGlsKHNlbGYucmVnaXN0cmF0aW9uLnNob3dOb3RpZmljYXRpb24odGl0bGUsIG9wdGlvbnMpKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJub3RpZmljYXRpb25jbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5ub3RpZmljYXRpb24uY2xvc2UoKTtcbiAgICBldmVudC53YWl0VW50aWwoY2xpZW50cy5vcGVuV2luZG93KGV2ZW50Lm5vdGlmaWNhdGlvbi5kYXRhLnVybCkpO1xufSk7XG4iXSwibmFtZXMiOlsic2VsZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImRhdGEiLCJqc29uIiwidGl0bGUiLCJvcHRpb25zIiwiYm9keSIsImljb24iLCJiYWRnZSIsInVybCIsIndhaXRVbnRpbCIsInJlZ2lzdHJhdGlvbiIsInNob3dOb3RpZmljYXRpb24iLCJub3RpZmljYXRpb24iLCJjbG9zZSIsImNsaWVudHMiLCJvcGVuV2luZG93Il0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./public/sw-custom.js\n"));

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/trusted types policy */
/******/ 	(() => {
/******/ 		var policy;
/******/ 		__webpack_require__.tt = () => {
/******/ 			// Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
/******/ 			if (policy === undefined) {
/******/ 				policy = {
/******/ 					createScript: (script) => (script)
/******/ 				};
/******/ 				if (typeof trustedTypes !== "undefined" && trustedTypes.createPolicy) {
/******/ 					policy = trustedTypes.createPolicy("nextjs#bundler", policy);
/******/ 				}
/******/ 			}
/******/ 			return policy;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/trusted types script */
/******/ 	(() => {
/******/ 		__webpack_require__.ts = (script) => (__webpack_require__.tt().createScript(script));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/react refresh */
/******/ 	(() => {
/******/ 		if (__webpack_require__.i) {
/******/ 		__webpack_require__.i.push((options) => {
/******/ 			const originalFactory = options.factory;
/******/ 			options.factory = (moduleObject, moduleExports, webpackRequire) => {
/******/ 				const hasRefresh = typeof self !== "undefined" && !!self.$RefreshInterceptModuleExecution$;
/******/ 				const cleanup = hasRefresh ? self.$RefreshInterceptModuleExecution$(moduleObject.id) : () => {};
/******/ 				try {
/******/ 					originalFactory.call(this, moduleObject, moduleExports, webpackRequire);
/******/ 				} finally {
/******/ 					cleanup();
/******/ 				}
/******/ 			}
/******/ 		})
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	
/******/ 	// noop fns to prevent runtime errors during initialization
/******/ 	if (typeof self !== "undefined") {
/******/ 		self.$RefreshReg$ = function () {};
/******/ 		self.$RefreshSig$ = function () {
/******/ 			return function (type) {
/******/ 				return type;
/******/ 			};
/******/ 		};
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/sw-custom.js");
/******/ 	
/******/ })()
;