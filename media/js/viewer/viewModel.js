(function (root, $, _, Backbone) {

    // ECMAScript 5 Strict Mode
    "use strict";

    // View model.
    class ViewModel {
        // Instance ctor.
        constructor(app) {
            this.APP = app;
            this.issue = null;
            this.vocabs = null;
        }

        get datasets () {
            return this.issue.datasets;
        }

        get projects () {
            return this.vocabs[0];
        }

        get severity () {
            return this.vocabs[1];
        }

        get status () {
            return this.vocabs[2];
        }

        getVocabCollection (collectionID) {
            return _.find(this.vocabs, (i) => {
                return i.key === collectionID;
            });
        }

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

    // Commence setup when document has loaded.
    root.APP = new root.ErrataApplication(ViewModel, "Viewer");
    $(document).ready(function () {
        root.APP.trigger("setup:begin");
    });

}(
    this,
    this.$,
    this._,
    this.Backbone
));
