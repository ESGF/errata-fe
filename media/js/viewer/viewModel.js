(function (root, $, _, Backbone) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // View model.
    class ViewModel {
        // Instance ctor.
        constructor(app) {
            this.APP = app;
            this.datasets = [];
            this.issue = undefined;
            this.severity= {};
            this.status = {};
            this.projects = {};
            this.project = undefined;
        }
    }

    // Commence setup when document has loaded.
    root.APP = new root.ErrataApplication(ViewModel, "Viewer");
    $(document).ready(function () {
        root.APP.trigger("setup:begin");
    });

}(
    this,
    this.$,
    this._,
    this.Backbone
));
