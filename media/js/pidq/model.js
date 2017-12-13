// Module imports.
import * as STATE from  './state.js';

// Search result.
export class Task {
    // Instance ctor.
    constructor(i) {
        _.each(_.keys(i), (k) => {
            this[k] = i[k];
        })
        this.ext = new TaskExtensionInfo(this);
    }
}

// Extended task information.
class TaskExtensionInfo {
    // Instance ctor.
    constructor(i) {
        this.action = STATE.filters[1].data.set['esdoc:errata:pid-task-action:' + i.action];
        this.status = STATE.filters[2].data.set['esdoc:errata:pid-task-status:' + i.status];
    }
}

// Encapsulates a search filter.
export class SearchFilter {
    // Instance ctor.
    constructor(c) {
        var defaultNamespace;

        // Set core fields.
        this.data = {
            all: _.sortBy(c.terms, (i) => {
                return i.sortOrdinal || i.key;
            }),
            current: null,
            set: {}
        };
        this.key = c.key;
        this.label = c.label;
        this.uiPosition =  c.key === "esdoc:errata:project" ? 0 :
                           c.key === "esdoc:errata:pid-task-action" ? 1000 :
                           c.key === "esdoc:errata:pid-task-status" ? 1001 : 100;

        // Set data.
        if (c.key != "esdoc:errata:project") {
            this.data.all.unshift({
                key: c.key + ":*",
                label: "*",
                namespace: c.key + ":*",
            })
        }
        defaultNamespace = c.key === "esdoc:errata:project" ? "esdoc:errata:project:cmip6" : null;
        if (defaultNamespace) {
            this.data.current = _.find(this.data.all, (i) => {
                return i.key === defaultNamespace;
            });
        }
        this.data.current = this.data.current || this.data.all[0];
        this.data.set = _.indexBy(this.data.all, 'key');
    }
}
