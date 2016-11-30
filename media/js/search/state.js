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
                defaultKey: undefined,
                hasGlobal: true,
                key: "institute",
                label: "Institute",
                uiPosition: 1
            },
            {
                data: {
                    all: [],
                    current: undefined,
                    set: {}
                },
                defaultKey: "cmip6",
                hasGlobal: false,
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
                defaultKey: undefined,
                hasGlobal: true,
                key: "severity",
                label: "Severity",
                uiPosition: 2
            },
            {
                data: {
                    all: [],
                    current: undefined,
                    set: {}
                },
                defaultKey: undefined,
                hasGlobal: true,
                key: "status",
                label: "Status",
                uiPosition: 3
            }
        ], 'key'),

        // Search data returned from server.
        searchData: {
            count: undefined,
            results: undefined,
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
            field: "updatedAt",
            direction: "desc"
        }
    };

}(
    this.APP,
    this._,
    this.Cookies
));