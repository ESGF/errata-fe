(function (root, $, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // View model.
    class ViewModel {
        // Instance ctor.
        constructor(app) {
            this.APP = app;
            this.pids = [];
            this.errata = [];
        }
    }

    // Commence setup when document has loaded.
    root.APP = new root.ErrataApplication(ViewModel, "PID");
    $(document).ready(() => {
        root.APP.trigger("setup:begin");
        root.APP.trigger("setup:complete");
    });

}(
    this,
    this.$,
    this._
));
