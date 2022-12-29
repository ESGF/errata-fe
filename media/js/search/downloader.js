// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';

// Event handler: setup:begin.
APP.on("setup:begin", () => {
    var url;

    // Set target.
    url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.API_SEARCH_SETUP;

    // Download.
    $.get(url)
        .done((data) => {
            APP.trigger("setup:setupDataDownload", data);
        })
        .fail(() => {
            setTimeout(() => {
                APP.trigger("setup:setupDataDownload:error");
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        });
});

// Event handler: setup:setupDataDownload.
APP.on("setup:setupDataDownload", (data) => {
    // Update state.
    STATE.initFilters(data.vocabs);

    // Execute search.
    executeSearch(null, "setup:initialSearchDataDownload");
});

// Event handler: state:filterUpdate.
APP.on("state:filterUpdated", (filter) => {
    // Execute search.
    executeSearch("search:begin", "search:dataDownload");

    // Raise project change event (when relevant).
    if (filter.key === 'esdoc:errata:project') {
        APP.trigger("project:changed");
    }
});

// Event handler: state:filterUpdate.
APP.on("state:filterUpdate", (filterValue) => {
    STATE.updateFilter(filterValue.split(':').slice(0, 3).join(':'), filterValue);
});

// Event handler: setup:initialSearchDataDownload.
APP.on("setup:initialSearchDataDownload", (data) => {
    // Update state.
    STATE.setSearchData(data);

    // Fire events.
    APP.trigger("setup:complete");
});

// Event handler: search:dataDownload.
APP.on("search:dataDownload", (data) => {
    // Update state.
    STATE.setSearchData(data);

    // Fire events.
    APP.trigger('state:pageUpdate');
    APP.trigger('search:complete');
});

// Executes a search.
const executeSearch = (preEventType, eventType) => {
    var url, params;

    // Raise pre-event.
    if (_.isNull(preEventType) === false) {
        APP.trigger(preEventType);
    }

    // Set target.
    url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.API_SEARCH;
    params = [];
    _.each(_.values(STATE.getActiveFilters()), (f) => {
        if (f.data.current.key.endsWith('*') === false) {
            params.push(f.data.current.key);
        }
    });
    params = {
        criteria: params.join(",")
    };

    // Download.
    APP.trigger(eventType + "ing");
    $.get(url, params)
        .done((data) => {
            setTimeout(() => {
                APP.trigger(eventType, data);
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        })
        .fail(() => {
            setTimeout(() => {
                APP.trigger(eventType + ":error");
            }, CONSTANTS.MISC.UI_UPDATE_DELAY);
        });
};
