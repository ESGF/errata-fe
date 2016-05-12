// --------------------------------------------------------
// search/state._.js - search state.
// --------------------------------------------------------
(function (APP, _, cookies) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare application state.
    APP.state = {
        APP: APP,

        filters: [
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
        ],

        // Search data returned from server.
        searchData: {
            count: undefined,
            results: undefined,
            timestamp: undefined,
            total: undefined,
        },

        // Size of grid pages.
        pageSize: cookies.get('errata-search-page-size'),

        // Set of grid page size options.
        pageSizeOptions: [25, 50, 100],

        // Paging related state.
        paging: {
            current: undefined,
            count: 0,
            pages: []
        }
    };

    // Set filter map.
    APP.state.filters = _.indexBy(APP.state.filters, 'key');

}(
    this.APP,
    this._,
    this.Cookies
));