(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:cvDataDownload.
    APP.on("setup:cvDataDownload", function (data) {
        // Cache setup data.
        APP.state.severity = _.indexBy(data.severity, 'key');
        APP.state.status = _.indexBy(data.status, 'key');
        console.log(data)
        // Fire event.
        APP.trigger("setup:cvDataParsed", data);
    });

    // Event handler: setup:issueDataDownload.
    APP.on("setup:issueDataDownload", function (data) {
        var issue;

        // Update state.
        APP.state.issue = issue = data.issue;
        APP.state.datasets = issue.datasets;
        console.log(data.issue)
        console.log(data.issue.experimentID)
        // Set issue full title.
        issue._fullTitle = issue.mipEra.toUpperCase();
        issue._fullTitle += " - ";
        issue._fullTitle += issue.institutionID.toUpperCase();
        issue._fullTitle += " - ";
        issue._fullTitle += issue.title.slice(0, 48);
        if (issue.title.length > 48) {
            issue._fullTitle += "...";
        }

        // Reformat fields.
        issue._institute = issue.institutionID.toUpperCase();
        issue._project = issue.mipEra.toUpperCase();
        issue._experiments = issue.experimentID.length ?
                             issue.experimentID.sort().join(", ") : "--";
        issue._models = issue.sourceID.length ?
                        issue.sourceID.sort().join(", ").toUpperCase() : "--";
        issue._variables = issue.variableID.length ?
                           issue.variableID.sort().join(", ") : "--";

        // Set cv derived fields.
        issue._severity = APP.state.severity[issue.severity];
        issue._status = APP.state.status[issue.status];

        // Set documentation viewer links.
        issue._projectDocURL = "https://documentation.es-doc.org/" + issue.mipEra;
        issue._experimentDocURLs = issue.experimentID.length === 0 ? [] :
            _.map(issue.experimentID.sort(), function (i) {
                return {
                    label: i,
                    hyperlink: "https://documentation.es-doc.org/" + issue.mipEra + "/experiments/" + i
                };
            });
        issue._modelDocURLs = issue.sourceID.length === 0 ? [] :
            _.map(issue.sourceID.sort(), function (i) {
                return {
                    label: i,
                    hyperlink: "https://documentation.es-doc.org/" + issue.mipEra + "/models/" + i
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