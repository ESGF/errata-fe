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
            state: i[4],
            severity: i[5],
            workflow: i[6],
            dateCreated: i[7],
            dateUpdated: i[8]
        };
    };

}(
    this.APP
));
