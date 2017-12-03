// Event handler: setup:begin.
APP.on("setup:begin", () => {
    var url;

    // Set target.
    url = APP.constants.API_BASE_URL + APP.constants.URLS.PID_TASK_QUEUE_SEARCH_SETUP;

    // Download.
    $.get(url)
        .done((data) => {
            APP.trigger("setup:setupDataDownload", data);
        })
        .fail(() => {
            setTimeout(() => {
                APP.trigger("setup:setupDataDownload:error");
            }, APP.constants.uiUpdateDelay);
        });
});

// Event handler: setup:setupDataDownload.
APP.on("setup:setupDataDownload", (data) => {
    // Update state.
    APP.state.initFilters(data.vocabs);

    // Execute search.
    executeSearch(null, "setup:initialSearchDataDownload");
});

// Event handler: state:filterUpdate.
APP.on("state:filterUpdated", (filter) => {
    // Execute search.
    executeSearch("search:begin", "search:dataDownload");
});

// Event handler: state:filterUpdate.
APP.on("state:filterUpdate", (filterValue) => {
    APP.state.updateFilter(filterValue.split(':').slice(0, 3).join(':'), filterValue);
});

// Executes a search.
const executeSearch = (preEventType, eventType) => {
    var url, params;

    // Raise pre-event.
    if (_.isNull(preEventType) === false) {
        APP.trigger(preEventType);
    }

    // Set target.
    url = APP.constants.API_BASE_URL + APP.constants.URLS.PID_TASK_QUEUE_SEARCH;
    params = [];
    _.each(_.values(APP.state.filters), (f) => {
        if (f.data.current.key.endsWith('*') === false) {
            params.push(f.data.current.key);
        }
    });
    params = {
        criteria: params.join(",")
    };

    console.log(params);

    // Download.
    APP.trigger(eventType + "ing");
    $.get(url, params)
        .done((data) => {
            setTimeout(() => {
                APP.trigger(eventType, data);
            }, APP.constants.uiUpdateDelay);
        })
        .fail(() => {
            setTimeout(() => {
                APP.trigger(eventType + ":error");
            }, APP.constants.uiUpdateDelay);
        });
};

// Event handler: setup:initialSearchDataDownload.
APP.on("setup:initialSearchDataDownload", (data) => {
    // Update state.
    APP.state.searchData = data;

    // Fire events.
    APP.trigger("setup:complete");
});

// Event handler: search:dataDownload.
APP.on("search:dataDownload", (data) => {
    // Update state.
    APP.state.searchData = data;

    // Fire events.
    APP.trigger('state:pageUpdate');
    APP.trigger('search:complete');
});