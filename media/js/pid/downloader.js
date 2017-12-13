// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as UTILS       from    '../shared/utilities.js';
import * as STATE       from  './state.js';

// Event handler: search initiated from ui.
APP.on("ui:search", () => {
    var url, params;

    // Trigger event.
    APP.trigger("search:begin");

    // Set web-service endpoint url + params.
    url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.PID_RESOLVE;
    params = {
        pids: STATE.pids.join(",")
    };

    // Invoke web-service endpoint.
    APP.trigger("search:dataDownloading");
    $.get(url, params)
        .done((data) => {
            setTimeout(() => {
                APP.trigger("search:dataDownload", data);
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        })
        .fail((data) => {
            setTimeout(() => {
                APP.trigger("search:dataDownload:error", data);
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        });
});


// Event handler: search:dataDownload.
APP.on("search:dataDownload", (data) => {
    // Cache incoming data as mapped javascript objects.
    STATE.setErrata(data.errata);


    // Trigger application event.
    APP.trigger('search:complete');
});

