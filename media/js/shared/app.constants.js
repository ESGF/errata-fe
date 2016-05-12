// --------------------------------------------------------
// app.constants.js - constants used across application.
// --------------------------------------------------------
(function(APP) {

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

        // Set of api related constants.
        api: {
            // Base url in various modes.
            baseURL: {
                dev: "http://localhost:5001",
                prod: "http://errata.api.es-doc.org",
                test: "http://test.errata.api.es-doc.org"
            },

            // issue retrieve.
            retrieveURL: "/1/issue/retrieve",

            // issue search.
            searchURL: "/1/issue/search",

            // issue search setup.
            searchSetupURL: "/1/issue/search/setup"
        },

        // Set of email related constants.
        email: {
            // Contact email.
            contact: "errata-contact@list.woc.noaa.gov",

            // Support email.
            support: "errata-support@list.woc.noaa.gov",

            // Default email subject.
            defaultSubject: 'ES-DOC ERRATA :: subject goes here',

            // Default email message.
            defaultMessage: "Dear ES-DOC ERRATA support team,"
        },

        // ES-DOC homepage.
        homepage: {
            dev: "../splash/index.html",
            prod: "http://es-doc.org",
            test: "http://test.es-doc.org"
        },

        // Logging related.
        logging: {
            PREFIX: "ERRATA :: "
        },

        // Text to display in lieu of null value.
        NULL_FIELD: '--',

        // Delay in milliseconds before UI updates are performed so as to avoid ugly flickering.
        uiUpdateDelay: 1000,

        // Set of viewer related constants.
        viewer: {
            // Base url in various modes.
            baseURL: {
                dev: "http://localhost:5001/static/view",
                prod: "http://errata.api.es-doc.org/static/view",
                test: "http://test.errata.api.es-doc.org/static/view"
            }
        }
    };

}(
    this.APP
));
