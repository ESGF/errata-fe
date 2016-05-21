// --------------------------------------------------------
// search/view.renderer.js - Main page view renderer.
// --------------------------------------------------------
(function (APP, $) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup complete.
    APP.events.on("setup:complete", function () {

        // Render main view.
        APP.view = new APP.views.MainView();
        APP.view.render();

        // Update DOM.
        $("body").append(APP.view.el);
        APP.log("ui initialized");

        // Fire events.
        APP.events.trigger("ui:initialized");
    });

}(
    this.APP,
    this.$jq
));
