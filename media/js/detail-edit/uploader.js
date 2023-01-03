// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';

// Event handler: errata:save:dispatch.
APP.on("errata:save:dispatch", () => {
    let url = CONSTANTS.URLS.API_BASE_URL;
    if (STATE.user.isAnonymous) {
        url += STATE.issue.isNew ? CONSTANTS.URLS.API_PUBLICATION_PROPOSE : CONSTANTS.URLS.API_PUBLICATION_UPDATE;
    } else {
        url += STATE.issue.isNew ? CONSTANTS.URLS.API_PUBLICATION_CREATE : CONSTANTS.URLS.API_PUBLICATION_UPDATE;
    }

    APP.trigger("errata:save:dispatch:starts");

    $.ajax({
        method: "POST",
        url: url,
        data: STATE.issue.encode(),
        dataType: 'json',
        headers: {
            "Authorization": STATE.user.oauthCredentials,
            "Content-Type": 'application/json; charset=UTF-8',
            "X-XSRFToken": Cookies.get('_xsrf')
        }
    })
        .always((r) => {
            if (r.status === 200) {
                APP.trigger("errata:save:dispatch:success");
            } else {
                APP.trigger("errata:save:dispatch:error", r);
            }
    });
});

// Event handler: errata:moderate:accept.
APP.on("errata:moderate:accept", () => {
    dispatchModerationStatusUpdate("accepted");
});

// Event handler: errata:moderate:reject.
APP.on("errata:moderate:reject", () => {
    dispatchModerationStatusUpdate("rejected");
});

// Event handler: errata:moderate:review.
APP.on("errata:moderate:review", () => {
    dispatchModerationStatusUpdate("in-review");
});

// Dispatches a moderation status update.
const dispatchModerationStatusUpdate = (moderationStatus) => {
    let url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.API_PUBLICATION_MODERATE;

    APP.trigger("errata:moderate:status-update:starts");

    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify({
            uid: STATE.issue.uid,
            moderationStatus: moderationStatus
        }),
        dataType: 'json',
        headers: {
            "Authorization": STATE.user.oauthCredentials,
            "Content-Type": 'application/json; charset=UTF-8',
            "X-XSRFToken": Cookies.get('_xsrf')
        }
    })
        .always((r) => {
            if (r.status === 200) {
                APP.trigger("errata:moderate:status-update:success", moderationStatus);
            } else {
                APP.trigger("errata:moderate:status-update:error", r);
            }
    });
};
