export { User } from '../shared/model.js';
import * as UTILS from '../shared/utilities.js';

// An issue being either created / updated.
export class Issue {
    // Instance ctor.
    constructor() {
        this.datasets = [];
        this.description = null;
        this.materials = [];
        this.project = null;
        this.status = "new";
        this.moderationStatus = "not-required";
        this.title = null;
        this.uid = UTILS.getURLParam("uid") || UTILS.generateUUID();
        this.isNew = UTILS.getURLParam("uid") ? false : true;
        this.urls = [];

        this.setHash();
    }

    // Full issue title.
    get fullTitle () {
        if (this.isNew) {
            return 'New Issue'
        }

        let result;
        result = this.project.toUpperCase();
        result += " - ";
        result += this.title.slice(0, 48);
        if (this.title.length > 48) {
            result += "...";
        }
        return result;
    }

    // Returns flag indicating whether issue state has changed or not.
    get hasChanged () {
        return this.stateHash !== this.encode();
    }

    // Sets a pseudo-hash of the objects state.
    setHash () {
        this.stateHash = this.encode();
    }

    // Decodes an instance from data pulled from server.
    decode (i) {
        this.datasets = i.datasets;
        this.description = i.description;
        this.materials = i.materials;
        this.project = i.project;
        this.severity = i.severity;
        this.status = i.status;
        this.moderationStatus = i.moderationStatus;
        this.moderationWindow = i.moderationWindow;
        this.title = i.title;
        this.uid = i.uid;
        this.urls = i.urls;
    }

    // Encode an instance to be pushed to server.
    encode () {
        return JSON.stringify({
            datasets: this.datasets,
            description: this.description,
            materials: this.materials,
            moderationStatus: this.moderationStatus,
            project: this.project,
            severity: this.severity,
            status: this.status,
            title: this.title,
            uid: this.uid,
            urls: this.urls,
            userEmail: this.email
        })
    }
}
