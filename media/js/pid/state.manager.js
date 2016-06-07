// --------------------------------------------------------
// search/state.manager.js - Manages page state initialization.
// --------------------------------------------------------
(function (APP) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: search completed.
    APP.on("search:dataParsed", function (data) {
        // Cache.
        APP.state.errata = data.errata;

        // Fire events.
        APP.trigger('search:complete');
    });

}(
    this.APP
));
