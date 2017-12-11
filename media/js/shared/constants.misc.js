// Execution mode.
export const EXECUTION_MODE = function () {
    if (window.location.host && window.location.host.indexOf('es-doc.org') >= 0) {
        if (window.location.host.indexOf('test') >= 0) {
            return 'test';
        } else {
            return 'prod';
        }
    } else {
        return 'dev';
    }
}();

// Logging related.
export const LOGGING_PREFIX = "ES-DOC-ERRATA :: ";

// Text to display in lieu of null value.
export const NULL_FIELD = '--';

// Delay in milliseconds before UI updates are performed so as to avoid ugly flickering.
export const UI_UPDATE_DELAY = 1000;
