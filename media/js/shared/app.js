// --------------------------------------------------------
// $ :: JQuery nonconflict reference.
// See :: http://www.tvidesign.co.uk/blog/improve-your-jquery-25-excellent-tips.aspx#tip19
// --------------------------------------------------------
window.$ = window.$jq = jQuery.noConflict();

// Application.
window.ErrataApplication = class Application {
    // Instance ctor.
    constructor(stateCls, subModule) {
        this.LONG_NAME = "Dataset Errata " + subModule;
        this.NAME = "Errata"
        this.ORGANIZATION = "ES-DOC";
        this.VERSION = '0.5.0.0';
        this.copyrightYear = new Date().getFullYear();
        this.events = _.extend({}, Backbone.Events);
        this.state = new stateCls(this);
        this.templateCache = {};
        this.types = {};
        this.utils = {};
        this.views = {};
    }

    // Full application title..
    get FULLTITLE () {
        return this.ORGANIZATION + " " + this.LONG_NAME
    }

    // Outputs message to console.
    // @msg          Logging message.
    log (msg) {
        console.log(new Date() + " :: " + this.ORGANIZATION + "-" + this.NAME.toUpperCase() + " :: " + msg);
    }

    // Binds a function to an application event.
    on (eventType, eventHandler, context) {
        this.events.on(eventType, eventHandler, context);
    }

    // Triggers an application event.
    trigger (eventType, eventArgs) {
        this.log("event :: " + eventType);

        return this.events.trigger(eventType, eventArgs);
    }
}
