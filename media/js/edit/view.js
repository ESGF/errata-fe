// Module imports.
import * as APP         from  '../shared/application.js';
import * as UTILS       from  '../shared/utilities.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';
import * as VALIDATOR   from  './validator.js';


// Main module level view.
export default Backbone.View.extend({
    // Backbone: view event handlers.
    events: {
        // DOM Event handler: open home page.
        'click img.esdoc-logo': () => {
            UTILS.openHomepage();
        },

        // DOM Event handler: open email support.
        'click button.esdoc-support': () => {
            UTILS.openSupportEmail();
        },

        // DOM Event handler: save changes.
        'click button.esdoc-errata-save': () => {
            if (STATE.hasChanged) {
                APP.trigger("issue:save");
            } else {
                APP.trigger("issue:save:unrequired");
            }
        },

        // DOM Event handler: field change.
        'change #project, #title, #description, #severity, #status, #materials, #datasets': function (e) {
            const fieldID = $(e.target).attr("id");
            let fieldValue = $(e.target).val().trim();
            if (_.contains(["materials", "datasets"], fieldID)) {
                fieldValue = _.filter(_.uniq(_.map(fieldValue.split(','), (i) => {
                    return i.trim();
                })), (i) => {
                    return i.length > 0;
                })
            }
            APP.trigger("field:change", {
                id: fieldID,
                name: fieldID,
                value: fieldValue
            });
        }
    },

    // Backbone: view initializer.
    initialize: function () {
        APP.on("field:change:aborted", this._onFieldChangeAborted, this);
        APP.on("field:change:verified", this._onFieldChangeVerified, this);
    },

    // Backbone: view renderer.
    render: function () {
        UTILS.renderTemplate("template-header", null, this);
        UTILS.renderTemplate("template-issue", null, this);

        return this;
    },

    // Event handler: field:change:aborted.
    _onFieldChangeAborted: function (field) {
        this.$("." + field.id).addClass('has-error');
        this.$("#" + field.id + "ErrorMessage").text(field.err);
    },

    // Event handler: field:change:verified.
    _onFieldChangeVerified: function (field) {
        this.$("." + field.id).removeClass('has-error');
        this.$("#" + field.id + "ErrorMessage").text("");
    }
});
