// View model.
class ViewModel {
    // Instance ctor.
    constructor(app) {
        this.APP = app;
        this.issue = null;
        this.vocabs = null;
    }

    // Gets issue datasets.
    get datasets () {
        return this.issue.datasets;
    }

    // Gets projects vocabulary collection.
    get projects () {
        return this.vocabs[0];
    }

    // Gets severity vocabulary collection.
    get severity () {
        return this.vocabs[1];
    }

    // Gets status vocabulary collection.
    get status () {
        return this.vocabs[2];
    }

    // Gets a vocabulary collection.
    getVocabCollection (collectionID) {
        return _.find(this.vocabs, (i) => {
            return i.key === collectionID;
        });
    }

    // Gets a vocabulary term.
    getVocabTerm (collectionID, termID) {
        var collection;

        collection = this.getVocabCollection(collectionID);
        if (collection) {
            return _.find(collection.terms, (i) => {
                return i.canonicalName === termID;
            });
        }
    }
}

// Initialise application.
window.APP = new window.ErrataApplication(ViewModel, "Viewer");

// Event handler: document ready.
$(document).ready(() => {
    window.APP.trigger("setup:begin");
});

