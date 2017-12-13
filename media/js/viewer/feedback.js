// Module imports.
import * as APP     from    '../shared/application.js';
import * as UTILS   from    '../shared/utilities.js';

// Event handler: setup begins.
APP.on("setup:begin", () => {
    UTILS.displayFeedback("Initializing errata viewer", APP.FULLTITLE, APP.VERSION);
});

// Event handler: setup complete.
APP.on("setup:complete", UTILS.hideFeedback);

// Event handler: setup error.
APP.on("setup:setupDataDownload:error", () => {
    alert("TODO: setup:setupDataDownload:error");
});