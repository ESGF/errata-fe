(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup begins.
    APP.on("setup:begin", () => {
        APP.utils.displayFeedback("Initializing errata PID Lookup");
    });

    // Event handler: setup complete.
    APP.on("setup:complete", APP.utils.hideFeedback);

    // Event handler: setup error.
    APP.on("setup:setupDataDownload:error", () => {
    	alert("setup:setupDataDownload:error");
    });

    // Event handler: search begins.
    APP.on("search:begin", () => {
        APP.utils.displayFeedback("Searching PID handle service");
    });

    // Event handler: search complete.
    APP.on("search:complete", APP.utils.hideFeedback);

    // Event handler: search error.
    APP.on("search:dataDownload:error", () => {
        alert("An error occurred whilst calling the PID handle service");
    });

}(
    this.APP,
    this.$
));
