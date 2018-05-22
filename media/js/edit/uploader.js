// Module imports.
import * as APP         from  '../shared/application.js';
import * as STATE       from  './state.js';

// Event handler: setup:cvDataParsed.
APP.on("issue:save:confirmed", () => {
    const url = CONSTANTS.URLS.API_BASE_URL +
                (STATE.issue.isNew ? CONSTANTS.URLS.ISSUE_CREATE : CONSTANTS.URLS.ISSUE_UPDATE);
    APP.trigger("issue:save:posting");
    $.ajax({
        method: "POST",
        url: url,
        data: STATE.issue.encode(),
        dataType: 'json',
        headers: {
            "Authorization": STATE.OAuthCredentials,
            "Content-Type": 'application/json; charset=UTF-8',
            "X-XSRFToken": Cookies.get('_xsrf')
        }
    })
        .always((r) => {
            if (r.status === 200) {
                APP.trigger("issue:save:post:success");
            } else {
                APP.trigger("issue:save:error", r);
            }
    });
});
