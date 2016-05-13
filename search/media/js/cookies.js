(function (cookies) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Search grid page size.
    cookies.set('errata-search-page-size',
                cookies.get('errata-search-page-size') || 25,
                { expires: 3650 });

    // Search filter: status.
    cookies.set('errata-search-filter-state',
                cookies.get('errata-search-filter-state') || "*",
                { expires: 3650 });

}(
    this.Cookies
));