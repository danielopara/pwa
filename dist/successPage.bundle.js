/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/successPage.js":
/*!****************************!*\
  !*** ./src/successPage.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const time = __webpack_require__(/*! ./time */ \"./src/time.js\")\r\n\r\nconst doneTransfer = document.getElementById('done')\r\nconst timeDisplay = document.getElementById('date')\r\nconst amountDispplay = document.getElementById('amount')\r\nconst descriptionDisplay = document.getElementById('description')\r\nconst successDisplay = document.getElementById('success')\r\n\r\nconst newAmount = localStorage.getItem('newAmount')\r\nconst newDescription = localStorage.getItem('newDescription')\r\n\r\nfunction showReceipt(){\r\n    successDisplay.innerHTML = newAmount\r\n    timeDisplay.innerHTML = time.time\r\n    amountDispplay.innerHTML = newAmount\r\n    descriptionDisplay.innerHTML = newDescription\r\n}\r\n\r\ndoneTransfer.addEventListener('click', ()=>{\r\n    localStorage.removeItem('newAmount')\r\n    localStorage.removeItem('newDescription')\r\n})\r\n\r\nshowReceipt()\r\n\r\n\n\n//# sourceURL=webpack://wm-offline-payment-with-qr-code/./src/successPage.js?");

/***/ }),

/***/ "./src/time.js":
/*!*********************!*\
  !*** ./src/time.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   time: () => (/* binding */ time)\n/* harmony export */ });\nconst date = new Date()\r\n\r\n  const year = date.getFullYear()\r\n  const month = date.getMonth() + 1\r\n  const day = date.getDate()\r\n  const hrs = date.getHours()\r\n  const mins = date.getMinutes()\r\n  const secs = date.getSeconds()\r\n\r\n  const time =  year + \"/\" + month + \"/\" + day + \" \" + hrs + \":\" + mins + \":\" + secs \n\n//# sourceURL=webpack://wm-offline-payment-with-qr-code/./src/time.js?");

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
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/successPage.js");
/******/ 	
/******/ })()
;