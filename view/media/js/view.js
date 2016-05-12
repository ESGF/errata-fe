// --------------------------------------------------------
// search/view._.js - Main page view.
// --------------------------------------------------------
(function (APP, _, $, Backbone, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Main module level view.
    APP.views.MainView = Backbone.View.extend({
        // Backbone: view event handlers.
        events: {
            'click button.esdoc-support': function () {
                APP.utils.openSupportEmail();
            },

            'click img.esdoc-logo': function () {
                alert(123);
            },

            // Open errata detail page.
            'click .issue': function (e) {
                this._openDetailPage($(e.target).parent().attr("id") ||
                                     $(e.target).parent().parent().attr("id"));
            },
        },

        // Backbone: view initializer.
        initialize: function () {
            APP.events.on("state:issueListUpdate", this._updateStatisticsInfo, this);
            APP.events.on("state:issueListUpdate", this._updateGrid, this);
        },

        // Backbone: view renderer.
        render: function () {
            var viewData;

            viewData = {
                APP: APP,
                issues: APP.state.searchData.results
            };

            _.each([
                "template-page-header",
                "template-filter-panel",
                "template-grid"], function (template) {
                APP.utils.renderTemplate(template, viewData, this);
            }, this);

            return this;
        },

        // Updates results grid.
        _updateGrid: function () {
            this._replaceNode('tbody', 'grid-body-template', APP.state);
        },

        // Utility function to replace a page DOM node.
        _replaceNode: function (nodeSelector, template, templateData) {
            this.$(nodeSelector).replaceWith(APP.utils.renderTemplate(template, templateData));
        },

        // Open errata detail page.
        _openDetailPage: function (uid) {
            var url;

            url = window.location.href.replace("search", "view");
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
