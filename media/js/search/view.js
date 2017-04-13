// --------------------------------------------------------
// search/view._.js - Main page view.
// --------------------------------------------------------
(function (APP, paging, sorting, constants, _, $, Backbone, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Main module level view.
    APP.views.MainView = Backbone.View.extend({
        // Backbone: view event handlers.
        events: {
            // Open page: home.
            'click img.esdoc-logo': function () {
                APP.utils.openHomepage();
            },

            // Open email: support.
            'click button.esdoc-support': function () {
                APP.utils.openSupportEmail();
            },

            // Open page: pid lookup.
            'click button.esdoc-pid-lookup': function () {
                APP.utils.openURL(constants.URLS.PID_PAGE, true);
            },

            // Open page: errata detail.
            'click .issue': function (e) {
                this._openDetailPage($(e.target).parent().attr("id") ||
                                     $(e.target).parent().parent().attr("id"));
            },

            // Filter: value change.
            'change .filter select': function (e) {
                APP.updateFilter($(e.target).attr("id").slice(7),
                                 $(e.target).val());
            },

            // Pager: navigate to manually chosen page.
            'change .pagination-info' : function (e) {
                var pageNumber;

                pageNumber = parseInt($(e.target).val(), 10);
                $(e.target).val("");
                if (_.isNaN(pageNumber) === false &&
                    pageNumber > 0 &&
                    pageNumber <= paging.pages.length &&
                    paging.current !== paging.pages[pageNumber - 1]) {
                    paging.current = paging.pages[pageNumber - 1];
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to first page.
            'click .pagination-first' : function () {
                if (paging.pages.length && paging.current !== _.first(paging.pages)) {
                    paging.current = _.first(paging.pages);
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to previous page.
            'click .pagination-previous' : function () {
                if (paging.pages.length && paging.current !== _.first(paging.pages)) {
                    paging.current = paging.pages[paging.current.id - 2];
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to next page.
            'click .pagination-next' : function () {
                if (paging.pages.length && paging.current !== _.last(paging.pages)) {
                    paging.current = paging.pages[paging.current.id];
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: navigate to last page.
            'click .pagination-last' : function () {
                if (paging.pages.length && paging.current !== _.last(paging.pages)) {
                    paging.current = _.last(paging.pages);
                    APP.events.trigger('state:pageUpdate');
                }
            },

            // Pager: page-size change.
            'change .pagination-page-size' : function (e) {
                paging.pageSize = $(e.target).val();
                paging.pages = APP.utils.getPages(APP.state.searchData.results);
                paging.count = paging.pages.length;
                paging.current = paging.count > 0 ? paging.pages[0] : undefined;
                APP.events.trigger('state:pageUpdate');
            },

            // Sorting: change sort field / order.
            'click .sort-target' : function (e) {
                var target;

                // Derive sort field column header css class, e.g. sort-target-status.
                target = $(e.target).attr('class');
                if (target) {
                    target = target.split(' ');
                    target = _.find(target, function (cls) {
                        return cls.startsWith('sort-target-');
                    });
                    target = target.slice(12);

                }

                // Apply sort.
                if (target) {
                    APP.updateSortField(target);
                    APP.events.trigger('state:pageUpdate');
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
        },

        // Backbone: view renderer.
        render: function () {
            _.each([
                "template-header",
                "template-filter",
                "template-grid"
                ], function (template) {
                APP.utils.renderTemplate(template, APP, this);
            }, this);

            return this;
        },

        // Sets new sort column.
        _setSortColumn: function () {
            if (sorting.direction === 'asc') {
                this.$('.glyphicon.sort-target-' + sorting.field).addClass('glyphicon-menu-up');
            } else {
                this.$('.glyphicon.sort-target-' + sorting.field).addClass('glyphicon-menu-down');
            }
        },

        // Toggles current sort column.
        _toggleSortColumn: function () {
            this._clearSortColumn();
            this._setSortColumn();
        },

        // Clears current sort column.
        _clearSortColumn: function () {
            this.$('.glyphicon.sort-target-' + sorting.field).removeClass('glyphicon-menu-up');
            this.$('.glyphicon.sort-target-' + sorting.field).removeClass('glyphicon-menu-down');
        },

        // Updates results grid.
        _updateGrid: function () {
            this._replaceNode('tbody', 'template-grid-body');
        },

        // Updates grid pagination.
        _updateGridPager: function () {
            var text;

            text = "Page ";
            text += paging.current ? paging.current.id : '0';
            text += " of ";
            text += paging.count;
            this.$('.pagination-info').attr('placeholder', text);

            this.$('.pagination-container').removeClass('hidden');
            if (paging.count < 2 && APP.state.searchData.count < 25) {
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
            this.$(nodeSelector).replaceWith(APP.utils.renderTemplate(template, APP.state));
        },

        // Opens errata detail page.
        _openDetailPage: function (uid) {
            var url;

            url = APP.defaults.viewerBaseURL;
            url += "?uid=";
            url += uid;
            APP.utils.openURL(url, true);
        }
    });

}(
    this.APP,
    this.APP.state.paging,
    this.APP.state.sorting,
    this.APP.constants,
    this._,
    this.$,
    this.Backbone,
    this.window
));
