// --------------------------------------------------------
// search/search.data.parser.js - Parses search data returned from web-service.
// --------------------------------------------------------
(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: search:dataDownload.
    APP.on("search:dataDownload", function (data) {

        // Map incoming nested arrays into javascript objects.
        data.errata = _.map(data.errata, function (i) {
            return {
                handle: i[0],
                issues: _.map(i[1], function (j) {
                    return {
                        artefact: j[0],
                        uid: j[1],
                        sortOrdinal: j[2]
                    };
                })
            };
        });

        // Trigger application event.
        APP.trigger("search:dataParsed", data);
    });

}(
    this.APP,
    this._
));
