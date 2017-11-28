(function (APP, _) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare application state.
    APP.state = {
        APP: APP,

        filters: [],

        // Set active filter flag.
        setActiveFilters: function () {
            _.each(APP.state.filters, function (f) {
                f.isActive = _.isNull(f.project) ||
                             f.project === APP.state.filters[0].data.current.key.split(':')[3];
            });
        },

        // Gets active filters.
        getActiveFilters: function () {
            return _.filter(APP.state.filters, function (f) {
                return f.isActive;
            });
        },

        // Search data returned from server.
        searchData: {
            count: null,
            results: null,
            total: null,
        },

        // Paging related state.
        paging: {
            current: null,
            count: 0,
            pages: [],
            pageSize: 25,
            pageSizeOptions: [25, 50, 100]
        },

        // Sorting related state.
        sorting: {
            field: "dateCreated",
            direction: "desc"
        }
    };

}(
    this.APP,
    this._
));