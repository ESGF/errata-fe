// --------------------------------------------------------
// search/view._.js - Main page view.
// --------------------------------------------------------
(function (APP, _, $, Backbone, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var isFirstGridRender = true;

    // Main module level view.
    APP.views.MainView = Backbone.View.extend({
        // Backbone: view event handlers.
        events: {
            // Open email: support.
            'click button.esdoc-support': function () {
                APP.utils.openSupportEmail();
            },

            // Open page: home.
            'click img.esdoc-logo': function () {
                APP.utils.openHomepage();
            },

            'change .btn-file :file': function (e) {
                var file, reader;

                file = $("#file-selector")[0].files[0];
                reader = new FileReader();
                reader.onload = function (e) {
                    if (e.target.result.trim()) {
                        APP.events.trigger("ui:pidFileSelected", {
                            file: file,
                            pids: e.target.result.trim().split("\n")
                        });
                    }
                };
                reader.readAsText(file);
            },

            'change #pid-data': function (e) {
                var pid;
                pid = $(e.target).val().trim();
                if (pid) {
                    APP.state.pids = [pid];
                } else {
                    APP.state.pids = [];
                }
            },

            'click #searchButton': function (e) {
                if (APP.state.pids.length) {
                    APP.events.trigger('ui:search');
                }
            },

            // Open page: errata detail.
            'click .issue-link': function (e) {
                this._openIssueDetailPage($(e.target).parent().parent().attr("id"));
            }
        },

        // Backbone: view initializer.
        initialize: function () {
            APP.events.on("ui:pidFileSelected", this._setPIDList, this);
            APP.events.on("search:complete", this._updateGrid, this);
        },

        // Backbone: view renderer.
        render: function () {
            _.each([
                "template-header",
                "template-filter"
                ], function (template) {
                APP.utils.renderTemplate(template, APP, this);
            }, this);

            return this;
        },

        // Utility function to replace a page DOM node.
        _replaceNode: function (nodeSelector, template) {
            this.$(nodeSelector).replaceWith(APP.utils.renderTemplate(template, APP.state));
        },

        _setPIDList: function (data) {
            // Update state.
            APP.state.pids = data.pids;

            // Update UI.
            $("#pid-data").val("file://" + data.file.name);
        },

        _updateGrid: function () {
            if (!isFirstGridRender) {
                this.$('table').remove();
            }
            APP.utils.renderTemplate("template-grid", APP, this);
            isFirstGridRender = false;
        },

        _openIssueDetailPage: function (uid) {
            var url;

            if (!uid) {
                return;
            }

            url = window.location.href.replace("pid", "viewer");
            url += "?uid=";
            url += uid;
            APP.utils.openURL(url, true);
        }
    });

}(
    this.APP,
    this._,
    this.$,
    this.Backbone,
    this.window
));
