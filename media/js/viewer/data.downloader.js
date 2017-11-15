(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:begin.
    APP.on("setup:begin", function () {
        var url;

        url = APP.defaults.apiBaseURL + APP.constants.URLS.SEARCH_SETUP;
        $.get(url)
            .done(function (data) {
                APP.trigger("setup:cvDataDownload", data);
            })
            .fail(function () {
                setTimeout(function () {
                    APP.trigger("setup:cvDataDownload:error");
                }, APP.constants.uiUpdateDelay);
            });
    });

    // Event handler: setup:cvDataParsed.
    APP.on("setup:cvDataParsed", function () {
        var url;

        // Set target url.
        url = APP.defaults.apiBaseURL;
        url += APP.constants.URLS.RETRIEVE;
        url += "?uid=";
        url += APP.state.issueID;
        console.log(url);

        // Download.
        $.get(url)
            .done(function (data) {
                setTimeout(function () {
                    APP.trigger("setup:issueDataDownload", data);
                }, APP.constants.uiUpdateDelay);
            })
            .fail(function () {
                setTimeout(function () {
                    APP.trigger("setup:issueDataDownload:error");
                }, APP.constants.uiUpdateDelay);
            });
    });

}(
    this.APP,
    this.$
));