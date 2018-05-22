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

        // Save changes.
        'click button.esdoc-errata-save': () => {
            if (STATE.issue.hasChanged) {
                APP.trigger("issue:save");
            }
        },

        'change #issueDatasets': function (e) {
            STATE.issue.datasets = _.uniq(_.map(this.$('#issueDatasets').val().split('\n'), (i) => {
                return i.trim();
            }));
        },

        'change #issueDescription': function (e) {
            STATE.issue.description = this.$('#issueDescription').val();
        },

        'change #issueMaterials': function (e) {
            STATE.issue.materials = _.uniq(_.map(this.$('#issueMaterials').val().split('\n'), (i) => {
                return i.trim();
            }));
        },

        'change #issueProject': function (e) {
            const project = this.$('#issueProject').val();
            if (project !== "null") {
                STATE.issue.project = project;
            }
        },

        'change #issueSeverity': function (e) {
            STATE.issue.severity = this.$('#issueSeverity').val();
        },

        'change #issueStatus': function (e) {
            STATE.issue.status = this.$('#issueStatus').val();
        },

        'change #issueTitle': function (e) {
            STATE.issue.title = this.$('#issueTitle').val();
        }
    },

    // Backbone: view renderer.
    render: function () {
        UTILS.renderTemplate("template-header", null, this);
        UTILS.renderTemplate("template-issue", null, this);

        return this;
    }
});
