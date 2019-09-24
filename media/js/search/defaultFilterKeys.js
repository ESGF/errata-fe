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
    'esdoc:errata:project': {
        urlParam: 'project',
        defaultValue: 'esdoc:errata:project:cmip6'
    },

    // ... CMIP5 defaults.
    'wcrp:cmip5:experiment': {
        urlParam: 'experiment',
        defaultValue: null
    },
    'wcrp:cmip5:institute': {
        urlParam: 'institute',
        defaultValue: null
    },
    'wcrp:cmip5:model': {
        urlParam: 'model',
        defaultValue: null
    },
    'wcrp:cmip5:variable': {
        urlParam: 'variable',
        defaultValue: null
    },

    // ... CMIP6 defaults.
    'wcrp:cmip6:experiment-id': {
        urlParam: 'experiment',
        defaultValue: null
    },
    'wcrp:cmip6:institution-id': {
        urlParam: 'institute',
        defaultValue: null
    },
    'wcrp:cmip6:source-id': {
        urlParam: 'source',
        defaultValue: null
    },
    'wcrp:cmip6:variable-id': {
        urlParam: 'variable',
        defaultValue: null
    },

    // ... CORDEX defaults.
    'wcrp:cordex:experiment': {
        urlParam: 'experiment',
        defaultValue: null
    },
    'wcrp:cordex:institute': {
        urlParam: 'institute',
        defaultValue: null
    },
    'wcrp:cordex:rcm-model': {
        urlParam: 'model',
        defaultValue: null
    },
    'wcrp:cordex:variable': {
        urlParam: 'variable',
        defaultValue: null
    },

    // ... INPUT4MIPS defaults.
    'wcrp:input4mips:institution-id': {
        urlParam: 'institute',
        defaultValue: null
    },
    'wcrp:input4mips:source-id': {
        urlParam: 'source',
        defaultValue: null
    },
    'wcrp:input4mips:target-mip': {
        urlParam: 'mip',
        defaultValue: null
    },
    'wcrp:input4mips:variable-id': {
        urlParam: 'variable',
        defaultValue: null
    },
};

