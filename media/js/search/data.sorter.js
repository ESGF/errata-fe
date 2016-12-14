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
            if (_.contains(['dateClosed', 'dateCreated', 'dateUpdated', 'severity'], field)) {
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

        // Sort issues by field.
        if (field === 'title') {
            issues = _.sortBy(issues, 'title');
        } else if (field === 'institute') {
            issues = _.sortBy(issues, '_institute');
        } else if (field === 'status') {
            issues = _.sortBy(issues, function (i) {
                return i["_" + field].label.toLowerCase();
            });
        } else if (field === 'severity') {
            issues = _.sortBy(issues, function (i) {
                return i["_" + field].sortOrdinal;
            });
        } else if (_.contains(['dateClosed', 'dateCreated', 'dateUpdated'], field)) {
            issues = _.sortBy(issues, function (i) {
                return i[field] ? i[field].valueOf() : '--';
            });
        }

        // Apply sort direction.
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
