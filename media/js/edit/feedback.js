// Module imports.
import * as APP     from    '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as UTILS   from    '../shared/utilities.js';

// Event handler: setup begins.
APP.on("setup:begin", () => {
    UTILS.displayFeedback("Initializing errata editor");
});

// Event handler: setup complete.
APP.on("setup:complete", () => {
    setTimeout(() => {
        UTILS.hideFeedback();
    }, CONSTANTS.MISC.UI_UPDATE_DELAY);
});

// Event handler: setup error.
APP.on("setup:setupDataDownload:error", () => {
    alert("TODO: setup:setupDataDownload:error");
});

// Event handler: issue state is invalid.
APP.on("issue:save:invalidated", () => {
    UTILS.displayInfoDialog("Issue is invalid - please correct errors & try again.");
});

// Event handler: issue save postback.
APP.on("issue:save:post:starts", () => {
    UTILS.displayFeedback("Saving issue details");
});

// Event handler: issue save success.
APP.on("issue:save:post:success", () => {
    UTILS.hideFeedback();
    UTILS.displayInfoDialog("Issue details have been successfully saved.", () => {
        APP.trigger("issue:save:complete");
    });
});

// Event handler: issue save begins.
APP.on("issue:save:post:error", (serverErrors) => {
    UTILS.hideFeedback();
    UTILS.displayInfoDialog("An error occurred whilst saving the issue details - please try again.  If the problem persists then contact support.");
});
