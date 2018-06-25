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
            if (STATE.hasChanged) {
                APP.trigger("issue:save");
            } else {
                APP.trigger("issue:save:unrequired");
            }
        },

        'change #project, #title, #description, #severity, #status': function (e) {
            APP.trigger("field:change", {
                name: $(e.target).attr("id"),
                value: $(e.target).val().trim()
            });
        },

        'change #materials, #datasets': function (e) {
            APP.trigger("field:change", {
                name: $(e.target).attr("id"),
                value: _.filter(_.uniq(_.map($(e.target).val().split(','), (i) => {
                    return i.trim();
                })), (i) => {
                    return i.length > 0;
                })
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
        this.$("." + field.name).addClass('has-error');
        this.$("#" + field.name + "ErrorMessage").text(field.err);
    },

    // Event handler: field:change:verified.
    _onFieldChangeVerified: function (field) {
        this.$("." + field.name).removeClass('has-error');
        this.$("#" + field.name + "ErrorMessage").text("");
    },

    // Validates form field.
    isValid: function (fieldName, fieldValue) {
        const err = VALIDATOR.apply(fieldName, fieldValue);
        const fieldErrorElement = "#" + fieldName + "ErrorMessage";

        // Invalid field: apply error styling.
        if (err && err[fieldName]) {
            this.$("." + fieldName).addClass('has-error');
            this.$(fieldErrorElement).text(err[fieldName][0]);
            this.$(fieldErrorElement).val(err[fieldName][0]);
            return false;

        // Valid field: apply error styling.
        } else {
            this.$("." + fieldName).removeClass('has-error');
            this.$(fieldErrorElement).text("");
            return true;
        }
    }
});
