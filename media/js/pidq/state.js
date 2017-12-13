// Module imports.
import * as UTILS   from    '../shared/utilities.js';
import {
    Task,
    SearchFilter
    }               from    './model.js';

// Collection of search filters.
export var filters = [];

// Paging state.
export const paging = {
    current: null,
    count: 0,
    pages: [],
    pageSize: 25,
    pageSizeOptions: [25, 50, 100]
};

// Sort state.
export const sorting = {
    field: "timestamp",
    direction: "desc"
};

// Loaded search data.
export var searchData = null;

// Set search data.
export const setSearchData = (data) => {
    searchData = _.defaults({
        results: _.map(data.results, (i) => new Task(i, filters))
    }, data);
    sortResults();
    paginateIssues();
};

// Initialises filters.
export const initFilters = (data) => {
    filters = _.map(data, function (c) {
        return new SearchFilter(c);
    });
};

// Updates current filter.
export const updateFilter = (filterType, filterValue) => {
    var filter;

    filter = _.find(filters, (f) => {
        return f.key === filterType;
    });
    filter.data.current = _.find(filter.data.all, (i) => {
        return i.key === filterValue;
    });

    APP.trigger('state:filterUpdated', filter);
};


// Sets pagination data.
export const paginateIssues = () => {
    paging.pages = UTILS.getPages(paging.pageSize, searchData.results);
    paging.count = paging.pages.length;
    paging.current = paging.count > 0 ? paging.pages[0] : undefined;
};

// Sorts search results.
export const sortResults = () => {
    var searchResults, field, func;

    // Set sort function.
    field = sorting.field;
    if (field === 'datasetID') {
        func = (i) => i.datasetID;
    } else if (field === 'status') {
        func = (i) => i.ext.status.label.toLowerCase();
    } else if (field === 'action') {
        func = (i) => i.ext.action.label.toLowerCase();
    } else if (field === 'timestamp') {
        func = (i) => i[field] ? i[field].valueOf() : '--';
    }

    // Apply sort.
    searchResults = _.sortBy(searchData.results, func);
    if (sorting.direction === 'desc') {
        searchResults = searchResults.reverse();
    }
    searchData.results = searchResults;
};

// Updates sort field / direction.
export const updateSortField = (field) => {
    if (sorting.field === field) {
        sorting.direction = (sorting.direction === 'asc' ? 'desc' : 'asc');
        APP.trigger('state:sortDirectionToggled');
    } else {
        APP.trigger('state:sortFieldChanging');
        sorting.field = field;
        if (field === 'timestamp') {
            sorting.direction = 'desc';
        } else {
            sorting.direction = 'asc';
        }
        APP.trigger('state:sortFieldChanged');
    }

    // Sort & paginate.
    sortResults();
    paginateIssues();
};
