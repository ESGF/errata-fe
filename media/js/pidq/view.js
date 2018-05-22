// Module imports.
import * as APP         from  '../shared/application.js';
import * as UTILS       from  '../shared/utilities.js';
import * as CONSTANTS   from  '../shared/constants.js';
import * as STATE       from  './state.js';

// Main module level view.
export default Backbone.View.extend({
    // Backbone: view event handlers.
    events: {
        // Open page: home.
        'click img.esdoc-logo': () => {
            UTILS.openHomepage();
        },

        // Open email: support.
        'click button.esdoc-support': () => {
            UTILS.openSupportEmail();
        },

        // Open page: errata detail.
        'click .task': (e) => {
            var url;

            url = CONSTANTS.URLS.VIEW_PAGE;
            url += "?uid=";
            url += $(e.target).parent().attr("id") ||
                   $(e.target).parent().parent().attr("id");
            UTILS.openURL(url, true);
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
                pageNumber <= STATE.paging.pages.length &&
                STATE.paging.current !== STATE.paging.pages[pageNumber - 1]) {
                STATE.paging.current = STATE.paging.pages[pageNumber - 1];
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to first page.
        'click .pagination-first' : () => {
            if (STATE.paging.pages.length && STATE.paging.current !== _.first(STATE.paging.pages)) {
                STATE.paging.current = _.first(STATE.paging.pages);
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to previous page.
        'click .pagination-previous' : () => {
            if (STATE.paging.pages.length && STATE.paging.current !== _.first(STATE.paging.pages)) {
                STATE.paging.current = STATE.paging.pages[STATE.paging.current.id - 2];
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to next page.
        'click .pagination-next' : () => {
            if (STATE.paging.pages.length && STATE.paging.current !== _.last(STATE.paging.pages)) {
                STATE.paging.current = STATE.paging.pages[STATE.paging.current.id];
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: navigate to last page.
        'click .pagination-last' : () => {
            if (STATE.paging.pages.length && STATE.paging.current !== _.last(STATE.paging.pages)) {
                STATE.paging.current = _.last(STATE.paging.pages);
                APP.trigger('state:pageUpdate');
            }
        },

        // Pager: page-size change.
        'change .pagination-page-size' : (e) => {
            STATE.paging.pageSize = $(e.target).val();
            STATE.paging.pages = UTILS.getPages(STATE.paging.pageSize, STATE.searchData.results);
            STATE.paging.count = STATE.paging.pages.length;
            STATE.paging.current = STATE.paging.count > 0 ? STATE.paging.pages[0] : undefined;
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
                STATE.updateSortField(target);
                APP.trigger('state:pageUpdate');
            }
        }
    },

    // Backbone: view initializer.
    initialize: function () {
        APP.events.on("ui:initialized", this._setSortColumn, this);
        APP.events.on("search:complete", this._updateStatisticsInfo, this);
        APP.events.on("state:pageUpdate", this._updateGrid, this);
        APP.events.on("state:pageUpdate", this._updateGridPager, this);
        APP.events.on("state:sortFieldChanging", this._clearSortColumn, this);
        APP.events.on("state:sortFieldChanged", this._setSortColumn, this);
        APP.events.on("state:sortDirectionToggled", this._toggleSortColumn, this);
        APP.events.on("project:changed", () => {
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
            UTILS.renderTemplate(template, APP, this);
        }, this);

        return this;
    },

    // Sets new sort column.
    _setSortColumn: function () {
        if (STATE.sorting.direction === 'asc') {
            this.$('.glyphicon.sort-target-' + STATE.sorting.field).addClass('glyphicon-menu-up');
        } else {
            this.$('.glyphicon.sort-target-' + STATE.sorting.field).addClass('glyphicon-menu-down');
        }
    },

    // Toggles current sort column.
    _toggleSortColumn: function () {
        this._clearSortColumn();
        this._setSortColumn();
    },

    // Clears current sort column.
    _clearSortColumn: function () {
        this.$('.glyphicon.sort-target-' + STATE.sorting.field).removeClass('glyphicon-menu-up');
        this.$('.glyphicon.sort-target-' + STATE.sorting.field).removeClass('glyphicon-menu-down');
    },

    // Updates results grid.
    _updateGrid: function () {
        this._replaceNode('tbody', 'template-grid-body');
    },

    // Updates grid pagination.
    _updateGridPager: function () {
        var text;

        text = "Page ";
        text += STATE.paging.current ? STATE.paging.current.id : '0';
        text += " of ";
        text += STATE.paging.count;
        this.$('.pagination-info').attr('placeholder', text);

        this.$('.pagination-container').removeClass('hidden');
        if (STATE.paging.count < 2 && STATE.searchData.count < 25) {
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
        this.$(nodeSelector).replaceWith(UTILS.renderTemplate(template, STATE));
    }
});
