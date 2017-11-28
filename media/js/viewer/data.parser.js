(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:cvDataDownload.
    APP.on("setup:cvDataDownload", function (data) {
        // Cache setup data.
        APP.state.severity = _.indexBy(data.collections[1].terms, 'key');
        APP.state.status = _.indexBy(data.collections[2].terms, 'key');
        APP.state.projects = _.indexBy(data.collections[0].terms, 'key');

        // Fire event.
        APP.trigger("setup:cvDataParsed", data);
    });

    // Event handler: setup:issueDataDownload.
    APP.on("setup:issueDataDownload", function (data) {
        var issue;

        // Update state.
        APP.state.issue = issue = data.issue;
        APP.state.datasets = issue.datasets.sort();

        // Set display field: issue full title.
        issue._fullTitle = issue.project.toUpperCase();
        issue._fullTitle += " - ";
        issue._fullTitle += issue.institute.toUpperCase();
        issue._fullTitle += " - ";
        issue._fullTitle += issue.title.slice(0, 48);
        if (issue.title.length > 48) {
            issue._fullTitle += "...";
        }

        // Set display field: standard attributes.
        issue._institute = issue.institute.toUpperCase();
        issue._project = issue.project.toUpperCase();
        issue._severity = APP.state.severity['esdoc:errata:severity:' + issue.severity];
        issue._status = APP.state.status['esdoc:errata:status:' + issue.status];

        // Normalize facet keys.
        // _.each(APP.state.projects[issue.project].facets, function (f) {
        //     f._key = f.key.toLowerCase().replace('_', '');
        // });
        // issue.__facets = _.indexBy(_.map(_.keys(issue.facets), function (key) {
        //     return {
        //         key: key,
        //         _key: key.toLowerCase(),
        //         values: issue.facets[key]
        //     };
        // }), '_key');

        // // Set issue facets.
        // issue._facets = [];
        // _.each(APP.state.projects[issue.project].facets, function (f) {
        //     if (_.has(issue.__facets, f._key)) {
        //         issue._facets.push({
        //             key: f.key,
        //             label: f.label,
        //             values: _.map(issue.__facets[f._key].values, function (v) {
        //                 return {
        //                     val: v,
        //                     documentationURL: null
        //                 };
        //             })
        //         });
        //     }
        // });

        // Set documentation viewer links.
        // var documentedFacets = APP.constants.getDocumentedFacets(issue.project);
        // console.log(documentedFacets);

        issue._projectDocURL = "https://documentation.es-doc.org/" + issue.project;
        issue._experimentDocURLs = [];
        issue._modelDocURLs = [];

        // issue._experimentDocURLs = issue.experimentID.length === 0 ? [] :
        //     _.map(issue.experimentID.sort(), function (i) {
        //         return {
        //             label: i,
        //             hyperlink: "https://documentation.es-doc.org/" + issue.project + "/experiments/" + i
        //         };
        //     });
        // issue._modelDocURLs = issue.sourceID.length === 0 ? [] :
        //     _.map(issue.sourceID.sort(), function (i) {
        //         return {
        //             label: i,
        //             hyperlink: "https://documentation.es-doc.org/" + issue.project + "/models/" + i
        //         };
        //     });

        // Set display fields: provenance fields.
        issue._createdBy = issue.createdBy ? issue.createdBy : "--";
        if (issue.createdDate) {
            issue.createdDate = issue.createdDate.slice(0, 19);
        }
        issue._updatedBy = issue.updatedBy ? issue.updatedBy : "--";
        if (issue.updatedDate) {
            issue.updatedDate = issue.updatedDate.slice(0, 19);
        }
        issue._closedBy = issue.closedBy ? issue.closedBy : "--";
        if (issue.closedDate) {
            issue.closedDate = issue.closedDate.slice(0, 19);
        }

        console.log(issue);

        // Fire event.
        APP.trigger("setup:issueDataParsed", data);
        APP.trigger("setup:complete");
    });

}(
    this.APP,
    this._
));