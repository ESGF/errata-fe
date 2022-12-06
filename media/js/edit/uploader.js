// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';

// Event handler: issue:save:post.
APP.on("issue:save:post", () => {
    const url = CONSTANTS.URLS.API_BASE_URL +
                (STATE.issue.isNew ? CONSTANTS.URLS.ISSUE_CREATE : CONSTANTS.URLS.ISSUE_UPDATE);

    APP.trigger("issue:save:post:starts");

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
                APP.trigger("issue:save:post:error", r);
            }
    });
});

// Event handler: issue:moderation:accept.
APP.on("issue:moderation:accept", () => {
    const url = `${CONSTANTS.URLS.API_BASE_URL}${CONSTANTS.URLS.MODERATION_ACCEPT}?uid=${STATE.issue.uid}`;

    APP.trigger("issue:moderation:accept:starts");

    $.ajax({
        method: "POST",
        url: url,
        data: {},
        dataType: 'json',
        headers: {
            "Authorization": STATE.OAuthCredentials,
            "Content-Type": 'application/json; charset=UTF-8',
            "X-XSRFToken": Cookies.get('_xsrf')
        }
    })
        .always((r) => {
            if (r.status === 200) {
                APP.trigger("issue:moderation:accept:success");
            } else {
                APP.trigger("issue:moderation:accept:error", r);
            }
    });
});

// Event handler: issue:moderation:extend.
APP.on("issue:moderation:extend", () => {
    const url = `${CONSTANTS.URLS.API_BASE_URL}${CONSTANTS.URLS.MODERATION_EXTEND}?uid=${STATE.issue.uid}`;

    APP.trigger("issue:moderation:extend:starts");

    $.ajax({
        method: "POST",
        url: url,
        data: {},
        dataType: 'json',
        headers: {
            "Authorization": STATE.OAuthCredentials,
            "Content-Type": 'application/json; charset=UTF-8',
            "X-XSRFToken": Cookies.get('_xsrf')
        }
    })
        .always((r) => {
            if (r.status === 200) {
                APP.trigger("issue:moderation:extend:success");
            } else {
                APP.trigger("issue:moderation:extend:error", r);
            }
    });
});

// Event handler: issue:moderation:reject.
APP.on("issue:moderation:reject", () => {
    const url = `${CONSTANTS.URLS.API_BASE_URL}${CONSTANTS.URLS.MODERATION_REJECT}?uid=${STATE.issue.uid}`;

    APP.trigger("issue:moderation:reject:starts");

    $.ajax({
        method: "POST",
        url: url,
        data: {},
        dataType: 'json',
        headers: {
            "Authorization": STATE.OAuthCredentials,
            "Content-Type": 'application/json; charset=UTF-8',
            "X-XSRFToken": Cookies.get('_xsrf')
        }
    })
        .always((r) => {
            if (r.status === 200) {
                APP.trigger("issue:moderation:reject:success");
            } else {
                APP.trigger("issue:moderation:reject:error", r);
            }
    });
});
