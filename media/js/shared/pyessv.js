// A node within the domain model.
class Node {
    // Instance ctor.
    constructor (n) {
        _.each(_.keys(n), (key) => {
            this[key] = n[key];
        });
    }
}

// An entity publishing a vocabulary: e.g. esdoc.
class Authority extends Node {
    // Instance ctor.
    constructor (a) {
        super(a);
        this.scopes = _.map(a.scopes, (s) => {
            return new Scope(a, s);
        });
    }

    getScope (name) {
        return _.find(this.scopes, (s) => {
            return s.canonicalName.toLowerCase() === name.toLowerCase();
        });
    }
}

// A scopoed set of term collections: e.g. errata.
class Scope extends Node {
    // Instance ctor.
    constructor (a, s) {
        super(s);
        this.authority  = a;
        this.collections = _.map(s.collections, (c) => {
            return new Collection(a, s, c);
        });
    }

    getCollection (name) {
        return _.find(this.collections, (c) => {
            return c.canonicalName.toLowerCase() === name.toLowerCase();
        });
    }

    getTerms (collectionName) {
        let collection = this.getCollection(collectionName);
        if (collection) {
            return _.sortBy(collection.terms, (i) => {
                return _.has(i.data, 'sortOrdinal') ? i.data.sortOrdinal : i.canonicalName;
            })
        }
    }

    getTerm (collectionName, termName) {
        let collection = this.getCollection(collectionName);
        if (collection) {
            return collection.getTerm(termName);
        }
    }
}

// A collection of terms: e.g. severity.
class Collection extends Node {
    // Instance ctor.
    constructor (a, s, c) {
        super(c);
        this.authority  = a;
        this.scope  = s;
        this.terms = _.map(c.terms, (t) => {
            return new Term(a, s, c, t);
        });
   }

    getTerm (name) {
        return _.find(this.terms, (t) => {
            return t.canonicalName.toLowerCase() === name.toLowerCase();
        });
    }
}

// A vocabulary term: e.g. high.
class Term extends Node {
    // Instance ctor.
    constructor (a, s, c, t) {
        super(t);
        this.authority  = a;
        this.scope  = s;
        this.collection  = c;
    }

    // Returns a flag indicating whether a name is matched.
    isMatch (name) {
        return this.canonicalName === name;
    }
}

// Encapsulates access to ES-DOC vocabularies.
class Esdoc extends Authority {
    // Instance ctor.
    constructor (a) {
        super(a);
        this.CMIP6 = new EsdocCmip6(a, this.getScope('cmip6'));
        this.ERRATA = new EsdocErrata(a, this.getScope('errata'));
    }
}

// Encapsulates access to ES-DOC CMIP6 vocabularies.
class EsdocCmip6 extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getModelTopicAction (name) {
        return this.getTerm('model-topic', name);
    }

    getModelTopicCollection () {
        return this.getCollection('model-topic');
    }
}

// Encapsulates access to ES-DOC Errata vocabularies.
class EsdocErrata extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getPidTaskAction (name) {
        return this.getTerm('pid-task-action', name);
    }

    getPidTaskActionCollection () {
        return this.getCollection('pid-task-action');
    }

    getPidTaskStatus (name) {
        return this.getTerm('pid-task-status', name);
    }

    getPidTaskStatusCollection () {
        return this.getCollection('pid-task-status');
    }

    getProject (name) {
        return this.getTerm('project', name);
    }

    getProjectTerms () {
        return this.getTerms('project');
    }

    getSeverity (name) {
        return this.getTerm('severity', name);
    }

    getSeverityTerms () {
        return this.getTerms('severity');
    }

    getStatus (name) {
        return this.getTerm('status', name);
    }

    getStatusTerms () {
        return this.getTerms('status');
    }
}

// Encapsulates access to WCRP vocabularies.
class Wcrp extends Authority {
    // Instance ctor.
    constructor (a) {
        super(a);
        this.CMIP5 = new WcrpCmip5(a, this.getScope('cmip5'));
        this.CMIP6 = new WcrpCmip6(a, this.getScope('cmip6'));
        this.CORDEX = new WcrpCordex(a, this.getScope('cordex'));
        this.GLOBAL = new WcrpGlobal(a, this.getScope('global'));
    }
}

// Encapsulates access to WCRP CMIP5 vocabularies.
class WcrpCmip5 extends Scope {
    constructor (a, s) {
        super(a, s);
    }
}

// Encapsulates access to WCRP CMIP6 vocabularies.
class WcrpCmip6 extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getActivity (name) {
        return this.getTerm('activity-id', name);
    }

    getExperiment (name) {
        return this.getTerm('experiment-id', name);
    }

    getInstitution (name) {
        return this.getTerm('institution-id', name);
    }

    getSource (name) {
        return this.getTerm('source-id', name);
    }
}

// Encapsulates access to WCRP Cordex vocabularies.
class WcrpCordex extends Scope {
    constructor (a, s) {
        super(a, s);
    }
}

// Encapsulates access to WCRP global vocabularies.
class WcrpGlobal extends Scope {
    constructor (a, s) {
        super(a, s);
    }

    getMipEra (name) {
        return this.getTerm('mip-era', name);
    }
}

// Application mode.
const APP_MODE = (() => {
    if (window.location.host && window.location.host.indexOf('es-doc.org') >= 0) {
        if (window.location.host.indexOf('test') >= 0) {
            return 'test';
        }
        return 'prod';
    }
    return 'dev';
})();

// Api URL.
const URL_API = {
    "dev": "http://localhost:5010",
    "test": "https://test-api-pyessv.es-doc.org",
    "prod": "https://api-pyessv.es-doc.org"
}[APP_MODE] + "/1/retrieve";

// WCRP controlled vocabulary authority.
export let WCRP = null;

// ES-DOC controlled vocabulary authority.
export let ESDOC = null;

// Event handler: setup:begin.
export const initialise = (onSuccess, onError) => {
    $.get(URL_API)
        .done((data) => {
            _.each(data.data, (a) => {
                switch(a.canonicalName) {
                    case 'wcrp':
                        WCRP = new Wcrp(a);
                        break;
                    case 'esdoc':
                        ESDOC = new Esdoc(a);
                        break;
                }
            });
            onSuccess();
        })
        .fail(() => {
            onError();
        });
};
