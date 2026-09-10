export { User } from '../shared/model.js';
import * as STATE from  './state.js';

// Search result.
export class Issue {
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
        result += this.title.slice(0, 48);
        if (this.title.length > 48) {
            result += "...";
        }

        return result;
    }
}

// Extended issue information.
class IssueExtensionInfo {
    // Instance ctor.
    constructor(i) {
        this.facets = _.map(i.facets, (term, collection) => new IssueFacet(collection, term));
        this.institute = i.institute.toUpperCase();
       // this.project = STATE.getVocabTerm('project', i.project);
        const projectID = i.facets.project || i.project;
        this.project = STATE.getVocabTerm('project', projectID);
        this.projectFacets = _.filter(this.project.facets, (j) => { return j.startsWith('institut') === false});
        this.projectDocURL = this.project.isDocumented ? "https://documentation.es-doc.org/" + this.project.canonicalName : null;
        this.severity = STATE.getVocabTerm('severity', i.severity);
        this.status = STATE.getVocabTerm('status', i.status);
        this.affectedFacets = _.map(this.projectFacets, (j) => new AffectedFacetSet(projectID, this.facets, j));
    }
}

// Issue facet information.
class IssueFacet {
    // Instance ctor.
    constructor(collection, term) {
        this.namespace = term;
        this.typeof = collection;
        this.value = term;
    }
}

// Encapsulates information regarding a set of affected facets.
class AffectedFacetSet {
    constructor(project, facets, collectionID) {
        this.collection = STATE.getVocabCollection(collectionID);
        this.terms = _.filter(this.collection.terms, (term) => {
            return _.find(facets, (facet) => {
                return term.drs_name === facet.namespace;
            })
        });
        if (_.isUndefined(this.collection.cimDocumentType) === false) {
            _.each(this.terms, (i) => {
                i.documentationURL = 'https://documentation.es-doc.org/' + project + '/' + this.collection.cimDocumentTypeAlternativeName + 's/' + i.canonicalName;
            });
        }
    }
}
