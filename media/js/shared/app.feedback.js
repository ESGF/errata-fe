// --------------------------------------------------------
// feedback.listener.js - Manages application state updates.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Displays feedback.
    var displayFeedback = function (text) {
            $('#feedbackText').text(text + " ... please wait");
            $("#feedbackContainer").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        },

        // Hides feedback.
        hideFeedback = function () {
            $("#feedbackContainer").modal('hide');
        };

    // Event handler: setup data download error.
    APP.on("setup:begin", function () {
        displayFeedback("Initializing errata search");
    });

    APP.on("search:begin", function () {
        displayFeedback("Searching errata repository");
    });

    // Event handler: setup complete.
    APP.on("setup:complete", hideFeedback);

    // Event handler: search complete.
    APP.on("search:complete", hideFeedback);

    // Event handler: setup data download error.
    APP.on("setup:setupDataDownload:error", function () {
        // TODO: handle this scenario.
    	alert("setup:setupDataDownload:error");
    });

    // Event handler: intitial search data download error.
    APP.on("setup:initialSearchDataDownload:error", function () {
        // TODO: handle this scenario.
    	alert("setup:initialSearchDataDownload:error");
    });

}(this.APP, this.$));
