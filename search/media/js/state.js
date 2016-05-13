// --------------------------------------------------------
// search/state._.js - search state.
// --------------------------------------------------------
(function (APP, _, cookies) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare application state.
    APP.state = {
        APP: APP,

        filters: _.indexBy([
            {
                data: {
                    all: [],
                    current: undefined,
                    set: {}
                },
                key: "project",
                label: "Project",
                uiPosition: 0
            },
            {
                data: {
                    all: [],
                    current: undefined,
                    set: {}
                },
                key: "state",
                label: "State",
                uiPosition: 3
            },
            {
                data: {
                    all: [],
                    current: undefined,
                    set: {}
                },
                key: "severity",
                label: "Severity",
                uiPosition: 1
            },
            {
                data: {
                    all: [],
                    current: undefined,
                    set: {}
                },
                key: "workflow",
                label: "Workflow",
                uiPosition: 2
            }
        ], 'key'),

        // Search data returned from server.
        searchData: {
            count: undefined,
            results: undefined,
            timestamp: undefined,
            total: undefined,
        },

        // Paging related state.
        paging: {
            current: undefined,
            count: 0,
            pages: [],
            pageSize: 25,
            pageSizeOptions: [25, 50, 100]
        },

        // Sorting related state.
        sorting: {
            field: "dateUpdated",
            direction: "desc"
        }
    };

}(
    this.APP,
    this._,
    this.Cookies
));