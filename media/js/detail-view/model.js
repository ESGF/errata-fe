export { User } from '../shared/model.js';
import * as STATE from  './state.js';

// Search result.
export class Issue {
    // Instance ctor.
    constructor(json_input) {
        _.each(_.keys(json_input), (property) => {
            this[property] = json_input[property];
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
    constructor(issue) {
        this.facets = [];
        _.each(issue.facets, (terms, collection) => {
            _.each(terms, (term) => {
                this.facets.push(new IssueFacet(collection, term));
            });
        });
        this.institute = issue.institute.toUpperCase();
        this.project = STATE.getVocabTerm('project', issue.project);
        this.projectFacets = _.filter(this.project.facets, (facet) => { return facet.startsWith('institut') === false});
        this.projectDocURL = this.project.isDocumented ? "https://documentation.es-doc.org/" + this.project.canonicalName : null;
        this.severity = STATE.getVocabTerm('severity', issue.severity);
        this.status = STATE.getVocabTerm('status', issue.status);
        this.affectedFacets = _.map(this.projectFacets, (collectionID) => new AffectedFacetSet(issue.project, this.facets, collectionID));
    }
}

// Issue facet information.
class IssueFacet {
    // Instance ctor.
    constructor(collection, term) {
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
                return (
                    facet.typeof === collectionID &&
                    term.drs_name === facet.value
                );
            })
        });

        if (_.isUndefined(this.collection.cimDocumentType) === false) {
            _.each(this.terms, (term) => {
                term.documentationURL =
                    'https://documentation.es-doc.org/' +
                    project + '/' +
                    this.collection.cimDocumentTypeAlternativeName +
                    's/' +
                    term.canonicalName;
            });
        }
    }
}
