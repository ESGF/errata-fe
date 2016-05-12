(function(APP, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Parses document versions.
    var parseDocumentVersions = function (data) {
            // Initialise versions.
            data.documentVersions = [{
                displayName: "All",
                name: "*"
            }, {
                displayName: "Latest",
                name: "latest"
            }];
        },

        // Parses document tyoes.
        parseDocumentTypes = function (data) {
            // Discard non-search targets.
            data.documentTypes = _.filter(data.documentTypes, function(dt) {
                return dt.isSearchTarget;
            });

            // Sort.
            data.documentTypes = _.sortBy(data.documentTypes, 'displayName');
        },

        // Parses institutes.
        parseInstitutes = function (data) {
            _.each(data.institutes, function(i) {
                console.log("TODO: remove lower casing of institute name");
                i.name = i.name.toLowerCase();
            });

            // Add global filter.
            data.institutes.push({
                name: "*"
            });

            // Reject irrelevant.
            data.institutes = _.reject(data.institutes, function (institute) {
                return institute.name === "--";
            });

            // Sort.
            data.institutes = _.sortBy(data.institutes, 'name');
        },

        // Parses experiments.
        parseExperiments = function (data) {
            // Unpack tuple array.
            data.experiments = _.map(data.experiments, function (e) {
                return {
                    project: e[0],
                    name: e[1]
                };
            });

            // Prepend global filter.
            _.each(data.projects, function (p) {
                data.experiments.unshift({
                    project: p.name.toLowerCase(),
                    name: '*'
                });
            });

            // Sort.
            data.experiments = _.sortBy(data.experiments, 'name');
        },

        // Parses models.
        parseModels = function (data) {
            // Unpack tuple array.
            data.models = _.map(data.models, function (m) {
                return {
                    project: m[0],
                    name: m[1],
                };
            });

            // Prepend global filter.
            _.each(data.projects, function(p) {
                data.models.unshift({
                    project: p.name.toLowerCase(),
                    name: '*'
                });
            });

            // Sort.
            data.models = _.sortBy(data.models, 'name');
        },

        // Parses project document types.
        parseProjectDocumentTypes = function (data) {
            _.each(data.projects, function(p) {
                console.log("TODO: remove lower casing of project name");
                p.name = p.name.toLowerCase();
                p.dt = {
                    all: [],
                    current: undefined
                };
                _.each(data.documentTypes, function (dt) {
                    var dtc = _.find(data.documentTypeCounts, function (dtc) {
                        return dtc[1] === p.name && dtc[2] === dt.key;
                    });
                    if (dtc) {
                        p.dt.all.push(dt);
                    }
                });

                if (p.dt.all.length) {
                    p.dt.current = _.find(p.dt.all, function (dt) {
                        return dt.key.eq(APP.defaults.document.type);
                    });
                    if (!p.dt.current) {
                        p.dt.current = p.dt.all[0];
                    }
                }
            });
        },

        // Parses project institutes.
        parseProjectInstitutes = function (data) {
            _.each(data.projects, function (p) {
                p.i = {
                    all: [{
                        name: "*"
                    }]
                };
                p.i.current = p.i.all[0];
                _.each(data.institutes, function (i) {
                    var ic = _.find(data.instituteCounts, function (ic) {
                        return ic[1] === p.name && ic[2] === i.name;
                    });
                    if (ic) {
                        p.i.all.push(i);
                    }
                });
                _.each(p.i.all, function (i) {
                    if (APP.defaults.institute === i.name) {
                        p.i.current = i;
                    }
                });
            });
        },

        // Parses project experiments.
        parseProjectExperiments = function (data) {
            _.each(data.projects, function (p) {
                p.e = {
                    all: _.filter(data.experiments, function (e) {
                        return e.project === p.name;
                    }),
                    current: undefined
                };
                p.e.current = p.e.all[0];
                _.each(p.e.all, function (e) {
                    if (APP.defaults.experiment === e.name.toUpperCase()) {
                        p.e.current = e;
                    }
                });
            });
        },

        // Parses project models.
        parseProjectModels = function(data) {
            _.each(data.projects, function(p) {
                p.m = {
                    all: _.filter(data.models, function (m) {
                        return m.project === p.name;
                    }),
                    current: undefined
                };
                p.m.current = p.m.all[0];
                _.each(p.m.all, function (m) {
                    if (APP.defaults.model === m.name) {
                        p.m.current = m;
                    }
                });
            });
        },

        // Set of parsers to execute.
        parsers = [
            parseDocumentVersions,
            parseDocumentTypes,
            parseInstitutes,
            parseExperiments,
            parseModels,
            parseProjectDocumentTypes,
            parseProjectInstitutes,
            parseProjectExperiments,
            parseProjectModels
        ];

    // Setup data parser.
    APP.on("setup:setupDataDownload", function(data) {
        // Invoke parsers.
        _.each(parsers, function(parser) {
            data = parser(data) || data;
        });

        // Fire event.
        APP.trigger("setup:setupDataParsed", data);
    });

}(this.APP, this._));
