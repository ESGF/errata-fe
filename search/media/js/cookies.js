// --------------------------------------------------------
// search/cookies.js - page cookie manager.
// --------------------------------------------------------
(function (cookies) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Search result page size.
    cookies.set('errata-search-page-size',
    			cookies.get('errata-search-page-size') || 25);

    // Filter: status.
    cookies.set('errata-filter-state',
    			cookies.get('errata-search-filter-state') || "*");

}(
    this.Cookies
));