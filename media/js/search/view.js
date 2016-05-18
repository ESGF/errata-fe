// --------------------------------------------------------
// search/view._.js - Main page view.
// --------------------------------------------------------
(function (APP, paging, sorting, _, $, Backbone, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Main module level view.
    APP.views.MainView = Backbone.View.extend({
        // Backbone: view event handlers.
        events: {
            // Open email: support.
            'click button.esdoc-support': function () {
                APP.utils.openSupportEmail();
            },

            // Open page: home.
            'click img.esdoc-logo': function () {
                APP.utils.openHomepage();
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
                APP.updateSortField(_.find($(e.target).attr('class').split(' '), function (cls) {
                    return cls.startsWith('sort-target-');
                }).slice(12));
                APP.events.trigger('state:pageUpdate');
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
            var viewData;

            viewData = {
                APP: APP,
                issues: APP.state.searchData.results
            };

            _.each([
                "template-header",
                "template-filter",
                "template-grid"
                ], function (template) {
                APP.utils.renderTemplate(template, viewData, this);
            }, this);

            return this;
        },

        _setSortColumn: function () {
            if (sorting.direction === 'asc') {
                this.$('.glyphicon.sort-target-' + sorting.field).addClass('glyphicon-menu-up');
            } else {
                this.$('.glyphicon.sort-target-' + sorting.field).addClass('glyphicon-menu-down');
            }
        },

        _toggleSortColumn: function () {
            this._clearSortColumn();
            this._setSortColumn();
        },

        _clearSortColumn: function () {
            this.$('.glyphicon.sort-target-' + sorting.field).removeClass('glyphicon-menu-up');
            this.$('.glyphicon.sort-target-' + sorting.field).removeClass('glyphicon-menu-down');
        },

        // Updates results grid.
        _updateGrid: function () {
            this._replaceNode('tbody', 'template-grid-body');
        },

        _updateGridPager: function () {
            var text;

            this.$('.pagination').removeClass('hidden');
            if (paging.count < 2) {
                this.$('.pagination').addClass('hidden');
            }
            text = "Page ";
            text += paging.current ? paging.current.id : '0';
            text += " of ";
            text += paging.count;
            this.$('.pagination-info').attr('placeholder', text);
        },

        _updateStatisticsInfo: function () {
            this._replaceNode('#grid-header-summary', 'template-grid-header-summary');
            this._replaceNode('#grid-footer-summary', 'template-grid-footer-summary');
        },

        // Utility function to replace a page DOM node.
        _replaceNode: function (nodeSelector, template) {
            this.$(nodeSelector).replaceWith(APP.utils.renderTemplate(template, APP.state));
        },

        // Open errata detail page.
        _openDetailPage: function (uid) {
            var url;

            url = window.location.href.replace("search", "viewer");
            url += "?uid=";
            url += uid;
            APP.utils.openURL(url, true);
        }
    });

}(
    this.APP,
    this.APP.state.paging,
    this.APP.state.sorting,
    this._,
    this.$,
    this.Backbone,
    this.window
));
