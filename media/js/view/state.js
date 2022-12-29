// Module imports.
import { Issue, User } from  './model.js';
import * as UTILS from  '../shared/utilities.js';

// Issue.
export const user = User;

// Issue.
export var issue = null;

// Issue UID.
export const issueUID = UTILS.getURLParam("uid");

// Issue datasets.
export var datasets = [];

// Issue facets.
export var facets = [];

// Vocab set.
export var vocabs = [];

// Vocab: errata projects.
export var projects = [];

// Vocab: issue severity.
export var severity = [];

// Vocab: issue status.
export var status = [];

export const setVocabs = (data) => {
	vocabs = data;
    projects = data[0];
    severity = data[1];
    status = data[2];
}

export const setIssue = (data) => {
    issue = new Issue(data);
    datasets = data.datasets;
    facets = data.facets;
}

// Gets a vocabulary collection.
export const getVocabCollection = (collectionID) => {
    return _.find(vocabs, (i) => {
        return i.key === collectionID;
    });
}

// Gets a vocabulary term.
export const getVocabTerm = (collectionID, termID) => {
    const collection = getVocabCollection(collectionID);
    if (collection) {
        return _.find(collection.terms, (i) => {
            return i.canonicalName === termID;
        });
    }
}
