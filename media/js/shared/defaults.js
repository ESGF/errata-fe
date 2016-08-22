// --------------------------------------------------------
// app.defaults.js - defaults used across application.
// --------------------------------------------------------
(function(APP, host) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare defaults used within plugin.
    APP.defaults = {
        // Execution mode.
        mode: function () {
            if (host && host.indexOf('es-doc.org') >= 0) {
                if (host.indexOf('test') >= 0) {
                    return 'test';
                } else {
                    return 'prod';
                }
            } else {
                return 'dev';
            }
        }()
    };

    // Set API base url.
    APP.defaults.apiBaseURL = APP.constants.URLS.API[APP.defaults.mode];

    // Set viewerBaseURL.
    APP.defaults.viewerBaseURL = APP.constants.URLS.VIEWER[APP.defaults.mode];
    alert(APP.defaults.viewerBaseURL);

}(
    this.APP,
    window.location.host
));