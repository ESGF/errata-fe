// --------------------------------------------------------
// search/cookies.js - page cookie manager.
// --------------------------------------------------------
(function (cookies) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Search result page size.
    cookies.set('errata-page-size', cookies.get('errata-page-size') || 25);

    // Filter: status.
    cookies.set('errata-filter-status', cookies.get('errata-filter-status') || "*");

}(
    this.Cookies
));