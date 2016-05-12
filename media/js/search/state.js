// --------------------------------------------------------
// search/state._.js - search state.
// --------------------------------------------------------
(function (APP, cookies) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare application state.
    APP.state = {
        // s = states, e.g. new, resolved ... etc.
        s: {
            all: [],
            current: undefined
        },

        filters: [
            {
                key: "states",
                displayName: "status"
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
        pageSize: cookies.get('errata-page-size'),

        // Set of grid page size options.
        pageSizeOptions: [25, 50, 100],

        // Paging related state.
        paging: {
            current: undefined,
            count: undefined,
            pages: []
        }
    };

}(
    this.APP,
    this.Cookies
));