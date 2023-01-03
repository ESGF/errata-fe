import * as APP from '../shared/application.js';
import * as CONSTANTS from '../shared/constants.js';
import * as STATE from './state.js';
import * as UTILS from '../shared/utilities.js';


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
APP.on("errata:save:invalidated", () => {
    UTILS.displayInfoDialog("Errata is invalid - please correct errors & try again.");
});

// Event handler: issue save postback.
APP.on("errata:save:dispatch:starts", () => {
    UTILS.displayFeedback("Saving errata details");
});

// Event handler: issue save success.
APP.on("errata:save:dispatch:success", () => {
    UTILS.hideFeedback();
    let msg = "Errata details have been successfully saved.";
    if (STATE.user.isAnonymous) {
        msg += "  A system moderator will review the details and contact you in due course."
    }
    UTILS.displayInfoDialog(msg, () => {
        APP.trigger("errata:save:complete");
    });
});

// Event handler: errata save error reported by server.
APP.on("errata:save:dispatch:error", (response) => {
    UTILS.hideFeedback();
    if (response && response.responseJSON && response.responseJSON.errorCode) {
        UTILS.displayInfoDialog(`Errata is invalid - ${response.responseJSON.errorMessage}.`);
    } else {
        UTILS.displayInfoDialog("An error occurred whilst saving the errata details - please try again.  If the problem persists then contact support.");
    }
});

APP.on("errata:moderate:status-update:starts", () => {
    UTILS.displayFeedback("Saving errata moderation status");
});

APP.on("errata:moderate:status-update:error", () => {
    UTILS.hideFeedback();
    UTILS.displayInfoDialog("An error occurred whilst saving the errata moderation status - please try again.  If the problem persists then contact support.");
});

APP.on("errata:moderate:status-update:success", () => {
    UTILS.hideFeedback();
    UTILS.displayInfoDialog("Moderation status has been sucessfully updated.", () => {
        APP.trigger("errata:moderate:status-update:complete");
    });
});
