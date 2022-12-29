// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as UTILS       from  '../shared/utilities.js';
import * as STATE       from  './state.js';

// Event handler: setup:begin.
APP.on("setup:begin", () => {
    var url;

    // Set target.
    url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.SEARCH_SETUP;

    // Download.
    $.get(url)
        .done((data) => {
            APP.trigger("setup:cvDataDownload", data);
        })
        .fail(() => {
            setTimeout(() => {
                APP.trigger("setup:cvDataDownload:error");
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        });
});

// Event handler: setup:cvDataDownload.
APP.on("setup:cvDataDownload", (data) => {
    // Update state.
    STATE.setVocabs(data.vocabs);

    // Fire event.
    APP.trigger("setup:cvDataParsed");
});

// Event handler: setup:cvDataParsed.
APP.on("setup:cvDataParsed", () => {
    var url, params;

    // Set target.
    url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.RETRIEVE;
    params = {
        uid: UTILS.getURLParam("uid")
    };

    // Download.
    $.get(url, params)
        .done((data) => {
            setTimeout(() => {
                APP.trigger("setup:issueDataDownload", data);
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        })
        .fail(() => {
            setTimeout(() => {
                APP.trigger("setup:issueDataDownload:error");
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        });
});

// Event handler: setup:issueDataDownload.
APP.on("setup:issueDataDownload", (data) => {
    // Update state.
    STATE.setIssue(data.issue);

    // Fire event.
    APP.trigger("setup:complete");
});
