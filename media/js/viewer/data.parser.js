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
        issue._fullTitle += issue.title.slice(0, 48);
        if (issue.title.length > 48) {
            issue._fullTitle += "...";
        }

        // Reformat fields.
        issue._institute = issue.institute.toUpperCase();
        issue._project = issue.project.toUpperCase();
        issue._experiments = issue.experiment.length ?
                             issue.experiment.sort().join(", ") : "--";
        issue._models = issue.model.length ?
                        issue.model.sort().join(", ").toUpperCase() : "--";
        issue._variables = issue.variable.length ?
                           issue.variable.sort().join(", ") : "--";

        // Set cv derived fields.
        issue._severity = APP.state.severity[issue.severity];
        issue._status = APP.state.status[issue.status];

        // Set documentation viewer links.
        issue._projectDocURL = "https://documentation.es-doc.org/" + issue.project;
        issue._experimentDocURLs = issue.experiment.length === 0 ? [] :
            _.map(issue.experiment.sort(), function (i) {
                return {
                    label: i,
                    hyperlink: "https://documentation.es-doc.org/" + issue.project + "/experiments/" + i
                };
            });
        issue._modelDocURLs = issue.model.length === 0 ? [] :
            _.map(issue.model.sort(), function (i) {
                return {
                    label: i,
                    hyperlink: "https://documentation.es-doc.org/" + issue.project + "/models/" + i
                };
            });

        // Format data fields.
        issue.dateCreated = issue.dateCreated.slice(0, 19);
        if (issue.dateUpdated) {
            issue.dateUpdated = issue.dateUpdated.slice(0, 19);
        }
        if (issue.dateClosed) {
            issue.dateClosed = issue.dateClosed.slice(0, 19);
        }
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