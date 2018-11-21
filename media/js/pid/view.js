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

        // Open documentation.
        'click button.esdoc-docs': () => {
            UTILS.openDocumentation();
        },

        'change .btn-file :file': (e) => {
            var file, reader;

            file = $("#file-selector")[0].files[0];
            reader = new FileReader();
            reader.onload = function (e) {
                if (e.target.result.trim()) {
                    APP.trigger("ui:pidFileSelected", {
                        file: file,
                        pids: e.target.result.trim().split("\n")
                    });
                }
            };
            reader.readAsText(file);
        },

        'change #pid-data': (e) => {
            var pid;
            pid = $(e.target).val().trim();
            if (pid) {
                STATE.setPIDs([pid]);
            } else {
                STATE.setPIDs([]);
            }
        },

        'click #searchButton': (e) => {
            if (STATE.pids.length) {
                APP.trigger('ui:search');
            }
        },

        // Open page: errata detail.
        'click #issueButton': (e) => {
            var uid, url;

            uid = $(e.target).attr("title");
            if (uid) {
                url = window.location.href.replace("pid", "viewer");
                url += "?uid=";
                url += uid;
                UTILS.openURL(url, true);
            }
        }
    },

    // Backbone: view initializer.
    initialize: function () {
        APP.events.on("ui:pidFileSelected", this._setPIDList, this);
        APP.events.on("search:complete", this._updateGrid, this);
        this.isFirstGridRender = true;
    },

    // Backbone: view renderer.
    render: function () {
        _.each([
            "template-header",
            "template-filter"
            ], function (template) {
            UTILS.renderTemplate(template, APP, this);
        }, this);

        return this;
    },

    // Utility function to replace a page DOM node.
    _replaceNode: function (nodeSelector, template) {
        this.$(nodeSelector).replaceWith(UTILS.renderTemplate(template, STATE));
    },

    _setPIDList: function (data) {
        // Update state.
        STATE.setPIDs(data.pids);

        // Update UI.
        $("#pid-data").val("file://" + data.file.name);
    },

    _updateGrid: function () {
        if (!this.isFirstGridRender) {
            this.$('table').remove();
        }
        UTILS.renderTemplate("template-grid", APP, this);
        this.isFirstGridRender = false;
    }
});

// Expose to presentation layer.
window.APP = APP;
window.STATE = STATE;
window.UTILS = UTILS;
window.CONSTANTS = CONSTANTS;
