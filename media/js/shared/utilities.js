// Module imports.
import * as APP     from    '../shared/application.js';
import * as constants from './constants.js';

// Opens the target url.
// @url     URL to be opened.
// @inTab   Flag indicating whether url will be opened in a new browser tab or not.
export const openURL = (url, inTab) => {
    if (inTab === true) {
        window.open(url);
    } else {
        window.location = url;
    }
};

// Opens module documentation.
export const openDocumentation = () => {
    openURL(constants.URLS.DOCUMENTATION, true);
};

// Opens PID documentation.
export const openPIDDocumentation = () => {
    openURL(constants.URLS.DOCUMENTATION_PID, true);
};

// Opens the homepage.
export const openHomepage = () => {
    openURL(constants.URLS.PAGE_HOME, true);
};

// Opens the target email.
// @address         Target email address.
// @subject         Target email subject.
export const openEmail = (address, subject, message) => {
    var email = "mailto:{0}?subject={1}&body={2}";

    subject = subject || constants.EMAIL.SUBJECT;
    message = message || constants.EMAIL.MESSAGE;

    email = email.replace('{0}', address);
    email = email.replace('{1}', subject);
    email = email.replace('{2}', message);

    window.location.href = email;
};

// Opens module support email.
// @module         Module for which a support email is being sent.
export const openSupportEmail = () => {
    var subject;

    subject = "ESGF :: SUPPORT :: {0} (v{1})";
    subject = subject.replace("{0}", APP.NAME.toUpperCase());
    subject = subject.replace("{1}", APP.VERSION);
    openEmail(constants.EMAIL.SUPPORT, subject);
};

// Renders a view.
// @type          View type.
// @options       View options.
// @container     View container.
export const render = (types, options, container) => {
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
export const renderHTML = (template, data, container) => {
    var html = data ? template(data) : template();

    if (!_.isUndefined(container)) {
        if (_.has(container, '$el')) {
            container.$el.append(html);
        } else {
            container.append(html);
        }
    }
};

// Template cache.
const templateCache = {};

// Returns a rendered template.
// @templateID          View template ID.
// @templateData        View template data.
// @container           View container.
export const renderTemplate = (templateID, templateData, view) => {
    var template, html;

    APP.log(`template: ${templateID}`);

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
export const getURLParam = (name, defaultValue) => {
    var
        results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) {
        return defaultValue;
    }
    return (results[1] || defaultValue).toUpperCase();
};

// Returns number of pages to be rendered.
export const getPageCount = function (pageSize, row_count) {
    var pageCount = 0;

    if (row_count) {
        pageCount = parseInt(row_count / pageSize, 10);
        if (row_count / pageSize > pageCount) {
            pageCount += 1;
        }
    }

    return pageCount;
};

// Converts search results into pages for rendering.
export const getPages = (pageSize, data) => {
    return _.map(_.range(getPageCount(pageSize, data.length)), function (id) {
        return {
            id: id + 1,
            data: this.slice(id * pageSize, ((id + 1) * pageSize) - 1)
        };
    }, data);
};

// Displays feedback modal.
export const displayFeedback = (text) => {
    $('#feedbackText').text(text + " ... please wait");
    $('.feedback-title').text(APP.FULLTITLE);
    $('.feedback-version').text("v" + APP.VERSION);
    $("#feedbackContainer").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
};

// Hides feedback modal.
export const hideFeedback = () => {
    $("#feedbackContainer").modal('hide');
};

// Displays information dialog modal.
export const displayInfoDialog = (text, callback) => {
    $('#infoDialogText').text(text);
    $('.infoDialog-title').text(APP.FULLTITLE);
    $('.infoDialog-version').text("v" + APP.VERSION);
    if (callback) {
        $('#infoDialogContainer').on('hide.bs.modal', callback);
    }
    $("#infoDialogContainer").modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    });
};

// Hides information dialog modal.
export const hideInfoDialog = () => {
    $("#infoDialog").modal('hide');
};

// Generates a universally unique identifier.
export const generateUUID = () => {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });

    return uuid;
};
