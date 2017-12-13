// Module imports.
import * as APP     from    '../shared/application.js';
import * as UTILS   from    '../shared/utilities.js';

// Event handler: setup begins.
APP.on("setup:begin", () => {
    UTILS.displayFeedback("Initializing errata PID Lookup");
});

// Event handler: setup complete.
APP.on("setup:complete", UTILS.hideFeedback);

// Event handler: setup error.
APP.on("setup:setupDataDownload:error", () => {
    alert("setup:setupDataDownload:error");
});

// Event handler: search begins.
APP.on("search:begin", () => {
    UTILS.displayFeedback("Searching PID handle service");
});

// Event handler: search complete.
APP.on("search:complete", UTILS.hideFeedback);

// Event handler: search error.
APP.on("search:dataDownload:error", () => {
    alert("An error occurred whilst calling the PID handle service");
});