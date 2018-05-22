// Module imports.
import * as APP         from  '../shared/application.js';
import * as UTILS       from  '../shared/utilities.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';

// Main module level view.
export default Backbone.View.extend({
    // Backbone: view event handlers.
    events: {
        // Open page: home.
        'click img.esdoc-logo': () => {
            UTILS.openHomepage();
        },

        // Open email: support.
        'click button.esdoc-support': () => {
            UTILS.openSupportEmail();
        },

        // Open email: support.
        'click button.esdoc-errata-edit': () => {
            var url;

            url = CONSTANTS.URLS.EDIT_PAGE;
            url += "?uid=";
            url += STATE.issueUID;
            UTILS.openURL(url, false);
        }
    },

    // Backbone: view renderer.
    render: function () {
        _.each([
            "template-header",
            "template-issue"
            ], (template) => {
            UTILS.renderTemplate(template, null, this);
        }, this);

        return this;
    }
});
