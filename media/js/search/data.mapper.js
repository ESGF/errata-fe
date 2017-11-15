(function (APP) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Returns an issue object mapped form an array of values.
    APP.mapIssue = function (i) {
        return {
            mipEra: i[0],
            institutionID: i[1],
            uid: i[2],
            title: i[3],
            severity: i[4],
            status: i[5],
            dateCreated: i[6],
            dateClosed: i[7],
            dateUpdated: i[8]
        };
    };

    APP.mapProject = function (p) {
        return p;
    };

}(
    this.APP
));
