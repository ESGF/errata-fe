// --------------------------------------------------------
// feedback.listener.js - Manages application state updates.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Displays feedback.
    var displayFeedback = function (text) {
            $('#feedbackText').text(text + " ... please wait");
            $('.feedback-title').text(
                APP.ORGANIZATION + " " + APP.NAME + " " + APP.SUBTITLE);
            $('.feedback-version').text("v" + APP.VERSION);
            $("#feedbackContainer").modal({
                backdrop: 'static',
                keyboard: false,
                show: true
            });
        },

        // Hides feedback.
        hideFeedback = function () {
            $("#feedbackContainer").modal('hide');
        },

        wasDisplayed = false;

    // Setup events.
    APP.on("setup:begin", function () {
        displayFeedback("Initializing errata search");
    });
    APP.on("setup:setupDataDownload:error", function () {
        // TODO handle this scenario.
    	alert("setup:setupDataDownload:error");
    });
    APP.on("setup:complete", hideFeedback);


    // Search events.
    APP.on("search:begin", function () {
        displayFeedback("Searching errata repository");
    });
    APP.on("search:dataDownload:error", function () {
    	alert("search:dataDownload:error");
    });
    APP.on("search:complete", hideFeedback);

}(this.APP, this.$));
