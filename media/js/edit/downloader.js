// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as UTILS       from  '../shared/utilities.js';
import * as STATE       from  './state.js';

// Event handler: setup:cvDataParsed.
APP.on("setup:begin", () => {
    var url, params;

    // Skip if user is creating an issue.
    if (STATE.issue.isNew) {
        APP.trigger("setup:complete");
        return;
    }

    // Set target.
    url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.API_PUBLICATION_RETRIEVE;
    params = {
        uid: STATE.issue.uid
    };

    // Download.
    $.get(url, params)
        .done((data) => {
            setTimeout(() => {
                APP.trigger("setup:issueDownload", data);
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        })
        .fail(() => {
            setTimeout(() => {
                APP.trigger("setup:issueDownload:error");
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        });
});

// Event handler: setup:issueDownload.
APP.on("setup:issueDownload", (data) => {
    // Update state.
    STATE.issue.decode(data.issue);

    // Fire event.
    APP.trigger("setup:complete");
});

// Event handler: setup:issueDownload:error.
APP.on("setup:issueDownload:error", (data) => {
    alert('TODO: handle issue download error');
});
