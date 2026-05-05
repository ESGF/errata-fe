export { User }   from  '../shared/model.js';
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
        this.project = c.project;
        this.uiPosition =  c.key === "project" ? 0 :
                           c.key === "severity" ? 1000 :
                           c.key === "status" ? 1001 :
                           c.key === "moderationStatus" ? 1002 : 100;

        // Project must be specified.
        if (c.key !== "project") {
            this.data.all.unshift({
                key: "*",
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
    constructor(data, filters) {
        // Support both object and array formats for backward compatibility.
        this.project = data.project;
        this.institutionID = data.institute;
        this.uid = data.uid;
        this.title = data.title;
        this.severity = data.severity;
        this.status = data.status;
        this.dateCreated = data.dateCreated || null;
        this.dateClosed = data.dateClosed || null;
        this.dateUpdated = data.dateUpdated || null;
        this.moderationStatus = data.moderation_status;

        this.ext = new SearchResultExtensionInfo(this, filters);
    }
}

// Extended search result information.
class SearchResultExtensionInfo {
    // Instance ctor.
    constructor(i, filters) {
        this.severity = filters[1].data.set[i.severity];
        this.status = filters[2].data.set[i.status];
        this.institutionID = i.institutionID ? i.institutionID.toUpperCase() : '--';
        this.title = (i.title || '--').trim();
        if (this.title.length > 53) {
            this.title = this.title.slice(0, 53) + " ...";
        }
    }
}
