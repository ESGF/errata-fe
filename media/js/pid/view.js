// --------------------------------------------------------
// search/view._.js - Main page view.
// --------------------------------------------------------
(function (APP, constants, _, $, Backbone, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    var isFirstGridRender = true;

    // Main module level view.
    APP.views.MainView = Backbone.View.extend({
        // Backbone: view event handlers.
        events: {
            // Open page: home.
            'click img.esdoc-logo': () => {
                APP.utils.openHomepage();
            },

            // Open email: support.
            'click button.esdoc-support': () => {
                APP.utils.openSupportEmail();
            },

            // Open page: search.
            'click button.esdoc-errata-search': () => {
                APP.utils.openURL(constants.URLS.SEARCH_PAGE, false);
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
                    APP.state.pids = [pid];
                } else {
                    APP.state.pids = [];
                }
            },

            'click #searchButton': (e) => {
                if (APP.state.pids.length) {
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
                    APP.utils.openURL(url, true);
                }
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
        }
    });

}(
    this.APP,
    this.APP.constants,
    this._,
    this.$,
    this.Backbone,
    this.window
));
