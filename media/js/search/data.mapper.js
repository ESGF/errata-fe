(function (APP) {
    // ECMAScript 5 Strict Mode
    "use strict";

    // Returns an issue object mapped form an array of values.
    APP.mapIssue = function (i) {
        return {
            project: i[0],
            institute: i[1],
            uid: i[2],
            title: i[3],
            severity: i[4],
            status: i[5],
            createdAt: i[6],
            closedAt: i[7],
            updatedAt: i[8]
        };
    };

}(
    this.APP
));
