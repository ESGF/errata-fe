// Copyright year.
export const COPYRIGHT_YEAR = new Date().getFullYear();

// Full title.
export const FULLTITLE = "ES-DOC Dataset Errata";

// Long name.
export const LONG_NAME = "Dataset Errata";

// Short name.
export const NAME = "Errata";

// Organization.
export const ORGANIZATION = "ES-DOC";

// Version.
export const VERSION = '0.6.0.0';

// Event router.
export const events = _.extend({}, Backbone.Events);

// Outputs message to console.
// @msg          Logging message.
export const log = (msg) => {
    console.log(new Date() + " :: " + ORGANIZATION + "-" + NAME.toUpperCase() + " :: " + msg);
};

// Binds a function to an application event.
// @eventType       Type of event being fired.
// @eventHandler    Handler processing the event.
// @context         Context, i.e. this.
export const on = (eventType, eventHandler, context) => {
    events.on(eventType, eventHandler, context);
};

// Triggers an application event.
// @eventType       Type of event being fired.
// @eventArgs       Event arguments.
export const trigger = (eventType, eventArgs) => {
    log("event :: " + eventType);

    return events.trigger(eventType, eventArgs);
};
