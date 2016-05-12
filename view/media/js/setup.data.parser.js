// --------------------------------------------------------
// search/setup.data.parser.js - Parses page setup data.
// --------------------------------------------------------
(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    var
        // Parses issue project.
        parseProject = function (data) {
            // Add global filter.
            data.project.unshift({
                key: "*",
                label: "*"
            });

            // Sort.
            data.project = _.sortBy(data.project, 'label');
        },

        // Parses issue states.
        parseState = function (data) {
            // Add global filter.
            data.state.unshift({
                color: "#FFFFFF",
                key: "*",
                label: "*"
            });

            // Sort.
            data.state = _.sortBy(data.state, 'label');
        },

        // Parses issue severity states.
        parseSeverity = function (data) {
            // Add global filter.
            data.severity.unshift({
                color: "#FFFFFF",
                key: "*",
                label: "*"
            });

            // Sort.
            data.severity = _.sortBy(data.severity, 'label');
        },

        // Parses issue workflow.
        parseWorkflow = function (data) {
            // Add global filter.
            data.workflow.unshift({
                color: "#FFFFFF",
                key: "*",
                label: "*"
            });

            // Sort.
            data.workflow = _.sortBy(data.workflow, 'label');
        },

        // Collection of setup data parsers.
        parsers = [
            parseProject,
            parseState,
            parseSeverity,
            parseWorkflow
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
