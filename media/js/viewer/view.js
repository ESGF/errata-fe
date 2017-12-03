// Main module level view.
APP.views.MainView = Backbone.View.extend({
    // Backbone: view event handlers.
    events: {
        // Open email: support.
        'click button.esdoc-support': () => {
            APP.utils.openSupportEmail();
        },

        // Open page: search.
        'click button.esdoc-errata-search': () => {
            APP.utils.openURL(APP.constants.URLS.SEARCH_PAGE, false);
        },

        // Open page: es-doc home.
        'click img.esdoc-logo': () => {
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
