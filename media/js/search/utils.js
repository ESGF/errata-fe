// --------------------------------------------------------
// core.utils.js - misceallaneous helper functions used across applications.
// --------------------------------------------------------
(function (APP, constants, _, $, console, window) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Cache of loaded templates.
    var templateCache = {};

    // Outputs message to brwoser logging console.
    // @msg          Logging message.
    APP.log = APP.utils.log = function (msg) {
        console.log(new Date() + " :: " + APP.constants.logging.PREFIX + msg);
    };

    // Opens the target url.
    // @url     URL to be opened.
    // @inTab   Flag indicating whether url will be opened in a new browser tab or not.
    APP.utils.openURL = function (url, inTab) {
        if (inTab === true) {
            window.open(url);
        } else {
            window.location = url;
        }
    };

    // Opens the homepage.
    APP.utils.openHomepage = function () {
        APP.utils.openURL(APP.constants.URLS.HOME_PAGE, true);
    };

    // Opens the target email.
    // @address         Target email address.
    // @subject         Target email subject.
    APP.utils.openEmail = function (address, subject, message) {
        var email = "mailto:{0}?subject={1}&body={2}";

        subject = subject || APP.constants.EMAIL.SUBJECT;
        message = message || APP.constants.EMAIL.MESSAGE;

        email = email.replace('{0}', address);
        email = email.replace('{1}', subject);
        email = email.replace('{2}', message);

        window.location.href = email;
    };

    // Opens module support email.
    // @module         Module for which a support email is being sent.
    APP.utils.openSupportEmail = function () {
        var subject;

        subject = "ES-DOC :: SUPPORT :: ERRATA (v{0}) :: support question";
        subject = subject.replace("{0}", APP.VERSION);
        APP.utils.openEmail(APP.constants.EMAIL.SUPPORT, subject);
    };

    // Renders a view.
    // @type          View type.
    // @options       View options.
    // @container     View container.
    APP.utils.render = function (types, options, container) {
        var typeset, view, rendered = [];

        typeset = _.isArray(types) ? types : [types];
        _.each(typeset, function (ViewType) {
            view = new ViewType(options).render();
            rendered.push(view);
            if (!_.isUndefined(container)) {
                if (_.has(container, '$el')) {
                    container.$el.append(view.$el);
                } else {
                    container.append(view.$el);
                }
            }
        }, this);

        return typeset.length === 1 ? rendered[0] : rendered;
    };

    // Renders an html view and injects it into DOM.
    // @template            View template.
    // @data                View template data.
    // @container           View container.
    APP.utils.renderHTML = function (template, data, container) {
        var html = data ? template(data) : template();

        if (!_.isUndefined(container)) {
            if (_.has(container, '$el')) {
                container.$el.append(html);
            } else {
                container.append(html);
            }
        }
    };

    // Returns a rendered template.
    // @templateID          View template ID.
    // @templateData        View template data.
    // @container           View container.
    APP.utils.renderTemplate = function (templateID, templateData, view) {
        var template, html;

        if (!_.has(templateCache, templateID)) {
            templateCache[templateID] = _.template($('#' + templateID).html());
        }
        template = templateCache[templateID];
        html = template(templateData);

        if (view && view.$el) {
            view.$el.append(html);
        } else if (view) {
            view.replaceWith(html);
        } else {
            return html;
        }
    };

    // Returns URL query param value.
    // @name                URL query param name.
    // @defaultValue        URL query param default value.
    APP.utils.getURLParam = function (name, defaultValue) {
        var
            results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (!results) {
            return defaultValue;
        }
        return (results[1] || defaultValue).toUpperCase();
    };

    // Returns number of pages to be rendered.
    APP.utils.getPageCount = function (row_count) {
        var pageSize = APP.state.paging.pageSize,
            pageCount = 0;

        if (row_count) {
            pageCount = parseInt(row_count / pageSize, 10);
            if (row_count / pageSize > pageCount) {
                pageCount += 1;
            }
        }

        return pageCount;
    };

    // Converts search results into pages for rendering.
    APP.utils.getPages = function (data) {
        var pageSize = APP.state.paging.pageSize;

        return _.map(_.range(APP.utils.getPageCount(data.length)), function (id) {
            return {
                id: id + 1,
                data: this.slice(id * pageSize, ((id + 1) * pageSize) - 1)
            };
        }, data);
    };

}(
    this.APP,
    this.APP.constants,
    this._,
    this.$,
    this.console,
    this.window
));
