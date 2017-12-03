// Event handler: setup complete.
APP.events.on("setup:complete", () => {
    // Render main view.
    APP.view = new APP.View();
    APP.view.render();

    // Update DOM.
    $("body").append(APP.view.el);
    APP.log("ui initialized");

    // Fire events.
    APP.trigger("ui:initialized");
});
