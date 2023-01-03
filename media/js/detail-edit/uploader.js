// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';

// Event handler: errata:save:dispatch.
APP.on("errata:save:dispatch", () => {
    let url = CONSTANTS.URLS.API_BASE_URL;
    if (STATE.user.isAnonymous) {
        url += STATE.issue.isNew ? CONSTANTS.URLS.API_MODERATION_PROPOSE : CONSTANTS.URLS.API_PUBLICATION_UPDATE;
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
