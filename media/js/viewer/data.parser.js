(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Event handler: setup:cvDataDownload.
    APP.on("setup:cvDataDownload", (data) => {
        // Update state.
        APP.state.vocabs = data.vocabs;

        // Fire event.
        APP.trigger("setup:cvDataParsed");
    });

    // Event handler: setup:issueDataDownload.
    APP.on("setup:issueDataDownload", (data) => {
        var issue;

        // Update state.
        APP.state.issue = issue = new APP.types.Issue(data.issue);

        // _.each(issue.facets, (i) => {
        //     console.log(i);
        // });

        issue._experimentDocURLs = [];
        issue._modelDocURLs = [];

        issue._facets = [];

        // console.log(data);
        // console.log(APP.state);


        // Normalize facet keys.
        // _.each(APP.state.project[issue.project].facets, function (f) {
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
        // _.each(APP.state.project[issue.project].facets, function (f) {
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


        console.log(issue);

        // Fire event.
        APP.trigger("setup:complete");
    });

}(
    this.APP,
    this._
));