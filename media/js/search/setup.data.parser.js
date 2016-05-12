// --------------------------------------------------------
// search/setup.data.parser.js - Parses page setup data.
// --------------------------------------------------------
(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    var
        // Parses issue states.
        parseStates = function (data) {
            // Add global filter.
            data.states.unshift({
                key: "*",
                label: "*"
            });

            // Sort.
            data.states = _.sortBy(data.states, 'label');
        },

        // Collection of setup data parsers.
        parsers = [
            parseStates
        ];

    // Setup data parser.
    APP.on("setup:setupDataDownload", function(data) {
        // Invoke parsers.
        _.each(parsers, function (parser) {
            data = parser(data) || data;
        });

        // Fire event.
        APP.trigger("setup:setupDataParsed", data);
    });

}(
    this.APP,
    this._
));
