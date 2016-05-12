(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Parses timestamp.
    var parseTimestamp = function (data) {
            if (data.timestamp) {
                data.timestamp = new Date().getTime() - data.timestamp;
            }
        },

        // Parses document sort key.
        parseSortKey = function (data) {
            _.each(data.results, function (row) {
                row._sortKey = (row.document.institute + row.shortName).toLowerCase();
            });
            data.results = _.sortBy(data.results, '_sortKey');
        },

        // Set of parsers to execute.
        parsers = [
            parseTimestamp,
            parseSortKey
        ],

        // Parses data returned from search API.
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
    window._
));
