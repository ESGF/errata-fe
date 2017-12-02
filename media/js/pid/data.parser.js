(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: search:dataDownload.
    APP.on("search:dataDownload", (data) => {
        // Cache incoming data as mapped javascript objects.
        APP.state.errata = _.map(data.errata, (i) => new APP.types.Errata(i));

        // Trigger application event.
        APP.trigger('search:complete');
    });

}(
    this.APP,
    this._
));
