// --------------------------------------------------------
// feedback.listener.js - Manages application state updates.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Setup events.
    APP.on("setup:begin", function () {
        APP.utils.displayFeedback("Initializing errata viwer");
    });
    APP.on("setup:setupDataDownload:error", function () {
        // TODO handle this scenario.
    	alert("setup:setupDataDownload:error");
    });
    APP.on("setup:complete", APP.utils.hideFeedback);

}(this.APP, this.$));
