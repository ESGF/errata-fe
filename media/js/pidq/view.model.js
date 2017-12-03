// View model.
class ViewModel {
    // Instance ctor.
    constructor(app) {
        this.APP = app;
        this.filters = [];
        this._searchData = null;
        this.paging = new PagingState();
        this.sorting = new SortState();
    }

    // Gets or set search data returned from server.
    get searchData () {
        return this._searchData;
    }
    set searchData (data) {
        data.results = _.map(data.results, (i) => new Task(i));
        console.log(data.results[0]);

        this._searchData = data;
        this.sortResults();
        this.paginateIssues();
    }

    // Initialises filter state with data returned from server.
    initFilters (data) {
        this.filters = _.map(data, function (c) {
            return new SearchFilter(c);
        });
    }

    // Updates current filter.
    updateFilter (filterType, filterValue) {
        var filter;

        filter = _.find(this.filters, (f) => {
            return f.key === filterType;
        });
        filter.data.current = _.find(filter.data.all, (i) => {
            return i.key === filterValue;
        });

        APP.trigger('state:filterUpdated', filter);
    }

    // Sets pagination data.
    paginateIssues () {
        this.paging.pages = APP.utils.getPages(this.searchData.results);
        this.paging.count = this.paging.pages.length;
        this.paging.current = this.paging.count > 0 ? this.paging.pages[0] : undefined;
    }

    // Sorts search results.
    sortResults () {
        var searchResults, field, func;

        // Set sort function.
        field = this.sorting.field;

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
        searchResults = _.sortBy(this.searchData.results, func);
        if (this.sorting.direction === 'desc') {
            searchResults = searchResults.reverse();
        }
        this.searchData.results = searchResults;
    }

    updateSortField (field) {
        if (this.sorting.field === field) {
            this.sorting.direction = (this.sorting.direction === 'asc' ? 'desc' : 'asc');
            APP.trigger('state:sortDirectionToggled');
        } else {
            APP.trigger('state:sortFieldChanging');
            this.sorting.field = field;
            if (field === 'timestamp') {
                this.sorting.direction = 'desc';
            } else {
                this.sorting.direction = 'asc';
            }
            APP.trigger('state:sortFieldChanged');
        }

        // Sort & paginate.
        this.sortResults();
        this.paginateIssues();
    }
}

// View model: search results sort state.
class SortState {
    // Instance ctor.
    constructor() {
        this.field = "timestamp";
        this.direction = "desc";
    }
}

// View model: search results paging state.
class PagingState {
    // Instance ctor.
    constructor() {
        this.current = null;
        this.count = 0;
        this.pages = [];
        this.pageSize = 25;
        this.pageSizeOptions = [25, 50, 100];
    }
}

// Encapsulates a search filter.
class SearchFilter {
    // Instance ctor.
    constructor(c) {
        var defaultNamespace;

        // Set core fields.
        this.data = {
            all: _.sortBy(c.terms, (i) => {
                return i.sortOrdinal || i.key;
            }),
            current: null,
            set: {}
        };
        this.key = c.key;
        this.label = c.label;
        this.uiPosition =  c.key === "esdoc:errata:project" ? 0 :
                           c.key === "esdoc:errata:pid-task-action" ? 1000 :
                           c.key === "esdoc:errata:pid-task-status" ? 1001 : 100;

        // Set data.
        if (c.key != "esdoc:errata:project") {
            this.data.all.unshift({
                key: c.key + ":*",
                label: "*",
                namespace: c.key + ":*",
            })
        }
        defaultNamespace = c.key === "esdoc:errata:project" ? "esdoc:errata:project:cmip6" :
                           c.key === "esdoc:errata:pid-task-status" ? "esdoc:errata:pid-task-status:queued" : null;
        if (defaultNamespace) {
            this.data.current = _.find(this.data.all, (i) => {
                return i.key === defaultNamespace;
            });
        }
        this.data.current = this.data.current || this.data.all[0];
        this.data.set = _.indexBy(this.data.all, 'key');
    }
}


// Initialise application.
window.APP = new window.Application(ViewModel, "PID Queue");

// Event handler: document ready.
$(document).ready(() => {
    window.APP.trigger("setup:begin");
});
