// Module imports.
import * as APP from '../shared/application.js';

// Event handler: setup complete.
APP.on("issue:save", () => {
    // Issue is valid therefore confirm save process.
    APP.trigger('issue:save:confirmed');
});
