// Module imports.
import * as APP from '../shared/application.js';
import * as UTILS from '../shared/utilities.js';
import * as CONSTANTS from '../shared/constants.js';
import * as STATE from './state.js';
import View from './view.js';
import './downloader.js';
import './feedback.js';
import './uploader.js';
import './validator.js';

// Event handler: document ready.
$(document).ready(() => {
    PYESSV.initialise(() => {
        APP.trigger("setup:begin");
    });
});

// Event handler: setup complete.
APP.on("setup:complete", () => {
	var view;

    // // Render main view.
    var view = new View();
    view.render();

    // // Update DOM.
    $("body").append(view.el);

    // Fire events.
    APP.trigger("ui:initialized");
});

APP.on('errata:save:complete', () => {
    let url = CONSTANTS.URLS.PAGE_VIEW;
    url += '?uid=';
    url += STATE.issue.uid;
    UTILS.openURL(url);
});

APP.on('errata:moderation:complete', () => {
    let url = CONSTANTS.URLS.PAGE_EDIT;
    url += '?uid=';
    url += STATE.issue.uid;
    UTILS.openURL(url);
});

// Expose to presentation layer.
window.APP = APP;
window.CONSTANTS = CONSTANTS;
window.STATE = STATE;
window.UTILS = UTILS;
