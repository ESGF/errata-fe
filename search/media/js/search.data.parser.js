// --------------------------------------------------------
// search/search.data.parser.js - Parses search data returned from web-service.
// --------------------------------------------------------
(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    var
        // Parses data returned from search web-service endpoint.
        doParse = function (eventType, data) {
            // Set filter related helper attributes.
            _.each(data.results, function (row) {
                _.each(_.values(APP.state.filters), function (f) {
                    row['_' + f.key] = f.data.set[row[f.key]];
                });
            });

            // Perform initial sort.
            data.results = _.sortBy(data.results, 'dateCreated');

            // Trigger application event.
            APP.trigger(eventType, data);
        };

    // Setup data parser.
    APP.on("setup:initialSearchDataDownload", function (data) {
        doParse("setup:initialSearchDataParsed", data);
    });

    // Setup data parser.
    APP.on("search:dataDownload", function (data) {
        doParse("search:dataParsed", data);
    });

}(
    this.APP,
    this._
));
