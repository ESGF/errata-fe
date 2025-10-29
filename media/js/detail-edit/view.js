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
            _.each(fieldSet, this.setFieldValue, this);

            if ($('.field-value').hasClass('has-error')) {
                APP.trigger("errata:save:invalidated");
            } else {
                APP.trigger("errata:save:start");
            }
        },

        // DOM Event handler: moderation accept.
        'click a.esdoc-moderate-accept': function (e) {
            APP.trigger("errata:moderate", CONSTANTS.ISSUE.MODERATION_STATUS_ACCEPTED);
        },

        // DOM Event handler: moderation review.
        'click a.esdoc-moderate-review': function (e) {
            APP.trigger("errata:moderate", CONSTANTS.ISSUE.MODERATION_STATUS_IN_REVIEW);
        },

        // DOM Event handler: moderation reject.
        'click a.esdoc-moderate-reject': function (e) {
            APP.trigger("errata:moderate", CONSTANTS.ISSUE.MODERATION_STATUS_REJECTED);
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
        APP.on("errata:save:dispatch:error", this._onSaveToServerError, this);
        APP.on("errata:moderate:dispatch:success", this._onModerationStatusChange, this);
    },

    // Backbone: view renderer.
    render: function () {
        UTILS.renderTemplate("template-header", null, this);
        UTILS.renderTemplate("template-issue", null, this);
        this.setPageTitle();

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

    // Updates page title.
    setPageTitle: function () {
        let title = "ESGF - Errata - ";
        if (STATE.issue.isNew) {
            if (STATE.user.isAuthenticated) {
                title += "Create Issue";
            } else {
                title += "Propose Issue";
            }
        } else {
            title += "Edit Issue";
        }
        $(document).prop('title', title);
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

    // Event handler: errata:moderate:dispatch:success.
    _onModerationStatusChange: function ({ moderationStatus: newStatus }) {
        $("#moderationStatus").val(newStatus.toUpperCase());
    },

    // Event handler: errata:save:dispatch:error.
    _onSaveToServerError: function ({ responseJSON: error }) {
        if (error.errorField) {
            this.$(".field-value ." + error.errorField).addClass('has-error');
            this.$("#" + error.errorField + "ErrorMessage").text(error.errorMessage);        
        }
    }
});
