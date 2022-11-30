// ************************************************************
// NOTE: this module essentially wraps https://validatejs.org
// ************************************************************

// Module imports.
import * as APP from '../shared/application.js';

// Message literals.
const ERR_REQUIRED_FIELD = "Required field - you must enter a value.";
const ERR_INVALID_MATERIALS = "Must be a list of valid image file links (.jpg, .gif, .png, .tiff).";
const ERR_INVALID_LINKS = "Must be a list of valid links.";
const ERR_INVALID_DATASETS = "Must be a list of valid dataset identifiers.";
const ERR_INVALID_TITLE = "Must be 16 to 255 characters.";
const ERR_INVALID_DESCRIPTION = "Must be 16 to 1023 characters.";

// Override staandard error messages.
validate.validators.presence.options = {
    message: ERR_REQUIRED_FIELD
};

// Custom validator: materials.
validate.validators.materialsValidator = function(urls) {
    // Field is not required.
    if (urls.length === 0) {
        return;
    }

    // Invalid if contains malformed URL.
    const imageFileExtensions = ["jpg", "gif", "png", "tiff"];
    const invalidURLs = _.filter(urls, (url) => {
        return _.isObject(validate({field: url}, {field: {url: true}})) ||
               _.contains(imageFileExtensions, _.last(url.split('.'))) === false;
    });
    if (invalidURLs.length > 0) {
        return ERR_INVALID_MATERIALS;
    }
};

// Custom validator: urls.
validate.validators.urlsValidator = function(urls) {
    // Field is not required.
    if (urls.length === 0) {
        return;
    }

    // Invalid if contains malformed URL.
    const invalidURLs = _.filter(urls, (url) => {
        return _.isObject(validate({field: url}, {field: {url: true}}));
    });
    if (invalidURLs.length > 0) {
        return ERR_INVALID_LINKS;
    }
};

// Custom validator: datasets.
validate.validators.datasetsValidator = function(identifiers) {
    // Invalid if undefined.
    if (identifiers.length === 0) {
        return ERR_REQUIRED_FIELD;
    }

    console.log("TODO: Check datasets prefixed with project code");
    console.log("TODO: POST datasets to server for validation");

    return;
    return ERR_INVALID_DATASETS;

};

// Set field constraints to be applied.
const CONSTRAINTS = {
    project: {
        presence: true,
        inclusion: {
            within: ['cmip5', 'cmip6', 'cordex', 'input4mips'],
            message: ERR_REQUIRED_FIELD
        }
    },
    title: {
        presence: true,
        length: {
            minimum: 16,
            maximum: 255,
            message: ERR_INVALID_TITLE
        }
    },
    description: {
        presence: true,
        length: {
            minimum: 16,
            maximum: 1023,
            message: ERR_INVALID_DESCRIPTION
        }
    },
    severity: {
        presence: true,
        inclusion: {
            within: ['low', 'medium', 'high', 'critical'],
            message: ERR_REQUIRED_FIELD
        }
    },
    status: {
        presence: true,
        inclusion: {
            within: ['new', 'onhold', 'resolved', 'wontfix'],
            message: ERR_REQUIRED_FIELD
        }
    },
    urls: {
        urlsValidator: {}
    },
    materials: {
        materialsValidator: {}
    },
    datasets: {
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
