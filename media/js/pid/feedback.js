// --------------------------------------------------------
// feedback.listener.js - Manages application state updates.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Setup events.
    APP.on("setup:begin", function () {
        APP.utils.displayFeedback("Initializing errata PID Lookup");
    });
    APP.on("setup:setupDataDownload:error", function () {
        // TODO handle this scenario.
    	alert("setup:setupDataDownload:error");
    });
    APP.on("setup:complete", APP.utils.hideFeedback);

    // Search events.
    APP.on("search:begin", function () {
        APP.utils.displayFeedback("Searching PID handle service");
    });
    APP.on("search:dataDownload:error", function () {
        alert("An error occurred whilst calling the PID handle service");
    });
    APP.on("search:complete", APP.utils.hideFeedback);

}(this.APP, this.$));
