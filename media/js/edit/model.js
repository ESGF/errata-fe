// Module imports.
import * as STATE from  './state.js';
import * as UTILS from  '../shared/utilities.js';

// An issue being either created / updated.
export default class Issue {
    // Instance ctor.
    constructor(uid) {
        this.datasets = [];
        this.description = null;
        this.isNew = uid ? false : true;
        this.materials = [];
        this.project = null;
        this.severity = "low";
        this.status = "new";
        this.title = null;
        this.uid = uid || UTILS.generateUUID();
        this.urls = [];

        this.ext = new IssueExtensionInfo(this);
        this.previousState = null;
    }

    // Full issue title.
    get fullTitle () {
        var result;

        if (this.isNew) {
            return 'New Issue'
        }

        result = this.project.toUpperCase();
        result += " - ";
        result += this.title.slice(0, 48);
        if (this.title.length > 48) {
            result += "...";
        }

        return result;
    }

    // Returns flag indicating whether a state change has occurred.
    get hasChanged () {
        if (this.previousState === null) {
            return true;
        } else {
            return this.datasets != this.previousState.datasets ||
                   this.description != this.previousState.description ||
                   this.materials != this.previousState.materials ||
                   this.project != this.previousState.project ||
                   this.severity != this.previousState.severity ||
                   this.status != this.previousState.status ||
                   this.title != this.previousState.title ||
                   this.urls != this.previousState.urls;
        }
    }

    // Decodes an instance from data pulled from server.
    decode (i) {
        this.datasets = i.datasets;
        this.description = i.description;
        this.materials = i.materials;
        this.project = i.project;
        this.severity = i.severity;
        this.status = i.status;
        this.title = i.title;
        this.uid = i.uid;
        this.urls = i.urls;

        this.previousState = i;
    }

    // Encode an instance to be pushed to server.
    encode () {
        return JSON.stringify({
            datasets: this.datasets,
            description: this.description,
            materials: this.materials,
            project: this.project,
            severity: this.severity,
            status: this.status,
            title: this.title,
            uid: this.uid,
            urls: this.urls
        })
    }
}

// Extended issue information.
class IssueExtensionInfo {
    // Instance ctor.
    constructor(i) {
        this._issue = i;
    }

    get datasets () {
        return this._issue.datasets.join('\n');
    }

    get materials () {
        return this._issue.materials.join('\n');
    }
}
