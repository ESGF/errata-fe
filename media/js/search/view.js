// Module imports.
import * as APP         from  '../shared/application.js';
import * as utils       from  '../shared/utilities.js';
import * as constants   from  '../shared/constants.js';
import * as state       from  './state.js';


window.APP = APP;
window.STATE = state;
window.UTILS = utils;
window.CONSTANTS = constants;


// Main module level view.
export default Backbone.View.extend({
    // Backbone: view event handlers.
    events: {
        // Open page: home.
        'click img.esdoc-logo': () => {
            utils.openHomepage();
        },

        // Open email: support.
        'click button.esdoc-support': () => {
            utils.openSupportEmail();
        },

        // Open page: pid lookup.
        'click button.esdoc-pid-lookup': () => {
            utils.openURL(constants.URLS.PID_PAGE, true);
        },

        // Open page: errata detail.
        'click .issue': (e) => {
            var url;

            url = constants.URLS.VIEWER_BASE_URL;
            url += "?uid=";
            url += $(e.target).parent().attr("id") ||
                   $(e.target).parent().parent().attr("id");
            utils.openURL(url, true);
        },

        // Filter: value change.
        'change .filter select': (e) => {
            APP.trigger('state:filterUpdate', $(e.target).val());
        },

        // Pager: navigate to manually chosen page.
        'change .pagination-info' : (e) => {
            var pageNumber;

            pageNumber = parseInt($(e.target).val(), 10);
            $(e.target).val("");
            if (_.isNaN(pageNumber) === false &&
                pageNumber > 0 &&
                pageNumber <= state.paging.pages.length &&
                state.paging.current !== state.paging.pages[pageNumber - 1]) {
                state.paging.current = state.paging.pages[pageNumber - 1];
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to first page.
        'click .pagination-first' : () => {
            if (state.paging.pages.length && state.paging.current !== _.first(state.paging.pages)) {
                state.paging.current = _.first(state.paging.pages);
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to previous page.
        'click .pagination-previous' : () => {
            if (state.paging.pages.length && state.paging.current !== _.first(state.paging.pages)) {
                state.paging.current = state.paging.pages[state.paging.current.id - 2];
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to next page.
        'click .pagination-next' : () => {
            if (state.paging.pages.length && state.paging.current !== _.last(state.paging.pages)) {
                state.paging.current = state.paging.pages[state.paging.current.id];
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to last page.
        'click .pagination-last' : () => {
            if (state.paging.pages.length && state.paging.current !== _.last(state.paging.pages)) {
                state.paging.current = _.last(state.paging.pages);
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: page-size change.
        'change .pagination-page-size' : (e) => {
            state.paging.pageSize = $(e.target).val();
            state.paging.pages = utils.getPages(state.paging.pageSize, state.searchData.results);
            state.paging.count = state.paging.pages.length;
            state.paging.current = state.paging.count > 0 ? state.paging.pages[0] : undefined;
            APP.trigger('state:pageUpdate');
        },

        // Sorting: change sort field / order.
        'click .sort-target' : (e) => {
            var target;

            // Derive sort field column header css class, e.g. sort-target-status.
            target = $(e.target).attr('class');
            if (target) {
                target = target.split(' ');
                target = _.find(target, (cls) => {
                    return cls.startsWith('sort-target-');
                });
                target = target.slice(12);

            }

            // Apply sort.
            if (target) {
                state.updateSortField(target);
                APP.trigger('state:pageUpdate');
            }
        }
    },

    // Backbone: view initializer.
    initialize: function () {
        APP.on("ui:initialized", this._setSortColumn, this);
        APP.on("search:complete", this._updateStatisticsInfo, this);
        APP.on("state:pageUpdate", this._updateGrid, this);
        APP.on("state:pageUpdate", this._updateGridPager, this);
        APP.on("state:sortFieldChanging", this._clearSortColumn, this);
        APP.on("state:sortFieldChanged", this._setSortColumn, this);
        APP.on("state:sortDirectionToggled", this._toggleSortColumn, this);
        APP.on("project:changed", () => {
            this._replaceNode('div.filter', 'template-filter');
        }, this);
    },

    // Backbone: view renderer.
    render: function () {
        _.each([
            "template-header",
            "template-filter",
            "template-grid"
            ], (template) => {
            utils.renderTemplate(template, null, this);
        }, this);

        return this;
    },

    // Sets new sort column.
    _setSortColumn: function () {
        if (state.sorting.direction === 'asc') {
            this.$('.glyphicon.sort-target-' + state.sorting.field).addClass('glyphicon-menu-up');
        } else {
            this.$('.glyphicon.sort-target-' + state.sorting.field).addClass('glyphicon-menu-down');
        }
    },

    // Toggles current sort column.
    _toggleSortColumn: function () {
        this._clearSortColumn();
        this._setSortColumn();
    },

    // Clears current sort column.
    _clearSortColumn: function () {
        this.$('.glyphicon.sort-target-' + state.sorting.field).removeClass('glyphicon-menu-up');
        this.$('.glyphicon.sort-target-' + state.sorting.field).removeClass('glyphicon-menu-down');
    },

    // Updates results grid.
    _updateGrid: function () {
        this._replaceNode('tbody', 'template-grid-body');
    },

    // Updates grid pagination.
    _updateGridPager: function () {
        var text;

        text = "Page ";
        text += state.paging.current ? state.paging.current.id : '0';
        text += " of ";
        text += state.paging.count;
        this.$('.pagination-info').attr('placeholder', text);

        this.$('.pagination-container').removeClass('hidden');
        if (state.paging.count < 2 && state.searchData.count < 25) {
            this.$('.pagination-container').addClass('hidden');
        }
    },

    // Updates search statistics.
    _updateStatisticsInfo: function () {
        this._replaceNode('#grid-header-summary', 'template-grid-header-summary');
        this._replaceNode('#grid-footer-summary', 'template-grid-footer-summary');
    },

    // Replaces a page DOM node.
    _replaceNode: function (nodeSelector, template) {
        this.$(nodeSelector).replaceWith(utils.renderTemplate(template));
    }
});
