// --------------------------------------------------------
// api.js - Encapsulates ajax calls to ES-DOC api.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var // Returns search url parameters.
        getSearchParams = function () {
            var params, documentTypeKey, config;

            // Set mandatory params.
            params = {
                documentType: APP.state.p.current.dt.current.key,
                documentVersion: APP.state.dv.current.name,
                project : APP.state.p.current.name,
                timestamp: new Date().getTime()
            };

            // Set optional params.
            if (APP.state.p.current.i.current.id > 0) {
                params.institute = APP.state.p.current.i.current.name;
            }
            if (APP.state.p.current.m.current.name !== "*") {
                params.model = APP.state.p.current.m.current.name;
            }
            if (APP.state.p.current.e.current.name !== "*") {
                params.experiment = APP.state.p.current.e.current.name;
            }

            // Set criteria filtering config.
            config = APP.constants.criteriaConfig[params.project];

            // Apply document type specific parameter overrides.
            documentTypeKey = params.documentType.toLowerCase();
            if (_.has(config, documentTypeKey)) {
                _.each(config[documentTypeKey], function (field) {
                    delete params[field];
                });
            }

            return params;
        },

        // Performs a search.
        doSearch = function (eventType) {
            var url, params;

            url = APP.defaults.apiBaseURL + APP.constants.api.searchURL;
            params = getSearchParams();
            $.get(url, params)
                .done(function (data) {
                    setTimeout(function () {
                        APP.trigger(eventType, data);
                    }, APP.constants.uiUpdateDelay);
                })
                .fail(function () {
                    setTimeout(function () {
                        APP.trigger(eventType + ":error");
                    }, APP.constants.uiUpdateDelay);
                });
        };

    // Event handler: setup begins.
    APP.on("setup:begin", function () {
        $.get(APP.defaults.apiBaseURL + APP.constants.api.setupURL)
            .done(function (data) {
                APP.trigger("setup:setupDataDownload", data);
            })
            .fail(function () {
                setTimeout(function () {
                    APP.trigger("setup:setupDataDownload:error");
                }, APP.constants.uiUpdateDelay);
            });
    });

    // Event handler: setup state initialized.
    APP.on("setup:stateInitialized", function () {
        doSearch("setup:initialSearchDataDownload");
    });

    // Event handler: search criteria update.
    APP.on("search:begin", function () {
        doSearch("search:dataDownload");
    });

}(this.APP, this.$));