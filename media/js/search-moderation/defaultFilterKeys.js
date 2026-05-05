import * as UTILS from '../shared/utilities.js';

// Returns default search filter key.
export default ({ key }) => {
    const settings = DEFAULT_KEYS[key];
    if (settings) {
        const urlParamValue = UTILS.getURLParam(settings.urlParam);
        if (urlParamValue) {
            return `${key}:${urlParamValue.toLowerCase()}`;
        }
        return settings.defaultValue || null;
    }

    return null;
}

// Map of vocab keys to url parameters.
const DEFAULT_KEYS = {
    // ... errata project default.
    'project': {
        urlParam: 'project',
        defaultValue: 'cmip6'
    },

    // ... CMIP6 defaults.
    'experiment_id': {
        urlParam: 'experiment',
        defaultValue: null
    },
    'institution_id': {
        urlParam: 'institute',
        defaultValue: null
    },
    'source_id': {
        urlParam: 'source',
        defaultValue: null
    },
    'variable_id': {
        urlParam: 'variable',
        defaultValue: null
    },

    // ... CORDEX defaults.
    'experiment': {
        urlParam: 'experiment',
        defaultValue: null
    },
    'institute': {
        urlParam: 'institute',
        defaultValue: null
    },
    'rcm-model': {
        urlParam: 'model',
        defaultValue: null
    },
    'variable': {
        urlParam: 'variable',
        defaultValue: null
    },

    // ... INPUT4MIPS defaults.
    'institution-id': {
        urlParam: 'institute',
        defaultValue: null
    },
    'source-id': {
        urlParam: 'source',
        defaultValue: null
    },
    'target-mip': {
        urlParam: 'mip',
        defaultValue: null
    },
    'variable-id': {
        urlParam: 'variable',
        defaultValue: null
    },
};

