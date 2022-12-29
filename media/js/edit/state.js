// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import { Issue, User } from "./model.js";

// Issue.
export const issue = new Issue();

// User.
export const user = new User();

// Event handler: field:change:aborted.
APP.on("field:change:aborted", (field) => {
    const slot = getIssueSlotFromViewField(field.id);

    issue[slot] = _.isArray(field.value) ? [] : null;
});

// Event handler: field:change:verified.
APP.on("field:change:verified", (field) => {
    const slot = getIssueSlotFromViewField(field);

    issue[slot] = field.value;
});

// Event handler: issue:save.
APP.on("issue:save:start", () => {
    if (issue.hasChanged) {
        APP.trigger("issue:save:post");
    } else {
        APP.trigger("issue:save:abort");
    }
});

// Utility fn: returns issue slot identifier from view field identifier.
const getIssueSlotFromViewField = (field) => {
    if (field.id === "moderation-status") {
        return "moderationStatus";
    } else {
        return field.id;
    }
};
