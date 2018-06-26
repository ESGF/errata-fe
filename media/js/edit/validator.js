// ************************************************************
// NOTE: this module essentially wraps https://validatejs.org
// ************************************************************

// Module imports.
import * as APP from '../shared/application.js';

// Override staandard messages.
validate.validators.presence.options = {
    message: "Must enter a value."
};

// Custom validator: materials.
validate.validators.materialsValidator = function(urls) {
    const errMessage = "Issue materials must be a list of valid image URLs (.jpg, .gif, .png, .tiff)";

    // Invalid if undefined.
    if (urls.length === 0) {
        return errMessage;
    }

    // Invalid if contains malformed URL.
    const imageFileExtensions = ["jpg", "gif", "png", "tiff"];
    const invalidURLs = _.filter(urls, (url) => {
        return _.isObject(validate({material: url}, {material: {url: true}})) ||
                _.contains(imageFileExtensions, _.last(url.split('.'))) === false;
    });
    if (invalidURLs.length > 0) {
        return errMessage;
    }
};

// Custom validator: datasets.
validate.validators.datasetsValidator = function(identifiers) {
    const errMessage = "Issue datasets must be a list of valid dataset identifiers";

    // Invalid if undefined.
    if (identifiers.length === 0) {
        return errMessage;
    }

    console.log("TODO: Check datasets prefixed with project code");
    console.log("TODO: POST datasets to server for validation");
};

// Set field constraints to be applied.
const CONSTRAINTS = {
    project: {
        presence: true,
        inclusion: {
            within: ['cmip5', 'cmip6', 'cordex'],
            message: 'Issue project is required.'
        }
    },
    title: {
        presence: true,
        length: {
            minimum: 16,
            maximum: 255,
            message: "Issue title is required & must be 16 to 255 characters."
        }
    },
    description: {
        presence: true,
        length: {
            minimum: 16,
            maximum: 1023,
            message: "Issue description is required & must be 16 to 1023 characters."
        }
    },
    severity: {
        presence: true
    },
    status: {
        presence: true
    },
    materials: {
        materialsValidator: {}
    },
    datasets: {
        presence: true,
        datasetsValidator: {}
    }
}

// Event handler: field:change.
APP.on("field:change", (field) => {
    const target = {};
    const constraints = {};

    // Set field error.
    target[field.id] = field.value === "" ? null : field.value;
    constraints[field.id] = CONSTRAINTS[field.id];
    const err = validate(target, constraints, {
        fullMessages: false
    });

    // Fire event.
    if (err) {
        field.err = err[field.id][0];
        APP.trigger("field:change:aborted", field);
    } else {
        APP.trigger("field:change:verified", field);
    }
});

// Event handler: issue:save.
APP.on("issue:save", (field) => {
    const err = true;

    // Fire event.
    if (err) {
        APP.trigger("issue:save:aborted");
    } else {
        APP.trigger("issue:save:verified");
    }
});
