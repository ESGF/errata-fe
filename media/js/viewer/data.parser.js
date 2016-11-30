(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:cvDataDownload.
    APP.on("setup:cvDataDownload", function (data) {
        // Cache setup data.
        APP.state.severity = _.indexBy(data.severity, 'key');
        APP.state.status = _.indexBy(data.status, 'key');

        // Fire event.
        APP.trigger("setup:cvDataParsed", data);
    });

    // Event handler: setup:issueDataDownload.
    APP.on("setup:issueDataDownload", function (data) {
        var issue;

        // Update state.
        APP.state.issue = issue = data.issue;
        APP.state.datasets = issue.datasets;

        // Set issue full title.
        issue._fullTitle = issue.project.toUpperCase();
        issue._fullTitle += " - ";
        issue._fullTitle += issue.institute.toUpperCase();
        issue._fullTitle += " - ";
        issue._fullTitle += issue.title;

        // Reformat fields.
        issue._institute = issue.institute.toUpperCase();
        issue._project = issue.project.toUpperCase();
        issue._experiments = issue.experiments.length ?
                             issue.experiments.join(", ") : "--";
        issue._models = issue.models.length ?
                        issue.models.join(", ").toUpperCase() : "--";
        issue._variables = issue.variables.length ?
                           issue.variables.join(", ") : "--";

        // Set cv derived fields.
        issue._severity = APP.state.severity[issue.severity];
        issue._status = APP.state.status[issue.status];

        // Format data fields.
        issue._createdAt = issue.createdAt ?
                             issue.createdAt.slice(0, 16) : "--";
        issue._updatedAt = issue.updatedAt ?
                             issue.updatedAt.slice(0, 16) : "--";
        issue._closedAt = issue.closedAt ?
                            issue.closedAt.slice(0, 16) : "--";

        issue._closedBy = issue.closedBy ? issue.closedBy : "--";
        issue._createdBy = issue.createdBy ? issue.createdBy : "--";
        issue._updatedBy = issue.updatedBy ? issue.updatedBy : "--";

        // Fire event.
        APP.trigger("setup:issueDataParsed", data);
        APP.trigger("setup:complete");
    });

}(
    this.APP,
    this._
));