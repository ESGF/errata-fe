(function (APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    var
        // Parses data returned from search web-service endpoint.
        doParse = function (eventType, data) {
            // Map results.
            data.results = _.map(data.results, APP.mapIssue);

            // Set filter related helper attributes.
            _.each(data.results, function (row) {
                _.each(_.values(APP.state.filters), function (f) {
                    row['_' + f.key] = f.data.set[row[f.key]];
                });
                row._institutionID = row.institutionID.toUpperCase();
            });

            // Set human readable title.
            _.each(data.results, function (row) {
                row._title = (row.title || '--').trim();
                if (row.title.length > 53) {
                    row._title = row.title.slice(0, 53) + " ...";
                }
            });

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
        var filters = APP.state.filters;

        // Core filters: set data.
        filters[0].data.all = data.project;
        filters[1].data.all = data.severity;
        filters[2].data.all = data.status;

        // Project filters: initialise.
        _.each(data.project, function (p) {
            _.each(p.facets, function (f, index) {
                filters.push({
                    data: {
                        all: _.map(f.values, function (v) {
                            return {
                                key: v,
                                label: v
                            };
                        }),
                        current: undefined,
                        set: {}
                    },
                    defaultKey: undefined,
                    key: p.key + ':' + f.key,
                    label: f.label,
                    project: p.key,
                    uiPosition: index + 1
                });
            });
        });

        // Non project filters: set default data.
        _.each(filters, function (f, index) {
            if (index > 0) {
                f.data.all.unshift({
                    key: "*",
                    label: "*"
                });
            }
        });

        // All filters: sort data.
        _.each(filters, function (f) {
            data[f.key] = _.sortBy(data[f.key], function (i) {
                return i.sortOrdinal || i.label || i.name;
            });
        });

        // All filters: set current.
        _.each(filters, function (f) {
            if (f.defaultKey) {
                f.data.current = _.find(f.data.all, function (i) {
                    return i.key === f.defaultKey;
                }) || f.data.all[0];
            } else {
                f.data.current = f.data.all[0];
            }
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
