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
                        artefact: j[1] + "#" + j[2],
                        sortOrdinal: j[3],
                        uid: j[0],
                        is_first: j[4],
                        is_latest: j[5],
                        unchanged_file: j[6]
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
