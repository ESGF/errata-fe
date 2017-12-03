// Event handler: setup:begin.
APP.on("setup:begin", () => {
    var url;

    // Set target.
    url = APP.defaults.apiBaseURL + APP.constants.URLS.SEARCH_SETUP;

    // Download.
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

// Event handler: setup:cvDataDownload.
APP.on("setup:cvDataDownload", (data) => {
    // Update state.
    APP.state.vocabs = data.vocabs;

    // Fire event.
    APP.trigger("setup:cvDataParsed");
});

// Event handler: setup:cvDataParsed.
APP.on("setup:cvDataParsed", () => {
    var url, params;

    // Set target.
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

// Event handler: setup:issueDataDownload.
APP.on("setup:issueDataDownload", (data) => {
    // Update state.
    APP.state.issue = new Issue(data.issue);

    // Fire event.
    APP.trigger("setup:complete");
});