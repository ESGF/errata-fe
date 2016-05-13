// --------------------------------------------------------
// search/setup.data.parser.js - Parses page setup data.
// --------------------------------------------------------
(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Setup data parser.
    APP.on("setup:setupDataDownload", function (data) {
        _.each(APP.state.filters, function (f) {
            // Inject global filter.
            if (f.hasGlobal) {
                data[f.key].unshift({
                    key: "*",
                    label: "*"
                });
            }

            // Sort filter data.
            data[f.key] = _.sortBy(data[f.key], 'label');
        });

        // Fire event.
        APP.trigger("setup:setupDataParsed", data);
    });

}(
    this.APP,
    this._
));
