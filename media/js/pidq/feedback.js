// Event handler: setup begins.
APP.on("setup:begin", () => {
    APP.utils.displayFeedback("Initializing errata search");
});

// Event handler: setup complete.
APP.on("setup:complete", APP.utils.hideFeedback);

// Event handler: setup error.
APP.on("setup:setupDataDownload:error", () => {
    alert("setup:setupDataDownload:error");
});

// Event handler: search begins.
APP.on("search:begin", () => {
    APP.utils.displayFeedback("Searching errata repository");
});

// Event handler: search complete.
APP.on("search:complete", APP.utils.hideFeedback);

// Event handler: search error.
APP.on("search:dataDownload:error", () => {
    alert("search:dataDownload:error");
});