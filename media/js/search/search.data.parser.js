// --------------------------------------------------------
// search/search.data.parser.js - Parses search data returned from web-service.
// --------------------------------------------------------
(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    var
        // Assigns a sort key to each row.
        parseSortKey = function (data) {
            _.each(data.results, function (row) {
                row._sortKey = row.status;
                row._sortKey = row._sortKey.toLowerCase();
            });
            data.results = _.sortBy(data.results, '_sortKey');
        },

        // Set of parsers to execute.
        parsers = [
            parseSortKey
        ],

        // Parses data returned from search web-service endpoint.
        doParse = function (data) {
            _.each(parsers, function (parser) {
                data = parser(data) || data;
            });
            return data;
        };

    // Setup data parser.
    APP.on("setup:initialSearchDataDownload", function (data) {
        APP.trigger("setup:initialSearchDataParsed", doParse(data));
    });

    // Setup data parser.
    APP.on("search:dataDownload", function (data) {
        APP.trigger("search:dataParsed", doParse(data));
    });

}(
    this.APP,
    this._
));
