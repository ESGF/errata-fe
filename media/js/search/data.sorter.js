// --------------------------------------------------------
// search/search.data.parser.js - Parses search data returned from web-service.
// --------------------------------------------------------
(function (APP, paging, sorting, _) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Updates sort field.
    APP.updateSortField = function (field) {
        if (sorting.field === field) {
            sorting.direction = (sorting.direction === 'asc' ? 'desc' : 'asc');
            APP.events.trigger('state:sortDirectionToggled');
        } else {
            APP.events.trigger('state:sortFieldChanging');
            sorting.field = field;
            if (_.contains(['dateClosed', 'dateCreated', 'dateUpdated'], field)) {
                sorting.direction = 'desc';
            } else {
                sorting.direction = 'asc';
            }
            APP.events.trigger('state:sortFieldChanged');
        }

        // Sort.
        APP.sortIssues();

        // Reset pagination.
        APP.paginateIssues();
    };

    // Sort cached issues.
    APP.sortIssues = function () {
        var issues = APP.state.searchData.results,
            field = sorting.field,
            direction = sorting.direction;

        if (_.contains(['title'], field)) {
            issues = _.sortBy(issues, field);
        }

        if (_.contains(['institute'], field)) {
            issues = _.sortBy(issues, "_" + field);
        }

        if (_.contains(['severity', 'status'], field)) {
            issues = _.sortBy(issues, function (i) {
                return i["_" + field].label.toLowerCase();
            });
        }

        if (_.contains(['dateClosed', 'dateCreated', 'dateUpdated'], field)) {
            issues = _.sortBy(issues, function (i) {
                return i[field] ? i[field].valueOf() : '--';
            });
        }

        if (_.contains(['dateClosed', 'dateCreated', 'dateUpdated'], field)) {
            if (direction === 'desc') {
                issues = issues.reverse();
            }
        } else if (direction === 'desc') {
            issues = issues.reverse();
        }

        APP.state.searchData.results = issues;
    };

    // Paginate cached issues.
    APP.paginateIssues = function () {
        paging.pages = APP.utils.getPages(APP.state.searchData.results);
        paging.count = paging.pages.length;
        paging.current = paging.count > 0 ? paging.pages[0] : undefined;
    };

}(
    this.APP,
    this.APP.state.paging,
    this.APP.state.sorting,
    this._
));
