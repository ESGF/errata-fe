(function (root, $, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // View model.
    class ViewModel {
        // Instance ctor.
        constructor(app) {
            this.APP = app;
        }
    }

    // Commence setup when document has loaded.
    root.APP = new root.ErrataApplication(ViewModel, "PID");
    $(document).ready(function () {
        root.APP.trigger("setup:begin");
        root.APP.trigger("setup:complete");
    });

}(
    this,
    this.$,
    this._
));
