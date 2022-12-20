// Module imports.
import * as UTILS from '../shared/utilities.js';
import getDefaultFilterKey from './defaultFilterKeys.js';

// Encapsulates a search filter.
export class SearchFilter {
    // Instance ctor.
    constructor(c) {
        // Filter data.
        this.data = {
            all: _.sortBy(c.terms, (i) => {
                return i.sortOrdinal || i.key;
            }),
            current: null,
            set: {}
        };

        // Filter fields.
        this.defaultKey = getDefaultFilterKey(c) || null;
        this.key = c.key;
        this.label = c.label;
        this.project = c.key.startsWith('esdoc') ? null : c.key.split(':')[1];
        this.uiPosition =  c.key === "esdoc:errata:project" ? 0 :
                           c.key === "esdoc:errata:severity" ? 1000 :
                           c.key === "esdoc:errata:status" ? 1001 : 100;

        // Project must be specified.
        if (c.key !== "esdoc:errata:project") {
            this.data.all.unshift({
                key: this.key + ":*",
                label: "*"
            });
        }

        // Set current item using default key (if specified).
        if (this.defaultKey) {
            this.data.current = _.find(this.data.all, (i) => {
                return i.key === this.defaultKey;
            });
        }

        // Set current item and set of items.
        this.data.current = this.data.current || this.data.all[0];
        this.data.set = _.indexBy(this.data.all, 'key');
    }
}

// Search result.
export class SearchResult {
    // Instance ctor.
    constructor(i, filters) {
        this.project = i[0];
        this.institutionID = i[1];
        this.uid = i[2];
        this.title = i[3];
        this.severity = i[4];
        this.status = i[5];
        this.dateCreated = i[6];
        this.dateClosed = i[7];
        this.dateUpdated = i[8];
        this.ext = new SearchResultExtensionInfo(this, filters);
    }
}

// Extended search result information.
class SearchResultExtensionInfo {
    // Instance ctor.
    constructor(i, filters) {
        this.severity = filters[1].data.set['esdoc:errata:severity:' + i.severity];
        this.status = filters[2].data.set['esdoc:errata:status:' + i.status];
        this.institutionID = i.institutionID.toUpperCase();
        this.title = (i.title || '--').trim();
        if (i.title.length > 53) {
            this.title = i.title.slice(0, 53) + " ...";
        }
    }
}
