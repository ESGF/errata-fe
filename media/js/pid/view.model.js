// View model.
class ViewModel {
    // Instance ctor.
    constructor(app) {
        this.APP = app;
        this.pids = [];
        this.errata = [];
    }
}

// Initialise application.
window.APP = new window.Application(ViewModel, "PID");

// Event handler: document ready.
$(document).ready(() => {
    window.APP.trigger("setup:begin");
    window.APP.trigger("setup:complete");
});
