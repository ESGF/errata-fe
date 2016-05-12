// --------------------------------------------------------
// app.defaults.js - defaults used across application.
// --------------------------------------------------------
(function(APP, host) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare defaults used within plugin.
    APP.defaults = {
        // Execution mode.
        mode: 'dev'
    };

    // Set mode.
    if (host && host.indexOf('es-doc.org') >= 0) {
        if (host.indexOf('test') >= 0) {
            APP.defaults.mode = 'test';
        } else {
            APP.defaults.mode = 'prod';
        }
    }

    // Set API base url.
    APP.defaults.apiBaseURL = APP.constants.api.baseURL[APP.defaults.mode];

    // Set home page.
    APP.defaults.homepage = APP.constants.homepage[APP.defaults.mode];

    // Set viewerBaseURL.
    APP.defaults.viewerBaseURL = APP.constants.viewer.baseURL[APP.defaults.mode];
}(
    this.APP,
    window.location.host
));