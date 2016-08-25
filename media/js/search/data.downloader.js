// --------------------------------------------------------
// search/search.data.downloader.js - Calls web-service search endpoint.
// --------------------------------------------------------
(function (APP, _, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Performs a search.
    var doSearch = function (eventType) {
        var url, params;

        // Set web-service endpoint url.
        url = APP.defaults.apiBaseURL + APP.constants.URLS.SEARCH;

        // Set web-service endpoint query parameters.
        params = {};
        _.each(_.values(APP.state.filters), function (f) {
            params[f.key] = f.data.current.key;
        });

        // Invoke web-service endpoint.
        APP.trigger(eventType + "ing");
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

    // Event handler: setup:begin.
    APP.on("setup:begin", function () {
        $.get(APP.defaults.apiBaseURL + APP.constants.URLS.SEARCH_SETUP)
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

    // Update filter & invoke search.
    APP.updateFilter = function (filterType, filterValue) {
        var f;

        // Update state.
        f = APP.state.filters[filterType];
        f.data.current = _.find(f.data.all, function (i) {
            return i.key === filterValue;
        });

        // Execute search.
        APP.trigger("search:begin");
        doSearch("search:dataDownload");
    };

}(
    this.APP,
    this._,
    this.$
));