import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';

// Event handler: errata:save:dispatch.
APP.on("errata:save:dispatch", () => {
    const eventNamespace = "errata:save:dispatch";
    const payload = STATE.issue.encode();
    let url = CONSTANTS.URLS.API_BASE_URL;
    if (STATE.user.isAnonymous) {
        url += STATE.issue.isNew ? CONSTANTS.URLS.API_PUBLICATION_PROPOSE : CONSTANTS.URLS.API_PUBLICATION_UPDATE;
    } else {
        url += STATE.issue.isNew ? CONSTANTS.URLS.API_PUBLICATION_CREATE : CONSTANTS.URLS.API_PUBLICATION_UPDATE;
    }

    dispatchPost(url, payload, eventNamespace);
});

// Event handler: errata:moderate:accept.
APP.on("errata:moderate", (moderationStatus) => {
    const eventNamespace = "errata:moderate:dispatch";
    const payload = {
        uid: STATE.issue.uid,
        moderationStatus: moderationStatus
    };
    const url = CONSTANTS.URLS.API_BASE_URL + CONSTANTS.URLS.API_PUBLICATION_MODERATE;

    dispatchPost(url, payload, eventNamespace);
});

// Utility fn: Dispatches an HTTP POST to API server.
const dispatchPost = (url, payload, eventNamespace) => {
    APP.trigger(`${eventNamespace}:starts`);

    let headers = {
        "Content-Type": 'application/json; charset=UTF-8'
    };
    if (STATE.user.isAnonymous === false) {
        headers = {            
            "Authorization": STATE.user.oauthCredentials,
            "X-XSRFToken": Cookies.get('_xsrf'),
            ...headers
        };
    }

    $.ajax({
        method: "POST",
        url: url,
        data: JSON.stringify(payload),
        dataType: 'json',
        headers: headers
    })
        .always((r) => {
            if (r.status === 200) {
                APP.trigger(`${eventNamespace}:success`, payload);
            } else {
                APP.trigger(`${eventNamespace}:error`, r);
            }
    });
};
