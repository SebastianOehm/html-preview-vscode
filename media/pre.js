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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9odG1sLXByZXZpZXctdnNjb2RlLy4vcHJldmlldy1zcmMvY3NwLnRzIiwid2VicGFjazovL2h0bWwtcHJldmlldy12c2NvZGUvLi9wcmV2aWV3LXNyYy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly9odG1sLXByZXZpZXctdnNjb2RlLy4vcHJldmlldy1zcmMvc3RyaW5ncy50cyIsIndlYnBhY2s6Ly9odG1sLXByZXZpZXctdnNjb2RlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2h0bWwtcHJldmlldy12c2NvZGUvLi9wcmV2aWV3LXNyYy9wcmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5pbXBvcnQgeyBNZXNzYWdlUG9zdGVyIH0gZnJvbSAnLi9tZXNzYWdpbmcnO1xyXG5pbXBvcnQgeyBnZXRTZXR0aW5ncyB9IGZyb20gJy4vc2V0dGluZ3MnO1xyXG5pbXBvcnQgeyBnZXRTdHJpbmdzIH0gZnJvbSAnLi9zdHJpbmdzJztcclxuXHJcbi8qKlxyXG4gKiBTaG93cyBhbiBhbGVydCB3aGVuIHRoZXJlIGlzIGEgY29udGVudCBzZWN1cml0eSBwb2xpY3kgdmlvbGF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIENzcEFsZXJ0ZXIge1xyXG5cdHByaXZhdGUgZGlkU2hvdyA9IGZhbHNlO1xyXG5cdHByaXZhdGUgZGlkSGF2ZUNzcFdhcm5pbmcgPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBtZXNzYWdpbmc/OiBNZXNzYWdlUG9zdGVyO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIHtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3NlY3VyaXR5cG9saWN5dmlvbGF0aW9uJywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLm9uQ3NwV2FybmluZygpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0aWYgKGV2ZW50ICYmIGV2ZW50LmRhdGEgJiYgZXZlbnQuZGF0YS5uYW1lID09PSAndnNjb2RlLWRpZC1ibG9jay1zdmcnKSB7XHJcblx0XHRcdFx0dGhpcy5vbkNzcFdhcm5pbmcoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2V0UG9zdGVyKHBvc3RlcjogTWVzc2FnZVBvc3Rlcikge1xyXG5cdFx0dGhpcy5tZXNzYWdpbmcgPSBwb3N0ZXI7XHJcblx0XHRpZiAodGhpcy5kaWRIYXZlQ3NwV2FybmluZykge1xyXG5cdFx0XHR0aGlzLnNob3dDc3BXYXJuaW5nKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uQ3NwV2FybmluZygpIHtcclxuXHRcdHRoaXMuZGlkSGF2ZUNzcFdhcm5pbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5zaG93Q3NwV2FybmluZygpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzaG93Q3NwV2FybmluZygpIHtcclxuXHRcdGNvbnN0IHN0cmluZ3MgPSBnZXRTdHJpbmdzKCk7XHJcblx0XHRjb25zdCBzZXR0aW5ncyA9IGdldFNldHRpbmdzKCk7XHJcblxyXG5cdFx0aWYgKHRoaXMuZGlkU2hvdyB8fCBzZXR0aW5ncy5kaXNhYmxlU2VjdXJpdHlXYXJuaW5ncyB8fCAhdGhpcy5tZXNzYWdpbmcpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5kaWRTaG93ID0gdHJ1ZTtcclxuXHJcblx0XHRjb25zdCBub3RpZmljYXRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRub3RpZmljYXRpb24uaW5uZXJUZXh0ID0gc3RyaW5ncy5jc3BBbGVydE1lc3NhZ2VUZXh0O1xyXG5cdFx0bm90aWZpY2F0aW9uLnNldEF0dHJpYnV0ZSgnaWQnLCAnY29kZS1jc3Atd2FybmluZycpO1xyXG5cdFx0bm90aWZpY2F0aW9uLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBzdHJpbmdzLmNzcEFsZXJ0TWVzc2FnZVRpdGxlKTtcclxuXHJcblx0XHRub3RpZmljYXRpb24uc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xyXG5cdFx0bm90aWZpY2F0aW9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHN0cmluZ3MuY3NwQWxlcnRNZXNzYWdlTGFiZWwpO1xyXG5cdFx0bm90aWZpY2F0aW9uLm9uY2xpY2sgPSAoKSA9PiB7XHJcblx0XHRcdHRoaXMubWVzc2FnaW5nIS5wb3N0Q29tbWFuZCgnaHRtbC5zaG93UHJldmlld1NlY3VyaXR5U2VsZWN0b3InLCBbc2V0dGluZ3Muc291cmNlXSk7XHJcblx0XHR9O1xyXG5cdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChub3RpZmljYXRpb24pO1xyXG5cdH1cclxufVxyXG4iLCIvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiAgQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMaWNlbnNlLnR4dCBpbiB0aGUgcHJvamVjdCByb290IGZvciBsaWNlbnNlIGluZm9ybWF0aW9uLlxyXG4gKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJldmlld1NldHRpbmdzIHtcclxuXHRzb3VyY2U6IHN0cmluZztcclxuXHRsaW5lOiBudW1iZXI7XHJcblx0bGluZUNvdW50OiBudW1iZXI7XHJcblx0c2Nyb2xsUHJldmlld1dpdGhFZGl0b3I/OiBib29sZWFuO1xyXG5cdHNjcm9sbEVkaXRvcldpdGhQcmV2aWV3OiBib29sZWFuO1xyXG5cdGRpc2FibGVTZWN1cml0eVdhcm5pbmdzOiBib29sZWFuO1xyXG5cdGRvdWJsZUNsaWNrVG9Td2l0Y2hUb0VkaXRvcjogYm9vbGVhbjtcclxufVxyXG5cclxubGV0IGNhY2hlZFNldHRpbmdzOiBQcmV2aWV3U2V0dGluZ3MgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0RGF0YShrZXk6IHN0cmluZyk6IFByZXZpZXdTZXR0aW5ncyB7XHJcblx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2c2NvZGUtaHRtbC1wcmV2aWV3LWRhdGEnKTtcclxuXHRpZiAoZWxlbWVudCkge1xyXG5cdFx0Y29uc3QgZGF0YSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSk7XHJcblx0XHRpZiAoZGF0YSkge1xyXG5cdFx0XHRyZXR1cm4gSlNPTi5wYXJzZShkYXRhKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IGxvYWQgZGF0YSBmb3IgJHtrZXl9YCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBQcmV2aWV3U2V0dGluZ3Mge1xyXG5cdGlmIChjYWNoZWRTZXR0aW5ncykge1xyXG5cdFx0cmV0dXJuIGNhY2hlZFNldHRpbmdzO1xyXG5cdH1cclxuXHJcblx0Y2FjaGVkU2V0dGluZ3MgPSBnZXREYXRhKCdkYXRhLXNldHRpbmdzJyk7XHJcblx0aWYgKGNhY2hlZFNldHRpbmdzKSB7XHJcblx0XHRyZXR1cm4gY2FjaGVkU2V0dGluZ3M7XHJcblx0fVxyXG5cclxuXHR0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBsb2FkIHNldHRpbmdzJyk7XHJcbn1cclxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaW5ncygpOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHtcclxuXHRjb25zdCBzdG9yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2c2NvZGUtaHRtbC1wcmV2aWV3LWRhdGEnKTtcclxuXHRpZiAoc3RvcmUpIHtcclxuXHRcdGNvbnN0IGRhdGEgPSBzdG9yZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RyaW5ncycpO1xyXG5cdFx0aWYgKGRhdGEpIHtcclxuXHRcdFx0cmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgc3RyaW5ncycpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbmNvbnN0IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0Y29uc3QgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdGNvbnN0IG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHRjb25zdCBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG1vZHVsZUlkICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG4gKiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTGljZW5zZS50eHQgaW4gdGhlIHByb2plY3Qgcm9vdCBmb3IgbGljZW5zZSBpbmZvcm1hdGlvbi5cclxuICotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXHJcblxyXG5pbXBvcnQgeyBDc3BBbGVydGVyIH0gZnJvbSAnLi9jc3AnO1xyXG5cclxuZGVjbGFyZSBnbG9iYWwge1xyXG5cdGludGVyZmFjZSBXaW5kb3cge1xyXG5cdFx0Y3NwQWxlcnRlcjogQ3NwQWxlcnRlcjtcclxuXHR9XHJcbn1cclxuXHJcbndpbmRvdy5jc3BBbGVydGVyID0gbmV3IENzcEFsZXJ0ZXIoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=