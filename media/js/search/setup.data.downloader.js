// --------------------------------------------------------
// search/setup.data.downloader.js - Downloads page setup data.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: page load.
    APP.on("setup:begin", function () {
        $.get(APP.defaults.apiBaseURL + APP.constants.api.searchSetupURL)
            .done(function (data) {
                APP.trigger("setup:setupDataDownload", data);
            })
            .fail(function () {
                setTimeout(function () {
                    APP.trigger("setup:setupDataDownload:error");
                }, APP.constants.uiUpdateDelay);
            });
    });

}(
    this.APP,
    this.$
));
