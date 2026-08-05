// Module imports.
import * as APP         from  '../shared/application.js';
import * as CONSTANTS   from  '../shared/constants.js';
import { Issue, User } from "./model.js";

// Issue.
export const issue = new Issue();

// User.
export const user = new User();

export const projects = [
    {
        'canonical_name': 'cmip6',
        'key': 'cmip6',
        'label': 'CMIP6',
        'namespace': 'cmip6',
        'facets': ['institution_id', 'experiment_id', 'source_id', 'variable_id'],
        'is_documented': true,
        'is_pid_client': true
    },
    {
        'canonical_name': 'cmip7',
        'key': 'cmip7',
        'label': 'CMIP7',
        'namespace': 'cmip7',
        'facets': ['institution', 'experiment', 'source', 'variable'],
        'is_documented': true,
        'is_pid_client': true
    },
    {
        'canonical_name': 'cordex-cmip5',
        'key': 'cordex-cmip5',
        'label': 'CORDEX-CMIP5',
        'namespace': 'cordex-cmip5',
        'facets': ['institute', 'experiment', 'rcm-model', 'variable'],
        'is_documented': true,
        'is_pid_client': true
    },
    {
        'canonical_name': 'cordex-cmip6',
        'key': 'cordex-cmip6',
        'label': 'CORDEX-CMIP6',
        'namespace': 'cordex-cmip6',
        'facets': ['institution_id', 'driving_experiment_id', 'source_id', 'variable_id'],
        'is_documented': true,
        'is_pid_client': true
    },
    {
        'canonical_name': 'input4mips',
        'key': 'input4mips',
        'label': 'input4MIPs',
        'namespace': 'input4mips',
        'facets': [
            'target-mip',
            'institution-id',
            'source-id',
            'variable-id'
        ],
        'is_documented': true,
        'is_pid_client': true
    }
]
export const severities = [
    {
        'canonical_name': 'low',
        'key': 'low',
        'label': 'Low',
        'namespace': 'low',
        'color': '#e6b8af',
        'sortOrdinal': 0
    },
        {
        'canonical_name': 'medium',
        'key': 'medium',
        'label': 'Medium',
        'namespace': 'medium',
        'color': '#dd7e6b',
        'sortOrdinal': 1
    },
    {
        'canonical_name': 'high',
        'key': 'high',
        'label': 'High',
        'namespace': 'high',
        'color': '#cc4125',
        'sortOrdinal': 2
    },
    {
        'canonical_name': 'critical',
        'key': 'critical',
        'label': 'Critical',
        'namespace': 'critical',
        'color': '#a61c00',
        'sortOrdinal': 3
    },
]
export const statuses = [
    {
        'canonical_name': 'new',
        'key': 'new',
        'label': 'New',
        'namespace': 'new',
        'color': '#00ff00'
    },
    {
        'canonical_name': 'onhold',
        'key': 'onhold',
        'label': 'On Hold',
        'namespace': 'onhold',
        'color': '#ff9900'
    },
    {
        'canonical_name': 'resolved',
        'key': 'resolved',
        'label': 'Resolved',
        'namespace': 'resolved',
        'color': '#0c343d'
    },
    {
        'canonical_name': 'wontfix',
        'key': 'wontfix',
        'label': 'Wont Fix',
        'namespace': 'wontfix',
        'color': '#38761d'
    }
]

// Event handler: field:change:aborted.
APP.on("field:change:aborted", (field) => {
    const slot = getIssueSlotFromViewField(field.id);

    issue[slot] = _.isArray(field.value) ? [] : null;
});

// Event handler: field:change:verified.
APP.on("field:change:verified", (field) => {
    const slot = getIssueSlotFromViewField(field);

    issue[slot] = field.value;
});

// Event handler: errata:save.
APP.on("errata:save:start", () => {
    if (issue.hasChanged) {
        APP.trigger("errata:save:dispatch");
    } else {
        APP.trigger("errata:save:abort");
    }
});

// Utility fn: returns issue slot identifier from view field identifier.
const getIssueSlotFromViewField = (field) => {
    if (field.id === "moderation-status") {
        return "moderationStatus";
    } else {
        return field.id;
    }
};
