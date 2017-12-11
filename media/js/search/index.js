// Module imports.
import * as APP 	from 	'../shared/application.js';
import './downloader.js';
import './feedback.js';
import View from './view.js';

// Event handler: document ready.
$(document).ready(() => {
    APP.trigger("setup:begin");
});

// Event handler: setup complete.
APP.events.on("setup:complete", () => {
	var view;

    // Render main view.
    var view = new View();
    view.render();

    // Update DOM.
    $("body").append(view.el);
    APP.log("ui initialized");

    // Fire events.
    APP.trigger("ui:initialized");
});
