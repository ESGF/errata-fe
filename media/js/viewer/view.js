// --------------------------------------------------------
// search/view._.js - Main page view.
// --------------------------------------------------------
(function (APP, paging, sorting, _, $, Backbone, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

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
            }
        },

        // Backbone: view renderer.
        render: function () {
            _.each([
                "template-header",
                "template-issue"
                ], function (template) {
                APP.utils.renderTemplate(template, APP.state, this);
            }, this);

            return this;
        }
    });

}(
    this.APP,
    this.APP.state.paging,
    this.APP.state.sorting,
    this._,
    this.$,
    this.Backbone,
    this.window
));
