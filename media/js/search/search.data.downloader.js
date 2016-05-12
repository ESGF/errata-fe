// --------------------------------------------------------
// search/search.data.downloader.js - Calls web-service search endpoint.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Performs a search.
    var doSearch = function (eventType) {
        var url, params;

        // Set web-service endpoint url.
        url = APP.defaults.apiBaseURL + APP.constants.api.searchURL;

        // Set web-service endpoint query parameters.
        params = {
            status: APP.state.s.current.key,
            timestamp: new Date().getTime()
        };

        // Invoke web-service endpoint.
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

    // Event handler: setup state initialized.
    APP.on("setup:stateInitialized", function () {
        doSearch("setup:initialSearchDataDownload");
    });

    // Event handler: search criteria update.
    APP.on("search:begin", function () {
        doSearch("search:dataDownload");
    });

}(this.APP, this.$));