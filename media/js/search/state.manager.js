// --------------------------------------------------------
// search/state.manager.js - Manages page state initialization.
// --------------------------------------------------------
(function (APP, paging, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    var
        // Update page state after search web-service response.
        updateSearchState = function (data) {
            // Cache.
            APP.state.searchData = data;

            // Sort.
            APP.sortIssues();

            // Initialise paging.
            APP.paginateIssues();
        };

    // Event handler: initial search completed.
    APP.on("setup:initialSearchDataParsed", function (data) {
        // Update page state.
        updateSearchState(data);

        // Fire events.
        APP.trigger("setup:complete");
    });

    // Event handler: search completed.
    APP.on("search:dataParsed", function (data) {
        // Update page state.
        updateSearchState(data);

        // Fire events.
        APP.trigger('state:pageUpdate');
        APP.trigger('search:complete');
    });

}(
    this.APP,
    this.APP.state.paging,
    this._
));
