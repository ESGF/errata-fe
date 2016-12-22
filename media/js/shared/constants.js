// --------------------------------------------------------
// app.constants.js - constants used across application.
// --------------------------------------------------------
(function (APP, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare constants used within plugin.
    APP.constants = {
        // Application constants.
        app: {
            // Returns title.
            getTitle: function () {
                return APP.NAME;
            },

            // Returns version.
            getVersion: function () {
                var result;
                result = ' (v';
                result += APP.VERSION;
                result += ')';
                return result;
            },

            // Returns caption.
            getCaption: function (includeVersion) {
                var caption;
                caption = APP.NAME;
                caption += ' - ';
                caption += APP.options.activePlugin;
                if (includeVersion) {
                    caption += ' (v';
                    caption += APP.VERSION;
                    caption += ')';
                }
                return caption;
            }
        },

        URLS: {
            // Base API url in various modes.
            API: {
                dev: "http://localhost:5001",
                prod: "https://errata.api.es-doc.org",
                test: "https://test.errata.api.es-doc.org"
            },

            // ES-DOC homepage.
            HOME_PAGE: "http://es-doc.org",

            // pid resolve.
            PID_RESOLVE: "/1/resolve/pid",

            // issue retrieve.
            RETRIEVE: "/1/issue/retrieve",

            // issue search.
            SEARCH: "/1/issue/search",

            // issue search setup.
            SEARCH_SETUP: "/1/issue/search-setup",

            // Base viewer url in various modes.
            VIEWER: {
                dev: window.location.href.replace("search", "viewer"),
                prod: "https://errata.es-doc.org/viewer.html",
                test: "https://test.errata.es-doc.org/viewer.html"
            }
        },

        // Set of email related constants.
        EMAIL: {
            // Contact email.
            CONTACT: "errata-contact@list.woc.noaa.gov",

            // Support email.
            SUPPORT: "errata-support@list.woc.noaa.gov",

            // Default email subject.
            SUBJECT: 'ES-DOC ERRATA :: subject goes here',

            // Default email message.
            MESSAGE: "Dear ES-DOC ERRATA support team,"
        },

        // Logging related.
        logging: {
            PREFIX: "ES-DOC-ERRATA :: "
        },

        // Text to display in lieu of null value.
        NULL_FIELD: '--',

        // Delay in milliseconds before UI updates are performed so as to avoid ugly flickering.
        uiUpdateDelay: 1000
    };

}(
    this.APP,
    this.window
));
