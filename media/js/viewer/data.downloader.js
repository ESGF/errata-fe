(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:begin.
    APP.on("setup:begin", () => {
        var url;

        url = APP.defaults.apiBaseURL + APP.constants.URLS.SEARCH_SETUP;
        $.get(url)
            .done((data) => {
                APP.trigger("setup:cvDataDownload", data);
            })
            .fail(() => {
                setTimeout(() => {
                    APP.trigger("setup:cvDataDownload:error");
                }, APP.constants.uiUpdateDelay);
            });
    });

    // Event handler: setup:cvDataParsed.
    APP.on("setup:cvDataParsed", () => {
        var url, params;

        // Set target url.
        url = APP.defaults.apiBaseURL + APP.constants.URLS.RETRIEVE;
        params = {
            uid: APP.utils.getURLParam("uid")
        };

        // Download.
        $.get(url, params)
            .done((data) => {
                setTimeout(() => {
                    APP.trigger("setup:issueDataDownload", data);
                }, APP.constants.uiUpdateDelay);
            })
            .fail(() => {
                setTimeout(() => {
                    APP.trigger("setup:issueDataDownload:error");
                }, APP.constants.uiUpdateDelay);
            });
    });

}(
    this.APP,
    this.$
));