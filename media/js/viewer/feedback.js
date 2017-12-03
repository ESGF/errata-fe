// Event handler: setup begins.
APP.on("setup:begin", () => {
    APP.utils.displayFeedback("Initializing errata viewer");
});

// Event handler: setup complete.
APP.on("setup:complete", APP.utils.hideFeedback);

// Event handler: setup error.
APP.on("setup:setupDataDownload:error", () => {
    alert("TODO: setup:setupDataDownload:error");
});