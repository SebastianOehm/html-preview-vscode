/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./preview-src/csp.ts"
/*!****************************!*\
  !*** ./preview-src/csp.ts ***!
  \****************************/
(__unused_webpack_module, exports, __webpack_require__) {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CspAlerter = void 0;
const settings_1 = __webpack_require__(/*! ./settings */ "./preview-src/settings.ts");
const strings_1 = __webpack_require__(/*! ./strings */ "./preview-src/strings.ts");
/**
 * Shows an alert when there is a content security policy violation.
 */
class CspAlerter {
    constructor() {
        this.didShow = false;
        this.didHaveCspWarning = false;
        document.addEventListener('securitypolicyviolation', () => {
            this.onCspWarning();
        });
        window.addEventListener('message', (event) => {
            if (event && event.data && event.data.name === 'vscode-did-block-svg') {
                this.onCspWarning();
            }
        });
    }
    setPoster(poster) {
        this.messaging = poster;
        if (this.didHaveCspWarning) {
            this.showCspWarning();
        }
    }
    onCspWarning() {
        this.didHaveCspWarning = true;
        this.showCspWarning();
    }
    showCspWarning() {
        const strings = (0, strings_1.getStrings)();
        const settings = (0, settings_1.getSettings)();
        if (this.didShow || settings.disableSecurityWarnings || !this.messaging) {
            return;
        }
        this.didShow = true;
        const notification = document.createElement('a');
        notification.innerText = strings.cspAlertMessageText;
        notification.setAttribute('id', 'code-csp-warning');
        notification.setAttribute('title', strings.cspAlertMessageTitle);
        notification.setAttribute('role', 'button');
        notification.setAttribute('aria-label', strings.cspAlertMessageLabel);
        notification.onclick = () => {
            this.messaging.postCommand('html.showPreviewSecuritySelector', [settings.source]);
        };
        document.body.appendChild(notification);
    }
}
exports.CspAlerter = CspAlerter;


/***/ },

/***/ "./preview-src/settings.ts"
/*!*********************************!*\
  !*** ./preview-src/settings.ts ***!
  \*********************************/
(__unused_webpack_module, exports) {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getData = getData;
exports.getSettings = getSettings;
let cachedSettings = undefined;
function getData(key) {
    const element = document.getElementById('vscode-html-preview-data');
    if (element) {
        const data = element.getAttribute(key);
        if (data) {
            return JSON.parse(data);
        }
    }
    throw new Error(`Could not load data for ${key}`);
}
function getSettings() {
    if (cachedSettings) {
        return cachedSettings;
    }
    cachedSettings = getData('data-settings');
    if (cachedSettings) {
        return cachedSettings;
    }
    throw new Error('Could not load settings');
}


/***/ },

/***/ "./preview-src/strings.ts"
/*!********************************!*\
  !*** ./preview-src/strings.ts ***!
  \********************************/
(__unused_webpack_module, exports) {


/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getStrings = getStrings;
function getStrings() {
    const store = document.getElementById('vscode-html-preview-data');
    if (store) {
        const data = store.getAttribute('data-strings');
        if (data) {
            return JSON.parse(data);
        }
    }
    throw new Error('Could not load strings');
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
let __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
let exports = __webpack_exports__;
/*!****************************!*\
  !*** ./preview-src/pre.ts ***!
  \****************************/

/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", ({ value: true }));
const csp_1 = __webpack_require__(/*! ./csp */ "./preview-src/csp.ts");
window.cspAlerter = new csp_1.CspAlerter();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9odG1sLXByZXZpZXctdnNjb2RlLTIvLi9wcmV2aWV3LXNyYy9jc3AudHMiLCJ3ZWJwYWNrOi8vaHRtbC1wcmV2aWV3LXZzY29kZS0yLy4vcHJldmlldy1zcmMvc2V0dGluZ3MudHMiLCJ3ZWJwYWNrOi8vaHRtbC1wcmV2aWV3LXZzY29kZS0yLy4vcHJldmlldy1zcmMvc3RyaW5ncy50cyIsIndlYnBhY2s6Ly9odG1sLXByZXZpZXctdnNjb2RlLTIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaHRtbC1wcmV2aWV3LXZzY29kZS0yLy4vcHJldmlldy1zcmMvcHJlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqICBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuICogIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExpY2Vuc2UudHh0IGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGxpY2Vuc2UgaW5mb3JtYXRpb24uXHJcbiAqLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xyXG5cclxuaW1wb3J0IHsgTWVzc2FnZVBvc3RlciB9IGZyb20gJy4vbWVzc2FnaW5nJztcclxuaW1wb3J0IHsgZ2V0U2V0dGluZ3MgfSBmcm9tICcuL3NldHRpbmdzJztcclxuaW1wb3J0IHsgZ2V0U3RyaW5ncyB9IGZyb20gJy4vc3RyaW5ncyc7XHJcblxyXG4vKipcclxuICogU2hvd3MgYW4gYWxlcnQgd2hlbiB0aGVyZSBpcyBhIGNvbnRlbnQgc2VjdXJpdHkgcG9saWN5IHZpb2xhdGlvbi5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBDc3BBbGVydGVyIHtcclxuXHRwcml2YXRlIGRpZFNob3cgPSBmYWxzZTtcclxuXHRwcml2YXRlIGRpZEhhdmVDc3BXYXJuaW5nID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgbWVzc2FnaW5nPzogTWVzc2FnZVBvc3RlcjtcclxuXHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWN1cml0eXBvbGljeXZpb2xhdGlvbicsICgpID0+IHtcclxuXHRcdFx0dGhpcy5vbkNzcFdhcm5pbmcoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKGV2ZW50KSA9PiB7XHJcblx0XHRcdGlmIChldmVudCAmJiBldmVudC5kYXRhICYmIGV2ZW50LmRhdGEubmFtZSA9PT0gJ3ZzY29kZS1kaWQtYmxvY2stc3ZnJykge1xyXG5cdFx0XHRcdHRoaXMub25Dc3BXYXJuaW5nKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHNldFBvc3Rlcihwb3N0ZXI6IE1lc3NhZ2VQb3N0ZXIpIHtcclxuXHRcdHRoaXMubWVzc2FnaW5nID0gcG9zdGVyO1xyXG5cdFx0aWYgKHRoaXMuZGlkSGF2ZUNzcFdhcm5pbmcpIHtcclxuXHRcdFx0dGhpcy5zaG93Q3NwV2FybmluZygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkNzcFdhcm5pbmcoKSB7XHJcblx0XHR0aGlzLmRpZEhhdmVDc3BXYXJuaW5nID0gdHJ1ZTtcclxuXHRcdHRoaXMuc2hvd0NzcFdhcm5pbmcoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2hvd0NzcFdhcm5pbmcoKSB7XHJcblx0XHRjb25zdCBzdHJpbmdzID0gZ2V0U3RyaW5ncygpO1xyXG5cdFx0Y29uc3Qgc2V0dGluZ3MgPSBnZXRTZXR0aW5ncygpO1xyXG5cclxuXHRcdGlmICh0aGlzLmRpZFNob3cgfHwgc2V0dGluZ3MuZGlzYWJsZVNlY3VyaXR5V2FybmluZ3MgfHwgIXRoaXMubWVzc2FnaW5nKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdHRoaXMuZGlkU2hvdyA9IHRydWU7XHJcblxyXG5cdFx0Y29uc3Qgbm90aWZpY2F0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0bm90aWZpY2F0aW9uLmlubmVyVGV4dCA9IHN0cmluZ3MuY3NwQWxlcnRNZXNzYWdlVGV4dDtcclxuXHRcdG5vdGlmaWNhdGlvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2NvZGUtY3NwLXdhcm5pbmcnKTtcclxuXHRcdG5vdGlmaWNhdGlvbi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgc3RyaW5ncy5jc3BBbGVydE1lc3NhZ2VUaXRsZSk7XHJcblxyXG5cdFx0bm90aWZpY2F0aW9uLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcclxuXHRcdG5vdGlmaWNhdGlvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBzdHJpbmdzLmNzcEFsZXJ0TWVzc2FnZUxhYmVsKTtcclxuXHRcdG5vdGlmaWNhdGlvbi5vbmNsaWNrID0gKCkgPT4ge1xyXG5cdFx0XHR0aGlzLm1lc3NhZ2luZyEucG9zdENvbW1hbmQoJ2h0bWwuc2hvd1ByZXZpZXdTZWN1cml0eVNlbGVjdG9yJywgW3NldHRpbmdzLnNvdXJjZV0pO1xyXG5cdFx0fTtcclxuXHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobm90aWZpY2F0aW9uKTtcclxuXHR9XHJcbn1cclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFByZXZpZXdTZXR0aW5ncyB7XHJcblx0c291cmNlOiBzdHJpbmc7XHJcblx0bGluZTogbnVtYmVyO1xyXG5cdGxpbmVDb3VudDogbnVtYmVyO1xyXG5cdHNjcm9sbFByZXZpZXdXaXRoRWRpdG9yPzogYm9vbGVhbjtcclxuXHRzY3JvbGxFZGl0b3JXaXRoUHJldmlldzogYm9vbGVhbjtcclxuXHRkaXNhYmxlU2VjdXJpdHlXYXJuaW5nczogYm9vbGVhbjtcclxuXHRkb3VibGVDbGlja1RvU3dpdGNoVG9FZGl0b3I6IGJvb2xlYW47XHJcblx0cmVzb3VyY2VPcmlnaW46IHN0cmluZztcclxufVxyXG5cclxubGV0IGNhY2hlZFNldHRpbmdzOiBQcmV2aWV3U2V0dGluZ3MgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YShrZXk6IHN0cmluZyk6IFByZXZpZXdTZXR0aW5ncyB7XHJcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2c2NvZGUtaHRtbC1wcmV2aWV3LWRhdGEnKTtcclxuXHRpZiAoZWxlbWVudCkge1xyXG5cdFx0Y29uc3QgZGF0YSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSk7XHJcblx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGxvYWQgZGF0YSBmb3IgJHtrZXl9YCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcmV2aWV3U2V0dGluZ3Mge1xyXG5cdGlmIChjYWNoZWRTZXR0aW5ncykge1xyXG5cdFx0cmV0dXJuIGNhY2hlZFNldHRpbmdzO1xyXG5cdH1cclxuXHJcblx0Y2FjaGVkU2V0dGluZ3MgPSBnZXREYXRhKCdkYXRhLXNldHRpbmdzJyk7XHJcblx0aWYgKGNhY2hlZFNldHRpbmdzKSB7XHJcblx0XHRyZXR1cm4gY2FjaGVkU2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBsb2FkIHNldHRpbmdzJyk7XHJcbn1cclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5ncygpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcclxuXHRjb25zdCBzdG9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2c2NvZGUtaHRtbC1wcmV2aWV3LWRhdGEnKTtcclxuXHRpZiAoc3RvcmUpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSBzdG9yZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RyaW5ncycpO1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgc3RyaW5ncycpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5pbXBvcnQgeyBDc3BBbGVydGVyIH0gZnJvbSAnLi9jc3AnO1xyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG5cdGludGVyZmFjZSBXaW5kb3cge1xyXG5cdFx0Y3NwQWxlcnRlcjogQ3NwQWxlcnRlcjtcclxuXHR9XHJcbn1cclxuXHJcbndpbmRvdy5jc3BBbGVydGVyID0gbmV3IENzcEFsZXJ0ZXIoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=