// Module imports.
import * as STATE from  './state.js';

// Search result.
export default class Issue {
    // Instance ctor.
    constructor(i) {
        _.each(_.keys(i), (k) => {
            this[k] = i[k];
        })
        this.datasets = this.datasets.sort();
        this.ext = new IssueExtensionInfo(this);
    }

    // Full issue title.
    get fullTitle () {
        var result;

        result = this.project.toUpperCase();
        result += " - ";
        result += this.institute.toUpperCase();
        result += " - ";
        result += this.title.slice(0, 48);
        if (this.title.length > 48) {
            result += "...";
        }

        return this.title;
    }
}

// Extended issue information.
class IssueExtensionInfo {
    // Instance ctor.
    constructor(i) {
        this.facets = _.map(i.facets, (j) => new IssueFacet(j));
        this.institute = i.institute.toUpperCase();
        this.project = STATE.getVocabTerm('esdoc:errata:project', i.project);
        this.projectFacets = _.filter(this.project.facets, (j) => { return j.split(':')[2].startsWith('institut') === false});
        this.projectDocURL = this.project.isDocumented ? "https://documentation.es-doc.org/" + this.project.canonicalName : null;
        this.severity = STATE.getVocabTerm('esdoc:errata:severity', i.severity);
        this.status = STATE.getVocabTerm('esdoc:errata:status', i.status);
        this.affectedFacets = _.map(this.projectFacets, (j) => new AffectedFacetSet(i.project, this.facets, j));
    }
}

// Issue facet information.
class IssueFacet {
    // Instance ctor.
    constructor(namespace) {
        this.namespace = namespace;
        this.typeof = namespace.split(':').slice(0, 3).join(':');
        this.value = namespace.split(':')[3];
    }
}

// Encapsulates information regarding a set of affected facets.
class AffectedFacetSet {
    constructor(project, facets, collectionID) {
        this.collection = STATE.getVocabCollection(collectionID);
        this.terms = _.filter(this.collection.terms, (i) => {
            return _.find(facets, (j) => {
                return i.namespace === j.namespace;
            })
        });
        if (_.isUndefined(this.collection.cimDocumentType) === false) {
            _.each(this.terms, (i) => {
                i.documentationURL = 'https://documentation.es-doc.org/' + project + '/' + this.collection.cimDocumentTypeSynonym + 's/' + i.canonicalName;
            });
        }
    }
}