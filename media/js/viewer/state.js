(function (APP) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // Declare application state.
    APP.state = {
        APP: APP,

        datasets: [],

        issue: undefined,

        issueID: APP.utils.getURLParam("uid")
    };

}(
    this.APP
));