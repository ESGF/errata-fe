// Module imports.
import * as APP         from  '../shared/application.js';
import * as UTILS       from  '../shared/utilities.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';
import * as VALIDATOR   from  './validator.js';


// Set of fields when creating a new issue.
const FIELD_SET_NEW = [
    'project',
    'title',
    'description',
    'severity',
    'urls',
    'materials',
    'datasets'
];

// Set of fields when editing an existing issue.
const FIELD_SET_UPDATE = [
    'description',
    'severity',
    'status',
    'urls',
    'materials',
    'datasets'
];

// Main module level view.
export default Backbone.View.extend({
    // Backbone: view event handlers.
    events: {
        // DOM Event handler: open home page.
        'click img.esdoc-logo': function (e) {
            UTILS.openHomepage();
        },

        // DOM Event handler: support :: open email.
        'click a.esdoc-support': function (e) {
            UTILS.openSupportEmail();
        },

        // DOM Event handler: open documentation.
        'click a.esdoc-docs': () => {
            UTILS.openDocumentation();
        },

        // DOM Event handler: save changes.
        'click button.esdoc-errata-save': function (e) {
            const fieldSet = STATE.issue.isNew ? FIELD_SET_NEW : FIELD_SET_UPDATE;
            if (STATE.isModerator) {
                fieldSet.push("moderation-status");
            }

            _.each(fieldSet, this.setFieldValue, this);

            if ($('.field-value').hasClass('has-error')) {
                APP.trigger("issue:save:invalidated");
            } else {
                APP.trigger("issue:save:start");
            }
        },

        // DOM Event handler: field change.
        'change .form-control': function (e) {
            this.setFieldValue($(e.target).attr("id"));
        }
    },

    // Backbone: view initializer.
    initialize: function () {
        APP.on("field:change:aborted", this._onFieldChange, this);
        APP.on("field:change:verified", this._onFieldChange, this);
        APP.on("issue:save:post:error", this._onSaveToServerError, this);
    },

    // Backbone: view renderer.
    render: function () {
        UTILS.renderTemplate("template-header", null, this);
        UTILS.renderTemplate("template-issue", null, this);

        return this;
    },

    // Updates the value of a field.
    setFieldValue: function (fieldID) {
        let fieldValue = $('#' + fieldID).val().trim();
        if (_.contains(["urls", "materials", "datasets"], fieldID)) {
            fieldValue = fieldValue.split("\n");
            fieldValue = _.map(fieldValue, (i) => {
                return i.trim();
            });
            fieldValue = _.uniq(fieldValue);
            fieldValue = _.filter(fieldValue, (i) => {
                return i.length > 0;
            });
        }

        APP.trigger("field:change", {
            id: fieldID,
            value: fieldValue
        });
    },

    // Event handler: field:change:aborted | field:change:verified.
    _onFieldChange: function (field) {
        if (field.err) {
            this.$("." + field.id).addClass('has-error');
            this.$("#" + field.id + "ErrorMessage").text(field.err);
        } else {
            this.$("." + field.id).removeClass('has-error');
            this.$("#" + field.id + "ErrorMessage").text("");
        }
    },

    // Event handler: issue:save:post:error.
    _onSaveToServerError: function ({ responseJSON: error }) {
        if (error.errorField) {
            this.$(".field-value ." + error.errorField).addClass('has-error');
            this.$("#" + error.errorField + "ErrorMessage").text(error.errorMessage);        
        }
        console.log(errorCode);
        console.log(errorField);
        console.log(errorMessage);
    }
});
