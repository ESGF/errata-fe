(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:cvDataDownload.
    APP.on("setup:cvDataDownload", function (data) {
        // Cache setup data.
        APP.state.state = _.indexBy(data.state, 'key');
        APP.state.severity = _.indexBy(data.severity, 'key');
        APP.state.workflow = _.indexBy(data.workflow, 'key');

        // Fire event.
        APP.trigger("setup:cvDataParsed", data);
    });

    // Event handler: setup:issueDataDownload.
    APP.on("setup:issueDataDownload", function (data) {
        var issue;

        // Set issue full title.
        issue = APP.state.issue = data.issue;
        issue._fullTitle = issue.project.toUpperCase();
        issue._fullTitle += " - ";
        issue._fullTitle += issue.institute.toUpperCase();
        issue._fullTitle += " - Issue #";
        issue._fullTitle += issue.id;

        // Reformat fields.
        issue._project = issue.project.toUpperCase();
        issue._institute = issue.institute.toUpperCase();

        // Set cv derived fields.
        issue._state = APP.state.state[issue.state];
        issue._severity = APP.state.severity[issue.severity];
        issue._workflow = APP.state.workflow[issue.workflow];

        // Split fields.
        issue._materials = issue.materials ? issue.materials.split(",") : [];

        // Sort fields.
        issue.datasets = data.datasets;

        // Format data fields.
        issue._dateCreated = issue.dateCreated ? issue.dateCreated.slice(0, 10) : "--";
        issue._dateUpdated = issue.dateUpdated ? issue.dateUpdated.slice(0, 10) : "--";
        issue._dateClosed = issue.dateClosed ? issue.dateClosed.slice(0, 10) : "--";

        // Fire event.
        APP.trigger("setup:issueDataParsed", data);
        APP.trigger("setup:complete");
    });

}(
    this.APP,
    this._
));