// --------------------------------------------------------
// search/state.manager.js - Manages page state initialization.
// --------------------------------------------------------
(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Returns number of pages to be rendered.
    var getPageCount = function (row_count) {
        var pageCount = 0;

        if (row_count) {
            pageCount = parseInt(row_count / APP.defaults.pageLength, 10);
            if (row_count / APP.defaults.pageLength > pageCount) {
                pageCount += 1;
            }
        }

        return pageCount;
    };

    // Converts search results into pages for rendering.
    var getPages = function (rows) {
        return _.map(_.range(APP.state.pageCount), function (id) {
            return {
                id: id + 1,
                data: this.slice(id * APP.defaults.pageLength,
                                 ((id + 1) * APP.defaults.pageLength) - 1)
            };
        }, rows);
    };

    // Update page state after search web-service response.
    var updateSearchState = function (data) {
        APP.state.searchData = data;
        APP.state.pageCount = getPageCount(data.count);
        APP.state.pages = getPages(data.results);
        APP.state.page = data.results.length > 0 ? APP.state.pages[0] : undefined;
    };

    // Event handler: page setup data parsed.
    APP.on("setup:setupDataParsed", function (data) {
        // Update page state.
        APP.state.s.all = data.states;
        APP.state.s.current = data.states[0];

        // Fire event.
        APP.trigger("setup:stateInitialized");
    });

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
        if (APP.state.page) {
            APP.trigger('search:resultsPaginationReset');
            APP.trigger('search:resultsPagination');
        } else {
            APP.trigger('search:nullSearch');
        }
        APP.trigger('search:complete');
    });

}(
    this.APP,
    this._
));
