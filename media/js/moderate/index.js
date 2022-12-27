// Module imports.
import * as APP from '../shared/application.js';
import * as UTILS from '../shared/utilities.js';
import * as CONSTANTS from '../shared/constants.js';
import * as STATE from './state.js';
import View from './view.js';
import './downloader.js';
import './feedback.js';

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

    // Fire events.
    APP.trigger("ui:initialized");
});

// Expose to presentation layer.
window.APP = APP;
window.STATE = STATE;
window.UTILS = UTILS;
window.CONSTANTS = CONSTANTS;
