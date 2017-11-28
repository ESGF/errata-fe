(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    var
        // Parses data returned from search web-service endpoint.
        doParse = function (eventType, data) {
            // Map results.
            data.results = _.map(data.results, APP.mapIssue);

            // Parse results.
            _.each(data.results, function (row) {
                row._severity = APP.state.filters[1].data.set['esdoc:errata:severity:' + row.severity];
                row._status = APP.state.filters[2].data.set['esdoc:errata:status:' + row.status];
                row._institutionID = row.institutionID.toUpperCase();
                row._title = (row.title || '--').trim();
                if (row.title.length > 53) {
                    row._title = row.title.slice(0, 53) + " ...";
                }
            });

            console.log(data.results[0]);
            // console.log(APP.state.filters[1].data.set['esdoc:errata:severity:low']);
            console.log(APP.state.filters);

            // Trigger application event.
            APP.trigger(eventType, data);
        };

    // Event handler: setup:initialSearchDataDownload.
    APP.on("setup:initialSearchDataDownload", function (data) {
        doParse("setup:initialSearchDataParsed", data);
    });

    // Event handler: search:dataDownload.
    APP.on("search:dataDownload", function (data) {
        doParse("search:dataParsed", data);
    });

    // Event handler: setup:setupDataDownload.
    APP.on("setup:setupDataDownload", function (data) {
        // Initialise filters from vocab collections.
        APP.state.filters = _.map(data.collections, function (c) {
            return {
                data: {
                    all: _.sortBy(c.terms, function (i) {
                        return i.sortOrdinal || i.key;
                    }),
                    current: null,
                    set: {}
                },
                defaultKey: c.key === "esdoc:errata:project" ? "esdoc:errata:project:cmip6" : null,
                key: c.key,
                label: c.label,
                project: c.key.startsWith('esdoc') ? null : c.key.split(':')[1],
                uiPosition: c.key === "esdoc:errata:project" ? 0 :
                            c.key === "esdoc:errata:severity" ? 1000 :
                            c.key === "esdoc:errata:status" ? 1001 : 100
            };
        });

        // Non project filters: set default data.
        _.each(APP.state.filters, function (f, index) {
            if (index > 0) {
                f.data.all.unshift({
                    key: f.key + ":*",
                    label: "*"
                });
            }
        });

        // All filters: set current.
        _.each(APP.state.filters, function (f) {
            if (f.defaultKey) {
                f.data.current = _.find(f.data.all, function (i) {
                    return i.key === f.defaultKey;
                });
            }
            f.data.current = f.data.current || f.data.all[0];
            f.data.set = _.indexBy(f.data.all, 'key');
        });

        // Set active state.
        APP.state.setActiveFilters();

        APP.trigger("setup:setupDataParsed");
    });

}(
    this.APP,
    this._
));
